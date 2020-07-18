using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SistemaVenta_MVC.Models.Resultado
{
    /// <summary>
    /// Entidad De tipo Generica
    /// </summary>
    public class Respuesta<T> where T : class, new()
    {
        /// <summary>
        /// Contructor inicializa las propiedades
        /// </summary>
        public Respuesta()
        {
            Lista = new List<T>();
            this.CodigoError = 0;
            this.Mensaje = string.Empty;
            this.CantidadElementos = 0;
            this.CantidadElementosBD = 0;
        }

        /// <summary>
        /// Atributos
        /// </summary>
        public int CodigoError { get; set; }
        public string Mensaje { get; set; }
        public IList<T> Lista { get; set; }
        public int CantidadElementos { get; set; }
        public int CantidadElementosBD { get; set; }
    }
}