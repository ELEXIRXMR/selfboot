module.exports = async function me(sock, msg, text, from) {
    if(text === '!me') {
        const user = sock.user;
        await sock.sendMessage(from, { text: `*Info Profil*
Nomor: ${user.id}
Nama: ${user.name}` });
        return true;
    }
    return false;
} 