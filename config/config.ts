export default 

{
    arrConfig_WebService: {
        intHttpPort: 3001,
        intHttpsPort: 3002,
    },
  
    arrConfig_Mongodb: {
    	strConnection: "mongodb://localhost/agrobot",
        arrOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
    arrConfig_RedisServer: {
        strHost: 'localhost',
        intPort: 6379,
        intTtl: 86400,
    },
    arrConfig_Session: {
        secret: 'ThisIsHowYouUseRedisSessionStorage',
        name: '_redisPractice',
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: true,
        }
    },
};
