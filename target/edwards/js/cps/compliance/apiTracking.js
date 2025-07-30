$(document).ready(function(){
	if(!isEmpty($("#aa").val())){
		parent.document.frm1.check.value 	= "E";
	}else{
		parent.document.frm1.cargo.value 	= $("#cargMtNo").val();
		parent.document.frm1.banip.value 	= $("#prcsDttm").val().substr(0,8);
		parent.document.frm1.jangchic.value = $("#shedSgn").val();
		parent.document.frm1.jangchin.value = $("#shedNm").val();
	}
});