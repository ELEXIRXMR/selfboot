const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const pino = require('pino');
const express = require('express');
const path = require('path');
const qrcode = require('qrcode-terminal');

const menu = require('./features/menu');
const antiDelete = require('./features/antiDelete');
const antiLink = require('./features/antiLink');
const autoRead = require('./features/autoRead');
const autoSalam = require('./features/autoSalam');
const autoSticker = require('./features/autoSticker');
const autoResponBot = require('./features/autoResponBot');
const shortlink = require('./features/shortlink');
const cekNomor = require('./features/cekNomor');
const cuaca = require('./features/cuaca');
const infoNomor = require('./features/infoNomor');
const quote = require('./features/quote');
const fakta = require('./features/fakta');
const ai = require('./features/ai');
const infogrup = require('./features/infogrup');
const listgrup = require('./features/listgrup');
const infokontak = require('./features/infokontak');
const time = require('./features/time');
const uptime = require('./features/uptime');
const getmedia = require('./features/getmedia');
const spam = require('./features/spam');
const broadcast = require('./features/broadcast');
const evalCmd = require('./features/eval');
const me = require('./features/me');
const ping = require('./features/ping');

const app = express();
const PORT = process.env.PORT || 3100;
const OWNER_NUMBER = process.env.OWNER_NUMBER || '6281234567890';

app.get('/health', (req, res) => res.send('OK'));
app.listen(PORT, () => console.log(`Health check running on port ${PORT}`));

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');
    const sock = makeWASocket({
        logger: pino({ level: 'silent' }),
        auth: state
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;
        if (qr) {
            qrcode.generate(qr, { small: true });
        }
        if(connection === 'close') {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('connection closed due to', lastDisconnect?.error, ', reconnecting', shouldReconnect);
            if(shouldReconnect) {
                startBot();
            }
        } else if(connection === 'open') {
            console.log('Bot is connected');
        }
    });

    sock.ev.on('messages.upsert', async ({ messages, type }) => {
        if(type !== 'notify') return;
        const msg = messages[0];
        if(!msg.key.fromMe) return;
        const from = msg.key.remoteJid;
        const sender = msg.key.participant || msg.key.remoteJid;
        const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || '';
        const isOwner = sender.includes(OWNER_NUMBER);

        await Promise.all([
            menu(sock, msg, text, from),
            me(sock, msg, text, from),
            ping(sock, msg, text, from),
            antiLink(sock, msg, text, from, isOwner),
            autoRead(sock, msg),
            autoSalam(sock, msg, text, from),
            autoSticker(sock, msg, from),
            autoResponBot(sock, msg, text, from),
            shortlink(sock, msg, text, from),
            cekNomor(sock, msg, text, from),
            cuaca(sock, msg, text, from),
            infoNomor(sock, msg, text, from),
            quote(sock, msg, text, from),
            fakta(sock, msg, text, from),
            ai(sock, msg, text, from),
            infogrup(sock, msg, text, from),
            listgrup(sock, msg, text, from),
            infokontak(sock, msg, text, from),
            time(sock, msg, text, from),
            uptime(sock, msg, text, from),
            getmedia(sock, msg, text, from),
            spam(sock, msg, text, from, isOwner),
            broadcast(sock, msg, text, from, isOwner),
            evalCmd(sock, msg, text, from, isOwner)
        ]);
        antiDelete.handleUpsert(msg);
    });

    sock.ev.on('messages.update', async updates => {
        await antiDelete.handleUpdate(sock, updates);
    });
}

startBot();
