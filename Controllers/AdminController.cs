using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizApp.Data;
using QuizApp.Models;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace QuizApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AdminController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public AdminController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/Admin
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Question>>> GetQuestions()
        {
            var response = await IsAdminLoggedIn();

            if (response.GetType() == typeof(OkResult))
            {
                var questions = await _context.Questions.Include(q => q.Answers).ToListAsync();
                if (questions == null)
                {
                    return NotFound();
                }
                return Ok(questions);
            }
            return response;
        }

        // GET: api/Admin/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Question>> GetQuestion(int id)
        {
            var response = await IsAdminLoggedIn();

            if (response.GetType() == typeof(OkResult))
            {
                var question = await _context.Questions.Include(q => q.Answers).FirstOrDefaultAsync(q => q.Id == id);

                if (question == null)
                {
                    return NotFound();
                }
                return Ok(question);
            }
            return response;
        }

        // PUT: api/Admin/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuestion(int id, Question question)
        {
            var response = await IsAdminLoggedIn();

            if (response.GetType() == typeof(OkResult))
            {
                if (id != question.Id)
                {
                    return BadRequest();
                }

                _context.Entry(question).State = EntityState.Modified;
                var answers = question.Answers;
                foreach (var answer in answers)
                {
                    _context.Entry(answer).State = EntityState.Modified;
                }

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!QuestionExists(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return Ok(question);
            }
            return response;
        }

        // POST: api/Admin
        [HttpPost]
        public async Task<ActionResult<Question>> PostQuestion(Question question)
        {
            var response = await IsAdminLoggedIn();

            if (response.GetType() == typeof(OkResult))
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }

                _context.Questions.Add(question);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetQuestion", new { id = question.Id }, question);
            }
            return response;            
        }

        // DELETE: api/Admin/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuestion(int id)
        {
            var response = await IsAdminLoggedIn();

            if (response.GetType() == typeof(OkResult))
            {
                var question = await _context.Questions.Include(q => q.Answers).FirstOrDefaultAsync(q => q.Id == id);
                if (question == null)
                {
                    return NotFound();
                }
                var answers = await _context.Questions.Include(q => q.Answers).Where(q => q.Id == id).SelectMany(q => q.Answers).ToListAsync();
                _context.Answers.RemoveRange(answers);
                await _context.SaveChangesAsync();
                _context.Questions.Remove(question);
                await _context.SaveChangesAsync();

                return Ok(question);
            }
            return response;            
        }

        private bool QuestionExists(int id)
        {
            return _context.Questions.Any(e => e.Id == id);
        }

        private ApplicationUser GetUser()
        {
            var claimsIdentity = (ClaimsIdentity)User.Identity;
            var claim = claimsIdentity.FindFirst(ClaimTypes.NameIdentifier);
            var user = _context.Users.Find(claim.Value);

            if (user == null)
            {
                return null;
            }
            return user;
        }

        private async Task<ActionResult> IsAdminLoggedIn()
        {
            var user = GetUser();
            if (user == null)
            {
                return BadRequest();
            }

            var roles = await _userManager.GetRolesAsync(user);
            if (roles.Count == 0 || roles[0] != "admin")
            {
                return Forbid();
            }
            return Ok();
        }
    }
}
