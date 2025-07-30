<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
    <title>요건 식품등록</title>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/webjars/jquery/3.1.1/jquery.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/webjars/js-xlsx/0.8.0/shim.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/webjars/js-xlsx/0.8.0/dist/xlsx.full.min.js'/>"></script>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/jquery.form/jquery.form.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-bufferview.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-filter.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/compliance/complianceSikpumIns.js'/>"></script>
	<style>
        #drop {
            border: 2px dashed #bbb;
            -moz-border-radius: 5px;
            -webkit-border-radius: 5px;
            border-radius: 5px;
            padding: 25px;
            text-align: center;
            font: 20pt bold, "Vollkorn";
            color: #bbb
        }

        #b64data {
            width: 100%;
        }
    </style>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="easyui-layout" style="width:900px;height:765px;">
		      <div data-options="region:'center'" style="box-sizing:border-box;border:0px;">
	  	        <div class="normal_Button">
			   	  <a href="javascript:fn_insertAction();">저장</a>
			  	</div>
		  		<div class="hsnew_C02_table">
  	          	  <form id="insertForm" name="insertForm">
  	          	  <input type="hidden" id="yogKey" 		name="yogKey" 	value="${param.yogKey}">
  	          	  <input type="hidden" id="copy" 		name="copy" 	value="${param.copy}">
  	          	  <input type="hidden" id="count1" 		name="count1">
  	          	  <input type="hidden" id="count2" 		name="count2">
  	          	  <input type="hidden" id="program" 	name="program">
  	          	  <input type="hidden" id="billGubun" 	name="billGubun">
  	          	  <input type="hidden" id="billDate" 	name="billDate">
			  	  <table>
		   	    	<col width="15%"/>
                    <col width="35%"/>
                    <col width="15%"/>
                    <col width="35%"/>
                    <tr>
                      <td class="left">업체명/사업자번호</td>
                      <td>
                        <input type="text" id="yogCom"  name="yogCom"  style="width:50%;ime-mode:active"/>
                        <input type="text" id="yogSaup" name="yogSaup" style="width:80px;" onkeydown="return fn_onlyNumber(event)" maxlength="10"/>
                        <a href="javascript:fn_customerSearch()"><img src="../images/cps/hs_seach.png" id="ddealSearch"></a>
                      </td>
                      <td class="left">통관담당</td>
                      <td>
                        <select id="seinGubun" name="seinGubun" style="width:70px">
						  <option value="1">세인</option>
						  <option value="0">타관세사</option>
						</select>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">HB/L No</td>
                      <td>
                        <input type="text" id="hblNo" name="hblNo" style="width:100%;ime-mode:inactive;text-transform:uppercase;"/>
                      </td>
                      <td class="left">화물관리번호</td>
                      <td>
                        <input type="text" id="mrnNo" name="mrnNo" style="width:100%;ime-mode:inactive;text-transform:uppercase;"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">입항일</td>
                      <td>
                        <input type="text" id="iphangDate" name="iphangDate" style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />
                      </td>
                      <td class="left">반입일</td>
                      <td>
                        <input type="text" id="banipDate" name="banipDate" style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />
                      </td>
                    </tr>
                    <tr>
                      <td class="left">신고일</td>
                      <td>
                        <input type="text" id="singoDate" name="singoDate" style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />
                      </td>
                      <td class="left">수리일</td>
                      <td>
                        <input type="text" id="suriDate" name="suriDate" style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />
                      </td>
                    </tr>
                    <tr>
                      <td class="left">검사검역 접수일</td>
                      <td>
                        <input type="text" id="jubsuDate" name="jubsuDate" style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />
                      </td>
                      <td class="left">검사검역 완료일</td>
                      <td>
                        <input type="text" id="finishDate" name="finishDate" style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />
                      </td>
                    </tr>
                    <tr>
                      <td class="left">장치장부호</td>
                      <td>
                        <input type="text" id="jangchiCode" name="jangchiCode" style="width:100%;ime-mode:inactive;text-transform:uppercase;"/>
                      </td>
                      <td class="left">장치장명</td>
                      <td>
                        <input type="text" id="jangchiName" name="jangchiName" style="width:100%;ime-mode:inactive;text-transform:uppercase;"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">Inv No</td>
                      <td>
                        <input type="text" id="invNo" name="invNo"  style="width:100%;ime-mode:inactive;text-transform:uppercase;"/>
                      </td>
                      <td class="left">검사선별종류</td>
                      <td>
                        <input type="text" id="testGubun" name="testGubun"  style="width:100%;ime-mode:inactive;text-transform:uppercase;"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">정밀비용</td>
                      <td>
                        <input type="text" id="jungmilCost" name="jungmilCost" style="width:30%;text-align:right" onkeydown="return fn_onlyNumber(event)"/>
                      </td>
                      <td class="left">라벨제작비용</td>
                      <td>
                        <input type="text" id="labelCost" name="labelCost" style="width:30%;text-align:right" onkeydown="return fn_onlyNumber(event)"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">기타비용</td>
                      <td>
                        <input type="text" id="etcCost" name="etcCost" style="width:30%;text-align:right" onkeydown="return fn_onlyNumber(event)"/>
                      </td>
                      <td class="left">요건수수료</td>
                      <td>
                        <input type="text" id="fees" name="fees" style="width:30%;text-align:right" onkeydown="return fn_onlyNumber(event)"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">Remark</td>
                      <td colspan="3">
                        <textarea id="remark" name="remark" rows="2" style="width:100%;height:30px;"></textarea>
                      </td>
                    </tr>
                  </table>
                  </form>
		  	    </div>
				<div class="normal_con01" style="margin-bottom:10px">
				  <table id="masterGrid"></table>
				</div>
				<div class="easyui-tabs" data-options="fit:true,plain:true">
		    	  <div title="개별등록">
					<div class="normal_Button">
					  <a href="javascript:fn_saveAction();">품목등록</a>
					  <a href="javascript:fn_modifyAction();">품목수정</a>
					  <a href="javascript:fn_delAction();">품목삭제</a>
					  <a href="javascript:fn_newAction();">신규품목등록</a>
					  <a href="javascript:fn_saveExcelAction();">품목일괄등록</a>
					</div>
					<div class="hsnew_C02_table">
		  	          <form id="frm1" name="frm1">
		  	          <input type="hidden" id="itemKey" 	name="itemKey"/>
		  	          <input type="hidden" id="jajaeCode" 	name="jajaeCode"/>
		  	          <input type="hidden" id="mcountNo" 	name="mcountNo"/>
					  <table>
				   	    <col width="15%">
	                    <col width="35%">
	                    <col width="15%">
	                    <col width="35%">
	                    <tr>
	                      <td class="left">Item No.</td>
	                      <td>
	                        <input type="text" id="codeName" name="codeName" placeholder="품목/제품코드 접수번호 등, 없으면 영문명기입" style="width:100%;text-transform:uppercase;"/>
	                      </td>
	                      <td class="left">HS Code</td>
	                      <td>
	                        <input type="text" id="hsCode" name="hsCode" style="width:100%" onkeydown="return fn_onlyNumber(event)"/>
	                      </td>
	                    </tr>
	                    <tr>
	                      <td class="left">영문명</td>
	                      <td>
	                        <input type="text" id="engName" name="engName" style="width:90%;ime-mode:inactive;text-transform:uppercase;"/>
	                        <a href="javascript:fn_modelSearch()"><img src="../images/cps/hs_seach.png" id="ddealSearch"></a>
	                      </td>
	                      <td class="left">한글명</td>
	                      <td>
	                        <input type="text" id="korName" name="korName" style="width:100%;ime-mode:active"/>
	                      </td>
	                    </tr>
	                    <tr>
	                      <td class="left">원산지</td>
	                      <td>
	                        <input type="text" id="wonsanji" name="wonsanji" style="width:10%;ime-mode:active;text-transform:uppercase;"/>
	                      </td>
	                      <td class="left">식품/식/동/축/수산물</td>
	                      <td>
	                        <input type="text" id="category" name="category" style="width:100%;ime-mode:active"/>
	                      </td>
	                    </tr>
	                    <tr>
	                      <td class="left">수량</td>
	                      <td>
	                        <input type="text" id="su" name="su" style="width:30%;text-align:right"/>
	                      </td>
	                      <td class="left">순중량</td>
	                      <td>
	                        <input type="text" id="jung" name="jung" style="width:30%;text-align:right"/>
	                      </td>
	                    </tr>
	                    <tr>
	                      <td class="left">해외제조업소코드</td>
	                      <td>
	                        <input type="text" id="productCode" name="productCode" style="width:100%;text-transform:uppercase;"/>
	                      </td>
	                      <td class="left">해외제조업소</td>
	                      <td>
	                        <input type="text" id="productCom" name="productCom" style="width:100%;text-transform:uppercase;"/>
	                      </td>
	                    </tr>
	                    <tr>
	                      <td class="left">수출업소코드</td>
	                      <td>
	                        <input type="text" id="exportCode" name="exportCode" style="width:100%;text-transform:uppercase;"/>
	                      </td>
	                      <td class="left">수출업소</td>
	                      <td>
	                        <input type="text" id="exportCom" name="exportCom" style="width:100%;text-transform:uppercase;"/>
	                      </td>
	                    </tr>
	                    <tr>
	                      <td class="left">신고품목코드</td>
	                      <td>
	                        <input type="text" id="singoCode" name="singoCode" style="width:100%;text-transform:uppercase;"/>
	                      </td>
	                      <td class="left">신고품명</td>
	                      <td>
	                        <input type="text" id="singoName" name="singoName" style="width:100%;text-transform:uppercase;"/>
	                      </td>
	                    </tr>
	                    <tr>
	                      <td class="left">비고</td>
	                      <td colspan="3">
	                        <textarea id="memo" name="memo" rows="2" style="width:100%;height:30px;"></textarea>
	                      </td>
	                    </tr>
	                  </table>
	                  </form>
	                </div>
                  </div>
                  <div title="일괄등록">
                    <div class="normal_Button">
                      <a href="javascript:fn_sampleAction();">샘플 다운로드</a>
					</div>
					<div id="drop">Drag & Drop</div>
				      <select name="format" style="display:none">
					    <option value="json" selected> JSON</option>
					  </select>
					  <%--Use Web Workers: (when available) --%><input type="checkbox" name="useworker" style="display: none"/>
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
					                    xx = ab2str(e.data).replace(/\n/g, "\\n").replace(/\r/g, "\\r");
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
					    	$("#insertDiv").css("display",'');
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
				        		if (aabb[i].ItemNo != undefined){
					        		aabb[i].yogSaup 	= $("#insertForm #yogSaup").val();
					        		aabb[i].codeName 	= aabb[i].ItemNo;
					        		aabb[i].hsCode 		= aabb[i].HSCode;
					        		aabb[i].engName 	= aabb[i].영문명;
					        		aabb[i].korName 	= aabb[i].한글명;
					        		aabb[i].wonsanji 	= aabb[i].원산지;
					        		aabb[i].category 	= aabb[i].구분;
					        		aabb[i].su 			= aabb[i].수량;
					        		aabb[i].jung 		= aabb[i].순중량;
					        		aabb[i].productCode = aabb[i].해외제조업소코드;
					        		aabb[i].productCom 	= aabb[i].해외제조업소;
					        		aabb[i].exportCode 	= aabb[i].수출업소코드;
					        		aabb[i].exportCom 	= aabb[i].수출업소;
					        		aabb[i].singoCode 	= aabb[i].신고품목코드;
					        		aabb[i].singoName 	= aabb[i].신고품명;
					        		aabb[i].memo 		= aabb[i].비고;
					        		aacc.push(aabb[i]);
				                }
				        	}
				        	console.log(aacc);
				        	$('#detailGrid').datagrid('loadData', aacc);
				        	setTimeout(function(){
				        		fn_updateAction();
				        	},500);
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
					<div class="normal_con01" style="display:none">
			      	  <table id="detailGrid"></table>
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