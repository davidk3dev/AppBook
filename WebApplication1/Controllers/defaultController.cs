using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class defaultController : ApiController
    {
        private appbookEntities2 db = new appbookEntities2();
        
        public HttpResponseMessage GetBaiByChuyenDe(string idChuyende)
        {
            var id = -1;
            if (!int.TryParse(idChuyende, out id))
            {
                var response = Request.CreateResponse(HttpStatusCode.BadRequest);
                response.Content = new StringContent("Invalid idChuyende", Encoding.UTF8, "application/json");
                return response;
            }
            //var dsBai = db.tb_bai.Where(b => b.id_chuyende == id).ToList();
            var query = db.tb_bai.Where(b => b.id_chuyende == id).AsEnumerable().Select(b =>
            {
                var dsDebai = b.tb_templatenoidung.Select(t => new
                {
                    loaitemplate = t.loai_template,
                    noidung = t.tb_templatenoidung_text.noidung
                }).ToList();

                return new
                {
                    idBai = b.id_bai,
                    idChuyende = b.id_chuyende,
                    sothutu = b.thu_tu,
                    xuatban = b.xuat_ban,
                    ngaytao = b.ngay_tao,
                    dsNoidungDebai = dsDebai
                };
            });
            //var dsBai2 = db.tb_bai.joi
            return CreateResponse(query);
        }

        // GET: api/default
        public IQueryable<tb_bai> Gettb_bai()
        {
            return db.tb_bai;
        }

        // GET: api/default/5
        [ResponseType(typeof(tb_bai))]
        public async Task<IHttpActionResult> Gettb_bai(int id)
        {
            tb_bai tb_bai = await db.tb_bai.FindAsync(id);
            if (tb_bai == null)
            {
                return NotFound();
            }

            return Ok(tb_bai);
        }

        // PUT: api/default/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> Puttb_bai(int id, tb_bai tb_bai)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tb_bai.id_bai)
            {
                return BadRequest();
            }

            db.Entry(tb_bai).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!tb_baiExists(id))
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

        // POST: api/default
        [ResponseType(typeof(tb_bai))]
        public async Task<IHttpActionResult> Posttb_bai(tb_bai tb_bai)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.tb_bai.Add(tb_bai);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = tb_bai.id_bai }, tb_bai);
        }

        // DELETE: api/default/5
        [ResponseType(typeof(tb_bai))]
        public async Task<IHttpActionResult> Deletetb_bai(int id)
        {
            tb_bai tb_bai = await db.tb_bai.FindAsync(id);
            if (tb_bai == null)
            {
                return NotFound();
            }

            db.tb_bai.Remove(tb_bai);
            await db.SaveChangesAsync();

            return Ok(tb_bai);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tb_baiExists(int id)
        {
            return db.tb_bai.Count(e => e.id_bai == id) > 0;
        }
        private HttpResponseMessage CreateResponse(object content)
        {
            var result = JsonConvert.SerializeObject(content, Formatting.Indented);
            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(result, Encoding.UTF8, "application/json");
            return response;
        }
    }
    
}