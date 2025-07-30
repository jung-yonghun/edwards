function selectAddMenuList(params, callback){
	var url 	= "../apis/system/addSysMenuList",
		params 	= {"userKey":$('#userKey').val()},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		$('#masterGrid').datagrid('loadData', d);
	});
}

$(document).ready(function(){
	$(function(){
		$('#masterGrid').datagrid({
			title			: "메뉴",
			width			: '100%',
			height			: '295px',
			singleSelect	: false,
			selectOnCheck 	: true,
			CheckOnSelect 	: true,
			fitColumns		: true,
			rowStyler		: function(index,row){
                if(row.parentID == 0){
                    return 'background-color:#FFBEC3;';
                }else{
                    return 'background-color:#87abff;';
                }
            },
			columns			: [[
			    {field:'ck',title:'',checkbox:true},
                {field:'menuEngName',title:'메뉴명',width:150,align:'center'},
                {field:'parentID',title:'분류',width:100,align:'center',formatter:linkParentFormatter},
                {field:'note',title:'Note',width:140},
                {field:'sortOrder',title:'sortOrder',width:100,align:'center'}
	        ]]
		});
		$('#masterGrid').datagrid('enableFilter',[]);
    });
	fn_searchAction();
});

var fn_searchAction = function(){
	selectAddMenuList();
};

function linkParentFormatter(value, row){
	var Parent = "";

	if(value=="0"){
		Parent = "대분류";
	}else {
		Parent = "중분류";
	}
	return Parent;
}

function fn_addAction() {
	var rows = $('#masterGrid').datagrid('getSelections');

    if(rows.length < 1){
	    alert("아래 라인을 선택한 후 클릭하세요");
	    return;
	}

    if(!confirm("메뉴추가 하시겠습니까?")) return;

    var dd = [];
    for(var i = 0; i < rows.length; i++){
        dd.push({
        	"userKey" 	: $('#userKey').val(),
			"sortOrder" : rows[i].sortOrder,
    		"useYn" 	: "Y"
        });
    }

    var url 	= "../apis/system/insertUserMenuList",
	    params 	= {"userMenuList" : dd},
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
	});

	opener.fn_reload($('#userKey').val());
    window.close();
};