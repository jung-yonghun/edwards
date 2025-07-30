$(document).ready(function(){
	if($("#deliveryCarKey").val() != ""){
        var url 	= "../apis/customs/selectImportDeliveryCarList",
            params 	= {
                "deliveryCarKey"	: $("#deliveryCarKey").val(),
                "_pageRow"			: 10,
				"_pageNumber"		: 0,
				"size"				: 10,
				"page"				: 0
            },
            type 	= "POST";

        sendAjax(url, params, type, function(d){
            progress.hide();
            $("#deliveryCarName").val(d[0].deliveryCarName);
            $("#deliveryCarPhone").val(d[0].deliveryCarPhone);
            $("#deliveryCarNum").val(d[0].deliveryCarNum);
            $("#useYn").val(d[0].useYn);
        });
    }
});

var fn_saveAction = function (status) {
    switch (status) {
        case 'insert':
            if(document.frm1.deliveryCarName.value == ""){
                document.frm1.deliveryCarName.focus();
                alert("기사명을 입력하세요.");
                return;
            }else if(document.frm1.deliveryCarPhone.value == ""){
                document.frm1.deliveryCarPhone.focus();
                alert("기사 연락처를 입력하세요.");
                return;
            }else if(document.frm1.deliveryCarNum.value == ""){
                document.frm1.deliveryCarNum.focus();
                alert("차량번호를 입력하세요");
                return;
            }else{
                if (!confirm("[저장] 하시겠습니까?")) return;
            }
            break;
        default :
            alert("구현중입니다.");
            return;
    }

    try{
        if(status == 'insert'){
            var url 	= "../apis/customs/saveImportDeliveryCarList",
            	params 	= $("#frm1").serializeObject(),
                type 	= "POST";

            sendAjax(url, params, type, function(d){
                fn_backAction();
            });
        }
    }catch(e){
        alert("에러가 발생했습니다\n" + e.message);
        progress.hide();
    }
};

var fn_backAction = function(){
    document.location.href = "./importDeliveryCarList.cps?deliveryCoKey=" + $('#deliveryCoKey').val();
};