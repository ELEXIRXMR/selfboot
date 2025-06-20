const antiDeleteStore = {};

function handleUpsert(msg) {
    if (msg.key && msg.key.id && msg.message) {
        antiDeleteStore[msg.key.id] = msg;
    }
}

async function handleUpdate(sock, updates) {
    for(const update of updates) {
        if(update.update && update.update.type === 'revoked') {
            const msgId = update.key.id;
            const chatId = update.key.remoteJid;
            const originalMsg = antiDeleteStore[msgId];
            if(originalMsg && originalMsg.message) {
                let text = '*[ANTI-DELETE]*\nPesan yang dihapus:\n';
                if(originalMsg.message.conversation) {
                    text += originalMsg.message.conversation;
                } else if(originalMsg.message.extendedTextMessage?.text) {
                    text += originalMsg.message.extendedTextMessage.text;
                } else {
                    text += '[Pesan non-text atau media]';
                }
                await sock.sendMessage(chatId, { text });
            }
        }
    }
}

module.exports = { handleUpsert, handleUpdate }; 