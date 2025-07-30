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
	<script type="text/javascript" src="<c:url value='/js/cps/edwards/importPop3.js?20231227'/>"></script>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="container">
			  <div class="easyui-layout" style="width:100%;height:600px">
			    <div data-options="region:'north',split:true" style="width:100%;height:400px;box-sizing:border-box;border:0px">
			    <div class="easyui-layout" style="width:100%;height:380px">
		      	<div data-options="region:'center'" style="width:100%;box-sizing:border-box;border:0px">
		      	  <input type="hidden" id="ITEM_CD" name="ITEM_CD" 	value="${param.PROD_CD}">
		      	  <input type="hidden" id="HS_CD" 	name="HS_CD" 	value="${param.HS_CD}">
		      	  <input type="hidden" id="ORIG" 	name="ORIG" 	value="${param.ORIG}">
				  <div class="normal_Top">
				  	<table width="100%">
				  	  <col width="10%" />
				  	  <col width="38%" />
				  	  <col width="02%" />
				  	  <col width="50%" />
					  <tr height="23px">
					  	<td>
					  	  <select id="NOCHK" name="NOCHK" style="width:100px;">
                            <option value="BlNo">BL번호</option>
                            <option value="Singo">신고번호</option>
                          </select>
					  	</td>
					  	<td><input type="text" id="NODATA" name="NODATA" onkeypress="keyDown()"/></td>
					  	<td></td>
					  	<td>
					  	  <input type="checkbox" id="month" name="month" value="0" checked/> 3개월내 내역만&nbsp;&nbsp;&nbsp;&nbsp;
					  	  <input type="checkbox" id="day" name="day" value="0" checked/> 2년내 내역만&nbsp;&nbsp;&nbsp;&nbsp;
					  	  <input type="checkbox" id="gam" name="gam" value="0" checked/> 비감면건&nbsp;&nbsp;&nbsp;&nbsp;
					  	  <input type="checkbox" id="gn"  name="gn"  value="0" checked/> 결제방법GN제외
					  	</td>
					  </tr>
				  	</table>
				  </div>
				  <div class="normal_Button">
				  	<a href="javascript:fn_searchAction();">조회</a>
				  </div>
				  <div class="normal_con01">
				  	<table id="masterGrid"></table>
				  </div>
			  	</div>
			  	</div>
			  	</div>
			  	<div data-options="region:'center',split:true" style="width:100%;box-sizing:border-box;border:0px">
				    <div class="easyui-layout" style="width:100%;height:200px">
			      	<div data-options="region:'center'" style="width:100%;box-sizing:border-box;border:0px">
					  <div class="normal_Button" style="margin-left:0px">
					  	<a href="javascript:fn_addAction();">수량지정</a>
					  	<a href="javascript:window.close();">취소</a>
					  </div>
					  <div class="normal_Top">
					  <form id="addForm1" name="addForm1">
					  <input type="hidden" id="ID" 						name="ID" 				value="${sessionScope.ID}">
					  <input type="hidden" id="taxNum" 					name="taxNum" 			value="${sessionScope.TAXNO}">
			  	      <input type="hidden" id="IMPT_ORDR_MNG_NO" 		name="IMPT_ORDR_MNG_NO">
			  	      <input type="hidden" id="KEY_ED_IMPT_DECL_HNG" 	name="KEY_ED_IMPT_DECL_HNG">
			  	      <input type="hidden" id="KEY_ED_EXPT_INV" 		name="KEY_ED_EXPT_INV"  value="${param.KEY_ED_EXPT_INV}">
			  	      <input type="hidden" id="EXPT_ORDR_MNG_NO" 		name="EXPT_ORDR_MNG_NO" value="${param.EXPT_ORDR_MNG_NO}">
			  	      <input type="hidden" id="EXPT_INV_SEQNO" 			name="EXPT_INV_SEQNO"   value="${param.EXPT_INV_SEQNO}">
			  	      <input type="hidden" id="EXPT_LAN" 				name="EXPT_LAN"   		value="${param.DECL_LAN}">
			  	      <input type="hidden" id="EXPT_HNG" 				name="EXPT_HNG"   		value="${param.DECL_HNG}">
			  	      <input type="hidden" id="QTY_UNIT" 				name="QTY_UNIT"   		value="${param.QTY_UNIT}">
			  	      <input type="hidden" id="strFromDate" 			name="strFromDate">
			  	      <input type="hidden" id="strToDate" 				name="strToDate">
			  	      <input type="hidden" id="toDate" 					name="toDate">
					  <table style="width:430px;padding:3px">
				  	  <col width="130px" />
				  	  <col width="50px" />
				  	  <col width="50px" />
				  	  <col width="50px" />
				  	  <col width="50px" />
				  	  <col width="50px" />
				  	  <col width="50px" />
					  <tr height="23px">
					  	<td align="center">신고번호</td>
					  	<td align="center">란</td>
					  	<td align="center">행</td>
					  	<td align="center">수량</td>
					  	<td align="center">잔량</td>
					  	<td align="center">필요수량</td>
					  	<td align="center">지정수량</td>
					  </tr>
					  <tr height="23px">
					  	<td><input type="text" id="IMPT_DECL_NO" name="IMPT_DECL_NO" style="text-align:center" readOnly/></td>
					  	<td><input type="text" id="IMPT_LAN" name="IMPT_LAN" style="text-align:center" readOnly/></td>
					  	<td><input type="text" id="IMPT_HNG" name="IMPT_HNG" style="text-align:center" readOnly/></td>
					  	<td><input type="text" id="IMQTY" name="IMQTY" style="text-align:right" readOnly/></td>
					  	<td><input type="text" id="IMPT_RMID_QTY" name="IMPT_RMID_QTY" style="text-align:right" readOnly/></td>
					  	<td><input type="text" id="QTY" name="QTY" value="${param.NOT_ORIG_STAT_QTY}" style="text-align:right" readOnly/></td>
					  	<td><input type="text" id="EXPT_QTY" name="EXPT_QTY" value="${param.NOT_ORIG_STAT_QTY}" style="text-align:right" onkeydown="return fn_onlyNumber(event)"/></td>
					  </tr>
				  	  </table>
				  	  </form>
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