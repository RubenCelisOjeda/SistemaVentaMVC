using System.ComponentModel.DataAnnotations;

namespace SistemaVenta_MVC.Models.Venta
{
    public class DtoGrillaMVC
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [Display(Name ="Total")]
        public decimal? Total { get; set; }

        //[Required]
        //[Display(Name = "Descripcion")]
        //public string Descripcion { get; set; }

        [Required]
        [Display(Name = "Fecha")]
        public string Fecha { get; set; }

        [Required]
        [Display(Name = "Cliente")]
        public string Cliente { get; set; }

        //[Required]
        //[Display(Name = "Empleado")]
        //public string Empleado { get; set; }
    }
}