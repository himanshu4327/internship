const mongoose = require('mongoose')
const InternSchema = mongoose.Schema({
    name: {
        type: string,
        required: true,
    },
    email: {
        required: true,
        unique: true,
        trim: true,
        lowwercase:true
    },
    mobile: {
        require: true,
        trim: true,
        type: Number,
        unique: true
    },

    CollageId: {
        type: ObjectId,
        ref: Collage,
        trim: true
    },

    isDeleted: {
        type:Boolean,
        default: false
    },


}, { timestamp: true })
module.export = mongoose.model('intern', InternSchema)