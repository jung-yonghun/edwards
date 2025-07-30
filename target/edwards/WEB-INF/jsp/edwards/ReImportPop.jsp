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
	<script type="text/javascript" src="<c:url value='/js/cps/edwards/ReImportPop.js?20231227'/>"></script>
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
		      	  <input type="hidden" id="SERIAL_NO" name="SERIAL_NO" 	value="${param.SERIAL_NO}">
				  <div class="normal_Top">
				  	<table width="100%">
				  	  <col width="08%" />
				  	  <col width="42%" />
				  	  <col width="01%" />
				  	  <col width="08%" />
				  	  <col width="41%" />
				  	  <tr height="23px">
					    <td>수입 수리일</td>
					  	<td>
					  	  <input type="text" id="strFromDate" name="strFromDate"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />~
						  <input type="text" id="strToDate"   name="strToDate"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />
					  	</td>
					  	<td></td>
					  	<td>수입신고번호</td>
					  	<td><input type="text" id="singoNo" name="singoNo" onkeypress="keyDown()"/></td>
					  </tr>
					  <tr height="23px">
					  	<td>B/L No</td>
					  	<td><input type="text" id="blNo" name="blNo" onkeypress="keyDown()"/></td>
					  	<td></td>
					  	<td>Item No</td>
					  	<td><input type="text" id="item" name="item" onkeypress="keyDown()"/></td>
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
					  <input type="hidden" id="ID" 						name="ID" 					value="${sessionScope.ID}">
			  	      <input type="hidden" id="IMPT_ORDR_MNG_NO" 		name="IMPT_ORDR_MNG_NO">
			  	      <input type="hidden" id="KEY_ED_REEXPT_MASTER" 	name="KEY_ED_REEXPT_MASTER">
			  	      <input type="hidden" id="EXPT_INVNO" 				name="EXPT_INVNO"  			value="${param.EXPT_INVNO}">
			  	      <input type="hidden" id="EXPT_INV_SEQNO" 			name="EXPT_INV_SEQNO"  		value="${param.EXPT_INV_SEQNO}">
			  	      <input type="hidden" id="KEY_ED_EXPT_INV" 		name="KEY_ED_EXPT_INV"  	value="${param.KEY_ED_EXPT_INV}">
			  	      <input type="hidden" id="Expo_gurae_gbn" 			name="Expo_gurae_gbn"  		value="${param.Expo_gurae_gbn}">
			  	      <input type="hidden" id="NameOfShipto" 			name="NameOfShipto"  		value="${param.NameOfShipto}">
			  	      <input type="hidden" id="EXPT_ORDR_MNG_NO" 		name="EXPT_ORDR_MNG_NO"  	value="${param.EXPT_ORDR_MNG_NO}">
					  <table style="width:380px;padding:3px">
				  	  <col width="130px" />
				  	  <col width="50px" />
				  	  <col width="50px" />
				  	  <col width="50px" />
				  	  <col width="50px" />
					  <tr height="23px">
					  	<td align="center">신고번호</td>
					  	<td align="center">란</td>
					  	<td align="center">행</td>
					  	<td align="center">잔량</td>
					  	<td align="center">지정수량</td>
					  </tr>
					  <tr height="23px">
					  	<td><input type="text" id="IMPT_DECL_NO" name="IMPT_DECL_NO" style="text-align:center" readOnly/></td>
					  	<td><input type="text" id="LAN" name="LAN" style="text-align:center" readOnly/></td>
					  	<td><input type="text" id="HNG" name="HNG" style="text-align:center" readOnly/></td>
					  	<td><input type="text" id="RMID_QTY" name="RMID_QTY" style="text-align:right" readOnly/></td>
					  	<!--td><input type="text" id="IMPT_QTY" name="IMPT_QTY" value="${param.RMID_QTY}" style="text-align:right" readOnly/></td-->
					  	<td>
					  	  <input type="text" id="ReQTY" name="ReQTY"  value="${param.RMID_QTY}" style="text-align:right" onkeydown="return fn_onlyNumber(event)"/>
					  	  <input type="hidden" id="IMPT_QTY" name="IMPT_QTY" value="${param.RMID_QTY}" style="text-align:right" readOnly/>
					  	</td>
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