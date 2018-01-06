using System.Web;
using System.Web.Optimization;

namespace IngenOrderApp
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/jquery-1.12.4.js",
                      "~/Scripts/jquery.dataTables.js",
                      //"~/Scripts/jquery.dataTables.min.js",
                      "~/Scripts/dataTables.bootstrap.min.js",
                      "~/Scripts/dataTables.select.min.js",
                      "~/Scripts/moment.js",
                      "~/Scripts/input_validation.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/dataTables.bootstrap.min.css",                      
                      "~/Content/select.dataTables.min.css",
                     // "~/Content/jquery-ui.css",
                      "~/Content/site.css"));

            bundles.Add(new ScriptBundle("~/bundles/angularJS").Include(
                     "~/Scripts/angular.js",
                     "~/Scripts/angular-route.js",
                     //"~/Scripts/angular-datatables.js",
                     "~/Scripts/myAngular-CustomDir.js"
                     // "~/Scripts/myApp/Module.js"
                     ));

            bundles.Add(new ScriptBundle("~/bundles/customJS").Include(
                                 "~/Scripts/myApp/Customer/Module.js",
                                 "~/Scripts/myApp/Customer/Service.js",
                                 "~/Scripts/myApp/Customer/Controller.js"));
        }
    }
}
