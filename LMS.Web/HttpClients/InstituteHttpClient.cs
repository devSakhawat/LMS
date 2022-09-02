using LMS.Domain.Entities;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Security.Claims;

namespace LMS.Web.HttpClients
{
   public class InstituteHttpClient
   {
      private readonly HttpClient client;
      private readonly string BaseUrl = "https://localhost:7026/api/";
      public InstituteHttpClient(HttpClient client)
      {
         this.client = client;
      }

     
   }
}
