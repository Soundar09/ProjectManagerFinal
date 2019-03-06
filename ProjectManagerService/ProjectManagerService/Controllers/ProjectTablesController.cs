using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using ProjectManagerService.Models;

namespace ProjectManagerService.Controllers
{
    public class ProjectTablesController : ApiController
    {
        private ProjectManagerEntities db = new ProjectManagerEntities();

        // GET: api/ProjectTables
        public IQueryable<ProjectTable> GetProjectTables()
        {
            return db.ProjectTables;
        }

        // GET: api/ProjectTables/5
        [ResponseType(typeof(ProjectTable))]
        public IHttpActionResult GetProjectTable(int id)
        {
            ProjectTable projectTable = db.ProjectTables.Find(id);
            if (projectTable == null)
            {
                return NotFound();
            }

            return Ok(projectTable);
        }

        // PUT: api/ProjectTables/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutProjectTable(int id, ProjectTable projectTable)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != projectTable.ProjectId)
            {
                return BadRequest();
            }

            db.Entry(projectTable).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectTableExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/ProjectTables
        [ResponseType(typeof(ProjectTable))]
        public IHttpActionResult PostProjectTable(ProjectTable projectTable)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ProjectTables.Add(projectTable);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (ProjectTableExists(projectTable.ProjectId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = projectTable.ProjectId }, projectTable);
        }

        // DELETE: api/ProjectTables/5
        [ResponseType(typeof(ProjectTable))]
        public IHttpActionResult DeleteProjectTable(int id)
        {
            ProjectTable projectTable = db.ProjectTables.Find(id);
            if (projectTable == null)
            {
                return NotFound();
            }

            db.ProjectTables.Remove(projectTable);
            db.SaveChanges();

            return Ok(projectTable);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProjectTableExists(int id)
        {
            return db.ProjectTables.Count(e => e.ProjectId == id) > 0;
        }
    }
}