<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
    <title>업체 조회</title>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-bufferview.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-filter.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/item/customerSearch.js'/>"></script>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="easyui-layout" style="width:400px;height:400px;">
		      <div data-options="region:'center'" style="box-sizing:border-box;border:0px;">
		        <div class="normal_Top">
		          <form id="frm1" name="frm1">
		          <input type="hidden" id="size" 		name="size" 		value="100000" />
				  <input type="hidden" id="page" 		name="page" 		value="0" />
				  <input type="hidden" id="_pageRow" 	name="_pageRow" 	value="100000" />
				  <input type="hidden" id="_pageNumber" name="_pageNumber"  value="0" />
		          <input type="hidden" id="_defaultDB" 	name="_defaultDB" 	value="${param.defaultDB}">
		          <table width="100%">
			  	  	<col width="20%" />
			  	  	<col width="80%" />
				  	<tr height="23px">
				  	  <td>상호</td>
				  	  <td><input type="text" id="sangho" name="sangho" onkeypress="keyDown()" style="ime-mode:active;"/></td>
				  	</tr>
				  	<tr height="23px">
				  	  <td>사업자번호</td>
				  	  <td><input type="text" id="saup" name="saup" onkeypress="keyDown()"/></td>
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