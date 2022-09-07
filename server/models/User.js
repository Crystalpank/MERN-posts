const {Schema, model, Types} = require("mongoose")

const User = new Schema({
    username:{type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    posts: [{type: Types.ObjectId, ref: 'Post'}],
    avatar: {type: String},
    birthday: {type: Date}
})


module.exports = model("User", User)