using Microsoft.AspNetCore.Mvc;
using QuizApp.BusinessLayer.Abstract;

namespace QuizApp.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AnswersController : Controller
    {
        private readonly IAnswerService _answerService;

        public AnswersController(IAnswerService answerService)
        {
            _answerService = answerService;
        }

        // GET: api/answers?quizid=1
        [HttpGet]
        public async Task<IActionResult> GetAnswerByQuizId([FromQuery]int quizid)
        {
            try
            {
                var answer = await _answerService.GetAnswersByQuizId(quizid);
                return Ok(answer);
            }
            catch (ArgumentNullException exception)
            {
                return BadRequest(exception.Message);
            }
        }
    }
}
