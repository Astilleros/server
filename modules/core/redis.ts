import redis from 'redis';
import cfg from '../../config/config'



let cacheConnect = new Promise(function(resolve, reject) { 

    let client = redis.createClient(
        cfg.redis.port,
        cfg.redis.host
      );

    client.on("error", function(error) {
        console.error('Error conectando a redis.', error);
        reject(false);
    });

    client.on('ready', () => {
        console.error('Éxito conectando a redis.');
        resolve(client);
    });

 } );

export { cacheConnect };