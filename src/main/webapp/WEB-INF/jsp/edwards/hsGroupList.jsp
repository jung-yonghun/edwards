<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_newTitle.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_newCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_newJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/cps/edwards/hsGroupList.js?20231227'/>"></script>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="container">
			  <div class="easyui-layout" style="width:100%;height:735px">
			    <input type="hidden" id="ID" 		name="ID" 		value="${sessionScope.ID}">
			    <input type="hidden" id="taxNum" 	name="taxNum" 	value="${sessionScope.TAXNO}">
			    <div data-options="region:'north',split:true" style="width:100%;height:100px;box-sizing:border-box;border:0px">
				  <div class="normal_Top">
				  	<table width="100%">
				  	  <col width="08%" />
				  	  <col width="24%" />
				  	  <col width="01%" />
				  	  <col width="08%" />
				  	  <col width="10%" />
				  	  <col width="01%" />
				  	  <col width="08%" />
				  	  <col width="10%" />
				  	  <col width="01%" />
				  	  <col width="08%" />
				  	  <col width="21%" />
					  <tr height="23px">
					  	<td>Hs Code</td>
					  	<td><input type="text" id="HS_CD" name="HS_CD" onkeypress="keyDown()"/></td>
					  	<td></td>
					  	<td>수입관리대상</td>
					  	<td>
					  	  <select id="RSN_CD_IMP" name="RSN_CD_IMP" style="width:50px">
					  	    <option value="">전체</option>
					      	<option value="Y">Y</option>
	                        <option value="N">N</option>
						  </select>
					  	</td>
					  	<td></td>
					  	<td>수출관리대상</td>
					  	<td>
					  	  <select id="RSN_CD_EXP" name="RSN_CD_EXP" style="width:50px">
					  	    <option value="">전체</option>
					      	<option value="Y">Y</option>
	                        <option value="N">N</option>
						  </select>
					  	</td>
					  	<td></td>
					  	<td>품명규격관리대상</td>
					  	<td>
					  	  <select id="Gukyk" name="Gukyk" style="width:50px">
					  	    <option value="">전체</option>
					      	<option value="Y">Y</option>
						  </select>
					  	</td>
					  </tr>
				  	</table>
				  </div>
				  <div class="normal_Button">
				  	<a href="javascript:fn_searchAction();">조회</a>
				  	<a href="javascript:fn_searchExcel();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
				  </div>
			  	</div>
			  	<div data-options="region:'center',split:true" style="width:100%;box-sizing:border-box;border:0px">
				  <div class="normal_con01" id='parentDiv10' style="padding-left:5px;padding-right:5px">
				  	<table id="masterGrid"></table>
		  			<div id="masterPager"></div>
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
  </body>
</html>