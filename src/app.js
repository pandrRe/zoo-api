const express = require('express')
const app = express()
const port = 3000
const { FREEZE_CONFIG } = require('./config/values');

FREEZE_CONFIG();

app.use(express.json());

const animalRoute = require('./routes/animal');
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/animal', animalRoute);

function boot() {
    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`)
    })
}

module.exports = {boot, app};
