module.exports = async function broadcast(sock, msg, text, from, isOwner) {
    if(text.startsWith('!broadcast') && isOwner) {
        const pesan = text.replace('!broadcast', '').trim();
        if(pesan) {
            const chats = await sock.groupFetchAllParticipating();
            const allChats = Object.keys(chats);
            for(const jid of allChats) {
                await sock.sendMessage(jid, { text: pesan });
            }
            await sock.sendMessage(from, { text: `Broadcast terkirim ke ${allChats.length} grup.` });
        } else {
            await sock.sendMessage(from, { text: 'Format: !broadcast <pesan>' });
        }
        return true;
    }
    return false;
} 