# Pins 📌

Pins is a minimal desktop bookmark manager built with **React, Vite, and Electron**.  
It allows users to organize bookmarks into custom sections, search saved links in real time, and persist data locally on their system.

Designed as a lightweight desktop alternative to browser-based bookmark managers.

---

## 🚀 Features

- Create, rename, and remove bookmark sections
- Add, edit, and delete bookmarks
- Real-time bookmark search
- Open links directly from the desktop app
- Automatic favicon retrieval with fallback handling
- Persistent local storage
- Windows installer build support (NSIS)

---

## 🛠 Tech Stack

- **Electron**
- **React (Functional Components + Hooks)**
- **Vite**
- **JavaScript (ES6+)**
- **Tailwind CSS**
- **Electron Builder** (Packaging & Distribution)

---

## 🧠 Architecture Overview

### 🖥 Renderer Process (Frontend)

- Built using React and Vite
- State managed with `useState` and `useEffect`
- Dynamic filtering via controlled search input
- Modal-based UI for adding/editing bookmarks
- Section-based component structure

### ⚙ Main Process (Electron)

- Handles file system persistence
- Saves and loads bookmark data locally
- Opens external links securely
- Communicates with the renderer via IPC

---

## 💾 Data Persistence

- Bookmarks are stored locally on the user's machine.
- Data is automatically saved whenever state updates.
- Data is loaded on application startup using `window.api`.

No external database or backend is required.

---

## 🌐 Favicon Handling

Favicons are dynamically generated using:

```
https://www.google.com/s2/favicons?domain=DOMAIN&sz=128
```

If a favicon fails to load, a default fallback icon is used.

---

# 🛠 Installation & Setup

## 🔹 Prerequisites

- Node.js (v16+ recommended)
- npm

---

## 🔹 Clone the Repository

```bash
git clone https://github.com/brandonoconnor10/Pins.git
cd Pins
```

---

## 🔹 Install Dependencies

```bash
npm install
```

---

## 🔹 Run in Development Mode

You must run both Vite and Electron.

### Step 1: Start Vite Dev Server

```bash
npm run dev
```

### Step 2: In a second terminal, start Electron

```bash
npm run electron:dev
```

This connects Electron to the Vite dev server using:

```
VITE_DEV_SERVER_URL=http://localhost:5173
```

---

## 🔹 Build Production Version

To generate a packaged desktop application:

```bash
npm run dist
```

This will:

1. Build the frontend using Vite
2. Package the app using electron-builder
3. Generate installer files inside the `/dist` directory

---

## 🪟 Windows Installer

- Uses NSIS installer target
- Application ID: `com.oconnoronly.pins`
- Icon located at `electron/assets/icon.ico`

Installer files are generated locally and are not committed to the repository.

---

## 📚 What I Learned

- Building cross-platform desktop apps with Electron
- Managing renderer ↔ main process communication
- Packaging and distributing applications with electron-builder
- Structuring scalable React component systems
- Persisting application data locally

---

## 📌 Future Improvements

- Drag-and-drop bookmark reordering
- Tag-based filtering
- Export/Import bookmarks
- macOS build support

## 🏠 Home Screen

<p align="center">
  <img src="assets/images/Home.png" width="700">
</p>

*Main dashboard displaying bookmark sections and grid layout.*
