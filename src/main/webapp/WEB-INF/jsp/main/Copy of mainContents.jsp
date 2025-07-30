<%@ page language="java" 	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
	<jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/plugins/chartjs/Chart.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/main/mainContents.js'/>"></script>
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
				<div class="main01">
				  <div class="main01_T">
					<div class="left">
					  <div class="inner">
						<div class="blue" onclick="openImport();" style="cursor:pointer">
						  <p>Import Status <span id="importweek" name="importweek"></span></p>
						  <div class="txt">
						    <table>
							<colgroup>
							  <col width="20%" />
							  <col width="30%" />
							  <col width="20%" />
							  <col width="30%" />
							</colgroup>
							<tbody>
							  <tr>
								<th class="taC">신고건</th>
								<td><span id="singo" name="singo"></span></th>
								<th>수리건</th>
								<td><span id="suri" name="suri"></span></th>
							  </tr>
							  <tr>
								<th class="taC">CIF(￦)</th>
								<td><span id="cifwon" name="cifwon"></span></th>
								<th>CIF($)</th>
								<td><span id="cifdal" name="cifdal"></span></th>
							  </tr>
							  <tr>
								<th class="taC">관세</th>
								<td><span id="gwan" name="gwan"></span></th>
								<th>부가세</th>
								<td><span id="vat" name="vat"></span></th>
							  </tr>
							  <tr>
								<th class="taC">기타세</th>
								<td><span id="etc" name="etc"></span></th>
								<th>총세액</th>
								<td><span id="taxwon" name="taxwon"></span></th>
							  </tr>
							</tbody>
						    </table>
						  </div>
						</div>
						<div class="green" onclick="openExport();" style="cursor:pointer">
						  <p>Export Status <span id="exportweek" name="exportweek"></span></p>
						  <div class="txt">
						    <table>
							<colgroup>
							  <col width="20%" />
							  <col width="80%" />
							</colgroup>
							<tbody>
							  <tr>
								<th class="taC">수리건</th>
								<td><span id="total1" name="total1"></span></th>
							  </tr>
							  <tr>
								<th class="taC">FOB(￦)</th>
								<td><span id="won1" name="won1"></span></th>
							  </tr>
							  <tr>
								<th class="taC">FOB($)</th>
								<td><span id="taxwon1" name="taxwon1"></span></th>
							  </tr>
							</tbody>
						    </table>
						  </div>
						</div>
					  </div>
				  	</div>
					<div class="right">
					  <canvas id="mainChart" style="height:180px;background:#fffcff;"></canvas>
					</div>
				  </div>
				</div>
				<div class="main02">
				  <div class="main02_con">
				    <div class="main02_box01">
				      <div id="blank" style="display:none;height:40px"></div>
				      <p id="todayLine" style="height:30px">Today ( <span id="today" name="today"></span> )</p>
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
						  	<tr id="addLine1" style="display:none;">
							  <td class="taC"><font color="red"><div id="delay" name="delay" onclick="javascript:parent.addTab('기한관리','../risk/deadLineList.cps?tab=0')" style="cursor:pointer"></div></font></td>
							  <td class="taC"><font color="red"><div id="banchul" name="banchul" onclick="javascript:parent.addTab('기한관리','../risk/deadLineList.cps?tab=1')" style="cursor:pointer"></div></font></td>
							  <td class="taC"><font color="red"><div id="ship" name="ship" onclick="javascript:parent.addTab('기한관리','../risk/deadLineList.cps?tab=2')" style="cursor:pointer"></div></font></td>
							  <td class="taC"><font color="red"><div id="reExport" name="reExport" onclick="javascript:parent.addTab('기한관리','../risk/deadLineList.cps?tab=3')" style="cursor:pointer"></div></font></td>
							  <td class="taC"><font color="red"><div id="Item" name="Item" onclick="javascript:parent.addTab('자재관리','../item/itemMasterList.cps')" style="cursor:pointer"></div></font></td>
						  	</tr>
						  	<tr id="addLine2">
							  <td class="taC"><font color="red"><div id="delay1" name="delay1"></div></font></td>
							  <td class="taC"><font color="red"><div id="banchul1" name="banchul1"></div></font></td>
							  <td class="taC"><font color="red"><div id="ship1" name="ship1"></div></font></td>
							  <td class="taC"><font color="red"><div id="reExport1" name="reExport1"></div></font></td>
							  <td class="taC"><font color="red"><div id="Item1" name="Item1"></div></font></td>
						  	</tr>
						  	<tr id="addLine3" style="display:none;">
							  <td class="taC"><font color="red"><div id="delay" name="delay" onclick="javascript:parent.addTab('기한관리','../risk/deadLineList.cps?tab=0')" style="cursor:pointer"></div></font></td>
							  <td class="taC"><font color="red"><div id="banchul" name="banchul" onclick="javascript:parent.addTab('기한관리','../risk/deadLineList.cps?tab=1')" style="cursor:pointer"></div></font></td>
							  <td class="taC"><font color="red"><div id="ship" name="ship" onclick="javascript:parent.addTab('기한관리','../risk/deadLineList.cps?tab=2')" style="cursor:pointer"></div></font></td>
							  <td class="taC"><font color="red"><div id="reExport" name="reExport" onclick="javascript:parent.addTab('기한관리','../risk/deadLineList.cps?tab=3')" style="cursor:pointer"></div></font></td>
							  <td class="taC"><font color="red"><div id="Item" name="Item" onclick="javascript:parent.addTab('자재관리','../item/itemMasterList1.cps')" style="cursor:pointer"></div></font></td>
						  	</tr>
						  </tbody>
					  	</table>
					  	<!-- div class="txt">
						  <p><span id="yyyy" name="yyyy"></span>&nbsp;수입 CIF(￦) : <b id="importTotal" name="importTotal" style="color:#2763ba"></b><br>
						  <span id="yyyy1" name="yyyy1"></span>&nbsp;수출 FOB(￦) : <b id="exportTotal" name="exportTotal" style="color:#2da490"></b></p>
					  	</div-->
					  </div>
					  <div class="inner" style="margin-top:-20px;border-top:1px #999999 dashed;width:94%">
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