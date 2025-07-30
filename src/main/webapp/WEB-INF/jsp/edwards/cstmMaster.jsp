<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_newTitle.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_newCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_newJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/cps/edwards/cstmMaster.js?20231227'/>"></script>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="container">
		      <input type="hidden" id="ID" 		name="ID" 		value="${sessionScope.ID}">
		      <input type="hidden" id="taxNum" 	name="taxNum" 	value="${sessionScope.TAXNO}">
			  <div class="easyui-layout" style="width:100%;height:735px">
			  	<div data-options="region:'east',split:true" style="width:30%;box-sizing:border-box;border:0px;padding-top:8px;margin-top:8px;">
		    	  <div class="hsnew_C02_table" style="margin-top:100px">
		    	    <table width="100%">
				  	  <tr height="23px" style="background-color:#596a7b;font-size:12px">
					  	<td><font color="white">법령내용</font></td>
					  </tr>
					  <tr height="580x">
					  	<td id="lawdesc" style="border:1px solid #999999;padding:10px;vertical-align:top"></td>
					  </tr>
					</table>
		    	  </div>
			  	</div>
		      	<div data-options="region:'center'" style="width:70%;box-sizing:border-box;border:0px">
		      	  <div class="normal_Top">
				  	<table width="100%">
				  	  <col width="07%" />
				  	  <col width="17%" />
				  	  <col width="01%" />
				  	  <col width="07%" />
				  	  <col width="17%" />
				  	  <col width="01%" />
				  	  <col width="08%" />
				  	  <col width="17%" />
				  	  <col width="01%" />
				  	  <col width="07%" />
				  	  <col width="17%" />
					  <tr height="23px">
					  	<td>Item No</td>
					  	<td><input type="text" id="ItemCd" name="ItemCd" onkeypress="keyDown()"/></td>
					  	<td></td>
					  	<td>HS Code</td>
					  	<td><input type="text" id="HsCd" name="HsCd" onkeypress="keyDown()"/></td>
					  	<td></td>
					  	<td>법령명</td>
					  	<td colspan="4"><input type="text" id="LawNm" name="LawNm" onkeypress="keyDown()"/></td>
					  </tr>
					  <tr height="23px">
					  	<td>수입대상여부</td>
					  	<td>
					  	  <select id="RsnIm" name="RsnIm" style="width:70px">
					  	    <option value="">전체</option>
					      	<option value="대상">대상</option>
	                        <option value="비대상">비대상</option>
						  </select>
					  	</td>
					  	<td></td>
					  	<td>수출대상여부</td>
					  	<td>
					  	  <select id="RsnEx" name="RsnEx" style="width:70px">
					  	    <option value="">전체</option>
					      	<option value="대상">대상</option>
	                        <option value="비대상">비대상</option>
						  </select>
					  	</td>
					  	<td></td>
					  	<td>품명규격대상여부</td>
					  	<td>
					  	  <select id="Gukyk" name="Gukyk" style="width:50px">
					  	    <option value="">전체</option>
					      	<option value="Y">Y</option>
						  </select>
					  	</td>
					  	<td></td>
					  	<td>SPEC</td>
					  	<td><input type="text" id="ItemSpec" name="ItemSpec" onkeypress="keyDown()"/></td>
					  </tr>
				  	</table>
				  </div>
				  <div class="normal_Button">
				  	<a href="javascript:fn_searchAction();">조회</a>
				  	<a href="javascript:fn_searchExcel();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
				  </div>
				  <div class="normal_con01" id='parentDiv10' style="padding-left:5px;padding-right:5px">
				  	<table id="masterGrid"></table>
		  			<div id="masterPager"></div>
				  </div>
				  <div class="normal_con01" style="display:none">
				  	<table id="excelGrid"></table>
				  </div>
				  <%@ include file="/WEB-INF/jsp/include/excelDown.jsp" %>
			  	</div>
			</div>
		  </div>
		</div>
	  </div>
	</div>
  </body>
</html>