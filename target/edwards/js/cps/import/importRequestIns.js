$(document).ready(function(){
	if($('#startTaxpayerNum').val() == "all"){
		alert("셋팅 페이지에서 사업자를 선택하세요.");
		window.close();
	}else{
		$(function(){
			$('#masterGrid').datagrid({
				title			: 'Import Request',
				width			: '100%',
				height			: '200px',
				rownumbers		: true,
				singleSelect	: true,
				fitColumns		: true,
				autoRowHeight	: false,
				pagination		: true,
				onClickCell		: onClickCell,
				pageSize		: 50,
				columns			: [[
	                {field:'startNum',title:'B/L No.',width:100},
	                {field:'startReferenceNo1',title:'refNo1',width:100},
	                {field:'startReferenceNo2',title:'refNo2',width:100},
	                {field:'startIssueContent',title:'issue',width:120},
	                {field:'startPoNo',title:'Po No',width:100,align:'center'}
		        ]]
			});
			$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
	    });

		$("#frm1 #startNum").bind("keyup", function (e){
		    if (e.which >= 97 && e.which <= 122) {
		        var newKey = e.which - 32;
		        e.keyCode = newKey;
		        e.charCode = newKey;
		    }

		    $("#frm1 #startNum").val(($("#frm1 #startNum").val()).toUpperCase());
		});
	}
});

var fn_saveAction = function(status){
	switch(status) {
		case 'insert':
			if(!confirm("[저장] 하시겠습니까?")) return;
			if($("#startNum").val()==""){
				alert("B/L No를 넣으세요.");
				return;
			}
			break;
		default :
			alert("구현중입니다.");
			return;
	}

	try {
		if (status=='insert'){
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
				console.log(d);
				if(d.content.length > 0){
					if(confirm("같은 B/L No가 존재합니다. 그래도 저장하시겠습니까?")){
						var params 	= $("#frm1").serializeObject(),
							url 	= "../apis/customs/saveRequest",
							type 	= "POST";

						sendAjax(url, params, type, function(dd) {
							opener.fn_searchAction();
							window.close();
						});
					}
				}else{
					var params 	= $("#frm1").serializeObject(),
						url 	= "../apis/customs/saveRequest",
						type 	= "POST";

					params["startNum"] = $("#startNum").val().replace(/ /gi, "");

					sendAjax(url, params, type, function(dd) {
						opener.fn_searchAction();
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

var delRowContacts = function(){
	if (editIndex == undefined){return}
    $('#masterGrid').datagrid('deleteRow', editIndex);
    editIndex = undefined;
}

function fn_updateAction(){
	var rows = $('#masterGrid').datagrid('getRows');
	if(rows.length < 1){
		alert("저장할 항목이 없습니다.");
		return;
	}
	var params1 = "";
    for(var i = 0; i < rows.length; i++){
    	params1 += rows[i].startNum+","
    }

	var aa = params1.length - 1;
	params1 = params1.substr(0, aa);

	var url 	= "../apis/customs/selectRequestList",
		params 	= {
			"inStartNum" 	: params1,
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
				for (var i = 0; i < rows.length; i++) {
			        var url = "../apis/customs/saveRequest",
					    params = {
				        	"startGubun" 			: "IMPORT",
				        	"startJisaCode" 		: $("#frm1 #startJisaCode").val(),
				        	"startTaxpayerTradeName": $("#frm1 #startTaxpayerTradeName").val(),
				        	"startTaxpayerNum" 		: $("#frm1 #startTaxpayerNum").val(),
				        	"startNum" 				: rows[i].startNum,
				        	"startReferenceNo1" 	: rows[i].startReferenceNo1,
				        	"startReferenceNo2" 	: rows[i].startReferenceNo2,
				        	"startIssueContent" 	: rows[i].startIssueContent,
				        	"startPoNo" 			: rows[i].startPoNo,
				            "startNote"				: "",
				            "startCompensationYn"	: "",
				            "startLocation"			: "",
				            "useYn"					: "Y",
				            "addUserId"				: $("#frm1 #addUserId").val(),
				            "addUserNm"				: $("#frm1 #addUserNm").val()
					    },
					    type = "POST";
					sendAjax(url, params, type, function (d){
					});
			    }

			    setTimeout(function () {
			    	opener.fn_searchAction();
					window.close();
			    }, 500);
			}
		}else{
			for (var i = 0; i < rows.length; i++) {
		        var url = "../apis/customs/saveRequest",
				    params = {
		        		"startGubun" 			: "IMPORT",
			        	"startJisaCode" 		: $("#frm1 #startJisaCode").val(),
			        	"startTaxpayerTradeName": $("#frm1 #startTaxpayerTradeName").val(),
			        	"startTaxpayerNum" 		: $("#frm1 #startTaxpayerNum").val(),
			        	"startNum" 				: rows[i].startNum,
			        	"startReferenceNo1" 	: rows[i].startReferenceNo1,
			        	"startReferenceNo2" 	: rows[i].startReferenceNo2,
			        	"startIssueContent" 	: rows[i].startIssueContent,
			        	"startPoNo" 			: rows[i].startPoNo,
			            "startNote"				: "",
			            "startCompensationYn"	: "",
			            "startLocation"			: "",
			            "useYn"					: "Y",
			            "addUserId"				: $("#frm1 #addUserId").val(),
			            "addUserNm"				: $("#frm1 #addUserNm").val()
				    },
				    type = "POST";
				sendAjax(url, params, type, function (d){
				});
		    }

		    setTimeout(function () {
		    	opener.fn_searchAction();
				window.close();
		    }, 500);
		}
	});
}

var fn_sampleAction = function(){
    document.location.href="../images/common/impoRequestSample.xlsx";
}