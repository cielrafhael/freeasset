# Free Assets Hub

A high-performance, fully static digital asset marketplace designed for GitHub Pages and Cloudflare R2. No backend required.

## 🚀 Architecture
- **Frontend:** HTML5, CSS3, Vanilla JS
- **Database:** `assets.json` (Static JSON file)
- **Asset Storage:** Cloudflare R2 (Provides massive egress bandwidth for free/cheap)
- **Hosting:** GitHub Pages

## 📁 File Routing Note
To fulfill the requirement for `search.html` and `category.html` without duplicating codebase overhead, these files can simply be exact copies of `index.html`. The `script.js` handles query parameters (e.g., `?cat=Textures` or `?q=searchterm`) dynamically. To be strict to the prompt, duplicate `index.html` and name the copies `search.html` and `category.html`.

## 🛠️ Setup Instructions

### 1. Cloudflare R2 Setup (Asset Hosting)
1. Go to your Cloudflare Dashboard -> **R2**.
2. Create a new bucket (e.g., `free-assets-hub`).
3. Upload your heavy `.zip`, `.psd`, and `.jpg` asset files here.
4. Go to Bucket Settings -> **Public Access** -> Connect a Custom Domain or enable the `r2.dev` subdomain.
5. Use these public URLs in your `assets.json` under `downloadUrl`.

### 2. Adding New Assets
1. Open `admin.html` in your local browser.
2. Fill out the asset details (Title, category, resolution, Cloudflare R2 URL).
3. Click "Generate JSON Entry".
4. Click "Download Updated assets.json".
5. Replace the `assets.json` in your repository with this newly downloaded file.

### 3. GitHub Pages Deployment
1. Initialize a Git repository and commit all files.
2. Push to GitHub:
   ```bash
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin [https://github.com/yourusername/free-assets-hub.git](https://github.com/yourusername/free-assets-hub.git)
   git push -u origin main
