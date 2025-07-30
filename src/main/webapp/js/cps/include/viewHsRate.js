var console = window.console || {log:function(){}};
var sIds;

$(document).ready(function(){
	var hs1 = $('#hscode').val().substr(0,4);
	var hs2 = $('#hscode').val().substr(4,2);
	var hs3 = $('#hscode').val().substr(6,2);
	var hs4 = $('#hscode').val().substr(8,2);

	var params 	= {"hs1":hs1, "hs2":hs2, "hs3":hs3, "hs4":hs4, "useYn":"Y", "_pageRow":1000, "_pageNumber":0, "size":1000, "page":0};
	var url 	= "../apis/cmmnCode/selectSooMstCdHsMstList",
		type 	= "POST";

	sendAjax(url, params, type, function(d) {
		if(!d) return;
		if(d.content[0].hs2=="" && d.content[0].hs3==""){
			$("#hsnum").val(d.content[0].hs1);
		}else if(d.content[0].hs2!="" && d.content[0].hs3==""){
			$("#hsnum").val(d.content[0].hs1+"."+d.content[0].hs2);
		}else{
			$("#hsnum").val(d.content[0].hs1+"."+d.content[0].hs2+"-"+d.content[0].hs3+""+d.content[0].hs4);
		}
		$("#unit").html(d.content[0].hsWeiUnit+" / "+d.content[0].hsQtyUnit);
		$("#hsNmHan").html(d.content[0].hsNmHan);
		$("#hsNmEng").html(d.content[0].hsNmEng);
	});

	setTimeout(function () {
		//var hs 		= $("#hsnum").val().replace('.','').replace('-','');
		var hs 	= $('#hscode').val();
		if(hs.length < 10){
			$("#hsmate1").html("");
			$("#hsmate2").html("");
			$("#hsmate3").html("");
			$("#hsmate4").html("");
		}else{
			fn_changeYear(parseInt(new Date().getFullYear()));

			var url2 	= "../apis/cmmnCode/selectCdHsMate1List",
				params2 = {"hscode":hs, "imextpcd":"2", "useYn":"Y", "_pageRow":1000, "_pageNumber":0, "size":1000, "page":0},
				type2 	= "POST";

			sendAjax(url2, params2, type2, function(d){
				var contents = "";
				for(var i = 0; i < d.content.length; i++){
					if(d.content[i].hslaw == ""){
						contents += d.content[i].hsdesc +"<br><br>";
					}else{
						contents += "["+ d.content[i].hslaw +"]<br>"+ d.content[i].hsdesc +"<br><br>";
					}

				}
				$("#hsmate1").html(contents);
			});

			var url3 	= "../apis/cmmnCode/selectCdHsMate2List",
				params3	= {"hscode":hs, "imextpcd":"2", "useYn":"Y", "_pageRow":1000, "_pageNumber":0, "size":1000, "page":0},
				type3 	= "POST";

			sendAjax(url3, params3, type3, function(d){
				console.log(d.content);
				var contents1 = "";
				for(var i = 0; i < d.content.length; i++){
					contents1 += d.content[i].hsdesc +"<br><br>";
				}
				$("#hsmate2").html(contents1);
			});

			var url4 	= "../apis/cmmnCode/selectCdHsMate1List",
				params4 = {"hscode":hs, "imextpcd":"1", "useYn":"Y", "_pageRow":1000, "_pageNumber":0, "size":1000, "page":0},
				type4 	= "POST";

			sendAjax(url4, params4, type4, function(d){
				var contents = "";
				for(var i = 0; i < d.content.length; i++){
					if(d.content[i].hslaw == ""){
						contents += d.content[i].hsdesc +"<br><br>";
					}else{
						contents += "["+ d.content[i].hslaw +"]<br>"+ d.content[i].hsdesc +"<br><br>";
					}

				}
				$("#hsmate3").html(contents);
			});

			var url5 	= "../apis/cmmnCode/selectCdHsMate2List",
				params5	= {"hscode":hs, "imextpcd":"1", "useYn":"Y", "_pageRow":1000, "_pageNumber":0, "size":1000, "page":0},
				type5 	= "POST";

			sendAjax(url5, params5, type5, function(d){
				console.log(d.content);
				var contents1 = "";
				for(var i = 0; i < d.content.length; i++){
					contents1 += d.content[i].hsdesc +"<br><br>";
				}
				$("#hsmate4").html(contents1);
			});
		}
	}, 200);
});

function fn_changeYear(aa){
	var params1 = {"hsCode":$('#hscode').val(), "useYn":"Y", "_pageRow":1000, "_pageNumber":0, "size":1000, "page":0, "hsDtStart":aa};
	var url1 	= "../apis/cmmnCode/selectSooMstCdHsRateWithTrrtTpcdList",
		type1 	= "POST";

	sendAjax(url1, params1, type1, function(d) {
		var aa  = "";
		var bb  = "";
		for(var i=0;i<d.content.length;i++){
			if(d.content[i].CD.length > 3){
				bb += d.content[i].CD_DESC+"("+d.content[i].CD+") : <font color=blue>"+d.content[i].HsRatePercent+"%</font><br>";
			}else{
				aa += d.content[i].CD_DESC+"("+d.content[i].CD+") : <font color=blue>"+d.content[i].HsRatePercent+"%</font><br>";
			}
		}
		$("#aa").html(aa);
		$("#bb").html(bb);
	});
}

var keyDown = function(){
    if(event.keyCode == 13) fn_change();
};

function fn_change(){
	document.location.href = "./viewHsRate.cps?hscode="+$("#hscode").val()+"&hsDt="+$("#hsDtStart").val();
}

function fn_data(){
	document.location.href = "./viewHScode.cps?hsSgn="+$("#hscode").val();
}