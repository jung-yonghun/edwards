function getMenuList(callback){
    var url 	= "../apis/system/selectSysMenuList",
        params 	= {"userKey" : $("#userKey").val()},
        type 	= "POST";

    sendAjax(url, params, type, function(d){
    	console.log(d);
        callback(d);
    });
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
			console.log(d.check);
			if(d.check=="Y"){
				alert("다른 곳에서 같은 아이디로 접속이 있었습니다.");
				parent.document.location.href="../logout.cps";
			}
		});

		getMenuData();

		var lnb_h 	= $("#wrap").css("height");
		var ri_h 	= $(".cont_con > .right").css("height");
		var w_wid 	= $(window).width();

		$(".cont_con > .left").css("height", ri_h);
		$(".dip01").css("height",lnb_h);

		if(w_wid > 1218){
			$(".menu_B a").click(function(){
				if($(".menu_B a").attr('class') == "active" ){
					$(this).removeClass("active");
					$(this).addClass("off");
					$(".cont_con > .left").stop().animate({
						"width" : "182px"
					},300);

					$(".cont_con > .right").stop().animate({
						"width" : "1315px"
					},300);
				}else if($(".menu_B a").attr('class') == "off"){
					$(this).removeClass("off");
					$(this).addClass("active");

					$(".cont_con > .left").stop().animate({
						"width" : 0
					},300);

					$(".cont_con > .right").stop().animate({
						"width" : "1500px"
					},300);
				}

			});
		}else{
			$(".menu_B a").click(function(){
				$(".left").addClass("menu_on");
				$(".black_bg").addClass("black_on");
			});
			$(".black_bg").click(function(){
				$(".left").removeClass("menu_on");
				$(this).removeClass("black_on");
				$(".dep02").css("display", "none");
			});
		}

		setTimeout(function(){
			$(".dep01 > li > a").click(function(){
				if ( $(this).next(".dep02").css("display") == "none" ){
					$(".dep02").stop().slideUp("fast");
					$(".dep01 > li").removeClass("active");
					$(this).parent().addClass("active");
					$(this).next(".dep02").stop().slideDown("fast");
				}else{
					$(this).parent().removeClass("active");
					$(".dep02").stop().slideUp("fast");
				}
			});
			$(".dep02 > li > a").click(function(){
				$(".dep02 > li").removeClass("active");
				$(this).parent().addClass("active");
			});
		}, 1000);

		$('#tt').tabs({
	        plain: true,
	        narrow: true
	    });

	    var title = 'MAIN';
	    if($('#tt').tabs('exists', title)){
	    	$('#tt').tabs('select', title);
	   	}else{
	   		var content = '<iframe scrolling="no" frameborder="0"  src="edwardsMain.cps" style="width:100%;height:100%;"></iframe>';
	       	$('#tt').tabs('add',{
	        	title:title,
	           	content:content
	       	});
	   	}
	}
});

var getMenuData = function(){
    getMenuList(function(d){
        if(!d){
            alert("관리자에게 문의하세요!!!\n데이터를 찾을 수 없습니다");
            return;
        }
        if($("#userMenu").val()=="E"){
        	if($("#userKey").val()=="794" || $("#userKey").val()=="795"){
        		menuEngListInfoNew(d);
        	}else{
        		menuEngListInfo(d);
        	}
        }else{
        	if($("#userKey").val()=="794" || $("#userKey").val()=="795"){
        		menuListInfoNew(d);
        	}else{
        		menuListInfo(d);
        	}
        }

    });
};

var menuEngListInfo = function(d){
    var tr = "";
    for(var i = 0; i < d.length; i++){
        if(i < d.length - 1){
            if(d[i].parentID == '0' && d[i].sortOrder != '2100'){
                tr = tr + "<ul class='dep01'><li><a href='javascript:;'>" + d[i].menuEngName + "<img src='../images/cps/lnb_arrow_off.jpg' class='off'><img src='../images/cps/lnb_arrow_on.jpg' class='on'></a><ul class='dep02'>";
            }else if(d[i].parentID == '0' && d[i].sortOrder == '2100'){
                tr = tr + "<ul class='dep01'><li><a href='javascript:;' class='fz10'>" + d[i].menuEngName + "<img src='../images/cps/lnb_arrow_off.jpg' class='off'><img src='../images/cps/lnb_arrow_on.jpg' class='on'></a><ul class='dep02'>";
            }else{
            	if(d[i].menuEngPath.substring(0,4)=="http"){
            		tr = tr + "<li><a href='" + d[i].menuEngPath + "' target='_new'><img src='../images/cps/depth02_icon.png' />" + d[i].menuEngName + "</a></li>";
            	}else if(d[i].menuEngPath.substring(0,11)=="/main/blank"){
            		tr = tr + "<li><a onclick='$(\"#dlg\").window(\"open\")'><img src='../images/cps/depth02_icon.png' style='cursor:pointer'/>" + d[i].menuEngName + "</a></li>";
            	}else{
            		tr = tr + "<li><a onclick='addTab(\"" + d[i].menuEngName + "\",\"" + _contextPath + d[i].menuEngPath + "\")'  style='cursor:pointer'><img src='../images/cps/depth02_icon.png' />" + d[i].menuEngName + "</a></li>";
            	}

            }

            if(d[i].parentID != '0'){
                if(d[i + 1].parentID == '0'){
                    tr = tr + "</ul></li>";
                }else{
                	tr = tr;
                }
            }
        }

        if(i == d.length - 1){
        	if(d[i].menuPath.substring(0,4)=="http"){
        		tr = tr + "<li><a href='" + d[i].menuEngPath + "' target='_new'><img src='../images/cps/depth02_icon.png' />" + d[i].menuEngName + "</a></li>";
        	}else{
        		tr = tr + "<li><a onclick='addTab(\"" + d[i].menuEngName + "\",\"" + _contextPath + d[i].menuEngPath + "\")'  style='cursor:pointer'><img src='../images/cps/depth02_icon.png' />" + d[i].menuEngName + "</a></li>";
        	}
        }
    };

    tr = tr + "</ul></li></ul>";
    $(".lnb_dep").append(tr);
};

var menuListInfo = function(d){
    var tr = "";
    for(var i = 0; i < d.length; i++){
        if(i < d.length - 1){
            if(d[i].parentID == '0' && d[i].sortOrder != '2100'){
                tr = tr + "<ul class='dep01'><li><a href='javascript:;'>" + d[i].menuName + "<img src='../images/cps/lnb_arrow_off.jpg' class='off'><img src='../images/cps/lnb_arrow_on.jpg' class='on'></a><ul class='dep02'>";
            }else if(d[i].parentID == '0' && d[i].sortOrder == '2100'){
                tr = tr + "<ul class='dep01'><li><a href='javascript:;'>" + d[i].menuName + "<img src='../images/cps/lnb_arrow_off.jpg' class='off'><img src='../images/cps/lnb_arrow_on.jpg' class='on'></a><ul class='dep02'>";
            }else{
            	if(d[i].menuPath.substring(0,4)=="http"){
            		tr = tr + "<li><a onclick='addTab1(\"" + d[i].menuName + "\",\"" + d[i].menuPath + "\")'  style='cursor:pointer'><img src='../images/cps/depth02_icon.png' />" + d[i].menuName + "</a></li>";
//            		tr = tr + "<li><a href='" + d[i].menuPath + "' target='_new'><img src='../images/cps/depth02_icon.png' />" + d[i].menuName + "</a></li>";
            	}else if(d[i].menuPath.substring(0,11)=="/main/blank"){
            		tr = tr + "<li><a onclick='$(\"#dlg\").window(\"open\")'  style='cursor:pointer'><img src='../images/cps/depth02_icon.png' />" + d[i].menuName + "</a></li>";
            	}else{
            		tr = tr + "<li><a onclick='addTab(\"" + d[i].menuName + "\",\"" + _contextPath + d[i].menuPath + "\")'  style='cursor:pointer'><img src='../images/cps/depth02_icon.png' />" + d[i].menuName + "</a></li>";
            	}

            }

            if(d[i].parentID != '0'){
                if(d[i + 1].parentID == '0'){
                    tr = tr + "</ul></li>";
                }else{
                	tr = tr;
                }
            }
        }

        if(i == d.length - 1){
        	if(d[i].menuPath.substring(0,4)=="http"){
        		tr = tr + "<li><a onclick='addTab(\"" + d[i].menuName + "\",\"" + d[i].menuPath + "\")'  style='cursor:pointer'><img src='../images/cps/depth02_icon.png' />" + d[i].menuName + "</a></li>";
//        		tr = tr + "<li><a href='" + d[i].menuPath + "' target='_new'><img src='../images/cps/depth02_icon.png' />" + d[i].menuName + "</a></li>";
        	}else{
        		tr = tr + "<li><a onclick='addTab(\"" + d[i].menuName + "\",\"" +  _contextPath + d[i].menuPath + "\")'  style='cursor:pointer'><img src='../images/cps/depth02_icon.png' />" + d[i].menuName + "</a></li>";
        	}
        }
    };

    tr = tr + "</ul></li></ul>";
    $(".lnb_dep").append(tr);
};

var menuEngListInfoNew = function(d){
    var tr = "";
    for(var i = 0; i < d.length; i++){
    	if(i < d.length - 1){
	    	if(d[i].sortOrder == 'a007'){
	    		tr = tr + "<ul class='dep01'><li><a onclick='javascript:fn_reportDown();'  style='cursor:pointer'>" + d[i].menuEngName + "</a></li></ul>";
	    	}else if(d[i].parentID == '0' && (d[i].sortOrder == 'a010' || d[i].sortOrder == 'a013' || d[i].sortOrder == 'a019' || d[i].sortOrder == 'a023' || d[i].sortOrder == 'a030' || d[i].sortOrder == 'a035')){
	            tr = tr + "<ul class='dep01'><li><a href='javascript:;'>" + d[i].menuEngName + "<img src='../images/cps/lnb_arrow_off.jpg' class='off'><img src='../images/cps/lnb_arrow_on.jpg' class='on'></a><ul class='dep02'>";
	    	}else if(d[i].parentID != '0'){
	    		tr = tr + "<li><a onclick='addTab(\"" + d[i].menuEngName + "\",\"" + _contextPath + d[i].menuEngPath + "\")'  style='cursor:pointer'><img src='../images/cps/depth02_icon.png' />" + d[i].menuEngName + "</a></li>";
	    	}else{
	    		tr = tr + "<ul class='dep01'><li><a onclick='addTab(\"" + d[i].menuEngName + "\",\"" +  _contextPath + d[i].menuEngPath + "\")'  style='cursor:pointer'>" + d[i].menuEngName + "</a></li></ul>";
	    	}
	    	if(d[i].parentID != '0'){
	            if(d[i + 1].parentID == '0'){
	                tr = tr + "</ul></li>";
	            }else{
	            	tr = tr;
	            }
	        }
    	}

    	if(i == d.length - 1){
    		if(d[i].sortOrder == 'a007'){
	    		tr = tr + "<ul class='dep01'><li><a onclick='javascript:fn_reportDown();'  style='cursor:pointer'>" + d[i].menuEngName + "</a></li></ul>";
	    	}else{
	    		tr = tr + "<li><a onclick='addTab(\"" + d[i].menuEngName + "\",\"" +  _contextPath + d[i].menuEngPath + "\")'  style='cursor:pointer'><img src='../images/cps/depth02_icon.png' />" + d[i].menuEngName + "</a></li>";
	    	}
        }
    };
    $(".lnb_dep").append(tr);
};

var menuListInfoNew = function(d){
    var tr = "";
    for(var i = 0; i < d.length; i++){
    	if(i < d.length - 1){
	    	if(d[i].sortOrder == 'a007'){
	    		tr = tr + "<ul class='dep01'><li><a onclick='javascript:fn_reportDown();'  style='cursor:pointer'>" + d[i].menuName + "</a></li></ul>";
	    	}else if(d[i].parentID == '0' && (d[i].sortOrder == 'a010' || d[i].sortOrder == 'a013' || d[i].sortOrder == 'a019' || d[i].sortOrder == 'a023' || d[i].sortOrder == 'a030' || d[i].sortOrder == 'a035')){
	            tr = tr + "<ul class='dep01'><li><a href='javascript:;'>" + d[i].menuName + "<img src='../images/cps/lnb_arrow_off.jpg' class='off'><img src='../images/cps/lnb_arrow_on.jpg' class='on'></a><ul class='dep02'>";
	    	}else if(d[i].parentID != '0'){
	    		tr = tr + "<li><a onclick='addTab(\"" + d[i].menuName + "\",\"" + _contextPath + d[i].menuPath + "\")'  style='cursor:pointer'><img src='../images/cps/depth02_icon.png' />" + d[i].menuName + "</a></li>";
	    	}else{
	    		tr = tr + "<ul class='dep01'><li><a onclick='addTab(\"" + d[i].menuName + "\",\"" +  _contextPath + d[i].menuPath + "\")'  style='cursor:pointer'>" + d[i].menuName + "</a></li></ul>";
	    	}
	    	if(d[i].parentID != '0'){
	            if(d[i + 1].parentID == '0'){
	                tr = tr + "</ul></li>";
	            }else{
	            	tr = tr;
	            }
	        }
    	}

    	if(i == d.length - 1){
    		if(d[i].sortOrder == 'a007'){
	    		tr = tr + "<ul class='dep01'><li><a onclick='javascript:fn_reportDown();'  style='cursor:pointer'>" + d[i].menuName + "</a></li></ul>";
	    	}else{
	    		tr = tr + "<li><a onclick='addTab(\"" + d[i].menuName + "\",\"" +  _contextPath + d[i].menuPath + "\")'  style='cursor:pointer'><img src='../images/cps/depth02_icon.png' />" + d[i].menuName + "</a></li>";
	    	}
        }
    };
    $(".lnb_dep").append(tr);
};

function addTab(title, url){
	if($('#tt').tabs('exists', title)){
    	$('#tt').tabs('select', title);
    }else{
        var content = '<iframe frameborder="0"  src="'+url+'" style="width:100%;height:100%;overflow:hidden;" scrolling="no"></iframe>';
        $('#tt').tabs('add',{
            title:title,
            content:content,
            closable:true
        });
    }
}

function addTab1(title, url){
	if($('#tt').tabs('exists', title)){
    	$('#tt').tabs('select', title);
    }else{
        var content = '<iframe frameborder="0"  src="'+url+'" style="width:100%;height:100%;overflow:hidden;padding:5px" scrolling="no"></iframe>';
        $('#tt').tabs('add',{
            title:title,
            content:content,
            closable:true
        });
    }
}

function addTabClose(title, url){
	if($('#tt').tabs('exists', title)){
		$('#tt').tabs('close', title);
		var content = '<iframe frameborder="0"  src="'+url+'" style="width:100%;height:100%;overflow:hidden;" scrolling="no"></iframe>';
        $('#tt').tabs('add',{
            title:title,
            content:content,
            closable:true
        });
    }else{
        var content = '<iframe frameborder="0"  src="'+url+'" style="width:100%;height:100%;overflow:hidden;" scrolling="no"></iframe>';
        $('#tt').tabs('add',{
            title:title,
            content:content,
            closable:true
        });
    }
}

function close(title){
	$('#tt').tabs('close', title);
}

function Logout(){
	var url 	= "../saveLogout",
		params 	= {},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		setTimeout(function(){
			parent.document.location.href="../logout.cps";
		},100);
	});
}

function returnMain(){
	document.location.href="./main.cps";
}

var popup = function(){
	window.open("../include/popup.cps","width=400, height=300, scrollbars=no, location=no, menubar=no", "popup");
};

var fn_reportDown = function(){
	if ($("#userTaxNo").val() == "") {
		var url 	= "../apis/system/selectMonthlyList",
			params 	= {},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			$("#reportForm #OPT_IMFROM").val(d[0].IMFROM);
			$("#reportForm #OPT_IMTO").val(d[0].IMTO);
			$("#reportForm #OPT_EXFROM").val(d[0].EXFROM);
			$("#reportForm #OPT_EXTO").val(d[0].EXTO);
			$("#reportForm #OPT_IMPONAPSESAUP").val(d[0].RptImpoNapseSaup);
			$("#reportForm #REPORTMNGNO").val(d[0].ReportMngNo);
			$("#reportForm #RIPDIV").val(d[0].RptDiv);
			$("#reportForm #DBNM").val("ncustoms");
			$("#reportForm #OPT_DBNM").val(d[0].DBNM);
			$("#reportForm #IMPOANALYSISMNGNUM").val(d[0].impoAnalysisMngNum);

			document.reportForm.action = 'http://doc.customspass.com/ClipReport4/monthlyReport.jsp';
			document.reportForm.target = '_new';
			document.reportForm.method = 'GET';
			document.reportForm.submit();
		});
	}else{
		var url 	= "../apis/system/selectMonthlyList",
			params 	= {"RptImpoNapseSaup" : $("#userTaxNo").val()},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			console.log(d);
			$("#reportForm #OPT_IMFROM").val(d[0].IMFROM);
			$("#reportForm #OPT_IMTO").val(d[0].IMTO);
			$("#reportForm #OPT_EXFROM").val(d[0].EXFROM);
			$("#reportForm #OPT_EXTO").val(d[0].EXTO);
			$("#reportForm #OPT_IMPONAPSESAUP").val(d[0].RptImpoNapseSaup);
			$("#reportForm #REPORTMNGNO").val(d[0].ReportMngNo);
			$("#reportForm #RIPDIV").val(d[0].RptDiv);
			$("#reportForm #DBNM").val("ncustoms");
			$("#reportForm #OPT_DBNM").val(d[0].DBNM);
			$("#reportForm #IMPOANALYSISMNGNUM").val(d[0].impoAnalysisMngNum);

			document.reportForm.action = 'http://doc.customspass.com/ClipReport4/monthlyReport.jsp';
			document.reportForm.target = '_new';
			document.reportForm.method = 'GET';
			document.reportForm.submit();
		});
	}
}