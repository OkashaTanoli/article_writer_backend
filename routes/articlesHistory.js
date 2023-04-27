const router = require("express").Router();
const { AddArticle, GetArticles,EditArticle } = require('../controller/articlesHistory')
const { CheckUser } = require('../middleware/checkuser')

router.route('/').post(CheckUser, AddArticle).get(CheckUser, GetArticles)
router.route('/:id').patch(CheckUser, EditArticle)

module.exports = router