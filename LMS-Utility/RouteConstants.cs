using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS_Utility
{
   public static class RouteConstants
   {
      public const string BaseRoute = "lms-api";

      #region InstituteType
      public const string CreateInstituteType= "institutes-type";

      public const string ReadInstituteType = "institutes-types";

      public const string UpdateInstituteTypeById = "institutes-type/{id}";

      public const string ReadInstituteTypeById = "institutes-type/{id}";

      public const string DeleteInstituteTypeById = "institutes-type/{id}";

      public const string DeleteInstituteType = "institutes-type";
      #endregion

      #region Institute
      public const string CreateInstitute= "institutes";

      public const string ReadInstitute = "institutes";

      public const string ReadInstituteById = "institutes/{id}";

      public const string UpdateInstituteById = "institutes/{id}";

      public const string DeleteInstituteById = "institutes/{id}";

      public const string DeleteInstitute = "institutes";
      #endregion

      #region InstituteBrach
      public const string CreateInstituteBranch = "institutes-brach";

      public const string ReadInstituteBranch = "institutes-brachs";

      public const string ReadInstituteBranchById = "institutes-brach/{id}";

      public const string UpdateInstituteBranchById = "institutes-brach/{id}";

      public const string DeleteInstituteBranchById = "institutes-brach/{id}";

      public const string DeleteInstituteBranch = "institutes-brach";
      #endregion

      #region Category
      public const string CreateCategory = "category";

      public const string ReadCategory = "categories";

      public const string ReadCategoryById = "category/{id}";

      public const string UpdateCategoryById = "category/{id}";

      public const string DeleteCategoryById = "category/{id}";

      public const string DeleteCategory = "category";
      #endregion
   }
}
