<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" 		uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" 	uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" 	uri="http://www.springframework.org/tags"%>
    <jsp:include page="/WEB-INF/jsp/include/head_titleIndex.jsp"></jsp:include>
    <title>Import Request</title>
	<jsp:include page="/WEB-INF/jsp/include/head_titleCss.jsp"></jsp:include>
	<jsp:include page="/WEB-INF/jsp/include/head_titleJs.jsp"></jsp:include>
	<script type="text/javascript" src="<c:url value='/js/cps/import/engImportRequestMod.js'/>"></script>
  </head>
  <body>
    <div id="wrap">
	  <div id="content">
		<div class="cont_con ovH">
		  <div class="right1">
		    <div class="easyui-layout" style="width:550px;height:400px">
		      <div data-options="region:'center'" style="box-sizing:border-box;border:0px;">
	  	       	<div class="normal_Button">
	  	       	  <a href="javascript:fn_saveAction('mailTransfer');">Mailing</a>
			 	  <a href="javascript:fn_saveAction('modify');">Save</a>
			 	  <a href="javascript:window.close();">Close</a>
			  	</div>
				<div class="hsnew_C02_table">
	  	          <form id="frm1" name="frm1">
              	  <input type="hidden" id="size" 		name="size" 		value="100000" />
		  		  <input type="hidden" id="page" 		name="page" 		value="0" />
		  		  <input type="hidden" id="_pageRow" 	name="_pageRow" 	value="100000" />
		  		  <input type="hidden" id="_pageNumber" name="_pageNumber" 	value="0" />
				  <input type="hidden" id="startKey" 	name="startKey" 	value="${param.startKey}" />
				  <input type="hidden" id="fileCnt" 	name="fileCnt" 		value="${param.fileCnt}" />
                  <table width="100%">
                    <col width="20%"/>
                    <col width="80%"/>
                    <tr height="23px">
                      <td class="left">B/L(HBL) <i></i></td>
                      <td>
                        <input type="text" id="startNum" name="startNum" style="width:50%;ime-mode:Inactive;"/>
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
                      <td class="left">Issue</td>
                      <td>
                        <input type="text" id="startIssueContent" name="startIssueContent" 	style="width:100%;ime-mode:active;"/>
                      </td>
                    </tr>
                  </table>
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