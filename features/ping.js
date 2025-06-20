module.exports = async function ping(sock, msg, text, from) {
    if(text === '!ping') {
        const start = Date.now();
        const sentMsg = await sock.sendMessage(from, { text: 'Pinging...' });
        const latency = Date.now() - start;
        await sock.sendMessage(from, { text: `Pong! Latency: ${latency}ms` }, { quoted: sentMsg });
        return true;
    }
    return false;
} 