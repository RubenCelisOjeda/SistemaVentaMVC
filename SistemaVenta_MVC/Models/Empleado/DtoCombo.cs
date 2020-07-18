namespace SistemaVenta_MVC.Models.Empleado
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
            this.Empleado = string.Empty;
        }

        /// <summary>
        /// Atributos
        /// </summary>
        public int Id { get; set; }
        public string Empleado { get; set; }
    }
}