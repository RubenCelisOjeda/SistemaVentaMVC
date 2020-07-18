namespace SistemaVenta_MVC.Models.Usuario
{
    /// <summary>
    /// Entidad
    /// </summary>
    public class DtoUsuarioRequest
    {
        /// <summary>
        /// Contructor inicializa las propiedades
        /// </summary>
        public DtoUsuarioRequest()
        {
            this.Id = 0;
            this.Usuario = string.Empty;
            this.Password = string.Empty;
        }

        /// <summary>
        /// Atributos
        /// </summary>
        public int Id { get; set; }
        public string Usuario { get; set; }
        public string Password { get; set; }
    }
}