<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
    <title>비용정보 등록</title>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-cellediting.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/import/importCustomsCostIns.js'/>"></script>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
			<input type="hidden" id="Ctype" 	name="Ctype" 	value="${param.Ctype}"/>
		    <div class="easyui-layout" style="width:700px;height:700px;">
		      <div data-options="region:'center'" style="box-sizing:border-box;border:0px;">
				<div class="normal_Button">
				  <a href="javascript:fn_AddImportCustomsCostAction();">신규</a>
				  <a href="javascript:fn_SaveImportCustomsCostAction('save');">저장</a>
				  <a href="javascript:window.close();">닫기</a>
				</div>
				<div class="hsnew_C02_table">
	  	          <form id="frm1" name="frm1">
			      <input type="hidden" id="costMstKey" 			name="costMstKey" 			value="${param.costMstKey}"/>
			      <input type="hidden" id="costMstCl" 			name="costMstCl" 			value="IMPORT"/>
			      <input type="hidden" id="costShipperKey" 		name="costShipperKey" 		value="${sessionScope.ID}"/>
			      <input type="hidden" id="costShipperUserId" 	name="costShipperUserId" 	value="${sessionScope.ID}"/>
			      <input type="hidden" id="costShipperUserNm" 	name="costShipperUserNm" 	value="${sessionScope.USERNAME}"/>
			      <input type="hidden" id="costShipperTaxNum" 	name="costShipperTaxNum" 	value="${sessionScope.TAXNO}"/>
				  <table>
			   	    <col width="15%">
                    <col width="35%">
                    <col width="15%">
                    <col width="35%">
                    <tr>
                        <td class="left">수신처</td>
                        <td>
                            <input type="hidden" id="costCustomerKey" 		name="costCustomerKey"		value="0"/>
                            <input type="hidden" id="costCustomerDb" 		name="costCustomerDb"		value="${sessionScope.DEFAULTDB}"/>
                            <input type="hidden" id="costCustomerCode" 		name="costCustomerCode"		value="0000"/>
                            <input type="hidden" id="costCustomerTaxNum" 	name="costCustomerTaxNum"	value="${sessionScope.TAXNO}"/>
                            <input type="text"   id="costCustomerName" 		name="costCustomerName" 	value="${sessionScope.SANGHO}" readOnly/>
                        </td>
                        <td class="left">정산월 <i></i></td>
                        <td>
                            <input type="text" id="accountMonth" name="accountMonth" maxlength="6"/>
                        </td>
                    </tr>
                    <tr>
                        <td class="left">B/L No.</td>
                        <td>
                            <input type="text" id="blNum" name="blNum" maxlength="16" readOnly/>
                            <a href="javascript:commonBlNumXSingoNumPopup()"><img src="../images/cps/hs_seach.png"></a>
                        </td>
                        <td class="left">신고번호 <i></i></td>
                        <td>
                            <input type="text" id="singoNum" name="singoNum" maxlength="20" readOnly/>
                        </td>
                    </tr>
                    <tr>
                        <td class="left">의뢰번호1</td>
                        <td><input type="text" id="referenceNum1" name="referenceNum1"  maxlength="50"/></td>
                        <td class="left">의뢰번호2</td>
                        <td><input type="text" id="referenceNum2" name="referenceNum2"  maxlength="50"/></td>
                    </tr>
                    <tr>
                        <td class="left">공급가액</td>
                        <td><input type="text" id="totalSupplyAmt" name="totalSupplyAmt" maxlength="18" value="0" style="text-align:right;" readOnly/></td>
                        <td class="left">부가세</td>
                        <td><input type="text" id="totalVat" name="totalVat" maxlength="18" value="0" style="text-align:right;" readOnly/></td>
                    </tr>
                    <tr>
                        <td class="left">총금액</td>
                        <td><input type="text" id="totalSumAmt" name="totalSumAmt" maxlength="25" value="0" style="text-align:right;" readOnly/></td>
                        <td class="left">사용여부</td>
                        <td>
                          <select id="useYn" name="useYn">
                            <option value="Y" selected="selected">Y</option>
                            <option value="N">N</option>
                          </select>
                        </td>
                    <tr>
                    <tr>
                        <td class="left">참고사항</td>
                        <td colspan="3"><textarea type="text" id="costMstNote" name="costMstNote" rows="5"></textarea></td>
                    </tr>
                    <tr>
                        <td class="left">작성일자</td>
                        <td>
                            <input type="text" id="accountDay" name="accountDay"/>
                        </td>
                        <td class="left">상태</td>
                        <td>
                          <select id="costMstStatus" name="costMstStatus">
                        	<option value="10">입력(10)</option>
                          </select>
                        </td>
                    </tr>
			      </table>
			      </form>
			    </div>
			    <div class="normal_Button">
				  <a href="javascript:addRowContacts();">라인추가</a>
				  <a href="javascript:delRowContacts();">라인삭제</a>
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