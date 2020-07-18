namespace SistemaVenta_MVC.Models.Cliente
{
    /// <summary>
    /// Entidad
    /// </summary>
    public class DtoReniec
    {
        /// <summary>
        /// Contructor inicializa las propiedades
        /// </summary>
        public DtoReniec()
        {
            this.dni = string.Empty;
            this.codVerifica = string.Empty;
            this.apellidoPaterno = string.Empty;
            this.apellidoMaterno = string.Empty;
            this.count = 0;
        }

        /// <summary>
        /// Atributos
        /// </summary>
        public string dni { get; set; }
        public string codVerifica { get; set; }
        public string apellidoPaterno { get; set; }
        public string apellidoMaterno { get; set; }
        public string nombres { get; set; }
        public int count { get; set; }
    }
}