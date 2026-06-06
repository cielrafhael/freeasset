let allAssets = [];

async function fetchAssets() {
    const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS0YvIIusJAst868QBaUTeJpalY2ANvBMF9pb1qdmu31G1KYes7QZqX_f1CD74TRapQ7eENKhOM5a8A/pub?output=csv';
    const response = await fetch(sheetUrl);
    const data = await response.text();
    const rows = data.split('\n').slice(1);
    
    allAssets = rows.filter(row => row.trim() !== "").map(row => {
        const cols = row.split(',');
        return { title: cols[1], category: cols[2], thumbnail: cols[5] };
    });
    renderGrid(allAssets);
}

function renderGrid(assets) {
    const grid = document.getElementById('assetGrid');
    grid.innerHTML = assets.map(a => `
        <div class="asset-card">
            <img src="${a.thumbnail}" alt="${a.title}">
            <div style="padding:15px"><h3>${a.title}</h3><p>${a.category}</p></div>
        </div>
    `).join('');
}

// Inject Iklan
async function loadAds() {
    const adContainers = document.querySelectorAll('.ad-container');
    const response = await fetch('ads.html');
    const adContent = await response.text();
    adContainers.forEach(c => c.innerHTML = adContent);
}

document.addEventListener('DOMContentLoaded', () => {
    fetchAssets();
    loadAds();
});
