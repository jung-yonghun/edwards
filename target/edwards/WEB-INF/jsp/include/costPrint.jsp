<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/jquery.number/jquery.number.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/include/costPrint.js?20231027'/>"></script>
	<style>
	body{font-size:12px; color:#000000; font-family:'Nanum Gothic', sans-serif;}
	</style>
  </head>
  <body>
    <form id="frm" name="frm" method="post">
      <input type="hidden" id="singoNo" name="singoNo" 	value="${param.singoNo}"/>
      <input type="hidden" id="singoDt" name="singoDt" 	value="${param.singoDt}"/>
      <input type="hidden" id="WORK_NM" name="WORK_NM" 	value="${param.WORK_NM}"/>
      <input type="hidden" id="exname" 	name="exname"/>
	  <table id="excel_body" cellpadding="5" cellspacing="0">
	    <col width="115px"/>
	    <col width="75px"/>
	    <col width="115px"/>
	    <col width="115px"/>
	    <col width="115px"/>
	    <col width="115px"/>
	    <col width="115px"/>
	    <col width="155px"/>
		<tr height="65px">
		  <td colspan="8" style="border:2px #000000 solid" align="center">
		    <font size="6"><b><div id="TITLE_NM"></div></b></font>
		  </td>
		</tr>
		<tr height="300px">
		  <td colspan="8" style="border-left:2px #000000 solid;border-right:2px #000000 solid;" valign="top">
		    <table id="excel_body" cellpadding="1" cellspacing="0">
		      <col width="31px"/>
		      <col width="85px"/>
		      <col width="127px"/>
		      <col width="85px"/>
		      <col width="127px"/>
		      <col width="31px"/>
		      <col width="85px"/>
		      <col width="56px"/>
		      <col width="30px"/>
		      <col width="48px"/>
		      <col width="55px"/>
		      <col width="30px"/>
		      <col width="120px"/>
		      <tr height="30px">
			    <td rowspan="5" style="border:1px #000000 solid" align="center">받<p>는<p>자</td>
				<td style="border-top:1px #000000 solid;border-right:1px #000000 solid;" align="center">상 호</td>
				<td colspan="3" style="border-top:1px #000000 solid;border-right:1px #000000 solid;padding:5px"><b><div id="ADJ_COM_NM"></div></b></td>
				<td rowspan="5" style="border-top:1px #000000 solid;border-right:1px #000000 solid;border-bottom:1px #000000 solid;" align="center">공<p>급<p>자</td>
				<td style="border-top:1px #000000 solid;border-right:1px #000000 solid;" align="center">상 호</td>
				<td colspan="6" style="border-top:1px #000000 solid;border-right:1px #000000 solid;padding:5px"><b><div id="SUP_COM_NM"></div></b></td>
			  </tr>
			  <tr height="30px">
				<td style="border-top:1px #000000 solid;border-right:1px #000000 solid;" align="center">등록번호</td>
				<td style="border-top:1px #000000 solid;border-right:1px #000000 solid;" align="center"><div id="RECV_COM_BIZ_NO"></div></td>
				<td style="border-top:1px #000000 solid;border-right:1px #000000 solid;" align="center">담당자</td>
				<td style="border-top:1px #000000 solid;border-right:1px #000000 solid;" align="center"><div id="RECV_COM_MEM_NM"></div></td>
				<td style="border-top:1px #000000 solid;border-right:1px #000000 solid;" align="center">등록번호</td>
				<td colspan="3" style="border-top:1px #000000 solid;border-right:1px #000000 solid;" align="center"><div id="SUP_COM_BIZ_NO"></div></td>
				<td colspan="2" style="border-top:1px #000000 solid;border-right:1px #000000 solid;" align="center">작성일자</td>
				<td style="border-top:1px #000000 solid;border-right:1px #000000 solid;" align="center"><div id="WRITE_DT"></div></td>
			  </tr>
			  <tr height="30px">
				<td style="border-top:1px #000000 solid;border-right:1px #000000 solid;" align="center">전 화</td>
				<td style="border-top:1px #000000 solid;border-right:1px #000000 solid;" align="center"><div id="RECV_COM_TEL_NO"></div></td>
				<td style="border-top:1px #000000 solid;border-right:1px #000000 solid;" align="center">팩 스</td>
				<td style="border-top:1px #000000 solid;border-right:1px #000000 solid;" align="center"><div id="RECV_COM_FAX_NO"></div></td>
				<td style="border-top:1px #000000 solid;border-right:1px #000000 solid;" align="center">통관담당</td>
				<td style="border-top:1px #000000 solid;border-right:1px #000000 solid;" align="center"><div id="TG_MEM_NM"></div></td>
				<td style="border-top:1px #000000 solid;border-right:1px #000000 solid;" align="center">T</td>
				<td colspan="2" style="border-top:1px #000000 solid;border-right:1px #000000 solid;" align="center"><div id="TG_TEL_NO"></div></td>
				<td style="border-top:1px #000000 solid;border-right:1px #000000 solid;" align="center">F</td>
				<td style="border-top:1px #000000 solid;border-right:1px #000000 solid;" align="center"><div id="TG_FAX_NO"></div></td>
			  </tr>
			  <tr height="30px">
				<td style="border-top:1px #000000 solid;border-right:1px #000000 solid;" align="center">실화주</td>
				<td colspan="3" style="border-top:1px #000000 solid;border-right:1px #000000 solid;padding:5px"><div id="RECV_COM_NM"></div></td>
				<td style="border-top:1px #000000 solid;border-right:1px #000000 solid;" align="center">정산담당</td>
				<td style="border-top:1px #000000 solid;border-right:1px #000000 solid;" align="center"><div id="ADJ_MEM_NM"></div></td>
				<td style="border-top:1px #000000 solid;border-right:1px #000000 solid;" align="center">T</td>
				<td colspan="2" style="border-top:1px #000000 solid;border-right:1px #000000 solid;" align="center"><div id="ADJ_TEL_NO"></div></td>
				<td style="border-top:1px #000000 solid;border-right:1px #000000 solid;" align="center">F</td>
				<td style="border-top:1px #000000 solid;border-right:1px #000000 solid;" align="center"><div id="ADJ_FAX_NO"></div></td>
			  </tr>
			  <tr height="60px">
				<td style="border-top:1px #000000 solid;border-right:1px #000000 solid;border-bottom:1px #000000 solid;" align="center">주 소</td>
				<td colspan="3" style="border-top:1px #000000 solid;border-right:1px #000000 solid;border-bottom:1px #000000 solid;padding:5px"><div id="RECV_COM_ADDR"></div></td>
				<td style="border-top:1px #000000 solid;border-right:1px #000000 solid;border-bottom:1px #000000 solid;" align="center">주 소</td>
				<td colspan="6" style="border-top:1px #000000 solid;border-right:1px #000000 solid;border-bottom:1px #000000 solid;padding:5px"><div id="SUP_JIRO_ADDR"></div></td>
			  </tr>
			</table>
			<table cellpadding="0" cellspacing="0"><tr><td height="5px"></td></tr></table>
			<table id="excel_body" cellpadding="1" cellspacing="0">
		      <col width="116px"/>
		      <col width="90px"/>
		      <col width="34px"/>
		      <col width="116px"/>
		      <col width="84px"/>
		      <col width="170px"/>
		      <col width="116px"/>
		      <col width="92px"/>
		      <col width="92px"/>
		      <tr height="30px">
			    <td style="border-top:1px #000000 solid;border-left:1px #000000 solid;border-right:1px #000000 solid;" align="center">입항일자</td>
				<td colspan="2" style="border-top:1px #000000 solid;border-right:1px #000000 solid;" align="center"><div id="ARRIVE_DT"></div></td>
				<td style="border-top:1px #000000 solid;border-right:1px #000000 solid;" align="center">신고번호</td>
				<td colspan="2" style="border-top:1px #000000 solid;border-right:1px #000000 solid;padding:5px"><div id="SINGO_NO"></div></td>
				<td style="border-top:1px #000000 solid;border-right:1px #000000 solid;" align="center">과세금액(원)</td>
				<td colspan="2" style="border-top:1px #000000 solid;border-right:1px #000000 solid;padding:5px" align="right"><div id="GAMGA_EK"></div></td>
			  </tr>
			  <tr height="30px">
			    <td style="border-top:1px #000000 solid;border-left:1px #000000 solid;border-right:1px #000000 solid;" align="center">신고일자</td>
				<td colspan="2" style="border-top:1px #000000 solid;border-right:1px #000000 solid;" align="center"><div id="SINGO_DT"></div></td>
				<td style="border-top:1px #000000 solid;border-right:1px #000000 solid;" align="center">B/L(Inv) No</td>
				<td colspan="2" style="border-top:1px #000000 solid;border-right:1px #000000 solid;padding:5px"><div id="HAWB"></div></td>
				<td style="border-top:1px #000000 solid;border-right:1px #000000 solid;" align="center">신고금액($)</td>
				<td colspan="2" style="border-top:1px #000000 solid;border-right:1px #000000 solid;padding:5px" align="right"><div id="SINGO_EK"></div></td>
			  </tr>
			  <tr height="30px">
			    <td style="border-top:1px #000000 solid;border-left:1px #000000 solid;border-right:1px #000000 solid;" align="center">수리일자</td>
				<td colspan="2" style="border-top:1px #000000 solid;border-right:1px #000000 solid;" align="center"><div id="SURI_DT"></div></td>
				<td style="border-top:1px #000000 solid;border-right:1px #000000 solid;" align="center">품 명</td>
				<td colspan="2" style="border-top:1px #000000 solid;border-right:1px #000000 solid;padding:5px"><div id="DEAL_PUM_NM"></div></td>
				<td style="border-top:1px #000000 solid;border-right:1px #000000 solid;" align="center">적용환율</td>
				<td colspan="2" style="border-top:1px #000000 solid;border-right:1px #000000 solid;padding:5px" align="right"><div id="EXCH_RATE"></div></td>
			  </tr>
			  <tr height="30px">
			    <td style="border-top:1px #000000 solid;border-left:1px #000000 solid;border-right:1px #000000 solid;" align="center">수 량</td>
				<td style="border-top:1px #000000 solid;border-right:1px #000000 solid;padding:5px" align="right"><div id="TOT_QT"></div></td>
				<td style="border-top:1px #000000 solid;border-right:1px #000000 solid;padding:5px" align="center"><div id="QT_UNIT"></div></td>
				<td style="border-top:1px #000000 solid;border-right:1px #000000 solid;" align="center">장치장</td>
				<td colspan="2" style="border-top:1px #000000 solid;border-right:1px #000000 solid;padding:5px"><div id="WH_NM"></div></td>
				<td rowspan="2" style="border-top:1px #000000 solid;border-right:1px #000000 solid;" align="center">결제금액</td>
				<td style="border-top:1px #000000 solid;border-right:1px #000000 solid;" align="center"><div id="PAY_METHOD"></div></td>
				<td style="border-top:1px #000000 solid;border-right:1px #000000 solid;padding:5px" align="center"><div id="MONEY_CD"></div></td>
			  </tr>
			  <tr height="30px">
			    <td style="border-top:1px #000000 solid;border-left:1px #000000 solid;border-right:1px #000000 solid;" align="center">중 량</td>
				<td style="border-top:1px #000000 solid;border-right:1px #000000 solid;padding:5px" align="right"><div id="TOT_WT"></div></td>
				<td style="border-top:1px #000000 solid;border-right:1px #000000 solid;padding:5px" align="center"><div id="WT_UNIT"></div></td>
				<td style="border-top:1px #000000 solid;border-right:1px #000000 solid;" align="center">무역거래처</td>
				<td colspan="2" style="border-top:1px #000000 solid;border-right:1px #000000 solid;padding:5px"><div id="SUPLY_NM"></div></td>
				<td colspan="2" style="border-top:1px #000000 solid;border-right:1px #000000 solid;padding:5px" align="right"><div id="MONEY_EK"></div></td>
			  </tr>
			  <tr height="30px">
			    <td style="border-top:1px #000000 solid;border-left:1px #000000 solid;border-right:1px #000000 solid;border-bottom:2px #000000 solid;" align="center">File No1</td>
				<td colspan="3" style="border-top:1px #000000 solid;border-right:1px #000000 solid;border-bottom:2px #000000 solid;padding:5px"><div id="FILE_NO1"></div></td>
				<td style="border-top:1px #000000 solid;border-right:1px #000000 solid;border-bottom:2px #000000 solid;" align="center">File No2</td>
				<td style="border-top:1px #000000 solid;border-right:1px #000000 solid;border-bottom:2px #000000 solid;padding:5px"><div id="FILE_NO2"></div></td>
				<td style="border-top:1px #000000 solid;border-right:1px #000000 solid;border-bottom:2px #000000 solid;" align="center">총세액</td>
				<td colspan="2" style="border-top:1px #000000 solid;border-right:1px #000000 solid;border-bottom:2px #000000 solid;padding:5px" align="right"><div id="TOT_TAX_EK"></div></td>
			  </tr>
			  <tr height="30px">
			    <td style="borde:0px" align="center">적요사항 :</td>
				<td colspan="8" style="borde:0px"></td>
			  </tr>
			</table>
			<br>
		  </td>
		</tr>
		<tr height="30px" align="center">
		  <td colspan="2" style="border-top:1px #000000 solid;border-left:2px #000000 solid;border-right:1px #000000 solid;">비용명</td>
		  <td style="border-top:1px #000000 solid;border-right:1px #000000 solid;">공급가</td>
		  <td style="border-top:1px #000000 solid;border-right:1px #000000 solid;">부가세</td>
		  <td style="border-top:1px #000000 solid;border-right:1px #000000 solid;">합계</td>
		  <td colspan="3" style="border-top:1px #000000 solid;border-right:2px #000000 solid;">비고</td>
		</tr>
		<tbody id="cost_detail">
		</tbody>
		<tr height="30px">
		  <td colspan="2" style="border-top:1px #000000 solid;border-left:2px #000000 solid;border-right:1px #000000 solid;padding:5px">비용합계(a)</td>
		  <td colspan="3" style="border-top:1px #000000 solid;border-right:1px #000000 solid;padding:5px" align="right"><div id="SUM_EK"></div></td>
		  <td colspan="3" style="border-top:1px #000000 solid;border-right:2px #000000 solid;padding:5px"></td>
		</tr>
		<tr height="30px">
		  <td colspan="2" style="border-top:1px #000000 solid;border-left:2px #000000 solid;border-right:1px #000000 solid;padding:5px">미수금(b)</td>
		  <td colspan="3" style="border-top:1px #000000 solid;border-right:1px #000000 solid;padding:5px" align="right"><div id="PRE_JAN_EK"></div></td>
		  <td colspan="3" style="border-top:1px #000000 solid;border-right:2px #000000 solid;padding:5px"></td>
		</tr>
		<tr height="30px">
		  <td colspan="2" style="border-top:1px #000000 solid;border-left:2px #000000 solid;border-right:1px #000000 solid;padding:5px">이월잔액(c)</td>
		  <td colspan="3" style="border-top:1px #000000 solid;border-right:1px #000000 solid;padding:5px" align="right"><div id="TAKE_EK"></div></td>
		  <td colspan="3" style="border-top:1px #000000 solid;border-right:2px #000000 solid;padding:5px"></td>
		</tr>
		<tr height="30px">
		  <td colspan="2" style="border-top:1px #000000 solid;border-left:2px #000000 solid;border-right:1px #000000 solid;padding:5px">입금금액(d)</td>
		  <td colspan="3" style="border-top:1px #000000 solid;border-right:1px #000000 solid;padding:5px" align="right"><div id="IN_EK"></div></td>
		  <td colspan="3" style="border-top:1px #000000 solid;border-right:2px #000000 solid;padding:5px"><div id="IN_EK_NOTE"></div></td>
		</tr>
		<tr height="30px">
		  <td colspan="2" style="border-top:1px #000000 solid;border-left:2px #000000 solid;border-right:1px #000000 solid;padding:5px">잔액송금(e)</td>
		  <td colspan="3" style="border-top:1px #000000 solid;border-right:1px #000000 solid;padding:5px" align="right"><div id="SEND_JAN_EK"></div></td>
		  <td colspan="3" style="border-top:1px #000000 solid;border-right:2px #000000 solid;padding:5px"><div id="SEND_JAN_EK_NOTE"></div></td>
		</tr>
		<tr height="30px">
		  <td colspan="2" style="border-top:1px #000000 solid;border-left:2px #000000 solid;border-right:1px #000000 solid;padding:5px">차액=(c+d)-(a+b+e)</td>
		  <td colspan="3" style="border-top:1px #000000 solid;border-right:1px #000000 solid;padding:5px" align="right"><div id="JAN_EK"></div></td>
		  <td colspan="3" style="border-top:1px #000000 solid;border-right:2px #000000 solid;padding:5px"></td>
		</tr>
		<tr height="200px">
		  <td colspan="8" style="border-top:1px #000000 solid;border-left:2px #000000 solid;border-right:2px #000000 solid;valign:bottom;padding:5px">
		    <br><br><br><br><br><br><br><br><br><br><br>전자세금계산서 발행건에 대한 미승인건은 익월 9일(전송기한)에 국세청으로 자동 전송 됩니다.
		  </td>
		</tr>
		<tr height="30px">
		  <td style="border-top:1px #000000 solid;border-left:2px #000000 solid;border-right:1px #000000 solid;border-bottom:2px #000000 solid;" align="center">입금계좌</td>
		  <td colspan="5" style="border-top:1px #000000 solid;border-right:1px #000000 solid;border-bottom:2px #000000 solid;padding:5px"><div id="BANK_NM"></div></td>
		  <td style="border-top:1px #000000 solid;border-right:1px #000000 solid;border-bottom:2px #000000 solid;" align="center">정산번호</td>
		  <td style="border-top:1px #000000 solid;border-right:2px #000000 solid;border-bottom:2px #000000 solid;" align="center"><div id="ADJ_GROUP_NO"></div></td>
		</tr>
	  </table>
	  <table width="880px" cellpadding="0" cellspacing="0">
	    <tr>
	      <td height="40px"><img src="<c:url value='/images/common/sein.gif'/>"></td>
	      <td align="right" valign="top">www.seincustoms.com</td>
	    </tr>
	  </table>
	</form>
  </body>
</html>