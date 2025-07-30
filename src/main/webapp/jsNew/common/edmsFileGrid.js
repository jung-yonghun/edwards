$('#edmsFileGrid').datagrid({
	width			: '100%',
	height			: _setHeightfile,
	fitColumns		: true,
	singleSelect	: false,
	selectOnCheck 	: false,
	CheckOnSelect 	: false,
	columns			: [[
        {field:'ck',title:'',checkbox:true},
        {field:'SDAAKey',title:'Key',hidden:true},
        {field:'EdmsFileCategory',title:'구분',width:80,align:'center',formatter:linkDocuFormatterNew,editor:{type:'combobox',options:{valueField:'id', textField:'name', required:true, data:DocuType}}},
        {field:'EdmsOrgFileNm',title:'파일명',width:230},
        {field:'a',title:'열기',width:40,align:'center',formatter:linkDownloadFormatterNew},
        {field:'b',title:'삭제',width:40,align:'center',formatter:linkDelFormatterNew},
        {field:'AddUserId',title:'AddUserId',hidden:true},
        {field:'SingoNo',title:'SingoNo',hidden:true},
        {field:'IeKey',title:'IeKey',hidden:true},
        {field:'SingoDt',title:'SingoDt',hidden:true},
        {field:'WorkNm',title:'WorkNm',hidden:true}
    ]]
});

$('#edmsFileGrid').datagrid('enableCellEditing').datagrid('gotoCell', {
    index: 0,
    field: 'EdmsFileCategory'
});