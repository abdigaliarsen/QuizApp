using QuizApp.BusinessLayer.DTOs;

namespace QuizApp.BusinessLayer.Abstract
{
    public interface IAnswerService
    {
        Task<IEnumerable<Answer>> GetAnswersByQuizId(int quizId);
    }
}
