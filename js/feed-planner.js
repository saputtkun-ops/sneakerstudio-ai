/**
 * SNEAKERSTUDIO AI — INSTAGRAM FEED PLANNER (GRID 3 × 3)
 * Simulasi Tampilan Feed Profil Instagram & Rekomendasi Kombinasi 9 Konten Seimbang
 */

window.SneakerStudio = window.SneakerStudio || {};

window.SneakerStudio.FeedPlanner = (function() {
    const STORAGE_KEY = 'sneakerstudio_feedplan';
    let feedSlotsData = new Array(9).fill(null);

    function init() {
        loadFeedPlan();
        renderSlots();

        // Tombol Pasang Desain Aktif ke Slot Kosong
        const btnFill = document.getElementById('btn-fill-current-to-feed');
        if (btnFill) {
            btnFill.addEventListener('click', function() {
                addCurrentDesignToFirstEmptySlot();
            });
        }

        // Tombol Reset Grid Feed
        const btnClear = document.getElementById('btn-clear-feed');
        if (btnClear) {
            btnClear.addEventListener('click', function() {
                if (confirm('Apakah Anda yakin ingin mengosongkan seluruh grid feed?')) {
                    feedSlotsData = new Array(9).fill(null);
                    saveFeedPlan();
                    renderSlots();
                    window.SneakerStudio.App.showToast('Grid feed telah direset.', 'info');
                }
            });
        }
    }

    function renderSlots() {
        const grid = document.getElementById('ig-feed-grid');
        if (!grid) return;

        grid.innerHTML = '';

        for (let i = 0; i < 9; i++) {
            const slotEl = document.createElement('div');
            slotEl.className = 'feed-slot';
            slotEl.setAttribute('data-slot', i);

            const data = feedSlotsData[i];

            if (data && data.thumbnail) {
                slotEl.innerHTML = `
                    <img src="${data.thumbnail}" alt="Post ${i + 1}">
                    <button class="btn-remove-photo" style="top:4px; right:4px; width:22px; height:22px; font-size:14px;" title="Kosongkan slot">&times;</button>
                `;

                const btnDel = slotEl.querySelector('.btn-remove-photo');
                btnDel.addEventListener('click', function(e) {
                    e.stopPropagation();
                    feedSlotsData[i] = null;
                    saveFeedPlan();
                    renderSlots();
                    window.SneakerStudio.App.showToast(`Slot ${i + 1} dikosongkan.`, 'info');
                });
            } else {
                slotEl.innerHTML = `<div class="slot-empty-label">+ Slot ${i + 1}</div>`;

                slotEl.addEventListener('click', function() {
                    fillSlotWithCurrentDesign(i);
                });
            }

            grid.appendChild(slotEl);
        }
    }

    function fillSlotWithCurrentDesign(slotIdx) {
        const thumb = window.SneakerStudio.Editor.generateThumbnail(350);
        if (!thumb) {
            window.SneakerStudio.App.showToast('Belum ada desain aktif di Editor.', 'error');
            return;
        }

        feedSlotsData[slotIdx] = {
            thumbnail: thumb,
            templateId: window.SneakerStudio.state.selectedTemplate ? window.SneakerStudio.state.selectedTemplate.id : 'custom',
            timestamp: Date.now()
        };

        saveFeedPlan();
        renderSlots();
        window.SneakerStudio.App.showToast(`Desain dimasukkan ke Slot ${slotIdx + 1}!`, 'success');
    }

    function addCurrentDesignToFirstEmptySlot() {
        const emptyIdx = feedSlotsData.findIndex(s => s === null);
        if (emptyIdx === -1) {
            window.SneakerStudio.App.showToast('Seluruh 9 slot feed sudah penuh!', 'error');
            return;
        }

        fillSlotWithCurrentDesign(emptyIdx);
    }

    function saveFeedPlan() {
        window.SneakerStudio.state.feedPlan = feedSlotsData;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(feedSlotsData));
        } catch (e) {
            console.warn('Gagal menyimpan feed plan:', e);
        }
    }

    function loadFeedPlan() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                feedSlotsData = JSON.parse(saved);
                window.SneakerStudio.state.feedPlan = feedSlotsData;
            }
        } catch (e) {
            console.warn('Gagal memuat feed plan:', e);
        }
    }

    return {
        init: init,
        render: renderSlots
    };
})();
