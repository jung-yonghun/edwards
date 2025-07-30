<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
    <title>운송의뢰(신규)</title>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-filter.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/import/importDeliveryRequestNew.js'/>"></script>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		  	<input type="hidden" id="yymmdd" 	name="yymmdd"/>
		  	<input type="hidden" id="ID" 		name="ID" 	value="${sessionScope.ID}">
		    <div class="easyui-layout" style="width:100%;height:540px;">
		      <div data-options="region:'center'" style="box-sizing:border-box;border:0px;">
				<div class="normal_Button">
				  <a href="javascript:fn_SaveAction();">저장</a>
				  <a href="javascript:window.close();">닫기</a>
				</div>
				<div class="hsnew_C02_table">
	  	          <form id="frm1" name="frm1">
	  	          <input type="hidden" id="deliveryStatus" 	name="deliveryStatus" 	value="20"/>
        		  <input type="hidden" id="cargoStatus" 	name="cargoStatus" 		value="D"/>
        		  <input type="hidden" id="banipPlace" 		name="banipPlace" 		value="일반"/>
        		  <input type="hidden" id="damage" 			name="damage" 			value="N"/>
        		  <input type="hidden" id="useYn" 			name="useYn" 			value="Y"/>
        		  <input type="hidden" id="cargoNo" 		name="cargoNo"/>
				  <table>
			   	    <col width="15%"/>
                    <col width="35%"/>
                    <col width="15%"/>
                    <col width="35%"/>
			      	<tr>
                      <td class="left">수신처(착지) <i></i></td>
                      <td>
                        <input type="hidden" id="customerKey" 		name="customerKey"  	value="-1"/>
                        <input type="hidden" id="customerDb" 		name="customerDb"  		value="TNLDB"/>
                        <input type="hidden" id="customerCode" 		name="customerCode"  	value="TNLZ"/>
                        <input type="hidden" id="customerTaxNum" 	name="customerTaxNum"/>
                        <input type="text" 	 id="customerName" 		name="customerName"  style="width:80%;" readonly/>
                      	<a href="javascript:popup_importDeliveryRequestCustomer()"><img src="../images/cps/hs_seach.png"></a>
                      </td>
                      <td class="left">B/L No.</td>
                      <td>
                      	<input type="text" id="hblNo" name="hblNo" style="width:100%;"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">신고번호 <i></i></td>
                      <td>
                      	<input type="text" id="singoNo" name="singoNo" style="width:100%;"/>
                      </td>
                      <td class="left">MB/L No.</td>
                      <td>
                      	<input type="text" id="mblNo" name="mblNo" style="width:100%;"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">신고일</td>
                      <td>
                      	<input type="text" id="singoDate" name="singoDate" style="width:100%;"/>
                      </td>
                      <td class="left">수리일</td>
                      <td>
                      	<input type="text" id="suirDate" name="suirDate" style="width:100%;"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">수량/단위 <i></i></td>
                      <td>
                      	<input type="text" id="pojangSu" name="pojangSu" style="width:30%;"/>
                      	<input type="text" id="pojangDanwi" name="pojangDanwi" style="width:50%;"/>
                      </td>
                      <td class="left">중량/단위 <i></i></td>
                      <td>
                      	<input type="text" id="totalJung" name="totalJung" style="width:30%;"/>
                      	<input type="text" id="jungDanwi" name="jungDanwi" style="width:50%;"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">의뢰자상호</td>
                      <td>
                      	<input type="text" id="requestCoName" name="requestCoName" style="width:100%;"/>
                      </td>
                      <td class="left">의뢰일시</td>
                      <td>
                      	<input type="text" id="requestDate" name="requestDate" style="width:100%;"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">의뢰자</td>
                      <td>
                      	<input type="text" id="requestMan" name="requestMan" style="width:100%;"/>
                      </td>
                      <td class="left">연락처</td>
                      <td>
                      	<input type="text" id="requestPhone" name="requestPhone" style="width:100%;"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">세관</td>
                      <td>
                      	<input type="text" id="impoSegwan" name="impoSegwan" style="width:100%;"/>
                      </td>
                      <td class="left">반입일</td>
                      <td>
                      	<input type="text" id="impoBanipDate" name="impoBanipDate" style="width:100%;"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">장치장</td>
                      <td colspan="3">
                      	<input type="text" id="impoJangchBuho" 		name="impoJangchBuho" 	style="width:20%;" placeholder="장치장부호"/>
                      	<input type="text" id="impoJangchName" 		name="impoJangchName" 	style="width:30%;" placeholder="장치장소"/>
                      	<input type="text" id="impoJangchJangso" 	name="impoJangchJangso" style="width:40%;" placeholder="장치장명"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">양륙항</td>
                      <td colspan="3">
                      	<input type="text" id="landingArea" name="landingArea" 	style="width:20%;" placeholder="양륙항"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">요청업체</td>
                      <td>
                      	<input type="text" id="assignId" name="assignId" style="width:100%;"/>
                      </td>
                      <td class="left">접수자/연락처</td>
                      <td>
                        <select id="assignMan" name="assignMan" style="width:40%" onchange="fn_changeSeinTnlUserNm(this)"></select>
                      	<input type="text" id="assignPhone" name="assignPhone" style="width:50%;"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">요청사항</td>
                      <td colspan="3">
                      	<textarea type="text" id="requestNote" name="requestNote" rows="3"></textarea>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">요청사항<br>(세인용)</td>
                      <td colspan="3">
                      	<textarea type="text" id="requestInvisibleNote" name="requestInvisibleNote" rows="3"></textarea>
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