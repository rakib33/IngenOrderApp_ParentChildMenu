using Microsoft.AspNet.Identity.EntityFramework;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace IngenOrderApp.Models
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit http://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class ApplicationUser : IdentityUser
    {
    }

    public class ApplicationRole : IdentityRole
    {
        [StringLength(100)]
        public string Description { get; set; }

    }

    
    public class ApplicationDbContext :DbContext
        //IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext()
            : base("DefaultConnection")
        {
        }


        public IDbSet<Menu> Menus { get; set; } 
        public IDbSet<Order> Orders { get; set; } 
        public IDbSet<Product> Products { get;set; }
        public IDbSet<OrderDelivery> OrderDeliveries { get; set; }
        public IDbSet<Customer> Customers { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();


            modelBuilder.Entity<Customer>().HasKey(t => t.Reference).ToTable("Customer");
            modelBuilder.Entity<Product>().HasKey(t => t.Reference).ToTable("Product");
            modelBuilder.Entity<OrderDelivery>().HasKey(t => t.Reference).ToTable("OrderDelivery");
            modelBuilder.Entity<Order>().HasKey(t => t.Reference).ToTable("Order");

            modelBuilder.Entity<Menu>().HasKey(t => t.Id).ToTable("Menu");

            base.OnModelCreating(modelBuilder);

            //For Identity version 1
            //modelBuilder.Entity<ApplicationUser>().ToTable("User");
            //modelBuilder.Entity<IdentityUser>().ToTable("User");

            //modelBuilder.Entity<ApplicationRole>().ToTable("Role");
            //modelBuilder.Entity<IdentityRole>().ToTable("Role");

            //modelBuilder.Entity<IdentityUserRole>().ToTable("UserRole");
            //modelBuilder.Entity<IdentityUserLogin>().ToTable("UserLogin");
            //modelBuilder.Entity<IdentityUserClaim>().ToTable("UserClaim");

        }
        
         
    }
}