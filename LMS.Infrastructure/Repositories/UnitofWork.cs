using LMS.Infrastructure.Constracts;
using LMS.Infrastructure.Sql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS.Infrastructure.Repositories
{
    public class UnitofWork : IUnitofWork
    {
        protected readonly DataContext context;
        public UnitofWork(DataContext _context)
        {
            context = _context;
        }

        public void SaveChanges()
        {
            context.SaveChanges();
        }

        public async Task SavechangesAsync()
        {
            await context.SaveChangesAsync();
        }

        #region InstituteType
        private IInstituteTypeRepository? instituteTypeRepository;
        public IInstituteTypeRepository InstituteTypeRepository
        {
            get
            {
                if (instituteTypeRepository == null)
                    instituteTypeRepository = new InstituteTypeRepository(context);

                return instituteTypeRepository;
            }
        }
        #endregion

        #region Institute
        private IInstituteRepository? instituteRepository;
        public IInstituteRepository InstituteRepository
        {
            get
            {
                if (instituteRepository == null)
                    instituteRepository = new InstituteRepository(context);
                return instituteRepository;
            }
        }
        #endregion

        #region InstituteBrach
        private IInstituteBranchRepository? instituteBranchRepository;
        public IInstituteBranchRepository InstituteBranchRepository
        {
            get
            {
                if (instituteBranchRepository == null)
                    instituteBranchRepository = new InstituteBranchRepository(context);
                return instituteBranchRepository;
            }
        }
        #endregion

        #region Category
        private ICategoryRepository? categoryRepository;
        public ICategoryRepository CategoryRepository
        {
            get
            {
                if (categoryRepository == null)
                    categoryRepository = new CategoryRepository(context);
                return categoryRepository;
            }
        }
        #endregion


    }
}
