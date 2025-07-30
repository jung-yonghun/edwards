<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_newTitle.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_newCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_newJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/cps/edwards/impoStatistics.js?20231227'/>"></script>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="container">
			  <div class="easyui-layout" style="width:100%;height:735px">
			    <input type="hidden" id="ID" 		name="ID" 			value="${sessionScope.ID}">
			    <input type="hidden" id="taxNum" 	name="taxNum" 		value="${sessionScope.TAXNO}">
			    <div data-options="region:'north',split:true" style="width:100%;height:165px;box-sizing:border-box;border:0px">
			    <div class="easyui-layout" style="width:100%;height:160px">
		      	<div data-options="region:'center'" style="width:100%;box-sizing:border-box;border:0px">
				  <div class="normal_Top">
				  	<table width="100%">
				  	  <col width="08%" />
				  	  <col width="24%" />
				  	  <col width="02%" />
				  	  <col width="08%" />
				  	  <col width="24%" />
				  	  <col width="02%" />
				  	  <col width="08%" />
				  	  <col width="24%" />
					  <tr height="23px">
					  	<td>수리일자</td>
					  	<td>
					  	  <input type="text" id="FROM_DT" name="FROM_DT" onkeypress="keyDown()" style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/> ~
					  	  <input type="text" id="TO_DT" name="TO_DT" onkeypress="keyDown()" style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/>
					  	</td>
					  	<td></td>
					  	<td>수출자</td>
					  	<td><input type="text" id="EXP_CD" name="EXP_CD" onkeypress="keyDown()"/></td>
					  	<td></td>
					  	<td>신고번호</td>
					  	<td><input type="text" id="IMPT_DECL_NO" name="IMPT_DECL_NO" onkeypress="keyDown()" value="${param.singoNo}"/></td>
					  </tr>
					  <tr height="23px">
					  	<td>화주</td>
					  	<td><input type="text" id="OWN_GODS_NM" name="OWN_GODS_NM" onkeypress="keyDown()"/></td>
					  	<td></td>
					  	<td>BL번호</td>
					  	<td><input type="text" id="impo_bl_no" name="impo_bl_no" onkeypress="keyDown()"/></td>
					  	<td></td>
					  	<td>적출국</td>
					  	<td><input type="text" id="impo_jukchl_code" name="impo_jukchl_code" onkeypress="keyDown()"/></td>
					  </tr>
					  <tr height="23px">
					  	<td>HS코드</td>
					  	<td><input type="text" id="imlan_hs" name="imlan_hs" onkeypress="keyDown()"/></td>
					  	<td></td>
					  	<td>감면부호</td>
					  	<td><input type="text" id="imlan_gwan_gam_buho" name="imlan_gwan_gam_buho" onkeypress="keyDown()"/></td>
					  	<td></td>
					  	<td>아이템코드</td>
					  	<td><input type="text" id="impum_jajae_code" name="impum_jajae_code" onkeypress="keyDown()"/></td>
					  </tr>
				  	</table>
				  </div>
				  <div class="normal_Button">
				  	<a href="javascript:fn_searchAction();">조회</a>
				  	<a href="javascript:fn_searchAction3();">수입 Invoice내역</a>
				  	<a href="javascript:fn_searchAction1();">감면 수입물품내역</a>
				  	<a href="javascript:fn_searchAction2();">비감면 수입물품내역</a>
				  </div>
			  	</div>
			  	</div>
			  	</div>
			  	<div data-options="region:'center',split:true" style="width:100%;box-sizing:border-box;border:0px">
			  	<div class="easyui-tabs" id="tabs" data-options="fit:true,plain:true" style="height:530px;">
			  	  <div title="공통기준 실적자료" style="padding-left:10px;padding-right:10px">
				    <div class="easyui-layout" style="width:100%;height:530px">
			      	<div data-options="region:'center'" style="width:100%;box-sizing:border-box;border:0px">
					  <div class="normal_Button" style="margin-left:5px;">
					  	<a href="javascript:fn_searchExcel();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
					  </div>
					  <div class="normal_con01" id='parentDiv10' style="padding-left:5px;padding-right:5px">
					  	<table id="masterGrid"></table>
			  			<div id="masterPager"></div>
					  </div>
				  	</div>
				  	</div>
				  </div>
		    	  <div title="란기준 실적자료" style="padding-left:10px;padding-right:10px">
				    <div class="easyui-layout" style="width:100%;height:530px">
			      	<div data-options="region:'center'" style="width:100%;box-sizing:border-box;border:0px">
					  <div class="normal_Button" style="margin-left:5px">
					  	<a href="javascript:fn_searchExcel1();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
					  </div>
					  <div class="normal_con01" id='parentDiv11' style="padding-left:5px;padding-right:5px">
					  	<table id="lanGrid"></table>
			  			<div id="lanPager"></div>
					  </div>
				  	</div>
				  	</div>
				  </div>
				  <div title="모델규격기준 실적자료" style="padding-left:10px;padding-right:10px">
				    <div class="easyui-layout" style="width:100%;height:530px">
			      	<div data-options="region:'center'" style="width:100%;box-sizing:border-box;border:0px">
					  <div class="normal_Button" style="margin-left:5px">
					  	<a href="javascript:fn_searchExcel2();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
					  </div>
					  <div class="normal_con01" id='parentDiv12' style="padding-left:5px;padding-right:5px">
					  	<table id="hangGrid"></table>
			  			<div id="hangPager"></div>
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