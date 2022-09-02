using LMS.Infrastructure.Utilitiy;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace LMS.Domain.Entities
{
   public class ApplicationUser : IdentityUser
   {

   }

   #region MasterDetailsCrd
   public class Customer : BaseModel
   {
      public string CustomerName { get; set; }
      public string ContactNumber { get; set; }
      public string Address { get; set; }
      public string CustomerUniqueNumber { get; set; }
   }
   public class ProductDetail:BaseModel
   {
      public string ProductSerialNumber { get; set; }
      public string ProductItem { get; set; }
      public string ProductName { get; set; }
      public string ProductQunatity { get; set; }
      public double ProudctPrice { get; set; }
      public double Prod { get; set; }
   }
   #endregion

   #region Category-SubCategory-ThirdLevelCategory
   public class Category
   {
      /// <summary>
      /// Primary key of the CategoryInfo table
      /// </summary>
      [Key]
      [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
      public int CategoryID { get; set; }

      /// <summary>
      /// Category Name
      /// </summary>
      [Required(ErrorMessage = "Required!")]
      [StringLength(150)]
      public string CategoryName { get; set; }
   }
   public class SubCategory
   {
      [Key]
      [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
      public int SubCategoryID { get; set; }

      [Required(ErrorMessage = "Required!")]
      [StringLength(150)]
      public string SubCategoryName { get; set; }
      public int CategoryID { get; set; }

      [ForeignKey("CategoryID")]
      public virtual Category? Categories { get; set; }
   }
   public class ThiedLevelCategory
   {
      [Key]
      [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
      public int ThiedLevelCategoryID { get; set; }

      [Required(ErrorMessage = "Required!")]
      [StringLength(150)]
      public string ThirdLevelCategoryName { get; set; }
      public int SubCategoryID { get; set; }

      [ForeignKey("SubCategoryID")]
      public virtual SubCategory? SubCatagories { get; set; }
   }
   #endregion Category-SubCategory-ThirdLevelCategory


   #region Global
   /// <summary>
   /// Classification of institute (Academic, Admission, Technical, University)
   /// </summary>
   #region Multiple-Page-Data-Insert
   public class InstituteType : BaseModel
   {
      [Required]
      [StringLength(40)]
      [Display(Name = "Educational Institution")]
      public string TypeName { get; set; }
      public string TypeDescription { get; set; }
      public ICollection<Institute> Institutes { get; set; }
   }

   /// <summary>
   /// Information of indivisual institute
   /// </summary>
   public class Institute : BaseModel
   {
      [Required]
      [StringLength(120)]
      public string InstituteName { get; set; }
      [Required]
      [StringLength(120)]
      public string ContactNumber { get; set; }
      public string AdminEmail { get; set; }
      public string AdminEmailPassword { get; set; }
      public string Address { get; set; }
      //public string LogoPath { get; set; }
      //public string LogoPath { get; set; }
      //[NotMapped]
      //public HttpPostedFileBase LogoImage { get; set; }
      //public string BannerPath { get; set; }
      //[NotMapped]
      //public HttpPostedFileBase BannerImage { get; set; }
      //[ForeignKey("InstituteType")]
      public int InstituteTypeID { get; set; }

      [ForeignKey("InstituteTypeID")]
      public InstituteType? InstituteType { get; set; }

      /// <summary>
      /// Parrent Table can hold child table data list
      /// it's also means that one to may relationship
      /// if parrent table dot containt a list of child entity means one to one relationship
      /// </summary>
      public ICollection<InstituteBranch>? InstituteBranchs { get; set; }
   }

   public class InstituteBranch : BaseModel
   {
      public string BranchName { get; set; }
      public string BranchShortName { get; set; }
      public string ConatcNumber { get; set; }
      public string Email { get; set; }
      public string Address { get; set; }
      public int InstituteID { get; set; }
      public bool IsMainbranch { get; set; }


      [ForeignKey("InstituteID")]
      public Institute? Institute { get; set; }
   }
   #endregion Multiple-Page-Data-Insert

   public class ProgramGroup
   {
      public string GroupName { get; set; }
      public int Duration { get; set; }
      public ICollection<Program> Programs { get; set; }
   }
   public class Program
   {
      public int ProgramGroupID { get; set; }
      public int StartLevel { get; set; }
      public int EndLevel { get; set; }
      public string CertificateName { get; set; }
      public string FullName { get; set; }
      public string ShortName { get; set; }
      public int InstituteTypeID { get; set; }

      [ForeignKey("InstituteTypeID")]
      public InstituteType InstituteType { get; set; }

      [ForeignKey("ProgramGroupID")]
      public ProgramGroup ProgramGroup { get; set; }


   }
   public class ClassInfo
   {
      //public int PrgID { get; set; }
      public string FullName { get; set; }
      public string ShortName { get; set; }
      public int DurationYear { get; set; } = 1;
   }
   public class SubjectInfo
   {
      public string FullName { get; set; }
      public string ShortName { get; set; }
      public bool IsMandatory { get; set; }
      public bool IsOptional { get; set; }
      public int EducationalGroupID { get; set; }

      [ForeignKey("EducationalGroupID")]
      public EducationalGroup EducationalGroup { get; set; }
   }
   public class EducationalGroup
   {
      //General,Science,Commerce,Arts/Humanities
      public string GroupName { get; set; }
   }
   public class ClassWiseSubject
   {
      public int ClassID { get; set; }
      public int SubID { get; set; }
   }
   public enum Medium
   {
      BanglaVersion = 1, EnglishMedium, EnglishVersion
   }
   public class Shift
   {
      public string ShiftName { get; set; }
      [DataType(DataType.Time)]
      public TimeSpan StartTime { get; set; }
      [DataType(DataType.Time)]
      public TimeSpan EndTime { get; set; }
      public string Description { get; set; }
   }
   public class Section
   {
      public string SectionName { get; set; }
      public string Description { get; set; }
   }
   public class Religion

   {
      public string ReligionName { get; set; }
      public string Description { get; set; }
   }
   public enum Gender
   {
      Male = 1, Female, ThirdGender
   }

   public class Designation
   {
      public string DesigName { get; set; }
      public string Description { get; set; }
   }

   #endregion global

   #region Student
   public class StudentAcademicInfo
   {
      [DataType(DataType.Date)]
      public DateTime AdmissionDate { get; set; }
      public int InsBranchID { get; set; }
      public string Session { get; set; }
      public int ClassID { get; set; }
      public int ShiftID { get; set; }
      public int SectionID { get; set; }
      public int StudentBasicID { get; set; }
      public string StudentID { get; set; }
      public long RollNo { get; set; }
      public int Status { get; set; } = 1;
      public float Result { get; set; }
      public Medium Medium { get; set; }


      [ForeignKey("InsBranchID")]
      public InstituteBranch InsBranch { get; set; }

      [ForeignKey("ClassID")]
      public ClassInfo ClassInfo { get; set; }

      [ForeignKey("StudentBasicID")]
      public StudentBasicInfo StudentBasicInfo { get; set; }

      [ForeignKey("ShiftID")]
      public Shift Shift { get; set; }

      [ForeignKey("SectionID")]
      public Section Section { get; set; }



   }
   public class StudentBasicInfo
   {
      //Auto generated
      public string StudentID { get; set; }
      public string StudentName { get; set; }
      public string StudentFatherName { get; set; }
      public string studentFathersProfession { get; set; }
      public string StudentFathersNID { get; set; }
      public string StudentFathersContract { get; set; }
      public string StudentMotherName { get; set; }
      public string StudentMothersProfession { get; set; }
      public string StudentMothersNID { get; set; }
      public string StudentMothersContract { get; set; }
      public string StudentEmail { get; set; }
      public string StudentContract { get; set; }
      public string StudentEmargencyContract { get; set; }
      public DateTime StudentDOB { get; set; }
      public string StudentBirthRegNo { get; set; }
      public string StudentNID { get; set; }
      public string StudentMarritalStatus { get; set; } = "Unmarried";
      public string StudentPresentAddress { get; set; }
      public string StudentPermanentAdress { get; set; }
      public string StudentNationality { get; set; }
      public int ReligionID { get; set; }
      public string StudentBloodGroup { get; set; }
      public Gender StudentGender { get; set; }
      public string StudentLocalGurdian { get; set; }
      public string StudentLocalGurdianAddress { get; set; }
      public string StudentLocalGurdianContact { get; set; }
      //public string StudentPicturePath { get; set; }
      //[NotMapped]
      //public iformfile StudentPicture { get; set; }
      //    Inactive=0,
      //    Active=1
      public int StudentStatus { get; set; } = 1;
      public string GetStdID(int sID, string year, string insName)
      {
         string std = $"{insName}-{year.Substring(2, 2)}{sID}";
         return std;
      }
   }
   #endregion
   #region Employee

   public class EmployeesGroup
   {
      public string Name { get; set; }
      public string Description { get; set; }
   }
   public class Employee
   {
      public string Name { get; set; }
      [DataType(DataType.DateTime)]
      public DateTime DOB { get; set; }
      [DataType(DataType.DateTime)]
      public DateTime JoinigDate { get; set; }
      public int ReligionID { get; set; }
      public string BloodGroup { get; set; }
      public string PRESENTADDRESS { get; set; }
      public string PERMANENTADDRESS { get; set; }
      public string BirthRegistrationNo { get; set; }
      public string Email { get; set; }
      public string Mobile { get; set; }
      public string Nationality { get; set; }
      public Gender Gender { get; set; }
      public int DesignationID { get; set; }

      [ForeignKey("ReligionID")]
      public Religion Religion { get; set; }

      [ForeignKey("DesignationID")]
      public Designation Designation { get; set; }

      [NotMapped]
      public int GroupID { get; set; }
      [NotMapped]
      public string GroupName { get; set; }
   }

   public class EmployeeWithGroup0
   {
      public int EmployeesGroupID { get; set; }
      public int EmployeeID { get; set; }

      [ForeignKey("EmployeesGroup")]
      public EmployeesGroup EmployeesGroup { get; set; }

      [ForeignKey("EmployeeID")]
      public Employee Employee { get; set; }
   }
   #endregion Employee 

   #region Homework
   public class HomeWork
   {
      public string Title { get; set; }
      public string Description { get; set; }
      public int SubjectID { get; set; }
      public int AssignedBy { get; set; }
      public DateTime AssignDate { get; set; }
      public DateTime DueDate { get; set; }
      public int ClassID { get; set; }
      public int SectionID { get; set; }
      public int ShiftID { get; set; }
      //(Submitted, Not Submitted) 
      public int Status { get; set; }

      [ForeignKey("AssignedBy")]
      public Employee Employee { get; set; }

      [ForeignKey("SubjectID")]
      public SubjectInfo SubjectInfo { get; set; }

      [ForeignKey("ClassID")]
      public ClassInfo ClassInfo { get; set; }

      [ForeignKey("SectionID")]
      public Section Section { get; set; }

      [ForeignKey("ShiftID")]
      public Shift Shift { get; set; }
   }
   public class SubmittedHomeworks
   {
      public DateTime SubmittedDate { get; set; }
      public int HomeworkID { get; set; }
      public string Title { get; set; }
      public string Description { get; set; }
      //(Submitted, Not Submitted)
      public string Status { get; set; }
      public int StudentBasicID { get; set; }

      [ForeignKey("StudentBasicID")]
      public StudentBasicInfo StudentBasicInfo { get; set; }

      [ForeignKey("HomeworkID")]
      public HomeWork HomeWork { get; set; }
   }
   public class SubmittedHomeworkFiles
   {
      public int SubmittedHomeworkID { get; set; }
      //public string HomeworkFilePath { get; set; }
      //[NotMapped]
      //public HttpPostedFileBase HomeworkFile { get; set; }

   }

   public class StdComments
   {
      public int HomeworkID { get; set; }
      public string StdsComment { get; set; }
      public string TeachersComments { get; set; }
      public DateTime CommentsDate { get; set; }
   }
   public class TeachersComments
   {
      public int SubmittedHomeworksID { get; set; }
      public string TeachersComment { get; set; }
      public DateTime CommentsDate { get; set; }
   }
   #endregion HomeWork
}
