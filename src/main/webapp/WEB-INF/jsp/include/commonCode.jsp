<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
    <title>공통코드 조회</title>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-filter.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-cellediting.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/include/commonCode.js'/>"></script>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="easyui-layout" style="width:300px;height:400px;">
		      <div data-options="region:'center'" style="box-sizing:border-box;border:0px;">
		        <div class="normal_Top">
		          <form id="frm" name="frm">
		          <input type="hidden" id="Mcd" 		name="Mcd" 			value="${param.Mcd}"/>
				  <input type="hidden" id="Cd" 			name="Cd" 			value="${param.Cd}"/>
				  <input type="hidden" id="CdPrtNm" 	name="CdPrtNm" 		value="${param.CdPrtNm}"/>
				  <input type="hidden" id="editIndex" 	name="editIndex" 	value="${param.editIndex}"/>
		          <table width="100%">
			  	  	<col width="20%" />
			  	  	<col width="80%" />
				  	<tr height="23px">
				  	  <td>코드</td>
				  	  <td><input type="text" id="searchCode" name="searchCode" onkeypress="keyDown()"/></td>
				  	</tr>
				  	<tr height="23px">
				  	  <td>코드명</td>
				  	  <td><input type="text" id="searchName" name="searchName" onkeypress="keyDown()"/></td>
				  	</tr>
				  </table>
				  </form>
		        </div>
				<div class="normal_Button">
				  <a href="javascript:fn_searchAction();">조회</a>
				  <a href="javascript:window.close();">닫기</a>
				</div>
				<div class="normal_con01">
				  <table id="masterGrid"></table>
				</div>
  	      	  </div>
  	      	</div>
  	      </div>
  	    </div>
	  </div>
	</div>
  </body>
</html>