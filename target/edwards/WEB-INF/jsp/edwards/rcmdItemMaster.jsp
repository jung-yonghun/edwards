<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/webjars/jquery/3.1.1/jquery.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/webjars/js-xlsx/0.8.0/shim.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/webjars/js-xlsx/0.8.0/dist/xlsx.full.min.js'/>"></script>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-bufferview.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-filter.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/edwards/rcmdItemMaster.js?20231227'/>"></script>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="container">
			  <div class="easyui-layout" style="width:100%;height:735px">
			    <div data-options="region:'center',split:true" style="width:100%;height:735px;box-sizing:border-box;border:0px">
			    <div class="easyui-layout" style="width:100%;height:735px">
		      	<div data-options="region:'center'" style="width:100%;box-sizing:border-box;border:0px">
				  <div class="normal_Top">
				    <input type="hidden" id="ID" name="ID" 	value="${sessionScope.ID}">
				  	<table width="100%">
				  	  <col width="10%" />
				  	  <col width="38%" />
				  	  <col width="02%" />
				  	  <col width="10%" />
				  	  <col width="40%" />
					  <tr height="23px">
					  	<td>추천정보</td>
					  	<td><input type="text" id="RCMD_GODS_INFO1" name="RCMD_GODS_INFO1" onkeypress="keyDown()"/></td>
					  	<td></td>
					  	<td>화주</td>
					  	<td><input type="text" id="COMP_CD1" name="COMP_CD1" onkeypress="keyDown()"/></td>
					  </tr>
					  <tr height="23px">
					  	<td>배정일자</td>
					  	<td><input type="text" id="ASGN_DTTM1" name="ASGN_DTTM1" onkeypress="keyDown()" style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/></td>
					  	<td></td>
					  	<td>사용여부</td>
					  	<td>
                            <select id="USE_FG1" name="USE_FG1" style="width:50px;">
                              <option value="Y">Y</option>
                              <option value="N">N</option>
                              <option value="">전체</option>
                            </select>
					  	</td>
					  </tr>
				  	</table>
				  </div>
				  <div class="normal_Button">
				  	<a href="javascript:fn_searchAction();">조회</a>
				  	<a href="javascript:fn_searchExcel();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
				  	<a href="javascript:fn_searchAction1();">감면추천품목별 조회</a>
				  </div>
				  <div class="normal_con01">
				  	<table id="masterGrid"></table>
				  </div>
				  <div class="normal_con01" style="display:none">
				  	<table id="excelGrid"></table>
				  </div>
				  <%@ include file="/WEB-INF/jsp/include/excelDown.jsp" %>
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