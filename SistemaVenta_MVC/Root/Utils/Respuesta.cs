using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SistemaVenta_MVC.Utils
{
    public class Respuesta<T> where T : class, new()
    {
        public Respuesta()
        {
            this.Lista = new List<T>();
            this.Entity = new T();
        }

        public int CodigoError { get; set; }

        public string Mensaje { get; set; }

        public IList<T> Lista { get; set; }

        public T Entity { get; set; }

        public int CantidadElementos { get; set; }

        public int CantidadElementosBD { get; set; }
    }
}