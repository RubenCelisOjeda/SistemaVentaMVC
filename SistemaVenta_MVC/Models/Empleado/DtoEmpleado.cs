using System;

namespace SistemaVenta_MVC.Models.Empleado
{
    /// <summary>
    /// Entidad
    /// </summary>
    public class DtoEmpleado
    {
        /// <summary>
        /// Contructor inicializa las propiedades
        /// </summary>
        public DtoEmpleado()
        {
            this.Id = 0;
            this.Nombre = string.Empty;
            this.ApellidoPaterno = string.Empty;
            this.ApellidoMaterno = string.Empty;
            this.FechaNacimiento = DateTime.Now;
            this.EstadoCivil = 0;
            this.Direccion = string.Empty;
            this.Status = 1;
        }

        /// <summary>
        /// Atributos
        /// </summary>
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string ApellidoPaterno { get; set; }
        public string ApellidoMaterno { get; set; }
        public DateTime? FechaNacimiento { get; set; }
        public int? EstadoCivil { get; set; }
        public string Direccion { get; set; }
        public int? Status { get; set; }
    }
}