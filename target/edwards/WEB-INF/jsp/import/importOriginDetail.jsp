<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/jquery.number/jquery.number.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/import/importOriginDetail.js'/>"></script>
  </head>
  <body>
      <form id="frm1" name="frm1" method="post">
      <input type="hidden" id="Impokey" 	name="Impokey"  	value="${param.Impo_key}"/>
      <input type="hidden" id="_defaultDB" 	name="_defaultDB"  	value="${param._defaultDB}"/>
      <input type="hidden" name="excel_data" />
      </form>
      <div id="Import">
	  <table>
	    <col width="115px"/>
		<col width="120px"/>
		<col width="115px"/>
		<col width="120px"/>
		<col width="115px"/>
		<col width="145px"/>
		<col width="115px"/>
		<col width="120px"/>
		<col width="115px"/>
		<col width="120px"/>
		<tr height="30px">
		  <td bgcolor="#CCCCCC" colspan="10" style="border:1px #2a2a2a solid;" align="center"><font color="#2a2a2a"><b>수입신고서 조회(갑지)</b></font></td>
		</tr>
		<tr height="20px">
		  <td colspan="10"></td>
		</tr>
		<tr height="20px">
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">신고번호</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_singo_no"></div></font></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">신고일</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_singo_date"></div></font></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">세관,과</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_segwan"></div></font></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">입항일자</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_iphang_date"></div></font></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">C/S</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-right:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="impo_cs"></div></font></td>
		</tr>
		<tr height="20px">
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">B/L(AWB)번호</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_bl_no"></div></font></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">Master B/L</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_mbl_no"></div></font></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">화물관리번호</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_mrn_no"></div></font></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">반입일자</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_banip_date"></div></font></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">징수형태</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-right:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_jingsu_type"></div></font></td>
		</tr>
		<tr height="10px">
		  <td colspan="10"></td>
		</tr>
		<tr height="20px">
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">신고인</font></td>
		  <td colspan="3" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_singoja_sangho"></div></font></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">통관계획</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_plan"></div></font></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">원산지증명서유무</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_wonsanji_yn"></div></font></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">총중량</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-right:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_total_jung"></div></font></td>
		</tr>
		<tr height="20px">
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">수입자</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_suipja_sangho"></div></font></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">통관고유부호</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_suipja_tong"></div></font></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">신고구분</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_singo_gubun"></div></font></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">가격신고유무</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_gakyk_yn"></div></font></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">총포장갯수</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-right:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_pojang_su"></div></font></td>
		</tr>
		<tr height="20px">
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">납세의무자</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_napse_sangho"></div></font></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">대표자</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_napse_name"></div></font></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">거래구분</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_gele_gubun"></div></font></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">국내도착항</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_hanggu_code"></div></font></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">운송형태</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-right:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_unsong_type"></div></font></td>
		</tr>
		<tr height="20px">
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">통관고유부호</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_suipja_tong1"></div></font></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">사업자번호</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_napse_saup"></div></font></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">종류</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_jonglu"></div></font></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">적출국</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_jukchl_code"></div></font></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">선기명</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-right:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_sungi_name"></div></font></td>
		</tr>
		<tr height="20px">
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">주소</font></td>
		  <td colspan="7" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_napse_juso"></div></font></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">운수기관부호</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-right:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_unsu_gigwan"></div></font></td>
		</tr>
		<tr height="20px">
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">운송주선인</font></td>
		  <td colspan="7" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_Forwarder_sangho"></div></font></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">부호</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-right:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_Forwarder_Code"></div></font></td>
		</tr>
		<tr height="20px">
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">무역거래처</font></td>
		  <td colspan="7" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_gonggub_sangho"></div></font></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">부호</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-right:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_gonggub"></div></font></td>
		</tr>
		<tr height="20px">
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">특송업체</font></td>
		  <td colspan="7" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_teuksong_name"></div></font></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">부호</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-right:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_teuksong"></div></font></td>
		</tr>
		<tr height="20px">
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">검사(반입)장소</font></td>
		  <td colspan="5" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_jangch_name"></div></font></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">장치장부호</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_jangch_buho"></div></font></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">장치위치</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-right:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_jangch_jangso"></div></font></td>
		</tr>
		<tr height="20px">
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">해외공급자</font></td>
		  <td colspan="5" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="impo_shipper_sangho"></div></font></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">국가부호</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="impo_shipper_buho"></div></font></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">부호</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-right:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="impo_shipper"></div></font></td>
		</tr>
		<tr height="10px">
		  <td colspan="10"></td>
		</tr>
		<tr height="20px">
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">결제금액</font></td>
		  <td colspan="5" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_indo_jogun"></div></font></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">결제환율</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_charge_exch"></div></font></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">대미환율</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-right:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_usd_exch"></div></font></td>
		</tr>
		<tr height="20px">
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">과세가격($)</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:right;"><font color="#2a2a2a"><div id="Impo_cif_total_usd"></div></font></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">운임</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:right;"><font color="#2a2a2a"><div id="Impo_fre_won"></div></font></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">가산금액</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:right;"><font color="#2a2a2a"><div id="Impo_gasan_tax"></div></font></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">납부번호</font></td>
		  <td colspan="3" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-right:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_napbu_no"></div></font></td>
		</tr>
		<tr height="20px">
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">과세가격(원)</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:right;"><font color="#2a2a2a"><div id="Impo_cif_total_won"></div></font></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">보험</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:right;"><font color="#2a2a2a"><div id="Impo_ins_input"></div></font></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">공제금액</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:right;"><font color="#2a2a2a"><div id="Impo_minus_total"></div></font></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">부가세과표</font></td>
		  <td colspan="3" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-right:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:right;"><font color="#2a2a2a"><div id="Impo_vat_gwapyo"></div></font></td>
		</tr>
		<tr height="10px">
		  <td colspan="10"></td>
		</tr>
		<tr height="20px">
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">관세</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:right;"><font color="#2a2a2a"><div id="Impo_gwan_tax"></div></font></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">신고인기재란</font></td>
		  <td colspan="3" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">세관기재란</font></td>
		  <td colspan="3" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-right:1px #2a2a2a solid;text-align:center;"></td>
		</tr>
		<tr height="20px">
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">개별소비세</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:right;"><font color="#2a2a2a"><div id="Impo_teuk_tax"></div></font></td>
		  <td colspan="4" rowspan="8" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;vertical-align:top;text-align:left;overflow:hidden;"><font color="#2a2a2a"><div id="Impo_damdangja"></div></font></td>
		  <td colspan="4" rowspan="8" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-right:1px #2a2a2a solid;text-align:left;vertical-align:top;white-space:pre-line;"><font color="#2a2a2a"><div id="Impo_gije"></div></font></td>
		</tr>
		<tr height="20px">
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">교통세</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:right;"><font color="#2a2a2a"><div id="Impo_oil_tax"></div></font></td>
		</tr>
		<tr height="20px">
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">주세</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:right;"><font color="#2a2a2a"><div id="Impo_ju_tax"></div></font></td>
		</tr>
		<tr height="20px">
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">교육세</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:right;"><font color="#2a2a2a"><div id="Impo_edu_tax"></div></font></td>
		</tr>
		<tr height="20px">
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">농특세</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:right;"><font color="#2a2a2a"><div id="Impo_nong_tax"></div></font></td>
		</tr>
		<tr height="20px">
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">부가세</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:right;"><font color="#2a2a2a"><div id="Impo_vat_tax"></div></font></td>
		</tr>
		<tr height="20px">
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">신고지연가산세</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:right;"><font color="#2a2a2a"><div id="Impo_gasan_tax1"></div></font></td>
		</tr>
		<tr height="20px">
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">미신고가산세</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:right;"><font color="#2a2a2a"><div id="Impo_misingo_tax"></div></font></td>
		</tr>
		<tr height="20px">
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">총세액합계</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:right;"><font color="#2a2a2a"><div id="Impo_total_tax"></div></font></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">담당자</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_damdang_name"></div></font></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">접수일시</font></td>
		  <td colspan="3" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_jubsu_date"></div></font></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">수리일자</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-right:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_ok_date"></div></font></td>
		</tr>
		<tr height="10px">
		  <td colspan="10"></td>
		</tr>
		<tr height="20px">
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">파일번호1</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_file_no1"></div></font></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">업체참조번호</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_chamjo_no"></div></font></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">송신</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_send_result"></div></font></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">사용신고구분</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_UseSinGbn"></div></font></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">사용신고일자</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-right:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_UseSinDt"></div></font></td>
		</tr>
		<tr height="20px">
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">파일번호2</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_file_no2"></div></font></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">대행사</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_daesangho"></div></font></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">수신</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="Impo_receive_result"></div></font></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">첨부서류</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="AttachImageYN"></div></font></td>
		  <td bgcolor="#ecf7fd" style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a">FTA</font></td>
		  <td style="padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-right:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;"><font color="#2a2a2a"><div id="impo_fta_obj"></div></font></td>
		</tr>
	  </table>
	  <br>
	  <table>
	    <col width="1200px"/>
		<tr height="30px">
		  <td bgcolor="#CCCCCC" style="border:1px #2a2a2a solid;" align="center"><font color="#2a2a2a"><b>수입신고서 조회(을지)</b></font></td>
		</tr>
		<tr height="20px">
		  <td></td>
		</tr>
	  </table>
	  <div id="detail">
	  </div>
	</div>
  </body>
</html>