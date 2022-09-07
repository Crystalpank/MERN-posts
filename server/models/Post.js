const {Schema, model, Types} = require("mongoose")

const Post = new Schema({
    username: {type: String, required: true, ref: 'User'},
    title:{type: String, default: ""},
    image: {type: String, required: true},
    likes: {type: Number, default: 0}
})


module.exports = model("Post", Post)