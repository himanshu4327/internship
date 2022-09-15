const InternModel = require("../Models/InternModel")
const CollegeModel = require("../Models/Collegemodel")


const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value !== 'string' || value.trim().length === 0) return false
    return true
}

const isValidEmail = function (email) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return emailRegex.test(email)
}
const isValidMobile = function (mobile) {
    var validmobile = /^((\+91)?|91)?[0-9]{10}$/;
    return validmobile.test(mobile);
}
const isValidName = function (name) {
    const nameRegex = /^[a-zA-Z]+(\s[a-zA-Z]+)?$/
    return nameRegex.test(name)
}


const createIntern = async function (req, res) {
    try {
        let data = req.body
        let { name, email, mobile, collegeName } = data
        if (Object.keys(data).length < 1) {
            return res.status(400).send({ status: false, message: "Bad request" })
        }
        if (!isValid(name)) {
            return res.status(400).send({ status: false, message: "Enter Intern Name" })
        }
        if (!isValidName(name)) {
            return res.status(400).send({ status: false, message: "Enter a valid Name" })
        }
        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: "Enter a Email" })
        }
        if (!isValidEmail(email)) {
            return res.status(400).send({ status: false, message: "Enter a valid email" })
        }
        let checkEmail = await InternModel.findOne({ email: email, isDeleted: false })
        if (checkEmail) {
            return res.status(409).send({ status: false, message: "Email Already Registered" })
        }
        if (!isValid(mobile)) {
            return res.status(400).send({ status: false, message: "Enter Valid Number" })
        }
        if (!isValidMobile(mobile)) {
            return res.status(400).send({ status: false, message: ` ${mobile} is not a vaild Mobile Number` })
        }
        let checkMobile = await InternModel.findOne({ mobile: mobile, isDeleted: false })
        if (checkMobile) {
            return res.status(409).send({ status: false, message: "Mobile Already Registered" })
        }
        if (!isValid(collegeName)) {
            return res.status(400).send({ status: false, message: "Enter a valid college name" })
        }
        let collegeDetails = await CollegeModel.findOne({ name: collegeName, isDeleted: false })
        if (!collegeDetails) {
            return res.status(404).send({ status: false, message: `College not found by name ${collegeName}` })
        }
        let CollegeId = collegeDetails._id
        console.log(CollegeId)
        data.collegeId = CollegeId
        delete data.collegeName

        let internData = await InternModel.create(data)
        res.status(201).send({ status: true, msg: "Created Successfully", data: internData })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ status: false, message: error.message })
    }
}

module.exports.createIntern = createIntern