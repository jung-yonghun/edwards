function selectCostList(){
    progress.show();
    var url 	= "../apis/customs/selectAccountBillStatementOfAccountsList1",
        params 	= {
            "workNm"		: $('#WORK_NM').val(),
            "singoNo"		: $('#singoNo').val(),
            "singoDt"		: $('#singoDt').val(),
            "page"			: "0",
            "size"			: "10000",
            "_pageNumber"	: 0,
            "_pageRow"		: "100000"
        },
        type 	= "POST";

    sendAjax(url, params, type, function(d){
        if (d.length != 1){
            $('#TITLE_NM').html("자금청구서 ("+$('#WORK_NM').val()+")");
            alert("회계 정산 출력 자료가 없습니다.");
            window.close();
            return;
        }
        progress.hide();
        $('#TITLE_NM').html("자금청구서 ("+$('#WORK_NM').val()+")");
        $('#ADJ_COM_NM').html(d[0].ADJ_COM_NM);
        $('#SUP_COM_NM').html(d[0].SUP_COM_NM);
        $('#RECV_COM_BIZ_NO').html(d[0].RECV_COM_BIZ_NO);
        $('#RECV_COM_MEM_NM').html(d[0].RECV_COM_MEM_NM);
        $('#SUP_COM_BIZ_NO').html(d[0].SUP_COM_BIZ_NO.substr(0, 3) + "-" + d[0].SUP_COM_BIZ_NO.substr(3, 2) + "-" + d[0].SUP_COM_BIZ_NO.substr(5, 5));
        $('#WRITE_DT').html(d[0].WRITE_DT.substr(0, 4) + "-" + d[0].WRITE_DT.substr(4, 2) + "-" + d[0].WRITE_DT.substr(6, 2));
        $('#RECV_COM_TEL_NO').html(d[0].RECV_COM_TEL_NO);
        $('#RECV_COM_FAX_NO').html(d[0].RECV_COM_FAX_NO);
        $('#TG_MEM_NM').html(d[0].TG_MEM_NM);
        $('#TG_TEL_NO').html(d[0].TG_TEL_NO);
        $('#TG_FAX_NO').html(d[0].TG_FAX_NO);
        $('#RECV_COM_NM').html(d[0].RECV_COM_NM);
        $('#ADJ_MEM_NM').html(d[0].REQ_DOC_ADJ_MEM_NM);
        $('#ADJ_TEL_NO').html(d[0].ADJ_TEL_NO);
        $('#ADJ_FAX_NO').html(d[0].ADJ_FAX_NO);
        $('#RECV_COM_ADDR').html(d[0].RECV_COM_ADDR);
        $('#SUP_JIRO_ADDR').html(d[0].SUP_JIRO_ADDR);

        $('#ARRIVE_DT').html(d[0].ARRIVE_DT.substr(0, 4) + "-" + d[0].ARRIVE_DT.substr(4, 2) + "-" + d[0].ARRIVE_DT.substr(6, 2));
        $('#SINGO_NO').html(d[0].CUS_BUHO + "-" + d[0].SINGO_YEAR.substr(2, 2) + "-" + d[0].SINGO_NO);
        $('#GAMGA_EK').html($.number(d[0].GAMGA_EK, 0));
        $('#SINGO_DT').html(d[0].SINGO_DT.substr(0, 4) + "-" + d[0].SINGO_DT.substr(4, 2) + "-" + d[0].SINGO_DT.substr(6, 2));
        $('#HAWB').html(d[0].HAWB);
        $('#SINGO_EK').html($.number(d[0].SINGO_EK, 0));
        $('#SURI_DT').html(d[0].SURI_DT.substr(0, 4) + "-" + d[0].SURI_DT.substr(4, 2) + "-" + d[0].SURI_DT.substr(6, 2));
        $('#DEAL_PUM_NM').html(d[0].DEAL_PUM_NM);
        $('#EXCH_RATE').html($.number(d[0].EXCH_RATE, 4));
        $('#TOT_QT').html(d[0].TOT_QT);
        $('#QT_UNIT').html(d[0].QT_UNIT);
        $('#WH_NM').html(d[0].WH_NM);
        $('#PAY_METHOD').html(d[0].PAY_METHOD);
        $('#MONEY_CD').html(d[0].MONEY_CD);
        $('#TOT_WT').html(d[0].TOT_WT);
        $('#WT_UNIT').html(d[0].WT_UNIT);
        $('#SUPLY_NM').html(d[0].SUPLY_NM);
        $('#MONEY_EK').html($.number(d[0].MONEY_EK, 2));
        $('#FILE_NO1').html(d[0].FILE_NO1);
        $('#FILE_NO2').html(d[0].FILE_NO2);
        $('#TOT_TAX_EK').html($.number(d[0].TOT_TAX_EK, 0));

        $('#SUM_EK').html($.number(d[0].SUM_EK, 0));
        $('#PRE_JAN_EK').html($.number(d[0].PRE_JAN_EK, 0));
        $('#MISU_EK').html($.number(d[0].MISU_EK, 0));
        $('#REQ_EK').html($.number(d[0].REQ_DOC_REQ_EK, 0));
        $('#REQ_EK_NOTE').html(d[0].REQ_EK_NOTE);
        $('#SEND_JAN_EK').html($.number(d[0].SEND_JAN_EK, 0));
        $('#JAN_EK').html($.number(d[0].JAN_EK, 0));

        var CMS_NO;
        if (d[0].CMS_NO == null || d[0].CMS_NO == ""){
            CMS_NO = "";
        }else{
            CMS_NO = ", " + d[0].CMS_NO.substr(0, 3) + "-" + d[0].CMS_NO.substr(3, 3) + "-" + d[0].CMS_NO.substr(6, 3) + "-" + d[0].CMS_NO.substr(9, 5);
        }

        $('#BANK_NM').html(d[0].BANK_NM + "" + CMS_NO);
        $('#ADJ_GROUP_NO').html(d[0].ADJ_GROUP_NO+"-"+d[0].ADJ_NO);

        var url 	= "../apis/customs/selectAccountBillStatementOfAccountsDetailList1",
            params 	= {
        		"singoNo"		: $('#singoNo').val(),
                "singoDt"		: $('#singoDt').val(),
                "page"			: "0",
                "size"			: "10000",
                "_pageNumber"	: 0,
                "_pageRow"		: "100000"
            },
            type 	= "POST";

        sendAjax(url, params, type, function(d){
        	console.log(d);
            var optList = new Array();
            var ADJ_NOTE;
            for(var j = 0; j < d.length; j++){
                if(d[j].ADJ_NOTE == null || d[j].ADJ_NOTE == "" || d[j].ADJ_NOTE == undefined){
                    ADJ_NOTE = "";
                }else{
                    ADJ_NOTE = d[j].ADJ_NOTE;
                }
                optList[j] = "<tr height='30px'>" +
                    "<td colspan='2' style='border-top:1px #000000 solid;border-left:2px #000000 solid;border-right:1px #000000 solid;padding:5px'>" + d[j].ADJ_NM + "</td>" +
                    "<td style='border-top:1px #000000 solid;border-right:1px #000000 solid;padding:5px' align='right'>" + $.number(d[j].SUP_EK, 0) + "</td>" +
                    "<td style='border-top:1px #000000 solid;border-right:1px #000000 solid;padding:5px' align='right'>" + $.number(d[j].TAX_EK, 0) + "</td>" +
                    "<td style='border-top:1px #000000 solid;border-right:1px #000000 solid;padding:5px' align='right'>" + $.number(d[j].SUM_EK, 0) + "</td>" +
                    "<td colspan='3' style='border-top:1px #000000 solid;border-right:2px #000000 solid;padding:5px'>" + ADJ_NOTE + "</td>" +
                    "</tr>";
            }
            $("#cost_detail").html(optList.join("\n"));
        });

        setTimeout(function(){
            window.print();
        }, 800);

    });
}

$(document).ready(function(){
    selectCostList();
});