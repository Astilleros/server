var cacheManager = require('cache-manager');
var redisStore = require('cache-manager-redis');


var absModule = require('../../../../server/core/absModule').absModule;
const arrConfig = require('./../../../../config').arrConfig;


/**
 *   This class is used to cache using local and redis serverm managed automatically.
 *
 *   Examples
 *    ```
 *      //await this.setCached( 'key', 'value' );
 *      //console.log( await this.getCached( 'key2' ) );
 *      //console.log( await this.testCached( 'key2' ) );
 *
 *      let aaa= "ZZZZZZ";
 *      let anyRet: any;
 *
 *      //await this.setCached('key', 'value');
 *   
 *      anyRet = await this.wrap( 'key2', function() {
 *          console.log( aaa );
 *          return "AAA";
 *      } );
 *   
 *      anyRet = await this.wrap( 'key2', function() {
 *          return "AAA";
 *      } );
 *   
 *      console.log( anyRet );
 *    ```
 */
export class class_mngCache extends absModule {
    objMultiCache: any;
  
  
    /**
     *  Class constructor - Create an object and set arrParams atribute (with dependency ingection atributes object) and
     *      initialize local and remote redis server cache.
     *
     *  @param arrParams: any - Javascript object with all dependency reference objects.
     */
    constructor( arrParams: any ) {
        super( arrParams );
      
        let arrRedisConfig_server = this.arrParams.arrConfig_RedisServer;
      
        this.objMultiCache = cacheManager.multiCaching([
            cacheManager.caching({store: 'memory', max: 100, ttl: 10/*seconds*/}),
            cacheManager.caching({
                store: redisStore,
                host: arrRedisConfig_server.strHost, // default value
                port: arrRedisConfig_server.intPort, // default value
                auth_pass: 'XXXXX',
                db: 0,
                ttl: arrRedisConfig_server.intTtl
            }),
        ]);
    }
  
    
    //  #####################################################
    //  #####################################################


    /**
     *  setCached method - This method is called to add/modify cached register.
     *
     *  @param strKey: String - Key of the cache register.
     *  @param rawValue: any - Value of the cache register.
     *  @param objOpt: any - Option object.   Ej:    {ttl: 100}    (100 seconds)
     */
    async setCached( strKey: String, rawValue: any, objOpt: any = {} ) {
        await this.objMultiCache.set( strKey, rawValue, objOpt );
    }
  
  
    /**
     *  getCached method - This method is called to get cached register.
     * 
     *  @param strKey: String - Key of the cache register.
     */
    async getCached( strKey: String ) {
        return await this.objMultiCache.get( strKey );
    }
  
  
    /**
     *  delCached method - This method is called to del cached register.
     * 
     *  @param strKey: String - Key of the cache register.
     */
    async delCached( strKey: String ) {
        await this.objMultiCache.del( strKey );
    }
  
  
    /**
     *  testCached method - This method is called to test if cache register exists.
     *
     *  @param strKey: String - Key of the cache register.
     */
    async testCached( strKey: String ) {
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
    async wrap( strKey: String, ptrFunc: any ) {
        let rawReturnData: any;
      
        if( await this.testCached( strKey ) ) {
            console.log('Consultado en cache');
            rawReturnData = await this.getCached( strKey );
        } else {
            console.log('Ejecucion de funcion');
            rawReturnData = await ptrFunc();
            this.setCached( strKey, rawReturnData );
        }
      
        return rawReturnData;
    }
  
  
    //  #####################################################
    //  #####################################################
  
  
    async main() {
        //await this.setCached( 'key', 'value' );
        //console.log( await this.getCached( 'key2' ) );
        //console.log( await this.testCached( 'key2' ) );
      
        let aaa = "ZZZZZZ";
        let anyRet: any;
      
        //await this.setCached('key', 'value');
        anyRet = await this.wrap( 'key2', function() {
            console.log( aaa );
            return "AAA";
        } );
        anyRet = await this.wrap( 'key2', function() {
            return "AAA";
        } );
        console.log( anyRet );
      
    }
  
  
}