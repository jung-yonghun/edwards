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
	<script type="text/javascript" src="<c:url value='/js/cps/edwards/impoNewSchedule.js?20231227'/>"></script>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="container">
		      <input type="hidden" id="ID" 	name="ID" 	value="${sessionScope.ID}">
			  <div class="easyui-layout" style="width:100%;height:735px">
			    <div data-options="region:'north',split:true" style="width:100%;height:400px;box-sizing:border-box;border:0px">
			    <div class="easyui-layout" style="width:100%;height:390px">
		      	<div data-options="region:'center'" style="width:100%;box-sizing:border-box;border:0px">
				  <div class="normal_Top">
				    <form id="frm1" name="frm1">
				    <input type="hidden" id="allDate" 			name="allDate"/>
				    <input type="hidden" id="IS_ETD" 			name="IS_ETD"/>
				    <input type="hidden" id="transportDueDate" 	name="transportDueDate"/>
				    <input type="hidden" id="clearanceStatus" 	name="clearanceStatus"/>
				    <input type="hidden" id="ncomDueDate" 		name="ncomDueDate"/>
				    <input type="hidden" id="progressCode" 		name="progressCode"/>
				    <input type="hidden" id="mi" 				name="mi"/>
				  	<table width="100%">
				  	  <col width="08%" />
				  	  <col width="25%" />
				  	  <col width="01%" />
				  	  <col width="08%" />
				  	  <col width="25%" />
				  	  <col width="01%" />
				  	  <col width="08%" />
				  	  <col width="24%" />
					  <tr height="23px">
					  	<td>BL번호</td>
					  	<td><input type="text" id="IS_BLNo" name="IS_BLNo" onkeypress="keyDown()"/></td>
					  	<td></td>
					  	<td>긴급여부</td>
					  	<td>
					  	  <select id="IS_urgent" name="IS_urgent" style="width:80px">
					      	<option value="">전체</option>
					      	<option value="Y">Y</option>
					      	<option value="N">N</option>
						  </select>
					  	</td>
					  	<td></td>
					  	<td></td>
					  	<td></td>
					  </tr>
					  <tr height="23px">
					    <td>담당자</td>
					  	<td><input type="text" id="eklUser" name="eklUser" onkeypress="keyDown()"/></td>
					  	<td></td>
					  	<td>Vendor Code</td>
					  	<td><input type="text" id="vendorCode" name="vendorCode" onkeypress="keyDown()"/></td>
					  	<td></td>
					  	<td>Item Code</td>
					  	<td><input type="text" id="itemCode" name="itemCode" onkeypress="keyDown()"/></td>
					  </tr>
				  	</table>
				  	</form>
				  </div>
				  <div class="normal_Button">
				  	<a href="javascript:fn_searchAction1();">미결</a>
				  	<a href="javascript:fn_searchAction2();">미신고</a>
				  	<a href="javascript:fn_searchAction3();">미착</a>
				  	<a href="javascript:fn_searchAction4();">미반출</a>
				  	<a href="javascript:fn_searchAction5();">미납부</a>
				  	<a href="javascript:fn_searchAction6();">완결</a>
				  	<a href="javascript:fn_searchAction();">전체</a>
				  	<a href="javascript:fn_searchExcel();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
				  </div>
				  <div class="normal_con01">
				  	<table id="masterGrid"></table>
				  </div>
				  <div class="normal_con01" style="display:none">
				  	<table id="excelGrid"></table>
				  </div>
				  <%@ include file="/WEB-INF/jsp/include/excelDown.jsp" %>
			  	</div>
			  	</div>
			  	</div>
			  	<div data-options="region:'center',split:true" style="width:100%;height:335px;box-sizing:border-box;border:0px">
	    	        <div class="normal_Button" style="margin-left:10px;">
					  	<a href="javascript:fn_commentAction();">Comment 등록</a>
					</div>
			  	    <div class="main02">
				    <div class="main02_con">
	    	        <div class="main02_box01" style="width:100%;height:265px;">
	    	          <div class="right">
		      	  	  <form id="updateForm" name="updateForm">
			  		  <table>
			  		  	<col width="08%">
                       	<col width="17%">
                       	<col width="08%">
                       	<col width="17%">
                       	<col width="08%">
                       	<col width="17%">
                      	<col width="08%">
                       	<col width="17%">
                       	<tr style="height:60px">
                          <th>관세사<br>comment</th>
                          <td colspan="3" class="tal"><textarea type="text" id="IS_CBComment" name="IS_CBComment" style="width:100%;height:50px" readOnly/></textarea>
                          <th style="border-right:1px solid #dcdcdc;">Edwards<br>comment</th>
                          <td colspan="3" class="tal"><textarea type="text" id="IS_customerComment" name="IS_customerComment" style="width:100%;height:50px"/></textarea>
                      	</tr>
                      	<tr>
                          <th>납세자</th>
                          <td class="tal">
                            <input type="text" id="IS_taxPayerName" name="IS_taxPayerName" style="width:45%;" readOnly/>
                            <input type="text" id="IS_taxPayerRegistrationNo" name="IS_taxPayerRegistrationNo" style="width:45%;" readOnly/>
                          </td>
                          <th>H/BL No</th>
                          <td class="tal"><input type="text" id="IS_BLNo" name="IS_BLNo" style="width:100%;" readOnly/></td>
                          <th>M/BL No</th>
                          <td class="tal"><input type="text" id="IS_MBLNo" name="IS_MBLNo" style="width:100%;" readOnly/></td>
                          <th style="border-right:1px solid #dcdcdc;">MRN</th>
                          <td class="tal"><input type="text" id="IS_MRNNo" name="IS_MRNNo" style="width:100%;" readOnly/></td>
                      	</tr>
                      	<tr>
                      	  <th>B/L 구분</th>
                          <td class="tal">
                            <input type="text" id="IS_BLType" name="IS_BLType" style="width:20px;" readOnly/>
                            <input type="text" id="IS_BLProperties" name="IS_BLProperties" style="width:20px;" readOnly/>
                          </td>
                          <th>File No1</th>
                          <td class="tal"><input type="text" id="IS_REF1" name="IS_REF1" style="width:100%;" readOnly/></td>
                          <th>File No2</th>
                          <td class="tal"><input type="text" id="IS_REF2" name="IS_REF2" style="width:100%;" readOnly/></td>
                          <th style="border-right:1px solid #dcdcdc;">수입신고번호</th>
                          <td class="tal"><input type="text" id="IS_ncomSingoNo" name="IS_ncomSingoNo" style="width:100%;" readOnly/></td>
                      	</tr>
                      	<tr>
                      	  <th>화물진행상태</th>
                          <td class="tal"><input type="text" id="IS_cargoStatus" name="IS_cargoStatus" style="width:100%;" readOnly/></td>
                          <th>통관진행상태</th>
                          <td class="tal"><input type="text" id="IS_clearanceStatus" name="IS_clearanceStatus" style="width:100%;" readOnly/></td>
                          <th>긴급여부</th>
                          <td class="tal">
                            <input type="text" id="IS_urgent" name="IS_urgent" style="width:10%;" readOnly/>
                            <input type="text" id="IS_urgentRemark" name="IS_urgentRemark" style="width:85%;" readOnly/>
                          </td>
                          <th style="border-right:1px solid #dcdcdc;">보류여부</th>
                          <td class="tal">
                            <input type="text" id="IS_pending" name="IS_pending" style="width:10%;" readOnly/>
                            <input type="text" id="IS_pendingCause" name="IS_pendingCause" style="width:85%;" readOnly/>
                          </td>
                      	</tr>
                      	<tr>
                      	  <th>통관예정일</th>
                          <td class="tal"><input type="text" id="IS_declarationRequestDate" name="IS_declarationRequestDate" style="width:100%;" readOnly/></td>
                          <th>ETD</th>
                          <td class="tal"><input type="text" id="IS_ETD" name="IS_ETD" style="width:100%;" readOnly/></td>
                          <th>ETA</th>
                          <td class="tal">
                            <input type="text" id="IS_ETA" name="IS_ETA" style="width:100%;" readOnly/>
                          </td>
                          <th style="border-right:1px solid #dcdcdc;">ATA</th>
                          <td class="tal">
                            <input type="text" id="IS_ATA" name="IS_ATA" style="width:100%;" readOnly/>
                          </td>
                      	</tr>
                      	<tr>
                      	  <th>수리일</th>
                          <td class="tal"><input type="text" id="IS_ncomOkDate" name="IS_ncomOkDate" style="width:100%;" readOnly/></td>
                          <th>반출기한</th>
                          <td class="tal"><input type="text" id="IS_transportDueDate" name="IS_transportDueDate" style="width:100%;" readOnly/></td>
                          <th>기간연장</th>
                          <td class="tal">
                            <input type="text" id="IS_extandedCarryDueDate" name="IS_extandedCarryDueDate" style="width:100%;" readOnly/>
                          </td>
                          <th style="border-right:1px solid #dcdcdc;">반출일자</th>
                          <td class="tal">
                            <input type="text" id="IS_carryOutDate" name="IS_carryOutDate" style="width:100%;" readOnly/>
                          </td>
                      	</tr>
                      	<tr>
                      	  <th>고지일자</th>
                          <td class="tal"><input type="text" id="IS_ncomGojiDate" name="IS_ncomGojiDate" style="width:100%;" readOnly/></td>
                          <th>납부서발송일자</th>
                          <td class="tal"><input type="text" id="IS_sendDatePaymentForm" name="IS_sendDatePaymentForm" style="width:100%;" readOnly/></td>
                          <th>납부기한</th>
                          <td class="tal">
                            <input type="text" id="IS_ncomDueDate" name="IS_ncomDueDate" style="width:100%;" readOnly/>
                          </td>
                          <th style="border-right:1px solid #dcdcdc;">납부일자</th>
                          <td class="tal">
                            <input type="text" id="IS_cusPaymentDate" name="IS_cusPaymentDate" style="width:100%;" readOnly/>
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
	</div>
  </body>
</html>