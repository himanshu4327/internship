const CollegeModel = require("../Models/CollegeModel");



const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length > 0) return true;
    return false;
};

const isValidRequest = function (object) {
    return Object.keys(object).length > 0
}


const createCollege = async function (req, res) {
    try {
        let data = req.body

        if (!isValidRequest(data)) {
            return res
                .status(400)
                .send({ status: false, message: "collage data is required" });
        }

        const { name, fullname, logoLink } = data;
        if (Object.keys(data).length > 3) {
            return res.status(400).send({ status: false, message: "invalid data entry inside request body" })
        }
        if (!isValid(name)) {
            return res.status(400).send({ status: false, msg: "name is mandatory field" })
        }
        let checkName = await CollegeModel.findOne({ name: name })
        if (!checkName) {
            return res.status(400).send({ status: false, msg: "please try with diffrent college name" })
        }
        if (!isValid(fullname)) {
            return res.status(400).send({ status: false, msg: "please provide the fullname" })
        }
        if (!isValid(logoLink)) {
            return res.status(400).send({ status: false, msg: "please provide logo" })
        }

        const newCollege = await CollegeModel.create(data)
        return res.status(201).send({ status: true, msg: newCollege })
    }
    catch (error) {

        console.log(error)
        return res.status(500).send({ err: err.message })
    }
}


const collegeDetails = async function(req, res) {
    try {
        let collegeName = req.query.collegeName


        if (!isValidValue(collegeName)) return res.status(201).send({ status: false, data: "please Enter the valid College Name" })
        const College = await CollageModel.findOne({ name: collegeName, isDeleted: false })
        if (!College)
            return res.status(400).send({ status: false, data: "this college is not found" })
        const collageDetails =
            ({
                name: College.collageName,
                fullName: College.fullName,
                logolink: College.logolink

            })
        const getCollegeId = college._id; 

        const internData = await InternModel.find({ isDeleted: false, collegeId: getCollegeId }).select({ _id: 1, name: 1, email: 1, mobile: 1 })

        if (internData.length === 0) return res.status(400).send({ status: false, mrssage: "no college intern are found" })
        const data = {...collageDetails,
            interns: internData
        }
        return res.status(400).send({ status: true, data: data })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


module.exports.createCollege = createCollege

module.exports.collegeDetails = collegeDetails