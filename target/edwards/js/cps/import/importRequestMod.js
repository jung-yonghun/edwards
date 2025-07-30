$(document).ready(function(){
	var url 	= "../apis/customs/selectRequestList",
		params 	= {
			"startKey" 		: $("#startKey").val(),
			"size" 			: "100000",
			"page" 			: "0",
			"_pageRow" 		: "100000",
			"_pageNumber" 	: "0",
			"useYn" 		: "Y"
		},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		console.log(d.content[0]);
		$("#startNum").val(d.content[0].startNum);
		$("#startPoNo").val(d.content[0].startPoNo);
		$("#startReferenceNo1").val(d.content[0].startReferenceNo1);
		$("#startIssueContent").val(d.content[0].startIssueContent);
	});

	$("#frm1 #startNum").bind("keyup", function (e){
	    if(e.which >= 97 && e.which <= 122){
	        var newKey = e.which - 32;
	        e.keyCode = newKey;
	        e.charCode = newKey;
	    }

	    $("#frm1 #startNum").val(($("#frm1 #startNum").val()).toUpperCase());
	});

	if($("#fileCnt").val() > 0){
		$("input[name=startNum]").attr("readonly",true);
	}
});

var fn_saveAction = function(status){
	switch(status){
		case 'modify':
			if(!confirm("[저장] 하시겠습니까?")) return;
			if($("#startNum").val()==""){
				alert("B/L No를 넣으세요.");
				return;
			}
			break;
		case 'mailTransfer':
            if (!confirm("담당자에게 메일을 전송 하시겠습니까?")) return;
            if ($("#startNum").val() == "") {
            	alert("B/L No를 넣으세요.");
                return;
            }
            break;
		default :
			alert("구현중입니다.");
			return;
	}

	try{
		if(status=='modify' || status == 'mailTransfer'){
			var url 	= "../apis/customs/selectRequestList",
				params 	= {
					"startNum" 		: $("#startNum").val().replace(/ /gi, ""),
					"size" 			: "100000",
					"page" 			: "0",
					"_pageRow" 		: "100000",
					"_pageNumber" 	: "0",
					"useYn" 		: "Y"
				},
				type 	= "POST";

			sendAjax(url, params, type, function(d){
				if(d.content.length > 0){
					if(confirm("같은 B/L No가 존재합니다. 그래도 저장하시겠습니까?")){
						var url 	= "../apis/customs/modifyRequest",
							params 	= $("#frm1").serializeObject(),
							type 	= "POST";

						if (status == 'mailTransfer') {
                            params["_isMailYn"] = "Y";
                        }

						sendAjax(url, params, type, function(d){
							opener.refrashAction();
							window.close();
						});
					}
				}else{
					var url 	= "../apis/customs/modifyRequest",
						params 	= $("#frm1").serializeObject(),
						type 	= "POST";

					params["startNum"] = $("#startNum").val().replace(/ /gi, "");

					if (status == 'mailTransfer') {
                        params["_isMailYn"] = "Y";
                    }

					sendAjax(url, params, type, function(d){
						opener.refrashAction();
						window.close();
					});
				}
			});
		}
	}catch (e){
		alert("에러가 발생했습니다\n" + e.message);
		progress.hide();
	}
};