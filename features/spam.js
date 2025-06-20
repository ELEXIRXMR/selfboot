module.exports = async function spam(sock, msg, text, from, isOwner) {
    if(text.startsWith('!spam') && isOwner) {
        const args = text.split(' ');
        if(args.length >= 3) {
            const jumlah = parseInt(args[1]);
            const pesan = args.slice(2).join(' ');
            if(jumlah > 0 && jumlah <= 20) {
                for(let i=0; i<jumlah; i++) {
                    await sock.sendMessage(from, { text: pesan });
                }
            } else {
                await sock.sendMessage(from, { text: 'Jumlah spam maksimal 20.' });
            }
        } else {
            await sock.sendMessage(from, { text: 'Format: !spam <jumlah> <pesan>' });
        }
        return true;
    }
    return false;
} 