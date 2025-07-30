var grid;
var columns = [
               {id: "수리일", name: "수리일", field: "DECL_CMPL_DT1"},
               {id: "화주", name: "화주", field: "OWN_GODS_NM"}
             ];

 var options = {
		 rowHeight: 64,
		    editable: false,
		    enableAddRow: false,
		    enableCellNavigation: false
 };


function selectExpoStatisticItemList(){
	var url 	= "../apis/edwards/selectExpoStatisticItemList",
		params 	= {
			"FROM_DT" 				: '20200101',
			"TO_DT" 				: '20200420',
			"expo_gumaeja_sangho"	: $('#expo_gumaeja_sangho').val(),
			"expo_singo_no" 		: $('#expo_singo_no').val(),
			"expo_whaju_sangho" 	: $('#expo_whaju_sangho').val(),
			"invoiceNo" 			: $('#invoiceNo').val(),
			"exlan_hs" 				: $('#exlan_hs').val(),
			"exlan_lan" 			: $('#exlan_lan').val(),
			"expum_jepum_code" 		: $('#expum_jepum_code').val()
		},
		type 	= "POST";

	if($('#expo_gumaeja_sangho').val() != "" || $('#expo_singo_no').val() != "" || $('#expo_whaju_sangho').val() != "" || $('#invoiceNo').val() != "" || $('#exlan_hs').val() != "" || $('#exlan_lan').val() != ""  || $('#expum_jepum_code').val() != ""){
		params["allDate"] = "Y";
	}else{
		params["allDate"] = "";
	}

	sendAjax(url, params, type, function(d){
		grid = new Slick.Grid("#myGrid", d, columns, options);
	});
}

$(document).ready(function(){
		if($('#tabCheck').val()==''){
			$('#tabs').tabs('select',0);
		}

         var loadingIndicator = null;

         var jsonReturn;
         function getJsonP(resp) {
             jsonReturn = resp;
             return true;
         }




		$('#tabs').tabs({
		    onSelect : function(title, index){
				var tab = $('#tabs').tabs('getSelected');
				var hest = $('#tabs').tabs('getTabIndex',tab);
				if(hest == 0){
					selectExpoStatisticItemList();
				}
		    }
		});

		fn_searchAction();

         $(function () {
//        	 grid = new Slick.Grid("#myGrid", loader.data, columns, options);

        	 grid.onViewportChanged.subscribe(function (e, args) {
        	      var vp = grid.getViewport();
        	      loader.ensureData(vp.top, vp.bottom);
        	    });

        	    grid.onSort.subscribe(function (e, args) {
        	      loader.setSort(args.sortCol.field, args.sortAsc ? 1 : -1);
        	      var vp = grid.getViewport();
        	      loader.ensureData(vp.top, vp.bottom);
        	    });

        	    grid.setSortColumn("pubDate", false);

        	    grid.onViewportChanged.notify();
         })
});

var fn_searchAction = function(){
	var tab 			= $('#tabs').tabs('getSelected');
	var hest 			= $('#tabs').tabs('getTabIndex',tab);

	if(hest == 0){
		selectExpoStatisticItemList();
	}
};