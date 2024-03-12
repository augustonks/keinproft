const mongoose = require("mongoose");
const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.REMOTE_DB_CONNECTION_STRING);
        console.log("Remote database connected sucessfully!");
    } catch (error) {
        console.log("Remote database cannot be connected: ", error);
        console.log("Trying to connect to local database...");

        try {
            await mongoose.connect(process.env.lOCAL_DB_CONNECTION_STRING);
            console.log("Local database connected sucessfully!");
        } catch (error) {
            console.log("Local database cannot be connected: ", error);
        }
    }
};

module.exports = connectToDatabase;
