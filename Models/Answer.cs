using System.ComponentModel.DataAnnotations;


namespace QuizApp.Models
{
    public class Answer
    {
        public int Id { get; set; }
       
        [Required]
        public string Content { get; set; }
    }
}
