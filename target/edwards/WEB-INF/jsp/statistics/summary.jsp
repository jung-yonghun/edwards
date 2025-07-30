<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-groupview.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/statistics/summary.js'/>"></script>
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
				  <input type="hidden" id="ID" 			name="ID" 			value="${sessionScope.ID}">
				  <input type="hidden" id="USERGRADE" 	name="USERGRADE" 	value="${sessionScope.USERGRADE}">
				  <input type="hidden" id="USERGRADEB" 	name="USERGRADEB" 	value="${sessionScope.USERGRADEB}">
				  <input type="hidden" id="defaultDB" 	name="defaultDB" 	value="${sessionScope.DEFAULTDB}">
				  <input type="hidden" id="taxNum" 		name="taxNum" 		value="${sessionScope.TAXNO}">
				  <table width="100%">
				  	<col width="100%" />
					<tr height="23px">
					  <td>
					    <select id="yyyy" name="yyyy" class="input-sm" style="width:60px" onchange="fn_searchAction();">
						  <option value="2018">2018</option>
						  <option value="2019">2019</option>
						  <option value="2020">2020</option>
						  <option value="2021">2021</option>
						  <option value="2022" selected>2022</option>
						</select>
						<span id="jisa"></span>
					  </td>
					</tr>
				  </table>
				  </form>
				</div>
				<div class="easyui-tabs" id="tabs" data-options="fit:true,plain:true" style="width:100%;height:370px">
		  	      <div title="수입건수" style="padding:6px;">
		  	        <div class="easyui-layout" style="width:100%;height:370px;">
		        	  <div data-options="region:'center'" style="width:20%;box-sizing:border-box;border:0px">
		        	    <div class="normal_con01">
				      	  <table id="masterGrid"></table>
				  		</div>
		        	  </div>
		        	  <div data-options="region:'east',split:true" style="width:80%;padding:5px;box-sizing:border-box;border:0px">
		        	    <div id="statisticsBarChart" style="width:100%;height:100%;"></div>
		        	  </div>
		        	</div>
		          </div>
		          <div title="수입실적" style="padding:6px;">
		  	        <div class="easyui-layout" style="width:100%;height:370px">
		        	  <div data-options="region:'center'" style="width:20%;box-sizing:border-box;border:0px">
		        	    <div class="normal_con01">
				      	  <table id="masterGrid1"></table>
				  		</div>
		        	  </div>
		        	  <div data-options="region:'east',split:true" style="width:80%;padding:5px;box-sizing:border-box;border:0px">
		        	    <div id="statisticsBarChart1" style="width:100%;height:100%;"></div>
		        	  </div>
		        	</div>
		          </div>
		          <div title="수입납세실적" style="padding:6px;">
		  	        <div class="easyui-layout" style="width:100%;height:370px">
		        	  <div data-options="region:'center'" style="width:30%;box-sizing:border-box;border:0px">
		        	    <div class="normal_con01">
				      	  <table id="masterGrid2"></table>
				  		</div>
		        	  </div>
		        	  <div data-options="region:'east',split:true" style="width:70%;padding:5px;box-sizing:border-box;border:0px">
		        	    <div id="statisticsBarChart2" style="width:100%;height:100%;"></div>
		        	  </div>
		        	</div>
		          </div>
		          <div title="수입무역거래처" style="padding:6px;">
		  	        <div class="easyui-layout" style="width:100%;height:370px">
		        	  <div data-options="region:'center'" style="width:50%;box-sizing:border-box;border:0px">
		        	    <div class="normal_con01">
				      	  <table id="masterGrid7"></table>
				  		</div>
		        	  </div>
		        	  <div data-options="region:'east',split:true" style="width:50%;padding:5px;box-sizing:border-box;border:0px">
		        	  </div>
		        	</div>
		          </div>
		          <div title="수출건수" style="padding:6px;">
		  	        <div class="easyui-layout" style="width:100%;height:370px">
		        	  <div data-options="region:'center'" style="width:20%;box-sizing:border-box;border:0px">
		        	    <div class="normal_con01">
				      	  <table id="masterGrid3"></table>
				  		</div>
		        	  </div>
		        	  <div data-options="region:'east',split:true" style="width:80%;padding:5px;box-sizing:border-box;border:0px">
		        	    <div id="statisticsBarChart3" style="width:100%;height:100%;"></div>
		        	  </div>
		        	</div>
		          </div>
		          <div title="수출실적" style="padding:6px;">
		  	        <div class="easyui-layout" style="width:100%;height:370px">
		        	  <div data-options="region:'center'" style="width:20%;box-sizing:border-box;border:0px">
		        	    <div class="normal_con01">
				      	  <table id="masterGrid4"></table>
				  		</div>
		        	  </div>
		        	  <div data-options="region:'east',split:true" style="width:80%;padding:5px;box-sizing:border-box;border:0px">
		        	    <div id="statisticsBarChart4" style="width:100%;height:100%;"></div>
		        	  </div>
		        	</div>
		          </div>
		          <div title="수출반입건수" style="padding:6px;">
		  	        <div class="easyui-layout" style="width:100%;height:370px">
		        	  <div data-options="region:'center'" style="width:20%;box-sizing:border-box;border:0px">
		        	    <div class="normal_con01">
				      	  <table id="masterGrid5"></table>
				  		</div>
		        	  </div>
		        	  <div data-options="region:'east',split:true" style="width:80%;padding:5px;box-sizing:border-box;border:0px">
		        	    <div id="statisticsBarChart5" style="width:100%;height:100%;"></div>
		        	  </div>
		        	</div>
		          </div>
		          <div title="수출반입실적" style="padding:6px;">
		  	        <div class="easyui-layout" style="width:100%;height:370px">
		        	  <div data-options="region:'center'" style="width:20%;box-sizing:border-box;border:0px">
		        	    <div class="normal_con01">
				      	  <table id="masterGrid6"></table>
				  		</div>
		        	  </div>
		        	  <div data-options="region:'east',split:true" style="width:80%;padding:5px;box-sizing:border-box;border:0px">
		        	    <div id="statisticsBarChart6" style="width:100%;height:100%;"></div>
		        	  </div>
		        	</div>
		          </div>
		          <div title="수출해외거래처" style="padding:6px;">
		  	        <div class="easyui-layout" style="width:100%;height:370px">
		        	  <div data-options="region:'center'" style="width:50%;box-sizing:border-box;border:0px">
		        	    <div class="normal_con01">
				      	  <table id="masterGrid8"></table>
				  		</div>
		        	  </div>
		        	  <div data-options="region:'east',split:true" style="width:50%;padding:5px;box-sizing:border-box;border:0px">
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