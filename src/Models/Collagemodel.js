const mongoose = require('mongoose')
const CollageSchema = mongoose.Schema({
    name: {
        type: string,
        required: true,
        unique: true,
    },
    fullname: {
        type: string,
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
mondule.export = mongoose.model('Collage', CollageSchema)