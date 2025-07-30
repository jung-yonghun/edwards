<%@ page language="java" 	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
	<jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/cps/main/setting.js'/>"></script>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="container">
		      <div class="easyui-layout" style="width:100%;height:780px">
		        <div data-options="region:'center'" style="width:70%;">
		          <input type="hidden" id="USERGRADE" 	name="USERGRADE" 	value="${sessionScope.USERGRADE}">
		          <div id="p" class="easyui-panel" title="사용자정보 수정" style="width:100%;height:100%;padding:10px;">
		            <form id="joinForm" name="joinForm" method="post">
		            <input type="hidden" id="userKey" 	name="userKey" 	value="${sessionScope.ID}"/>
        			<div style="margin-bottom:5px">
        			  <span style="font-size:12px; width:80px; letter-spacing:-0.05em; color:#555555; font-weight:500; display:inline-block;">이메일 <font color="red">*</font> :</span>
            		  <input id="userEmail" name="userEmail" style="width:200px;height:23px" readonly>
        			</div>
        			<div style="margin-bottom:5px">
        			  <span style="font-size:12px; width:80px; letter-spacing:-0.05em; color:#555555; font-weight:500; display:inline-block;">비밀번호 <font color="red">*</font> :</span>
            		  <input type="password" id="userPw" name="userPw" style="width:200px;height:23px">
        			  <font style="font-size:8pt; color:red;">8~16자리</font>
        			</div>
        			<div style="margin-bottom:5px">
        			  <span style="font-size:12px; width:80px; letter-spacing:-0.05em; color:#555555; font-weight:500; display:inline-block;">비밀번호 확인 <font color="red">*</font> :</span>
            		  <input type="password" id="userPw1" name="userPw1" style="width:200px;height:23px">
        			</div>
        			<div style="margin-bottom:5px">
        			  <span style="font-size:12px; width:80px; letter-spacing:-0.05em; color:#555555; font-weight:500; display:inline-block;">이름 <font color="red">*</font> :</span>
            		  <input id="userName" name="userName" style="width:200px;height:23px;ime-mode:active;">
        			</div>
        			<div style="margin-bottom:5px">
        			  <span style="font-size:12px; width:80px; letter-spacing:-0.05em; color:#555555; font-weight:500; display:inline-block;">회사명 <font color="red">*</font> :</span>
            		  <input id="userSangho" name="userSangho" style="width:200px;height:23px;ime-mode:active;">
        			</div>
        			<div style="margin-bottom:5px">
        			  <span style="font-size:12px; width:80px; letter-spacing:-0.05em; color:#555555; font-weight:500; display:inline-block;">사업자번호 <font color="red">*</font> :</span>
            		  <input id="userSaup" name="userSaup" style="width:200px;height:23px;" onkeydown="return fn_onlyNumber(event)" maxlength="10">
        			</div>
        			<div style="margin-bottom:5px">
        			  <span style="font-size:12px; width:80px; letter-spacing:-0.05em; color:#555555; font-weight:500; display:inline-block;">부서명 <font color="red">*</font> :</span>
            		  <input id="userDepart" name="userDepart" style="width:200px;height:23px;ime-mode:active;">
        			</div>
        			<div style="margin-bottom:5px">
        			  <span style="font-size:12px; width:80px; letter-spacing:-0.05em; color:#555555; font-weight:500; display:inline-block;">직책 <font color="red">*</font> :</span>
            		  <input id="userJikchk" name="userJikchk" style="width:200px;height:23px;ime-mode:active;">
        			</div>
        			<div style="margin-bottom:5px">
        			  <span style="font-size:12px; width:80px; letter-spacing:-0.05em; color:#555555; font-weight:500; display:inline-block;">휴대폰번호 <font color="red">*</font> :</span>
            		  <input id="userMobile" name="userMobile" style="width:200px;height:23px;" maxlength="15">
        			</div>
        			<div style="margin-bottom:5px">
        			  <span style="font-size:12px; width:80px; letter-spacing:-0.05em; color:#555555; font-weight:500; display:inline-block;">전화번호 :</span>
            		  <input id="userPhone" name="userPhone" style="width:200px;height:23px;" maxlength="15">
        			</div>
        			<div style="margin-bottom:5px">
        			  <span style="font-size:12px; width:80px; letter-spacing:-0.05em; color:#555555; font-weight:500; display:inline-block;">팩스번호 :</span>
            		  <input id="userFax" name="userFax" style="width:200px;height:23px;" maxlength="15">
        			</div>
        			<div>
            		  <a href="javascript:fn_save();" class="easyui-linkbutton" style="width:290px;height:32px">수정</a>
        			</div>
					</form>
	    		  </div>
	    		</div>
			  	<div data-options="region:'east',split:true" style="width:30%;">
			  	  <div id="p" class="easyui-panel" title="메뉴 설정" style="width:100%;height:80px;padding:10px;">
	        		<select id="setMenu" name="setMenu" style="width:100px;height:25px;">
                	  <option value="E">영문</option>
                	  <option value="K">한글</option>
                	</select>
	        		<a href="javascript:fn_saveSet();" class="easyui-linkbutton" style="margin-top:-5px">수정</a>
	    		  </div><br>
	    		  <div class="easyui-panel" title="사업자 설정" style="width:100%;height:80px;padding:10px;">
	    		    <div id="setCheck">
	        		  <select id="setSangho" name="setSangho" style="width:200px;height:25px;" onchange="ChangeTeam(this)"></select>
	        		  <input type="hidden" id="setSaup" 	name="setSaup"/>
	        		  <input type="hidden" id="setDb" 		name="setDb" 	value="${sessionScope.DEFAULTDB}"/>
	        		  <a href="javascript:fn_saveComSet();" class="easyui-linkbutton" style="margin-top:-5px">수정</a>
	        		</div>
	        		<div id="setCheck1" style="display:none">
	        		  <input type="text" id="setSangho1" name="setSangho1" style="width:200px;height:23px;" value="${sessionScope.SANGHO}" readOnly>
	        		  <input type="hidden" id="setSaup1" name="setSaup1" value="${sessionScope.TAXNO}"/>
	        		  <input type="hidden" id="defaultDB" name="defaultDB" value="${sessionScope.DEFAULTDB}"/>
	        		  <a href="javascript:fn_searchSet();" class="easyui-linkbutton" style="margin-top:-5px">검색</a>
	        		  <a href="javascript:fn_saveAdminComSet();" class="easyui-linkbutton" style="margin-top:-5px">수정</a>
	        		  <a id="setCheck2" href="javascript:fn_saveAdminSet();" class="easyui-linkbutton" style="margin-top:-5px">관리자모드수정</a>
	        		</div>
	    		  </div>
		      	</div>
		      </div>
		  	</div>
		  </div>
	  	</div>
	  </div>
	</div>
  </body>
</html>