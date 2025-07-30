<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
    <title>수입통관의뢰 등록</title>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/webjars/jquery/3.1.1/jquery.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/webjars/js-xlsx/0.8.0/shim.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/webjars/js-xlsx/0.8.0/dist/xlsx.full.min.js'/>"></script>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/cps/import/importRequestIns.js'/>"></script>
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
		    <div class="easyui-layout" style="width:550px;height:400px;">
		    <div data-options="region:'center'" style="box-sizing:border-box;border:0px;">
		  	  <div class="easyui-tabs" data-options="fit:true,plain:true">
		  	    <div title="Type 1" style="padding:10px;">
		  	      <div class="normal_Button">
				 	<a href="javascript:fn_saveAction('insert');">저장</a>
				 	<a href="javascript:window.close();">닫기</a>
				  </div>
		  	      <div class="hsnew_C02_table">
		  	        <form id="frm1" name="frm1">
	              	<input type="hidden" id="size" 						name="size" 					value="100000" />
			  		<input type="hidden" id="page" 						name="page" 					value="0" />
			  		<input type="hidden" id="_pageRow" 					name="_pageRow" 				value="100000" />
			  		<input type="hidden" id="_pageNumber" 				name="_pageNumber" 				value="0" />
			  		<input type="hidden" id="startGubun" 				name="startGubun" 				value="IMPORT"/>
			  		<input type="hidden" id="startJisaCode" 			name="startJisaCode" 			value="${sessionScope.DEFAULTDB}">
			  		<input type="hidden" id="startTaxpayerTradeName" 	name="startTaxpayerTradeName" 	value="${sessionScope.SANGHO}">
			  		<input type="hidden" id="startTaxpayerNum" 			name="startTaxpayerNum" 		value="${sessionScope.TAXNO}">
			  		<input type="hidden" id="startReferenceNo2" 		name="startReferenceNo2"/>
			  		<input type="hidden" id="startNote" 				name="startNote"/>
			  		<input type="hidden" id="startCompensationYn" 		name="startCompensationYn"/>
			  		<input type="hidden" id="startLocation" 			name="startLocation"/>
			  		<input type="hidden" id="useYn" 					name="useYn" 					value="Y"/>
	                <input type="hidden" id="addUserId" 				name="addUserId" 				value="${sessionScope.ID}"/>
	                <input type="hidden" id="addUserNm" 				name="addUserNm" 				value="${sessionScope.USERNAME}"/>
                    <table width="100%">
                      <col width="20%"/>
                      <col width="80%"/>
                      <tr height="23px">
                        <td class="left">B/L(HBL) <i></i></td>
                        <td>
                          <input type="text" id="startNum" name="startNum" 	style="width:50%;ime-mode:Inactive;"/>
                        </td>
                      </tr>
                      <tr height="23px">
                        <td class="left">PO No.</td>
                        <td>
                          <input type="text" id="startPoNo" name="startPoNo" 	style="width:50%;"/>
                        </td>
                      </tr>
                      <tr height="23px">
                        <td class="left">Ref No1</td>
                        <td>
                          <input type="text" id="startReferenceNo1" name="startReferenceNo1" 	style="width:100%;"/>
                        </td>
                      </tr>
                      <tr height="23px">
                        <td class="left">이슈사항</td>
                        <td>
                          <input type="text" id="startIssueContent" name="startIssueContent" 	style="width:100%;ime-mode:active;"/>
                        </td>
                      </tr>
                    </table>
                    </form>
                  </div>
		  	    </div>
		  	    <div title="Type 2" style="padding:10px;">
			      <div style="margin-bottom:7px;">
					 * 아래 샘플을 다운로드하여 일괄로 B/L No 기준으로 엑셀등록 합니다.
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

				    /*function to_csv(workbook) {
				        var result = [];
				        workbook.SheetNames.forEach(function (sheetName) {
				            var csv = X.utils.sheet_to_csv(workbook.Sheets[sheetName]);
				            if (csv.length > 0) {
				                result.push("SHEET: " + sheetName);
				                result.push("");
				                result.push(csv);
				            }
				        });
				        return result.join("\n");
				    }

				    function to_formulae(workbook) {
				        var result = [];
				        workbook.SheetNames.forEach(function (sheetName) {
				            var formulae = X.utils.get_formulae(workbook.Sheets[sheetName]);
				            if (formulae.length > 0) {
				                result.push("SHEET: " + sheetName);
				                result.push("");
				                result.push(formulae.join("\n"));
				            }
				        });
				        return result.join("\n");
				    }*/

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
				        var aabb = JSON.parse(output).Sheet1;
				        var aacc = new Array();

			        	for(var i = 0; i < aabb.length; i++){
			        		if (aabb[i].비엘번호 != undefined){
				        		aabb[i].startJisaCode 			= $("#startJisaCode").val();
				        		aabb[i].startTaxpayerTradeName 	= $("#startTaxpayerTradeName").val();
				        		aabb[i].startTaxpayerNum 		= $("#startTaxpayerNum").val();
				        		aabb[i].useYn 					= "Y";
				        		aabb[i].addUserId 				= $("#addUserId").val();
				        		aabb[i].startKey 				= "";
				        		aabb[i].startNum 				= aabb[i].비엘번호;
				        		aabb[i].startReferenceNo1 		= aabb[i].RefNo1;
				        		aabb[i].startReferenceNo2 		= aabb[i].RefNo2;
				        		aabb[i].startIssueContent 		= aabb[i].이슈사항;
				        		aabb[i].startPoNo 				= aabb[i].PO번호;
				        		aacc.push(aabb[i]);
			                }



			        		//var params 	= aabb[i],
							//	url 	= "../apis/import/saveImportStartInfo",
							//	type 	= "POST";

							//sendAjax(url, params, type, function(d){
							//});
			        	}
			        	console.log(aacc);
			        	$('#masterGrid').datagrid('loadData', aacc);
			        	//setTimeout(function(){
			        		//opener.refreshGrid();
							//window.close();
			        	//},1000);
				        //if (typeof console !== 'undefined') console.log("output", new Date());
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
				                //if (typeof console !== 'undefined') console.log("onload", new Date(), rABS, use_worker);
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
				      <a href="javascript:fn_updateAction();">저장</a>
				  	  <a href="javascript:delRowContacts();">라인삭제</a>
				  	  <a href="javascript:window.close();">닫기</a>
				    </div>
				  	<div class="normal_con01">
				      <table id="masterGrid"></table>
				  	</div>
		        </div>
		  	    <div title="Type 3" style="padding:10px;">
		  	      * B/L Info, Invoice Info, PackingList Info 정보를시스템적으로 연동(I/F)되도록 개발하여 활용<br>
  	      		  <img src="<c:url value='/images/common/interface.png'/>" style="margin-top:10px;margin-left:20px;height:300px">
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