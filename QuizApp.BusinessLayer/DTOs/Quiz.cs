namespace QuizApp.BusinessLayer.DTOs
{
    public class Quiz
    {
        public int Id { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public int CreatorId { get; set; }

        public User? Author { get; set; }

        public int Passed { get; set; } = 0;

        public List<Question> Questions { get; set; } = new List<Question>();
    }
}
