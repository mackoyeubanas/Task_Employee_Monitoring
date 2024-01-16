const dotenv = require('dotenv');
dotenv.config()
const mongoose = require("mongoose");
const app = require('./index');

const connectDB = async()=>{
    const DB = process.env.MONGO_URL

mongoose.connect(DB)
    .then(() => { console.log('Database working 👍') })
    .catch(err => { console.log(err + 'Database error!') })

const port = process.env.PORT || 4000;
app.listen(port, err => {
    if (err) console.log(err)
    else console.log('CRUD application running on port ' + port + ' 💯');
});  }


module.exports = {connectDB};