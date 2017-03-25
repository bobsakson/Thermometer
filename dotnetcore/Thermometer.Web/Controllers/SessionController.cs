using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Thermometer.Web.ViewModels;
using System.Threading;
using Thermometer.Data;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    public class SessionController : Controller
    {
        private readonly IThermometerContext _thermometerContext;

        public SessionController(IThermometerContext thermometerContext)
        {
            _thermometerContext = thermometerContext;
        }

        [HttpGet]
        public SessionViewModel Get(int sessionId)
        {
            return new SessionViewModel();
        }
    }
}