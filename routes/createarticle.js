const router = require("express").Router();
const { CreateArticle } = require('../controller/createarticle')
const { CheckUser } = require('../middleware/checkuser')

router.route('/').post(CheckUser, CreateArticle)

module.exports = router