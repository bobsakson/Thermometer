using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Thermometer.Data;

namespace Thermometer.Data.Migrations
{
    [DbContext(typeof(ThermometerContext))]
    partial class ThermometerContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.1")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Thermometer.Data.Models.Probe", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.Property<int>("ThermometerId");

                    b.HasKey("Id");

                    b.HasIndex("ThermometerId");

                    b.ToTable("Probes");
                });

            modelBuilder.Entity("Thermometer.Data.Models.ProbeReading", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("ProbeId");

                    b.Property<DateTime>("ReadingTime");

                    b.Property<int?>("SessionId");

                    b.Property<double>("Temperature");

                    b.HasKey("Id");

                    b.HasIndex("ProbeId");

                    b.HasIndex("SessionId");

                    b.ToTable("ProbeReadings");
                });

            modelBuilder.Entity("Thermometer.Data.Models.Session", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("ThermometerId");

                    b.HasKey("Id");

                    b.HasIndex("ThermometerId");

                    b.ToTable("Sessions");
                });

            modelBuilder.Entity("Thermometer.Data.Models.Thermometer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.Property<int?>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Thermometers");
                });

            modelBuilder.Entity("Thermometer.Data.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Thermometer.Data.Models.Probe", b =>
                {
                    b.HasOne("Thermometer.Data.Models.Thermometer", "Thermometer")
                        .WithMany("Probes")
                        .HasForeignKey("ThermometerId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Thermometer.Data.Models.ProbeReading", b =>
                {
                    b.HasOne("Thermometer.Data.Models.Probe", "Probe")
                        .WithMany()
                        .HasForeignKey("ProbeId");

                    b.HasOne("Thermometer.Data.Models.Session", "Session")
                        .WithMany("ProbeReadings")
                        .HasForeignKey("SessionId");
                });

            modelBuilder.Entity("Thermometer.Data.Models.Session", b =>
                {
                    b.HasOne("Thermometer.Data.Models.Thermometer", "Thermometer")
                        .WithMany()
                        .HasForeignKey("ThermometerId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Thermometer.Data.Models.Thermometer", b =>
                {
                    b.HasOne("Thermometer.Data.Models.User", "User")
                        .WithMany("Thermometers")
                        .HasForeignKey("UserId");
                });
        }
    }
}
