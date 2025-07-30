<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
    <title>운송의뢰(통관)</title>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-filter.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/import/importDeliveryRequest.js'/>"></script>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
			<div class="normal_Top">
			  <input type="hidden" id="yymmdd" 			name="yymmdd"/>
			  <input type="hidden" id="yymmddhhmmss" 	name="yymmddhhmmss"/>
			  <input type="hidden" id="ID" 				name="ID" 			value="${sessionScope.ID}">
			  <input type="hidden" id="NAME" 			name="NAME" 		value="${sessionScope.USERNAME}">
			  <form id="searchFrm" name="searchFrm">
			  <input type="hidden" id="size" 			name="size" 		value="100" />
			  <input type="hidden" id="page" 			name="page" 		value="0" />
			  <input type="hidden" id="_pageRow" 		name="_pageRow" 	value="100" />
			  <input type="hidden" id="_pageNumber" 	name="_pageNumber"  value="0" />
			  <table width="100%">
			  	<col width="15%"/>
                   <col width="33%"/>
                   <col width="2%"/>
                   <col width="15%"/>
                   <col width="35%"/>
				<tr height="23px">
				  <td>B/L No.</td>
				  <td><input type="text" id="blNum" name="blNum" onkeypress="keyDown()"/></td>
				  <td></td>
				  <td>수입신고번호</td>
				  <td><input type="text" id="singoNum" name="singoNum" onkeypress="keyDown()"/></td>
				</tr>
			  </table>
			  </form>
			</div>
		    <div class="easyui-layout" style="width:100%;height:450px;">
		      <div data-options="region:'center'" style="box-sizing:border-box;border:0px;">
				<div class="normal_Button">
				  <a href="javascript:fn_searchAction();">조회</a>
				  <a href="javascript:fn_detailSave();">운송의뢰</a>
				</div>
				<div style="padding:10px">
				  <input type="text" id="requestNote" name="requestNote" style="width:80%;" placeholder="의뢰내용을 입력하세요"/>
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