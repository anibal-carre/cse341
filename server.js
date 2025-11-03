const express = require("express")
const app = express()

const port = 8080
const host = "localhost"


app.listen(port, () => {
    console.log(`app running on ${host}:${port}`)
})