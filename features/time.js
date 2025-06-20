module.exports = async function time(sock, msg, text, from) {
    if(text === '!time') {
        const now = new Date();
        await sock.sendMessage(from, { text: `Waktu server: ${now.toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}` });
        return true;
    }
    return false;
} 