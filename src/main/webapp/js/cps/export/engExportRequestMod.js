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
		$("#startNum").val(d.content[0].startNum);
		$("#startPoNo").val(d.content[0].startPoNo);
		$("#startReferenceNo1").val(d.content[0].startReferenceNo1);
		$("#startIssueContent").val(d.content[0].startIssueContent);
		$("#startCompensationYn").val(d.content[0].startCompensationYn);
		$("#startLocation").val(d.content[0].startLocation);
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
			if(!confirm("Do you want to save?")) return;
			if($("#startNum").val()==""){
				alert("Insert Invoice No.");
				return;
			}
			break;
		default :
			alert("loading.");
			return;
	}

	try{
		if(status=='modify'){
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
					if(confirm("Same Invoice No. Do you want to save?")){
						var url 	= "../apis/customs/modifyRequest",
							params 	= $("#frm1").serializeObject(),
							type 	= "POST";

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

					sendAjax(url, params, type, function(d){
						opener.refrashAction();
						window.close();
					});
				}
			});
		}
	}catch (e){
		alert("Error\n" + e.message);
		progress.hide();
	}
};