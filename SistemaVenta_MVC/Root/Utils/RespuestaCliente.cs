using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SistemaVenta_MVC.Utils
{
    public class RespuestaCliente<T> where T : class, new()
    {
        public RespuestaCliente()
        {
            this.Dto = new T();
        }
        public T Dto { set; get; }
    }
}