using LMS.Infrastructure.Constracts;
using LMS.Infrastructure.Repositories;
using LMS.Infrastructure.Sql;
using Microsoft.EntityFrameworkCore;
using static LMS_Utility.SeedData;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DataContext>(x => x.UseSqlServer(builder.Configuration.GetConnectionString("LMSCon")));

builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<IUnitofWork, UnitofWork>();

builder.Services.AddCors(options =>
{
   options.AddDefaultPolicy(builder =>
   {
      builder.WithOrigins("*", "https://localhost:7263")
      .AllowAnyHeader()
      .AllowAnyMethod();
   });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
   app.UseSwagger();
   app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
   var services = scope.ServiceProvider;
   var context = services.GetRequiredService<DataContext>();
   DbInitializer.Initialize(context);
}

app.Run();
