using System;
using Microsoft.EntityFrameworkCore;
using Thermometer.Data.Models;

namespace Thermometer.Data
{
    public interface IThermometerContext
    {
        //TODO: Need to figure out why DI with the interface isn't working. 
        DbSet<Thermometer.Data.Models.Thermometer> Thermometers { get; set; }
        DbSet<User> Users { get; set; }
        DbSet<Probe> Probes { get; set; }
        DbSet<ProbeReading> ProbeReadings { get; set; }
        DbSet<Session> Sessions { get; set; }
    }
}