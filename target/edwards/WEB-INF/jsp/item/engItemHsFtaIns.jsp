<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
    <title>HS Request</title>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/cps/item/engItemHsFtaIns.js'/>"></script>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="easyui-layout" style="width:900px;height:700px;">
		      <div data-options="region:'center'" style="box-sizing:border-box;border:0px;">
				<div class="normal_Button">
				  <a href="javascript:fn_saveAction();">Save</a>
				  <a href="javascript:window.close();">Close</a>
				</div>
				<div class="hsnew_C02_table">
	  	          <form id="frm1" name="frm1">
	  	          <input type="hidden" id="USERGRADE" 				name="USERGRADE" 			value="${sessionScope.USERGRADE}">
	  	          <input type="hidden" id="_defaultDB" 				name="_defaultDB" 			value="${sessionScope.DEFAULTDB}">
	  	          <input type="hidden" id="hsStatus" 				name="hsStatus" 			value="1000"/>
	  	          <input type="hidden" id="hsReviewerUserKey" 		name="hsReviewerUserKey" 	value="0"/>
	  	          <input type="hidden" id="hsReviewerUserId" 		name="hsReviewerUserId" 	value="gyna"/>
	  	          <input type="hidden" id="hsReviewerUserNm" 		name="hsReviewerUserNm" 	value="나기열"/>
	  	          <input type="hidden" id="hsReviewerPhoneNum" 		name="hsReviewerPhoneNum" 	value="02-6929-3470"/>
	  	          <input type="hidden" id="hsReviewerUserEmail" 	name="hsReviewerUserEmail" 	value="gyna@esein.co.kr"/>
	  	          <input type="hidden" id="hsRegNum" 				name="hsRegNum"/>
	  	          <input type="hidden" id="hsRegDt" 				name="hsRegDt"/>
	  	          <input type="hidden" id="useYn" 					name="useYn"				value="Y"/>
	  	          <input type="hidden" id="seinCheck" 				name="seinCheck"			value="N"/>
				  <table>
			   	    <col width="13%">
                    <col width="23%">
                    <col width="12%">
                    <col width="20%">
                    <col width="12%">
                    <col width="20%">
                    <tr>
                      <td class="left">Requestor <i></i></td>
                      <td colspan="5">
                        <input type="hidden" id="hsRegUserKey" name="hsRegUserKey" value="${sessionScope.ID}"/>
                        <input type="hidden" id="hsRegUserId" name="hsRegUserId" value="${sessionScope.USERID}"/>
                        <input type="text" id="hsRegUserNm" name="hsRegUserNm" placeholder="Requestor" value="${sessionScope.USERNAME}"/>
                        <input type="text" id="hsRegUserPhoneNum" name="hsRegUserPhoneNum" placeholder="contact" value="${sessionScope.USERPHONE}"/>
                        <input type="text" id="hsRegUserEmail" name="hsRegUserEmail" placeholder="email" style="width:200px" value="${sessionScope.USERMAIL}"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left" colspan="6" style="background-color:#cccccc;">Company Information</td>
                    </tr>
                    <tr>
                      <td class="left">Company name <i></i></td>
                      <td colspan="5">
                        <input type="text" id="hsRegUserComName" name="hsRegUserComName"  placeholder="Company name" value="${sessionScope.SANGHO}"/>
                        <a href="javascript:fn_customerSearch()"><img src="../images/cps/hs_seach.png" id="customerSearch" style="display:none"></a>
                        <input type="text" id="hsRegUserComTaxNum" name="hsRegUserComTaxNum"  placeholder="Business License" value="${sessionScope.TAXNO}"/>
                        <input type="text" id="hsRegUserComTel" name="hsRegUserComTel"  placeholder="phone" value="${sessionScope.USERPHONE}"/>
                        <input type="text" id="hsRegUserComeMail" name="hsRegUserComeMail"  placeholder="email" value="${sessionScope.USERMAIL}"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left" colspan="6" style="background-color:#cccccc;">Product Information</td>
                    </tr>
                    <tr>
                      <td class="left">Item code</td>
                      <td>
                      	<input type="text" id="itemMmodelCode" name="itemMmodelCode" placeholder="Item code"/>
                      	<a href="javascript:fn_itemSearch()"><img src="../images/cps/hs_seach.png"></a>
                      </td>
                      <td class="left">Item Name</td>
                      <td>
                      	<input type="text" id="itemMstdGoods" name="itemMstdGoods" placeholder="Item Name"/>
                      </td>
                      <td class="left">Reference numbe</td>
                      <td>
                      	<input type="text" id="itemMcountNo" name="itemMcountNo" placeholder="Reference numbe"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">Specification</td>
                      <td colspan="5">
                      	<input type="text" id="itemGyuguek" name="itemGyuguek" placeholder="Specification" style="width:100%"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">Composition</td>
                      <td colspan="5">
                      	<input type="text" id="itemSungbun" name="itemSungbun" placeholder="Composition" style="width:100%"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">Unit price</td>
                      <td>
                      	<input type="text" id="itemUnitPrice" name="itemUnitPrice" style="width:100px" placeholder="Unit price"/>
                      	<input type="text" id="itemUnit" name="itemUnit" style="width:40px" placeholder="Unit"/>
                      </td>
                      <td class="left">Country of origin</td>
                      <td>
                      	<input type="text" id="itemOrigin" name="itemOrigin" placeholder="origin"/>
                      </td>
                      <td class="left">HS</td>
                      <td>
                      	<input type="text" id="itemHs" name="itemHs" placeholder="HS" style="width:70px"/>
                      	<input type="text" id="itemTradePartnerHs" name="itemTradePartnerHs" placeholder="TradePartnerHs" style="width:70px"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">Manufacturer</td>
                      <td colspan="5">
                      	<input type="text" id="itemJaejosa" name="itemJaejosa" placeholder="Manufacturer" style="width:40%"/>
                      	<input type="text" id="itemJaejosaHomepage" name="itemJaejosaHomepage" placeholder="Homepage" style="width:40%"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">Im/Export</td>
                      <td colspan="5">
                      	<input type="radio" id="itemImpoExpoType_IMPORT" name="itemImpoExpoType" placeholder="Import" value="IMPORT" checked/>Import&nbsp;&nbsp;&nbsp;
                        <input type="radio" id="itemImpoExpoType_EXPORT" name="itemImpoExpoType" placeholder="Export" value="EXPORT"/>Export
                      </td>
                    </tr>
                    <tr>
                      <td class="left">Product Type</td>
                      <td colspan="5">
                      	<input type="radio" id="itemType" name="itemType" placeholder="Product Type" value="A" onclick="rdoItemType('A');" checked/>Raw materials&nbsp;&nbsp;&nbsp;
                        <input type="radio" id="itemType" name="itemType" placeholder="Product Type" value="B" onclick="rdoItemType('B');"/>Goods&nbsp;&nbsp;&nbsp;
                        <input type="radio" id="itemType" name="itemType" placeholder="Product Type" value="C" onclick="rdoItemType('C');"/>Finished&nbsp;&nbsp;&nbsp;
                        <input type="radio" id="itemType" name="itemType" placeholder="Product Type" value="D" onclick="rdoItemType('D');"/>Parts&nbsp;&nbsp;&nbsp;
                        <input type="radio" id="itemType" name="itemType" placeholder="Product Type" value="E" onclick="rdoItemType('E');"/>Components&nbsp;&nbsp;&nbsp;
                        <input type="radio" id="itemType" name="itemType" placeholder="Product Type" value="F" onclick="rdoItemType('F', 'Y');"/>ETC
                        <input type="text" id="itemTypeEtcNote" name="itemTypeEtcNote" placeholder="note" disabled="disabled"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left" colspan="6" style="background-color:#cccccc;">Requested</td>
                    </tr>
                    <tr>
                      <td class="left">Request Type <i></i></td>
                      <td colspan="5">
                      	<input type="radio" id="hsReqType" name="hsReqType" placeholder="Duty rate" value="A" onclick="rdoHsReqType('A');" checked/>Duty rate&nbsp;&nbsp;&nbsp;
                        <input type="radio" id="hsReqType" name="hsReqType" placeholder="Homologation" value="B" onclick="rdoHsReqType('B');"/>Homologation&nbsp;&nbsp;&nbsp;
                        <input type="radio" id="hsReqType" name="hsReqType" placeholder="Reduction" value="C" onclick="rdoHsReqType('C');"/>Reduction&nbsp;&nbsp;&nbsp;
                        <input type="radio" id="hsReqType" name="hsReqType" placeholder="FTA" value="D" onclick="rdoHsReqType('D');"/>FTA&nbsp;&nbsp;&nbsp;
                        <input type="radio" id="hsReqType" name="hsReqType" placeholder="Refunds" value="E" onclick="rdoHsReqType('E');"/>Refunds&nbsp;&nbsp;&nbsp;
                        <input type="radio" id="hsReqType" name="hsReqType" placeholder="ETC" value="F" onclick="rdoHsReqType('F', 'Y');"/>ETC
                        <input type="text" id="hsReqTypeEtcNote" name="hsReqTypeEtcNote" placeholder="note" disabled="disabled"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">Importance <i></i></td>
                      <td>
                      	<select id="hsImportance" name="hsImportance" onchange="fn_changeReviewDate()" style="width:70px"></select>
                      </td>
                      <td class="left">Emergency <i></i></td>
                      <td>
                      	<input type="radio" id="hsEmergencyYn" name="hsEmergencyYn" placeholder="Y" value="Y" onchange="fn_changeReviewDate()"/> Yes&nbsp;&nbsp;&nbsp;
                        <input type="radio" id="hsEmergencyYn" name="hsEmergencyYn" placeholder="N" value="N" onchange="fn_changeReviewDate()" checked/> No
                      </td>
                      <td class="left">Review period <i></i></td>
                      <td>
                      	<input type="text" id="hsReviewDt" name="hsReviewDt" class="input-sm" maxlength="8"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">Issues</td>
                      <td colspan="5">
                      	<textarea id="hsIssue" name="hsIssue" rows="5"></textarea>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">ETC</td>
                      <td colspan="5">
                      	<input type="text" id="hsNote" name="hsNote" style="width:100%"/>
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