using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace IngenOrderApp.Models
{
    public class Order
    {
        [Key]
        public string Reference { get; set; }

        [Required]
        public string OrderNo { get; set; }

        [Required]
        public DateTime OrderDate { get; set; }

        [Required]
        public DateTime Deadline { get; set; }

        public string AccountType { get; set; }        
        public string Instructions { get; set; }
        public string AdditionalInstructions { get; set; }
        public string NotefromCustomer { get; set; }

        [Required]
        public int TotalImages { get; set; }

        [Required]
        public float Rate { get; set; }

        [Required]
        public float? DiscountPercent { get; set; }
        public float? TotalAmount { get; set; }
        public string Currency { get; set; }
  

        public float? AmountInUSD { get; set; }
        public string PaymentStatus { get; set; }
        public string OrderStatus { get; set; }
        public string PreferredFormat { get; set; }
        public string PreferredFileType { get; set; }      
        public string Customer_Reference { get; set; }

        //FK
        [ForeignKey("OrderDelivery")]
        public string Delivery_Reference { get; set; }
        public OrderDelivery OrderDelivery { get; set; }


        [ForeignKey("Product")]
        public string Product_Reference { get; set; }
        public Product Product { get; set; }

                
    }
}