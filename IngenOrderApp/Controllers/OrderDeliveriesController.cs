using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using IngenOrderApp.Models;

namespace IngenOrderApp.Controllers
{
    public class OrderDeliveriesController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();



        //public ActionResult getData()
        //{
        //    //Datatable parameter
        //    var draw = Request.Form.GetValues("draw").FirstOrDefault();
        //    //paging parameter
        //    var start = Request.Form.GetValues("start").FirstOrDefault();
        //    var length = Request.Form.GetValues("length").FirstOrDefault();
            
        //    //sorting parameter
        //    var sortColumn = Request.Form.GetValues("columns[" + Request.Form.GetValues("order[0][column]").FirstOrDefault() + "][name]").FirstOrDefault();
        //    var sortColumnDir = Request.Form.GetValues("order[0][dir]").FirstOrDefault();
            
        //    //filter parameter
        //    var searchValue = Request.Form.GetValues("search[value]").FirstOrDefault();



        //    List<Customer> allCustomer = new List<Customer>();
        //    int pageSize = length != null ? Convert.ToInt32(length) : 0;
        //    int skip = start != null ? Convert.ToInt32(start) : 0;
        //    int recordsTotal = 0;

        //    //Database query
        //    using (MyDatabaseEntities1 dc = new MyDatabaseEntities1())
        //    {
        //        var v = (from a in dc.Customers select a);

        //        //search
        //        if (!string.IsNullOrEmpty(searchValue))
        //        {
        //            v = v.Where(a =>
        //                a.CustomerID.Contains(searchValue) ||
        //                a.CompanyName.Contains(searchValue) ||
        //                a.ContactName.Contains(searchValue) ||
        //                a.Phone.Contains(searchValue) ||
        //                a.City.Contains(searchValue)
        //                );
        //        }

        //        //sort
        //        if (!(string.IsNullOrEmpty(sortColumn) && string.IsNullOrEmpty(sortColumnDir)))
        //        {
        //            //for make sort simpler we will add Syste.Linq.Dynamic reference
        //            v = v.OrderBy(sortColumn + " " + sortColumnDir);
        //        }

        //        recordsTotal = v.Count();
        //        allCustomer = v.Skip(skip).Take(pageSize).ToList();
        //    }

        //    return Json(new { draw = draw, recordsFiltered = recordsTotal, recordsTotal = recordsTotal, data = allCustomer });
        //}


        [HttpPost]
        public ActionResult LoadOrdeDeliveryData(string status)  //string InvoiceNo, string FromDate, string ToDate, string phone, string SuplierId, string Option
        {

            // DateTime _FromDate;
            // DateTime _ToDate; 

            var draw = Request.Form.GetValues("draw").FirstOrDefault();
            var start = Request.Form.GetValues("start").FirstOrDefault();
            var length = Request.Form.GetValues("length").FirstOrDefault();

            //Get Sort columns value           
            var sortColumn = Request.Form.GetValues("columns[" + Request.Form.GetValues("order[0][column]").FirstOrDefault() + "][name]").FirstOrDefault();
            var sortColumnDir = Request.Form.GetValues("order[0][dir]").FirstOrDefault();

            int pageSize = length != null ? Convert.ToInt32(length) : 0;
            int skip = start != null ? Convert.ToInt32(start) : 0;
            int totalRecords = 0;


            var p = db.OrderDeliveries.ToList();



            if (p == null)
                totalRecords = 0;
            else
            {               
                totalRecords = p.Count();
            }
            var OrderDeliveryList = p.Skip(skip).Take(pageSize).ToList(); //
            return Json(new { draw = draw, recordsFiltered = totalRecords, recordsTotal = totalRecords, data = OrderDeliveryList }, JsonRequestBehavior.AllowGet);



        }

        [HttpGet]
        public ActionResult Index(string fromAjax)
        {
            if (fromAjax != null && !string.IsNullOrEmpty(fromAjax))
            {
                ViewBag.IsLayout = "N";
                return PartialView("Index");
            }
            else {
                return View();
            }
        }

        // GET: OrderDeliveries/Details/5
        public ActionResult Details(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            OrderDelivery orderDelivery = db.OrderDeliveries.Find(id);
            if (orderDelivery == null)
            {
                return HttpNotFound();
            }
            return View(orderDelivery);
        }

        // GET: OrderDeliveries/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: OrderDeliveries/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(OrderDelivery orderDelivery)
        {
            orderDelivery.Reference = Guid.NewGuid().ToString();

            if (ModelState.IsValid)
            {
                db.OrderDeliveries.Add(orderDelivery);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(orderDelivery);
        }

        // GET: OrderDeliveries/Edit/5
        public ActionResult Edit(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            OrderDelivery orderDelivery = db.OrderDeliveries.Find(id);
            if (orderDelivery == null)
            {
                return HttpNotFound();
            }
            return View(orderDelivery);
        }

        // POST: OrderDeliveries/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Reference,Name,Description,AdditionalRate,Hours")] OrderDelivery orderDelivery)
        {
            if (ModelState.IsValid)
            {
                db.Entry(orderDelivery).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(orderDelivery);
        }

        // GET: OrderDeliveries/Delete/5
        public ActionResult Delete(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            OrderDelivery orderDelivery = db.OrderDeliveries.Find(id);
            if (orderDelivery == null)
            {
                return HttpNotFound();
            }
            return View(orderDelivery);
        }

        // POST: OrderDeliveries/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(string id)
        {
            OrderDelivery orderDelivery = db.OrderDeliveries.Find(id);
            db.OrderDeliveries.Remove(orderDelivery);
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
