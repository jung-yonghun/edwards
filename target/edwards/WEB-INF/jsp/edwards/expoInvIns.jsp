<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
    <title>Invoice 등록</title>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/webjars/jquery/3.1.1/jquery.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/webjars/js-xlsx/0.8.0/shim.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/webjars/js-xlsx/0.8.0/dist/xlsx.full.min.js'/>"></script>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/cps/edwards/expoInvIns.js?20231227'/>"></script>
	<style>
        #drop {
            border: 2px dashed #bbb;
            -moz-border-radius: 5px;
            -webkit-border-radius: 5px;
            border-radius: 5px;
            padding: 5px;
            text-align: center;
            font: 20pt bold, "Vollkorn";
            color: #bbb
        }

        #drop1 {
            border: 2px dashed #bbb;
            -moz-border-radius: 5px;
            -webkit-border-radius: 5px;
            border-radius: 5px;
            padding: 5px;
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
		    <div class="easyui-layout" style="width:700px;height:320px;">
		      <div data-options="region:'center'" style="box-sizing:border-box;border:0px;">
		      <div class="easyui-tabs" id="tabs" data-options="fit:true,plain:true">
		    	<div title="일반등록">
				<div class="normal_Button">
				  <a href="javascript:fn_saveAction();">저장</a>
				  <a href="javascript:window.close();">닫기</a>
				</div>
				<div class="hsnew_C02_table">
	  	          <form id="frm1" name="frm1">
	  	          <input type="hidden" id="ID" 					name="ID" 					value="${sessionScope.ID}">
				  <input type="hidden" id="USERID" 				name="USERID" 				value="${sessionScope.USERID}">
				  <input type="hidden" id="KEY_ED_EXPT_INV" 	name="KEY_ED_EXPT_INV" 		value="${param.KEY_ED_EXPT_INV}">
				  <input type="hidden" id="EXPT_ORDR_MNG_NO" 	name="EXPT_ORDR_MNG_NO" 	value="${param.EXPT_ORDR_MNG_NO}">
				  <input type="hidden" id="ORIG_PACT" 			name="ORIG_PACT" 			value="${param.EX_FTA_CD}">
				  <input type="hidden" id="defaultDB" 			name="defaultDB"			value="ncustoms_ca">
				  <input type="hidden" id="saup" 				name="saup" 				value="3128112960">
				  <input type="hidden" id="McountNo" 			name="McountNo"				value="">
				  <input type="hidden" id="PROD_NM" 			name="PROD_NM"				value="">
				  <input type="hidden" id="GRP_COMP_CD" 		name="GRP_COMP_CD"			value="">
				  <input type="hidden" id="EXPT_INV_SEQNO" 		name="EXPT_INV_SEQNO">
				  <input type="hidden" id="useYn" 				name="useYn"				value="Y">
				  <table>
			   	    <col width="12%">
                    <col width="38%">
                    <col width="12%">
                    <col width="38%">
                    <tr>
                      <td class="left"><font color='red'>*</font> Item 코드</td>
                      <td>
                        <input type="text" id="PROD_CD" name="PROD_CD" style="width:80%" readOnly/>
                        <a href="javascript:fn_jajaeSearch()"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                      </td>
                      <td class="left">상태</td>
                      <td>
                        <input type="text" id="STAT"  name="STAT" style="width:30px" value="HS" readOnly/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">규격2</td>
                      <td>
                        <input type="text" id="Expum_pum_b" name="Expum_pum_b" 	style="width:100%"/>
                      </td>
                      <td class="left">규격3</td>
                      <td>
                        <input type="text" id="Expum_pum_c" name="Expum_pum_c"  style="width:100%"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">개별</td>
                      <td>
                        <input type="text" id="INDV_REFN_FG" name="INDV_REFN_FG" style="width:20px" readOnly/>
                        <a href="javascript:fn_searchSys('INDV_DRWB_TPCD')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                      </td>
                      <td class="left">원상태</td>
                      <td>
                        <input type="text" id="ORIG_STAT_OBJ_FG" name="ORIG_STAT_OBJ_FG" style="width:20px" readOnly/>
                        <a href="javascript:fn_searchSys('ORST_EXP_TPCD')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                        <input type="text" id="ORIG_STAT_OBJ" name="ORIG_STAT_OBJ" style="width:30%" readOnly/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">Serial No</td>
                      <td>
                        <input type="text" id="SERIAL_NO" name="SERIAL_NO" style="width:50%"/>
                      </td>
                      <td class="left"><font color='red'>*</font> Inv No</td>
                      <td>
                        <input type="text" id="INV_NO" name="INV_NO" style="width:50%" value="${param.INV_NO}"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left"><font color='red'>*</font> 수량</td>
                      <td>
                        <input type="text" id="QTY" name="QTY" style="width:20%;text-align:right" onkeydown="return fn_onlyNumberSu(this,event)"/>
                        <input type="text" id="QTY_UNIT" name="QTY_UNIT" style="width:20px" readOnly/>
                        <a href="javascript:fn_searchSys('MODEL_QTY_UT_CD2')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                      </td>
                      <td class="left"><font color='red'>*</font> 단가-금액</td>
                      <td>
                        <input type="text" id="AMT_PRICE" name="AMT_PRICE" style="width:30%;text-align:right" onkeydown="return fn_onlyNumberSu(this,event)"/>
                        <input type="text" id="AMT" name="AMT" style="width:30%;text-align:right"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">지정 수량</td>
                      <td>
                        <input type="text" id="ORIG_STAT_QTY" name="ORIG_STAT_QTY" style="width:20%;text-align:right"/>
                      </td>
                      <td class="left">미지정 수량</td>
                      <td>
                        <input type="text" id="NOT_ORIG_STAT_QTY" name="NOT_ORIG_STAT_QTY" style="width:20%;text-align:right"/>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">HS코드</td>
                      <td>
                        <input type="text" id="HS_CD" name="HS_CD" style="width:30%"/>
                      </td>
                      <td class="left"><font color='red'>*</font> 원산지</td>
                      <td>
                        <input type="text" id="ORIG" name="ORIG" style="width:30px"/>
                        <a href="javascript:fn_searchSys('CNTY_CD5')"><img src="../images/cps/hs_seach.png" id="hsSearch"></a>
                      </td>
                    </tr>
                    <tr>
                      <td class="left">면제번호</td>
                      <td>
                        <input type="text" id="ExEmNo" name="ExEmNo" style="width:50%"/>
                      </td>
                      <td class="left">요건사유</td>
                      <td>
                        <input type="text" id="ETC_RSN" name="ETC_RSN" style="width:50%"/>
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
					        var aabb = JSON.parse(output).hsGroupMaster;
					        var aacc = new Array();

				        	for(var i = 0; i < aabb.length; i++){
				        		aabb[i].PROD_CD 			= aabb[i].Item코드;
				        		aabb[i].INV_NO 				= aabb[i].InvNo;
				        		aabb[i].QTY 				= aabb[i].수량;
				        		aabb[i].AMT_PRICE 			= aabb[i].단가;
				        		aabb[i].AMT 				= aabb[i].금액;
				        		aabb[i].ORIG 				= aabb[i].원산지;
				        		aabb[i].STAT 				= aabb[i].상태;
				        		aabb[i].Expum_pum_b 		= aabb[i].규격2;
				        		aabb[i].Expum_pum_c 		= aabb[i].규격3;
				        		aabb[i].INDV_REFN_FG 		= aabb[i].개별;
				        		aabb[i].ORIG_STAT_OBJ_FG 	= aabb[i].원상태;
				        		aabb[i].SERIAL_NO 			= aabb[i].Serial;
				        		aabb[i].ORIG_STAT_QTY 		= aabb[i].지정수량;
				        		aabb[i].NOT_ORIG_STAT_QTY 	= aabb[i].미지정수량;
				        		aabb[i].HS_CD 				= aabb[i].HS코드;
				        		aabb[i].ExEmNo 				= aabb[i].면제번호;
				        		aabb[i].ETC_RSN 				= aabb[i].요건사유;
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
  	      	</div>
  	      </div>
  	    </div>
	  </div>
	</div>
  </body>
</html>