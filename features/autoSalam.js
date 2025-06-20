module.exports = async function autoSalam(sock, msg, text, from) {
    if (/ass?alam(ualaikum)?/i.test(text)) {
        await sock.sendMessage(from, { text: 'Waalaikumsalam!' });
        return true;
    }
    return false;
} 