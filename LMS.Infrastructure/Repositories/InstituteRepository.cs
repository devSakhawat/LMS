using LMS.Domain.Entities;
using LMS.Infrastructure.Constracts;
using LMS.Infrastructure.Sql;

namespace LMS.Infrastructure.Repositories
{
   public class InstituteRepository : Repository<Institute>, IInstituteRepository
   {
      //private readonly DataContext context;
      public InstituteRepository(DataContext _context) : base(_context)
      {
         //this.context = _context;
      }
   }
}
