/**
 * SNEAKERSTUDIO AI — EXPORT ENGINE (CANVA COMPATIBLE)
 * Modul Ekspor Utama: PPTX dengan Objek Terpisah untuk Canva, SVG Vektor, & PNG Pratinjau
 */

window.SneakerStudio = window.SneakerStudio || {};

window.SneakerStudio.Export = (function() {
    function init() {
        // Tombol Download PPTX
        const btnPptx = document.getElementById('btn-download-pptx');
        if (btnPptx) {
            btnPptx.addEventListener('click', function() {
                exportToPPTX();
            });
        }

        // Tombol Download SVG
        const btnSvg = document.getElementById('btn-download-svg');
        if (btnSvg) {
            btnSvg.addEventListener('click', function() {
                exportToSVG();
            });
        }

        // Tombol Download PNG
        const btnPng = document.getElementById('btn-download-png');
        if (btnPng) {
            btnPng.addEventListener('click', function() {
                exportToPNG();
            });
        }
    }

    function updatePreview() {
        const previewImg = document.getElementById('export-preview-img');
        const specsEl = document.getElementById('export-specs');
        if (!previewImg) return;

        const thumb = window.SneakerStudio.Editor.generateThumbnail(600);
        previewImg.src = thumb;

        const dims = window.SneakerStudio.Editor.getDimensions();
        if (specsEl) {
            specsEl.innerHTML = `<span>Resolusi Desain: ${dims.width} × ${dims.height} px</span><span>Rasio: Instagram Ready</span>`;
        }
    }

    // =========================================================================
    // 1. EKSPOR PPTX (FORMAT UTAMA UNTUK CANVA DENGAN OBJEK TERPISAH)
    // =========================================================================
    function exportToPPTX() {
        showLoading('Menyusun file PPTX dengan objek terpisah...');

        setTimeout(() => {
            try {
                if (typeof PptxGenJS === 'undefined') {
                    throw new Error('Pustaka PptxGenJS belum termuat. Periksa koneksi internet.');
                }

                const pptx = new PptxGenJS();
                const dims = window.SneakerStudio.Editor.getDimensions();
                const canvas = window.SneakerStudio.Editor.getCanvasData();
                const objects = canvas.getObjects();

                // Hitung ukuran slide PPTX dalam satuan inci (DPI 96 agar pas dengan rasio Canva)
                const dpi = 96;
                const slideW = dims.width / dpi;
                const slideH = dims.height / dpi;

                pptx.defineLayout({
                    name: 'INSTAGRAM_STORY_FEED',
                    width: slideW,
                    height: slideH
                });
                pptx.layout = 'INSTAGRAM_STORY_FEED';

                const slide = pptx.addSlide();

                // Konversi objek satu per satu
                objects.forEach(obj => {
                    const bound = obj.getBoundingRect(true, true);
                    const xIn = bound.left / dpi;
                    const yIn = bound.top / dpi;
                    const wIn = bound.width / dpi;
                    const hIn = bound.height / dpi;

                    const objType = obj.type;

                    if (objType === 'textbox' || objType === 'text' || objType === 'i-text') {
                        // Kotak teks yang dapat diedit di Canva
                        const fontSizePt = Math.max(8, (obj.fontSize || 20) * 0.75);
                        const fontColor = cleanHex(obj.fill || '#FFFFFF');
                        const fontFam = mapFontForCanva(obj.fontFamily || 'Inter');

                        slide.addText(obj.text || '', {
                            x: xIn,
                            y: yIn,
                            w: wIn,
                            h: hIn,
                            fontFace: fontFam,
                            fontSize: fontSizePt,
                            color: fontColor,
                            bold: (obj.fontWeight === 'bold' || parseInt(obj.fontWeight, 10) >= 700),
                            italic: (obj.fontStyle === 'italic'),
                            align: obj.textAlign || 'left',
                            valign: 'top',
                            margin: 0,
                            wrap: true
                        });
                    } else if (objType === 'rect') {
                        // Kotak bentuk / background terpisah
                        const fillColor = cleanHex(obj.fill || '#111111');
                        const strokeColor = obj.stroke ? cleanHex(obj.stroke) : undefined;

                        const shapeOpt = {
                            x: xIn,
                            y: yIn,
                            w: wIn,
                            h: hIn,
                            fill: { color: fillColor, transparency: obj.opacity !== undefined ? Math.round((1 - obj.opacity) * 100) : 0 }
                        };

                        if (strokeColor && obj.strokeWidth) {
                            shapeOpt.line = { color: strokeColor, width: obj.strokeWidth * 0.75 };
                        }

                        slide.addShape(pptx.ShapeType.rect, shapeOpt);
                    } else if (objType === 'circle') {
                        // Lingkaran bentuk
                        const fillColor = cleanHex(obj.fill || '#C7B79B');
                        slide.addShape(pptx.ShapeType.ellipse, {
                            x: xIn,
                            y: yIn,
                            w: wIn,
                            h: hIn,
                            fill: { color: fillColor }
                        });
                    } else if (objType === 'line') {
                        // Garis pemisah / aksen
                        const strokeColor = cleanHex(obj.stroke || '#C7B79B');
                        slide.addShape(pptx.ShapeType.line, {
                            x: xIn,
                            y: yIn,
                            w: wIn,
                            h: Math.max(0.02, hIn),
                            line: { color: strokeColor, width: (obj.strokeWidth || 1.5) * 0.75 }
                        });
                    } else if (objType === 'image' || objType === 'group') {
                        // Objek foto sepatu / grup logo sebagai objek gambar terpisah
                        try {
                            const dataUrl = obj.toDataURL({ format: 'png' });
                            slide.addImage({
                                data: dataUrl,
                                x: xIn,
                                y: yIn,
                                w: wIn,
                                h: hIn
                            });
                        } catch (imgErr) {
                            console.warn('Gagal mengekspor objek gambar:', imgErr);
                        }
                    }
                });

                // Ekspor ke file PowerPoint .pptx
                const brand = window.SneakerStudio.state.brandSettings;
                const safeName = (brand.businessName || 'SneakerStudio').replace(/[^a-zA-Z0-9_-]/g, '_');
                const fileName = `${safeName}_Instagram_Desain.pptx`;

                pptx.writeFile({ fileName: fileName }).then(() => {
                    hideLoading();
                    window.SneakerStudio.App.showToast('File PPTX berhasil diunduh! Siap diunggah ke Canva.', 'success');
                }).catch(saveErr => {
                    hideLoading();
                    window.SneakerStudio.App.showToast('Terjadi kesalahan saat menyimpan PPTX: ' + saveErr.message, 'error');
                });

            } catch (err) {
                hideLoading();
                window.SneakerStudio.App.showToast('Gagal ekspor PPTX: ' + err.message, 'error');
                console.error(err);
            }
        }, 100);
    }

    // =========================================================================
    // 2. EKSPOR SVG (VEKTOR TERPISAH)
    // =========================================================================
    function exportToSVG() {
        showLoading('Menyiapkan file SVG vektor...');

        setTimeout(() => {
            try {
                const canvas = window.SneakerStudio.Editor.getCanvasData();
                const dims = window.SneakerStudio.Editor.getDimensions();

                // Ambil SVG dari Fabric.js
                const svgContent = canvas.toSVG({
                    suppressPreamble: false,
                    width: dims.width,
                    height: dims.height,
                    viewBox: {
                        x: 0,
                        y: 0,
                        width: dims.width,
                        height: dims.height
                    }
                });

                const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
                const brand = window.SneakerStudio.state.brandSettings;
                const safeName = (brand.businessName || 'SneakerStudio').replace(/[^a-zA-Z0-9_-]/g, '_');
                const fileName = `${safeName}_Instagram_Desain.svg`;

                if (typeof saveAs !== 'undefined') {
                    saveAs(blob, fileName);
                } else {
                    downloadBlobFallback(blob, fileName);
                }

                hideLoading();
                window.SneakerStudio.App.showToast('File SVG berhasil diunduh!', 'success');
            } catch (err) {
                hideLoading();
                window.SneakerStudio.App.showToast('Gagal ekspor SVG: ' + err.message, 'error');
            }
        }, 80);
    }

    // =========================================================================
    // 3. EKSPOR PNG (GAMBAR DATAR RESOLUSI TINGGI SIAP POSTING)
    // =========================================================================
    function exportToPNG() {
        showLoading('Membuat file PNG HD siap posting...');

        setTimeout(() => {
            try {
                const canvas = window.SneakerStudio.Editor.getCanvasData();
                const dims = window.SneakerStudio.Editor.getDimensions();

                const multiplier = dims.width / canvas.getWidth();

                const dataUrl = canvas.toDataURL({
                    format: 'png',
                    quality: 1,
                    multiplier: multiplier
                });

                const blob = dataURLtoBlob(dataUrl);
                const brand = window.SneakerStudio.state.brandSettings;
                const safeName = (brand.businessName || 'SneakerStudio').replace(/[^a-zA-Z0-9_-]/g, '_');
                const fileName = `${safeName}_Instagram_Post.png`;

                if (typeof saveAs !== 'undefined') {
                    saveAs(blob, fileName);
                } else {
                    downloadBlobFallback(blob, fileName);
                }

                hideLoading();
                window.SneakerStudio.App.showToast('Gambar PNG HD berhasil diunduh!', 'success');
            } catch (err) {
                hideLoading();
                window.SneakerStudio.App.showToast('Gagal ekspor PNG: ' + err.message, 'error');
            }
        }, 80);
    }

    // Helper Pembersih Warna HEX untuk PptxGenJS (harus 6 digit tanpa tanda #)
    function cleanHex(colorStr) {
        if (!colorStr) return '111111';
        let hex = colorStr.toString().trim();
        if (hex.startsWith('#')) {
            hex = hex.substring(1);
        }
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        if (hex.length > 6) {
            hex = hex.substring(0, 6);
        }
        return hex.toUpperCase();
    }

    // Pemetaan Font agar kompatibel di Canva
    function mapFontForCanva(font) {
        const supported = ['Inter', 'Playfair Display', 'Montserrat', 'Poppins', 'Oswald', 'Arial', 'Georgia'];
        if (supported.includes(font)) return font;
        return 'Inter';
    }

    function dataURLtoBlob(dataurl) {
        const arr = dataurl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }

    function downloadBlobFallback(blob, filename) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    function showLoading(msg) {
        const overlay = document.getElementById('loading-overlay');
        const msgEl = document.getElementById('loading-message');
        if (msgEl && msg) msgEl.textContent = msg;
        if (overlay) overlay.classList.add('active');
    }

    function hideLoading() {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) overlay.classList.remove('active');
    }

    return {
        init: init,
        updatePreview: updatePreview,
        toPPTX: exportToPPTX,
        toSVG: exportToSVG,
        toPNG: exportToPNG
    };
})();
