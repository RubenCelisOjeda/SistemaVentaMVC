namespace SistemaVenta_MVC.Models.Producto
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
            this.Producto = string.Empty;
        }

        /// <summary>
        /// Atributos
        /// </summary>
        public int Id { get; set; }
        public string Producto { get; set; }
    }
}