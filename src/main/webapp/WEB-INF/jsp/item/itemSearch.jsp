<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
    <title>자재 검색</title>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-filter.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/item/itemSearch.js'/>"></script>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
			<div class="normal_Top">
			  <form id="frm" name="frm">
			  <input type="hidden" id="ID" 				name="ID" 				value="${sessionScope.ID}">
			  <input type="hidden" id="_defaultRmsDb" 	name="_defaultRmsDb" 	value="rms" />
			  <table width="450px">
			  	<col width="100px">
                <col width="350px">
				<tr height="23px">
				  <td>자재코드</td>
				  <td><input type="text" id="mmodelCode" name="mmodelCode" onkeypress="keyDown()"/></td>
				</tr>
			  </table>
			  </form>
			</div>
		    <div class="easyui-layout" style="width:500px;height:320px;">
		      <div data-options="region:'center'" style="box-sizing:border-box;border:0px;">
				<div class="normal_Button">
				  <a href="javascript:fn_searchAction();">조회</a>
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