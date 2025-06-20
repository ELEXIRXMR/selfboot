const BOT_START = Date.now();
function msToTime(duration) {
    let seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
        days = Math.floor(duration / (1000 * 60 * 60 * 24));
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
module.exports = async function uptime(sock, msg, text, from) {
    if(text === '!uptime') {
        const uptime = msToTime(Date.now() - BOT_START);
        await sock.sendMessage(from, { text: `Uptime: ${uptime}` });
        return true;
    }
    return false;
} 