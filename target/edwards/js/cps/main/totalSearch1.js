$(document).ready(function(){
	if(isEmpty($('#ID').val())){
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
		getCommonNoticeList($("#keyword").val().trim().replace(/-/gi,''), "impoSingoNo", drawCommonNoticeList, "impoSingo");
		getCommonNoticeList($("#keyword").val(), "Imlan_gije", drawCommonNoticeList, "impoPo");
		getCommonNoticeList($("#keyword").val(), "impoBlNo", drawCommonNoticeList, "impoBl");
		getCommonNoticeList1($("#keyword").val(), "impumJajaeCode", drawCommonNoticeList, "impoJajae");
		getCommonNoticeList1($("#keyword").val(), "impumGukyk", drawCommonNoticeList, "impoGuk");
		getCommonNoticeList1($("#keyword").val(), "impumSungbun", drawCommonNoticeList, "impoSung");

		getCommonNoticeList2($("#keyword").val().trim().replace(/-/gi,''), "expoSingoNo", drawCommonNoticeList, "expoSingo");
		getCommonNoticeList2($("#keyword").val(), "expoIvNo", drawCommonNoticeList, "expoInv");
		getCommonNoticeList3($("#keyword").val(), "expumJepumCode", drawCommonNoticeList, "expoJajae");
		getCommonNoticeList3($("#keyword").val(), "expumPum", drawCommonNoticeList, "expoGuk");
		getCommonNoticeList3($("#keyword").val(), "expumSungbun", drawCommonNoticeList, "expoSung");
	}
});

function getCommonNoticeList(keyword, name, callback, target){
    var url 	= "../apis/customs/selectImportStatusList",
        params 	= {
    		"_defaultDB" 	: $('#_defaultDB').val(),
    		"USERGRADE" 	: $('#USERGRADE').val(),
    		"taxNum" 		: $('#taxNum').val(),
    		"ID" 			: $('#ID').val(),
    		"USERID" 		: $('#USERID').val()
    	},
        type 	= "POST";

    params[name] = keyword;

    sendAjax(url, params, type, function(d){
    	console.log(d);
    	if(name=="impoSingoNo" && d.length > 5){
    		$('#impoSingoBtn').css("display", "");
    	}
    	if(name=="Imlan_gije" && d.length > 5){
    		$('#impoPoBtn').css("display", "");
    	}
    	if(name=="impoBlNo" && d.length > 5){
    		$('#impoBlBtn').css("display", "");
    	}
        callback(keyword, name, d, target);
    });
};

function getCommonNoticeList1(keyword, name, callback, target){
    var url 	= "../apis/customs/selectZeissImportStatusDetail",
        params 	= {
    		"taxNum" : $('#taxNum').val()
    	},
        type 	= "POST";

    params[name] = keyword;

    sendAjax(url, params, type, function(d){
    	console.log(d);
    	if(name=="impumJajaeCode" && d.length > 5){
    		$('#impoJajaeBtn').css("display", "");
    	}
    	if(name=="impumGukyk" && d.length > 5){
    		$('#impoGukBtn').css("display", "");
    	}
    	if(name=="impumSungbun" && d.length > 5){
    		$('#impoSungBtn').css("display", "");
    	}
        callback(keyword, name, d, target);
    });
};

function getCommonNoticeList2(keyword, name, callback, target){
    var url 	= "../apis/customs/selectZeissExportStatusList",
        params 	= {
    		"_defaultDB" 	: $('#_defaultDB').val(),
    		"USERGRADE" 	: $('#USERGRADE').val(),
    		"taxNum" 		: $('#taxNum').val(),
    		"ID" 			: $('#ID').val(),
    		"USERID" 		: $('#USERID').val()
    	},
        type 	= "POST";

    params[name] = keyword;

    sendAjax(url, params, type, function(d){
    	console.log(d);
    	if(name=="expoSingoNo" && d.length > 5){
    		$('#expoSingoBtn').css("display", "");
    	}
    	if(name=="expoIvNo" && d.length > 5){
    		$('#impoInvBtn').css("display", "");
    	}
        callback(keyword, name, d, target);
    });
};

function getCommonNoticeList3(keyword, name, callback, target){
    var url 	= "../apis/customs/selectZeissExportStatusDetail",
        params 	= {
    		"taxNum" : $('#taxNum').val()
    	},
        type 	= "POST";

    params[name] = keyword;

    sendAjax(url, params, type, function(d){
    	console.log(d);
    	if(name=="expumJepumCode" && d.length > 5){
    		$('#expoJajaeBtn').css("display", "");
    	}
    	if(name=="expumPum" && d.length > 5){
    		$('#expoGukBtn').css("display", "");
    	}
    	if(name=="expumSungbun" && d.length > 5){
    		$('#expoSungBtn').css("display", "");
    	}
        callback(keyword, name, d, target);
    });
};

var drawCommonNoticeList = function(keyword, name, data, target){
    var optList = new Array();
    var length = 50;
    for(var i = 0; i < 5; i++){
    	var subject = '';
        if(data[i]){
        	if(target=="impoSingo"){
        		subject = data[i].Impo_singo_no.substr(0,5)+"-"+data[i].Impo_singo_no.substr(5,2)+"-"+data[i].Impo_singo_no.substr(7,7);
        		optList[optList.length] = "<li><a href='javascript:openImport(\""+ data[i].Impo_singo_no +"\", \""+ target +"\");'><img src='../images/cps/main02_box02_icon.jpg'>" + subject + "</a></li>";
        	}
        	if(target=="impoPo"){
        		if(data[i].Imlan_gije.length >= length){
            		subject = data[i].Imlan_gije.substr(0,length)+'...';
            	}else{
            		subject = data[i].Imlan_gije;
            	}
        		if(data[i].PONO ==''){
        			optList[optList.length] = "<li><a href='javascript:openImport(\""+ $('#keyword').val() +"\", \""+ target +"\");'><img src='../images/cps/main02_box02_icon.jpg'>" + subject + "</a></li>";
        		}else{
        			optList[optList.length] = "<li><a href='javascript:openImport(\""+ data[i].PONO +"\", \""+ target +"\");'><img src='../images/cps/main02_box02_icon.jpg'>" + subject + "</a></li>";
        		}
        	}
        	if(target=="impoBl"){
        		subject = data[i].Impo_bl_no;
        		optList[optList.length] = "<li><a href='javascript:openImport(\""+ data[i].Impo_bl_no +"\", \""+ target +"\");'><img src='../images/cps/main02_box02_icon.jpg'>" + subject + "</a></li>";
        	}
        	if(target=="impoJajae"){
        		subject = data[i].Impum_jajae_code;
        		optList[optList.length] = "<li><a href='javascript:openImport(\""+ data[i].Impum_jajae_code +"\", \""+ target +"\");'><img src='../images/cps/main02_box02_icon.jpg'>" + subject + "</a></li>";
        	}
        	if(target=="impoGuk"){
        		subject = data[i].Impum_gukyk;
        		optList[optList.length] = "<li><a href='javascript:openImport(\""+ data[i].Impum_gukyk +"\", \""+ target +"\");'><img src='../images/cps/main02_box02_icon.jpg'>" + subject + "</a></li>";
        	}
        	if(target=="impoSung"){
        		subject = data[i].Impum_sungbun;
        		optList[optList.length] = "<li><a href='javascript:openImport(\""+ data[i].Impum_sungbun +"\", \""+ target +"\");'><img src='../images/cps/main02_box02_icon.jpg'>" + subject + "</a></li>";
        	}
        	if(target=="expoSingo"){
        		subject = data[i].Expo_singo_no.substr(0,5)+"-"+data[i].Expo_singo_no.substr(5,2)+"-"+data[i].Expo_singo_no.substr(7,7);
        		optList[optList.length] = "<li><a href='javascript:openExport(\""+ data[i].Expo_singo_no +"\", \""+ target +"\");'><img src='../images/cps/main02_box02_icon.jpg'>" + subject + "</a></li>";
        	}
        	if(target=="expoInv"){
        		subject = data[i].Expo_iv_no;
        		optList[optList.length] = "<li><a href='javascript:openExport(\""+ data[i].Expo_iv_no +"\", \""+ target +"\");'><img src='../images/cps/main02_box02_icon.jpg'>" + subject + "</a></li>";
        	}
        	if(target=="expoJajae"){
        		subject = data[i].Expum_jepum_code;
        		optList[optList.length] = "<li><a href='javascript:openExport(\""+ data[i].Expum_jepum_code +"\", \""+ target +"\");'><img src='../images/cps/main02_box02_icon.jpg'>" + subject + "</a></li>";
        	}
        	if(target=="expoGuk"){
        		subject = data[i].Expum_pum;
        		optList[optList.length] = "<li><a href='javascript:openExport(\""+ data[i].Expum_pum +"\", \""+ target +"\");'><img src='../images/cps/main02_box02_icon.jpg'>" + subject + "</a></li>";
        	}
        	if(target=="expoSung"){
        		subject = data[i].Expum_sungbun;
        		optList[optList.length] = "<li><a href='javascript:openExport(\""+ data[i].Expum_sungbun +"\", \""+ target +"\");'><img src='../images/cps/main02_box02_icon.jpg'>" + subject + "</a></li>";
        	}
        }
    }
    $("#" + target).html(optList.join("\n"));
};

function openImport(singo,target){
	if(target=="impoSingo"){
		if($('#setMenu').val()=="K"){
			if(parent.$('#tt').tabs('exists', "수입현황")){
				parent.$('#tt').tabs('close', "수입현황");
		    	parent.addTab("수입현황", "../import/importOriginList.cps?impoSingo="+ singo +"");
		    }else{
		    	parent.addTab("수입현황", "../import/importOriginList.cps?impoSingo="+ singo +"");
		    }
		}else{
			if(parent.$('#tt').tabs('exists', "Import Status")){
				parent.$('#tt').tabs('close', "Import Status");
		    	parent.addTab("Import Status", "../import/importOriginEngList.cps?impoSingo="+ singo +"");
		    }else{
		    	parent.addTab("Import Status", "../import/importOriginEngList.cps?impoSingo="+ singo +"");
		    }
		}
	}
	if(target=="impoPo"){
		if($('#setMenu').val()=="K"){
			if(parent.$('#tt').tabs('exists', "수입현황")){
				parent.$('#tt').tabs('close', "수입현황");
		    	parent.addTab("수입현황", "../import/importOriginList.cps?Imlan_gije="+ singo +"");
		    }else{
		    	parent.addTab("수입현황", "../import/importOriginList.cps?Imlan_gije="+ singo +"");
		    }
		}else{
			if(parent.$('#tt').tabs('exists', "Import Status")){
				parent.$('#tt').tabs('close', "Import Status");
		    	parent.addTab("Import Status", "../import/importOriginEngList.cps?Imlan_gije="+ singo +"");
		    }else{
		    	parent.addTab("Import Status", "../import/importOriginEngList.cps?Imlan_gije="+ singo +"");
		    }
		}
	}
	if(target=="impoBl"){
		if($('#setMenu').val()=="K"){
			if(parent.$('#tt').tabs('exists', "수입현황")){
				parent.$('#tt').tabs('close', "수입현황");
		    	parent.addTab("수입현황", "../import/importOriginList.cps?impoBl="+ singo +"");
		    }else{
		    	parent.addTab("수입현황", "../import/importOriginList.cps?impoBl="+ singo +"");
		    }
		}else{
			if(parent.$('#tt').tabs('exists', "Import Status")){
				parent.$('#tt').tabs('close', "Import Status");
		    	parent.addTab("Import Status", "../import/importOriginEngList.cps?impoBl="+ singo +"");
		    }else{
		    	parent.addTab("Import Status", "../import/importOriginEngList.cps?impoBl="+ singo +"");
		    }
		}
	}
	if(target=="impoJajae"){
		if($('#setMenu').val()=="K"){
			if(parent.$('#tt').tabs('exists', "수입현황")){
				parent.$('#tt').tabs('close', "수입현황");
		    	parent.addTab("수입현황", "../import/importOriginList.cps?impoJajae="+ singo +"");
		    }else{
		    	parent.addTab("수입현황", "../import/importOriginList.cps?impoJajae="+ singo +"");
		    }
		}else{
			if(parent.$('#tt').tabs('exists', "Import Status")){
				parent.$('#tt').tabs('close', "Import Status");
		    	parent.addTab("Import Status", "../import/importOriginEngList.cps?impoJajae="+ singo +"");
		    }else{
		    	parent.addTab("Import Status", "../import/importOriginEngList.cps?impoJajae="+ singo +"");
		    }
		}
	}
	if(target=="impoGuk"){
		if($('#setMenu').val()=="K"){
			if(parent.$('#tt').tabs('exists', "수입현황")){
				parent.$('#tt').tabs('close', "수입현황");
		    	parent.addTab("수입현황", "../import/importOriginList.cps?impoGuk="+ singo +"");
		    }else{
		    	parent.addTab("수입현황", "../import/importOriginList.cps?impoGuk="+ singo +"");
		    }
		}else{
			if(parent.$('#tt').tabs('exists', "Import Status")){
				parent.$('#tt').tabs('close', "Import Status");
		    	parent.addTab("Import Status", "../import/importOriginEngList.cps?impoGuk="+ singo +"");
		    }else{
		    	parent.addTab("Import Status", "../import/importOriginEngList.cps?impoGuk="+ singo +"");
		    }
		}
	}
	if(target=="impoSung"){
		if($('#setMenu').val()=="K"){
			if(parent.$('#tt').tabs('exists', "수입현황")){
				parent.$('#tt').tabs('close', "수입현황");
		    	parent.addTab("수입현황", "../import/importOriginList.cps?impoSung="+ singo +"");
		    }else{
		    	parent.addTab("수입현황", "../import/importOriginList.cps?impoSung="+ singo +"");
		    }
		}else{
			if(parent.$('#tt').tabs('exists', "Import Status")){
				parent.$('#tt').tabs('close', "Import Status");
		    	parent.addTab("Import Status", "../import/importOriginEngList.cps?impoSung="+ singo +"");
		    }else{
		    	parent.addTab("Import Status", "../import/importOriginEngList.cps?impoSung="+ singo +"");
		    }
		}
	}
};

function openImportAll(target){
	if(target=="impoSingo"){
		if($('#setMenu').val()=="K"){
			if(parent.$('#tt').tabs('exists', "수입현황")){
				parent.$('#tt').tabs('close', "수입현황");
		    	parent.addTab("수입현황", "../import/importOriginList.cps?impoSingo="+ $('#keyword').val() +"");
		    }else{
		    	parent.addTab("수입현황", "../import/importOriginList.cps?impoSingo="+ $('#keyword').val() +"");
		    }
		}else{
			if(parent.$('#tt').tabs('exists', "Import Status")){
				parent.$('#tt').tabs('close', "Import Status");
		    	parent.addTab("Import Status", "../import/importOriginEngList.cps?impoSingo="+ $('#keyword').val() +"");
		    }else{
		    	parent.addTab("Import Status", "../import/importOriginEngList.cps?impoSingo="+ $('#keyword').val() +"");
		    }
		}
	}
	if(target=="impoPo"){
		if($('#setMenu').val()=="K"){
			if(parent.$('#tt').tabs('exists', "수입현황")){
				parent.$('#tt').tabs('close', "수입현황");
		    	parent.addTab("수입현황", "../import/importOriginList.cps?Imlan_gije="+ $('#keyword').val() +"");
		    }else{
		    	parent.addTab("수입현황", "../import/importOriginList.cps?Imlan_gije="+ $('#keyword').val() +"");
		    }
		}else{
			if(parent.$('#tt').tabs('exists', "Import Status")){
				parent.$('#tt').tabs('close', "Import Status");
		    	parent.addTab("Import Status", "../import/importOriginEngList.cps?Imlan_gije="+ $('#keyword').val() +"");
		    }else{
		    	parent.addTab("Import Status", "../import/importOriginEngList.cps?Imlan_gije="+ $('#keyword').val() +"");
		    }
		}
	}
	if(target=="impoBl"){
		if($('#setMenu').val()=="K"){
			if(parent.$('#tt').tabs('exists', "수입현황")){
				parent.$('#tt').tabs('close', "수입현황");
		    	parent.addTab("수입현황", "../import/importOriginList.cps?impoBl="+ $('#keyword').val() +"");
		    }else{
		    	parent.addTab("수입현황", "../import/importOriginList.cps?impoBl="+ $('#keyword').val() +"");
		    }
		}else{
			if(parent.$('#tt').tabs('exists', "Import Status")){
				parent.$('#tt').tabs('close', "Import Status");
		    	parent.addTab("Import Status", "../import/importOriginEngList.cps?impoBl="+ $('#keyword').val() +"");
		    }else{
		    	parent.addTab("Import Status", "../import/importOriginEngList.cps?impoBl="+ $('#keyword').val() +"");
		    }
		}
	}
	if(target=="impoJajae"){
		if($('#setMenu').val()=="K"){
			if(parent.$('#tt').tabs('exists', "수입현황")){
				parent.$('#tt').tabs('close', "수입현황");
		    	parent.addTab("수입현황", "../import/importOriginList.cps?impoJajae="+ $('#keyword').val() +"");
		    }else{
		    	parent.addTab("수입현황", "../import/importOriginList.cps?impoJajae="+ $('#keyword').val() +"");
		    }
		}else{
			if(parent.$('#tt').tabs('exists', "Import Status")){
				parent.$('#tt').tabs('close', "Import Status");
		    	parent.addTab("Import Status", "../import/importOriginEngList.cps?impoJajae="+ $('#keyword').val() +"");
		    }else{
		    	parent.addTab("Import Status", "../import/importOriginEngList.cps?impoJajae="+ $('#keyword').val() +"");
		    }
		}
	}
	if(target=="impoGuk"){
		if($('#setMenu').val()=="K"){
			if(parent.$('#tt').tabs('exists', "수입현황")){
				parent.$('#tt').tabs('close', "수입현황");
		    	parent.addTab("수입현황", "../import/importOriginList.cps?impoGuk="+ $('#keyword').val() +"");
		    }else{
		    	parent.addTab("수입현황", "../import/importOriginList.cps?impoGuk="+ $('#keyword').val() +"");
		    }
		}else{
			if(parent.$('#tt').tabs('exists', "Import Status")){
				parent.$('#tt').tabs('close', "Import Status");
		    	parent.addTab("Import Status", "../import/importOriginEngList.cps?impoGuk="+ $('#keyword').val() +"");
		    }else{
		    	parent.addTab("Import Status", "../import/importOriginEngList.cps?impoGuk="+ $('#keyword').val() +"");
		    }
		}
	}
	if(target=="impoSung"){
		if($('#setMenu').val()=="K"){
			if(parent.$('#tt').tabs('exists', "수입현황")){
				parent.$('#tt').tabs('close', "수입현황");
		    	parent.addTab("수입현황", "../import/importOriginList.cps?impoSung="+ $('#keyword').val() +"");
		    }else{
		    	parent.addTab("수입현황", "../import/importOriginList.cps?impoSung="+ $('#keyword').val() +"");
		    }
		}else{
			if(parent.$('#tt').tabs('exists', "Import Status")){
				parent.$('#tt').tabs('close', "Import Status");
		    	parent.addTab("Import Status", "../import/importOriginEngList.cps?impoSung="+ $('#keyword').val() +"");
		    }else{
		    	parent.addTab("Import Status", "../import/importOriginEngList.cps?impoSung="+ $('#keyword').val() +"");
		    }
		}
	}
};

function openExport(singo,target){
	if(target=="expoSingo"){
		if($('#setMenu').val()=="K"){
			if(parent.$('#tt').tabs('exists', "수출현황")){
				parent.$('#tt').tabs('close', "수출현황");
		    	parent.addTab("수출현황", "../export/exportOriginList.cps?expoSingo="+ singo +"");
		    }else{
		    	parent.addTab("수출현황", "../export/exportOriginList.cps?expoSingo="+ singo +"");
		    }
		}else{
			if(parent.$('#tt').tabs('exists', "Export Status")){
				parent.$('#tt').tabs('close', "Export Status");
		    	parent.addTab("Export Status", "../export/exportOriginEngList.cps?expoSingo="+ singo +"");
		    }else{
		    	parent.addTab("Export Status", "../export/exportOriginEngList.cps?expoSingo="+ singo +"");
		    }
		}
	}
	if(target=="expoInv"){
		if($('#setMenu').val()=="K"){
			if(parent.$('#tt').tabs('exists', "수출현황")){
				parent.$('#tt').tabs('close', "수출현황");
		    	parent.addTab("수출현황", "../export/exportOriginList.cps?expoInv="+ singo +"");
		    }else{
		    	parent.addTab("수출현황", "../export/exportOriginList.cps?expoInv="+ singo +"");
		    }
		}else{
			if(parent.$('#tt').tabs('exists', "Export Status")){
				parent.$('#tt').tabs('close', "Export Status");
		    	parent.addTab("Export Status", "../export/exportOriginEngList.cps?expoInv="+ singo +"");
		    }else{
		    	parent.addTab("Export Status", "../export/exportOriginEngList.cps?expoInv="+ singo +"");
		    }
		}
	}
	if(target=="expoJajae"){
		if($('#setMenu').val()=="K"){
			if(parent.$('#tt').tabs('exists', "수출현황")){
				parent.$('#tt').tabs('close', "수출현황");
		    	parent.addTab("수출현황", "../export/exportOriginList.cps?expoJajae="+ singo +"");
		    }else{
		    	parent.addTab("수출현황", "../export/exportOriginList.cps?expoJajae="+ singo +"");
		    }
		}else{
			if(parent.$('#tt').tabs('exists', "Export Status")){
				parent.$('#tt').tabs('close', "Export Status");
		    	parent.addTab("Export Status", "../export/exportOriginEngList.cps?expoJajae="+ singo +"");
		    }else{
		    	parent.addTab("Export Status", "../export/exportOriginEngList.cps?expoJajae="+ singo +"");
		    }
		}
	}
	if(target=="expoGuk"){
		if($('#setMenu').val()=="K"){
			if(parent.$('#tt').tabs('exists', "수출현황")){
				parent.$('#tt').tabs('close', "수출현황");
		    	parent.addTab("수출현황", "../export/exportOriginList.cps?expoGuk="+ singo +"");
		    }else{
		    	parent.addTab("수출현황", "../export/exportOriginList.cps?expoGuk="+ singo +"");
		    }
		}else{
			if(parent.$('#tt').tabs('exists', "Export Status")){
				parent.$('#tt').tabs('close', "Export Status");
		    	parent.addTab("Export Status", "../export/exportOriginEngList.cps?expoGuk="+ singo +"");
		    }else{
		    	parent.addTab("Export Status", "../export/exportOriginEngList.cps?expoGuk="+ singo +"");
		    }
		}
	}
	if(target=="expoSung"){
		if($('#setMenu').val()=="K"){
			if(parent.$('#tt').tabs('exists', "수출현황")){
				parent.$('#tt').tabs('close', "수출현황");
		    	parent.addTab("수출현황", "../export/exportOriginList.cps?expoSung="+ singo +"");
		    }else{
		    	parent.addTab("수출현황", "../export/exportOriginList.cps?expoSung="+ singo +"");
		    }
		}else{
			if(parent.$('#tt').tabs('exists', "Export Status")){
				parent.$('#tt').tabs('close', "Export Status");
		    	parent.addTab("Export Status", "../export/exportOriginEngList.cps?expoSung="+ singo +"");
		    }else{
		    	parent.addTab("Export Status", "../export/exportOriginEngList.cps?expoSung="+ singo +"");
		    }
		}
	}
};

function openExportAll(target){
	if(target=="expoSingo"){
		if($('#setMenu').val()=="K"){
			if(parent.$('#tt').tabs('exists', "수출현황")){
				parent.$('#tt').tabs('close', "수출현황");
		    	parent.addTab("수출현황", "../export/exportOriginList.cps?expoSingo="+ $('#keyword').val() +"");
		    }else{
		    	parent.addTab("수출현황", "../export/exportOriginList.cps?expoSingo="+ $('#keyword').val() +"");
		    }
		}else{
			if(parent.$('#tt').tabs('exists', "Export Status")){
				parent.$('#tt').tabs('close', "Export Status");
		    	parent.addTab("Export Status", "../export/exportOriginEngList.cps?expoSingo="+ $('#keyword').val() +"");
		    }else{
		    	parent.addTab("Export Status", "../export/exportOriginEngList.cps?expoSingo="+ $('#keyword').val() +"");
		    }
		}
	}
	if(target=="expoInv"){
		if($('#setMenu').val()=="K"){
			if(parent.$('#tt').tabs('exists', "수출현황")){
				parent.$('#tt').tabs('close', "수출현황");
		    	parent.addTab("수출현황", "../export/exportOriginList.cps?expoInv="+ $('#keyword').val() +"");
		    }else{
		    	parent.addTab("수출현황", "../export/exportOriginList.cps?expoInv="+ $('#keyword').val() +"");
		    }
		}else{
			if(parent.$('#tt').tabs('exists', "Export Status")){
				parent.$('#tt').tabs('close', "Export Status");
		    	parent.addTab("Export Status", "../export/exportOriginEngList.cps?expoInv="+ $('#keyword').val() +"");
		    }else{
		    	parent.addTab("Export Status", "../export/exportOriginEngList.cps?expoInv="+ $('#keyword').val() +"");
		    }
		}
	}
	if(target=="expoJajae"){
		if($('#setMenu').val()=="K"){
			if(parent.$('#tt').tabs('exists', "수출현황")){
				parent.$('#tt').tabs('close', "수출현황");
		    	parent.addTab("수출현황", "../export/exportOriginList.cps?expoJajae="+ $('#keyword').val() +"");
		    }else{
		    	parent.addTab("수출현황", "../export/exportOriginList.cps?expoJajae="+ $('#keyword').val() +"");
		    }
		}else{
			if(parent.$('#tt').tabs('exists', "Export Status")){
				parent.$('#tt').tabs('close', "Export Status");
		    	parent.addTab("Export Status", "../export/exportOriginEngList.cps?expoJajae="+ $('#keyword').val() +"");
		    }else{
		    	parent.addTab("Export Status", "../export/exportOriginEngList.cps?expoJajae="+ $('#keyword').val() +"");
		    }
		}
	}
	if(target=="expoGuk"){
		if($('#setMenu').val()=="K"){
			if(parent.$('#tt').tabs('exists', "수출현황")){
				parent.$('#tt').tabs('close', "수출현황");
		    	parent.addTab("수출현황", "../export/exportOriginList.cps?expoGuk="+ $('#keyword').val() +"");
		    }else{
		    	parent.addTab("수출현황", "../export/exportOriginList.cps?expoGuk="+ $('#keyword').val() +"");
		    }
		}else{
			if(parent.$('#tt').tabs('exists', "Export Status")){
				parent.$('#tt').tabs('close', "Export Status");
		    	parent.addTab("Export Status", "../export/exportOriginEngList.cps?expoGuk="+ $('#keyword').val() +"");
		    }else{
		    	parent.addTab("Export Status", "../export/exportOriginEngList.cps?expoGuk="+ $('#keyword').val() +"");
		    }
		}
	}
	if(target=="expoSung"){
		if($('#setMenu').val()=="K"){
			if(parent.$('#tt').tabs('exists', "수출현황")){
				parent.$('#tt').tabs('close', "수출현황");
		    	parent.addTab("수출현황", "../export/exportOriginList.cps?expoSung="+ $('#keyword').val() +"");
		    }else{
		    	parent.addTab("수출현황", "../export/exportOriginList.cps?expoSung="+ $('#keyword').val() +"");
		    }
		}else{
			if(parent.$('#tt').tabs('exists', "Export Status")){
				parent.$('#tt').tabs('close', "Export Status");
		    	parent.addTab("Export Status", "../export/exportOriginEngList.cps?expoSung="+ $('#keyword').val() +"");
		    }else{
		    	parent.addTab("Export Status", "../export/exportOriginEngList.cps?expoSung="+ $('#keyword').val() +"");
		    }
		}
	}
};