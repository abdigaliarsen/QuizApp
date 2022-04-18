using Microsoft.AspNetCore.Identity;
using QuizApp.DataAccess.Tables.General;

namespace QuizApp.DataAccess.Tables.Users
{
    public class ApplicationUser : IdentityUser<int>
    {
        public virtual IEnumerable<Quiz> CreatedQuizzes { get; set; }

        public virtual IEnumerable<ApplicationUserQuiz> CompletedQuizzes { get; set; }

        public ApplicationUser()
        {
            CreatedQuizzes = new List<Quiz>();
            CompletedQuizzes = new List<ApplicationUserQuiz>();
        }
    }
}
