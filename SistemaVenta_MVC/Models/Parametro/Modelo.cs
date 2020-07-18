using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SistemaVenta_MVC.Models.Parametro
{
    public class Modelo
    {
        public Modelo()
        {
            this.DtoParametro = new DtoParametro();
            this.ListaParametros = new List<DtoGrilla>();
        }
        public DtoParametro DtoParametro { get; set; }
        public IList<DtoGrilla> ListaParametros { get; set; }
    }
}