<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
    <title>HS 의뢰</title>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/cps/item/itemHsIns.js'/>"></script>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="easyui-layout" style="width:900px;height:700px;">
		      <div data-options="region:'center'" style="box-sizing:border-box;border:0px;">
				<div class="normal_Button">
				  <a href="javascript:fn_saveAction();">저장</a>
				  <a href="javascript:window.close();">닫기</a>
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
			   	    <col width="10%">
                    <col width="24%">
                    <col width="10%">
                    <col width="23%">
                    <col width="10%">
                    <col width="23%">
                    <tr>
                      <td class="left">의뢰자 <i></i></td>
                      <td colspan="5">
                        <input type="hidden" id="hsRegUserKey" name="hsRegUserKey" value="${sessionScope.ID}"/>
                        <input type="hidden" id="hsRegUserId" name="hsRegUserId" value="${sessionScope.USERID}"/>
                        <input type="text" id="hsRegUserNm" name="hsRegUserNm" placeholder="의뢰자명" value="${sessionScope.USERNAME}"/>
                        <input type="text" id="hsRegUserPhoneNum" name="hsRegUserPhoneNum" placeholder="의뢰자(연락처)" value="${sessionScope.USERPHONE}"/>
                        <input type="text" id="hsRegUserEmail" name="hsRegUserEmail" placeholder="의뢰자(이메일)" style="width:200px" value="${sessionScope.USERMAIL}"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left" colspan="6" style="background-color:#cccccc;">업체정보</td>
                    </tr>
                    <tr>
                      <td class="left">상호 <i></i></td>
                      <td colspan="5">
                        <input type="text" id="hsRegUserComName" name="hsRegUserComName"  placeholder="업체(거래처명)" value="${sessionScope.SANGHO}" readOnly/>
                        <a href="javascript:fn_customerSearch()"><img src="../images/cps/hs_seach.png" id="customerSearch" style="display:none"></a>
                        <input type="text" id="hsRegUserComTaxNum" name="hsRegUserComTaxNum"  placeholder="업체(사업자번호)" value="${sessionScope.TAXNO}" readOnly/>
                        <input type="text" id="hsRegUserComTel" name="hsRegUserComTel"  placeholder="업체(전화번호)" value="${sessionScope.USERPHONE}"/>
                        <input type="text" id="hsRegUserComeMail" name="hsRegUserComeMail"  placeholder="업체(이메일)" value="${sessionScope.USERMAIL}"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left" colspan="6" style="background-color:#cccccc;">물품정보</td>
                    </tr>
                    <tr>
                      <td class="left">자재코드 <i></i></td>
                      <td>
                      	<input type="text" id="itemMmodelCode" name="itemMmodelCode" placeholder="자재코드"/>
                      	<a href="javascript:fn_itemSearch()"><img src="../images/cps/hs_seach.png"></a>
                      </td>
                      <td class="left">자재명</td>
                      <td>
                      	<input type="text" id="itemMstdGoods" name="itemMstdGoods" placeholder="자재명"/>
                      </td>
                      <td class="left">자재관리번호</td>
                      <td>
                      	<input type="text" id="itemMcountNo" name="itemMcountNo" placeholder="자재관리번호"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">규격</td>
                      <td colspan="5">
                      	<input type="text" id="itemGyuguek" name="itemGyuguek" placeholder="규격" style="width:100%"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">성분</td>
                      <td colspan="5">
                      	<input type="text" id="itemSungbun" name="itemSungbun" placeholder="성분" style="width:100%"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">단가</td>
                      <td>
                      	<input type="text" id="itemUnitPrice" name="itemUnitPrice" style="width:100px" placeholder="단가"/>
                      	<input type="text" id="itemUnit" name="itemUnit" style="width:40px" placeholder="단위"/>
                      </td>
                      <td class="left">원산지</td>
                      <td>
                      	<input type="text" id="itemOrigin" name="itemOrigin" placeholder="원산지"/>
                      </td>
                      <td class="left">HS</td>
                      <td>
                      	<input type="text" id="itemHs" name="itemHs" placeholder="기존HS" style="width:70px"/>
                      	<input type="text" id="itemTradePartnerHs" name="itemTradePartnerHs" placeholder="상대국HS" style="width:70px"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">제조사</td>
                      <td colspan="5">
                      	<input type="text" id="itemJaejosa" name="itemJaejosa" placeholder="제조사" style="width:40%"/>
                      	<input type="text" id="itemJaejosaHomepage" name="itemJaejosaHomepage" placeholder="제조사홈페이지" style="width:40%"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">수출입</td>
                      <td colspan="5">
                      	<input type="radio" id="itemImpoExpoType_IMPORT" name="itemImpoExpoType" placeholder="수출입구분_수입" value="IMPORT" checked/>수입&nbsp;&nbsp;&nbsp;
                        <input type="radio" id="itemImpoExpoType_EXPORT" name="itemImpoExpoType" placeholder="수출입구분_수출" value="EXPORT"/>수출
                      </td>
                    </tr>
                    <tr>
                      <td class="left">제품구분</td>
                      <td colspan="5">
                      	<input type="radio" id="itemType" name="itemType" placeholder="제품구분" value="A" onclick="rdoItemType('A');" checked/>원재료&nbsp;&nbsp;&nbsp;
                        <input type="radio" id="itemType" name="itemType" placeholder="제품구분" value="B" onclick="rdoItemType('B');"/>상품&nbsp;&nbsp;&nbsp;
                        <input type="radio" id="itemType" name="itemType" placeholder="제품구분" value="C" onclick="rdoItemType('C');"/>완제품&nbsp;&nbsp;&nbsp;
                        <input type="radio" id="itemType" name="itemType" placeholder="제품구분" value="D" onclick="rdoItemType('D');"/>부분품&nbsp;&nbsp;&nbsp;
                        <input type="radio" id="itemType" name="itemType" placeholder="제품구분" value="E" onclick="rdoItemType('E');"/>구성품&nbsp;&nbsp;&nbsp;
                        <input type="radio" id="itemType" name="itemType" placeholder="제품구분" value="F" onclick="rdoItemType('F', 'Y');"/>기타
                        <input type="text" id="itemTypeEtcNote" name="itemTypeEtcNote" placeholder="제품구분_기타노트" disabled="disabled"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left" colspan="6" style="background-color:#cccccc;">의뢰정보</td>
                    </tr>
                    <tr>
                      <td class="left">의뢰사유 <i></i></td>
                      <td colspan="5">
                      	<input type="radio" id="hsReqType" name="hsReqType" placeholder="의뢰사유_세율" value="A" onclick="rdoHsReqType('A');" checked/>세율&nbsp;&nbsp;&nbsp;
                        <input type="radio" id="hsReqType" name="hsReqType" placeholder="의뢰사유_요건" value="B" onclick="rdoHsReqType('B');"/>요건&nbsp;&nbsp;&nbsp;
                        <input type="radio" id="hsReqType" name="hsReqType" placeholder="의뢰사유_감면" value="C" onclick="rdoHsReqType('C');"/>감면&nbsp;&nbsp;&nbsp;
                        <input type="radio" id="hsReqType" name="hsReqType" placeholder="의뢰사유_FTA" value="D" onclick="rdoHsReqType('D');"/>FTA&nbsp;&nbsp;&nbsp;
                        <input type="radio" id="hsReqType" name="hsReqType" placeholder="의뢰사유_환급" value="E" onclick="rdoHsReqType('E');"/>환급&nbsp;&nbsp;&nbsp;
                        <input type="radio" id="hsReqType" name="hsReqType" placeholder="의뢰사유_기타" value="F" onclick="rdoHsReqType('F', 'Y');"/>기타
                        <input type="text" id="hsReqTypeEtcNote" name="hsReqTypeEtcNote" placeholder="의뢰사유_기타노트" disabled="disabled"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">중요도 <i></i></td>
                      <td>
                      	<select id="hsImportance" name="hsImportance" onchange="fn_changeReviewDate()" style="width:70px"></select>
                      </td>
                      <td class="left">긴급여부 <i></i></td>
                      <td>
                      	<input type="radio" id="hsEmergencyYn" name="hsEmergencyYn" placeholder="긴급여부_Y" value="Y" onchange="fn_changeReviewDate()"/> Yes&nbsp;&nbsp;&nbsp;
                        <input type="radio" id="hsEmergencyYn" name="hsEmergencyYn" placeholder="긴급여부_N" value="N" onchange="fn_changeReviewDate()" checked/> No
                      </td>
                      <td class="left">검토기한 <i></i></td>
                      <td>
                      	<input type="text" id="hsReviewDt" name="hsReviewDt" class="input-sm" maxlength="8"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">쟁점사항</td>
                      <td colspan="5">
                      	<textarea id="hsIssue" name="hsIssue" rows="5"></textarea>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">기타</td>
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