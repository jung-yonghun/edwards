<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-filter.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/import/importDeliveryCarIns.js'/>"></script>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="easyui-layout" style="width:400px;height:450px;">
		      <div data-options="region:'center'" style="box-sizing:border-box;border:0px;">
				<div class="normal_Button">
				  <a href="javascript:fn_saveAction('insert');">등록</a>
				  <a href="javascript:fn_backAction();">뒤로</a>
				</div>
				<div class="hsnew_C02_table">
	  	          <form id="frm1" name="frm1">
	  	          <input type="hidden" id="deliveryCarKey" 	name="deliveryCarKey" 	value="${param.deliveryCarKey}"/>
	  	          <input type="hidden" id="deliveryCoKey" 	name="deliveryCoKey" 	value="${param.deliveryCoKey}"/>
	  	          <input type="hidden" id="deliveryCarEtc" 	name="deliveryCarEtc"/>
				  <table>
			   	    <col width="25%"/>
                    <col width="75%"/>
			      	<tr>
                      <td class="left">기사명 <i></i></td>
                      <td>
                      	<input type="text" id="deliveryCarName" name="deliveryCarName" style="width:100%;"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">기사 연락처 <i></i></td>
                      <td>
                      	<input type="text" id="deliveryCarPhone" name="deliveryCarPhone" style="width:100%;"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">차량번호 <i></i></td>
                      <td>
                      	<input type="text" id="deliveryCarNum" name="deliveryCarNum" style="width:100%;"/>
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