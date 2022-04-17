using System.Runtime.Serialization;

namespace QuizApp.BusinessLayer.Exceptions
{
    public class PasswordMatchException : Exception
    {
        public PasswordMatchException()
        {
        }

        public PasswordMatchException(string? message) : base(message)
        {
        }

        public PasswordMatchException(string? message, Exception? innerException) : base(message, innerException)
        {
        }

        protected PasswordMatchException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}
