using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS.Infrastructure.Utilitiy
{
   public class Disposeable : IDisposable
   {
      private bool isDisposed;
      public void Dispose()
      {
         Dispose(true);
         GC.SuppressFinalize(this);
      }

      public void Dispose(bool v)
      {
         if (!isDisposed && v)
         {
            DisposeCore();
         }
         isDisposed = true;
      }

      public virtual void DisposeCore()
      {      
      }
   }
}
