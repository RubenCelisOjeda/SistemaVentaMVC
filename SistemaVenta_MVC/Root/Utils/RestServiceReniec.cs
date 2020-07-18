using Newtonsoft.Json;
using SistemaVenta_MVC.Models.Cliente;
using System;
using System.Configuration;
using System.Net.Http;
using System.Net.Http.Headers;

namespace SistemaVenta_MVC.Utils
{
    public class RestServiceReniec
    {
        /// <summary>
        /// <param name="_mediaType">Tipo de datos por la cual se enviaran los datos</param>
        /// <param name="_serviceUrl">Direccion URL del Servicio Rest proporcionado>
        /// <returns>Retorna los datos de la persona con el ingreso que se encontro.</returns>
        private const string _mediaType = "application/json";
        private readonly string _serviceUrl = ConfigurationManager.AppSettings["ServicioRestApiReniec"].ToString();

        /// <summary>
        /// Devuelve los datos de la persona con el DNI proporcionado. este se usará para asginar los datos y moficarlos segun cambie el asesor
        /// </summary>
        /// <param name="pId">DNI del producto registrado</param>
        /// <returns>Retorna los datos de la persona con el ingreso que se encontro.</returns>
        public DtoReniec GetAsync(int pDni)
        {
            try
            {
                var responseBody = string.Empty;
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(_serviceUrl);
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(_mediaType));

                    var response = client.GetAsync(+pDni + "?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InNpc3RlbWFzLmNlbGlzQGdtYWlsLmNvbSJ9.-HLVT8xTdYDuaO9ultyGRfCHI3aR7KfKTUUNwF4xqZI").Result;

                    response.EnsureSuccessStatusCode();
                    responseBody = response.Content.ReadAsStringAsync().Result;
                }
                var dto = JsonConvert.DeserializeObject<DtoReniec>(responseBody);
                var data = new string[] {dto.nombres,dto.apellidoPaterno,dto.apellidoMaterno,dto.dni };

                dto.count = ValidarDatos(data);

                return dto;
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException("RestClient.GetAsync error " + ex.Message);
            }
        }

        /// <summary>
        /// Devuelve los datos de un Aarray de String y valida la existencia de lo mismo.
        /// </summary>
        /// <param name="pDatos">Array de datos proporcionado</param>
        /// <returns>Retorna 1 si existe  y 0 si no existe</returns>
        private int ValidarDatos(string[] pDatos)
        {
            var nombres = pDatos[0].ToString();
            var apePaterno = pDatos[1].ToString();
            var apeMaterno = pDatos[2].ToString();
            var dni = pDatos[3].ToString();

            if (nombres == "" | apePaterno == "" | apeMaterno == "" | dni == "")
            {
                return 0;
            }
            return 1;
        }
    }
}