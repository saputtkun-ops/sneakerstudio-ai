/**
 * SNEAKERSTUDIO AI — VISUAL CANVAS EDITOR
 * Engine Editor Interaktif berbasis Fabric.js untuk Menyesuaikan Elemen Desain
 */

window.SneakerStudio = window.SneakerStudio || {};

window.SneakerStudio.Editor = (function() {
    let canvas = null;
    let actualWidth = 1080;
    let actualHeight = 1350;
    let displayScale = 1;

    let history = [];
    let historyIndex = -1;
    let isHistoryLocked = false;

    // Dimensi per format
    const formatDimensions = {
        portrait: { width: 1080, height: 1350 },
        square: { width: 1080, height: 1080 },
        story: { width: 1080, height: 1920 },
        carousel: { width: 1080, height: 1350 }
    };

    function init() {
        const canvasEl = document.getElementById('editor-canvas');
        if (!canvasEl) return;

        // Inisialisasi Fabric Canvas
        canvas = new fabric.Canvas('editor-canvas', {
            preserveObjectStacking: true,
            selection: true
        });

        window.SneakerStudio.state.editor.canvas = canvas;

        setupToolbar();
        setupPropertiesPanel();
        setupCanvasEvents();
        setupKeyboardShortcuts();
        setupWindowResize();
    }

    function getDimensionsForFormat(format) {
        return formatDimensions[format] || formatDimensions.portrait;
    }

    function updateCanvasDisplaySize() {
        if (!canvas) return;
        const viewport = document.getElementById('canvas-viewport');
        if (!viewport) return;

        const availW = Math.max(300, viewport.clientWidth - 48);
        const availH = Math.max(400, viewport.clientHeight - 48);

        const scaleW = availW / actualWidth;
        const scaleH = availH / actualHeight;
        displayScale = Math.min(scaleW, scaleH, 0.65); // Maksimal scale 0.65 agar pas di layar

        const dispW = actualWidth * displayScale;
        const dispH = actualHeight * displayScale;

        canvas.setWidth(dispW);
        canvas.setHeight(dispH);
        canvas.setZoom(displayScale);
        canvas.renderAll();
    }

    function setupWindowResize() {
        window.addEventListener('resize', function() {
            updateCanvasDisplaySize();
        });
    }

    function setupCanvasEvents() {
        canvas.on('selection:created', onObjectSelected);
        canvas.on('selection:updated', onObjectSelected);
        canvas.on('selection:cleared', onObjectCleared);

        canvas.on('object:modified', function() {
            saveHistory();
        });

        canvas.on('object:added', function() {
            if (!isHistoryLocked) saveHistory();
        });

        canvas.on('object:removed', function() {
            if (!isHistoryLocked) saveHistory();
        });
    }

    function onObjectSelected(e) {
        const active = e.selected ? e.selected[0] : canvas.getActiveObject();
        if (!active) {
            onObjectCleared();
            return;
        }

        const emptyMsg = document.getElementById('prop-empty-state');
        const textGroup = document.getElementById('prop-text-group');
        const shapeGroup = document.getElementById('prop-shape-group');

        if (emptyMsg) emptyMsg.classList.add('hidden');

        // Jika objek Teks
        if (active.type === 'textbox' || active.type === 'text' || active.type === 'i-text') {
            if (textGroup) textGroup.classList.remove('hidden');
            if (shapeGroup) shapeGroup.classList.add('hidden');

            const txtContent = document.getElementById('prop-text-content');
            const txtFont = document.getElementById('prop-text-font');
            const txtSize = document.getElementById('prop-text-size');
            const txtColor = document.getElementById('prop-text-color');

            if (txtContent) txtContent.value = active.text || '';
            if (txtFont) txtFont.value = active.fontFamily || 'Inter';
            if (txtSize) txtSize.value = Math.round(active.fontSize || 24);
            if (txtColor) txtColor.value = active.fill ? toHexColor(active.fill) : '#FFFFFF';

            updateAlignButtons(active.textAlign || 'left');
        } else {
            // Objek Bentuk / Gambar
            if (textGroup) textGroup.classList.add('hidden');
            if (shapeGroup) shapeGroup.classList.remove('hidden');

            const shapeFill = document.getElementById('prop-shape-fill');
            const shapeOpacity = document.getElementById('prop-shape-opacity');
            const labelFill = document.getElementById('label-shape-fill');

            if (shapeFill && active.fill && typeof active.fill === 'string') {
                const hex = toHexColor(active.fill);
                shapeFill.value = hex;
                if (labelFill) labelFill.textContent = hex;
            }
            if (shapeOpacity) {
                shapeOpacity.value = active.opacity !== undefined ? active.opacity : 1;
            }
        }
    }

    function onObjectCleared() {
        const emptyMsg = document.getElementById('prop-empty-state');
        const textGroup = document.getElementById('prop-text-group');
        const shapeGroup = document.getElementById('prop-shape-group');

        if (emptyMsg) emptyMsg.classList.remove('hidden');
        if (textGroup) textGroup.classList.add('hidden');
        if (shapeGroup) shapeGroup.classList.add('hidden');
    }

    function updateAlignButtons(align) {
        ['left', 'center', 'right'].forEach(a => {
            const btn = document.getElementById(`btn-align-${a}`);
            if (btn) {
                btn.classList.toggle('active', a === align);
            }
        });
    }

    function setupPropertiesPanel() {
        // Teks Input
        const txtContent = document.getElementById('prop-text-content');
        if (txtContent) {
            txtContent.addEventListener('input', function() {
                const active = canvas.getActiveObject();
                if (active && (active.type === 'textbox' || active.type === 'text')) {
                    active.set('text', this.value);
                    canvas.renderAll();
                }
            });
        }

        // Font Family
        const txtFont = document.getElementById('prop-text-font');
        if (txtFont) {
            txtFont.addEventListener('change', function() {
                const active = canvas.getActiveObject();
                if (active) {
                    active.set('fontFamily', this.value);
                    canvas.renderAll();
                    saveHistory();
                }
            });
        }

        // Font Size
        const txtSize = document.getElementById('prop-text-size');
        if (txtSize) {
            txtSize.addEventListener('input', function() {
                const active = canvas.getActiveObject();
                if (active) {
                    active.set('fontSize', parseInt(this.value, 10) || 20);
                    canvas.renderAll();
                }
            });
        }

        // Warna Teks
        const txtColor = document.getElementById('prop-text-color');
        if (txtColor) {
            txtColor.addEventListener('input', function() {
                const active = canvas.getActiveObject();
                if (active) {
                    active.set('fill', this.value);
                    canvas.renderAll();
                }
            });
            txtColor.addEventListener('change', function() {
                saveHistory();
            });
        }

        // Text Align
        ['left', 'center', 'right'].forEach(a => {
            const btn = document.getElementById(`btn-align-${a}`);
            if (btn) {
                btn.addEventListener('click', function() {
                    const active = canvas.getActiveObject();
                    if (active) {
                        active.set('textAlign', a);
                        canvas.renderAll();
                        updateAlignButtons(a);
                        saveHistory();
                    }
                });
            }
        });

        // Warna Bentuk
        const shapeFill = document.getElementById('prop-shape-fill');
        const labelFill = document.getElementById('label-shape-fill');
        if (shapeFill) {
            shapeFill.addEventListener('input', function() {
                const active = canvas.getActiveObject();
                if (active) {
                    active.set('fill', this.value);
                    if (labelFill) labelFill.textContent = this.value;
                    canvas.renderAll();
                }
            });
            shapeFill.addEventListener('change', function() {
                saveHistory();
            });
        }

        // Opacity
        const shapeOpacity = document.getElementById('prop-shape-opacity');
        if (shapeOpacity) {
            shapeOpacity.addEventListener('input', function() {
                const active = canvas.getActiveObject();
                if (active) {
                    active.set('opacity', parseFloat(this.value));
                    canvas.renderAll();
                }
            });
            shapeOpacity.addEventListener('change', function() {
                saveHistory();
            });
        }

        // Quick Color Palette
        const quickDots = document.querySelectorAll('.quick-color-dot');
        quickDots.forEach(dot => {
            dot.addEventListener('click', function() {
                const color = this.getAttribute('data-color');
                const active = canvas.getActiveObject();
                if (active) {
                    active.set('fill', color);
                    canvas.renderAll();
                    if (active.type === 'textbox') {
                        const txtColor = document.getElementById('prop-text-color');
                        if (txtColor) txtColor.value = color;
                    } else {
                        const shapeFill = document.getElementById('prop-shape-fill');
                        if (shapeFill) shapeFill.value = color;
                    }
                    saveHistory();
                }
            });
        });
    }

    function setupToolbar() {
        // Mode Pilih
        const toolSelect = document.getElementById('tool-select');
        if (toolSelect) {
            toolSelect.addEventListener('click', function() {
                canvas.isDrawingMode = false;
                setActiveTool('tool-select');
            });
        }

        // Tambah Teks
        const toolAddText = document.getElementById('tool-add-text');
        if (toolAddText) {
            toolAddText.addEventListener('click', function() {
                const textbox = new fabric.Textbox('Teks Baru', {
                    left: actualWidth * 0.2,
                    top: actualHeight * 0.4,
                    width: actualWidth * 0.6,
                    fontSize: 36,
                    fontFamily: 'Montserrat',
                    fontWeight: 700,
                    fill: '#FFFFFF',
                    textAlign: 'center'
                });
                canvas.add(textbox);
                canvas.setActiveObject(textbox);
                canvas.renderAll();
                saveHistory();
                window.SneakerStudio.App.showToast('Elemen teks ditambahkan!', 'info');
            });
        }

        // Tambah Kotak
        const toolAddRect = document.getElementById('tool-add-rect');
        if (toolAddRect) {
            toolAddRect.addEventListener('click', function() {
                const rect = new fabric.Rect({
                    left: actualWidth * 0.3,
                    top: actualHeight * 0.4,
                    width: 300,
                    height: 120,
                    fill: '#C7B79B',
                    rx: 8,
                    ry: 8
                });
                canvas.add(rect);
                canvas.setActiveObject(rect);
                canvas.renderAll();
                saveHistory();
                window.SneakerStudio.App.showToast('Bentuk kotak ditambahkan!', 'info');
            });
        }

        // Tambah Lingkaran
        const toolAddCircle = document.getElementById('tool-add-circle');
        if (toolAddCircle) {
            toolAddCircle.addEventListener('click', function() {
                const circle = new fabric.Circle({
                    left: actualWidth * 0.35,
                    top: actualHeight * 0.4,
                    radius: 120,
                    fill: '#111111',
                    stroke: '#C7B79B',
                    strokeWidth: 3
                });
                canvas.add(circle);
                canvas.setActiveObject(circle);
                canvas.renderAll();
                saveHistory();
                window.SneakerStudio.App.showToast('Bentuk lingkaran ditambahkan!', 'info');
            });
        }

        // Tambah Garis
        const toolAddLine = document.getElementById('tool-add-line');
        if (toolAddLine) {
            toolAddLine.addEventListener('click', function() {
                const line = new fabric.Line([actualWidth * 0.1, actualHeight * 0.5, actualWidth * 0.9, actualHeight * 0.5], {
                    stroke: '#C7B79B',
                    strokeWidth: 2
                });
                canvas.add(line);
                canvas.setActiveObject(line);
                canvas.renderAll();
                saveHistory();
                window.SneakerStudio.App.showToast('Garis aksen ditambahkan!', 'info');
            });
        }

        // Ganti Foto
        const toolChangePhoto = document.getElementById('tool-change-photo');
        const inputReplace = document.getElementById('input-replace-photo');
        if (toolChangePhoto && inputReplace) {
            toolChangePhoto.addEventListener('click', function() {
                inputReplace.click();
            });

            inputReplace.addEventListener('change', function(e) {
                if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.onload = function(ev) {
                        const newUrl = ev.target.result;
                        fabric.Image.fromURL(newUrl, function(img) {
                            img.set({
                                left: actualWidth * 0.1,
                                top: actualHeight * 0.25,
                                scaleX: (actualWidth * 0.8) / img.width,
                                scaleY: (actualWidth * 0.8) / img.width
                            });
                            canvas.add(img);
                            canvas.setActiveObject(img);
                            canvas.renderAll();
                            saveHistory();
                            window.SneakerStudio.App.showToast('Foto baru berhasil disisipkan!', 'success');
                        });
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        // Terapkan Logo Merek
        const toolApplyBrand = document.getElementById('tool-apply-brand');
        if (toolApplyBrand) {
            toolApplyBrand.addEventListener('click', function() {
                const brand = window.SneakerStudio.state.brandSettings;
                const brandGroup = new fabric.Group([
                    new fabric.Rect({
                        width: 220,
                        height: 50,
                        fill: '#111111',
                        rx: 6,
                        ry: 6
                    }),
                    new fabric.Text((brand.businessName || 'SNEAKER CARE').toUpperCase(), {
                        fontSize: 14,
                        fontFamily: 'Montserrat',
                        fontWeight: 700,
                        fill: '#C7B79B',
                        originX: 'center',
                        originY: 'center',
                        left: 110,
                        top: 25
                    })
                ], {
                    left: actualWidth * 0.08,
                    top: actualHeight * 0.06
                });

                canvas.add(brandGroup);
                canvas.setActiveObject(brandGroup);
                canvas.renderAll();
                saveHistory();
                window.SneakerStudio.App.showToast('Badge brand ditambahkan!', 'info');
            });
        }

        // Maju / Mundur Layer
        const btnForward = document.getElementById('tool-bring-forward');
        if (btnForward) {
            btnForward.addEventListener('click', function() {
                const active = canvas.getActiveObject();
                if (active) {
                    canvas.bringForward(active);
                    canvas.renderAll();
                    saveHistory();
                }
            });
        }

        const btnBackward = document.getElementById('tool-send-backward');
        if (btnBackward) {
            btnBackward.addEventListener('click', function() {
                const active = canvas.getActiveObject();
                if (active) {
                    canvas.sendBackwards(active);
                    // Pastikan background tetap di dasar jika ada
                    ensureBackgroundStaysAtBottom();
                    canvas.renderAll();
                    saveHistory();
                }
            });
        }

        // Hapus Objek
        const btnDelete = document.getElementById('tool-delete-object');
        if (btnDelete) {
            btnDelete.addEventListener('click', deleteActiveObject);
        }

        // Undo & Redo Top Bar
        const btnUndo = document.getElementById('btn-undo');
        if (btnUndo) btnUndo.addEventListener('click', undo);

        const btnRedo = document.getElementById('btn-redo');
        if (btnRedo) btnRedo.addEventListener('click', redo);
    }

    function ensureBackgroundStaysAtBottom() {
        const objs = canvas.getObjects();
        const bg = objs.find(o => o.name === 'background');
        if (bg) {
            canvas.sendToBack(bg);
        }
    }

    function setActiveTool(toolId) {
        document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
        const btn = document.getElementById(toolId);
        if (btn) btn.classList.add('active');
    }

    function deleteActiveObject() {
        const active = canvas.getActiveObject();
        if (active && active.name !== 'background') {
            canvas.remove(active);
            canvas.discardActiveObject();
            canvas.renderAll();
            saveHistory();
            window.SneakerStudio.App.showToast('Elemen dihapus.', 'info');
        }
    }

    function setupKeyboardShortcuts() {
        window.addEventListener('keydown', function(e) {
            // Cek jika user sedang mengetik di input/textarea
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            if (e.key === 'Delete' || e.key === 'Backspace') {
                deleteActiveObject();
            } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
                e.preventDefault();
                undo();
            } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
                e.preventDefault();
                redo();
            }
        });
    }

    // MEMUAT TEMPLATE KE KANVAS SECARA LENGKAP
    function loadTemplate(template) {
        if (!canvas) init();

        const format = window.SneakerStudio.state.selectedFormat || 'portrait';
        const dims = getDimensionsForFormat(format);
        actualWidth = dims.width;
        actualHeight = dims.height;

        // Tampilkan nama template
        const titleEl = document.getElementById('editor-design-title');
        if (titleEl) titleEl.textContent = template.name;

        // Reset history
        history = [];
        historyIndex = -1;
        isHistoryLocked = true;

        canvas.clear();
        updateCanvasDisplaySize();

        const photos = window.SneakerStudio.state.uploadedPhotos;
        const brand = window.SneakerStudio.state.brandSettings;

        const elementConfigs = template.createElements(actualWidth, actualHeight, photos, brand);

        // Render elemen satu per satu
        let pendingImages = 0;

        elementConfigs.forEach(cfg => {
            if (cfg.type === 'rect') {
                const r = new fabric.Rect(cfg);
                canvas.add(r);
            } else if (cfg.type === 'textbox') {
                const t = new fabric.Textbox(cfg.text, cfg);
                canvas.add(t);
            } else if (cfg.type === 'circle') {
                const c = new fabric.Circle(cfg);
                canvas.add(c);
            } else if (cfg.type === 'line') {
                const l = new fabric.Line(cfg.points, cfg);
                canvas.add(l);
            } else if (cfg.type === 'image-placeholder') {
                pendingImages++;
                handleImagePlaceholder(cfg, photos, function(imgObj) {
                    canvas.add(imgObj);
                    pendingImages--;
                    if (pendingImages === 0) {
                        finishTemplateLoad();
                    }
                });
            }
        });

        if (pendingImages === 0) {
            finishTemplateLoad();
        }
    }

    function handleImagePlaceholder(cfg, photos, callback) {
        // Cek apakah ada foto yang sesuai
        const photoKey = (cfg.id === 'after-photo') ? 'after' : 'main';
        const photoData = photos[photoKey];

        if (photoData && photoData.dataUrl) {
            fabric.Image.fromURL(photoData.dataUrl, function(img) {
                // Skalakan foto agar muat proporsional di dalam placeholder
                const scale = Math.max(cfg.width / img.width, cfg.height / img.height);
                img.set({
                    left: cfg.left,
                    top: cfg.top,
                    scaleX: scale,
                    scaleY: scale,
                    name: cfg.name || 'shoe-photo'
                });
                // Clip path agar rapi
                const clip = new fabric.Rect({
                    left: cfg.left,
                    top: cfg.top,
                    width: cfg.width,
                    height: cfg.height,
                    absolutePositioned: true
                });
                img.clipPath = clip;
                callback(img);
            });
        } else {
            // Placeholder grafis jika foto sesudah belum diunggah
            const placeholderGroup = new fabric.Group([
                new fabric.Rect({
                    width: cfg.width,
                    height: cfg.height,
                    fill: '#222222',
                    stroke: '#444444',
                    strokeWidth: 2,
                    strokeDashArray: [6, 6]
                }),
                new fabric.Text(cfg.id === 'after-photo' ? 'FOTO SESUDAH CUCI\n(Belum Diunggah)' : 'FOTO SEPATU UTAMA', {
                    fontSize: 20,
                    fontFamily: 'Montserrat',
                    fontWeight: 700,
                    fill: '#8A8A85',
                    textAlign: 'center',
                    originX: 'center',
                    originY: 'center',
                    left: cfg.width / 2,
                    top: cfg.height / 2
                })
            ], {
                left: cfg.left,
                top: cfg.top,
                name: cfg.name || 'photo-placeholder'
            });
            callback(placeholderGroup);
        }
    }

    function finishTemplateLoad() {
        canvas.renderAll();
        isHistoryLocked = false;
        saveHistory();
    }

    // MANAJEMEN RIWAYAT UNDO / REDO
    function saveHistory() {
        if (isHistoryLocked || !canvas) return;
        const json = JSON.stringify(canvas.toJSON(['name', 'selectable', 'evented', 'id']));

        // Potong riwayat setelah indeks saat ini
        if (historyIndex < history.length - 1) {
            history = history.slice(0, historyIndex + 1);
        }

        history.push(json);
        if (history.length > 30) history.shift();
        historyIndex = history.length - 1;
    }

    function undo() {
        if (historyIndex > 0) {
            isHistoryLocked = true;
            historyIndex--;
            canvas.loadFromJSON(history[historyIndex], function() {
                canvas.renderAll();
                isHistoryLocked = false;
                window.SneakerStudio.App.showToast('Perubahan diurungkan.', 'info');
            });
        }
    }

    function redo() {
        if (historyIndex < history.length - 1) {
            isHistoryLocked = true;
            historyIndex++;
            canvas.loadFromJSON(history[historyIndex], function() {
                canvas.renderAll();
                isHistoryLocked = false;
                window.SneakerStudio.App.showToast('Perubahan diulangi.', 'info');
            });
        }
    }

    function generateThumbnail(maxDim = 400) {
        if (!canvas) return '';
        const mult = maxDim / Math.max(actualWidth, actualHeight);
        return canvas.toDataURL({
            format: 'png',
            quality: 0.9,
            multiplier: mult / displayScale
        });
    }

    function toHexColor(color) {
        if (!color) return '#111111';
        if (color.startsWith('#')) return color;
        // Tangani rgb / rgba jika perlu
        return '#111111';
    }

    return {
        init: init,
        loadTemplate: loadTemplate,
        getCanvasData: function() { return canvas; },
        getObjects: function() { return canvas ? canvas.getObjects() : []; },
        getDimensions: function() { return { width: actualWidth, height: actualHeight }; },
        generateThumbnail: generateThumbnail,
        saveHistory: saveHistory,
        undo: undo,
        redo: redo
    };
})();
