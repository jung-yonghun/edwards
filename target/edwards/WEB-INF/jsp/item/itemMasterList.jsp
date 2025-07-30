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
	<script type="text/javascript" src="<c:url value='/js/plugins/chartjs/Chart.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/item/itemMasterList.js'/>"></script>
	<style>
    .custom-statusbar {
        padding: 2px 0px 2px 0px;
        width: 250px;
    }

    .odd {
        background-color: #f9f9f9;
    }

    .even {
        background-color: #f3f3f3;
    }

    .custom-filename {
        display: inline-block;
        width: 250px;
        margin: 0 5px 0px 0px;
        color: #333333
        vertical-align: middle;
    }

    .custom-progress {
        margin: 0 10px 0px 10px;
        position: absolute;
        width: 250px;
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
        border: 4px dotted #A5A5C7;
        width: 250px;
        height: 150px;
        color: #DADCE3;
        text-align: left;
        vertical-align: middle;
        padding: 10px 10px 0px 10px;
    }
	</style>
  </head>
  <body style="overflow:hidden">
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="container">
			  <div class="normal_cont">
				<div class="normal_Top">
				  <form id="frm1" name="frm1">
				  <input type="hidden" id="ID" 				name="ID" 				value="${sessionScope.ID}">
				  <input type="hidden" id="USERID" 			name="USERID" 			value="${sessionScope.USERID}">
				  <input type="hidden" id="USERGRADE" 		name="USERGRADE" 		value="${sessionScope.USERGRADE}">
				  <input type="hidden" id="USERGRADEB" 		name="USERGRADEB" 		value="${sessionScope.USERGRADEB}">
				  <input type="hidden" id="_defaultDB" 		name="_defaultDB" 		value="${sessionScope.DEFAULTDB}">
				  <input type="hidden" id="mcoCom" 			name="mcoCom" 			value="${sessionScope.TAXNO}">
				  <input type="hidden" id="_defaultRmsDb" 	name="_defaultRmsDb" 	value="CPS">
				  <input type="hidden" id="itemMmodelCode" 	name="itemMmodelCode">
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
					    <select id="_DateType" name="_DateType" style="width:60px">
					      <option value="Mreg_date">등록일</option>
                          <option value="Mconfirm_date">확정일</option>
                          <option value="last_date" selected>수정일</option>
						</select>
					  </td>
					  <td>
					    <input type="text" id="strFromDate" name="strFromDate"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />~
					    <input type="text" id="strToDate" 	name="strToDate"  	style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />
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
					  <td>HS Status</td>
					  <td>
					    <select id="hsStatus" name="hsStatus" class="input-sm" style="width:80px">
                          <option value="" selected="selected">전체</option>
                          <option value="Y">확정</option>
                          <option value="N">미확정</option>
                        </select>
					  </td>
					  <td></td>
					  <td>단가 Status</td>
					  <td>
					    <select id="tpStatus" name="tpStatus" class="input-sm" style="width:80px">
                          <option value="" selected="selected">전체</option>
                          <option value="Y">TP</option>
                          <option value="N">Non-TP</option>
                        </select>
					  </td>
					  <td></td>
					  <td>FTA Status</td>
					  <td>
					    <select id="ftaYn" name="ftaYn" class="input-sm" style="width:60px">
                          <option value="" selected="selected">전체</option>
                          <option value="Y">적용</option>
                          <option value="N">미적용</option>
                        </select>
					  </td>
					</tr>
					<tr height="23px">
					  <td>업체명</td>
					  <td><input type="text" id="mcoName" name="mcoName" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>사업부</td>
					  <td><input type="text" id="mdivisionCode" name="mdivisionCode" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>자재코드</td>
					  <td><input type="text" id="mmodelCode" name="mmodelCode" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>세번부호</td>
					  <td><input type="text" id="mhsCode" name="mhsCode" onkeypress="keyDown()"/></td>
					</tr>
					<tr height="23px">
					  <td>성분</td>
					  <td><input type="text" id="mingredient1" name="mingredient1" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>거래품명</td>
					  <td><input type="text" id="mgerGoods" name="mgerGoods" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>무역거래처</td>
					  <td><input type="text" id="mshipper" name="mshipper" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>규격</td>
					  <td><input type="text" id="mmodel" name="mmodel" onkeypress="keyDown()"/></td>
					</tr>
				  </table>
				  </form>
				</div>
				<div id="pay" class="normal_Button" style="display:none">
				  <a href="javascript:fn_searchAction();">조회</a>
				  <a href="javascript:fn_insertAction();">등록</a>
				  <a href="javascript:fn_updateAction();">수정</a>
				  <a href="javascript:fn_searchExcel();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
				</div>
				<div id="nopay" class="normal_Button">
				  <a href="javascript:fn_searchAction();">조회</a>
				  <a href="javascript:fn_insertAction();">등록</a>
				  <a href="javascript:fn_updateAction();">수정</a>
				</div>
				<div class="easyui-layout" style="width:100%;height:600px">
				  <div data-options="region:'north',split:true" style="width:100%;height:350px;box-sizing:border-box;border:0px">
					<div class="normal_con01">
					  <table id="masterGrid"></table>
					</div>
					<div class="normal_con01" style="display:none">
					  <table id="excelGrid"></table>
					</div>
					<%@ include file="/WEB-INF/jsp/include/excelDown.jsp" %>
				  </div>
		    	  <div data-options="region:'east',split:true" style="width:100%;height:270px;box-sizing:border-box;border:0px">
		    	    <div class="easyui-tabs" id="tabs" data-options="fit:true,plain:true">
		    	      <div title="상세정보">
		    	        <div class="hsnew_C02_table">
			      	  	  <form id="insertForm" name="insertForm">
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
	                          <td class="left">제품정보</td>
	                          <td class="left">제품통관요령</td>
	                      	</tr>
	                      	<tr>
	                          <td class="left">세번부호</td>
	                          <td>
	                            <input type="text" id="Mhs_code" name="Mhs_code" style="width:100px;" readOnly/>&nbsp;
                                <input type="text" id="Mhs_kind" name="Mhs_kind" style="width:50px;text-align:center;" readOnly/>&nbsp;
                                <input type="text" id="Mhs_rate" name="Mhs_rate" style="width:30px;text-align:right;" readOnly/> %
	                          </td>
	                          <td class="left">상대국HS</td>
	                          <td colspan="3"><input type="text" id="Mattached3" name="Mattached3" style="width:100%;" readOnly/></td>
	                          <td rowspan="6"><textarea type="text" id="Mremark2" name="Mremark2" class="input-sm" style="width:100%;height:140px" readOnly></textarea></td>
	                          <td rowspan="6"><textarea type="text" id="Mremark1" name="Mremark1" class="input-sm" style="width:100%;height:140px" readOnly></textarea></td>
	                      	</tr>
	                      	<tr>
	                          <td class="left">단가</td>
	                          <td>
	                            <input type="text" id="Mindo_code" name="Mindo_code" style="width:30px" readOnly/>
                                <input type="text" id="Munitprice_current" name="Munitprice_current" style="width:30px" readOnly/>
                                <input type="text" id="Munitprice" name="Munitprice" style="width:70px; text-align:right;" readOnly/>
	                          </td>
	                          <td class="left">TP</td>
	                          <td><input type="text" id="tpStatus" name="tpStatus" style="width:100%;" readOnly/></td>
	                          <td class="left">오차율</td>
	                          <td><input type="text" id="Munitprice_Rate" name="Munitprice_Rate" style="width:100%;" readOnly/></td>
	                      	</tr>
	                      	<tr>
	                          <td class="left">원산지</td>
	                          <td>
	                            <input type="text" id="Morigin1" name="Morigin1" style="width:25px" readOnly/>
                                <input type="text" id="Morigin2" name="Morigin2" style="width:15px" readOnly/>
                                <input type="text" id="Morigin3" name="Morigin3" style="width:15px" readOnly/>
                                <input type="text" id="Morigin4" name="Morigin4" style="width:15px" readOnly/>
                                <input type="text" id="Morigin5" name="Morigin5" style="width:20px" readOnly/>
	                          </td>
	                          <td class="left">요건</td>
	                          <td><input type="text" id="myogFlag" name="myogFlag" style="width:100%;" readOnly/></td>
	                          <td class="left">가산요소</td>
	                          <td><input type="text" id="mprovisional" name="mprovisional" style="width:100%;" readOnly/></td>
	                      	</tr>
	                      	<tr>
	                          <td class="left">거래품명</td>
	                          <td colspan="5"><input type="text" id="Mger_goods" name="Mger_goods" style="width:100%;" readOnly/></td>
	                      	</tr>
	                      	<tr>
	                          <td class="left">규격</td>
	                          <td colspan="5">
	                            <input type="text" id="Mmodel_1" name="Mmodel_1" style="width:25%;" maxlength="30" readOnly/>
                                <input type="text" id="Mmodel_2" name="Mmodel_2" style="width:70%;" maxlength="30" readOnly/>
	                          </td>
	                      	</tr>
	                      	<tr>
	                          <td class="left">알람</td>
	                          <td colspan="5">
	                            <input type="text" id="mspecialRemark1" name="mspecialRemark1" style="width:100%;" maxlength="30" readOnly/>
	                          </td>
	                      	</tr>
	                      </table>
	                      </form>
	                  	</div>
		    	      </div>
		    	      <div title="HS변경이력" style="padding:10px;">
			  	        <div class="easyui-layout" data-options="fit:true">
			  	          <div data-options="region:'center',split:true" style="width:100%">
			  	            <div class="normal_con01">
						  	  <table id="hsChangeGrid" class="easyui-datagrid"></table>
							</div>
			  	          </div>
			            </div>
			          </div>
			          <div title="TP 변경이력" style="padding:10px;">
			  	        <div class="easyui-layout" data-options="fit:true">
			  	          <div data-options="region:'center',split:true" style="width:100%;box-sizing:border-box;border:0px">
			  	            <canvas id="unitPriceDetailSameDeletedBarChart" style="height:98%;"></canvas>
			  	          </div>
			            </div>
			          </div>
			          <div title="통관단가추이" style="padding:10px;">
			  	        <div class="easyui-layout" data-options="fit:true">
			  	          <div data-options="region:'north'" style="width:100%;box-sizing:border-box;border:0px">
			  	            <div class="normal_Button" style="padding:0px;">
						  	  <a href="javascript:fn_customsUnitPriceAction();">중복반영</a>
						  	  <a href="javascript:fn_customsUnitPriceDoubleAction();">중복제거</a>
						  	</div>
			  	          </div>
			  	          <div data-options="region:'center'" style="width:100%;box-sizing:border-box;border:0px">
			  	            <canvas id="unitPriceBarChart" style="height:85%;"></canvas>
			  	          </div>
			            </div>
			          </div>
			          <div title="통관이력" style="padding:10px;">
			  	        <div class="easyui-layout" data-options="fit:true">
			  	          <div data-options="region:'center',split:true" style="width:100%">
			  	            <div class="normal_con01">
						  	  <table id="tradeGrid" class="easyui-datagrid"></table>
							</div>
			  	          </div>
			            </div>
			          </div>
		    	      <div title="종합변경이력" style="padding:10px;">
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
		    	      <div title="요건비대상관리" style="padding:10px;">
		    	        <div class="easyui-layout" data-options="fit:true">
			  	          <div data-options="region:'center',split:true" style="width:60%;box-sizing:border-box;border:0px">
			  	            <div class="normal_con01">
						  	  <table id="yogGrid" class="easyui-datagrid"></table>
							</div>
			  	          </div>
			              <div data-options="region:'east',split:true" style="width:40%;box-sizing:border-box;border:0px">
			                <div class="normal_Button">
							  <a href="javascript:fn_yogSaveAction();">등록</a>
							  <a href="javascript:fn_yogModifyAction();">수정</a>
							  <a href="javascript:fn_yogDelAction();">삭제</a>
							</div>
							<div class="hsnew_C02_table">
			      	  	  	  <form id="frm3" name="frm3">
			      	  	  	  <input type="hidden" id="mcountNo" 	name="mcountNo"/>
                              <input type="hidden" id="useYn" 		name="useYn" 	value="Y"/>
				  		  	  <table>
				  		  		<col width="20%">
                        		<col width="80%">
			      		  		<tr>
	                          	  <td class="left">일련번호</td>
	                          	  <td><input type="text" id="Seq" name="Seq" style="width:25px;"/></td>
	                      		</tr>
	                      		<tr>
	                          	  <td class="left">법령부호</td>
	                          	  <td>
	                          	    <input type="text" id="lawCd" name="lawCd" style="width:25px;" readOnly/>
	                          	    <a href="javascript:fn_searchSys('CSOR_CFRM_TRGT_LWOR_CD')"><img src="../images/cps/hs_seach.png"></a>
	                          	  </td>
	                      		</tr>
	                      		<tr>
	                          	  <td class="left">사유부호</td>
	                          	  <td>
	                          	    <input type="text" id="notYogSayuCd" name="notYogSayuCd" style="width:20px;" readOnly/>
	                          	    <a href="javascript:fn_searchSys('REQ_NNOB_RCD')"><img src="../images/cps/hs_seach.png"></a>
	                          	  </td>
	                      		</tr>
	                      		<tr>
	                          	  <td class="left">기타사유</td>
	                          	  <td><input type="text" id="NotYogSayuEtc" name="NotYogSayuEtc" style="width:100%;"/></td>
	                      		</tr>
	                      	  </table>
	                      	  </form>
	                      	</div>
			              </div>
			            </div>
			  	      </div>
			  	      <div title="첨부문서" style="padding:10px;">
			  	        <div class="easyui-layout" data-options="fit:true">
			  	          <div data-options="region:'center',split:true" style="width:60%;box-sizing:border-box;border:0px">
			  	            <div class="normal_con01">
						  	  <table id="fileGrid" class="easyui-datagrid"></table>
							</div>
			  	          </div>
			              <div data-options="region:'east',split:true" style="width:40%;box-sizing:border-box;border:0px">
							<form id="frm2" name="frm2">
                        	<input type="hidden" id="FKeyMngNo"	name="FKeyMngNo">
							<input type="hidden" id="path" 		name="path" 		value="item">
							<input type="hidden" id="FTableNm" 	name="FTableNm" 	value="MAAA100">
							<input type="hidden" id="Gbn" 		name="Gbn" 			value="I">
							<input type="hidden" id="FileTitle" name="FileTitle" 	value="">
							<input type="hidden" id="FKey" 		name="FKey" 		value="0">
                        	<div id="fileuploader" style="width:150px">파일찾기</div>
                    		</form>
			              </div>
			            </div>
			  	      </div>
			  	      <div title="세율 및 수출입요령">
			  	        <!-- div class="normal_Button">
						  <a href="javascript:fn_hsData();">세율</a>
						  <a href="javascript:fn_hsData1();" id="btncheck1"></a>
						  <a href="javascript:fn_hsData2();" id="btncheck2"></a>
						  <a href="javascript:fn_hsData3();" id="btncheck3"></a>
						  <a href="javascript:fn_hsData4();" id="btncheck4"></a>
						</div>
		    	        <div class="hsnew_C02_table">
				  		  <table id="tabArea71">
				  		  	<col width="10%">
                        	<col width="10%">
                        	<col width="10%">
                        	<col width="10%">
                        	<col width="30%">
                        	<col width="30%">
			      		  	<tr>
	                          <td class="left">국가</td>
	                          <td>한국</td>
	                          <td class="left">해당년도</td>
	                          <td><div id="hsYear" name="hsYear"></div></td>
	                          <td class="left">관세</td>
	                          <td class="left">FTA협정</td>
	                      	</tr>
	                      	<tr>
	                          <td class="left">품목번호</td>
	                          <td id="hsnum"></td>
	                          <td class="left">단위(중량/수량)</td>
	                          <td id="unit"></td>
	                          <td rowspan="3" valign="top"><textarea type="text" id="aa" name="aa" class="input-sm" style="width:100%;height:70px" readOnly></textarea></td>
	                          <td rowspan="3" valign="top"><textarea type="text" id="bb" name="bb" class="input-sm" style="width:100%;height:70px" readOnly></textarea></td>
	                      	</tr>
	                      	<tr>
	                          <td class="left">품명</td>
	                          <td colspan="3" id="hsNmHan"></td>
	                      	</tr>
	                      	<tr>
	                          <td class="left">Description</td>
	                          <td colspan="3" id="hsNmEng"></td>
	                      	</tr>
	                      </table>
	                      <table id="tabArea72">
                        	<col width="100%"></col>
                        	<tr>
                              <td>
                                <textarea type="text" id="hsmate1" name="hsmate1" style="width:100%;height:120px" readOnly></textarea>
                              </td>
                        	</tr>
                    	  </table>
                    	  <table id="tabArea73">
                        	<col width="100%"></col>
                        	<tr>
                              <td>
                                <textarea type="text" id="hsmate2" name="hsmate2" style="width:100%;height:120px" readOnly></textarea>
                              </td>
                        	</tr>
                    	  </table>
                    	  <table id="tabArea74">
                        	<col width="100%"></col>
                        	<tr>
                              <td>
                                <textarea type="text" id="hsmate3" name="hsmate3" style="width:100%;height:120px" readOnly></textarea>
                              </td>
                        	</tr>
                    	  </table>
                    	  <table id="tabArea75">
                        	<col width="100%"></col>
                        	<tr>
                              <td>
                                <textarea type="text" id="hsmate4" name="hsmate4" style="width:100%;height:120px" readOnly></textarea>
                              </td>
                        	</tr>
                    	  </table>
	                  	</div-->
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