using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuizApp.DataAccess.Migrations
{
    public partial class AddedUsersQuizzesCustomTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ApplicationUserQuiz");

            migrationBuilder.CreateTable(
                name: "UsersQuizzes",
                columns: table => new
                {
                    CompletedQuizzesId = table.Column<int>(type: "int", nullable: false),
                    CompletedUsersId = table.Column<int>(type: "int", nullable: false),
                    QuizId = table.Column<int>(type: "int", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    CorrectAnswers = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsersQuizzes", x => new { x.CompletedQuizzesId, x.CompletedUsersId });
                    table.ForeignKey(
                        name: "FK_UsersQuizzes_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_UsersQuizzes_Quizzes_QuizId",
                        column: x => x.QuizId,
                        principalTable: "Quizzes",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_UsersQuizzes_QuizId",
                table: "UsersQuizzes",
                column: "QuizId");

            migrationBuilder.CreateIndex(
                name: "IX_UsersQuizzes_UserId",
                table: "UsersQuizzes",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UsersQuizzes");

            migrationBuilder.CreateTable(
                name: "ApplicationUserQuiz",
                columns: table => new
                {
                    CompletedQuizzesId = table.Column<int>(type: "int", nullable: false),
                    CompletedUsersId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApplicationUserQuiz", x => new { x.CompletedQuizzesId, x.CompletedUsersId });
                    table.ForeignKey(
                        name: "FK_ApplicationUserQuiz_AspNetUsers_CompletedUsersId",
                        column: x => x.CompletedUsersId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ApplicationUserQuiz_Quizzes_CompletedQuizzesId",
                        column: x => x.CompletedQuizzesId,
                        principalTable: "Quizzes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ApplicationUserQuiz_CompletedUsersId",
                table: "ApplicationUserQuiz",
                column: "CompletedUsersId");
        }
    }
}
