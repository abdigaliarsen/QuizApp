using System.ComponentModel.DataAnnotations.Schema;

namespace QuizApp.DataAccess.Tables.General
{
    public class Answer : BaseEntity<int>
    {
        public string Content { get; set; } = string.Empty;

        public int QuestionId { get; set; }

        [ForeignKey(nameof(QuestionId))]
        public virtual Question? Question { get; set; }

        public bool IsCorrect { get; set; } = false;
    }
}
