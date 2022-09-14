const mongoose = require('mongoose')
const CollageSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    fullName: {
        type: String,
        required: true,
    },
    logoLink: {
        type:String,
        require: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamp: true })
module.exports = mongoose.model('College', CollageSchema)