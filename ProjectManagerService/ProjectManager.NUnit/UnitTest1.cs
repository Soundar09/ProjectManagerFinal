using System;
using System.Linq;
using NUnit.Framework;
using ProjectManagerService.Controllers;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;
using System.Web.Http.Results;
using System.Net;
using ProjectManagerService.Models;

namespace ProjectManagerService.Tests
{
    [TestFixture]
    public class ProjectControllerTest : ApiController
    {

        [Test]
        public void GetProject()
        {
            // Set up Prerequisites 
            var controller = new ProjectTablesController();
            controller.Request = new HttpRequestMessage();
            controller.Configuration = new HttpConfiguration();
            var response = controller.GetProjectTable(4002);
            var res = Task.FromResult(response);
            Assert.IsInstanceOf<OkNegotiatedContentResult<ProjectTable>>(response);
        }

        [Test]
        public void AddProject()
        {
            var controller = new ProjectTablesController();
            controller.Request = new HttpRequestMessage();
            controller.Configuration = new HttpConfiguration();
            ProjectTable prj = new ProjectTable
            {
                EndDate = DateTime.Now.AddDays(20),
                StartDate = DateTime.Now,
                ProjectName = "TestProject",
                ManagerName = "FSEManager",
                Priority = 25
            };

            IHttpActionResult actionResult = controller.PostProjectTable(prj);
            var createdResult = actionResult as CreatedAtRouteNegotiatedContentResult<ProjectTable>;
            // Assert 

            Assert.IsNotNull(createdResult);
            Assert.AreEqual("DefaultApi", createdResult.RouteName);
            Assert.IsNotNull(createdResult.RouteValues["id"]);
        }



        [Test]
        public void UpdateProject()
        {
            var controller = new ProjectTablesController();
            controller.Request = new HttpRequestMessage();
            controller.Configuration = new HttpConfiguration();
            ProjectTable prj = new ProjectTable
            {
                EndDate = DateTime.Now.AddDays(20),
                StartDate = DateTime.Now,
                ProjectName = "TestProject2",
                ManagerName = "FSEManager2",
                Priority = 20,
                ProjectId = 4005
            };

            IHttpActionResult actionResult = controller.PutProjectTable(4005, prj);
            var createdResult = actionResult as StatusCodeResult;
            // Assert 

            Assert.IsNotNull(createdResult);
            Assert.AreEqual(HttpStatusCode.NoContent, createdResult.StatusCode);
        }



        [Test]
        public void DeleteProject()
        {
            // Set up Prerequisites 

            var controller = new ProjectTablesController();
            controller.Request = new HttpRequestMessage();
            controller.Configuration = new HttpConfiguration();
            var response = controller.DeleteProjectTable(4008);
            var res = Task.FromResult(response);
            Assert.IsInstanceOf<OkNegotiatedContentResult<ProjectTable>>(response);
        }
    }
}
