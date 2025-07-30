<%@ page language="java" 	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
	<jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/cps/main/edwardsMain.js?250214'/>"></script>
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
				    <div class="main02_box01" style="height:140px;background:#fff0fe;">
				      <p id="todayLine" style="height:30px">위험관리 ( <span id="today" name="today"></span> )</p>
					  <div class="right">
					    <table>
						  <colgroup>
						  	<col width="20%" />
						  	<col width="20%" />
						  	<col width="20%" />
						  	<col width="20%" />
						  	<col width="20%" />
						  </colgroup>
						  <tbody>
						  	<tr>
							  <th class="taC">신고지연</th>
							  <th>반출불이행</th>
							  <th>미선적</th>
							  <th>재수출</th>
							  <th>신규자재</th>
						  	</tr>
						  	<tr id="addLine1">
							  <td class="taC" style="background:#fff;"><font color="red"><div id="delay" name="delay" onclick="javascript:parent.addTab('기한관리','../edwards/deadLineList.cps?tab=0')" style="cursor:pointer"></div></font></td>
							  <td class="taC" style="background:#fff;"><font color="red"><div id="banchul" name="banchul"  onclick="javascript:parent.addTab('기한관리','../edwards/deadLineList.cps?tab=1')" style="cursor:pointer"></div></font></td>
							  <td class="taC" style="background:#fff;"><font color="red"><div id="ship" name="ship"  onclick="javascript:parent.addTab('기한관리','../edwards/deadLineList.cps?tab=2')" style="cursor:pointer"></div></font></td>
							  <td class="taC" style="background:#fff;"><font color="red"><div id="reExport" name="reExport"  onclick="javascript:parent.addTab('기한관리','../edwards/deadLineList.cps?tab=3')" style="cursor:pointer"></div></font></td>
							  <td class="taC" style="background:#fff;"><font color="red"><div id="Item" name="Item"  onclick="javascript:parent.addTab('자재관리','../edwards/itemMasterList.cps')" style="cursor:pointer"></div></font></td>
						  	</tr>
						  </tbody>
					  	</table>
					  </div>
					</div>
				    <div class="main02_box01" style="height:140px;background:#daecf2;">
					  <p id="todayLine" style="height:30px">Import Status</p>
					  <div class="right">
					    <table>
						  <colgroup>
						  	<col width="20%" />
						  	<col width="20%" />
						  	<col width="20%" />
						  	<col width="20%" />
						  	<col width="20%" />
						  </colgroup>
						  <tbody>
						  	<tr>
							  <th></th>
							  <th>작성</th>
							  <th>신고</th>
							  <th>미결</th>
							  <th>수리</th>
						  	</tr>
						  	<tr>
							  <th style="border-right:1px solid #dcdcdc;">금일</th>
							  <td class="taC" style="background:#fff;"><font color="red"><div id="im01" name="im01"></div></font></td>
							  <td class="taC" style="background:#fff;"><font color="red"><div id="im02" name="im02"></div></font></td>
							  <td class="taC" style="background:#fff;"><font color="red"><div id="im03" name="im03"></div></font></td>
							  <td class="taC" style="background:#fff;"><font color="red"><div id="im04" name="im04"></div></font></td>
						  	</tr>
						  	<tr>
							  <th style="border-right:1px solid #dcdcdc;">금월</th>
							  <td class="taC" style="background:#fff;"><font color="red"><div id="im05" name="im05"></div></font></td>
							  <td class="taC" style="background:#fff;"><font color="red"><div id="im06" name="im06"></div></font></td>
							  <td class="taC" style="background:#fff;"><font color="red"><div id="im07" name="im07"></div></font></td>
							  <td class="taC" style="background:#fff;"><font color="red"><div id="im08" name="im08"></div></font></td>
						  	</tr>
						  </tbody>
					  	</table>
					  </div>
				    </div>
					<div class="main02_box01" style="height:140px;background:#d0f7ee;">
					  <p id="todayLine" style="height:30px">Export Status</p>
					  <div class="right">
					    <table>
						  <colgroup>
						  	<col width="25%" />
						  	<col width="25%" />
						  	<col width="25%" />
						  	<col width="25%" />
						  </colgroup>
						  <tbody>
						  	<tr>
							  <th></th>
							  <th>작성</th>
							  <th>미결</th>
							  <th>수리</th>
						  	</tr>
						  	<tr>
							  <th style="border-right:1px solid #dcdcdc;">금일</th>
							  <td class="taC" style="background:#fff;"><font color="red"><div id="ex01" name="ex01"></div></font></td>
							  <td class="taC" style="background:#fff;"><font color="red"><div id="ex02" name="ex02"></div></font></td>
							  <td class="taC" style="background:#fff;"><font color="red"><div id="ex03" name="ex03"></div></font></td>
						  	</tr>
						  	<tr>
							  <th style="border-right:1px solid #dcdcdc;">금월</th>
							  <td class="taC" style="background:#fff;"><font color="red"><div id="ex04" name="ex04"></div></font></td>
							  <td class="taC" style="background:#fff;"><font color="red"><div id="ex05" name="ex05"></div></font></td>
							  <td class="taC" style="background:#fff;"><font color="red"><div id="ex06" name="ex06"></div></font></td>
						  	</tr>
						  </tbody>
					  	</table>
					  </div>
					</div>
				  </div>
				</div>
				<div class="main02">
				  <div class="main02_con">
				    <div class="main02_box01" style="background:#fff3e3;height:472px;position:absolute;width:32%">
				      <p id="todayLine" style="height:30px">Contact Point&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(공용 E-mail : <a href="mailto:ek@esein.co.kr">ek@esein.co.kr</a>)</p>
				      <div class="right">
					    <table>
						  <colgroup>
						  	<col width="25%" />
						  	<col width="25%" />
						  	<col width="25%" />
						  	<col width="25%" />
						  </colgroup>
						  <tbody>
						  	<tr>
							  <th>업무구분</th>
							  <th>담당자</th>
							  <th>연락처</th>
							  <th>E-mail</th>
						  	</tr>
						  	<tr>
							  <th style="border-right:1px solid #dcdcdc;">총괄</th>
							  <td class="taC" style="background:#fff;">고영환 본부장</td>
							  <td class="taC" style="background:#fff;">070-4353-0672</td>
							  <td class="taC" style="background:#fff;"><a href="mailto:yhgo@esein.co.kr">yhgo@esein.co.kr</a></td>
						  	</tr>
						  	<tr>
							  <th style="border-right:1px solid #dcdcdc;">CS</th>
							  <td class="taC" style="background:#fff;">이수호 관세사</td>
							  <td class="taC" style="background:#fff;">070-4353-5151</td>
							  <td class="taC" style="background:#fff;"><a href="mailto:shlee3@esein.co.kr">shlee3@esein.co.kr</a></td>
						  	</tr>
						  	<tr>
							  <th rowspan="3" style="border-right:1px solid #dcdcdc;">수입</th>
							  <td class="taC" style="background:#fff;">김진태 이사</td>
							  <td class="taC" style="background:#fff;">070-4353-1536</td>
							  <td class="taC" style="background:#fff;"><a href="mailto:jtkim@esein.co.kr">jtkim@esein.co.kr</a></td>
						  	</tr>
							<tr>
							  <td class="taC" style="background:#fff;">이희재 과장</td>
							  <td class="taC" style="background:#fff;">070-4353-1539</td>
							  <td class="taC" style="background:#fff;"><a href="mailto:ek@esein.co.kr">ek@esein.co.kr</a></td>
						  	</tr>
							<tr>
							  <td class="taC" style="background:#fff;">전선옥 대리</td>
							  <td class="taC" style="background:#fff;">070-4353-0677</td>
							  <td class="taC" style="background:#fff;"><a href="mailto:ek@esein.co.kr">ek@esein.co.kr</a></td>
						  	</tr>
						  	<tr>
							  <th rowspan="2" style="border-right:1px solid #dcdcdc;">수출</th>
							  <td class="taC" style="background:#fff;">김미희 부장</td>
							  <td class="taC" style="background:#fff;">070-4353-1537</td>
							  <td class="taC" style="background:#fff;"><a href="mailto:mhkim@esein.co.kr">mhkim@esein.co.kr</a></td>
						  	</tr>
							<tr>
							  <td class="taC" style="background:#fff;">임유나 대리</td>
							  <td class="taC" style="background:#fff;">070-4353-0673</td>
							  <td class="taC" style="background:#fff;"><a href="mailto:ek@esein.co.kr">ek@esein.co.kr</a></td>
						  	</tr>
						  	<tr>
							  <th style="border-right:1px solid #dcdcdc;">IT 지원</th>
							  <td class="taC" style="background:#fff;">김경식 상무</td>
							  <td class="taC" style="background:#fff;">070-4353-4422</td>
							  <td class="taC" style="background:#fff;"><a href="mailto:kskim@esein.co.kr">kskim@esein.co.kr</a></td>
						  	</tr>
						  </tbody>
					  	</table>
					  </div>
					</div>
					<div class="main02_box02">
					</div>
				    <div class="main02_box02">
					  <p>관세무역정보
						<span class="btn_b">
						  <a href="javascript:bbslist('HSNEWS');"><img src="<c:url value='/images/cps/main02_plus_icon.png'/>"></a>
						</span>
					  </p>
					  <ul id="NewsNotice"></ul>
					</div>
					<div class="main02_box02">
					  <p>뉴스레터
						<span class="btn_b">
						  <a href="javascript:bbslist('CUSTOMS');"><img src="<c:url value='/images/cps/main02_plus_icon.png'/>"></a>
						</span>
					  </p>
					  <ul id="CustomsNotice"></ul>
					</div>
				  </div>
				</div>
				<div class="main02">
				  <div class="main02_con">
				    <div class="main02_box02">
					</div>
				    <div class="main02_box02">
				      <p>FAQ
					  	<span class="btn_b" id="qna1" style="display:none">
						  <a href="javascript:bbsWriteEd('QNA');"><img src="<c:url value='/images/cps/main02_write_icon.png'/>"></a>
						  <a href="javascript:bbslistEd('QNA');"><img src="<c:url value='/images/cps/main02_plus_icon.png'/>"></a>
						</span>
						<span class="btn_b" id="qna2" style="display:block">
						  <a href="javascript:bbslistEd('QNA');"><img src="<c:url value='/images/cps/main02_plus_icon.png'/>"></a>
						</span>
					  </p>
					  <ul id="QnaNotice"  style="padding-top:6px"></ul>
					</div>
					<div class="main02_box01" style="background:#ffffd7;">
					  <input type="hidden" id="nowdate" name="nowdate" maxlength="8"/>
					  <p>Exchange rate for taxation
					  <span class="btn_b" style="background:#fff;">
						<a href="javascript:linkExchange();"><img src="<c:url value='/images/cps/main02_plus_icon.png'/>"></a>
				      </span>
				      </p>
					  <span style="background:#fff;">적용기간  <span id="date_from" name="dateFrom"></span> ~ <span id="date_to" name="dateTo"></span></span>
					  <table>
						<colgroup>
						  <col width="33.33%" />
						  <col width="33.33%" />
						  <col width="*" />
						</colgroup>
						<tbody>
						  <tr>
							<th>국가(통화)</th>
							<th>수출 (Export)</th>
							<th>수입 (Import)</th>
						  </tr>
						  <tr style="background:#fff;">
							<th style="border-right:1px solid #dcdcdc;">미국 (USD)</th>
							<td><div id="usd_e" name="usdE"></div></td>
							<td><div id="usd_i" name="usdI"></div></td>
						  </tr>
						  <tr style="background:#fff;">
							<th style="border-right:1px solid #dcdcdc;">영국 (GBP)</th>
							<td><div id="jpy_e" name="jpyE"></div></td>
							<td><div id="jpy_i" name="jpyI"></div></td>
						  </tr>
						  <tr style="background:#fff;">
							<th style="border-right:1px solid #dcdcdc;">유럽연합 (EUR)</th>
							<td><div id="eur_e" name="eurE"></div></td>
							<td><div id="eur_i" name="eurI"></div></td>
						  </tr>
						  <tr style="background:#fff;">
							<th style="border-right:1px solid #dcdcdc;">중국 (CNY)</th>
							<td><div id="cny_e" name="cnyE"></div></td>
							<td><div id="cny_i" name="cnyI"></div></td>
						  </tr>
						</tbody>
					  </table>
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