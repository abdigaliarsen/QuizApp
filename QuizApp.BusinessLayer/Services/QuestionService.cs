using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QuizApp.BusinessLayer.Abstract;
using QuizApp.BusinessLayer.DTOs;
using QuizApp.DataAccess.Context;

namespace QuizApp.BusinessLayer.Services
{
    public class QuestionService : IQuestionService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public QuestionService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<Question>> GetQuestionsByQuizId(int quizId)
        {
            var questions = await _context.Questions.Where(x => x.QuizId == quizId).ToListAsync();
            var questionDto = _mapper.Map<IEnumerable<Question>>(questions);
            return questionDto;
        }
    }
}
