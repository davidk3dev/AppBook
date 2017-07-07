/**
 * Created by Nhan on 1/18/2017.
 */
function getCurrentDateTime() {
    return new Date(new Date().getTime()).toLocaleString();
}
function openAddressInNewPopup(path) {
    var winName = 'MyWindow';
    var winURL = path;
    var windowoption = 'resizable=yes,height=600,width=800,location=0,menubar=0,scrollbars=1';
    window.open(winURL, winName, windowoption);
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
// function genGuid() {
//     return '4xxx-yxxx-xxx'.replace(/[xy]/g, function (c) {
//         var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
//         return v.toString(16);
//     });
// }