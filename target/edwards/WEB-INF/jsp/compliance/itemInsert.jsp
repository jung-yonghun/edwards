<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
    <title>품목등록</title>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/cps/compliance/itemInsert.js'/>"></script>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="container">
			  <div class="normal_cont">
				<div class="normal_Button">
				  <a href="javascript:fn_saveItem();">등록</a>
				  <a href="javascript:window.close();">닫기</a>
				</div>
				<div class="easyui-layout" style="width:500px;height:150px;padding:0px">
		    	  <div data-options="region:'center',split:true" style="width:590px;height:620px;box-sizing:border-box;border:0px">
		    	    <div class="hsnew_C02_table" style="margin-top:-13px;margin-left:10px">
		    	      <input type="hidden" id="ID" 			name="ID" 			value="${sessionScope.ID}">
				  	  <input type="hidden" id="USERGRADE" 	name="USERGRADE" 	value="${sessionScope.USERGRADE}">
				  	  <input type="hidden" id="_defaultDB" 	name="_defaultDB" 	value="${sessionScope.DEFAULTDB}">
				  	  <input type="hidden" id="taxNum" 		name="taxNum" 		value="${sessionScope.TAXNO}">
				  	  <input type="hidden" id="sangho" 		name="sangho" 		value="${sessionScope.SANGHO}"/>
		      	  	  <form id="frm1" name="frm1">
		      	  	  <input type="hidden" id="yogCom" 		name="yogCom" 	value="${param.yogCom}"/>
		      	  	  <input type="hidden" id="yogSaup" 	name="yogSaup" 	value="${param.yogSaup}"/>
			  		  <table>
		   	    	  	<col width="20%"/>
                      	<col width="80%"/>
		      		  	<tr>
                          <td class="left">Item No.<i></i></td>
                          <td>
                            <input type="text" id="codeName" name="codeName" style="width:100%;text-transform:uppercase;" maxlength="100"/>
                          </td>
                      	</tr>
                      	<tr>
                          <td class="left">HS Code</td>
                          <td>
                            <input type="text" id="hsCode" name="hsCode" style="width:100%" onkeydown="return fn_onlyNumber(event)"/>
                          </td>
                        </tr>
                        <tr>
	                      <td class="left">영문명</td>
	                      <td>
	                        <input type="text" id="engName" name="engName" style="width:90%;ime-mode:inactive;text-transform:uppercase;"/>
	                      </td>
	                    </tr>
                        <tr>
	                      <td class="left">한글명</td>
	                      <td>
	                        <input type="text" id="korName" name="korName" style="width:100%;ime-mode:active"/>
	                      </td>
	                    </tr>
                      </table>
                      </form>
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