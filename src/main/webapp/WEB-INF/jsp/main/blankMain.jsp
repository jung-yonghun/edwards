<%@ page language="java" 	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
	<jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/plugins/chartjs/Chart.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/main/blankMain.js'/>"></script>
  </head>
  <body>
    <div id="seach_pop_bg"></div>
	<div id="seach_pop">
	  <div class="seach_cont">
	    <div style="text-align:right;margin-right:15px"><img src="<c:url value='/images/cps/hs_close.png'/>" onclick="Fadeout()" style="cursor:pointer"></div>
		<div class="seach_review_in">
		  <div class="seach_review_tbl">
			<table>
			  <colgroup>
				<col width="15%" />
				<col width="30%" />
				<col width="15%" />
				<col width="20%" />
				<col width="10%" />
				<col width="10%" />
			  </colgroup>
				<tbody id="bbs_title">
				</tbody>
				<tbody id="bbs_title1">
				  <tr>
					<td class="left">첨부파일</td>
					<td colspan="5" class="taL" id="bbs_file"></td>
				  </tr>
				</tbody>
			</table>
		  </div>
		  <div class="seach_review_txt"></div>
		</div>
	  </div>
	</div>
    <input type="hidden" id="userKey" 			name="userKey" 			value="${sessionScope.ID}"/>
    <input type="hidden" id="userId" 			name="userId" 			value="${sessionScope.USERID}"/>
    <input type="hidden" id="_defaultDB" 		name="_defaultDB" 		value="${sessionScope.DEFAULTDB}">
    <input type="hidden" id="_defaultDB1" 		name="_defaultDB1" 		value="${sessionScope.DEFAULTDB}">
    <input type="hidden" id="USERGRADE" 		name="USERGRADE" 		value="${sessionScope.USERGRADE}">
    <input type="hidden" id="USERGRADEB" 		name="USERGRADEB" 		value="${sessionScope.USERGRADEB}">
	<input type="hidden" id="taxNum" 			name="taxNum" 			value="${sessionScope.TAXNO}">
	<input type="hidden" id="strFromDate" 		name="strFromDate">
	<input type="hidden" id="strToDate" 		name="strToDate" >
	<input type="hidden" id="strTodayFromDate" 	name="strTodayFromDate">
	<input type="hidden" id="strTodayFromDate1" name="strTodayFromDate1">
	<input type="hidden" id="strTodayToDate" 	name="strTodayToDate" >
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="easyui-layout" style="width:100%;height:770px;">
		      <div data-options="region:'center'" style="box-sizing:border-box;border:0px;padding:0px;overflow:auto;">
				<div class="main02">
				  <div class="main02_con">
				    <div class="main02_box01">
				      <div id="blank" style="display:none;height:40px"></div>
				      <p id="todayLine" style="height:30px">Today ( <span id="today" name="today"></span> )</p>
					  <div class="inner" style="margin-top:0px;border-top:1px #999999 dashed;width:94%">
			    	  	<p style="margin-bottom:5px;margin-top:-5px;">수입화물진행정보 조회</p>
					  	<input type="text" id="mbl" name="mbl" placeholder="M B/L" />
					  	<input type="text" id="hbl" name="hbl" placeholder="H B/L" />
					  	<select id="year" name="year"></select>
					  	<a href="#" onclick="linkBlNo()">조회</a>
					  </div>
					  <div class="innerr" style="margin-top:-5px;border-top:1px #999999 dashed;width:94%">
			    	  	<p style="margin-bottom:5px;margin-top:-5px;">수출이행내역(건별) 조회</p>
					  	<input type="text" id="expDclrNo" 	name="expDclrNo" 	placeholder="수출신고번호" />
					  	<input type="text" id="blNo" 		name="blNo" 		placeholder="B/L" style="width:200px"/>
					  	<a href="#" onclick="linkBlNo1()" style="margin-left:7px">조회</a>
					  </div>
					</div>
				    <div class="main02_box02">
					  <p>관세무역정보
						<span class="btn_b">
						  <!-- a href="javascript:bbsWrite('HSNEWS');" id="write" style="display:none"><img src="<c:url value='/images/cps/main02_write_icon.png'/>"></a-->
						  <a href="javascript:bbslist('HSNEWS');"><img src="<c:url value='/images/cps/main02_plus_icon.png'/>"></a>
						</span>
					  </p>
					  <ul id="NewsNotice"></ul>
					</div>
					<div class="main02_box02">
					  <p>뉴스레터
						<span class="btn_b">
						  <!-- a href="javascript:bbsWrite('CUSTOMS');" id="write3" style="display:none"><img src="<c:url value='/images/cps/main02_write_icon.png'/>"></a-->
						  <a href="javascript:bbslist('CUSTOMS');"><img src="<c:url value='/images/cps/main02_plus_icon.png'/>"></a>
						</span>
					  </p>
					  <ul id="CustomsNotice"></ul>
					</div>
				  </div>
				</div>
				<div class="main02">
				  <div class="main02_con">
				    <div class="main02_box01">
			    	  <input type="hidden" id="nowdate" name="nowdate" maxlength="8"/>
					  <p>Exchange rate for taxation
					  <span class="btn_b">
						<a href="javascript:linkExchange();"><img src="<c:url value='/images/cps/main02_plus_icon.png'/>"></a>
				      </span>
				      </p>
					  <span>적용기간  <span id="date_from" name="dateFrom"></span> ~ <span id="date_to" name="dateTo"></span></span>
					  <table>
						<colgroup>
						  <col width="33.33%" />
						  <col width="33.33%" />
						  <col width="*" />
						</colgroup>
						<tbody>
						  <tr>
							<th class="taC">국가(통화)</th>
							<th>수출</th>
							<th>수입</th>
						  </tr>
						  <tr>
							<td class="taC">미국 (USD)</td>
							<td><div id="usd_e" name="usdE"></div></td>
							<td><div id="usd_i" name="usdI"></div></td>
						  </tr>
						  <tr>
							<td class="taC">일본 (JPY)</td>
							<td><div id="jpy_e" name="jpyE"></div></td>
							<td><div id="jpy_i" name="jpyI"></div></td>
						  </tr>
						  <tr>
							<td class="taC">유럽연합 (EUR)</td>
							<td><div id="eur_e" name="eurE"></div></td>
							<td><div id="eur_i" name="eurI"></div></td>
						  </tr>
						  <tr>
							<td class="taC">중국 (CNY)</td>
							<td><div id="cny_e" name="cnyE"></div></td>
							<td><div id="cny_i" name="cnyI"></div></td>
						  </tr>
						</tbody>
					  </table>
					</div>
				    <div class="main02_box02">
				      <p>법령개정공시
					  	<span class="btn_b">
					      <!-- a href="javascript:bbsWrite('LAWS');" id="write2" style="display:none"><img src="<c:url value='/images/cps/main02_write_icon.png'/>"></a>
					      <a href="javascript:bbslist('LAWS');"><img src="<c:url value='/images/cps/main02_plus_icon.png'/>"></a-->
					  	</span>
					  </p>
					  <ul id="LawsNotice" style="padding-top:6px"></ul>
					</div>
					<div class="main02_box02">
					  <p>System notice
						<span class="btn_b">
						  <a href="javascript:bbsWrite('SYS');" id="write1" style="display:none"><img src="<c:url value='/images/cps/main02_write_icon.png'/>"></a>
						  <a href="javascript:bbslist('SYS');"><img src="<c:url value='/images/cps/main02_plus_icon.png'/>"></a>
						</span>
					  </p>
					  <ul id="SysNotice"></ul>
					</div>
				  </div>
				</div>
			  </div>
			</div>
		  </div>
	  	</div>
	  </div>
	</div>
	<form id="frmCommon" name="frmCommon">
      <input type="hidden" id="useYn" 		name="useYn" 	value="Y"/>
      <input type="hidden" id="category" 	name="category"/>
      <input type="hidden" id="size" 		name="size" 	value="6"/>
      <input type="hidden" id="page" 		name="page" 	value="0"/>
      <input type="hidden" id="GRADE" 		name="GRADE" 	value="${sessionScope.USERGRADE}"/>
    </form>
  </body>
</html>