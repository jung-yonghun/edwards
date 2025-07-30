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
	<script type="text/javascript" src="<c:url value='/js/cps/edwards/expoMaster.js?250321'/>"></script>
	<style type="text/css">
	  .datagrid-footer .datagrid-row{
	    background: #ffdee1;
	  }
	</style>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="container">
			  <div class="easyui-layout" id="invoiceLayout1" style="width:100%;height:735px">
			    <div data-options="region:'north',split:true" style="width:100%;height:360px;box-sizing:border-box;border:0px">
			    <div class="easyui-layout" id="invoiceLayout2" style="width:100%;height:340px">
		      	<div data-options="region:'center'" style="width:100%;box-sizing:border-box;border:0px">
		      	<input type="hidden" id="taxNum" 	name="taxNum" 		value="${sessionScope.TAXNO}">
				  <div class="normal_Top">
				  	<table width="100%">
				  	  <col width="07%" />
				  	  <col width="19%" />
				  	  <col width="01%" />
				  	  <col width="07%" />
				  	  <col width="19%" />
				  	  <col width="01%" />
				  	  <col width="07%" />
				  	  <col width="15%" />
				  	  <col width="01%" />
				  	  <col width="06%" />
				  	  <col width="17%" />
					  <tr height="23px">
					  	<td style="vertical-align:baseline">
					  	  <select id="NOCHK" name="NOCHK" style="width:100px;height:23px">
                            <option value="Invoice">Invoice번호</option>
                            <option value="Singo">신고번호</option>
                          </select>
					  	</td>
					  	<td style="vertical-align:baseline"><input type="text" id="NODATA" name="NODATA" onkeypress="keyDown()"/></td>
					  	<td></td>
					  	<td style="vertical-align:baseline">
					  	  <select id="MANCHK" name="MANCHK" style="width:100px;">
                            <option value="Hwaju">화주담당자</option>
                            <option value="Singo">신고담당자</option>
                          </select>
					  	</td>
					  	<td style="vertical-align:baseline"><input type="text" id="MANDATA" name="MANDATA" onkeypress="keyDown()"/></td>
					  	<td></td>
					  	<td style="vertical-align:baseline">
					  	  <select id="DAYCHK" name="DAYCHK" style="width:100px;">
                            <option value="Order">Order일자</option>
                            <option value="Suri">수리일자</option>
                            <option value="Request">요청일자</option>
                            <option value="Confirm">확정일자</option>
                            <option value="Mconfirm">내역확정일자</option>
                          </select>
					  	</td>
					  	<td style="vertical-align:baseline">
					  	  <input type="text" id="FROM_DT" name="FROM_DT" onkeypress="keyDown()" style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/> ~
					  	  <input type="text" id="TO_DT" name="TO_DT" onkeypress="keyDown()" style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/>
					  	</td>
					  	<td></td>
					  	<td>진행상태</td>
					  	<td style="vertical-align:baseline">
                            <select id="PROC_STAT1" name="PROC_STAT1" style="width:80px;">
                              <!-- option value="other">미완료</option>
                              <option value="08001">준비</option>
                              <option value="08011">작성</option-->
                              <option value="08012" selected>요청</option>
                              <option value="08013">확정</option>
                              <option value="08003">신고완료</option>
                              <option value="" selected>전체</option>
                            </select>
					  	</td>
					  </tr>
				  	</table>
				  </div>
				  <div class="normal_Button">
				  	<a href="javascript:fn_searchAction();">조회</a>
				  	<a href="javascript:fn_insertAction();">등록</a>
				  	<a href="javascript:fn_updateAction();">수정</a>
				  	<a href="javascript:fn_deleteAction();">삭제</a>
				  	<a href="javascript:fn_searchExcel();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
				  	<a href="javascript:fn_confirmAction();">EKL Confirm</a>
				  	<a href="javascript:fn_confirmCancelAction();">Confirm 취소</a>
				  	<a href="#" onclick="$('#dlg').dialog('open')">Outlook Tip</a>
				  	<a href="javascript:fn_printAction1();" style="background-color:#ebf9ff">Invoice내역 확인서 출력</a>
				  	<a href="javascript:fn_printAction();" style="background-color:#ebf9ff">원상태수출 수입내역 출력</a>
				  	<a href="javascript:fn_printAction2();" style="background-color:#ebf9ff">수출 신고정보 내역 확인서 출력</a>
				  	<a href="javascript:fn_heightAction1();fn_heightAction1();">↧</a>
					<a href="javascript:fn_heightReAction1();fn_heightReAction1();">↥</a>
				  </div>
				  <div id="dlg" class="easyui-dialog" title="<font color='black'>Outlook 셋팅 TIP</font>" data-options="closed:true" style="width:400px;height:150px;padding:10px;background-color:#f3fff9">
        			Windows의 Outlook 메일 기본 셋팅<br><br>
        			1. 제어판 - 기본 프로그램 - 기본 프로그램 설정<br>
        			2. Microsoft Outlook 선택 - 하단 이 프로그램에 대한 기본값 선택<br>
        			3. MAILTO 체크박스 선택 - 저장
        		  </div>
				  <div class="normal_con01">
				  	<table id="masterGrid"></table>
				  </div>
				  <div class="normal_con01" style="display:none">
				  	<table id="excelGrid"></table>
				  </div>
			  	</div>
			  	</div>
			  	</div>
			  	<div data-options="region:'center',split:true" style="width:100%;box-sizing:border-box;border:0px">
			  	<div class="easyui-tabs" id="tabs" data-options="fit:true,plain:true" style="height:360px;">
			  	  <div title="Order정보">
			  	    <div class="main02">
				    <div class="main02_con">
	    	        <div class="main02_box01" style="width:100%;height:300px;">
	    	          <div class="right">
		      	  	  <form id="insertForm" name="insertForm">
			  		  <table>
			  		  	<col width="10%">
                       	<col width="24%">
                       	<col width="10%">
                       	<col width="23%">
                       	<col width="10%">
                      	<col width="23%">
		      		  	<tr>
                          <th>담당자</th>
                          <td class="tal"><input type="text" id="OWN_GODS_DIVS_MAN_NM" name="OWN_GODS_DIVS_MAN_NM" style="width:50%;" readOnly/></td>
                          <th>통관담당자</th>
                          <td class="tal"><input type="text" id="DECL_DIVS_MAN_NM" name="DECL_DIVS_MAN_NM" style="width:50%;" readOnly/></td>
                          <th style="border-right:1px solid #dcdcdc;">Order번호</th>
                          <td class="tal"><input type="text" id="EXPT_ORDR_MNG_NO" name="EXPT_ORDR_MNG_NO" style="width:50%;" readOnly/></td>
                      	</tr>
                      	<tr>
                          <th>사업부</th>
                          <td class="tal">
                            <input type="text" id="OWN_GODS_CD" name="OWN_GODS_CD" style="width:25%;" readOnly/>
                            <input type="text" id="OWN_GODS_NM" name="OWN_GODS_NM" style="width:70%;" readOnly/>
                          </td>
                          <th>장치장코드</th>
                          <td class="tal"><input type="text" id="WH_CD" name="WH_CD" style="width:30%;" readOnly/></td>
                          <th style="border-right:1px solid #dcdcdc;">Order일자</th>
                          <td class="tal"><input type="text" id="ORDR_DT" name="ORDR_DT" style="width:30%;" readOnly/></td>
                      	</tr>
                      	<tr>
                          <th>Invoice번호1/2</th>
                          <td class="tal">
                            <input type="text" id="INV_NO1" name="INV_NO1" style="width:45%;" readOnly/>
                            <input type="text" id="INV_NO2" name="INV_NO2" style="width:45%;" readOnly/>
                          </td>
                          <th>총포장갯수</th>
                          <td class="tal"><input type="text" id="PKG_QTY" name="PKG_QTY" style="width:20%;text-align:right;" readOnly/></td>
                          <th style="border-right:1px solid #dcdcdc;">EKL Request</th>
                          <td class="tal"><input type="text" id="ITEM_REQ_DTTM" name="ITEM_REQ_DTTM" style="width:40%;" readOnly/></td>
                      	</tr>
                      	<tr>
                          <th>Invoice발행일</th>
                          <td class="tal"><input type="text" id="INV_DT" name="INV_DT" style="width:30%;" readOnly/></td>
                          <th>총중량</th>
                          <td class="tal"><input type="text" id="TOT_WT" name="TOT_WT" style="width:20%;text-align:right;" readOnly/></td>
                          <th style="border-right:1px solid #dcdcdc;">EKL Confirm</th>
                          <td class="tal"><input type="text" id="ITEM_FIX_DTTM" name="ITEM_FIX_DTTM" style="width:40%;" readOnly/></td>
                      	</tr>
                      	<tr>
                          <th>협정명</th>
                          <td class="tal">
                            <input type="text" id="EX_FTA_CD" name="EX_FTA_CD" style="width:20%;" readOnly/>
                            <input type="text" id="FRGN_COMP_NM" name="FRGN_COMP_NM" style="width:40%;" readOnly/>
                          </td>
                          <th>인코텀즈</th>
                          <td class="tal"><input type="text" id="INCOTERMS" name="INCOTERMS" style="width:20%;" readOnly/></td>
                          <th style="border-right:1px solid #dcdcdc;">내역확정일시</th>
                          <td class="tal"><input type="text" id="DECL_FIX_DTTM" name="DECL_FIX_DTTM" style="width:40%;" readOnly/></td>
                      	</tr>
                      	<tr>
                          <th>목적국</th>
                          <td class="tal"><input type="text" id="OBJ_NAT" name="OBJ_NAT" style="width:20%;" readOnly/></td>
                          <th>포워더</th>
                          <td class="tal"><input type="text" id="FORWARD_NM" name="FORWARD_NM" style="width:50%;" readOnly/></td>
                          <th style="border-right:1px solid #dcdcdc;">수출신고번호</th>
                          <td class="tal"><input type="text" id="EXPT_DECL_NO" name="EXPT_DECL_NO" style="width:30%;" readOnly/></td>
                      	</tr>
                      	<tr>
                          <th>통화단위</th>
                          <td class="tal"><input type="text" id="CUR_UNIT" name="CUR_UNIT" style="width:20%;" readOnly/></td>
                          <th>Plant</th>
                          <td class="tal"><input type="text" id="Plant" name="Plant" style="width:20%;" readOnly/></td>
                          <th style="border-right:1px solid #dcdcdc;">수출수리일</th>
                          <td class="tal"><input type="text" id="DECL_CMPL_DTTM" name="DECL_CMPL_DTTM" style="width:30%;" readOnly/></td>
                      	</tr>
                      	<tr>
                          <th>Shipping Mode</th>
                          <td class="tal"><input type="text" id="ShippingMode" name="ShippingMode" style="width:20%;" readOnly/></td>
                          <th>Name of Ship to</th>
                          <td class="tal"><input type="text" id="NameOfShipto" name="NameOfShipto" style="width:50%;" readOnly/></td>
                          <th style="border-right:1px solid #dcdcdc;">구매자상호</th>
                          <td class="tal">
                            <input type="text" id="Expo_GuMaeJa_SangHo" name="Expo_GuMaeJa_SangHo" style="width:45%;" readOnly/>
                            <input type="text" id="Expo_GuMaeJa_Code" name="Expo_GuMaeJa_Code" style="width:45%;" readOnly/>
                          </td>
                      	</tr>
                      	<tr>
                          <th>재수입/재수출</td>
                          <td class="tal">재수입 <input type="checkbox" id="im_check" name="im_check" disabled/> 재수출 <input type="checkbox" id="ex_check" name="ex_check" disabled/></td>
                          <td class="tal" colspan="4"></td>
                      	</tr>
                      </table>
                      </form>
                      </div>
                  	</div>
                  	</div>
                  	</div>
	    	      </div>
		    	  <div title="Invoice정보" style="padding-left:10px;padding-right:10px;height:330px">
				    <div class="easyui-layout" id="invoiceLayout" style="width:100%;height:330px">
				    <div data-options="region:'east',split:true" style="width:40%;box-sizing:border-box;border:0px">
					  <div class="normal_Button">
						<a href="javascript:fn_searchExcel4();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
						<a href="javascript:fn_addAction();">추가</a>
						<!-- a href="javascript:fn_delAction();">삭제</a-->
					  </div>
					  <div class="normal_con01">
					    <table id="detailGrid3"></table>
					  </div>
					  <div class="normal_con01" style="display:none">
					  	<table id="excelGrid4"></table>
					  </div>
				  	</div>
			      	<div data-options="region:'center'" style="width:60%;box-sizing:border-box;border:0px">
					  <div class="normal_Button" style="margin-left:0px">
					    <a href="javascript:fn_insertInvAction();">등록</a>
				  	    <a href="javascript:fn_updateInvAction();">수정</a>
				  	    <a href="javascript:fn_deleteInvAction();">삭제</a>
					  	<!--a href="javascript:fn_deleteAction1();">삭제</a-->
					  	<a href="javascript:fn_searchExcel1();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
					  	<a href="javascript:fn_autoAction();">원상태 수량계산</a>
					  	<!-- a href="javascript:fn_checkAction();">동일아이템/원산지 상이건 체크</a-->
					  	<a href="javascript:fn_cancelAction();">원상태 취소</a>
					  	<!-- a href="javascript:fn_cancelAction1();">전체취소</a-->
					  	<!-- a href="#">원상태상이건</a-->
					  	<a href="javascript:fn_heightAction();">⇲</a>
					  	<a href="javascript:fn_heightReAction();">⇱</a>
					  	<a href="javascript:fn_autoImAction();">자동 S/N지정</a>
					  	<a href="javascript:fn_imAction();">수입 S/N검색</a>
					  	<a href="javascript:fn_imCancelAction();">S/N 취소</a>
					  	<!-- a href="javascript:fn_imCancelAllAction();">S/N 전체 취소</a-->
					  	<a href="javascript:fn_imAction1();">수입 면제번호검색</a>
					  	<a href="javascript:fn_imCancelAction1();">면제번호 취소</a>
					  </div>
					  <div class="normal_con01">
					  	<table id="detailGrid"></table>
					  </div>
					  <div class="normal_con01" style="display:none">
					  	<table id="excelGrid1"></table>
					  </div>
				  	</div>
				  	</div>
				  </div>
				  <div title="신고정보">
				    <form id="addForm1" name="addForm1">
			  	    <input type="hidden" id="ID" 				name="ID" 				value="${sessionScope.ID}">
			  	    <input type="hidden" id="EXPT_ORDR_MNG_NO" 	name="EXPT_ORDR_MNG_NO">
			  	    <input type="hidden" id="LAN" 				name="LAN">
			  	    <input type="hidden" id="EXPT_INV_SEQNO" 	name="EXPT_INV_SEQNO">
			  	    </form>
				    <div class="easyui-layout" style="width:100%;height:330px">
				  	<div data-options="region:'east',split:true" style="width:40%;box-sizing:border-box;border:0px">
					  <div class="normal_Button">
						<a href="javascript:fn_searchExcel3();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
					  </div>
					  <div class="normal_con01">
					    <table id="detailGrid2"></table>
					  </div>
					  <div class="normal_con01" style="display:none">
					  	<table id="excelGrid3"></table>
					  </div>
				  	</div>
			      	<div data-options="region:'center'" style="width:60%;box-sizing:border-box;border:0px">
					  <div class="normal_Button">
					  	<a href="javascript:fn_searchExcel2();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
					  </div>
					  <div class="normal_con01">
					  	<table id="detailGrid1"></table>
					  </div>
					  <div class="normal_con01" style="display:none">
					  	<table id="excelGrid2"></table>
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
	  </div>
	</div>
  </body>
</html>