using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QuizApp.BusinessLayer.Abstract;
using QuizApp.BusinessLayer.DTOs;
using QuizApp.DataAccess.Context;

namespace QuizApp.BusinessLayer.Services
{
    public class AnswerService : IAnswerService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public AnswerService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<Answer>> GetAnswersByQuizId(int quizId)
        {
            var questions = await _context.Questions.Where(x => x.QuizId == quizId).ToListAsync();
            var answersDto = new List<Answer>();
            foreach (var question in questions)
            {
                var answers = await _context.Answers
                    .Where(x => x.QuestionId == question.Id)
                    .ToListAsync();
                answersDto.AddRange(_mapper.Map<List<Answer>>(answers));
            }
            return answersDto;
        }
    }
}
