<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-filter.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/import/importDeliveryCarryingInIns.js'/>"></script>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
			<input type="hidden" id="Ctype" 	name="Ctype" 	value="${param.Ctype}"/>
		    <div class="easyui-layout" style="width:800px;height:450px;">
		      <div data-options="region:'center'" style="box-sizing:border-box;border:0px;">
				<div class="normal_Button">
				  <a href="javascript:fn_newAction();">신규도착지</a>
				  <a href="javascript:fn_saveAction('insert');">저장</a>
				  <a href="javascript:fn_backAction();">뒤로</a>
				</div>
				<div class="hsnew_C02_table">
	  	          <form id="frm1" name="frm1">
	  	          <input type="hidden" id="deliveryCarryingInKey" name="deliveryCarryingInKey" value="${param.deliveryCarryingInKey}"/>
				  <table>
			   	    <col width="25%"/>
                    <col width="75%"/>
			      	<tr>
                      <td class="left">착지명 <i></i></td>
                      <td>
                      	<input type="text" id="deliveryCarryingInName" name="deliveryCarryingInName" style="width:100%;"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">사업자번호 <i></i></td>
                      <td>
                      	<input type="text" id="deliveryCarryingInTaxNum" name="deliveryCarryingInTaxNum" style="width:100%;" maxlength="10"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">담당자</td>
                      <td>
                      	<input type="text" id="deliveryCarryingInMan" name="deliveryCarryingInMan" style="width:100%;"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">담당자 연락처</td>
                      <td>
                      	<input type="text" id="deliveryCarryingInPhone" name="deliveryCarryingInPhone" style="width:100%;"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">담당자 팩스</td>
                      <td>
                      	<input type="text" id="deliveryCarryingInFax" name="deliveryCarryingInFax" style="width:100%;"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">담당자 휴대폰</td>
                      <td>
                      	<input type="text" id="deliveryCarryingInMobile" name="deliveryCarryingInMobile" style="width:100%;"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">담당자 이메일</td>
                      <td>
                      	<input type="text" id="deliveryCarryingInEmail" name="deliveryCarryingInEmail" style="width:100%;"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">착지 주소 <i></i></td>
                      <td>
                      	<input type="text" id="deliveryCarryingInAddr" name="deliveryCarryingInAddr" style="width:100%;"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">사용여부</td>
                      <td>
                      	<select id="useYn" name="useYn" style="width:40px;">
                          <option value="Y" selected="selected">Y</option>
                          <option value="N">N</option>
                        </select>
                      </td>
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
  </body>
</html>