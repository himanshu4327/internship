const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;
const InternSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase:true
    },
    mobile: {
        require: true,
        trim: true,
        type: Number,
        unique: true
    },

    CollegeId: {
        type: ObjectId,
        ref: "College",
        trim: true
    },

    isDeleted: {
        type:Boolean,
        default: false
    },


}, { timestamp: true })
module.export = mongoose.model('Intern', InternSchema)