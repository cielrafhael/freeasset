// Database state
let allAssets = [];

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    fetchAssets();
    setupEventListeners();
});

// Fetch JSON Database
async function fetchAssets() {
    try {
        const response = await fetch('assets.json');
        allAssets = await response.json();
        
        // If on homepage/catalog, render grid
        if (document.getElementById('assetGrid')) {
            renderGrid(allAssets);
        }
    } catch (error) {
        console.error('Error loading assets:', error);
    }
}

// Render Asset Cards
function renderGrid(assets) {
    const grid = document.getElementById('assetGrid');
    if(!grid) return;
    
    grid.innerHTML = '';
    
    if(assets.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align:center;">No assets found matching your criteria.</p>';
        return;
    }

    assets.forEach(asset => {
        const card = document.createElement('div');
        card.className = 'asset-card';
        card.innerHTML = `
            <a href="asset.html?id=${asset.id}">
                <div class="card-image-wrapper">
                    <img src="${asset.thumbnail}" alt="${asset.title}" loading="lazy">
                    <div class="card-overlay">
                        <span class="btn-preview">View & Download</span>
                    </div>
                </div>
                <div class="card-content">
                    <h3 class="card-title">${asset.title}</h3>
                    <div class="card-meta">
                        <span class="badge">${asset.category}</span>
                        <span>${asset.resolution} • ${asset.format}</span>
                    </div>
                </div>
            </a>
        `;
        grid.appendChild(card);
    });
}

// Setup Filters and Search
function setupEventListeners() {
    // Category Filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            const category = e.target.getAttribute('data-filter');
            let filtered = category === 'all' ? allAssets : allAssets.filter(a => a.category === category);
            renderGrid(filtered);
        });
    });

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if(searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const filtered = allAssets.filter(a => 
                a.title.toLowerCase().includes(term) || 
                a.tags.some(tag => tag.toLowerCase().includes(term))
            );
            renderGrid(filtered);
        });
    }

    // Sort functionality
    const sortSelect = document.getElementById('sortSelect');
    if(sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            let sorted = [...allAssets];
            if(e.target.value === 'popular') {
                sorted.sort((a, b) => b.downloads - a.downloads);
            } else {
                sorted.sort((a, b) => b.id - a.id); // Assuming ID is timestamp-based
            }
            renderGrid(sorted);
        });
    }
}

// Logic for asset.html detail view
async function loadAssetDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const assetId = parseInt(urlParams.get('id'));
    
    if(!assetId) {
        window.location.href = 'index.html';
        return;
    }

    try {
        const response = await fetch('assets.json');
        const assets = await response.json();
        const asset = assets.find(a => a.id === assetId);

        if(asset) {
            document.title = `${asset.title} - Free Assets Hub`;
            document.getElementById('detailImage').src = asset.preview;
            document.getElementById('detailTitle').textContent = asset.title;
            document.getElementById('detailCategory').textContent = asset.category;
            document.getElementById('detailResolution').textContent = asset.resolution;
            document.getElementById('detailFormat').textContent = asset.format;
            document.getElementById('detailDownloads').textContent = asset.downloads.toLocaleString();
            
            document.getElementById('bc-category').textContent = asset.category;
            document.getElementById('bc-title').textContent = asset.title;

            const tagsHtml = asset.tags.map(tag => `<span class="tag">#${tag}</span>`).join('');
            document.getElementById('detailTags').innerHTML = tagsHtml;

            const dlBtn = document.getElementById('downloadBtn');
            dlBtn.href = asset.downloadUrl;
            document.getElementById('detailFormatBtn').textContent = asset.format;
            
            // Increment download counter logic would go here (requires backend, so we fake it for static)
            dlBtn.addEventListener('click', () => {
                console.log('Download initiated. R2 Link:', asset.downloadUrl);
            });
        }
    } catch (e) {
        console.error("Error loading asset details", e);
    }
}

function copyLink() {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
}
