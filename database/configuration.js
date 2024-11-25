const mongoose = require('mongoose');

const mongoConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('MongoDB Connected')
    }catch(e){
        console.log('Error', e)
        throw new Error('Error connecting to MongoDB')
    }
}

module.exports = mongoConnection;