using System;
using System.Collections.Generic;

namespace Thermometer.Data.Models
{
    public class Session
    {
        public int Id { get;set; }
        public int ThermometerId { get; set; }
        public Thermometer Thermometer { get; set; }
        public IList<ProbeReading> ProbeReadings { get; set; }
    }
}