using QuizApp.BusinessLayer.DTOs;

namespace QuizApp.BusinessLayer.Abstract
{
    public interface IQuizService
    {
        Task<IEnumerable<Quiz>> Get();
        Task<Quiz> Get(int id);
    }
}
