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
	<script type="text/javascript" src="<c:url value='/js/cps/edwards/ftaMaster.js?20231227'/>"></script>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="container">
			  <div class="easyui-layout" style="width:100%;height:715px">
			  	<div data-options="region:'east',split:true" style="width:40%;box-sizing:border-box;border:0px;padding-top:32px;margin-top:32px;">
			  	<input type="hidden" id="taxNum" 	name="taxNum" 		value="${sessionScope.TAXNO}">
			  	  <div class="easyui-tabs" id="tabs" data-options="fit:true,plain:true">
		    	    <div title="일반등록">
		    	      <div class="normal_Button" style="margin-left:15px">
					      <a href="javascript:fn_newAction();">신규</a>
					      <a href="javascript:fn_updateAction();">저장</a>
					  </div>
		    	      <div class="hsnew_C02_table" style="margin-top:-10px">
		      	  	  <form id="addForm" name="addForm">
				  	  <input type="hidden" id="ID" 					name="ID" 				value="${sessionScope.ID}">
				  	  <input type="hidden" id="KEY_ED_fta_pact" 	name="KEY_ED_fta_pact">
			  		  <table>
		   	    	  	<col width="20%"/>
                      	<col width="80%"/>
                      	<col width="23%"/>
		      		  	<tr>
                          <td class="left">협정코드</td>
                          <td><input type="text" id="PACT_CD" name="PACT_CD" style="width:100px"/></td>
                      	</tr>
                      	<tr>
                          <td class="left">협정명</td>
                          <td><input type="text" id="PACT_NM" name="PACT_NM" style="width:100px"/></td>
                      	</tr>
                      	<tr>
                          <td class="left">FTA적용기준</td>
                          <td><input type="text" id="APPLY_STD" name="APPLY_STD" style="width:100%;"/></td>
                      	</tr>
                      	<tr>
                          <td class="left">발효일</td>
                          <td><input type="text" id="EFCT_DT" name="EFCT_DT" style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/></td>
                      	</tr>
                      	<tr>
                          <td class="left">시행일</td>
                          <td><input type="text" id="ENFR_DT" name="ENFR_DT" style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/></td>
                      	</tr>
                      	<tr>
                          <td class="left">자율발급여부</td>
                          <td>
                            <select id="SFCT_ISSU_FG" name="SFCT_ISSU_FG" style="width:50px;">
                              <option value="Y">Y</option>
                              <option value="N">N</option>
                            </select>
                          </td>
                      	</tr>
                      	<tr>
                          <td class="left">원산지증명번호 자동매칭</td>
                          <td>
                            <select id="AUTO_MATCH_CONO" name="AUTO_MATCH_CONO" style="width:50px;">
                              <option value="Y">Y</option>
                              <option value="N">N</option>
                            </select>
                          </td>
                      	</tr>
                      </table>
                      </form>
	                  </div>
		    	    </div>
		  	      </div>
			  	</div>
		      	<div data-options="region:'center'" style="width:60%;box-sizing:border-box;border:0px">
				  <div class="normal_Top">
				  	<table width="100%">
				  	  <col width="15%" />
				  	  <col width="33%" />
				  	  <col width="2%" />
				  	  <col width="15%" />
				  	  <col width="35%" />
					  <tr height="23px">
					  	<td>협정코드</td>
					  	<td><input type="text" id="PACT_CD1" name="PACT_CD1" onkeypress="keyDown()"/></td>
					  	<td></td>
					  	<td>협정명</td>
					  	<td><input type="text" id="PACT_NM1" name="PACT_NM1" onkeypress="keyDown()"/></td>
					  </tr>
				  	</table>
				  </div>
				  <div class="normal_Button">
				  	<a href="javascript:fn_searchAction();">조회</a>
				  	<a href="javascript:fn_deleteAction();">삭제</a>
				  	<a href="javascript:fn_searchExcel();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
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
  </body>
</html>