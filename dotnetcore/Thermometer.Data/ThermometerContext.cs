using System;
using Microsoft.EntityFrameworkCore;
using Thermometer.Data.Models;

namespace Thermometer.Data
{
    public class ThermometerContext : DbContext, IThermometerContext
    {
        private string _connectionString = @"Server=tcp:****.database.windows.net,1433;Database=ThermometerDB;user id=****;password=****;";

        public ThermometerContext()
        {
        }

        public ThermometerContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }

        public DbSet<Thermometer.Data.Models.Thermometer> Thermometers { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Probe> Probes { get; set; }
        public DbSet<ProbeReading> ProbeReadings { get; set; }
        public DbSet<Session> Sessions { get; set; }
    }
}