require("dotenv").config()
const express = require("express")
const app = express()
const port = process.env.APP_PORT || 2210

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome Back",
  })
})

const counter = require("./routes/counter")

app.use("/counter", counter)

app.listen(port, (err) => {
  if (err) {
    console.log("Server Error")
  }

  console.log(`Server running at port ${port}`)

})


