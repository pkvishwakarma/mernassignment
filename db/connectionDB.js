const mongoose = require('mongoose');

const connectDB = (uri) => {
    return (
        mongoose.connect(uri).then(()=>{
            try{
                console.log('connect hua with db');
            }
            catch(error){
                console.log(error);
            }
        })
            // {
            //     useNewUrlParser: true,
            //     useUnifiedTopology: true,
            // }
        // )
    )
};

module.exports = connectDB;