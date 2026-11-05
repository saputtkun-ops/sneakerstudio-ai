/**
 * SNEAKERSTUDIO AI — UPLOAD & FORMAT CONTROLLER
 * Menangani Unggah Foto Sepatu Asli & Pemilihan Format Dimensi Instagram
 */

window.SneakerStudio = window.SneakerStudio || {};

window.SneakerStudio.Upload = (function() {
    function init() {
        setupFormatCards();
        setupUploadZone('main', 'zone-main', 'input-photo-main', 'prompt-main', 'preview-box-main', 'preview-img-main', 'btn-remove-main');
        setupUploadZone('after', 'zone-after', 'input-photo-after', 'prompt-after', 'preview-box-after', 'preview-img-after', 'btn-remove-after');

        // Tombol Lanjut ke Kategori
        const btnContinue = document.getElementById('btn-to-category');
        if (btnContinue) {
            btnContinue.addEventListener('click', function() {
                const photos = window.SneakerStudio.state.uploadedPhotos;
                if (!photos.main || !photos.main.dataUrl) {
                    window.SneakerStudio.App.showToast('Silakan unggah foto sepatu utama terlebih dahulu.', 'error');
                    return;
                }
                window.SneakerStudio.App.navigateTo(2);
            });
        }
    }

    function setupFormatCards() {
        const cards = document.querySelectorAll('.format-card');
        cards.forEach(card => {
            card.addEventListener('click', function() {
                cards.forEach(c => c.classList.remove('active'));
                this.classList.add('active');
                const format = this.getAttribute('data-format');
                window.SneakerStudio.state.selectedFormat = format;

                // Perbarui teks di editor jika kanvas sudah ada
                const meta = document.getElementById('editor-design-meta');
                if (meta) {
                    const formatNames = {
                        portrait: 'Format Feed Potret (1080 × 1350 px)',
                        square: 'Format Feed Persegi (1080 × 1080 px)',
                        story: 'Format Story / Reels (1080 × 1920 px)',
                        carousel: 'Format Carousel Slide (1080 × 1350 px)'
                    };
                    meta.textContent = formatNames[format] || format;
                }
            });
        });
    }

    function setupUploadZone(type, zoneId, inputId, promptId, previewBoxId, previewImgId, removeBtnId) {
        const zone = document.getElementById(zoneId);
        const input = document.getElementById(inputId);
        const prompt = document.getElementById(promptId);
        const previewBox = document.getElementById(previewBoxId);
        const previewImg = document.getElementById(previewImgId);
        const removeBtn = document.getElementById(removeBtnId);

        if (!zone || !input) return;

        // Klik untuk memilih file
        zone.addEventListener('click', function(e) {
            if (e.target === removeBtn || removeBtn.contains(e.target)) return;
            input.click();
        });

        // Input file changed
        input.addEventListener('change', function(e) {
            if (e.target.files && e.target.files[0]) {
                processFile(e.target.files[0], type, prompt, previewBox, previewImg);
            }
        });

        // Drag & Drop
        zone.addEventListener('dragover', function(e) {
            e.preventDefault();
            zone.classList.add('dragover');
        });

        zone.addEventListener('dragleave', function(e) {
            e.preventDefault();
            zone.classList.remove('dragover');
        });

        zone.addEventListener('drop', function(e) {
            e.preventDefault();
            zone.classList.remove('dragover');
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                processFile(e.dataTransfer.files[0], type, prompt, previewBox, previewImg);
            }
        });

        // Hapus foto
        if (removeBtn) {
            removeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                window.SneakerStudio.state.uploadedPhotos[type] = null;
                input.value = '';
                previewImg.src = '';
                previewBox.classList.add('hidden');
                prompt.classList.remove('hidden');
                window.SneakerStudio.App.showToast(`Foto ${type === 'main' ? 'utama' : 'sesudah'} dihapus.`, 'info');
            });
        }
    }

    function processFile(file, type, prompt, previewBox, previewImg) {
        // Validasi tipe file
        const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            window.SneakerStudio.App.showToast('Format file tidak didukung! Gunakan JPG, PNG, atau WebP.', 'error');
            return;
        }

        // Validasi ukuran maks 10MB
        if (file.size > 10 * 1024 * 1024) {
            window.SneakerStudio.App.showToast('Ukuran foto terlalu besar! Maksimal 10MB.', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            const dataUrl = e.target.result;

            window.SneakerStudio.state.uploadedPhotos[type] = {
                file: file,
                dataUrl: dataUrl,
                name: file.name
            };

            previewImg.src = dataUrl;
            prompt.classList.add('hidden');
            previewBox.classList.remove('hidden');

            window.SneakerStudio.App.showToast(`Foto ${type === 'main' ? 'utama' : 'sesudah'} berhasil dimuat!`, 'success');
        };

        reader.readAsDataURL(file);
    }

    return {
        init: init
    };
})();
