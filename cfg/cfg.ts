export default 

{
    http: {
        port: 3001,
    },
    
    https: {
        port: 3002,
    },
  
    mongodb: {
    	uri: "mongodb://localhost/horus",
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        }
    },

    redis: {
        host: 'localhost',
        port: 6379,
        ttl: 86400,
        pass: ''
    },
    
    jwt: {
        key: 'CLLLAAAAAAAVESECRET3A1235d7',
        tokenExpireTime: '1h',
    }
};
