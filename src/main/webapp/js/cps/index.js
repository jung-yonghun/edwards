$(document).ready(function(){
	var cpsId = getCookie("cpsId");
	$("input[name='userEmail']").val(cpsId);

	if($("input[name='userEmail']").val() != ""){
		$("#emailSaveCheck").attr("checked", true);
	}

	$("#emailSaveCheck").change(function(){
		if($("#emailSaveCheck").is(":checked")){
			var cpsId = $("input[name='userEmail']").val();
			setCookie("cpsId", cpsId, 7);
	    }else{
	        deleteCookie("cpsId");
	    }
	});

	$("input[name='userEmail']").keyup(function(){
	    if($("#emailSaveCheck").is(":checked")){
	        var cpsId = $("input[name='userEmail']").val();
	        setCookie("cpsId", cpsId, 7);
	    }
	});

	function popWindow() {
        if ( getCookie1( 'noticePopUp' ) != "done" ) {
        	var pop = window.open('notice.cps','pop','toolbar=no, width=300,height=280,left=10,top=10,status=no,scrollbars=no');
        	pop.focus();
  	    }
    }

    //popWindow();
});

function getContextPath(){
    var offset 	= location.href.indexOf(location.host) + location.host.length;
    var ctxPath = location.href.substring(offset, location.href.indexOf('/', offset + 1));
    return ctxPath;
}

function setCookie(cookieName, value, exdays){
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var cookieValue = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toGMTString());
    document.cookie = cookieName + "=" + cookieValue;
}

function deleteCookie(cookieName){
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() - 1);
    document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString();
}

function getCookie(cookieName){
    cookieName 		= cookieName + '=';
    var cookieData 	= document.cookie;
    var start 		= cookieData.indexOf(cookieName);
    var cookieValue = '';
    if(start != -1){
        start += cookieName.length;
        var end = cookieData.indexOf(';', start);
        if (end == -1) end = cookieData.length;
        cookieValue = cookieData.substring(start, end);
    }
    return unescape(cookieValue);
}

function getCookie1(strName){
	var strArg = new String(strName + '=');
	var nArgLen, nCookieLen, nEnd;
	var i = 0, j;

	nArgLen    = strArg.length;
	nCookieLen = document.cookie.length;

	if(nCookieLen > 0){
		while(i < nCookieLen){
			j = i + nArgLen;
			if(document.cookie.substring(i, j) == strArg){
				nEnd = document.cookie.indexOf (';', j);
				if(nEnd == -1) nEnd = document.cookie.length;
				return unescape(document.cookie.substring(j, nEnd));
			}
			i = document.cookie.indexOf(' ', i) + 1;
			if (i == 0) break;
		}
	}
	return('');
}


function isEmail(s){
	if (s.search(/^\s*[\w\~\-\.]+\@[\w\~\-]+(\.[\w\~\-]+)+\s*$/g) < 0){
		alert("올바른 Email형식이 아닙니다.");
		return false;
	}else{
		return true;
	}
}

function actionLogin(){
	var frm = document.loginForm;
    if(frm.userEmail.value == ""){
        alert("Email을 입력하세요.");
        frm.userEmail.focus();
        return;
    }else if(!isEmail(frm.userEmail.value)){
        frm.userEmail.value = "";
        frm.userEmail.focus();
        return;
    }else if(frm.userPw.value == ""){
        alert("비밀번호를 입력하세요.");
        frm.userPw.focus();
        return;
    }else{
    	frm.action = "../loginAction";
    	frm.submit();
    }
};