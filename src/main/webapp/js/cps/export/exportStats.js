function AddComma(data_value){
	return Number(data_value).toLocaleString('en');
}

function selectExpoStatisticsTab1List(){
	progress.show();
	var url 	= "../apis/customs/selectExportResultCountRecordsExceptSingo",
		params 	= $("#frm1").serializeObject(),
		type 	= "POST",
		target 	= "statisticsBarChart",
		$userId = $("#sessionId").val();

    if($userId == 156){
        params["db"] = "ncustoms_pt";
    }

	$.ajax({
		type 		: type,
		contentType : "application/json",
		dataType 	: 'json',
		url 		: url,
		processData : true,
		cache 		: false,
		data 		: type.toLowerCase() == "get" ? params : JSON.stringify(params),
		success 	: function(data, textStatus, jqXHR){
			for(var i=0; i < data.content.length; i++){
				data.content[i].Totcnt=data.content[i].PLcnt+data.content[i].JechulCnt;
			}
			var chartData = {
				labels	: [],
	            name	: "",
	            datasets: [{
	              label 				: "",
	              fillColor				: "rgba(255, 99, 132,0.5)",
                  strokeColor			: "rgba(255, 99, 132,0.5)",
                  pointColor			: "rgba(255, 99, 132,0.5)",
                  pointStrokeColor		: "#fff",
                  pointHighlightFill	: "#fff",
                  pointHighlightStroke	: "rgba(255, 99, 132,0.5)",
	              data					: []
	            }]
	        };
	        $.each(data.content, function(position, result){
                if(result.mm){
                	chartData.labels.push(result.mm);
                }else{
                	chartData.labels.push('');
                }
                chartData.datasets[0].data.push(result.Totcnt);
            });

	        var chartCanvas = $("#"+target).get(0).getContext("2d");
	        if(chartData.labels.length < 51){
	        	document.getElementById(target).style.width = '95%';
	        }else if(chartData.labels.length > 50 && chartData.labels.length < 101){
	        	document.getElementById(target).style.width = '195%';
	        }else{
	        	document.getElementById(target).style.width = '495%';
	        }

	        var chartOptions = {
	        	scaleBeginAtZero			: true,
	        	scaleShowGridLines			: true,
	        	scaleGridLineColor			: "rgba(0,0,0,.05)",
	        	scaleGridLineWidth			: 1,
	        	scaleShowHorizontalLines	: true,
	        	scaleShowVerticalLines		: true,
	        	barShowStroke				: true,
	        	barStrokeWidth				: 2,
	        	barValueSpacing				: 10,
	        	barDatasetSpacing			: 1,
	        	showTooltips				: false,

	        	onAnimationComplete			: function(){
	        		this.showTooltip(this.datasets[0].bars, true);

//	        		var ctx 			= this.chart.ctx;
//	        		ctx.font 			= this.scale.font;
//	        		ctx.fillStyle 		= "red";
//	        		ctx.textAlign 		= "center";
//	        		ctx.textBaseline 	= "bottom";
//
//	        		this.datasets.forEach(function (dataset){
//	        			dataset.bars.forEach(function (bar){
//	        				ctx.fillText(bar.value, bar.x, bar.y - 5);
//	        			});
//	        		})
	        	},
	        	tooltipEvents			: [],
	        	maintainAspectRatio		: false,
	        	tooltipTemplate			: "<%= AddComma(value) %>",
	        };

	        chartOptions.datasetFill = false;
	        var mychart = new Chart(chartCanvas).Bar(chartData, chartOptions);

			$('#masterGrid').datagrid('loadData', data.content);
			progress.hide();
		},
		error : function(e){
			console.error("error", e);
			if(e.status == 500){
				alert("관리자에게 문의하세요. [" + e.statusText + "]");
			}else if(e.status == 404){
				alert("페이지를 찾을 수 없습니다. [" + e.statusText + "]");
			};
			return -1;
		},
		complete : function(d){
			if(d.responseJSON.success == false){
				console.error("complete", d.responseJSON);
				alert("관리자에게 문의하세요. [" + d.responseJSON.message + "," + d.responseJSON.code + "]");
				return -1;
			};
        }
	});

	return 0;
}

function selectExpoStatisticsTab2List(){
	progress.show();
	var url 	= "../apis/customs/selectExportResultSuchul",
		params 	= $("#frm1").serializeObject(),
		type 	= "POST",
		target1 = "statisticsBarChart1",
		$userId = $("#sessionId").val();

    if($userId == 156){
        params["db"] = "ncustoms_pt";
    }

	$.ajax({
		type 		: type,
		contentType : "application/json",
		dataType 	: 'json',
		url 		: url,
		processData : true,
		cache 		: false,
		data 		: type.toLowerCase() == "get" ? params : JSON.stringify(params),
		success : function(data, textStatus, jqXHR) {
			var chartData = {
				labels	: [],
	            name	: "",
	            datasets: [{
	              label 				: "",
	              fillColor				: "rgba(255, 99, 132,0.5)",
                  strokeColor			: "rgba(255, 99, 132,0.5)",
                  pointColor			: "rgba(255, 99, 132,0.5)",
                  pointStrokeColor		: "#fff",
                  pointHighlightFill	: "#fff",
                  pointHighlightStroke	: "rgba(255, 99, 132,0.5)",
	              data					: []
	            }]
	        };
			$.each(data.content, function(position, result){
                if(result.mm){
                	chartData.labels.push(result.mm);
                }else{
                	chartData.labels.push('');
                }
                chartData.datasets[0].data.push(result.Expo_total_won);
            });

	        var chartCanvas = $("#"+target1).get(0).getContext("2d");
	        if(chartData.labels.length < 51){
	        	document.getElementById(target1).style.width = '100%';
	        }else if(chartData.labels.length > 50 && chartData.labels.length < 101){
	        	document.getElementById(target1).style.width = '200%';
	        }else{
	        	document.getElementById(target1).style.width = '500%';
	        }


	        var chartOptions = {
	        	scaleBeginAtZero			: true,
	        	scaleShowGridLines			: true,
	        	scaleGridLineColor			: "rgba(0,0,0,.05)",
	        	scaleGridLineWidth			: 1,
	        	scaleShowHorizontalLines	: true,
	        	scaleShowVerticalLines		: true,
	        	barShowStroke				: true,
	        	barStrokeWidth				: 2,
	        	barValueSpacing				: 10,
	        	barDatasetSpacing			: 1,
	        	showTooltips				: false,

	        	onAnimationComplete			: function(){
	        		this.showTooltip(this.datasets[0].bars, true);
	        	},
	        	tooltipEvents			: [],
	        	maintainAspectRatio		: false,
	        	tooltipTemplate			: "<%= AddComma(value) %>",
	        	scaleLabel				: function(valuePayload){
	        	    return Number(valuePayload.value).toLocaleString('en');
	        	}
	        };

	        chartOptions.datasetFill = false;
	        var mychart2 = new Chart(chartCanvas).Bar(chartData, chartOptions);

			$('#masterGrid1').datagrid('loadData', data.content);
			progress.hide();
		},
		error : function(e){
			console.error("error", e);
			if(e.status == 500){
				alert("관리자에게 문의하세요. [" + e.statusText + "]");
			}else if(e.status == 404){
				alert("페이지를 찾을 수 없습니다. [" + e.statusText + "]");
			};
			return -1;
		},
		complete : function(d){
			if(d.responseJSON.success == false){
				console.error("complete", d.responseJSON);
				alert("관리자에게 문의하세요. [" + d.responseJSON.message + "," + d.responseJSON.code + "]");
				return -1;
			};
        }
	});

	return 0;
}

$(document).ready(function(){
	if($("#sessionId").val() == 156){
    	$("#yyyy").val("2017");
    }

	$(function(){
		$('#masterGrid').datagrid({
			title			: '신고건수',
			width			: '100%',
			height			: '350px',
			singleSelect	: true,
			view			: groupview,
            groupField		: 'yyyy',
            groupFormatter	: function(value,rows){
                return value;
            },
			columns			: [[
                {field:'yyyy',title:'년도',hidden:true},
                {field:'mm',title:'월',width:50,align:'center'},
                {field:'Totcnt',title:'총신고건',width:80,align:'right',formatter:Totalcnt},
                {field:'PLcnt',title:'P/L',width:80,align:'right',formatter:linkNumberFormatter0},
                {field:'JechulCnt',title:'제출',width:80,align:'right',formatter:linkNumberFormatter0}
	        ]]
		});

		$('#masterGrid1').datagrid({
			title			: '수출실적',
			width			: '100%',
			height			: '350px',
			singleSelect	: true,
			view			: groupview,
            groupField		: 'yyyy',
            groupFormatter	: function(value,rows){
                return value;
            },
			columns			: [[
                {field:'yyyy',title:'년도',hidden:true},
                {field:'mm',title:'월',width:50,align:'center'},
                {field:'Expo_total_usd',title:'FOB($)',width:100,align:'right',formatter:linkNumberFormatter0},
                {field:'Expo_total_won',title:'FOB(원)',width:100,align:'right',formatter:linkNumberFormatter0}
	        ]]
		});

		$('#tabs').tabs({
		    onSelect : function(title, index){
				var tab = $('#tabs').tabs('getSelected');
				var hest = $('#tabs').tabs('getTabIndex',tab);
				if(hest == 0){
					selectExpoStatisticsTab1List();
				}else{
					selectExpoStatisticsTab2List();
				}
		    }
		});
	});

	selectExpoStatisticsTab1List();
});

function fn_year(){
	$('#tabs').tabs('select',0);
	selectExpoStatisticsTab1List();
}

function Totalcnt(value,row){
	return parseFloat(row.PLcnt+row.JechulCnt).format(0, 3, ',', '.');
}