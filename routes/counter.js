const router = require("express").Router()
const { getMachineCounter, getMachineNameCounter, postMachine, delCounter } = require("../controllers/counter")

router.get("/:dalmesin", getMachineCounter)
// router.get("/byname/:namamesin", getMachineNameCounter)
router.post("/", postMachine)
router.delete("/:id", delCounter)

module.exports = router