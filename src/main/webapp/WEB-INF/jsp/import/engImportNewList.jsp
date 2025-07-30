<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<link type="text/css" rel="stylesheet" href="<c:url value='/css/lib/jquery.file.upload/uploadfile.css'/>"/>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/jquery.form/jquery.form.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/jquery.file.upload/jquery.uploadfile.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-bufferview.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-filter.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-cellediting.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/plugins/chartjs/Chart.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/import/engImportNewList.js'/>"></script>
	<link type="text/css" rel="stylesheet" href="<c:url value='/cssNew/common/edmsFileUpload.css'/>"/>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="container">
			  <div class="easyui-layout" style="width:100%;height:775px">
			  	<div data-options="region:'east',split:true" title="Detail Contents" style="width:400px;box-sizing:border-box;border:0px">
			  	  <div class="easyui-accordion" style="width:395px;height:735px;">
			  	    <div title="Docu Area">
				      <jsp:include page="/WEB-INF/jsp/includeNew/commonEdmsFileEng.jsp"></jsp:include>
				    </div>
				    <div title="Accounting" style="padding:5px;">
            		  <div class="easyui-tabs" id="tabs" data-options="fit:true,plain:true" style="height:200px;">
				  	    <input type="hidden" id="SUM_EK" 		name="SUM_EK"/>
				  	    <input type="hidden" id="PRE_JAN_EK" 	name="PRE_JAN_EK"/>
				  	    <input type="hidden" id="TAKE_EK" 		name="TAKE_EK"/>
				  	    <input type="hidden" id="IN_EK" 		name="IN_EK"/>
				  	    <input type="hidden" id="SEND_JAN_EK" 	name="SEND_JAN_EK"/>
				  	    <input type="hidden" id="JAN_EK" 		name="JAN_EK"/>
				  	    <input type="hidden" id="SUM_EK1" 		name="SUM_EK1"/>
				  	    <input type="hidden" id="PRE_JAN_EK1" 	name="PRE_JAN_EK1"/>
				  	    <input type="hidden" id="MISU_EK" 		name="MISU_EK"/>
				  	    <input type="hidden" id="REQ_EK" 		name="REQ_EK"/>
			    	    <div title="Settlement Details" style="padding:10px;">
			    	      <div class="normal_con01">
					  		<table id="detailCostGrid"></table>
					  	  </div>
			    	    </div>
			    	    <div title="Billing Details" style="padding:10px;">
			    	      <div class="normal_con01">
					  		<table id="detailCostGrid1"></table>
					  	  </div>
			    	    </div>
			  	      </div>
        		    </div>
        		    <div title="Delivery" style="padding:5x;">
            		  <div class="easyui-tabs" data-options="fit:true,plain:true">
						  <div title="Delivery Request Details" style="padding:2px;">
						  	<div class="hsnew_C02_table">
				  	          <form id="insertForm" name="insertForm">
							  <table>
						   	    <col width="25%"/>
	                            <col width="75%"/>
	                            <tr>
	                              <td class="left">Destination</td>
	                              <td>
	                                <textarea type="text" id="requestInvisibleNote" name="requestInvisibleNote" style="width:100%;height:90px"></textarea>
	                              </td>
	                            </tr>
						      	<tr>
	                              <td class="left">B/L No</td>
	                              <td>
	                                <input type="text" id="hblNo" name="hblNo" style="width:100%;" readOnly/>
	                              </td>
	                            </tr>
	                            <tr>
	                              <td class="left">Declaration No.</td>
	                              <td>
	                                <input type="text" id="singoNo" name="singoNo" style="width:100%;" readOnly/>
	                              </td>
	                            </tr>
	                            <tr>
	                              <td class="left">Qty</td>
	                              <td>
	                                <input type="text" id="pojangSu" name="pojangSu" style="width:50px;text-align:right" readOnly/>
	                                <input type="text" id="pojangDanwi" name="pojangDanwi" style="width:30px;" readOnly/>
	                              </td>
	                            </tr>
	                            <tr>
	                              <td class="left">Weight</td>
	                              <td>
	                                <input type="text" id="totalJung" name="totalJung" style="width:50px;text-align:right" readOnly/>
	                                <input type="text" id="jungDanwi" name="jungDanwi" style="width:30px;" readOnly/>
	                              </td>
	                            </tr>
	                            <tr>
	                              <td class="left">Request Company</td>
	                              <td>
	                                <input type="text" id="requestCoName" name="requestCoName" style="width:100%;" readOnly/>
	                              </td>
	                            </tr>
	                            <tr>
	                              <td class="left">D. Request</td>
	                              <td>
	                                <input type="text" id="requestDate" name="requestDate" style="width:100%;" readOnly/>
	                              </td>
	                            </tr>
	                            <tr>
	                              <td class="left">Requestor</td>
	                              <td>
	                                <input type="text" id="requestMan" name="requestMan" style="width:100%;" readOnly/>
	                              </td>
	                            </tr>
	                            <tr>
	                              <td class="left">Phone</td>
	                              <td>
	                                <input type="text" id="requestPhone" name="requestPhone" style="width:100%;" readOnly/>
	                              </td>
	                            </tr>
	                            <tr>
	                              <td class="left">Customshouse</td>
	                              <td>
	                                <input type="text" id="impoSegwan" name="impoSegwan" style="width:100%;" readOnly/>
	                              </td>
	                            </tr>
	                            <tr>
	                              <td class="left">D. Warehousing</td>
	                              <td>
	                                <input type="text" id="impoBanipDate" name="impoBanipDate" style="width:100%;" readOnly/>
	                              </td>
	                            </tr>
	                            <tr>
	                              <td class="left">Warehousing site</td>
	                              <td>
	                                <input type="text" id="impoJangchBuho" name="impoJangchBuho" style="width:25%" readOnly/>
	                                <input type="text" id="impoJangchJangso" name="impoJangchJangso" style="width:67%" readOnly/>
	                                <input type="text" id="impoJangchName" name="impoJangchName" style="width:100%" readOnly/>
	                              </td>
	                            </tr>
	                            <tr>
	                              <td class="left">Landing Area</td>
	                              <td>
	                                <input type="text" id="landingArea" name="landingArea" style="width:100%;"/>
	                              </td>
	                            </tr>
	                            <tr>
	                              <td class="left">Receiver Company</td>
	                              <td>
	                                <input type="text" id="assignId" name="assignId" style="width:100%;" maxlength="20"/>
	                              </td>
	                            </tr>
	                            <tr>
	                              <td class="left">Receiver</td>
	                              <td>
	                                <%--<input type="text" id="assignMan" name="assignMan" style="width:100%;" maxlength="20"/>--%>
	                                <select id="assignMan" name="assignMan" style="width:40%" onchange="fn_changeSeinTnlUserNm(this)"></select>
	                              </td>
	                            </tr>
	                            <tr>
	                              <td class="left">Phone</td>
	                              <td>
	                                <input type="text" id="assignPhone" name="assignPhone" style="width:100%;" maxlength="15"/>
	                              </td>
	                            </tr>
	                            <tr>
	                              <td class="left">Destination</td>
	                              <td>
	                                <input type="hidden" id="deliveryCarryingInKey" name="deliveryCarryingInKey" class="input-sm"/>
	                                <input type="hidden" id="deliveryCarryingInTaxNum" name="deliveryCarryingInTaxNum"/>
	                                <input type="text" id="deliveryCarryingInName" name="deliveryCarryingInName" style="width:80%;" readOnly/>
	                              </td>
	                            </tr>
	                            <tr>
	                              <td class="left">In-charge</td>
	                              <td>
	                                <input type="text" id="deliveryCarryingInMan" name="deliveryCarryingInMan" style="width:100%;" readOnly/>
	                              </td>
	                            </tr>
	                            <tr>
	                              <td class="left">Mobile</td>
	                              <td>
	                                <input type="text" id="deliveryCarryingInMobile" name="deliveryCarryingInMobile" style="width:100%;" readOnly/>
	                              </td>
	                            </tr>
	                            <tr>
	                              <td class="left">Phone</td>
	                              <td>
	                                <input type="text" id="deliveryCarryingInPhone" name="deliveryCarryingInPhone" style="width:100%;" readOnly/>
	                              </td>
	                            </tr>
	                            <tr>
	                              <td class="left">Email</td>
	                              <td>
	                                <input type="text" id="deliveryCarryingInEmail" name="deliveryCarryingInEmail" style="width:100%;" readOnly/>
	                                <input type="text" id="deliveryCarryingInFax" name="deliveryCarryingInFax" style="display: none" readOnly/>
	                              </td>
	                            </tr>
	                            <tr>
	                              <td class="left">Address</td>
	                              <td>
	                                <textarea type="text" id="deliveryCarryingInAddr" name="deliveryCarryingInAddr" style="width:100%;" readOnly></textarea>
	                              </td>
	                            </tr>
	                            <tr>
	                              <td class="left">Package</td>
	                              <td>
	                                <input type="text" id="deliveryPojangSu" name="deliveryPojangSu" style="width:50px;text-align:right"/>
	                                <input type="text" id="deliveryPojangDanwi" name="deliveryPojangDanwi" style="width:30px;"/>
	                              </td>
	                            </tr>
	                            <tr>
	                              <td class="left">Weight</td>
	                              <td>
	                                <input type="text" id="deliveryJung" name="deliveryJung" style="width:50px;text-align:right"/>
	                                <input type="text" id="deliveryJungDanwi" name="deliveryJungDanwi" style="width:30px;"/>
	                              </td>
	                            </tr>
	                            <tr>
	                              <td class="left">Sizw</td>
	                              <td>
	                                <select id="cargoSize" name="cargoSize" style="width:30%"></select>
	                              </td>
	                            </tr>
	                            <tr>
	                              <td class="left">Temperature condition</td>
	                              <td>
	                                <select id="banipPlace" name="banipPlace" style="width:30%"></select>
	                              </td>
	                            </tr>
	                            <!-- tr id="hiddenSeinNote">
	                              <td class="left">요청사항<br>(세인용)
	                                <button type="button" onclick="fn_noteSave()">수정</button>
	                              </td>
	                              <td>
	                                <textarea type="text" id="requestInvisibleNote" name="requestInvisibleNote" style="width:100%;" rows="4"></textarea>
	                              </td>
	                            </tr-->
						      </table>
						      </form>
						    </div>
				  	      </div>
				  	      <div title="Delivery Allocation Details" style="padding:2px;">
						  	<div class="hsnew_C02_table">
				  	          <form id="carComForm" name="carComForm">
							  <table>
						   	    <col width="25%"/>
	                            <col width="75%"/>
						      	<tr>
	                              <td class="left">Trucking company</td>
	                              <td>
	                              	<input type="hidden" 	id="deliveryCoKey" 		name="deliveryCoKey"/>
	                                <input type="text" 		id="deliveryCoName" 	name="deliveryCoName" style="width:80%;" readOnly/>
	                              </td>
	                            </tr>
	                            <tr>
	                              <td class="left">Phone</td>
	                              <td>
	                                <input type="text" id="deliveryCoPhone" name="deliveryCoPhone" readOnly/>
	                              </td>
	                            </tr>
	                            <tr>
	                              <td class="left">Email</td>
	                              <td>
	                                <input type="text" id="deliveryCoEmail" name="deliveryCoEmail" readOnly/>
	                              </td>
	                            </tr>
	                            <tr>
	                              <td class="left">Trucker</td>
	                              <td>
	                                <input type="text" id="deliveryCarName" name="deliveryCarName" readOnly/>
	                              </td>
	                            </tr>
	                            <tr>
	                              <td class="left">Phone</td>
	                              <td>
	                                <input type="text" id="deliveryCarPhone" name="deliveryCarPhone" readOnly/>
	                              </td>
	                            </tr>
	                            <tr>
	                              <td class="left">Car Number</td>
	                              <td>
	                                <input type="text" id="deliveryCarNum" name="deliveryCarNum" readOnly/>
	                              </td>
	                            </tr>
	                            <tr>
	                              <td class="left">D. Delivery Start</td>
	                              <td>
	                                <input type="text" id="deliveryStartDate" name="deliveryStartDate" readOnly/>
	                              </td>
	                            </tr>
	                            <tr>
	                              <td class="left">Arrival Time</td>
	                              <td>
	                                <input type="text" id="arrivalTime" name="arrivalTime" readOnly/>
	                              </td>
	                            </tr>
	                            <tr>
	                              <td class="left">Damage</td>
	                              <td>
	                                <select id="damage" name="damage" style="width:40px">
	                                  <option value="N">N</option>
	                                  <option value="Y">Y</option>
	                                </select>
	                              </td>
	                            </tr>
	                            <tr>
	                              <td class="left">Damage Note</td>
	                              <td>
	                                <textarea type="text" id="damageDetail" name="damageDetail"></textarea>
	                              </td>
	                            </tr>
						      </table>
						      </form>
						    </div>
				  	      </div>
				  	      <div title="History" style="padding:2px;">
				  	        <div class="hsnew_C02_table">
				  	          <form id="viewForm" name="viewForm">
							  <table>
						   	    <col width="20%" />
							  	<col width="40%" />
							  	<col width="40%" />
						      	<tr height="30px">
						      	  <td class="left" style="text-align:center">Status</td>
						      	  <td class="left" style="text-align:center">Manager</td>
						      	  <td class="left" style="text-align:center">D. Managed</td>
						      	</tr>
						      	<tr height="30px">
						      	  <td class="left" style="text-align:center">Delivery request</td>
						      	  <td class="taC" style="background-color:#ffffee;"><div id="requestMan"></div></td>
						      	  <td class="taC" style="background-color:#ffffee;"><div id="requestDate"></div></td>
						      	</tr>
						      	<tr height="30px">
						      	  <td class="left" style="text-align:center">Allocation request</td>
						      	  <td class="taC" style="background-color:#ffffff;"><div id="assignMan"></div></td>
						      	  <td class="taC" style="background-color:#ffffff;"><div id="allocateRequestDate"></div></td>
						      	</tr>
						      	<tr height="30px">
						      	  <td class="left" style="text-align:center">Allocation completed</td>
						      	  <td class="taC" style="background-color:#ffffee;"><div id="deliveryCoName"></div></td>
						      	  <td class="taC" style="background-color:#ffffee;"><div id="allocateDate"></div></td>
						      	</tr>
						      	<tr height="30px">
						      	  <td class="left" style="text-align:center">In transit</td>
						      	  <td class="taC" style="background-color:#ffffff;"><div id="deliveryCarName"></div></td>
						      	  <td class="taC" style="background-color:#ffffff;"><div id="deliveryStartDate"></div></td>
						      	</tr>
						      	<tr height="30px">
						      	  <td class="left" style="text-align:center">Delivery completed</td>
						      	  <td class="taC" style="background-color:#ffffee;"><div id="deliveryCarEndName"></div></td>
						      	  <td class="taC" style="background-color:#ffffee;"><div id="deliveryEndDate"></div></td>
						      	</tr>
						      </table>
						      </form>
						    </div>
				  	      </div>
					  	</div>
        		    </div>
				  </div>
			  	</div>
		      	<div data-options="region:'center'" style="box-sizing:border-box;border:0px">
				  <div class="normal_Top">
				    <input type="hidden" id="SANGHO" 	name="SANGHO" 	value="${sessionScope.FORWADER}">
				  <form id="frm1" name="frm1">
				  <input type="hidden" id="ID" 			name="ID" 			value="${sessionScope.ID}">
				  <input type="hidden" id="USERID" 		name="USERID" 		value="${sessionScope.USERID}">
				  <input type="hidden" id="USERGRADE" 	name="USERGRADE" 	value="${sessionScope.USERGRADE}">
				  <input type="hidden" id="USERGRADEB" 	name="USERGRADEB" 	value="${sessionScope.USERGRADEB}">
				  <input type="hidden" id="forwarder" 	name="forwarder">
				  <input type="hidden" id="defaultDB" 	name="defaultDB" 	value="${sessionScope.DEFAULTDB}">
				  <input type="hidden" id="taxNum" 		name="taxNum" 		value="${sessionScope.TAXNO}">
				  <input type="hidden" id="ImpoKey" 	name="ImpoKey">
				  <input type="hidden" id="_deDB" 		name="_deDB">
				  <input type="hidden" id="napseSaup" 	name="napseSaup">
				  <input type="hidden" id="SearchDb" 	name="SearchDb" 	value="${param.sdb}">
				  <span id="jisa"></span>
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
					  	<td>
					      <select id="_DateType" name="_DateType" style="width:60px">
					        <option value="Impo_iphang_date_Day">D. Arrival</option>
						  	<option value="Impo_singo_date_Day" selected="selected">D. Declaration</option>
						  	<option value="Impo_ok_date_Day">D. Acceptance</option>
						  </select>
					  	</td>
					  	<td>
					      <input type="text" id="strFromDate" name="strFromDate"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />~
					      <input type="text" id="strToDate" 	name="strToDate"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />
					      <div class="normal_btn">
						  	<a href="#" class="arrow" onclick="fn_prevday()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
						  	<a href="#" onclick="fn_today()">D</a>
						  	<a href="#" class="arrow" onclick="fn_nextday()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
						  	<a href="#" class="arrow1"></a>
						  	<a href="#" class="arrow" onclick="fn_prevweek()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
						  	<a href="#" onclick="fn_week()">W</a>
						  	<a href="#" class="arrow" onclick="fn_nextweek()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
						  	<a href="#" class="arrow1"></a>
						  	<a href="#" class="arrow" onclick="fn_prevmonth()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
						  	<a href="#" onclick="fn_month()">M</a>
						  	<a href="#" class="arrow" onclick="fn_nextmonth()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
						  </div>
						  <input type='hidden' id='_Undecided' 	name='_Undecided'/>
					      <input type='hidden' id='_TodayData' 	name='_TodayData'/>
					      <input type='hidden' id='_Document' 	name='_Document'/>
					      <input type='hidden' id='_Test' 		name='_Test'/>
					  	</td>
					  	<td></td>
					  	<td>Taxpayer</td>
					  	<td><input type="text" id="impoNapseSangho" name="impoNapseSangho" onkeypress="keyDown()"/></td>
					  	<td></td>
					  	<td>Hs Code</td>
					  	<td><input type="text" id="impoHs" name="impoHs" onkeypress="keyDown()"/></td>
					  </tr>
					  <tr height="23px">
					  	<td>B/L No.</td>
					  	<td><input type="text" id="impoBlNo" name="impoBlNo" onkeypress="keyDown()"/></td>
					  	<td></td>
					  	<td>Declaration No.</td>
					  	<td><input type="text" id="impoSingoNo" name="impoSingoNo" onkeypress="keyDown()" value="${param.singo}"/></td>
					  	<td></td>
					  	<td>Item Code</td>
					  	<td><input type="text" id="impoJajae" name="impoJajae" onkeypress="keyDown()"/></td>
					  </tr>
				  	</table>
				  	</form>
				  </div>
				  <div class="normal_Button">
				  	<a href="javascript:fn_searchAction();">Search</a>
				    <a href="javascript:fn_searchAction1();">Pending</a>
				    <a href="javascript:fn_searchAction2();">Today</a>
				    <a href="javascript:fn_searchAction3();">Paper</a>
				    <a href="javascript:fn_searchAction4();">C/S</a>
				    <a href="javascript:fn_searchExcel();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
				  </div>
				  <div class="easyui-layout" style="width:100%;height:620px">
				  <div data-options="region:'north',split:true" style="width:100%;height:240px;box-sizing:border-box;border:0px">
					<div class="normal_con01">
					  <table id="masterGrid"></table>
					</div>
					<div class="normal_con01" style="display:none">
					  <table id="excelGrid"></table>
					</div>
					<%@ include file="/WEB-INF/jsp/include/excelDown.jsp" %>
				  </div>
		    	  <div data-options="region:'center',split:true" style="width:100%;height:140px;box-sizing:border-box;border:0px">
				    <div class="easyui-layout" style="width:100%;height:140px">
				    <div data-options="region:'center'" style="width:50%;box-sizing:border-box;border:0px">
					  <div class="normal_con01">
					  	<table id="detailGrid"></table>
					  </div>
				  	</div>
				    <div data-options="region:'east',split:true" style="width:50%;box-sizing:border-box;border:0px">
					  <div class="normal_con01">
					    <table id="subDetailGrid"></table>
					  </div>
				  	</div>
				  	</div>
		    	  </div>
		    	  <div data-options="region:'south',split:true" style="width:100%;height:240px;box-sizing:border-box;border:0px">
		    	    <div class="easyui-tabs" id="tabs1" data-options="fit:true,plain:true">
		    	      <div title="Details">
		    	        <div class="hsnew_C02_table">
			      	  	  <form id="jajaeForm" name="jajaeForm">
			      	  	  <input type="hidden" id="Mreg_date" name="Mreg_date"/>
				  		  <table>
				  		  	<col width="07%">
                        	<col width="19%">
                        	<col width="09%">
                        	<col width="07%">
                        	<col width="07%">
                       	 	<col width="07%">
                        	<col width="22%">
                        	<col width="22%">
			      		  	<tr>
	                          <td class="left">Buyer</td>
	                          <td colspan="5"><input type="text" id="Mshipper" name="Mshipper" style="width:100%;" readOnly/></td>
	                          <td class="left">Item info.</td>
	                          <td class="left">Item declaration tips</td>
	                      	</tr>
	                      	<tr>
	                          <td class="left">HS Code</td>
	                          <td>
	                            <input type="text" id="Mhs_code" name="Mhs_code" style="width:100px;" readOnly/>&nbsp;
                                <input type="text" id="Mhs_kind" name="Mhs_kind" style="width:50px;text-align:center;" readOnly/>&nbsp;
                                <input type="text" id="Mhs_rate" name="Mhs_rate" style="width:30px;text-align:right;" readOnly/> %
	                          </td>
	                          <td class="left">HS of trading partner</td>
	                          <td colspan="3"><input type="text" id="Mattached3" name="Mattached3" style="width:100%;" readOnly/></td>
	                          <td rowspan="6"><textarea type="text" id="Mremark2" name="Mremark2" class="input-sm" style="width:100%;height:140px" readOnly></textarea></td>
	                          <td rowspan="6"><textarea type="text" id="Mremark1" name="Mremark1" class="input-sm" style="width:100%;height:140px" readOnly></textarea></td>
	                      	</tr>
	                      	<tr>
	                          <td class="left">Unit price</td>
	                          <td>
	                            <input type="text" id="Mindo_code" name="Mindo_code" style="width:30px" readOnly/>
                                <input type="text" id="Munitprice_current" name="Munitprice_current" style="width:30px" readOnly/>
                                <input type="text" id="Munitprice" name="Munitprice" style="width:70px; text-align:right;" readOnly/>
	                          </td>
	                          <td class="left">TP</td>
	                          <td><input type="text" id="tpStatus" name="tpStatus" style="width:100%;" readOnly/></td>
	                          <td class="left">iscrepancy rate</td>
	                          <td><input type="text" id="Munitprice_Rate" name="Munitprice_Rate" style="width:100%;" readOnly/></td>
	                      	</tr>
	                      	<tr>
	                          <td class="left">Country of origin</td>
	                          <td>
	                            <input type="text" id="Morigin1" name="Morigin1" style="width:25px" readOnly/>
                                <input type="text" id="Morigin2" name="Morigin2" style="width:15px" readOnly/>
                                <input type="text" id="Morigin3" name="Morigin3" style="width:15px" readOnly/>
                                <input type="text" id="Morigin4" name="Morigin4" style="width:15px" readOnly/>
                                <input type="text" id="Morigin5" name="Morigin5" style="width:20px" readOnly/>
	                          </td>
	                          <td class="left">Homologation</td>
	                          <td><input type="text" id="myogFlag" name="myogFlag" style="width:100%;" readOnly/></td>
	                          <td class="left">Addition</td>
	                          <td><input type="text" id="mprovisional" name="mprovisional" style="width:100%;" readOnly/></td>
	                      	</tr>
	                      	<tr>
	                          <td class="left">Description</td>
	                          <td colspan="5"><input type="text" id="Mger_goods" name="Mger_goods" style="width:100%;" readOnly/></td>
	                      	</tr>
	                      	<tr>
	                          <td class="left">Model</td>
	                          <td colspan="5">
	                            <input type="text" id="Mmodel_1" name="Mmodel_1" style="width:25%;" maxlength="30" readOnly/>
                                <input type="text" id="Mmodel_2" name="Mmodel_2" style="width:70%;" maxlength="30" readOnly/>
	                          </td>
	                      	</tr>
	                      	<tr>
	                          <td class="left">Alarm</td>
	                          <td colspan="5">
	                            <input type="text" id="mspecialRemark1" name="mspecialRemark1" style="width:100%;" maxlength="30" readOnly/>
	                          </td>
	                      	</tr>
	                      </table>
	                      </form>
	                  	</div>
		    	      </div>
		    	      <div title="HS History" style="padding:10px;">
			  	        <div class="easyui-layout" data-options="fit:true">
			  	          <div data-options="region:'center',split:true" style="width:100%">
			  	            <div class="normal_con01">
						  	  <table id="hsChangeGrid" class="easyui-datagrid"></table>
							</div>
			  	          </div>
			            </div>
			          </div>
			          <div title="TP History" style="padding:10px;">
			  	        <div class="easyui-layout" data-options="fit:true">
			  	          <div data-options="region:'center',split:true" style="width:100%;box-sizing:border-box;border:0px">
			  	            <canvas id="unitPriceDetailSameDeletedBarChart" style="height:98%;"></canvas>
			  	          </div>
			            </div>
			          </div>
			          <div title="Unit price trend" style="padding:10px;">
			  	        <div class="easyui-layout" data-options="fit:true">
			  	          <div data-options="region:'north'" style="width:100%;box-sizing:border-box;border:0px">
			  	            <div class="normal_Button" style="padding:0px;">
						  	  <a href="javascript:fn_customsUnitPriceAction();">Include Duplicates</a>
						  	  <a href="javascript:fn_customsUnitPriceDoubleAction();">Remove Duplicates</a>
						  	</div>
			  	          </div>
			  	          <div data-options="region:'center'" style="width:100%;box-sizing:border-box;border:0px">
			  	            <canvas id="unitPriceBarChart" style="height:85%;"></canvas>
			  	          </div>
			            </div>
			          </div>
			          <div title="Import History" style="padding:10px;">
			  	        <div class="easyui-layout" data-options="fit:true">
			  	          <div data-options="region:'center',split:true" style="width:100%">
			  	            <div class="normal_con01">
						  	  <table id="tradeGrid" class="easyui-datagrid"></table>
							</div>
			  	          </div>
			            </div>
			          </div>
		    	      <div title="Total History" style="padding:10px;">
			  	        <div class="easyui-layout" data-options="fit:true">
			  	          <div data-options="region:'center',split:true" style="width:50%">
			  	            <div class="normal_con01">
						  	  <table id="changeGrid" class="easyui-datagrid"></table>
							</div>
			  	          </div>
			              <div data-options="region:'east',split:true" style="width:50%;box-sizing:border-box;border:0px">
			                <div class="normal_con01">
						  	  <table id="changeDetailGrid" class="easyui-datagrid"></table>
							</div>
			              </div>
			            </div>
			          </div>
		    	      <div title="Non-requirements Items" style="padding:10px;">
		    	        <div class="easyui-layout" data-options="fit:true">
			  	          <div data-options="region:'center',split:true" style="width:60%;box-sizing:border-box;border:0px">
			  	            <div class="normal_con01">
						  	  <table id="yogGrid" class="easyui-datagrid"></table>
							</div>
			  	          </div>
			              <div data-options="region:'east',split:true" style="width:40%;box-sizing:border-box;border:0px">
			                <div class="normal_Button">
							  <a href="javascript:fn_yogSaveAction();">Register</a>
							  <a href="javascript:fn_yogModifyAction();">Modify</a>
							  <a href="javascript:fn_yogDelAction();">Delete</a>
							</div>
							<div class="hsnew_C02_table">
			      	  	  	  <form id="frm3" name="frm3">
			      	  	  	  <input type="hidden" id="mcountNo" 	name="mcountNo"/>
                              <input type="hidden" id="useYn" 		name="useYn" 	value="Y"/>
				  		  	  <table>
				  		  		<col width="20%">
                        		<col width="80%">
			      		  		<tr>
	                          	  <td class="left">No.</td>
	                          	  <td><input type="text" id="Seq" name="Seq" style="width:25px;"/></td>
	                      		</tr>
	                      		<tr>
	                          	  <td class="left">Regulation code</td>
	                          	  <td>
	                          	    <input type="text" id="lawCd" name="lawCd" style="width:25px;" readOnly/>
	                          	    <a href="javascript:fn_searchSys('CSOR_CFRM_TRGT_LWOR_CD')"><img src="../images/cps/hs_seach.png"></a>
	                          	  </td>
	                      		</tr>
	                      		<tr>
	                          	  <td class="left">Reason code</td>
	                          	  <td>
	                          	    <input type="text" id="notYogSayuCd" name="notYogSayuCd" style="width:20px;" readOnly/>
	                          	    <a href="javascript:fn_searchSys('REQ_NNOB_RCD')"><img src="../images/cps/hs_seach.png"></a>
	                          	  </td>
	                      		</tr>
	                      		<tr>
	                          	  <td class="left">Reasons</td>
	                          	  <td><input type="text" id="NotYogSayuEtc" name="NotYogSayuEtc" style="width:100%;"/></td>
	                      		</tr>
	                      	  </table>
	                      	  </form>
	                      	</div>
			              </div>
			            </div>
			  	      </div>
			  	      <div title="Attach" style="padding:10px;">
			  	        <div class="easyui-layout" data-options="fit:true">
			  	          <div data-options="region:'center',split:true" style="width:100%;box-sizing:border-box;border:0px">
			  	            <div class="normal_con01">
						  	  <table id="fileGrid1" class="easyui-datagrid"></table>
							</div>
			  	          </div>
			            </div>
			  	      </div>
			  	      <div title="Duty rate & Clearance guidelines">
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