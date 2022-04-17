namespace QuizApp.BusinessLayer.DTOs
{
    public class Answer
    {
        public int Id { get; set; }

        public string Content { get; set; } = string.Empty;

        public int QuestionId { get; set; }

        public bool IsCorrect { get; set; } = false;
    }
}
