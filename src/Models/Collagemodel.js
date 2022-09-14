const mongoose = require('mongoose')
const CollageSchema = mongoose.schema({
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
        type: string,
        require: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamp: true })
mondule.export = mongoose.model('Collage', CollageSchema)