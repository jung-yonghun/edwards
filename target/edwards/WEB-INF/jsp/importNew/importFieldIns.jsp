<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/includeNew/head_title.jsp"></jsp:include>
    <title>현장관리 등록</title>
	<jsp:include page="/WEB-INF/jsp/includeNew/head_css.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/includeNew/head_js.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/jsNew/cps/import/importFieldIns.js'/>"></script>
  </head>
  <body>
    <div id="page-wrapper">
      <div class="row">
        <div class="col-md-12">
          <div>
		  	<button type="button" class="btn btn-primary btn-xs" onclick="fn_saveAction()">저장</button>
		  	<button type="button" class="btn btn-danger btn-xs" onclick="window.close()">닫기</button>
		  </div>
		</div>
		<div class="col-md-12">
		  <input type="hidden" id="SDACMKey" name="SDACMKey" 	value="${param.SDACMKey}"/>
		  <table class="table table-bordered">
		  	<col width="20%"/>
	  	    <col width="80%"/>
		  	<tr>
			  <td class="info text-center">날짜</td>
			  <td>
			    <input type="text" id="RegDt" name="RegDt"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/>
			  </td>
			</tr>
			<tr>
			  <td class="info text-center">세관</td>
			  <td>
			    <input type="text" id="Segwan" name="Segwan"  style="width:40px;">
			  </td>
			</tr>
			<tr>
			  <td class="info text-center">부서</td>
			  <td>
			    <input type="text" id="Jisa" name="Jisa"  style="width:70px;"/>
			  </td>
			</tr>
			<tr>
			  <td class="info text-center">팀</td>
			  <td>
			    <input type="text" id="Team" name="Team"  style="width:70px;"/>
			  </td>
			</tr>
			<tr>
			  <td class="info text-center">통관담당</td>
			  <td>
			    <input type="text" id="UserNm" name="UserNm"  style="width:70px;"/>
			  </td>
			</tr>
			<tr>
			  <td class="info text-center">업무구분</td>
			  <td>
			    <select name="Gbn" id="Gbn" style="width:100px;" class="input-sm">
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
			  <td class="info text-center">신고코드</td>
			  <td>
			    <input type="text" id="SingoCode" name="SingoCode"  style="width:70px;"/>
			  </td>
			</tr>
			<tr>
			  <td class="info text-center">신고번호</td>
			  <td>
			    <input type="text" id="SingoNo" name="SingoNo"  style="width:150px;"/>
			  </td>
			</tr>
			<tr>
			  <td class="info text-center">업체명</td>
			  <td>
			    <input type="text" id="ComNm" name="ComNm"  style="width:100%;"/>
			  </td>
			</tr>
			<tr>
			  <td class="info text-center">검사여부</td>
			  <td>
			    <select id="GumGbn" name="GumGbn" style="width:40px" class="input-sm">
                  <option value="Y">Y</option>
                  <option value="S">S</option>
                  <option value="F">F</option>
			  	  <option value="N">N</option>
			  	  <option value="O">O</option>
			  	  <option value=""></option>
			    </select>
			  </td>
			</tr>
			<tr>
			  <td class="info text-center">검사장소</td>
			  <td>
			    <input type="text" id="JangchiNm" name="JangchiNm"  style="width:100%;"/>
			  </td>
			</tr>
			<tr>
			  <td class="info text-center">세관담당자</td>
			  <td>
			    <input type="text" id="GwanNm" name="GwanNm"  style="width:100px;"/>
			  </td>
			</tr>
			<tr>
			  <td class="info text-center">접수</td>
			  <td>
			    <select id="Jubsu" name="Jubsu" style="width:40px" class="input-sm">
			  	  <option value="Y">Y</option>
			  	  <option value="O">O</option>
			  	  <option value=""></option>
			    </select>
			  </td>
			</tr>
			<tr>
			  <td class="info text-center">승인</td>
			  <td>
			    <select id="Approve" name="Approve" style="width:40px" class="input-sm">
			  	  <option value="Y">Y</option>
			  	  <option value="O">O</option>
			  	  <option value=""></option>
			    </select>
			  </td>
			</tr>
			<tr>
			  <td class="info text-center">보완사항</td>
			  <td>
			    <input type="text" id="Issue" name="Issue"  style="width:100%;"/>
			  </td>
			</tr>
			<tr>
			  <td class="info text-center">Remark</td>
			  <td>
			    <input type="text" id="Remark" name="Remark"  style="width:100%;"/>
			  </td>
			</tr>
			<tr>
			  <td class="info text-center">간주매출</td>
			  <td>
			    <input type="text" id="Price" name="Price"  style="width:70px;text-align:right;"/>
			  </td>
			</tr>
		  </table>
  	    </div>
	  </div>
	</div>
  </body>
</html>