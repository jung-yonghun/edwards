<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<link type="text/css" rel="stylesheet" href="<c:url value='/css/lib/jquery.file.upload/uploadfile.css'/>"/>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/jquery.form/jquery.form.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/jquery.file.upload/jquery.uploadfile.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-bufferview.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-filter.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/compliance/complianceApplyList.js'/>"></script>
	<style>
    .custom-statusbar {
        padding: 2px 0px 2px 0px;
        width: 250px;
    }

    .odd {
        background-color: #f9f9f9;
    }

    .even {
        background-color: #f3f3f3;
    }

    .custom-filename {
        display: inline-block;
        width: 250px;
        margin: 0 5px 0px 0px;
        color: #333333
        vertical-align: middle;
    }

    .custom-progress {
        margin: 0 10px 0px 10px;
        position: absolute;
        width: 250px;
        border: 0px solid #ddd;
        padding: 1px;
        border-radius: 3px;
        display: none;
        vertical-align: middle;
        color: #FFFFFF;
    }

    .custom-bar {
        background-color: #337AB7;
        width: 0;
        height: 0px;
        border-radius: 3px
        color: #FFFFFF;
        display: inline-block;
        vertical-align: middle;
        margin: 0px;
    }

    .custom-red {
        -moz-box-shadow: inset 0 39px 0 -24px #e67a73;
        -webkit-box-shadow: inset 0 39px 0 -24px #e67a73;
        box-shadow: inset 0 39px 0 -24px #e67a73;
        background-color: #e4685d;
        -moz-border-radius: 2px;
        -webkit-border-radius: 2px;
        border-radius: 2px;
        display: inline-block;
        color: #fff;
        font-family: arial;
        font-size: 12px;
        font-weight: normal;
        padding: 4px 5px;
        text-decoration: none;
        text-shadow: 0 1px 0 #b23e35;
        cursor: pointer;
        vertical-align: middle;
        margin-right: 5px;
    }

    .custom-green {
        background-color: #77b55a;
        -moz-border-radius: 2px;
        -webkit-border-radius: 2px;
        border-radius: 2px;
        margin: 0;
        padding: 0;
        display: inline-block;
        color: #fff;
        font-family: arial;
        font-size: 12px;
        font-weight: normal;
        padding: 4px 5px;
        text-decoration: none;
        cursor: pointer;
        text-shadow: 0 1px 0 #5b8a3c;
        vertical-align: middle;
        margin-right: 5px;
    }

    .ajax-file-upload {
	        font-size: 12px;
	        font-weight: bold;
	        padding: 10px 10px 10px 10px;
	        cursor: pointer;
	        line-height: 10px;
	        height: 20px;
	        margin: 0 10px 10px 0;
	        display: inline-block;
	        background: #fff;
	        border: 1px solid #e8e8e8;
	        color: #888;
	        text-decoration: none;
	        border-radius: 3px;
	        -webkit-border-radius: 3px;
	        -moz-border-radius: 3px;
	        -moz-box-shadow: 0 2px 0 0 #e8e8e8;
	        -webkit-box-shadow: 0 2px 0 0 #e8e8e8;
	        box-shadow: 0 2px 0 0 #e8e8e8;
	        padding: 7px 10px 0px 10px;
	        color: #fff;
	        background: #279ad3;
	        border: none;
	        -moz-box-shadow: 0 2px 0 0 #13648d;
	        -webkit-box-shadow: 0 2px 0 0 #13648d;
	        box-shadow: 0 2px 0 0 #13648d;
	        vertical-align: middle;
	    }

    .ajax-upload-dragdrop {
        border: 4px dotted #A5A5C7;
        width: 250px;
        height: 170px;
        color: #DADCE3;
        text-align: left;
        vertical-align: middle;
        padding: 10px 10px 0px 10px;
    }
	</style>
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
				  <input type="hidden" id="_defaultDB" 	name="_defaultDB" 	value="${sessionScope.DEFAULTDB}">
				  <input type="hidden" id="taxNum" 		name="taxNum" 		value="${sessionScope.TAXNO}">
				  <table width="100%">
				  	<col width="06%" />
				  	<col width="28%" />
				  	<col width="01%" />
				  	<col width="06%" />
				  	<col width="15%" />
				  	<col width="01%" />
				  	<col width="06%" />
				  	<col width="15%" />
				  	<col width="01%" />
				  	<col width="06%" />
				  	<col width="15%" />
					<tr height="23px">
					  <td>
					    <select id="_DateType" name="_DateType" style="width:60px">
					      <option value="applyDt">신청일</option>
                          <option value="confirmDt">확인일</option>
						</select>
					  </td>
					  <td>
					    <input type="text" id="strFromDate" name="strFromDate"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />~
					    <input type="text" id="strToDate" 	name="strToDate"  	style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />
					    <div class="normal_btn">
						  <a href="#" class="arrow" onclick="fn_prevday()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
						  <a href="#" onclick="fn_today()">일</a>
						  <a href="#" class="arrow" onclick="fn_nextday()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
						  <a href="#" class="arrow1"></a>
						  <a href="#" class="arrow" onclick="fn_prevweek()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
						  <a href="#" onclick="fn_week()">주</a>
						  <a href="#" class="arrow" onclick="fn_nextweek()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
						  <a href="#" class="arrow1"></a>
						  <a href="#" class="arrow" onclick="fn_prevmonth()"><img src="<c:url value='/images/cps/arrow_prev.jpg'/>"></a>
						  <a href="#" onclick="fn_month()">월</a>
						  <a href="#" class="arrow" onclick="fn_nextmonth()"><img src="<c:url value='/images/cps/arrow_next.jpg'/>"></a>
						</div>
					  </td>
					  <td></td>
					  <td>상태</td>
					  <td><select id="status" name="status"></select></td>
					  <td></td>
					  <td>자재코드</td>
					  <td><input type="text" id="modelCode" name="modelCode" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>발급번호</td>
					  <td><input type="text" id="confirmNum" name="confirmNum" onkeypress="keyDown()"/></td>
					</tr>
					<tr height="23px">
					  <td>업체명</td>
					  <td><input type="text" id="comName" name="comName" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>제품명</td>
					  <td><input type="text" id="productName" name="productName" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>문서명</td>
					  <td><input type="text" id="docuName" name="docuName" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>제조업체명</td>
					  <td><input type="text" id="productCom" name="productCom" onkeypress="keyDown()"/></td>
					</tr>
				  </table>
				  </form>
				</div>
				<div class="hsnew_C02_table" style=width:50%;margin-left:0px;margin-top:-5px;margin-bottom:-15px;">
		  		  <table>
	   	    	  	<col width="12%"/>
                   	<col width="13%"/>
                   	<col width="12%"/>
                   	<col width="13%"/>
                   	<col width="12%"/>
                   	<col width="13%"/>
                   	<col width="12%"/>
                   	<col width="13%"/>
                   	<tr>
                       <td class="left">인증완료</td>
                       <td><input type="text" id="status1" name="status1" style="width:100%;text-align:right;padding-right:5px;"/></td>
                       <td class="left">진행중</td>
                       <td><input type="text" id="status2" name="status2" style="width:100%;text-align:right;padding-right:5px;"/></td>
                       <td class="left">보류</td>
                       <td><input type="text" id="status3" name="status3" style="width:100%;text-align:right;padding-right:5px;"/></td>
                       <td class="left">반려</td>
                       <td><input type="text" id="status4" name="status4" style="width:100%;text-align:right;padding-right:5px;"/></td>
                   	</tr>
                  </table>
                </div>
				<div class="normal_Button">
				  <a href="javascript:fn_searchAction();">조회</a>
				  <a href="javascript:fn_insertAction();">등록</a>
				  <a href="javascript:fn_modifyAction();">수정</a>
				  <a href="javascript:fn_deleteAction();">삭제</a>
				  <a href="javascript:fn_searchExcel();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
				</div>
				<div class="easyui-layout" style="width:100%;height:600px">
				  <div data-options="region:'north',split:true" style="width:100%;height:350px;box-sizing:border-box;border:0px">
					<div class="normal_con01">
					  <table id="masterGrid"></table>
					</div>
					<div class="normal_con01" style="display:none">
					  <table id="excelGrid"></table>
					</div>
					<%@ include file="/WEB-INF/jsp/include/excelDown.jsp" %>
				  </div>
		    	  <div data-options="region:'center',split:true" style="width:50%;height:250px;box-sizing:border-box;border:0px;overflow:hidden;">
		  	        <div class="normal_con01">
				  	  <table id="detailGrid"></table>
					</div>
		    	  </div>
		    	  <div data-options="region:'east',split:true" style="width:50%;height:250px;box-sizing:border-box;border:0px">
		    	    <div class="easyui-layout" data-options="fit:true">
		  	          <div data-options="region:'center',split:true" style="width:60%;box-sizing:border-box;border:0px">
		  	            <div class="normal_con01">
					  	  <table id="fileGrid" class="easyui-datagrid"></table>
						</div>
		  	          </div>
		              <div data-options="region:'east',split:true" style="width:40%;box-sizing:border-box;border:0px;overflow:hidden;">
						<form id="frm2" name="frm2">
                       	<input type="hidden" id="masterKey" name="masterKey"/>
                      	<input type="hidden" id="gubun" 	name="gubun" 		value="NoFoodType1"/>
                      	<input type="hidden" id="useYn" 	name="useYn" 		value="Y"/>
                       	<div id="fileuploader" style="width:150px">파일찾기</div>
                   		</form>
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