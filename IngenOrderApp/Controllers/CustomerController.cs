using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using IngenOrderApp.Models;
using System.Data.Entity;
using IngenOrderApp.App_Code;


namespace IngenOrderApp.Controllers
{
    public class CustomerController : Controller
    {
        ApplicationDbContext db = new ApplicationDbContext();

        public ActionResult Index()
        {
            
            return View();
        }


        List<Menu> list = new List<Menu>();

        public List<Menu> MenuReturn()
        {
            list.Add(new Menu { Id=1, ControllerName="Rafiq", ActionName="23", Caption="5000", Parameter="Dhaka"  });
            list.Add(new Menu { Id = 1, ControllerName = "Zabbar", ActionName = "23", Caption = "5000", Parameter = "Dhaka" });
            list.Add(new Menu { Id = 1, ControllerName = "Ferdaous", ActionName = "23", Caption = "5000", Parameter = "Dhaka" });
            list.Add(new Menu { Id = 1, ControllerName = "Ajzar", ActionName = "23", Caption = "5000", Parameter = "Dhaka" });
            list.Add(new Menu { Id = 1, ControllerName = "Asraf", ActionName = "23", Caption = "5000", Parameter = "Dhaka" });

            list.Add(new Menu { Id = 1, ControllerName = "Mizan", ActionName = "23", Caption = "5000", Parameter = "Dhaka" });
            list.Add(new Menu { Id = 1, ControllerName = "Fakir", ActionName = "23", Caption = "5000", Parameter = "Dhaka" });
            list.Add(new Menu { Id = 1, ControllerName = "Zahid", ActionName = "23", Caption = "5000", Parameter = "Dhaka" });
            list.Add(new Menu { Id = 1, ControllerName = "Aburba", ActionName = "23", Caption = "5000", Parameter = "Dhaka" });

            list.Add(new Menu { Id = 1, ControllerName = "Minhaz", ActionName = "23", Caption = "5000", Parameter = "Dhaka" });
            list.Add(new Menu { Id = 1, ControllerName = "Raisul", ActionName = "23", Caption = "5000", Parameter = "Dhaka" });
            list.Add(new Menu { Id = 1, ControllerName = "Kabir", ActionName = "23", Caption = "5000", Parameter = "Dhaka" });
            list.Add(new Menu { Id = 1, ControllerName = "Imtiaz", ActionName = "23", Caption = "5000", Parameter = "Dhaka" });

            return list;
        }

       [HttpPost]
        public ActionResult LoadData(string status)  //string InvoiceNo, string FromDate, string ToDate, string phone, string SuplierId, string Option
        {

            // DateTime _FromDate;
            // DateTime _ToDate; 

            var draw = Request.Form.GetValues("draw").FirstOrDefault();
            var start = Request.Form.GetValues("start").FirstOrDefault();
            var length = Request.Form.GetValues("length").FirstOrDefault();

            //Get Sort columns value           
            //var sortColumn = Request.Form.GetValues("columns[" + Request.Form.GetValues("order[0][column]").FirstOrDefault() + "][name]").FirstOrDefault();
            //var sortColumnDir = Request.Form.GetValues("order[0][dir]").FirstOrDefault();

            int pageSize = length != null ? Convert.ToInt32(length) : 0;
            int skip = start != null ? Convert.ToInt32(start) : 0;
            int totalRecords = 0;


            var p = db.Customers.ToList();

           

               if (p == null)
                    totalRecords = 0;
                else
                {                
                   if (status == "Active")
                    {
                        p = p.Where(t => t.Status == "Active").ToList();
                    }
                   else if (status == "Closed")
                   {
                       p = p.Where(t => t.Status == "Closed").ToList();
                   }
                   else
                   { 
                   
                   }
                   
                   
                   totalRecords = p.Count();



                }
                var data = p.Skip(skip).Take(pageSize).ToList(); //
                return Json(new { draw = draw, recordsFiltered = totalRecords, recordsTotal = totalRecords, data = data }, JsonRequestBehavior.AllowGet);
          


        }


       // POST: Customers/Create
       // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
       // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
       [HttpPost]
       [ValidateAntiForgeryToken]
       public ActionResult Create(Customer customer)
       {
           try
           {
               if (ModelState.IsValid)
               {
                   if (customer.Reference != null && !string.IsNullOrEmpty(customer.Reference))
                   {
                       db.Entry(customer).State = EntityState.Modified;
                   }
                   else
                   {
                       customer.Reference = Guid.NewGuid().ToString();
                       db.Customers.Add(customer);
                   }

                   db.SaveChanges();

                   TempData["Tag"] = ConstantMessage.SuccessTag;
                   TempData["Message"] = "Customer " + customer.ContactPerson + " save successful";

               }
               else
               {
                   TempData["Tag"] = ConstantMessage.ErrorTag;
                   TempData["Message"] = "Model Validation Error!!";
               }
           }
           catch (Exception ex)
           {
               TempData["Tag"] = ConstantMessage.ErrorTag;
               TempData["Message"] = ex.Message;
           }

           return RedirectToAction("Index", "Home");

       }

       [HttpGet]
       public ActionResult GetCustomer(string Ref)
       {
           string message = "";
           Customer model = new Customer();
           try
           {
               
               model = db.Customers.Find(Ref);
               message = "ok";

           }
           catch (Exception ex)
           {

               message = ex.Message;
           }

           return Json(new {message,model},JsonRequestBehavior.AllowGet);
       
       }

       [HttpPost]
       [ValidateAntiForgeryToken]
       public ActionResult Delete(string Ref)
       {
           try
           {
               Customer customer = db.Customers.Find(Ref);
               db.Customers.Remove(customer);
               db.SaveChanges();
               TempData["Tag"] = ConstantMessage.SuccessTag;
               TempData["Message"] = "Customer " + customer.ContactPerson + " delete successful";
           }
        
           catch (Exception ex)
           {
               TempData["Tag"] = ConstantMessage.ErrorTag;
               TempData["Message"] = ex.Message;
           }

           return RedirectToAction("Index", "Home");
       
       }
    }
}