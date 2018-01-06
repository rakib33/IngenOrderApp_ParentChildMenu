using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using IngenOrderApp.Models;

using IngenOrderApp.App_Code;

namespace IngenOrderApp.Controllers
{
    public class HomeController : Controller
    {
        ApplicationDbContext db = new ApplicationDbContext();
        List<Menu> MenuList = new List<Menu>();
        public ActionResult Index(string fromAjax)
        {
            TempData["Tag"] = ConstantMessage.InfoTag;
            TempData["Message"] = "Welcome to Product List Form";

            ViewBag.IsMenu = "";
            if (fromAjax != null && !string.IsNullOrEmpty(fromAjax))
            {
            

                return PartialView("Index");
            }
            else
            {
                try
                {
                    MenuList = GetLayers();
                   
                }catch(Exception ex)
                {
                    string ms = ex.Message;
                }

                ViewBag.Menu = MenuList;

                return View();
            }
        }

        #region Parent-Child Recursive Menu
        public List<Menu> GetLayers()
        {
            //call it with parentId=0 initially, to get parentless nodes
            return GetChildren(db.Menus.ToList(), null);
        }

        private List<Menu> GetChildren(IList<Menu> source, int? parentId)
        {
            var children = source.Where(x => x.ParentId == parentId).ToList();
            //GetChildren is called recursively again for every child found
            //and this process repeats until no childs are found for given node, 
            //in which case an empty list is returned
            children.ForEach(x => x.Childrens = GetChildren(source, x.Id));
            return children;
        }

        #endregion



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


            var p = db.Customers.OrderByDescending(t=>t.LastOrdered).ToList();

           

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

    }
}