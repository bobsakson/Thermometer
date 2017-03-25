using System;
using System.Collections.Generic;

namespace Thermometer.Data.Models
{
    public class Thermometer
    {
        public int Id { get;set; }
        public string Name { get; set; }
        public IList<Probe> Probes { get; set; }
        public User User { get; set; }
    }
}