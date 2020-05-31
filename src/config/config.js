"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    http: {
        port: 3001,
    },
    https: {
        port: 3002,
    },
    mongodb: {
        uri: "mongodb://localhost/agrobot",
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
    redis: {
        host: 'localhost',
        port: 6379,
        ttl: 86400,
    },
};
