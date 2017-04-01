using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Thermometer.Web.ViewModels;
using System.Threading;
using Thermometer.Data;
using Thermometer.Data.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc.Cors;
using Microsoft.AspNetCore.Mvc.Cors.Internal;
using System;

namespace Thermometer.Web.Controllers
{
    [Route("api/[controller]")]
    public class ProbeReadingController : Controller
    {
        private readonly ThermometerContext _thermometerContext;

        public ProbeReadingController(ThermometerContext thermometerContext)
        {
            _thermometerContext = thermometerContext;
        }

        [Route("Session/{sessionId}/interval/{interval}")]
        [HttpGet]
        public IList<ProbeReadingViewModel> Get(int sessionId, int interval)
        {
            var results =    _thermometerContext.ProbeReadings
                            .Where(pr =>    pr.SessionId == sessionId &&
                                            pr.ReadingTime.Second % interval == 0).ToList();

            var probeReadings = new List<ProbeReadingViewModel>();
            
            if(results != null)
            {
                foreach(var probeReading in results)
                {
                    var probeReadingViewModel = new ProbeReadingViewModel()
                    {
                        Id = probeReading.Id,
                        Temperature = probeReading.Temperature,
                        ReadingTime = probeReading.ReadingTime.ToString("T"),
                        ProbeId = probeReading.ProbeId,
                        SessionId = probeReading.SessionId
                    };
                    
                    probeReadings.Add(probeReadingViewModel);
                }
            }

            return probeReadings;
        }

        [HttpPost]
        public void Post([FromBody] ProbeReadingViewModel probeReadingViewModel)
        {
            var probeReading = new ProbeReading()
            {
                Temperature = probeReadingViewModel.Temperature,
                ReadingTime = DateTime.Parse(probeReadingViewModel.ReadingTime),
                ProbeId = probeReadingViewModel.ProbeId,
                SessionId = probeReadingViewModel.SessionId
            };

            _thermometerContext.ProbeReadings.Add(probeReading);
            _thermometerContext.SaveChanges();
        }
    }
}