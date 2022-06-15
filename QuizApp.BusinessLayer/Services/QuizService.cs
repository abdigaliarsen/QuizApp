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
            foreach (var quiz in quizzesDto)
                quiz.Author = _mapper.Map<User>(user);
            return quizzesDto;
        }

        public async Task<IEnumerable<Quiz>> GetPassedQuizzesByUser(string username)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == username);
            var usersQuizzes = await _context.UsersQuizzes.Where(x => x.CompletedUsersId == user.Id).ToListAsync();
            var quizzIds = usersQuizzes.Select(x => x.CompletedQuizzesId);
            List<Quiz> quizzes = new();
            foreach (var id in quizzIds)
            {
                var quiz = await _context.Quizzes.FirstOrDefaultAsync(x => x.Id == id);
                var quizDto = _mapper.Map<Quiz>(quiz);
                var author = await _context.Users.FirstOrDefaultAsync(x => x.Id == quiz.CreatorId);
                quizDto.Author = _mapper.Map<User>(author);
                quizzes.Add(quizDto);
            }
            return quizzes;
        }

        public async Task<IEnumerable<User>> GetPassedUsersByQuiz(int quizid)
        {
            var userQuizzes = await _context.UsersQuizzes.Where(x => x.CompletedQuizzesId == quizid).ToListAsync();
            List<User> users = new();
            foreach (var userQuiz in userQuizzes)
                users.Add(_mapper.Map<User>(await _context.Users.FirstOrDefaultAsync(x => x.Id == userQuiz.CompletedUsersId)));
            return users;
        }

        public async Task<UsersQuizzes> GetResultByUsername(string username, int quizid)
        {
            var userid = (await _context.Users.FirstOrDefaultAsync(x => x.UserName == username)).Id;
            var userQuiz = await _context.UsersQuizzes.FirstOrDefaultAsync(x => x.CompletedQuizzesId == quizid && x.CompletedUsersId == userid);
            var userQuizDto = _mapper.Map<UsersQuizzes>(userQuiz);
            return userQuizDto;
        }
    }
}
