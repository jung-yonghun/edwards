<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-bufferview.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-filter.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/main/bbsList.js'/>"></script>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="container">
			  <div class="easyui-layout" style="width:100%;height:775px">
		      	<div data-options="region:'center'" style="width:50%;box-sizing:border-box;border:0px">
		      	  <div class="normal_Top">
		      	  <form id="frmCommon" name="frmCommon">
			      <input type="hidden" id="useYn" 		name="useYn" 		value="Y"/>
			      <input type="hidden" id="category" 	name="category" 	value="${param.category}"/>
			  	  <table width="100%">
			  	  <col width="10%" />
			  	  <col width="39%" />
			  	  <col width="01%" />
			  	  <col width="10%" />
			  	  <col width="40%" />
				  <tr height="23px">
				  	<td>등록일</td>
				  	<td>
				  	  <input type="text" id="strFromDate" name="strFromDate" onkeypress="keyDown()" style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/> ~
				  	  <input type="text" id="strToDate" name="strToDate" onkeypress="keyDown()" style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/>
				  	</td>
				  	<td></td>
				  	<td>내용</td>
				  	<td><input type="text" id="contents" name="contents" onkeypress="keyDown()"/></td>
				  </tr>
			  	  </table>
			  	  </form>
			      </div>
			      <div class="normal_Button">
			  	    <a href="javascript:fn_searchAction();">조회</a>
			      </div>
				  <div class="normal_con01">
				  	<table id="masterGrid"></table>
				  </div>
			  	</div>
		        <div data-options="region:'east',split:true" style="width:50%;box-sizing:border-box;border:0px">
				  <div class="seach_review_in" style="margin-top:0px">
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
				        <tr>
				          <td class='left'>작성자</td><td class='taL'></td>
						  <td class='left'>작성일자</td><td></td>
						  <td class='left'>조회수</td><td></td>
						</tr>
						<tr>
						  <td class='left'>제목</td><td colspan='5' class='taL'></td>
						</tr>
					  </tbody>
					  <tbody id="bbs_title1">
						<tr>
						  <td class="left">첨부파일</td>
						  <td colspan="5" class="taL" id="bbs_file"></td>
						</tr>
					  </tbody>
					</table>
				  	</div>
				  	<div class="seach_review_txt1"></div>
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