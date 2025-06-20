module.exports = async function listgrup(sock, msg, text, from) {
    if(text === '!listgrup') {
        const groups = await sock.groupFetchAllParticipating();
        let list = '*Daftar Grup:*\n';
        let i = 1;
        for(const id in groups) {
            list += `${i++}. ${groups[id].subject}\n`;
        }
        await sock.sendMessage(from, { text: list });
        return true;
    }
    return false;
} 