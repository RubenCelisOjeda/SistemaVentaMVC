namespace SistemaVenta_MVC.Models.Cliente
{
    /// <summary>
    /// Entidad
    /// </summary>
    public class DtoCliente
    {
        /// <summary>
        /// Contructor inicializa las propiedades
        /// </summary>
        public DtoCliente()
        {
            this.Id = 0;
            this.Nombres = string.Empty;
            this.ApellidoPaterno = string.Empty;
            this.ApellidoMaterno = string.Empty;
            this.Dni = string.Empty;
            this.Celular = string.Empty;
            this.NombreFacebook = string.Empty;
            this.DireccionLugarEntrega = string.Empty;
        }

        /// <summary>
        /// Atributos
        /// </summary>
        public int Id { get; set; }
        public string Nombres { get; set; }
        public string ApellidoPaterno { get; set; }
        public string ApellidoMaterno { get; set; }
        public string Dni { get; set; }
        public string Celular { get; set; }
        public string NombreFacebook { get; set; }
        public string DireccionLugarEntrega { get; set; }
    }
}