using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Thermometer.Web.ViewModels;
using System.Threading;
using Thermometer.Data;
using Thermometer.Data.Models;
using Microsoft.EntityFrameworkCore;


namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    public class ProbeReadingController : Controller
    {
        private readonly ThermometerContext _thermometerContext;

        public ProbeReadingController(ThermometerContext thermometerContext)
        {
            _thermometerContext = thermometerContext;
        }

        [HttpPost]
        public void Post([FromBody] ProbeReadingViewModel probeReadingViewModel)
        {
            var probeReading = new ProbeReading()
            {
                Temperature = probeReadingViewModel.Temperature,
                ReadingTime = probeReadingViewModel.ReadingTime,
                ProbeId = probeReadingViewModel.ProbeId,
                SessionId = probeReadingViewModel.SessionId
            };

            _thermometerContext.ProbeReadings.Add(probeReading);
            _thermometerContext.SaveChanges();
        }
    }
}