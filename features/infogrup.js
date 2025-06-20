module.exports = async function infogrup(sock, msg, text, from) {
    if(text === '!infogrup' && from.endsWith('@g.us')) {
        const metadata = await sock.groupMetadata(from);
        let info = `*Info Grup:*\nNama: ${metadata.subject}\nDeskripsi: ${metadata.desc || '-'}\nAnggota: ${metadata.participants.length}`;
        await sock.sendMessage(from, { text: info });
        return true;
    }
    return false;
} 