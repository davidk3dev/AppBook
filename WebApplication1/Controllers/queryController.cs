using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class queryController : ApiController
	{
		[HttpGet]
		public HttpResponseMessage GetBaiAll()
		{
			using (var db = new appbookEntities2())
			{
				var query = db.tb_bai.Select(b => b).ToList();
				return CreateResponse(query);
			}
		}
        [HttpGet]
        public HttpResponseMessage GetBaiByChuyenDe(string id_chuyende)
        {
            var id = -1;
            if (!int.TryParse(id_chuyende, out id))
            {
                var response = Request.CreateResponse(HttpStatusCode.BadRequest);
                response.Content = new StringContent("Invalid idChuyende", Encoding.UTF8, "application/json");
                return response;
            }
            using (var db = new appbookEntities2())
            {
                var query = db.tb_bai.Where(b => b.id_chuyende == id).Select(b => new EnBai
                {
                    id_bai = b.id_bai,
                    id_chuyende = b.id_chuyende,
                    thu_tu = b.thu_tu,
                    xuat_ban = b.xuat_ban,
                    ngay_tao = b.ngay_tao,
                    bai_mau = b.bai_mau,
                    ds_templatenoidungdebai = b.tb_templatenoidung.Select(t => new EnTemplateNoiDung
                    {
                        id_template = t.id_templatenoidung,
                        loai_template = t.loai_template,
                        template_noidung_text = new EnTemplateNoiDungText
                        {
                            noi_dung = t.tb_templatenoidung_text.noidung,
                        },
                        template_noidung_hinhanh = new EnTemplateNoiDungHinhAnh
                        {
                            url = t.tb_templatenoidung_hinhanh.url
                        }
                    }).ToList(),
                    ds_cauhoi = b.tb_cauhoi.Select(h => new EnCauHoi
                    {
                        id_cauhoi = h.id_cauhoi,
                        id_bai = h.id_bai,
                        loai_cau_hoi = h.loai_cau_hoi,
                        phuongthuc_check_dapan = h.phuong_thuc_check_dap_an,
                        ngay_tao = h.ngay_tao,
                        xuat_ban = h.xuat_ban,
                        thu_tu = h.thu_tu,
                        gia_tri_dung = h.gia_tri_dung,
                        ds_dapan = h.tb_dapan.Select(a => new EnDapAn {
                            id_dapan = a.id_dapan,
                            id_cauhoi = a.id_cauhoi,
                            loai_dap_an = a.loai_dap_an,
                            ds_dapan_singlechoice = new EnDapAnSingleChoice
                            {
                                noi_dung = a.tb_dapan_singlechoice.noidung,
                                dap_an_dung = a.tb_dapan_singlechoice.dapan_dung
                            },
                            ds_dapan_danhdau = new EnDapAnDanhDau
                            {
                                vi_tri_dung = a.tb_dapan_danhdau.vitri_dung
                            },
                            ds_dapan_dientext = new EnDapAnDienText
                            {
                                gia_tri_dung = a.tb_dapan_dientext.giatri_dung,
                                help_text = a.tb_dapan_dientext.help_text
                            },
                            ds_dapan_sapxep = new EnDapAnSapXep
                            {
                                gia_tri = a.tb_dapan_sapxep.giatri,
                                noidung_hienthi = a.tb_dapan_sapxep.noidung_hienthi,
                                vi_tri_dung = a.tb_dapan_sapxep.vitri_dung
                            }
                        }).ToList()
                    }).ToList()
                });
                return CreateResponse(query);
            }
        }
        
		//POST: api/query/insertbai
        [HttpPost]
		public HttpResponseMessage InsertBai([FromBody] EnBai bai)
        {


            //return CreateResponse(bai);
            var objInsert = new tb_bai
            {
                id_chuyende = bai.id_chuyende,
                ngay_tao = bai.ngay_tao,
                bai_mau = bai.bai_mau,
                thu_tu = bai.thu_tu,
                xuat_ban = bai.xuat_ban,
                tb_templatenoidung = bai.ds_templatenoidungdebai.Select(b =>
                {
                    if (b.loai_template == LoaiTemplateNoidungDeBai.TEXT)
                    {
                        return new tb_templatenoidung
                        {
                            loai_template = LoaiTemplateNoidungDeBai.TEXT,
                            tb_templatenoidung_text = new tb_templatenoidung_text
                            {
                                noidung = b.template_noidung_text.noi_dung
                            }
                        };
                    }
                    else if (b.loai_template == LoaiTemplateNoidungDeBai.HINH_ANH)
                    {
                        return new tb_templatenoidung
                        {
                            loai_template = LoaiTemplateNoidungDeBai.HINH_ANH,
                            tb_templatenoidung_hinhanh = new tb_templatenoidung_hinhanh
                            {
                                url = b.template_noidung_hinhanh.url
                            }
                        };
                    }
                    return new tb_templatenoidung { };
                }).ToList(),
                tb_cauhoi = bai.ds_cauhoi.Select(h => new tb_cauhoi
                {
                    loai_cau_hoi = h.loai_cau_hoi,
                    ngay_tao = h.ngay_tao,
                    phuong_thuc_check_dap_an = h.phuongthuc_check_dapan,
                    thu_tu = h.thu_tu,
                    xuat_ban = h.xuat_ban,
                    gia_tri_dung = h.gia_tri_dung,
                    tb_templatenoidung = h.ds_templatenoidungcauhoi.Select(t => {
                        if (t.loai_template == LoaiTemplateNoidungDeBai.TEXT)
                        {
                            return new tb_templatenoidung
                            {
                                loai_template = LoaiTemplateNoidungDeBai.TEXT,
                                tb_templatenoidung_text = new tb_templatenoidung_text
                                {
                                    noidung = t.template_noidung_text.noi_dung
                                }
                            };
                        }
                        else if (t.loai_template == LoaiTemplateNoidungDeBai.HINH_ANH)
                        {
                            return new tb_templatenoidung
                            {
                                loai_template = LoaiTemplateNoidungDeBai.HINH_ANH,
                                tb_templatenoidung_hinhanh = new tb_templatenoidung_hinhanh
                                {
                                    url = t.template_noidung_hinhanh.url
                                }
                            };
                        }
                        return new tb_templatenoidung { };
                    }).ToList()
                }).ToList()
            };

            try
            {
				tb_bai rs = null; 
                using (var db = new appbookEntities2())
                {
                    rs = db.tb_bai.Add(objInsert);
                    db.SaveChanges();
                }
                return CreateResponse(rs);
            }
            catch (Exception ex)
            {
                return CreateResponse(new { error = ex.Message });
            }
            
        }
        private System.Collections.Specialized.NameValueCollection GetRequestParams(HttpRequestMessage request)
        {
            var data = request.Content.ReadAsFormDataAsync().Result;
            return data;
        }
		private HttpResponseMessage CreateResponse(object content)
		{
			var result = JsonConvert.SerializeObject(content, Formatting.Indented, new JsonSerializerSettings
			{
				ReferenceLoopHandling = ReferenceLoopHandling.Ignore
			});
			var response = Request.CreateResponse(HttpStatusCode.OK);
			response.Content = new StringContent(result, Encoding.UTF8, "application/json");
			return response;
		}
    }
}
