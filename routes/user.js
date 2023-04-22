const router = require("express").Router();
const { SignUpUser, LoginUser, GetUser, DeleteUser, UpdateUser } = require('../controller/user')
const { CheckUser } = require('../middleware/checkuser')

router.route('/signup').post(SignUpUser)
router.route('/login').post(LoginUser)
router.route('/').get(CheckUser, GetUser).delete(CheckUser, DeleteUser).patch(CheckUser, UpdateUser)


module.exports = router