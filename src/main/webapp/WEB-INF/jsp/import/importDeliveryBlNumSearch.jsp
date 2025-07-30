<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-filter.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/import/importDeliveryBlNumSearch.js'/>"></script>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
			<div class="normal_Top">
			  <input type="hidden" id="impoBlNo" 	name="impoBlNo" 	value="${param.blNum}"/>
			  <input type="hidden" id="impoSingoNo" name="impoSingoNo" 	value="${param.singoNum}"/>
			  <input type="hidden" id="taxNum" 		name="taxNum" 		value="${param.taxNum}"/>
			  <form id="searchFrm" name="searchFrm">
			  <input type="hidden" id="size" 			name="size" 		value="10000" />
			  <input type="hidden" id="page" 			name="page" 		value="0" />
			  <input type="hidden" id="_pageRow" 		name="_pageRow" 	value="10000" />
			  <input type="hidden" id="_pageNumber" 	name="_pageNumber"  value="0" />
			  <table width="300px">
			  	<col width="100px">
                <col width="200px">
				<tr height="23px">
				  <td>B/L No.</td>
				  <td><input type="text" id="searchCode" name="searchCode" onkeypress="keyDown()"/></td>
				</tr>
				<tr height="23px">
				  <td>수입신고번호</td>
				  <td><input type="text" id="searchName" name="searchName" onkeypress="keyDown()"/></td>
				</tr>
			  </table>
			  </form>
			</div>
		    <div class="easyui-layout" style="width:400px;height:320px;">
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