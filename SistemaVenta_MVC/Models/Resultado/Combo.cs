namespace SistemaVenta_MVC.Models.Resultado
{
    /// <summary>
    /// Entidad
    /// </summary>
    public class Combo
    {
        /// <summary>
        /// Contructor inicializa las propiedades
        /// </summary>
        public Combo()
        {
            this.Id = 0;
            this.Etiqueta = string.Empty;
        }

        /// <summary>
        /// Atributos
        /// </summary>
        public int Id { get; set; }
        public string Etiqueta { get; set; }
    }
}