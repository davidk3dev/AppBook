//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace WebApplication1.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class tb_templatenoidunghinhanh_format
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public tb_templatenoidunghinhanh_format()
        {
            this.tb_templatenoidung_hinhanh = new HashSet<tb_templatenoidung_hinhanh>();
        }
    
        public int id_format { get; set; }
        public int id_templatenoidunghinhanh { get; set; }
        public string width { get; set; }
        public string height { get; set; }
        public string alignment { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tb_templatenoidung_hinhanh> tb_templatenoidung_hinhanh { get; set; }
    }
}