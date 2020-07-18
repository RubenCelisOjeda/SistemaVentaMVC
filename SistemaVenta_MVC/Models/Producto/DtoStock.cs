namespace SistemaVenta_MVC.Models.Producto
{
    public class DtoStock
    {
        /// <summary>
        /// Contructor inicializa las propiedades
        /// </summary>
        public DtoStock()
        {
            this.Id = 0;
            this.Stock = 0;
            this.Accion = string.Empty;
        }

        /// <summary>
        /// Atributos
        /// </summary>
        public int Id { get; set; }
        public int? Stock { get; set; }
        public string Accion { get; set; }
    }
}