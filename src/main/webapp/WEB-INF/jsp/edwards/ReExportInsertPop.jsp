<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
    <title>재수출 추가등록</title>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/cps/edwards/ReExportInsertPop.js?20231227'/>"></script>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="easyui-layout" style="width:600px;height:410px;">
		      <div data-options="region:'center'" style="box-sizing:border-box;border:0px;">
				<div class="normal_Button">
				  <a href="javascript:fn_saveAction();">등록</a>
				  <a href="javascript:window.close();">닫기</a>
				</div>
				<div class="hsnew_C02_table">
	  	          <form id="frm1" name="frm1">
	  	          <input type="hidden" id="ID" 					  name="ID" 			value="${sessionScope.ID}">
				  <input type="hidden" id="USERID" 				  name="USERID" 		value="${sessionScope.USERID}">
				  <input type="hidden" id="USERGRADE" 			  name="USERGRADE" 		value="${sessionScope.USERGRADE}">
				  <input type="hidden" id="USERGRADEB" 			  name="USERGRADEB" 	value="${sessionScope.USERGRADEB}">
				  <input type="hidden" id="_defaultDB" 			  name="_defaultDB" 	value="${sessionScope.DEFAULTDB}">
				  <input type="hidden" id="KEY_ED_REEXPT_MASTER"  name="KEY_ED_REEXPT_MASTER" value="${param.KEY_ED_REEXPT_MASTER}">
				  <input type="hidden" id="IMPT_ORDR_MNG_NO" 	  name="IMPT_ORDR_MNG_NO">
				  <input type="hidden" id="IMPT_INV_SEQNO" 		  name="IMPT_INV_SEQNO">
				  <input type="hidden" id="EXPO_KEY" 		  	  name="EXPO_KEY">
				  <input type="hidden" id="IMPO_KEY" 		  	  name="IMPO_KEY">
				  <input type="hidden" id="EXPT_ORDR_MNG_NO" 	  name="EXPT_ORDR_MNG_NO">
				  <input type="hidden" id="EXPT_INV_SEQNO" 		  name="EXPT_INV_SEQNO">
				  <input type="hidden" id="EXPT_QTY_UNIT" 		  name="EXPT_QTY_UNIT">
				  <input type="hidden" id="IMPT_QTY_UNIT" 		  name="IMPT_QTY_UNIT">
				  <input type="hidden" id="REEX_END_DT_LAST" 	  name="REEX_END_DT_LAST">
				  <input type="hidden" id="useYn" 		  		  name="useYn">
				  <input type="hidden" id="confirmChk" 		  	  name="confirmChk">
				  <table>
			   	    <col width="15%">
                    <col width="35%">
                    <col width="15%">
                    <col width="35%">
                    <tr>
                      <td class="left">B/L No</td>
                      <td>
                        <input type="text" id="BL_NO" name="BL_NO" style="background-color:#e2e2e2" readOnly/>
                      </td>
                      <td class="left">수입신고번호</td>
                      <td>
                        <input type="text" id="IMPT_DECL_NO" name="IMPT_DECL_NO" style="background-color:#e2e2e2" readOnly/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">수입 란</td>
                      <td>
                        <input type="text" id="IMPT_LAN" name="IMPT_LAN" style="width:20%;background-color:#e2e2e2" readOnly/>
                      </td>
                      <td class="left">수입 행</td>
                      <td>
                        <input type="text" id="IMPT_HNG" name="IMPT_HNG" style="width:20%;background-color:#e2e2e2" readOnly/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">수입수리일</td>
                      <td>
                        <input type="text" id="IMPT_CMPL_DT" name="IMPT_CMPL_DT" style="width:30%;background-color:#e2e2e2" readOnly/>
                      </td>
                      <td class="left">Serial No</td>
                      <td>
                        <input type="text" id="SERIAL_NO" name="SERIAL_NO" style="background-color:#e2e2e2" readOnly/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">수입량</td>
                      <td>
                        <input type="text" id="IMPT_QTY" name="IMPT_QTY" style="width:20%;background-color:#e2e2e2" readOnly/>
                      </td>
                      <td class="left">수입거래구분</td>
                      <td>
                        <input type="text" id="IMPT_GURAE_GBN" name="IMPT_GURAE_GBN" style="width:20%;background-color:#e2e2e2" readOnly/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">Item</td>
                      <td>
                        <input type="text" id="PROD_CD" name="PROD_CD" style="background-color:#e2e2e2" readOnly/>
                      </td>
                      <td class="left">Description</td>
                      <td>
                        <input type="text" id="PROD_NM" name="PROD_NM" style="background-color:#e2e2e2" readOnly/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">So번호</td>
                      <td>
                        <input type="text" id="SoNo" name="SoNo" style="background-color:#e2e2e2" readOnly/>
                      </td>
                      <td class="left">End User</td>
                      <td>
                        <input type="text" id="EndUserName" name="EndUserName" style="background-color:#e2e2e2" readOnly/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">면제번호</td>
                      <td>
                        <input type="text" id="ExEmNo" name="ExEmNo" style="background-color:#e2e2e2" readOnly/>
                      </td>
                      <td class="left">잔량</td>
                      <td>
                        <input type="text" id="RMID_QTY" name="RMID_QTY" style="width:20%;background-color:#e2e2e2" readOnly/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">재수출만료일</td>
                      <td>
                        <input type="text" id="REEX_END_DT" name="REEX_END_DT" style="width:30%;"/>
                      </td>
                      <td class="left">이행보고일</td>
                      <td>
                        <input type="text" id="EHEANG_END_DT" name="EHEANG_END_DT" style="width:30%;"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">용도외사용승일일</td>
                      <td>
                        <input type="text" id="YONGDO_DT" name="YONGDO_DT" style="width:30%;"/>
                      </td>
                      <td class="left">기한연장차수</td>
                      <td>
                        <input type="text" id="DELAY_SEQ" name="DELAY_SEQ" style="width:20%;"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">Invoice No</td>
                      <td>
                        <input type="text" id="INV_NO" name="INV_NO"/>
                      </td>
                      <td class="left">수출신고번호</td>
                      <td>
                        <input type="text" id="EXPT_DECL_NO" name="EXPT_DECL_NO"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">수출 란</td>
                      <td>
                        <input type="text" id="EXPT_LAN" name="EXPT_LAN" style="width:20%"/>
                      </td>
                      <td class="left">수출 행</td>
                      <td>
                        <input type="text" id="EXPT_HNG" name="EXPT_HNG" style="width:20%"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">수출수리일</td>
                      <td>
                        <input type="text" id="EXPT_CMPL_DT" name="EXPT_CMPL_DT" style="width:30%"/>
                      </td>
                      <td class="left">수출량</td>
                      <td>
                        <input type="text" id="EXPT_QTY" name="EXPT_QTY" style="width:20%"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">수출거래구분</td>
                      <td>
                        <input type="text" id="EXPT_GURAE_GBN" name="EXPT_GURAE_GBN" style="width:20%"/>
                      </td>
                      <td class="left">Name of Shipto</td>
                      <td>
                        <input type="text" id="NameOfShipto" name="NameOfShipto"/>
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