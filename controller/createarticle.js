const User = require("../model/user")
const { Configuration, OpenAIApi } = require("openai");

const CreateArticle = async (req, res) => {
    const { email } = req.userData
    const user = await User.findOne({ email: email })
    if (!user) {
        return res.status(401).json({
            message: "Auth failed",
            status: false
        })
    }
    try {
        // const configuration = new Configuration({
        //     apiKey: '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'
        // });
        // const openai = new OpenAIApi(configuration);
        // const response = await openai.createCompletion({
        //     model: "text-davinci-003",
        //     prompt: req.body.prompt,
        //     temperature: 0,
        //     max_tokens: 7,
        // });
        // const data = await response.json()
        const length = req.body.length === 'small' ? 500 : req.body.length === 'medium' ? 1000 : req.body.length === 'large' ? 2000 : 1000
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${user.key}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: 'text-davinci-003',
                prompt: req.body.prompt,
                max_tokens: length,
                n: req.body.number
            })
        })
        const data = await response.json()
        // console.log(data)
        if (data.error) {
            return res.json({ status: 'error', error: data.error })
        }
        res.json({ status: 'ok', data })
    }
    catch (err) {
        res.json({ status: 'error', error: { message: 'Internal serever error' } })
    }

}

module.exports = {
    CreateArticle
}