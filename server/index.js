const express = require("express")
const mongoose = require("mongoose")
const config = require("config")
const app = express()
const PORT = config.get("PORT")
const authRoute = require("./routes/auth.route")
const todoRoute = require("./routes/post.route")
const userRoute = require("./routes/user.route")
const fileUpload = require("express-fileupload")

app.use(express.json())
app.use(express.static("upload"))
app.use(fileUpload({}))
app.use("/api/auth", authRoute)
app.use("/api/posts", todoRoute)
app.use("/api/user", userRoute)

const start = async () => {
    try{
        await mongoose.connect(config.get("dbURL"), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => {
            console.log(`Server start at PORT ${PORT}`)
        })
    }catch(e){
        console.log(e)
    }

}


start()