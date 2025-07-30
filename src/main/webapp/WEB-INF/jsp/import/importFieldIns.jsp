<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
    <title>현장관리 등록</title>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/cps/import/importFieldIns.js'/>"></script>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="easyui-layout" style="width:450px;height:480px;">
		    <div data-options="region:'center'" style="box-sizing:border-box;border:0px;">
	  	      <div class="normal_Button">
			 	<a href="javascript:fn_saveAction('insert');">저장</a>
			 	<a href="javascript:window.close();">닫기</a>
			  </div>
	  	      <div class="hsnew_C02_table">
	  	        <form id="frm1" name="frm1">
                <input type="hidden" id="addUserId" name="addUserId" 	value="${sessionScope.ID}"/>
                <input type="hidden" id="Impo_gwa" 	name="Impo_gwa"/>
                <table width="100%">
                  <col width="20%"/>
                  <col width="80%"/>
                  <tr height="23px">
                    <td class="left">날짜</td>
                    <td>
                      <input type="text" id="regDate" name="regDate"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />
                    </td>
                  </tr>
                  <tr height="23px">
                    <td class="left">세관</td>
                    <td>
                      <input type="text" id="Impo_segwan" name="Impo_segwan" style="width:40px;"/>
                      <a href="javascript:fn_commonNcomCode('Bsegwan')"><img src="../images/cps/hs_seach.png" id="ddealSearch" style="margin-left:-6px"></a>
                    </td>
                  </tr>
                  <tr height="23px">
                    <td class="left">부서</td>
                    <td>
                      <input type="text" id="jisa" name="jisa" style="width:70px;"/>
                    </td>
                  </tr>
                  <tr height="23px">
                    <td class="left">팀</td>
                    <td>
                      <input type="text" id="team" name="team" style="width:70px;"/>
                    </td>
                  </tr>
                  <tr height="23px">
                    <td class="left">통관담당</td>
                    <td>
                      <input type="text" id="userNm" name="userNm" style="width:70px;"/>
                    </td>
                  </tr>
                  <tr height="23px">
                    <td class="left">업무구분</td>
                    <td>
                      <select id="gubun" name="gubun" style="width:80px">
					  	<option value="수입(서류)">수입(서류)</option>
					  	<option value="수입(검사)">수입(검사)</option>
					  	<option value="수입(정정)">수입(정정)</option>
					  	<option value="수출(서류)">수출(서류)</option>
					  	<option value="수출(검사)">수출(검사)</option>
					  	<option value="수출(정정)">수출(정정)</option>
					  </select>
                    </td>
                  </tr>
                  <tr height="23px">
                    <td class="left">신고코드</td>
                    <td>
                      <input type="text" id="singoCode" name="singoCode" style="width:70px;"/>
                    </td>
                  </tr>
                  <tr height="23px">
                    <td class="left">신고번호</td>
                    <td>
                      <input type="text" id="singoNum" name="singoNum" style="width:150px;"/>
                    </td>
                  </tr>
                  <tr height="23px">
                    <td class="left">업체명</td>
                    <td>
                      <input type="text" id="company" name="company" style="width:100%;"/>
                    </td>
                  </tr>
                  <tr height="23px">
                    <td class="left">검사여부</td>
                    <td>
                      <select id="gumYn" name="gumYn" style="width:40px">
                        <option value="Y">Y</option>
                        <option value="S">S</option>
                        <option value="F">F</option>
					  	<option value="N">N</option>
					  	<option value="O">O</option>
					  	<option value=""></option>
					  </select>
                    </td>
                  </tr>
                  <tr height="23px">
                    <td class="left">검사장소</td>
                    <td>
                      <input type="text" id="jangchi" name="jangchi" style="width:100%;"/>
                    </td>
                  </tr>
                  <tr height="23px">
                    <td class="left">세관담당자</td>
                    <td>
                      <input type="text" id="gwanUser" name="gwanUser" style="width:100px;"/>
                    </td>
                  </tr>
                  <tr height="23px">
                    <td class="left">접수</td>
                    <td>
                      <select id="jubsu" name="jubsu" style="width:40px">
					  	<option value="Y">Y</option>
					  	<option value="O">O</option>
					  	<option value=""></option>
					  </select>
                    </td>
                  </tr>
                  <tr height="23px">
                    <td class="left">승인</td>
                    <td>
                      <select id="approve" name="approve" style="width:40px">
					  	<option value="Y">Y</option>
					  	<option value="O">O</option>
					  	<option value=""></option>
					  </select>
                    </td>
                  </tr>
                  <tr height="23px">
                    <td class="left">보완사항</td>
                    <td>
                      <input type="text" id="issue" name="issue" style="width:100%;"/>
                    </td>
                  </tr>
                  <tr height="23px">
                    <td class="left">Remark</td>
                    <td>
                      <input type="text" id="remark" name="remark" style="width:100%;"/>
                    </td>
                  </tr>
                  <tr height="23px">
                    <td class="left">간주매출</td>
                    <td>
                      <input type="text" id="price" name="price" style="width:100px;"/>
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