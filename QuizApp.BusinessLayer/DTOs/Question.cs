namespace QuizApp.BusinessLayer.DTOs
{
    public class Question
    {
        public int Id { get; set; }

        public string Content { get; set; } = string.Empty;

        public int QuizId { get; set; }

        public IEnumerable<Answer> Options { get; set; } = new List<Answer>();
    }
}
