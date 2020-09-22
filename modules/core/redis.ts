import * as redisModule from 'redis';

import cfg from '../../config/config'

let redis : redisModule.RedisClient;

let cacheConnect = new Promise(function(resolve, reject) { 

    redis = redisModule.createClient(
        cfg.redis.port,
        cfg.redis.host
      );

    redis.on("error", function(error) {
        console.error('Error conectando a redis.', error);
        reject(false);
    });

    redis.on('ready', () => {
        console.error('Éxito conectando a redis.');
        resolve(redis);
    });

 } );

export { cacheConnect, redis };