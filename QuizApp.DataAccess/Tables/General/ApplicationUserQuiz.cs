using QuizApp.DataAccess.Tables.General;
using QuizApp.DataAccess.Tables.Users;

namespace QuizApp.DataAccess.Tables.General
{
    public class ApplicationUserQuiz
    {
        public int CompletedQuizzesId { get; set; }

        public Quiz? Quiz { get; set; }

        public int CompletedUsersId { get; set; }
        
        public ApplicationUser? User { get; set; }

        public int CorrectAnswers { get; set; }
    }
}
