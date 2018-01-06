using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using IngenOrderApp.Models;
using IngenOrderApp.App_Code;


namespace IngenOrderApp.Controllers
{
    public class ProductsController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: Products
        public ActionResult Index()
        {
            List<Product> prod_list = new List<Product>();
            try
            {
                prod_list = db.Products.ToList();
                TempData["Tag"] = ConstantMessage.InfoTag;
                TempData["Message"] = "Welcome to Product List Form";
            }
            catch (Exception ex)
            {
                ViewBag.message = ex.Message;
                ViewBag.tag = ConstantMessage.ErrorTag;
            }

            if (Convert.ToString(TempData["Message"]) != null)
            {
                ViewBag.message = Convert.ToString(TempData["Message"]);
                ViewBag.tag = Convert.ToString(TempData["Tag"]);
            }

            return View(prod_list);
        }

        // GET: Products/Details/5
        public ActionResult Details(string id)
        {
            try
            {
                if (id == null)
                {
                    return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
                }
                Product product = db.Products.Find(id);
                if (product == null)
                {
                    return HttpNotFound();
                }
                return View(product);
            }
            catch (Exception ex)
            {               
                TempData["Tag"] = ConstantMessage.ErrorTag;
                TempData["Message"] = ex.Message;
            }           
            return RedirectToAction("Index", "Products");
        }

        // GET: Products/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Products/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Product product)
        {
            product.Reference = Guid.NewGuid().ToString();

            if (ModelState.IsValid)
            {
                try
                {

                    db.Products.Add(product);
                    db.SaveChanges();

                    TempData["Tag"] = ConstantMessage.SuccessTag;
                    TempData["Message"] = "Product "+product.Name +" save successful";
                }
                catch (Exception ex)
                {
                    TempData["Tag"] = ConstantMessage.ErrorTag;
                    TempData["Message"] = ex.Message;
                }           
                return RedirectToAction("Index", "Products");
           
            }

            return View(product);
        }

        // GET: Products/Edit/5
        public ActionResult Edit(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Product product = db.Products.Find(id);
            if (product == null)
            {
                return HttpNotFound();
            }
            ViewBag.Status = product.Status;
            ViewBag.ServiceCatagory = product.ServiceCategory;
          
            return View(product);
        }

        // POST: Products/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(Product product)
        {
            if (ModelState.IsValid)
            {
                db.Entry(product).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(product);
        }

        // GET: Products/Delete/5
        public ActionResult Delete(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Product product = db.Products.Find(id);
            if (product == null)
            {
                return HttpNotFound();
            }
            return View(product);
        }

        // POST: Products/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(string id)
        {
            Product product = db.Products.Find(id);
            db.Products.Remove(product);
            db.SaveChanges();
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
