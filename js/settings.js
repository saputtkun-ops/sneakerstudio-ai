/**
 * SNEAKERSTUDIO AI — SETTINGS & BRAND IDENTITY
 * Pengaturan Identitas Merek, Kontak, Wilayah, dan Daftar Layanan & Harga Dinamis
 */

window.SneakerStudio = window.SneakerStudio || {};

window.SneakerStudio.Settings = (function() {
    const STORAGE_KEY = 'sneakerstudio_brand';

    function init() {
        loadSettings();
        setupModalEvents();
        setupServicesList();

        const btnSave = document.getElementById('btn-save-settings');
        if (btnSave) {
            btnSave.addEventListener('click', saveSettings);
        }
    }

    function setupModalEvents() {
        const btnOpen = document.getElementById('btn-open-settings');
        const btnClose = document.getElementById('btn-close-settings');
        const btnCancel = document.getElementById('btn-cancel-settings');
        const backdrop = document.getElementById('backdrop-settings');
        const modal = document.getElementById('modal-settings');

        if (btnOpen && modal) {
            btnOpen.addEventListener('click', function() {
                populateForm();
                modal.classList.add('active');
            });
        }

        [btnClose, btnCancel, backdrop].forEach(el => {
            if (el && modal) {
                el.addEventListener('click', function() {
                    modal.classList.remove('active');
                });
            }
        });
    }

    function setupServicesList() {
        const btnAdd = document.getElementById('btn-add-service-row');
        if (btnAdd) {
            btnAdd.addEventListener('click', function() {
                addServiceRow('Layanan Baru', '50.000');
            });
        }
    }

    function addServiceRow(name = '', price = '') {
        const list = document.getElementById('services-edit-list');
        if (!list) return;

        const row = document.createElement('div');
        row.className = 'service-row-item';
        row.innerHTML = `
            <input type="text" class="form-input srv-name" value="${escapeHtml(name)}" placeholder="Nama Layanan (e.g. Deep Clean)">
            <input type="text" class="form-input srv-price" value="${escapeHtml(price)}" placeholder="Harga (e.g. 75.000)">
            <button class="btn-remove-srv" title="Hapus layanan">&times;</button>
        `;

        const btnRemove = row.querySelector('.btn-remove-srv');
        btnRemove.addEventListener('click', function() {
            if (list.children.length <= 1) {
                window.SneakerStudio.App.showToast('Minimal harus ada 1 layanan.', 'error');
                return;
            }
            row.remove();
        });

        list.appendChild(row);
    }

    function populateForm() {
        const brand = window.SneakerStudio.state.brandSettings;

        const fName = document.getElementById('setting-biz-name');
        const fTagline = document.getElementById('setting-biz-tagline');
        const fIg = document.getElementById('setting-biz-ig');
        const fWa = document.getElementById('setting-biz-wa');
        const fArea = document.getElementById('setting-biz-area');
        const fColor1 = document.getElementById('setting-primary-color');
        const fColor2 = document.getElementById('setting-accent-color');

        if (fName) fName.value = brand.businessName || '';
        if (fTagline) fTagline.value = brand.tagline || '';
        if (fIg) fIg.value = brand.instagram || '';
        if (fWa) fWa.value = brand.whatsapp || '';
        if (fArea) fArea.value = brand.serviceArea || '';
        if (fColor1) fColor1.value = brand.primaryColor || '#111111';
        if (fColor2) fColor2.value = brand.accentColor || '#C7B79B';

        // Render baris layanan
        const list = document.getElementById('services-edit-list');
        if (list) {
            list.innerHTML = '';
            const services = brand.services || [
                { name: 'Cuci Regular', price: '45.000' },
                { name: 'Deep Clean', price: '75.000' },
                { name: 'Unyellowing', price: '85.000' },
                { name: 'Repaint Sepatu', price: '150.000' }
            ];
            services.forEach(s => addServiceRow(s.name, s.price));
        }
    }

    function saveSettings() {
        const fName = document.getElementById('setting-biz-name');
        const fTagline = document.getElementById('setting-biz-tagline');
        const fIg = document.getElementById('setting-biz-ig');
        const fWa = document.getElementById('setting-biz-wa');
        const fArea = document.getElementById('setting-biz-area');
        const fColor1 = document.getElementById('setting-primary-color');
        const fColor2 = document.getElementById('setting-accent-color');

        const services = [];
        const rows = document.querySelectorAll('.service-row-item');
        rows.forEach(r => {
            const name = r.querySelector('.srv-name').value.trim();
            const price = r.querySelector('.srv-price').value.trim();
            if (name) {
                services.push({ name: name, price: price || '0' });
            }
        });

        const brand = {
            businessName: fName ? fName.value.trim() || 'Nama Bisnis Kamu' : 'Nama Bisnis Kamu',
            tagline: fTagline ? fTagline.value.trim() : '',
            instagram: fIg ? fIg.value.trim() : '@namabisnis',
            whatsapp: fWa ? fWa.value.trim() : '0812-3456-7890',
            address: 'Workshop Studio',
            serviceArea: fArea ? fArea.value.trim() : '',
            primaryColor: fColor1 ? fColor1.value : '#111111',
            accentColor: fColor2 ? fColor2.value : '#C7B79B',
            services: services.length > 0 ? services : [{ name: 'Deep Clean', price: '75.000' }]
        };

        window.SneakerStudio.state.brandSettings = brand;

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(brand));
        } catch (e) {
            console.warn('Gagal menyimpan ke localStorage:', e);
        }

        // Perbarui username mockup feed planner
        const mockupUser = document.getElementById('mockup-ig-user');
        if (mockupUser) mockupUser.textContent = brand.instagram || '@namabisnis';

        const modal = document.getElementById('modal-settings');
        if (modal) modal.classList.remove('active');

        window.SneakerStudio.App.showToast('Identitas merek berhasil diperbarui!', 'success');

        // Jika sedang di halaman editor dan ada template aktif, reload template dengan brand baru
        if (window.SneakerStudio.state.currentStep === 4 && window.SneakerStudio.state.selectedTemplate) {
            window.SneakerStudio.Editor.loadTemplate(window.SneakerStudio.state.selectedTemplate);
        }
    }

    function loadSettings() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                window.SneakerStudio.state.brandSettings = Object.assign(window.SneakerStudio.state.brandSettings, parsed);
            }
        } catch (e) {
            console.warn('Gagal memuat pengaturan:', e);
        }
    }

    function escapeHtml(text) {
        if (!text) return '';
        return text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    return {
        init: init,
        load: loadSettings
    };
})();
