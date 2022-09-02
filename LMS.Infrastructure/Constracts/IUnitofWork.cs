using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS.Infrastructure.Constracts
{
   public interface IUnitofWork
   {
      void SaveChanges();
      Task SavechangesAsync();

      IInstituteTypeRepository InstituteTypeRepository { get; }
      IInstituteRepository InstituteRepository { get; }
      IInstituteBranchRepository InstituteBranchRepository { get; }
      ICategoryRepository CategoryRepository { get; }

   }
}
