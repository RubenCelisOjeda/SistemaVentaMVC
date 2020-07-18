using System.Collections.Generic;

namespace SistemaVenta_MVC.Models.Cliente
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
            this.DtoCliente = new DtoCliente();
            this.DtoReniec = new DtoReniec();
            this.ListClientes = new List<DtoGrilla>();
        }

        /// <summary>
        /// Atributos
        /// </summary>
        public DtoCliente DtoCliente { get; set; }
        public DtoReniec DtoReniec { get; set; }
        public IList<DtoGrilla> ListClientes { get; set; }
    }
}