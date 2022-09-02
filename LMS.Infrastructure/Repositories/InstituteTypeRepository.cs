using LMS.Domain.Entities;
using LMS.Infrastructure.Constracts;
using LMS.Infrastructure.Sql;

namespace LMS.Infrastructure.Repositories
{
   public class InstituteTypeRepository : Repository<InstituteType>, IInstituteTypeRepository
   {
      private readonly DataContext context;
      public InstituteTypeRepository(DataContext _context) : base(_context)
      {
         this.context = _context;
      }
   }
}
