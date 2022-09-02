using LMS.Domain.Entities;
using LMS.Infrastructure.Sql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS_Utility
{
   public class SeedData
   {
      public static class DbInitializer
      {
         public static void Initialize(DataContext context)
         {
            context.Database.EnsureCreated();
            if (context.InstituteTypes.ToList().Count == 0)
            {
               var data = new InstituteType[]
               {
               new InstituteType{ TypeName = "Academic", TypeDescription = "General Education 0 to 12" },
               new InstituteType{ TypeName = "Admission", TypeDescription = "Admission coaching center" },
               new InstituteType{ TypeName = "Technical", TypeDescription = "Politechnic Institute" },
               new InstituteType{ TypeName = "Vocational", TypeDescription = "Technical Education 3 to 10" },
               new InstituteType{ TypeName = "Madrasha", TypeDescription = "Madrasha Institute" },
               new InstituteType{ TypeName = "University", TypeDescription = "University" },
               new InstituteType{ TypeName = "University College", TypeDescription = "University College" }
               };
               foreach (var item in data)
               {
                  context.InstituteTypes.Add(item);
               }
               context.SaveChanges();
            }
            if (context.Institutes.ToList().Count == 0)
            {
               var data = new Institute[]
               {
               new Institute{ InstituteName = "Ulania Coronation High School", ContactNumber = "+01710230025", AdminEmail = "admin@gmail.com", AdminEmailPassword = "12345678", Address = "Ulania, Barishal-8272", InstituteTypeID=1 },

               new Institute{ InstituteName = "Ulania Muzaffor Khan Univerisity College", ContactNumber = "017123456789", AdminEmail="admin@gmail.com", AdminEmailPassword="12345678", Address = "Ulania, Barishal-8272", InstituteTypeID=7  }
               };
               foreach (var item in data)
               {
                  context.Institutes.Add(item);
               }
               context.SaveChanges();
            }
            if (context.instituteBranches.ToList().Count == 0)
            {
               var data = new InstituteBranch[]
                  {
                  new InstituteBranch{BranchName = "Ulania Coronation High School - Barishal Branch", BranchShortName= "UCHS-Barishal", ConatcNumber= "01345678901", Email = "barishal@uchs.com", Address= "Ulania-Braishal", IsMainbranch = true, InstituteID=1 },
                  new InstituteBranch{BranchName = "Ulania Muzaffor Khan Univerisity College - Barishal Branch", BranchShortName= "UMKUC-Barishal", ConatcNumber= "01423759820", Email = "barishal@ukmuc.com", Address= "Ulania-Braishal", IsMainbranch = true, InstituteID=2 }
                  };
               foreach (var item in data)
               {
                  context.instituteBranches.Add(item);
               }
            }
         }
      }
   }
}
