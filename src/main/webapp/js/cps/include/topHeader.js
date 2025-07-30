$(document).ready(function(){
	if(isEmpty($('#USERGRADEB').val())){
		parent.document.location.href="../logout.cps";
	}else{
		$(".inner").css("display","block");
		var url 	= "../selectUserInfo",
			params 	= {"userKey" : $("#userKey").val()},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			if(!d) return;
			$("#setMenu").val(d.setMenu);
		});

		var url 	= "../apis/system/selectSysMenuList",
			params 	= {"userKey" : $("#userKey").val()},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			if(!d) return;
			for(var i=0;i<d.length;i++){
				if(d[i].sortOrder=="6500"){
					if($("#userMenu").val()=="E"){
						$('#btn2E').css("display", "");
					}else{
						$('#btn2K').css("display", "");
					}
				}
				if(d[i].sortOrder=="7000"){
//					$('#btn3').css("display", "");
				}
				if(d[i].sortOrder=="7500"){
					if($("#userMenu").val()=="E"){
						$('#btn4E').css("display", "");
					}else{
						$('#btn4K').css("display", "");
					}
				}
			}

		});

		if($("#userKey").val()=="794" || $("#userKey").val()=="795"){
			$("#pop1E").css("display", "none");
			$("#pop2E").css("display", "none");
			$("#pop1K").css("display", "none");
			$("#pop2K").css("display", "none");
			$("#pop3").css("display", "none");
			$("#pop4").css("display", "none");
			$('#btn1').css("display", "none");
	    	$("#audi1").css("display", "none");
	    	$("#audi2").css("display", "none");
	    	$("#audi3").css("display", "none");
	    	$("#audi4").css("display", "none");
	    	$("#audi5").css("display", "none");
		}else{
			if($("#userMenu").val()=="E"){
				$("#pop1E").css("display", "");
				$("#pop2E").css("display", "");
				$("#pop1K").css("display", "none");
				$("#pop2K").css("display", "none");
				$("#pop3").css("display", "none");
				$("#pop4").css("display", "none");
			}else{
				$("#pop1E").css("display", "none");
				$("#pop2E").css("display", "none");
				$("#pop1K").css("display", "");
				$("#pop2K").css("display", "");
				$("#pop3").css("display", "none");
				$("#pop4").css("display", "none");
			}
		}

		if ($("#userKey").val() == 156 || $("#userKey").val() == 137 || $("#userKey").val() == 3 || $("#userKey").val() == 2) { //대표님 또는 테스트계정이면
			$("#audi1").css("display", "");
			$("#audi2").css("display", "none");
			$("#audi3").css("display", "none");
			$("#audi4").css("display", "none");
			$("#audi5").css("display", "none");
	    }else if($("#userKey").val()=="837"){
			$('#btn1').css("display", "none");
			$("#audi1").css("display", "none");
	    	$("#audi2").css("display", "none");
	    	$("#audi3").css("display", "none");
	    	$("#audi4").css("display", "none");
	    	$("#audi5").css("display", "none");
	    }else{
	    	if($('#USERGRADEB').val()=="E" || $('#USERGRADEB').val()=="G" || $('#USERGRADEB').val()=="H"){
	    		$('#btn1').css("display", "none");
	    		$('#btn2E').css("display", "none");
	    		$('#btn2K').css("display", "none");
	    		$('#btn3').css("display", "none");
	    		$('#btn4E').css("display", "none");
	    		$('#btn4K').css("display", "none");
	    	}
	    	if ($("#userTaxNo").val() == "3128112960" || $("#userTaxNo").val() == "1078163829" || $("#userTaxNo").val() == "2118671545" || $("#userTaxNo").val() == "1298123036"){ //에드워드코리아 또는 코스트코코리아, 펜디
	    		$('#btn1').css("display", "none");
	    	}
	    	$("#audi1").css("display", "none");
	    	$("#audi2").css("display", "none");
	    	$("#audi3").css("display", "none");
	    	$("#audi4").css("display", "none");
	    	$("#audi5").css("display", "none");
	    }

		if ($("#userTaxNo").val() == "3128112960"){ //에드워드코리아면
	    	$(".menu_D").css("display", "");
		}
	}

	drawYearList();
});

function fn_saveSet(){
	var url 	= "../saveSetMenu",
		params 	= {
			"userKey" : $("#userKey").val(),
			"setMenu" : $("#setMenu").val()
		},
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
		parent.document.location.href = "./main.cps";
	});
}

function addTab(title, url){
	if($('#tt').tabs('exists', title)){
    	$('#tt').tabs('select', title);
    }else{
        var content = '<iframe scrolling="auto" frameborder="0"  src="'+url+'" style="width:100%;height:100%;"></iframe>';
        $('#tt').tabs('add',{
            title:title,
            content:content,
            closable:true
        });
    }
}

var drawYearList = function(){
    var optList 	= new Array();
    var nextYear 	= parseInt(new Date().getFullYear() + 2);
    for(var i = 0; i < 5; i++){
        nextYear -= 1;
        var dd = nextYear - 1;
        optList[i] = "<option value=\"" + dd + "\">" + dd + "년</option>";
    }
    $(".menu_D #year").html(optList.join("\n"));
};

var isEmpty = function (value) {
    if (value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length )) {
        return true
    } else {
        return false
    }
};

function linkBlNo(){
    if(isEmpty($(".menu_D #mbl").val()) && isEmpty($(".menu_D #hbl").val())){
        alert("B/L No를 입력하세요.");
        return;
    }
    var url = '../include/viewTracking.cps?'
        + 'cargMtNo='
        + '&mblNo=' + $('.menu_D #mbl').val()
        + '&hblNo=' + $('.menu_D #hbl').val().trim()
        + '&blYy=' + $('.menu_D #year').val();
    if($('#tt').tabs('exists', "화물진행정보")){
    	$('#tt').tabs('close', "화물진행정보");
    	parent.addTab("화물진행정보", url);
    }else{
    	parent.addTab("화물진행정보", url);
    }
};

function linkBlNo1(){
	if(!isEmpty($(".menu_D #expDclrNo").val())){
		var url = '../include/viewExportTracking.cps?'
	        + 'expDclrNo=' + $('.menu_D #expDclrNo').val().trim().replace(/-/gi,'');
    }

	if(!isEmpty($(".menu_D #blNo").val())){
		var url = '../include/viewExportTracking1.cps?'
	        + 'blNo=' + $('.menu_D #blNo').val().trim();
    }

	if($('#tt').tabs('exists', "수출이행내역(건별)")){
    	$('#tt').tabs('close', "수출이행내역(건별)");
    	parent.addTab("수출이행내역(건별)", url);
    }else{
    	parent.addTab("수출이행내역(건별)", url);
    }
};

var fn_searchSet = function(){
    openWindowWithPost("./customerSearch.cps", "width=500, height=400, top=30, scrollbars=no, location=no, menubar=no", "customerSearch", {});
};

function fn_saveAdminComSet(){
	var url 	= "../saveSetAdmin",
		params 	= {
			"userKey" 	: $("#userKey").val(),
			"setSangho" : $("#setSangho1").val(),
			"setSaup" 	: $("#setSaup1").val(),
			"defaultDB" : $("#defaultDB").val()
		},
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
		parent.document.location.href = "./main.cps";
	});
}

function fn_saveAdminSet(){
	var url 	= "../saveSetAdmin",
		params 	= {
			"userKey" 	: $("#userKey").val(),
			"setSangho" : "",
			"setSaup" 	: "",
			"defaultDB" : "ncustoms"
		},
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
		parent.document.location.href = "./main.cps";
	});
}