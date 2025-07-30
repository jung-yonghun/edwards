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
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-filter.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-cellediting.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/import/engImportDeliveryList.js'/>"></script>
	<style>
	    .custom-statusbar {
	        padding: 2px 0px 2px 0px;
	        width: 0px;
	    }

	    .odd {
	        background-color: #f9f9f9;
	    }

	    .even {
	        background-color: #f3f3f3;
	    }

	    .custom-filename {
	        display: inline-block;
	        width: 0px;
	        margin: 0 5px 0px 0px;
	        color: #333333
	        vertical-align: middle;
	    }

	    .custom-progress {
	        margin: 0 10px 0px 10px;
	        position: absolute;
	        width: 0px;
	        border: 0px solid #ddd;
	        padding: 1px;
	        border-radius: 3px;
	        display: none;
	        vertical-align: middle;
	        color: #FFFFFF;
	    }

	    .custom-bar {
	        background-color: #337AB7;
	        width: 0;
	        height: 0px;
	        border-radius: 3px
	        color: #FFFFFF;
	        display: inline-block;
	        vertical-align: middle;
	        margin: 0px;
	    }

	    .custom-red {
	        -moz-box-shadow: inset 0 39px 0 -24px #e67a73;
	        -webkit-box-shadow: inset 0 39px 0 -24px #e67a73;
	        box-shadow: inset 0 39px 0 -24px #e67a73;
	        background-color: #e4685d;
	        -moz-border-radius: 2px;
	        -webkit-border-radius: 2px;
	        border-radius: 2px;
	        display: inline-block;
	        color: #fff;
	        font-family: arial;
	        font-size: 12px;
	        font-weight: normal;
	        padding: 4px 5px;
	        text-decoration: none;
	        text-shadow: 0 1px 0 #b23e35;
	        cursor: pointer;
	        vertical-align: middle;
	        margin-right: 5px;
	    }

	    .custom-green {
	        background-color: #77b55a;
	        -moz-border-radius: 2px;
	        -webkit-border-radius: 2px;
	        border-radius: 2px;
	        margin: 0;
	        padding: 0;
	        display: inline-block;
	        color: #fff;
	        font-family: arial;
	        font-size: 12px;
	        font-weight: normal;
	        padding: 4px 5px;
	        text-decoration: none;
	        cursor: pointer;
	        text-shadow: 0 1px 0 #5b8a3c;
	        vertical-align: middle;
	        margin-right: 5px;
	    }

	    .ajax-file-upload {
	        font-size: 12px;
	        font-weight: bold;
	        padding: 10px 10px 10px 10px;
	        cursor: pointer;
	        line-height: 10px;
	        height: 20px;
	        margin: 0 10px 10px 0;
	        display: inline-block;
	        background: #fff;
	        border: 1px solid #e8e8e8;
	        color: #888;
	        text-decoration: none;
	        border-radius: 3px;
	        -webkit-border-radius: 3px;
	        -moz-border-radius: 3px;
	        -moz-box-shadow: 0 2px 0 0 #e8e8e8;
	        -webkit-box-shadow: 0 2px 0 0 #e8e8e8;
	        box-shadow: 0 2px 0 0 #e8e8e8;
	        padding: 7px 10px 0px 10px;
	        color: #fff;
	        background: #279ad3;
	        border: none;
	        -moz-box-shadow: 0 2px 0 0 #13648d;
	        -webkit-box-shadow: 0 2px 0 0 #13648d;
	        box-shadow: 0 2px 0 0 #13648d;
	        vertical-align: middle;
	    }

	    .ajax-upload-dragdrop {
	        border: 3px dotted #A5A5C7;
	        width: 345px;
	        height: 70px;
	        color: #DADCE3;
	        text-align: left;
	        vertical-align: middle;
	        padding: 10px 10px 10px 10px;
	    }
	</style>
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
				  <input type="hidden" id="USERGRADE" 	name="USERGRADE" 	value="${sessionScope.USERGRADE}">
				  <input type="hidden" id="_defaultDB" 	name="_defaultDB" 	value="${sessionScope.DEFAULTDB}">
				  <input type="hidden" id="taxNum" 		name="taxNum" 		value="${sessionScope.TAXNO}">
				  <table width="100%">
				  	<col width="06%" />
				  	<col width="28%" />
				  	<col width="01%" />
				  	<col width="06%" />
				  	<col width="15%" />
				  	<col width="01%" />
				  	<col width="06%" />
				  	<col width="15%" />
				  	<col width="01%" />
				  	<col width="06%" />
				  	<col width="15%" />
					<tr height="23px">
					  <td>
					    <select id="_DateType" name="_DateType" style="width:90px">
					      <option value="singoDate">D. Declaration</option>
                          <option value="suirDate">D. Acceptance</option>
                          <option value="requestDate" selected="selected">D. Request</option>
                          <option value="allocateRequestDate">D. Delivery Request</option>
                          <option value="allocateDate">D. Delivery allocation</option>
                          <option value="deliveryStartDate">D. Delivery Start</option>
                          <option value="deliveryEndDate">D. Delivery End</option>
                          <option value="impoBanipDate">D. Warehousing</option>
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
					  </td>
					  <td></td>
					  <td>Taxpayer</td>
					  <td><input type="text" id="customerName" name="customerName" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>B/L No.</td>
					  <td><input type="text" id="hblNo" name="hblNo" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>Declaration No.</td>
					  <td><input type="text" id="singoNo" name="singoNo" onkeypress="keyDown()"/></td>
					</tr>
					<tr height="23px">
					  <td>Trucking company</td>
					  <td><input type="text" id="deliveryCoName" name="deliveryCoName" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>Destination</td>
					  <td><input type="text" id="deliveryCarryingInName" name="deliveryCarryingInName" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>Delivery Status</td>
					  <td colspan="4">
					    <select id="deliveryStatus" name="deliveryStatus" style="width:80px" onChange="fn_searchAction()">
                            <option value="">All</option>
                            <option value="20">운송의뢰</option>
                            <option value="30">배차요청</option>
                            <option value="40">배차완료</option>
                            <option value="50">배송중</option>
                            <option value="60">배송완료</option>
                        </select>
					  </td>
					</tr>
					<tr height="23px">
					  <td>Requestor</td>
					  <td><input type="text" id="requestMan" name="requestMan" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>Receiver</td>
					  <td><input type="text" id="assignMan" name="assignMan" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>In-charge at desitination</td>
					  <td><input type="text" id="deliveryCarryingInMan" name="deliveryCarryingInMan" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>Trucker</td>
					  <td><input type="text" id="deliveryCarName" name="deliveryCarName" onkeypress="keyDown()"/></td>
					</tr>
				  </table>
				  </form>
				</div>
				<div class="normal_Button">
				  <a href="javascript:fn_searchAction();">Search</a>
				  <a href="javascript:fn_carryInModifyAction();">Destination revision</a>
				  <a href="javascript:fn_delStatusAction();">Delete Request</a>
				  <a href="javascript:fn_carReturnAction();">Cancel Delivery Request</a>
				  <a href="javascript:fn_AddImportDeliveryRequest();">Delivery Request(Clearance)</a>
				  <a href="javascript:fn_AddImportDeliveryRequestNew();">Delivery Request(New)</a>
				  <a href="javascript:fn_searchExcel();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
				</div>
				<div class="easyui-layout" style="width:100%;height:580px">
				  <div data-options="region:'east',split:true" title="Detail Area" style="width:400px;box-sizing:border-box;border:0px">
			  	 	<div class="easyui-tabs" data-options="fit:true,plain:true">
			  	      <div title="Attachments" style="padding:10px;">
					  	<form id="addForm" name="addForm">
	                  	<input type="hidden" id="edmsParentGbn" 	name="edmsParentGbn"/>
				        <input type="hidden" id="edmsJisaCode" 		name="edmsJisaCode"/>
				        <input type="hidden" id="edmsMasterKey" 	name="edmsMasterKey"/>
		   			    <input type="hidden" id="edmsMKey" 			name="edmsMKey"/>
					    <input type="hidden" id="edmsNo" 			name="edmsNo"/>
					    <input type="hidden" id="edmsSingoNo" 		name="edmsSingoNo"/>
					    <input type="hidden" id="commonYn" 			name="commonYn"/>
				      	<input type="hidden" id="edmsFileStatus" 	name="edmsFileStatus"  	value="C"/>
				      	<input type="hidden" id="commonGubun" 		name="commonGubun"  	value="A"/>
	                  	<input type="hidden" id="selrow" 			name="selrow"/>
	                  	<input type="hidden" id="pageNum" 			name="pageNum"/>
	                  	<div id="fileuploader">File searching</div>
	                  	<div class="normal_Top">
	                      <table width="100%">
	                      	<col width="25%"/>
	                      	<col width="75%"/>
	                      	<tr height="23px">
	                          <td>Docu Type</td>
	                          <td>
	                          	<select id="edmsFileCategory" name="edmsFileCategory" style="width:80px;"></select>
	                          </td>
	                      	</tr>
	                      </table>
	                  	</div>
	                  	</form>
	                    <div class="normal_Button">
					   	  <a href="javascript:fn_deliveryDetailSave();">Save Type</a>
					  	</div>
	                  	<div class="normal_con01">
					      <table id="fileGrid" class="easyui-datagrid"></table>
					  	</div>
					  </div>
					  <div title="Delivery request details" style="padding:2px;">
					    <div class="normal_Button">
					   	  <a href="javascript:fn_carryingSave();">Modify Delivery request</a>
					   	  <a href="javascript:fn_carryingAdd();">Add Destination</a>
					  	</div>
					  	<div class="hsnew_C02_table">
			  	          <form id="insertForm" name="insertForm">
						  <table>
					   	    <col width="25%"/>
                            <col width="75%"/>
                            <tr>
                              <td class="left">Destination</td>
                              <td>
                                <textarea type="text" id="requestInvisibleNote" name="requestInvisibleNote" style="width:100%;"></textarea>
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
                                <a href="javascript:fn_carryingIn()"><img src="../images/cps/hs_seach.png"></a>
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
			  	      <div title="Delivery allocation Details" style="padding:2px;">
			  	        <div class="normal_Button">
					   	  <a href="javascript:fn_carComSave();">Delivery allocation</a>
					   	  <a href="javascript:fn_damageSave();">Save Damage</a>
					   	  <a href="javascript:fn_saveBundleUpCarCom();">All Delivery allocation</a>
					  	</div>
					  	<div class="hsnew_C02_table">
			  	          <form id="carComForm" name="carComForm">
						  <table>
					   	    <col width="25%"/>
                            <col width="75%"/>
					      	<tr>
                              <td class="left">Trucking company</td>
                              <td>
                              	<input type="hidden" 	id="deliveryCoKey" 		name="deliveryCoKey"/>
                              	<input type="hidden" 	id="deliveryCoEmail" 	name="deliveryCoEmail"/>
                                <input type="text" 		id="deliveryCoName" 	name="deliveryCoName" style="width:80%;" readOnly/>
                                <a href="javascript:fn_carComSearch();"><img src="../images/cps/hs_seach.png"></a>
                              </td>
                            </tr>
                            <tr>
                              <td class="left">Phone</td>
                              <td>
                                <input type="text" id="deliveryCoPhone" name="deliveryCoPhone" readOnly/>
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
					   	    <col width="40%" />
						  	<col width="20%" />
						  	<col width="40%" />
					      	<tr>
					      	  <td class="left">Status</td>
					      	  <td class="left">Manager</td>
					      	  <td class="left">D. Managed</td>
					      	</tr>
					      	<tr>
					      	  <td class="left">Delivery request</td>
					      	  <td class="taC"><div id="requestMan"></div></td>
					      	  <td class="taC"><div id="requestDate"></div></td>
					      	</tr>
					      	<tr>
					      	  <td class="left">Allocation request</td>
					      	  <td class="taC"><div id="assignMan"></div></td>
					      	  <td class="taC"><div id="allocateRequestDate"></div></td>
					      	</tr>
					      	<tr>
					      	  <td class="left">Allocation completed</td>
					      	  <td class="taC"><div id="deliveryCoName"></div></td>
					      	  <td class="taC"><div id="allocateDate"></div></td>
					      	</tr>
					      	<tr>
					      	  <td class="left">In transit</td>
					      	  <td class="taC"><div id="deliveryCarName"></div></td>
					      	  <td class="taC"><div id="deliveryStartDate"></div></td>
					      	</tr>
					      	<tr>
					      	  <td class="left">Delivery completed</td>
					      	  <td class="taC"><div id="deliveryCarEndName"></div></td>
					      	  <td class="taC"><div id="deliveryEndDate"></div></td>
					      	</tr>
					      </table>
					      </form>
					    </div>
			  	      </div>
				  	</div>
			  	  </div>
		      	  <div data-options="region:'center'" style="box-sizing:border-box;border:0px">
				  	<div class="normal_con01">
					  <table id="masterGrid">
					    <thead>
				          <tr>
				          	<th data-options="field:'deliveryRequestKey',hidden:true" rowspan="2">Key</th>
				          	<th data-options="field:'ck',checkbox:true" rowspan="2"></th>
				            <th data-options="field:'deliveryStatus',width:60,align:'center',formatter:linkDeliveryStatusFormatter" rowspan="2">Delivery information</th>
				            <th data-options="field:'requestMan',width:70,align:'center'" rowspan="2">Requestor</th>
				            <th data-options="field:'requestDate',width:80,align:'center',formatter:linkDateFormatter" rowspan="2">Request date</th>
				            <th data-options="field:'requestTime',width:60,align:'center',formatter:linkDateTimeFormatter" rowspan="2">Request time</th>
				            <th data-options="field:'assignMan',width:60,align:'center'" rowspan="2">Receiver</th>
				            <th data-options="field:'customerName',width:200" rowspan="2">Importer</th>
				            <th data-options="field:'hblNo',width:120,formatter:linkBlNoFormatter" rowspan="2">B/L No.</th>
				            <th data-options="field:'singoNo',width:120,align:'center',formatter:linkSingoFormatter" rowspan="2">Declaration No.</th>
				            <th data-options="field:'banipPlace',width:60,align:'center'" rowspan="2">Temperature condition</th>
				            <th data-options="field:'cargoSize',width:50,align:'center'" rowspan="2">Size</th>
				            <th data-options="field:'deliveryPojangSu',width:70,align:'right',formatter:linkNumberFormatter0" rowspan="2">Package</th>
				            <th data-options="field:'deliveryPojangDanwi',width:40,align:'center'" rowspan="2">C/T</th>
				            <th data-options="field:'deliveryJung',width:60,align:'right',formatter:linkNumberFormatter3" rowspan="2">Weight</th>
				            <th data-options="field:'deliveryJungDanwi',width:40,align:'center'" rowspan="2">Kg</th>
				            <th colspan="5">Trucking Information</th>
				            <th colspan="3">Destination Information</th>
				            <th data-options="field:'deliveryStartDate',width:80,align:'center',formatter:linkDateFormatter" rowspan="2">Delivery Date</th>
				            <th data-options="field:'damage',width:50,align:'center'" rowspan="2">Damage</th>
				          </tr>
				          <tr>
				            <th data-options="field:'deliveryCoName',width:150,align:'center'">Trucking company</th>
				            <th data-options="field:'deliveryCoPhone',width:100,align:'center'">Contact</th>
				            <th data-options="field:'deliveryCarName',width:80,align:'center'">Trucker Name</th>
				            <th data-options="field:'deliveryCarPhone',width:100,align:'center'">Trucker Phone</th>
				            <th data-options="field:'deliveryCarNum',width:100,align:'center'">Car Number</th>
				            <th data-options="field:'deliveryCarryingInName',width:150,align:'center'">Destination</th>
				            <th data-options="field:'deliveryCarryingInMan',width:60,align:'center'">In-charge</th>
				            <th data-options="field:'deliveryCarryingInPhone',width:100,align:'center'">Contact</th>
				          </tr>
				        </thead>
					  </table>
					</div>
					<div class="normal_con01" style="display:none">
					  <table id="excelGrid">
					    <thead>
				          <tr>
				            <th data-options="field:'deliveryStatus',width:60,align:'center',formatter:linkDeliveryStatusFormatter">Delivery information</th>
				            <th data-options="field:'requestMan',width:70,align:'center'">Requestor</th>
				            <th data-options="field:'requestDate',width:80,align:'center',formatter:linkDateFormatter">Request date</th>
				            <th data-options="field:'requestTime',width:60,align:'center',formatter:linkDateTimeFormatter">Request time</th>
				            <th data-options="field:'assignMan',width:60,align:'center'">Receiver</th>
				            <th data-options="field:'customerName',width:200">Importer</th>
				            <th data-options="field:'hblNo',width:120,align:'center',formatter:linkBlNoFormatter">B/L No.</th>
				            <th data-options="field:'singoNo',width:120,align:'center',formatter:linkSingoFormatter">Declaration No.</th>
				            <th data-options="field:'banipPlace',width:60,align:'center'">Temperature condition</th>
				            <th data-options="field:'cargoSize',width:50,align:'center'">Size</th>
				            <th data-options="field:'deliveryPojangSu',width:70,align:'right',formatter:linkNumberFormatter0">Package</th>
				            <th data-options="field:'deliveryPojangDanwi',width:40,align:'center'">C/T</th>
				            <th data-options="field:'deliveryJung',width:60,align:'right',formatter:linkNumberFormatter3">Weight</th>
				            <th data-options="field:'deliveryJungDanwi',width:40,align:'center'">Kg</th>
				            <th data-options="field:'deliveryCoName',width:150,align:'center'">Trucking company</th>
				            <th data-options="field:'deliveryCoPhone',width:100,align:'center'">Contact</th>
				            <th data-options="field:'deliveryCarName',width:80,align:'center'">Trucker Name</th>
				            <th data-options="field:'deliveryCarPhone',width:100,align:'center'">Trucker Phone</th>
				            <th data-options="field:'deliveryCarNum',width:100,align:'center'">Car Number</th>
				            <th data-options="field:'deliveryCarryingInName',width:150,align:'center'">Destination</th>
				            <th data-options="field:'deliveryCarryingInMan',width:60,align:'center'">In-charge</th>
				            <th data-options="field:'deliveryCarryingInPhone',width:100,align:'center'">Contact</th>
				            <th data-options="field:'deliveryStartDate',width:80,align:'center',formatter:linkDateFormatter">Delivery Date</th>
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