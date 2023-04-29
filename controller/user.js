const User = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const SignUpUser = async (req, res) => {
    //  console.log(req.body)
    const checkuser = await User.find({ email: req.body.email })
    if (checkuser.length) {
        return res.status(409).json({ message: "User Already Exists", status: false })
    }
    else {
        bcrypt.hash(req.body.password, 10, async (err, hash) => {
            if (err) {
                return res.status(500).json({
                    error: `bycrypterr ${err}`,
                    status: false
                })
            }
            else {
                try {
                    const user = await User.create({
                        name: req.body.name,
                        email: req.body.email,
                        password: hash,
                        key: req.body.key
                    })
                    res.status(201).json({
                        message: 'User created successfully',
                        status: true
                    })
                }
                catch (err) {
                    res.status(500).json({
                        error: err,
                        status: false
                    })
                }
            }
        })
    }

}


const LoginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(401).json({
                message: "Auth Failed",
                status: false
            })
        }
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (result) {
                const token = jwt.sign(
                    {
                        email: user.email,
                        userId: user._id
                    },
                    process.env.JWT_KEY
                )
                return res.status(200).json({
                    messagae: "Auth Successfull",
                    // token: token,
                    user: { name: user.name, email: user.email, token, key: user.key },
                    status: true
                })
            }
            res.status(401).json({
                message: "Auth Failed"
            })
        })
    }
    catch (err) {
        res.status(500).json({
            error: err
        })
    }
}


const GetUser = async (req, res) => {
    const userId = req.userData.userId
    try {
        const user = await User.findOne({ _id: userId })
        if (!user) {
            return res.status(401).json({
                message: 'auth token invalid',
                status: false
            })
        }
        res.status(200).json({
            data: user,
            status: true
        })
    }
    catch (err) {
        res.status(500).json({
            error: err,
            status: false
        })
    }
}


const DeleteUser = async (req, res) => {
    const userId = req.userData.userId
    try {
        const user = await User.findOneAndDelete({ _id: userId })
        if (!user) {
            return res.status(401).json({
                message: 'auth token invalid',
                status: false
            })
        }
        res.status(200).json({
            message: 'User deleted successfully',
            status: true
        })
    }
    catch (err) {
        res.status(500).json({
            error: err,
            status: false
        })
    }
}


const UpdateUser = async (req, res) => {
    const userId = req.userData.userId
    const newObj = {}
    for (let i = 0; i < Object.keys(req.body).length; i++) {
        if (Object.keys(req.body)[i] == 'password') {
            try {
                let hash = await bcrypt.hash(Object.values(req.body)[i], 10)
                newObj['password'] = hash
                continue;
            }
            catch (err) {
                return res.status(500).json({
                    error: err,
                    status: false
                })
            }
        }
        newObj[Object.keys(req.body)[i]] = Object.values(req.body)[i]
    }

    try {
        const user = await User.findOneAndUpdate({ _id: userId }, newObj)
        if (!user) {
            return res.status(401).json({
                message: 'auth token invalid',
                status: false
            })
        }
        res.status(200).json({ message: 'User updated successfully' })
    }
    catch (err) {
        res.status(500).json({
            error: err,
            status: false
        })
    }
}



module.exports = {
    SignUpUser,
    LoginUser,
    GetUser,
    UpdateUser,
    DeleteUser,
}