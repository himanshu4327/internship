const mongoose = require('mongoose')
const CollageSchema = mongoose.schema({
    name: {
        type: string,
        required: true,
        unique: true,
    },
    fullName: {
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
mondule.export = mongoose.model('College', CollageSchema)

