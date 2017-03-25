using System;

namespace Thermometer.Data.Models
{
    public class Probe
    {
        public int Id { get;set; }
        public string Name { get; set; }
        public int ThermometerId { get; set;}
        public Thermometer Thermometer { get; set; }
    }
}