using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QuizApp.BusinessLayer.Abstract;
using QuizApp.BusinessLayer.DTOs;
using QuizApp.DataAccess.Context;

namespace QuizApp.BusinessLayer.Services
{
    public class QuizService : IQuizService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public QuizService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Quiz> Get(int id)
        {
            var quiz = await _context.Quizzes.FirstOrDefaultAsync(x => x.Id == id);
            if (quiz is null)
                throw new ArgumentNullException(nameof(id), "there is no matching quiz for the given id");

            var quizDto = _mapper.Map<Quiz>(quiz);

            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == quizDto.CreatorId);
            quizDto.Author = _mapper.Map<User>(user);

            return quizDto;
        }

        public async Task<IEnumerable<Quiz>> Get()
        {
            var quizzes = await _context.Quizzes.ToListAsync();
            var quizzesDto = _mapper.Map<IEnumerable<Quiz>>(quizzes);

            quizzesDto = quizzesDto.Select(q =>
            {
                var user = _context.Users.FirstOrDefault(x => x.Id == q.CreatorId);
                q.Author = _mapper.Map<User>(user);
                return q;
            });

            return quizzesDto;
        }

        public async Task<IEnumerable<Quiz>> GetCreatedQuizzesByUser(string username)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == username);
            var quizzes = await _context.Quizzes.Where(x => x.CreatorId == user.Id).ToListAsync();
            var quizzesDto = _mapper.Map<IEnumerable<Quiz>>(quizzes);
            return quizzesDto;
        }
    }
}
