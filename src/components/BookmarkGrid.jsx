import { useEffect, useState } from "react";
import Section from "./Section";

export default function BookmarkGrid() {
  const [sections, setSections] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: "", url: "", sectionId: "" });

  /* LOAD */
  useEffect(() => {
    window.api.loadBookmarks().then((data) => {
      if (Array.isArray(data)) setSections(data);
    });
  }, []);

  /* SAVE */
  useEffect(() => {
    window.api.saveBookmarks(sections);
  }, [sections]);

  function addSection() {
    setSections((prev) => [
      ...prev,
      { id: Date.now(), name: "New Section", bookmarks: [] }
    ]);
  }

  function removeSection(id) {
    setSections((prev) => prev.filter((s) => s.id !== id));
  }

  function renameSection(id, name) {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, name } : s))
    );
  }

  function openAdd(sectionId) {
    setEditing(null);
    setForm({ title: "", url: "", sectionId });
    setShowModal(true);
  }

  function openEdit(sectionId, bookmark) {
    setEditing({ sectionId, bookmarkId: bookmark.id });
    setForm({ title: bookmark.title, url: bookmark.url, sectionId });
    setShowModal(true);
  }

  function saveBookmark() {
    if (!form.title || !form.url) return;

    const url = form.url.startsWith("http")
      ? form.url
      : `https://${form.url}`;

    let favicon = "";
    try {
      favicon = `https://www.google.com/s2/favicons?domain=${
        new URL(url).hostname
      }&sz=128`;
    } catch {
      favicon = "/default.png";
    }

    setSections((prev) =>
      prev.map((s) => {
        if (s.id !== form.sectionId) return s;

        if (editing) {
          return {
            ...s,
            bookmarks: s.bookmarks.map((b) =>
              b.id === editing.bookmarkId
                ? { ...b, title: form.title, url, favicon }
                : b
            )
          };
        }

        return {
          ...s,
          bookmarks: [
            ...s.bookmarks,
            { id: Date.now(), title: form.title, url, favicon }
          ]
        };
      })
    );

    setShowModal(false);
    setEditing(null);
  }

  function deleteBookmark(sectionId, bookmarkId) {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? { ...s, bookmarks: s.bookmarks.filter((b) => b.id !== bookmarkId) }
          : s
      )
    );
  }

  return (
    <div className="app">
      <input
        className="search"
        placeholder="Search bookmarks…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button className="add-section-btn" onClick={addSection}>
        + Add Section
      </button>

      {sections.map((section) => (
        <Section
          key={section.id}
          section={section}
          search={search}
          onRename={renameSection}
          onAdd={() => openAdd(section.id)}
          onEdit={openEdit}
          onDelete={deleteBookmark}
          onRemoveSection={removeSection}
        />
      ))}

      {showModal && (
        <div className="modal-bg" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <input
              placeholder="Site name"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <input
              placeholder="https://example.com"
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
            />
            <button onClick={saveBookmark}>
              {editing ? "Save changes" : "Add site"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
