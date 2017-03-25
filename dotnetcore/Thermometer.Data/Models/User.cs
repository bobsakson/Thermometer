using System;
using System.Collections.Generic;

namespace Thermometer.Data.Models
{
    public class User
    {
        public int Id { get;set; }
        public string Name { get; set; }
        public IList<Thermometer> Thermometers { get; set;}
    }
}