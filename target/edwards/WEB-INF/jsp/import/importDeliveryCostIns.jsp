<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
    <title>Delivery Cost 등록</title>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-filter.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/import/importDeliveryCostIns.js'/>"></script>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
			<input type="hidden" id="Ctype" 	name="Ctype" 	value="${param.Ctype}"/>
		    <div class="easyui-layout" style="width:1000px;height:580px;">
		      <div data-options="region:'center'" style="box-sizing:border-box;border:0px;">
				<div class="normal_Button">
				  <a href="javascript:fn_AddImportDeliveryCostAction();">신규</a>
				  <a href="javascript:fn_SaveImportDeliveryCostAction('save');">저장</a>
				  <a id="btnGroupingShow" name="btnGroupingShow" href="javascript:importDeliveryCostGroupingPopup();">그룹핑조회</a>
				  <a href="javascript:window.close();">닫기</a>
				</div>
				<div class="hsnew_C02_table">
	  	          <form id="frm1" name="frm1">
	  	          <input type="hidden" id="isGrouping" 						name="isGrouping" 						value="${param.isGrouping}"/>
			      <input type="hidden" id="deliveryCostKey" 				name="deliveryCostKey" 					value="${param.deliveryCostKey}"/>
			      <input type="hidden" id="USERGRADEB" 						name="USERGRADEB" 						value="${sessionScope.USERGRADEB}">
			      <input type="hidden" id="yymmdd" 							name="yymmdd">
			      <input type="hidden" id="deliveryCostCl" 					name="deliveryCostCl" 					value="IMPORT"/>
			      <input type="hidden" id="deliveryCostWriteUserKey" 		name="deliveryCostWriteUserKey" 		value="${sessionScope.ID}"/>
			      <input type="hidden" id="deliveryCostWriteUserId" 		name="deliveryCostWriteUserId" 			value="${sessionScope.ID}"/>
			      <input type="hidden" id="deliveryCostWriteUserName" 		name="deliveryCostWriteUserName" 		value="${sessionScope.USERNAME}"/>
			      <input type="hidden" id="deliveryCostWriteUserTradeName" 	name="deliveryCostWriteUserTradeName" 	value="${sessionScope.SANGHO}"/>
			      <input type="hidden" id="deliveryCostWriteUserTaxNum" 	name="deliveryCostWriteUserTaxNum" 		value="${sessionScope.TAXNO}"/>
				  <table>
			   	    <col width="10%">
                    <col width="40%">
                    <col width="10%">
                    <col width="40%">
                    <tr>
                        <td class="left">수신처 <i></i></td>
                        <td colspan="3">
                            <input type="hidden" id="deliveryCostCustomerKey" name="deliveryCostCustomerKey"  value=""/>
                            <input type="hidden" id="deliveryCostCustomerDb" name="deliveryCostCustomerDb"/>
                            <input type="hidden" id="deliveryCostCustomerCode" name="deliveryCostCustomerCode"/>
                            <input type="hidden" id="deliveryCostCustomerTaxNum" name="deliveryCostCustomerTaxNum"/>
                            <select id="deliveryCostCustomerName" name="deliveryCostCustomerName" style="width:300px" onchange="fn_changedDeliveryCostCustomerName(this)"></select>
                        </td>
                    </tr>
                    <tr>
                        <td class="left">B/L No. <i></i></td>
                        <td>
                            <input type="text" id="deliveryCostBlNum" name="deliveryCostBlNum" maxlength="16"/>
                            <a href="javascript:importDeliveryRequestBlNumXSingoNumPopup()"><img src="../images/cps/hs_seach.png"></a>
                        </td>
                        <td class="left">신고번호</td>
                        <td>
                            <input type="text" id="deliveryCostSingoNum" name="deliveryCostSingoNum" maxlength="20"/>
                        </td>
                    </tr>
                    <tr>
                        <td class="left">창고</td>
                        <td><input type="text" id="deliveryCostWarehouse" name="deliveryCostWarehouse"  maxlength="50"/></td>
                        <td class="left">C/T</td>
                        <td>
                            <input type="text" id="deliveryCostCtQty" name="deliveryCostCtQty" placeholder="C/T 수" maxlength="18" onkeydown="onlyNumber(this)"/>
                            <input type="text" id="deliveryCostCtUnit" name="deliveryCostCtUnit" placeholder="C/T 단위" maxlength="10"/>
                        </td>
                    </tr>
                    <tr>
                        <td class="left">중량/톤</td>
                        <td>
                            <input type="text" id="deliveryCostWeight" name="deliveryCostWeight"  placeholder="중량(KG)" maxlength="18"/>
                            <input type="text" id="deliveryCostTonnage" name="deliveryCostTonnage"  placeholder="톤" maxlength="30"/>
                        </td>
                        <td class="left">화물종류 <i></i></td>
                        <td><select id="deliveryCostCargoType" name="deliveryCostCargoType"></select></td>
                    </tr>
                    <tr>
                        <td class="left">출발지</td>
                        <td><input type="text" id="deliveryCostStartName" name="deliveryCostStartName" maxlength="25"/></td>
                        <td class="left">도착지</td>
                        <td><input type="text" id="deliveryCostEndName" name="deliveryCostEndName" maxlength="25"/></td>
                    <tr>
                    <tr>
                        <td class="left">데미지여부 <i></i></td>
                        <td>
                            <select id="deliveryCostDamageYn" name="deliveryCostDamageYn">
                                <option value="Y">Y</option>
                                <option value="N" selected="selected">N</option>
                            </select>
                        </td>
                        <td class="left">배송일 <i></i></td>
                        <td><input type="text" id="deliveryCostCompleteDay" name="deliveryCostCompleteDay" maxlength="8"/></td>
                    </tr>
                    <tr>
                        <td class="left">데미지사항</td>
                        <td colspan="3"><textarea type="text" id="deliveryCostDamageNote" name="deliveryCostDamageNote" rows="5"></textarea></td>
                    </tr>
                    <tr>
                        <td class="left">운송료</td>
                        <td>
                            <select id="deliveryCostShippingType" name="deliveryCostShippingType"></select>
                            <input type="text" id="deliveryCostShippingCharge" name="deliveryCostShippingCharge" value="0" onblur="fn_changeDeliveryCostShippingCharge()"/>
                        </td>
                        <td class="left">창고료</td>
                        <td>
                            <select id="deliveryCostWarehouseType" name="deliveryCostWarehouseType"></select>
                            <input type="text" id="deliveryCostWarehouseChange" name="deliveryCostWarehouseChange" value="0"/>
                        </td>
                    </tr>
                    <tr>
                        <td class="left">보험료</td>
                        <td><input type="text" id="deliveryCostInsuranceCharge" name="deliveryCostInsuranceCharge" value="0"/></td>
                    </tr>
                    <tr>
                        <td class="left">대납료</td>
                        <td><input type="text" id="deliveryCostPayforCharge" name="deliveryCostPayforCharge" value="0"/></td>
                        <td class="left">대납업체</td>
                        <td><input type="text" id="deliveryCostPayforName" name="deliveryCostPayforName"/></td>
                    </tr>
                    <tr id="hdnConfirmInfo">
                        <td class="left">운송료(SEIN)</td>
                        <td>
                            <input type="text" id="deliveryCostConfirmCharge" name="deliveryCostConfirmCharge" value="0"
                                   onblur="fn_changeDeliveryCostShippingCharge()"/>
                            <input type="text" id="differenceDeliveryCostConfirmCharge" name="differenceDeliveryCostConfirmCharge" placeholder="운송료차액(세인-운송사)" readonly/>
                        </td>
                        <td class="left">확인(SEIN)</td>
                        <td>
                            <input type="hidden" id="deliveryCostConfirmUserKey" name="deliveryCostConfirmUserKey"/>
                            <input type="hidden" id="deliveryCostConfirmUserId" name="deliveryCostConfirmUserId"/>
                            <input type="text" id="deliveryCostConfirmUserName" name="deliveryCostConfirmUserName"  placeholder="확인자(SEIN)"/>
                            <input type="text" id="deliveryCostConfirmDtm" name="deliveryCostConfirmDtm" placeholder="확인일시(SEIN)" readonly/>
                        </td>
                    </tr>
                    <tr>
                        <td class="left">특이사항</td>
                        <td colspan="3">
                            <textarea type="text" id="deliveryCostSpecificNote" name="deliveryCostSpecificNote" rows="5"></textarea>
                            <input type="hidden" id="deliveryCostNote" name="deliveryCostNote"/>
                        </td>
                    </tr>
                    <tr>
                        <td class="left">상태 <i></i></td>
                        <td><select id="deliveryCostStatus" name="deliveryCostStatus" onchange="fn_changeDeliveryConfirmUserInfo(this)"></select></td>
                        <td class="left">사용여부 <i></i></td>
                        <td>
                            <select id="useYn" name="useYn">
                                <option value="Y" selected="selected">Y</option>
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
  	    </div>
	  </div>
	</div>
  </body>
</html>