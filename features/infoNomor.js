const axios = require('axios');

module.exports = async function infoNomor(sock, msg, text, from) {
    if (text.startsWith('!infonomor ')) {
        const nomor = text.split(' ')[1].replace(/[^0-9]/g, '');
        if (nomor) {
            try {
                const res = await axios.get(`https://numlookupapi.com/api/v1/validate/${nomor}?apikey=free`);
                if (res.data && res.data.valid) {
                    await sock.sendMessage(from, { text: `*Info Nomor:*\nNomor: ${res.data.international_format}\nNegara: ${res.data.country_name}\nOperator: ${res.data.carrier}` });
                } else {
                    await sock.sendMessage(from, { text: 'Nomor tidak valid.' });
                }
            } catch {
                await sock.sendMessage(from, { text: 'Gagal cek info nomor.' });
            }
        } else {
            await sock.sendMessage(from, { text: 'Format: !infonomor <nomor>' });
        }
        return true;
    }
    return false;
} 