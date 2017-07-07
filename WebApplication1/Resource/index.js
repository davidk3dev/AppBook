/**
 * Created by Nhan on 12/27/2016.
 */
//
    // TODO: chuc nang "Dap An Dung"
    // TODO: chuc nang "Xoa cau hoi"
    // TODO: chuc nang "Xoa bai"
    // TODO: Them noi dung thi append vao container thay vi insertBefore last item
    // TODO: Chi cho phep expand 1 bai cung mot thoi diem
    // TODO: chuc nang "Luu/Sua"
    //  - foreach de lay het itemnoidung thay vi chi lay item dau tien
    //  - validate noi dung truoc khi luu
    //
    // TODO: chuc nang "CLONE BAI" - Clone phan cau hoi

    // -Public/unpublic (status màu số bài )
    // -Thêm control chưa các Privew của Highlight ( ở cuối mỗi câu hỏi - của câu hỏ nào thì lưu vào câu hỏi đấy )
    // ( Cấu hình lấy latex chèn vào nội dung )
    // - Answer : 6 ô
    // -Note/ Highlight


var doiTuongMenuNoiDung;
var doituongmenu = {};
var bai;
var cur_nutshowmenu;
var cur_containershowmenu;
var baiCount = 1;
var cauhoiCount = 1;
var baidangchon;
var chuyende_id = location.search.split('chuyende_id=')[1];
var soluongbai = 1;
var baiDaLuu = false; // Truoc khi tao bai moi phai luu bai dang edit



//------------DEFINE CLASS, ENUM--------------
function Bai() {
    this.tieu_de = '';
    this.noi_dung_de_bai = {};
    this.danh_sach_cau_hoi = {};
    this.xuat_ban = false;
    this.noi_tham_chieu = '';
}

function CauHoi_SingleChoice(){
    this.tieu_de = '';
    this.xuat_ban = false;
    this.loai_cau_hoi = '';
    this.noi_dung_cau_hoi = {};
    this.danh_sach_dap_an = {};
    this.giaithich_loigiai = {};
}
function CauHoi_ViTri(){
    this.tieu_de = '';
    this.xuat_ban = false;
    this.loai_cau_hoi = '';
    this.phuong_thuc_check_dap_an = '';
    this.gia_tri_dung = '';
    this.noi_dung_cau_hoi = {};
    this.danh_sach_dap_an = {};
    this.giaithich_loigiai = {};
}
function CauHoi_SapXep(){
    this.tieu_de = '';
    this.xuat_ban = false;
    this.loai_cau_hoi = '';
    this.phuong_thuc_check_dapan = '';
    this.gia_tri_dung = {};
    this.noi_dung_cau_hoi = {};
    this.danh_sach_dap_an = {};
    this.giaithich_loigiai = {};
}
function CauHoi_DienText(){
    this.tieu_de = '';
    this.xuat_ban = false;
    this.loai_cau_hoi = '';
    this.noi_dung_cau_hoi = {};
    this.danh_sach_dap_an = {};
    this.giaithich_loigiai = {};
}
function DapAn_SingleChoice() {
    this.noi_dung_hien_thi = '';
    this.audio = false;
    this.translate = false;
    this.dap_an_dung = false;
}
function DapAn_DienText() {
    this.help_text = '';
    this.gia_tri_dung = '';
    this.phuong_thuc_check_dap_an = '';
}
function DapAn_SapXep() {
    this.noi_dung_hien_thi = '';
}
function DapAn_ViTri() {
    this.noi_dung_hien_thi = '';
    this.vi_tri_dung = '';
}
function TempateNoidung() {
    this.translate = false;
    this.loai_noi_dung = '';
    this.noi_dung_hien_thi = '';
}
var modeThemBaiMoi = {
    CREATE_NEW: 'CREATE_NEW',
    CLONE_TEMPLATE : 'CLONE',
    CREATE_WITH_DATA: 'CREATE_WITH_DATA'
};
var loainoidung = {
    TIEU_DE : 'TIEU_DE',
    DOAN_VAN : 'DOAN_VAN',
    HINH_ANH : 'HINH_ANH'
};
var phuongthuccheckdapan = {
    VI_TRI : 'VI_TRI',
    GIATRI_TEXT : 'GIATRI_TEXT',
    GIATRI_TOAN : 'GIATRI_TOAN'
};
var loaicauhoi = {
    SINGLE_CHOICE : 'SINGLE_CHOICE',
    ANIMATION_SAPXEP : 'ANIMATION_SAPXEP',
    ANIMATION_DANHDAU : 'ANIMATION_DANHDAU',
    DIEN_TEXT : 'DIEN_TEXT'
};


//------------DEFINE WIDGET-------------------
$.widget('appbook.taoTemplateNoidung', {
    _noidung:'',
    options:{
        type:'',
        data:null
    },
    _create:function () {
        var self = this;
        var element_template;
        switch (this.options.type){
            case loainoidung.TIEU_DE:
                element_template = jq3($('template#item-noidung').prop('content')).find(".item-noidung.tieude").html();
                self.element.addClass("item-noidung tieude");
                break;
            case loainoidung.DOAN_VAN:
                element_template = jq3($('template#item-noidung').prop('content')).find(".item-noidung.doanvan").html();
                self.element.addClass("item-noidung doanvan");
                break;
            case loainoidung.HINH_ANH:
                element_template = jq3($('template#item-noidung').prop('content')).find(".item-noidung.hinhanh").html();
                self.element.addClass("item-noidung hinhanh");
                break;
            case 'BAI_NGHE':
            case 'NGUON_TAI_LIEU':
            case 'HOC_TU_VUNG':
                break;
        }
        this.element.html(element_template);
        this.txtNoidung = this.element.find("div[contenteditable=true]").first();

        this._noidung = this.txtNoidung.html();
        this.txtNoidung.ckeditor();

        if(this.options.data){
            this.txtNoidung.val(this.options.data.noidung);
            this.txtNoidung.ckeditor().editor.setData( this.options.data.noidung, function()
            {
                //self.txtNoidung.ckeditor().editor.execCommand( 'ex_highlight' );
                //self.txtNoidung.ckeditor().editor.widgets.initOnAll();
                //this.checkDirty();  // true
                self._trigger('khoitaonoidung_hoanthanh');
            });
        }
        // this.txtNoidung.on('blur input', function() {
        //     if (content != $(this).html()) {
        //         self._noidung = $(this).html();
        //         content = $(this).html();
        //     }
        // });

        this.element.find("span.btnClose").on('click', function () {
            self.element.fadeOut(200, function () {
                $( this ).remove();
            });
        });
    },
    getNoidung:function () {
        var _editorContent = this.txtNoidung.html();
        var _editorContent2 = this.txtNoidung.ckeditor().editor.getData();



        var nd = new TempateNoidung();
        nd.loai_noi_dung = this.options.type;
        nd.noi_dung_hien_thi = _editorContent2;
        nd.translate = false;
        return nd;
    }
});
$.widget("editor.noidungdebai_tieude",{
    _create: function () {
        var self = this;
        var e = $($('template#item-noidung').prop('content'))
            .find(".item-noidung.tieude").html();

        this.element.addClass("item-noidung tieude").html(e);

        //CKEDITOR.inline( this.element.find("div[contenteditable=true]").get(0) );
        this.element.find("div[contenteditable=true]").ckeditor();
        this.btnClose = this.element.find("span.btnClose");
        this.btnClose.on('click', function () {
            self.element.fadeOut(200, function () {
                $( this ).remove();
            });
        });
    }
});
$.widget("editor.noidungdebai_doanvan",{

    _create: function () {
        var self = this;
        var e = $($('template#item-noidung').prop('content'))
            .find(".item-noidung.doanvan").html();
        this.element.addClass("item-noidung doanvan").html(e);
        CKEDITOR.inline( this.element.find("div[contenteditable=true]").get(0));
        this.btnClose = this.element.find("span.btnClose");
        this.btnClose.on('click', function () {
            self.element.fadeOut(200, function () {
                $( this ).remove();
            });
        });
    }
});
$.widget("editor.noidungdebai_hinhanh",{
    _create: function () {
        var self = this;
        var e = $($('template#item-noidung').prop('content'))
            .find(".item-noidung.hinhanh").html();
        this.element.addClass("item-noidung hinhanh").html(e);
        this.btnClose = this.element.find("span.btnClose");
        this.btnClose.on('click', function () {
            self.element.fadeOut(200, function () {
                $( this ).remove();
            });
        });
    }
});

$.widget("editor.bai", {
    _phannoidungdebai_done:false,
    _phandanhsachcauhoi_done:false,
    options: {
        isInsertedToDatabase: false,
        saved:null,
        path: '',
        soluongbai:1,
    },
    _create: function(){
        var self = this;
        this.isEditing = true;
        this.isSaved;

        var eTitle = jq3($("template#template-box-bai").prop('content')).find(".box-title.bai");
        var eContent = jq3($("template#template-box-bai").prop('content')).find(".box-content");
        var eDialog = jq3($("template#template-box-bai").prop('content')).find(".box-dialog");

        if (this.options.soluongbai < 1) this.options.soluongbai = 1;
        eTitle.find('.box-title-icon').text(this.options.soluongbai);
        eTitle.find('.box-title-text').text("Bài #" + (this.options.soluongbai));

        bai = this;

        //this.cauhoiCount = 1;

        this.element.append(eTitle.clone(), eContent.clone(), eDialog.clone());
        this.title = this.element.find('.box-title.bai .box-title-text').first();
        this.phanDeBai_ckbDich = this.element.find('.phannoidungbai input[name="btnDich"]').first();
        this.btnCollapse = this.element.find(".btn-collapse");
        this.btnThemNoiDungDeBai = this.element.find(".button-add-item.themnoidungdebai");
        this.btnThemCauHoi_SingleChoice = this.element.find(".button-add-item.themcauhoi");
        this.btnThemCauHoiDanhDau = this.element.find('.button-add-item.themcauhoi-danhdau');
        this.btnThemCauHoiDienText = this.element.find('.button-add-item.themcauhoi-dientext');
        this.btnThemCauHoi_SapXep = this.element.find('.button-add-item.themcauhoi-sapxep');
        this.phanNoiDungDeBai = this.element.find(".phannoidungbai");
        this.phanDanhSachCauHoi = this.element.find(".phandanhsachcauhoi");
        this.dropdownDanhSachChuyenDe = this.element.find(".box-title-action-dropdown-list.outsite.list-chuyende");
        this.btnLuu = this.element.find(".box-title-action-button.button-outside.btn-luu");
        this.btnEdit = this.element.find(".box-title-action-button.button-outside.btn-edit");
        var currentHeight = this.element.height();
        this.noidung = {};

        //Show hide element
        if(this.options.mode && this.options.mode === "edit"){
            this.btnLuu.show();
            this.btnEdit.hide();
            //this.btnEdit.
        }
        else if(this.options.mode && this.options.mode === "display"){
            this.btnLuu.hide();
            this.btnEdit.show();
        }

        //Register event for button Edit
        this.btnEdit.children('a').attr('href', '#editor/' + this.options.id);

        //this._createDialog();
        this.element.on('click', function () {
            baidangchon = self.element;
        });
        this._on(this.isSaved, {
            change: '_onSaveStateChanged'// Note: function name must be passed as a string!
        });
        this.btnEdit.click(function () {

        });
        this.element.find(".box-title-action-button.btn-xemthu").on('click', function () {
            //self._saveContent2();
            return;

            var noidungtieude = [];
            var cauhois = [];
            $.each(self.element.find(".phandanhsachcauhoi").find(".box.cauhoi"), function (index, eleCauhoi) {
                var cauhoi = {};
                cauhoi.title = $(eleCauhoi).find(".box-title-text").text();
                cauhoi.noidung = [];
                cauhoi.dapan = [];
                //cauhoi.chuthich = [];
                $.each($(eleCauhoi).find(".box-content-section.noidungcauhoi").find(".item-noidung"),function (indx, eNoidungcauhoi) {
                    cauhoi.noidung.push($(eNoidungcauhoi).children("div[contenteditable='true']").html());
                    //cauhoi.noidung.push($(eNoidungcauhoi).children("div[contenteditable='true']"));
                });
                $.each($(eleCauhoi).find(".box-content-section.phancautraloi").find(".item-noidung"),function (indx, eDapan) {
                    //cauhoi.dapan.push($(eDapan).children(".item-noidung-content").children("textarea").text());
                    cauhoi.dapan.push($(eDapan).children(".item-noidung-content").children("textarea").val());
                });
                cauhois.push(cauhoi);
            });

            $.each( self.phanNoiDungDeBai.find(".item-noidung"), function( key, value ) {
                noidungtieude.push($(value).children("div[contenteditable='true']").html());
            });
            self.noidung.TIEU_DE = noidungtieude;
            self.noidung.cauhoi = cauhois;
            openWindowWithPostRequest(JSON.stringify(self.noidung));
        });
        this.element.find(".box-title-action-button.btn-clone").on('click', function () {
            self._cloneContent();
        });
        this.element.find(".box-title-action-button.btnMoreActions").on('click', function () {
            $(this).find('.more-actions-menu').toggleClass('show');
        });
        this.element.find(".box-title-action-button.btnMoreActions .item-delete").on('click', function () {
            //self.element.find("#dialog-confirm").dialog( "open" );
            //console.log(self.element.find("#dialog-confirm"));
            self._deleteBai();

        });
        this.btnCollapse.on('click', function () {
            self.element.toggleClass("collapse");
            // self.element.animate({
            //     height: "37px",
            //     overflow: "hidden"
            // }, 500, function() {
            //     self.element.css({"overflow": "hidden"})
            // });
        });
        this.btnThemNoiDungDeBai.on('click', function () {
            cur_containershowmenu = self.phanNoiDungDeBai;
            cur_nutshowmenu = self.btnThemNoiDungDeBai;

            if(self.phanNoiDungDeBai.find(GetDoiTuongMenuNoiDung(self.btnThemNoiDungDeBai)).length > 0){
                self.phanNoiDungDeBai.find(GetDoiTuongMenuNoiDung(self.btnThemNoiDungDeBai)).remove();
            }
            else{
                GetDoiTuongMenuNoiDung(self.btnThemNoiDungDeBai)
                    .css({ "bottom":"-190px" })
                    .insertAfter(self.btnThemNoiDungDeBai);
            }

        });
        this.btnThemCauHoi_SingleChoice.on('click', function () {
            self._themcauhoi_singlechoice();
        });
        this.btnThemCauHoiDanhDau.click(function () {
            self._themcauhoi_danhdau();
        });
        this.btnThemCauHoiDienText.click(function () {
            self._themcauhoi_dientext();
        });
        this.btnThemCauHoi_SapXep.click(function () {
            self._themcauhoi_sapxep();
        });

    },
    _themcauhoi_singlechoice:function () {
        var self = this;
        //ThemCauHoi(self.element.find(".phandanhsachcauhoi"), cauhoiCount);
        //self.cauhoiCount++;

        $('.box.cauhoi:last').addClass("collapse");
        $("<div></div>", {class:"box cauhoi"}).taocauhoi({
            stt:cauhoiCount,
            loaicauhoi:loaicauhoi.SINGLE_CHOICE
        }).hide().appendTo(self.phanDanhSachCauHoi).show(500);

        cauhoiCount++;


        self.element.find(".phandanhsachcauhoi").sortable({
            items:'.box.cauhoi',
            handle:'.box-title.cauhoi',
            revert:true,
            stop:function(){
                sapxeplaisothutucauhoi();
            }
        });
        createSwitchButton();
    },
    _themcauhoi_danhdau:function () {
        $("<div></div>", {class:"box cauhoi danhdau"}).taocauhoi({
            stt:cauhoiCount++,
            loaicauhoi:loaicauhoi.ANIMATION_DANHDAU
        }).hide().appendTo(this.element.find(".phandanhsachcauhoi")).show(500);
        createSwitchButton();
    },
    _themcauhoi_dientext:function () {
        $("<div></div>", {class:"box cauhoi dientext"}).taocauhoi({
            stt:cauhoiCount++,
            loaicauhoi:loaicauhoi.DIEN_TEXT
        }).hide().appendTo(this.element.find(".phandanhsachcauhoi")).show(500);
        createSwitchButton();
    },
    _themcauhoi_sapxep:function () {
        $("<div></div>", {class:"box cauhoi sapxep"}).taocauhoi({
            stt:cauhoiCount++,
            loaicauhoi:loaicauhoi.ANIMATION_SAPXEP
        }).hide().appendTo(this.element.find(".phandanhsachcauhoi")).show(500);
        createSwitchButton();
    },
    _deleteBai: function () {
        var self = this;
        if (this.options.isInsertedToDatabase === true) {
            delete_item(this.options.path, function () {
                self.element.fadeOut(200, function () {
                    soluongbai--;
                    baiCount--;

                    console.log('delete bai tu tb_bai thanh cong');

                    var objUpdate = {};
                    objUpdate[getQueryParams(location.search).path + '/so_luong_bai'] = soluongbai;
                    update_item(objUpdate, function () {
                        console.log('update so luong bai thanh cong');
                        $(this).remove();
                        sapxeplaisothutubai();
                    });
                });
            });
        } else {
            self.element.fadeOut(200, function () {
                soluongbai--;
                $(this).remove();
                sapxeplaisothutubai();
            });
        }
    },
    _createDialog:function () {
        this.element.find("#dialog-confirm").dialog({
            autoOpen: false,
            resizable: false,
            height: "auto",
            width: 400,
            modal: true,
            buttons: {
                "Delete all items": function() {
                    $( this ).dialog( "close" );
                },
                Cancel: function() {
                    $( this ).dialog( "close" );
                }
            }
        });
    },
    _onSaveStateChanged:function(){
        //console.log(this.element.find('.box-title.bai .box-title-icon'));
        console.log("text");
    },
    _saveContent2: function () {
        var self = this;
        if (this.isEditing == true) {
            var noidungbai = new Bai();
            noidungbai = this._collectData();

            var pathThamchieu = getUrlParameter('path');
            noidungbai.noi_tham_chieu = pathThamchieu;

            //self.switchToPreview(noidungbai); return;

            if(self.options.isInsertedToDatabase === false){
                bai_insert(pathThamchieu, {
                    so_luong_bai: soluongbai + 1
                }, noidungbai, function (newid) {
                    self.options.path = 'tb_bai/' + newid;

                    self.isEditing = false;
                    self.options.isSaved = true;
                    self.options.isInsertedToDatabase = true;
                    self.switchToPreview(noidungbai);
                    soluongbai++;
                });
            }
            else{
                bai_update(self.options.path, noidungbai, function () {
                    self.isEditing = false;
                    self.options.isSaved = true;
                    self.switchToPreview(noidungbai);
                });
            }
        }
        else {
            this.element.find('.box-content-saved').hide();
            this.element.find('.box-content-editing').show();
            if(this.options.showDanhSachChuyenDe){
                this.dropdownDanhSachChuyenDe.show();
            }
            this.element.find('.box-title-action-button.btn-xemthu').text('Lưu');
            this.element.find('.box-title.bai .box-title-icon').css({'background-color':'#ff0000'});
            this.isEditing = true;
            this.options.isSaved = false;
        }
    },
    _collectData: function(){
        var self = this;
        var _noidung = new Bai();
        _noidung.tieu_de = this.title.html();
        this.phanNoiDungDeBai.find(".item-noidung").each(function (index, objNoidungtieude) {
            var nd = $(objNoidungtieude).taoTemplateNoidung('getNoidung');
            nd.translate = self.phanDeBai_ckbDich.prop('checked');
            _noidung.noi_dung_de_bai[index] = nd;
        });
        this.phanDanhSachCauHoi.find('.box.cauhoi').each(function (index, item) {
            var nd = $(item).taocauhoi('getNoidung');
            if(nd.xuat_ban === true){
                _noidung.xuat_ban = true;
            }
            _noidung.danh_sach_cau_hoi[index] = nd;
        });
        return _noidung;
    },
    _cloneContent: function () {
        var obj = {
            //danhsach_noidungdebai = [],
            //danhsach_cauhoi:[]
        };
        var ds_noisdungdebai = [];
        var ds_cauhoi = [];

        //copy phan noi dung de bai
        this.element.find('.phannoidungbai .item-noidung').each(function () {
            var itemnoidungdebai = {};
            if($(this).hasClass('tieude')){
                itemnoidungdebai.type = 'TIEU_DE';
                itemnoidungdebai.content = '';
            }
            if($(this).hasClass('doanvan')){
                itemnoidungdebai.type = 'DOAN_VAN';
                itemnoidungdebai.content = '';
            }
            if($(this).hasClass('bainghe')){
                itemnoidungdebai.type = 'bainghe';
                itemnoidungdebai.content = '';
            }
            ds_noisdungdebai.push(itemnoidungdebai);
        });
        obj.danhsach_noidungdebai = ds_noisdungdebai;

        //copy phan danh sach cau hoi
        this.element.find('.phandanhsachcauhoi .box.cauhoi').each(function () {
            var ds_noidungcauhoi = [];
            var ds_cautraloi = [];
            var ds_noidungchuthich = [];

            $(this).find('.box-content-section.noidungcauhoi .item-noidung').each(function () {
                var itemnoidungcauhoi = {};
                if($(this).hasClass('tieude')){
                    itemnoidungcauhoi.type = 'TIEU_DE';
                    itemnoidungcauhoi.content = '';
                }
                if($(this).hasClass('doanvan')){
                    itemnoidungcauhoi.type = 'DOAN_VAN';
                    itemnoidungcauhoi.content = '';
                }
                if($(this).hasClass('bainghe')){
                    itemnoidungcauhoi.type = 'bainghe';
                    itemnoidungcauhoi.content = '';
                }
                ds_noidungcauhoi.push(itemnoidungcauhoi);
            });
            $(this).find('.box-content-section.phancautraloi .item-noidung.dapan').each(function (i) {
                ds_cautraloi.push({stt:i});
            });
            $(this).find('.box-content-section.phanchuthich .item-noidung').each(function () {
                var itemnoidungchuthich = {};
                if($(this).hasClass('tieude')){
                    itemnoidungchuthich.type = 'TIEU_DE';
                    itemnoidungchuthich.content = '';
                }
                if($(this).hasClass('doanvan')){
                    itemnoidungchuthich.type = 'DOAN_VAN';
                    itemnoidungchuthich.content = '';
                }
                if($(this).hasClass('bainghe')){
                    itemnoidungchuthich.type = 'bainghe';
                    itemnoidungchuthich.content = '';
                }
                ds_noidungchuthich.push(itemnoidungchuthich);
            });

            ds_cauhoi.push({
                noidungcauhoi:ds_noidungcauhoi,
                dapan:ds_cautraloi,
                noidungchuthich:ds_noidungchuthich
            });
        });
        obj.danhsach_cauhoi = ds_cauhoi;
        ThemBaiMoi(obj);
    },
    switchToPreview: function(noidungbai){
        var self = this;
        // var htmlTemp = $('<div>(Preview đang Implement)</div>');
        // self.element.find('.box-content-saved').empty();
        // self.element.find('.box-content-saved').append(htmlTemp);
        // self.element.find('.box-content-saved').show();
        // self.element.find('.box-content-editing').hide();
        // self.element.find('.box-title-action-button.btn-xemthu').text('Sửa');
        // self.element.find('.box-title.bai .box-title-icon').css({ 'background-color': '#c1c1c1' });
        //
        // self.isEditing = false;
        // self.options.isSaved = true;
        // return;


        var nd = new Bai();
        if(noidungbai){
            nd = noidungbai;
        }
        else{
            nd = this._collectData();
        }

        var htmlPhannoidungdebai = $('<div class="phan-noidungdebai"></div>');
        var htmlPhandanhsachcauhoi = $('<div class="phan-danhsachcauhoi"></div>');

        for (var property in nd.noi_dung_de_bai) {
            var _noidunghienthi = nd.noi_dung_de_bai[property].noi_dung_hien_thi;

            var latexArr = getLatexFromText(_noidunghienthi);
            if(latexArr.length > 0){
                console.log('Noi dung co latex');
                latexArr.forEach(function(item, indx){
                    var e = $('<div class="equation-container"></div>')[0];
                    katex.render(item, e);
                    _noidunghienthi = _noidunghienthi.replace('$$' + item + '$$', $(e).html());
                })
            }

            var _loainoidung = nd.noi_dung_de_bai[property].loai_noi_dung;
            if(_loainoidung == loainoidung.TIEU_DE){
                htmlPhannoidungdebai.append('<div class="item-phannoidungdebai tieude">' + _noidunghienthi + '</div>');
            }
            else if(_loainoidung == loainoidung.DOAN_VAN){
                htmlPhannoidungdebai.append('<div class="item-phannoidungdebai doanvan">' + _noidunghienthi + '</div>');
            }
            else if(_loainoidung == loainoidung.HINH_ANH){
                htmlPhannoidungdebai.append('<div class="item-phannoidungdebai hinhanh">' + _noidunghienthi + '</div>');
            }
        }

        for (var key in nd.danh_sach_cau_hoi){
            var cauhoi;
            if(nd.danh_sach_cau_hoi[key].loai_cau_hoi == loaicauhoi.SINGLE_CHOICE){
                cauhoi = new CauHoi_SingleChoice();
            }
            else if(nd.danh_sach_cau_hoi[key].loai_cau_hoi == loaicauhoi.DIEN_TEXT){
                cauhoi = new CauHoi_DienText();
            }
            else{
                cauhoi = new CauHoi_SapXep();
            }
            cauhoi = nd.danh_sach_cau_hoi[key];

            var htmlCauhoi = $('<div class="cauhoi"></div>');
            var htmlCauhoi_Title = '<div class="cauhoi-title">' + cauhoi.tieu_de + '</div>';
            var htmlDapAnContainer = $('<div class="phan-dapan"></div>');
            htmlCauhoi.append(htmlCauhoi_Title);

            for(var k in cauhoi.noi_dung_cau_hoi){
                var textNoidungcauhoi = cauhoi.noi_dung_cau_hoi[k].noi_dung_hien_thi;
                var htmlNoidungcauhoi = '<div class="item-phannoidungcauhoi">'+textNoidungcauhoi+'</div>';
                htmlCauhoi.append(htmlNoidungcauhoi);
            }

            if(cauhoi.loai_cau_hoi == loaicauhoi.SINGLE_CHOICE){
                htmlCauhoi.addClass('single-choice');
                for(var k in cauhoi.danh_sach_dap_an){
                    var dapan_noidunghienthi = cauhoi.danh_sach_dap_an[k].noi_dung_hien_thi;
                    var dapan_dapandung = cauhoi.danh_sach_dap_an[k].dap_an_dung;
                    var htmlDapan = $('<div class="dapan"></div>');
                    htmlDapan.text(dapan_noidunghienthi);
                    if(dapan_dapandung === true){
                        htmlDapan.addClass('dap_an_dung');
                    }
                    htmlDapAnContainer.append(htmlDapan);
                }
            }
            else if(cauhoi.loai_cau_hoi == loaicauhoi.DIEN_TEXT){
                htmlCauhoi.addClass('dientext');
                for(var k in cauhoi.danh_sach_dap_an){
                    var helptext = cauhoi.danh_sach_dap_an[k].help_text;
                    var textbox = $('<input class="dapan-dientext-textbox" type="text" placeholder="'+helptext+'">');

                    var htmlDapan = $('<div class="dapan dientext-textbox"></div>');
                    htmlDapan.append(textbox);
                    htmlDapAnContainer.append(htmlDapan);
                }
            }
            else if((cauhoi.loai_cau_hoi == loaicauhoi.ANIMATION_SAPXEP)||(cauhoi.loai_cau_hoi == loaicauhoi.ANIMATION_DANHDAU)){
                htmlCauhoi.addClass('sapxep');
                var htmlTextBlockContainer = $('<div class="text-block-container"></div>');
                var htmlChuoiDung = $('<div class="dapan-sapxep-chuoidung"></div>');
                var htmlChuoiDungHeader = $('<span class="chuoi-dung-header">Chuỗi đúng: </span>');
                var htmlChuoiDungContent = $('<span class="chuoi-dung-content"></span>');

                var _chuoidung = '';
                if((cauhoi.phuong_thuc_check_dapan == phuongthuccheckdapan.GIATRI_TEXT)||(cauhoi.phuong_thuc_check_dapan == phuongthuccheckdapan.GIATRI_TOAN)){
                    htmlChuoiDungHeader.text('Chuỗi đúng: ');
                    for(var k in cauhoi.gia_tri_dung){
                        _chuoidung += cauhoi.gia_tri_dung[k] + ';';
                    }
                }
                else if(cauhoi.phuong_thuc_check_dapan == phuongthuccheckdapan.VI_TRI){
                    htmlChuoiDungHeader.text('Vị trí đúng: ');
                    for(var dapankey in cauhoi.danh_sach_dap_an){
                        var _dapan = cauhoi.danh_sach_dap_an[dapankey];
                        _chuoidung += _dapan.noi_dung_hien_thi + '[' + _dapan.vi_tri_dung + '] '
                    }
                }


                htmlChuoiDungContent.text(_chuoidung);
                htmlChuoiDung.append(htmlChuoiDungHeader, htmlChuoiDungContent);
                for(var k in cauhoi.danh_sach_dap_an){
                    var _text = cauhoi.danh_sach_dap_an[k].noi_dung_hien_thi;
                    var htmlDapan = $('<div class="dapan sapxep-textblock"></div>');
                    htmlDapan.text(_text);
                    htmlTextBlockContainer.append(htmlDapan);

                }
                htmlDapAnContainer.append(htmlTextBlockContainer, htmlChuoiDung);
               
            }
            htmlCauhoi.append(htmlDapAnContainer);
            htmlPhandanhsachcauhoi.append(htmlCauhoi);
        }

        self.element.find('.box-content-saved').empty();
        self.element.find('.box-content-saved').append(htmlPhannoidungdebai, htmlPhandanhsachcauhoi);
        self.element.find('.box-content-saved').show();
        self.element.find('.box-content-editing').hide();
        self.dropdownDanhSachChuyenDe.hide();
        self.element.find('.box-title-action-button.btn-xemthu').text('Sửa');
        self.element.find('.box-title.bai .box-title-icon').css({ 'background-color': '#c1c1c1' });

        self.isEditing = false;
        self.options.isSaved = true;

    },
    khoitaovoinoidungcosan:function (noidungcosan) {
        //khoi tao phan noi dung de bai
        var self = this;
        $.each(noidungcosan.danhsach_noidungdebai, function (i, v) {
            themItemNoiDung(self.btnThemNoiDungDeBai, v.type);
        });

        //khoi tao phan cau hoi
        $.each(noidungcosan.danhsach_cauhoi, function (i, v) {
            ThemCauHoi(self.element.find(".phandanhsachcauhoi"), cauhoiCount, v);
            self.element.find(".phandanhsachcauhoi").sortable({
                revert:true,
                stop:function(){
                    sapxeplaisothutucauhoi();
                }
            });
        });
    },
    khoiTaoVoiDulieuTuDB:function (bai) {
        var self = this;
        var countNoidungdebai = 0;
        var numNoidungdebai = bai.child('noi_dung_de_bai').numChildren();
        var countDanhsachcauhoi = 0;
        var numDanhsachcauhoi = bai.child('danh_sach_cau_hoi').numChildren();

        bai.child('noi_dung_de_bai').forEach(function (templateNoidung) {
            var _type = templateNoidung.val().loai_noi_dung;
            var _noidung = templateNoidung.val().noi_dung_hien_thi;
            var _translate = templateNoidung.val().translate;

            $("<div></div>").taoTemplateNoidung({
                type:_type,
                data:{noidung:_noidung},
                khoitaonoidung_hoanthanh:function () {
                    self._phannoidungdebai_done = true;
                    self.checkKhoiTaoVoiDuLieuDB_Done();
                }
            }).insertBefore(self.btnThemNoiDungDeBai);

            if(_translate === true){
                self.phanDeBai_ckbDich.prop('checked', true);
            }
        });
        var cauhoiStt = 1;
        bai.child('danh_sach_cau_hoi').forEach(function (cauhoi) {
            var elementCauhoi = $("<div></div>", { class: "box cauhoi" });
            if(cauhoi.val().loai_cau_hoi == loaicauhoi.DIEN_TEXT){
                elementCauhoi.addClass('dientext');
            }
            else if(cauhoi.val().loai_cau_hoi == loaicauhoi.ANIMATION_SAPXEP){
                elementCauhoi.addClass('sapxep');
            }
            else if(cauhoi.val().loai_cau_hoi == loaicauhoi.ANIMATION_DANHDAU){
                elementCauhoi.addClass('danhdau');
            }

            elementCauhoi.taocauhoi({
                stt:cauhoiStt,
                loaicauhoi:cauhoi.val().loai_cau_hoi,
                khoitaonoidung_hoanthanh:function () {
                    self._phandanhsachcauhoi_done = true;
                    self.checkKhoiTaoVoiDuLieuDB_Done();
                    createSwitchButton();
                },
                path:self.options.path + '/danh_sach_cau_hoi/' + cauhoi.getKey()
            }).appendTo(self.element.find(".phandanhsachcauhoi"))
                .taocauhoi("khoiTaoVoiDulieuTuDB", cauhoi);

                
                cauhoiStt++;
        });

        //this.switchToPreview();

    },
    checkKhoiTaoVoiDuLieuDB_Done:function(){
        if(this.options.mode != 'display') return;
        if((this._phannoidungdebai_done === true) && (this._phandanhsachcauhoi_done === true)){
            this.switchToPreview();
        }
    },
    themCauHoi:function(doituongcaihoi){

    },
    closemenu:function () {
        if(this.phanNoiDungDeBai.find(GetDoiTuongMenuNoiDung(this.btnThemNoiDungDeBai)).length > 0){
            this.phanNoiDungDeBai.find(GetDoiTuongMenuNoiDung(this.btnThemNoiDungDeBai)).remove();
        }
    }
});
$.widget("editor.taocauhoi", {

    options:{
        stt:null,
        loaicauhoi:'',
        noidungcosan:null
    },
    _create: function(){
        var self = this;
        // var contentTemplateNodes = $("template#box-cau-hoi").prop('content');
        // var contentTmp = $(contentTemplateNodes).find(".box.cauhoi").html();
        var t = jq3("template#box-cau-hoi").prop('content');
        var t2;

        if(this.options.loaicauhoi == loaicauhoi.SINGLE_CHOICE){
            t2 = jq3(t).find(".box.cauhoi");
        }
        else if(this.options.loaicauhoi == loaicauhoi.DIEN_TEXT){
            t2 = jq3(t).find(".box.cauhoi.dientext");
        }
        else if(this.options.loaicauhoi == loaicauhoi.ANIMATION_SAPXEP){
            t2 = jq3(t).find(".box.cauhoi.sapxep");
        }
        else{
            t2 = jq3(t).find(".box.cauhoi.danhdau");
        }
        
        //t2.find(".box-title-text").text("Câu hỏi #" + this.options.stt);
        this.element.append(t2.html());

        this.tieude = this.element.find('.box-title-text').first();
        this.section_noidungcauhoi = this.element.find(".box-content-section.noidungcauhoi").first();
        this.section_phandapan = this.element.find(".box-content-section.phancautraloi").first();
        this.section_phanchuthich = this.element.find(".box-content-section.phanchuthich").first();
        this.ckbXuatBan = this.element.find('input[name="ckbPublic"]').first();
        this.phanNoidung_ckbDich = this.element.find('.box-content-section.noidungcauhoi input[name="checkboxDich"]').first();
        this.phanChuThich_ckbDich = this.element.find('.box-content-section.phanchuthich input[name="checkboxDich"]').first();
        this.btnThemNoidungcauhoi = this.section_noidungcauhoi.find(".button-add-item.themnoidungcauhoi").first();
        this.btnThemDapAn = this.section_phandapan.find(".button-add-item.themcautraloi").first();
        this.btnThemNoidungchuthich = this.section_phanchuthich.find(".button-add-item.themnoidungchuthich").first();
        this.phuongThucCheckDapAn = '';


        this.tieude.text("Câu hỏi #" + this.options.stt);

        if(this.options.loaicauhoi == loaicauhoi.SINGLE_CHOICE){
            this.phanDapAn_ckbDich = this.element.find('.box-content-section.phancautraloi input[name="checkboxDich"]').first();
            this.phanDapAn_ckbAudio = this.element.find('.box-content-section.phancautraloi input[name="checkboxAudio"]').first();
        }
        else if(this.options.loaicauhoi == loaicauhoi.DIEN_TEXT){

        }
        else if((this.options.loaicauhoi == loaicauhoi.ANIMATION_SAPXEP) || (this.options.loaicauhoi == loaicauhoi.ANIMATION_DANHDAU)){
            this.dropdownPhuongThucCheckDapAn = this.element.find('select[name="drpPhuongThucCheckDapAn"]').first();
            this.divSectionChuoiGiaTriDung = this.element.find('.box-content-section.chuoigiatridung');
            this.divChuoiGiaTriDungContainer = this.element.find('.box-content-section.chuoigiatridung .chuoidung-container');
            this.btnThemChuoiDung = this.element.find('.button-add-item.themchuoidung');
        }

        if(this.options.noidungcosan){
            this._khoitaovoinoidungcosan(this.options.noidungcosan);
        }

        this._registerEventHandler();
    },
    _registerEventHandler:function () {
        var self = this;
        //Button colapse
        var btnCollapse = this.element.find(".box-title-action-button.btn-collapse-cauhoi");
        btnCollapse.on('click', function () {
            self.element.toggleClass('collapse');
        });
        //Button more action
        var btnMoreAction = this.element.find(".box-title-action-button.btnMoreActions");
        this.element.find(".box-title-action-button.btnMoreActions").on('click', function () {
            $(this).find('.more-actions-menu').toggleClass('show');
        });
        this.element.find(".box-title-action-button.btnMoreActions .item-delete").on('click', function () {
            self._deleteCauhoi();
        });

        this.btnThemNoidungcauhoi.on('click', function () {
            cur_nutshowmenu = this;
            cur_containershowmenu = self.section_noidungcauhoi;
            if(self.section_noidungcauhoi.find(GetDoiTuongMenuNoiDung(self.btnThemNoidungcauhoi)).length > 0){
                self.section_noidungcauhoi.find(GetDoiTuongMenuNoiDung(self.btnThemNoidungcauhoi)).remove();
            }
            else{
                GetDoiTuongMenuNoiDung(self.btnThemNoidungcauhoi)
                    .css({
                        "bottom":"",
                        "top":"40px"
                    })
                    .insertBefore(self.btnThemNoidungcauhoi);
            }
        });

        this.btnThemNoidungchuthich.on('click', function () {
            cur_containershowmenu = self.section_phanchuthich;
            cur_nutshowmenu = self.btnThemNoidungchuthich;
            if(self.section_phanchuthich.find(GetDoiTuongMenuNoiDung(self.btnThemNoidungchuthich)).length > 0){
                self.section_phanchuthich.find(GetDoiTuongMenuNoiDung(self.btnThemNoidungchuthich)).remove();
            }
            else{
                GetDoiTuongMenuNoiDung(self.btnThemNoidungchuthich)
                    .css({ "bottom": "-195px;" })
                    .insertBefore(self.btnThemNoidungchuthich);
            }
        });

        if(this.options.loaicauhoi == loaicauhoi.SINGLE_CHOICE){
            this.btnThemDapAn.on('click', function () {
                var dapanContainer = self.element.find('.cautraloi-container');
                $("<div></div>", {class:"item-noidung dapan"}).taodapan({
                    loaicauhoi : loaicauhoi.SINGLE_CHOICE,
                    dapandung_changed:function (e,v) {
                        self._dapandung_changed(e,v);
                    }
                }).hide().appendTo(dapanContainer).show(500);

            });
        }
        else if(this.options.loaicauhoi == loaicauhoi.DIEN_TEXT){
            this.btnThemDapAn.on('click', function () {
                var dapanContainer = self.element.find('.cautraloi-container');
                $("<div></div>", {class:"item-noidung dapan dientext"}).taodapan({
                    loaicauhoi : loaicauhoi.DIEN_TEXT,
                    phuongthuccheckdapan:''
                }).hide().appendTo(dapanContainer).show(500);

            });
        }
        else if((this.options.loaicauhoi == loaicauhoi.ANIMATION_SAPXEP) || (this.options.loaicauhoi == loaicauhoi.ANIMATION_DANHDAU)){
            this.dropdownPhuongThucCheckDapAn.on('change', function(){
                switch(self.dropdownPhuongThucCheckDapAn.val()){
                    case phuongthuccheckdapan.VI_TRI:
                        self.phuongThucCheckDapAn = phuongthuccheckdapan.VI_TRI;
                        self.divSectionChuoiGiaTriDung.css('display', 'none');
                        self._showhide_phandapan_chuoigiatridung('show');
                        break;
                    case phuongthuccheckdapan.GIATRI_TEXT:
                        self.phuongThucCheckDapAn = phuongthuccheckdapan.GIATRI_TEXT;
                        self.divSectionChuoiGiaTriDung.css('display', 'block');
                        self._showhide_phandapan_chuoigiatridung('hide');
                        break;
                    case phuongthuccheckdapan.GIATRI_TOAN:
                        self.phuongThucCheckDapAn = phuongthuccheckdapan.GIATRI_TOAN;
                        self.divSectionChuoiGiaTriDung.css('display', 'block');
                        self._showhide_phandapan_chuoigiatridung('hide');
                        break;
                }
                var e = $(this).find('option[value="EMPTY"]').remove();
            });
            this.btnThemChuoiDung.click(function () {
                self._themChuoiDung();
            });
            this.btnThemDapAn.on('click', function () {
                if(self.dropdownPhuongThucCheckDapAn.val() == "EMPTY"){
                    alert('Hãy chọn phương thức check đáp án trước');
                    return;
                }
                var dapanContainer = self.element.find('.cautraloi-container');
                $("<div></div>", {class:"item-noidung dapan vitri"}).taodapan({
                    loaicauhoi : self.options.loaicauhoi,
                    phuongthuccheckdapan:self.phuongThucCheckDapAn,
                    dapan_textboxContentChanged:function (event, data) {
                         self.divChuoiGiaTriDungContainer.find('.item-noidung.chuoi-gia-tri-dung')
                             .taochuoidung('setAvailableTag', data.tag);
                    },
                    dapan_textboxRemoved:function (event, data) {
                        self.divChuoiGiaTriDungContainer.find('.item-noidung.chuoi-gia-tri-dung')
                            .taochuoidung('removeAvailableTag', data);
                    }
                }).hide().appendTo(dapanContainer).show(500);
            });
        }
    },
    _themChuoiDung:function (noidungkhoitao) {
        var self = this;
        var _availableTags = [];
        self.section_phandapan.find('div.item-noidung.dapan').each(function (ix, item) {
            var nd = $(item).taodapan('getNoidung');
            _availableTags.push(nd.noi_dung_hien_thi);
        });
        var _data = noidungkhoitao ? {giatridung:noidungkhoitao} : null;
        $('<div class="item-noidung chuoi-gia-tri-dung"></div>').taochuoidung({
            availableTags:_availableTags,
            data:_data
        }).appendTo(self.divChuoiGiaTriDungContainer)
    },
    _deleteCauhoi:function () {
        var self = this;
        if (this.options.path) {
            delete_item(this.options.path, function () {
                self.element.fadeOut(200, function () {
                    console.log('delete cau hoi tu tb_bai thanh cong');
                    $(this).remove();
                });
            });
        } else {
            self.element.fadeOut(200, function () {
                $(this).remove();
            });
        }
    },
    _dapandung_changed:function (e,val) {
        if(val.val === true){
            this.section_phandapan.find('.item-noidung.dapan').not(e.target).each(function (i, o) {
                $(o).taodapan('uncheck');
            });
        }
    },
    _showhide_phandapan_chuoigiatridung:function (showhide) {
        if(showhide == 'show'){
            this.element.find('.cautraloi-container .item-noidung.dapan').taodapan("vitridung", 'show');
        }
        else{
            this.element.find('.cautraloi-container .item-noidung.dapan').taodapan("vitridung", 'hide');
        }
    },
    _khoitaovoinoidungcosan: function (noidungcosan) {
        var self = this;
        $.each(noidungcosan.noidungcauhoi, function (i, v) {
            themItemNoiDung(self.btnThemNoidungcauhoi, v.type);
        });
        $.each(noidungcosan.dapan, function (i,v) {
            var tmp = $($("template#item-noidung").prop('content')).find(".item-noidung.dapan").html();
            $("<div></div>", {class:"item-noidung dapan"}).html(tmp).insertBefore(self.btnThemDapAn);
        });
        $.each(noidungcosan.noidungchuthich, function (i,v) {
            themItemNoiDung(self.btnThemNoidungchuthich, v.type);
        });
    },
    khoiTaoVoiDulieuTuDB:function (cauhoi) {
        var self = this;
        var _tieude = cauhoi.val().tieu_de;
        var dapanContainer = this.element.find('.cautraloi-container');

        //this.element.find('.box-title-text').text(_tieude);
        if((cauhoi.val().loai_cau_hoi == loaicauhoi.ANIMATION_SAPXEP)||(cauhoi.val().loai_cau_hoi == loaicauhoi.ANIMATION_DANHDAU)){
            var ptcheckda = cauhoi.val().phuong_thuc_check_dapan;
            this.dropdownPhuongThucCheckDapAn.val(cauhoi.val().phuong_thuc_check_dapan);
            switch(ptcheckda){
                case phuongthuccheckdapan.VI_TRI:
                    self.phuongThucCheckDapAn = phuongthuccheckdapan.VI_TRI;
                    self.divSectionChuoiGiaTriDung.css('display', 'none');
                    self._showhide_phandapan_chuoigiatridung('show');
                    break;
                case phuongthuccheckdapan.GIATRI_TEXT:
                    self.phuongThucCheckDapAn = phuongthuccheckdapan.GIATRI_TEXT;
                    self.divSectionChuoiGiaTriDung.css('display', 'block');
                    self._showhide_phandapan_chuoigiatridung('hide');

                    //for(var gtdkey in cauhoi.val().gia_tri_dung){
                    //    var gtd = cauhoi.gia_tri_dung[gtdkey];
                    //    self._themChuoiDung(gtd);
                    //}
                    cauhoi.child('gia_tri_dung').forEach(function(snapGiatridung){
                        var _gtd = snapGiatridung.val();
                        self._themChuoiDung(snapGiatridung.val());
                    })
                    break;
                case phuongthuccheckdapan.GIATRI_TOAN:
                    self.phuongThucCheckDapAn = phuongthuccheckdapan.GIATRI_TOAN;
                    self.divSectionChuoiGiaTriDung.css('display', 'block');
                    self._showhide_phandapan_chuoigiatridung('hide');
                    break;
            }
        }
        cauhoi.child('noi_dung_cau_hoi').forEach(function (templateNoidung) {
            var _type = templateNoidung.val().loai_noi_dung;
            var _noidung = templateNoidung.val().noi_dung_hien_thi;
            var _translate = templateNoidung.val().translate;

            $("<div></div>").taoTemplateNoidung({
                type:_type,
                data:{noidung:_noidung},
                khoitaonoidung_hoanthanh:function () {
                    self._trigger('khoitaonoidung_hoanthanh');
                }
            }).insertBefore(self.btnThemNoidungcauhoi);

            if(_translate === true){
                self.phanNoidung_ckbDich.prop('checked', true);
            }
        });
        cauhoi.child('giaithich_loigiai').forEach(function (templateNoidung) {
            var _type = templateNoidung.val().loai_noi_dung;
            var _noidung = templateNoidung.val().noi_dung_hien_thi;
            var _translate = templateNoidung.val().translate;

            $("<div></div>").taoTemplateNoidung({
                type:_type,
                data:{noidung:_noidung}
            }).insertBefore(self.btnThemNoidungchuthich);

            if(_translate === true){
                self.phanChuThich_ckbDich.prop('checked', true);
            }
        });
        cauhoi.child('danh_sach_dap_an').forEach(function (dapan) {
            var objDapan = dapan.val();
            if(self.options.loaicauhoi == loaicauhoi.SINGLE_CHOICE){
                $("<div></div>", { class: "item-noidung dapan" }).taodapan({
                    khoitaovoinoidung:true,
                    data:{
                        noidunghienthi:dapan.val().noi_dung_hien_thi,
                        dapandung:dapan.val().dap_an_dung
                    },
                    loaicauhoi : loaicauhoi.SINGLE_CHOICE,
                    dapandung_changed:function (e,v) {
                        self._dapandung_changed(e,v);
                    }
                }).appendTo(dapanContainer);
            }
            else if(self.options.loaicauhoi == loaicauhoi.DIEN_TEXT){
                $("<div></div>", { class: "item-noidung dapan dientext" }).taodapan({
                    khoitaovoinoidung:true,
                    data:{
                        phuongthuccheckdapan:dapan.val().phuong_thuc_check_dap_an,
                        helptext:dapan.val().help_text,
                        gitridung:dapan.val().gia_tri_dung
                    },
                    loaicauhoi : loaicauhoi.DIEN_TEXT
                }).appendTo(dapanContainer);
            }
            else{
                var _vitridung = '';
                if(cauhoi.val().phuong_thuc_check_dapan == phuongthuccheckdapan.VI_TRI){
                    _vitridung = dapan.val().vi_tri_dung;
                }
                $("<div></div>", {class:"item-noidung dapan vitri"}).taodapan({
                    loaicauhoi : self.options.loaicauhoi,
                    phuongthuccheckdapan:cauhoi.val().phuong_thuc_check_dapan,
                    khoitaovoinoidung:true,
                    data:{
                        noidunghienthi:dapan.val().noi_dung_hien_thi,
                        vitridung:_vitridung
                    },
                    dapan_textboxContentChanged:function (event, data) {
                        self.divChuoiGiaTriDungContainer.find('.item-noidung.chuoi-gia-tri-dung')
                            .taochuoidung('setAvailableTag', data.tag);
                    },
                    dapan_textboxRemoved:function (event, data) {
                        self.divChuoiGiaTriDungContainer.find('.item-noidung.chuoi-gia-tri-dung')
                            .taochuoidung('removeAvailableTag', data);
                    }
                }).appendTo(dapanContainer);
            }
        });

    },
    getNoidung:function () {
        var self = this;
        var _noidung;

        if(this.options.loaicauhoi == loaicauhoi.SINGLE_CHOICE){
            _noidung = new CauHoi_SingleChoice();
            this.section_phandapan.find('div.item-noidung.dapan').each(function (ix, itemDapan_SingleChoice) {
                var nd = $(itemDapan_SingleChoice).taodapan('getNoidung');
                nd.translate = self.phanDapAn_ckbDich.prop('checked');
                nd.audio = self.phanDapAn_ckbAudio.prop('checked');
                _noidung.danh_sach_dap_an[ix] = nd;
            });
        }
        else if(this.options.loaicauhoi == loaicauhoi.DIEN_TEXT){
            _noidung = new CauHoi_DienText();
            this.section_phandapan.find('div.item-noidung.dapan.dientext').each(function (ix, ele) {
                var nd = $(ele).taodapan('getNoidung');
                _noidung.danh_sach_dap_an[ix] = nd;
            });
        }
        else {
            _noidung = new CauHoi_SapXep();
            _noidung.phuong_thuc_check_dapan = this.dropdownPhuongThucCheckDapAn.val();
            if((this.dropdownPhuongThucCheckDapAn.val() == phuongthuccheckdapan.GIATRI_TEXT) || this.dropdownPhuongThucCheckDapAn.val() == phuongthuccheckdapan.GIATRI_TOAN){
                this.divChuoiGiaTriDungContainer.find('.item-noidung.chuoi-gia-tri-dung').each(function (idx, ele) {
                    var val = $(ele).taochuoidung('getNoidung');
                    _noidung.gia_tri_dung[idx] = val;
                });
            }
            else{
                delete _noidung.gia_tri_dung;
            }
            this.section_phandapan.find('div.item-noidung.dapan.vitri').each(function (ix, ele) {
                var nd = $(ele).taodapan('getNoidung');
                _noidung.danh_sach_dap_an[ix] = nd;
            });
        }
        this.section_noidungcauhoi.find('div.item-noidung').each(function (index, itemNoidungcauhoi) {
            var nd = $(itemNoidungcauhoi).taoTemplateNoidung('getNoidung');
            nd.translate = self.phanNoidung_ckbDich.prop('checked');
            _noidung.noi_dung_cau_hoi[index] = nd;
        });
        this.section_phanchuthich.find('div.item-noidung').each(function (index, itemNoidunggiaithich) {
            var nd = $(itemNoidunggiaithich).taoTemplateNoidung('getNoidung');
            nd.translate = self.phanChuThich_ckbDich.prop('checked');
            _noidung.giaithich_loigiai[index] = nd;
        });
        _noidung.loai_cau_hoi = this.options.loaicauhoi;
        _noidung.tieu_de = this.tieude.html();
        _noidung.xuat_ban = this.ckbXuatBan.prop('checked');
        return _noidung;
    }

});
$.widget("editor.taodapan", {
    _dapandung:false,
    options: {
        loaicauhoi:'',
        phuongthuccheckdapan:'',
        khoitaovoinoidung:false,
        data:{noidunghienthi:''}
    },
    _create: function () {

        var self = this;
        var tmp = jq3($("template#item-noidung").prop('content'))
        var tmp2;


        if(this.options.loaicauhoi == loaicauhoi.SINGLE_CHOICE){
            tmp2 = tmp.find(".item-noidung.dapan").html();
            this.element.html(tmp2);
            this.txtInput = this.element.find('textarea[name="txtInput"]');
            this.checkboxDapAnDung = this.element.find('input[name="ckbDapAnDung"]');
            if(this.options.khoitaovoinoidung){
                this.txtInput.val(this.options.data.noidunghienthi);
                this.checkboxDapAnDung.prop('checked', this.options.data.dapandung);
            }
        }
        else if(this.options.loaicauhoi == loaicauhoi.DIEN_TEXT){
            tmp2 = tmp.find(".item-noidung.dapan.dientext").html();
            this.element.html(tmp2);
            this.dropdownboxPhuongThucCheckDapAn = this.element.find('select[name="drpPhuongThucCheckDapAn"]');
            this.txtHelpText = this.element.find('input[name="txtHelpText"]');
            this.divGiaTriDungContainer = this.element.find('.gia-tri-dung-container');
            this.btnThemDapAnDung = this.element.find('.button-them-gia-tri-dung');
            if(this.options.khoitaovoinoidung){
                this.dropdownboxPhuongThucCheckDapAn.val(this.options.data.phuongthuccheckdapan);
                this.txtHelpText.val(this.options.data.helptext);

                var _giatridung = this.options.data.gitridung;
                var splited = _giatridung.split(';');
                splited.forEach(function (item, index) {
                    if(item){
                        var txtGiatridung = $('<input name="txtGiaTriDung" type="text" class="textbox-giatridung" placeholder="Giá trị đúng"/>')
                            .insertBefore(self.btnThemDapAnDung);
                        txtGiatridung.val(item);
                    }

                });
            }
        }
        else if((this.options.loaicauhoi == loaicauhoi.ANIMATION_SAPXEP) || (this.options.loaicauhoi == loaicauhoi.ANIMATION_DANHDAU)){
            tmp2 = tmp.find(".item-noidung.dapan.vitri").html();
            this.element.html(tmp2);
            this.txtInput = this.element.find('textarea[name="txtInput"]');
            this.txtViTriDung = this.element.find('input[name="txtViTriDung"]');
            this.divVitridung = this.element.find('.item-noidung-vitridung');

            this.txtViTriDung.tagit({
                singleField: true,
                singleFieldNode: this.txtViTriDung,
            });

            if(this.options.phuongthuccheckdapan == phuongthuccheckdapan.VI_TRI){
                this.vitridung('show');
            }
            else{
                this.vitridung('hide');
            }

            if(this.options.khoitaovoinoidung){
                this.txtInput.val(this.options.data.noidunghienthi);
                if(this.options.phuongthuccheckdapan == phuongthuccheckdapan.VI_TRI){
                    var splited = this.options.data.vitridung.split(',');
                    splited.forEach(function (item, index) {
                        if(item){
                            self.txtViTriDung.tagit("createTag", item);
                        }

                    });

                }
            }
        }



        this._registerEventHandler();

    },
    _registerEventHandler:function () {
        var self = this;
        if(this.options.loaicauhoi == loaicauhoi.SINGLE_CHOICE){
            this.txtNoidungHienThi = this.element.find('.item-noidung-content textarea').first();
            this.ckbDapandung = this.element.find('input[name="ckbDapAnDung"]').first();
            this.ckbDapandung.on('change', function (event) {
                self._dapandung = self.ckbDapandung.prop('checked');
                self._trigger("dapandung_changed", event, {val: self._dapandung});
            });
        }
        if(this.options.loaicauhoi == loaicauhoi.DIEN_TEXT){
            self.btnThemDapAnDung.click(function () {
                $('<input name="txtGiaTriDung" type="text" class="textbox-giatridung" placeholder="Giá trị đúng"/>')
                    .insertBefore(self.btnThemDapAnDung);
            });
        }
        if((this.options.loaicauhoi == loaicauhoi.ANIMATION_SAPXEP)||(this.options.loaicauhoi == loaicauhoi.ANIMATION_DANHDAU)){
            this.txtInput.on('blur', function (event) {
                self._trigger('dapan_textboxContentChanged', event, {tag:$(this).val()});

            });
        }
        //Register close button
        this.element.find("span.btnClose").on('click', function (event) {
            self.element.fadeOut(200, function () {
                self._trigger('dapan_textboxRemoved', event, self.txtInput.val());
                $( this ).remove();
            });
        });
    },
    vitridung:function (showorhide) {
        if(showorhide == 'show'){
            this.divVitridung.css('display', 'block');
        }
        else{
            this.divVitridung.css('display', 'none');
        }
    },
    getNoidung:function () {
        var objDapan;
        if(this.options.loaicauhoi == loaicauhoi.SINGLE_CHOICE){
            objDapan = new DapAn_SingleChoice();
            objDapan.dap_an_dung = this.ckbDapandung.prop('checked');
            objDapan.noi_dung_hien_thi = this.txtNoidungHienThi.val();
        }
        else if(this.options.loaicauhoi == loaicauhoi.DIEN_TEXT){
            objDapan = new DapAn_DienText();
            var giatridung = '';
            var helptext = this.txtHelpText.val();

            this.element.find('input[name="txtGiaTriDung"]').each(function(idx, ele){
                giatridung += $(ele).val() + ";";
            });

            objDapan.help_text = helptext;
            objDapan.phuong_thuc_check_dap_an = this.dropdownboxPhuongThucCheckDapAn.val();
            objDapan.gia_tri_dung = giatridung;
        }
        else {
            var objDapAn;
            if(this.options.phuongthuccheckdapan == phuongthuccheckdapan.VI_TRI){
                objDapan = new DapAn_ViTri();
                objDapan.noi_dung_hien_thi = this.txtInput.val();
                objDapan.vi_tri_dung = this.txtViTriDung.val();
            }
            else{
                objDapan = new DapAn_SapXep();
                objDapan.noi_dung_hien_thi = this.txtInput.val();
            }
        }
        return objDapan;
    },
    uncheck:function () {
        this.ckbDapandung.prop('checked', false);
        this._dapandung = false;
    }
});
$.widget("editor.taochuoidung", {
    _availableTags:[],
    options: {
        availableTags:[],
    },
    _create: function () {

        var self = this;
        var tmp = jq3($("template#item-noidung").prop('content'))
        var tmp2 = tmp.find(".item-noidung.chuoi-gia-tri-dung").html();
        this.element.html(tmp2);

        if(this.options.availableTags)
            this._availableTags = this.options.availableTags;

        this.txtInputChuoiGiaTriDung = this.element.find('input[name="txtChuoiGiaTriDung"]');
        this.txtInputChuoiGiaTriDung.tagit({
            availableTags: this._availableTags,
            singleField: true,
            singleFieldNode: this.txtInputChuoiGiaTriDung,
            showAutocompleteOnFocus:true,
            singleFieldDelimiter:'-'
        });
        if(this.options.data){
            var _chuoidungSplited = this.options.data.giatridung.split(';');
            _chuoidungSplited.forEach(function (item, index) {
                if(item){
                    self.txtInputChuoiGiaTriDung.tagit('createTag', item);
                }
            })
        }
        this._registerEventHandler();
    },
    _registerEventHandler:function () {
        var self = this;

        //Register close button
        this.element.find("span.btnClose").on('click', function () {
            self.element.fadeOut(200, function () {
                $( this ).remove();
            });
        });
    },
    setAvailableTag:function (tag) {
        if(jQuery.inArray(tag, this._availableTags) < 0){
            this._availableTags.push(tag);
        }
        this.txtInputChuoiGiaTriDung.tagit({
            availableTags: this._availableTags,
            singleField: true,
            singleFieldNode: this.txtInputChuoiGiaTriDung,
            showAutocompleteOnFocus:true,
            singleFieldDelimiter:'-'
        });
    },
    removeAvailableTag:function (tag) {
        this._availableTags = jQuery.grep(this._availableTags, function(value) {
            return value != tag;
        });
        this.txtInputChuoiGiaTriDung.tagit({
            availableTags: this._availableTags,
            singleField: true,
            singleFieldNode: this.txtInputChuoiGiaTriDung,
            showAutocompleteOnFocus:true,
            singleFieldDelimiter:'-'
        });
    },
    getNoidung:function () {
        return this.txtInputChuoiGiaTriDung.val();
    }
});

//console.log(getQueryParams(location.search).path);
$(document).on('click', function (event) {
    if (!$(event.target).closest('.button-add-item').length) {
        if (cur_containershowmenu != null || cur_containershowmenu != undefined) {
            if (cur_containershowmenu.find(GetDoiTuongMenuNoiDung()).length > 0) {
                cur_containershowmenu.find(GetDoiTuongMenuNoiDung()).remove();
            }
        }
    }
    if (!$(event.target).closest('.btnMoreActions').length) {
        $('.btnMoreActions').find('.more-actions-menu').removeClass('show');
    }
    $( "#submenu-quanlythuvien" ).menu();
});

function loadDanhsachBai() {
    bai_selectBy(getQueryParams(location.search).path, function (rs) {
        var container = $('#bai-container');
        soluongbai = 1;
        rs.forEach(function (bai) {
            ThemBaiMoi(modeThemBaiMoi.CREATE_WITH_DATA, bai);
            // var wgBai = $("<div></div>", { class: 'box bai' }).bai({
            //     isInsertedToDatabase: true,
            //     path: 'tb_bai/' + bai.getKey(),
            //     soluongbai:soluongbai+1
            // }).appendTo(container)
            //     .bai("khoiTaoVoiDulieuTuDB", bai)
            //     //.bai("switchToPreview");
            //
            // soluongbai++;
        });
        console.log('soluongbai: ' + soluongbai);
    });
}
function loadDsBai(container) {
    var path = getQueryParams(location.search).path;
    bai_selectBy(path, function (rs) {
        soluongbai = 1;
        rs.forEach(function (bai) {
            ThemBaiMoi(modeThemBaiMoi.CREATE_WITH_DATA, 'display',bai, container);
        });
        console.log('soluongbai: ' + soluongbai);
    });
}
function makeSortable() {
    $("#bai-container").sortable({
        handle: '.box-title.bai',
        revert: true,
        items: ".box.bai",
        start: function (event, ui) {
            //var textareaId = ui.item.find('div[]').attr('id');
            //if (typeof textareaId != 'undefined') {
            //    var editorInstance = CKEDITOR.instances[textareaId];
            //    editorInstance.destroy();
            //    CKEDITOR.remove(textareaId);
            //}
            //console.log(ui);
            //ui.item.find('.item-noidung div[contenteditable="true"]').ckeditorGet().destroy();
        },
        stop: function (event, ui) {
            //var textareaId = ui.item.find('textarea').attr('id');
            //if (typeof textareaId != 'undefined') {
            //    CKEDITOR.replace(textareaId);
            //}

            //console.log(ui.item.find('.item-noidung div[contenteditable="true"]').attr('id'));

            //ui.item.find('.item-noidung div[contenteditable="true"]').ckeditor();
            //console.log(ui.item.find('.item-noidung div[contenteditable="true"]').ckeditorGet());


            sapxeplaisothutubai();
            sapxeplaisothutucauhoi();
        }
    });

    //$("#bai-container").disableSelection();
}
function showWarningDialog(content) {
    var html = "<div class='dialog-warning'>"+
            "<div class='dialog-icon'><i class='fa fa-exclamation-triangle' aria-hidden='true'></i></div>"+
            "<div class='dialog-content'>"+content+"</div>"+
        "</div>"
    $(html).dialog({
        buttons: [
            {
                text: "Ok",
                // icons: {
                //     primary: "ui-icon-heart"
                // },
                click: function() {
                    $( this ).dialog( "close" );
                }

                // Uncommenting the following line would hide the text,
                // resulting in the label being used as a tooltip
                //showText: false
            }
        ]
    });
}
function CreateBai(container){
    // if(baiDaLuu != true){
    //      // var e = $($('template#dialog').prop('content')).find('.dialog-warning').clone();
    //      // e.dialog();
    //     //$('<div class="dialog-warning"></div>').dialog();
    //     showWarningDialog('Luu bai hien tai truoc khi tao bai moi');
    //     return;
    // }
    container.empty();

    $("<div></div>", { class: 'box bai' }).bai({
        soluongbai:1,
        mode:'edit'
    }).appendTo(container);
}
function ThemBaiMoi(mode, displayMode,dataSnapShot_Bai, containerElement){
    var container;
    if(!containerElement) container = $('#bai-container');
    else container = containerElement;

    if(mode == modeThemBaiMoi.CREATE_NEW){
        $('.box.bai:last').addClass('collapse');
        $("<div></div>", { class: 'box bai' }).bai({soluongbai:soluongbai}).hide().appendTo(container).fadeIn(500);
    }
    else if(mode == modeThemBaiMoi.CREATE_WITH_DATA){
        var wgBai = $("<div></div>", { class: 'box bai' }).bai({
            id:dataSnapShot_Bai.getKey(),
            isInsertedToDatabase: true,
            path: 'tb_bai/' + dataSnapShot_Bai.getKey(),
            soluongbai:soluongbai,
            mode:displayMode
        }).appendTo(container)
            .bai("khoiTaoVoiDulieuTuDB", dataSnapShot_Bai)
    }
    soluongbai++;
    // if(noidungcosan){
    //    $("<div></div>", { class: 'box bai' }).bai({ soluongbai: soluongbai+1 }).hide().appendTo(container).bai("khoitaovoinoidungcosan", noidungcosan).fadeIn(500);
    // }
    // else{
    //     $('.box.bai:last').addClass('collapse');
    //     //baihientai = $( "<div></div>", {class:'box bai'} ).bai().appendTo(container);
    //     $("<div></div>", { class: 'box bai' }).bai({soluongbai:soluongbai+1}).hide().appendTo(container).fadeIn(500);
    // }
    

    //$('.box.bai:not(:last)').toggleClass('collapse');
    //window.scrollTo(0,document.body.scrollHeight);
    //$('html, body').animate({scrollTop:$(document).height()}, 'slow');
}
function genGuid() {
    return '4xxx-yxxx-xxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
function GetDoiTuongMenuNoiDung (lastitem) {
    if(doiTuongMenuNoiDung == null || doiTuongMenuNoiDung == undefined){
        doiTuongMenuNoiDung = $("<div></div>", {id:"menu-item-noidung"})
            .html($("template#item-noidung-menu").html());
    }

    doituongmenu.menu = doiTuongMenuNoiDung;
    doituongmenu.itemtieude = doiTuongMenuNoiDung.find('li#menu-item-tieude');
    doituongmenu.itemdoanvan = doiTuongMenuNoiDung.find('li#menu-item-doanvan');
    doituongmenu.itemhinhanh = doiTuongMenuNoiDung.find('li#menu-item-hinhanh');
    doituongmenu.itembainghe = doiTuongMenuNoiDung.find('li#menu-item-bainghe');
    doituongmenu.itemnguontailieu = doiTuongMenuNoiDung.find('li#menu-item-nguontailieu');
    doituongmenu.itemhoctuvung = doiTuongMenuNoiDung.find('li#menu-item-hoctuvung');

    // if(lastitem != null || lastitem != undefined){
    //     doituongmenu.itemtieude.off().on('click', function () {
    //         themItemNoiDung(lastitem, "TIEU_DE");
    //     });
    //     doituongmenu.itemdoanvan.off().on('click', function () {
    //         themItemNoiDung(lastitem, "DOAN_VAN");
    //     });
    //     doituongmenu.itemhinhanh.off().on('click', function () {
    //         themItemNoiDung(lastitem, "HINH_ANH");
    //     });
    //     doituongmenu.itembainghe.off().on('click', function () {
    //         themItemNoiDung(lastitem, "bainghe");
    //     });
    //     doituongmenu.itemnguontailieu.off().on('click', function () {
    //         themItemNoiDung(lastitem, "");
    //     });
    //     doituongmenu.itemhoctuvung.off().on('click', function () {
    //         themItemNoiDung(lastitem, "");
    //     });
    // }

    if(lastitem != null || lastitem != undefined){
        doituongmenu.itemtieude.off().on('click', function () {
            $("<div></div>").taoTemplateNoidung({
                type:'TIEU_DE'
            }).insertBefore(lastitem);
        });
        doituongmenu.itemdoanvan.off().on('click', function () {
            $("<div></div>").taoTemplateNoidung({
                type:'DOAN_VAN'
            }).insertBefore(lastitem);
        });
        doituongmenu.itemhinhanh.off().on('click', function () {
            $("<div></div>").taoTemplateNoidung({
                type:'HINH_ANH'
            }).insertBefore(lastitem);
        });
        doituongmenu.itembainghe.off().on('click', function () {
            themItemNoiDung(lastitem, "bainghe");
        });
        doituongmenu.itemnguontailieu.off().on('click', function () {
            themItemNoiDung(lastitem, "");
        });
        doituongmenu.itemhoctuvung.off().on('click', function () {
            themItemNoiDung(lastitem, "");
        });
    }




    return doituongmenu.menu;
}
function themItemNoiDung(lastItem, type) {
    switch (type) {
        case "TIEU_DE":
            $("<div></div>").noidungdebai_tieude().hide().insertBefore(lastItem).show(200);
            break;
        case "DOAN_VAN":
            $("<div></div>").noidungdebai_doanvan().hide().insertBefore(lastItem).show(200);
            break;
        case "HINH_ANH":
            $("<div></div>").noidungdebai_hinhanh().hide().insertBefore(lastItem).show(200);
            break;
        case "bainghe":
            console.log("Cherries are $3.00 a pound.");
            break;
        case "nguontailieu":
        case "hoctuvung":
            console.log("Mangoes and papayas are $2.79 a pound.");
            break;
        default: break;
    }
    //baihientai.bai("closemenu");
    if(cur_containershowmenu && cur_containershowmenu.find(GetDoiTuongMenuNoiDung()).length > 0){
        cur_containershowmenu.find(GetDoiTuongMenuNoiDung()).remove();
    }
}
function ThemCauHoi(addbutton, pStt, noidung) {
    $('.box.cauhoi:last').addClass("collapse");
    if(noidung){
        $("<div></div>", {class:"box cauhoi"}).taocauhoi({stt:pStt, noidungcosan:noidung}).hide().appendTo(addbutton).show(500);
    }
    else{
        $("<div></div>", {class:"box cauhoi"}).taocauhoi({stt:pStt}).hide().appendTo(addbutton).show(500);
    }
    cauhoiCount++;
}
function openWindowWithPostRequest(jsonData) {
    var winName='MyWindow';
    var winURL='http://localhost:3000/xemthu';
    var windowoption='resizable=yes,height=600,width=800,location=0,menubar=0,scrollbars=1';
    var params = { 'param1' : '1','param2' :'2'};
    var form = document.createElement("form");

    form.setAttribute("method", "post");
    form.setAttribute("action", winURL);
    form.setAttribute("target",winName);
    var input = document.createElement('input');
    input.type = 'hidden';
    input.name = "txtData";
    input.value = jsonData;
    form.appendChild(input);

    // for (var i in params) {
    //     if (params.hasOwnProperty(i)) {
    //         var input = document.createElement('input');
    //         input.type = 'hidden';
    //         input.name = i;
    //         input.value = params[i];
    //         form.appendChild(input);
    //     }
    // }
    // form.onsubmit = function (e) {
    //     e.preventDefault();
    // };
    document.body.appendChild(form);
    window.open('', winName,windowoption);
    form.target = winName;
    form.submit();
    document.body.removeChild(form);
}
function showPopup(jsonData) {
    var winName='MyWindow';
    var winURL='test.html';
    var windowoption='resizable=yes,height=600,width=800,location=0,menubar=0,scrollbars=1';
    var popup = window.open('', winName,windowoption);
    popup.json = jsonData;
}
function sapxeplaisothutubai () {
    $('#bai-container .box.bai').each(function (index) {
        $(this).find('.box-title.bai  > .box-title-icon').text(index+1);
        $(this).find('.box-title.bai  > .box-title-text').text("Bài #" + (index+1));
    });
}
function sapxeplaisothutucauhoi() {
    $('.box-title.cauhoi').each(function (i) {
        $(this).find('.box-title-text').text("Câu hỏi #" + (i+1));
    });
}
function getQueryParams(qs) {
    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}
function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
function createSwitchButton(){
    $('input[name="ckbPublic"]').switchButton({
        on_label: 'PUBLIC',
        off_label: 'UN-PUBLIC',
        labels_placement: "left",
        show_labels:true
    });
}
function getLatexFromText(str){
    var arrLatex = [];
    var startLatex = false;
    var latex = '';
    for (var i = 0, len = str.length; i < len; i++) {
        var s1 = str[i];
        if(startLatex === false){
            if(str[i] == '$' && str[i+1] == '$'){
                startLatex = true;
                i+=1;
                continue;
            }
        }
        if(startLatex === true){
            if(str[i] != '$'){
                latex += str[i];
            }
            if(str[i] == '$' && str[i+1] == '$'){
                startLatex = false;
                arrLatex.push(latex);
                latex = '';
                i+=1;
            }
        }
    }
    return arrLatex;
}
function GennerateSoThuTuBai() {
    return $('#bai-container').find('.box.bai').length + 1;
}
function openBaiEditor () {
    $('#panelEditBai').addClass('open');
    $('#bai-container').addClass('close');
}
function closeBaiEditor () {
    $('#panelEditBai').removeClass('open');
    $('#bai-container').removeClass('close');
}
function test123(){
    console.log('test....');
}
function loadBaiEditor(id, containerElement) {
    select_item('tb_bai/'+ id, function (data) {
        ThemBaiMoi(modeThemBaiMoi.CREATE_WITH_DATA, 'edit',data, containerElement);
    });
}