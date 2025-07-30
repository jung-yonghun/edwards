var _height1 = $(window).height() * 95 /100;

function selectImpoWarehouseList(){
	progress.show();
	var url 	= "../apis/tnl/selectImpoWarehouseList",
		params 	= $("#frm1").serializeObject(),
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		progress.hide();
		console.log(d);
		var optList  = new Array();
        var dd = d;
        var j = 0;
        var k = 0;
        $("#total").html(dd.length);
        $("#pageNum").val(parseInt( dd.length / 10));
        if(dd.length==0){
        	optList[0] = "<tr>"+
			           	 "<td style='color:#000000;text-align:center' colspan='4'>내용이 존재하지 않습니다.</td>"+
			           	 "</tr>";
        }
    	for(var i = 0; i < dd.length; i++){
    		j = parseInt( i / 10);
    		k = i % 10;
    		optList[i] = "<tr id='"+j+""+k+"' style='display:none;width:100%'>"+
                    	 "<td>"+dd[i].SHIPNAME+"</td>"+
                    	 "<td>"+dd[i].MAWB+"</td>"+
                    	 "<td>"+dd[i].BL+"</td>"+
                    	 "<td>"+dd[i].DTM_ARRV+"</td>"+
                    	 "</tr>";
        }
        $("#nav501List").html(optList.join("\n"));
	});
}

$(document).ready(function(){
	var date = new Date();

    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var clockDate = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    if(month < 10){
    	month = "0"+month;
    }else{
    	month = month;
    }

    if(clockDate < 10){
    	clockDate = "0"+clockDate;
    }else{
    	clockDate = clockDate;
    }

    if(hours < 10){
    	hours = "0"+hours;
    }else{
    	hours = hours;
    }

    if(minutes < 10){
    	minutes = "0"+minutes;
    }else{
    	minutes = minutes;
    }

    if(seconds < 10){
    	seconds = "0"+seconds;
    }else{
    	seconds = seconds;
    }

    var nowDate = "마지막 조회일시 : "+ year +"-"+ month +"-"+ clockDate +" "+ hours +":"+ minutes +":"+ seconds;

    $("#nowDate").html(nowDate);

	fn_searchAction();

	var TotalPages = 0;

	setTimeout(function(){
		fncClearTime();
	    initTimer();
		TotalPages = parseInt($("#pageNum").val()) + 1;
		$("#00").css("display", "");
		$("#01").css("display", "");
		$("#02").css("display", "");
		$("#03").css("display", "");
		$("#04").css("display", "");
		$("#05").css("display", "");
		$("#06").css("display", "");
		$("#07").css("display", "");
		$("#08").css("display", "");
		$("#09").css("display", "");
		$("#page").html(" 1 / "+TotalPages);
	}, 200);

	setInterval(function(){
		$("#count1").val(parseInt($("#count1").val())+1);
		var nowPages = parseInt($("#count1").val()) + 1;
		if($("#count1").val() > $("#pageNum").val()){
			location.reload();
		}
		var prev = parseInt($("#count1").val()) - 1;
		$("#"+prev+"0").css("display", "none");
		$("#"+prev+"1").css("display", "none");
		$("#"+prev+"2").css("display", "none");
		$("#"+prev+"3").css("display", "none");
		$("#"+prev+"4").css("display", "none");
		$("#"+prev+"5").css("display", "none");
		$("#"+prev+"6").css("display", "none");
		$("#"+prev+"7").css("display", "none");
		$("#"+prev+"8").css("display", "none");
		$("#"+prev+"9").css("display", "none");
		$("#"+$("#count1").val()+"0").css("display", "");
		$("#"+$("#count1").val()+"1").css("display", "");
		$("#"+$("#count1").val()+"2").css("display", "");
		$("#"+$("#count1").val()+"3").css("display", "");
		$("#"+$("#count1").val()+"4").css("display", "");
		$("#"+$("#count1").val()+"5").css("display", "");
		$("#"+$("#count1").val()+"6").css("display", "");
		$("#"+$("#count1").val()+"7").css("display", "");
		$("#"+$("#count1").val()+"8").css("display", "");
		$("#"+$("#count1").val()+"9").css("display", "");
		$("#page").html(nowPages+" / "+TotalPages);
	}, 60000);
});

var fn_searchAction = function(){
	selectImpoWarehouseList();
};

var iSecond;
var timerchecker = null;

function fncClearTime(){
    iSecond = 60;
}

Lpad = function(str, len){
    str = str + "";
    while(str.length < len){
        str = "0" + str;
    }
    return str;
}

initTimer = function(){
    var timer = document.getElementById("timer");

    rMinute = parseInt(iSecond / 60);
    rMinute = rMinute % 60;
    rSecond = iSecond % 60;

    var first = "";

    if(Lpad(rSecond, 2)== "00"){
    	first = "60";
    }else{
    	first = Lpad(rSecond, 2);
    }

    if(iSecond > 0){
        timer.innerHTML = "<font color='red'>"+ first + "초</font> 후 다음 Page로 이동합니다.";
        iSecond--;
        timerchecker = setTimeout("initTimer()", 1000);
    }else{
    	fncClearTime();
		initTimer();
    }
}

function linkColorFormatter(value,row,index){
	if(parseInt(row.ARRV) >= 5 && parseInt(row.ARRV) < 20){
		return 'background-color:#FFFF00;';
	}else if(parseInt(row.ARRV) >= 20){
		return 'background-color:#FF0000;color:#ffffff';
	}else{
		return 'background-color:#FFFFFF;';
	}
}

function linkColorFormatter1(value,row,index){
	if(value=="Y"){
		return 'background-color:#FF0000;color:#ffffff';
	}else{
		return 'background-color:#FFFFFF;';
	}
}

function linkBlNoFormatter2(value, row){
	return "<u><a href='javascript:linkMRNNo(\""+ row.MRN +""+ row.MSN +""+ row.HSN +"\")'><font color='#333333'>" + row.BL + "</font></a></u>";
}

function linkShipFormatter(value, row){
	return "<u><a href='javascript:linkShip(\""+ row.MRN +"\")'><font color='#333333'>" + row.SHIPNAME + "</font></a></u>";
}

function linkShip(MRN){
	var url = 'https://unipass.customs.go.kr/csp/myc/bsopspptinfo/cscllgstinfo/ImpCargPrgsInfoMtCtr/openMYC0405104Q.do?seaFlghIoprTpcd=40&pop_no=3'
			+ '&ioprSbmtNo=' + MRN;

	window.open(url, MRN, 'width=1000,height=500,resizable=no,scrollbars=yes,location=no,menubar=no,status=no');
}