const { downloadMediaMessage } = require('@whiskeysockets/baileys');
const pino = require('pino');

module.exports = async function autoSticker(sock, msg, from) {
    if (msg.message?.imageMessage) {
        const buffer = await downloadMediaMessage(msg, 'buffer', {}, { logger: pino() });
        await sock.sendMessage(from, { sticker: buffer }, { quoted: msg });
        return true;
    }
    return false;
} 