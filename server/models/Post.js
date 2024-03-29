const {Schema, model, Types} = require("mongoose")

const Post = new Schema({
    owner: {type: Types.ObjectId, required: true, ref: 'User'},
    username: {type: String, required: true, ref: 'User'},
    title:{type: String, default: ""},
    image: {type: String, required: true},
    likes: {type: Number, default: 0},
    whoLikes: {type: Array, default: []},
    date: {type: String}
})


module.exports = model("Post", Post)