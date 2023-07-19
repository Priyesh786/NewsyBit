const express = require('express')
const dbConnect = require('./dbConnect')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
const newsRoute = require('./routes/newsRoute')
const userRoute = require('./routes/userRoute')
const port = 5000

app.use('/api/newsItems', newsRoute)
app.use('/api/users', userRoute)
app.get('/', (req,res) => res.send("Hello World"));
app.listen(port, () =>console.log(`App listening on port ${port}!`))