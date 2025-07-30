<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<link type="text/css" rel="stylesheet" href="<c:url value='/css/lib/jexcel/jexcel.css'/>"/>
	<link type="text/css" rel="stylesheet" href="<c:url value='/css/lib/jexcel/jsuites.css'/>"/>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/jexcel/jexcel.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/jexcel/jsuites.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-bufferview.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/easyui/datagrid-filter.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/cps/edwards/exemExecMaster.js?20231227'/>"></script>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="container">
			  <div class="easyui-layout" style="width:100%;height:735px">
			    <div data-options="region:'north',split:true" style="width:100%;height:335px;box-sizing:border-box;border:0px">
			    <div class="easyui-layout" style="width:100%;height:330px">
			  	<div data-options="region:'east',split:true" style="width:40%;box-sizing:border-box;border:0px;padding-top:32px;margin-top:32px;">
			  	  <div class="easyui-tabs" id="tabs" data-options="fit:true,plain:true">
			  	  <input type="hidden" id="taxNum" 	name="taxNum" 		value="${sessionScope.TAXNO}">
		    	    <div title="일반등록">
		    	      <div class="normal_Button" style="margin-left:15px">
					      <a href="javascript:fn_newAction();">신규</a>
					      <a href="javascript:fn_updateAction();">저장</a>
					  </div>
		    	      <div class="hsnew_C02_table" style="margin-top:-10px">
		      	  	  <form id="addForm" name="addForm">
				  	  <input type="hidden" id="ID" 						name="ID" 				value="${sessionScope.ID}">
				  	  <input type="hidden" id="KEY_ED_EXEM_EXEC_MST" 	name="KEY_ED_EXEM_EXEC_MST">
				  	  <input type="hidden" id="EXEM_EXEC_MNG_NO" 		name="EXEM_EXEC_MNG_NO">
			  		  <table>
		   	    	  	<col width="20%"/>
                      	<col width="80%"/>
                      	<col width="23%"/>
                      	<tr>
                          <td class="left">사업부</td>
                          <td><select id="OWN_GODS_NM" name="OWN_GODS_NM" style="width:180px" onchange="fn_changeDiv(this)"></select>
                            <input type="text" id="OWN_GODS_CD" name="OWN_GODS_CD"/>
                            <input type="hidden" id="GRP_COMP_CD" name="GRP_COMP_CD"/>
                          </td>
                      	</tr>
                      	<tr>
                          <td class="left">작업명</td>
                          <td><input type="text" id="JOB_NM" name="JOB_NM" style="width:100%;"/></td>
                      	</tr>
                      	<tr>
                          <td class="left">시작일/종료일</td>
                          <td>
                            <input type="text" id="STRT_DT" name="STRT_DT" style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/>
                            <input type="text" id="END_DT"  name="END_DT"  style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/>
                          </td>
                      	</tr>
                      	<tr>
                          <td class="left">BOM적용계산</td>
                          <td>
                            <select id="BOM_APLY_FG" name="BOM_APLY_FG" style="width:40px;">
                              <option value="Y">Y</option>
                              <option value="N">N</option>
                            </select>
                          </td>
                      	</tr>
                      	<tr>
                          <td class="left">비고</td>
                          <td><input type="text" id="RMRK" name="RMRK" style="width:100%;"/></td>
                      	</tr>
                      	<tr>
                          <td class="left">진행상태</td>
                          <td>
                            <select id="PROC_STAT" name="PROC_STAT" style="width:70px;">
                              <option value="07002">종료</option>
                            </select>
                          </td>
                      	</tr>
                      </table>
                      </form>
	                  </div>
		    	    </div>
		  	      </div>
			  	</div>
		      	<div data-options="region:'center'" style="width:60%;box-sizing:border-box;border:0px">
				  <div class="normal_Top">
				  	<table width="100%">
				  	  <col width="10%" />
				  	  <col width="29%" />
				  	  <col width="02%" />
				  	  <col width="10%" />
				  	  <col width="22%" />
				  	  <col width="02%" />
				  	  <col width="10%" />
				  	  <col width="15%" />
					  <tr height="23px">
					    <td>
					  	  <select id="NOCHK" name="NOCHK" style="width:80px;">
                            <option value="NM">작업명</option>
                            <option value="COM">사업부</option>
                          </select>
					  	</td>
					  	<td><input type="text" id="NODATA" name="NODATA" onkeypress="keyDown()"/></td>
					  	<td></td>
					  	<td>시작일자</td>
					  	<td><input type="text" id="STRT_DT1" name="STRT_DT1" onkeypress="keyDown()" style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/></td>
					  	<td></td>
					  	<td>진행상태</td>
					  	<td>
                            <select id="PROC_STAT1" name="PROC_STAT1" style="width:80px;">
                              <option value="07002">종료</option>
                            </select>
					  	</td>
					  </tr>
				  	</table>
				  </div>
				  <div class="normal_Button">
				  	<a href="javascript:fn_searchAction();">조회</a>
				  	<!-- a href="javascript:fn_deleteAction();">삭제</a-->
				  	<a href="javascript:fn_searchExcel();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
				  </div>
				  <div class="normal_con01">
				  	<table id="masterGrid"></table>
				  </div>
				  <div class="normal_con01" style="display:none">
				  	<table id="excelGrid"></table>
				  </div>
			  	</div>
			  	</div>
			  	</div>
			  	<div data-options="region:'center',split:true" style="width:100%;box-sizing:border-box;border:0px">
			  	<div class="easyui-tabs" id="tabs" data-options="fit:true,plain:true" style="height:360px;">
		    	  <div title="감면수입용도이행정보" style="padding-left:10px;padding-right:10px">
				    <div class="easyui-layout" style="width:100%;height:350px">
				  	<div data-options="region:'east',split:true" style="width:40%;box-sizing:border-box;border:0px;padding-top:3px;margin-top:3px;">
				  	  <font color="red" style="margin-left:10px;"># 붙여넣기 시 따옴표나 쌍따옴표는 제거 후 붙여 넣으세요.</font>
				  	  <div id="spreadsheet" style="margin-left:10px;margin-top:18px"></div>
				  	  <form id="addForm1" name="addForm1">
				  	  <input type="hidden" id="ID" 						name="ID" 				value="${sessionScope.ID}">
				  	  <input type="hidden" id="KEY_ED_EXEM_EXEC_PROD" 	name="KEY_ED_EXEM_EXEC_PROD">
				  	  <input type="hidden" id="EXEM_EXEC_MNG_NO" 		name="EXEM_EXEC_MNG_NO">
				  	  <input type="hidden" id="PROD_SEQNO" 				name="PROD_SEQNO">
				  	  <input type="hidden" id="GRP_COMP_CD" 			name="GRP_COMP_CD">
					  </form>
				  	  <!-- div class="easyui-tabs" id="tabs" data-options="fit:true,plain:true" style="height:200px;padding-top:10px">
			    	    <div title="일반등록">
			    	      <div class="normal_Button" style="margin-left:15px">
						      <a href="javascript:fn_newAction1();">신규</a>
						      <a href="javascript:fn_updateAction1();">저장</a>
						  </div>
			    	      <div class="hsnew_C02_table" style="margin-top:-10px">
			      	  	  <form id="addForm1" name="addForm1">
					  	  <input type="hidden" id="ID" 						name="ID" 				value="${sessionScope.ID}">
					  	  <input type="hidden" id="KEY_ED_EXEM_EXEC_PROD" 	name="KEY_ED_EXEM_EXEC_PROD">
					  	  <input type="hidden" id="EXEM_EXEC_MNG_NO" 		name="EXEM_EXEC_MNG_NO">
					  	  <input type="hidden" id="PROD_SEQNO" 				name="PROD_SEQNO">
					  	  <input type="hidden" id="GRP_COMP_CD" 			name="GRP_COMP_CD">
				  		  <table>
			   	    	  	<col width="20%"/>
	                      	<col width="80%"/>
	                      	<col width="23%"/>
	                      	<tr>
	                          <td class="left">용도이행일자</td>
	                          <td><input type="text" id="EXEC_DT" name="EXEC_DT" style="width:70px;cursor:pointer;text-align:center;" maxlength="8"/></td>
	                      	</tr>
			      		  	<tr>
	                          <td class="left">아이템코드</td>
	                          <td>
	                            <input type="text" id="PROD_CD" name="PROD_CD" style="width:200px;"/>
	                            <a href="javascript:fn_jajaeSearch()"><img src="../images/cps/hs_seach.png" id="ddealSearch">
	                          </td>
	                      	</tr>
	                      	<tr>
	                          <td class="left">아이템명</td>
	                          <td><input type="text" id="PROD_NM" name="PROD_NM" style="width:100%;"/></td>
	                      	</tr>
	                      	<tr>
	                          <td class="left">수량</td>
	                          <td><input type="text" id="QTY" name="QTY" style="width:50px;"/></td>
	                      	</tr>
	                      	<tr>
	                          <td class="left">BOM Revision번호</td>
	                          <td><input type="text" id="BOM_REVSN_NO" name="BOM_REVSN_NO" style="width:50px;"/></td>
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
						        var aabb = JSON.parse(output).execMasterCode;
						        var aacc = new Array();

					        	for(var i = 0; i < aabb.length; i++){
					        		aabb[i].EXEC_DT 		= aabb[i].용도이행일자;
					        		aabb[i].PROD_CD 		= aabb[i].아이템코드;
					        		aabb[i].PROD_NM 		= aabb[i].아이템명;
					        		aabb[i].QTY 			= aabb[i].수량;
					        		aabb[i].BOM_REVSN_NO 	= aabb[i].BOM번호;
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
						  	  <a href="javascript:delRowAllContacts1();">라인전체삭제</a>
						    </div>
						  	<div class="normal_con01">
						      <table id="masterGrid1"></table>
						  	</div>
			    	    </div>
			  	      </div-->
				  	</div>
			      	<div data-options="region:'center'" style="width:60%;box-sizing:border-box;border:0px">
					  <div class="normal_Button" style="margin-left:0px">
					  	<a href="javascript:fn_searchExcel1();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
					  </div>
					  <div class="normal_con01">
					  	<table id="detailGrid"></table>
					  </div>
					  <div class="normal_con01" style="display:none">
					  	<table id="excelGrid1"></table>
					  </div>
				  	</div>
				  	</div>
				  </div>
				  <div title="자재정보">
				    <div class="easyui-layout" style="width:100%;height:350px">
				  	<div data-options="region:'east',split:true" style="width:40%;box-sizing:border-box;border:0px">
					  <div class="normal_Button">
						<a href="javascript:fn_searchExcel3();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
					  </div>
					  <div class="normal_con01">
					    <table id="detailGrid3"></table>
					  </div>
					  <div class="normal_con01" style="display:none">
					  	<table id="excelGrid3"></table>
					  </div>
				  	</div>
			      	<div data-options="region:'center'" style="width:60%;box-sizing:border-box;border:0px">
					  <div class="normal_Button">
					  	<a href="javascript:fn_searchExcel2();"><img src="<c:url value='/images/cps/normal_docu.png'/>"></a>
					  </div>
					  <div class="normal_con01">
					  	<table id="detailGrid2"></table>
					  </div>
					  <div class="normal_con01" style="display:none">
					  	<table id="excelGrid2"></table>
					  </div>
					  <%@ include file="/WEB-INF/jsp/include/excelDown.jsp" %>
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