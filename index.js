import { create } from 'venom-bot'
import * as dotenv from 'dotenv'
import { Configuration, OpenAIApi } from "openai"

dotenv.config({ path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env' })

create({
    session: 'whatsapp-bot'
}).then((client) => {
    initializeClient(client)
}).catch((error) => {
    console.error(error)
})

const openaiConfiguration = new Configuration({
    organization: process.env.OPENAI_ORGANIZATION_ID,
    apiKey: process.env.OPENAI_SECRET_KEY,
});

const openaiInstance = new OpenAIApi(openaiConfiguration);

const getTextDavinciByText = async (sentence) => {
    const options = {
        model: 'text-davinci-003',
        prompt: sentence,
        temperature: 1,
        max_tokens: 4000
    }

    try {
        const response = await openaiInstance.createCompletion(options)
        
        let davinciResponse = ''
        response.data.choices.forEach(({ text }) => {
            davinciResponse += text
        })

        return `🤖\n\n ${davinciResponse.trim()}`
    } catch (error) {
        console.error(error.response.data.error.message)
        return `❌ OpenAI Response Error: ${error.response.data.error.message}`
    }
}

const getDallEImageResponse = async (imageDescription) => {
    const options = {
        prompt: imageDescription,
        n: 1,
        size: '1024x1024'
    }

    try {
        const response = await openaiInstance.createImage(options);
        return response.data.data[0].url
    } catch (error) {
        console.error(error.response.data.error.message)
        return `❌ OpenAI Image Response Error: ${error.response.data.error.message}`
    }
}

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