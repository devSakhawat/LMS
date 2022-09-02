using LMS.Domain.Entities;
using Newtonsoft.Json;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;

namespace LMS.Web.HttpClients
{
   public class CategoryHttpClient
   {
      private readonly HttpClient client;
      private readonly string BaseUrl = "https://localhost:7026/api/";
      public CategoryHttpClient(HttpClient client)
      {
         this.client = client;
      }
     
      /// <summary>
      /// Category post httpclient
      /// </summary>
      /// <param name="category"></param>
      /// <returns></returns>
      public async Task<Category> PostCategory(Category category)
      {
         if (category != null && category.CategoryID == 0)
         {
            var data = JsonConvert.SerializeObject(category);
            var htppContent = new StringContent(data, Encoding.UTF8, "application/json");
            var response = await client.PostAsync($"{BaseUrl}Categories/CreateAsync", htppContent);
            if (!response.IsSuccessStatusCode)
            {
               return new Category();
            }
            string result = await response.Content.ReadAsStringAsync();
            var categoryEntity = JsonConvert.DeserializeObject<Category>(result);
            return categoryEntity;        
         }
         else
         {
            return new Category();
         }
      }

      /// <summary>
      /// CategoryList httpclent
      /// </summary>
      /// <returns></returns>
      public async Task<List<Category>> ReadAllCategory()
      {
         var response = await client.GetAsync($"{BaseUrl}Categories/ReadAllAsync");

         if (!response.IsSuccessStatusCode)
         {
            return new List<Category>();
         }
         string result = await response.Content.ReadAsStringAsync();
         var category = JsonConvert.DeserializeObject<List<Category>>(result);
         List<Category> categoryList = new List<Category>(category.ToList());
         return categoryList;
      }

      /// <summary>
      /// 
      /// </summary>
      /// <param name="categoryID"></param>
      /// <returns></returns>
      public async Task<Category> ReadByIdAsyncCategory( int categoryID)
      {
         var response = await client.GetAsync($"{BaseUrl}Categories/ReadByIdAsync/" + categoryID + "");
         if (!response.IsSuccessStatusCode)
         {
            return new Category();
         }
         string result = await response.Content.ReadAsStringAsync();
         var category = JsonConvert.DeserializeObject<Category>(result);
         return category;

      }

      /// <summary>
      /// Update single entity httpclient
      /// </summary>
      /// <param name="category"></param>
      /// <returns></returns>
      public async Task<Category> UpdateCategory(Category category)
      {
         if (category != null && category.CategoryID != 0)
         {
            var data = JsonConvert.SerializeObject(category);
            var htppContent = new StringContent(data, Encoding.UTF8, "application/json");
            var response = await client.PostAsync($"{BaseUrl}Categories/Update", htppContent);
            if (!response.IsSuccessStatusCode)
            {
               return new Category();
            }
            string result = await response.Content.ReadAsStringAsync();
            var categoryEntity = JsonConvert.DeserializeObject<Category>(result);
            return categoryEntity;
         }
         else
         {
            return new Category();
         }
      }

      /// <summary>
      ///  Delelte single entity httpclient
      /// </summary>
      /// <param name="category"></param>
      /// <returns></returns>
      public async Task<Category> DeleteCat(Category category)
      {
         var data = JsonConvert.SerializeObject(category);
         var httpContent = new StringContent(data, Encoding.UTF8, "application/json");
         var response = await client.PostAsync($"{BaseUrl}Categories/Delete", httpContent);

         if (!response.IsSuccessStatusCode)
         {
            return new Category();
         }
         string result = await response.Content.ReadAsStringAsync();
         var categoryEntity = JsonConvert.DeserializeObject<Category>(result);
         return categoryEntity;
      }

      /// <summary>
      ///  Delelte single entity by id httpclient
      /// </summary>
      /// <param name="category"></param>
      /// <returns></returns>
      public async Task<Category> DeleteCat(int categoryId)
      {
         var data = JsonConvert.SerializeObject(categoryId);
         var httpContent = new StringContent(data, Encoding.UTF8, "application/json");
         var response = await client.PostAsync($"{BaseUrl}Categories/DeleteByIdAsync/"+ categoryId + "", httpContent);

         if (!response.IsSuccessStatusCode)
         {
            return new Category();
         }
         string result = await response.Content.ReadAsStringAsync();
         var categoryEntity = JsonConvert.DeserializeObject<Category>(result);
         return categoryEntity;
      }

   }
}
