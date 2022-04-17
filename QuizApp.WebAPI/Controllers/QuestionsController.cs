using Microsoft.AspNetCore.Mvc;
using QuizApp.BusinessLayer.Abstract;

namespace QuizApp.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuestionsController : Controller
    {
        private readonly IQuestionService _questionService;

        public QuestionsController(IQuestionService questionService)
        {
            _questionService = questionService;
        }

        // GET: api/questions?quizid=1
        [HttpGet]
        public async Task<IActionResult> GetByQuizId([FromQuery]int quizid)
        {
            try
            {
                var question = await _questionService.GetQuestionsByQuizId(quizid);
                return Ok(question);
            }
            catch (ArgumentNullException excepion)
            {
                return BadRequest(excepion.Message);
            }
        }
    }
}
