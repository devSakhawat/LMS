using LMS.Domain.Entities;
using LMS.Infrastructure;
using LMS.Infrastructure.Constracts;
using LMS.Infrastructure.Utilitiy;
using LMS_Utility;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LMS.API.Controllers
{
   [Route(RouteConstants.BaseRoute)]
   [ApiController]
   public class CategoriesController : ControllerBase
   {
      private readonly IUnitofWork UnitofWork;
      public CategoriesController(IUnitofWork UnitofWork)
      {
         this.UnitofWork = UnitofWork;
      }

      /// <summary>
      /// Add new record of category to database
      /// </summary>
      /// <param name="category"></param>
      /// <returns></returns>
      [HttpGet]
      [Route(RouteConstants.CreateCategory)]
      public async Task<ModelsMessage> CreateAsync(Category category)
      {
         return await UnitofWork.CategoryRepository.CreateAsync(category);
      }

      /// <summary>
      /// Retrive category record List
      /// </summary>
      /// <returns></returns>
      [HttpGet]
      [Route(RouteConstants.ReadCategory)]
      public async Task<IEnumerable<Category>> ReadAllAsync()
      {
         return await UnitofWork.CategoryRepository.ReadAllAsync();
      }

      /// <summary>
      /// Retrive category single record by id
      /// </summary>
      /// <param name="ID"></param>
      /// <returns></returns>
      [HttpGet]
      [Route(RouteConstants.ReadCategoryById)]
      public async Task<Category> ReadByIdAsync(int ID)
      {
         return await UnitofWork.CategoryRepository.ReadByIdAsync(ID);
      }

      /// <summary>
      /// Update category single record
      /// </summary>
      /// <param name="category"></param>
      /// <returns></returns>
      [HttpPut]
      [Route(RouteConstants.UpdateCategoryById)]
      public ModelsMessage Update(Category category)
      {
         return UnitofWork.CategoryRepository.Update(category);
      }

      /// <summary>
      /// Delte category single record by entity
      /// </summary>
      /// <param name="instituteBrach"></param>
      /// <returns></returns>
      [HttpDelete]
      [Route(RouteConstants.DeleteCategory)]
      public ModelsMessage Delete(Category category)
      {
         return UnitofWork.CategoryRepository.Delete(category);
      }

      /// <summary>
      /// Delte category single record by id
      /// </summary>
      /// <param name="ID"></param>
      /// <returns></returns>
      [HttpDelete]
      [Route(RouteConstants.DeleteCategoryById)]
      public async Task<ModelsMessage> DeleteByIdAsync(int ID)
      {
         return await UnitofWork.CategoryRepository.DeleteByIdAsync(ID);
      }

   }
}
