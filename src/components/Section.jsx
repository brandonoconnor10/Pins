import { useState } from "react";

export default function Section({
  section,
  search,
  onRename,
  onAdd,
  onEdit,
  onDelete,
  onRemoveSection
}) {
  const [editingTitle, setEditingTitle] = useState(false);
  const [title, setTitle] = useState(section.name);

  function handleRename() {
    onRename(section.id, title || "Untitled");
    setEditingTitle(false);
  }

  return (
    <div className="section">
      <div className="section-header">
        {editingTitle ? (
          <input
            className="section-title-input"
            value={title}
            autoFocus
            onBlur={handleRename}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleRename()}
          />
        ) : (
          <h3 onDoubleClick={() => setEditingTitle(true)}>
            {section.name}
          </h3>
        )}

        <button
          className="section-remove"
          onClick={() => onRemoveSection(section.id)}
          title="Remove section"
        >
          ✕
        </button>
      </div>

      <div className="section-container">
        <div className="grid">
          <div className="tile add" onClick={onAdd}>
            +
            <span>Add Site</span>
          </div>

          {section.bookmarks
            .filter((b) =>
              b.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((b) => (
              <div
                key={b.id}
                className="tile"
                onClick={(e) => {
                  if (e.ctrlKey) {
                    onEdit(section.id, b);
                  } else {
                    window.api.openLink(b.url);
                  }
                }}
                onContextMenu={(e) => {
                  e.preventDefault();
                  onDelete(section.id, b.id);
                }}
              >
                 <img
                    src="./default.png"
                    alt=""
                    className="favicon default"
                    onLoad={(e) => {
                      if (!b.favicon) return;

                      const img = new Image();
                      img.src = b.favicon;

                      img.onload = () => {
                        e.currentTarget.src = b.favicon;
                        e.currentTarget.classList.remove("default");
                      };

                      img.onerror = () => {
                        e.currentTarget.src = "./default.png";
                        e.currentTarget.classList.add("default");
                      };
                    }}
                  />


                <span>{b.title}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
