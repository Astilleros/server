import redis from 'redis';

export function initRedisClient($: any) : Promise<redis.RedisClient>  {

  return new Promise((resolve, reject) => {

      let client = redis.createClient(
          $.cfg.redis.port,
          $.cfg.redis.host
        );
  
      client.on("error", function(error) {
        console.log('Redis: Connection Error ' + error);
        reject(error);
      });

      client.on('ready', () => {
        console.log('Redis: Connection Established');
        resolve(client);
      });


  });

}