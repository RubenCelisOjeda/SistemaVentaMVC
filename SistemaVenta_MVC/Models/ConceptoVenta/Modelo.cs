using System.Collections.Generic;

namespace SistemaVenta_MVC.Models.ConceptoVenta
{
    /// <summary>
    /// Entidad
    /// </summary>
    public class Modelo
    {
        /// <summary>
        /// Contructor inicializa las propiedades
        /// </summary>
        public Modelo()
        {
            this.DtoConceptoVenta = new DtoConceptoVenta();
            this.ListaConceptoVentas = new List<DtoGrilla>();
        }
        /// <summary>
        /// Atributos
        /// </summary>
        public DtoConceptoVenta DtoConceptoVenta { get; set; }
        public IList<DtoGrilla> ListaConceptoVentas { get; set; }
    }
}