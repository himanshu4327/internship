const express  = require("express")
const router =express.Router()
<<<<<<< HEAD
const collegeController = require("../Controller/collegeController")
const internController = require("../Controller/internController")
=======
const collegeController = require("../Controller/collegeController.js")
const internController = require("../Controller/internController.js")
>>>>>>> 7122edc8db580a2a8d321bf37a7e13f8883bae96


router.post("/functionup/colleges", collegeController.createCollege)
router.post("/functionup/interns", internController.createIntern)
router.get("/functionup/collegeDetails", collegeController.collegeDetails)

module.exports = router;