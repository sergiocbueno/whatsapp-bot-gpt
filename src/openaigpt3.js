import { Configuration, OpenAIApi } from "openai"

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

export { getTextDavinciByText, getDallEImageResponse };