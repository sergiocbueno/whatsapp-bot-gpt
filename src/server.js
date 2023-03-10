import { create } from 'venom-bot'
import * as dotenv from 'dotenv'
import { getTextDavinciByText, getDallEImageResponse } from './openaigpt3.js';

dotenv.config({ path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env' })

create({
    session: 'whatsapp-bot'
}).then((client) => {
    initializeClient(client)
}).catch((error) => {
    console.error(error)
})

async function initializeClient(client) {
    client.onAnyMessage((message) => {
        console.log('Analyzing message received...')
        if (message.body && message.from.includes(process.env.PHONE_NUMBER)) {
            if (message.body.includes('/image')) {
                var messageFormatted = message.body.replace('/image','');
                getDallEImageResponse(messageFormatted).then((imgUrl) => {
                    client.sendImage(
                        message.from,
                        imgUrl,
                        messageFormatted,
                        'Image generated By DALL-E AI 🤖'
                    )
                })
            } else {
                getTextDavinciByText(message.body).then((response) => {
                    client.sendText(message.from, response)
                })
            }
        }
    })
}