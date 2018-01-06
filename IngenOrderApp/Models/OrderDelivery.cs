using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace IngenOrderApp.Models
{
    public class OrderDelivery
    {
        [Key]
        public string Reference { get; set; }

        [Required]
        public string Name { get; set; }
        public string Description { get; set; }

        [Required]
        public decimal AdditionalRate { get; set; }

        [Required]
        public int Hours { get; set; }

        public ICollection<Order> Orders { get; set; } 
    }
}