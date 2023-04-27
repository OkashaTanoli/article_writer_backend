const Articles = require("../model/articlesHistory")
const User = require("../model/user")

const AddArticle = async (req, res) => {
    const { email, userId } = req.userData
    const user = await User.findOne({ email: email })
    if (!user) {
        return res.status(401).json({
            message: "Auth failed",
            status: false
        })
    }
    try {
        const article = await Articles.create({
            creator: userId,
            articles: req.body.articles.map((val) => {
                return {
                    article: val
                }
            })
        })
        res.json({ status: 'ok', article })
    }
    catch (err) {
        res.json({ status: 'error', error: { message: 'Internal serever error' } })
    }

}


const GetArticles = async (req, res) => {
    const { email, userId } = req.userData
    const user = await User.findOne({ email: email })
    if (!user) {
        return res.status(401).json({
            message: "Auth failed",
            status: false
        })
    }
    try {
        const articles = await Articles.find({ creator: userId }).sort({ time: -1 })
        res.json({ status: 'ok', articles })
    }
    catch (err) {
        res.json({ status: 'error', error: { message: 'Internal serever error' } })
    }

}



const EditArticle = async (req, res) => {
    const { email, userId } = req.userData
    const user = await User.findOne({ email: email })
    if (!user) {
        return res.status(401).json({
            message: "Auth failed",
            status: false
        })
    }
    try {
        const articles = await Articles.findOneAndUpdate({ _id: req.params.id }, { articles: req.body.articles })
        res.json({ status: 'ok', articles })
    }
    catch (err) {
        res.json({ status: 'error', error: { message: 'Internal serever error' } })
    }

}





module.exports = {
    AddArticle,
    GetArticles,
    EditArticle
}