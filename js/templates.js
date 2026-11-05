/**
 * SNEAKERSTUDIO AI — TEMPLATES ENGINE
 * Koleksi Template Desain Instagram Lengkap Khusus Bisnis Cuci Sepatu & Sneaker Care
 */

window.SneakerStudio = window.SneakerStudio || {};

window.SneakerStudio.Templates = (function() {
    // 8 KATEGORI UTAMA
    const categories = [
        {
            id: 'promosi',
            name: 'Promosi Layanan',
            desc: 'Promosikan keunggulan jasa cuci & treatment sepatu Anda secara elegan.',
            icon: 'megaphone'
        },
        {
            id: 'harga',
            name: 'Daftar Harga Layanan',
            desc: 'Daftar menu treatment sepatu, cuci reguler, repaint, hingga deep clean transparan.',
            icon: 'pricetag'
        },
        {
            id: 'before-after',
            name: 'Sebelum & Sesudah',
            desc: 'Tampilkan perbandingan kondisi kotor vs kinclong hasil pengerjaan nyata.',
            icon: 'compare'
        },
        {
            id: 'tips',
            name: 'Tips Perawatan Sneakers',
            desc: 'Edukasi pelanggan seputar cara merawat sepatu, bahan suede, canvas, & kulit.',
            icon: 'lightbulb'
        },
        {
            id: 'proses',
            name: 'Proses Pengerjaan',
            desc: 'Perlihatkan kehati-hatian teknisi saat mencuci, sikat khusus, & pengeringan alami.',
            icon: 'workflow'
        },
        {
            id: 'testimoni',
            name: 'Testimoni Pelanggan',
            desc: 'Bukti kepuasan pelanggan, ulasan bintang 5, & feedback positif pengguna.',
            icon: 'star'
        },
        {
            id: 'promo-paket',
            name: 'Promo & Paket Spesial',
            desc: 'Paket bundling cuci 2 pasang gratis 1, diskon weekend, & penawaran terbatas.',
            icon: 'gift'
        },
        {
            id: 'pengenalan',
            name: 'Pengenalan Profil Bisnis',
            desc: 'Kenalkan lokasi workshop, komitmen kualitas, & jangkauan antar-jemput.',
            icon: 'store'
        }
    ];

    // Helper membuat elemen background solid
    function createBg(width, height, color = '#111111') {
        return {
            type: 'rect',
            left: 0,
            top: 0,
            width: width,
            height: height,
            fill: color,
            selectable: false,
            evented: false,
            name: 'background'
        };
    }

    // Helper banner brand header
    function createBrandHeader(width, brand, top = 50, lightTheme = false) {
        return [
            {
                type: 'textbox',
                left: width * 0.08,
                top: top,
                width: width * 0.84,
                text: (brand.businessName || 'Nama Bisnis Kamu').toUpperCase(),
                fontSize: 26,
                fontFamily: 'Montserrat',
                fontWeight: 700,
                fill: lightTheme ? '#111111' : '#FFFFFF',
                textAlign: 'left',
                charSpacing: 80,
                name: 'brand-name'
            },
            {
                type: 'textbox',
                left: width * 0.08,
                top: top + 34,
                width: width * 0.84,
                text: brand.tagline || 'Perawatan Sneakers Profesional',
                fontSize: 16,
                fontFamily: 'Inter',
                fill: lightTheme ? '#8A8A85' : '#C7B79B',
                textAlign: 'left',
                name: 'brand-tagline'
            }
        ];
    }

    // Helper footer kontak
    function createBrandFooter(width, height, brand, lightTheme = false) {
        const topY = height - 90;
        return [
            {
                type: 'line',
                points: [width * 0.08, topY, width * 0.92, topY],
                stroke: lightTheme ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.15)',
                strokeWidth: 1.5,
                selectable: false,
                name: 'footer-divider'
            },
            {
                type: 'textbox',
                left: width * 0.08,
                top: topY + 20,
                width: width * 0.45,
                text: 'Instagram: ' + (brand.instagram || '@namabisnis'),
                fontSize: 18,
                fontFamily: 'Inter',
                fontWeight: 500,
                fill: lightTheme ? '#111111' : '#FFFFFF',
                textAlign: 'left',
                name: 'footer-ig'
            },
            {
                type: 'textbox',
                left: width * 0.48,
                top: topY + 20,
                width: width * 0.44,
                text: 'WA: ' + (brand.whatsapp || '0812-3456-7890'),
                fontSize: 18,
                fontFamily: 'Inter',
                fontWeight: 600,
                fill: '#C7B79B',
                textAlign: 'right',
                name: 'footer-wa'
            }
        ];
    }

    // Koleksi 48 Desain Lengkap (6 desain x 8 kategori)
    const templates = [
        // =========================================================================
        // KATEGORI 1: PROMOSI LAYANAN (6 DESAIN)
        // =========================================================================
        {
            id: 'promosi-1',
            category: 'promosi',
            name: 'Dark Premium Clean',
            description: 'Gaya gelap eksklusif dengan fokus foto sepatu besar dan tipografi serif megah.',
            createElements: function(w, h, photos, brand) {
                return [
                    createBg(w, h, '#111111'),
                    ...createBrandHeader(w, brand, h * 0.06, false),
                    {
                        type: 'image-placeholder',
                        id: 'main-photo',
                        left: w * 0.08,
                        top: h * 0.17,
                        width: w * 0.84,
                        height: h * 0.48,
                        name: 'main-shoe-photo'
                    },
                    {
                        type: 'rect',
                        left: w * 0.08,
                        top: h * 0.68,
                        width: 140,
                        height: 34,
                        fill: '#C7B79B',
                        rx: 4,
                        ry: 4,
                        name: 'badge-pill'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.68 + 7,
                        width: 140,
                        text: 'DEEP CLEANING',
                        fontSize: 14,
                        fontFamily: 'Montserrat',
                        fontWeight: 700,
                        fill: '#111111',
                        textAlign: 'center',
                        charSpacing: 50,
                        name: 'badge-text'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.73,
                        width: w * 0.84,
                        text: 'Kembalikan Kilau\nSepatu Favorit Anda.',
                        fontSize: 48,
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fill: '#FFFFFF',
                        lineHeight: 1.15,
                        name: 'main-headline'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.85,
                        width: w * 0.84,
                        text: 'Treatment mencuci hingga ke serat terdalam dengan sabun premium khusus sneakers tanpa merusak warna & tekstur.',
                        fontSize: 18,
                        fontFamily: 'Inter',
                        fill: '#8A8A85',
                        lineHeight: 1.4,
                        name: 'sub-desc'
                    },
                    ...createBrandFooter(w, h, brand, false)
                ];
            }
        },
        {
            id: 'promosi-2',
            category: 'promosi',
            name: 'Ivory Minimalist Split',
            description: 'Latar putih gading dengan komposisi split vertikal yang elegan.',
            createElements: function(w, h, photos, brand) {
                return [
                    createBg(w, h, '#F7F5F0'),
                    {
                        type: 'rect',
                        left: w * 0.52,
                        top: 0,
                        width: w * 0.48,
                        height: h,
                        fill: '#111111',
                        selectable: false,
                        name: 'split-bg'
                    },
                    ...createBrandHeader(w * 0.5, brand, h * 0.08, true),
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.25,
                        width: w * 0.4,
                        text: 'SNEAKER\nTREATMENT\nTERBAIK.',
                        fontSize: 46,
                        fontFamily: 'Montserrat',
                        fontWeight: 800,
                        fill: '#111111',
                        lineHeight: 1.05,
                        name: 'headline-text'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.52,
                        width: w * 0.38,
                        text: 'Perawatan detail untuk midsole, insole, outsole, hingga tali sepatu. Layanan antar-jemput siap membantu.',
                        fontSize: 17,
                        fontFamily: 'Inter',
                        fill: '#8A8A85',
                        lineHeight: 1.45,
                        name: 'desc-text'
                    },
                    {
                        type: 'rect',
                        left: w * 0.08,
                        top: h * 0.70,
                        width: 200,
                        height: 52,
                        fill: '#111111',
                        rx: 6,
                        ry: 6,
                        name: 'cta-btn'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.70 + 15,
                        width: 200,
                        text: 'Pesan Sekarang &rarr;',
                        fontSize: 16,
                        fontFamily: 'Inter',
                        fontWeight: 600,
                        fill: '#C7B79B',
                        textAlign: 'center',
                        name: 'cta-text'
                    },
                    {
                        type: 'image-placeholder',
                        id: 'main-photo',
                        left: w * 0.48,
                        top: h * 0.15,
                        width: w * 0.46,
                        height: h * 0.70,
                        name: 'split-photo'
                    },
                    ...createBrandFooter(w, h, brand, true)
                ];
            }
        },
        {
            id: 'promosi-3',
            category: 'promosi',
            name: 'Editorial Luxury Frame',
            description: 'Gaya majalah mode streetwear dengan garis bingkai tipis berwarna beige.',
            createElements: function(w, h, photos, brand) {
                return [
                    createBg(w, h, '#111111'),
                    {
                        type: 'rect',
                        left: w * 0.05,
                        top: h * 0.04,
                        width: w * 0.90,
                        height: h * 0.92,
                        fill: 'transparent',
                        stroke: '#C7B79B',
                        strokeWidth: 2,
                        selectable: false,
                        name: 'frame-border'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.1,
                        top: h * 0.08,
                        width: w * 0.8,
                        text: 'S N E A K E R   C A R E   S T U D I O',
                        fontSize: 15,
                        fontFamily: 'Montserrat',
                        fontWeight: 700,
                        fill: '#C7B79B',
                        textAlign: 'center',
                        name: 'top-tag'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.1,
                        top: h * 0.12,
                        width: w * 0.8,
                        text: 'Spesialis Kebersihan & Restorasi',
                        fontSize: 38,
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fontStyle: 'italic',
                        fill: '#FFFFFF',
                        textAlign: 'center',
                        name: 'headline-serif'
                    },
                    {
                        type: 'image-placeholder',
                        id: 'main-photo',
                        left: w * 0.12,
                        top: h * 0.23,
                        width: w * 0.76,
                        height: h * 0.50,
                        name: 'framed-photo'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.12,
                        top: h * 0.77,
                        width: w * 0.76,
                        text: 'Percayakan sepatu berharga Anda pada ahlinya. Formula pembersih alami, perlindungan water-repellent, & pewarnaan presisi.',
                        fontSize: 18,
                        fontFamily: 'Inter',
                        fill: '#ECEAE5',
                        textAlign: 'center',
                        lineHeight: 1.45,
                        name: 'caption-text'
                    },
                    ...createBrandFooter(w, h, brand, false)
                ];
            }
        },
        {
            id: 'promosi-4',
            category: 'promosi',
            name: 'Bold Streetwear Poster',
            description: 'Desain poster tipografi tebal bernuansa sneaker culture kontemporer.',
            createElements: function(w, h, photos, brand) {
                return [
                    createBg(w, h, '#F1ECE3'),
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.06,
                        width: w * 0.84,
                        text: 'DIRTY KICKS?',
                        fontSize: 64,
                        fontFamily: 'Oswald',
                        fontWeight: 700,
                        fill: '#111111',
                        lineHeight: 0.95,
                        name: 'big-title'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.14,
                        width: w * 0.84,
                        text: 'WE BRING THEM BACK TO LIFE.',
                        fontSize: 26,
                        fontFamily: 'Montserrat',
                        fontWeight: 800,
                        fill: '#C7B79B',
                        name: 'subtitle'
                    },
                    {
                        type: 'image-placeholder',
                        id: 'main-photo',
                        left: w * 0.08,
                        top: h * 0.20,
                        width: w * 0.84,
                        height: h * 0.56,
                        name: 'street-photo'
                    },
                    {
                        type: 'rect',
                        left: w * 0.08,
                        top: h * 0.79,
                        width: w * 0.84,
                        height: 72,
                        fill: '#111111',
                        rx: 8,
                        ry: 8,
                        name: 'box-info'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.12,
                        top: h * 0.79 + 18,
                        width: w * 0.76,
                        text: 'Jasa Cuci Cepat 24 Jam • Free Pick Up & Delivery*',
                        fontSize: 18,
                        fontFamily: 'Inter',
                        fontWeight: 600,
                        fill: '#FFFFFF',
                        textAlign: 'center',
                        name: 'box-text'
                    },
                    ...createBrandFooter(w, h, brand, true)
                ];
            }
        },
        {
            id: 'promosi-5',
            category: 'promosi',
            name: 'Center Focus Badge',
            description: 'Lingkaran aksen beige di tengah menonjolkan produk sepatu secara dramatis.',
            createElements: function(w, h, photos, brand) {
                return [
                    createBg(w, h, '#111111'),
                    {
                        type: 'circle',
                        left: w * 0.5 - (w * 0.38),
                        top: h * 0.28,
                        radius: w * 0.38,
                        fill: 'rgba(199, 183, 155, 0.12)',
                        stroke: '#C7B79B',
                        strokeWidth: 1.5,
                        selectable: false,
                        name: 'center-circle'
                    },
                    ...createBrandHeader(w, brand, h * 0.07, false),
                    {
                        type: 'image-placeholder',
                        id: 'main-photo',
                        left: w * 0.12,
                        top: h * 0.24,
                        width: w * 0.76,
                        height: h * 0.44,
                        name: 'circle-shoe-photo'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.72,
                        width: w * 0.84,
                        text: 'Pilihan Tepat untuk Koleksi Sneakers Berharga Anda',
                        fontSize: 34,
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fill: '#FFFFFF',
                        textAlign: 'center',
                        lineHeight: 1.25,
                        name: 'badge-headline'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.12,
                        top: h * 0.83,
                        width: w * 0.76,
                        text: 'Teknik pengerjaan manual tanpa mesin cuci kasar. Aman untuk suede, nubuck, knit, & mesh.',
                        fontSize: 17,
                        fontFamily: 'Inter',
                        fill: '#8A8A85',
                        textAlign: 'center',
                        name: 'badge-desc'
                    },
                    ...createBrandFooter(w, h, brand, false)
                ];
            }
        },
        {
            id: 'promosi-6',
            category: 'promosi',
            name: 'Modern Diagonal Accent',
            description: 'Sentuhan garis diagonal modern dengan blok warna kontras tinggi.',
            createElements: function(w, h, photos, brand) {
                return [
                    createBg(w, h, '#1A1A1A'),
                    {
                        type: 'rect',
                        left: 0,
                        top: 0,
                        width: w,
                        height: h * 0.42,
                        fill: '#111111',
                        selectable: false,
                        name: 'top-block'
                    },
                    {
                        type: 'line',
                        points: [0, h * 0.42, w, h * 0.42],
                        stroke: '#C7B79B',
                        strokeWidth: 3,
                        selectable: false,
                        name: 'accent-bar'
                    },
                    ...createBrandHeader(w, brand, h * 0.06, false),
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.17,
                        width: w * 0.84,
                        text: 'SOLUSI SEPATU BERSIH TANPA REPOT',
                        fontSize: 36,
                        fontFamily: 'Montserrat',
                        fontWeight: 800,
                        fill: '#C7B79B',
                        name: 'diag-title'
                    },
                    {
                        type: 'image-placeholder',
                        id: 'main-photo',
                        left: w * 0.08,
                        top: h * 0.30,
                        width: w * 0.84,
                        height: h * 0.46,
                        name: 'diag-photo'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.79,
                        width: w * 0.84,
                        text: 'Tinggal hubungi via WhatsApp, kurir kami siap menjemput dan mengantar sepatu Anda kembali bersih wangi.',
                        fontSize: 18,
                        fontFamily: 'Inter',
                        fill: '#ECEAE5',
                        lineHeight: 1.45,
                        name: 'diag-sub'
                    },
                    ...createBrandFooter(w, h, brand, false)
                ];
            }
        },

        // =========================================================================
        // KATEGORI 2: DAFTAR HARGA LAYANAN (6 DESAIN)
        // =========================================================================
        {
            id: 'harga-1',
            category: 'harga',
            name: 'Menu Price List Minimalis',
            description: 'Tampilan daftar menu harga cuci sepatu bersih dengan garis pemisah tipis.',
            createElements: function(w, h, photos, brand) {
                const services = brand.services || [
                    { name: 'Fast Clean (Upper & Midsole)', price: '35.000' },
                    { name: 'Deep Clean (Full Treatment Luar Dalam)', price: '65.000' },
                    { name: 'Special Treatment (Suede / Leather)', price: '90.000' },
                    { name: 'Unyellowing (Hilangkan Kuning Sol)', price: '85.000' },
                    { name: 'Repaint & Color Restoration', price: '150.000' }
                ];

                const elements = [
                    createBg(w, h, '#111111'),
                    ...createBrandHeader(w, brand, h * 0.06, false),
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.16,
                        width: w * 0.84,
                        text: 'DAFTAR HARGA PERAWATAN',
                        fontSize: 34,
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fill: '#FFFFFF',
                        name: 'menu-title'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.22,
                        width: w * 0.84,
                        text: 'Transparan tanpa biaya tersembunyi. Garansi cuci ulang bila kurang bersih.',
                        fontSize: 16,
                        fontFamily: 'Inter',
                        fill: '#8A8A85',
                        name: 'menu-sub'
                    }
                ];

                let startY = h * 0.29;
                const rowGap = 74;

                services.forEach((srv, idx) => {
                    elements.push(
                        {
                            type: 'textbox',
                            left: w * 0.08,
                            top: startY,
                            width: w * 0.58,
                            text: srv.name,
                            fontSize: 20,
                            fontFamily: 'Inter',
                            fontWeight: 600,
                            fill: '#FFFFFF',
                            name: `srv-name-${idx}`
                        },
                        {
                            type: 'textbox',
                            left: w * 0.66,
                            top: startY,
                            width: w * 0.26,
                            text: `Rp ${srv.price}`,
                            fontSize: 20,
                            fontFamily: 'Montserrat',
                            fontWeight: 700,
                            fill: '#C7B79B',
                            textAlign: 'right',
                            name: `srv-price-${idx}`
                        },
                        {
                            type: 'line',
                            points: [w * 0.08, startY + 44, w * 0.92, startY + 44],
                            stroke: 'rgba(255,255,255,0.08)',
                            strokeWidth: 1,
                            selectable: false,
                            name: `srv-line-${idx}`
                        }
                    );
                    startY += rowGap;
                });

                // Thumbnail kecil sepatu di sudut bawah menu
                elements.push({
                    type: 'image-placeholder',
                    id: 'main-photo',
                    left: w * 0.08,
                    top: startY + 20,
                    width: w * 0.84,
                    height: h * 0.18,
                    name: 'menu-photo'
                });

                elements.push(...createBrandFooter(w, h, brand, false));
                return elements;
            }
        },
        {
            id: 'harga-2',
            category: 'harga',
            name: 'Price Card Grid 2x2',
            description: 'Kartu harga berjejer rapi bernuansa modern.',
            createElements: function(w, h, photos, brand) {
                return [
                    createBg(w, h, '#F7F5F0'),
                    ...createBrandHeader(w, brand, h * 0.06, true),
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.16,
                        width: w * 0.84,
                        text: 'PILIHAN PAKET POPULER',
                        fontSize: 34,
                        fontFamily: 'Montserrat',
                        fontWeight: 800,
                        fill: '#111111',
                        name: 'grid-title'
                    },
                    // Card 1
                    {
                        type: 'rect',
                        left: w * 0.08,
                        top: h * 0.24,
                        width: w * 0.40,
                        height: h * 0.26,
                        fill: '#FFFFFF',
                        rx: 12,
                        ry: 12,
                        stroke: '#E5E2DD',
                        strokeWidth: 1.5,
                        name: 'card-1'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.11,
                        top: h * 0.26,
                        width: w * 0.34,
                        text: 'REGULAR CLEAN\nRp 50.000\n\n• Durasi 2-3 Hari\n• Upper & Midsole\n• Deodorizing Parfum',
                        fontSize: 16,
                        fontFamily: 'Inter',
                        fill: '#111111',
                        lineHeight: 1.35,
                        name: 'card-1-text'
                    },
                    // Card 2
                    {
                        type: 'rect',
                        left: w * 0.52,
                        top: h * 0.24,
                        width: w * 0.40,
                        height: h * 0.26,
                        fill: '#111111',
                        rx: 12,
                        ry: 12,
                        name: 'card-2'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.55,
                        top: h * 0.26,
                        width: w * 0.34,
                        text: 'DEEP CLEANING\nRp 85.000\n\n• Pembersihan Total\n• Luar & Dalam Sepatu\n• Free Silica Gel',
                        fontSize: 16,
                        fontFamily: 'Inter',
                        fill: '#FFFFFF',
                        lineHeight: 1.35,
                        name: 'card-2-text'
                    },
                    // Card 3
                    {
                        type: 'rect',
                        left: w * 0.08,
                        top: h * 0.53,
                        width: w * 0.40,
                        height: h * 0.26,
                        fill: '#FFFFFF',
                        rx: 12,
                        ry: 12,
                        stroke: '#E5E2DD',
                        strokeWidth: 1.5,
                        name: 'card-3'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.11,
                        top: h * 0.55,
                        width: w * 0.34,
                        text: 'UNYELLOWING\nRp 95.000\n\n• Khusus Sol Kuning\n• Treatment UV Light\n• Tahan Lama',
                        fontSize: 16,
                        fontFamily: 'Inter',
                        fill: '#111111',
                        lineHeight: 1.35,
                        name: 'card-3-text'
                    },
                    // Card 4
                    {
                        type: 'rect',
                        left: w * 0.52,
                        top: h * 0.53,
                        width: w * 0.40,
                        height: h * 0.26,
                        fill: '#FFFFFF',
                        rx: 12,
                        ry: 12,
                        stroke: '#C7B79B',
                        strokeWidth: 2,
                        name: 'card-4'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.55,
                        top: h * 0.55,
                        width: w * 0.34,
                        text: 'REPAINT RESTORE\nRp 150.000\n\n• Cat Premium Khusus\n• Warna Awet & Lentur\n• Hasil Presisi',
                        fontSize: 16,
                        fontFamily: 'Inter',
                        fill: '#111111',
                        lineHeight: 1.35,
                        name: 'card-4-text'
                    },
                    ...createBrandFooter(w, h, brand, true)
                ];
            }
        },
        {
            id: 'harga-3',
            category: 'harga',
            name: 'Split Photo & Price Table',
            description: 'Separuh foto sepatu, separuh daftar harga detail.',
            createElements: function(w, h, photos, brand) {
                return [
                    createBg(w, h, '#111111'),
                    {
                        type: 'image-placeholder',
                        id: 'main-photo',
                        left: 0,
                        top: 0,
                        width: w,
                        height: h * 0.38,
                        name: 'price-top-photo'
                    },
                    {
                        type: 'rect',
                        left: 0,
                        top: h * 0.34,
                        width: w,
                        height: h * 0.66,
                        fill: '#111111',
                        selectable: false,
                        name: 'sheet-bg'
                    },
                    ...createBrandHeader(w, brand, h * 0.37, false),
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.47,
                        width: w * 0.84,
                        text: 'DAFTAR PERAWATAN LENGKAP',
                        fontSize: 28,
                        fontFamily: 'Montserrat',
                        fontWeight: 700,
                        fill: '#C7B79B',
                        name: 'table-title'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.54,
                        width: w * 0.84,
                        text: '• Cuci Cepat (Express 6 Jam) ............................ Rp 55.000\n• Deep Cleaning Menyeluruh ............................ Rp 80.000\n• Treatment Suede & Leather ............................. Rp 95.000\n• Whitening & Unyellowing ................................ Rp 90.000\n• Full Repaint & Redye ......................................... Rp 160.000\n• Reglue Sol Lepas / Rusak .............................. Rp 70.000',
                        fontSize: 18,
                        fontFamily: 'Inter',
                        fill: '#ECEAE5',
                        lineHeight: 1.8,
                        name: 'table-rows'
                    },
                    ...createBrandFooter(w, h, brand, false)
                ];
            }
        },
        {
            id: 'harga-4',
            category: 'harga',
            name: 'Tier Package Comparison',
            description: 'Perbandingan 3 paket berjenjang: Basic, Premium, & Sultan.',
            createElements: function(w, h, photos, brand) {
                return [
                    createBg(w, h, '#1A1A1A'),
                    ...createBrandHeader(w, brand, h * 0.06, false),
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.15,
                        width: w * 0.84,
                        text: 'PILIH PAKET SESUAI KEBUTUHAN',
                        fontSize: 32,
                        fontFamily: 'Montserrat',
                        fontWeight: 800,
                        fill: '#FFFFFF',
                        textAlign: 'center',
                        name: 'tier-title'
                    },
                    // Tier 1
                    {
                        type: 'rect',
                        left: w * 0.05,
                        top: h * 0.25,
                        width: w * 0.28,
                        height: h * 0.54,
                        fill: '#222222',
                        rx: 10,
                        ry: 10,
                        name: 't1-box'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.06,
                        top: h * 0.28,
                        width: w * 0.26,
                        text: 'BASIC\n\nRp 45K\n\n• Cuci Luar\n• Midsole Clean\n• 3 Hari Kerja\n• Standard Spray',
                        fontSize: 15,
                        fontFamily: 'Inter',
                        fill: '#CCCCCC',
                        textAlign: 'center',
                        lineHeight: 1.45,
                        name: 't1-text'
                    },
                    // Tier 2 (Highlighted)
                    {
                        type: 'rect',
                        left: w * 0.36,
                        top: h * 0.22,
                        width: w * 0.28,
                        height: h * 0.60,
                        fill: '#111111',
                        rx: 10,
                        ry: 10,
                        stroke: '#C7B79B',
                        strokeWidth: 2,
                        name: 't2-box'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.37,
                        top: h * 0.25,
                        width: w * 0.26,
                        text: 'BEST SELLER\n\nPREMIUM\n\nRp 80K\n\n• Deep Cleaning\n• Insole & Laces\n• 2 Hari Kerja\n• Anti-Bacterial\n• Parfum Premium',
                        fontSize: 15,
                        fontFamily: 'Inter',
                        fill: '#FFFFFF',
                        textAlign: 'center',
                        lineHeight: 1.45,
                        name: 't2-text'
                    },
                    // Tier 3
                    {
                        type: 'rect',
                        left: w * 0.67,
                        top: h * 0.25,
                        width: w * 0.28,
                        height: h * 0.54,
                        fill: '#222222',
                        rx: 10,
                        ry: 10,
                        name: 't3-box'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.68,
                        top: h * 0.28,
                        width: w * 0.26,
                        text: 'ULTIMATE\n\nRp 150K\n\n• Deep Clean\n• Unyellowing\n• Water Repellent\n• Express 24 Jam\n• Antar Jemput',
                        fontSize: 15,
                        fontFamily: 'Inter',
                        fill: '#CCCCCC',
                        textAlign: 'center',
                        lineHeight: 1.45,
                        name: 't3-text'
                    },
                    ...createBrandFooter(w, h, brand, false)
                ];
            }
        },
        {
            id: 'harga-5',
            category: 'harga',
            name: 'Luxury Single Service Highlight',
            description: 'Fokus menonjolkan satu layanan unggulan seperti Deep Clean lengkap.',
            createElements: function(w, h, photos, brand) {
                return [
                    createBg(w, h, '#111111'),
                    ...createBrandHeader(w, brand, h * 0.06, false),
                    {
                        type: 'image-placeholder',
                        id: 'main-photo',
                        left: w * 0.1,
                        top: h * 0.16,
                        width: w * 0.8,
                        height: h * 0.44,
                        name: 'highlight-photo'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.1,
                        top: h * 0.64,
                        width: w * 0.8,
                        text: 'DEEP CLEANING TREATMENT',
                        fontSize: 32,
                        fontFamily: 'Montserrat',
                        fontWeight: 800,
                        fill: '#C7B79B',
                        name: 'hl-title'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.1,
                        top: h * 0.70,
                        width: w * 0.8,
                        text: 'Mulai dari Rp 75.000 / pasang',
                        fontSize: 24,
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fill: '#FFFFFF',
                        name: 'hl-price'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.1,
                        top: h * 0.76,
                        width: w * 0.8,
                        text: 'Termasuk pencucian detail sol, upper, insole, tali sepatu, penghilangan bau bakteri, dan pengeringan suhu ruangan yang aman.',
                        fontSize: 17,
                        fontFamily: 'Inter',
                        fill: '#8A8A85',
                        lineHeight: 1.45,
                        name: 'hl-desc'
                    },
                    ...createBrandFooter(w, h, brand, false)
                ];
            }
        },
        {
            id: 'harga-6',
            category: 'harga',
            name: 'Checklist Price Sheet',
            description: 'Tampilan centang fitur untuk setiap paket harga yang memudahkan pelanggan.',
            createElements: function(w, h, photos, brand) {
                return [
                    createBg(w, h, '#F7F5F0'),
                    ...createBrandHeader(w, brand, h * 0.06, true),
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.16,
                        width: w * 0.84,
                        text: 'DETAIL PERAWATAN & BIAYA',
                        fontSize: 32,
                        fontFamily: 'Montserrat',
                        fontWeight: 800,
                        fill: '#111111',
                        name: 'chk-title'
                    },
                    {
                        type: 'rect',
                        left: w * 0.08,
                        top: h * 0.24,
                        width: w * 0.84,
                        height: h * 0.56,
                        fill: '#FFFFFF',
                        rx: 12,
                        ry: 12,
                        stroke: '#E5E2DD',
                        strokeWidth: 1.5,
                        name: 'chk-card'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.12,
                        top: h * 0.28,
                        width: w * 0.76,
                        text: '✔️ Cuci Reguler (Upper + Sol) ................. Rp 40.000\n\n✔️ Deep Cleaning (Luar & Dalam) ............ Rp 75.000\n\n✔️ Unyellowing Midsole Kuning ............... Rp 85.000\n\n✔️ Perawatan Kulit & Suede Khusus ......... Rp 90.000\n\n✔️ Reglue Lem Sol Terbuka ..................... Rp 60.000\n\n✔️ Repaint Warna Asli Sepatu ................. Rp 150.000',
                        fontSize: 18,
                        fontFamily: 'Inter',
                        fill: '#111111',
                        lineHeight: 1.6,
                        name: 'chk-list'
                    },
                    ...createBrandFooter(w, h, brand, true)
                ];
            }
        },

        // =========================================================================
        // KATEGORI 3: SEBELUM & SESUDAH (BEFORE & AFTER) (6 DESAIN)
        // =========================================================================
        {
            id: 'before-after-1',
            category: 'before-after',
            name: 'Side-by-Side Dual Split',
            description: 'Dua foto berdampingan kiri dan kanan dengan label Sebelum dan Sesudah jelas.',
            createElements: function(w, h, photos, brand) {
                return [
                    createBg(w, h, '#111111'),
                    ...createBrandHeader(w, brand, h * 0.05, false),
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.14,
                        width: w * 0.84,
                        text: 'HASIL PENGERJAAN NYATA',
                        fontSize: 34,
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fill: '#FFFFFF',
                        textAlign: 'center',
                        name: 'ba-headline'
                    },
                    // Foto Kiri (Before)
                    {
                        type: 'image-placeholder',
                        id: 'main-photo',
                        left: w * 0.06,
                        top: h * 0.23,
                        width: w * 0.42,
                        height: h * 0.54,
                        name: 'photo-before'
                    },
                    {
                        type: 'rect',
                        left: w * 0.08,
                        top: h * 0.25,
                        width: 100,
                        height: 30,
                        fill: '#E74C3C',
                        rx: 4,
                        ry: 4,
                        name: 'badge-before'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.25 + 6,
                        width: 100,
                        text: 'SEBELUM',
                        fontSize: 12,
                        fontFamily: 'Montserrat',
                        fontWeight: 800,
                        fill: '#FFFFFF',
                        textAlign: 'center',
                        name: 'txt-before'
                    },
                    // Foto Kanan (After)
                    {
                        type: 'image-placeholder',
                        id: 'after-photo',
                        left: w * 0.52,
                        top: h * 0.23,
                        width: w * 0.42,
                        height: h * 0.54,
                        name: 'photo-after'
                    },
                    {
                        type: 'rect',
                        left: w * 0.54,
                        top: h * 0.25,
                        width: 100,
                        height: 30,
                        fill: '#27AE60',
                        rx: 4,
                        ry: 4,
                        name: 'badge-after'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.54,
                        top: h * 0.25 + 6,
                        width: 100,
                        text: 'SESUDAH',
                        fontSize: 12,
                        fontFamily: 'Montserrat',
                        fontWeight: 800,
                        fill: '#FFFFFF',
                        textAlign: 'center',
                        name: 'txt-after'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.80,
                        width: w * 0.84,
                        text: 'Noda membandel & kotoran bertahun-tahun lenyap seketika. Sepatu kembali segar siap dipakai hangout!',
                        fontSize: 17,
                        fontFamily: 'Inter',
                        fill: '#C7B79B',
                        textAlign: 'center',
                        name: 'ba-footer-desc'
                    },
                    ...createBrandFooter(w, h, brand, false)
                ];
            }
        },
        {
            id: 'before-after-2',
            category: 'before-after',
            name: 'Top-Bottom Stacked Transform',
            description: 'Foto atas sebelum dan foto bawah sesudah bertumpuk vertikal.',
            createElements: function(w, h, photos, brand) {
                return [
                    createBg(w, h, '#111111'),
                    ...createBrandHeader(w, brand, h * 0.04, false),
                    // Foto Atas (Before)
                    {
                        type: 'image-placeholder',
                        id: 'main-photo',
                        left: w * 0.08,
                        top: h * 0.12,
                        width: w * 0.84,
                        height: h * 0.33,
                        name: 'stack-before'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.11,
                        top: h * 0.14,
                        width: 140,
                        text: 'KONDISI AWAL',
                        fontSize: 12,
                        fontFamily: 'Montserrat',
                        fontWeight: 700,
                        fill: '#FFFFFF',
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        name: 'lbl-top'
                    },
                    // Pemisah Tengah
                    {
                        type: 'rect',
                        left: w * 0.08,
                        top: h * 0.47,
                        width: w * 0.84,
                        height: 38,
                        fill: '#C7B79B',
                        rx: 4,
                        ry: 4,
                        name: 'mid-strip'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.47 + 8,
                        width: w * 0.84,
                        text: 'TRANSFORMASI DEEP CLEANING',
                        fontSize: 14,
                        fontFamily: 'Montserrat',
                        fontWeight: 800,
                        fill: '#111111',
                        textAlign: 'center',
                        name: 'strip-text'
                    },
                    // Foto Bawah (After)
                    {
                        type: 'image-placeholder',
                        id: 'after-photo',
                        left: w * 0.08,
                        top: h * 0.53,
                        width: w * 0.84,
                        height: h * 0.33,
                        name: 'stack-after'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.11,
                        top: h * 0.55,
                        width: 140,
                        text: 'HASIL AKHIR',
                        fontSize: 12,
                        fontFamily: 'Montserrat',
                        fontWeight: 700,
                        fill: '#FFFFFF',
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        name: 'lbl-bot'
                    },
                    ...createBrandFooter(w, h, brand, false)
                ];
            }
        },
        {
            id: 'before-after-3',
            category: 'before-after',
            name: 'Diagonal Split Slice',
            description: 'Aksen potongan miring kontras mempertemukan kondisi kotor dan bersih.',
            createElements: function(w, h, photos, brand) {
                return [
                    createBg(w, h, '#111111'),
                    ...createBrandHeader(w, brand, h * 0.06, false),
                    {
                        type: 'image-placeholder',
                        id: 'main-photo',
                        left: w * 0.08,
                        top: h * 0.18,
                        width: w * 0.40,
                        height: h * 0.58,
                        name: 'diag-left-photo'
                    },
                    {
                        type: 'image-placeholder',
                        id: 'after-photo',
                        left: w * 0.52,
                        top: h * 0.18,
                        width: w * 0.40,
                        height: h * 0.58,
                        name: 'diag-right-photo'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.79,
                        width: w * 0.84,
                        text: 'BEFORE & AFTER TREATMENT',
                        fontSize: 32,
                        fontFamily: 'Montserrat',
                        fontWeight: 900,
                        fill: '#FFFFFF',
                        textAlign: 'center',
                        name: 'slice-title'
                    },
                    ...createBrandFooter(w, h, brand, false)
                ];
            }
        },
        {
            id: 'before-after-4',
            category: 'before-after',
            name: 'Dramatic Reveal Spotlight',
            description: 'Foto sesudah berukuran besar dengan kartu foto sebelum berukuran kecil di pojok.',
            createElements: function(w, h, photos, brand) {
                return [
                    createBg(w, h, '#111111'),
                    ...createBrandHeader(w, brand, h * 0.05, false),
                    // Foto Sesudah (Besar)
                    {
                        type: 'image-placeholder',
                        id: 'after-photo',
                        left: w * 0.08,
                        top: h * 0.15,
                        width: w * 0.84,
                        height: h * 0.58,
                        name: 'big-after-photo'
                    },
                    // Foto Sebelum (Kecil di kiri bawah)
                    {
                        type: 'rect',
                        left: w * 0.12,
                        top: h * 0.50,
                        width: w * 0.32,
                        height: h * 0.20,
                        fill: '#000000',
                        stroke: '#C7B79B',
                        strokeWidth: 2,
                        name: 'small-border'
                    },
                    {
                        type: 'image-placeholder',
                        id: 'main-photo',
                        left: w * 0.12 + 4,
                        top: h * 0.50 + 4,
                        width: w * 0.32 - 8,
                        height: h * 0.20 - 8,
                        name: 'small-before-photo'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.12,
                        top: h * 0.47,
                        width: w * 0.32,
                        text: 'KONDISI SEBELUMNYA',
                        fontSize: 10,
                        fontFamily: 'Montserrat',
                        fontWeight: 700,
                        fill: '#C7B79B',
                        name: 'small-tag'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.77,
                        width: w * 0.84,
                        text: 'KEMBALI KINCLONG SEPERTI BARU DARI KOTAK',
                        fontSize: 26,
                        fontFamily: 'Montserrat',
                        fontWeight: 800,
                        fill: '#FFFFFF',
                        name: 'reveal-headline'
                    },
                    ...createBrandFooter(w, h, brand, false)
                ];
            }
        },
        {
            id: 'before-after-5',
            category: 'before-after',
            name: 'Phone Screen Comparison',
            description: 'Ilustrasi layar ponsel elegan yang menampilkan perbandingan pencucian.',
            createElements: function(w, h, photos, brand) {
                return [
                    createBg(w, h, '#F7F5F0'),
                    ...createBrandHeader(w, brand, h * 0.06, true),
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.15,
                        width: w * 0.84,
                        text: 'TRANSFORMASI SNEAKERS',
                        fontSize: 34,
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fill: '#111111',
                        textAlign: 'center',
                        name: 'phone-title'
                    },
                    {
                        type: 'image-placeholder',
                        id: 'main-photo',
                        left: w * 0.08,
                        top: h * 0.24,
                        width: w * 0.40,
                        height: h * 0.54,
                        name: 'p-before'
                    },
                    {
                        type: 'image-placeholder',
                        id: 'after-photo',
                        left: w * 0.52,
                        top: h * 0.24,
                        width: w * 0.40,
                        height: h * 0.54,
                        name: 'p-after'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.80,
                        width: w * 0.84,
                        text: 'Gak perlu beli sepatu baru kalau sepatu lama bisa di-treatment sampai sebersih ini!',
                        fontSize: 17,
                        fontFamily: 'Inter',
                        fill: '#8A8A85',
                        textAlign: 'center',
                        name: 'phone-desc'
                    },
                    ...createBrandFooter(w, h, brand, true)
                ];
            }
        },
        {
            id: 'before-after-6',
            category: 'before-after',
            name: 'Midsole Unyellowing Specialist',
            description: 'Khusus memperlihatkan hasil penghilangan noda sol menguning.',
            createElements: function(w, h, photos, brand) {
                return [
                    createBg(w, h, '#111111'),
                    ...createBrandHeader(w, brand, h * 0.06, false),
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.16,
                        width: w * 0.84,
                        text: 'SOL KUNING JADI PUTIH KEMBALI',
                        fontSize: 32,
                        fontFamily: 'Montserrat',
                        fontWeight: 800,
                        fill: '#C7B79B',
                        name: 'unyel-title'
                    },
                    {
                        type: 'image-placeholder',
                        id: 'main-photo',
                        left: w * 0.08,
                        top: h * 0.24,
                        width: w * 0.84,
                        height: h * 0.52,
                        name: 'unyel-photo'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.79,
                        width: w * 0.84,
                        text: 'Oksidasi matahari pada midsole bukan masalah lagi. Kimia ramah lingkungan & penyinaran UV khusus mengembalikan warna aslinya.',
                        fontSize: 17,
                        fontFamily: 'Inter',
                        fill: '#ECEAE5',
                        lineHeight: 1.45,
                        name: 'unyel-desc'
                    },
                    ...createBrandFooter(w, h, brand, false)
                ];
            }
        },

        // =========================================================================
        // KATEGORI 4: TIPS PERAWATAN SNEAKERS (6 DESAIN)
        // =========================================================================
        {
            id: 'tips-1',
            category: 'tips',
            name: '5 Aturan Emas Rawat Sepatu',
            description: 'Daftar bernomor 1-5 berisi tips praktis menjaga keawetan sneakers.',
            createElements: function(w, h, photos, brand) {
                return [
                    createBg(w, h, '#111111'),
                    ...createBrandHeader(w, brand, h * 0.05, false),
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.14,
                        width: w * 0.84,
                        text: '5 CARA MUDAH RAWAT SNEAKERS',
                        fontSize: 34,
                        fontFamily: 'Montserrat',
                        fontWeight: 800,
                        fill: '#C7B79B',
                        name: 'tips-title'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.23,
                        width: w * 0.84,
                        text: '1. Jangan jemur langsung di bawah terik matahari\n2. Gunakan silica gel di dalam kotak sepatu\n3. Bersihkan noda lumpur sesegera mungkin\n4. Hindari mencuci sepatu di mesin cuci pakaian\n5. Pakai shoe tree agar bentuk sepatu tetap kokoh',
                        fontSize: 19,
                        fontFamily: 'Inter',
                        fill: '#FFFFFF',
                        lineHeight: 1.85,
                        name: 'tips-list'
                    },
                    {
                        type: 'image-placeholder',
                        id: 'main-photo',
                        left: w * 0.08,
                        top: h * 0.60,
                        width: w * 0.84,
                        height: h * 0.25,
                        name: 'tips-photo'
                    },
                    ...createBrandFooter(w, h, brand, false)
                ];
            }
        },
        {
            id: 'tips-2',
            category: 'tips',
            name: 'Perawatan Sepatu Bahan Suede',
            description: 'Tips mendalam khusus material suede yang rentan rusak jika kena air.',
            createElements: function(w, h, photos, brand) {
                return [
                    createBg(w, h, '#F7F5F0'),
                    ...createBrandHeader(w, brand, h * 0.06, true),
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.15,
                        width: w * 0.84,
                        text: 'PUNYA SNEAKERS SUEDE?\nJANGAN SAMPAI SALAH CUCI!',
                        fontSize: 32,
                        fontFamily: 'Montserrat',
                        fontWeight: 800,
                        fill: '#111111',
                        lineHeight: 1.15,
                        name: 'suede-title'
                    },
                    {
                        type: 'image-placeholder',
                        id: 'main-photo',
                        left: w * 0.08,
                        top: h * 0.28,
                        width: w * 0.84,
                        height: h * 0.36,
                        name: 'suede-photo'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.67,
                        width: w * 0.84,
                        text: 'Material suede sangat sensitif terhadap air! Selalu gunakan sikat berbulu kuda (horsehair brush) kering dan penghapus khusus suede untuk noda ringan.',
                        fontSize: 18,
                        fontFamily: 'Inter',
                        fill: '#8A8A85',
                        lineHeight: 1.45,
                        name: 'suede-desc'
                    },
                    ...createBrandFooter(w, h, brand, true)
                ];
            }
        },
        {
            id: 'tips-3',
            category: 'tips',
            name: 'Mitos vs Fakta Cuci Sepatu',
            description: 'Format edukatif membedakan kebiasaan salah kaprah dan cara yang benar.',
            createElements: function(w, h, photos, brand) {
                return [
                    createBg(w, h, '#111111'),
                    ...createBrandHeader(w, brand, h * 0.06, false),
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.16,
                        width: w * 0.84,
                        text: 'MITOS VS FAKTA SNEAKERS',
                        fontSize: 34,
                        fontFamily: 'Montserrat',
                        fontWeight: 800,
                        fill: '#FFFFFF',
                        textAlign: 'center',
                        name: 'myth-title'
                    },
                    // Mitos
                    {
                        type: 'rect',
                        left: w * 0.08,
                        top: h * 0.26,
                        width: w * 0.84,
                        height: h * 0.24,
                        fill: '#222222',
                        rx: 10,
                        ry: 10,
                        name: 'box-mitos'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.12,
                        top: h * 0.29,
                        width: w * 0.76,
                        text: '❌ MITOS: "Cuci sepatu pakai detergen baju biasa biar cepat bersih."\n\nFAKTA: Kandungan kimia detergen baju terlalu keras dan menyebabkan lem sol lepas serta sol cepat menguning.',
                        fontSize: 16,
                        fontFamily: 'Inter',
                        fill: '#ECEAE5',
                        lineHeight: 1.4,
                        name: 'txt-mitos'
                    },
                    // Fakta Solusi
                    {
                        type: 'rect',
                        left: w * 0.08,
                        top: h * 0.54,
                        width: w * 0.84,
                        height: h * 0.24,
                        fill: '#1A1A1A',
                        rx: 10,
                        ry: 10,
                        stroke: '#C7B79B',
                        strokeWidth: 1.5,
                        name: 'box-fakta'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.12,
                        top: h * 0.57,
                        width: w * 0.76,
                        text: '✔️ SOLUSI TERBAIK:\nGunakan sabun pembersih sneakers berbahan dasar minyak kelapa atau serahkan langsung ke profesional.',
                        fontSize: 16,
                        fontFamily: 'Inter',
                        fill: '#FFFFFF',
                        lineHeight: 1.4,
                        name: 'txt-fakta'
                    },
                    ...createBrandFooter(w, h, brand, false)
                ];
            }
        },
        {
            id: 'tips-4',
            category: 'tips',
            name: 'Checklist Perawatan Harian',
            description: 'Daftar periksa harian yang praktis dibaca audiens saat santai.',
            createElements: function(w, h, photos, brand) {
                return [
                    createBg(w, h, '#F7F5F0'),
                    ...createBrandHeader(w, brand, h * 0.06, true),
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.16,
                        width: w * 0.84,
                        text: 'RUTINITAS SEPATU BERSIH',
                        fontSize: 32,
                        fontFamily: 'Montserrat',
                        fontWeight: 800,
                        fill: '#111111',
                        name: 'chk-harian-title'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.26,
                        width: w * 0.84,
                        text: '☑️ Lap debu midsole sehabis bepergian\n☑️ Angin-anginkan setelah dipakai seharian\n☑️ Gunakan shoe spray anti-bakteri\n☑️ Lakukan deep clean sebulan sekali\n☑️ Simpan di rak berventilasi baik',
                        fontSize: 20,
                        fontFamily: 'Inter',
                        fill: '#111111',
                        lineHeight: 2,
                        name: 'chk-harian-list'
                    },
                    {
                        type: 'image-placeholder',
                        id: 'main-photo',
                        left: w * 0.08,
                        top: h * 0.62,
                        width: w * 0.84,
                        height: h * 0.23,
                        name: 'harian-photo'
                    },
                    ...createBrandFooter(w, h, brand, true)
                ];
            }
        },
        {
            id: 'tips-5',
            category: 'tips',
            name: 'Cara Menghilangkan Bau Sepatu',
            description: 'Tips ampuh mengatasi masalah bau apek dan bakteri pada sepatu.',
            createElements: function(w, h, photos, brand) {
                return [
                    createBg(w, h, '#111111'),
                    ...createBrandHeader(w, brand, h * 0.06, false),
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.16,
                        width: w * 0.84,
                        text: 'SEPATU MULAI BAU APEK?',
                        fontSize: 38,
                        fontFamily: 'Montserrat',
                        fontWeight: 800,
                        fill: '#C7B79B',
                        name: 'bau-title'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.25,
                        width: w * 0.84,
                        text: 'Penyebab utama bau adalah bakteri yang berkembang biak karena kelembapan keringat kaki yang terperangkap di insole.',
                        fontSize: 18,
                        fontFamily: 'Inter',
                        fill: '#ECEAE5',
                        lineHeight: 1.45,
                        name: 'bau-sub'
                    },
                    {
                        type: 'image-placeholder',
                        id: 'main-photo',
                        left: w * 0.08,
                        top: h * 0.36,
                        width: w * 0.84,
                        height: h * 0.38,
                        name: 'bau-photo'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.77,
                        width: w * 0.84,
                        text: 'Solusi: Treatment deep clean kami membunuh 99.9% bakteri penyebab bau dan memberikan wangi tahan lama.',
                        fontSize: 17,
                        fontFamily: 'Inter',
                        fill: '#8A8A85',
                        name: 'bau-solusi'
                    },
                    ...createBrandFooter(w, h, brand, false)
                ];
            }
        },
        {
            id: 'tips-6',
            category: 'tips',
            name: 'Panduan Rawat Sepatu Leather',
            description: 'Edukasi perawatan kulit asli/sintetis agar tidak retak (creasing).',
            createElements: function(w, h, photos, brand) {
                return [
                    createBg(w, h, '#1A1A1A'),
                    ...createBrandHeader(w, brand, h * 0.06, false),
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.16,
                        width: w * 0.84,
                        text: 'CEGAH SEPATU KULIT RETAK',
                        fontSize: 34,
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fill: '#FFFFFF',
                        name: 'leather-title'
                    },
                    {
                        type: 'image-placeholder',
                        id: 'main-photo',
                        left: w * 0.08,
                        top: h * 0.25,
                        width: w * 0.84,
                        height: h * 0.44,
                        name: 'leather-photo'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.72,
                        width: w * 0.84,
                        text: 'Kulit sepatu membutuhkan pelembap (leather balm) seperti kulit manusia. Tanpa perawatan berkala, lapisan kulit akan kering dan pecah-pecah.',
                        fontSize: 18,
                        fontFamily: 'Inter',
                        fill: '#C7B79B',
                        lineHeight: 1.45,
                        name: 'leather-desc'
                    },
                    ...createBrandFooter(w, h, brand, false)
                ];
            }
        },

        // =========================================================================
        // KATEGORI 5: PROSES PENGERJAAN (WORKFLOW) (6 DESAIN)
        // =========================================================================
        {
            id: 'proses-1',
            category: 'proses',
            name: '4 Langkah Pengerjaan Standar',
            description: 'Alur tahapan dari sepatu diterima hingga selesai di-packing bersih.',
            createElements: function(w, h, photos, brand) {
                return [
                    createBg(w, h, '#111111'),
                    ...createBrandHeader(w, brand, h * 0.05, false),
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.14,
                        width: w * 0.84,
                        text: 'STANDAR PROSES PENGERJAAN',
                        fontSize: 32,
                        fontFamily: 'Montserrat',
                        fontWeight: 800,
                        fill: '#FFFFFF',
                        name: 'flow-title'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.23,
                        width: w * 0.84,
                        text: '1. INSPEKSI MATERIAL\nCek jenis bahan & tingkat keparahan noda.\n\n2. DRY BRUSHING\nMembersihkan debu kasar permukaan luar.\n\n3. WET DEEP CLEANING\nPencucian menggunakan sikat halus & sabun khusus.\n\n4. NATURAL AIR DRYING\nPengeringan alami tanpa sinar matahari berlebih.',
                        fontSize: 18,
                        fontFamily: 'Inter',
                        fill: '#C7B79B',
                        lineHeight: 1.5,
                        name: 'flow-steps'
                    },
                    {
                        type: 'image-placeholder',
                        id: 'main-photo',
                        left: w * 0.08,
                        top: h * 0.65,
                        width: w * 0.84,
                        height: h * 0.22,
                        name: 'flow-photo'
                    },
                    ...createBrandFooter(w, h, brand, false)
                ];
            }
        },
        {
            id: 'proses-2',
            category: 'proses',
            name: 'Behind The Scene Workshop',
            description: 'Nuansa workshop profesional dengan perhatian ke detail pengerjaan.',
            createElements: function(w, h, photos, brand) {
                return [
                    createBg(w, h, '#111111'),
                    ...createBrandHeader(w, brand, h * 0.06, false),
                    {
                        type: 'image-placeholder',
                        id: 'main-photo',
                        left: w * 0.08,
                        top: h * 0.17,
                        width: w * 0.84,
                        height: h * 0.50,
                        name: 'bts-photo'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.70,
                        width: w * 0.84,
                        text: 'DI BALIK SEPATU BERSIH ANDA',
                        fontSize: 30,
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fill: '#FFFFFF',
                        name: 'bts-title'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.77,
                        width: w * 0.84,
                        text: 'Setiap pasang sepatu ditangani secara teliti satu per satu oleh teknisi berpengalaman. Tidak ada proses terburu-buru.',
                        fontSize: 17,
                        fontFamily: 'Inter',
                        fill: '#8A8A85',
                        lineHeight: 1.45,
                        name: 'bts-desc'
                    },
                    ...createBrandFooter(w, h, brand, false)
                ];
            }
        },
        {
            id: 'proses-3',
            category: 'proses',
            name: 'Alat & Formula Khusus',
            description: 'Memperkenalkan perlengkapan profesional yang digunakan dalam perawatan.',
            createElements: function(w, h, photos, brand) {
                return [
                    createBg(w, h, '#F7F5F0'),
                    ...createBrandHeader(w, brand, h * 0.06, true),
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.16,
                        width: w * 0.84,
                        text: 'HANYA MENGGUNAKAN BAHAN TERBAIK',
                        fontSize: 30,
                        fontFamily: 'Montserrat',
                        fontWeight: 800,
                        fill: '#111111',
                        name: 'tools-title'
                    },
                    {
                        type: 'image-placeholder',
                        id: 'main-photo',
                        left: w * 0.08,
                        top: h * 0.25,
                        width: w * 0.84,
                        height: h * 0.40,
                        name: 'tools-photo'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.69,
                        width: w * 0.84,
                        text: '• Sikat Bulu Kuda Lembut untuk Upper\n• Sikat Kaku Khusus Midsole & Outsole\n• Sabun Pembersih Natural Organik\n• Cairan Anti Jamur & Parfum Antibakteri',
                        fontSize: 18,
                        fontFamily: 'Inter',
                        fill: '#111111',
                        lineHeight: 1.7,
                        name: 'tools-list'
                    },
                    ...createBrandFooter(w, h, brand, true)
                ];
            }
        },
        {
            id: 'proses-4',
            category: 'proses',
            name: 'Penyimpanan & Packaging',
            description: 'Menampilkan proses akhir pengemasan rapi dan higienis siap antar.',
            createElements: function(w, h, photos, brand) {
                return [
                    createBg(w, h, '#111111'),
                    ...createBrandHeader(w, brand, h * 0.06, false),
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.16,
                        width: w * 0.84,
                        text: 'PACKAGING HIGIENIS & AMAN',
                        fontSize: 34,
                        fontFamily: 'Montserrat',
                        fontWeight: 800,
                        fill: '#C7B79B',
                        name: 'pack-title'
                    },
                    {
                        type: 'image-placeholder',
                        id: 'main-photo',
                        left: w * 0.08,
                        top: h * 0.25,
                        width: w * 0.84,
                        height: h * 0.46,
                        name: 'pack-photo'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.74,
                        width: w * 0.84,
                        text: 'Sepatu Anda dikemas menggunakan tas sepatu khusus, dilengkapi silica gel anti-lembab, dan wangi tahan hingga berminggu-minggu.',
                        fontSize: 18,
                        fontFamily: 'Inter',
                        fill: '#ECEAE5',
                        lineHeight: 1.45,
                        name: 'pack-desc'
                    },
                    ...createBrandFooter(w, h, brand, false)
                ];
            }
        },
        {
            id: 'proses-5',
            category: 'proses',
            name: 'Quality Check Bergaransi',
            description: 'Komitmen pemeriksaan kualitas akhir sebelum diserahkan ke pelanggan.',
            createElements: function(w, h, photos, brand) {
                return [
                    createBg(w, h, '#111111'),
                    ...createBrandHeader(w, brand, h * 0.06, false),
                    {
                        type: 'rect',
                        left: w * 0.08,
                        top: h * 0.16,
                        width: 160,
                        height: 36,
                        fill: '#27AE60',
                        rx: 4,
                        ry: 4,
                        name: 'qc-badge'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.16 + 8,
                        width: 160,
                        text: '100% QUALITY CHECK',
                        fontSize: 13,
                        fontFamily: 'Montserrat',
                        fontWeight: 800,
                        fill: '#FFFFFF',
                        textAlign: 'center',
                        name: 'qc-badge-txt'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.23,
                        width: w * 0.84,
                        text: 'Kurang Bersih? Kami Cuci Ulang Gratis!',
                        fontSize: 36,
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fill: '#FFFFFF',
                        name: 'qc-title'
                    },
                    {
                        type: 'image-placeholder',
                        id: 'main-photo',
                        left: w * 0.08,
                        top: h * 0.35,
                        width: w * 0.84,
                        height: h * 0.44,
                        name: 'qc-photo'
                    },
                    ...createBrandFooter(w, h, brand, false)
                ];
            }
        },
        {
            id: 'proses-6',
            category: 'proses',
            name: 'Layanan Antar Jemput',
            description: 'Memperlihatkan kemudahan proses kurir pick-up langsung ke rumah.',
            createElements: function(w, h, photos, brand) {
                return [
                    createBg(w, h, '#F7F5F0'),
                    ...createBrandHeader(w, brand, h * 0.06, true),
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.16,
                        width: w * 0.84,
                        text: 'TINGGAL CHAT, KAMI JEMPUT',
                        fontSize: 34,
                        fontFamily: 'Montserrat',
                        fontWeight: 800,
                        fill: '#111111',
                        name: 'pickup-title'
                    },
                    {
                        type: 'image-placeholder',
                        id: 'main-photo',
                        left: w * 0.08,
                        top: h * 0.25,
                        width: w * 0.84,
                        height: h * 0.44,
                        name: 'pickup-photo'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.73,
                        width: w * 0.84,
                        text: 'Tak perlu buang waktu ke luar rumah. Kurir kami siap pick-up dan antar kembali sepatu Anda dalam kondisi prima.',
                        fontSize: 18,
                        fontFamily: 'Inter',
                        fill: '#8A8A85',
                        lineHeight: 1.45,
                        name: 'pickup-desc'
                    },
                    ...createBrandFooter(w, h, brand, true)
                ];
            }
        },

        // =========================================================================
        // KATEGORI 6: TESTIMONI PELANGGAN (6 DESAIN)
        // =========================================================================
        {
            id: 'testimoni-1',
            category: 'testimoni',
            name: 'Kartu Kutipan Ulasan Bintang 5',
            description: 'Tanda petik besar beige dengan ulasan kepuasan pelanggan.',
            createElements: function(w, h, photos, brand) {
                return [
                    createBg(w, h, '#111111'),
                    ...createBrandHeader(w, brand, h * 0.06, false),
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.15,
                        width: 120,
                        text: '“',
                        fontSize: 110,
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fill: '#C7B79B',
                        name: 'quote-mark'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.27,
                        width: w * 0.84,
                        text: 'Sepatu Jordan saya yang tadinya kusam dan kena lumpur tebal waktu konser, pas balik dari sini beneran kinclong kayak baru beli. Wanginya juga tahan seminggu lebih!',
                        fontSize: 24,
                        fontFamily: 'Playfair Display',
                        fontStyle: 'italic',
                        fill: '#FFFFFF',
                        lineHeight: 1.4,
                        name: 'quote-text'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.48,
                        width: w * 0.84,
                        text: '⭐⭐⭐⭐⭐\nDimas Pratama • Sneakerhead Jakarta',
                        fontSize: 18,
                        fontFamily: 'Inter',
                        fontWeight: 600,
                        fill: '#C7B79B',
                        name: 'reviewer-info'
                    },
                    {
                        type: 'image-placeholder',
                        id: 'main-photo',
                        left: w * 0.08,
                        top: h * 0.58,
                        width: w * 0.84,
                        height: h * 0.28,
                        name: 'review-photo'
                    },
                    ...createBrandFooter(w, h, brand, false)
                ];
            }
        },
        {
            id: 'testimoni-2',
            category: 'testimoni',
            name: 'Mockup Chat WhatsApp Testimoni',
            description: 'Format balon percakapan chat WA yang autentik dan dipercaya calon klien.',
            createElements: function(w, h, photos, brand) {
                return [
                    createBg(w, h, '#F7F5F0'),
                    ...createBrandHeader(w, brand, h * 0.06, true),
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.16,
                        width: w * 0.84,
                        text: 'APA KATA MEREKA?',
                        fontSize: 34,
                        fontFamily: 'Montserrat',
                        fontWeight: 800,
                        fill: '#111111',
                        textAlign: 'center',
                        name: 'chat-title'
                    },
                    // Balon Chat Kiri
                    {
                        type: 'rect',
                        left: w * 0.10,
                        top: h * 0.26,
                        width: w * 0.75,
                        height: 90,
                        fill: '#FFFFFF',
                        rx: 12,
                        ry: 12,
                        stroke: '#E5E2DD',
                        strokeWidth: 1.5,
                        name: 'bubble-1'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.13,
                        top: h * 0.28,
                        width: w * 0.69,
                        text: 'Mas paket sepatunya udah nyampe ya! Parah sih bersih banget sol kuningnya bisa putih lagi 🔥 Mantul makasih banyak!',
                        fontSize: 15,
                        fontFamily: 'Inter',
                        fill: '#111111',
                        name: 'bubble-1-txt'
                    },
                    // Balon Chat Balasan
                    {
                        type: 'rect',
                        left: w * 0.15,
                        top: h * 0.38,
                        width: w * 0.75,
                        height: 70,
                        fill: '#111111',
                        rx: 12,
                        ry: 12,
                        name: 'bubble-2'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.18,
                        top: h * 0.40,
                        width: w * 0.69,
                        text: 'Sama-sama Kak! Senang bisa bantu rawat koleksinya. Ditunggu sepatu berikutnya ya! 🙏',
                        fontSize: 15,
                        fontFamily: 'Inter',
                        fill: '#C7B79B',
                        name: 'bubble-2-txt'
                    },
                    {
                        type: 'image-placeholder',
                        id: 'main-photo',
                        left: w * 0.08,
                        top: h * 0.50,
                        width: w * 0.84,
                        height: h * 0.35,
                        name: 'chat-shoe-photo'
                    },
                    ...createBrandFooter(w, h, brand, true)
                ];
            }
        },
        {
            id: 'testimoni-3',
            category: 'testimoni',
            name: 'Rating 4.9 & Kepuasan Pelanggan',
            description: 'Fokus pada angka kepuasan tinggi dan volume sepatu yang telah dicuci.',
            createElements: function(w, h, photos, brand) {
                return [
                    createBg(w, h, '#111111'),
                    ...createBrandHeader(w, brand, h * 0.06, false),
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.16,
                        width: w * 0.84,
                        text: '4.9 ★★★★★',
                        fontSize: 54,
                        fontFamily: 'Montserrat',
                        fontWeight: 900,
                        fill: '#C7B79B',
                        textAlign: 'center',
                        name: 'rating-num'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.25,
                        width: w * 0.84,
                        text: 'Lebih dari 2.500+ pasang sneakers telah dipercayakan kepada kami.',
                        fontSize: 18,
                        fontFamily: 'Inter',
                        fill: '#FFFFFF',
                        textAlign: 'center',
                        name: 'rating-sub'
                    },
                    {
                        type: 'image-placeholder',
                        id: 'main-photo',
                        left: w * 0.08,
                        top: h * 0.34,
                        width: w * 0.84,
                        height: h * 0.48,
                        name: 'rating-photo'
                    },
                    ...createBrandFooter(w, h, brand, false)
                ];
            }
        },
        {
            id: 'testimoni-4',
            category: 'testimoni',
            name: 'Trio Review Mini Cards',
            description: 'Tiga cuplikan ulasan singkat dari berbagai tipe pemilik sneakers.',
            createElements: function(w, h, photos, brand) {
                return [
                    createBg(w, h, '#1A1A1A'),
                    ...createBrandHeader(w, brand, h * 0.05, false),
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.14,
                        width: w * 0.84,
                        text: 'KATA MEREKA TENTANG KAMI',
                        fontSize: 30,
                        fontFamily: 'Montserrat',
                        fontWeight: 800,
                        fill: '#FFFFFF',
                        name: 'trio-title'
                    },
                    // Box 1
                    {
                        type: 'rect',
                        left: w * 0.08,
                        top: h * 0.22,
                        width: w * 0.84,
                        height: h * 0.17,
                        fill: '#222222',
                        rx: 8,
                        ry: 8,
                        name: 'rev-box-1'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.12,
                        top: h * 0.24,
                        width: w * 0.76,
                        text: '“Repaint sepatu basket saya rapi banget, catnya gak kaku dan warnanya pas sama aslinya!”\n— Kevin, Penggemar Sneakers',
                        fontSize: 15,
                        fontFamily: 'Inter',
                        fill: '#ECEAE5',
                        lineHeight: 1.4,
                        name: 'rev-txt-1'
                    },
                    // Box 2
                    {
                        type: 'rect',
                        left: w * 0.08,
                        top: h * 0.42,
                        width: w * 0.84,
                        height: h * 0.17,
                        fill: '#222222',
                        rx: 8,
                        ry: 8,
                        name: 'rev-box-2'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.12,
                        top: h * 0.44,
                        width: w * 0.76,
                        text: '“Layanan antar jemputnya tepat waktu dan ramah. Hasil cuci bersih luar dalam.”\n— Rian, Eksekutif Muda',
                        fontSize: 15,
                        fontFamily: 'Inter',
                        fill: '#ECEAE5',
                        lineHeight: 1.4,
                        name: 'rev-txt-2'
                    },
                    // Box 3
                    {
                        type: 'rect',
                        left: w * 0.08,
                        top: h * 0.62,
                        width: w * 0.84,
                        height: h * 0.17,
                        fill: '#222222',
                        rx: 8,
                        ry: 8,
                        name: 'rev-box-3'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.12,
                        top: h * 0.64,
                        width: w * 0.76,
                        text: '“Unyellowingnya juara! Air Force 1 putih saya yang kuning sekarang dipakai pede lagi.”\n— Amanda, Mahasiswi',
                        fontSize: 15,
                        fontFamily: 'Inter',
                        fill: '#ECEAE5',
                        lineHeight: 1.4,
                        name: 'rev-txt-3'
                    },
                    ...createBrandFooter(w, h, brand, false)
                ];
            }
        },
        {
            id: 'testimoni-5',
            category: 'testimoni',
            name: 'Kolektor Sepatu Rekomendasi',
            description: 'Ulasan khusus dari pegiat sneakerhead komunitas.',
            createElements: function(w, h, photos, brand) {
                return [
                    createBg(w, h, '#111111'),
                    ...createBrandHeader(w, brand, h * 0.06, false),
                    {
                        type: 'image-placeholder',
                        id: 'main-photo',
                        left: w * 0.08,
                        top: h * 0.16,
                        width: w * 0.84,
                        height: h * 0.46,
                        name: 'collector-photo'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.66,
                        width: w * 0.84,
                        text: '“Sebagai kolektor, saya selektif banget pilih tempat cuci sepatu. Studio ini terbukti paling mengerti treatment material langka.”',
                        fontSize: 22,
                        fontFamily: 'Playfair Display',
                        fontStyle: 'italic',
                        fill: '#FFFFFF',
                        lineHeight: 1.35,
                        name: 'collector-quote'
                    },
                    ...createBrandFooter(w, h, brand, false)
                ];
            }
        },
        {
            id: 'testimoni-6',
            category: 'testimoni',
            name: 'Before After + Review Bintang',
            description: 'Kombinasi foto hasil cuci nyata dan teks kepuasan langsung.',
            createElements: function(w, h, photos, brand) {
                return [
                    createBg(w, h, '#F7F5F0'),
                    ...createBrandHeader(w, brand, h * 0.06, true),
                    {
                        type: 'image-placeholder',
                        id: 'main-photo',
                        left: w * 0.08,
                        top: h * 0.15,
                        width: w * 0.84,
                        height: h * 0.48,
                        name: 'combo-photo'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.67,
                        width: w * 0.84,
                        text: '⭐⭐⭐⭐⭐\n“Hasilnya melebihi ekspektasi! Midsole putih bersih gak ada bekas sikat kasar.”',
                        fontSize: 22,
                        fontFamily: 'Inter',
                        fontWeight: 700,
                        fill: '#111111',
                        lineHeight: 1.4,
                        name: 'combo-text'
                    },
                    ...createBrandFooter(w, h, brand, true)
                ];
            }
        },

        // =========================================================================
        // KATEGORI 7: PROMO & PAKET SPESIAL (6 DESAIN)
        // =========================================================================
        {
            id: 'promo-paket-1',
            category: 'promo-paket',
            name: 'Flash Sale Weekend Deal',
            description: 'Gaya promosi kilat dengan diskon besar dan batas waktu penawaran.',
            createElements: function(w, h, photos, brand) {
                return [
                    createBg(w, h, '#111111'),
                    ...createBrandHeader(w, brand, h * 0.05, false),
                    {
                        type: 'rect',
                        left: w * 0.08,
                        top: h * 0.14,
                        width: 170,
                        height: 34,
                        fill: '#E74C3C',
                        rx: 4,
                        ry: 4,
                        name: 'flash-badge'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.14 + 7,
                        width: 170,
                        text: 'PENIS KILAT KHUSUS',
                        fontSize: 13,
                        fontFamily: 'Montserrat',
                        fontWeight: 800,
                        fill: '#FFFFFF',
                        textAlign: 'center',
                        name: 'flash-txt'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.20,
                        width: w * 0.84,
                        text: 'DISKON HINGGA 30%\nCUCI SEMUA SNEAKERS',
                        fontSize: 42,
                        fontFamily: 'Montserrat',
                        fontWeight: 900,
                        fill: '#FFFFFF',
                        lineHeight: 1.05,
                        name: 'promo-headline'
                    },
                    {
                        type: 'image-placeholder',
                        id: 'main-photo',
                        left: w * 0.08,
                        top: h * 0.35,
                        width: w * 0.84,
                        height: h * 0.42,
                        name: 'promo-photo'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.79,
                        width: w * 0.84,
                        text: 'Berlaku khusus booking hari Jumat - Minggu ini. Jangan lewatkan kuota terbatas!',
                        fontSize: 18,
                        fontFamily: 'Inter',
                        fill: '#C7B79B',
                        name: 'promo-sub'
                    },
                    ...createBrandFooter(w, h, brand, false)
                ];
            }
        },
        {
            id: 'promo-paket-2',
            category: 'promo-paket',
            name: 'Paket Bundling Cuci 3 Pasang',
            description: 'Tawaran cuci lebih dari 1 pasang sepatu dengan potongan hemat.',
            createElements: function(w, h, photos, brand) {
                return [
                    createBg(w, h, '#F7F5F0'),
                    ...createBrandHeader(w, brand, h * 0.06, true),
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.15,
                        width: w * 0.84,
                        text: 'PAKET CUCI BARENG TEMAN',
                        fontSize: 34,
                        fontFamily: 'Montserrat',
                        fontWeight: 800,
                        fill: '#111111',
                        name: 'bundle-title'
                    },
                    {
                        type: 'image-placeholder',
                        id: 'main-photo',
                        left: w * 0.08,
                        top: h * 0.24,
                        width: w * 0.84,
                        height: h * 0.44,
                        name: 'bundle-photo'
                    },
                    {
                        type: 'rect',
                        left: w * 0.08,
                        top: h * 0.71,
                        width: w * 0.84,
                        height: 90,
                        fill: '#111111',
                        rx: 12,
                        ry: 12,
                        name: 'bundle-banner'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.12,
                        top: h * 0.71 + 20,
                        width: w * 0.76,
                        text: 'Cuci 2 Pasang GRATIS 1 Pasang!\nLebih hemat untuk seluruh koleksi sepatu Anda.',
                        fontSize: 18,
                        fontFamily: 'Inter',
                        fontWeight: 600,
                        fill: '#C7B79B',
                        textAlign: 'center',
                        lineHeight: 1.35,
                        name: 'bundle-txt'
                    },
                    ...createBrandFooter(w, h, brand, true)
                ];
            }
        },
        {
            id: 'promo-paket-3',
            category: 'promo-paket',
            name: 'Diskon Khusus Pelajar & Mahasiswa',
            description: 'Penawaran ramah kantong mahasiswa penyuka gaya streetwear.',
            createElements: function(w, h, photos, brand) {
                return [
                    createBg(w, h, '#111111'),
                    ...createBrandHeader(w, brand, h * 0.06, false),
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.16,
                        width: w * 0.84,
                        text: 'STUDENT DISCOUNT 20%',
                        fontSize: 38,
                        fontFamily: 'Montserrat',
                        fontWeight: 900,
                        fill: '#C7B79B',
                        name: 'stu-title'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.24,
                        width: w * 0.84,
                        text: 'Cukup tunjukkan kartu tanda pelajar / mahasiswa aktif untuk mendapatkan potongan harga cuci sepatu.',
                        fontSize: 18,
                        fontFamily: 'Inter',
                        fill: '#ECEAE5',
                        lineHeight: 1.4,
                        name: 'stu-sub'
                    },
                    {
                        type: 'image-placeholder',
                        id: 'main-photo',
                        left: w * 0.08,
                        top: h * 0.35,
                        width: w * 0.84,
                        height: h * 0.44,
                        name: 'stu-photo'
                    },
                    ...createBrandFooter(w, h, brand, false)
                ];
            }
        },
        {
            id: 'promo-paket-4',
            category: 'promo-paket',
            name: 'Free Pick Up & Delivery',
            description: 'Fasilitas gratis ongkir antar jemput untuk menarik order instan.',
            createElements: function(w, h, photos, brand) {
                return [
                    createBg(w, h, '#1A1A1A'),
                    ...createBrandHeader(w, brand, h * 0.06, false),
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.16,
                        width: w * 0.84,
                        text: 'GRATIS ONGKIR\nANTAR - JEMPUT',
                        fontSize: 44,
                        fontFamily: 'Montserrat',
                        fontWeight: 900,
                        fill: '#FFFFFF',
                        lineHeight: 1.05,
                        name: 'deliv-title'
                    },
                    {
                        type: 'image-placeholder',
                        id: 'main-photo',
                        left: w * 0.08,
                        top: h * 0.32,
                        width: w * 0.84,
                        height: h * 0.44,
                        name: 'deliv-photo'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.79,
                        width: w * 0.84,
                        text: 'Minimum cuci 2 pasang sepatu. Wilayah jangkauan berlaku sesuai ketentuan.',
                        fontSize: 17,
                        fontFamily: 'Inter',
                        fill: '#C7B79B',
                        name: 'deliv-sub'
                    },
                    ...createBrandFooter(w, h, brand, false)
                ];
            }
        },
        {
            id: 'promo-paket-5',
            category: 'promo-paket',
            name: 'Voucher Pelanggan Baru',
            description: 'Kupon promo sambutan untuk pemesanan pertama.',
            createElements: function(w, h, photos, brand) {
                return [
                    createBg(w, h, '#F7F5F0'),
                    ...createBrandHeader(w, brand, h * 0.06, true),
                    {
                        type: 'rect',
                        left: w * 0.08,
                        top: h * 0.16,
                        width: w * 0.84,
                        height: h * 0.62,
                        fill: '#FFFFFF',
                        rx: 16,
                        ry: 16,
                        stroke: '#C7B79B',
                        strokeWidth: 2,
                        name: 'voucher-box'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.12,
                        top: h * 0.20,
                        width: w * 0.76,
                        text: 'VOUCHER PERDANA',
                        fontSize: 18,
                        fontFamily: 'Montserrat',
                        fontWeight: 800,
                        fill: '#8A8A85',
                        textAlign: 'center',
                        charSpacing: 60,
                        name: 'v-tag'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.12,
                        top: h * 0.25,
                        width: w * 0.76,
                        text: 'POTONGAN Rp 25.000',
                        fontSize: 34,
                        fontFamily: 'Montserrat',
                        fontWeight: 900,
                        fill: '#111111',
                        textAlign: 'center',
                        name: 'v-val'
                    },
                    {
                        type: 'image-placeholder',
                        id: 'main-photo',
                        left: w * 0.14,
                        top: h * 0.35,
                        width: w * 0.72,
                        height: h * 0.38,
                        name: 'v-photo'
                    },
                    ...createBrandFooter(w, h, brand, true)
                ];
            }
        },
        {
            id: 'promo-paket-6',
            category: 'promo-paket',
            name: 'Member Exclusive Sneaker Club',
            description: 'Kartu keanggotaan loyalitas pelanggan reguler.',
            createElements: function(w, h, photos, brand) {
                return [
                    createBg(w, h, '#111111'),
                    ...createBrandHeader(w, brand, h * 0.06, false),
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.16,
                        width: w * 0.84,
                        text: 'GABUNG MEMBERSHIP KAMI',
                        fontSize: 34,
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fill: '#C7B79B',
                        name: 'member-title'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.24,
                        width: w * 0.84,
                        text: 'Kumpulkan poin setiap cuci sepatu. Cuci ke-6 GRATIS Deep Cleaning!',
                        fontSize: 18,
                        fontFamily: 'Inter',
                        fill: '#FFFFFF',
                        name: 'member-desc'
                    },
                    {
                        type: 'image-placeholder',
                        id: 'main-photo',
                        left: w * 0.08,
                        top: h * 0.34,
                        width: w * 0.84,
                        height: h * 0.45,
                        name: 'member-photo'
                    },
                    ...createBrandFooter(w, h, brand, false)
                ];
            }
        },

        // =========================================================================
        // KATEGORI 8: PENGENALAN PROFIL BISNIS (6 DESAIN)
        // =========================================================================
        {
            id: 'pengenalan-1',
            category: 'pengenalan',
            name: 'Hero Brand Introduction',
            description: 'Pengenalan nama bisnis, komitmen pengerjaan, dan filosofi kebersihan.',
            createElements: function(w, h, photos, brand) {
                return [
                    createBg(w, h, '#111111'),
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.10,
                        width: w * 0.84,
                        text: 'KENAL LEBIH DEKAT DENGAN KAMI',
                        fontSize: 14,
                        fontFamily: 'Montserrat',
                        fontWeight: 700,
                        fill: '#C7B79B',
                        charSpacing: 70,
                        name: 'intro-badge'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.15,
                        width: w * 0.84,
                        text: brand.businessName || 'Nama Bisnis Kamu',
                        fontSize: 46,
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fill: '#FFFFFF',
                        name: 'intro-brand'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.24,
                        width: w * 0.84,
                        text: brand.tagline || 'Spesialis Perawatan & Restorasi Sneakers',
                        fontSize: 20,
                        fontFamily: 'Inter',
                        fill: '#8A8A85',
                        name: 'intro-sub'
                    },
                    {
                        type: 'image-placeholder',
                        id: 'main-photo',
                        left: w * 0.08,
                        top: h * 0.33,
                        width: w * 0.84,
                        height: h * 0.45,
                        name: 'intro-photo'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.80,
                        width: w * 0.84,
                        text: 'Kami hadir untuk memastikan setiap langkah Anda percaya diri dengan sepatu yang senantiasa bersih, segar, dan terawat rapi.',
                        fontSize: 17,
                        fontFamily: 'Inter',
                        fill: '#ECEAE5',
                        lineHeight: 1.45,
                        name: 'intro-desc'
                    },
                    ...createBrandFooter(w, h, brand, false)
                ];
            }
        },
        {
            id: 'pengenalan-2',
            category: 'pengenalan',
            name: 'Workshop Location & Hours',
            description: 'Informasi alamat workshop fisik dan jam operasional buka.',
            createElements: function(w, h, photos, brand) {
                return [
                    createBg(w, h, '#F7F5F0'),
                    ...createBrandHeader(w, brand, h * 0.06, true),
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.16,
                        width: w * 0.84,
                        text: 'LOKASI WORKSHOP & JAM BUKA',
                        fontSize: 32,
                        fontFamily: 'Montserrat',
                        fontWeight: 800,
                        fill: '#111111',
                        name: 'loc-title'
                    },
                    {
                        type: 'image-placeholder',
                        id: 'main-photo',
                        left: w * 0.08,
                        top: h * 0.25,
                        width: w * 0.84,
                        height: h * 0.42,
                        name: 'loc-photo'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.70,
                        width: w * 0.84,
                        text: '📍 Alamat: ' + (brand.address || 'Kunjungi workshop kami atau pesan antar-jemput') + '\n\n🕒 Jam Buka: Setiap Hari (09.00 - 21.00 WIB)\n\n🛵 Wilayah Pick-Up: ' + (brand.serviceArea || 'Melayani seluruh area kota'),
                        fontSize: 18,
                        fontFamily: 'Inter',
                        fill: '#111111',
                        lineHeight: 1.5,
                        name: 'loc-details'
                    },
                    ...createBrandFooter(w, h, brand, true)
                ];
            }
        },
        {
            id: 'pengenalan-3',
            category: 'pengenalan',
            name: 'Nilai & Komitmen Kami',
            description: '3 pilar nilai kebersihan: Detail, Aman, dan Higienis.',
            createElements: function(w, h, photos, brand) {
                return [
                    createBg(w, h, '#111111'),
                    ...createBrandHeader(w, brand, h * 0.06, false),
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.16,
                        width: w * 0.84,
                        text: 'KOMITMEN KUALITAS KAMI',
                        fontSize: 34,
                        fontFamily: 'Playfair Display',
                        fontWeight: 700,
                        fill: '#FFFFFF',
                        name: 'values-title'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.25,
                        width: w * 0.84,
                        text: '1. PERHATIAN HINGGA DETAIL TERKECIL\nSetiap jahitan dan lubang tali sepatu dibersihkan cermat.\n\n2. BAHAN RAMAH LINGKUNGAN\nTidak merusak lem sol, tekstur kulit, maupun warna kain.\n\n3. WANGI & STERIL DARI BAKTERI\nTreatment anti-odor menjaga kesegaran jangka panjang.',
                        fontSize: 18,
                        fontFamily: 'Inter',
                        fill: '#C7B79B',
                        lineHeight: 1.5,
                        name: 'values-list'
                    },
                    {
                        type: 'image-placeholder',
                        id: 'main-photo',
                        left: w * 0.08,
                        top: h * 0.62,
                        width: w * 0.84,
                        height: h * 0.25,
                        name: 'values-photo'
                    },
                    ...createBrandFooter(w, h, brand, false)
                ];
            }
        },
        {
            id: 'pengenalan-4',
            category: 'pengenalan',
            name: 'Kartu Kontak & Reservasi',
            description: 'Tampilan kontak terpusat yang memudahkan pemesanan pertama.',
            createElements: function(w, h, photos, brand) {
                return [
                    createBg(w, h, '#1A1A1A'),
                    ...createBrandHeader(w, brand, h * 0.06, false),
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.16,
                        width: w * 0.84,
                        text: 'HUBUNGI KAMI SEKARANG',
                        fontSize: 36,
                        fontFamily: 'Montserrat',
                        fontWeight: 800,
                        fill: '#C7B79B',
                        name: 'contact-title'
                    },
                    {
                        type: 'image-placeholder',
                        id: 'main-photo',
                        left: w * 0.08,
                        top: h * 0.25,
                        width: w * 0.84,
                        height: h * 0.44,
                        name: 'contact-photo'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.72,
                        width: w * 0.84,
                        text: 'Siap mengembalikan kesegaran sepatu Anda?\nKirim foto sepatu Anda sekarang untuk konsultasi gratis!',
                        fontSize: 20,
                        fontFamily: 'Inter',
                        fill: '#FFFFFF',
                        lineHeight: 1.4,
                        name: 'contact-sub'
                    },
                    ...createBrandFooter(w, h, brand, false)
                ];
            }
        },
        {
            id: 'pengenalan-5',
            category: 'pengenalan',
            name: 'Profil Bisnis Minimalis Modern',
            description: 'Komposisi monokrom hitam putih bersih cocok untuk feeds berestetika.',
            createElements: function(w, h, photos, brand) {
                return [
                    createBg(w, h, '#F7F5F0'),
                    ...createBrandHeader(w, brand, h * 0.06, true),
                    {
                        type: 'image-placeholder',
                        id: 'main-photo',
                        left: w * 0.08,
                        top: h * 0.16,
                        width: w * 0.84,
                        height: h * 0.52,
                        name: 'clean-intro-photo'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.72,
                        width: w * 0.84,
                        text: 'PERAWATAN SEPATU TERPERCAYA',
                        fontSize: 30,
                        fontFamily: 'Montserrat',
                        fontWeight: 800,
                        fill: '#111111',
                        name: 'clean-title'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.79,
                        width: w * 0.84,
                        text: 'Kami menjaga setiap pasang sepatu seperti milik kami sendiri.',
                        fontSize: 18,
                        fontFamily: 'Inter',
                        fill: '#8A8A85',
                        name: 'clean-sub'
                    },
                    ...createBrandFooter(w, h, brand, true)
                ];
            }
        },
        {
            id: 'pengenalan-6',
            category: 'pengenalan',
            name: 'FAQ Pertanyaan Umum',
            description: 'Jawaban singkat atas pertanyaan yang sering diajukan pelanggan baru.',
            createElements: function(w, h, photos, brand) {
                return [
                    createBg(w, h, '#111111'),
                    ...createBrandHeader(w, brand, h * 0.05, false),
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.14,
                        width: w * 0.84,
                        text: 'PERTANYAAN YANG SERING DIAJUKAN',
                        fontSize: 28,
                        fontFamily: 'Montserrat',
                        fontWeight: 800,
                        fill: '#FFFFFF',
                        name: 'faq-title'
                    },
                    {
                        type: 'textbox',
                        left: w * 0.08,
                        top: h * 0.22,
                        width: w * 0.84,
                        text: 'Q: Berapa lama waktu pengerjaan?\nA: Reguler 2-3 hari, Express selesai dalam 24 jam.\n\nQ: Apakah aman untuk sepatu original mahal?\nA: 100% aman, teknisi kami tersertifikasi merawat sneaker luxury.\n\nQ: Apakah ada garansi?\nA: Ya, garansi cuci ulang gratis bila masih terdapat noda.',
                        fontSize: 17,
                        fontFamily: 'Inter',
                        fill: '#C7B79B',
                        lineHeight: 1.5,
                        name: 'faq-list'
                    },
                    {
                        type: 'image-placeholder',
                        id: 'main-photo',
                        left: w * 0.08,
                        top: h * 0.64,
                        width: w * 0.84,
                        height: h * 0.23,
                        name: 'faq-photo'
                    },
                    ...createBrandFooter(w, h, brand, false)
                ];
            }
        }
    ];

    // Method publik
    return {
        getCategories: function() {
            return categories;
        },
        getCategoryById: function(catId) {
            return categories.find(c => c.id === catId) || categories[0];
        },
        getDesignsForCategory: function(catId) {
            return templates.filter(t => t.category === catId);
        },
        getTemplate: function(templateId) {
            return templates.find(t => t.id === templateId) || templates[0];
        },
        getAllTemplates: function() {
            return templates;
        },
        getCategoryIcon: function(iconName) {
            const icons = {
                megaphone: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path><path d="M19 12a7 7 0 0 0-7-7H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h7a7 7 0 0 0 7-3z"></path></svg>',
                pricetag: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>',
                compare: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>',
                lightbulb: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><line x1="9" y1="18" x2="15" y2="18"></line><line x1="10" y1="22" x2="14" y2="22"></line><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"></path></svg>',
                workflow: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>',
                star: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>',
                gift: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>',
                store: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>'
            };
            return icons[iconName] || icons.megaphone;
        }
    };
})();
