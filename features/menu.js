module.exports = async function menu(sock, msg, text, from) {
    if(text === '!menu' || text === '!help') {
        await sock.sendMessage(from, { text: `*Selfbot WhatsApp - Menu Fitur*

!menu / !help - Tampilkan menu
!ping - Cek latency bot
!me - Info profil sendiri
!sticker (reply gambar) - Ubah gambar jadi sticker
!getmedia (reply media) - Download media
!spam <jumlah> <pesan> - Spam pesan (owner only)
!broadcast <pesan> - Kirim pesan ke semua grup (owner only)
!eval <kode> - Eksekusi kode JS (owner only)
!status <nomor> - Cek status online kontak
!listgrup - List semua grup
!infogrup - Info grup ini
!infokontak (reply) - Info kontak
!time - Waktu server
!uptime - Uptime bot
!quote - Random quote
!fakta - Random fakta unik
!ai <pesan> - Chat AI (SimSimi)
!short <url> - Shortlink
!cek <nomor> - Cek nomor WhatsApp
!cuaca <kota> - Info cuaca
!infonomor <nomor> - Info provider/lokasi nomor

Fitur lain: auto-read, auto-sticker, anti-link, anti-delete, auto-respon salam, auto-respon kata 'bot'.
` });
        return true;
    }
    return false;
} 