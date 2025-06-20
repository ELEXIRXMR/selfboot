const axios = require('axios');

module.exports = async function fakta(sock, msg, text, from) {
    if(text === '!fakta') {
        try {
            const res = await axios.get('https://asli-fakta-api.vercel.app/api/fakta');
            await sock.sendMessage(from, { text: res.data.data });
        } catch {
            await sock.sendMessage(from, { text: 'Gagal mengambil fakta.' });
        }
        return true;
    }
    return false;
} 