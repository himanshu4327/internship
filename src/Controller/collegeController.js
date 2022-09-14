const CollegeModel = require('../Models/Collegemodel')

const isValidString = function (value) {
    if (typeof value === "undefined" || value === null) {
        return false;
    }
    if (typeof value === "string" && value.trim().length > 0) {
        return true;
    } else {
        return false;
    }
};

const isValidRequest = function (object) {
    if (Object.keys(object).length === 0) {
        return false
    } else {
        return true
    }
}

const createCollege = async function (req, res) {
    try {
        let data = req.body
        if (!isValidRequest(data)) {
            return res
                .status(400)
                .send({ status: false, message: "Collage data is required" });
        }
        let { name, fullName, logoLink } = data;
        if (Object.keys(data).length > 3) {
            return res.status(400).send({ status: false, message: "Invalid data entry inside request body" })
        }
        if (!isValidString(name)) {
            return res.status(400).send({ status: false, msg: "Name should be string" })
        }
        let checkName = await CollegeModel.findOne({name: name})
        if (checkName) {
            return res.status(404).send({ status: false, msg: "College already exists" })
        }
        if (!isValidString(fullName)) {
            return res.status(400).send({ status: false, msg: "Fullname should be string" })
        }
        if (!isValidString(logoLink)) {
            return res.status(400).send({ status: false, msg: "Please provide logo" })
        }
        const newCollege = await CollegeModel.create(data)
        return res.status(201).send({ status: true, msg: newCollege })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ error: error.message })
    }
}

const collegeDetails = async function (req, res) {
    try {
        let collegeName = req.query.collegeName

        if (!isValidValue(collegeName)) return res.status(201).send({ status: false, data: "please Enter the valid College Name" })
        const College = await CollegeModel.findOne({ name: collegeName, isDeleted: false })
        if (!College)
            return res.status(404).send({ status: false, data: "College not found" })
        const collageDetails =
            ({
                name: College.collageName,
                fullName: College.fullName,
                logolink: College.logolink
            })
        const getCollegeId = college._id;
        const internData = await InternModel.find({ isDeleted: false, collegeId: getCollegeId }).select({ name: 1, email: 1, mobile: 1 })

        if (internData.length === 0) return res.status(400).send({ status: false, message: "No college intern are found" })
        const data = {
            ...collageDetails,
            interns: internData
        }
        return res.status(200).send({ status: true, data: data })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports.createCollege = createCollege
module.exports.collegeDetails = collegeDetails