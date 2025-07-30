<%@ page language="java" 	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
	<jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/plugins/chartjs/Chart.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/main/totalSearch1.js'/>"></script>
  </head>
  <body>
    <input type="hidden" id="ID" 				name="ID" 				value="${sessionScope.ID}"/>
    <input type="hidden" id="USERID" 			name="USERID" 			value="${sessionScope.USERID}"/>
    <input type="hidden" id="_defaultDB" 		name="_defaultDB" 		value="${sessionScope.DEFAULTDB}">
    <input type="hidden" id="_defaultDB1" 		name="_defaultDB1" 		value="${sessionScope.DEFAULTDB}">
    <input type="hidden" id="USERGRADE" 		name="USERGRADE" 		value="${sessionScope.USERGRADE}">
    <input type="hidden" id="USERGRADEB" 		name="USERGRADEB" 		value="${sessionScope.USERGRADEB}">
	<input type="hidden" id="taxNum" 			name="taxNum" 			value="${sessionScope.TAXNO}">
	<input type="hidden" id="keyword" 			name="keyword" 			value="${param.keyword}">
	<input type="hidden" id="setMenu" 			name="setMenu" 			value="${param.setMenu}">
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="easyui-layout" style="width:100%;height:770px;">
		      <div data-options="region:'center'" style="box-sizing:border-box;border:0px;padding:0px;overflow:auto;">
				<div class="main04">
				  <div class="main04_con">
				    <div class="main04_box01">
					  <p>수입신고번호
						<span class="btn_b" id="impoSingoBtn" style="display:none">
						  <a href="javascript:openImportAll('impoSingo');"><img src="<c:url value='/images/cps/main02_plus_icon.png'/>"></a>
						</span>
					  </p>
					  <ul id="impoSingo"></ul>
					</div>
					<div class="main04_box01">
					  <p>PO번호
						<span class="btn_b" id="impoPoBtn" style="display:none">
						  <a href="javascript:openImportAll('impoPo');"><img src="<c:url value='/images/cps/main02_plus_icon.png'/>"></a>
						</span>
					  </p>
					  <ul id="impoPo"></ul>
					</div>
				    <div class="main04_box01">
					  <p>B/L No
						<span class="btn_b" id="impoBlBtn" style="display:none">
						  <a href="javascript:openImportAll('impoBl');"><img src="<c:url value='/images/cps/main02_plus_icon.png'/>"></a>
						</span>
					  </p>
					  <ul id="impoBl"></ul>
					</div>
					<div class="main04_box01">
					  <p>수입 자재코드
						<span class="btn_b" id="impoJajaeBtn" style="display:none">
						  <a href="javascript:openImportAll('impoJajae');"><img src="<c:url value='/images/cps/main02_plus_icon.png'/>"></a>
						</span>
					  </p>
					  <ul id="impoJajae"></ul>
					</div>
				  </div>
				</div>
				<div class="main04">
				  <div class="main04_con1">
				    <div class="main04_box01">
					  <p>수입 모델규격
						<span class="btn_b" id="impoGukBtn" style="display:none">
						  <a href="javascript:openImportAll('impoGuk');"><img src="<c:url value='/images/cps/main02_plus_icon.png'/>"></a>
						</span>
					  </p>
					  <ul id="impoGuk"></ul>
					</div>
					<div class="main04_box01">
					  <p>수입 성분
						<span class="btn_b" id="impoSungBtn" style="display:none">
						  <a href="javascript:openImportAll('impoSung');"><img src="<c:url value='/images/cps/main02_plus_icon.png'/>"></a>
						</span>
					  </p>
					  <ul id="impoSung"></ul>
					</div>
				  </div>
				</div>
				<div class="main04">
				  <div class="main04_con">
				    <div class="main04_box01">
					  <p>수출신고번호
						<span class="btn_b" id="expoSingoBtn" style="display:none">
						  <a href="javascript:openExportAll('expoSingo');"><img src="<c:url value='/images/cps/main02_plus_icon.png'/>"></a>
						</span>
					  </p>
					  <ul id="expoSingo"></ul>
					</div>
					<div class="main04_box01">
					  <p>INV No
						<span class="btn_b" id="expoInvBtn" style="display:none">
						  <a href="javascript:openExportAll('expoInv');"><img src="<c:url value='/images/cps/main02_plus_icon.png'/>"></a>
						</span>
					  </p>
					  <ul id="expoInv"></ul>
					</div>
				    <div class="main04_box01">
					  <p>수출 자재코드
						<span class="btn_b" id="expoJajaeBtn" style="display:none">
						  <a href="javascript:openExportAll('expoJajae');"><img src="<c:url value='/images/cps/main02_plus_icon.png'/>"></a>
						</span>
					  </p>
					  <ul id="expoJajae"></ul>
					</div>
					<div class="main04_box01">
					</div>
				  </div>
				</div>
				<div class="main04">
				  <div class="main04_con1">
				    <div class="main04_box01">
					  <p>수출 모델규격
						<span class="btn_b" id="expoGukBtn" style="display:none">
						  <a href="javascript:openExportAll('expoGuk');"><img src="<c:url value='/images/cps/main02_plus_icon.png'/>"></a>
						</span>
					  </p>
					  <ul id="expoGuk"></ul>
					</div>
					<div class="main04_box01">
					  <p>수출 성분
						<span class="btn_b" id="expoSungBtn" style="display:none">
						  <a href="javascript:openExportAll('expoSung');"><img src="<c:url value='/images/cps/main02_plus_icon.png'/>"></a>
						</span>
					  </p>
					  <ul id="expoSung"></ul>
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