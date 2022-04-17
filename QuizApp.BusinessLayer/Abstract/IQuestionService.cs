using QuizApp.BusinessLayer.DTOs;

namespace QuizApp.BusinessLayer.Abstract
{
    public interface IQuestionService
    {
        Task<IEnumerable<Question>> GetQuestionsByQuizId(int quizId);
    }
}
