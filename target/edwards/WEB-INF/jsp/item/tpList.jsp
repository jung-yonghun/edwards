<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.io.File"%>
<%@ page import="java.io.*"%>
<%@ page import="java.util.List"%>
<%@ page import="java.util.Iterator"%>
<%@ page import="org.apache.poi.ss.usermodel.Sheet"%>
<%@ page import="org.apache.poi.ss.usermodel.Row"%>
<%@ page import="org.apache.poi.ss.usermodel.Cell"%>
<%@ page import="org.apache.poi.ss.usermodel.Workbook"%>
<%@ page import="org.apache.poi.hssf.usermodel.HSSFWorkbook"%>
<%@ page import="org.apache.poi.xssf.usermodel.XSSFWorkbook"%>
<%@ page import="org.springframework.util.MultiValueMap"%>
<%@ page import="org.springframework.web.multipart.MultipartFile"%>
<%@ page import="org.springframework.web.multipart.MultipartHttpServletRequest"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
	<jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/webjars/jquery/3.1.1/jquery.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/webjars/js-xlsx/0.8.0/shim.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/webjars/js-xlsx/0.8.0/dist/xlsx.full.min.js'/>"></script>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-filter.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/item/tpList.js'/>"></script>
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
  <body style="overflow:hidden">
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="container">
		      <div class="easyui-layout" style="width:100%;height:775px;overflow:hidden;">
		        <div data-options="region:'center'" style="width:50%;box-sizing:border-box;border:0px">
		          <div class="normal_Top">
		            <input type="hidden" id="ID" 		name="ID" 			value="${sessionScope.ID}">
		            <input type="hidden" id="USERGRADE" name="USERGRADE" 	value="${sessionScope.USERGRADE}">
		            <form id="frm1" name="frm1" method="post" action="../apis/master/selectItemTpInfoExcelExport">
                    <input type="hidden" id="mcoCom" name="mcoCom" 	value="${sessionScope.TAXNO}"/>
                    <table width="100%">
                      <col width="100%"/>
                      <tr height="23px">
                        <td>
                          <select id="_DateType" name="_DateType" style="width:80px">
				  			<option value="Mreg_date" >등록일자</option>
				  			<option value="Mconfirm_date">확정일자</option>
			    		  </select>
			    		  <input type="text" id="strFromDate" name="strFromDate"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />~
					      <input type="text" id="strToDate" 	name="strToDate"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8" />
					      <a href="javascript:fn_searchExcel();" class="easyui-linkbutton" style="margin-top:-5px">Excel Download</a>
                        </td>
                      </tr>
                    </table>
                    </form>
                  </div>
			      <div id="drop">Drag & Drop</div>
			      <select name="format" style="display:none">
				    <option value="json" selected> JSON</option>
				  </select>
				  <input type="checkbox" name="useworker" style="display:none"/>
				  <input type="checkbox" name="xferable" checked style="display:none"/>
				  <input type="checkbox" name="userabs" checked style="display:none"/>
			      <script>
				    var X = XLSX;
				    var XW = {
				        msg: 'xlsx',
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
                        var output = "";
                        switch (get_radio_value("format")) {
                            case "json":
                                output = JSON.stringify(to_json(wb), 2, 2);
                                break;
                            default:
                                output = JSON.stringify(to_json(wb), 2, 2);
                        }
                        var ccc = output.split("{");
                        var xxx = ccc[1].split(":");
                        var yyy = xxx[0].replace(/"/gi, "").replace(/ /gi, "").replace(/\n/gi, "");
                        var ooo = output.replace(yyy, "Sheet1");
                        var aabb = JSON.parse(ooo).Sheet1;
                        var aacc = new Array();

                        for (var i = 0; i < aabb.length; i++) {
                            if (aabb[i].자재코드 != undefined) {
                                aabb[i].Mco_com = aabb[i].사업자번호;
                                aabb[i].Mmodel_code = aabb[i].자재코드;
                                aabb[i].Munitprice = aabb[i].단가;

                                aacc.push(aabb[i]);
                            }
                        }
                        console.log(aacc);
                        $('#masterGrid').datagrid('loadData', aacc);
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
				  <div class="normal_Top">
		            <form id="frm3" name="frm3" method="post">
	  	  	   		변경사유 <input type="text" id="amd_txt1" name="amdTxt1" style="width:80%"/>
	  	  	   		<a href="javascript:fn_saveAction('Update');" class="easyui-linkbutton" style="margin-top:-5px">Update</a>
	  	  	  		</form>
                  </div><br>
				  <div class="normal_con01">
				    <table id="masterGrid"></table>
				  </div>
	    		</div>
			  	<div data-options="region:'east',split:true" style="width:50%;box-sizing:border-box;border:0px">
			  	  <div id="p" class="easyui-panel" title="작업방법" style="width:100%;height:182px;padding:10px;">
	        		1. TP 가격 정리를 위한 Item master 자료를 다운받아 자재코드 기준으로 관리번호를 vLookup하여 정리 (셀순서 : 관리번호,자재코드,TP단가)<br><br>
		            2. 엑셀파일을 열어 값을 불러온다. validation check 수행<br><br>
		            3. TP단가 변경 사유 입력<br><br>
		            4. Update 실행. progress 및 result 표시
	    		  </div><br>
	    		  <div class="normal_con01">
				    <table id="subGrid"></table>
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