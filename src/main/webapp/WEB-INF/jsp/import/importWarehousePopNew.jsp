<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-filter.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/import/importWarehousePopNew.js'/>"></script>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="container">
			  <div class="normal_cont">
				<form id="frm1" name="frm1">
				<input type="hidden" id="BL" 		name="BL"  		value="${param.BL}" />
				<input type="hidden" id="MRN" 		name="MRN"  	value="${param.MRN}" />
				<input type="hidden" id="CN_FIRM" 	name="CN_FIRM"	value="${param.CN_FIRM}" />
				<input type="hidden" id="UseYn" 	name="UseYn"	value="${param.UseYn}" />
				<input type="hidden" id="count1" 	name="count1"	value="0" />
				<input type="hidden" id="pageNum" 	name="pageNum"	value="0" />
				</form>
				<table style="width:100%;" cellpadding="0" cellspacing="0" border="1" align="center" style="border-collapse:collapse; border:1px #596a7b solid;">
				  <tr>
				    <td style="width:100%;background-color:#596a7b;color:white;height:30px;font-size:11pt;padding-left:10px">반입예정</td>
				  </tr>
				</table>
				<br>
				<table style="width:100%;" cellpadding="0" cellspacing="0" border="1" align="center" style="border-collapse:collapse; border:1px black solid;">
				  <tr style="height:30px;">
				    <td style="width:10%;text-align:center;background-color:#ecf7fd;color:black;">총건수</td>
				    <td style="width:10%;text-align:center;color:black;" id="total"></td>
				    <td style="width:10%;text-align:center;background-color:#ecf7fd;color:black;">Page</td>
				    <td style="width:10%;text-align:center;color:black;" id="page"></td>
				    <td style="width:30%;text-align:center;color:blue;" id="nowDate"></td>
				    <td style="width:30%;text-align:center;color:black;" id="timer"></td>
				  </tr>
				</table>
			    <table style="width:100%;">
                <colgroup>
                  <col style="width:25%;">
                  <col style="width:25%;">
                  <col style="width:25%;">
                  <col style="width:25%;">
                </colgroup>
                <thead>
                  <tr>
                    <th>편명</th>
                    <th>MAWB</th>
                    <th>HBL</th>
                    <th>입항일자</th>
                  </tr>
                </thead>
                <tbody id="nav501List"></tbody>
                </table>
			  </div>
			</div>
		  </div>
		</div>
	  </div>
	</div>
  </body>
</html>