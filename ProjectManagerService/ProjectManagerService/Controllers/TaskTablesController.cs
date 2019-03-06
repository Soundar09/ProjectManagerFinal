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
    public class TaskTablesController : ApiController
    {
        private ProjectManagerEntities db = new ProjectManagerEntities();

        // GET: api/TaskTables
        public IQueryable<TaskTable> GetTaskTables()
        {
            return db.TaskTables;
        }

        // GET: api/TaskTables/5
        [ResponseType(typeof(TaskTable))]
        public IHttpActionResult GetTaskTable(int id)
        {
            TaskTable taskTable = db.TaskTables.Find(id);
            if (taskTable == null)
            {
                return NotFound();
            }

            return Ok(taskTable);
        }

        // PUT: api/TaskTables/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTaskTable(int id, TaskTable taskTable)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != taskTable.TaskId)
            {
                return BadRequest();
            }

            db.Entry(taskTable).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskTableExists(id))
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

        // POST: api/TaskTables
        [ResponseType(typeof(TaskTable))]
        public IHttpActionResult PostTaskTable(TaskTable taskTable)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TaskTables.Add(taskTable);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (TaskTableExists(taskTable.TaskId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = taskTable.TaskId }, taskTable);
        }

        // DELETE: api/TaskTables/5
        [ResponseType(typeof(TaskTable))]
        public IHttpActionResult DeleteTaskTable(int id)
        {
            TaskTable taskTable = db.TaskTables.Find(id);
            if (taskTable == null)
            {
                return NotFound();
            }

            db.TaskTables.Remove(taskTable);
            db.SaveChanges();

            return Ok(taskTable);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TaskTableExists(int id)
        {
            return db.TaskTables.Count(e => e.TaskId == id) > 0;
        }
    }
}