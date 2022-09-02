using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS.Infrastructure.Utilitiy
{
   /// <summary>
   /// Base properties of the model classes.
   /// </summary>
   public class BaseModel
   {
      [Key]
      [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
      public int ID { get; set; }

      ///// <summary>
      ///// Referance of the user who has created the row.
      ///// </summary>
      //public int? CreatedBy { get; set; }

      ///// <summary>
      ///// Creation date of the row.
      ///// </summary>
      //[Column(TypeName = "smalldatetime")]
      //[Display(Name = "Date created")]
      //public DateTime? DateCreated { get; set; }

      ///// <summary>
      ///// Referance of the user who has last modified the row.
      ///// </summary>
      //public int? ModifiedBy { get; set; }

      ///// <summary>
      ///// Last modification date of the row.
      ///// </summary>
      //[Column(TypeName = "smalldatetime")]
      //[Display(Name = "Date modified")]
      //public DateTime? DateModified { get; set; }

      ///// <summary>
      ///// Status of the row. It indicates the row is deleted or not.
      ///// </summary>
      //[Display(Name = "Row status")]
      //public bool? IsRowDeleted { get; set; }

      ///// <summary>
      ///// Synced status of the row. It indicates the row is synced or not.
      ///// </summary>
      //public bool? IsSynced { get; set; }
   }
}
