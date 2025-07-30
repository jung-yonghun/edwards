function sendAjax(url, params, type, callback){
	$.ajax({
		type 		: type,
		contentType : "application/json",
		dataType 	: 'json',
		url			: url,
		processData : true,
		cache 		: false,
		data 		: type.toLowerCase() == "get" ? params : JSON.stringify(params),
		success 	: function(returnValue){
			if(returnValue.success==false){
				console.log(returnValue);
				progress.hide();
				return -1;
			}
			callback(returnValue);
		},
		error : function(e){
			console.error("에러내용", e);
			alert("에러가 발생했습니다.\n관리자에게 문의하세요!!!");
			progress.hide();
			return -1;
		}
	});

	return 0;
};

function sendAjaxAll(url, params, type, callback){
	$.ajax({
		type 		: type,
		contentType : "application/json",
		dataType 	: 'json',
		url 		: url,
		processData : true,
		cache 		: false,
		async		: false,
		data 		: type.toLowerCase() == "get" ? params : JSON.stringify(params),
		success 	: function(returnValue){
			if(returnValue.success==false){
				console.log(returnValue);
				progress.hide();
				return -1;
			}
			callback(returnValue);
		},
		error : function(e){
			console.error("에러내용", e);
			alert("에러가 발생했습니다.\n관리자에게 문의하세요!!!");
			progress.hide();
			return -1;
		}
	});

	return 0;
};


function sendAjaxChart(type, params, url, target) {
	$.ajax({
        type: type,
        url: url,
        cache: false,
        contentType : "application/json",
		dataType : 'json',
        data : JSON.stringify(params),
        success: function(data, textStatus, jqXHR) {
          	//if (data.success==false) return -1;
	        var chartData = {
	          labels: [],
	          name: "",
	          datasets: [
	            {
	              label : "aaaa",
	              fillColor: "rgba(195,43,104,0.2)",
                  strokeColor: "rgba(195,43,104,1)",
                  pointColor: "rgba(195,43,104,1)",
                  pointStrokeColor: "#fff",
                  pointHighlightFill: "#fff",
                  pointHighlightStroke: "rgba(195,43,104,1)",
	              data: []
	            }
	          ]
	        };

	        for(var i=0;i <data.content.length;i++){
	        	chartData.labels.push(data.content[i].upvd_ok_date);
	        	chartData.datasets[0].data.push(data.content[i].upvd_UnitPrice);
	        }
//	        $.each(data, function(position, result) {
//	        	//console.log(result);
//                if (result.upvd_ok_date) {
//                	chartData.labels.push(result.upvd_ok_date);
//                } else {
//                	chartData.labels.push('');
//                }
//                chartData.datasets[0].data.push(result.upvd_UnitPrice);
//            });

	        var chartCanvas = $("#"+target).get(0).getContext("2d");
	        /*if(chartData.labels.length < 51){
	        	document.getElementById(target).style.width = '100%';
	        }else if(chartData.labels.length > 50 && chartData.labels.length < 101){
	        	document.getElementById(target).style.width = '200%';
	        }else{
	        	document.getElementById(target).style.width = '500%';
	        }*/
	        document.getElementById(target).style.width = chartData.labels.length*4+'%';

	        var chartOptions = {
	          //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
	          scaleBeginAtZero: false,
	          //Boolean - Whether grid lines are shown across the chart
	          scaleShowGridLines: true,
	          //String - Colour of the grid lines
	          scaleGridLineColor: "rgba(0,0,0,.05)",
	          //Number - Width of the grid lines
	          scaleGridLineWidth: 1,
	          //Boolean - Whether to show horizontal lines (except X axis)
	          scaleShowHorizontalLines: true,
	          //Boolean - Whether to show vertical lines (except Y axis)
	          scaleShowVerticalLines: true,
	          //Boolean - If there is a stroke on each bar
	          barShowStroke: true,
	          //Number - Pixel width of the bar stroke
	          barStrokeWidth: 2,
	          //Number - Spacing between each of the X value sets
	          barValueSpacing: 10,
	          //Number - Spacing between data sets within X values
	          barDatasetSpacing: 1,
	          // Boolean - Determines whether to draw tooltips on the canvas or not - attaches events to touchmove & mousemove
			  showTooltips: false,

		      onAnimationComplete: function(){
		    	  console.log(this.datasets[0]);
		          this.showTooltip(this.datasets[0].bars, true);
		      },
		      tooltipEvents: [],
	          //String - A legend template
	          //legendTemplate: "<ul class=\"<%=chartData.name.toLowerCase()%>-legend\"><% for (var i=0; i<chartData.datasets.length; i++){%><li><span style=\"background-color:<%=chartData.datasets[i].fillColor%>\"></span><%if(chartData.datasets[i].label){%><%=chartData.datasets[i].label%><%}%></li><%}%></ul>",
	          //legendTemplate: function(data) { return "<ul>LEGEND</ul>"; },
	          //Boolean - whether to make the chart responsive
	          responsive: false,
	          maintainAspectRatio: false,
	          tooltipTemplate: "<%= value %>",
	        };

	        chartOptions.datasetFill = false;
	        var mychart = new Chart(chartCanvas).Bar(chartData, chartOptions);

	        //document.getElementById('js-legend').innerHTML = chart.generateLegend();
        },
        error : function(e) {
        	console.error("에러내용", e);
			if (e.status == 500) {
				alert("관리자에게 문의하세요. [" + e.statusText + "]");
			} else if (e.status == 404) {
				alert("페이지를 찾을 수 없습니다. [" + e.statusText + "]");
			};
			//alert(e.responseText);
			return -1;
        },
        complete : function(d) {
			if (d.responseJSON.success == false) {
				console.error("complete", d.responseJSON);
				alert("관리자에게 문의하세요. [" + d.responseJSON.message + "," + d.responseJSON.code + "]");
				return -1;
			};
        }
	});

	return 0;
}

/**
 * 1.개요 : 공통 ajax Chart function - Line
 * 2.처리내용 :
 * @method : sendAjaxLineChart
 * @date : 2016. 08. 16.
 * @author : yhjung
 * @history
 *
 * @param type
 * @param params
 * @param url
 * @param resultObj
 * @returns {Number}
 */
function sendAjaxLineChart(type, params, url, target) {
	$.ajax({
        type: type,
        url: url,
        cache: false,
        contentType : "application/json",
		dataType : 'json',
        data : JSON.stringify(params),
        success: function(data, textStatus, jqXHR) {
        	//if (data.success==false) return -1;
	        var chartData = {
	          labels: [],
	          name: "",
	          datasets: [
	            {
	              label : "",
	              fillColor: "rgba(195,43,104,0.2)",
                  strokeColor: "rgba(195,43,104,1)",
                  pointColor: "rgba(195,43,104,1)",
                  pointStrokeColor: "#fff",
                  pointHighlightFill: "#fff",
                  pointHighlightStroke: "rgba(195,43,104,1)",
	              data: []
	            }
	          ]
	        };

	        for(var i=0;i <data.content.length;i++){
	        	chartData.labels.push(data.content[i].upvd_ok_date);
	        	chartData.datasets[0].data.push(data.content[i].upvd_UnitPrice);
	        }


//	        $.each(data, function(position, result) {
//                if (result.upvd_ok_date) {
//                	chartData.labels.push(result.upvd_ok_date);
//                } else {
//                	chartData.labels.push('');
//                }
//                chartData.datasets[0].data.push(result.upvd_UnitPrice);
//            });

	        Chart.defaults.global.tooltipFillColor = "rgba(0,0,0,.5)";

	        var chartCanvas = $("#"+target).get(0).getContext("2d");
	        /*if(chartData.labels.length < 51){
	        	document.getElementById(target).style.width = '100%';
	        }else if(chartData.labels.length > 50 && chartData.labels.length < 101){
	        	document.getElementById(target).style.width = '200%';
	        }else{
	        	document.getElementById(target).style.width = '500%';
	        }*/
	        document.getElementById(target).style.width = chartData.labels.length*4+'%';


	        var chartOptions = {
	          //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
	          scaleBeginAtZero: false,
	          //Boolean - Whether grid lines are shown across the chart
	          scaleShowGridLines: true,
	          //String - Colour of the grid lines
	          scaleGridLineColor: "rgba(0,0,0,.05)",
	          //Number - Width of the grid lines
	          scaleGridLineWidth: 1,
	          //Boolean - Whether to show horizontal lines (except X axis)
	          scaleShowHorizontalLines: true,
	          //Boolean - Whether to show vertical lines (except Y axis)
	          scaleShowVerticalLines: true,
	          // Boolean - Determines whether to draw tooltips on the canvas or not - attaches events to touchmove & mousemove
			  showTooltips: false,
			  tooltipTemplate: "<%= value %>",
		      onAnimationComplete: function(){
		    	console.log(this.datasets[0]);
		      	this.showTooltip(this.datasets[0].points, true);
		      },
		      tooltipEvents: [],
	          //String - A legend template
	          //legendTemplate: "<ul class=\"<%=chartData.name.toLowerCase()%>-legend\"><% for (var i=0; i<chartData.datasets.length; i++){%><li><span style=\"background-color:<%=chartData.datasets[i].fillColor%>\"></span><%if(chartData.datasets[i].label){%><%=chartData.datasets[i].label%><%}%></li><%}%></ul>",
	          //legendTemplate: function(data) { return "<ul>LEGEND</ul>"; },
	          //Boolean - whether to make the chart responsive
	          responsive: false,
	          maintainAspectRatio: true,
	          bezierCurve : false,
	        };

	        chartOptions.datasetFill = false;
	        var mychart = new Chart(chartCanvas).Line(chartData, chartOptions);

	        //document.getElementById('js-legend').innerHTML = chart.generateLegend();
        },
        error : function(e) {
        	console.error("에러내용", e);
			if (e.status == 500) {
				alert("관리자에게 문의하세요. [" + e.statusText + "]");
			} else if (e.status == 404) {
				alert("페이지를 찾을 수 없습니다. [" + e.statusText + "]");
			};
			//alert(e.responseText);
			return -1;
        },
        complete : function(d) {
			if (d.responseJSON.success == false) {
				console.error("complete", d.responseJSON);
				alert("관리자에게 문의하세요. [" + d.responseJSON.message + "," + d.responseJSON.code + "]");
				return -1;
			};
        }
	});

	return 0;
}


function sendAjaxImportChart(type, params, url, target) {
	$.ajax({
        type: type,
        url: url,
        cache: false,
        contentType : "application/json",
		dataType : 'json',
        data : JSON.stringify(params),
        success: function(data, textStatus, jqXHR) {
          	//if (data.success==false) return -1;
	        var chartData = {
	          labels: [],
	          name: "",
	          datasets: [
	            {
	              label : "aaaa",
	              fillColor: "rgba(195,43,104,0.2)",
                  strokeColor: "rgba(195,43,104,1)",
                  pointColor: "rgba(195,43,104,1)",
                  pointStrokeColor: "#fff",
                  pointHighlightFill: "#fff",
                  pointHighlightStroke: "rgba(195,43,104,1)",
	              data: []
	            }
	          ]
	        };

	        $.each(data, function(position, result) {
	        	//console.log(result);
                if (result.addDtm) {
                	chartData.labels.push(result.addDtm);
                } else {
                	chartData.labels.push('');
                }
                chartData.datasets[0].data.push(result.impumDanga);
            });

	        var chartCanvas = $("#"+target).get(0).getContext("2d");
	        /*if(chartData.labels.length < 51){
	        	document.getElementById(target).style.width = '100%';
	        }else if(chartData.labels.length > 50 && chartData.labels.length < 101){
	        	document.getElementById(target).style.width = '200%';
	        }else{
	        	document.getElementById(target).style.width = '500%';
	        }*/
	        document.getElementById(target).style.width = chartData.labels.length*4+'%';

	        var chartOptions = {
	          //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
	          scaleBeginAtZero: false,
	          //Boolean - Whether grid lines are shown across the chart
	          scaleShowGridLines: true,
	          //String - Colour of the grid lines
	          scaleGridLineColor: "rgba(0,0,0,.05)",
	          //Number - Width of the grid lines
	          scaleGridLineWidth: 1,
	          //Boolean - Whether to show horizontal lines (except X axis)
	          scaleShowHorizontalLines: true,
	          //Boolean - Whether to show vertical lines (except Y axis)
	          scaleShowVerticalLines: true,
	          //Boolean - If there is a stroke on each bar
	          barShowStroke: true,
	          //Number - Pixel width of the bar stroke
	          barStrokeWidth: 2,
	          //Number - Spacing between each of the X value sets
	          barValueSpacing: 10,
	          //Number - Spacing between data sets within X values
	          barDatasetSpacing: 1,
	          // Boolean - Determines whether to draw tooltips on the canvas or not - attaches events to touchmove & mousemove
			  showTooltips: false,

		      onAnimationComplete: function(){
		    	  console.log(this.datasets[0]);
		          this.showTooltip(this.datasets[0].bars, true);
		      },
		      tooltipEvents: [],
	          //String - A legend template
	          //legendTemplate: "<ul class=\"<%=chartData.name.toLowerCase()%>-legend\"><% for (var i=0; i<chartData.datasets.length; i++){%><li><span style=\"background-color:<%=chartData.datasets[i].fillColor%>\"></span><%if(chartData.datasets[i].label){%><%=chartData.datasets[i].label%><%}%></li><%}%></ul>",
	          //legendTemplate: function(data) { return "<ul>LEGEND</ul>"; },
	          //Boolean - whether to make the chart responsive
	          responsive: false,
	          maintainAspectRatio: false,
	          tooltipTemplate: "<%= value %>",
	        };

	        chartOptions.datasetFill = false;
	        var mychart = new Chart(chartCanvas).Bar(chartData, chartOptions);

	        //document.getElementById('js-legend').innerHTML = chart.generateLegend();
        },
        error : function(e) {
        	console.error("에러내용", e);
			if (e.status == 500) {
				alert("관리자에게 문의하세요. [" + e.statusText + "]");
			} else if (e.status == 404) {
				alert("페이지를 찾을 수 없습니다. [" + e.statusText + "]");
			};
			//alert(e.responseText);
			return -1;
        },
        complete : function(d) {
			if (d.responseJSON.success == false) {
				console.error("complete", d.responseJSON);
				alert("관리자에게 문의하세요. [" + d.responseJSON.message + "," + d.responseJSON.code + "]");
				return -1;
			};
        }
	});

	return 0;
}


function sendAjaxImportLineChart(type, params, url, target) {
	$.ajax({
        type: type,
        url: url,
        cache: false,
        contentType : "application/json",
		dataType : 'json',
        data : JSON.stringify(params),
        success: function(data, textStatus, jqXHR) {
        	//if (data.success==false) return -1;
	        var chartData = {
	          labels: [],
	          name: "",
	          datasets: [
	            {
	              label : "",
	              fillColor: "rgba(195,43,104,0.2)",
                  strokeColor: "rgba(195,43,104,1)",
                  pointColor: "rgba(195,43,104,1)",
                  pointStrokeColor: "#fff",
                  pointHighlightFill: "#fff",
                  pointHighlightStroke: "rgba(195,43,104,1)",
	              data: []
	            }
	          ]
	        };

	        $.each(data, function(position, result) {
                if (result.addDtm) {
                	chartData.labels.push(result.addDtm);
                } else {
                	chartData.labels.push('');
                }
                chartData.datasets[0].data.push(result.impumDanga);
            });

	        Chart.defaults.global.tooltipFillColor = "rgba(0,0,0,.5)";

	        var chartCanvas = $("#"+target).get(0).getContext("2d");
	        /*if(chartData.labels.length < 51){
	        	document.getElementById(target).style.width = '100%';
	        }else if(chartData.labels.length > 50 && chartData.labels.length < 101){
	        	document.getElementById(target).style.width = '200%';
	        }else{
	        	document.getElementById(target).style.width = '500%';
	        }*/
	        document.getElementById(target).style.width = chartData.labels.length*4+'%';


	        var chartOptions = {
	          //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
	          scaleBeginAtZero: false,
	          //Boolean - Whether grid lines are shown across the chart
	          scaleShowGridLines: true,
	          //String - Colour of the grid lines
	          scaleGridLineColor: "rgba(0,0,0,.05)",
	          //Number - Width of the grid lines
	          scaleGridLineWidth: 1,
	          //Boolean - Whether to show horizontal lines (except X axis)
	          scaleShowHorizontalLines: true,
	          //Boolean - Whether to show vertical lines (except Y axis)
	          scaleShowVerticalLines: true,
	          // Boolean - Determines whether to draw tooltips on the canvas or not - attaches events to touchmove & mousemove
			  showTooltips: false,
			  tooltipTemplate: "<%= value %>",
		      onAnimationComplete: function(){
		    	console.log(this.datasets[0]);
		      	this.showTooltip(this.datasets[0].points, true);
		      },
		      tooltipEvents: [],
	          //String - A legend template
	          //legendTemplate: "<ul class=\"<%=chartData.name.toLowerCase()%>-legend\"><% for (var i=0; i<chartData.datasets.length; i++){%><li><span style=\"background-color:<%=chartData.datasets[i].fillColor%>\"></span><%if(chartData.datasets[i].label){%><%=chartData.datasets[i].label%><%}%></li><%}%></ul>",
	          //legendTemplate: function(data) { return "<ul>LEGEND</ul>"; },
	          //Boolean - whether to make the chart responsive
	          responsive: false,
	          maintainAspectRatio: true,
	          bezierCurve : false,
	        };

	        chartOptions.datasetFill = false;
	        var mychart = new Chart(chartCanvas).Line(chartData, chartOptions);

	        //document.getElementById('js-legend').innerHTML = chart.generateLegend();
        },
        error : function(e) {
        	console.error("에러내용", e);
			if (e.status == 500) {
				alert("관리자에게 문의하세요. [" + e.statusText + "]");
			} else if (e.status == 404) {
				alert("페이지를 찾을 수 없습니다. [" + e.statusText + "]");
			};
			//alert(e.responseText);
			return -1;
        },
        complete : function(d) {
			if (d.responseJSON.success == false) {
				console.error("complete", d.responseJSON);
				alert("관리자에게 문의하세요. [" + d.responseJSON.message + "," + d.responseJSON.code + "]");
				return -1;
			};
        }
	});

	return 0;
}

function sendAjaxFiveChart(type, params, url, target) {
	$.ajax({
        type: type,
        url: url,
        cache: false,
        contentType : "application/json",
		dataType : 'json',
        data : JSON.stringify(params),
        success: function(data, textStatus, jqXHR) {
          	//if (data.success==false) return -1;
	        var chartData = {
	          labels: [],
	          name: "",
	          datasets: [
	            {
	              label : "aaaa",
	              fillColor: "rgba(195,43,104,0.2)",
                  strokeColor: "rgba(195,43,104,1)",
                  pointColor: "rgba(195,43,104,1)",
                  pointStrokeColor: "#fff",
                  pointHighlightFill: "#fff",
                  pointHighlightStroke: "rgba(195,43,104,1)",
	              data: []
	            }
	          ]
	        };

	        for(var i=0;i <data.content.length;i++){
	        	chartData.labels.push(data.content[i].yyyymmdd);
	        	chartData.datasets[0].data.push(data.content[i].itemUnitPrice);
	        }
//	        $.each(data, function(position, result) {
//	        	//console.log(result);
//                if (result.upvd_ok_date) {
//                	chartData.labels.push(result.upvd_ok_date);
//                } else {
//                	chartData.labels.push('');
//                }
//                chartData.datasets[0].data.push(result.upvd_UnitPrice);
//            });

	        var chartCanvas = $("#"+target).get(0).getContext("2d");
	        /*if(chartData.labels.length < 51){
	        	document.getElementById(target).style.width = '100%';
	        }else if(chartData.labels.length > 50 && chartData.labels.length < 101){
	        	document.getElementById(target).style.width = '200%';
	        }else{
	        	document.getElementById(target).style.width = '500%';
	        }*/
	        document.getElementById(target).style.width = chartData.labels.length*10+'%';

	        var chartOptions = {
	          //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
	          scaleBeginAtZero: false,
	          //Boolean - Whether grid lines are shown across the chart
	          scaleShowGridLines: true,
	          //String - Colour of the grid lines
	          scaleGridLineColor: "rgba(0,0,0,.05)",
	          //Number - Width of the grid lines
	          scaleGridLineWidth: 1,
	          //Boolean - Whether to show horizontal lines (except X axis)
	          scaleShowHorizontalLines: true,
	          //Boolean - Whether to show vertical lines (except Y axis)
	          scaleShowVerticalLines: true,
	          //Boolean - If there is a stroke on each bar
	          barShowStroke: true,
	          //Number - Pixel width of the bar stroke
	          barStrokeWidth: 2,
	          //Number - Spacing between each of the X value sets
	          barValueSpacing: 10,
	          //Number - Spacing between data sets within X values
	          barDatasetSpacing: 1,
	          // Boolean - Determines whether to draw tooltips on the canvas or not - attaches events to touchmove & mousemove
			  showTooltips: false,

		      onAnimationComplete: function(){
		    	  console.log(this.datasets[0]);
		          this.showTooltip(this.datasets[0].bars, true);
		      },
		      tooltipEvents: [],
	          //String - A legend template
	          //legendTemplate: "<ul class=\"<%=chartData.name.toLowerCase()%>-legend\"><% for (var i=0; i<chartData.datasets.length; i++){%><li><span style=\"background-color:<%=chartData.datasets[i].fillColor%>\"></span><%if(chartData.datasets[i].label){%><%=chartData.datasets[i].label%><%}%></li><%}%></ul>",
	          //legendTemplate: function(data) { return "<ul>LEGEND</ul>"; },
	          //Boolean - whether to make the chart responsive
	          responsive: false,
	          maintainAspectRatio: false,
	          tooltipTemplate: "<%= value %>",
	        };

	        chartOptions.datasetFill = false;
	        var mychart = new Chart(chartCanvas).Bar(chartData, chartOptions);

	        //document.getElementById('js-legend').innerHTML = chart.generateLegend();
        },
        error : function(e) {
        	console.error("에러내용", e);
			if (e.status == 500) {
				alert("관리자에게 문의하세요. [" + e.statusText + "]");
			} else if (e.status == 404) {
				alert("페이지를 찾을 수 없습니다. [" + e.statusText + "]");
			};
			//alert(e.responseText);
			return -1;
        },
        complete : function(d) {
			if (d.responseJSON.success == false) {
				console.error("complete", d.responseJSON);
				alert("관리자에게 문의하세요. [" + d.responseJSON.message + "," + d.responseJSON.code + "]");
				return -1;
			};
        }
	});

	return 0;
}

function sendAjaxFiveLineChart(type, params, url, target) {
	$.ajax({
        type: type,
        url: url,
        cache: false,
        contentType : "application/json",
		dataType : 'json',
        data : JSON.stringify(params),
        success: function(data, textStatus, jqXHR) {
        	//if (data.success==false) return -1;
	        var chartData = {
	          labels: [],
	          name: "",
	          datasets: [
	            {
	              label : "",
	              fillColor: "rgba(195,43,104,0.2)",
                  strokeColor: "rgba(195,43,104,1)",
                  pointColor: "rgba(195,43,104,1)",
                  pointStrokeColor: "#fff",
                  pointHighlightFill: "#fff",
                  pointHighlightStroke: "rgba(195,43,104,1)",
	              data: []
	            }
	          ]
	        };

	        for(var i=0;i <data.content.length;i++){
	        	chartData.labels.push(data.content[i].yyyymmdd);
	        	chartData.datasets[0].data.push(data.content[i].itemUnitPrice);
	        }


//	        $.each(data, function(position, result) {
//                if (result.upvd_ok_date) {
//                	chartData.labels.push(result.upvd_ok_date);
//                } else {
//                	chartData.labels.push('');
//                }
//                chartData.datasets[0].data.push(result.upvd_UnitPrice);
//            });

	        Chart.defaults.global.tooltipFillColor = "rgba(0,0,0,.5)";

	        var chartCanvas = $("#"+target).get(0).getContext("2d");
	        /*if(chartData.labels.length < 51){
	        	document.getElementById(target).style.width = '100%';
	        }else if(chartData.labels.length > 50 && chartData.labels.length < 101){
	        	document.getElementById(target).style.width = '200%';
	        }else{
	        	document.getElementById(target).style.width = '500%';
	        }*/
	        document.getElementById(target).style.width = chartData.labels.length*10+'%';


	        var chartOptions = {
	          //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
	          scaleBeginAtZero: false,
	          //Boolean - Whether grid lines are shown across the chart
	          scaleShowGridLines: true,
	          //String - Colour of the grid lines
	          scaleGridLineColor: "rgba(0,0,0,.05)",
	          //Number - Width of the grid lines
	          scaleGridLineWidth: 1,
	          //Boolean - Whether to show horizontal lines (except X axis)
	          scaleShowHorizontalLines: true,
	          //Boolean - Whether to show vertical lines (except Y axis)
	          scaleShowVerticalLines: true,
	          // Boolean - Determines whether to draw tooltips on the canvas or not - attaches events to touchmove & mousemove
			  showTooltips: false,
			  tooltipTemplate: "<%= value %>",
		      onAnimationComplete: function(){
		    	console.log(this.datasets[0]);
		      	this.showTooltip(this.datasets[0].points, true);
		      },
		      tooltipEvents: [],
	          //String - A legend template
	          //legendTemplate: "<ul class=\"<%=chartData.name.toLowerCase()%>-legend\"><% for (var i=0; i<chartData.datasets.length; i++){%><li><span style=\"background-color:<%=chartData.datasets[i].fillColor%>\"></span><%if(chartData.datasets[i].label){%><%=chartData.datasets[i].label%><%}%></li><%}%></ul>",
	          //legendTemplate: function(data) { return "<ul>LEGEND</ul>"; },
	          //Boolean - whether to make the chart responsive
	          responsive: false,
	          maintainAspectRatio: true,
	          bezierCurve : false,
	        };

	        chartOptions.datasetFill = false;
	        var mychart = new Chart(chartCanvas).Line(chartData, chartOptions);

	        //document.getElementById('js-legend').innerHTML = chart.generateLegend();
        },
        error : function(e) {
        	console.error("에러내용", e);
			if (e.status == 500) {
				alert("관리자에게 문의하세요. [" + e.statusText + "]");
			} else if (e.status == 404) {
				alert("페이지를 찾을 수 없습니다. [" + e.statusText + "]");
			};
			//alert(e.responseText);
			return -1;
        },
        complete : function(d) {
			if (d.responseJSON.success == false) {
				console.error("complete", d.responseJSON);
				alert("관리자에게 문의하세요. [" + d.responseJSON.message + "," + d.responseJSON.code + "]");
				return -1;
			};
        }
	});

	return 0;
}

function sendAjaxViewChart(type, params, url, target) {
	$.ajax({
        type: type,
        url: url,
        cache: false,
        contentType : "application/json",
		dataType : 'json',
        data : JSON.stringify(params),
        success: function(data, textStatus, jqXHR) {
          	//if (data.success==false) return -1;
	        var chartData = {
	          labels: [],
	          name: "",
	          datasets: [
	            {
	              label : "aaaa",
	              fillColor: "rgba(195,43,104,0.2)",
                  strokeColor: "rgba(195,43,104,1)",
                  pointColor: "rgba(195,43,104,1)",
                  pointStrokeColor: "#fff",
                  pointHighlightFill: "#fff",
                  pointHighlightStroke: "rgba(195,43,104,1)",
	              data: []
	            }
	          ]
	        };

	        if(data.content.length < 15){
	        	for(var i=0;i < data.content.length;i++){
		        	chartData.labels.push(data.content[i].upvd_ok_date);
		        	chartData.datasets[0].data.push(data.content[i].upvd_UnitPrice);
		        }
	        }else{
	        	for(var i=0;i <15;i++){
		        	chartData.labels.push(data.content[i].upvd_ok_date);
		        	chartData.datasets[0].data.push(data.content[i].upvd_UnitPrice);
		        }
	        }

//	        $.each(data, function(position, result) {
//	        	//console.log(result);
//                if (result.upvd_ok_date) {
//                	chartData.labels.push(result.upvd_ok_date);
//                } else {
//                	chartData.labels.push('');
//                }
//                chartData.datasets[0].data.push(result.upvd_UnitPrice);
//            });

	        var chartCanvas = $("#"+target).get(0).getContext("2d");
	        /*if(chartData.labels.length < 51){
	        	document.getElementById(target).style.width = '100%';
	        }else if(chartData.labels.length > 50 && chartData.labels.length < 101){
	        	document.getElementById(target).style.width = '200%';
	        }else{
	        	document.getElementById(target).style.width = '500%';
	        }*/
	        document.getElementById(target).style.width = chartData.labels.length*6.6+'%';

	        var chartOptions = {
	          //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
	          scaleBeginAtZero: false,
	          //Boolean - Whether grid lines are shown across the chart
	          scaleShowGridLines: true,
	          //String - Colour of the grid lines
	          scaleGridLineColor: "rgba(0,0,0,.05)",
	          //Number - Width of the grid lines
	          scaleGridLineWidth: 1,
	          //Boolean - Whether to show horizontal lines (except X axis)
	          scaleShowHorizontalLines: true,
	          //Boolean - Whether to show vertical lines (except Y axis)
	          scaleShowVerticalLines: true,
	          //Boolean - If there is a stroke on each bar
	          barShowStroke: true,
	          //Number - Pixel width of the bar stroke
	          barStrokeWidth: 2,
	          //Number - Spacing between each of the X value sets
	          barValueSpacing: 10,
	          //Number - Spacing between data sets within X values
	          barDatasetSpacing: 1,
	          // Boolean - Determines whether to draw tooltips on the canvas or not - attaches events to touchmove & mousemove
			  showTooltips: false,

		      onAnimationComplete: function(){
		    	  console.log(this.datasets[0]);
		          this.showTooltip(this.datasets[0].bars, true);
		      },
		      tooltipEvents: [],
	          //String - A legend template
	          //legendTemplate: "<ul class=\"<%=chartData.name.toLowerCase()%>-legend\"><% for (var i=0; i<chartData.datasets.length; i++){%><li><span style=\"background-color:<%=chartData.datasets[i].fillColor%>\"></span><%if(chartData.datasets[i].label){%><%=chartData.datasets[i].label%><%}%></li><%}%></ul>",
	          //legendTemplate: function(data) { return "<ul>LEGEND</ul>"; },
	          //Boolean - whether to make the chart responsive
	          responsive: false,
	          maintainAspectRatio: false,
	          tooltipTemplate: "<%= value %>",
	        };

	        chartOptions.datasetFill = false;
	        var mychart = new Chart(chartCanvas).Bar(chartData, chartOptions);

	        //document.getElementById('js-legend').innerHTML = chart.generateLegend();
        },
        error : function(e) {
        	console.error("에러내용", e);
			if (e.status == 500) {
				alert("관리자에게 문의하세요. [" + e.statusText + "]");
			} else if (e.status == 404) {
				alert("페이지를 찾을 수 없습니다. [" + e.statusText + "]");
			};
			//alert(e.responseText);
			return -1;
        },
        complete : function(d) {
			if (d.responseJSON.success == false) {
				console.error("complete", d.responseJSON);
				alert("관리자에게 문의하세요. [" + d.responseJSON.message + "," + d.responseJSON.code + "]");
				return -1;
			};
        }
	});

	return 0;
}

function sendAjaxViewLineChart(type, params, url, target) {
	$.ajax({
        type: type,
        url: url,
        cache: false,
        contentType : "application/json",
		dataType : 'json',
        data : JSON.stringify(params),
        success: function(data, textStatus, jqXHR) {
        	//if (data.success==false) return -1;
	        var chartData = {
	          labels: [],
	          name: "",
	          datasets: [
	            {
	              label : "",
	              fillColor: "rgba(195,43,104,0.2)",
                  strokeColor: "rgba(195,43,104,1)",
                  pointColor: "rgba(195,43,104,1)",
                  pointStrokeColor: "#fff",
                  pointHighlightFill: "#fff",
                  pointHighlightStroke: "rgba(195,43,104,1)",
	              data: []
	            }
	          ]
	        };

	        if(data.content.length < 15){
	        	for(var i=0;i < data.content.length;i++){
		        	chartData.labels.push(data.content[i].upvd_ok_date);
		        	chartData.datasets[0].data.push(data.content[i].upvd_UnitPrice);
		        }
	        }else{
	        	for(var i=0;i <15;i++){
		        	chartData.labels.push(data.content[i].upvd_ok_date);
		        	chartData.datasets[0].data.push(data.content[i].upvd_UnitPrice);
		        }
	        }

//	        $.each(data, function(position, result) {
//                if (result.upvd_ok_date) {
//                	chartData.labels.push(result.upvd_ok_date);
//                } else {
//                	chartData.labels.push('');
//                }
//                chartData.datasets[0].data.push(result.upvd_UnitPrice);
//            });

	        Chart.defaults.global.tooltipFillColor = "rgba(0,0,0,.5)";

	        var chartCanvas = $("#"+target).get(0).getContext("2d");
	        /*if(chartData.labels.length < 51){
	        	document.getElementById(target).style.width = '100%';
	        }else if(chartData.labels.length > 50 && chartData.labels.length < 101){
	        	document.getElementById(target).style.width = '200%';
	        }else{
	        	document.getElementById(target).style.width = '500%';
	        }*/
	        document.getElementById(target).style.width = chartData.labels.length*6.6+'%';


	        var chartOptions = {
	          //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
	          scaleBeginAtZero: false,
	          //Boolean - Whether grid lines are shown across the chart
	          scaleShowGridLines: true,
	          //String - Colour of the grid lines
	          scaleGridLineColor: "rgba(0,0,0,.05)",
	          //Number - Width of the grid lines
	          scaleGridLineWidth: 1,
	          //Boolean - Whether to show horizontal lines (except X axis)
	          scaleShowHorizontalLines: true,
	          //Boolean - Whether to show vertical lines (except Y axis)
	          scaleShowVerticalLines: true,
	          // Boolean - Determines whether to draw tooltips on the canvas or not - attaches events to touchmove & mousemove
			  showTooltips: false,
			  tooltipTemplate: "<%= value %>",
		      onAnimationComplete: function(){
		    	console.log(this.datasets[0]);
		      	this.showTooltip(this.datasets[0].points, true);
		      },
		      tooltipEvents: [],
	          //String - A legend template
	          //legendTemplate: "<ul class=\"<%=chartData.name.toLowerCase()%>-legend\"><% for (var i=0; i<chartData.datasets.length; i++){%><li><span style=\"background-color:<%=chartData.datasets[i].fillColor%>\"></span><%if(chartData.datasets[i].label){%><%=chartData.datasets[i].label%><%}%></li><%}%></ul>",
	          //legendTemplate: function(data) { return "<ul>LEGEND</ul>"; },
	          //Boolean - whether to make the chart responsive
	          responsive: false,
	          maintainAspectRatio: true,
	          bezierCurve : false,
	        };

	        chartOptions.datasetFill = false;
	        var mychart = new Chart(chartCanvas).Line(chartData, chartOptions);

	        //document.getElementById('js-legend').innerHTML = chart.generateLegend();
        },
        error : function(e) {
        	console.error("에러내용", e);
			if (e.status == 500) {
				alert("관리자에게 문의하세요. [" + e.statusText + "]");
			} else if (e.status == 404) {
				alert("페이지를 찾을 수 없습니다. [" + e.statusText + "]");
			};
			//alert(e.responseText);
			return -1;
        },
        complete : function(d) {
			if (d.responseJSON.success == false) {
				console.error("complete", d.responseJSON);
				alert("관리자에게 문의하세요. [" + d.responseJSON.message + "," + d.responseJSON.code + "]");
				return -1;
			};
        }
	});

	return 0;
}