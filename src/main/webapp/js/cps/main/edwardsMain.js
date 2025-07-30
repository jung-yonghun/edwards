function AddComma(data_value){
	return Number(data_value).toLocaleString('en');
}

$(document).ready(function(){
	if(isEmpty($('#userKey').val())){
		alert("세션이 끊어졌습니다.");
		parent.document.location.href="../logout.cps";
	}else{
		var url 	= "../checkSessionOut",
			params 	= {},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			if(d.check=="Y"){
				alert("다른 곳에서 같은 아이디로 접속이 있었습니다.");
				parent.document.location.href="../logout.cps";
			}
		});

		$('#nowdate').val($.datepicker.formatDate('yymmdd', new Date()));
		var currentTime 	= new Date();
		var startDateFrom 	= new Date(new Date(Date.parse(currentTime) - 7 * 1000 * 60 * 60 * 24));

		$('#strFromDate').val($.datepicker.formatDate('yymmdd', new Date(currentTime.getFullYear(), currentTime.getMonth(), 1)));
		$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date(currentTime.getFullYear(), currentTime.getMonth()+1, 0)));

		dateCheck();
		//getCommonNoticeList("NEWS", "뉴스레터", drawCommonNoticeList, "NewsNotice");
		//getCommonNoticeList("SYS", "시스템공지", drawCommonNoticeList, "SysNotice");
		//getCommonQnaList("QNA", "Q&A History ", drawCommonQnaList, "QnaNotice");
		//getCommonNoticeList("LAWS", "법령개정정보", drawCommonNoticeList, "LawsNotice");
	    //getCommonNoticeList("CUSTOMS", "관세무역정보", drawCommonNoticeList, "CustomsNotice");

//	    selectLawList(function(d){
//	    	console.log(d);
//	        var HS_LAW = d.content.HS_LAW;
//	        var appendHtml 	= "";
//	        if(!isEmpty(HS_LAW)){
//	            $(HS_LAW).each(function (i, v){
//	            	var length = 30;
//	            	var 볍령명   = "";
//	            	if(v.법령명한글.length >= length){
//	            		볍령명 = v.법령명한글.substr(0,length)+'...';
//	            	}else{
//	            		볍령명 = v.법령명한글;
//	            	}
//	                appendHtml = appendHtml + '<li><a href="javascript:openWindow(\'' + 'http://www.law.go.kr' + v.법령상세링크 + '\');" title=\'' + v.법령명한글 + '\'><img src="../images/cps/main02_box02_icon.jpg">' + 볍령명 + '<span>[' + commonPrettyDateTimeFormatter(v.공포일자.toString()) + ']</span></a></li>\n';
//
//	                return i < 5;
//	            });
//	            $('#LawsNotice').append(
//	            	appendHtml
//	            );
//	        }
//	    });

		drawYearList();

		var url 	= "../apis/edwards/selectEdwardsImpoSum",
			params 	= {
				"_defaultDB" 	: $("#_defaultDB").val(),
				"taxNum" 		: $("#taxNum").val(),
				"today" 		: $("#nowdate").val(),
				"strFromDate" 	: $("#strFromDate").val(),
				"strToDate" 	: $("#strToDate").val()
			},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			$("#im01").html(d[0].im01);
			$("#im02").html(d[0].im02);
			$("#im03").html(d[0].im03);
			$("#im04").html(d[0].im04);
			$("#im05").html(d[0].im05);
			$("#im06").html(d[0].im06);
			$("#im07").html(d[0].im07);
			$("#im08").html(d[0].im08);
		});

		var url 	= "../apis/edwards/selectEdwardsExpoSum",
			params 	= {
				"_defaultDB" 	: $("#_defaultDB").val(),
				"taxNum" 		: $("#taxNum").val(),
				"today" 		: $("#nowdate").val(),
				"strFromDate" 	: $("#strFromDate").val(),
				"strToDate" 	: $("#strToDate").val()
			},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			$("#ex01").html(d[0].ex01);
			$("#ex02").html(d[0].ex02);
			$("#ex03").html(d[0].ex03);
			$("#ex04").html(d[0].ex04);
			$("#ex05").html(d[0].ex05);
			$("#ex06").html(d[0].ex06);
		});


		params["yymmdd"] = $('#nowdate').val().substr(0,4);

		$('#strTodayFromDate').val($.datepicker.formatDate('yymmdd', new Date(currentTime.getFullYear(), 0, 1)));
		$('#strTodayFromDate1').val($.datepicker.formatDate('yymmdd', new Date()));
		$('#strTodayToDate').val($.datepicker.formatDate('yymmdd', new Date()));

		$("#today").html($('#strTodayFromDate1').val().substr(0,4)+"-"+$('#strTodayFromDate1').val().substr(4,2)+"-"+$('#strTodayFromDate1').val().substr(6,2));

		var url 	= "../apis/customs/selectDelayCheckList",
			params 	= {
				"_defaultDB" 	: $("#_defaultDB").val(),
				"USERGRADE" 	: $("#USERGRADE").val(),
				"ID" 			: $("#userKey").val(),
				"USERID" 		: $("#userId").val(),
				"strFromDate" 	: $("#strTodayFromDate").val(),
				"strToDate" 	: $("#strTodayToDate").val(),
				"_DateType" 	: "AddDt",
				"taxNum" 		: $("#taxNum").val()
			},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			if(d.length > 0){
				$("#delay").html(d.length);
			}else{
				$("#delay").html("0");
			}
		});

		var url 	= "../apis/customs/selectBanchulCheckList",
			params 	= {
				"_defaultDB" 	: $("#_defaultDB").val(),
				"USERGRADE" 	: $("#USERGRADE").val(),
				"ID" 			: $("#userKey").val(),
				"USERID" 		: $("#userId").val(),
				"strFromDate1" 	: $("#strTodayFromDate").val(),
				"strToDate1" 	: $("#strTodayToDate").val(),
				"_DateType" 	: "Impo_ok_day",
				"taxNum" 		: $("#taxNum").val()
			},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			if(d.length > 0){
				$("#banchul").html(d.length);
			}else{
				$("#banchul").html("0");
			}
		});

		var url 	= "../apis/customs/selectShipCheckList1",
			params 	= {
				"_defaultDB" 	: $("#_defaultDB").val(),
				"USERGRADE" 	: $("#USERGRADE").val(),
				"ID" 			: $("#userKey").val(),
				"USERID" 		: $("#userId").val(),
				"strFromDate2" 	: $("#strTodayFromDate").val(),
				"strToDate2" 	: $("#strTodayToDate").val(),
				"_DateType" 	: "Expo_ok_day",
				"taxNum" 		: $("#taxNum").val()
			},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			if(d.length > 0){
				$("#ship").html(d.length);
			}else{
				$("#ship").html("0");
			}
		});

		var url 	= "../apis/customs/selectReExpoCheckList",
			params 	= {
				"strFromDate3" 	: $("#strTodayFromDate").val(),
				"strToDate3" 	: $("#strTodayToDate").val(),
				"_DateType" 	: "Impo_ok_day",
				"taxNum" 		: $("#taxNum").val()
			},
			type 	= "POST";
		console.log(params);
		sendAjax(url, params, type, function(d){
			console.log(d);
			$("#reExport").html(d.length);
		});

		var url 	= "../apis/master/selectItemList",
			params 	= {
				"_defaultRmsDb" : "CPS",
				"strFromDate" 	: $("#strTodayFromDate1").val(),
				"strToDate" 	: $("#strTodayToDate").val(),
				"_DateType" 	: "Mreg_date",
				"mcoCom" 		: $("#taxNum").val()
			},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			$("#Item").html(d.length);
		});

		var url 	= "../apis/system/selectSysMenuList",
			params 	= {"userKey" : $("#userKey").val()},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			if(!d) return;
			for(var i=0;i<d.length;i++){
				if(d[i].sortOrder=="2000"){
					$('#addLine1').css("display", "");
				}
			}
		});

		$("#seach_pop_bg").click(function(){
			$(this).fadeOut("fast");
			$("#seach_pop").fadeOut("fast");
		});

		if($("#userKey").val()=="440"){
			$("#qna1").css("display","block");
			$("#qna2").css("display","none");
		}else{
			$("#qna1").css("display","none");
			$("#qna2").css("display","block");
		}
	}
});

var drawYearList = function(){
    var optList 	= new Array();
    var nextYear 	= parseInt(new Date().getFullYear() + 2);
    for(var i = 0; i < 5; i++){
        nextYear -= 1;
        var dd = nextYear - 1;
        optList[i] = "<option value=\"" + dd + "\">" + dd + "년</option>";
    }
    $("#year").html(optList.join("\n"));
};

function linkExchange(){
	var url = '../include/viewExchange.cps?'
        + 'qryYymmDd=' + $('#nowdate').val();
    parent.addTab("Taxation exchange rate", url);
};

function dateCheck(){
    var params = {};
    $.ajax({
        type		: "POST",
        contentType	: "application/json",
        dataType	: 'json',
        url			: "../apis/cmmnCode/selectStandardExchangeRateList",
        processData	: false,
        data		: JSON.stringify(params),
        success		: function(returnValue, textStatus, jqXHR){
        	var secDate			= $('#nowdate').val();
    		var year 			= secDate.substr(0,4);
    		var month 			= secDate.substr(4,2);
    		var day 			= secDate.substr(6,2);
    		var now 			= new Date(new Date(Date.parse(new Date(year,month-1,day))));
    		var nowDayOfWeek 	= now.getDay();
    		var weekStartDate 	= new Date(now.getFullYear(), now.getMonth(), now.getDate() - nowDayOfWeek);
    		var weekEndDate 	= new Date(now.getFullYear(), now.getMonth(), now.getDate() + (6 - nowDayOfWeek));

    		$("#date_from").html($.datepicker.formatDate('yymmdd', weekStartDate).substr(0,4)+"-"+$.datepicker.formatDate('yymmdd', weekStartDate).substr(4,2)+"-"+$.datepicker.formatDate('yymmdd', weekStartDate).substr(6,2));
    		$("#date_to").html($.datepicker.formatDate('yymmdd', weekEndDate).substr(0,4)+"-"+$.datepicker.formatDate('yymmdd', weekEndDate).substr(4,2)+"-"+$.datepicker.formatDate('yymmdd', weekEndDate).substr(6,2));

            $("#usd_e").html(getFormattedVal(returnValue[1].USD,"###3,00",2));
            $("#usd_i").html(getFormattedVal(returnValue[0].USD,"###3,00",2));
            $("#jpy_e").html(getFormattedVal(returnValue[1].GBP,"###3,00",2));
            $("#jpy_i").html(getFormattedVal(returnValue[0].GBP,"###3,00",2));
            $("#eur_e").html(getFormattedVal(returnValue[1].EUR,"###3,00",2));
            $("#eur_i").html(getFormattedVal(returnValue[0].EUR,"###3,00",2));
            $("#cny_e").html(getFormattedVal(returnValue[1].CNY,"###3,00",2));
            $("#cny_i").html(getFormattedVal(returnValue[0].CNY,"###3,00",2));
        },
        error		: function(e){
            alert(e.statusText);
            return -1;
        }
    });
};

function selectNewsList(callback){
    var url 	= "../apis/system/selectNtaaListSimple",
        params 	= {
    		"category" 	: "HSNEWS",
			"useYn" 	: "Y"
		},
        type 	= "POST";

    sendAjax(url, params, type, function(d){
    	console.log(d);
        callback(d);
    });
};

selectNewsList(function(d){
	var HS_NEWS 	= d;
    var appendHtml1 = "";
    if(!isEmpty(HS_NEWS)){
        var appendHtml = "";
        $(HS_NEWS).each(function (i, v){
        	var length = 30;
        	var noticeSubject   = "";
        	if(v.Subject.length >= length){
        		noticeSubject = v.Subject.substr(0,length)+'...';
        	}else{
        		noticeSubject = v.Subject;
        	}
            appendHtml1 = appendHtml1 + '<li>\n';
            appendHtml1 = appendHtml1 + '<a href="javascript:fn_popAction(\'' + v.NTAAKey + '\');" title=\'' + v.Subject + '\'><img src="../images/cps/main02_box02_icon.jpg">\n';
            appendHtml1 = appendHtml1 + noticeSubject + '<span>[';
            appendHtml1 = appendHtml1 + commonPrettyDateTimeFormatter(v.FinishedDay.toString()) + ']</span></a>\n';
            appendHtml1 = appendHtml1 + '</li>\n';
            return i < 5;
        });
        $('#NewsNotice').append(
        	appendHtml1
        );
    }
});

function selectNewsLetterList(callback){
//  var url 	= "../apis/system/selectNtaaListSimple",
//  params 	= {
//		"category" 	: "CUSTOMS",
//		"useYn" 	: "Y"
//	},
//  type 	= "POST";

	var url 	= "../apis/maria/selectBoardInfoSimpleList",
	  	params 	= {},
	  	type 	= "POST";

	sendAjax(url, params, type, function(d){
		callback(d);
	});
};

//selectNewsLetterList(function(d){
//	var HS_NEWS 	= d;
//    var appendHtml1 = "";
//    if(!isEmpty(HS_NEWS)){
//        var appendHtml = "";
//        $(HS_NEWS).each(function (i, v){
//        	var length = 30;
//        	var noticeSubject   = "";
//        	if(v.Subject.length >= length){
//        		noticeSubject = v.Subject.substr(0,length)+'...';
//        	}else{
//        		noticeSubject = v.Subject;
//        	}
//            appendHtml1 = appendHtml1 + '<li>\n';
//            appendHtml1 = appendHtml1 + '<a href="javascript:fn_popAction(\'' + v.NTAAKey + '\');" title=\'' + v.Subject + '\'><img src="../images/cps/main02_box02_icon.jpg">\n';
//            appendHtml1 = appendHtml1 + noticeSubject + '<span>[';
//            appendHtml1 = appendHtml1 + commonPrettyDateTimeFormatter(v.FinishedDay.toString()) + ']</span></a>\n';
//            appendHtml1 = appendHtml1 + '</li>\n';
//            return i < 5;
//        });
//        $('#CustomsNotice').append(
//        	appendHtml1
//        );
//    }
//});

selectNewsLetterList(function(d){
	var HS_NEWS 	= d;
    var appendHtml1 = "";
    if(!isEmpty(HS_NEWS)){
        var appendHtml = "";
        $(HS_NEWS).each(function (i, v){
        	var length = 30;
        	var noticeSubject   = "";
        	if(v.b_subject.length >= length){
        		noticeSubject = decodeURIComponent(escape(window.atob(v.b_subject))).substr(0,length)+'...';
        	}else{
        		noticeSubject = decodeURIComponent(escape(window.atob(v.b_subject)));
        	}
            appendHtml1 = appendHtml1 + '<li>\n';
            appendHtml1 = appendHtml1 + '<a href="javascript:fn_popAction2(\'' + v.idx + '\');" title=\'' + decodeURIComponent(escape(window.atob(v.b_subject))) + '\'><img src="../images/cps/main02_box02_icon.jpg">\n';
            appendHtml1 = appendHtml1 + noticeSubject + '<span>[';
            appendHtml1 = appendHtml1 + convertUnixDt(v.regdate.toString()) + ']</span></a>\n';
            appendHtml1 = appendHtml1 + '</li>\n';
            return i < 5;
        });
        $('#CustomsNotice').append(
        	appendHtml1
        );
    }
});

function selectSysList(callback){
    var url 	= "../apis/system/selectNtaaListSimple",
        params 	= {
    		"category" 	: "SYS",
			"useYn" 	: "Y"
		},
        type 	= "POST";

    sendAjax(url, params, type, function(d){
    	console.log(d);
        callback(d);
    });
};

selectSysList(function(d){
	var HS_NEWS 	= d;
    var appendHtml1 = "";
    if(!isEmpty(HS_NEWS)){
        var appendHtml = "";
        $(HS_NEWS).each(function (i, v){
        	var length = 30;
        	var noticeSubject   = "";
        	if(v.Subject.length >= length){
        		noticeSubject = v.Subject.substr(0,length)+'...';
        	}else{
        		noticeSubject = v.Subject;
        	}
            appendHtml1 = appendHtml1 + '<li>\n';
            appendHtml1 = appendHtml1 + '<a href="javascript:fn_popAction(\'' + v.NTAAKey + '\');" title=\'' + v.Subject + '\'><img src="../images/cps/main02_box02_icon.jpg">\n';
            appendHtml1 = appendHtml1 + noticeSubject + '<span>[';
            appendHtml1 = appendHtml1 + commonPrettyDateTimeFormatter(v.FinishedDay.toString()) + ']</span></a>\n';
            appendHtml1 = appendHtml1 + '</li>\n';
            return i < 5;
        });
        $('#SysNotice').append(
        	appendHtml1
        );
    }
});


function selectQnaList(callback){
    var url 	= "../apis/system/selectNtaaListSimple",
        params 	= {
    		"category" 	: "QNA",
			"useYn" 	: "Y"
		},
        type 	= "POST";

    sendAjax(url, params, type, function(d){
    	console.log(d);
        callback(d);
    });
};

selectQnaList(function(d){
	var HS_NEWS 	= d;
    var appendHtml1 = "";
    if(!isEmpty(HS_NEWS)){
        var appendHtml = "";
        $(HS_NEWS).each(function (i, v){
        	var length = 30;
        	var noticeSubject   = "";
        	if(v.Subject.length >= length){
        		noticeSubject = v.Subject.substr(0,length)+'...';
        	}else{
        		noticeSubject = v.Subject;
        	}
            appendHtml1 = appendHtml1 + '<li>\n';
            appendHtml1 = appendHtml1 + '<a href="javascript:fn_popAction(\'' + v.NTAAKey + '\');" title=\'' + v.Subject + '\'><img src="../images/cps/main02_box02_icon.jpg">\n';
            appendHtml1 = appendHtml1 + noticeSubject + '<span>[';
            appendHtml1 = appendHtml1 + commonPrettyDateTimeFormatter(v.FinishedDay.toString()) + ']</span></a>\n';
            appendHtml1 = appendHtml1 + '</li>\n';
            return i < 5;
        });
        $('#QnaNotice').append(
        	appendHtml1
        );
    }
});












//function getCommonNoticeList(category, name, callback, target){
//    var url 	= "../apis/system/selectSysNoticeList",
//        params 	= $("#frmCommon").serializeObject(),
//        type 	= "POST";
//
//    params["category"] 	= category;
//    params["sort"] 		= [{"property":"addDate", "direction":"desc"}];
//
//    sendAjax(url, params, type, function(d){
//        callback(category, name, d[0].content, target);
//    });
//};
//
//function getCommonQnaList(category, name, callback, target){
//    var url 	= "../apis/system/selectSysNoticeList",
//        params 	= $("#frmCommon").serializeObject(),
//        type 	= "POST";
//
//    params["category"] 	= category;
//    params["sort"] 		= [{"property":"prevKey", "direction":"desc"},{"property":"sorting", "direction":"asc"}];
//
//    sendAjax(url, params, type, function(d){
////    	for(var i=0; i < d[0].content.length; i++){
////			if(d[0].content[i].sorting=="0"){
////				d[0].content[i].subject = "[Q] : "+d[0].content[i].subject;
////			}else{
////				d[0].content[i].subject = "└ [A] : "+d[0].content[i].subject;
////			}
////		}
//        callback(category, name, d[0].content, target);
//    });
//};
//
//var drawCommonNoticeList = function(category, name, data, target){
//    var optList = new Array();
//    var length = 30;
//    for(var i = 0; i < 6; i++){
//    	var subject = '';
//        if(data[i]){
//        	if(data[i].subject.length >= length){
//        		subject = data[i].subject.substr(0,length)+'...';
//        	}else{
//        		subject = data[i].subject;
//        	}
//            optList[optList.length] = "<li><a href='javascript:fn_popAction(" + data[i].noticesKey + ");' title='" + data[i].subject + "'><img src='../images/cps/main02_box02_icon.jpg'>" + subject + "<span>[" + convertUnixDate(data[i].addDate).substring(0, 10) + "]</span></a></li>";
//        }
//    }
//    $("#" + target).html(optList.join("\n"));
//};
//
//var drawCommonQnaList = function(category, name, data, target){
//    var optList = new Array();
//    var length = 30;
//    for(var i = 0; i < 6; i++){
//    	var subject = '';
//        if(data[i]){
//        	if(data[i].subject.length >= length){
//        		subject = data[i].subject.substr(0,length)+'...';
//        	}else{
//        		subject = data[i].subject;
//        	}
//        	if(data[i].sorting == "0"){
//        		optList[optList.length] = "<li><a href='javascript:fn_popAction1(" + data[i].noticesKey + ");' title='" + data[i].subject + "'><img src='../images/cps/main02_box02_icon.jpg'>" + subject + "<span>[" + convertUnixDate(data[i].addDate).substring(0, 10) + "]</span></a></li>";
//        	}else{
//        		optList[optList.length] = "<li><a href='javascript:fn_popAction(" + data[i].noticesKey + ");' title='" + data[i].subject + "'><img src='../images/cps/main02_box02_icon.jpg'>" + subject + "<span>[" + convertUnixDate(data[i].addDate).substring(0, 10) + "]</span></a></li>";
//        	}
//        }
//    }
//    $("#" + target).html(optList.join("\n"));
//};

var fn_popAction = function(NTAAKey){
	var url 	= "../apis/system/selectNtaaList",
	    params 	= {"NTAAKey":NTAAKey},
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
		var html = "";
		html = html +"<tr><td class='left'>작성자</td><td class='taL'>"+d[0].AddUserNm+"</td>";
		html = html +"<td class='left'>작성일자</td><td>"+commonPrettyDateTimeFormatter(d[0].FinishedDay.toString())+"</td>";
		html = html +"<td class='left'>조회수</td><td>"+d[0].InquiryCount+"</td></tr>";
		html = html +"<tr><td class='left'>제목</td><td colspan='5' class='taL'>"+d[0].Subject+"</td></tr>";

		var content = d[0].Contents;
		$("#bbs_title").html(html);
		$(".seach_review_txt").html(content);
	});

	var url 	= "../apis/system/selectENAC100List",
		params 	= {"FKey":NTAAKey, "FTableNm":"NTAA100", "UseYn":"Y"},
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
		console.log(d);
	    drawfileList(d);
	    $("#filelist").show();
	});

	$("#seach_pop_bg").fadeIn("fast");
	$("#seach_pop").fadeIn("fast");
};

var fn_popAction1 = function(noticesKey){
	var url 	= "../apis/system/selectSysNoticeList",
	    params 	= {"noticesKey":noticesKey},
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
		var html = "";
		html = html +"<tr><td class='left'>작성자</td><td class='taL'>"+d[0].content[0].addUserNm+"</td>";
		html = html +"<td class='left'>작성일자</td><td>"+convertUnixDate(d[0].content[0].addDate).substring(0, 10)+"</td>";
		html = html +"<td class='left'>조회수</td><td>"+d[0].content[0].inquiryCount+"</td></tr>";
		html = html +"<tr><td class='left'>제목</td><td colspan='5' class='taL'>"+d[0].content[0].subject+"</td></tr>";
		html = html +"<tr><td class='left'>구분</td><td colspan='5' class='taL'>"+d[0].content[0].keyword+"</td></tr>";

		var content = d[0].content[0].contents;
		$("#bbs_title").html(html);
		$(".seach_review_txt").html(content);
	});

	var url 	= "../apis/system/selectSysFileList",
		params 	= {"noticeKey":noticesKey, "useYn":"Y"},
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
	    drawfileList(d[0].content);
	    $("#filelist").show();
	});

	$("#seach_pop_bg").fadeIn("fast");
	$("#seach_pop").fadeIn("fast");
};

var fn_popAction2 = function(idx){
	var url 	= "../apis/maria/selectBoardInfoList",
	    params 	= {"idx":idx},
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
		console.log(d);
		var html = "";
		html = html +"<tr><td class='left'>작성자</td><td class='taL'>"+decodeURIComponent(escape(window.atob(d[0].b_name)))+"</td>";
		html = html +"<td class='left'>작성일자</td><td>"+convertUnixDt(d[0].regdate.toString())+"</td>";
		html = html +"<td class='left'>조회수</td><td>"+d[0].b_count+"</td></tr>";
		html = html +"<tr><td class='left'>제목</td><td colspan='5' class='taL'>"+decodeURIComponent(escape(window.atob(d[0].b_subject)))+"</td></tr>";

		var content = decodeURIComponent(escape(window.atob(d[0].b_content))).replace(/jpg&quot;/gi,'jpg').replace(/&quot;/gi,'https://www.seincustoms.com');
		$("#bbs_title").html(html);
		$(".seach_review_txt").html(content);

		var html = "";
		if(d[0].b_file.indexOf("|") != -1){
			var fileSplit   = decodeURIComponent(escape(window.atob(d[0].b_file))).split('|')
			var fileNmSplit = decodeURIComponent(escape(window.atob(d[0].b_file_name))).split('|');
		    for (var i = 0; i < fileSplit.length; i++) {
		    	html = html +"<a href='https://www.seincustoms.com/data/board/info/"+ fileSplit[i] +"' target='_new')' style='cursor:pointer'>"+ fileNmSplit[i] +"</a><br>";
		    }
		}else{
			html = html +"<a href='https://www.seincustoms.com/data/board/info/"+decodeURIComponent(escape(window.atob(d[0].b_file)))+"' target='_new')' style='cursor:pointer'>"+ decodeURIComponent(escape(window.atob(d[0].b_file_name))) +"</a>";
		}
	    $("#bbs_file").html(html);
	});

	$("#filelist").show();
	$("#seach_pop_bg").fadeIn("fast");
	$("#seach_pop").fadeIn("fast");
};

var fn_mariaAction = function (b_file,b_file_name){
    location.href = "https://www.seincustoms.com/board/download.php?board=Y&bo_table=info&file_name="+b_file+"&o_file_name="+ b_file_name;
};

var drawfileList = function (data){
	var html = "";
    for (var i = 0; i < data.length; i++) {
    	html = html +"<a onclick='javascript:fn_downAction(" + data[i].enackey + ")' style='cursor:pointer'>" + data[i].originFileNm + "</a><br>";
    }
    $("#bbs_file").html(html);
};

var fn_downAction = function (ENACKey){
    location.href = "../apis/system/downloadENAC100?ENACKey=" + ENACKey;
};

var convertUnixDate = function(args){
	if(args=="") return;
	try{
		if(isNaN(parseInt(args))) throw new Error("Not a number");
		var date 	= new Date(args.toString().substr(0, 10)*1000),
			year 	= date.getFullYear(),
			month 	= "0" + parseInt(date.getMonth()+1),
			day 	= "0" + date.getDate(),
			hours 	= "0" + date.getHours(),
			minutes = "0" + date.getMinutes(),
			seconds = "0" + date.getSeconds();
		return year + '-' + month.substr(-2) + '-' + day.substr(-2) + ' ' + hours.substr(-2) + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
	}catch(e){
		return "convert error: " + e.message;
	};
};

function Fadeout(){
	$("#seach_pop_bg").fadeOut("fast");
	$("#seach_pop").fadeOut("fast");
};

function bbslist(a){
	var url = './bbsList.cps?'
        + 'category=' + a;
	if(a=='CUSTOMS'){
		parent.addTab("뉴스레터", url);
	}else if(a=='SYS'){
		parent.addTab("System notice", url);
	}else if(a=='LAWS'){
		parent.addTab("법령개정공시", url);
	}else{
		parent.addTab("관세무역정보", url);
	}
};

function bbslistEd(a){
	var url = '../edwards/bbsList.cps?category=' + a;
	parent.addTab("FAQ", url);
};

function bbsWriteEd(a){
	var url = '../edwards/bbsWrite.cps?category=' + a;
	parent.addTab("FAQ 등록", url);
};

function selectLawList(callback){
    var url 	= "../apis/system/selectLawList",
        params 	= {
			"searchCondition"	: "*",
			"isFilter"			: "Y",
			"useYn"				: "Y",
			"sort"				: "ddes",
			"search"			: "2",
			"query"				: "*",
			"display"			: "90",
			"efYd"				: "20191201~21001231"
		},
        type 	= "POST";
console.log(params);
    sendAjax(url, params, type, function(d){
    	console.log(d);
        callback(d);
    });
};

function openWindow(url){
    if(window.innerWidth <= 640){
        var width 	= window.innerWidth;
        var height 	= width * window.innerHeight / window.innerWidth;
        window.open(url, 'newwindow' + url, 'width=' + width + ', height=' + height + ', top=' + ((window.innerHeight - height) / 2) + ', left=' + ((window.innerWidth - width) / 2));
    }else{
        var width 	= window.innerWidth * 0.66;
        var height 	= width * window.innerHeight / window.innerWidth * 1.4;
        window.open(url, 'newwindow' + url, 'width=' + width + ', height=' + height + ', top=' + ((window.innerHeight - height) / 2) + ', left=' + ((window.innerWidth - width) / 2));
    }
}