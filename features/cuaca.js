const axios = require('axios');

module.exports = async function cuaca(sock, msg, text, from) {
    if (text.startsWith('!cuaca ')) {
        const kota = text.replace('!cuaca ', '').trim();
        if (kota) {
            try {
                const res = await axios.get(`https://wttr.in/${encodeURIComponent(kota)}?format=3`);
                await sock.sendMessage(from, { text: res.data });
            } catch {
                await sock.sendMessage(from, { text: 'Gagal cek cuaca.' });
            }
        } else {
            await sock.sendMessage(from, { text: 'Format: !cuaca <kota>' });
        }
        return true;
    }
    return false;
} 