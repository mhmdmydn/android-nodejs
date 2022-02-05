'use-strict'
const mongoose = require('mongoose')

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log(`[DATABASE] Successfully connected : ${conn.connection.host}`)
    } catch (err) {
        console.error('[DATABASE] Failed to connect : \n\n' + err)
        process.exit(1)
    }
}

module.exports = connectDb;
