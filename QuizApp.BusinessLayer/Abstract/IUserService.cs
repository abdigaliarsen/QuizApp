using QuizApp.BusinessLayer.DTOs;

namespace QuizApp.BusinessLayer.Abstract
{
    public interface IUserService
    {
        public Task CreateUser(RegisterModel registerModel);

        public Task<string> Login(LoginModel loginModel);

        public Task<User> GetCurrentUser();

        public Task<bool> IsAuthenticated();

        public void Logout();
    }
}
