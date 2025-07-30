var fn_saveItem = function(){
	if($('#frm1 #codeName').val()==''){
		alert("Item No를 입력하세요.");
		return;
	}else if($('#frm1 #engName').val()==''){
		alert("영문명을 입력하세요.");
		return;
	}else{
		var url 	= "../apis/compliance/insertModel",
			params 	= $("#frm1").serializeObject(),
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			alert("등록 되었습니다.");
			window.close();
		});
	}
};