using AutoMapper;
using Tables = QuizApp.DataAccess.Tables;

namespace QuizApp.BusinessLayer.Profiles
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<DTOs.Answer, Tables.General.Answer>().ReverseMap();
            CreateMap<DTOs.Question, Tables.General.Question>().ReverseMap();
            CreateMap<DTOs.Quiz, Tables.General.Quiz>().ReverseMap();
            CreateMap<DTOs.User, Tables.Users.ApplicationUser>().ReverseMap();
            CreateMap<DTOs.UsersQuizzes, Tables.General.ApplicationUserQuiz>().ReverseMap();
        }
    }
}
