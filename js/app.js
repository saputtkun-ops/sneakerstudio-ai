/**
 * SNEAKERSTUDIO AI — MAIN CONTROLLER
 * Menghubungkan Navigasi, State Global, Rekomendasi Desain, & Manajemen Proyek
 */

window.SneakerStudio = window.SneakerStudio || {};

// INISIALISASI STATE GLOBAL
window.SneakerStudio.state = {
    currentStep: 1,
    uploadedPhotos: { main: null, after: null },
    selectedFormat: 'portrait',
    selectedCategory: 'promosi',
    selectedTemplate: null,
    brandSettings: {
        businessName: 'Nama Bisnis Kamu',
        tagline: 'Perawatan Sneakers Profesional',
        logo: null,
        primaryColor: '#111111',
        accentColor: '#C7B79B',
        font: 'Inter',
        phone: '0812-3456-7890',
        whatsapp: '0812-3456-7890',
        address: 'Workshop Studio',
        instagram: '@namabisnis',
        services: [
            { name: 'Fast Clean', price: '35.000' },
            { name: 'Deep Clean', price: '65.000' },
            { name: 'Unyellowing Sol', price: '85.000' },
            { name: 'Repaint Sepatu', price: '150.000' }
        ],
        serviceArea: 'Jabodetabek & Sekitarnya'
    },
    editor: { canvas: null },
    savedProjects: [],
    feedPlan: []
};

window.SneakerStudio.App = (function() {
    function init() {
        // Inisialisasi Modul-Modul
        window.SneakerStudio.Settings.init();
        window.SneakerStudio.Upload.init();
        window.SneakerStudio.Editor.init();
        window.SneakerStudio.Caption.init();
        window.SneakerStudio.Export.init();
        window.SneakerStudio.FeedPlanner.init();

        setupSidebarNavigation();
        setupBackButtonWiring();
        setupProjectsModal();
        setupMobileToggle();

        // Render Kategori Pertama Kali
        renderCategories();

        // Navigasi Awal ke Langkah 1
        navigateTo(1);
    }

    // =========================================================================
    // NAVIGASI LANGKAH (WIZARD STEPS)
    // =========================================================================
    function navigateTo(stepNum) {
        stepNum = parseInt(stepNum, 10);

        // Validasi Prasyarat Langkah
        const photos = window.SneakerStudio.state.uploadedPhotos;
        if (stepNum > 1 && (!photos.main || !photos.main.dataUrl)) {
            showToast('Silakan unggah foto sepatu utama terlebih dahulu.', 'error');
            return;
        }

        if (stepNum >= 4 && !window.SneakerStudio.state.selectedTemplate) {
            showToast('Silakan pilih salah satu rekomendasi desain.', 'error');
            return;
        }

        window.SneakerStudio.state.currentStep = stepNum;

        // Beralih Halaman Aktif
        document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));

        const pageMap = {
            1: 'page-upload',
            2: 'page-category',
            3: 'page-recommendations',
            4: 'page-editor',
            5: 'page-caption',
            6: 'page-export',
            7: 'page-feed-planner'
        };

        const targetPage = document.getElementById(pageMap[stepNum]);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        // Update Item Navigasi Sidebar
        document.querySelectorAll('.nav-item').forEach(btn => {
            const btnStep = parseInt(btn.getAttribute('data-step'), 10);
            btn.classList.toggle('active', btnStep === stepNum);
        });

        // Trigger Event Khusus Tiap Halaman
        if (stepNum === 2) {
            renderCategories();
        } else if (stepNum === 3) {
            renderRecommendations();
        } else if (stepNum === 5) {
            window.SneakerStudio.Caption.generate();
        } else if (stepNum === 6) {
            window.SneakerStudio.Export.updatePreview();
        } else if (stepNum === 7) {
            window.SneakerStudio.FeedPlanner.render();
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function setupSidebarNavigation() {
        document.querySelectorAll('.nav-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const step = this.getAttribute('data-step');
                navigateTo(step);
            });
        });
    }

    function setupBackButtonWiring() {
        // Dari Kategori ke Upload
        const btnBackUpload = document.getElementById('btn-back-to-upload');
        if (btnBackUpload) btnBackUpload.addEventListener('click', () => navigateTo(1));

        // Dari Kategori ke Rekomendasi
        const btnToRec = document.getElementById('btn-to-recommendations');
        if (btnToRec) btnToRec.addEventListener('click', () => navigateTo(3));

        // Dari Rekomendasi ke Kategori
        const btnBackCat = document.getElementById('btn-back-to-category');
        if (btnBackCat) btnBackCat.addEventListener('click', () => navigateTo(2));

        // Dari Editor ke Caption
        const btnToCaption = document.getElementById('btn-to-caption-page');
        if (btnToCaption) btnToCaption.addEventListener('click', () => navigateTo(5));

        // Dari Editor Langsung ke Unduh
        const btnToExportDirect = document.getElementById('btn-to-export-direct');
        if (btnToExportDirect) btnToExportDirect.addEventListener('click', () => navigateTo(6));

        // Dari Caption ke Editor
        const btnBackEditor = document.getElementById('btn-back-to-editor');
        if (btnBackEditor) btnBackEditor.addEventListener('click', () => navigateTo(4));

        // Dari Caption ke Unduh
        const btnToExport = document.getElementById('btn-to-export');
        if (btnToExport) btnToExport.addEventListener('click', () => navigateTo(6));

        // Dari Unduh Kembali ke Editor
        const btnBackEditorExp = document.getElementById('btn-back-to-editor-from-export');
        if (btnBackEditorExp) btnBackEditorExp.addEventListener('click', () => navigateTo(4));

        // Dari Unduh ke Feed Planner
        const btnToFeedPlan = document.getElementById('btn-to-feed-planner');
        if (btnToFeedPlan) btnToFeedPlan.addEventListener('click', () => navigateTo(7));

        // Quick Save Project di Editor
        const btnQuickSave = document.getElementById('btn-save-project-quick');
        if (btnQuickSave) {
            btnQuickSave.addEventListener('click', saveCurrentProject);
        }
    }

    // =========================================================================
    // RENDER 8 KATEGORI KONTEN
    // =========================================================================
    function renderCategories() {
        const grid = document.getElementById('category-grid');
        if (!grid) return;

        const categories = window.SneakerStudio.Templates.getCategories();
        grid.innerHTML = '';

        categories.forEach(cat => {
            const card = document.createElement('div');
            card.className = 'category-card';
            if (cat.id === window.SneakerStudio.state.selectedCategory) {
                card.classList.add('active');
            }

            card.innerHTML = `
                <div class="category-icon-box">
                    ${window.SneakerStudio.Templates.getCategoryIcon(cat.icon)}
                </div>
                <h3>${cat.name}</h3>
                <p>${cat.desc}</p>
            `;

            card.addEventListener('click', function() {
                window.SneakerStudio.state.selectedCategory = cat.id;
                document.querySelectorAll('.category-card').forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                navigateTo(3);
            });

            grid.appendChild(card);
        });
    }

    // =========================================================================
    // RENDER 6 REKOMENDASI DESAIN OTOMATIS
    // =========================================================================
    function renderRecommendations() {
        const grid = document.getElementById('recommendations-grid');
        const badge = document.getElementById('badge-current-category');
        if (!grid) return;

        const catId = window.SneakerStudio.state.selectedCategory || 'promosi';
        const catObj = window.SneakerStudio.Templates.getCategoryById(catId);
        if (badge) badge.textContent = catObj.name;

        const designs = window.SneakerStudio.Templates.getDesignsForCategory(catId);
        grid.innerHTML = '';

        designs.forEach((design, index) => {
            const card = document.createElement('div');
            card.className = 'recommendation-card';

            card.innerHTML = `
                <div class="rec-preview-wrap" id="preview-wrap-${design.id}">
                    <div style="font-size:12px; color:#888;">Memuat pratinjau...</div>
                </div>
                <div class="rec-info">
                    <div>
                        <h4 class="rec-title">${design.name}</h4>
                        <p class="rec-desc">${design.description}</p>
                    </div>
                    <button class="btn-select-rec">Gunakan & Edit Desain Ini &rarr;</button>
                </div>
            `;

            // Klik kartu untuk memilih desain dan masuk ke Editor
            card.addEventListener('click', function() {
                window.SneakerStudio.state.selectedTemplate = design;
                window.SneakerStudio.Editor.loadTemplate(design);
                navigateTo(4);
                showToast(`Desain "${design.name}" dimuat ke Editor!`, 'success');
            });

            grid.appendChild(card);

            // Buat Thumbnail Pratinjau Offscreen
            generateRecommendationPreview(design, `preview-wrap-${design.id}`);
        });
    }

    function generateRecommendationPreview(design, containerId) {
        setTimeout(() => {
            const container = document.getElementById(containerId);
            if (!container) return;

            const offCanvasEl = document.createElement('canvas');
            const prevW = 270;
            const prevH = 338;
            offCanvasEl.width = prevW;
            offCanvasEl.height = prevH;

            const offCanvas = new fabric.StaticCanvas(offCanvasEl, {
                width: prevW,
                height: prevH
            });

            const scale = prevW / 1080;
            offCanvas.setZoom(scale);

            const photos = window.SneakerStudio.state.uploadedPhotos;
            const brand = window.SneakerStudio.state.brandSettings;
            const elements = design.createElements(1080, 1350, photos, brand);

            let pending = 0;
            elements.forEach(cfg => {
                if (cfg.type === 'rect') {
                    offCanvas.add(new fabric.Rect(cfg));
                } else if (cfg.type === 'textbox') {
                    offCanvas.add(new fabric.Textbox(cfg.text, cfg));
                } else if (cfg.type === 'circle') {
                    offCanvas.add(new fabric.Circle(cfg));
                } else if (cfg.type === 'line') {
                    offCanvas.add(new fabric.Line(cfg.points, cfg));
                } else if (cfg.type === 'image-placeholder') {
                    const photoKey = (cfg.id === 'after-photo') ? 'after' : 'main';
                    const photoData = photos[photoKey];
                    if (photoData && photoData.dataUrl) {
                        pending++;
                        fabric.Image.fromURL(photoData.dataUrl, function(img) {
                            const sc = Math.max(cfg.width / img.width, cfg.height / img.height);
                            img.set({
                                left: cfg.left,
                                top: cfg.top,
                                scaleX: sc,
                                scaleY: sc
                            });
                            offCanvas.add(img);
                            pending--;
                            if (pending === 0) finishPreview(offCanvas, container);
                        });
                    } else {
                        offCanvas.add(new fabric.Rect({
                            left: cfg.left,
                            top: cfg.top,
                            width: cfg.width,
                            height: cfg.height,
                            fill: '#222'
                        }));
                    }
                }
            });

            if (pending === 0) {
                finishPreview(offCanvas, container);
            }
        }, 50);
    }

    function finishPreview(offCanvas, container) {
        offCanvas.renderAll();
        const dataUrl = offCanvas.toDataURL({ format: 'jpeg', quality: 0.8 });
        container.innerHTML = `<img src="${dataUrl}" style="width:100%; height:100%; object-fit:contain;" alt="Pratinjau">`;
        offCanvas.dispose();
    }

    // =========================================================================
    // PROYEK TERSIMPAN (LOCALSTORAGE)
    // =========================================================================
    function saveCurrentProject() {
        const canvas = window.SneakerStudio.Editor.getCanvasData();
        if (!canvas) return;

        const thumb = window.SneakerStudio.Editor.generateThumbnail(240);
        const json = canvas.toJSON(['name', 'selectable', 'evented', 'id']);
        const template = window.SneakerStudio.state.selectedTemplate;

        const project = {
            id: Date.now(),
            name: template ? template.name : 'Desain Kustom',
            date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
            thumbnail: thumb,
            format: window.SneakerStudio.state.selectedFormat,
            category: window.SneakerStudio.state.selectedCategory,
            canvasData: json
        };

        let projects = getSavedProjects();
        projects.unshift(project);
        if (projects.length > 20) projects.pop(); // Maks 20 proyek

        try {
            localStorage.setItem('sneakerstudio_projects', JSON.stringify(projects));
            showToast('Proyek berhasil disimpan ke memori browser!', 'success');
        } catch (e) {
            showToast('Gagal menyimpan proyek: Memori penuh.', 'error');
        }
    }

    function getSavedProjects() {
        try {
            const raw = localStorage.getItem('sneakerstudio_projects');
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            return [];
        }
    }

    function setupProjectsModal() {
        const btnOpen = document.getElementById('btn-open-projects');
        const btnClose = document.getElementById('btn-close-projects');
        const backdrop = document.getElementById('backdrop-projects');
        const modal = document.getElementById('modal-projects');

        if (btnOpen && modal) {
            btnOpen.addEventListener('click', function() {
                renderSavedProjectsList();
                modal.classList.add('active');
            });
        }

        [btnClose, backdrop].forEach(el => {
            if (el && modal) {
                el.addEventListener('click', function() {
                    modal.classList.remove('active');
                });
            }
        });
    }

    function renderSavedProjectsList() {
        const container = document.getElementById('projects-list-container');
        if (!container) return;

        const projects = getSavedProjects();
        if (projects.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1/-1; text-align:center; padding:40px; color:#8A8A85;">
                    <p>Belum ada proyek desain yang tersimpan.</p>
                    <span style="font-size:12px;">Simpan desain Anda melalui tombol "Simpan Proyek" di Editor.</span>
                </div>
            `;
            return;
        }

        container.innerHTML = '';
        projects.forEach((proj, idx) => {
            const card = document.createElement('div');
            card.className = 'project-item-card';
            card.innerHTML = `
                <div class="project-item-thumb">
                    <img src="${proj.thumbnail}" alt="${proj.name}">
                </div>
                <div class="project-item-meta">
                    <h4>${proj.name}</h4>
                    <span>${proj.date}</span>
                    <div class="project-item-actions">
                        <button class="btn btn-sm btn-primary btn-load-proj">Buka</button>
                        <button class="btn btn-sm btn-outline btn-del-proj">Hapus</button>
                    </div>
                </div>
            `;

            // Buka Proyek
            card.querySelector('.btn-load-proj').addEventListener('click', function() {
                const canvas = window.SneakerStudio.Editor.getCanvasData();
                canvas.loadFromJSON(proj.canvasData, function() {
                    canvas.renderAll();
                    document.getElementById('modal-projects').classList.remove('active');
                    navigateTo(4);
                    showToast(`Proyek "${proj.name}" berhasil dimuat!`, 'success');
                });
            });

            // Hapus Proyek
            card.querySelector('.btn-del-proj').addEventListener('click', function() {
                if (confirm(`Hapus proyek "${proj.name}"?`)) {
                    projects.splice(idx, 1);
                    localStorage.setItem('sneakerstudio_projects', JSON.stringify(projects));
                    renderSavedProjectsList();
                    showToast('Proyek dihapus.', 'info');
                }
            });

            container.appendChild(card);
        });
    }

    function setupMobileToggle() {
        const btnToggle = document.getElementById('btn-toggle-sidebar');
        const sidebar = document.getElementById('sidebar');
        if (btnToggle && sidebar) {
            btnToggle.addEventListener('click', function() {
                sidebar.classList.toggle('open');
            });
        }
    }

    // =========================================================================
    // TOAST NOTIFIKASI
    // =========================================================================
    function showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        const icons = {
            success: '✔️',
            error: '⚠️',
            info: 'ℹ️'
        };

        toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span> <span>${message}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3200);
    }

    return {
        init: init,
        navigateTo: navigateTo,
        showToast: showToast
    };
})();

// AUTO INITIALIZE KETIKA DOM SIAP
document.addEventListener('DOMContentLoaded', function() {
    window.SneakerStudio.App.init();
});
