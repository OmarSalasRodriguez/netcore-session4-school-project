/*

# Creación del modelo y el contexto para la tabla "students"
dotnet ef dbcontext scaffold "Server=localhost;Port=3306;Database=SCHOOL_PROJECT;User=root;Password=;" Pomelo.EntityFrameworkCore.MySql -o Models


# Registrar contexto en program.cs
using SchoolMVC.Models;
builder.Services.AddDbContext<SchoolProjectContext>();

# Crear ScoolController
Crear los el CRUD para el controlador

# Agregar la ruta "/api/student" en el contexto del archivo ClientApp/src/setupProxy.js

# Trabajar las vistas en ClientApp y realizar las solicutudes HTTP 

 */