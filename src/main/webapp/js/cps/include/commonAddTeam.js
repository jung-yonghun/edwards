function selectAddTeamList(params, callback){
	var url 	= "../apis/system/selectTeamList",
		params 	= {"userYn":"Y"},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		console.log(d);
		$('#masterGrid').datagrid('loadData', d);
	});
}

$(document).ready(function(){
	$(function(){
		$('#masterGrid').datagrid({
			title			: "팀",
			width			: '100%',
			height			: '295px',
			singleSelect	: true,
			fitColumns		: true,
			onDblClickRow	: onDblClickRow,
			columns			: [[
			    {field:'teamKey',title:'key',hidden:true},
			    {field:'teamCode',title:'teamCode',hidden:true},
                {field:'teamName',title:'팀',width:150,align:'center'}
	        ]]
		});
		$('#masterGrid').datagrid('enableFilter',[]);
    });
	fn_searchAction();
});

var fn_searchAction = function(){
	selectAddTeamList();
};

function onDblClickRow(index, row){
	if(!confirm("팀추가 하시겠습니까?")) return;
    var url 	= "../apis/system/insertSaveTeamList",
	    params 	= {
    		"saveTeamList" : [{
    		"teamCode" 		: row.teamCode,
    		"teamName" 		: row.teamName,
    		"userId" 		: $('#userId').val(),
    		"useYn" 		: "Y"
    	}]},
	    type 	= "POST";

	sendAjax(url, params, type, function(d){
	});

    window.close();
}