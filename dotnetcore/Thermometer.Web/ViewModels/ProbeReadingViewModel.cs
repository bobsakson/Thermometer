using System;
using System.Collections.Generic;

namespace Thermometer.Web.ViewModels
{
    public class ProbeReadingViewModel
    {
        public int Id { get;set; }
        public double Temperature { get; set; }
        public DateTime ReadingTime { get; set; }
        public int ProbeId { get; set; }
        public int SessionId { get; set; }
    }
}