<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/cps/import/importDeliveryPODPrint.js'/>"></script>
  </head>
  <body style="color:#000000;">
    <form id="frm" name="frm" method="post">
      <div style="display:none;"><textarea name="excel_data" style="width:0px;height:0px"></textarea></div>
      <input type="hidden" id="deliveryRequestKey"	name="deliveryRequestKey" 	value="${param.deliveryRequestKey}"/>
	  <table cellpadding="0" cellspacing="0" style="table-layout:fixed; word-break:break-all;">
	    <col width="120px"/>
	    <col width="360px"/>
	    <col width="120px"/>
	    <col width="360px"/>
		<tr height="10px">
		  <td colspan="4"><img src="../images/logo/sein_tnl_logo_white.jpg" style="width: 150px; height:auto;"/></td>
		</tr>
		<tr height="60px">
		  <td colspan="4" align="center"><font size="5px"><b>수입화물 화물인도 확인서</b></font></td>
		</tr>
		<tr height="40px">
		  <td colspan="4"><b><div id="customerKey"></div></b></td>
		</tr>
		<tr height="30px">
		  <td colspan="4"><b>운송의뢰인</b></td>
		</tr>
		<tr height="30px">
		  <td style="border-left:1px #000000 solid;border-top:1px #000000 solid;border-right:1px #000000 solid;background-color:#cccccc !important;text-align:center;"><b>상호</b></td>
		  <td style="border-top:1px #000000 solid;border-right:1px #000000 solid;text-align:center;"><div id="requestCoName"></div></td>
		  <td style="border-top:1px #000000 solid;border-right:1px #000000 solid;background-color:#cccccc !important;text-align:center;"><b>의뢰자/접수자</b></td>
		  <td style="border-top:1px #000000 solid;border-right:1px #000000 solid;text-align:center;"><div id="requestMan"></div></td>
		</tr>
		<tr height="30px">
		  <td style="border-left:1px #000000 solid;border-top:1px #000000 solid;border-right:1px #000000 solid;border-bottom:1px #000000 solid;background-color:#cccccc !important;text-align:center;"><b>전화번호</b></td>
		  <td style="border-top:1px #000000 solid;border-right:1px #000000 solid;border-bottom:1px #000000 solid;text-align:center;"><div id="requestPhone"></div></td>
		  <td style="border-top:1px #000000 solid;border-right:1px #000000 solid;border-bottom:1px #000000 solid;background-color:#cccccc !important;text-align:center;"><b>팩스번호</b></td>
		  <td style="border-top:1px #000000 solid;border-right:1px #000000 solid;border-bottom:1px #000000 solid;text-align:center;"></td>
		</tr>
	  </table>
	  <table cellpadding="0" cellspacing="0" style="table-layout:fixed; word-break:break-all;">
	    <col width="120px"/>
	    <col width="200px"/>
	    <col width="120px"/>
	    <col width="200px"/>
	    <col width="120px"/>
	    <col width="200px"/>
	    <tr height="30px">
		  <td colspan="6"></td>
		</tr>
	    <tr height="30px">
		  <td colspan="6"><b>도착지</b></td>
		</tr>
		<tr height="30px">
		  <td style="border-left:1px #000000 solid;border-top:1px #000000 solid;border-right:1px #000000 solid;background-color:#cccccc !important;text-align:center;"><b>상호</b></td>
		  <td colspan="5" style="border-top:1px #000000 solid;border-right:1px #000000 solid;text-align:center;"><div id="deliveryCarryingInName"></div></td>
		</tr>
		<tr height="30px">
		  <td style="border-left:1px #000000 solid;border-top:1px #000000 solid;border-right:1px #000000 solid;background-color:#cccccc !important;text-align:center;"><b>주소</b></td>
		  <td colspan="5" style="border-top:1px #000000 solid;border-right:1px #000000 solid;text-align:center;"><div id="deliveryCarryingInAddr"></div></td>
		</tr>
		<tr height="30px">
		  <td style="border-left:1px #000000 solid;border-top:1px #000000 solid;border-right:1px #000000 solid;background-color:#cccccc !important;text-align:center;"><b>연락처</b></td>
		  <td colspan="5" style="border-top:1px #000000 solid;border-right:1px #000000 solid;text-align:center;"><div id="deliveryCarryingInPhone"></div></td>
		</tr>
		<tr height="30px">
		  <td style="border-left:1px #000000 solid;border-top:1px #000000 solid;border-right:1px #000000 solid;border-bottom:1px #000000 solid;background-color:#cccccc !important;text-align:center;"><b>물품인도일자</b></td>
		  <td style="border-top:1px #000000 solid;border-right:1px #000000 solid;border-bottom:1px #000000 solid;text-align:center;"></td>
		  <td style="border-top:1px #000000 solid;border-right:1px #000000 solid;border-bottom:1px #000000 solid;background-color:#cccccc !important;text-align:center;"><b>물품인수자</b></td>
		  <td style="border-top:1px #000000 solid;border-right:1px #000000 solid;border-bottom:1px #000000 solid;text-align:center;"></td>
		  <td style="border-top:1px #000000 solid;border-right:1px #000000 solid;border-bottom:1px #000000 solid;background-color:#cccccc !important;text-align:center;"><b>인수자사인</b></td>
		  <td style="border-top:1px #000000 solid;border-right:1px #000000 solid;border-bottom:1px #000000 solid;text-align:center;"></td>
		</tr>
		<tr height="30px">
		  <td colspan="6"></td>
		</tr>
		<tr height="30px">
		  <td colspan="6"><b>주의사항</b></td>
		</tr>
		<tr height="30px">
		  <td colspan="6"><div id="requestNote"></div></td>
		</tr>
	  </table>
	  <table cellpadding="0" cellspacing="0" style="table-layout:fixed; word-break:break-all;">
	    <col width="120px"/>
	    <col width="120px"/>
	    <col width="120px"/>
	    <col width="120px"/>
	    <col width="120px"/>
	    <col width="120px"/>
	    <col width="120px"/>
	    <col width="120px"/>
	    <tr height="30px">
		  <td colspan="6"></td>
		</tr>
	    <tr height="30px">
		  <td colspan="8"><b>운송 물품 내역</b></td>
		</tr>
		<tr height="30px">
		  <td style="border-left:1px #000000 solid;border-top:1px #000000 solid;border-right:1px #000000 solid;background-color:#cccccc !important;text-align:center;"><b>신고일자</b></td>
		  <td style="border-top:1px #000000 solid;border-right:1px #000000 solid;background-color:#cccccc !important;text-align:center;"><b>B/L No.</b></td>
		  <td style="border-top:1px #000000 solid;border-right:1px #000000 solid;background-color:#cccccc !important;text-align:center;"><b>포장갯수</b></td>
		  <td style="border-top:1px #000000 solid;border-right:1px #000000 solid;background-color:#cccccc !important;text-align:center;"><b>포장단위</b></td>
		  <td style="border-top:1px #000000 solid;border-right:1px #000000 solid;background-color:#cccccc !important;text-align:center;"><b>중량</b></td>
		  <td style="border-top:1px #000000 solid;border-right:1px #000000 solid;background-color:#cccccc !important;text-align:center;"><b>중량단위</b></td>
		  <td style="border-top:1px #000000 solid;border-right:1px #000000 solid;background-color:#cccccc !important;text-align:center;"><b>사이즈</b></td>
		  <td style="border-top:1px #000000 solid;border-right:1px #000000 solid;background-color:#cccccc !important;text-align:center;"><b>반입장소</b></td>
		</tr>
		<tr height="30px">
		  <td style="border-left:1px #000000 solid;border-top:1px #000000 solid;border-right:1px #000000 solid;border-bottom:1px #000000 solid;text-align:center;"><div id="suirDate"></div></td>
		  <td style="border-top:1px #000000 solid;border-right:1px #000000 solid;border-bottom:1px #000000 solid;text-align:center;"><div id="hblNo"></div></td>
		  <td style="border-top:1px #000000 solid;border-right:1px #000000 solid;border-bottom:1px #000000 solid;text-align:center;"><div id="deliveryPojangSu"></div></td>
		  <td style="border-top:1px #000000 solid;border-right:1px #000000 solid;border-bottom:1px #000000 solid;text-align:center;"><div id="deliveryPojangDanwi"></div></td>
		  <td style="border-top:1px #000000 solid;border-right:1px #000000 solid;border-bottom:1px #000000 solid;text-align:center;"><div id="deliveryJung"></div></td>
		  <td style="border-top:1px #000000 solid;border-right:1px #000000 solid;border-bottom:1px #000000 solid;text-align:center;"><div id="deliveryJungDanwi"></div></td>
		  <td style="border-top:1px #000000 solid;border-right:1px #000000 solid;border-bottom:1px #000000 solid;text-align:center;"><div id="cargoSize"></div></td>
		  <td style="border-top:1px #000000 solid;border-right:1px #000000 solid;border-bottom:1px #000000 solid;text-align:center;"><div id="banipPlace"></div></td>
		</tr>
	  </table>
	</form>
  </body>
</html>