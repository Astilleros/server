
/**
 *  This class is used to manage routing in client side.
 */
 export default abstract class absModule {

    protected arrParams: any;

    
    //  =====================================================

    /**
     *  Class constructor - Create an object and set arrParams atribute (with dependency ingection atributes object).
     *  
     *  @param arrParams: any - Javascript object with all dependency reference objects.
     */
    constructor( arrParams: any ) {
        this.arrParams = arrParams;
    }
}
