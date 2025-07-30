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

		if($('#USERGRADEB').val()=="E" || $('#USERGRADEB').val()=="G" || $('#USERGRADEB').val()=="H"){
			$('.main01_T').css("display", "none");
			$('.right').css("display", "none");
			$('#todayLine').css("display", "none");
			$('#blank').css("display", "");
		}
		if($('#userKey').val()=="121" || $('#userKey').val()=="160" || $('#userKey').val()=="255" || $('#userKey').val()=="327" || $('#userKey').val()=="153" || $('#userKey').val()=="328" || $('#userKey').val()=="329" || $('#userKey').val()=="330" || $('#userKey').val()=="345" || $('#userKey').val()=="348" ){
			$('.main01_T').css("display", "none");
			$('.right').css("display", "none");
			$('#todayLine').css("display", "none");
			$('#blank').css("display", "");
		}
		$('#nowdate').val($.datepicker.formatDate('yymmdd', new Date()));
		var currentTime 	= new Date();
		var startDateFrom 	= new Date(new Date(Date.parse(currentTime) - 7 * 1000 * 60 * 60 * 24));
		var PrevDate 		= new Date(new Date(Date.parse(currentTime) - 1 * 1000 * 60 * 60 * 24));

		$('#strFromDate').val($.datepicker.formatDate('yymmdd', new Date(currentTime.getFullYear(), currentTime.getMonth(), 1)));
//		$('#strToDate').val($.datepicker.formatDate('yymmdd', new Date(currentTime.getFullYear(), currentTime.getMonth()+1, 0)));
		$('#strToDate').val($.datepicker.formatDate('yymmdd', PrevDate));

		if($("#USERGRADE").val()=="C"){
//			$('#write').css("display", "");
//			$('#write1').css("display", "");
			$('#write3').css("display", "");
		}else{
//			$('#write').css("display", "none");
//			$('#write1').css("display", "none");
			$('#write3').css("display", "none");
		}

		dateCheck();
//		getCommonNoticeList("NEWS", "뉴스레터", drawCommonNoticeList, "NewsNotice");
//		getCommonNoticeList("SYS", "시스템공지", drawCommonNoticeList, "SysNotice");
//		getCommonNoticeList("LAWS", "법령개정정보", drawCommonNoticeList, "LawsNotice");
//	    getCommonNoticeList("CUSTOMS", "관세무역정보", drawCommonNoticeList, "CustomsNotice");

		drawYearList();

		if($('#USERGRADEB').val()=="E" || $('#USERGRADEB').val()=="G" || $('#USERGRADEB').val()=="H"){
		}else{
			var url 	= "../apis/customs/selectImportSummary",
				params 	= {
					"yyyy" 				: $("#strFromDate").val().substr(0,6),
					"statisticsType" 	: "IMPORT",
					"taxNum" 			: $("#taxNum").val(),
					"ncustomsDb" 		: "all",
					"ID" 				: $("#userKey").val()
				},
				type 	= "POST";

			sendAjax(url, params, type, function(d){
				if(d.length > 0){
					$("#suri").html(addComma(d[0].singoCnt)+"건");
					$("#singo").html(addComma(d[0].singoCnt)+"건");
					$("#cifwon").html("￦"+addComma(d[0].amtWon));
					$("#cifdal").html("$"+addComma(d[0].amtUsd));
					$("#gwan").html("￦"+addComma(d[0].gwanTax));
					$("#vat").html("￦"+addComma(d[0].vatTax));
					$("#etc").html("￦"+addComma(d[0].etcTax));
					$("#taxwon").html("￦"+addComma(d[0].totalTax));
				}else{
					$("#suri").html("0건");
					$("#singo").html("0건");
					$("#cifwon").html("￦0");
					$("#cifdal").html("￦0");
					$("#gwan").html("￦0");
					$("#vat").html("￦0");
					$("#etc").html("￦0");
					$("#taxwon").html("￦0");
				}
				$("#importweek").html($('#strToDate').val().substr(4,2)+"월 ("+$('#strToDate').val().substr(0,4)+"-"+$('#strToDate').val().substr(4,2)+"-"+$('#strToDate').val().substr(6,2)+" 기준)");
				$("#exportweek").html($('#strToDate').val().substr(4,2)+"월 ("+$('#strToDate').val().substr(0,4)+"-"+$('#strToDate').val().substr(4,2)+"-"+$('#strToDate').val().substr(6,2)+" 기준)");
			});

			var url 	= "../apis/customs/selectImportSummary",
				params 	= {
					"yyyy" 				: $("#strFromDate").val().substr(0,6),
					"statisticsType" 	: "EXPORT",
					"taxNum" 			: $("#taxNum").val(),
					"ncustomsDb" 		: "all",
					"ID" 				: $("#userKey").val()
				},
				type 	= "POST";
			sendAjax(url, params, type, function(d){
				if(d.length > 0){
					$("#total1").html(addComma(d[0].singoCnt)+"건");
					$("#won1").html("￦"+addComma(d[0].amtWon));
					$("#taxwon1").html("$"+addComma(d[0].amtUsd));
				}else{
					$("#total1").html("0건");
					$("#won1").html("￦0");
					$("#taxwon1").html("$0");
				}
			});

			var url 	= "../apis/customs/selectMainGraphList",
				params 	= {
					"ID" 		 	: $("#userKey").val(),
					"_defaultDB" 	: $("#_defaultDB").val(),
					"_defaultDB1" 	: $("#_defaultDB1").val(),
					"taxNum" 		: $("#taxNum").val(),
					"yymmdd" 		: $('#nowdate').val().substr(0,4),
					"size"			: "100000",
					"page"			: "0",
					"_pageRow"		: "100000",
					"_pageNumber"	: "0"
				},
				type 	= "POST";

			if ($("#_defaultDB").val() == "ncustoms") {
			    params["_defaultDB1"] = "ncustoms_sel_040";
			    $("#_defaultDB1").val("ncustoms_sel_040");
			}

			params["yymmdd"] = $('#nowdate').val().substr(0,4);

			$.ajax({
				type 		: type,
				contentType : "application/json",
				dataType 	: 'json',
				url 		: url,
				processData : true,
				cache 		: false,
				data 		: type.toLowerCase() == "get" ? params : JSON.stringify(params),
				success : function(data, textStatus, jqXHR) {
					var chartData = {
						labels	: [],
			            name	: "",
			            datasets: [{
			              label 				: "CIF(￦)",
			              fillColor				: "rgba(39,99,186,0.5)",
			              strokeColor			: "rgba(39,99,186,0.5)",
			              pointColor			: "rgba(39,99,186,0.5)",
			              pointStrokeColor		: "#fff",
			              pointHighlightFill	: "#fff",
			              pointHighlightStroke	: "rgba(39,99,186,0.5)",
			              data					: []
			            },{
			              label 				: "FOB(￦)",
			              fillColor				: "rgba(45,164,144,0.5)",
			              strokeColor			: "rgba(45,164,144,0.5)",
			              pointColor			: "rgba(45,164,144,0.5)",
			              pointStrokeColor		: "#fff",
			              pointHighlightFill	: "#fff",
			              pointHighlightStroke	: "rgba(45,164,144,0.5)",
			              data					: []
				         }]
			        };
					$.each(data, function(position, result){
			            if(result.mm){
			            	chartData.labels.push(result.mm+"월");
			            }else{
			            	chartData.labels.push('');
			            }
			            chartData.datasets[0].data.push(result.import);
			            chartData.datasets[1].data.push(result.export);
			        });

			        var chartCanvas = $("#mainChart").get(0).getContext("2d");
			        document.getElementById("mainChart").style.width = '100%';

			        var chartOptions = {
		        		scaleBeginAtZero			: true,
			        	scaleShowGridLines			: true,
			        	scaleGridLineColor			: "rgba(0,0,0,.05)",
			        	scaleGridLineWidth			: 1,
			        	scaleShowHorizontalLines	: true,
			        	scaleShowVerticalLines		: true,
			        	barShowStroke				: true,
			        	barStrokeWidth				: 2,
			        	barValueSpacing				: 10,
			        	barDatasetSpacing			: 1,
			        	showTooltips				: true,
			        	multiTooltipTemplate		: "<%= datasetLabel %>: <%= AddComma(value) %>",
			        	scaleLabel				: function(valuePayload){
			        	    return Number(valuePayload.value).toLocaleString('en');
			        	}
			        };
			        var mychart2 = new Chart(chartCanvas).Bar(chartData, chartOptions);
				}
			});

			$('#strTodayFromDate').val("20210101");
			$('#strTodayFromDate2').val("20200101");
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
			console.log(params);
			sendAjax(url, params, type, function(d){
				console.log(d.length);
				if(d.length > 0){
					$("#delay").html(d.length);
					$("#delay1").html(d.length);
				}else{
					$("#delay").html("0");
					$("#delay1").html("0");
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
					$("#banchul1").html(d.length);
				}else{
					$("#banchul").html("0");
					$("#banchul1").html("0");
				}
			});

			var url 	= "../apis/customs/selectShipCheckList",
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
					$("#ship1").html(d.length);
				}else{
					$("#ship").html("0");
					$("#ship1").html("0");
				}
			});

			var url 	= "../apis/customs/selectReExpoCheckList",
				params 	= {
					"ID" 			: $("#userKey").val(),
					"strFromDate3" 	: $("#strTodayFromDate2").val(),
					"strToDate3" 	: $("#strTodayToDate").val(),
					"_DateType" 	: "Impo_ok_day",
					"taxNum" 		: $("#taxNum").val()
				},
				type 	= "POST";

			sendAjax(url, params, type, function(d){
				$("#reExport").html(d.length);
				$("#reExport1").html(d.length);
			});

			var url 	= "../apis/master/selectItemList",
				params 	= {
					"ID" 			: $("#userKey").val(),
					"_defaultRmsDb" : "CPS",
					"strFromDate" 	: $("#strTodayFromDate1").val(),
					"strToDate" 	: $("#strTodayToDate").val(),
					"_DateType" 	: "Mreg_date",
					"mcoCom" 		: $("#taxNum").val()
				},
				type 	= "POST";

			sendAjax(url, params, type, function(d){
				$("#Item").html(d.length);
				$("#Item1").html(d.length);
			});

			var url 	= "../apis/system/selectSysMenuList",
				params 	= {"userKey" : $("#userKey").val()},
				type 	= "POST";

			sendAjax(url, params, type, function(d){
				if(!d) return;
				for(var i=0;i<d.length;i++){
					if(d[i].sortOrder=="2000"){
						$('#addLine1').css("display", "");
						$('#addLine2').css("display", "none");
						$('#addLine3').css("display", "none");
					}
				}
			});
		}

		$("#seach_pop_bg").click(function(){
			$(this).fadeOut("fast");
			$("#seach_pop").fadeOut("fast");
		});
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

function linkBlNo(){
    if(isEmpty($("#mbl").val()) && isEmpty($("#hbl").val())){
        alert("B/L No를 입력하세요.");
        return;
    }
    var url = '../include/viewTracking.cps?'
        + 'cargMtNo='
        + '&mblNo=' + $('#mbl').val()
        + '&hblNo=' + $('#hbl').val().trim()
        + '&blYy=' + $('#year').val();
    parent.addTab("화물진행정보", url);
};

function linkBlNo1(){
	if(!isEmpty($("#expDclrNo").val())){
		var url = '../include/viewExportTracking.cps?expDclrNo=' + $("#expDclrNo").val().trim().replace(/-/gi,'');
	    window.open(url, "ExportSingo", 'width=600,height=320,resizable=1,scrollbars=yes');
    }

	if(!isEmpty($("#blNo").val())){
		var url = '../include/viewExportTracking1.cps?blNo=' + $("#blNo").val().trim();
	    window.open(url, "ExportSingo", 'width=600,height=320,resizable=1,scrollbars=yes');
    }
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

            $("#usd_e").html(returnValue[1].USD);
            $("#usd_i").html(returnValue[0].USD);
            $("#jpy_e").html(returnValue[1].JPY);
            $("#jpy_i").html(returnValue[0].JPY);
            $("#eur_e").html(returnValue[1].EUR);
            $("#eur_i").html(returnValue[0].EUR);
            $("#cny_e").html(returnValue[1].CNY);
            $("#cny_i").html(returnValue[0].CNY);
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
        		noticeSubject = v.b_subject.substr(0,length)+'...';
        	}else{
        		noticeSubject = v.b_subject;
        	}
            appendHtml1 = appendHtml1 + '<li>\n';
            appendHtml1 = appendHtml1 + '<a href="javascript:fn_popAction1(\'' + v.idx + '\');" title=\'' + v.b_subject + '\'><img src="../images/cps/main02_box02_icon.jpg">\n';
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
	    drawfileList(d);
	    $("#filelist").show();
	});

	$("#seach_pop_bg").fadeIn("fast");
	$("#seach_pop").fadeIn("fast");
};

var fn_popAction1 = function(idx){
	var url 	= "../apis/maria/selectBoardInfoList",
	    params 	= {"idx":idx},
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
		console.log(d);
		var html = "";
		html = html +"<tr><td class='left'>작성자</td><td class='taL'>"+d[0].b_name+"</td>";
		html = html +"<td class='left'>작성일자</td><td>"+convertUnixDt(d[0].regdate.toString())+"</td>";
		html = html +"<td class='left'>조회수</td><td>"+d[0].b_count+"</td></tr>";
		html = html +"<tr><td class='left'>제목</td><td colspan='5' class='taL'>"+d[0].b_subject+"</td></tr>";

		var content = d[0].b_content.replace(/jpg&quot;/gi,'jpg').replace(/&quot;/gi,'https://www.seincustoms.com');
		$("#bbs_title").html(html);
		$(".seach_review_txt").html(content);

		var html = "";
		if(d[0].b_file.indexOf("|") != -1){
			var fileSplit   = d[0].b_file.split('|')
			var fileNmSplit = d[0].b_file_name.split('|');
		    for (var i = 0; i < fileSplit.length; i++) {
		    	html = html +"<a href='https://www.seincustoms.com/data/board/info/"+ fileSplit[i] +"' target='_new')' style='cursor:pointer'>"+ fileNmSplit[i] +"</a><br>";
		    }
		}else{
			html = html +"<a href='https://www.seincustoms.com/data/board/info/"+d[0].b_file+"' target='_new')' style='cursor:pointer'>"+ d[0].b_file_name +"</a>";
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

//function bbsWrite(){
//	var url = 'http://ims.customspass.com/client/helpdesk.sein';
//	parent.addTab("게시글 등록", url);
//};

function bbsWrite(a){
	var url = './bbsWrite.cps?category=' + a;
	parent.addTab("게시글 등록", url);
};

function openImport(){
	parent.addTab("Import Status", "../import/importOriginList.cps");
};

function openExport(){
	parent.addTab("Export Status", "../export/exportOriginList.cps");
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
			"display"			: "200",
			"efYd"				: "20190101~21001231"
		},
        type 	= "POST";

    sendAjax(url, params, type, function(d){
        callback(d);
    });
};

selectLawList(function(d){
    var HS_LAW = d.content.HS_LAW;
    var appendHtml 	= "";
    if(!isEmpty(HS_LAW)){
        $(HS_LAW).each(function (i, v){
        	var length = 30;
        	var 볍령명   = "";
        	if(v.법령명한글.length >= length){
        		볍령명 = v.법령명한글.substr(0,length)+'...';
        	}else{
        		볍령명 = v.법령명한글;
        	}
            appendHtml = appendHtml + '<li><a href="javascript:openWindow(\'' + 'http://www.law.go.kr' + v.법령상세링크 + '\');" title=\'' + v.법령명한글 + '\'><img src="../images/cps/main02_box02_icon.jpg">' + 볍령명 + '<span>[' + commonPrettyDateTimeFormatter(v.공포일자.toString()) + ']</span></a></li>\n';

            return i < 5;
        });
        $('#LawsNotice').append(
        	appendHtml
        );
    }
});

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

function addComma(num) {
	  var regexp = /\B(?=(\d{3})+(?!\d))/g;
	  return num.toString().replace(regexp, ',');
}