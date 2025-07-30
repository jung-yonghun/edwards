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
	<script type="text/javascript" src="<c:url value='/js/cps/edwards/reExpobjMaster.js?20231227'/>"></script>
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
			      <input type="hidden" id="taxNum" 	name="taxNum" 		value="${sessionScope.TAXNO}">
				      <div data-options="region:'north',split:true" style="width:100%;height:330px;box-sizing:border-box;border:0px">
				      <div class="normal_Top">
					    <form id="frm1" name="frm1">
					  	<table width="100%">
					  	  <col width="08%" />
					  	  <col width="42%" />
					  	  <col width="02%" />
					  	  <col width="08%" />
					  	  <col width="40%" />
					  	  <tr height="23px">
						    <td>Order일</td>
						  	<td><input type="text" id="ORDR_DT1" name="ORDR_DT1" onkeypress="keyDown()" style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/></td>
						  	<td></td>
						  	<td>수출입구분</td>
						  	<td>
						  	  <select id="ImExGbn1" name="ImExGbn1" style="width:50px;">
						  	      <option value="">전체</option>
	                              <option value="수출">수출</option>
	                              <option value="수입">수입</option>
	                          </select>
						  	</td>
						  </tr>
						  <tr height="23px">
						    <td>작업명</td>
						  	<td><input type="text" id="JOB_NM1" name="JOB_NM1" onkeypress="keyDown()"/></td>
						  	<td></td>
						  	<td>비고</td>
						  	<td><input type="text" id="RMRK1" name="RMRK1" onkeypress="keyDown()"/></td>
						  </tr>
					  	</table>
					  	</form>
					  </div>
					  <div class="normal_Button">
					  	<a href="javascript:fn_searchAction();">조회</a>
					  	<a href="javascript:fn_deleteAction();">삭제</a>
					  	<a href="javascript:fn_searchExcel3();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
					  	<a href="javascript:fn_searchExcel2();">전체 엑셀다운</a>
					  	<!-- a href="javascript:fn_searchExcel();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a-->
					  </div>
					  <font color="red" style="margin-left:10pt">비환급대상 수입건 구분기준 : 비환급리스트, 징수형태 14, 거래구분 11 외, 감면적용건</font>
					  <div class="normal_con01">
					  	<table id="masterGrid"></table>
					  </div>
					  <div class="normal_con01" style="display:none">
					  	<table id="excelGrid"></table>
					  </div>
				  	</div>
			  		<div data-options="region:'center',split:true" style="width:100%;height:405px;box-sizing:border-box;border:0px">
					  <div class="normal_Button">
					  	<a href="javascript:fn_deleteAction1();">삭제</a>
					  	<a href="javascript:fn_searchExcel1();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
					  </div>
					  <div class="normal_con01">
					  	<table id="detailGrid"></table>
					  </div>
					  <div class="normal_con01" style="display:none">
					  	<table id="excelGrid1"></table>
					  </div>
					  <div class="normal_con01" style="display:none">
					  	<table id="excelGrid2"></table>
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
				  	  <input type="hidden" id="KEY_ED_REEXPOBJCLOSE_ORDR" 	name="KEY_ED_REEXPOBJCLOSE_ORDR">
				  	  <input type="hidden" id="ORDR_NO" 					name="ORDR_NO">
				  	  <input type="hidden" id="useYn" 						name="useYn"			value="Y">
			  		  <table>
		   	    	  	<col width="20%"/>
                      	<col width="80%"/>
                      	<col width="23%"/>
                      	<tr>
                          <td class="left">사업부</td>
                          <td>
                            <select id="OWN_GODS_NM" name="OWN_GODS_NM" style="width:80px;">
                              <option value="EDWARDS">EDWARDS</option>
                            </select>
                            <input type="text" id="OWN_GODS_CD" name="OWN_GODS_CD" style="display:none" value="0000000001"/>
                            <input type="text" id="GRP_COMP_CD" name="GRP_COMP_CD" style="display:none" value="3128112960"/>
                          </td>
                      	</tr>
                      	<tr>
                          <td class="left">담당사원</td>
                          <td><input type="text" id="OWN_GODS_DIVS_MAN" name="OWN_GODS_DIVS_MAN" style="width:200px;"  value="${sessionScope.USERNAME}"/></td>
                      	</tr>
                      	<tr>
                          <td class="left">Order일</td>
                          <td><input type="text" id="ORDR_DT" name="ORDR_DT" style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/></td>
                      	</tr>
                      	<tr>
                          <td class="left">수출입구분</td>
                          <td>
                            <select id="ImExGbn" name="ImExGbn" style="width:50px;">
                              <option value="수출">수출</option>
                              <option value="수입">수입</option>
                            </select>
                          </td>
                      	</tr>
                      	<tr>
                          <td class="left">작업명</td>
                          <td><input type="text" id="JOB_NM" name="JOB_NM" style="width:100%;"/></td>
                      	</tr>
                      	<tr>
                          <td class="left">비고</td>
                          <td><input type="text" id="RMRK" name="RMRK" style="width:100%;"/></td>
                      	</tr>
                      </table>
                      </form>
	                  </div>
	                  <font color="red" style="margin-left:10px"># 붙여넣기는 빈값이 없어야 합니다.</font><br>
	                  <div id="spreadsheet" style="margin-left:10px"></div>
	                  <div class="normal_Top">
					  	<table width="100%">
					  	  <col width="10%" />
					  	  <col width="38%" />
					  	  <col width="02%" />
					  	  <col width="50%" />
						  <tr height="23px">
						  	<td style="vertical-align:baseline">
						  	  <input type="hidden" id="strFromDate" name="strFromDate"/>
						  	  <select id="NOCHK" name="NOCHK" style="width:100px;">
	                            <option value="BlNo">BL(INV)번호</option>
	                            <option value="Singo">신고번호</option>
	                            <option value="ItemCd">Item코드</option>
	                            <option value="ItemNm">Item명</option>
	                          </select>
						  	</td>
						  	<td style="vertical-align:baseline"><input type="text" id="NODATA" name="NODATA" onkeypress="keyDown1()"/></td>
						  	<td></td>
						  	<td style="vertical-align:baseline"></td>
						  </tr>
					  	</table>
					  </div>
					  <div class="normal_Button">
					  	<a href="javascript:fn_searchAction1();">조회</a>
					  	<a href="javascript:fn_addAction();">추가</a>
					  </div>
					  <div class="normal_con01">
					  	<table id="detailGrid1"></table>
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