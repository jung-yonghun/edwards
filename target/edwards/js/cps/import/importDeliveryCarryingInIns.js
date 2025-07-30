$(document).ready(function(){
	if($("#deliveryCarryingInKey").val() != ""){
        var url 	= "../apis/customs/selectImportDeliveryCarryingInList",
            params 	= {
                "deliveryCarryingInKey"	: $("#deliveryCarryingInKey").val(),
                "_pageRow"				: 10,
				"_pageNumber"			: 0,
				"size"					: 10,
				"page"					: 0
            },
            type 	= "POST";

        sendAjax(url, params, type, function(d){
            progress.hide();
            $("#deliveryCarryingInName").val(d.content[0].deliveryCarryingInName);
            $("#deliveryCarryingInTaxNum").val(d.content[0].deliveryCarryingInTaxNum);
            $("#deliveryCarryingInMan").val(d.content[0].deliveryCarryingInMan);
            $("#deliveryCarryingInPhone").val(d.content[0].deliveryCarryingInPhone);
            $("#deliveryCarryingInEmail").val(d.content[0].deliveryCarryingInEmail);
            $("#deliveryCarryingInFax").val(d.content[0].deliveryCarryingInFax);
            $("#deliveryCarryingInMobile").val(d.content[0].deliveryCarryingInMobile);
            $("#deliveryCarryingInAddr").val(d.content[0].deliveryCarryingInAddr);
            $("#useYn").val(d.content[0].useYn);
        });
    }
});

var fn_saveAction = function (status) {
    switch (status) {
        case 'insert':
            if(document.frm1.deliveryCarryingInName.value == ""){
                document.frm1.deliveryCarryingInName.focus();
                alert("착지명을 입력하세요");
                return;
            }else if(document.frm1.deliveryCarryingInTaxNum.value == ""){
                document.frm1.deliveryCarryingInTaxNum.focus();
                alert("사업자번호가 셋팅되지 않았습니다(10자리, -제외)");
                return;
            }else if($("#deliveryCarryingInTaxNum").val().length != 10){
                document.frm1.deliveryCarryingInTaxNum.focus();
                alert("사업자번호는 10자리만 입력가능합니다(-제외)");
                return;
            }else if(document.frm1.deliveryCarryingInAddr.value == ""){
                document.frm1.deliveryCarryingInAddr.focus();
                alert("착지주소를 입력하세요");
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
            var url 	= "../apis/customs/saveImportDeliveryCarryingInList",
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
    document.location.href = "./importDeliveryCarryingInList.cps?Ctype=" + $('#Ctype').val();
};

var fn_newAction = function(){
	$("#deliveryCarryingInKey").val("");
    $("#frm1").each(function(){
        this.reset();
    });
};