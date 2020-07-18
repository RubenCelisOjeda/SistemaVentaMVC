namespace SistemaVenta_MVC.Models.Usuario
{
    /// <summary>
    /// Entidad
    /// </summary>
    public class DtoUsuarioResponse
    {
        /// <summary>
        /// Contructor inicializa las propiedades
        /// </summary>
        public DtoUsuarioResponse()
        {
            this.Id = 0;
            this.Rol = string.Empty;
            this.Usuario = string.Empty;
            this.Status = string.Empty;
            this.Email = string.Empty;
        }

        /// <summary>
        /// Atributos
        /// </summary>
        public int Id { get; set; }
        public string Rol { get; set; }
        public string Usuario { get; set; }
        public string Status { get; set; }
        public string Email { get; set; }
    }
}