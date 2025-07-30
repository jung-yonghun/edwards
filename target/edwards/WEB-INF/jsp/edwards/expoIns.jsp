<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
    <title>Order 등록</title>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/cps/edwards/expoIns.js?20231227'/>"></script>
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
	  	          <input type="hidden" id="ID" 					name="ID" 					value="${sessionScope.ID}">
				  <input type="hidden" id="USERID" 				name="USERID" 				value="${sessionScope.USERID}">
				  <input type="hidden" id="KEY_ED_EXPT_ORDR" 	name="KEY_ED_EXPT_ORDR" 	value="${param.KEY_ED_EXPT_ORDR}">
				  <input type="hidden" id="EXPT_ORDR_MNG_NO" 	name="EXPT_ORDR_MNG_NO">
				  <input type="hidden" id="defaultDB" 			name="defaultDB"			value="ncustoms_ca">
				  <input type="hidden" id="Expo_suchulja_code" 	name="Expo_suchulja_code" 	value="000R"/>
				  <input type="hidden" id="Expo_SuchulSaupNo" 	name="Expo_SuchulSaupNo" 	value="3128112960"/>
				  <input type="hidden" id="Expo_whaju_code" 	name="Expo_whaju_code" 		value="000R"/>
				  <input type="hidden" id="Expo_trust_code" 	name="Expo_trust_code" 		value="000R"/>
				  <input type="hidden" id="Expo_trust_sangho" 	name="Expo_trust_sangho" 	value="에드워드코리아(주)"/>
				  <input type="hidden" id="Expo_daecode" 		name="Expo_daecode" 		value=""/>
				  <input type="hidden" id="Expo_daesangho" 		name="Expo_daesangho" 		value=""/>
				  <input type="hidden" id="GRP_COMP_CD" 		name="GRP_COMP_CD" 			value=""/>
				  <input type="hidden" id="PROC_STAT" 			name="PROC_STAT" 			value="08001"/>
				  <input type="hidden" id="DECL_CUSTOMS_CD" 	name="DECL_CUSTOMS_CD" 		value="001"/>
				  <input type="hidden" id="FTA_CD" 				name="FTA_CD"/>
				  <table>
			   	    <col width="12%">
                    <col width="38%">
                    <col width="12%">
                    <col width="38%">
                    <tr>
                      <td class="left">수출자 상호-코드</td>
                      <td>
                        <input type="text" id="Expo_suchulja_sangho" name="Expo_suchulja_sangho" style="width:80%" value="에드워드코리아(주)" readOnly/>
                        <input type="text" id="Expo_SuChulJa_Gbn" 	name="Expo_SuChulJa_Gbn" style="width:20px" readOnly/>
                        <a href="javascript:fn_searchSys('EXPPN_TPCD')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                      </td>
                      <td class="left" style="background-color:yellow">목적국</td>
                      <td>
                        <input type="text" id="Expo_MokJuk_Code" name="Expo_MokJuk_Code" style="width:30px"/>
                        <a href="javascript:fn_searchSys('CNTY_CD4')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                      </td>
                    </tr>
                    <tr>
                      <td class="left" style="background-color:yellow">협정명</td>
                      <td>
                        <select id="EX_FTA_CD" name="EX_FTA_CD" style="width:80px" onchange="changeFta();"></select>
                        <input type="text" id="FRGN_COMP_NM" name="FRGN_COMP_NM" style="width:60%" onclick="javascript:fn_commonNcomCode1('2','dGonggub')"/>
                        <!-- input type="text" id="EX_FTA_CD" name="EX_FTA_CD" 	style="width:30px"/>
                        <a href="javascript:fn_searchSys('TRRT_SIM_TPCD')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a-->
                      </td>
                      <td class="left" style="background-color:yellow">구매자 상호</td>
                      <td>
                        <input type="text" id="Expo_GuMaeJa_SangHo" name="Expo_GuMaeJa_SangHo" 	style="width:40%" readOnly/>
                        <input type="text" id="Expo_GuMaeJa_Code" 	name="Expo_GuMaeJa_Code" 	style="width:40%" readOnly/>
                        <a href="javascript:fn_commonNcomCode1('2','dGonggub')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                      </td>
                    </tr>
                    <tr>
                      <td class="left" style="background-color:yellow">Invoice No</td>
                      <td>
                        <input type="text" id="INV_NO1" name="INV_NO1" style="width:45%"/>
                        <input type="text" id="INV_NO2" name="INV_NO2" style="width:45%"/>
                      </td>
                      <td class="left">Invoice 발행일</td>
                      <td>
                        <input type="text" id="INV_DT" name="INV_DT" style="width:60px;cursor:pointer;text-align:center;" maxlength="8"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left" style="background-color:yellow">총중량/총포장갯수</td>
                      <td>
                        <input type="text" id="TOT_WT" name="TOT_WT"  style="width:50px;text-align:right;" value="0"/> /
                        <input type="text" id="PKG_QTY" name="PKG_QTY"  style="width:50px;text-align:right;" value="0"/>
                      </td>
                      <td class="left" style="background-color:yellow">인코텀즈/결제금액</td>
                      <td>
                        <input type="text" id="INCOTERMS" name="INCOTERMS" 	style="width:30px"/>
                        <a href="javascript:fn_searchSys('DLCN_CD2')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                        <input type="text" id="CUR_UNIT" name="CUR_UNIT" style="width:30px"/>
                        <a href="javascript:fn_searchSys('CURR_CD6')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                        <input type="text" id="Expo_GyelJe_Input" 	name="Expo_GyelJe_Input" 	style="width:100px;text-align:right;" value="0"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">제조자 상호</td>
                      <td>
                        <input type="text" id="Expo_whaju_sangho" 	name="Expo_whaju_sangho" style="width:70%" readOnly/>
                        <a href="javascript:fn_customerSearch('4','dDeal')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                      </td>
                      <td class="left">사업부</td>
                      <td>
                        <input type="text" id="OWN_GODS_CD" name="OWN_GODS_CD"  style="width:30%" readOnly/>
                        <input type="text" id="OWN_GODS_NM" name="OWN_GODS_NM" 	style="width:50%" readOnly/>
                        <a href="javascript:fn_vendorSearch()"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">세관-과</td>
                      <td>
                        <input type="text" id="Expo_segwan" name="Expo_segwan" 	style="width:30px"/>
                        <a href="javascript:fn_commonNcomCode('1','Bsegwan')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                        <input type="text" id="Expo_gwa" 	name="Expo_gwa" 	style="width:20px"/>
                        <a href="javascript:fn_commonNcomCode('1','Bgwa')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                      </td>
                      <td class="left">신고구분</td>
                      <td>
                        <input type="text" id="Expo_singo_gbn" name="Expo_singo_gbn" 	style="width:20px"/>
                        <a href="javascript:fn_searchSys('EXP_DCLR_TPCD')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">거래-종류</td>
                      <td>
                        <input type="text" id="Expo_gurae_gbn" name="Expo_gurae_gbn" 	style="width:30px"/>
                        <a href="javascript:fn_searchSys('EXP_DLNG_TPCD')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                        <input type="text" id="Expo_jong" 	name="Expo_jong" 	style="width:20px"/>
                        <a href="javascript:fn_searchSys('EXP_KCD')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                      </td>
                      <td class="left">결제방법-적재항</td>
                      <td>
                        <input type="text" id="Expo_gyelje" name="Expo_gyelje" 	style="width:20px"/>
                        <a href="javascript:fn_searchSys1('1','STLM_MCD')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                        <input type="text" id="Expo_HangGu_Code" 	name="Expo_HangGu_Code" 	style="width:100px"/>
                        <a href="javascript:fn_searchSys1('1','DMST_ARVL_CLRP_CD')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">운송형태</td>
                      <td>
                        <input type="text" id="Expo_UnSong_Type" name="Expo_UnSong_Type" 	style="width:20px"/>
                        <a href="javascript:fn_searchSys1('1','TRNP_METH_PCD')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                        <input type="text" id="Expo_UnSong_Box"  name="Expo_UnSong_Box" 	style="width:30px"/>
                        <a href="javascript:fn_searchSys1('1','TRNP_CNTAI_TPCD')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                      </td>
                      <td class="left">환급신청</td>
                      <td>
                        <input type="text" id="Expo_whan_sin" name="Expo_whan_sin" 	style="width:20px"/>
                        <a href="javascript:fn_searchSys('DRWB_APLC_TPCD')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">산업단지</td>
                      <td>
                        <input type="text" id="Expo_industry" name="Expo_industry" 	style="width:30px"/>
                        <a href="javascript:fn_searchSys('INES_CD')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                      </td>
                      <td class="left">간이환급</td>
                      <td>
                        <input type="text" id="Expo_whan_gan2" name="Expo_whan_gan2" 	style="width:20px"/>
                        <a href="javascript:fn_searchSys('AUTO_SIML_FXAMT_DRWB_RQST_CD')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">임시개청</td>
                      <td>
                        <input type="text" id="Expo_imsigae_yn" name="Expo_imsigae_yn" 	style="width:20px"/>
                        <a href="javascript:fn_searchSys('TEMP_OPOC_TPCD')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                      </td>
                      <td class="left">검사방법</td>
                      <td>
                        <input type="text" id="expo_how_check" name="expo_how_check" 	style="width:20px"/>
                        <a href="javascript:fn_searchSys('EXP_INSC_MCD')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">컨테이너</td>
                      <td>
                        <input type="text" id="Expo_Jukip_YN" name="Expo_Jukip_YN" 	style="width:20px"/>
                        <a href="javascript:fn_searchSys('CNTR_TPCD')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                      </td>
                      <td class="left">물품상태</td>
                      <td>
                        <input type="text" id="Expo_Old_Yn" name="Expo_Old_Yn" 	style="width:20px"/>
                        <a href="javascript:fn_searchSys('EXP_CMDT_STCD')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">출항일</td>
                      <td>
                        <input type="text" id="expo_preStartDt" name="expo_preStartDt" style="width:60px;cursor:pointer;text-align:center;" maxlength="8"/>
                      </td>
                      <td class="left">장치장코드</td>
                      <td>
                        <input type="text" id="WH_CD" name="WH_CD" style="width:30%"/>
                        <a href="javascript:fn_commonNcomCode('1','DJANGCHI')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">운임료</td>
                      <td>
                        <input type="text" id="Expo_Fre_money" name="Expo_Fre_money" 	style="width:30px"/>
                        <a href="javascript:fn_searchSys('CURR_CD7')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                        <input type="text" id="Expo_Fre_Input" 	name="Expo_Fre_Input" 	style="width:100px;text-align:right;" value="0"/>
                      </td>
                      <td class="left">보험료</td>
                      <td>
                        <input type="text" id="Expo_Ins_money" name="Expo_Ins_money" 	style="width:30px"/>
                        <a href="javascript:fn_searchSys('CURR_CD8')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                        <input type="text" id="Expo_Ins_Input" 	name="Expo_Ins_Input" 	style="width:100px;text-align:right;" value="0"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">Plant</td>
                      <td>
                        <input type="text" id="Plant" 	name="Plant" 	style="width:50%;"/>
                      </td>
                      <td class="left">Shipping Mode</td>
                      <td>
                        <input type="text" id="ShippingMode" 	name="ShippingMode"	style="width:50%;"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">Name of Ship to</td>
                      <td>
                        <input type="text" id="NameOfShipto" 	name="NameOfShipto"	style="width:50%;"/>
                      </td>
                      <td class="left">포워더</td>
                      <td>
                        <input type="text" id="FORWARD_NM" 	name="FORWARD_NM"	style="width:50%;"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">재수입/재수출</td>
                      <td>
                        <select id="ReImExGbn" name="ReImExGbn" style="width:80px">
                          <option value="">없음</option>
                          <option value="1">재수입</option>
                          <option value="2">재수출</option>
                        </select>
                      </td>
                      <td></td>
                      <td></td>
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