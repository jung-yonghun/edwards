function AddComma(data_value){
	return Number(data_value).toLocaleString('en');
}

function selectImportSummaryTab1List(){
	progress.show();
	var url 	= "../apis/customs/selectImportSummary",
		params 	= {
			"ID" 		 	 : $("#ID").val(),
			"yyyy" 		 	 : $("#yyyy").val(),
			"ncustomsDb" 	 : $("#_defaultDB").val(),
			"taxNum"		 : $("#taxNum").val(),
			"statisticsType" : "IMPORT"
		},
		type 	= "POST",
		target 	= "statisticsBarChart";

	$.ajax({
		type 		: type,
		contentType : "application/json",
		dataType 	: 'json',
		url 		: url,
		processData : true,
		cache 		: false,
		data 		: type.toLowerCase() == "get" ? params : JSON.stringify(params),
		success 	: function(data, textStatus, jqXHR){
			console.log(data);
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
	        $.each(data, function(position, result){
                if(result.mm){
                	chartData.labels.push(result.mm);
                }else{
                	chartData.labels.push('');
                }
                chartData.datasets[0].data.push(result.singoCnt);
            });

	        var chartCanvas = $("#"+target).get(0).getContext("2d");
	        document.getElementById(target).style.width = '100%';

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
	        };

	        chartOptions.datasetFill = false;
	        var mychart = new Chart(chartCanvas).Bar(chartData, chartOptions);

			$('#masterGrid').datagrid('loadData', data);
			progress.hide();
		}
	});

	return 0;
}

function selectImportSummaryTab2List(){
	progress.show();
	var url 	= "../apis/customs/selectImportSummary",
		params 	= {
			"ID" 		 	 : $("#ID").val(),
			"yyyy" 		 	 : $("#yyyy").val(),
			"ncustomsDb" 	 : $("#_defaultDB").val(),
			"taxNum"		 : $("#taxNum").val(),
			"statisticsType" : "IMPORT"
		},
		type 	= "POST",
		target1 = "statisticsBarChart1";

	$.ajax({
		type 		: type,
		contentType : "application/json",
		dataType 	: 'json',
		url 		: url,
		processData : true,
		cache 		: false,
		data 		: type.toLowerCase() == "get" ? params : JSON.stringify(params),
		success : function(data, textStatus, jqXHR){
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
			$.each(data, function(position, result){
                if(result.mm){
                	chartData.labels.push(result.mm);
                }else{
                	chartData.labels.push('');
                }
                chartData.datasets[0].data.push(result.amtWon);
            });

	        var chartCanvas = $("#"+target1).get(0).getContext("2d");
	        document.getElementById(target1).style.width = '100%';


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

			$('#masterGrid1').datagrid('loadData', data);
			progress.hide();
		}
	});

	return 0;
}

function selectImportSummaryTab3List(){
	progress.show();
	var url 	= "../apis/customs/selectImportSummary",
		params 	= {
			"ID" 		 	 : $("#ID").val(),
			"yyyy" 		 	 : $("#yyyy").val(),
			"ncustomsDb" 	 : $("#_defaultDB").val(),
			"taxNum"		 : $("#taxNum").val(),
			"statisticsType" : "IMPORT"
		},
		type 	= "POST",
		target1 = "statisticsBarChart2";

	$.ajax({
		type 		: type,
		contentType : "application/json",
		dataType 	: 'json',
		url 		: url,
		processData : true,
		cache 		: false,
		data 		: type.toLowerCase() == "get" ? params : JSON.stringify(params),
		success : function(data, textStatus, jqXHR){
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
			$.each(data, function(position, result){
                if(result.mm){
                	chartData.labels.push(result.mm);
                }else{
                	chartData.labels.push('');
                }
                chartData.datasets[0].data.push(result.totalTax);
            });

	        var chartCanvas = $("#"+target1).get(0).getContext("2d");
	        document.getElementById(target1).style.width = '100%';


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

			$('#masterGrid2').datagrid('loadData', data);
			progress.hide();
		}
	});

	return 0;
}

function selectImportSummaryTab4List(){
	progress.show();
	var url 	= "../apis/customs/selectImportSummary",
		params 	= {
			"ID" 		 	 : $("#ID").val(),
			"yyyy" 		 	 : $("#yyyy").val(),
			"ncustomsDb" 	 : $("#_defaultDB").val(),
			"taxNum"		 : $("#taxNum").val(),
			"statisticsType" : "EXPORT"
		},
		type 	= "POST",
		target 	= "statisticsBarChart3";

	if($("#_defaultDB").val()=="ncustoms"){
        params["ncustomsDb"] = "ncustoms_sel_040";
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
	        $.each(data, function(position, result){
                if(result.mm){
                	chartData.labels.push(result.mm);
                }else{
                	chartData.labels.push('');
                }
                chartData.datasets[0].data.push(result.singoCnt);
            });

	        var chartCanvas = $("#"+target).get(0).getContext("2d");
	        document.getElementById(target).style.width = '100%';

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
	        };

	        chartOptions.datasetFill = false;
	        var mychart = new Chart(chartCanvas).Bar(chartData, chartOptions);

			$('#masterGrid3').datagrid('loadData', data);
			progress.hide();
		}
	});

	return 0;
}

function selectImportSummaryTab5List(){
	progress.show();
	var url 	= "../apis/customs/selectImportSummary",
		params 	= {
			"ID" 		 	 : $("#ID").val(),
			"yyyy" 		 	 : $("#yyyy").val(),
			"ncustomsDb" 	 : $("#_defaultDB").val(),
			"taxNum"		 : $("#taxNum").val(),
			"statisticsType" : "EXPORT"
		},
		type 	= "POST",
		target1 = "statisticsBarChart4";

	if($("#_defaultDB").val()=="ncustoms"){
        params["ncustomsDb"] = "ncustoms_sel_040";
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
			$.each(data, function(position, result){
                if(result.mm){
                	chartData.labels.push(result.mm);
                }else{
                	chartData.labels.push('');
                }
                chartData.datasets[0].data.push(result.amtWon);
            });

	        var chartCanvas = $("#"+target1).get(0).getContext("2d");
	        document.getElementById(target1).style.width = '100%';


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

			$('#masterGrid4').datagrid('loadData', data);
			progress.hide();
		}
	});

	return 0;
}

function selectImportSummaryTab6List(){
	progress.show();
	var url 	= "../apis/customs/selectImportSummary",
		params 	= {
			"ID" 		 	 : $("#ID").val(),
			"yyyy" 		 	 : $("#yyyy").val(),
			"ncustomsDb" 	 : $("#_defaultDB").val(),
			"taxNum"		 : $("#taxNum").val(),
			"statisticsType" : "CARRYIN"
		},
		type 	= "POST",
		target 	= "statisticsBarChart5";

	if($("#_defaultDB").val()=="ncustoms"){
        params["ncustomsDb"] = "ncustoms_sel_040";
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
	        $.each(data, function(position, result){
                if(result.mm){
                	chartData.labels.push(result.mm);
                }else{
                	chartData.labels.push('');
                }
                chartData.datasets[0].data.push(result.singoCnt);
            });

	        var chartCanvas = $("#"+target).get(0).getContext("2d");
	        document.getElementById(target).style.width = '100%';

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
	        };

	        chartOptions.datasetFill = false;
	        var mychart = new Chart(chartCanvas).Bar(chartData, chartOptions);

			$('#masterGrid5').datagrid('loadData', data);
			progress.hide();
		}
	});

	return 0;
}

function selectImportSummaryTab7List(){
	progress.show();
	var url 	= "../apis/customs/selectImportSummary",
		params 	= {
			"ID" 		 	 : $("#ID").val(),
			"yyyy" 		 	 : $("#yyyy").val(),
			"ncustomsDb" 	 : $("#_defaultDB").val(),
			"taxNum"		 : $("#taxNum").val(),
			"statisticsType" : "CARRYIN"
		},
		type 	= "POST",
		target1 = "statisticsBarChart6";

	if($("#_defaultDB").val()=="ncustoms"){
        params["ncustomsDb"] = "ncustoms_sel_040";
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
			$.each(data, function(position, result){
                if(result.mm){
                	chartData.labels.push(result.mm);
                }else{
                	chartData.labels.push('');
                }
                chartData.datasets[0].data.push(result.amtWon);
            });

	        var chartCanvas = $("#"+target1).get(0).getContext("2d");
	        document.getElementById(target1).style.width = '100%';


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

			$('#masterGrid6').datagrid('loadData', data);
			progress.hide();
		}
	});

	return 0;
}

function selectImportSummaryTab8List(){
	progress.show();
	var url 	= "../apis/customs/selectImportSummary",
		params 	= {
			"ID" 		 	 : $("#ID").val(),
			"yyyy" 		 	 : $("#yyyy").val(),
			"ncustomsDb" 	 : $("#_defaultDB").val(),
			"taxNum"		 : $("#taxNum").val(),
			"statisticsType" : "IMGONG"
		},
		type 	= "POST";

	$.ajax({
		type 		: type,
		contentType : "application/json",
		dataType 	: 'json',
		url 		: url,
		processData : true,
		cache 		: false,
		data 		: type.toLowerCase() == "get" ? params : JSON.stringify(params),
		success : function(data, textStatus, jqXHR) {
			$('#masterGrid7').datagrid('loadData', data);
			progress.hide();
		}
	});

	return 0;
}

function selectImportSummaryTab9List(){
	progress.show();
	var url 	= "../apis/customs/selectImportSummary",
		params 	= {
			"ID" 		 	 : $("#ID").val(),
			"yyyy" 		 	 : $("#yyyy").val(),
			"ncustomsDb" 	 : $("#_defaultDB").val(),
			"taxNum"		 : $("#taxNum").val(),
			"statisticsType" : "EXGONG"
		},
		type 	= "POST";

	if($("#_defaultDB").val()=="ncustoms"){
        params["ncustomsDb"] = "ncustoms_sel_040";
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
			$('#masterGrid8').datagrid('loadData', data);
			progress.hide();
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
			title			: 'Import declarations',
			width			: '100%',
			height			: '370px',
			singleSelect	: true,
			fitColumns		: true,
			columns			: [[
                {field:'mm',title:'Month',width:50,align:'center'},
                {field:'singoCnt',title:'Total declarations',width:80,align:'right',formatter:linkNumberFormatter0}
	        ]],
	        rowStyler		: function(index,row){
                if(row.mm == "Total"){
                    return 'background-color:#ffdee1;';
                }
            },
	        onLoadSuccess	: function(){
	        	var sum  = 0;
	        	var rows = $('#masterGrid').datagrid('getRows');
	        	for(var i=0; i<rows.length; i++){
	        		if(rows[i]['singoCnt']==null){
	        			sum += 0;
	        		}else{
	        			sum += rows[i]['singoCnt'];
	        		}
	        	}
	        	$('#masterGrid').datagrid('insertRow',{index:0,row:{'mm':'Total','singoCnt':sum}});
	      	}
		});

		$('#masterGrid1').datagrid({
			title			: 'Import records',
			width			: '100%',
			height			: '370px',
			singleSelect	: true,
			fitColumns		: true,
			columns			: [[
                {field:'mm',title:'Month',width:50,align:'center'},
                {field:'amtWon',title:'CIF(￦)',width:100,align:'right',formatter:linkNumberFormatter0},
                {field:'amtUsd',title:'CIF($)',width:100,align:'right',formatter:linkNumberFormatter0}
	        ]],
	        rowStyler		: function(index,row){
                if(row.mm == "Total"){
                    return 'background-color:#ffdee1;';
                }
            },
	        onLoadSuccess	: function(){
	        	var sum  = 0;
	        	var sum1 = 0;
	        	var rows = $('#masterGrid1').datagrid('getRows');
	        	for(var i=0; i<rows.length; i++){
	        		if(rows[i]['amtWon']==null){
	        			sum += 0;
	        		}else{
	        			sum += rows[i]['amtWon'];
	        		}
	        		if(rows[i]['amtUsd']==null){
	        			sum1 += 0;
	        		}else{
	        			sum1 += rows[i]['amtUsd'];
	        		}
	        	}
	        	$('#masterGrid1').datagrid('insertRow',{index:0,row:{'mm':'Total','amtWon':sum,'amtUsd':sum1}});
	      	}
		});

		$('#masterGrid2').datagrid({
			title			: 'Import payment records',
			width			: '100%',
			height			: '370px',
			singleSelect	: true,
			fitColumns		: true,
			columns			: [[
                {field:'mm',title:'Month',width:50,align:'center'},
                {field:'totalTax',title:'Total Tax',width:100,align:'right',formatter:linkNumberFormatter0},
                {field:'gwanTax',title:'Customs Tax',width:100,align:'right',formatter:linkNumberFormatter0},
                {field:'vatTax',title:'VAT',width:100,align:'right',formatter:linkNumberFormatter0}
	        ]],
	        rowStyler		: function(index,row){
                if(row.mm == "Total"){
                    return 'background-color:#ffdee1;';
                }
            },
	        onLoadSuccess	: function(){
	        	var sum  = 0;
	        	var sum1 = 0;
	        	var sum2 = 0;
	        	var rows = $('#masterGrid2').datagrid('getRows');
	        	for(var i=0; i<rows.length; i++){
	        		if(rows[i]['totalTax']==null){
	        			sum += 0;
	        		}else{
	        			sum += rows[i]['totalTax'];
	        		}
	        		if(rows[i]['gwanTax']==null){
	        			sum1 += 0;
	        		}else{
	        			sum1 += rows[i]['gwanTax'];
	        		}
	        		if(rows[i]['vatTax']==null){
	        			sum2 += 0;
	        		}else{
	        			sum2 += rows[i]['vatTax'];
	        		}
	        	}
	        	$('#masterGrid2').datagrid('insertRow',{index:0,row:{'mm':'Total','totalTax':sum,'gwanTax':sum1,'vatTax':sum2}});
	      	}
		});

		$('#masterGrid3').datagrid({
			title			: 'Exports',
			width			: '100%',
			height			: '370px',
			singleSelect	: true,
			fitColumns		: true,
			columns			: [[
                {field:'mm',title:'Month',width:50,align:'center'},
                {field:'singoCnt',title:'Total declarations',width:80,align:'right',formatter:linkNumberFormatter0}
	        ]],
	        rowStyler		: function(index,row){
                if(row.mm == "Total"){
                    return 'background-color:#ffdee1;';
                }
            },
	        onLoadSuccess	: function(){
	        	var sum  = 0;
	        	var rows = $('#masterGrid3').datagrid('getRows');
	        	for(var i=0; i<rows.length; i++){
	        		if(rows[i]['singoCnt']==null){
	        			sum += 0;
	        		}else{
	        			sum += rows[i]['singoCnt'];
	        		}
	        	}
	        	$('#masterGrid3').datagrid('insertRow',{index:0,row:{'mm':'Total','singoCnt':sum}});
	      	}
		});

		$('#masterGrid4').datagrid({
			title			: 'Export records',
			width			: '100%',
			height			: '370px',
			singleSelect	: true,
			fitColumns		: true,
			columns			: [[
                {field:'mm',title:'Month',width:50,align:'center'},
                {field:'amtWon',title:'FOB(￦)',width:100,align:'right',formatter:linkNumberFormatter0},
                {field:'amtUsd',title:'FOB($)',width:100,align:'right',formatter:linkNumberFormatter0}
	        ]],
	        rowStyler		: function(index,row){
                if(row.mm == "Total"){
                    return 'background-color:#ffdee1;';
                }
            },
	        onLoadSuccess	: function(){
	        	var sum  = 0;
	        	var sum1 = 0;
	        	var rows = $('#masterGrid4').datagrid('getRows');
	        	for(var i=0; i<rows.length; i++){
	        		if(rows[i]['amtWon']==null){
	        			sum += 0;
	        		}else{
	        			sum += rows[i]['amtWon'];
	        		}
	        		if(rows[i]['amtUsd']==null){
	        			sum1 += 0;
	        		}else{
	        			sum1 += rows[i]['amtUsd'];
	        		}
	        	}
	        	$('#masterGrid4').datagrid('insertRow',{index:0,row:{'mm':'Total','amtWon':sum,'amtUsd':sum1}});
	      	}
		});

		$('#masterGrid5').datagrid({
			title			: 'Export inbound cases',
			width			: '100%',
			height			: '370px',
			singleSelect	: true,
			fitColumns		: true,
			columns			: [[
                {field:'mm',title:'Month',width:50,align:'center'},
                {field:'singoCnt',title:'Total declarations',width:80,align:'right',formatter:linkNumberFormatter0}
	        ]],
	        rowStyler		: function(index,row){
                if(row.mm == "Total"){
                    return 'background-color:#ffdee1;';
                }
            },
	        onLoadSuccess	: function(){
	        	var sum  = 0;
	        	var rows = $('#masterGrid5').datagrid('getRows');
	        	for(var i=0; i<rows.length; i++){
	        		if(rows[i]['singoCnt']==null){
	        			sum += 0;
	        		}else{
	        			sum += rows[i]['singoCnt'];
	        		}
	        	}
	        	$('#masterGrid5').datagrid('insertRow',{index:0,row:{'mm':'Total','singoCnt':sum}});
	      	}
		});

		$('#masterGrid6').datagrid({
			title			: 'Export inbound records',
			width			: '100%',
			height			: '370px',
			singleSelect	: true,
			fitColumns		: true,
			columns			: [[
                {field:'mm',title:'Month',width:50,align:'center'},
                {field:'amtWon',title:'FOB(￦)',width:100,align:'right',formatter:linkNumberFormatter0},
//                {field:'amtUsd',title:'FOB($)',width:100,align:'right',formatter:linkNumberFormatter0}
	        ]],
	        rowStyler		: function(index,row){
                if(row.mm == "Total"){
                    return 'background-color:#ffdee1;';
                }
            },
	        onLoadSuccess	: function(){
	        	var sum  = 0;
	        	var sum1 = 0;
	        	var rows = $('#masterGrid6').datagrid('getRows');
	        	for(var i=0; i<rows.length; i++){
	        		if(rows[i]['amtWon']==null){
	        			sum += 0;
	        		}else{
	        			sum += rows[i]['amtWon'];
	        		}
	        		if(rows[i]['amtUsd']==null){
	        			sum1 += 0;
	        		}else{
	        			sum1 += rows[i]['amtUsd'];
	        		}
	        	}
	        	$('#masterGrid6').datagrid('insertRow',{index:0,row:{'mm':'Total','amtWon':sum,'amtUsd':sum1}});
	      	}
		});

		$('#masterGrid7').datagrid({
			title			: 'Import Supplier',
			width			: '100%',
			height			: '370px',
			singleSelect	: true,
			fitColumns		: true,
			columns			: [[
                {field:'nation',title:'Nation',width:80,align:'center'},
                {field:'company',title:'Supplier',width:400},
                {field:'singoCnt',title:'Total declarations',width:80,align:'right',formatter:linkNumberFormatter0}
	        ]],
	        rowStyler		: function(index,row){
                if(row.nation == "Total"){
                    return 'background-color:#ffdee1;';
                }
            },
	        onLoadSuccess	: function(){
	        	var sum  = 0;
	        	var sum1 = 0;
	        	var rows = $('#masterGrid7').datagrid('getRows');

	        	for(var i=0; i<rows.length; i++){
	        		if(rows[i]['singoCnt']==null){
	        			sum += 0;
	        		}else{
	        			sum += rows[i]['singoCnt'];
	        		}
	        	}
	        	$('#masterGrid7').datagrid('insertRow',{index:0,row:{'nation':'Total','singoCnt':sum}});

	        	var aaa  = '';
	        	var j = 0;
	        	var k = 1;
	        	var merges = [];
	        	for(var i=1; i<rows.length; i++){
	        		if(aaa == rows[i].nation){
	            		k++;
	            		if(i==rows.length-1){
	            			merges.push({index:j,rowspan:k});
	            		}
	            	}else{
	            		merges.push({index:j,rowspan:k});
	            		j = i;
	            		k = 1;
	            	}
	            	aaa = rows[i].nation;
	        	}

	            for(var i=1; i<merges.length; i++){
	                $(this).datagrid('mergeCells',{
	                    index: merges[i].index,
	                    field: 'nation',
	                    rowspan: merges[i].rowspan
	                });
	            }
	      	}
		});

		$('#masterGrid8').datagrid({
			title			: 'Export Buyer',
			width			: '100%',
			height			: '370px',
			singleSelect	: true,
			fitColumns		: true,
			columns			: [[
                {field:'nation',title:'Nation',width:80,align:'center'},
                {field:'company',title:'Buyer',width:400},
                {field:'singoCnt',title:'Total declarations',width:80,align:'right',formatter:linkNumberFormatter0}
	        ]],
	        rowStyler		: function(index,row){
                if(row.nation == "Total"){
                    return 'background-color:#ffdee1;';
                }
            },
	        onLoadSuccess	: function(){
	        	var sum  = 0;
	        	var sum1 = 0;
	        	var rows = $('#masterGrid8').datagrid('getRows');
	        	for(var i=0; i<rows.length; i++){
	        		if(rows[i]['singoCnt']==null){
	        			sum += 0;
	        		}else{
	        			sum += rows[i]['singoCnt'];
	        		}
	        	}
	        	$('#masterGrid8').datagrid('insertRow',{index:0,row:{'nation':'Total','singoCnt':sum}});

	        	var aaa  = '';
	        	var j = 0;
	        	var k = 1;
	        	var merges = [];
	        	for(var i=1; i<rows.length; i++){
	        		if(aaa == rows[i].nation){
	            		k++;
	            		if(i==rows.length-1){
	            			merges.push({index:j,rowspan:k});
	            		}
	            	}else{
	            		merges.push({index:j,rowspan:k});
	            		j = i;
	            		k = 1;
	            	}
	            	aaa = rows[i].nation;
	        	}

	            for(var i=1; i<merges.length; i++){
	                $(this).datagrid('mergeCells',{
	                    index: merges[i].index,
	                    field: 'nation',
	                    rowspan: merges[i].rowspan
	                });
	            }
	      	}
		});


		if(($('#USERGRADE').val()=="A" || $('#USERGRADE').val()=="B") && isEmpty($('#taxNum').val())){
			var select = "<select id='_defaultDB' name='_defaultDB' style='width:100px' onchange='fn_searchAction()'>"
				+ "<option value='all'>전체</option>"
				+ "<option value='ncustoms' selected>본사1</option>"
				+ "<option value='ncustoms_sel4'>본사2</option>"
				+ "<option value='ncustoms_sn'>경기지사</option>"
				+ "<option value='ncustoms_gm'>구미지사</option>"
				+ "<option value='ncustoms_dj'>대전지사</option>"
				+ "<option value='ncustoms_bs'>부산지사</option>"
				+ "<option value='ncustoms_ay'>안양지사</option>"
				+ "<option value='ncustoms_ys'>여수지사</option>"
				+ "<option value='ncustoms_us'>울산지사</option>"
				+ "<option value='ncustoms_yj'>인천항공</option>"
				+ "<option value='ncustoms_ic'>인천해상</option>"
				+ "<option value='ncustoms_jj'>진주지사</option>"
				+ "<option value='ncustoms_cw'>창원지사</option>"
				+ "<option value='ncustoms_ca'>천안지사</option>"
				+ "<option value='ncustoms_cj'>청주지사</option>"
				+ "<option value='ncustoms_pj'>파주지사</option>"
				+ "<option value='ncustoms_pt'>평택지사</option>"
				+ "</select>";

			$('#jisa').html(select);
		}else{
			$('#jisa').html("<input type='hidden' id='_defaultDB' 	name='_defaultDB'>")
			if($('#ID').val()=="156"){
				$('#_defaultDB').val("ncustoms_pt");
			}else{
				$('#_defaultDB').val($('#defaultDB').val());
			}
		}

		$('#tabs').tabs({
		    onSelect : function(title, index){
				var tab = $('#tabs').tabs('getSelected');
				var hest = $('#tabs').tabs('getTabIndex',tab);
				if(hest == 0){
					selectImportSummaryTab1List();
				}else if(hest == 1){
					selectImportSummaryTab2List();
				}else if(hest == 2){
					selectImportSummaryTab3List();
				}else if(hest == 3){
					selectImportSummaryTab8List();
				}else if(hest == 4){
					selectImportSummaryTab4List();
				}else if(hest == 5){
					selectImportSummaryTab5List();
				}else if(hest == 6){
					selectImportSummaryTab6List();
				}else if(hest == 7){
					selectImportSummaryTab7List();
				}else if(hest == 8){
					selectImportSummaryTab9List();
				}
		    }
		});
	});
	setTimeout(function(){
		selectImportSummaryTab1List();
	},100);
});

function fn_searchAction(){
	var tab = $('#tabs').tabs('getSelected');
	var hest = $('#tabs').tabs('getTabIndex',tab);
	console.log(hest);
	if(hest == 0){
		selectImportSummaryTab1List();
	}else if(hest == 1){
		selectImportSummaryTab2List();
	}else if(hest == 2){
		selectImportSummaryTab3List();
	}else if(hest == 3){
		selectImportSummaryTab8List();
	}else if(hest == 4){
		selectImportSummaryTab4List();
	}else if(hest == 5){
		selectImportSummaryTab5List();
	}else if(hest == 6){
		selectImportSummaryTab6List();
	}else if(hest == 7){
		selectImportSummaryTab7List();
	}else if(hest == 8){
		selectImportSummaryTab9List();
	}
}