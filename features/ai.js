const axios = require('axios');

module.exports = async function ai(sock, msg, text, from) {
    if(text.startsWith('!ai ')) {
        const pesan = text.replace('!ai ', '').trim();
        if(pesan) {
            try {
                const res = await axios.get(`https://api.simsimi.net/v2/?text=${encodeURIComponent(pesan)}&lc=id`);
                await sock.sendMessage(from, { text: res.data.success });
            } catch {
                await sock.sendMessage(from, { text: 'Gagal balas AI.' });
            }
        }
        return true;
    }
    return false;
} 