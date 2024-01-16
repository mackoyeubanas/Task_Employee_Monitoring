const dotenv = require('dotenv');
dotenv.config()
const mongoose = require("mongoose");
const app = require('./index');

const DB = process.env.MONGO_URL.replace('<PASSWORD>', process.env.MONGO_PASSWORD);

mongoose.connect(DB)
    .then(() => { console.log('Database working 👍') })
    .catch(err => { console.log(err + 'Database error!') })

const port = process.env.PORT || 4000;
app.listen(port, err => {
    if (err) console.log(err)
    else console.log('CRUD application running on port ' + port + ' 💯');
});  