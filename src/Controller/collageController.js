const Models = require("../Models/CollageModel")

const collageDetails = async function(req, res) {
    try {
        let collageName = req.query.collageName


        if (!isValidValue(collageName)) return res.status(201).send({ status: false, data: "please Enter the valid CollageName" })
        const Collage = await CollageModel.findOne({ name: collageName, isDeleted: false })
        if (!Collage)
            return res.status(400).send({ status: false, data: "this collage is not found" })
        const collageDetails =
            ({
                name: Collage.collageName,
                fullName: Collage.fullName,
                logolink: Collage.logolink

            })
        const getCollegeId = college._id; // Extracting _id from college & using it to get interns

        const internData = await InternModel.find({ isDeleted: false, collegeId: getCollegeId }).select({ name: 1, email: 1, mobile: 1 })

        if (internData.length === 0) return res.status(400).send({ status: false, mrssage: "no collage intern are found" })
        const data = {...collageDetails,
            interns: internData
        }
        return res.status(400).send({ status: true, data: data })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports.collageDetails = collageDetails