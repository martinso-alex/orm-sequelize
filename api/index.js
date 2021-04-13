const express = require('express')

const app = express()

app.use(express.json())

const port = 3000

app.get('/', (req, res) => res.json('okay'))

app.listen(port, () => console.log(`server running on port ${port}`))

module.exports = app
