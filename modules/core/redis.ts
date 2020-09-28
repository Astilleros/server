import * as redisModule from 'redis';
import cfg from '../../cfg/cfg'

let redis : redisModule.RedisClient;

export let cacheConnect = new Promise(function(resolve) { 


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

export class mngCache {
    

    /**
     *  setCached method - This method is called to add/modify cached register.
     *
     *  @param strKey: String - Key of the cache register.
     *  @param rawValue: any - Value of the cache register.
     *  @param objOpt: any - Option object.   Ej:    {ttl: 100}    (100 seconds)
     */
    async setCached( strKey: string, rawValue: any, objOpt: any = {} ) {
        console.log('Redis setCached: ', strKey);
        await redis.set( strKey, rawValue, objOpt );
    }
  
  
    /**
     *  getCached method - This method is called to get cached register.
     * 
     *  @param strKey: String - Key of the cache register.
     */
    async getCached( strKey: string ) {
        //console.log('Redis getCached: ', strKey);
        return await redis.get( strKey );
    }
  
  
    /**
     *  delCached method - This method is called to del cached register.
     * 
     *  @param strKey: String - Key of the cache register.
     */
    async delCached( strKey: string ) {
        console.log('Redis delCached: ', strKey);
        await redis.del( strKey );
    }
  
  
    /**
     *  testCached method - This method is called to test if cache register exists.
     *
     *  @param strKey: String - Key of the cache register.
     */
    async testCached( strKey: string ) {
        //console.log('Redis testCached: ', strKey);
        return ( (await this.getCached( strKey )) != undefined ? true : false );
    }
  
  
    /**
     *  wrap method - This method is called to cachify call.
     *
     *  This method is used to wrap getter method, with it you can 
     *
     *  Example:
     *  ```
     *      anyRet = await this.wrap( 'key2', function() {
     *          return "AAA";
     *      } );
     *  ```
     *
     *  @param strKey: String - Key of the cache register.
     *  @param ptrFunc: any - Pointer to function callback.
     */
    async wrap( strKey: string, ptrFunc: any ) {
        let rawReturnData: any;
      
        if( await this.testCached( strKey ) ) {
            console.log('Redis wrap: ', strKey);
            rawReturnData = await this.getCached( strKey );
        } else {
            console.log('Mongo wrap: ', strKey);
            rawReturnData = await ptrFunc();
            this.setCached( strKey, rawReturnData );
        }
      
        return rawReturnData;
    }

}

export let cache = new mngCache()
