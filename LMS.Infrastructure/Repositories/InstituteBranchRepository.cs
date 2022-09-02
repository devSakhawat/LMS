using LMS.Domain.Entities;
using LMS.Infrastructure.Constracts;
using LMS.Infrastructure.Sql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS.Infrastructure.Repositories
{
   public class InstituteBranchRepository:Repository<InstituteBranch>, IInstituteBranchRepository
   {
      public InstituteBranchRepository(DataContext _context):base(_context)
      {

      }
   }
}
