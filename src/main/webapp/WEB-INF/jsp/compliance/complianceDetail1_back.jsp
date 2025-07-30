<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<link type="text/css" rel="stylesheet" href="<c:url value='/css/lib/jquery.file.upload/uploadfile.css'/>"/>
	<script type="text/javascript" src="<c:url value='/js/lib/webjars/jquery/3.1.1/jquery.min.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/js/lib/webjars/js-xlsx/0.8.0/shim.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/js/lib/webjars/js-xlsx/0.8.0/dist/xlsx.full.min.js'/>"></script>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/jquery.form/jquery.form.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/jquery.file.upload/jquery.uploadfile.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-bufferview.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-filter.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/compliance/complianceDetail1.js'/>"></script>
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
	<style>
        #drop {
            border: 2px dashed #bbb;
            -moz-border-radius: 5px;
            -webkit-border-radius: 5px;
            border-radius: 5px;
            padding: 25px;
            text-align: center;
            font: 20pt bold, "Vollkorn";
            color: #bbb;
        }

        #b64data {
            width: 100%;
        }
    </style>
  </head>
  <body>
    <div id="seach_pop_bg"></div>
	<div id="seach_pop" style="width:80%;height:600px;top:50%; left:20%; margin-left:-100px;">
	  <div class="easyui-texteditor" id="contents2" style="width:100%;height:600px;"></div>
	</div>
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
				  <input type="hidden" id="yogGubun" 	name="yogGubun" 	value="전기">
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
					      <option value="sinchungDate">신청일</option>
					      <option value="balgupDate">발급일</option>
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
					  <td>인증상태</td>
					  <td><select id="certiGubun" name="certiGubun"></select></td>
					  <td></td>
					  <td>자재코드</td>
					  <td><input type="text" id="jajaeCode" name="jajaeCode" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>인증번호</td>
					  <td><input type="text" id="certiNum" name="certiNum" onkeypress="keyDown()"/></td>
					</tr>
					<tr height="23px">
					  <td>업체명</td>
					  <td><input type="text" id="yogCom" name="yogCom" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>B/L No.</td>
					  <td><input type="text" id="blNo" name="blNo" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>제품명</td>
					  <td><input type="text" id="productName" name="productName" onkeypress="keyDown()"/></td>
					  <td></td>
					  <td>제조사명</td>
					  <td><input type="text" id="productCom" name="productCom" onkeypress="keyDown()"/></td>
					</tr>
				  </table>
				  </form>
				</div>
				<div class="normal_Button">
				  <a href="javascript:fn_searchAction();">조회</a>
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
		    	  <div data-options="region:'east',split:true" style="width:100%;height:250px;box-sizing:border-box;border:0px">
		    	    <div class="easyui-tabs" data-options="fit:true,plain:true">
		    	      <div title="입력">
			  	        <div class="normal_Button">
					   	  <a href="javascript:fn_clearAction();">Clear</a>
					   	  <a href="javascript:fn_insertAction();">신규(복사) 등록</a>
					   	  <a href="javascript:fn_modifyAction();">수정</a>
					   	  <a href="javascript:fn_delAction();">삭제</a>
					  	</div>
					  	<div class="hsnew_C02_table">
			  	          <form id="insertForm" name="insertForm">
			  	          <input type="hidden" id="yogKey" 		name="yogKey">
			  	          <input type="hidden" id="yogGubun" 	name="yogGubun" value="전기">
			  	          <input type="hidden" id="bjajaeCode" 	name="bjajaeCode"/>
			  	          <input type="hidden" id="bmmodelCode" name="bmmodelCode"/>
						  <table>
					   	    <col width="08%"/>
                            <col width="17%"/>
                            <col width="08%"/>
                            <col width="17%"/>
                            <col width="08%"/>
                            <col width="17%"/>
                            <col width="08%"/>
                            <col width="17%"/>
                            <tr>
                              <td class="left">업체명/사업자번호</td>
                              <td>
                                <input type="text" id="yogCom"  name="yogCom"  style="width:50%;"/>
                                <input type="text" id="yogSaup" name="yogSaup" style="width:100px;" onkeydown="return fn_onlyNumber(event)" maxlength="10"/>
                              </td>
                              <td class="left">B/L No</td>
                              <td>
                                <input type="text" id="blNo" name="blNo" style="width:100%;ime-mode:inactive"/>
                              </td>
                              <td class="left">신청종류</td>
                              <td>
                                <input type="text" id="appType" name="appType" style="width:100%;"/>
                              </td>
                              <td class="left">신청일</td>
                              <td>
                                <input type="text" id="sinchungDate" name="sinchungDate"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />
                              </td>
                            </tr>
                            <tr>
                              <td class="left">자재코드(요건)</td>
                              <td>
                                <input type="text" id="jajaeCode" name="jajaeCode" style="width:100%;ime-mode:inactive"/>
                              </td>
                              <td class="left">자재코드(통관)</td>
                              <td>
                                <input type="text" id="mmodelCode" name="mmodelCode" style="width:100%;ime-mode:inactive"/>
                              </td>
                              <td class="left">수량</td>
                              <td>
                                <input type="text" id="yogSu" name="yogSu" style="width:70px;text-align:right" onkeydown="return fn_onlyNumber(event)"/>
                              </td>
                              <td class="left">HS Code</td>
                              <td>
                                <input type="text" id="hsCode" name="hsCode" style="width:100px;" onkeydown="return fn_onlyNumber(event)" maxlength="10"/>
                              </td>
                            </tr>
                            <tr>
                              <td class="left">품명</td>
                              <td>
                                <input type="text" id="productName" name="productName" style="width:100%;"/>
                              </td>
                              <td class="left">제품명</td>
                              <td>
                                <input type="text" id="productEngName" name="productEngName" style="width:100%;"/>
                              </td>
                              <td class="left">기본모델명</td>
                              <td>
                                <input type="text" id="basicModelName" name="basicModelName" style="width:100%;"/>
                              </td>
                              <td class="left">파생모델명</td>
                              <td>
                                <input type="text" id="orderModelName" name="orderModelName" style="width:100%;"/>
                              </td>
                            </tr>
                            <tr>
                              <td class="left">인증서 모델명</td>
                              <td>
                                <input type="text" id="certiModelName" name="certiModelName" style="width:100%;"/>
                              </td>
                              <td class="left">인증구분</td>
                              <td>
                                <select id="certiGubun" name="certiGubun" style="width:70px;"></select>
                              </td>
                              <td class="left">인증번호</td>
                              <td>
                                <input type="text" id="certiNum" name="certiNum" style="width:100%;"/>
                              </td>
                              <td class="left">요건항목</td>
                              <td>
                                <input type="text" id="certiDoc" name="certiDoc" style="width:100%;"/>
                              </td>
                            </tr>
                            <tr>
                              <td class="left">발급일</td>
                              <td>
                                <input type="text" id="balgupDate" name="balgupDate" style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />
                              </td>
                              <td class="left">제조사명</td>
                              <td>
                                <input type="text" id="productCom" name="productCom" style="width:100%;"/>
                              </td>
                              <td class="left">제조국명</td>
                              <td>
                                <input type="text" id="productNation" name="productNation" style="width:100%;"/>
                              </td>
                              <td class="left">건수</td>
                              <td>
                                <input type="text" id="gunSu" name="gunSu" style="width:70px;text-align:right" onkeydown="return fn_onlyNumber(event)"/>
                              </td>
                            </tr>
                            <tr>
                              <td class="left">대행수수료</td>
                              <td>
                                <input type="text" id="fees" name="fees" style="width:70px;text-align:right" onkeydown="return fn_onlyNumber(event)"/>
                              </td>
                              <td class="left">회계 업로드 여부</td>
                              <td>
                                <select id="uploadYn" name="uploadYn" style="width:40px">
							      <option value="N">N</option>
							      <option value="Y">Y</option>
								</select>
                              </td>
                              <td class="left">계산서 발행여부</td>
                              <td>
                                <select id="billYn" name="billYn" style="width:40px">
							      <option value="N">N</option>
							      <option value="Y">Y</option>
								</select>
                              </td>
                              <td class="left">계산서 발행일</td>
                              <td>
                                <input type="text" id="billDate" name="billDate" style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />
                              </td>
                            </tr>
                          </table>
                          </form>
                        </div>
			  	      </div>
			  	      <div title="일괄업로드" style="padding:5px;height:230px;">
			  	        <div class="normal_Button">
					   	  <a href="javascript:fn_sampleAction();">샘플 다운로드</a>
					  	</div>
			  	        <div id="drop">Drag & Drop</div>
				          <select name="format" style="display:none">
						    <option value="json" selected> JSON</option>
						  </select>
						  <%--Use Web Workers: (when available) --%><input type="checkbox" name="useworker" checked style="display: none"/>
						  <%--Use Transferrables: (when available) --%><input type="checkbox" name="xferable" checked style="display: none"/>
						  <%--Use readAsBinaryString: (when available) --%><input type="checkbox" name="userabs" checked style="display: none"/>
					      <script>
						    /*jshint browser:true */
						    /*global XLSX */
						    var X = XLSX;
						    var XW = {
						        /* worker message */
						        msg: 'xlsx',
						        /* worker scripts */
						        rABS: '/js/lib/webjars/js-xlsx/0.8.0/xlsxworker2.js',
						        norABS: '/js/lib/webjars/js-xlsx/0.8.0/xlsxworker1.js',
						        noxfer: '/js/lib/webjars/js-xlsx/0.8.0/xlsxworker.js'
						    };

						    var rABS = typeof FileReader !== "undefined" && typeof FileReader.prototype !== "undefined" && typeof FileReader.prototype.readAsBinaryString !== "undefined";
						    if (!rABS) {
						        document.getElementsByName("userabs")[0].disabled = true;
						        document.getElementsByName("userabs")[0].checked = false;
						    }

						    var use_worker = typeof Worker !== 'undefined';
						    if (!use_worker) {
						        document.getElementsByName("useworker")[0].disabled = true;
						        document.getElementsByName("useworker")[0].checked = false;
						    }

						    var transferable = use_worker;
						    if (!transferable) {
						        document.getElementsByName("xferable")[0].disabled = true;
						        document.getElementsByName("xferable")[0].checked = false;
						    }

						    var wtf_mode = false;

						    function fixdata(data) {
						        var o = "", l = 0, w = 10240;
						        for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
						        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
						        return o;
						    }

						    function ab2str(data) {
						        var o = "", l = 0, w = 10240;
						        for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint16Array(data.slice(l * w, l * w + w)));
						        o += String.fromCharCode.apply(null, new Uint16Array(data.slice(l * w)));
						        return o;
						    }

						    function s2ab(s) {
						        var b = new ArrayBuffer(s.length * 2), v = new Uint16Array(b);
						        for (var i = 0; i != s.length; ++i) v[i] = s.charCodeAt(i);
						        return [v, b];
						    }

						    function xw_noxfer(data, cb) {
						        var worker = new Worker(XW.noxfer);
						        worker.onmessage = function (e) {
						            switch (e.data.t) {
						                case 'ready':
						                    break;
						                case 'e':
						                    console.error(e.data.d);
						                    break;
						                case XW.msg:
						                    cb(JSON.parse(e.data.d));
						                    break;
						            }
						        };
						        var arr = rABS ? data : btoa(fixdata(data));
						        worker.postMessage({d: arr, b: rABS});
						    }

						    function xw_xfer(data, cb) {
						        var worker = new Worker(rABS ? XW.rABS : XW.norABS);
						        worker.onmessage = function (e) {
						            switch (e.data.t) {
						                case 'ready':
						                    break;
						                case 'e':
						                    console.error(e.data.d);
						                    alert("바인딩 에러" + e.data.d);
						                    break;
						                default:
						                    //xx = ab2str(e.data).replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace( /(\s*)/g, "");
						                    xx = ab2str(e.data);
						                    console.log("done");
						                    cb(JSON.parse(xx));
						                    break;
						            }
						        };
						        if (rABS) {
						            var val = s2ab(data);
						            worker.postMessage(val[1], [val[1]]);
						        } else {
						            worker.postMessage(data, [data]);
						        }
						    }

						    function xw(data, cb) {
						        transferable = document.getElementsByName("xferable")[0].checked;
						        if (transferable) xw_xfer(data, cb);
						        else xw_noxfer(data, cb);
						    }

						    function get_radio_value(radioName) {
						        var radios = document.getElementsByName(radioName);
						        for (var i = 0; i < radios.length; i++) {
						            if (radios[i].checked || radios.length === 1) {
						                return radios[i].value;
						            }
						        }
						    }

						    function to_json(workbook) {
						        var result = {};
						        workbook.SheetNames.forEach(function (sheetName) {
						            var roa = X.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
						            if (roa.length > 0) {
						                result[sheetName] = roa;
						            }
						        });
						        return result;
						    }

						    var tarea = document.getElementById('b64data');
						    function b64it() {
						        if (typeof console !== 'undefined') console.log("onload", new Date());
						        var wb = X.read(tarea.value, {type: 'base64', WTF: wtf_mode});
						        process_wb(wb);
						    }

						    function process_wb(wb) {
						        var output = "";
						        switch (get_radio_value("format")) {
						            case "json":
						                output = JSON.stringify(to_json(wb), 2, 2);
						                break;
						            default:
						            	output = JSON.stringify(to_json(wb), 2, 2);
						        }
						        var aabb = JSON.parse(output).Sheet1;
						        var aacc = new Array();

					        	for(var i = 0; i < aabb.length; i++){
					        		if (aabb[i].요건자재코드 != undefined) {
						        		aacc.push(aabb[i]);
					                }
					        	}
					        	console.log(aacc);
					        	progress.show();
					        	for(var i = 0; i < aacc.length; i++){
						        	var url 	= "../apis/compliance/insertYogMaster",
							    		params  = aacc[i],
							    		type 	= "POST";

						        	params["yogGubun"] 			= "전기";
						        	params["yogCom"] 			= aacc[i].업체명;
						        	params["yogSaup"] 			= aacc[i].사업자번호;
						        	params["blNo"] 				= (aacc[i].BL != undefined) ? aacc[i].BL : '';
						        	params["appType"] 			= (aacc[i].신청종류 != undefined) ? aacc[i].신청종류 : '';
						        	params["gunSu"] 			= aacc[i].건수;
						        	params["fees"] 				= (aacc[i].대행수수료 != undefined) ? aacc[i].대행수수료 : '';
						        	params["uploadYn"] 			= aacc[i].회계업로드;
						        	params["billYn"] 			= aacc[i].계산서발행여부;
						        	params["billDate"] 			= (aacc[i].계산서발행일 != undefined) ? aacc[i].계산서발행일.replace('.','').replace('-','').replace('.','').replace('-','') : '';
						        	params["sinchungDate"] 		= aacc[i].신청일.replace('.','').replace('-','').replace('.','').replace('-','');
						        	params["balgupDate"] 		= (aacc[i].발급일 != undefined) ? aacc[i].발급일.replace('.','').replace('-','').replace('.','').replace('-','') : '';
						        	params["mmodelCode"] 		= (aacc[i].통관자재코드 != undefined) ? aacc[i].통관자재코드 : '';
						        	params["jajaeCode"] 		= aacc[i].요건자재코드;
						        	params["yogSu"] 			= aacc[i].수량;
						        	params["certiGubun"] 		= aacc[i].인증구분;
						        	params["certiDoc"] 			= (aacc[i].요건항목 != undefined) ? aacc[i].요건항목 : '';
						        	params["certiNum"] 			= (aacc[i].인증번호 != undefined) ? aacc[i].인증번호 : '';
						        	params["certiModelName"] 	= (aacc[i].인증서모델명 != undefined) ? aacc[i].인증서모델명 : '';
						        	params["basicModelName"] 	= (aacc[i].기본모델명 != undefined) ? aacc[i].기본모델명 : '';
						        	params["orderModelName"] 	= (aacc[i].파생모델명 != undefined) ? aacc[i].파생모델명 : '';
						        	params["productName"] 		= aacc[i].품명;
						        	params["productEngName"] 	= aacc[i].제품명;
						        	params["productCom"] 		= aacc[i].제조사명;
						        	params["productNation"] 	= aacc[i].제조국명;
						        	params["hsCode"] 			= aacc[i].HSCODE.replace('-','').replace('.','');

							    	sendAjax(url, params, type, function(d){
							    	});
					        	}
					        	progress.hide();
					        	fn_searchAction();
					        	alert("등록되었습니다.");
						    }

						    var drop = document.getElementById('drop');
						    function handleDrop(e) {
						        e.stopPropagation();
						        e.preventDefault();
						        rABS = document.getElementsByName("userabs")[0].checked;
						        use_worker = document.getElementsByName("useworker")[0].checked;
						        var files = e.dataTransfer.files;
						        var f = files[0];
						        {
						            var reader = new FileReader();
						            var name = f.name;
						            reader.onload = function (e) {
						                var data = e.target.result;
						                if (use_worker) {
						                    xw(data, process_wb);
						                } else {
						                    var wb;
						                    if (rABS) {
						                        wb = X.read(data, {type: 'binary'});
						                    } else {
						                        var arr = fixdata(data);
						                        wb = X.read(btoa(arr), {type: 'base64'});
						                    }
						                    process_wb(wb);
						                }
						            };
						            if (rABS) reader.readAsBinaryString(f);
						            else reader.readAsArrayBuffer(f);
						        }
						    }

						    function handleDragover(e) {
						        e.stopPropagation();
						        e.preventDefault();
						        e.dataTransfer.dropEffect = 'copy';
						    }

						    if (drop.addEventListener) {
						        drop.addEventListener('dragenter', handleDragover, false);
						        drop.addEventListener('dragover', handleDragover, false);
						        drop.addEventListener('drop', handleDrop, false);
						    }
						</script>
			  	      </div>
			  	      <div title="첨부문서" style="padding:10px;height:230px;">
			  	        <div class="easyui-layout" data-options="fit:true">
			  	          <div data-options="region:'center',split:true" style="width:60%;box-sizing:border-box;border:0px">
			  	            <div class="normal_con01">
						  	  <table id="fileGrid" class="easyui-datagrid"></table>
							</div>
			  	          </div>
			              <div data-options="region:'east',split:true" style="width:40%;box-sizing:border-box;border:0px;overflow:hidden;">
							<form id="frm2" name="frm2">
                        	<input type="hidden" id="masterKey" name="masterKey"/>
                       		<input type="hidden" id="gubun" 	name="gubun" 		value="전기"/>
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
	  </div>
	</div>
  </body>
</html>