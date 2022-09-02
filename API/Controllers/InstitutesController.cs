using LMS.Domain.Entities;
using LMS.Infrastructure.Constracts;
using LMS.Infrastructure.Utilitiy;
using LMS_Utility;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LMS.API.Controllers
{
   [Route(RouteConstants.BaseRoute)]
   [ApiController]
   public class InstitutesController : ControllerBase
   {
      private readonly IUnitofWork UnitofWork;
      public InstitutesController(IUnitofWork UnitofWork)
      {
         this.UnitofWork = UnitofWork;
      }

      /// <summary>
      /// Add new record of Inititute to database
      /// </summary>
      /// <param name="instituteType"></param>
      /// <returns></returns>
      [HttpPost]
      [Route(RouteConstants.CreateInstitute)]
      public async Task<ModelsMessage> CreateAsync(Institute institute)
      {
         return await UnitofWork.InstituteRepository.CreateAsync(institute);
      }

      /// <summary>
      /// Retrive Institute record List
      /// </summary>
      /// <returns></returns>
      [HttpGet]
      [Route(RouteConstants.ReadInstitute)]
      public async Task<IEnumerable<Institute>> ReadAllAsync()
      {
         return await UnitofWork.InstituteRepository.ReadAllAsync();
      }

      /// <summary>
      /// Retrive Institute single record by id
      /// </summary>
      /// <param name="ID"></param>
      /// <returns></returns>
      [HttpGet]
      [Route(RouteConstants.ReadInstituteById)]
      public async Task<Institute> ReadByIdAsync(int ID)
      {
         return await UnitofWork.InstituteRepository.ReadByIdAsync(ID);
      }

      /// <summary>
      /// Update Institute single record
      /// </summary>
      /// <param name="institute"></param>
      /// <returns></returns>
      [HttpPut]
      [Route(RouteConstants.UpdateInstituteById)]
      public ModelsMessage Update(Institute institute)
      {
         return UnitofWork.InstituteRepository.Update(institute);
      }

      /// <summary>
      /// Delte Institute single record by entity
      /// </summary>
      /// <param name="instituteType"></param>
      /// <returns></returns>
      [HttpDelete]
      [Route(RouteConstants.DeleteInstitute)]
      public ModelsMessage Delete(Institute institute)
      {
         return UnitofWork.InstituteRepository.Delete(institute);
      }

      /// <summary>
      /// Delte Institute single record by id
      /// </summary>
      /// <param name="ID"></param>
      /// <returns></returns>
      [HttpDelete]
      [Route(RouteConstants.DeleteInstituteById)]
      public async Task<ModelsMessage> DeleteByIdAsync(int ID)
      {
         return await UnitofWork.InstituteRepository.DeleteByIdAsync(ID);
      }
   }
}
