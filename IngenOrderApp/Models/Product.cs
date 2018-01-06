using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace IngenOrderApp.Models
{
    public class Product
    {

        [Key]
        public string Reference { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        [Required]
        public decimal Rate { get; set; }     
        public string Status { get; set; }

        [Display(Name = "Service Category")]
        public string ServiceCategory { get; set; }

        public ICollection<Order> Orders { get; set; }
    }
}