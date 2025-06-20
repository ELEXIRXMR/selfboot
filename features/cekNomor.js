module.exports = async function cekNomor(sock, msg, text, from) {
    if (text.startsWith('!cek ')) {
        const nomor = text.split(' ')[1].replace(/[^0-9]/g, '');
        if (nomor) {
            const jid = nomor + '@s.whatsapp.net';
            const exists = await sock.onWhatsApp(jid);
            await sock.sendMessage(from, { text: exists[0]?.exists ? 'Nomor terdaftar di WhatsApp.' : 'Nomor tidak terdaftar di WhatsApp.' });
        } else {
            await sock.sendMessage(from, { text: 'Format: !cek <nomor>' });
        }
        return true;
    }
    return false;
} 