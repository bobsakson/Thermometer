using System;
using System.Collections.Generic;

namespace Thermometer.Web.ViewModels
{
    public class SessionViewModel
    {
        public int Id { get;set; }
        public int ThermometerId { get; set; }
        public IList<ProbeReadingViewModel> ProbeReadings { get; set; }
    }
}