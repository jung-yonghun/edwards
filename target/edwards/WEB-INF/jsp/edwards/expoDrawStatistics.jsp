<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_newTitle.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_newCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_newJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/cps/edwards/expoDrawStatistics.js?20231227'/>"></script>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="container">
		      <input type="hidden" id="ID" 		name="ID" 			value="${sessionScope.ID}">
		      <input type="hidden" id="taxNum" 	name="taxNum" 		value="${sessionScope.TAXNO}">
			  <div class="normal_Top">
			  	<table width="100%">
			  	  <col width="08%" />
			  	  <col width="24%" />
			  	  <col width="02%" />
			  	  <col width="08%" />
			  	  <col width="24%" />
			  	  <col width="02%" />
			  	  <col width="08%" />
			  	  <col width="24%" />
				  <tr height="23px">
				  	<td>
				  	  <select id="_DateType" name="_DateType" style="width:100px">
				      	<option value="ExpoOkDate">수출수리일</option>
                         	<option value="DrawOkDate">환급결정일</option>
					  </select>
				  	</td>
				  	<td>
				  	  <input type="text" id="FROM_DT" name="FROM_DT" onkeypress="keyDown()" style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/> ~
				  	  <input type="text" id="TO_DT" name="TO_DT" onkeypress="keyDown()" style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/>
				  	</td>
				  	<td></td>
				  	<td>수출신고번호</td>
				  	<td><input type="text" id="ExpoSingoNo" name="ExpoSingoNo" onkeypress="keyDown()"/></td>
				  	<td></td>
				  	<td>원재료신고번호</td>
				  	<td><input type="text" id="ImpoSingoNo" name="ImpoSingoNo" onkeypress="keyDown()"/></td>
				  </tr>
				  <tr height="23px">
				  	<td>수출형태</td>
				  	<td>
				  	  <select id="ExpoForm" name="ExpoForm" style="width:100px">
				  	    <option value="">==전체==</option>
				      	<option value="01">제조</option>
                        <option value="02">원상태</option>
					  </select>
				  	</td>
				  	<td></td>
				  	<td>HS코드</td>
				  	<td><input type="text" id="ExpoHS" name="ExpoHS" onkeypress="keyDown()"/></td>
				  	<td></td>
				  	<td>Item코드</td>
				  	<td><input type="text" id="ItemCD" name="ItemCD" onkeypress="keyDown()"/></td>
				  </tr>
			  	</table>
			  </div>
			  <div class="normal_Button">
			  	<a href="javascript:fn_searchAction();">조회</a>
			  	<a href="javascript:fn_searchExcel();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
			  	<a href="javascript:fn_searchAction1();">원상태수출 예상환급액</a>
			  </div>
			  <div class="normal_con01" id='parentDiv10' style="padding-left:5px;padding-right:5px">
			  	<table id="masterGrid"></table>
	  			<div id="masterPager"></div>
			  </div>
			</div>
		  </div>
		</div>
	  </div>
	</div>
  </body>
</html>