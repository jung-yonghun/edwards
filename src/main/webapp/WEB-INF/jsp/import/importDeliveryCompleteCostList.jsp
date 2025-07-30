<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-filter.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-cellediting.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/import/importDeliveryCompleteCostList.js'/>"></script>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="easyui-layout" style="width:1200px;height:570px;">
		      <div data-options="region:'center'" style="box-sizing:border-box;border:0px;">
		        <div class="normal_Top">
		          <form id="frm" name="frm">
		          <input type="hidden" id="size" 							name="size" 							value="100000" />
				  <input type="hidden" id="page" 							name="page" 							value="0" />
				  <input type="hidden" id="_pageRow" 						name="_pageRow" 						value="100000" />
				  <input type="hidden" id="_pageNumber" 					name="_pageNumber"  					value="0" />
				  <input type="hidden" id="deliveryCoName" 					name="deliveryCoName" 					value="${sessionScope.SANGHO}"/>
	              <input type="hidden" id="deliveryStatus" 					name="deliveryStatus" 					value="60"/>
	              <input type="hidden" id="deliveryCostCl" 					name="deliveryCostCl" 					value="IMPORT"/>
	              <input type="hidden" id="deliveryCostWriteUserKey" 		name="deliveryCostWriteUserKey" 		value="${sessionScope.ID}"/>
	              <input type="hidden" id="deliveryCostWriteUserId" 		name="deliveryCostWriteUserId" 			value="${sessionScope.ID}"/>
	              <input type="hidden" id="deliveryCostWriteUserName" 		name="deliveryCostWriteUserName" 		value="${sessionScope.USERNAME}"/>
	              <input type="hidden" id="deliveryCostWriteUserTradeName" 	name="deliveryCostWriteUserTradeName" 	value="${sessionScope.SANGHO}"/>
	              <input type="hidden" id="deliveryCostWriteUserTaxNum" 	name="deliveryCostWriteUserTaxNum" 		value="${sessionScope.TAXNO}"/>
		          <table width="100%">
			  	  	<col width="10%" />
			  	  	<col width="48%" />
			   	  	<col width="02%" />
			  	  	<col width="10%" />
			  	  	<col width="30%" />
				  	<tr height="23px">
				  	  <td>배송완료일</td>
				  	  <td>
				      	<input type="text" id="strFromDate" name="strFromDate"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />~
				      	<input type="text" id="strToDate" 	name="strToDate"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />
				      	<div class="normal_btn">
					  	  <a href="#" class="arrow" onclick="fn_prevday()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
					  	  <a href="#" onclick="fn_today()">일</a>
					  	  <a href="#" class="arrow" onclick="fn_nextday()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
					  	  <a href="#" class="arrow1"></a>
					  	  <a href="#" class="arrow" onclick="fn_prevweek()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
					  	  <a href="#" onclick="fn_week()">주</a>
					  	  <a href="#" class="arrow" onclick="fn_nextweek()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
					  	  <a href="#" class="arrow1"></a>
					  	  <a href="#" class="arrow" onclick="fn_prevmonth()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
					  	  <a href="#" onclick="fn_month()">월</a>
					  	  <a href="#" class="arrow" onclick="fn_nextmonth()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
					  	</div>
				  	  </td>
				  	  <td></td>
				  	  <td>화주</td>
				  	  <td><input type="text" id="customerName" name="customerName" onkeypress="keyDown()"/></td>
				  	  <td></td>
				  	</tr>
				  	<tr height="23px">
				  	  <td>B/L No.</td>
				  	  <td><input type="text" id="hblNo" name="hblNo" onkeypress="keyDown()"/></td>
				  	  <td></td>
				  	  <td>수입신고번호</td>
				  	  <td><input type="text" id="singoNo" name="singoNo" onkeypress="keyDown()"/></td>
				  	  <td></td>
				  	</tr>
				  </table>
				  </form>
		        </div>
				<div class="normal_Button">
				  <a href="javascript:fn_searchAction();">조회</a>
				  <a href="javascript:fn_saveTransferCostAction();">비용정산</a>
				  <a href="javascript:window.close();">닫기</a>
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