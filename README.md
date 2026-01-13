# 🛑 Pro Site Blocker

A robust Chrome Extension designed to eliminate distractions by preventing access to specific websites. This project uses a **Hybrid Detection Engine** to ensure blocking is instant, reliable, and bypass-resistant.

## ✨ Features

* **Zero-Flicker Blocking:** Pages are hidden *before* they render using `document_start` injection. No more seeing the site for a split second before the redirect.
* **SPA Support:** Works on Single Page Applications (YouTube, Facebook, Twitter) by monitoring internal URL changes that don't trigger a full page reload.
* **Dynamic Management:** Add or remove websites in real-time via the popup interface.
* **Cross-Device Sync:** Your blocked list is saved to your Chrome Profile and follows you across different computers via `chrome.storage.sync`.

---

## 🚀 Installation (Developer Mode)

Since this is a custom extension, you need to load it manually:

1. **Download** or create the project files in a dedicated folder.
2. Open Chrome and navigate to `chrome://extensions/`.
3. In the top right, enable **Developer mode**.
4. Click **Load unpacked** in the top left.
5. Select your project folder.
6. **Pin** the extension to your toolbar for easy access.

---

## 📂 Project Structure

```text
├── manifest.json      # Extension configuration and permissions
├── background.js      # Background observer for SPA/internal navigation
├── content.js         # The "Cloak" script for instant DOM-start hiding
├── popup.html         # The UI for managing your blocklist
├── popup.js           # Logic for adding/removing items from storage
└── style.css          # Styling for the popup interface

```

---

## 🛠️ How it Works

The extension uses a two-layered defense strategy:

### Layer 1: The Gatekeeper (`content.js`)

Injected at `document_start`, this script runs before the browser parses the first line of HTML. It applies a global CSS rule: `html { display: none !important; }`. This ensures the user sees a blank white screen while the script checks your blocklist against the current URL. If the site is safe, the "cloak" is removed.

### Layer 2: The Observer (`background.js`)

Modern websites (SPAs) change content without refreshing the page. We use a Service Worker to listen to `chrome.tabs.onUpdated`. If it detects a URL change to a blocked keyword while the tab is already open, it triggers a forced redirect.

---

## 📖 Usage

1. Click the extension icon to open the **Blocker Dashboard**.
2. Enter a keyword or domain (e.g., `youtube` or `instagram.com`).
3. Click **Block**.
4. The extension will immediately update your rules. Any attempt to visit these sites will redirect you to Google.
5. To unblock, simply click the **Delete** button next to the site name in the dashboard.

---

## ⚠️ Requirements

* **Manifest V3**: This extension is built on the latest Chrome extension standards.
* **Permissions**:
* `storage`: To save your settings.
* `tabs`: To observe and redirect tab navigation.



---
