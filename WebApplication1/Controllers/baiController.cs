using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class baiController : Controller
    {
        private appbookEntities2 db = new appbookEntities2();

        //GET: bai/View
        public ActionResult View()
        {
            return View("View");
        }

        // GET: bai
        public async Task<ActionResult> Index()
        {
            var tb_bai = db.tb_bai.Include(t => t.tb_chuyende);
            return View(await tb_bai.ToListAsync());
            
        }

        // GET: bai/Details/5
        public async Task<ActionResult> Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            tb_bai tb_bai = await db.tb_bai.FindAsync(id);
            if (tb_bai == null)
            {
                return HttpNotFound();
            }
            return View(tb_bai);
        }

        // GET: bai/Create
        public ActionResult Create()
        {
            ViewBag.id_chuyende = new SelectList(db.tb_chuyende, "id_chuyende", "ten_chuyende");
            return View();
        }

        // POST: bai/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "id_bai,id_chuyende,ngay_tao,xuat_ban,thu_tu,bai_mau")] tb_bai tb_bai)
        {
            if (ModelState.IsValid)
            {
                db.tb_bai.Add(tb_bai);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            ViewBag.id_chuyende = new SelectList(db.tb_chuyende, "id_chuyende", "ten_chuyende", tb_bai.id_chuyende);
            return View(tb_bai);
        }

        // GET: bai/Edit/5
        public async Task<ActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            tb_bai tb_bai = await db.tb_bai.FindAsync(id);
            if (tb_bai == null)
            {
                return HttpNotFound();
            }
            ViewBag.id_chuyende = new SelectList(db.tb_chuyende, "id_chuyende", "ten_chuyende", tb_bai.id_chuyende);
            return View(tb_bai);
        }

        // POST: bai/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "id_bai,id_chuyende,ngay_tao,xuat_ban,thu_tu,bai_mau")] tb_bai tb_bai)
        {
            if (ModelState.IsValid)
            {
                db.Entry(tb_bai).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            ViewBag.id_chuyende = new SelectList(db.tb_chuyende, "id_chuyende", "ten_chuyende", tb_bai.id_chuyende);
            return View(tb_bai);
        }

        // GET: bai/Delete/5
        public async Task<ActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            tb_bai tb_bai = await db.tb_bai.FindAsync(id);
            if (tb_bai == null)
            {
                return HttpNotFound();
            }
            return View(tb_bai);
        }

        // POST: bai/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(int id)
        {
            tb_bai tb_bai = await db.tb_bai.FindAsync(id);
            db.tb_bai.Remove(tb_bai);
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
