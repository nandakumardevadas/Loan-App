const path = require('path');
const config = require(path.resolve('./config/env.json'))[process.env.NODE_ENV || 'development'];
const mongoose = require('mongoose');

class MongoDB {
    constructor() {
        this.dbConnection = this.initDB();
    }

    initDB() {
        try {
            let mongoConnect = mongoose.connect(config.MONGO_URI)
                                        .catch((exception) => {
                                            console.log(exception);
                                        });
            let mongoConnection = mongoose.connection;
            mongoConnection.on('error',console.log.bind(console,'DB Connection refused !!!!!'));
            mongoConnection.once('open', console.log.bind(console,'DB Connection Success !!!!!'));
        } catch(exception) {
            console.log(exception);
        }
    }
}

module.exports = MongoDB; 