module.exports = async function antiLink(sock, msg, text, from, isOwner) {
    if (/chat.whatsapp.com\//i.test(text) && !isOwner) {
        await sock.sendMessage(from, { text: 'Link grup terdeteksi dan akan dihapus.' });
        await sock.sendMessage(from, { delete: msg.key });
        return true;
    }
    return false;
} 