<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/plugins/chartjs/Chart.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-groupview.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/import/importStats.js'/>"></script>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="container">
			  <div class="normal_cont">
			    <div class="normal_Top">
				  <form id="frm1" name="frm1">
	  	  		  <input type="hidden" id="db" 			name="db" 			value="ncustoms" />
		  		  <input type="hidden" id="sessionId" 	name="sessionId" 	value="${sessionScope.ID}"/>
		  		  <input type="hidden" id="taxno" 		name="taxno" 		value="2208109507">
	  	  		  <input type="hidden" id="argCL" 		name="argCL" 		value="전체" />
				  <table width="100%">
				  	<col width="100%" />
					<tr height="23px">
					  <td>
					    <select id="yyyy" name="yyyy" class="input-sm" style="width:60px" onchange="fn_year();">
						  <option value="2015">2015</option>
						  <option value="2016">2016</option>
						  <option value="2017">2017</option>
						  <option value="2018">2018</option>
						  <option value="2019" selected>2019</option>
						</select>
					  </td>
					</tr>
				  </table>
				  </form>
				</div>
				<div class="easyui-tabs" id="tabs" data-options="fit:true,plain:true" style="width:100%;height:370px">
		  	      <div title="건수" style="padding:10px;">
		  	        <div class="easyui-layout" style="width:100%;height:370px;">
		        	  <div data-options="region:'center'" style="width:30%;box-sizing:border-box;border:0px">
		        	    <div class="normal_con01">
				      	  <table id="masterGrid"></table>
				  		</div>
		        	  </div>
		        	  <div data-options="region:'east',split:true" style="width:70%;padding:10px;box-sizing:border-box;border:0px">
		        	    <canvas id="statisticsBarChart" style="height:100%;"></canvas>
		        	  </div>
		        	</div>
		          </div>
		          <div title="수입실적" style="padding:10px;">
		  	        <div class="easyui-layout" style="width:100%;height:370px">
		        	  <div data-options="region:'center'" style="width:30%;box-sizing:border-box;border:0px">
		        	    <div class="normal_con01">
				      	  <table id="masterGrid1"></table>
				  		</div>
		        	  </div>
		        	  <div data-options="region:'east',split:true" style="width:70%;padding:10px;box-sizing:border-box;border:0px">
		        	    <canvas id="statisticsBarChart1" style="height:100%;"></canvas>
		        	  </div>
		        	</div>
		          </div>
		          <div title="납세실적" style="padding:10px;">
		  	        <div class="easyui-layout" style="width:100%;height:370px">
		        	  <div data-options="region:'center'" style="width:30%;box-sizing:border-box;border:0px">
		        	    <div class="normal_con01">
				      	  <table id="masterGrid2"></table>
				  		</div>
		        	  </div>
		        	  <div data-options="region:'east',split:true" style="width:70%;padding:10px;box-sizing:border-box;border:0px">
		        	    <canvas id="statisticsBarChart2" style="height:100%;"></canvas>
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