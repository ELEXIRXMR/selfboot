const axios = require('axios');

module.exports = async function quote(sock, msg, text, from) {
    if(text === '!quote') {
        try {
            const res = await axios.get('https://api.quotable.io/random');
            await sock.sendMessage(from, { text: `_${res.data.content}_\n- *${res.data.author}*` });
        } catch {
            await sock.sendMessage(from, { text: 'Gagal mengambil quote.' });
        }
        return true;
    }
    return false;
} 