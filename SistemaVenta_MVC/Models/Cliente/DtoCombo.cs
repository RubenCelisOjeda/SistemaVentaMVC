namespace SistemaVenta_MVC.Models.Cliente
{
    /// <summary>
    /// Entidad
    /// </summary>
    public class DtoCombo
    {
        /// <summary>
        /// Contructor inicializa las propiedades
        /// </summary>
        public DtoCombo()
        {
            this.Id = 0;
            this.Cliente = string.Empty;
        }

        /// <summary>
        /// Atributos
        /// </summary>
        public int Id { get; set; }
        public string Cliente { get; set; }
    }
}