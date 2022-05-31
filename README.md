# Quiz Application
Fullstack web application implemented on React.js, ASP.NET Core Web API and MSSQL Server

# Contents

* [Overall Design](#Overal-Design)
  * [Project Description](##Project-Description)
  * [Purpose](##Purpose)
* [Frontend](##Frontend)
  * [React hooks](##React-hooks)
  * [Routing](##React-Router)
  * [Bootstrap](##Bootstrap)
  * [Cookies](##Cookies)
* [Backend](##Backed)
  * [Database](##Database)
  * [Project Architecture](##Project-Architecture)
  * [JWT Bearer Token](##Jwt-Bearer-Token)
  * [Controllers overview](##Controllers-Overview)
  * [CORS](##CORS)

# Overal Design

## Project Description

QuizApp allows users to create and pass quizzes. Every user has own profile page where anyone can look at what quizzes they have passed or created. Quizzes have several questions where every question consists of the content and options or answers. After users finished quiz and submitted their answers they can look at the result on quiz page.

## Purpose

The main purpose of this project is to practice my programing and development skills.

# Frontend

## React Hooks

In general I used only `useState()` and `useEffect()` react hooks:

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

Here is the code of [Quiz.jsx](https://github.com/quadropunk/QuizApp/blob/main/QuizApp.WebUI/src/components/Quiz.jsx) where I use `useState()` to define initial values of several states that will be rendered on quiz page. The `useEffect()` hook is used here to fetch data from my `API` after the page is mounted. I also included `useParams()` hook to get the id of opened quiz right from the query string.

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

I use bootstrap to easily design pages. I use React Bootstrap and the regular one:

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

The JsonWebToken is stored in Cookies that is the best place to store essential user data. The [api.jsx](https://github.com/quadropunk/QuizApp/blob/main/QuizApp.WebUI/src/components/api.jsx) component has `getJwt` function that takes the value from cookie by key. It's a little hardcoded, and I think it would be better to store the key value inside of .env file and include some library to proceed cookie data.

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
