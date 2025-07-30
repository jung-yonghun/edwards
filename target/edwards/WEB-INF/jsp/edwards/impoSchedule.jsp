<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/webjars/jquery/3.1.1/jquery.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/webjars/js-xlsx/0.8.0/shim.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/webjars/js-xlsx/0.8.0/dist/xlsx.full.min.js'/>"></script>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-bufferview.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-filter.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/edwards/impoSchedule.js?20231227'/>"></script>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="container">
		      <input type="hidden" id="ID" 	name="ID" 	value="${sessionScope.ID}">
			  <div class="easyui-layout" style="width:100%;height:735px">
			    <div data-options="region:'north',split:true" style="width:100%;height:360px;box-sizing:border-box;border:0px">
			    <div class="easyui-layout" style="width:100%;height:340px">
		      	<div data-options="region:'center'" style="width:100%;box-sizing:border-box;border:0px">
				  <div class="normal_Top">
				    <form id="frm1" name="frm1">
				  	<table width="100%">
				  	  <col width="08%" />
				  	  <col width="25%" />
				  	  <col width="01%" />
				  	  <col width="08%" />
				  	  <col width="25%" />
				  	  <col width="01%" />
				  	  <col width="08%" />
				  	  <col width="24%" />
					  <tr height="23px">
					    <td>
					      <select id="_DateType" name="_DateType" style="width:80px">
					      	<option value="DocRcvDt">서류접수일</option>
					      	<option value="Impo_ip_sc_date">입항예정일</option>
					      	<option value="SINGO_REQ_DT">통관요청일</option>
						  </select>
					    </td>
					  	<td>
					  	  <input type="text" id="strFromDate" 	name="strFromDate" style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/> ~
					  	  <input type="text" id="strToDate" 	name="strToDate"   style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/>
					  	  <div class="normal_btn">
						  	<a href="#" class="arrow" onclick="fn_prevday()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
						  	<a href="#" onclick="fn_today()">일</a>
						  	<a href="#" class="arrow" onclick="fn_nextday()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
						  	<a href="#" class="arrow1"></a>
						  	<a href="#" class="arrow" onclick="fn_prevweek()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
						  	<a href="#" onclick="fn_week()">주</a>
						  	<a href="#" class="arrow" onclick="fn_nextweek()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
						  	<a href="#" class="arrow1"></a>
						  	<a href="#" class="arrow" onclick="fn_prevmonth()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
						  	<a href="#" onclick="fn_month()">월</a>
						  	<a href="#" class="arrow" onclick="fn_nextmonth()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
						  </div>
					  	</td>
					  	<td></td>
					  	<td>BL번호</td>
					  	<td><input type="text" id="BL_NO" name="BL_NO" onkeypress="keyDown()"/></td>
					  	<td></td>
					  	<td>긴급여부</td>
					  	<td>
					  	  <select id="UrgencyYN" name="UrgencyYN" style="width:80px">
					      	<option value="">전체</option>
					      	<option value="Y">Y</option>
					      	<option value="N">N</option>
						  </select>
					  	</td>
					  </tr>
					  <tr height="23px">
					    <td>통관계획</td>
					  	<td>
					  	  <select id="Impo_plan" name="Impo_plan" style="width:200px">
					  	    <option value="">전체</option>
					      	<option value="A">출항전신고</option>
					      	<option value="B">입항전신고</option>
					      	<option value="C">보세구역도착전</option>
					      	<option value="D">보세구역장치후</option>
					      	<option value="E">도착전부두직반출</option>
					      	<option value="F">도착후부두직반출</option>
					      	<option value="G">물품반출후수입신고</option>
					      	<option value="H">적하목록없는물품(휴대품)</option>
					      	<option value="Z">적하목록없는물품(선용품 등)</option>
						  </select>
					  	</td>
					  	<td></td>
					  	<td>Status</td>
					  	<td>
					  	  <select id="StatusFlag" name="StatusFlag" style="width:80px">
					  	    <option value="">전체</option>
					      	<option value="001">서류보완</option>
					      	<option value="002">요건확인</option>
					      	<option value="003">비용확인</option>
					      	<option value="004">입항대기</option>
					      	<option value="005">반입대기</option>
					      	<option value="006">세관검사</option>
					      	<option value="007">기타</option>
						  </select>
					  	</td>
					  	<td></td>
					  	<td>Pending 여부</td>
					  	<td>
					  	  <select id="PendingYN" name="PendingYN" style="width:80px">
					      	<option value="">전체</option>
					      	<option value="Y">Y</option>
					      	<option value="N">N</option>
						  </select>
					  	</td>
					  </tr>
				  	</table>
				  	</form>
				  </div>
				  <div class="normal_Button">
				  	<a href="javascript:fn_searchAction();">조회</a>
				  	<a href="javascript:fn_searchExcel();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
				  </div>
				  <div class="normal_con01">
				  	<table id="masterGrid"></table>
				  </div>
				  <div class="normal_con01" style="display:none">
				  	<table id="excelGrid"></table>
				  </div>
				  <%@ include file="/WEB-INF/jsp/include/excelDown.jsp" %>
			  	</div>
			  	</div>
			  	</div>
			  	<div data-options="region:'center',split:true" style="width:100%;box-sizing:border-box;border:0px">
	    	        <div class="normal_Button" style="margin-left:10px;">
					  	<a href="javascript:fn_commentAction();">Comment 등록</a>
					</div>
			  	    <div class="main02">
				    <div class="main02_con">
	    	        <div class="main02_box01" style="width:100%;">
	    	          <div class="right">
		      	  	  <form id="updateForm" name="updateForm">
			  		  <table>
			  		  	<col width="08%">
                       	<col width="17%">
                       	<col width="08%">
                       	<col width="17%">
                       	<col width="08%">
                       	<col width="17%">
                      	<col width="08%">
                       	<col width="17%">
                       	<tr style="height:100px">
                          <th>관세사<br>comment</th>
                          <td colspan="3" class="tal"><textarea type="text" id="MemoCus" name="MemoCus" style="width:100%;height:90px" readOnly/></textarea>
                          <th style="border-right:1px solid #dcdcdc;">Edwards<br>comment</th>
                          <td colspan="3" class="tal"><textarea type="text" id="MemoDeal" name="MemoDeal" style="width:100%;height:90px"/></textarea>
                      	</tr>
                      	<tr>
                          <th>화물상태</th>
                          <td class="tal"><input type="text" id="PROC_STAT1" name="PROC_STAT1" style="width:50%;" readOnly/></td>
                          <th>통관상태</th>
                          <td class="tal"><input type="text" id="" name="" style="width:50%;" readOnly/></td>
                          <th>적하목록</th>
                          <td class="tal"><input type="text" id="Impo_mf_date" name="Impo_mf_date" style="width:50%;" readOnly/></td>
                          <th style="border-right:1px solid #dcdcdc;">보세운송</th>
                          <td class="tal"><input type="text" id="Impo_unsong_date" name="Impo_unsong_date" style="width:50%;" readOnly/></td>
                      	</tr>
                      	<tr>
                      	  <th>입항일자</th>
                          <td class="tal"><input type="text" id="Impo_iphang_date" name="Impo_iphang_date" style="width:50%;" readOnly/></td>
                          <th>반입일시</th>
                          <td class="tal"><input type="text" id="Impo_banip_date" name="Impo_banip_date" style="width:50%;" readOnly/></td>
                          <th>반출일시</th>
                          <td class="tal"><input type="text" id="Impo_banchul_date" name="Impo_banchul_date" style="width:50%;" readOnly/></td>
                          <th style="border-right:1px solid #dcdcdc;">정산일자</th>
                          <td class="tal"><input type="text" id="Impo_jungsan_date" name="Impo_jungsan_date" style="width:50%;" readOnly/></td>
                      	</tr>
                      	<tr>
                      	  <th>수입신고일시</th>
                          <td class="tal"><input type="text" id="Impo_jubsu_date" name="Impo_jubsu_date" style="width:50%;" readOnly/></td>
                          <th>신고수리일시</th>
                          <td class="tal"><input type="text" id="Impo_ok_dttm" name="Impo_ok_dttm" style="width:50%;" readOnly/></td>
                          <th>검사여부</th>
                          <td class="tal"><input type="text" id="impo_cs" name="impo_cs" style="width:10%;" readOnly/></td>
                          <th style="border-right:1px solid #dcdcdc;">검사(예정)일자</th>
                          <td class="tal"><input type="text" id="impo_csDt" name="impo_csDt" style="width:50%;" readOnly/></td>
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
		  </div>
		</div>
	  </div>
	</div>
  </body>
</html>