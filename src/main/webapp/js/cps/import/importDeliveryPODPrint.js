function selectPodList(){
    var url = "../apis/customs/selectImportDeliveryRequestList",
        params = {
            "deliveryRequestKey": $('#deliveryRequestKey').val(),
            "useYn"				: "Y",
            "_pageRow"			: 10,
			"_pageNumber"		: 0,
			"size"				: 10,
			"page"				: 0
        },
        type = "POST";

    sendAjax(url, params, type, function (d) {
        $('#customerKey').html("운송장번호 : " + d.content[0].customerKey + " / " + d.content[0].singoNo.substr(0,5)+"-"+d.content[0].singoNo.substr(5,2)+"-"+d.content[0].singoNo.substr(7,7));
        $('#requestCoName').html(d.content[0].requestCoName);
        $('#requestMan').html(d.content[0].requestMan + " / " + d.content[0].assignMan);
        $('#requestPhone').html(d.content[0].requestPhone);
        $('#deliveryCarryingInName').html(d.content[0].deliveryCarryingInName);
        $('#deliveryCarryingInAddr').html(d.content[0].deliveryCarryingInAddr);
        var contact = isEmpty(d.content[0].deliveryCarryingInEmail) ? d.content[0].deliveryCarryingInPhone : d.content[0].deliveryCarryingInPhone + "(" + d.content[0].deliveryCarryingInEmail + ")";
        $('#deliveryCarryingInPhone').html(contact);
        $('#requestNote').html(d.content[0].requestNote);
        var singoDay = d.content[0].singoDate;
        $('#suirDate').html(isEmpty(singoDay) ? "" : singoDay.substr(0,4)+"-"+singoDay.substr(4,2)+"-"+singoDay.substr(6,2));
        $('#hblNo').html(d.content[0].hblNo);
        $('#deliveryPojangSu').html(d.content[0].deliveryPojangSu);
        $('#deliveryPojangDanwi').html(d.content[0].deliveryPojangDanwi);
        $('#deliveryJung').html(d.content[0].deliveryJung);
        $('#deliveryJungDanwi').html(d.content[0].deliveryJungDanwi);
        $('#cargoSize').html(d.content[0].cargoSize);
        $('#banipPlace').html(d.content[0].banipPlace);

        setTimeout(function () {
            window.print();
        }, 500);
    });
}

$(document).ready(function(){
    selectPodList();
});