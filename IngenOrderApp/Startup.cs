using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(IngenOrderApp.Startup))]
namespace IngenOrderApp
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
