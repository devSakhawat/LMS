using LMS.Domain.Entities;
using LMS.Web.HttpClients;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace LMS.Web.Controllers
{
   public class CategoriesController : Controller
   {
      private readonly string BaseUrl;
      private readonly HttpClient httpClient;
      public CategoriesController(HttpClient httpClient)
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

      public async Task<IActionResult> Category()
      {
         Category category = new Category();
         return View(category);
      }

      public async Task<IActionResult> CreateCategory(Category category)
      {
         var categoryEntiy = await new CategoryHttpClient(httpClient).PostCategory(category);

         return RedirectToAction("Category");
      }
   }
}
