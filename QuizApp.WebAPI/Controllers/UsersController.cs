using Microsoft.AspNetCore.Mvc;
using QuizApp.BusinessLayer.Abstract;
using QuizApp.BusinessLayer.DTOs;
using QuizApp.BusinessLayer.Exceptions;
using System.Data;

namespace QuizApp.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel loginModel)
        {
            try
            {
                var jwt = await _userService.Login(loginModel);
                return Ok(jwt);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel registerModel)
        {
            try
            {
                await _userService.CreateUser(registerModel);
                return StatusCode(StatusCodes.Status201Created);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get-current-user")]
        public async Task<IActionResult> GetCurrentUser()
        {
            try
            {
                var user = await _userService.GetCurrentUser();
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            try
            {
                _userService.Logout();
                return Ok();
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }

        [HttpGet("is-authenticated")]
        public async Task<IActionResult> IsCurrentUserAuthenticated()
        {
            return Ok(await _userService.IsAuthenticated());
        }

        // POST: api/users/set-completed-quiz?quizid=1&correctanswers=4
        [HttpPost("set-completed-quiz")]
        public async Task<IActionResult> SetCompletedQuizToCurrentUser([FromQuery] int quizId, [FromQuery] int correctAnswers)
        {
            if (await _userService.IsAuthenticated() == false)
                return Unauthorized();

            try
            {
                await _userService.SetCompletedQuizToCurrentUser(quizId, correctAnswers);
                return Ok();
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }

        // GET: api/users/is-quiz-completed-by-current-user
        [HttpGet("is-quiz-completed-by-current-user")]
        public async Task<IActionResult> IsQuizCompletedByCurrentUser([FromQuery] int quizId)
        {
            if (await _userService.IsAuthenticated() == false)
                return Unauthorized();

            try
            {
                bool isCompleted = await _userService.IsQuizCompletedByCurrentUser(quizId);
                return Ok(isCompleted);
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }

        // GET: api/users/get-result-for-current-user?quizid=1
        [HttpGet("get-result-for-current-user")]
        public async Task<IActionResult> GetQuizResultForCurrentUser([FromQuery] int quizId)
        {
            try
            {
                var usersQuizzes = await _userService.GetQuizResultForCurrentUser(quizId);
                return Ok(usersQuizzes);
            }
            catch (Exception exception)
            {
                return BadRequest(exception.Message);
            }
        }

        // GET: api/users/get-user-by-username?username=user01
        [HttpGet("get-user-by-username")]
        public async Task<IActionResult> GetUserByUsername([FromQuery] string username)
        {
            try
            {
                var user = await _userService.GetUserByUsername(username);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST: api/users/create-quiz
        [HttpPost("create-quiz")]
        public async Task<IActionResult> CreateQuiz([FromBody] Quiz quiz)
        {
            try
            {
                await _userService.CreateFullQuiz(quiz);
                return StatusCode(StatusCodes.Status201Created);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
