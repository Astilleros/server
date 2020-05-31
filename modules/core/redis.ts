import redis from 'redis';

export let initRedis = ($: any) =>{
    const client = redis.createClient(
        $.cfg.redis.port,
        $.cfg.redis.host
      );
 
    client.on("error", function(error) {
      console.error(error);
    });

    client.on('ready', () => {
    	$.redis = client;
    });

}