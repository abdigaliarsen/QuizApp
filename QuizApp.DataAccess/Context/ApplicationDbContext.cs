using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using QuizApp.DataAccess.Tables.General;
using QuizApp.DataAccess.Tables.Users;

namespace QuizApp.DataAccess.Context
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, IdentityRole<int>, int>
    {
        public DbSet<Question>? Questions { get; set; }

        public DbSet<Answer>? Answers { get; set; }

        public DbSet<Quiz>? Quizzes { get; set; }

        public DbSet<ApplicationUserQuiz>? UsersQuizzes { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ApplicationUserQuiz>()
                .HasKey(x => new { x.CompletedQuizzesId, x.CompletedUsersId });

            builder.Entity<Quiz>()
                .HasMany(x => x.Questions)
                .WithOne(x => x.Quiz)
                .HasForeignKey(x => x.QuizId);
        }
    }
}
