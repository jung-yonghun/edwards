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
	<script type="text/javascript" src="<c:url value='/js/cps/edwards/mfcMaster.js?20231227'/>"></script>
	<style>
        #drop {
            border: 2px dashed #bbb;
            -moz-border-radius: 5px;
            -webkit-border-radius: 5px;
            border-radius: 5px;
            padding: 5px;
            text-align: center;
            font: 20pt bold, "Vollkorn";
            color: #bbb
        }

        #drop1 {
            border: 2px dashed #bbb;
            -moz-border-radius: 5px;
            -webkit-border-radius: 5px;
            border-radius: 5px;
            padding: 5px;
            text-align: center;
            font: 20pt bold, "Vollkorn";
            color: #bbb
        }

        #b64data {
            width: 100%;
        }
    </style>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="container">
			  <div class="easyui-layout" style="width:100%;height:735px">
			    <div data-options="region:'north',split:true" style="width:100%;height:365px;box-sizing:border-box;border:0px">
			    <div class="easyui-layout" style="width:100%;height:360px">
			  	<div data-options="region:'east',split:true" style="width:40%;box-sizing:border-box;border:0px;padding-top:32px;margin-top:32px;">
			  	  <div class="easyui-tabs" id="tabs" data-options="fit:true,plain:true">
		    	    <div title="일반등록">
		    	      <!-- div class="normal_Button" style="margin-left:15px">
					      <a href="javascript:fn_newAction();">신규</a>
					      <a href="javascript:fn_updateAction();">저장</a>
					  </div-->
		    	      <div class="hsnew_C02_table" style="margin-top:-10px">
		      	  	  <form id="addForm" name="addForm">
				  	  <input type="hidden" id="ID" 						name="ID" 				value="${sessionScope.ID}">
				  	  <input type="hidden" id="KEY_ED_REFUND_MFC_ORDR" 	name="KEY_ED_REFUND_MFC_ORDR">
				  	  <input type="hidden" id="ORDR_NO" 				name="ORDR_NO">
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
                            <input type="text" id="OWN_GODS_CD" name="OWN_GODS_CD" style="display:none" value="3128112960"/>
                            <input type="text" id="GRP_COMP_CD" name="GRP_COMP_CD" style="display:none" value="3128112960"/>
                          </td>
                      	</tr>
                      	<tr>
                          <td class="left">Order일</td>
                          <td><input type="text" id="ORDR_DT" name="ORDR_DT" style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/></td>
                      	</tr>
                      	<tr>
                          <td class="left">작업명</td>
                          <td><input type="text" id="JOB_NM" name="JOB_NM" style="width:100%;"/></td>
                      	</tr>
                      	<tr>
                          <td class="left">BOM적용</td>
                          <td>
                            <select id="BOM_APLY_FG" name="BOM_APLY_FG" style="width:40px;">
                              <option value="Y">Y</option>
                              <option value="N">N</option>
                            </select>
                          </td>
                      	</tr>
                      	<tr>
                          <td class="left">비고</td>
                          <td><input type="text" id="REMK" name="REMK" style="width:100%;"/></td>
                      	</tr>
                      	<tr>
                          <td class="left">진행상태</td>
                          <td>
                            <select id="PROC_STAT" name="PROC_STAT" style="width:70px;">
                              <option value="08002">신고대기</option>
                              <option value="07001">적용중</option>
                              <option value="07002">종료</option>
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
				  	  <col width="10%" />
				  	  <col width="38%" />
				  	  <col width="02%" />
				  	  <col width="10%" />
				  	  <col width="40%" />
					  <tr height="23px">
					  	<td>작업명</td>
					  	<td><input type="text" id="JOB_NM1" name="JOB_NM1" onkeypress="keyDown()"/></td>
					  	<td></td>
					  	<td>Order일자</td>
					  	<td><input type="text" id="ORDR_DT1" name="ORDR_DT1" onkeypress="keyDown()" style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/></td>
					  </tr>
				  	</table>
				  </div>
				  <div class="normal_Button">
				  	<a href="javascript:fn_searchAction();">조회</a>
				  	<!-- a href="javascript:fn_deleteAction();">삭제</a-->
				  	<a href="javascript:fn_searchExcel();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
				  </div>
				  <div class="normal_con01">
				  	<table id="masterGrid"></table>
				  </div>
				  <div class="normal_con01" style="display:none">
				  	<table id="excelGrid"></table>
				  </div>
			  	</div>
			  	</div>
			  	</div>
			  	<div data-options="region:'center',split:true" style="width:100%;box-sizing:border-box;border:0px">
				    <div class="easyui-layout" style="width:100%;height:360px">
				  	<div data-options="region:'east',split:true" style="width:40%;box-sizing:border-box;border:0px">
				  	  <form id="addForm1" name="addForm1">
				  	  <input type="hidden" id="PROD_SEQNO" 	name="PROD_SEQNO">
				  	  <input type="hidden" id="ORDR_NO" 	name="ORDR_NO">
				  	  </form>
					  <div class="normal_Button">
						<a href="javascript:fn_searchExcel2();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
					  </div>
					  <div class="normal_con01">
					    <table id="detailGrid1"></table>
					  </div>
					  <div class="normal_con01" style="display:none">
					  	<table id="excelGrid2"></table>
					  </div>
				  	</div>
			      	<div data-options="region:'center'" style="width:60%;box-sizing:border-box;border:0px">
					  <div class="normal_Button">
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
			  	</div>
		      </div>
			</div>
		  </div>
		</div>
	  </div>
	</div>
  </body>
</html>