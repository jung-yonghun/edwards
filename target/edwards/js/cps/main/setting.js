function getSaveCustomerSet(callback){
    var url 	= "../apis/system/selectSaveCustomerList",
    	params 	= {
    		"userKey" 	: $("#userKey").val(),
    		"useYn" 	: "Y"
    	},
        type 	= "POST";

    sendAjax(url, params, type, function(d){
        callback(d);
    });
}

function save(){
	var url 	= "../saveUser",
		params 	= {"userInfo":$("#joinForm").serializeObject()},
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
		alert("수정되었습니다.");
    });
}

function fn_saveSet(){
	var url 	= "../saveSetMenu",
		params 	= {
			"userKey" 	: $("#userKey").val(),
			"setMenu" 	: $("#setMenu").val()
		},
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
		parent.document.location.href = "./main.cps";
	});
}

function fn_saveComSet(){
	var url 	= "../saveSetCom",
		params 	= {
			"userKey" 	: $("#userKey").val(),
			"setSangho" : $("#setSangho").val(),
			"setSaup" 	: $("#setSaup").val(),
			"setDb" 	: $("#setDb").val()
		},
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
		parent.document.location.href = "./main.cps";
	});
}

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

		if($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B"){
			$('#setCheck').css("display","none");
			$('#setCheck1').css("display","");
			$('#setCheck2').css("display","");
		}else if($('#USERGRADE').val()=="C"){
			if($('#userKey').val()=="121" || $('#userKey').val()=="160" ){
				$('#setCheck').css("display","none");
				$('#setCheck1').css("display","none");
				$('#setCheck2').css("display","none");
			}else{
				$('#setCheck').css("display","none");
				$('#setCheck1').css("display","");
				$('#setCheck2').css("display","none");
			}
		}else{
			$('#setCheck').css("display","");
			$('#setCheck1').css("display","none");
			$('#setCheck2').css("display","none");
		}

		var url 	= "../selectUserInfo",
			params 	= {"userKey" : $("#userKey").val()},
			type 	= "POST";

		sendAjax(url, params, type, function(d){
			if(!d) return;
			$("#userEmail").val(d.userEmail);
			$("#userPw").val(d.userPw);
			$("#userPw1").val(d.userPw);
			$("#userName").val(d.userName);
			$("#userSangho").val(d.userSangho);
			$("#userSaup").val(d.userSaup);
			$("#userDepart").val(d.userDepart);
			$("#userJikchk").val(d.userJikchk);
			$("#userMobile").val(d.userMobile);
			$("#userPhone").val(d.userPhone);
			$("#userFax").val(d.userFax);
			$("#setMenu").val(d.setMenu);
			$("#setSangho").val(d.setSangho);
			$("#setSaup").val(d.setSaup);
		});

		getSaveCustomerSet(drawSaveCustomerList);
	}
});

var drawSaveCustomerList = function(data){
	var optList = new Array();

	if(data.length == 0){
		setTimeout(function(){
			optList[0] = "<option value=\""+$("#setSaup1").val()+"\" selected>"+$("#setSangho1").val()+"</option>";
			$("#setSaup").val($("#setSaup1").val());
			$("#setSangho").html(optList.join("\n"));
		},100);
	}else{
		if(data.length > 1){
			if($("#joinForm #userKey").val() != "233"){
				optList[0] = "<option value=\"all\" hid_value=\"all\" hid_value1=\"" + $("#defaultDB").val() + "\" selected>==== 전체 ====</option>";
			}
		}

	    for(var i = 0; i < data.length; i++){
	    	var region = "";
	    	if(data[i]["defaultDB"]=="ncustoms"){
	    		region = "서울";
	    	}else if(data[i]["defaultDB"]=="ncustoms_bs"){
	    		region = "부산";
	    	}else if(data[i]["defaultDB"]=="ncustoms_ca"){
	    		region = "천안";
	    	}else if(data[i]["defaultDB"]=="ncustoms_cj"){
	    		region = "청주";
	    	}else if(data[i]["defaultDB"]=="ncustoms_cw"){
	    		region = "창원";
	    	}else if(data[i]["defaultDB"]=="ncustoms_dj"){
	    		region = "대전";
	    	}else if(data[i]["defaultDB"]=="ncustoms_gm"){
	    		region = "구미";
	    	}else if(data[i]["defaultDB"]=="ncustoms_ic"){
	    		region = "인천";
	    	}else if(data[i]["defaultDB"]=="ncustoms_jj"){
	    		region = "진주";
	    	}else if(data[i]["defaultDB"]=="ncustoms_pj"){
	    		region = "파주";
	    	}else if(data[i]["defaultDB"]=="ncustoms_pt"){
	    		region = "평택";
	    	}else if(data[i]["defaultDB"]=="ncustoms_sel_040"){
	    		region = "서울";
	    	}else if(data[i]["defaultDB"]=="ncustoms_sel4"){
	    		region = "서울";
	    	}else if(data[i]["defaultDB"]=="ncustoms_sn"){
	    		region = "경기";
	    	}else if(data[i]["defaultDB"]=="ncustoms_us"){
	    		region = "울산";
	    	}else if(data[i]["defaultDB"]=="ncustoms_yj"){
	    		region = "공항";
	    	}else if(data[i]["defaultDB"]=="ncustoms_ys"){
	    		region = "여수";
	    	}

	    	if($("#setSaup").val()==data[i]["userSaup"] && $("#setDb").val()==data[i]["defaultDB"]){
	    		optList[optList.length] = "<option value=\"" + data[i]["userSangho"] + "\" hid_value=\"" + data[i]["userSaup"] + "\" hid_value1=\"" + data[i]["defaultDB"] + "\" selected>" + data[i]["userSangho"] + "</option>";
	            $("#setSaup").val(data[i]["userSaup"]);
	    	}else{
	    		optList[optList.length] = "<option value=\"" + data[i]["userSangho"] + "\" hid_value=\"" + data[i]["userSaup"] + "\" hid_value1=\"" + data[i]["defaultDB"] + "\">" + data[i]["userSangho"] + "</option>";
	    	}
	    }
	    $("#setSangho").html(optList.join("\n"));
	}
};

var ChangeTeam = function(obj){
    $("#setSaup").val(obj.options[obj.selectedIndex].getAttribute("hid_value"));
    $("#setDb").val(obj.options[obj.selectedIndex].getAttribute("hid_value1"));
};

function fn_save(){
    frm = document.joinForm;
    if(isEmpty(frm.userPw.value)){
        alert("비밀번호를 입력하세요");
        frm.userPw.focus();
        return;
    }else if(frm.userPw.value.indexOf("'") >= 0 || frm.userPw.value.indexOf("<") >= 0 || frm.userPw.value.indexOf('"') >= 0 || frm.userPw.value.indexOf(">") >= 0){
        alert("해당 특수문자는 비밀번호로 설정 하실 수 없습니다.\n ※ ', \", <, > ");
        return;
    }else if(frm.userPw.value.length <= 7){
        alert("비밀번호 길이가 8자 이하입니다.");
        return;
	}else if(!frm.userPw.value.match(/([a-zA-Z0-9].*[!,@,#,$,%,^,&,*,?,_,~])|([!,@,#,$,%,^,&,*,?,_,~].*[a-zA-Z0-9])/)){
		alert("비밀번호는 영문자, 숫자, 특수문자의 조합으로 입력해주십시오. \n ※ 포함 특수문자 : ! @ # $ % ^ & * ? _ ~ ");
		return;
	}else if(frm.userPw.value.search(/[0-9]/)<0){
		alert("패스워드에 숫자가 포함되어야 합니다..");
		return;
	}else if(frm.userPw.value.search(/[!,@,#,$,%,^,&,*,?,_,~]/)<0){
		alert("패스워드에 특수문자가 포함되어야 합니다.\n ※ 포함 특수문자 : ! @ # $ % ^ & * ? _ ~");
		return;
	}

	var SamePass_0 = 0; //동일문자 카운트
	var SamePass_1 = 0; //연속성(+) 카운드
	var SamePass_2 = 0; //연속성(-) 카운드
	var chr_pass_0;
	var chr_pass_1;
	var chr_pass_2;

	for(var i=0; i < frm.userPw.value.length; i++){
		chr_pass_0 = frm.userPw.value.charAt(i);
		chr_pass_1 = frm.userPw.value.charAt(i+1);

		//동일문자 카운트
		if(chr_pass_0 == chr_pass_1){
			SamePass_0 = SamePass_0 + 1
		}

		chr_pass_2 = frm.userPw.value.charAt(i+2);
		//연속성(+) 카운드

		if(chr_pass_0.charCodeAt(0) - chr_pass_1.charCodeAt(0) == 1 && chr_pass_1.charCodeAt(0) - chr_pass_2.charCodeAt(0) == 1){
			SamePass_1 = SamePass_1 + 1
		}

		//연속성(-) 카운드
		if(chr_pass_0.charCodeAt(0) - chr_pass_1.charCodeAt(0) == -1 && chr_pass_1.charCodeAt(0) - chr_pass_2.charCodeAt(0) == -1){
			SamePass_2 = SamePass_2 + 1
		}
	}

	if(SamePass_0 > 1){
		alert("동일문자를 3번 이상 사용할 수 없습니다.");
		return;
	}

	if(SamePass_1 > 1 || SamePass_2 > 1 ){
       	alert("연속된 문자열(123, 321, abc, cba 등)을\n 3자 이상 사용 할 수 없습니다.");
       	return;
    }else if(isEmpty(frm.userPw1.value)){
        alert("비밀번호 확인을 입력하세요");
        frm.userPw1.focus();
        return;
    }else if(frm.userPw.value != frm.userPw1.value){
        alert("비밀번호가 확인란과 일치하지 않습니다. 다시 입력하세요");
        frm.userPw1.value = "";
        frm.userPw1.focus();
        return;
    }else if(isEmpty(frm.userName.value)){
        alert("이름을 입력하세요");
        frm.userName.focus();
        return;
    }else if(isEmpty(frm.userSangho.value)){
        alert("회사명을 입력하세요");
        frm.userSangho.focus();
        return;
    }else if(isEmpty(frm.userSaup.value)){
        alert("사업자번호를 입력하세요");
        frm.userSaup.focus();
        return;
    }else if(frm.userSaup.value.length < 10){
        alert("사업자번호는 10자리 입니다.");
        return;
    }else if(isEmpty(frm.userDepart.value)){
        alert("부서명을 입력하세요");
        frm.userDepart.focus();
        return;
    }else if(isEmpty(frm.userJikchk.value)){
        alert("직책을 입력하세요");
        frm.userJikchk.focus();
        return;
    }else if(isEmpty(frm.userMobile.value)){
        alert("휴대폰번호를 입력하세요");
        frm.userMobile.focus();
        return;
    }else{
        if(confirm("수정하시겠습니까 ?")){
            save();
        }
    }
}

var fn_searchSet = function(){
    openWindowWithPost("./customerSearch.cps", "width=500, height=400, top=30, scrollbars=no, location=no, menubar=no", "customerSearch", {});
};