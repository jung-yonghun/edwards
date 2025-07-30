<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
    <title>코드 조회</title>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-bufferview.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-filter.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/include/commonNcomCode2.js'/>"></script>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="easyui-layout" style="width:500px;height:360px;">
		      <div data-options="region:'center'" style="box-sizing:border-box;border:0px;">
		        <div class="normal_Top">
		          <form id="frm1" name="frm1">
		          <input type="hidden" id="defaultDB" 	name="defaultDB" 	value="${param.defaultDB}">
		          <input type="hidden" id="DB" 			name="DB" 			value="${param.DB}">
		          <table width="100%">
			  	  	<col width="20%" />
			  	  	<col width="80%" />
				  	<tr height="23px">
				  	  <td>세번부호</td>
				  	  <td><input type="text" id="hs" name="hs" onkeypress="keyDown()" style="ime-mode:inactive;text-transform:uppercase;"/></td>
				  	</tr>
				  	<tr height="23px">
				  	  <td>세율구분</td>
				  	  <td><input type="text" id="gbn" name="gbn" onkeypress="keyDown()"style="ime-mode:inactive;text-transform:uppercase;"/></td>
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