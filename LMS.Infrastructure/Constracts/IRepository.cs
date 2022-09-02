using LMS.Infrastructure.Utilitiy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS.Infrastructure.Constracts
{
   public interface IRepository<T> where T : class
   {
      string Commit(string actionName);
      Task<ModelsMessage> CreateAsync(T entity);
      Task<IEnumerable<T>> ReadAllAsync();
      Task<T> ReadByIdAsync(int ID);
      Task<T> ReadByKeyAsync(long Key);
      ModelsMessage Update(T entity);
      ModelsMessage Delete(T entity);
      Task<ModelsMessage> DeleteByIdAsync(int ID);
      Task<ModelsMessage> DeleteByKeyAsync(long Key);
   }
}
