using System.ComponentModel.DataAnnotations;

namespace QuizApp.DataAccess.Tables
{
    public class BaseEntity<T> where T : struct
    {
        [Key]
        public T Id { get; set; }
    }
}
