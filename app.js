const express = require("express")
require('dotenv').config()
const cors = require('cors')
const ConnectMongoDB = require("./db/db.js")
const user = require('./routes/user.js')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use("/api/v1/user", user)


app.get('/', (req, res) => {
    res.send({ message: 'welcome to API!!' })
})


ConnectMongoDB(process.env.MONGO_URI).then(() => {
    console.log('connected to db')
    app.listen(PORT, () => {
        console.log(`Listening on Port ${PORT}`)
    })

}).catch((err) => {
    console.log("error => ", err)
})