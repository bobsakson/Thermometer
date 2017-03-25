using System;
using System.Collections.Generic;

namespace Thermometer.Data.Models
{
    public class ProbeReading
    {
        public int Id { get;set; }
        public double Temperature { get; set; }
        public DateTime ReadingTime { get; set; }
        public int ProbeId { get; set; }
        public Probe Probe { get; set; }
        public int SessionId { get; set; }
        public Session Session { get; set; }
    }
}