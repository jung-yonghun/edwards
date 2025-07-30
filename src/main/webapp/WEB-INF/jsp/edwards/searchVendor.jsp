<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
    <title>Vendor 검색</title>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-bufferview.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-filter.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/edwards/searchVendor.js?20231227'/>"></script>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
			<div class="normal_Top">
			  <input type="hidden" id="ID" 	name="ID" 	value="${sessionScope.ID}">
			  <table width="450px">
			  	<col width="100px">
                <col width="350px">
				<tr height="23px">
				  <td>코드</td>
				  <td><input type="text" id="COMP_CD" name="COMP_CD" onkeypress="keyDown()" value="${param.COMP_CD}"/></td>
				</tr>
				<tr height="23px">
				  <td>상호</td>
				  <td><input type="text" id="COMP_NM" name="COMP_NM" onkeypress="keyDown()" value="${param.COMP_NM}"/></td>
				</tr>
			  </table>
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