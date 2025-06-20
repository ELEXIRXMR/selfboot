module.exports = async function evalCmd(sock, msg, text, from, isOwner) {
    if(text.startsWith('!eval') && isOwner) {
        const kode = text.replace('!eval', '').trim();
        try {
            let hasil = eval(kode);
            if(typeof hasil !== 'string') hasil = require('util').inspect(hasil);
            await sock.sendMessage(from, { text: hasil });
        } catch (e) {
            await sock.sendMessage(from, { text: String(e) });
        }
        return true;
    }
    return false;
} 