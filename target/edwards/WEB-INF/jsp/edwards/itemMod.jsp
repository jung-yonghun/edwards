<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
    <title>Item 수정</title>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/cps/edwards/itemMod.js?20231227'/>"></script>
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
	  	          <input type="hidden" id="ID" 				name="ID" 			value="${sessionScope.ID}">
				  <input type="hidden" id="USERID" 			name="USERID" 		value="${sessionScope.USERID}">
				  <input type="hidden" id="USERGRADE" 		name="USERGRADE" 	value="${sessionScope.USERGRADE}">
				  <input type="hidden" id="USERGRADEB" 		name="USERGRADEB" 	value="${sessionScope.USERGRADEB}">
				  <input type="hidden" id="_defaultDB" 		name="_defaultDB" 	value="${sessionScope.DEFAULTDB}">
				  <input type="hidden" id="Mcount_no" 		name="Mcount_no" 	value="${param.Mcount_no}">
				  <table>
			   	    <col width="15%">
                    <col width="35%">
                    <col width="15%">
                    <col width="35%">
                    <tr>
                      <td class="left">화주</td>
                      <td>
                        <input type="text" id="hsRegUserComName" name="hsRegUserComName" style="width:90%" readOnly/>
                      </td>
                      <td class="left">사업자번호</td>
                      <td>
                        <input type="text" id="hsRegUserComTaxNum" name="hsRegUserComTaxNum" readOnly/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">자재코드</td>
                      <td>
                        <input type="text" id="Mmodel_code" name="Mmodel_code" readOnly/>
                      </td>
                      <td class="left">규격</td>
                      <td>
                        <input type="text" id="Mmodel" name="Mmodel" style="width:100%" maxlength="180"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">세번부호</td>
                      <td>
                        <input type="hidden" id="Mhs_code_old" name="Mhs_code_old"/>
                        <input type="hidden" id="Mhs_kind_old" name="Mhs_kind_old"/>
                        <input type="text" id="Mhs_code" name="Mhs_code" style="width:100px" onkeydown="return fn_onlyNumber(event)"/>
                        <input type="text" id="Mhs_kind" name="Mhs_kind" style="width:40px"/>
                        <input type="text" id="Mhs_rate" name="Mhs_rate" style="width:30px;text-align:right" onkeydown="return fn_onlyNumber(event)"/> %
                        <a href="javascript:fn_hsSearch()"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                      </td>
                      <td class="left">수량단위</td>
                      <td>
                        <input type="hidden" id="Mqty_ut_old" name="Mqty_ut_old"/>
                        <input type="text" id="Mqty_ut" name="Mqty_ut" style="width:30px" maxlength="3"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">표준품명</td>
                      <td>
                        <input type="text" id="Mstd_goods" name="Mstd_goods" style="width:100%" maxlength="50"/>
                      </td>
                      <td class="left">원산지</td>
                      <td>
                        <input type="hidden" id="Morigin1_old" name="Morigin1_old"/>
                        <input type="text" id="Morigin1" name="Morigin1" style="width:30px" readOnly onclick="javascript:fn_searchSys('CNTY_CD7')"/>
                        <a href="javascript:fn_searchSys('CNTY_CD7')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">Vendor 코드/명</td>
                      <td>
                        <input type="text" id="MmakerCD" name="MmakerCD" style="width:60px" onclick="javascript:fn_searchVendor()"/>
                        <a href="javascript:fn_searchVendor()"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                        <input type="text" id="Mshipper" name="Mshipper" style="width:150px"/>
                      </td>
                      <td class="left">개별환급대상</td>
                      <td>
                        <input type="hidden" id="RefundYN_old" name="RefundYN_old"/>
                        <select id="RefundYN" name="RefundYN" style="width:50px">
                          <option value="Y">Y</option>
                          <option value="N">N</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">원상태수출대상</td>
                      <td>
                        <input type="hidden" id="OrigExpYN_old" name="OrigExpYN_old"/>
                        <select id="OrigExpYN" name="OrigExpYN" style="width:50px">
                          <option value="Y">Y</option>
                          <option value="N">N</option>
                        </select>
                      </td>
                      <td class="left">사용여부</td>
                      <td>
                        <select id="useYn" name="useYn" style="width:50px">
                          <option value="X">N</option>
                          <option value="Y">Y</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">비고</td>
                      <td colspan="3">
                      	<textarea id="Mremark1" name="Mremark1" rows="5"></textarea>
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