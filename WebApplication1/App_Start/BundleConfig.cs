using System.Web;
using System.Web.Optimization;

namespace WebApplication1
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
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));


            //=====================================================
            bundles.Add(new StyleBundle("~/Resource/Css").Include(
                      "~/Resource/css/font-awesome.min.css",
                      "~/Resource/jquery-ui-1.12.1/jquery-ui.min.css",
                      "~/Resource/css/template-common.css",
                      "~/Resource/css/dropdown-navigation-menu.css",
                      "~/Resource/pagecontent/danhsachbai/index.css",
                      "~/Resource/pagecontent/danhsachbai/index-angular-animate.css",
                      "~/Resource/pagecontent/danhsachbai/danhsachbai.css"));

            bundles.Add(new StyleBundle("~/Resource/Script").Include(
                      "~/Resource/bootstrap.css",
                      "~/Content/site.css"));
        }
    }
}
