/**
 * Created by Admin on 3/21/2017.
 */

function bai_insert(idChuyende, objBai, callback) {
    $.ajax({
        type: "POST",
        data: JSON.stringify(objBai),
        url: "../api/query/InsertBai",
        contentType: "application/json"
    }).done(function(res) {
        console.log('insert success', res);
        callback(res)
    });
}