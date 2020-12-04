"use strict";

var moment = require("moment");

const { sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async week(ctx) {
    const entities = await strapi.query("agenda-evento").model.fetchAll();

    const sanitizer = entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models["agenda-evento"] })
    );

    const semanaInicio = moment()
      .startOf("week")
      .hour(0)
      .minute(0)
      .second(0)
      .add(1, "day");
    const semanaFin = moment()
      .endOf("week")
      .hour(0)
      .minute(0)
      .second(0)
      .add(1, "day");

    const week = sanitizer.filter((entity) => {
      let evaluacionRangoFecha = false;
      let evaluacionDiaEspecifico = false;

      const diasEspecificos = entity.Fechas.filter(
        (f) => f.__component === "frecuencia.dia-especifico"
      );

      const rangosFechas = entity.Fechas.filter(
        (f) => f.__component === "frecuencia.rango"
      );

      diasEspecificos.map((dia) => {
        if (moment(dia.Fecha).isBetween(semanaInicio, semanaFin, "day", "[]")) {
          evaluacionDiaEspecifico = true;
        }
      });

      rangosFechas.map((rf) => {
        if (
          moment(rf.Inicio).isBetween(semanaInicio, semanaFin, "day", "[]") ||
          moment(rf.Fin).isBetween(semanaInicio, semanaFin, "day", "[]") ||
          semanaInicio.isBetween(
            moment(rf.Inicio),
            moment(rf.Fin),
            "day",
            "[]"
          ) ||
          semanaFin.isBetween(moment(rf.Inicio), moment(rf.Fin), "day", "[]")
        ) {
          evaluacionRangoFecha = true;
        }
      });

      return evaluacionDiaEspecifico || evaluacionRangoFecha;
    });

    let response = {
      lunes: [],
      martes: [],
      miercoles: [],
      jueves: [],
      viernes: [],
      sabado: [],
      domingo: [],
    };

    week.map((e) => {
      const martes = moment(semanaInicio).add(1, "day");
      const miercoles = moment(semanaInicio).add(2, "day");
      const jueves = moment(semanaInicio).add(3, "day");
      const viernes = moment(semanaInicio).add(4, "day");
      const sabado = moment(semanaInicio).add(5, "day");

      const diasEspecificos = e.Fechas.filter(
        (f) => f.__component === "frecuencia.dia-especifico"
      );

      const rangosFechas = e.Fechas.filter(
        (f) => f.__component === "frecuencia.rango-fechas"
      );

      diasEspecificos.map((dia) => {
        if (semanaInicio.isSame(moment(dia.Fecha), "day")) {
          response.lunes.push(e);
        }

        if (martes.isSame(moment(dia.Fecha), "day")) {
          response.martes.push(e);
        }
        if (miercoles.isSame(moment(dia.Fecha), "day")) {
          response.miercoles.push(e);
        }
        if (jueves.isSame(moment(dia.Fecha), "day")) {
          response.jueves.push(e);
        }
        if (viernes.isSame(moment(dia.Fecha), "day")) {
          response.viernes.push(e);
        }
        if (sabado.isSame(moment(dia.Fecha), "day")) {
          response.sabado.push(e);
        }
        if (semanaFin.isSame(moment(dia.Fecha), "day")) {
          response.domingo.push(e);
        }
      });

      rangosFechas.map((rf) => {
        if (
          semanaInicio.isBetween(moment(rf.Inicio), moment(rf.Fin), "day", "[]")
        ) {
          const existe = response.lunes.find((evento) => evento.id === e.id);
          if (!existe) {
            response.lunes.push(e);
          }
        }

        if (martes.isBetween(moment(rf.Inicio), moment(rf.Fin), "day", "[]")) {
          const existe = response.martes.find((evento) => evento.id === e.id);
          if (!existe) {
            response.martes.push(e);
          }
        }
        if (
          miercoles.isBetween(moment(rf.Inicio), moment(rf.Fin), "day", "[]")
        ) {
          const existe = response.miercoles.find(
            (evento) => evento.id === e.id
          );
          if (!existe) {
            response.miercoles.push(e);
          }
        }
        if (jueves.isBetween(moment(rf.Inicio), moment(rf.Fin), "day", "[]")) {
          const existe = response.jueves.find((evento) => evento.id === e.id);
          if (!existe) {
            response.jueves.push(e);
          }
        }
        if (viernes.isBetween(moment(rf.Inicio), moment(rf.Fin), "day", "[]")) {
          const existe = response.viernes.find((evento) => evento.id === e.id);
          if (!existe) {
            response.viernes.push(e);
          }
        }
        if (sabado.isBetween(moment(rf.Inicio), moment(rf.Fin), "day", "[]")) {
          const existe = response.sabado.find((evento) => evento.id === e.id);
          if (!existe) {
            response.sabado.push(e);
          }
        }
        if (
          semanaFin.isBetween(moment(rf.Inicio), moment(rf.Fin), "day", "[]")
        ) {
          const existe = response.domingo.find((evento) => evento.id === e.id);
          if (!existe) {
            response.domingo.push(e);
          }
        }
      });
    });
    return response;
  },

  async month(ctx) {
    const entities = await strapi.query("agenda-evento").model.fetchAll();

    const sanitizer = entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models["agenda-evento"] })
    );

    const mesInicio = moment().startOf("month");
    const mesFin = moment().endOf("month");

    let response = {};

    sanitizer.map((entity) => {
      const diasEspecificos = entity.Fechas.filter(
        (f) => f.__component === "frecuencia.dia-especifico"
      );

      const rangosFechas = entity.Fechas.filter(
        (f) => f.__component === "frecuencia.rango"
      );

      diasEspecificos.map((dia) => {
        if (moment(dia.Fecha).isBetween(mesInicio, mesFin, "day", "[]")) {
          const da = moment(dia.Fecha).date();
          if (response[`${da}`]) {
            const existe = response[`${da}`].find(
              (evento) => evento.id === entity.id
            );
            if (!existe) {
              response = {
                ...response,
                [da]: [...response[`${da}`], entity],
              };
            }
          } else {
            response = {
              ...response,
              [da]: [entity],
            };
          }
        }
      });

      rangosFechas.map((rf) => {
        if (
          moment(rf.Inicio).isBetween(mesInicio, mesFin, "day", "[]") ||
          moment(rf.Fin).isBetween(mesInicio, mesFin, "day", "[]") ||
          mesInicio.isBetween(moment(rf.Inicio), moment(rf.Fin), "day", "[]") ||
          mesFin.isBetween(moment(rf.Inicio), moment(rf.Fin), "day", "[]")
        ) {
          const dif = moment(rf.Fin)
            .hour(0)
            .minute(0)
            .diff(moment(rf.Inicio).hour(0).minute(0), "days");

          for (let i = 0; i <= dif; i++) {
            const dia = moment(rf.Inicio).hour(0).minute(0).add(i, "day");

            if (dia.isBetween(mesInicio, mesFin, "day", "[]")) {
              const da = dia.date();
              if (response[`${da}`]) {
                const existe = response[`${da}`].find(
                  (evento) => evento.id === entity.id
                );
                if (!existe) {
                  response = {
                    ...response,
                    [da]: [...response[`${da}`], entity],
                  };
                }
              } else {
                response = {
                  ...response,
                  [da]: [entity],
                };
              }
            }
          }
        }
      });
    });

    return response;
  },
};
