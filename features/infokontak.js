module.exports = async function infokontak(sock, msg, text, from) {
    if(text === '!infokontak' && msg.message?.extendedTextMessage?.contextInfo?.participant) {
        const jid = msg.message.extendedTextMessage.contextInfo.participant;
        const vcard = await sock.onWhatsApp(jid);
        await sock.sendMessage(from, { text: `*Info Kontak:*\nJID: ${jid}\nWhatsApp: ${vcard[0]?.exists ? 'Ya' : 'Tidak'}` });
        return true;
    }
    return false;
} 