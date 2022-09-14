const mongoose = require('mongoose')
const CollageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
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
module.export = mongoose.model('College', CollageSchema)

