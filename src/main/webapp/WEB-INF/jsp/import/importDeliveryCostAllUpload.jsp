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
	<script type="text/javascript" src="<c:url value='/js/cps/import/importDeliveryCostAllUpload.js'/>"></script>
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
		    <div class="easyui-layout" style="width:100%;height:600px;">
		    <div data-options="region:'center'" style="box-sizing:border-box;border:0px;">
		      <form id="frm1" name="frm1">
		      <div style="margin-bottom:7px;">화주 :
				 <input type="hidden" id="deliveryCostCustomerKey" name="deliveryCostCustomerKey" value=""/>
                 <input type="hidden" id="deliveryCostCustomerDb" name="deliveryCostCustomerDb"/>
                 <input type="hidden" id="deliveryCostCustomerCode" name="deliveryCostCustomerCode"/>
                 <select id="deliveryCostCustomerName" name="deliveryCostCustomerName" class="input-sm" onchange="fn_changedDeliveryCostCustomerName(this)"></select>
                 <input type="hidden" id="deliveryCostCustomerTaxNum" name="deliveryCostCustomerTaxNum"/>
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
		        		if (aabb[i].BL번호 != undefined){
			        		aabb[i].deliveryCostBlNum 			= aabb[i].BL번호;
			        		aabb[i].deliveryCostSingoNum 		= aabb[i].신고번호;
			        		aabb[i].deliveryCostCompleteDay 	= aabb[i].배송일;
			        		aabb[i].deliveryCostWarehouse 		= aabb[i].창고;
			        		aabb[i].deliveryCostCtQty 			= aabb[i].CT수량;
			        		aabb[i].deliveryCostCtUnit 			= aabb[i].CT단위;
			        		aabb[i].deliveryCostWeight 			= aabb[i].중량;
			        		aabb[i].deliveryCostTonnage 		= aabb[i].톤;
			        		aabb[i].deliveryCostCargoType 		= aabb[i].화물종류;
			        		aabb[i].deliveryCostStartName 		= aabb[i].출발지;
			        		aabb[i].deliveryCostEndName 		= aabb[i].도착지;
			        		aabb[i].deliveryCostDamageYn 		= aabb[i].데미지여부;
			        		aabb[i].deliveryCostDamageNote 		= aabb[i].데미지사항;
			        		aabb[i].deliveryCostSpecificNote 	= aabb[i].특이사항;
			        		aabb[i].deliveryCostShippingCharge 	= aabb[i].운송료;
			        		aabb[i].deliveryCostWarehouseChange = aabb[i].창고료;
			        		aabb[i].deliveryCostInsuranceCharge = aabb[i].보험료;
			        		aabb[i].deliveryCostPayforCharge 	= aabb[i].대납료;
			        		aabb[i].deliveryCostPayforName 		= aabb[i].대납업체;
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
				<div class="normal_Button">
			      <a href="javascript:fn_sampleDownAction();">샘플 다운로드</a>
			      <a href="javascript:fn_updateAction();">저장</a>
			  	  <a href="javascript:delRowContacts();">라인삭제</a>
			  	  <a href="javascript:window.close();">닫기</a>
			    </div>
			    <input type="hidden" id="USERGRADEB" 						name="USERGRADEB" 						value="${sessionScope.USERGRADEB}">
                <input type="hidden" id="deliveryCostCl" 					name="deliveryCostCl" 					value="IMPORT"/>
			    <input type="hidden" id="deliveryCostWriteUserKey" 			name="deliveryCostWriteUserKey" 		value="${sessionScope.ID}"/>
			    <input type="hidden" id="deliveryCostWriteUserId" 			name="deliveryCostWriteUserId" 			value="${sessionScope.ID}"/>
			    <input type="hidden" id="deliveryCostWriteUserName" 		name="deliveryCostWriteUserName" 		value="${sessionScope.USERNAME}"/>
			    <input type="hidden" id="deliveryCostWriteUserTradeName" 	name="deliveryCostWriteUserTradeName" 	value="${sessionScope.SANGHO}"/>
			    <input type="hidden" id="deliveryCostWriteUserTaxNum" 		name="deliveryCostWriteUserTaxNum" 		value="${sessionScope.TAXNO}"/>
			  	<div class="normal_con01">
			      <table id="masterGrid"></table>
			  	</div>
			  	</form>
  	      	  </div>
  	      	</div>
  	      </div>
  	      </div>
  	    </div>
	  </div>
	</div>
  </body>
</html>