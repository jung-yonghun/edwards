<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/webjars/jquery/3.1.1/jquery.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/webjars/js-xlsx/0.8.0/shim.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/webjars/js-xlsx/0.8.0/dist/xlsx.full.min.js'/>"></script>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-bufferview.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-filter.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/edwards/modelMaster.js?20231227'/>"></script>
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
		    <div class="container">
			  <div class="easyui-layout" style="width:100%;height:708px">
			  	<div data-options="region:'east',split:true" style="width:40%;box-sizing:border-box;border:0px;padding-top:32px;margin-top:32px;">
			  	  <div class="easyui-tabs" id="tabs" data-options="fit:true,plain:true">
		    	    <div title="일반등록">
		    	      <div class="normal_Button" style="margin-left:15px">
					      <a href="javascript:fn_newAction();">신규</a>
					      <a href="javascript:fn_updateAction();">저장</a>
					  </div>
		    	      <div class="hsnew_C02_table" style="margin-top:-10px">
		      	  	  <form id="addForm" name="addForm">
				  	  <input type="hidden" id="ID" 				name="ID" 				value="${sessionScope.ID}">
				  	  <input type="hidden" id="KEY_ED_MDL_MST" 	name="KEY_ED_MDL_MST">
			  		  <table>
		   	    	  	<col width="20%"/>
                      	<col width="80%"/>
                      	<col width="23%"/>
		      		  	<tr>
                          <td class="left">모델코드</td>
                          <td><input type="text" id="MDL_CD" name="MDL_CD" style="width:100px"/></td>
                      	</tr>
                      	<tr>
                          <td class="left">모델명</td>
                          <td><input type="text" id="MDL_NM" name="MDL_NM" style="width:100px"/></td>
                      	</tr>
                      	<tr>
                          <td class="left">비고</td>
                          <td><input type="text" id="RMRK" name="RMRK" style="width:100%;"/></td>
                      	</tr>
                      	<tr>
                          <td class="left">사용여부</td>
                          <td>
                            <select id="USE_FG" name="USE_FG" style="width:50px;">
                              <option value="Y">Y</option>
                              <option value="N">N</option>
                            </select>
                          </td>
                      	</tr>
                      </table>
                      </form>
	                  </div>
		    	    </div>
		    	    <div title="엑셀등록" style="padding:10px">
		    	      <div style="margin-bottom:7px;">
						 * 아래로 샘플 다운로드 후 수정 후 이 곳으로 드래그앤 드롭을 하시고 저장을 누르면 일괄등록 됩니다.
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
					            //case "form":
					            //    output = to_formulae(wb);
					            //    break;
					            default:
					                //output = to_csv(wb);
					            	output = JSON.stringify(to_json(wb), 2, 2);
					        }
					        var aabb = JSON.parse(output).modelMaster;
					        var aacc = new Array();

				        	for(var i = 0; i < aabb.length; i++){
				        		aabb[i].MDL_CD 	= aabb[i].코드;
				        		aabb[i].MDL_NM 	= aabb[i].모델명;
				        		aabb[i].RMRK 	= aabb[i].비고;
				        		aabb[i].USE_FG 	= aabb[i].사용여부;
				        		aacc.push(aabb[i]);
				        	}
				        	console.log(aacc);
				        	$('#masterGrid1').datagrid('loadData', aacc);
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
						<div class="normal_Button">
						  <a href="javascript:fn_sampleAction();">샘플 다운로드</a>
					      <a href="javascript:fn_insertAllAction();">저장</a>
					  	  <a href="javascript:delRowContacts();">라인삭제</a>
					    </div>
					  	<div class="normal_con01">
					      <table id="masterGrid1"></table>
					  	</div>
		    	    </div>
		  	      </div>
			  	</div>
		      	<div data-options="region:'center'" style="width:60%;box-sizing:border-box;border:0px">
				  <div class="normal_Top">
				  	<table width="100%">
				  	  <col width="15%" />
				  	  <col width="85%" />
					  <tr height="23px">
					  	<td>모델명</td>
					  	<td><input type="text" id="MDL_NM1" name="MDL_NM1" onkeypress="keyDown()"/></td>
					  </tr>
				  	</table>
				  </div>
				  <div class="normal_Button">
				  	<a href="javascript:fn_searchAction();">조회</a>
				  	<a href="javascript:fn_deleteAction();">삭제</a>
				  	<a href="javascript:fn_searchExcel();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
				  </div>
				  <div class="normal_con01">
				  	<table id="masterGrid"></table>
				  </div>
				  <div class="normal_con01" style="display:none">
				  	<table id="excelGrid"></table>
				  </div>
				  <%@ include file="/WEB-INF/jsp/include/excelDown.jsp" %>
			  	</div>
		      </div>
			</div>
		  </div>
		</div>
	  </div>
	</div>
  </body>
</html>