const { downloadMediaMessage } = require('@whiskeysockets/baileys');
const pino = require('pino');

module.exports = async function getmedia(sock, msg, text, from) {
    if(text === '!getmedia' && msg.message?.extendedTextMessage?.contextInfo?.quotedMessage) {
        const quoted = msg.message.extendedTextMessage.contextInfo.quotedMessage;
        const mediaMsg = { ...msg, message: quoted };
        try {
            const buffer = await downloadMediaMessage(mediaMsg, 'buffer', {}, { logger: pino() });
            let type = Object.keys(quoted)[0];
            let ext = type === 'imageMessage' ? '.jpg' : type === 'videoMessage' ? '.mp4' : type === 'audioMessage' ? '.mp3' : '';
            await sock.sendMessage(from, { document: buffer, mimetype: 'application/octet-stream', fileName: `media${ext}` }, { quoted: msg });
        } catch (e) {
            await sock.sendMessage(from, { text: 'Gagal download media.' });
        }
        return true;
    }
    return false;
} 