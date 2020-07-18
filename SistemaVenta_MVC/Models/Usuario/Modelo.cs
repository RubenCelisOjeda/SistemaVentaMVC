using System.Collections.Generic;

namespace SistemaVenta_MVC.Models.Usuario
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
            this.DtoUsuario = new DtoUsuario();
            this.ListaUsuarios = new List<DtoGrilla>();
            this.DtoMyAccount = new DtoMyAccount();
            this.DtoAccountRequest = new DtoAccountRequest();
        }

        /// <summary>
        /// Atributos
        /// </summary>
        public DtoUsuario DtoUsuario { get; set; }
        public IList<DtoGrilla> ListaUsuarios { get; set; }
        public DtoMyAccount DtoMyAccount { get; set; }
        public DtoAccountRequest DtoAccountRequest { get; set; }
    }
}