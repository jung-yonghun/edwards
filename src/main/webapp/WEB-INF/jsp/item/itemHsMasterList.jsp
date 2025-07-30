<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
	<jsp:include page="/WEB-INF/jsp/include/head_newTitle.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_newCss.jsp"></jsp:include>
	<link type="text/css" rel="stylesheet" href="<c:url value='/css/lib/jquery.file.upload/uploadfile.css'/>"/>
	<jsp:include page="/WEB-INF/jsp/include/head_newJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/jquery.form/jquery.form.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/jquery.file.upload/jquery.uploadfile.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-filter.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/item/itemHsMasterList.js'/>"></script>
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
        height: 175px;
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
				  <form id="frm" name="frm">
				  <input type="hidden" id="ID" 					name="ID" 					value="${sessionScope.ID}">
				  <input type="hidden" id="USERGRADE" 			name="USERGRADE" 			value="${sessionScope.USERGRADE}">
				  <input type="hidden" id="_defaultDB" 			name="_defaultDB" 			value="${sessionScope.DEFAULTDB}">
				  <input type="hidden" id="hsRegUserComTaxNum" 	name="hsRegUserComTaxNum" 	value="${sessionScope.TAXNO}">
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
					      <option value="hsRegDt">등록일</option>
                          <option value="hsReviewDt">검토일</option>
                          <option value="itemOkDtm">확정일</option>
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
					  <td><select id="hsStatus" name="hsStatus"></select></td>
					  <td></td>
					  <td>의뢰상태</td>
					  <td><select id="hsStatus_cus" name="hsStatus_cus"></select></td>
					  <td></td>
					  <td>중요도</td>
					  <td><select id="hsImportance" name="hsImportance"></select></td>
					</tr>
					<tr height="23px">
					  <td>업체상호</td>
					  <td><input type="text" id="hsRegUserComName" name="hsRegUserComName" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>자재코드</td>
					  <td><input type="text" id="itemMmodelCode" name="itemMmodelCode" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>세번부호</td>
					  <td><input type="text" id="itemHs" name="itemHs" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>의뢰자</td>
					  <td><input type="text" id="hsRegUserNm" name="hsRegUserNm" onkeypress="keyDown()"/></td>
					</tr>
				  </table>
				  </form>
				</div>
				<div class="normal_Button">
				  <a href="javascript:fn_searchAction();">조회</a>
				  <!-- a href="javascript:fn_insertAction();">등록</a-->
				  <a href="javascript:fn_searchExcel();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
				</div>
				<div class="easyui-layout" style="width:100%;height:620px">
				  <div data-options="region:'north',split:true" style="width:100%;height:350px;box-sizing:border-box;border:0px">
					<div class="normal_con01" id="parentDiv" style="margin-left:10px;">
					  <table id="masterGrid"></table>
			  		  <div id="masterPager"></div>
					</div>
					<div class="normal_con01" id="parentDiv1" style="display:none">
					  <table id="excelGrid"></table>
					  <div id="excelPager"></div>
					</div>
					<%@ include file="/WEB-INF/jsp/include/excelDown.jsp" %>
				  </div>
		    	  <div data-options="region:'center',split:true" style="width:50%;height:270px;box-sizing:border-box;border:0px">
		    	    <div class="easyui-tabs" data-options="fit:true,plain:true">
			  	      <div title="의견">
			  	        <div class="hsnew_C02_table">
			      	  	  <form id="insertForm1" name="insertForm1">
				  		  <table>
			   	    	  	<col width="09%"/>
	                      	<col width="91%"/>
	                      	<tr>
	                          <td class="left">확정의견</td>
	                          <td>
	                            <textarea type="text" id="itemOkMemo" name="itemOkMemo" style="width:100%;height:90px" readOnly></textarea>
	                          </td>
	                      	</tr>
	                      	<tr>
	                          <td class="left">쟁점사항</td>
	                          <td>
	                            <textarea type="text" id="hsIssueMemo" name="hsIssueMemo" style="width:100%;height:90px" readOnly></textarea>
	                          </td>
	                      	</tr>
	                      	<tr>
	                          <td class="left">보완요청</td>
	                          <td>
	                            <textarea type="text" id="itemSupplementMemo" name="itemSupplementMemo" style="width:100%;height:90px" readOnly></textarea>
	                          </td>
	                      	</tr>
	                      </table>
	                      </form>
	                  	</div>
			  	      </div>
			  	      <div title="상세정보">
			  	        <div class="hsnew_C02_table">
			      	  	  <form id="insertForm" name="insertForm">
				  		  <table>
			   	    	  	<col width="10%"/>
	                      	<col width="24%"/>
	                      	<col width="10%"/>
	                      	<col width="23%"/>
	                      	<col width="10%"/>
	                      	<col width="23%"/>
			      		  	<tr>
	                          <td class="left">상태</td>
	                          <td><input type="text" id="hsStatus" name="hsStatus" style="width:100%;" readOnly/></td>
	                          <td class="left">관리번호</td>
	                          <td><input type="text" id="hsRegNum" name="hsRegNum" style="width:100%;" readOnly/></td>
	                          <td class="left">확정기한</td>
	                          <td><input type="text" id="hsReviewDt1" name="hsReviewDt1" style="width:100%;" readOnly/></td>
	                      	</tr>
	                      	<tr>
	                          <td class="left">의뢰일</td>
	                          <td><input type="text" id="hsRegDt" name="hsRegDt" style="width:100%;" readOnly/></td>
	                          <td class="left">의뢰자</td>
	                          <td><input type="text" id="hsRegUserNm" name="hsRegUserNm" style="width:100%;" readOnly/></td>
	                          <td class="left">연락처</td>
	                          <td><input type="text" id="hsRegUserPhoneNum" name="hsRegUserPhoneNum" style="width:100%;" readOnly/></td>
	                      	</tr>
	                      	<tr>
	                          <td class="left">확정일</td>
	                          <td><input type="text" id="itemOkDtm" name="itemOkDtm" style="width:100%;" readOnly/></td>
	                          <td class="left">확정자</td>
	                          <td><input type="text" id="hsOkUserNm" name="hsOkUserNm" style="width:100%;" readOnly/></td>
	                          <td class="left">연락처</td>
	                          <td><input type="text" id="hsOkPhoneNum" name="hsOkPhoneNum" style="width:100%;" readOnly/></td>
	                      	</tr>
	                      	<tr>
	                          <td class="left">업체상호</td>
	                          <td colspan="3"><input type="text" id="hsRegUserComName" name="hsRegUserComName" style="width:100%;" readOnly/></td>
	                          <td class="left">연락처</td>
	                          <td><input type="text" id="hsRegUserComTel" name="hsRegUserComTel" style="width:100%;" readOnly/></td>
	                      	</tr>
	                      	<tr>
	                          <td class="left">자재코드</td>
	                          <td>
	                            <input type="text" id="itemMmodelCode" name="itemMmodelCode" style="width:100%;" readOnly/>
	                          </td>
	                          <td class="left">품명</td>
	                          <td colspan="3">
	                            <input type="text" id="itemMstdGoods" name="itemMstdGoods" style="width:100%;" readOnly/>
	                          </td>
	                      	</tr>
	                      	<tr>
	                          <td class="left">모델/규격</td>
	                          <td colspan="5">
	                            <input type="text" id="itemGyuguek" name="itemGyuguek" style="width:100%;" readOnly/>
	                          </td>
	                      	</tr>
	                      	<tr>
	                          <td class="left">성분</td>
	                          <td colspan="5">
	                            <input type="text" id="itemSungbun" name="itemSungbun" style="width:100%;" readOnly/>
	                          </td>
	                      	</tr>
	                      	<tr>
	                          <td class="left">등록HS</td>
	                          <td><input type="text" id="itemHs" name="itemHs" style="width:100%;" readOnly/></td>
	                          <td class="left">확정HS</td>
	                          <td><input type="text" id="itemOkHs" name="itemOkHs" style="width:100%;" readOnly/></td>
	                          <td></td>
	                          <td></td>
	                      	</tr>
	                      </table>
	                      </form>
	                  	</div>
			  	      </div>
			  	    </div>
		    	  </div>
		    	  <div data-options="region:'east',split:true" style="width:50%;height:270px;box-sizing:border-box;border:0px">
		    	    <div class="easyui-tabs" data-options="fit:true,plain:true">
			  	      <div title="첨부문서" style="padding:10px;">
			  	        <div class="easyui-layout" data-options="fit:true">
			  	          <div data-options="region:'center',split:true" style="width:60%;box-sizing:border-box;border:0px">
			  	            <div class="normal_con01" id="parentDiv2" style="margin-right:5px;">
						  	  <table id="fileGrid"></table>
						  	  <div id="filePager"></div>
							</div>
			  	          </div>
			              <div data-options="region:'east',split:true" style="width:40%;box-sizing:border-box;border:0px">
							<form id="filefrm" name="filefrm">
							<input type="hidden" id="FKeyMngNo"	name="FKeyMngNo">
							<input type="hidden" id="path" 		name="path" 		value="item">
							<input type="hidden" id="FTableNm" 	name="FTableNm" 	value="MAAA100">
							<input type="hidden" id="Gbn" 		name="Gbn" 			value="I">
							<input type="hidden" id="FileTitle" name="FileTitle" 	value="">
							<input type="hidden" id="FKey" 		name="FKey" 		value="0">
                        	<div id="fileuploader" style="width:150px">파일찾기</div>
                    		</form>
			              </div>
			            </div>
			  	      </div>
			  	      <!-- div title="상태" style="padding:10px;">
			  	        <div class="normal_con01">
					  	  <table id="detailGrid"></table>
						</div>
			  	      </div-->
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