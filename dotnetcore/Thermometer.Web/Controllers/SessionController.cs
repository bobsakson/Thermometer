using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Thermometer.Web.ViewModels;
using System.Threading;
using Thermometer.Data;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc.Cors;
using Microsoft.AspNetCore.Mvc.Cors.Internal;

namespace Thermometer.Web.Controllers
{
    [Route("api/[controller]")]
    public class SessionController : Controller
    {
        private readonly ThermometerContext _thermometerContext;

        public SessionController(ThermometerContext thermometerContext)
        {
            _thermometerContext = thermometerContext;
        }

        [HttpGet("{sessionId}")]
        public SessionViewModel Get(int sessionId)
        {
            var result =    _thermometerContext.Sessions
                                .Where(session => session.Id == sessionId)
                                .Include(i => i.ProbeReadings)
                                .FirstOrDefault();
            
            var sessionViewModel = new SessionViewModel();
            
            if(result != null)
            {
                sessionViewModel.Id = result.Id;
                sessionViewModel.ThermometerId = result.ThermometerId;
                sessionViewModel.ProbeReadings = new List<ProbeReadingViewModel>();
                
                foreach(var probeReading in result.ProbeReadings)
                {
                    var probeReadingViewModel = new ProbeReadingViewModel()
                    {
                        Id = probeReading.Id,
                        Temperature = probeReading.Temperature,
                        ReadingTime = probeReading.ReadingTime.ToString("T"),
                        ProbeId = probeReading.ProbeId,
                        SessionId = probeReading.SessionId
                    };
                    
                    sessionViewModel.ProbeReadings.Add(probeReadingViewModel);
                }
            }

            return sessionViewModel;
        }
    }
}