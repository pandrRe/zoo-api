const db = require('./config/db');
const app = require('./app');

db.sync().then((result) => {
    console.log(result);
    app.boot();
});
