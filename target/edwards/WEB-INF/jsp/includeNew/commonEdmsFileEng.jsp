<%@ page contentType = "text/html;charset=utf-8" %>
				  <div class="normal_Button">
				  	<a href="javascript:fn_docuGbn(0);">ALL</a>
				  	<a href="javascript:fn_docuGbn(1);">Shipping</a>
				  	<a href="javascript:fn_docuGbn(2);">Clearance</a>
				  	<a href="javascript:fn_docuGbn(3);">Delivery</a>
				  	<a href="javascript:fn_docuGbn(4);">Settle</a>
				   	<a href="javascript:fn_docuGbn(5);">Other</a>
				  </div>
				  <form id="fileForm" name="fileForm">
                  <input type="hidden" id="EdmsParentGbn" 		name="EdmsParentGbn"/>
		          <input type="hidden" id="EdmsJisaCode" 		name="EdmsJisaCode"/>
		          <input type="hidden" id="EdmsSaup" 			name="EdmsSaup"/>
		          <input type="hidden" id="EdmsMasterKey" 		name="EdmsMasterKey"/>
   			      <input type="hidden" id="EdmsMKey" 			name="EdmsMKey"/>
			      <input type="hidden" id="EdmsNo" 				name="EdmsNo"/>
			      <input type="hidden" id="EdmsSingoNo" 		name="EdmsSingoNo"/>
			      <input type="hidden" id="CommonYn" 			name="CommonYn"/>
			      <input type="hidden" id="EdmsFileUploadType" 	name="EdmsFileUploadType" 	value="CPSW"/>
			      <input type="hidden" id="EdmsFileStatus" 		name="EdmsFileStatus"  		value="CW"/>
                  <div id="edmsFileUploader">File Search</div>
                  <div class="normal_Top">
                    <table width="100%">
                      <col width="20%"/>
                      <col width="80%"/>
                      <tr height="23px">
                      	<td>Docu Format</td>
                        <td>
                          <select id="CommonGbn" name="CommonGbn" style="width:150px;">
                            <option value="A">Per B/L(Inv)</option>
                            <option value="B">Per Declaration No.</option>
                          </select>
                        </td>
                      </tr>
                      <tr height="23px">
                        <td>Docu Type</td>
                        <td>
                          <select id="EdmsFileCategory" name="EdmsFileCategory" style="width:80px;"></select>
                        </td>
                      </tr>
                    </table>
                  </div>
                  </form>
                  <div class="normal_Button">
				    <a href="javascript:fn_detailSaveNew();">Save Type</a>
				  </div>
                  <div class="normal_con01">
				    <table id="edmsFileGrid" class="easyui-datagrid"></table>
				  </div>