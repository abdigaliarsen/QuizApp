using System.ComponentModel.DataAnnotations.Schema;

namespace QuizApp.DataAccess.Tables.General
{
    public class Question : BaseEntity<int>
    {
        public string Content { get; set; } = string.Empty;

        public IEnumerable<Answer> Options { get; set; }

        public int QuizId { get; set; }

        [ForeignKey(nameof(QuizId))]
        public virtual Quiz? Quiz { get; set; }

        public Question()
        {
            Options = new List<Answer>();
        }
    }
}
