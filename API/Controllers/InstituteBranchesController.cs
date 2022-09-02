using LMS.Domain.Entities;
using LMS.Infrastructure.Utilitiy;
using LMS.Infrastructure;
using LMS_Utility;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LMS.Infrastructure.Constracts;

namespace LMS.API.Controllers
{
   [Route(RouteConstants.BaseRoute)]
   [ApiController]
   public class InstituteBranchesController : ControllerBase
   {
      private readonly IUnitofWork UnitofWork;
      public InstituteBranchesController(IUnitofWork UnitofWork)
      {
         this.UnitofWork = UnitofWork;
      }
      /// <summary>
      /// Add new record of InstituteBranch to database
      /// </summary>
      /// <param name="instituteBranch"></param>
      /// <returns></returns>
      [HttpPost]
      [Route(RouteConstants.CreateInstituteBranch)]
      public async Task<ModelsMessage> CreateAsync(InstituteBranch instituteBranch)
      {
         return await UnitofWork.InstituteBranchRepository.CreateAsync(instituteBranch);
      }

      /// <summary>
      /// Retrive InstituteBranch record List
      /// </summary>
      /// <returns></returns>
      [HttpGet]
      [Route(RouteConstants.ReadInstituteBranch)]
      public async Task<IEnumerable<InstituteBranch>> ReadAllAsync()
      {
         return await UnitofWork.InstituteBranchRepository.ReadAllAsync();
      }

      /// <summary>
      /// Retrive InstituteBranch single record by id
      /// </summary>
      /// <param name="ID"></param>
      /// <returns></returns>
      [HttpGet]
      [Route(RouteConstants.ReadInstituteBranchById)]
      public async Task<InstituteBranch> ReadByIdAsync(int ID)
      {
         return await UnitofWork.InstituteBranchRepository.ReadByIdAsync(ID);
      }

      /// <summary>
      /// Update InstituteBranch single record
      /// </summary>
      /// <param name="instituteBranch"></param>
      /// <returns></returns>
      [HttpPut]
      [Route(RouteConstants.UpdateInstituteBranchById)]
      public ModelsMessage Update(InstituteBranch instituteBranch)
      {
         return UnitofWork.InstituteBranchRepository.Update(instituteBranch);
      }

      /// <summary>
      /// Delte InstituteBranch single record by entity
      /// </summary>
      /// <param name="instituteBrach"></param>
      /// <returns></returns>
      [HttpDelete]
      [Route(RouteConstants.DeleteInstituteBranch)]
      public ModelsMessage Delete(InstituteBranch instituteBranch)
      {
         return UnitofWork.InstituteBranchRepository.Delete(instituteBranch);
      }

      /// <summary>
      /// Delte InstituteBranch single record by id
      /// </summary>
      /// <param name="ID"></param>
      /// <returns></returns>
      [HttpDelete]
      [Route(RouteConstants.DeleteInstituteBranchById)]
      public async Task<ModelsMessage> DeleteByIdAsync(int ID)
      {
         return await UnitofWork.InstituteBranchRepository.DeleteByIdAsync(ID);
      }
   }
}
