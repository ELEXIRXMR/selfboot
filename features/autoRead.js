module.exports = async function autoRead(sock, msg) {
    if (msg.key && msg.key.remoteJid) {
        await sock.readMessages([msg.key]);
    }
} 