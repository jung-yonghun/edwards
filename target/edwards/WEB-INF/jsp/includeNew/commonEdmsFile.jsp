<%@ page contentType = "text/html;charset=utf-8" %>
				  <div class="normal_Button" id="docuGbn">
				  	<a href="javascript:fn_docuGbn(0);">ALL</a>
				  	<a href="javascript:fn_docuGbn(1);">선적서류</a>
				  	<a href="javascript:fn_docuGbn(2);">통관서류</a>
				  	<a href="javascript:fn_docuGbn(3);">운송서류</a>
				  	<a href="javascript:fn_docuGbn(4);">정산서류</a>
				   	<a href="javascript:fn_docuGbn(5);">기타서류</a>
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
                  <div id="edmsFileUploader">파일찾기</div>
                  <div class="normal_Top">
                    <table width="100%">
                      <col width="20%"/>
                      <col width="80%"/>
                      <tr height="23px">
                      	<td>문서형태</td>
                        <td>
                          <select id="CommonGbn" name="CommonGbn" style="width:150px;">
                            <option value="A">B/L(Inv) 기준 공통문서</option>
                            <option value="B">신고번호별 개별문서</option>
                          </select>
                        </td>
                      </tr>
                      <tr height="23px">
                        <td>문서구분</td>
                        <td>
                          <select id="EdmsFileCategory" name="EdmsFileCategory" style="width:80px;"></select>
                        </td>
                      </tr>
                    </table>
                  </div>
                  </form>
                  <div class="normal_Button">
				    <a href="javascript:fn_detailSaveNew();">구분저장</a>
				  </div>
                  <div class="normal_con01">
				    <table id="edmsFileGrid" class="easyui-datagrid"></table>
				  </div>