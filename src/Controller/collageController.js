const Models = require("../Models/CollageModel")






const isValidValue = function(value) { // Validation for Strings/ Empty strings
    if (typeof value !== "string") return false;
    else if (value.trim().length == 0) return false;
    else return true;
};

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
        const getCollegeId = college._id; // Extracting _id from college & using it to get interns

        const internData = await InternModel.find({ isDeleted: false, collegeId: getCollegeId }).select({ name: 1, email: 1, mobile: 1 })

        if (internData.length === 0) return res.status(400).send({ status: false, mrssage: "no college intern are found" })
        const data = {...collageDetails,
            interns: internData
        }
        return res.status(400).send({ status: true, data: data })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports.collegeDetails = collegeDetails