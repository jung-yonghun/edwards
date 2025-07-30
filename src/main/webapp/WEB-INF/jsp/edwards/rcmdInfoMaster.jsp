<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<link type="text/css" rel="stylesheet" href="<c:url value='/css/lib/jexcel/jexcel.css'/>"/>
	<link type="text/css" rel="stylesheet" href="<c:url value='/css/lib/jexcel/jsuites.css'/>"/>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/jexcel/jexcel.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/jexcel/jsuites.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-bufferview.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-filter.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/edwards/rcmdInfoMaster.js?20231227'/>"></script>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="container">
			  <div class="easyui-layout" style="width:100%;height:735px">
			    <div data-options="region:'center',split:true" style="width:60%;height:735px;box-sizing:border-box;border:0px">
			      <div class="easyui-layout" style="width:100%;height:735px">
				    <div data-options="region:'north',split:true" style="width:100%;height:250px;box-sizing:border-box;border:0px">
					  <div class="normal_Top">
					  	<table width="100%">
					  	  <col width="10%" />
					  	  <col width="29%" />
					  	  <col width="02%" />
					  	  <col width="10%" />
					  	  <col width="22%" />
					  	  <col width="02%" />
					  	  <col width="10%" />
					  	  <col width="15%" />
					  	  <tr height="23px">
						    <td style="vertical-align:baseline">
						  	  <select id="NOCHK" name="NOCHK" style="width:80px;">
	                            <option value="INFO">추천정보</option>
	                            <option value="CD">사업부</option>
	                          </select>
						  	</td>
						  	<td style="vertical-align:baseline"><input type="text" id="NODATA" name="NODATA" onkeypress="keyDown()"/></td>
						  	<td></td>
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
					  	<a href="javascript:fn_deleteAction();">삭제</a>
					  	<a href="javascript:fn_searchAction1();">아이템별 조회</a>
					  </div>
					  <div class="normal_con01">
					  	<table id="masterGrid"></table>
					  </div>
					  <div class="normal_con01" style="display:none">
					  	<table id="excelGrid"></table>
					  </div>
				  	</div>
			  		<div data-options="region:'center',split:true" style="width:100%;height:485px;box-sizing:border-box;border:0px">
					  <div class="normal_Button">
					  	<a href="javascript:fn_deleteAction1();">삭제</a>
					  	<a href="javascript:fn_deleteAllAction();">전체삭제</a>
					  	<a href="javascript:fn_searchExcel1();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
					  </div>
					  <div class="normal_con01">
					  	<table id="detailGrid"></table>
					  </div>
					  <div class="normal_con01" style="display:none">
					  	<table id="excelGrid1"></table>
					  </div>
					  <%@ include file="/WEB-INF/jsp/include/excelDown.jsp" %>
				    </div>
				  </div>
				</div>
				<div data-options="region:'east',split:true" style="width:40%;height:735px;box-sizing:border-box;border:0px;">
				  <div class="easyui-tabs" id="tabs" data-options="fit:true,plain:true">
		    	    <div title="등록">
		    	      <div class="normal_Button" style="margin-left:15px">
					      <a href="javascript:fn_newAction();">신규</a>
					      <a href="javascript:fn_updateAction();">저장</a>
					  </div>
		    	      <div class="hsnew_C02_table" style="margin-top:-10px">
		      	  	  <form id="addForm" name="addForm">
				  	  <input type="hidden" id="ID" 						name="ID" 				value="${sessionScope.ID}">
				  	  <input type="hidden" id="KEY_ED_EXEM_RCMD_INFO" 	name="KEY_ED_EXEM_RCMD_INFO">
				  	  <input type="hidden" id="EXEM_MNG_NO" 			name="EXEM_MNG_NO">
			  		  <table>
		   	    	  	<col width="20%"/>
                      	<col width="80%"/>
                      	<col width="23%"/>
                      	<tr>
                          <td class="left">사업부</td>
                          <td><select id="COMP_NM" name="COMP_NM" style="width:180px" onchange="fn_changeDiv(this)"></select>
                            <input type="hidden" id="COMP_CD" name="COMP_CD"/></td>
                      	</tr>
                      	<tr>
                          <td class="left">추천정보</td>
                          <td><input type="text" id="RCMD_GODS_INFO" name="RCMD_GODS_INFO" style="width:100%;"/></td>
                      	</tr>
                      	<tr>
                          <td class="left">배정일자</td>
                          <td><input type="text" id="ASGN_DTTM" name="ASGN_DTTM" style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/></td>
                      	</tr>
                      	<tr>
                          <td class="left">비고</td>
                          <td><input type="text" id="REMK" name="REMK" style="width:100%;"/></td>
                      	</tr>
                      	<tr>
                          <td class="left">사용여부</td>
                          <td>
                            <select id="USE_FG" name="USE_FG" style="width:50px;">
                              <option value="Y">Y</option>
                              <option value="N">N</option>
                            </select>
                          </td>
                      	</tr>
                      </table>
                      </form>
	                  </div>
	                  <font color="red" style="margin-left:10px"># 붙여넣기는 빈값이 없어야 합니다.</font><br>
	                  <div id="spreadsheet" style="margin-left:10px"></div>
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