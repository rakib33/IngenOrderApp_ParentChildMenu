using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace IngenOrderApp.Models
{
    public class Menu
    {
        public Menu()
        {
            this.Childrens = new List<Menu>();
        }
        [Key]
        public int Id { get; set; }
        public string MenuName { get; set; }
        public string Caption { get; set; }
        public string MenuType { get; set; }
        public string Url { get; set; } 
        public string ControllerName { get; set; }
        public string ActionName { get; set; }
        public string Parameter { get; set; }
        public int? ParentId { get; set; }
        public int OrderIndex { get; set; }
        public string ClassName { get; set; }
        public string SettingsGroup { get; set; }
        public string Icon { get; set; }
        public bool IsActive { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }

        [NotMapped] // attribute used to idicate its not in table
        public List<Menu> Childrens { get; set; }

       
    }
}