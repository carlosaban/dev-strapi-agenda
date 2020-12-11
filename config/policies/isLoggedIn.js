const { default: createStrapi } = require("strapi");

module.exports = async (ctx, next) => {
    strapi.log.debug("En politica isloggedIn antes  de ejecucion");
    const fechaInicial = "2020-12-01"
    const fechaFinal = "2020-12-30"
    
    const scriptquery = `
                            select ev.Id 
                            from agenda_eventos ev
                            inner join agenda_eventos_components com on ev.id = com.agenda_evento_id and com.component_type ='components_frecuencia_rangos'
                            inner join components_frecuencia_rangos rg on rg.id = com.component_id
                            where 1=1
                            AND(
                                Inicio  between '${fechaInicial}' and '${fechaFinal}'
                                or Fin  between  '${fechaInicial}' and '${fechaFinal}'
                                or (
                                      '${fechaInicial}' between Inicio and Fin
                                        AND  '${fechaFinal}'  between Inicio and Fin
                                )
                            
                            )
                            union all
                            select ev.Id 
                            from agenda_eventos ev
                            inner join agenda_eventos_components com on ev.id = com.agenda_evento_id and com.component_type ='components_frecuencia_dia_especificos'
                            inner join components_frecuencia_dia_especificos rg on rg.id = com.component_id
                            where 1=1
                            and rg.Fecha  between '${fechaInicial}' and '${fechaFinal}'
                        `;

   strapi.log.debug("scriptquery : " + scriptquery);
    const rawBuilder = await strapi.connections.default.raw(scriptquery);
    
      rawBuilder[0].forEach(element => {
        console.dir(element.Id);
      });
     
    const result =  await next();
   

    
    return result;

}