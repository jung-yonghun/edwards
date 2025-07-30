$(document).ready(function(){
	if(isEmpty($('#userKey').val())){
		parent.document.location.href="../logout.cps";
	}else{
		var url 	= "../selectUserInfo",
			params 	= {"userKey" : $("#userKey").val()},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			document.location.href = "https://sas.customspass.com/statistics/exportCategoryStatistics_EN.sas?userKey="+d.userKey+"&authKey="+d.apiKey;
		});
	}
});