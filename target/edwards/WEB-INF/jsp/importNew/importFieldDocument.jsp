<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/includeNew/head_title.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/includeNew/head_css.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/includeNew/head_js.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/jsNew/cps/import/importFieldDocument.js'/>"></script>
  </head>
  <body>
    <div id="page-wrapper" style="margin:10px">
      <div class="row">
        <input type="hidden" id="ID"	name="ID"	value="${sessionScope.ID}">
        <div class="easyui-tabs" id="tabs" data-options="fit:true,plain:true" style="width:100%;height:760px">
		  <div title="수입" style="padding:0px;">
	        <div class="col-md-12">
			  <form id="frm" name="frm">
			  <input type='hidden' id='strTest' name='strTest'/>
			  <table class="table table-bordered">
			  	<col width="08%"/>
		  	    <col width="26%"/>
		   	    <col width="08%"/>
		  	    <col width="25%"/>
		  	    <col width="08%"/>
		  	    <col width="25%"/>
			  	<tr>
				  <td class="info text-center">
				    <select id="strDateType" name="strDateType" style="width:65px" class="input-sm">
				  	  <option value="singoDtm">신고일</option>
				  	  <option value="suriDtm">수리일</option>
				    </select>
				  </td>
				  <td>
				    <input type="text" id="strFromDate" name="strFromDate" 	class="input-sm" style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/> ~
				    <input type="text" id="strToDate" 	name="strToDate" 	class="input-sm" style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/>
				    <img src="../imagesNew/common/ico_left.gif" onclick="fn_prevday()"><img src="../imagesNew/common/today.gif" onclick="fn_today()"><img src="../imagesNew/common/ico_right.gif" onclick="fn_nextday()">
				    <img src="../imagesNew/common/ico_left.gif" onclick="fn_prevweek()"><img src="../imagesNew/common/week.gif" onclick="fn_week()"><img src="../imagesNew/common/ico_right.gif" onclick="fn_nextweek()">
				    <img src="../imagesNew/common/ico_left.gif" onclick="fn_prevmonth()"><img src="../imagesNew/common/month.gif" onclick="fn_month()"><img src="../imagesNew/common/ico_right.gif" onclick="fn_nextmonth()">
				  </td>
			  	  <td class="info text-center">납세자상호</td>
			  	  <td><input type="text" id="strImpoNapseSangho" name="strImpoNapseSangho" onkeypress="keyDown()" class="input-sm" style="width:100%;"/></td>
			  	  <td class="info text-center">신고번호</td>
			  	  <td><input type="text" id="strImpoSingoNo" name="strImpoSingoNo" onkeypress="keyDown()" class="input-sm" style="width:100%;"/></td>
			  	</tr>
				<tr>
				  <td class="info text-center">세관</td>
				  <td>
				    <select name="strImpoGroupSegwan" id="strImpoGroupSegwan" style="width:100px;" class="input-sm"></select>
				  </td>
				  <td class="info text-center">B/L No</td>
				  <td><input type="text" id="strImpoBlNo" name="strImpoBlNo" onkeypress="keyDown()" class="input-sm" style="width:100%;"/></td>
				  <td class="info text-center">파일번호1</td>
				  <td><input type="text" id="strImpoFileNo1" name="strImpoFileNo1" onkeypress="keyDown()" class="input-sm" style="width:100%;"/></td>
				</tr>
			  </table>
			  </form>
			</div>
			<div class="col-md-9">
			  <div style="margin-bottom:7px;">
			  	<button type="button" class="btn btn-primary btn-xs" onclick="fn_searchAction()">전체조회</button>
			  	<button type="button" class="btn btn-warning btn-xs" onclick="fn_searchAction1()">서류/검사</button>
			  	<button type="button" class="btn btn-success btn-xs" onclick="fn_sendAction0('D')">관리로 이동(서류)</button>
			  	<button type="button" class="btn btn-success btn-xs" onclick="fn_sendAction0('T')">관리로 이동(검사)</button>
			  </div>
			  <div class="panel panel-primary">
	            <div class="panel-heading">수입현장</div>
	            <div class="panel-body well-sm" id='parentDivM0'>
	              <table id="masterGrid0"></table>
				  <div id="masterPager0"></div>
	            </div>
	          </div>
			</div>
			<div class="col-md-3">
		   	  <div class="panel panel-primary"  style="margin-top:28px">
	            <div class="panel-heading">Docu Area</div>
	            <div class="panel-body well-sm" id='parentDivF0'>
	           	  <table id="fileGrid0"></table>
	  			  <div id="filePager0"></div>
	            </div>
	          </div>
			</div>
		  </div>
		  <!-- div title="New수입" style="padding:0px;">
	        <div class="col-md-12">
			  <form id="frm1" name="frm1">
			  <input type='hidden' id='strTest1' name='strTest1'/>
			  <table class="table table-bordered">
			  	<col width="08%"/>
		  	    <col width="26%"/>
		   	    <col width="08%"/>
		  	    <col width="25%"/>
		  	    <col width="08%"/>
		  	    <col width="25%"/>
			  	<tr>
				  <td class="info text-center">
				    <select id="strDateType" name="strDateType" style="width:65px" class="input-sm">
				  	  <option value="singoDtm">신고일</option>
				  	  <option value="suriDtm">수리일</option>
				    </select>
				  </td>
				  <td>
				    <input type="text" id="strFromDate1" name="strFromDate1"  class="input-sm" style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/> ~
				    <input type="text" id="strToDate1" 	 name="strToDate1" 	  class="input-sm" style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/>
				    <img src="../imagesNew/common/ico_left.gif" onclick="fn_prevday1()"><img src="../imagesNew/common/today.gif" onclick="fn_today1()"><img src="../imagesNew/common/ico_right.gif" onclick="fn_nextday1()">
				    <img src="../imagesNew/common/ico_left.gif" onclick="fn_prevweek1()"><img src="../imagesNew/common/week.gif" onclick="fn_week1()"><img src="../imagesNew/common/ico_right.gif" onclick="fn_nextweek1()">
				    <img src="../imagesNew/common/ico_left.gif" onclick="fn_prevmonth1()"><img src="../imagesNew/common/month.gif" onclick="fn_month1()"><img src="../imagesNew/common/ico_right.gif" onclick="fn_nextmonth1()">
				  </td>
			  	  <td class="info text-center">납세자상호</td>
			  	  <td><input type="text" id="strImpoNapseSangho" name="strImpoNapseSangho" onkeypress="keyDown()" class="input-sm" style="width:100%;"/></td>
			  	  <td class="info text-center">신고번호</td>
			  	  <td><input type="text" id="strImpoSingoNo" name="strImpoSingoNo" onkeypress="keyDown()" class="input-sm" style="width:100%;"/></td>
			  	</tr>
				<tr>
				  <td class="info text-center">세관</td>
				  <td>
				    <select name="strImpoGroupSegwan" id="strImpoGroupSegwan" style="width:100px;" class="input-sm"></select>
				  </td>
				  <td class="info text-center">B/L No</td>
				  <td><input type="text" id="strImpoBlNo" name="strImpoBlNo" onkeypress="keyDown()" class="input-sm" style="width:100%;"/></td>
				  <td class="info text-center">파일번호1</td>
				  <td><input type="text" id="strImpoFileNo1" name="strImpoFileNo1" onkeypress="keyDown()" class="input-sm" style="width:100%;"/></td>
				</tr>
			  </table>
			  </form>
			</div>
			<div class="col-md-9">
			  <div style="margin-bottom:7px;">
			  	<button type="button" class="btn btn-primary btn-xs" onclick="fn_searchAction()">전체조회</button>
			  	<button type="button" class="btn btn-warning btn-xs" onclick="fn_searchAction1()">서류/검사</button>
			  	<button type="button" class="btn btn-success btn-xs" onclick="fn_sendAction1('D')">관리로 이동(서류)</button>
			  	<button type="button" class="btn btn-success btn-xs" onclick="fn_sendAction1('T')">관리로 이동(검사)</button>
			  </div>
			  <div class="panel panel-primary">
	            <div class="panel-heading">수입현장</div>
	            <div class="panel-body well-sm" id='parentDivM1'>
	              <table id="masterGrid1"></table>
				  <div id="masterPager1"></div>
	            </div>
	          </div>
			</div>
			<div class="col-md-3">
		   	  <div class="panel panel-primary"  style="margin-top:28px">
	            <div class="panel-heading">Docu Area</div>
	            <div class="panel-body well-sm" id='parentDivF1'>
	           	  <table id="fileGrid1"></table>
	  			  <div id="filePager1"></div>
	            </div>
	          </div>
			</div>
		  </div-->
		  <div title="수입정정" style="padding:0px;">
	        <div class="col-md-12">
			  <form id="frm2" name="frm2">
			  <table class="table table-bordered">
			  	<col width="08%"/>
		  	    <col width="26%"/>
		   	    <col width="08%"/>
		  	    <col width="25%"/>
		  	    <col width="08%"/>
		  	    <col width="25%"/>
			  	<tr>
				  <td class="info text-center">
				    <select id="strDateType" name="strDateType" style="width:65px" class="input-sm">
				  	  <option value="sinchungDtm">신청일</option>
				  	  <option value="singoDtm">신고일</option>
				    </select>
				  </td>
				  <td>
				    <input type="text" id="strFromDate2" name="strFromDate2"  class="input-sm" style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/> ~
				    <input type="text" id="strToDate2" 	 name="strToDate2" 	  class="input-sm" style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/>
				    <img src="../imagesNew/common/ico_left.gif" onclick="fn_prevday2()"><img src="../imagesNew/common/today.gif" onclick="fn_today2()"><img src="../imagesNew/common/ico_right.gif" onclick="fn_nextday2()">
				    <img src="../imagesNew/common/ico_left.gif" onclick="fn_prevweek2()"><img src="../imagesNew/common/week.gif" onclick="fn_week2()"><img src="../imagesNew/common/ico_right.gif" onclick="fn_nextweek2()">
				    <img src="../imagesNew/common/ico_left.gif" onclick="fn_prevmonth2()"><img src="../imagesNew/common/month.gif" onclick="fn_month2()"><img src="../imagesNew/common/ico_right.gif" onclick="fn_nextmonth2()">
				  </td>
			  	  <td class="info text-center">납세자상호</td>
			  	  <td><input type="text" id="strImpoNapseSangho" name="strImpoNapseSangho" onkeypress="keyDown()" class="input-sm" style="width:100%;"/></td>
			  	  <td class="info text-center">신고번호</td>
			  	  <td><input type="text" id="strImpoSingoNo" name="strImpoSingoNo" onkeypress="keyDown()" class="input-sm" style="width:100%;"/></td>
			  	</tr>
				<tr>
				  <td class="info text-center">세관</td>
				  <td>
				    <select name="strImpoGroupSegwan" id="strImpoGroupSegwan" style="width:100px;" class="input-sm"></select>
				  </td>
				  <td class="info text-center">B/L No</td>
				  <td><input type="text" id="strImpoBlNo" name="strImpoBlNo" onkeypress="keyDown()" class="input-sm" style="width:100%;"/></td>
				  <td colspan="2"></td>
				</tr>
			  </table>
			  </form>
			</div>
			<div class="col-md-9">
			  <div style="margin-bottom:7px;">
			  	<button type="button" class="btn btn-primary btn-xs" onclick="fn_searchAction()">전체조회</button>
			  	<button type="button" class="btn btn-success btn-xs" onclick="fn_sendAction2()">관리로 이동(서류)</button>
			  </div>
			  <div class="panel panel-primary">
	            <div class="panel-heading">수입정정 현장</div>
	            <div class="panel-body well-sm" id='parentDivM2'>
	              <table id="masterGrid2"></table>
				  <div id="masterPager2"></div>
	            </div>
	          </div>
			</div>
			<div class="col-md-3">
		   	  <div class="panel panel-primary"  style="margin-top:28px">
	            <div class="panel-heading">Docu Area</div>
	            <div class="panel-body well-sm" id='parentDivF2'>
	           	  <table id="fileGrid2"></table>
	  			  <div id="filePager2"></div>
	            </div>
	          </div>
			</div>
		  </div>
		  <!--div title="New수입정정" style="padding:0px;">
	        <div class="col-md-12">
			  <form id="frm3" name="frm3">
			  <table class="table table-bordered">
			  	<col width="08%"/>
		  	    <col width="26%"/>
		   	    <col width="08%"/>
		  	    <col width="25%"/>
		  	    <col width="08%"/>
		  	    <col width="25%"/>
			  	<tr>
				  <td class="info text-center">
				    <select id="strDateType" name="strDateType" style="width:65px" class="input-sm">
				  	  <option value="sinchungDtm">신청일</option>
				  	  <option value="singoDtm">신고일</option>
				    </select>
				  </td>
				  <td>
				    <input type="text" id="strFromDate3" name="strFromDate3"  class="input-sm" style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/> ~
				    <input type="text" id="strToDate3" 	 name="strToDate3" 	  class="input-sm" style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/>
				    <img src="../imagesNew/common/ico_left.gif" onclick="fn_prevday3()"><img src="../imagesNew/common/today.gif" onclick="fn_today3()"><img src="../imagesNew/common/ico_right.gif" onclick="fn_nextday3()">
				    <img src="../imagesNew/common/ico_left.gif" onclick="fn_prevweek3()"><img src="../imagesNew/common/week.gif" onclick="fn_week3()"><img src="../imagesNew/common/ico_right.gif" onclick="fn_nextweek3()">
				    <img src="../imagesNew/common/ico_left.gif" onclick="fn_prevmonth3()"><img src="../imagesNew/common/month.gif" onclick="fn_month3()"><img src="../imagesNew/common/ico_right.gif" onclick="fn_nextmonth3()">
				  </td>
			  	  <td class="info text-center">납세자상호</td>
			  	  <td><input type="text" id="strImpoNapseSangho" name="strImpoNapseSangho" onkeypress="keyDown()" class="input-sm" style="width:100%;"/></td>
			  	  <td class="info text-center">신고번호</td>
			  	  <td><input type="text" id="strImpoSingoNo" name="strImpoSingoNo" onkeypress="keyDown()" class="input-sm" style="width:100%;"/></td>
			  	</tr>
				<tr>
				  <td class="info text-center">세관</td>
				  <td>
				    <select name="strImpoGroupSegwan" id="strImpoGroupSegwan" style="width:100px;" class="input-sm"></select>
				  </td>
				  <td class="info text-center">B/L No</td>
				  <td><input type="text" id="strImpoBlNo" name="strImpoBlNo" onkeypress="keyDown()" class="input-sm" style="width:100%;"/></td>
				  <td colspan="2"></td>
				</tr>
			  </table>
			  </form>
			</div>
			<div class="col-md-9">
			  <div style="margin-bottom:7px;">
			  	<button type="button" class="btn btn-primary btn-xs" onclick="fn_searchAction()">전체조회</button>
			  	<button type="button" class="btn btn-success btn-xs" onclick="fn_sendAction3()">관리로 이동(서류)</button>
			  </div>
			  <div class="panel panel-primary">
	            <div class="panel-heading">수입정정 현장</div>
	            <div class="panel-body well-sm" id='parentDivM3'>
	              <table id="masterGrid3"></table>
				  <div id="masterPager3"></div>
	            </div>
	          </div>
			</div>
			<div class="col-md-3">
		   	  <div class="panel panel-primary"  style="margin-top:28px">
	            <div class="panel-heading">Docu Area</div>
	            <div class="panel-body well-sm" id='parentDivF3'>
	           	  <table id="fileGrid3"></table>
	  			  <div id="filePager3"></div>
	            </div>
	          </div>
			</div>
		  </div-->
		  <div title="수출" style="padding:0px;">
	        <div class="col-md-12">
			  <form id="frm4" name="frm4">
			  <table class="table table-bordered">
			  	<col width="08%"/>
		  	    <col width="26%"/>
		   	    <col width="08%"/>
		  	    <col width="25%"/>
		  	    <col width="08%"/>
		  	    <col width="25%"/>
			  	<tr>
				  <td class="info text-center">
				    <select id="strDateType" name="strDateType" style="width:65px" class="input-sm">
				  	  <option value="singoDtm">신고일</option>
				  	  <option value="suriDtm">수리일</option>
				    </select>
				  </td>
				  <td>
				    <input type="text" id="strFromDate4" name="strFromDate4" class="input-sm" style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/> ~
				    <input type="text" id="strToDate4" 	 name="strToDate4" 	 class="input-sm" style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/>
				    <img src="../imagesNew/common/ico_left.gif" onclick="fn_prevday4()"><img src="../imagesNew/common/today.gif" onclick="fn_today4()"><img src="../imagesNew/common/ico_right.gif" onclick="fn_nextday4()">
				    <img src="../imagesNew/common/ico_left.gif" onclick="fn_prevweek4()"><img src="../imagesNew/common/week.gif" onclick="fn_week4()"><img src="../imagesNew/common/ico_right.gif" onclick="fn_nextweek4()">
				    <img src="../imagesNew/common/ico_left.gif" onclick="fn_prevmonth4()"><img src="../imagesNew/common/month.gif" onclick="fn_month4()"><img src="../imagesNew/common/ico_right.gif" onclick="fn_nextmonth4()">
				  </td>
			  	  <td class="info text-center">수출자상호</td>
			  	  <td><input type="text" id="strSuchuljaSangho" name="strSuchuljaSangho" onkeypress="keyDown()" class="input-sm" style="width:100%;"/></td>
			  	  <td class="info text-center">신고번호</td>
			  	  <td><input type="text" id="strExpoSingoNo" name="strExpoSingoNo" onkeypress="keyDown()" class="input-sm" style="width:100%;"/></td>
			  	</tr>
				<tr>
				  <td class="info text-center">세관</td>
				  <td>
				    <select name="strExpoGroupSegwan" id="strExpoGroupSegwan" style="width:100px;" class="input-sm"></select>
				  </td>
				  <td class="info text-center">Inv No</td>
				  <td><input type="text" id="strExpoInvNo" name="strExpoInvNo" onkeypress="keyDown()" class="input-sm" style="width:100%;"/></td>
				  <td class="info text-center">계약번호1</td>
				  <td><input type="text" id="strExpoGeyakNo1" name="strExpoGeyakNo1" onkeypress="keyDown()" class="input-sm" style="width:100%;"/></td>
				</tr>
			  </table>
			  </form>
			</div>
			<div class="col-md-9">
			  <div style="margin-bottom:7px;">
			  	<button type="button" class="btn btn-primary btn-xs" onclick="fn_searchAction()">전체조회</button>
			  	<button type="button" class="btn btn-success btn-xs" onclick="fn_sendAction4('D')">관리로 이동(서류)</button>
			  	<button type="button" class="btn btn-success btn-xs" onclick="fn_sendAction4('T')">관리로 이동(검사)</button>
			  </div>
			  <div class="panel panel-primary">
	            <div class="panel-heading">수출현장</div>
	            <div class="panel-body well-sm" id='parentDivM4'>
	              <table id="masterGrid4"></table>
				  <div id="masterPager4"></div>
	            </div>
	          </div>
			</div>
			<div class="col-md-3">
		   	  <div class="panel panel-primary"  style="margin-top:28px">
	            <div class="panel-heading">Docu Area</div>
	            <div class="panel-body well-sm" id='parentDivF4'>
	           	  <table id="fileGrid4"></table>
	  			  <div id="filePager4"></div>
	            </div>
	          </div>
			</div>
		  </div>
		  <!--div title="New수출" style="padding:0px;">
	        <div class="col-md-12">
			  <form id="frm5" name="frm5">
			  <table class="table table-bordered">
			  	<col width="08%"/>
		  	    <col width="26%"/>
		   	    <col width="08%"/>
		  	    <col width="25%"/>
		  	    <col width="08%"/>
		  	    <col width="25%"/>
			  	<tr>
				  <td class="info text-center">
				    <select id="strDateType" name="strDateType" style="width:65px" class="input-sm">
				  	  <option value="singoDtm">신고일</option>
				  	  <option value="suriDtm">수리일</option>
				    </select>
				  </td>
				  <td>
				    <input type="text" id="strFromDate5" name="strFromDate5" class="input-sm" style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/> ~
				    <input type="text" id="strToDate5" 	 name="strToDate5" 	 class="input-sm" style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/>
				    <img src="../imagesNew/common/ico_left.gif" onclick="fn_prevday5()"><img src="../imagesNew/common/today.gif" onclick="fn_today5()"><img src="../imagesNew/common/ico_right.gif" onclick="fn_nextday5()">
				    <img src="../imagesNew/common/ico_left.gif" onclick="fn_prevweek5()"><img src="../imagesNew/common/week.gif" onclick="fn_week5()"><img src="../imagesNew/common/ico_right.gif" onclick="fn_nextweek5()">
				    <img src="../imagesNew/common/ico_left.gif" onclick="fn_prevmonth5()"><img src="../imagesNew/common/month.gif" onclick="fn_month5()"><img src="../imagesNew/common/ico_right.gif" onclick="fn_nextmonth5()">
				  </td>
			  	  <td class="info text-center">수출자상호</td>
			  	  <td><input type="text" id="strSuchuljaSangho" name="strSuchuljaSangho" onkeypress="keyDown()" class="input-sm" style="width:100%;"/></td>
			  	  <td class="info text-center">신고번호</td>
			  	  <td><input type="text" id="strExpoSingoNo" name="strExpoSingoNo" onkeypress="keyDown()" class="input-sm" style="width:100%;"/></td>
			  	</tr>
				<tr>
				  <td class="info text-center">세관</td>
				  <td>
				    <select name="strExpoGroupSegwan" id="strExpoGroupSegwan" style="width:100px;" class="input-sm"></select>
				  </td>
				  <td class="info text-center">Inv No</td>
				  <td><input type="text" id="strExpoInvNo" name="strExpoInvNo" onkeypress="keyDown()" class="input-sm" style="width:100%;"/></td>
				  <td class="info text-center">계약번호1</td>
				  <td><input type="text" id="strExpoGeyakNo1" name="strExpoGeyakNo1" onkeypress="keyDown()" class="input-sm" style="width:100%;"/></td>
				</tr>
			  </table>
			  </form>
			</div>
			<div class="col-md-9">
			  <div style="margin-bottom:7px;">
			  	<button type="button" class="btn btn-primary btn-xs" onclick="fn_searchAction()">전체조회</button>
			  	<button type="button" class="btn btn-success btn-xs" onclick="fn_sendAction5('D')">관리로 이동(서류)</button>
			  	<button type="button" class="btn btn-success btn-xs" onclick="fn_sendAction5('T')">관리로 이동(검사)</button>
			  </div>
			  <div class="panel panel-primary">
	            <div class="panel-heading">수출현장</div>
	            <div class="panel-body well-sm" id='parentDivM5'>
	              <table id="masterGrid5"></table>
				  <div id="masterPager5"></div>
	            </div>
	          </div>
			</div>
			<div class="col-md-3">
		   	  <div class="panel panel-primary"  style="margin-top:28px">
	            <div class="panel-heading">Docu Area</div>
	            <div class="panel-body well-sm" id='parentDivF5'>
	           	  <table id="fileGrid5"></table>
	  			  <div id="filePager5"></div>
	            </div>
	          </div>
			</div>
		  </div-->
		  <div title="수출정정" style="padding:0px;">
	        <div class="col-md-12">
			  <form id="frm6" name="frm6">
			  <table class="table table-bordered">
			  	<col width="08%"/>
		  	    <col width="26%"/>
		   	    <col width="08%"/>
		  	    <col width="25%"/>
		  	    <col width="08%"/>
		  	    <col width="25%"/>
			  	<tr>
				  <td class="info text-center">
				    <select id="strDateType" name="strDateType" style="width:65px" class="input-sm">
				  	  <option value="sinchungDtm">신청일</option>
				  	  <option value="singoDtm">신고일</option>
				    </select>
				  </td>
				  <td>
				    <input type="text" id="strFromDate6" name="strFromDate6" class="input-sm" style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/> ~
				    <input type="text" id="strToDate6" 	 name="strToDate6" 	 class="input-sm" style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/>
				    <img src="../imagesNew/common/ico_left.gif" onclick="fn_prevday6()"><img src="../imagesNew/common/today.gif" onclick="fn_today6()"><img src="../imagesNew/common/ico_right.gif" onclick="fn_nextday6()">
				    <img src="../imagesNew/common/ico_left.gif" onclick="fn_prevweek6()"><img src="../imagesNew/common/week.gif" onclick="fn_week6()"><img src="../imagesNew/common/ico_right.gif" onclick="fn_nextweek6()">
				    <img src="../imagesNew/common/ico_left.gif" onclick="fn_prevmonth6()"><img src="../imagesNew/common/month.gif" onclick="fn_month6()"><img src="../imagesNew/common/ico_right.gif" onclick="fn_nextmonth6()">
				  </td>
			  	  <td class="info text-center">수출자상호</td>
			  	  <td><input type="text" id="strSuchuljaSangho" name="strSuchuljaSangho" onkeypress="keyDown()" class="input-sm" style="width:100%;"/></td>
			  	  <td class="info text-center">신고번호</td>
			  	  <td><input type="text" id="strExpoSingoNo" name="strExpoSingoNo" onkeypress="keyDown()" class="input-sm" style="width:100%;"/></td>
			  	</tr>
				<tr>
				  <td class="info text-center">세관</td>
				  <td>
				    <select name="strExpoGroupSegwan" id="strExpoGroupSegwan" style="width:100px;" class="input-sm"></select>
				  </td>
				  <td class="info text-center">Inv No</td>
				  <td><input type="text" id="strExpoInvNo" name="strExpoInvNo" onkeypress="keyDown()" class="input-sm" style="width:100%;"/></td>
				  <td colspan="2"></td>
				</tr>
			  </table>
			  </form>
			</div>
			<div class="col-md-9">
			  <div style="margin-bottom:7px;">
			  	<button type="button" class="btn btn-primary btn-xs" onclick="fn_searchAction()">전체조회</button>
			  	<button type="button" class="btn btn-success btn-xs" onclick="fn_sendAction6()">관리로 이동(정정)</button>
			  </div>
			  <div class="panel panel-primary">
	            <div class="panel-heading">수출정정 현장</div>
	            <div class="panel-body well-sm" id='parentDivM6'>
	              <table id="masterGrid6"></table>
				  <div id="masterPager6"></div>
	            </div>
	          </div>
			</div>
			<div class="col-md-3">
		   	  <div class="panel panel-primary"  style="margin-top:28px">
	            <div class="panel-heading">Docu Area</div>
	            <div class="panel-body well-sm" id='parentDivF6'>
	           	  <table id="fileGrid6"></table>
	  			  <div id="filePager6"></div>
	            </div>
	          </div>
			</div>
		  </div>
		  <!--div title="New수출정정" style="padding:0px;">
	        <div class="col-md-12">
			  <form id="frm7" name="frm7">
			  <table class="table table-bordered">
			  	<col width="08%"/>
		  	    <col width="26%"/>
		   	    <col width="08%"/>
		  	    <col width="25%"/>
		  	    <col width="08%"/>
		  	    <col width="25%"/>
			  	<tr>
				  <td class="info text-center">
				    <select id="strDateType" name="strDateType" style="width:65px" class="input-sm">
				  	  <option value="sinchungDtm">신청일</option>
				  	  <option value="singoDtm">신고일</option>
				    </select>
				  </td>
				  <td>
				    <input type="text" id="strFromDate7" name="strFromDate7" class="input-sm" style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/> ~
				    <input type="text" id="strToDate7" 	 name="strToDate7" 	 class="input-sm" style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/>
				    <img src="../imagesNew/common/ico_left.gif" onclick="fn_prevday7()"><img src="../imagesNew/common/today.gif" onclick="fn_today7()"><img src="../imagesNew/common/ico_right.gif" onclick="fn_nextday7()">
				    <img src="../imagesNew/common/ico_left.gif" onclick="fn_prevweek7()"><img src="../imagesNew/common/week.gif" onclick="fn_week7()"><img src="../imagesNew/common/ico_right.gif" onclick="fn_nextweek7()">
				    <img src="../imagesNew/common/ico_left.gif" onclick="fn_prevmonth7()"><img src="../imagesNew/common/month.gif" onclick="fn_month7()"><img src="../imagesNew/common/ico_right.gif" onclick="fn_nextmonth7()">
				  </td>
			  	  <td class="info text-center">수출자상호</td>
			  	  <td><input type="text" id="strSuchuljaSangho" name="strSuchuljaSangho" onkeypress="keyDown()" class="input-sm" style="width:100%;"/></td>
			  	  <td class="info text-center">신고번호</td>
			  	  <td><input type="text" id="strExpoSingoNo" name="strExpoSingoNo" onkeypress="keyDown()" class="input-sm" style="width:100%;"/></td>
			  	</tr>
				<tr>
				  <td class="info text-center">세관</td>
				  <td>
				    <select name="strExpoGroupSegwan" id="strExpoGroupSegwan" style="width:100px;" class="input-sm"></select>
				  </td>
				  <td class="info text-center">Inv No</td>
				  <td><input type="text" id="strExpoInvNo" name="strExpoInvNo" onkeypress="keyDown()" class="input-sm" style="width:100%;"/></td>
				  <td colspan="2"></td>
				</tr>
			  </table>
			  </form>
			</div>
			<div class="col-md-9">
			  <div style="margin-bottom:7px;">
			  	<button type="button" class="btn btn-primary btn-xs" onclick="fn_searchAction()">전체조회</button>
			  	<button type="button" class="btn btn-success btn-xs" onclick="fn_sendAction7()">관리로 이동(정정)</button>
			  </div>
			  <div class="panel panel-primary">
	            <div class="panel-heading">수출정정 현장</div>
	            <div class="panel-body well-sm" id='parentDivM7'>
	              <table id="masterGrid7"></table>
				  <div id="masterPager7"></div>
	            </div>
	          </div>
			</div>
			<div class="col-md-3">
		   	  <div class="panel panel-primary"  style="margin-top:28px">
	            <div class="panel-heading">Docu Area</div>
	            <div class="panel-body well-sm" id='parentDivF7'>
	           	  <table id="fileGrid7"></table>
	  			  <div id="filePager7"></div>
	            </div>
	          </div>
			</div>
		  </div-->
		  <div title="현장관리 및 실적" style="padding:0px;">
		    <div class="col-md-12">
			  <form id="frm8" name="frm8">
			  <table class="table table-bordered">
			  	<col width="08%"/>
		  	    <col width="42%"/>
		   	    <col width="08%"/>
		  	    <col width="42%"/>
			  	<tr>
				  <td class="info text-center">신청일</td>
				  <td colspan="3">
				    <input type="text" id="strFromDate8" name="strFromDate8" class="input-sm" style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/> ~
				    <input type="text" id="strToDate8" 	 name="strToDate8" 	 class="input-sm" style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/>
				    <img src="../imagesNew/common/ico_left.gif" onclick="fn_prevday8()"><img src="../imagesNew/common/today.gif" onclick="fn_today8()"><img src="../imagesNew/common/ico_right.gif" onclick="fn_nextday8()">
				    <img src="../imagesNew/common/ico_left.gif" onclick="fn_prevweek8()"><img src="../imagesNew/common/week.gif" onclick="fn_week8()"><img src="../imagesNew/common/ico_right.gif" onclick="fn_nextweek8()">
				    <img src="../imagesNew/common/ico_left.gif" onclick="fn_prevmonth8()"><img src="../imagesNew/common/month.gif" onclick="fn_month8()"><img src="../imagesNew/common/ico_right.gif" onclick="fn_nextmonth8()">
				  </td>
				</tr>
				<tr>
				  <td class="info text-center">세관</td>
				  <td>
				    <select name="strGroupSegwan" id="strGroupSegwan" style="width:100px;" class="input-sm"></select>
				  </td>
				  <td class="info text-center">업무구분</td>
				  <td>
				    <select name="strGbn" id="strGbn" style="width:100px;" class="input-sm">
				      <option value="">==전체==</option>
				      <option value="수입(서류)">수입(서류)</option>
				      <option value="수입(검사)">수입(검사)</option>
				      <option value="수입(정정)">수입(정정)</option>
				      <option value="수출(서류)">수출(서류)</option>
				      <option value="수출(검사)">수출(검사)</option>
				      <option value="수출(정정)">수출(정정)</option>
				    </select>
				  </td>
				</tr>
				<tr>
			  	  <td class="info text-center">신고번호</td>
			  	  <td><input type="text" id="strSingoNo" name="strSingoNo" onkeypress="keyDown()" class="input-sm" style="width:100%;"/></td>
			  	  <td class="info text-center">업체명</td>
			  	  <td><input type="text" id="strSangho" name="strSangho" onkeypress="keyDown()" class="input-sm" style="width:100%;"/></td>
			  	</tr>
			  </table>
			  </form>
			</div>
			<div class="col-md-12">
			  <div style="margin-bottom:7px;">
			  	<button type="button" class="btn btn-primary btn-xs" onclick="fn_searchAction()">전체조회</button>
			  	<button type="button" class="btn btn-success btn-xs" onclick="fn_insertAction()">입력</button>
			  	<button type="button" class="btn btn-warning btn-xs" onclick="fn_modifyAction()">수정</button>
			  	<button type="button" class="btn btn-danger btn-xs" onclick="fn_delAction()">삭제</button>
			  	<img src="../imagesNew/common/xls.gif" onclick="fn_excelAction()" width="24px" style="cursor:pointer">
			  </div>
			  <div class="panel panel-primary">
	            <div class="panel-heading">현장관리 및 실적</div>
	            <div class="panel-body well-sm" id='parentDivM8'>
	              <table id="masterGrid8"></table>
				  <div id="masterPager8"></div>
	            </div>
	            <div class="panel-body well-sm" style="display:none">
				  <table id="excelGrid"></table>
				</div>
				<%@ include file="/WEB-INF/jsp/includeNew/excelDown.jsp" %>
	          </div>
			</div>
		  </div>
		</div>
	  </div>
	</div>
  </body>
</html>