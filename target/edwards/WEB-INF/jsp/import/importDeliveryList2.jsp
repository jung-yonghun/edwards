<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-filter.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/import/importDeliveryList2.js'/>"></script>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="container">
			  <div class="normal_cont">
				<div class="normal_Top">
				  <form id="frm1" name="frm1">
				  <input type="hidden" id="size" 		name="size" 		value="100000" />
				  <input type="hidden" id="page" 		name="page" 		value="0" />
				  <input type="hidden" id="_pageRow" 	name="_pageRow" 	value="100000" />
				  <input type="hidden" id="_pageNumber" name="_pageNumber"  value="0" />
				  <input type="hidden" id="ID" 			name="ID" 			value="${sessionScope.ID}">
				  <input type="hidden" id="USERID" 		name="USERID" 		value="${sessionScope.USERID}">
				  <input type="hidden" id="USERGRADE" 	name="USERGRADE" 	value="${sessionScope.USERGRADE}">
				  <input type="hidden" id="_defaultDB" 	name="_defaultDB" 	value="${sessionScope.DEFAULTDB}">
				  <input type="hidden" id="taxNum" 		name="taxNum" 		value="${sessionScope.TAXNO}">
				  <table width="100%">
				  	<col width="08%" />
				  	<col width="25%" />
				  	<col width="01%" />
				  	<col width="08%" />
				  	<col width="24%" />
				  	<col width="01%" />
				  	<col width="08%" />
				  	<col width="25%" />
					<tr height="23px">
					  <td>
					    <select id="_DateType" name="_DateType" style="width:70px">
					      <option value="singoDate">신고일</option>
                          <option value="suirDate">수리일</option>
                          <option value="requestDate" selected="selected">운송의뢰일</option>
                          <option value="allocateRequestDate">배차요청일</option>
                          <option value="allocateDate">배차일</option>
                          <option value="deliveryStartDate">배송시작일</option>
                          <option value="deliveryEndDate">인수일</option>
                          <option value="impoBanipDate">반입일</option>
						</select>
					  </td>
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
					  <td>B/L No.</td>
					  <td><input type="text" id="hblNo" name="hblNo" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>신고번호</td>
					  <td><input type="text" id="singoNo" name="singoNo" onkeypress="keyDown()"/></td>
					</tr>
					<tr height="23px">
					  <td>운송업체</td>
					  <td><input type="text" id="deliveryCoName" name="deliveryCoName" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>착지명</td>
					  <td><input type="text" id="deliveryCarryingInName" name="deliveryCarryingInName" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>배송정보</td>
					  <td>
					    <select id="deliveryStatus" name="deliveryStatus" style="width:80px" onChange="fn_searchAction()">
                            <option value="">전체</option>
                            <option value="20">운송의뢰</option>
                            <option value="30">배차요청</option>
                            <option value="40">배차완료</option>
                            <option value="50">배송중</option>
                            <option value="60">배송완료</option>
                        </select>
					  </td>
					</tr>
					<tr height="23px">
					  <td>의뢰자</td>
					  <td><input type="text" id="requestMan" name="requestMan" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>접수자</td>
					  <td><input type="text" id="assignMan" name="assignMan" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>착지담당자</td>
					  <td><input type="text" id="deliveryCarryingInMan" name="deliveryCarryingInMan" onkeypress="keyDown()"/></td>
					</tr>
				  </table>
				  </form>
				</div>
				<div class="normal_Button">
				  <a href="javascript:fn_searchAction();">조회</a>
				  <a href="javascript:fn_searchExcel();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
				</div>
				<div class="easyui-layout" style="width:100%;height:580px">
		      	  <div data-options="region:'center'" style="box-sizing:border-box;border:0px">
				  	<div class="normal_con01">
					  <table id="masterGrid">
					    <thead>
				          <tr>
				          	<th data-options="field:'deliveryRequestKey',hidden:true" rowspan="2">Key</th>
				          	<th data-options="field:'ck',checkbox:true" rowspan="2"></th>
				          	<th data-options="field:'a',width:25,align:'center',formatter:linkMapFormatter" rowspan="2"></th>
				            <th data-options="field:'deliveryStatus',width:60,align:'center',formatter:linkDeliveryStatusFormatter" rowspan="2">배송정보</th>
				            <th data-options="field:'requestMan',width:70,align:'center'" rowspan="2">의뢰인</th>
				            <th data-options="field:'requestDate',width:80,align:'center',formatter:linkDateFormatter" rowspan="2">의뢰일</th>
				            <th data-options="field:'requestTime',width:60,align:'center',formatter:linkDateTimeFormatter" rowspan="2">의뢰시간</th>
				            <th data-options="field:'assignMan',width:60,align:'center'" rowspan="2">접수자</th>
				            <th data-options="field:'customerName',width:200" rowspan="2">수입자</th>
				            <th data-options="field:'hblNo',width:120,formatter:linkBlNoFormatter" rowspan="2">B/L No.</th>
				            <th data-options="field:'singoNo',width:120,align:'center',formatter:linkSingoFormatter" rowspan="2">신고번호</th>
				            <th data-options="field:'banipPlace',width:60,align:'center'" rowspan="2">온도조건</th>
				            <th data-options="field:'cargoSize',width:50,align:'center'" rowspan="2">사이즈</th>
				            <th data-options="field:'deliveryPojangSu',width:70,align:'right',formatter:linkNumberFormatter0" rowspan="2">의뢰포장수량</th>
				            <th data-options="field:'deliveryPojangDanwi',width:40,align:'center'" rowspan="2">단위</th>
				            <th data-options="field:'deliveryJung',width:60,align:'right',formatter:linkNumberFormatter3" rowspan="2">의뢰중량</th>
				            <th data-options="field:'deliveryJungDanwi',width:40,align:'center'" rowspan="2">단위</th>
				            <th colspan="6">운송사정보</th>
				            <th colspan="3">착지정보</th>
				            <th data-options="field:'deliveryStartDate',width:80,align:'center',formatter:linkDateFormatter" rowspan="2">배송시작일</th>
				            <th data-options="field:'deliveryStartTime',width:80,align:'center',formatter:linkDateTimeFormatter1" rowspan="2">출발시간</th>
				            <th data-options="field:'damage',width:50,align:'center'" rowspan="2">Damage</th>
				          </tr>
				          <tr>
				            <th data-options="field:'deliveryCoName',width:150,align:'center'">운송업체</th>
				            <th data-options="field:'deliveryCoPhone',width:100,align:'center'">연락처</th>
				            <th data-options="field:'deliveryCarName',width:80,align:'center'">기사명</th>
				            <th data-options="field:'deliveryCarPhone',width:100,align:'center'">기사연락처</th>
				            <th data-options="field:'deliveryCarNum',width:100,align:'center'">차량번호</th>
				            <th data-options="field:'arrivalTime',width:100,align:'center'">도착예정시간</th>
				            <th data-options="field:'deliveryCarryingInName',width:150,align:'center'">착지명</th>
				            <th data-options="field:'deliveryCarryingInMan',width:60,align:'center'">담당자</th>
				            <th data-options="field:'deliveryCarryingInPhone',width:100,align:'center'">연락처</th>
				          </tr>
				        </thead>
					  </table>
					</div>
					<div class="normal_con01" style="display:none">
					  <table id="excelGrid">
					    <thead>
				          <tr>
				            <th data-options="field:'deliveryStatus',width:60,align:'center',formatter:linkDeliveryStatusFormatter">배송정보</th>
				            <th data-options="field:'requestMan',width:70,align:'center'">의뢰인</th>
				            <th data-options="field:'requestDate',width:80,align:'center',formatter:linkDateFormatter">의뢰일</th>
				            <th data-options="field:'assignMan',width:60,align:'center'">접수자</th>
				            <th data-options="field:'customerName',width:200">수입자</th>
				            <th data-options="field:'hblNo',width:120,align:'center',formatter:linkBlNoFormatter">B/L No.</th>
				            <th data-options="field:'singoNo',width:120,align:'center',formatter:linkSingoFormatter">신고번호</th>
				            <th data-options="field:'banipPlace',width:60,align:'center'">온도조건</th>
				            <th data-options="field:'cargoSize',width:50,align:'center'">사이즈</th>
				            <th data-options="field:'deliveryPojangSu',width:70,align:'right',formatter:linkNumberFormatter0">의뢰포장수량</th>
				            <th data-options="field:'deliveryPojangDanwi',width:40,align:'center'">단위</th>
				            <th data-options="field:'deliveryJung',width:60,align:'right',formatter:linkNumberFormatter3">의뢰중량</th>
				            <th data-options="field:'deliveryJungDanwi',width:40,align:'center'">단위</th>
				            <th data-options="field:'deliveryCoName',width:150,align:'center'">운송업체</th>
				            <th data-options="field:'deliveryCoPhone',width:100,align:'center'">연락처</th>
				            <th data-options="field:'deliveryCarName',width:80,align:'center'">기사명</th>
				            <th data-options="field:'deliveryCarPhone',width:100,align:'center'">기사연락처</th>
				            <th data-options="field:'deliveryCarNum',width:100,align:'center'">차량번호</th>
				            <th data-options="field:'arrivalTime',width:100,align:'center'">도착예정시간</th>
				            <th data-options="field:'deliveryCarryingInName',width:150,align:'center'">착지명</th>
				            <th data-options="field:'deliveryCarryingInMan',width:60,align:'center'">담당자</th>
				            <th data-options="field:'deliveryCarryingInPhone',width:100,align:'center'">연락처</th>
				            <th data-options="field:'deliveryStartDate',width:80,align:'center',formatter:linkDateFormatter">배송시작일</th>
				            <th data-options="field:'damage',width:50,align:'center'">Damage</th>
				          </tr>
				        </thead>
					  </table>
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
  </body>
</html>