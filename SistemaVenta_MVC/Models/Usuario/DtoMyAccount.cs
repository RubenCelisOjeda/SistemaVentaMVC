namespace SistemaVenta_MVC.Models.Usuario
{
    /// <summary>
    /// Entidad
    /// </summary>
    public class DtoMyAccount
    {
        /// <summary>
        /// Contructor inicializa las propiedades
        /// </summary>
        public DtoMyAccount()
        {
            this.Id = 0;
            this.UserName = string.Empty;
            this.Email = string.Empty;
            this.Rol = string.Empty;
            this.Status = string.Empty;
        }

        /// <summary>
        /// Atributos
        /// </summary>
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Rol { get; set; }
        public string Status { get; set; }
    }
}