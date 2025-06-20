module.exports = async function autoResponBot(sock, msg, text, from) {
    if (/\bbot\b/i.test(text)) {
        await sock.sendMessage(from, { text: 'Saya di sini!' });
        return true;
    }
    return false;
} 