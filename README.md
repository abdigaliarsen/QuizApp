# Quiz Application
Fullstack web application implemented on React.js, ASP.NET Core Web API and MSSQL Server

# Contents

* [Overall Design](#overal-design)
  * [Project Description](#project-description)
  * [Purpose](#purpose)
* [Frontend](#frontend)
  * [React hooks](#react-hooks)
  * [React Routing](#react-routing)
  * [Bootstrap](#bootstrap)
  * [Cookies](#cookies)
* [Backend](#backend)
  * [Database](#database)
  * [Project Architecture](#project-architecture)
  * [JWT Bearer Token](#jwt-bearer-token)
  * [Controllers overview](#controllers-overview)
  * [CORS](#cors)

# Overall Design

## Project Description

QuizApp allows users to create and pass quizzes. Every user has own profile page where anyone can look at what quizzes they have passed or created. Quizzes have several questions where every question consists of the content and answers. After users finished quiz and submitted their answers they can look at the result on the quiz page.

## Purpose

The main purpose of this project is to practice my programing and development skills.

# Frontend

## React Hooks

In general I used `useState()` and `useEffect()` react hooks:

```javascript
const [quiz, setQuiz] = useState({});
const [isAuth, setIsAuth] = useState(false);
const [isCompleted, setIsCompleted] = useState(false);
const [quizResult, setQuizResult] = useState(0);

let { quizid } = useParams();

useEffect(() => {
  getQuiz(quizid).then(res => setQuiz(res.data));
  isAuthenticated().then(res => setIsAuth(res.data));
  isQuizCompletedByCurrentUser(quizid).then(res => setIsCompleted(res.data));
}, []);
```

Here is the code of [Quiz.jsx](https://github.com/quadropunk/QuizApp/blob/main/QuizApp.WebUI/src/components/Quiz.jsx) where I use `useState()` to define the initial values of several states that will be rendered on the quiz page. The `useEffect()` hook is used here to fetch data from my `API` after the page is mounted. I also included `useParams()` hook to get the id of opened quiz right from the query string.

## React Routing

The [App.js](https://github.com/quadropunk/QuizApp/blob/main/QuizApp.WebUI/src/App.js) defines all client routes.

```javascript
<BrowserRouter>
  <Layout />
  <Routes>
    <Route exact path="/" element={<Home />} />
    <Route exact path="/quiz/:quizid" element={<Quiz />} />
    <Route exact path="/quiz/:quizid/questions/" element={<Question />} />
    <Route exact path="/profile/:username" element={<Profile />} />
  </Routes>
</BrowserRouter>
```

- `BrowserRouter` allows to store pages history to easily navigate between them.
- `Layout` is a custom function component from [Layout.jsx](https://github.com/quadropunk/QuizApp/blob/main/QuizApp.WebUI/src/components/Layout.jsx).
- `Routes` element stores all paths of the client side project in `Route` components that have `path` or `exact path` attributes that define the path patterns.

## Bootstrap

I used bootstrap to easily design pages:

```javascript
import { Container, Form, Button, Navbar, Nav, FormControl, Modal, NavDropdown } from "react-bootstrap";
```

```html
<div className="d-flex justify-content-between">
```

```javascript
<Navbar fixed="top" bg="light" expand="lg">
```

## Cookies

The JsonWebToken is stored in Cookies. The [api.jsx](https://github.com/quadropunk/QuizApp/blob/main/QuizApp.WebUI/src/components/api.jsx) component has `getJwt` function that takes the value from cookie by key. It's a little hardcoded, and I think it would be better to store the key value inside of .env file and include some library to proceed cookie data.

```javascript
const jwtKey = 'jwt';

const getJwt = () => {
  let tokens = document.cookie;
  if (tokens)
    return tokens
      .split(';')
      .filter(cookie =>
        cookie.startsWith(`${jwtKey}=`))[0]
        .substring(`${jwtKey}=`.length);
}
```

# Backend

## Database

The QuizApp uses [MSSQL Server](https://en.wikipedia.org/wiki/Microsoft_SQL_Server). The `QuizAppDatabase` stores data about users, quizzes, questions, answers, and database migrations. Since I used `EntityFrameworkCore` to manage the database access, and `IdentityCore` to easily handle user data, there are bunch of AspNetXXX tables that are generated by EFCore.

![image](https://user-images.githubusercontent.com/65077473/171269943-3507109b-c3cb-46be-bc7f-137c5aa92bb6.png)

The database is injected via `Connection string` that is stored in [appsetings.json](https://github.com/quadropunk/QuizApp/blob/main/QuizApp.WebAPI/appsettings.json) file in `DefaultConnection` field:

```json
"ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=QuizAppDatabase;Trusted_Connection=True;MultipleActiveResultSets=true"
  },
```

Since the project is implented with n-tier architecture, I had to inject the connection string to [DataAccessLayer](https://github.com/quadropunk/QuizApp/tree/main/QuizApp.DataAccess) from my [Program.cs](https://github.com/quadropunk/QuizApp/blob/main/QuizApp.WebAPI/Program.cs) file. To do so, I extended `IServiceCollection` interface in [`DbContextInjector`](https://github.com/quadropunk/QuizApp/blob/main/QuizApp.BusinessLayer/Extensions/DbContextInjector.cs) class.

```C#
builder.Services.InjectDbContext(builder.Configuration);
```

```C#
public static class DbContextInjector
{
    public static IServiceCollection InjectDbContext(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")))
            .AddIdentityCore<ApplicationUser>(options =>
            {
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireDigit = false;
            })
            .AddEntityFrameworkStores<ApplicationDbContext>();
        return services;
    }
}
```

## Project Architecture

The project is implemented using [N-Layer Architecture](https://en.wikipedia.org/wiki/Multitier_architecture). So QuizApp is divided by three main categories:
1. Presentation layer ([Web.API](https://github.com/quadropunk/QuizApp/tree/main/QuizApp.WebAPI) and [Web.UI](https://github.com/quadropunk/QuizApp/tree/main/QuizApp.WebUI))
This is applicational layer that allows to show data after it was processed. Web.API consists of many different controllers that send HTTP/HTTPS responses by requesting to Business layer functions.
2. Business Layer or data processing layer ([BusinessLayer](https://github.com/quadropunk/QuizApp/tree/main/QuizApp.BusinessLayer))
Business layer modificate data from Data Access Layer. For example there is Data Transfer Objects used to simplify json responses from API. Business Layer takes needed data from database and wraps it in smaller objects.
3. Data Access Layer ([DataAccess](https://github.com/quadropunk/QuizApp/tree/main/QuizApp.DataAccess))
Data Access Layer has the `Context` class to access the database via provided `Connection string`. It also stores classes that represent database tables. Since I use Code-First method, classes construct tables.

Basically, the project design should look like this:

![image](https://user-images.githubusercontent.com/65077473/171275593-9aadec46-c9bc-488f-9784-0426ae7cb490.png)

## Jwt Bearer Token

When users successfuly logged in, they receive generated `JWT` token that is used to verify the user in future `API` calls. The generated `JWT` token contains payload that allows to get the user data in server after it decrypted with project's secret key that is stored in [appsettings.json](https://github.com/quadropunk/QuizApp/blob/main/QuizApp.WebAPI/appsettings.json).

```json
"Jwt": {
  "ValidAudience": "User",
  "ValidIssuer": "https://localhost:7049",
  "SecretKey": "mysecretkey123456789"
},
```

```C#
var claims = new List<Claim>
{
  new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
  new Claim(ClaimTypes.Name, user.UserName),
  new Claim(ClaimTypes.Email, user.Email),
  new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
};

var signinKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"]));
var token = new JwtSecurityToken(
  issuer: _configuration["Jwt:ValidIssuer"],
  audience: _configuration["Jwt:ValidAudience"],
  expires: DateTime.Now.AddMinutes(120),
  claims: claims,
  signingCredentials: new SigningCredentials(signinKey, SecurityAlgorithms.HmacSha256)
);

var jwt = new JwtSecurityTokenHandler().WriteToken(token);

var options = new CookieOptions
{
  HttpOnly = false,
  Expires = DateTime.UtcNow.AddHours(6),
  IsEssential = true,
  SameSite = SameSiteMode.None,
  Secure = true
};

_httpContext.HttpContext.Response.Cookies.Append("jwt", jwt, options);
```

This token is used in every user functions, such as: `setCompletedQuizToCurrentUser`, `isQuizCompletedByCurrentUser`, `createQuiz` in [api.jsx](https://github.com/quadropunk/QuizApp/blob/main/QuizApp.WebUI/src/components/api.jsx).

## Controllers Overview

There are 4 controllers:
- [`AnswersController`](https://github.com/quadropunk/QuizApp/blob/main/QuizApp.WebAPI/Controllers/AnswersController.cs).
- [`QuestionsController`](https://github.com/quadropunk/QuizApp/blob/main/QuizApp.WebAPI/Controllers/QuestionsController.cs).
- [`QuizzesController`](https://github.com/quadropunk/QuizApp/blob/main/QuizApp.WebAPI/Controllers/QuizzesController.cs).
- [`UsersController.cs`](https://github.com/quadropunk/QuizApp/blob/main/QuizApp.WebAPI/Controllers/UsersController.cs).

Each of the controllers has corresponding readonly service interface to access Business Layer data manipulation results. These interfaces are connected with their implementation classes in [`Program.cs`](https://github.com/quadropunk/QuizApp/blob/main/QuizApp.WebAPI/Program.cs) file, like:

```C#
builder.Services.AddScoped<IAnswerService, AnswerService>();
```

So the `AnswerService` functions will be used anytime the program will call the `IAnswerSerive` interface.

```C#
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
```

## CORS

In order to handle different origins the project uses [`CORS`](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) technology. Since QuizApp uses only one origin, namely local webpages (https://localhost:3000), I defined it to the project's cors default policies.

```C#
builder.Services.AddCors(options =>
{
  options.AddDefaultPolicy(builder =>
  {
    builder.WithOrigins("https://localhost:3000")
      .AllowAnyHeader()
      .AllowAnyHeader()
      .AllowCredentials();
  });
});
```
