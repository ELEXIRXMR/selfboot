const axios = require('axios');

module.exports = async function shortlink(sock, msg, text, from) {
    if (text.startsWith('!short ')) {
        const url = text.split(' ')[1];
        if (url) {
            try {
                const res = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
                await sock.sendMessage(from, { text: `Shortlink: ${res.data}` });
            } catch {
                await sock.sendMessage(from, { text: 'Gagal membuat shortlink.' });
            }
        } else {
            await sock.sendMessage(from, { text: 'Format: !short <url>' });
        }
        return true;
    }
    return false;
} 