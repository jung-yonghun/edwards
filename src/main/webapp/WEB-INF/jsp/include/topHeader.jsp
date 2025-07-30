<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
	<script type="text/javascript" src="<c:url value='/js/cps/include/topHeader.js?240110'/>"></script>
<div id="header1">
	<div class="head_con w1315">
	    <input type="hidden" id="USERGRADEA" 	name="USERGRADEA" 	value="${sessionScope.USERGRADE}">
		<input type="hidden" id="USERGRADEB" 	name="USERGRADEB" 	value="${sessionScope.USERGRADEB}">
		<input type="hidden" id="userMenu" 		name="userMenu" 	value="${sessionScope.MENU}"/>
		<input type="hidden" id="userKey" 		name="userKey" 		value="${sessionScope.ID}"/>
		<input type="hidden" id="userTaxNo" 	name="userTaxNo" 	value="${sessionScope.TAXNO}"/>
		<form id="addForm1" name="addForm1">
  	    <input type="hidden" id="OPT_IMFROM" 			name="OPT_IMFROM">
  	    <input type="hidden" id="OPT_IMTO" 				name="OPT_IMTO">
  	    <input type="hidden" id="OPT_EXFROM" 			name="OPT_EXFROM">
  	    <input type="hidden" id="OPT_EXTO" 				name="OPT_EXTO">
  	    <input type="hidden" id="OPT_IMPONAPSESAUP" 	name="OPT_IMPONAPSESAUP">
  	    <input type="hidden" id="REPORTMNGNO" 			name="REPORTMNGNO">
  	    <input type="hidden" id="RIPDIV" 				name="RIPDIV">
  	    <input type="hidden" id="DBNM" 					name="DBNM">
  	    <input type="hidden" id="OPT_DBNM" 				name="OPT_DBNM">
  	    <input type="hidden" id="IMPOANALYSISMNGNUM" 	name="IMPOANALYSISMNGNUM">
  	    </form>
		<div class="inner" style="display:none">
		    <div class="left">
				<div class="menu_D" style="display:none">
	    	  	  <font color="black">수입화물진행정보 조회 : </font>
			  	  <input type="text" id="mbl" name="mbl" placeholder="M B/L" style="width:130px;height:20px;"/>
			  	  <input type="text" id="hbl" name="hbl" placeholder="H B/L" style="width:130px;height:20px;"/>
			  	  <select id="year" name="year"></select>
			  	  <a href="#" onclick="linkBlNo()" style="margin-top:0px; font-size:12px; letter-spacing:-0.05em; font-weight:400; color:#fff; padding:0 5px; height:22px; line-height:22px; display:inline-block; vertical-align:top; background:#279ad3; margin-right:1px;">조회</a>
			  	  <font color="black" style="padding-left:50px">수출이행내역(건별) 조회 : </font>
			  	  <input type="text" id="expDclrNo" name="expDclrNo" 	placeholder="수출신고번호" style="width:130px;height:20px;"/>
				  <input type="text" id="blNo" 		name="blNo" 		placeholder="M B/L" style="width:130px;height:20px;"/>
			  	  <a href="#" onclick="linkBlNo1()" style="margin-top:0px; font-size:12px; letter-spacing:-0.05em; font-weight:400; color:#fff; padding:0 5px; height:22px; line-height:22px; display:inline-block; vertical-align:top; background:#279ad3; margin-right:1px;">조회</a>
			    </div>
			</div>
			<div class="right head_r_pc">
			    <select id="setMenu" name="setMenu" style="width:50px;height:28px;" onchange="fn_saveSet()">
               	  <option value="E">EN</option>
               	  <option value="K">KR</option>
                </select>
			</div>
		</div>
	</div>
</div>
<jsp:include page="/WEB-INF/jsp/include/include.jsp"></jsp:include>