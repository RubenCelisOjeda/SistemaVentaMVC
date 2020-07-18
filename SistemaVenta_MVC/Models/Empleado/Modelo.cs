using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SistemaVenta_MVC.Models.Empleado
{
    /// <summary>
    /// Entidad
    /// </summary>
    public class Modelo
    {
        /// <summary>
        /// Contructor inicializa las propiedades
        /// </summary>
        public Modelo()
        {
            this.DtoEmpleado = new DtoEmpleado();
            this.ListaEmpleados = new List<DtoGrilla>();
        }

        /// <summary>
        /// Atributos
        /// </summary>
        public DtoEmpleado DtoEmpleado { get; set; }
        public IList<DtoGrilla> ListaEmpleados { get; set; }
    }
}