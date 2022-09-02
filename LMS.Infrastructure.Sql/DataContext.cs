using LMS.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace LMS.Infrastructure.Sql
{
   public class DataContext : DbContext
   {
      public DataContext(DbContextOptions<DataContext> options) : base(options)
      {
      }

      public DbSet<InstituteType> InstituteTypes { get; set; }
      public DbSet<Institute> Institutes { get; set; }
      public DbSet<InstituteBranch> instituteBranches { get; set; }

      protected override void OnModelCreating(ModelBuilder builder)
      {
         builder.Entity<InstituteType>(entity =>
         {
            entity.HasIndex(e => e.TypeName).IsUnique();
         });
         builder.Entity<Institute>(entity =>
         {
            entity.HasIndex(i => i.InstituteName).IsUnique();
         });
         builder.Entity<InstituteBranch>(entity =>
         {
            entity.HasIndex(e => e.BranchName).IsUnique();
            entity.HasIndex(e => e.BranchShortName).IsUnique();
            entity.HasIndex(e => e.ConatcNumber).IsUnique();
         });
      }
   }


}
