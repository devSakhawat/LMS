using LMS.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Security.Claims;

namespace LMS.Web.Controllers
{
   public class InstituteTypeController : Controller
   {
      private readonly string BaseUrl;
      private readonly HttpClient httpClient;
      public InstituteTypeController(HttpClient httpClient)
      {
         this.httpClient = httpClient;
      }
      public IActionResult Index()
      {
         return View();
      }

      public async Task<IActionResult> Create()
      {
         return View();
      }

      public async Task<IActionResult> Institute(InstituteType institute)
      {
         //List<InstituteType>? cat = await new CategoryHttpClient(httpClient).GetAllCat(_reQuestToken_);
         //List<CategoryInfo> catList = new List<CategoryInfo>(cat.ToList());
         //CategoryDto dto = new CategoryDto();
         //dto.Listpanal = catList;
         //dto.Updatepanal = catentry;
         //if (catentry.CatID > 0)
         //{
         //   TempData["entrypanal"] = "Update panel";
         //   TempData["btnName"] = "Update";
         //}
         return View(institute);
      }
    
   }
}
