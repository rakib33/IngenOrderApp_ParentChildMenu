using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace IngenOrderApp.Models
{
    public class Customer
    {

    [Key]
    public string Reference { get; set; } 
	public string Code { get; set; }


    [Display(Name = "Contact Person")]
	public string ContactPerson { get; set; } 
	public string Company { get; set; }

    [Display(Name = "Country Code")]
	public string CountryCode { get; set; } 
	public string Country { get; set; }

    [Display(Name = "Contact Number")]
	public string ContactNumber { get; set; } 

    [Required]
    [EmailAddress(ErrorMessage = "Invalid Email Address")]
	public string Email { get; set; } 
	public string Website { get; set; } 
	public string Status { get; set; }

    [DisplayFormat(DataFormatString = "{0:dd MMM yyyy}")]
    [Display(Name = "Last Ordered")]
	public DateTime?  LastOrdered { get; set; }

    [Display(Name = "Account Type")]
	public string AccountType { get; set; }

    [Display(Name = "Payment Type")]
	public string PaymentType { get; set; } 
	public string Currency { get; set; }

    [Display(Name = "Account Catagory")]
	public string AccountCatagory { get; set; }
        
	public string Industry { get; set; }

    [Display(Name = "Editing Notes")]
	public string EditingNotes { get; set; }

    [Display(Name = "Additional Instructions")]
	public string AdditionalInstructions { get; set; }

    [Display(Name = "Preferred File Type")]
	public string PreferredFileType { get; set; }

    [Display(Name = "Discount Rate")]
	public decimal?  DiscountRate { get; set; } 
    }
}