<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
    <title>공지사항</title>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-bufferview.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-filter.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/main/noticePop.js'/>"></script>
  </head>
  <body onbeforeunload="closeAction()" onunload="closeAction()">
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
  	  <div class="seach_review_txt2"></div>
  	</div>
  	<div class="normal_con01">
  	  <table id="masterGrid"></table>
  	</div>
	<form id="frmCommon" name="frmCommon">
      <input type="hidden" id="useYn" 		name="useYn" 	value="Y"/>
      <input type="hidden" id="category" 	name="category" value="NOTICE"/>
      <input type="hidden" id="size" 		name="size" 	value="100000"/>
      <input type="hidden" id="page" 		name="page" 	value="0"/>
    </form>
  </body>
</html>