
const InternModel = require("../Models/InternModel")
const CollegeModel = require("../Models/CollegeModel")

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
    var validmobile = /^((\+91)?|91)?[0-9]{9}$/;
    return validmobile.test(mobile);
}
const isValidName = function (name) {
    const nameRegex = /^[a-zA-Z]{2,30}$/
    return nameRegex.test(name)
}

const createIntern = async function (req, res) {
    try {
        let { name, email, mobile, CollageId } = req.body

        if (Object.keys(req.body).length < 1)
         {
            return res.status(400).send({status:false,message: "Bad request" })
        }
        if (!isValid(name)) 
        {
            return res.status(400).send({status:false, message: "Enter Intern Name" })
        }
        if (!isValidName(name)) {
            return res.status(400).send({status:false, message: "Enter a valid Name" })
        }
      
        if (!isValid(email))
         {
            return res.status(400).send({status:false, message: "Enter a Email" })
        }
        if (!isValidEmail(email))
         {
            return res.status(400).send({status:false, message: "Enter a valid email" })
        }
        
        if (!isValid(mobile))
         {
            return res.status(400).send({status:false, message: "Enter Valid Number" })
        }
        if (!isValidMobile(mobile)) {
            return res.status(400).send({status:false, message: ` ${mobile} is not a vaild Mobile Number` })
        }
     
        let checkEmail = await InternModel.findOne({ email: email,isDeleted:false})
        if (checkEmail) return res.status(400).send({status:false, message: "Email Already Registered" })

        let checkMobile = await InternModel.findOne({ mobile: mobile, isDeleted:false})
        if (checkMobile) return res.status(400).send({status:false, message: "Mobile Already Registered" })
      
        let collegedetails = await CollegeModel.findOne({ CollageId: CollageId, isDeleted: false })
        if (!collegedetails) return res.status(404).send({ status: false, message: 'No such college Name Not Found!'});
        

        let internData = await InternModel.create(req.body)
        res.status(201).send({ status: true, msg:"Created Successfully", data: internData })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

module.exports.createIntern = createIntern



