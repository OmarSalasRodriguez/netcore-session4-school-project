using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolMVC.Models;

namespace SchoolMVC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly SchoolProjectContext dbContext;

        public StudentController(SchoolProjectContext context)
        {
            dbContext = context;
        }

        [HttpGet]
        [Route("")]
        public async Task<IActionResult> Get(string search = "", int skip = 0, int limit = 100)
        {
            List<Student> list = await dbContext.Students.Where( filter => 
                search == "" ? true  : 
                (
                    filter.Email.Contains(search) ||
                    filter.Name.Contains(search) || 
                    filter.LastName.Contains(search)
                ) 
            ).OrderByDescending(c => c.Grade).Skip(skip).Take(limit).ToListAsync();
            return StatusCode(StatusCodes.Status200OK, list);
        }

        [HttpGet]
        [Route("Count")]
        public  IActionResult Count(string search = "")
        {
            int count = dbContext.Students.Count(filter => 
                search == "" ? true  : 
                (
                    filter.Email.Contains(search) ||
                    filter.Name.Contains(search) || 
                    filter.LastName.Contains(search)
                ) 
            );

            return StatusCode(StatusCodes.Status200OK, count);
        }

        [HttpPost]
        [Route("")]
        public async Task<IActionResult> Post([FromBody] Student request)
        {
            await dbContext.Students.AddAsync(request);
            await dbContext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [HttpPatch]
        [Route("")]
        public async Task<IActionResult> Patch([FromBody] Student request)
        {
            dbContext.Students.Update(request);
            await dbContext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            Student? student = dbContext.Students.Find(id);
            if (student == null) return StatusCode(StatusCodes.Status404NotFound, "Student not found");


            dbContext.Students.Remove(student);
            await dbContext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }
    }
}
