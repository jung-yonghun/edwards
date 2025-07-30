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
		success 	: function(d, textStatus, jqXHR){
			google.charts.load('current', {packages: ['corechart', 'line']});
			google.setOnLoadCallback(drawLineSingoCnt);

			console.log(d);

			function drawLineSingoCnt() {
				var data = new google.visualization.DataTable();
			    data.addColumn('string', '월');
			    data.addColumn('number', '건 ');
			    data.addColumn({type:'string', role:'annotation'});

			    for(var i=1;i < d.length; i++){
			    	data.addRows([[i+'월', d[i].singoCnt, d[i].singoCnt+'건']]);
			    }

			    var options = {
			    	fontName 	: 'Noto Sans KR',
				    fontSize	: 11,
				    chartArea	: {left : 70, width : '100%', height : '90%'},
		            tooltip		: {
		            	trigger : 'none'
		            },
		            lineWidth 	: 6,
		            legend		: {
		            	position  : 'none'
		            },
			    	hAxis : {
	    		        textStyle : {
	    		        	fontName : 'Noto Sans KR',
	    		        	fontSize : 13,
	    		        	color 	 : '#000',
	    		            bold 	 : true
	    		        }
			    	},
			    	vAxis : {
			    		format		 : '#,###건',
			    		textStyle : {
				        	fontName : 'Noto Sans KR',
				        	fontSize : 11,
				        	color 	 : '#666',
				            bold 	 : true
				        }
			    	},
			    	annotations: {
			    	    textStyle : {
			    	      fontName : 'Noto Sans KR',
			    	      fontSize : 12,
			    	      bold	   : true,
			    	      color	   : '#2763ba',
			    	      opacity  : 1
			    	    }
			    	},
		            series		: {
		                0: {lineDashStyle : [0, 0], color : '#2763ba'}
		            },
		            animation: {startup: true, duration: 500, easing: 'linear',}
			    };

			    var chart = new google.visualization.LineChart(document.getElementById('statisticsBarChart'));
			    chart.draw(data, options);
			}

			$('#masterGrid').datagrid('loadData', d);
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
		success 	: function(d, textStatus, jqXHR){
			google.charts.load('current', {packages: ['corechart', 'line']});
			google.setOnLoadCallback(drawLineAmtWon);

			console.log(d);

			function drawLineAmtWon() {
				var data = new google.visualization.DataTable();
			    data.addColumn('string', '월');
			    data.addColumn('number', '원 ');
			    data.addColumn({type:'string', role:'annotation'});

			    var maxDigit = d[1].amtWon.toString().length;
			    var maxMent = "";

			    for(var i=0;i < d.length; i++){
			    	if(maxDigit < d[i].amtWon.toString().length){
			    		maxDigit = d[i].amtWon.toString().length;
			    	}
			    }

			    if(maxDigit > 9){
			    	for(var i=1;i < d.length; i++){
				    	data.addRows([[i+'월', parseInt(d[i].amtWon/100000000), parseInt(d[i].amtWon/100000000)+'억']]);
				    }
			    	maxMent = '#,###억';
			    }else if(maxDigit > 6 && maxDigit < 10){
			    	for(var i=1;i < d.length; i++){
				    	data.addRows([[i+'월', parseInt(d[i].amtWon/1000000), parseInt(d[i].amtWon/1000000)+'백만']]);
				    }
			    	maxMent = '#,###백만';
			    }else{
			    	for(var i=1;i < d.length; i++){
				    	data.addRows([[i+'월', d[i].amtWon, d[i].amtWon+'원']]);
				    }
			    	maxMent = '#,###원';
			    }

			    var options = {
			    	fontName 	: 'Noto Sans KR',
				    fontSize	: 11,
				    chartArea	: {left : 70, width : '100%', height : '90%'},
		            tooltip		: {
		            	trigger : 'none'
		            },
		            lineWidth 	: 6,
		            legend		: {
		            	position  : 'none'
		            },
			    	hAxis : {
	    		        textStyle : {
	    		        	fontName : 'Noto Sans KR',
	    		        	fontSize : 13,
	    		        	color 	 : '#000',
	    		            bold 	 : true
	    		        }
			    	},
			    	vAxis : {
			    		format		 : maxMent,
			    		textStyle : {
				        	fontName : 'Noto Sans KR',
				        	fontSize : 11,
				        	color 	 : '#666',
				            bold 	 : true
				        }
			    	},
			    	annotations: {
			    	    textStyle : {
			    	      fontName : 'Noto Sans KR',
			    	      fontSize : 12,
			    	      bold	   : true,
			    	      color	   : '#2763ba',
			    	      opacity  : 1
			    	    }
			    	},
		            series		: {
		                0: {lineDashStyle : [0, 0], color : '#2763ba'}
		            },
		            animation: {startup: true, duration: 500, easing: 'linear',}
			    };

			    var chart = new google.visualization.LineChart(document.getElementById('statisticsBarChart1'));
			    chart.draw(data, options);
			}

			$('#masterGrid1').datagrid('loadData', d);
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
		success 	: function(d, textStatus, jqXHR){
			google.charts.load('current', {packages: ['corechart', 'line']});
			google.setOnLoadCallback(drawLineTotalTax);

			console.log(d);

			function drawLineTotalTax() {
				var data = new google.visualization.DataTable();
			    data.addColumn('string', '월');
			    data.addColumn('number', '원 ');
			    data.addColumn({type:'string', role:'annotation'});

			    var maxDigit = d[1].totalTax.toString().length;
			    var maxMent = "";

			    for(var i=0;i < d.length; i++){
			    	if(maxDigit < d[i].totalTax.toString().length){
			    		maxDigit = d[i].totalTax.toString().length;
			    	}
			    }

			    if(maxDigit > 9){
			    	for(var i=1;i < d.length; i++){
				    	data.addRows([[i+'월', parseInt(d[i].totalTax/100000000), parseInt(d[i].totalTax/100000000)+'억']]);
				    }
			    	maxMent = '#,###억';
			    }else if(maxDigit > 6 && maxDigit < 10){
			    	for(var i=1;i < d.length; i++){
				    	data.addRows([[i+'월', parseInt(d[i].totalTax/1000000), parseInt(d[i].totalTax/1000000)+'백만']]);
				    }
			    	maxMent = '#,###백만';
			    }else{
			    	for(var i=1;i < d.length; i++){
				    	data.addRows([[i+'월', d[i].totalTax, d[i].totalTax+'원']]);
				    }
			    	maxMent = '#,###원';
			    }

			    var options = {
			    	fontName 	: 'Noto Sans KR',
				    fontSize	: 11,
				    chartArea	: {left : 70, width : '100%', height : '90%'},
		            tooltip		: {
		            	trigger : 'none'
		            },
		            lineWidth 	: 6,
		            legend		: {
		            	position  : 'none'
		            },
			    	hAxis : {
	    		        textStyle : {
	    		        	fontName : 'Noto Sans KR',
	    		        	fontSize : 13,
	    		        	color 	 : '#000',
	    		            bold 	 : true
	    		        }
			    	},
			    	vAxis : {
			    		format		 : maxMent,
			    		textStyle : {
				        	fontName : 'Noto Sans KR',
				        	fontSize : 11,
				        	color 	 : '#666',
				            bold 	 : true
				        }
			    	},
			    	annotations: {
			    	    textStyle : {
			    	      fontName : 'Noto Sans KR',
			    	      fontSize : 12,
			    	      bold	   : true,
			    	      color	   : '#2763ba',
			    	      opacity  : 1
			    	    }
			    	},
		            series		: {
		                0: {lineDashStyle : [0, 0], color : '#2763ba'}
		            },
		            animation: {startup: true, duration: 500, easing: 'linear',}
			    };

			    var chart = new google.visualization.LineChart(document.getElementById('statisticsBarChart2'));
			    chart.draw(data, options);
			}

			$('#masterGrid2').datagrid('loadData', d);
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
		success 	: function(d, textStatus, jqXHR){
			google.charts.load('current', {packages: ['corechart', 'line']});
			google.setOnLoadCallback(drawLineSingoCnt);

			console.log(d);

			function drawLineSingoCnt() {
				var data = new google.visualization.DataTable();
			    data.addColumn('string', '월');
			    data.addColumn('number', '건 ');
			    data.addColumn({type:'string', role:'annotation'});

			    for(var i=1;i < d.length; i++){
			    	data.addRows([[i+'월', d[i].singoCnt, d[i].singoCnt+'건']]);
			    }

			    var options = {
			    	fontName 	: 'Noto Sans KR',
				    fontSize	: 11,
				    chartArea	: {left : 70, width : '100%', height : '90%'},
		            tooltip		: {
		            	trigger : 'none'
		            },
		            lineWidth 	: 6,
		            legend		: {
		            	position  : 'none'
		            },
			    	hAxis : {
	    		        textStyle : {
	    		        	fontName : 'Noto Sans KR',
	    		        	fontSize : 13,
	    		        	color 	 : '#000',
	    		            bold 	 : true
	    		        }
			    	},
			    	vAxis : {
			    		format		 : '#,###건',
			    		textStyle : {
				        	fontName : 'Noto Sans KR',
				        	fontSize : 11,
				        	color 	 : '#666',
				            bold 	 : true
				        }
			    	},
			    	annotations: {
			    	    textStyle : {
			    	      fontName : 'Noto Sans KR',
			    	      fontSize : 12,
			    	      bold	   : true,
			    	      color	   : '#2da490',
			    	      opacity  : 1
			    	    }
			    	},
		            series		: {
		                0: {lineDashStyle : [0, 0], color : '#2da490'}
		            },
		            animation: {startup: true, duration: 500, easing: 'linear',}
			    };

			    var chart = new google.visualization.LineChart(document.getElementById('statisticsBarChart3'));
			    chart.draw(data, options);
			}

			$('#masterGrid3').datagrid('loadData', d);
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
		success 	: function(d, textStatus, jqXHR){
			google.charts.load('current', {packages: ['corechart', 'line']});
			google.setOnLoadCallback(drawLineAmtWon);

			console.log(d);

			function drawLineAmtWon() {
				var data = new google.visualization.DataTable();
			    data.addColumn('string', '월');
			    data.addColumn('number', '원 ');
			    data.addColumn({type:'string', role:'annotation'});

			    var maxDigit = d[1].amtWon.toString().length;
			    var maxMent = "";

			    for(var i=0;i < d.length; i++){
			    	if(maxDigit < d[i].amtWon.toString().length){
			    		maxDigit = d[i].amtWon.toString().length;
			    	}
			    }

			    if(maxDigit > 9){
			    	for(var i=1;i < d.length; i++){
				    	data.addRows([[i+'월', parseInt(d[i].amtWon/100000000), parseInt(d[i].amtWon/100000000)+'억']]);
				    }
			    	maxMent = '#,###억';
			    }else if(maxDigit > 6 && maxDigit < 10){
			    	for(var i=1;i < d.length; i++){
				    	data.addRows([[i+'월', parseInt(d[i].amtWon/1000000), parseInt(d[i].amtWon/1000000)+'백만']]);
				    }
			    	maxMent = '#,###백만';
			    }else{
			    	for(var i=1;i < d.length; i++){
				    	data.addRows([[i+'월', d[i].amtWon, d[i].amtWon+'원']]);
				    }
			    	maxMent = '#,###원';
			    }

			    var options = {
			    	fontName 	: 'Noto Sans KR',
				    fontSize	: 11,
				    chartArea	: {left : 70, width : '100%', height : '90%'},
		            tooltip		: {
		            	trigger : 'none'
		            },
		            lineWidth 	: 6,
		            legend		: {
		            	position  : 'none'
		            },
			    	hAxis : {
	    		        textStyle : {
	    		        	fontName : 'Noto Sans KR',
	    		        	fontSize : 13,
	    		        	color 	 : '#000',
	    		            bold 	 : true
	    		        }
			    	},
			    	vAxis : {
			    		format		 : maxMent,
			    		textStyle : {
				        	fontName : 'Noto Sans KR',
				        	fontSize : 11,
				        	color 	 : '#666',
				            bold 	 : true
				        }
			    	},
			    	annotations: {
			    	    textStyle : {
			    	      fontName : 'Noto Sans KR',
			    	      fontSize : 12,
			    	      bold	   : true,
			    	      color	   : '#2da490',
			    	      opacity  : 1
			    	    }
			    	},
		            series		: {
		                0: {lineDashStyle : [0, 0], color : '#2da490'}
		            },
		            animation: {startup: true, duration: 500, easing: 'linear',}
			    };

			    var chart = new google.visualization.LineChart(document.getElementById('statisticsBarChart4'));
			    chart.draw(data, options);
			}

			$('#masterGrid4').datagrid('loadData', d);
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
		success 	: function(d, textStatus, jqXHR){
			google.charts.load('current', {packages: ['corechart', 'line']});
			google.setOnLoadCallback(drawLineSingoCnt);

			console.log(d);

			function drawLineSingoCnt() {
				var data = new google.visualization.DataTable();
			    data.addColumn('string', '월');
			    data.addColumn('number', '건 ');
			    data.addColumn({type:'string', role:'annotation'});

			    for(var i=1;i < d.length; i++){
			    	data.addRows([[i+'월', d[i].singoCnt, d[i].singoCnt+'건']]);
			    }

			    var options = {
			    	fontName 	: 'Noto Sans KR',
				    fontSize	: 11,
				    chartArea	: {left : 70, width : '100%', height : '90%'},
		            tooltip		: {
		            	trigger : 'none'
		            },
		            lineWidth 	: 6,
		            legend		: {
		            	position  : 'none'
		            },
			    	hAxis : {
	    		        textStyle : {
	    		        	fontName : 'Noto Sans KR',
	    		        	fontSize : 13,
	    		        	color 	 : '#000',
	    		            bold 	 : true
	    		        }
			    	},
			    	vAxis : {
			    		format		 : '#,###건',
			    		textStyle : {
				        	fontName : 'Noto Sans KR',
				        	fontSize : 11,
				        	color 	 : '#666',
				            bold 	 : true
				        }
			    	},
			    	annotations: {
			    	    textStyle : {
			    	      fontName : 'Noto Sans KR',
			    	      fontSize : 12,
			    	      bold	   : true,
			    	      color	   : '#2da490',
			    	      opacity  : 1
			    	    }
			    	},
		            series		: {
		                0: {lineDashStyle : [0, 0], color : '#2da490'}
		            },
		            animation: {startup: true, duration: 500, easing: 'linear',}
			    };

			    var chart = new google.visualization.LineChart(document.getElementById('statisticsBarChart5'));
			    chart.draw(data, options);
			}

			$('#masterGrid5').datagrid('loadData', d);
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
		success 	: function(d, textStatus, jqXHR){
			google.charts.load('current', {packages: ['corechart', 'line']});
			google.setOnLoadCallback(drawLineAmtWon);

			console.log(d);

			function drawLineAmtWon() {
				var data = new google.visualization.DataTable();
			    data.addColumn('string', '월');
			    data.addColumn('number', '원 ');
			    data.addColumn({type:'string', role:'annotation'});

			    var maxDigit = d[1].amtWon.toString().length;
			    var maxMent = "";

			    for(var i=0;i < d.length; i++){
			    	if(maxDigit < d[i].amtWon.toString().length){
			    		maxDigit = d[i].amtWon.toString().length;
			    	}
			    }

			    if(maxDigit > 9){
			    	for(var i=1;i < d.length; i++){
				    	data.addRows([[i+'월', parseInt(d[i].amtWon/100000000), parseInt(d[i].amtWon/100000000)+'억']]);
				    }
			    	maxMent = '#,###억';
			    }else if(maxDigit > 6 && maxDigit < 10){
			    	for(var i=1;i < d.length; i++){
				    	data.addRows([[i+'월', parseInt(d[i].amtWon/1000000), parseInt(d[i].amtWon/1000000)+'백만']]);
				    }
			    	maxMent = '#,###백만';
			    }else{
			    	for(var i=1;i < d.length; i++){
				    	data.addRows([[i+'월', d[i].amtWon, d[i].amtWon+'원']]);
				    }
			    	maxMent = '#,###원';
			    }

			    var options = {
			    	fontName 	: 'Noto Sans KR',
				    fontSize	: 11,
				    chartArea	: {left : 70, width : '100%', height : '90%'},
		            tooltip		: {
		            	trigger : 'none'
		            },
		            lineWidth 	: 6,
		            legend		: {
		            	position  : 'none'
		            },
			    	hAxis : {
	    		        textStyle : {
	    		        	fontName : 'Noto Sans KR',
	    		        	fontSize : 13,
	    		        	color 	 : '#000',
	    		            bold 	 : true
	    		        }
			    	},
			    	vAxis : {
			    		format		 : maxMent,
			    		textStyle : {
				        	fontName : 'Noto Sans KR',
				        	fontSize : 11,
				        	color 	 : '#666',
				            bold 	 : true
				        }
			    	},
			    	annotations: {
			    	    textStyle : {
			    	      fontName : 'Noto Sans KR',
			    	      fontSize : 12,
			    	      bold	   : true,
			    	      color	   : '#2da490',
			    	      opacity  : 1
			    	    }
			    	},
		            series		: {
		                0: {lineDashStyle : [0, 0], color : '#2da490'}
		            },
		            animation: {startup: true, duration: 500, easing: 'linear',}
			    };

			    var chart = new google.visualization.LineChart(document.getElementById('statisticsBarChart6'));
			    chart.draw(data, options);
			}

			$('#masterGrid6').datagrid('loadData', d);
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
			title			: '수입신고건수',
			width			: '100%',
			height			: '370px',
			singleSelect	: true,
			fitColumns		: true,
			columns			: [[
                {field:'mm',title:'월',width:50,align:'center'},
                {field:'singoCnt',title:'총신고건',width:80,align:'right',formatter:linkNumberFormatter0}
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
			title			: '수입실적',
			width			: '100%',
			height			: '370px',
			singleSelect	: true,
			fitColumns		: true,
			columns			: [[
                {field:'mm',title:'월',width:50,align:'center'},
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
			title			: '수입납세실적',
			width			: '100%',
			height			: '370px',
			singleSelect	: true,
			fitColumns		: true,
			columns			: [[
                {field:'mm',title:'월',width:50,align:'center'},
                {field:'totalTax',title:'총세액',width:100,align:'right',formatter:linkNumberFormatter0},
                {field:'gwanTax',title:'관세',width:100,align:'right',formatter:linkNumberFormatter0},
                {field:'vatTax',title:'부가세',width:100,align:'right',formatter:linkNumberFormatter0}
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
			title			: '수출신고건수',
			width			: '100%',
			height			: '370px',
			singleSelect	: true,
			fitColumns		: true,
			columns			: [[
                {field:'mm',title:'월',width:50,align:'center'},
                {field:'singoCnt',title:'총신고건',width:80,align:'right',formatter:linkNumberFormatter0}
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
			title			: '수출실적',
			width			: '100%',
			height			: '370px',
			singleSelect	: true,
			fitColumns		: true,
			columns			: [[
                {field:'mm',title:'월',width:50,align:'center'},
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
			title			: '수출반입신고건수',
			width			: '100%',
			height			: '370px',
			singleSelect	: true,
			fitColumns		: true,
			columns			: [[
                {field:'mm',title:'월',width:50,align:'center'},
                {field:'singoCnt',title:'총신고건',width:80,align:'right',formatter:linkNumberFormatter0}
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
			title			: '수출반입실적',
			width			: '100%',
			height			: '370px',
			singleSelect	: true,
			fitColumns		: true,
			columns			: [[
                {field:'mm',title:'월',width:50,align:'center'},
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
			title			: '수입무역거래처',
			width			: '100%',
			height			: '370px',
			singleSelect	: true,
			fitColumns		: true,
			columns			: [[
                {field:'nation',title:'국가',width:80,align:'center'},
                {field:'company',title:'상호',width:400},
                {field:'singoCnt',title:'총신고건',width:80,align:'right',formatter:linkNumberFormatter0}
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
			title			: '수출해외거래처',
			width			: '100%',
			height			: '370px',
			singleSelect	: true,
			fitColumns		: true,
			columns			: [[
                {field:'nation',title:'국가',width:80,align:'center'},
                {field:'company',title:'상호',width:400},
                {field:'singoCnt',title:'총신고건',width:80,align:'right',formatter:linkNumberFormatter0}
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