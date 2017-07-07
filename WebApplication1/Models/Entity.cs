using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class EnBai
    {
        public int id_bai { get; set; }
        public int id_chuyende { get; set; }
        public DateTime ngay_tao { get; set; }
        public int thu_tu { get; set; }
        public bool bai_mau { get; set; }
        public bool xuat_ban { get; set; }
        public List<EnTemplateNoiDung> ds_templatenoidungdebai { get; set; }
		public List<EnCauHoi> ds_cauhoi { get; set; }
    }

	public class EnCauHoi
	{
		public int id_cauhoi { get; set; }
		public int id_bai { get; set; }
		public string loai_cau_hoi { get; set; }
		public string phuongthuc_check_dapan { get; set; }
		public DateTime? ngay_tao { get; set; }
		public bool xuat_ban { get; set; }
		public int thu_tu { get; set; }
		public string gia_tri_dung { get; set; }
		public List<EnDapAn> ds_dapan { get; set; }
        public List<EnTemplateNoiDung> ds_templatenoidungcauhoi { get; set; }
    }
	public class EnDapAn
	{
		public int id_dapan { get; set; }
		public int id_cauhoi { get; set; }
		public string loai_dap_an { get; set; }
        public EnDapAnSingleChoice ds_dapan_singlechoice { get; set; }
        public EnDapAnSapXep ds_dapan_sapxep { get; set; }
        public EnDapAnDienText ds_dapan_dientext { get; set; }
        public EnDapAnDanhDau ds_dapan_danhdau { get; set; }
    }
	public class EnDapAnSingleChoice
	{
		public string noi_dung { get; set; }
		public bool dap_an_dung { get; set; }
	}
	public class EnDapAnSapXep
	{
		public string gia_tri { get; set; }
		public string noidung_hienthi { get; set; }
		public int? vi_tri_dung { get; set; }
	}
	public class EnDapAnDienText
	{
		public string gia_tri_dung { get; set; }
		public string help_text { get; set; }
	}
	public class EnDapAnDanhDau
	{
		public int? vi_tri_dung { get; set; }
	}
	public class EnTemplateNoiDung
	{
		public int id_template { get; set; }
		public string loai_template { get; set; }
		public EnTemplateNoiDungText template_noidung_text { get; set; }
		public EnTemplateNoiDungHinhAnh template_noidung_hinhanh { get; set; }
	}
	public class EnTemplateNoiDungText
    {
        public string noi_dung { get; set; }
		public string ckeditor_format { get; set; }
        public string template_width { get; set; }
        public string template_height { get; set; }
        public string template_aligment { get; set; }
    }
	public class EnTemplateNoiDungHinhAnh
    {
		public string url { get; set; }
		public string template_width { get; set; }
		public string template_height { get; set; }
		public string template_aligment { get; set; }
	}
    public class LoaiTemplateNoidungDeBai
    {
		public static string TEXT { get { return "TEXT"; } }
		public static string BAI_NGHE { get { return "BAI_NGHE"; } }
        public static string HINH_ANH { get { return "HINH_ANH"; } }
    }
	public class LoaiCauHoi {
		public static string SINGLE_CHOICE = "SINGLE_CHOICE";
		public static string SAP_XEP = "SAP_XEP";
		public static string VI_TRI = "VI_TRI";
		public static string DIEN_TEXT = "DIEN_TEXT";
	}
	public class PhuongThucCheckDapAn
	{
		public static string VI_TRI = "VI_TRI";
		public static string GIATRI_TEXT = "GIATRI_TEXT";
		public static string GIATRI_TOAN = "GIATRI_TOAN";
	}
}