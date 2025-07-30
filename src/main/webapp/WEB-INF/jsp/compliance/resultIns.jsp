<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
    <title>요건결과 등록</title>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/lib/webjars/jquery/3.1.1/jquery.min.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/webjars/js-xlsx/0.8.0/shim.js'/>"></script>
	<script type="text/javascript" src="<c:url value='/js/lib/webjars/js-xlsx/0.8.0/dist/xlsx.full.min.js'/>"></script>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/cps/compliance/resultIns.js'/>"></script>
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
		    <div class="easyui-layout" style="width:900px;height:600px;">
		    <div data-options="region:'center'" style="box-sizing:border-box;border:0px;">
		      <div style="margin-bottom:7px;">
				 <font color="blue">* 요건결과 엑셀파일을 아래 Drag & Drop 공간에 넣으세요.</font>
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

			    var to_csv = function to_csv(workbook) {
					var result = [];
					var i = 0;
					workbook.SheetNames.every(function(sheetName) {
						var csv = X.utils.sheet_to_csv(workbook.Sheets[sheetName]);
						if(csv.length){
							result.push(csv);
						}
						i++;
						if(i==1){
							return false;
						}
					});
					return result.join("\n");
				};

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

			    function csvJSON(csv){
			    	  var lines=csv.split("\n");
			    	  var result = [];
			    	  var headers=lines[0].split("^");
			    	  for(var i=1;i<lines.length;i++){
			    		  var obj = {};
			    		  var currentline=lines[i].split("^");

			    		  for(var j=0;j<headers.length;j++){
			    			  obj[headers[j]] = currentline[j];
			    		  }

			    		  result.push(obj);
			    	  }
			    	  return JSON.stringify(result); //JSON
			    }

			    function process_wb(wb) {
			    	$("#insertDiv").css("display",'');
			        var output = "";
			        switch (get_radio_value("format")) {
			            case "json":
			                //output = JSON.stringify(to_csv(wb));
			                output = csvJSON(to_csv(wb));
			                break;
			            default:
			            	//output = JSON.stringify(to_csv(wb));
			            	output = csvJSON(to_csv(wb));
			        }
			        var aabb = JSON.parse(output);
			        console.log(aabb);
			        var aacc = new Array();
			        var check = "";
					for(var j = 0; j < Object.keys(aabb).length-1; j++){
						var aaee = aabb[Object.keys(aabb)[j]]

						if(Object.keys(aaee)[0]=="서식명"){
							check = "unipass";
							aaee.DocuGbn 		= aaee[Object.keys(aaee)[0]];
							aaee.SendNo 		= aaee[Object.keys(aaee)[1]];
							aaee.ApplyNo 		= aaee[Object.keys(aaee)[2]];
							aaee.IssueNo 		= aaee[Object.keys(aaee)[3]];
							aaee.ItemCode 		= aaee[Object.keys(aaee)[4]];
							aaee.ItemNm 		= aaee[Object.keys(aaee)[5]];
							aaee.BlNo 			= aaee[Object.keys(aaee)[6]];
							aaee.MrnNo 			= aaee[Object.keys(aaee)[7]];
							aaee.ComSangho 		= aaee[Object.keys(aaee)[8]];
							aaee.IssueDtm 		= aaee[Object.keys(aaee)[9]];
							aaee.ProcessDtm 	= aaee[Object.keys(aaee)[10]];
							aaee.SenderSangho 	= aaee[Object.keys(aaee)[11]];
							aaee.Status 		= aaee[Object.keys(aaee)[12]];
							aacc.push(aaee);
						}else if(Object.keys(aaee)[0]=="전송관리번호" && Object.keys(aaee)[4]=="위탁자상호"){
							check = "medihwaM";
							aaee.SendNo 		= (Object.keys(aaee)[0]=="전송관리번호") ? aaee[Object.keys(aaee)[0]] : "";
							aaee.ApplyNo 		= (Object.keys(aaee)[1]=="작성관리번호") ? aaee[Object.keys(aaee)[1]] : "";
							aaee.IssueNo 		= (Object.keys(aaee)[2]=="발급번호") ? aaee[Object.keys(aaee)[2]] : "";
							aaee.IssueDtm 		= (Object.keys(aaee)[3]=="발급일자") ? aaee[Object.keys(aaee)[3]] : "";
							aaee.ComSangho 		= (Object.keys(aaee)[4]=="위탁자상호") ? aaee[Object.keys(aaee)[4]] : "";
							aaee.SenderSangho	= (Object.keys(aaee)[5]=="송화인상호") ? aaee[Object.keys(aaee)[5]] : "";
							aaee.Su 			= (Object.keys(aaee)[6]=="총수량") ? aaee[Object.keys(aaee)[6]] : "";
							aaee.Price 			= (Object.keys(aaee)[7]=="총금액") ? aaee[Object.keys(aaee)[7]] : "";
							aaee.PriceDanwi		= (Object.keys(aaee)[8]=="총금액단위") ? aaee[Object.keys(aaee)[8]] : "";
							aaee.PaymentUsd		= (Object.keys(aaee)[9]=="환산결제총금액(USD)") ? aaee[Object.keys(aaee)[9]] : "";
							aaee.PaymentKrw 	= (Object.keys(aaee)[10]=="환산결제총금액(KRW)") ? aaee[Object.keys(aaee)[10]] : "";
							aaee.TotalUsd	 	= (Object.keys(aaee)[11]=="환산총금액(USD)") ? aaee[Object.keys(aaee)[11]] : "";
							aaee.TotalKrw 		= (Object.keys(aaee)[12]=="환산총금액(KRW)") ? aaee[Object.keys(aaee)[12]] : "";
							aaee.InvNo	 		= (Object.keys(aaee)[13]=="INVOICE NO") ? aaee[Object.keys(aaee)[13]] : "";
							aaee.BlNo	 		= (Object.keys(aaee)[14]=="B/L NO") ? aaee[Object.keys(aaee)[14]] : "";
							aaee.DocuGbn 		= "표준통관예정보고승인서 (화장품)";
							aacc.push(aaee);
						}else if(Object.keys(aaee)[0]=="전송관리번호" && Object.keys(aaee)[4]=="품목코드"){
							check = "medihwaD";
							aaee.SendNo 		= aaee[Object.keys(aaee)[0]];
							aaee.ApplyNo 		= aaee[Object.keys(aaee)[1]];
							aaee.IssueNo 		= aaee[Object.keys(aaee)[2]];
							aaee.IssueDtm 		= aaee[Object.keys(aaee)[3]];
							aaee.ItemCode 		= aaee[Object.keys(aaee)[4]];
							aaee.IdentiCode		= aaee[Object.keys(aaee)[5]];
							aaee.ItemNm			= aaee[Object.keys(aaee)[6]];
							aaee.ComSangho		= aaee[Object.keys(aaee)[7]];
							aaee.Etc02			= aaee[Object.keys(aaee)[8]];
							aaee.Etc19			= aaee[Object.keys(aaee)[9]];
							aaee.Etc18		 	= aaee[Object.keys(aaee)[10]];
							aaee.Standard	 	= aaee[Object.keys(aaee)[11]];
							aaee.Su		 		= aaee[Object.keys(aaee)[12]];
							aaee.SuDanwi 		= aaee[Object.keys(aaee)[13]];
							aaee.Danga	 		= aaee[Object.keys(aaee)[14]];
							aaee.Price	 		= aaee[Object.keys(aaee)[15]];
							aaee.PriceDanwi		= aaee[Object.keys(aaee)[16]];
							aaee.TotalUsd 		= aaee[Object.keys(aaee)[17]];
							aaee.TotalKrw 		= aaee[Object.keys(aaee)[18]];
							aaee.InvNo	 		= aaee[Object.keys(aaee)[19]];
							aaee.BlNo	 		= aaee[Object.keys(aaee)[20]];
							aaee.JejoNo	 		= aaee[Object.keys(aaee)[21]];
							aaee.JejoDt	 		= aaee[Object.keys(aaee)[22]];
							aaee.LicenseNo		= aaee[Object.keys(aaee)[23]];
							aaee.Etc01	 		= aaee[Object.keys(aaee)[24]];
							aaee.Etc04	 		= aaee[Object.keys(aaee)[25]];
							aaee.Etc05	 		= aaee[Object.keys(aaee)[26]];
							aaee.Etc06	 		= aaee[Object.keys(aaee)[27]];
							aaee.Etc07	 		= aaee[Object.keys(aaee)[28]];
							aaee.Etc08	 		= aaee[Object.keys(aaee)[29]];
							aaee.Etc09	 		= aaee[Object.keys(aaee)[30]];
							aaee.Etc10	 		= aaee[Object.keys(aaee)[31]];
							aaee.Etc11	 		= aaee[Object.keys(aaee)[32]];
							aaee.Etc12	 		= aaee[Object.keys(aaee)[33]];
							aaee.Etc13	 		= aaee[Object.keys(aaee)[34]];
							aaee.Etc14	 		= aaee[Object.keys(aaee)[35]];
							aaee.Etc15	 		= aaee[Object.keys(aaee)[36]];
							aaee.Etc16	 		= aaee[Object.keys(aaee)[37]];
							aaee.Etc17	 		= aaee[Object.keys(aaee)[38]];
							aacc.push(aaee);
						}else if(Object.keys(aaee)[0]=="문서구분" && Object.keys(aaee)[7]=="위탁자상호"){
							check = "mediProdM";
							aaee.DocuGbn 		= aaee[Object.keys(aaee)[0]];
							aaee.SendNo 		= aaee[Object.keys(aaee)[1]];
							aaee.ApplyNo 		= aaee[Object.keys(aaee)[2]];
							aaee.Status 		= aaee[Object.keys(aaee)[3]];
							aaee.Etc01	 		= aaee[Object.keys(aaee)[4]];
							aaee.IssueNo		= aaee[Object.keys(aaee)[5]];
							aaee.IssueDtm		= aaee[Object.keys(aaee)[6]];
							aaee.ComSangho		= aaee[Object.keys(aaee)[7]];
							aaee.SenderSangho	= aaee[Object.keys(aaee)[8]];
							aaee.Su				= aaee[Object.keys(aaee)[9]];
							aaee.Price 			= aaee[Object.keys(aaee)[10]];
							aaee.PriceDanwi	 	= aaee[Object.keys(aaee)[11]];
							aaee.PaymentUsd		= aaee[Object.keys(aaee)[12]];
							aaee.PaymentDanwi	= aaee[Object.keys(aaee)[13]];
							aaee.TotalUsd 		= aaee[Object.keys(aaee)[14]];
							aaee.TotalKrw 		= aaee[Object.keys(aaee)[15]];
							aaee.InvNo	 		= aaee[Object.keys(aaee)[16]];
							aaee.BlNo	 		= aaee[Object.keys(aaee)[17]];
							aaee.ItemNm	 		= aaee[Object.keys(aaee)[18]];
							aacc.push(aaee);
						}else if(Object.keys(aaee)[0]=="문서구분" && Object.keys(aaee)[7]=="품목코드"){
							check = "mediProdD";
							aaee.DocuGbn 		= aaee[Object.keys(aaee)[0]];
							aaee.SendNo 		= aaee[Object.keys(aaee)[1]];
							aaee.ApplyNo 		= aaee[Object.keys(aaee)[2]];
							aaee.Status 		= aaee[Object.keys(aaee)[3]];
							aaee.Etc01	 		= aaee[Object.keys(aaee)[4]];
							aaee.IssueNo		= aaee[Object.keys(aaee)[5]];
							aaee.IssueDtm		= aaee[Object.keys(aaee)[6]];
							aaee.ItemCode		= aaee[Object.keys(aaee)[7]];
							aaee.IdentiCode		= aaee[Object.keys(aaee)[8]];
							aaee.HsCode			= aaee[Object.keys(aaee)[9]];
							aaee.ItemNm			= aaee[Object.keys(aaee)[10]];
							aaee.Standard	 	= aaee[Object.keys(aaee)[11]];
							aaee.Su				= aaee[Object.keys(aaee)[12]];
							aaee.SuDanwi		= aaee[Object.keys(aaee)[13]];
							aaee.Danga	 		= aaee[Object.keys(aaee)[14]];
							aaee.Price	 		= aaee[Object.keys(aaee)[15]];
							aaee.PriceDanwi		= aaee[Object.keys(aaee)[16]];
							aaee.TotalUsd 		= aaee[Object.keys(aaee)[17]];
							aaee.TotalKrw 		= aaee[Object.keys(aaee)[18]];
							aaee.InvNo 			= aaee[Object.keys(aaee)[19]];
							aaee.BlNo	 		= aaee[Object.keys(aaee)[20]];
							aaee.Etc03	 		= aaee[Object.keys(aaee)[21]];
							aaee.Etc04	 		= aaee[Object.keys(aaee)[22]];
							aaee.LicenseNo 		= aaee[Object.keys(aaee)[23]];
							aaee.Etc05	 		= aaee[Object.keys(aaee)[24]];
							aaee.Etc06	 		= aaee[Object.keys(aaee)[25]];
							aaee.Etc07	 		= aaee[Object.keys(aaee)[26]];
							aaee.Etc02	 		= aaee[Object.keys(aaee)[27]];
							aaee.Etc09	 		= aaee[Object.keys(aaee)[28]];
							aaee.Etc10	 		= aaee[Object.keys(aaee)[29]];
							aaee.Etc11	 		= aaee[Object.keys(aaee)[30]];
							aaee.Etc08	 		= aaee[Object.keys(aaee)[31]];
							aaee.Etc12	 		= aaee[Object.keys(aaee)[32]];
							aaee.Etc13	 		= aaee[Object.keys(aaee)[33]];
							aacc.push(aaee);
						}else{
							check = "etc";
						}
					}
					if(check=="unipass"){
						unipassView();
					}else if(check=="medihwaM"){
						medihwaMView();
					}else if(check=="medihwaD"){
						medihwaDView();
					}else if(check=="mediProdM"){
						mediProdMView();
					}else if(check=="mediProdD"){
						mediProdDView();
					}else{
						alert("형식에 맞지 않는 엑셀파일입니다.");
						return;
					}
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
			      <a href="javascript:fn_updateAction();">등록</a>
			  	  <a href="javascript:delRowContacts();">라인삭제</a>
			  	  <a href="javascript:window.close();">닫기</a>
			    </div>
			  	<div class="normal_con01">
			      <table id="masterGrid"></table>
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