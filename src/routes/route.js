const express  = require("express")
const router =express.Router()
const collegeController = require("../Controller/collegeController.js")
const internController = require("../Controller/internController.js")


router.post("/functionup/colleges", collegeController.createCollege)
router.post("/functionup/interns", internController.createIntern)
router.get("/functionup/collegeDetails", collegeController.collegeDetails)

module.exports = router;