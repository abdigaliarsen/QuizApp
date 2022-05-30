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

        // GET: /api/quizzes/get-created-quizzes-by-use?username=user01
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
    }
}
