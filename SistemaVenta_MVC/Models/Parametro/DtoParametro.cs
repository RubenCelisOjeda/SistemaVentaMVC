namespace SistemaVenta_MVC.Models.Parametro
{
    /// <summary>
    /// Entidad
    /// </summary>
    public class DtoParametro
    {
        /// <summary>
        /// Contructor inicializa las propiedades
        /// </summary>
        public DtoParametro()
        {
            this.Id = 0;
            this.NroGrupo = 0;
            this.Nombre = string.Empty;
            this.Valor1 = string.Empty;
            this.Valor2 = string.Empty;
            this.Valor3 = string.Empty;
            this.Estado = false;
        }

        /// <summary>
        /// Atributos
        /// </summary>
        public int Id { get; set; }
        public int NroGrupo { get; set; }
        public string Nombre { get; set; }
        public string Valor1 { get; set; }
        public string Valor2 { get; set; }
        public string Valor3 { get; set; }
        public bool Estado { get; set; }
    }
}