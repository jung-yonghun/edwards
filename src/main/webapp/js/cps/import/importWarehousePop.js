var _height1 = $(window).height() * 95 /100;
var timerId = null;
var TotalPages = 0;

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
        var BL = "";
        var DTM_ARRV = "";
        var DTM_ARRV_Time = "";
        var AirInDtm = "";
        var WT_MRN = "";
        var mtTrgtCargYnNm = "";
        $("#total").html(dd.length);
        if(dd.length % 10 == 0){
        	$("#pageNum").val(parseInt( dd.length / 10) - 1);
        }else if(dd.length == 0){
        	$("#pageNum").val("0");
        }else{
        	$("#pageNum").val(parseInt( dd.length / 10));
        }
        if(dd.length==0){
        	optList[0] = "<tr>"+
			           	 "<td style='color:#000000;text-align:center' colspan='11'>내용이 존재하지 않습니다.</td>"+
			           	 "</tr>";
        }
    	for(var i = 0; i < dd.length; i++){
    		j = parseInt( i / 10);
    		k = i % 10;

    		if(parseInt(dd[i].ARRV) >= 5 && parseInt(dd[i].ARRV) < 20){
    			BL =  "<td style='background-color:#FFFF00;'>"+dd[i].BL+"</td>";
    		}else if(parseInt(dd[i].ARRV) >= 20){
    			BL =  "<td style='background-color:#FF0000;color:#ffffff'>"+dd[i].BL+"</td>";
    		}else{
    			BL =  "<td style='background-color:#FFFFFF;'>"+dd[i].BL+"</td>";
    		}
    		if(isEmpty(dd[i].DTM_ARRV)){
    			DTM_ARRV = "";
    		}else{
    			DTM_ARRV = dd[i].DTM_ARRV.substr(0,4)+"-"+dd[i].DTM_ARRV.substr(4,2)+"-"+dd[i].DTM_ARRV.substr(6,2);
    		}
    		if(isEmpty(dd[i].DTM_ARRV_Time)){
    			DTM_ARRV_Time = "";
    		}else{
    			DTM_ARRV_Time = dd[i].DTM_ARRV_Time.substr(0,2)+":"+dd[i].DTM_ARRV_Time.substr(2,2);
    		}
    		if(isEmpty(dd[i].AirInDtm)){
    			AirInDtm = "";
    		}else{
    			AirInDtm = dd[i].AirInDtm.substr(0,4)+"-"+dd[i].AirInDtm.substr(4,2)+"-"+dd[i].AirInDtm.substr(6,2)+" "+dd[i].AirInDtm.substr(8,2)+":"+dd[i].AirInDtm.substr(10,2)+":"+dd[i].AirInDtm.substr(12,2);
    		}
    		if(isEmpty(dd[i].WT_MRN)){
    			WT_MRN = "";
    		}else{
    			WT_MRN = getFormattedVal(dd[i].WT_MRN,"###3,00",3);
    		}
    		if(dd[i].mtTrgtCargYnNm=="Y"){
    			mtTrgtCargYnNm = "<td style='background-color:#FF0000;color:#ffffff'>"+dd[i].mtTrgtCargYnNm+"</td>";
    		}else{
    			mtTrgtCargYnNm = "<td style='background-color:#FFFFFF;'>"+dd[i].mtTrgtCargYnNm+"</td>";
    		}
    		optList[i] = "<tr id='"+j+""+k+"' style='display:none;width:100%;height:60px;text-align:center;color:black;font-size:14pt'>"+
                    	 "<td>"+dd[i].SHIPNAME+"</td>"+
                    	 "<td>"+dd[i].MAWB+"</td>"+
                    	 BL+
                    	 "<td>"+DTM_ARRV+"</td>"+
                    	 "<td>"+DTM_ARRV_Time+"</td>"+
                    	 "<td>"+AirInDtm+"</td>"+
                    	 "<td>"+dd[i].LocNm+"</td>"+
                    	 "<td style='text-align:right;padding-right:5px'>"+dd[i].CT_MRN+"</td>"+
                    	 "<td style='text-align:right;padding-right:5px'>"+WT_MRN+"</td>"+
                    	 "<td style='text-align:left;padding-left:5px'>"+dd[i].CN_FIRM+"</td>"+
                    	 mtTrgtCargYnNm+
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

    selectImpoWarehouseList();

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
	}, 150);

	startInterval();
});

var iSecond;
var timerchecker = null;

function fncClearTime(){
    iSecond = 30;
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

    rMinute = parseInt(iSecond / 30);
    rMinute = rMinute % 30;
    rSecond = iSecond % 30;

    var first = "";

    if(Lpad(rSecond, 2)== "00"){
    	first = "30";
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

function startInterval() {
	timerId = setInterval(function(){
		$("#count1").val(parseInt($("#count1").val())+1);
		if($("#count1").val() > $("#pageNum").val()){
			location.reload();
			return;
		}
		var nowPages = parseInt($("#count1").val()) + 1;
		var prev = parseInt($("#count1").val()) - 1;
		$("#page").html(nowPages+" / "+TotalPages);
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
	}, 30000);
}

function fastNext(){
	clearInterval(timerId);
	setTimeout(function(){
		iSecond = 10;
		fncClearTime();
		$("#count1").val(parseInt($("#count1").val())+1);
		if($("#count1").val() > $("#pageNum").val()){
			location.reload();
			return;
		}
		var nowPages = parseInt($("#count1").val()) + 1;
		var prev = parseInt($("#count1").val()) - 1;
		$("#page").html(nowPages+" / "+TotalPages);
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
		startInterval();
	}, 150);
}