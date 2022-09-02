using LMS.Domain.Entities;
using LMS.Infrastructure.Constracts;
using LMS.Infrastructure.Utilitiy;
using LMS_Utility;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
   [Route(RouteConstants.BaseRoute)]
   [ApiController]
   public class InstituteTypeController : ControllerBase
   {
      private readonly IUnitofWork UnitofWork;
      public InstituteTypeController(IUnitofWork UnitofWork)
      {
         this.UnitofWork = UnitofWork;
      }

      /// <summary>
      /// Add new record of InitituteType to database
      /// </summary>
      /// <param name="instituteType"></param>
      /// <returns></returns>
      [HttpPost]
      [Route(RouteConstants.CreateInstituteType)]
      public async Task<ModelsMessage> CreateAsync(InstituteType instituteType)
      {
         return await UnitofWork.InstituteTypeRepository.CreateAsync(instituteType);
      }

      /// <summary>
      /// Retrive InstituteType record List
      /// </summary>
      /// <returns></returns>
      [HttpGet]
      [Route(RouteConstants.ReadInstituteType)]
      public async Task<IEnumerable<InstituteType>> ReadAllAsync()
      {
         return await UnitofWork.InstituteTypeRepository.ReadAllAsync();
      }

      /// <summary>
      /// Retrive single record by ID
      /// </summary>
      /// <param name="ID"></param>
      /// <returns></returns>
      [HttpGet]
      [Route(RouteConstants.ReadInstituteTypeById)]
      public async Task<InstituteType> ReadByIdAsync(int ID)
      {
         return await UnitofWork.InstituteTypeRepository.ReadByIdAsync(ID);
      }

      /// <summary>
      /// Update InstituteType single record
      /// </summary>
      /// <param name="institute"></param>
      /// <returns></returns>
      [HttpPut]
      [Route(RouteConstants.UpdateInstituteTypeById)]
      public ModelsMessage Update(InstituteType instituteType)
      {
         return UnitofWork.InstituteTypeRepository.Update(instituteType);
      }

      /// <summary>
      /// Delte InstituteType single record by entity
      /// </summary>
      /// <param name="instituteType"></param>
      /// <returns></returns>
      [HttpDelete]
      [Route(RouteConstants.DeleteInstituteTypeById)]
      public ModelsMessage Delete(InstituteType instituteType)
      {
         return UnitofWork.InstituteTypeRepository.Delete(instituteType);
      }

      /// <summary>
      /// Delte InstituteType single record by id
      /// </summary>
      /// <param name="ID"></param>
      /// <returns></returns>
      [HttpDelete]
      [Route(RouteConstants.DeleteInstituteType)]
      public async Task<ModelsMessage> DeleteByIdAsync(int ID)
      {
         return await UnitofWork.InstituteTypeRepository.DeleteByIdAsync(ID);
      }
   }
}
