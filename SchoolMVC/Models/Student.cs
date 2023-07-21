using System;
using System.Collections.Generic;

namespace SchoolMVC.Models;

public partial class Student
{
    public int Id { get; set; }

    public string Email { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public int Grade { get; set; }
}
