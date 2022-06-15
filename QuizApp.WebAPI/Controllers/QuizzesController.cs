using Microsoft.AspNetCore.Mvc;
using QuizApp.BusinessLayer.Abstract;

namespace QuizApp.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuizzesController : Controller
    {
        private readonly IQuizService _quizService;

        public QuizzesController(IQuizService quizService)
        {
            _quizService = quizService;
        }

        // GET: /api/quizzes/
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var quizzes = await _quizService.Get();
                return Ok(quizzes);
            }
            catch (ArgumentNullException exception)
            {
                return BadRequest(exception.Message);
            }
        }

        // GET: /api/quizzes/1
        [HttpGet("{id:int}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var quiz = await _quizService.Get(id);
                return Ok(quiz);
            }
            catch (ArgumentNullException exception)
            {
                return BadRequest(exception.Message);
            }
        }

        // GET: /api/quizzes/get-created-quizzes-by-user?username=user01
        [HttpGet("get-created-quizzes-by-user")]
        public async Task<IActionResult> GetCreatedQuizzes([FromQuery] string username)
        {
            try
            {
                var quizzes = await _quizService.GetCreatedQuizzesByUser(username);
                return Ok(quizzes);
            }
            catch
            {
                return BadRequest();
            }
        }

        // GET: /api/quizzes/get-passed-quizzes-by-user?username=user01
        [HttpGet("get-passed-quizzes-by-user")]
        public async Task<IActionResult> GetPassedQuizzes([FromQuery] string username)
        {
            try
            {
                var quizzes = await _quizService.GetPassedQuizzesByUser(username);
                return Ok(quizzes);
            }
            catch
            {
                return BadRequest();
            }
        }

        // GET: /api/quizzes/get-passed-users-by-quizid?quizid=1
        [HttpGet("get-passed-users-by-quizid")]
        public async Task<IActionResult> GetPassedUsers([FromQuery] int quizid)
        {
            try
            {
                var quizzes = await _quizService.GetPassedUsersByQuiz(quizid);
                return Ok(quizzes);
            }
            catch
            {
                return BadRequest();
            }
        }

        // GET: /api/quizzes/get-result-by-username?username=user01&quizid=1
        [HttpGet("get-result-by-username")]
        public async Task<IActionResult> GetResultByUsername([FromQuery] string username, [FromQuery] int quizid)
        {
            try
            {
                var result = await _quizService.GetResultByUsername(username, quizid);
                return Ok(result);
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
