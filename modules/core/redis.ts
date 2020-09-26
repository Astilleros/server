import * as redisModule from 'redis';
import cfg from '../../cfg/cfg'

let redis : redisModule.RedisClient;

let cacheConnect = new Promise(function(resolve) { 

    redis = redisModule.createClient(
        cfg.redis.port,
        cfg.redis.host
    )

    redis.on("error", function(error) {
        console.error('Error conectando a redis.')
    })

    redis.on('ready', () => {
        console.error('Éxito conectando a redis.')
		resolve(true)
    })

 })

export { cacheConnect, redis }