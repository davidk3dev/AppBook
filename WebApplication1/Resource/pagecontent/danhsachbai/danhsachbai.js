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
var testStr = "";

//------------DEFINE CLASS, ENUM--------------
let noidungwidget = function () {
    this.ketqua = true;
    this.errorMsg = '';
    this.noidung = {};
}
function Bai() {
    this.id_bai = 1;
    this.id_chuyende = 1;
    this.ngay_tao = '';
    this.xuat_ban = false;
    this.thu_tu = 0;
    this.bai_mau = false;
    this.ds_noidungdebai = [];
    this.ds_cauhoi = [];
}
function CauHoi(){
    this.id_cauhoi = 0;
    this.id_bai = 0;
    this.thu_tu = 0;
    this.ngay_tao = '';
    this.xuat_ban = false;
    this.loai_cau_hoi = '';
    this.phuongthuc_check_dapan = '';
    this.gia_tri_dung = '';
    this.ds_dapan = [],
    this.ds_noidungcauhoi = [],
    this.ds_chuthich = []
}
function DapAn(){
    this.id_dapan = 0;
    this.id_cauhoi = 0;
    this.loai_dap_an = '';
}
function DapAn_SingleChoice() {
    this.noi_dung = '';
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
    this.gia_tri = '';
    this.noidung_hienthi = '';
    this.vi_tri_dung = '';
}
function DapAn_ViTri() {
    this.noi_dung_hien_thi = '';
    this.vi_tri_dung = '';
}
function TemplateNoidung(){
    this.loai_template = '';
    this.template_noidung_text = {};
    this.template_noidung_hinhanh = {};
}
function TemplateNoidungText() {
    this.translate = false;
    this.noi_dung = '';
}
function TemplateNoidungHinhAnh() {
    this.url = '';
}

var modeThemBaiMoi = {
    CREATE_NEW: 'CREATE_NEW',
    CLONE_TEMPLATE: 'CLONE',
    CREATE_WITH_DATA: 'CREATE_WITH_DATA'
};
var loainoidung = {
    TIEU_DE: 'TIEU_DE',
    DOAN_VAN: 'DOAN_VAN',
    HINH_ANH: 'HINH_ANH'
};
var phuongthuccheckdapan = {
    VI_TRI: 'VI_TRI',
    GIATRI_TEXT: 'GIATRI_TEXT',
    GIATRI_TOAN: 'GIATRI_TOAN'
};
var loaicauhoi = {
    SINGLE_CHOICE: 'SINGLE_CHOICE',
    ANIMATION_SAPXEP: 'ANIMATION_SAPXEP',
    ANIMATION_DANHDAU: 'ANIMATION_DANHDAU',
    DIEN_TEXT: 'DIEN_TEXT'
};



$(function () {
    $(".ui-layout-west").myresizable({
        handleSelector: "#uiLeftSpliter",
        resizeHeight: false
    });
    $('#uiLeftSpliterHandle').click(function () {
        $('.ui-layout-west').toggleClass('ui-layout-close');
    });

    //for (i = 0; i < 50; i++) {
    //loaddanhsachbai_trongchuyende(3);
        
    
})
$(document).on('click', function (event) {
    if (!$(event.target).closest('.button-add-item').length) {
        if (cur_containershowmenu!==undefined) {
            if (cur_containershowmenu.find(GetDoiTuongMenuNoiDung()).length > 0) {
                cur_containershowmenu.find(GetDoiTuongMenuNoiDung()).remove();
            }
        }
    }
    if (!$(event.target).closest('.btnMoreActions').length) {
        $('.btnMoreActions').find('.more-actions-menu').removeClass('show');
    }
    $("#submenu-quanlythuvien").menu();
});

function loaddanhsachbai_trongchuyende(idchuyende) {
    $.get("../api/query/GetBaiByChuyenDe?idChuyende=3", function (data) {
        $('#loadingScreen').show();

        data.forEach(function (itemBai, index) {
            $('<div class="box-bai-preview"></div>').taobaiDisplay({
                id:itemBai.id_bai,
                sothutu:index,
                data:itemBai
            }).appendTo($('#bai-container'));
        });
        
    }).done(function () {
        $('#loadingScreen').hide();
    });
}
function postRequestInsertBai(callback) {
    var bai = {
        id_chuyende: 3,
        ngay_tao: getCurrentDate(),
        xuat_ban: 0,
        thu_tu: 5,
        bai_mau: 0,
        dsNoidungdebai:
        [{
            id_template: 2,
            loaiTemplate: 'TEXT',
            noidung: 'cong trinh dang thi cong cong',
            ckEditorFormat: 'format',
            width: '300px',
            height: '200px',
            aligment: 'center'
        }]
    }
    bai_insert(1, bai, callback(res));
    // $.ajax({
    //     type: "POST",
    //     data: JSON.stringify(bai),
    //     url: "../api/query/InsertBai",
    //     contentType: "application/json"
    // }).done(function (res) {
    //     callback(res);
    // });
}
function loadEditor(data) {
    if (data) {

    }
    else {
        $('<div class="box bai"></div>').bai()
        .appendTo($('#editor-container'));
    }
}

function GetDoiTuongMenuNoiDung(lastitem) {
    if (doiTuongMenuNoiDung === null || doiTuongMenuNoiDung === undefined) {
        doiTuongMenuNoiDung = $("<div></div>", { id: "menu-item-noidung" })
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

    if (lastitem != null || lastitem != undefined) {
        //doituongmenu.itemtieude.off().on('click', function () {
        //    $("<div></div>").taoTemplateNoidung({
        //        type: 'TIEU_DE'
        //    }).insertBefore(lastitem);
        //});
        doituongmenu.itemdoanvan.off().on('click', function () {
            $("<div></div>").taoTemplateNoidung({
                type: 'TEXT'
            }).insertBefore(lastitem);
        });
        doituongmenu.itemhinhanh.off().on('click', function () {
            $("<div></div>").taoTemplateNoidung({
                type: 'HINH_ANH'
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
function getCurrentDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = yyyy + '-' + mm + '-' + dd;
    return today;
}
function ThemCauHoi(addbutton, pStt, noidung) {
    $('.box.cauhoi:last').addClass("collapse");
    if (noidung) {
        $("<div></div>", { class: "box cauhoi" }).taocauhoi({ stt: pStt, noidungcosan: noidung }).hide().appendTo(addbutton).show(500);
    }
    else {
        $("<div></div>", { class: "box cauhoi" }).taocauhoi({ stt: pStt }).hide().appendTo(addbutton).show(500);
    }
    cauhoiCount++;
}
function sapxeplaisothutubai() {
    $('#bai-container .box.bai').each(function (index) {
        $(this).find('.box-title.bai  > .box-title-icon').text(index + 1);
        $(this).find('.box-title.bai  > .box-title-text').text("Bài #" + (index + 1));
    });
}
function sapxeplaisothutucauhoi() {
    $('.box-title.cauhoi').each(function (i) {
        $(this).find('.box-title-text').text("Câu hỏi #" + (i + 1));
    });
}
function createSwitchButton() {
    $('input[name="ckbPublic"]').switchButton({
        on_label: 'PUBLIC',
        off_label: 'UN-PUBLIC',
        labels_placement: "left",
        show_labels: true
    });
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