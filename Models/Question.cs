using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace QuizApp.Models
{
    public class Question
    {
        public int Id { get; set; }

        [Required]
        public string Content { get; set; }

        public List<Answer> Answers { get; set; }

        [Required]
        public string CorrectAnswer { get; set; }
    }
}
