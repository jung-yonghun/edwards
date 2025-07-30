<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
    <title>인증현황입력</title>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<link type="text/css" rel="stylesheet" href="<c:url value='/css/lib/jquery.file.upload/uploadfile.css'/>"/>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/jquery.form/jquery.form.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/jquery.file.upload/jquery.uploadfile.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/compliance/complianceIns.js'/>"></script>
	<link rel="stylesheet" href="<c:url value='/css/lib/easyui/texteditor.css'/>" type="text/css"/>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/jquery.texteditor.js'/>"></script>
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
        width: 260px;
        height: 110px;
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
				<div class="normal_Button">
				  <a href="javascript:fn_insertAction();">등록</a>
				  <a href="javascript:window.close();">닫기</a>
				</div>
				<div class="easyui-layout" style="width:100%;height:620px;padding:0px">
		    	  <div data-options="region:'west',split:true" style="width:50%;height:620px;box-sizing:border-box;border:0px">
		    	    <div class="hsnew_C02_table" style="margin-top:-13px;margin-left:10px">
		    	      <input type="hidden" id="ID" 			name="ID" 			value="${sessionScope.ID}">
				  	  <input type="hidden" id="USERGRADE" 	name="USERGRADE" 	value="${sessionScope.USERGRADE}">
				  	  <input type="hidden" id="_defaultDB" 	name="_defaultDB" 	value="${sessionScope.DEFAULTDB}">
				  	  <input type="hidden" id="taxNum" 		name="taxNum" 		value="${sessionScope.TAXNO}">
				  	  <input type="hidden" id="sangho" 		name="sangho" 		value="${sessionScope.SANGHO}"/>
		      	  	  <form id="tx_editor_form" name="tx_editor_form" accept-charset="utf-8">
		      	  	  <input type="hidden" id="compKey" name="compKey" value="${param.compKey}"/>
		      	  	  <input type="hidden" id="useYn" 	name="useYn"/>
			  		  <table>
		   	    	  	<col width="15%"/>
                      	<col width="35%"/>
                      	<col width="15%"/>
                      	<col width="35%"/>
		      		  	<tr>
                          <td class="left">업체명 <i></i></td>
                          <td colspan="3">
                            <input type="text" id="comName" name="comName" style="width:90%;" maxlength="100"/>
                            <a href="javascript:fn_searchSet()"><img src="../images/cps/hs_seach.png" id="customerSearch"></a>
                          </td>
                      	</tr>
                      	<tr>
                          <td class="left">사업자번호 <i></i></td>
                          <td colspan="3"><input type="text" id="comNum" name="comNum" style="width:100%;" maxlength="10"  onkeydown="return fn_onlyNumber(event)"/></td>
                      	</tr>
                      	<tr>
                          <td class="left">Status <i></i></td>
                          <td colspan="3"><select id="status" name="status" style="width:80px;"></select></td>
                      	</tr>
                      	<tr>
                          <td class="left">사유</td>
                          <td colspan="3"><input type="text" id="reason" name="reason" style="width:100%;"/></td>
                      	</tr>
                      	<tr>
                          <td class="left">관련법령명</td>
                          <td colspan="3"><input type="text" id="lawName" name="lawName" style="width:100%;"/></td>
                      	</tr>
                      	<tr>
                          <td class="left">인증제품명</td>
                          <td colspan="3"><input type="text" id="productName" name="productName" style="width:100%;"/></td>
                      	</tr>
                      	<tr>
                          <td class="left">문서명</td>
                          <td colspan="3"><input type="text" id="docuName" name="docuName" style="width:100%;"/></td>
                      	</tr>
                      	<tr>
                          <td class="left">인증일자</td>
                          <td><input type="text" id="compDt" name="compDt" style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/></td>
                          <td class="left">유효기간</td>
                          <td><input type="text" id="validity" name="validity" style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/></td>
                      	</tr>
                      	<tr>
                          <td class="left">인증번호</td>
                          <td><input type="text" id="compNum" name="compNum" style="width:100%;"/></td>
                          <td class="left">인증주체</td>
                          <td>
                            <select id="compUser" name="compUser" style="width:80px;">
                              <option value="">==선택==</option>
                              <option value="세인">세인</option>
                              <option value="화주">화주</option>
                              <option value="대리인">대리인</option>
                            </select>
                          </td>
                      	</tr>
                      	<tr>
                          <td class="left">제조국</td>
                          <td colspan="3"><input type="text" id="productCountry" name="productCountry" style="width:100%;"/></td>
                      	</tr>
                      	<tr>
                          <td class="left">제조업체명</td>
                          <td colspan="3"><input type="text" id="productCom" name="productCom" style="width:100%;"/></td>
                      	</tr>
                      	<tr>
                          <td class="left">참고사항</td>
                          <td colspan="3"><input type="text" id="note" name="note" style="width:100%;"/></td>
                      	</tr>
                      	<tr>
                          <td class="left">자재코드</td>
                          <td colspan="3">
                            <input type="text" id="mmodelCode" name="mmodelCode" style="width:50%;"/>
                            <input type="hidden" id="newCheck" name="newCheck" value="N"/>
                            <input type="hidden" id="mhsCode" name="mhsCode"/>
                            <input type="hidden" id="mstdGoods" name="mstdGoods"/>
                            <input type="hidden" id="mmodel1" name="mmodel1"/>
                            <input type="hidden" id="mqtyUt" name="mqtyUt"/>
                            <input type="hidden" id="munitPrice" name="munitPrice"/>
                            <input type="hidden" id="morigin1" name="morigin1"/>
                            <a href="javascript:fn_saveItem();" class="easyui-linkbutton" style="margin-top:-2px">등록</a>
                            <a href="javascript:fn_searchItemSet()"><img src="../images/cps/hs_seach.png" id="customerSearch"></a>
                          </td>
                      	</tr>
                      </table>
                      <textarea name="productInfo" id="productInfo" rows="10" cols="100" style="width:766px; height:412px;display: none;"></textarea>
                      </form>
			  	    </div>
			  	    <div class="normal_con01" style="margin-left:10px;margin-right:15px">
					  <table id="itemGrid" class="easyui-datagrid"></table>
				    </div>
		    	  </div>
		    	  <div data-options="region:'center',split:true" style="width:50%;height:620px;box-sizing:border-box;border:0px">
		    	    <div class="easyui-texteditor" id="contents1" style="width:100%;height:450px;padding:10px;"></div>
		  	        <div class="easyui-layout" data-options="fit:true" style="width:100%;height:130px">
		  	          <div data-options="region:'center',split:true" style="width:50%;height:130px;box-sizing:border-box;border:0px">
		  	            <div class="normal_con01">
					  	  <table id="fileGrid" class="easyui-datagrid"></table>
						</div>
		  	          </div>
		              <div data-options="region:'east',split:true" style="width:50%;box-sizing:border-box;border:0px">
						<form id="frm2" name="frm2">
                       	<input type="hidden" id="masterKey" name="masterKey" 	value="${param.compKey}"/>
                       	<input type="hidden" id="gubun" 	name="gubun" 		value="NoFoodMaster"/>
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