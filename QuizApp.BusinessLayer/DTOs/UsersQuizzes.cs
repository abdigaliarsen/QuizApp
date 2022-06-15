namespace QuizApp.BusinessLayer.DTOs
{
    public class UsersQuizzes
    {
        public int CompletedUsersId { get; set; }

        public int CompletedQuizzesId { get; set; }

        public int CorrectAnswers { get; set; }

        public int MaxScore { get; set; }
    }
}
