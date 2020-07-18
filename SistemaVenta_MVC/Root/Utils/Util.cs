using SistemaVenta_MVC.Models.Resultado;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SistemaVenta_MVC.Utils
{
    public class Util
    {
        /// <summary>
        /// Devuelve  un combo generico  con los datos solicitado
        /// </summary>
        /// <param name="pId">DNI del producto registrado</param>
        /// <returns>Retorna los datos en el combo con el ingreso de l URL solicitada.</returns>
        public Respuesta<Combo> ListarComboGenerico(int pId, Constantes.GrupoParametros pGrupoParametro, bool pPrevaleceGrupoParametro)
        {
            var urlClient = string.Format("/Api/Parametros/{0}/{1}/{2}", pId, pGrupoParametro.GetHashCode(), pPrevaleceGrupoParametro);
            var restClient = new RestService();
            var responseClient = restClient.GetAsync<Respuesta<Models.Parametro.DtoParametro>>(urlClient);
            var combo = new Respuesta<Combo>();

            combo.CantidadElementos = responseClient.CantidadElementos;
            combo.CodigoError = responseClient.CodigoError;
            combo.Mensaje = responseClient.Mensaje;

            if (responseClient.CantidadElementos > 0)
            {
                int cant = 0;
                foreach (var item in responseClient.Lista)
                {
                    if (item.Valor1 != null)
                    {
                        cant += 1;
                        combo.Lista.Add(new Models.Resultado.Combo { Id = Convert.ToInt32(item.Valor1), Etiqueta = item.Nombre });
                    }
                }
                combo.CantidadElementos = cant;
            }
            return combo;
        }
    }
}