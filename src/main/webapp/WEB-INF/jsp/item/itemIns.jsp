<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
    <title>Item 등록</title>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/cps/item/itemIns.js'/>"></script>
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
				  <input type="hidden" id="Mend_date" 		name="Mend_date" 	value="99991231">
				  <input type="hidden" id="hsRegUserComTel" name="hsRegUserComTel">
				  <table>
			   	    <col width="15%">
                    <col width="35%">
                    <col width="15%">
                    <col width="35%">
                    <tr>
                      <td class="left">상호</td>
                      <td>
                        <input type="text" id="hsRegUserComName" name="hsRegUserComName" style="width:90%" readOnly/>
                        <a href="javascript:fn_customerSearch()"><img src="../images/cps/hs_seach.png" id="ddealSearch" style="display:none"></a>
                      </td>
                      <td class="left">사업자번호</td>
                      <td>
                        <input type="text" id="hsRegUserComTaxNum" name="hsRegUserComTaxNum" readOnly/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">자재코드</td>
                      <td>
                        <input type="text" id="Mmodel_code" name="Mmodel_code"/>
                        <a href="javascript:fn_ItemCheck();" class="easyui-linkbutton"><font style="font-size:10px;">중복확인</font></a>
                        <input type="hidden" id="hdnCheckYn" name="hdnCheckYn"/>
                      </td>
                      <td class="left">수량단위</td>
                      <td>
                        <input type="text" id="Mqty_ut" name="Mqty_ut" style="width:30px"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">세번부호</td>
                      <td>
                        <input type="text" id="Mhs_code" name="Mhs_code" style="width:100px" onkeydown="return fn_onlyNumber(event)"/>
                        <input type="text" id="Mhs_kind" name="Mhs_kind" style="width:40px"/>
                        <input type="text" id="Mhs_rate" name="Mhs_rate" style="width:30px;text-align:right" onkeydown="return fn_onlyNumber(event)"/> %
                        <a href="javascript:fn_hsSearch()"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                      </td>
                      <td class="left">상대국세번</td>
                      <td>
                        <input type="text" id="Mattached3" name="Mattached3" style="width:100px" onkeydown="return fn_onlyNumber(event)"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">표준품명</td>
                      <td>
                        <input type="text" id="Mstd_goods" name="Mstd_goods" style="width:100%"/>
                      </td>
                      <td class="left">거래품명</td>
                      <td>
                        <input type="text" id="Mger_goods" name="Mger_goods" style="width:100%"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">원산지</td>
                      <td>
                        <input type="text" id="Morigin1" name="Morigin1" style="width:30px" readOnly onclick="javascript:fn_searchSys('CNTY_CD')"/>
                        <a href="javascript:fn_searchSys('CNTY_CD')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                      </td>
                      <td class="left">통화/단가</td>
                      <td>
                        <input type="text" id="Munitprice_current" name="Munitprice_current" style="width:40px" readOnly onclick="javascript:fn_searchSys('CURR_CD')"/>
                        <a href="javascript:fn_searchSys('CURR_CD')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                        <input type="text" id="Munitprice" name="Munitprice" style="width:100px;text-align:right" onkeydown="return fn_onlyNumber(event)"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">규격</td>
                      <td colspan="3">
                        <input type="text" id="Mmodel_1" name="Mmodel_1" style="width:31%"/>
                        <input type="text" id="Mmodel_2" name="Mmodel_2" style="width:31%"/>
                        <input type="text" id="Mmodel_3" name="Mmodel_3" style="width:31%"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">성분</td>
                      <td colspan="3">
                        <input type="text" id="Mingredient_1" name="Mingredient_1" style="width:31%"/>
                        <input type="text" id="Mingredient_2" name="Mingredient_2" style="width:31%"/>
                        <input type="text" id="Mingredient_3" name="Mingredient_3" style="width:31%"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">FTA</td>
                      <td>
                        <select id="fta_yn" name="fta_yn" style="width:90px">
                          <option value="N">N (비대상)</option>
                          <option value="Y">Y (대상)</option>
                        </select>
                        <input type="text" id="fta_text" name="fta_text" style="width:150px"/>
                      </td>
                      <td class="left">가산세</td>
                      <td>
                        <select id="Mprovisional" name="Mprovisional" style="width:90px">
                          <option value="N">N (비대상)</option>
                          <option value="Y">Y (대상)</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">요건</td>
                      <td>
                        <select id="Myog_flag" name="Myog_flag" style="width:90px">
                          <option value="N">N (비대상)</option>
                          <option value="Y">Y (대상)</option>
                        </select>
                        <input type="text" id="Myog_ok_no" name="Myog_ok_no" style="width:150px"/>
                      </td>
                      <td class="left">유무상</td>
                      <td>
                        <select id="sample_yn" name="sample_yn" style="width:80px">
                          <option value="1">1 (유상)</option>
                          <option value="2">2 (무상)</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">통관요령</td>
                      <td colspan="3">
                      	<textarea id="Mremark1" name="Mremark1" rows="5"></textarea>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">제품정보</td>
                      <td colspan="3">
                      	<textarea id="Mremark2" name="Mremark2" rows="5"></textarea>
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