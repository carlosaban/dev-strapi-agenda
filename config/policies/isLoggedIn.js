const { default: createStrapi } = require("strapi");

module.exports = async (ctx, next) => {
    strapi.log.debug("En politica isloggedIn antes  de ejecucion");

    /*antes  de ejecucion*/
    //if(ctx.this.state.user){

        
        
    //}

    const result =  await next();
   

    /*despues de ejecucion*/
    //ctx.query.body

    strapi.log.debug("En politica isloggedIn despues de ejecucion ");


    return result;

}