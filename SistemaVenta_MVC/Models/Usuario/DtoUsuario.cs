using System;

namespace SistemaVenta_MVC.Models.Usuario
{
    /// <summary>
    /// Entidad
    /// </summary>
    public class DtoUsuario
    {
        /// <summary>
        /// Contructor inicializa las propiedades
        /// </summary>
        public DtoUsuario()
        {
            this.Id = 0;
            this.UsuarioName = string.Empty;
            this.Password = string.Empty;
            this.Email = string.Empty;
            this.RoId = 0;
            this.Estado = 0;
            this.FechaRegistro = DateTime.Now;
            this.IdEmpleado = 0;
            this.Status = 1;
        }

        /// <summary>
        /// Atributos
        /// </summary>
        public int Id { get; set; }
        public string UsuarioName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public int? RoId { get; set; }
        public int? Estado { get; set; }
        public DateTime? FechaRegistro { get; set; }
        public int? IdEmpleado { get; set; }
        public int? Status { get; set; }
            
    }
}