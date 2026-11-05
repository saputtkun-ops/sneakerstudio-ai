/**
 * SNEAKERSTUDIO AI — CAPTION GENERATOR ENGINE
 * Generator Caption Instagram Bahasa Indonesia dengan 5 Pilihan Tone of Voice & Hashtag Otomatis
 */

window.SneakerStudio = window.SneakerStudio || {};

window.SneakerStudio.Caption = (function() {
    let currentStyle = 'profesional';

    const captionTemplates = {
        profesional: [
            `Kembalikan keanggunan dan kesegaran sepatu favorit Anda bersama [NAMA_BISNIS]. ✨

Kami memahami bahwa setiap pasang sneakers memiliki cerita dan nilai personal yang tinggi. Dengan teknisi tersertifikasi, sikat bulu khusus, dan formula pembersih ramah material, kami menjamin kebersihan maksimal tanpa merusak tekstur maupun warna asli sepatu Anda.

💎 Layanan Utama:
• Deep Cleaning (Upper, Midsole, Insole, & Laces)
• Unyellowing Treatment (Kembalikan putih sol)
• Repaint & Leather Restoration
• Anti-Bacterial & Odor Protection

📍 Lokasi: [ALAMAT]
🛵 Layanan Antar-Jemput: [WILAYAH]
📲 Reservasi Cepat: WhatsApp [WHATSAPP]

Langkah percaya diri dimulai dari sepatu yang bersih terawat. Hubungi kami sekarang!`,

            `Standar perawatan sneakers premium hadir untuk koleksi terbaik Anda di [NAMA_BISNIS].

Bukan sekadar mencuci, kami melakukan inspeksi material detail untuk memastikan setiap jenis bahan—mulai dari suede halus, canvas tebal, hingga kulit asli—mendapatkan penanganan yang tepat dan aman.

Hasil pengerjaan kami bergaransi: bersih, higienis, dan wangi tahan lama. 

Hubungi tim kami via WhatsApp:
👉 [WHATSAPP]
Instagram: [INSTAGRAM]`,

            `Investasi terbaik untuk memperpanjang usia sepatu Anda adalah perawatan rutin yang benar. Di [NAMA_BISNIS], kami mengembalikan kilau asli sepatu Anda seperti baru keluar dari kotak.

Konsultasikan kondisi sepatu Anda bersama tim ahli kami secara gratis melalui WhatsApp [WHATSAPP].`
        ],

        santai: [
            `Bro & Sis, sepatu udah mulai kucel tapi belum sempat nyuci sendiri? 😅👟

Santai aja, serahin urusan cuci mencuci ke ahlinya di [NAMA_BISNIS]! Mau noda lumpur sisa nongkrong, saus tumpah, atau sol yang udah mulai kuning, kita sikat bersih sampai kinclong lagi! 🔥

Kenapa harus di [NAMA_BISNIS]?
✅ Gak pake ribet, ada layanan pick-up & delivery
✅ Sabun khusus sneakers, dijamin aman buat bahan apa aja
✅ Wanginya seger banget bikin pede pas hangout

Yuk langsung amankan slot cuci sepatu lo hari ini!
📲 Chat WA kita: [WHATSAPP]
Cek katalog & promo di bio [INSTAGRAM] ya! 🙌`,

            `Sepatu ganteng, outfit makin on point! 😎✨

Jangan biarkan sepatu dekil ngerusak OOTD lo pas weekend. Kirim sepatu lo ke [NAMA_BISNIS], tinggal duduk manis di rumah, tahu-tahu sepatu balik dalam kondisi wangi dan bersih total.

Tap link di bio atau WhatsApp ke [WHATSAPP] sekarang juga! 🚀`,

            `Self-care bukan cuma buat muka, sepatu lo juga butuh dimanjain bro! 🧼

Biar awet bertahun-tahun, bawa sneakers andalan lo ke [NAMA_BISNIS]. Dijamin balik kayak unboxing baru lagi! 

WhatsApp: [WHATSAPP]`
        ],

        edukatif: [
            `💡 TAHUKAH KAMU? Mencuci sneakers menggunakan detergen baju biasa bisa merusak lem sol dan bikin sepatu cepat menguning!

Berikut 3 tips penting merawat sneakers agar tetap awet dari [NAMA_BISNIS]:

1️⃣ Hindari Air Berlebih: Sepatu tidak boleh direndam! Kelembapan berlebih di bagian dalam memicu jamur dan bakteri penyebab bau apek.
2️⃣ Jangan Jemur di Terik Matahari: Paparan sinar UV langsung merusak elastisitas sol karet dan memudarkan warna bahan canvas/suede.
3️⃣ Gunakan Sabun Khusus pH Netral: Selalu pilih pembersih berbahan organik yang ramah terhadap serat kain.

Butuh bantuan mencuci sepatu yang membandel? Serahkan pada ahlinya di [NAMA_BISNIS]!
📲 Konsultasi & Booking: [WHATSAPP]`,

            `🚨 BAHAYA MENCUCI SNEAKERS DI MESIN CUCI!

Banyak yang mengira mencuci sepatu di mesin cuci itu praktis. Faktanya, putaran mesin cuci bisa menyebabkan:
❌ Bentuk sepatu berubah (deformed)
❌ Lem sol terkelupas karena benturan
❌ Busa bantalan insole hancur

Di [NAMA_BISNIS], kami mencuci seluruh sepatu secara MANUAL dengan sikat berbulu halus satu per satu. 

Amankan sepatu kesayangan Anda:
WhatsApp: [WHATSAPP] • Instagram: [INSTAGRAM]`,

            `Punya sepatu berbahan suede yang terkena air hujan? Jangan langsung dilap pakai tisu basah! 

Air dan alkohol akan merusak tekstur bulu suede. Cukup tepuk perlahan dengan kain microfiber kering, angin-anginkan, dan bawa ke [NAMA_BISNIS] untuk treatment restoration.

Info lengkap: [WHATSAPP]`
        ],

        promosi: [
            `⚡ FLASH PROMO SPESIAL BULAN INI! ⚡

Saatnya bikin seluruh koleksi sneakers Anda kembali kinclong dengan penawaran terbaik dari [NAMA_BISNIS]!

🔥 PAKET PROMO HEMAT:
💎 Cuci 2 Pasang — GRATIS 1 Pasang Reguler
💎 Diskon 20% untuk Treatment Unyellowing
💎 Free Ongkir Antar-Jemput (S&K Berlaku)

📍 Wilayah Layanan: [WILAYAH]
📆 Promo berlaku terbatas sampai akhir pekan ini!

Jangan tunda sampai kuota harian habis. Amankan antrean Anda sekarang juga via WhatsApp:
👉 Klik link di bio atau WA: [WHATSAPP]`,

            `PROMO KHUSUS HARI INI! 💥

Bawa sneakers kotor Anda ke [NAMA_BISNIS] hari ini dan nikmati potongan langsung Rp 20.000 untuk layanan Deep Cleaning!

Sepatu bersih wangi, siap diajak melangkah kemana saja.
Pesan sekarang: [WHATSAPP]`,

            `Weekend Special Deal! Cuci sepatu bareng teman atau pasangan lebih hemat di [NAMA_BISNIS]. Dapatkan voucher potongan treatment berikutnya setiap pengerjaan deep clean!

Booking slot: [WHATSAPP]`
        ],

        sneakers: [
            `Setiap sneakerhead pasti paham: Sepatu bukan sekadar alas kaki, tapi investasi dan identitas diri. 👟🔥

Mulai dari Air Jordan, Yeezy, New Balance 990, Samba, hingga Dunk Low langka—semuanya layak mendapatkan penanganan dari sesama pecinta sneakers di [NAMA_BISNIS].

Kami tidak memakai sikat kasar murahan. Kami menjaga tekstur suede tetap lembut, menjaga detail leather tidak pecah, dan mengembalikan midsole agar tetap bersih bebas noda.

Keep your kicks fresh. Treat them right at [NAMA_BISNIS].

📲 Drop your kicks today:
WhatsApp: [WHATSAPP]
Instagram: [INSTAGRAM]`,

            `Real sneakerheads know when it's time for a proper clean. 🧼

Jangan biarkan debu jalanan merusak nilai koleksi sepatu lo. Di [NAMA_BISNIS], kita tahu persis cara treatment setiap siluet ikonik streetwear.

Hubungi workshop kami:
WhatsApp: [WHATSAPP]`,

            `Dari box langsung ke jalanan, dari jalanan kembali fresh di [NAMA_BISNIS]. Kualitas restorasi dan cuci sepatu terbaik untuk komunitas sneaker enthusiast.

WhatsApp: [WHATSAPP]`
        ]
    };

    const hashtagsByCategory = {
        promosi: '#CuciSepatu #SneakerCleaning #SneakerCare #JasaCuciSepatu #CuciSepatuMurah #LaundrySepatu #ShoesCare #CleanKicks #StreetwearIndo #SepatuBersih',
        harga: '#DaftarHargaCuciSepatu #PaketCuciSepatu #CuciSepatuMurah #DeepCleanSepatu #UnyellowingSepatu #RepaintSepatu #LaundrySepatuKiloan #HargaCuciSepatu',
        'before-after': '#BeforeAfterCuciSepatu #HasilCuciSepatu #TransformasiSepatu #SneakerRestoration #UnyellowingResult #SepatuKinclong #SneakerLaundry #BeforeAfter',
        tips: '#TipsMerawatSepatu #TipsSneakers #EdukasiSepatu #CaraCuciSepatu #MerawatSuede #SneakerTips #SneakerCareTips #InfoSepatu',
        proses: '#ProsesCuciSepatu #BehindTheScene #WorkshopSepatu #LaundrySepatuProfesional #SneakerTreatment #ShoeCleaningProcess',
        testimoni: '#TestimoniCuciSepatu #PelangganPuas #ReviewJujur #SneakerheadReview #RekomendasiCuciSepatu #TrustedLaundry',
        'promo-paket': '#PromoCuciSepatu #DiskonSepatu #FlashSaleCuciSepatu #PromoSneakers #CuciSepatuHemat #VoucherCuciSepatu',
        pengenalan: '#SneakerLaundryWorkshop #ProfilBisnis #JasaPerawatanSepatu #SpesialisSepatu #SolusiSepatuKotor #LocalBrandIndo'
    };

    function init() {
        setupToneCards();

        const btnGen = document.getElementById('btn-generate-caption');
        if (btnGen) {
            btnGen.addEventListener('click', function() {
                generateCaption();
                window.SneakerStudio.App.showToast('Variasi caption baru dihasilkan!', 'success');
            });
        }

        const btnCopyCap = document.getElementById('btn-copy-caption');
        if (btnCopyCap) {
            btnCopyCap.addEventListener('click', function() {
                const text = document.getElementById('caption-output').value;
                copyToClipboard(text, 'Teks caption berhasil disalin ke clipboard!');
            });
        }

        const btnCopyHash = document.getElementById('btn-copy-hashtags');
        if (btnCopyHash) {
            btnCopyHash.addEventListener('click', function() {
                const text = document.getElementById('hashtag-output').value;
                copyToClipboard(text, 'Daftar hashtag berhasil disalin!');
            });
        }
    }

    function setupToneCards() {
        const cards = document.querySelectorAll('.tone-card');
        cards.forEach(card => {
            card.addEventListener('click', function() {
                cards.forEach(c => c.classList.remove('active'));
                this.classList.add('active');
                currentStyle = this.getAttribute('data-style');
                generateCaption();
            });
        });
    }

    function generateCaption() {
        const brand = window.SneakerStudio.state.brandSettings;
        const category = window.SneakerStudio.state.selectedCategory || 'promosi';

        const templatesList = captionTemplates[currentStyle] || captionTemplates.profesional;
        // Pilih acak satu variasi
        const rawTemplate = templatesList[Math.floor(Math.random() * templatesList.length)];

        // Ganti placeholder dengan info brand
        let caption = rawTemplate
            .replace(/\[NAMA_BISNIS\]/g, brand.businessName || 'Nama Bisnis Kamu')
            .replace(/\[TAGLINE\]/g, brand.tagline || 'Perawatan Sneakers Profesional')
            .replace(/\[INSTAGRAM\]/g, brand.instagram || '@namabisnis')
            .replace(/\[WHATSAPP\]/g, brand.whatsapp || '0812-3456-7890')
            .replace(/\[ALAMAT\]/g, brand.address || 'Workshop Kami')
            .replace(/\[WILAYAH\]/g, brand.serviceArea || 'Jabodetabek & Sekitarnya');

        const outCap = document.getElementById('caption-output');
        if (outCap) outCap.value = caption;

        // Hashtags
        const tags = (hashtagsByCategory[category] || hashtagsByCategory.promosi) + ' #' + (brand.businessName || 'NamaBisnis').replace(/\s+/g, '');
        const outHash = document.getElementById('hashtag-output');
        if (outHash) outHash.value = tags;
    }

    function copyToClipboard(text, successMsg) {
        if (!text) return;
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(function() {
                window.SneakerStudio.App.showToast(successMsg, 'success');
            }).catch(function() {
                fallbackCopy(text, successMsg);
            });
        } else {
            fallbackCopy(text, successMsg);
        }
    }

    function fallbackCopy(text, successMsg) {
        const temp = document.createElement('textarea');
        temp.value = text;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        window.SneakerStudio.App.showToast(successMsg, 'success');
    }

    return {
        init: init,
        generate: generateCaption
    };
})();
