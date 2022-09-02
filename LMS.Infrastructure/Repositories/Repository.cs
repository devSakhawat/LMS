using LMS.Infrastructure.Constracts;
using LMS.Infrastructure.Sql;
using LMS.Infrastructure.Utilitiy;
using Microsoft.EntityFrameworkCore;
using System.Data.Entity.Validation;

namespace LMS.Infrastructure.Repositories
{
   public class Repository<T> : Disposeable, IRepository<T> where T : class
   {
      protected readonly DataContext context;
      public Repository(DataContext _context)
      {
         this.context = _context;
      }

      public override void DisposeCore()
      {
         if (context != null)
         {
            context.Dispose();
         }
      }

      public virtual string Commit(string actionName)
      {
         string message = "";
         try
         {
            if (context.SaveChanges() > 0)
            {
               message = $"Successfully {actionName}";
            }
            else
            {
               message = $"{actionName} Failed";
            }
         }
         catch (DbEntityValidationException vex)
         {
            foreach (var valError in vex.EntityValidationErrors)
            {
               foreach (var error in valError.ValidationErrors)
               {
                  message += $"(Property : {error.PropertyName} error: {error.ErrorMessage})\n";
               }
            }
         }
         catch (Exception ex)
         {
            if (ex.InnerException != null)
            {
               message = ex.InnerException.InnerException.Message;
            }
            else
            {
               message = ex.Message;
            }
         }
         return message;
      }

      #region Create
      public virtual async Task<ModelsMessage> CreateAsync(T entity)
      {
         ModelsMessage message = new ModelsMessage();
         await context.Set<T>().AddAsync(entity);
         message.Message = Commit("Saved");
         message.EntityModel = entity;
         return message;
      }
      #endregion

      #region Read
      public virtual async Task<IEnumerable<T>> ReadAllAsync()

      {
         var dataList = await context.Set<T>().ToListAsync();
         return dataList;
      }

      public virtual async Task<T> ReadByIdAsync(int ID)
      {
         var singleEntity = await context.Set<T>().FindAsync(ID);
         return singleEntity;
      }

      public virtual async Task<T> ReadByKeyAsync(long Key)
      {
         var singleEntity = await context.Set<T>().FindAsync(Key);
         return singleEntity;
      }
      #endregion

      #region Update
      public virtual ModelsMessage Update(T entity)
      {
         ModelsMessage message = new ModelsMessage();
         context.Set<T>().Update(entity);
         message.Message = Commit("Updated");
         message.EntityModel = entity;
         return message;
      }
      #endregion

      #region Delete
      public virtual ModelsMessage Delete(T entity)
      {
         ModelsMessage message = new ModelsMessage();
         context.Set<T>().Remove(entity);
         message.Message = Commit("Deleted");
         message.EntityModel = entity;
         return message;
      }

      public virtual async Task<ModelsMessage> DeleteByIdAsync(int ID)
      {
         ModelsMessage message = new ModelsMessage();
         var entity = await context.Set<T>().FindAsync(ID);
         if (entity == null)
         {
            message.Message = Commit("Invalid id number");
            return message;
         }
         if (entity != null)
         {
            context.Set<T>().Remove(entity);

            message.Message = Commit("Deleted");
            message.EntityModel = entity;
         }
         return message;
      }

      public virtual async Task<ModelsMessage> DeleteByKeyAsync(long Key)
      {
         ModelsMessage message = new ModelsMessage();
         var entity = await context.Set<T>().FindAsync(Key);
         message.Message = Commit("Invalid id number");
         message.EntityModel = entity;
         if (entity == null)
            return message;
         if (entity != null)
         {
            context.Set<T>().Remove(entity);
         }
         message.Message = Commit("Deleted");
         return message;
      }
      #endregion



   }
}
