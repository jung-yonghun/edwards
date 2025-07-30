<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
    <title>Order 등록</title>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/cps/edwards/impoIns.js?20231227'/>"></script>
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
				  <input type="hidden" id="KEY_ED_IMPT_ORDR" 	name="KEY_ED_IMPT_ORDR" 	value="${param.KEY_ED_IMPT_ORDR}">
				  <input type="hidden" id="defaultDB" 			name="defaultDB"			value="ncustoms_ca">
				  <input type="hidden" id="IMPT_ORDR_MNG_NO" 	name="IMPT_ORDR_MNG_NO"/>
				  <input type="hidden" id="Impo_suipja_code" 	name="Impo_suipja_code" 	value="000R"/>
				  <input type="hidden" id="Impo_SuipSaupNo" 	name="Impo_SuipSaupNo" 		value="3128112960"/>
				  <input type="hidden" id="GRP_COMP_CD" 		name="GRP_COMP_CD" 			value=""/>
				  <input type="hidden" id="PROC_STAT" 			name="PROC_STAT" 			value="08001"/>
				  <input type="hidden" id="DECL_CUSTOMS_CD" 	name="DECL_CUSTOMS_CD" 		value="001"/>
				  <input type="hidden" id="DECL_CUSTOMS_NM" 	name="DECL_CUSTOMS_NM" 		value="세인관세법인"/>
				  <input type="hidden" id="Impo_chk_dg" 		name="Impo_chk_dg"/>
				  <input type="hidden" id="Impo_file_no1" 		name="Impo_file_no1"/>
				  <input type="hidden" id="Impo_pojang_su" 		name="Impo_pojang_su"/>
				  <input type="hidden" id="FTA_CD" 				name="FTA_CD"/>
				  <table>
			   	    <col width="12%">
                    <col width="38%">
                    <col width="12%">
                    <col width="38%">
                    <tr>
                      <td class="left">수입자 상호</td>
                      <td>
                        <input type="text" id="Impo_suipja_sangho" name="Impo_suipja_sangho" style="width:80%" value="에드워드코리아(주)" readOnly/>
                      </td>
                      <td class="left" style="background-color:yellow">화주</td>
                      <td>
                        <input type="text" id="OWN_GODS_CD" name="OWN_GODS_CD"  style="width:30%" readOnly/>
                        <input type="text" id="OWN_GODS_NM" name="OWN_GODS_NM" 	style="width:50%" readOnly/>
                        <a href="javascript:fn_vendorSearch()"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                      </td>
                    </tr>
                    <tr>
                      <td class="left" style="background-color:yellow">B/L No</td>
                      <td>
                        <input type="text" id="BL_NO" name="BL_NO" style="width:100%"/>
                      </td>
                      <td class="left" style="background-color:yellow">분할-차수</td>
                      <td>
                        <input type="text" id="BL_DIVS" name="BL_DIVS" style="width:20px"/>
                        <a href="javascript:fn_searchSys('BL_DVDE_DCLR_YN_TPCD')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                        <input type="text" id="BL_SEQNO" name="BL_SEQNO" style="width:20px;text-align:right"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left" style="background-color:yellow">적출국</td>
                      <td>
                        <input type="text" id="EXTR_NAT" name="EXTR_NAT" style="width:30px"/>
                        <a href="javascript:fn_searchSys('CNTY_CD6')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                      </td>
                      <td class="left" style="background-color:yellow">수출자</td>
                      <td>
                        <input type="text" id="EXP_CD" name="EXP_CD"  style="width:30%" readOnly/>
                        <input type="text" id="EXP_NM" name="EXP_NM" 	style="width:50%" readOnly/>
                        <a href="javascript:fn_vendorSearch1('1')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                      </td>
                    </tr>
                    <tr>
                      <td class="left" style="background-color:yellow">결제금액</td>
                      <td>
                        <input type="text" id="INCOTERMS" name="INCOTERMS" 	style="width:30px"/>
                        <a href="javascript:fn_searchSys('DLCN_CD2')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                        <input type="text" id="CUR_UNIT" name="CUR_UNIT" 	style="width:30px"/>
                        <a href="javascript:fn_searchSys('CURR_CD6')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                        <input type="text" id="Impo_gyelje_input" name="Impo_gyelje_input" 	style="width:50px;text-align:right" value="0"/>
                      </td>
                      <td class="left" style="background-color:yellow">협정명</td>
                      <td>
                        <select id="IM_FTA_CD" name="IM_FTA_CD" style="width:80px" onchange="javascript:fn_comp_nm();"></select>
                        <select id="FRGN_COMP_NM" name="FRGN_COMP_NM" style="width:60%"  onchange="javascript:fn_comp_changenm(this);"></select>
                        <!-- a href="javascript:fn_searchSys1('1','TRRT_SIM_TPCD')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a-->
                      </td>
                    </tr>
                    <tr>
                      <td class="left" style="background-color:yellow">포장갯수</td>
                      <td>
                        <input type="text" id="PKG_QTY" name="PKG_QTY" 	style="width:30px;text-align:right" value="0"/>
                        <input type="text" id="Impo_pojang_danwi" name="Impo_pojang_danwi" 	style="width:30px"/>
                        <a href="javascript:fn_searchSys('PCK_KCD')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                      </td>
                      <td class="left" style="background-color:yellow">총중량</td>
                      <td>
                        <input type="text" id="TOT_WT" name="TOT_WT" 	style="width:40px;text-align:right" value="0"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">세관-과</td>
                      <td>
                        <input type="text" id="Impo_segwan" name="Impo_segwan" 	style="width:30px"/>
                        <a href="javascript:fn_commonNcomCode('0','Bsegwan')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                        <input type="text" id="Impo_gwa" 	name="Impo_gwa" 	style="width:20px"/>
                        <a href="javascript:fn_commonNcomCode('0','Bgwa')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                      </td>
                      <td class="left">신고구분</td>
                      <td>
                        <input type="text" id="Impo_singo_gubun" name="Impo_singo_gubun" 	style="width:20px"/>
                        <a href="javascript:fn_searchSys('IMP_DCLR_TPCD')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">통관계획</td>
                      <td>
                        <input type="text" id="Impo_plan" name="Impo_plan" 	style="width:30px"/>
                        <a href="javascript:fn_searchSys('IMP_CSCL_PLAN_CD')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                      </td>
                      <td class="left">거래-종류</td>
                      <td>
                        <input type="text" id="Impo_gele_gubun" name="Impo_gele_gubun" 	style="width:30px"/>
                        <a href="javascript:fn_searchSys('IMP_DLNG_TPCD')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                        <input type="text" id="Impo_jonglu" 	name="Impo_jonglu" 	style="width:20px"/>
                        <a href="javascript:fn_searchSys('IMP_KCD')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>

                      </td>
                    </tr>
                    <tr>
                      <td class="left">징수형태</td>
                      <td>
                        <input type="text" id="Impo_jingsu_type" name="Impo_jingsu_type" 	style="width:30px"/>
                        <a href="javascript:fn_searchSys('COLT_FORM_CD')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                      </td>
                      <td class="left">원산지</td>
                      <td>
                        <input type="text" id="Impo_wonsanji_yn" name="Impo_wonsanji_yn" 	style="width:20px"/>
                        <a href="javascript:fn_searchSys('ORCY_CRPP_EON_TPCD')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">결제방법</td>
                      <td>
                        <input type="text" id="Impo_gyelje" name="Impo_gyelje" 	style="width:30px"/>
                        <a href="javascript:fn_searchSys1('2','STLM_MCD')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                      </td>
                      <td class="left">가격신고</td>
                      <td>
                        <input type="text" id="Impo_gakyk_yn" name="Impo_gakyk_yn" 	style="width:20px"/>
                        <a href="javascript:fn_searchSys('PRC_DCSH_SBMT_TPCD')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">보험료</td>
                      <td>
                        <input type="text" id="Impo_ins_input" name="Impo_ins_input" style="width:50px;text-align:right" value="0"/>
                      </td>
                      <td class="left">가산금</td>
                      <td>
                        <input type="text" id="Impo_plus_yul_gubun" name="Impo_plus_yul_gubun" 	style="width:30px"/>
                        <a href="javascript:fn_searchSys1('1','ADD_MINUS_DCLR_CD')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                        <input type="text" id="Impo_plus_money" name="Impo_plus_money" 	style="width:30px"/>
                        <a href="javascript:fn_searchSys1('1','CURR_CD3')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                        <input type="text" id="Impo_plus_yul" name="Impo_plus_yul" 	style="width:50px;text-align:right" value="0"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">입항일</td>
                      <td>
                        <input type="text" id="Impo_iphang_date" name="Impo_iphang_date" style="width:60px;cursor:pointer;text-align:center;" maxlength="8"/>
                      </td>
                      <td class="left">도착항</td>
                      <td>
                        <input type="text" id="Impo_hanggu_code" name="Impo_hanggu_code" 	style="width:50px"/>
                        <a href="javascript:fn_searchSys1('2','DMST_ARVL_CLRP_CD')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">운송형태</td>
                      <td>
                        <input type="text" id="Impo_unsong_type" name="Impo_unsong_type" 	style="width:30px"/>
                        <a href="javascript:fn_searchSys('TRNP_METH_PCD')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                        <input type="text" id="Impo_unsong_box" name="Impo_unsong_box" 	style="width:30px"/>
                        <a href="javascript:fn_searchSys1('2','TRNP_CNTAI_TPCD')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                      </td>
                      <td class="left">운임료</td>
                      <td>
                        <input type="text" id="Impo_fre" name="Impo_fre" style="width:50px;text-align:right" value="0"/>
                        <input type="text" id="Impo_fre_money" name="Impo_fre_money" 	style="width:30px"/>
                        <a href="javascript:fn_searchSys('CURR_CD1')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
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