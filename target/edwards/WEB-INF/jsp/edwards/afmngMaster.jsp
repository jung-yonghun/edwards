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
	<script type="text/javascript" src="<c:url value='/js/cps/edwards/afmngMaster.js?240924'/>"></script>
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
				    <div data-options="region:'north',split:true" style="width:100%;height:410px;box-sizing:border-box;border:0px">
					  <div class="normal_Top">
					  	<table width="100%">
					  	  <col width="10%" />
					  	  <col width="36%" />
					  	  <col width="02%" />
					  	  <col width="10%" />
					  	  <col width="15%" />
					  	  <col width="02%" />
					  	  <col width="10%" />
					  	  <col width="15%" />
						  <tr height="23px">
						    <td>사업부</td>
						  	<td><input type="text" id="OWN_GODS_NM1" name="OWN_GODS_NM1" onkeypress="keyDown()"/></td>
						  	<td></td>
						  	<td>Order일자</td>
						  	<td><input type="text" id="ORDR_DT1" name="ORDR_DT1" onkeypress="keyDown()" style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/></td>
						  	<td></td>
						  	<td>진행상태</td>
						  	<td>
	                            <select id="STAT1" name="STAT1" style="width:80px;">
	                              <option value="07001">적용중</option>
	                              <option value="07002">종료</option>
	                              <option value="">전체</option>
	                            </select>
						  	</td>
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
					</div>
			  		<div data-options="region:'center',split:true" style="width:100%;height:325px;box-sizing:border-box;border:0px">
					  <div class="normal_Button">
					  	<a href="javascript:fn_deleteAction1();">삭제</a>
					  	<a href="javascript:fn_deleteAllAction();">전체삭제</a>
					  	<a href="javascript:fn_printAction();" style="background-color:#ebf9ff">출력</a>
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
				  	  <input type="hidden" id="ID" 							name="ID" 				value="${sessionScope.ID}">
				  	  <input type="hidden" id="KEY_ED_EXEM_AFMNG_END_MST" 	name="KEY_ED_EXEM_AFMNG_END_MST">
				  	  <input type="hidden" id="AFMNG_END_MNG_NO" 			name="AFMNG_END_MNG_NO">
			  		  <table>
		   	    	  	<col width="20%"/>
                      	<col width="80%"/>
                      	<col width="23%"/>
                      	<tr>
                          <td class="left">사업부</td>
                          <td><select id="OWN_GODS_NM" name="OWN_GODS_NM" style="width:180px" onchange="fn_changeDiv(this)"></select>
                            <input type="hidden" id="OWN_GODS_CD" name="OWN_GODS_CD"/>
                            <input type="hidden" id="GRP_COMP_CD" name="GRP_COMP_CD"/>
                          </td>
                      	</tr>
                      	<tr>
                          <td class="left">담당사원</td>
                          <td><input type="text" id="OWN_GODS_DIVS_MAN" name="OWN_GODS_DIVS_MAN" style="width:200px;" value="${sessionScope.USERNAME}"/></td>
                      	</tr>
                      	<tr>
                          <td class="left">신고요청일</td>
                          <td><input type="text" id="DECL_REQ_DT" name="DECL_REQ_DT" style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/></td>
                      	</tr>
                      	<tr>
                          <td class="left">신고업체</td>
                          <td>
                            <input type="hidden" id="DECL_CUSTOMS_CD" name="DECL_CUSTOMS_CD" value="001" readonly/>
                            <input type="text" id="DECL_CUSTOMS_NM" name="DECL_CUSTOMS_NM" style="width:100%;"/>
                          </td>
                      	</tr>
                      	<tr>
                          <td class="left">신고담당사원</td>
                          <td><input type="text" id="DECL_DIVS_MAN" name="DECL_DIVS_MAN" style="width:200px;"/></td>
                      	</tr>
                      	<tr>
                          <td class="left">신고접수일시</td>
                          <td><input type="text" id="DECL_RCPT_DT" name="DECL_RCPT_DT" style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/></td>
                      	</tr>
                      	<tr>
                          <td class="left">신고완료일시</td>
                          <td><input type="text" id="DECL_CMPL_DT" name="DECL_CMPL_DT" style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/></td>
                      	</tr>
                      	<tr>
                          <td class="left">Order일자</td>
                          <td><input type="text" id="ORDR_DT" name="ORDR_DT" style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/></td>
                      	</tr>
                      	<tr>
                          <td class="left">비고</td>
                          <td><input type="text" id="RMRK" name="RMRK" style="width:100%;"/></td>
                      	</tr>
                      	<tr>
                          <td class="left">진행상태</td>
                          <td>
                            <select id="STAT" name="STAT" style="width:70px;">
                              <option value="07001">적용중</option>
                              <option value="07002">종료</option>
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
	</div>
  </body>
</html>