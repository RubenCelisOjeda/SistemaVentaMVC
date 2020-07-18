using System;

namespace SistemaVenta_MVC.Models.Empleado
{
    /// <summary>
    /// Entidad
    /// </summary>
    public class DtoGrilla
    {
        /// <summary>
        /// Contructor inicializa las propiedades
        /// </summary>
        public DtoGrilla()
        {
            this.Id = 0;
            this.Nombre = string.Empty;
            this.ApellidoPaterno = string.Empty;
            this.ApellidoMaterno = string.Empty;
            this.FechaNacimiento = DateTime.Now;
            this.EstadoCivil = string.Empty;
            this.Direccion = string.Empty;
        }

        /// <summary>
        /// Atributos
        /// </summary>
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string ApellidoPaterno { get; set; }
        public string ApellidoMaterno { get; set; }
        public DateTime? FechaNacimiento { get; set; }
        public string EstadoCivil { get; set; }
        public string Direccion { get; set; }
    }
}