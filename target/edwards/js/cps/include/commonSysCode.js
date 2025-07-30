function selectSysCodeList(params, callback){
	var mcd = "";
	if($('#mcd').val()=="CNTY_CD1" || $('#mcd').val()=="CNTY_CD2" || $('#mcd').val()=="CNTY_CD3" || $('#mcd').val()=="CNTY_CD4" || $('#mcd').val()=="CNTY_CD5" || $('#mcd').val()=="CNTY_CD6" || $('#mcd').val()=="CNTY_CD7"){
		mcd = "CNTY_CD"
	}else if($('#mcd').val()=="CURR_CD1" || $('#mcd').val()=="CURR_CD2" || $('#mcd').val()=="CURR_CD3" || $('#mcd').val()=="CURR_CD4" || $('#mcd').val()=="CURR_CD5" || $('#mcd').val()=="CURR_CD6" || $('#mcd').val()=="CURR_CD7" || $('#mcd').val()=="CURR_CD8"){
		mcd = "CURR_CD"
	}else if($('#mcd').val()=="DLCN_CD1" || $('#mcd').val()=="DLCN_CD2"){
		mcd = "DLCN_CD"
	}else if($('#mcd').val()=="ADD_MINUS_DCLR_CD1"){
		mcd = "ADD_MINUS_DCLR_CD"
	}else if($('#mcd').val()=="MODEL_QTY_UT_CD1" || $('#mcd').val()=="MODEL_QTY_UT_CD2"){
		mcd = "MODEL_QTY_UT_CD"
	}else{
		mcd = $('#mcd').val();
	}

	var url 	= "../apis/cmmnCode/selectSysCodeList",
		params 	= {"mcd":mcd, "size":"5000"},
		type 	= "POST";

	sendAjax(url, params, type, function(d){
		console.log(d);
		$('#masterGrid').datagrid('loadData', d.content);
	});
}

$(document).ready(function(){
	var caption = "";
	if($('#mcd').val()=="BRND_CD"){
		caption = "상표코드조회(통관)";
	}else if($('#mcd').val()=="DLCN_CD" || $('#mcd').val()=="DLCN_CD1" || $('#mcd').val()=="DLCN_CD2"){
		caption = "인도조건  코드조회(통관)";
	}else if($('#mcd').val()=="CURR_CD" || $('#mcd').val()=="CURR_CD1" || $('#mcd').val()=="CURR_CD2" || $('#mcd').val()=="CURR_CD3"  || $('#mcd').val()=="CURR_CD4" || $('#mcd').val()=="CURR_CD5" || $('#mcd').val()=="CURR_CD6" || $('#mcd').val()=="CURR_CD7" || $('#mcd').val()=="CURR_CD8"){
		caption = "통화  코드조회(통관)";
	}else if($('#mcd').val()=="CNTY_CD" || $('#mcd').val()=="CNTY_CD1" || $('#mcd').val()=="CNTY_CD2" || $('#mcd').val()=="CNTY_CD3" || $('#mcd').val()=="CNTY_CD4" || $('#mcd').val()=="CNTY_CD5"  || $('#mcd').val()=="CNTY_CD6"  || $('#mcd').val()=="CNTY_CD7"){
		caption = "국가(ISO)부호 조회(통관)";
	}else if($('#mcd').val()=="MODEL_QTY_UT_CD" || $('#mcd').val()=="MODEL_QTY_UT_CD1"  || $('#mcd').val()=="MODEL_QTY_UT_CD2"){
		caption = "규격 수량단위  코드조회(통관)";
	}else if($('#mcd').val()=="WGHT_QTY_UT_CD"){
		caption = "환급 물량단위  코드조회(통관)";
	}else if($('#mcd').val()=="LCA_DLNG_REL_STTM_TPCD"){
		caption = "관세사 거래관계 기재구분  코드조회(통관)";
	}else if($('#mcd').val()=="LCA_INSC_OPIN_STTM_TPCD"){
		caption = "관세사 검사의견 기재구분  코드조회(통관)";
	}else if($('#mcd').val()=="LCA_PRNM_STSZ_STTM_TPCD"){
		caption = "관세사 품명규격 기재구분  코드조회(통관)";
	}else if($('#mcd').val()=="ORCY_DTRM_BASE_CD"){
		caption = "원산지결정기준  코드조회(통관)";
	}else if($('#mcd').val()=="ORCY_INDC_EON_TPCD"){
		caption = "원산지표시유무  코드조회(통관)";
	}else if($('#mcd').val()=="ORCY_INDC_MCD"){
		caption = "원산지표시방법  코드조회(통관)";
	}else if($('#mcd').val()=="ORCY_INDC_EXMP_RCD"){
		caption = "원산지표시 면세사유  코드조회(통관)";
	}else if($('#mcd').val()=="TRIF_RDEX_INPY_TPCD"){
		caption = "과세감면 분납구분  코드조회(통관)";
	}else if($('#mcd').val()=="ITX_TPCD"){
		caption = "내국세구분  코드조회(통관)";
	}else if($('#mcd').val()=="EDTX_TX_TPCD"){
		caption = "교육세과세구분  코드조회(통관)";
	}else if($('#mcd').val()=="RDTX_TX_TPCD"){
		caption = "농특세과세구분  코드조회(통관)";
	}else if($('#mcd').val()=="VAT_TX_TPCD"){
		caption = "부가세과세구분  코드조회(통관)";
	}else if($('#mcd').val()=="VAT_RDEX_TPCD"){
		caption = "부가가치세 감면부호  코드조회(통관)";
	}else if($('#mcd').val()=="XTR_NXTR_DLNG_TPCD"){
		caption = "유환무환구분  코드조회(통관)";
	}else if($('#mcd').val()=="CSOR_CFRM_TRGT_LWOR_CD"){
		caption = "세관장 확인대상 법령 코드조회(통관)";
	}else if($('#mcd').val()=="REQ_NNOB_RCD"){
		caption = "요건 비대상사유 코드조회(통관)";
	}else if($('#mcd').val()=="INDV_SOBI_TXFR_TPCD"){
		caption = "개별소비세 면세부호 코드(통관)";
	}else if($('#mcd').val()=="IMP_DCLR_TPCD"){
		caption = "신고구분 코드조회(통관)";
	}else if($('#mcd').val()=="IMP_CSCL_PLAN_CD"){
		caption = "통관계획 코드조회(통관)";
	}else if($('#mcd').val()=="IMP_DLNG_TPCD"){
		caption = "수입거래구분 코드조회(통관)";
	}else if($('#mcd').val()=="IMP_KCD"){
		caption = "수입종류 코드조회(통관)";
	}else if($('#mcd').val()=="COLT_FORM_CD"){
		caption = "징수형태 코드조회(통관)";
	}else if($('#mcd').val()=="BNBN_FCTR_USE_CD"){
		caption = "보세공장사용 코드조회(통관)";
	}else if($('#mcd').val()=="NSKOR_TRDE_TPCD"){
		caption = "남북교역구분코드 코드조회(통관)";
	}else if($('#mcd').val()=="BL_DVDE_RCD"){
		caption = "BL분할사유 코드조회(통관)";
	}else if($('#mcd').val()=="TRNP_METH_PCD"){
		caption = "운송수단유형 코드조회(통관)";
	}else if($('#mcd').val()=="TRNP_CNTAI_TPCD"){
		caption = "운송용기구분 코드조회(통관)";
	}else if($('#mcd').val()=="DMST_ARVL_CLRP_CD"){
		caption = "국내도착 코드조회(통관)";
	}else if($('#mcd').val()=="PCK_KCD"){
		caption = "포장종류 코드조회(통관)";
	}else if($('#mcd').val()=="STLM_MCD"){
		caption = "결제방법 코드조회(통관)";
	}else if($('#mcd').val()=="ADD_MINUS_DCLR_CD"){
		caption = "가산금구분 코드조회(통관)";
	}else if($('#mcd').val()=="ADD_MINUS_DCLR_CD1"){
		caption = "공제금구분 코드조회(통관)";
	}else if($('#mcd').val()=="EXPPN_TPCD"){
		caption = "수출자구분 코드조회(통관)";
	}else if($('#mcd').val()=="EXP_DCLR_TPCD"){
		caption = "수출신고구분 코드조회(통관)";
	}else if($('#mcd').val()=="EXP_DLNG_TPCD"){
		caption = "수출거래구분 코드조회(통관)";
	}else if($('#mcd').val()=="EXP_KCD"){
		caption = "수출종류 코드조회(통관)";
	}else if($('#mcd').val()=="DRWB_APLC_TPCD"){
		caption = "환급신청인구분 코드조회(통관)";
	}else if($('#mcd').val()=="INES_CD"){
		caption = "산업단지 코드조회(통관)";
	}else if($('#mcd').val()=="AUTO_SIML_FXAMT_DRWB_RQST_CD"){
		caption = "자동간이정액환급신청 코드조회(통관)";
	}else if($('#mcd').val()=="TEMP_OPOC_TPCD"){
		caption = "임시개청대상여부 코드조회(내부)";
	}else if($('#mcd').val()=="EXP_INSC_MCD"){
		caption = "수출검사방법 코드조회(통관)";
	}else if($('#mcd').val()=="CNTR_TPCD"){
		caption = "컨테이너적입대상 코드조회(내부)";
	}else if($('#mcd').val()=="EXP_CMDT_STCD"){
		caption = "수출물품상태 코드조회(통관)";
	}else if($('#mcd').val()=="TRRT_SIM_TPCD"){
		caption = "FTA협정구분 코드조회(내부)";
	}else if($('#mcd').val()=="INDV_DRWB_TPCD"){
		caption = "개별환급대상여부 코드조회(내부)";
	}else if($('#mcd').val()=="ORST_EXP_TPCD"){
		caption = "원상태수출대상여부 코드조회(내부)";
	}else if($('#mcd').val()=="BL_DVDE_DCLR_YN_TPCD"){
		caption = "비엘분할구분 코드조회(통관)";
	}else if($('#mcd').val()=="ORCY_CRPP_EON_TPCD"){
		caption = "원산지증명서유무 코드조회(통관)";
	}else if($('#mcd').val()=="PRC_DCSH_SBMT_TPCD"){
		caption = "가격신고서제출구분 코드조회(통관)";
	}

	$(function(){
		$('#masterGrid').datagrid({
			title			: caption,
			width			: '100%',
			height			: '295px',
			rownumbers		: true,
			singleSelect	: false,
			fitColumns		: true,
			pagination		: true,
			pageSize		: 50,
			view			: bufferview,
			onDblClickRow	: onDblClickRow,
			columns			: [[
			    {field:'keySysCode',title:'key',hidden:true},
                {field:'cd',title:'코드',width:40,align:'center'},
                {field:'cdDesc',title:'코드명',width:120,align:'center'},
                {field:'cdAbb',title:'출력명',width:120,align:'center'}
	        ]]
		});
		$('#masterGrid').datagrid('enableFilter',[]);
		$('#masterGrid').datagrid('getPager').pagination({showPageList:false,showRefresh:false});
    });
	fn_searchAction();
});

var fn_searchAction = function(){
	selectSysCodeList();
};

function onDblClickRow(index, row){
	if($('#mcd').val()=="BRND_CD"){
		opener.document.frm1.Msp_code.value	= row.cd;
		opener.document.frm1.Msangpyo.value	= row.cdDesc;
	}else if($('#mcd').val()=="DLCN_CD"){
		opener.document.frm1.Mindo_code.value = row.cd;
	}else if($('#mcd').val()=="DLCN_CD1"){
		opener.document.frm2.Impo_indo_jogun.value = row.cd;
		opener.document.frm2.Impo_gyelje_money.focus();
	}else if($('#mcd').val()=="DLCN_CD2"){
		opener.document.frm1.INCOTERMS.value = row.cd;
	}else if($('#mcd').val()=="CURR_CD"){
		opener.document.frm1.Munitprice_current.value = row.cd;
	}else if($('#mcd').val()=="CURR_CD1"){
		opener.document.frm1.Impo_fre_money.value = row.cd;
		opener.document.frm1.Impo_ins_input.focus();
	}else if($('#mcd').val()=="CURR_CD2"){
		opener.document.frm2.Impo_gyelje_money.value = row.cd;
		opener.document.frm2.Impo_gyelje_input.focus();
	}else if($('#mcd').val()=="CURR_CD3"){
		if($('#check').val()=="1"){
			opener.document.frm1.Impo_plus_money.value = row.cd;
		}else{
			opener.document.frm2.Impo_plus_money.value = row.cd;
			opener.document.frm2.Impo_plus.focus();
		}
	}else if($('#mcd').val()=="CURR_CD4"){
		opener.document.frm2.Impo_minus_money.value = row.cd;
		opener.document.frm2.Impo_minus.focus();
	}else if($('#mcd').val()=="CURR_CD5"){
		opener.document.frm3.Munitprice_current.value = row.cd;
		opener.document.frm3.Impum_danga.focus();
	}else if($('#mcd').val()=="CURR_CD6"){
		opener.document.frm1.CUR_UNIT.value = row.cd;
	}else if($('#mcd').val()=="CURR_CD7"){
		opener.document.frm1.Expo_Fre_money.value = row.cd;
	}else if($('#mcd').val()=="CURR_CD8"){
		opener.document.frm1.Expo_Ins_money.value = row.cd;
	}else if($('#mcd').val()=="CNTY_CD"){
		opener.document.frm3.Morigin1.value = row.cd;
		opener.document.frm3.Morigin2.focus();
	}else if($('#mcd').val()=="CNTY_CD1"){
		opener.document.frm1.Impo_jukchl_code.value = row.cd;
		opener.document.frm1.Impo_jukchl_name.value = row.cdDescEng;
		opener.document.frm1.Impo_teuksong.focus();
	}else if($('#mcd').val()=="CNTY_CD2"){
		opener.document.frm1.Impo_sungi_code.value = row.cd;
		opener.document.frm1.Impo_pojang_danwi.focus();
	}else if($('#mcd').val()=="CNTY_CD3"){
		opener.document.frm2.Impo_gonggub_buho.value = row.cd;
		opener.document.frm2.Impo_gyelje.focus();
	}else if($('#mcd').val()=="CNTY_CD4"){
		opener.document.frm1.Expo_MokJuk_Code.value = row.cd;
	}else if($('#mcd').val()=="CNTY_CD5"){
		opener.document.frm1.ORIG.value = row.cd;
	}else if($('#mcd').val()=="CNTY_CD6"){
		opener.document.frm1.EXTR_NAT.value = row.cd;
	}else if($('#mcd').val()=="CNTY_CD7"){
		opener.document.frm1.Morigin1.value = row.cd;
	}else if($('#mcd').val()=="MODEL_QTY_UT_CD"){
		opener.document.frm1.Mqty_ut.value = row.cd;
	}else if($('#mcd').val()=="MODEL_QTY_UT_CD1"){
		opener.document.frm3.Impum_su_danwi.value = row.cd;
		opener.document.frm3.Munitprice_current.focus();
	}else if($('#mcd').val()=="MODEL_QTY_UT_CD2"){
		opener.document.frm1.QTY_UNIT.value = row.cd;
	}else if($('#mcd').val()=="WGHT_QTY_UT_CD"){
		opener.document.frm1.Mdraw_unit.value = row.cd;
	}else if($('#mcd').val()=="LCA_DLNG_REL_STTM_TPCD"){
		opener.document.frm1.Mcus_entry1.value = row.cd;
	}else if($('#mcd').val()=="LCA_INSC_OPIN_STTM_TPCD"){
		opener.document.frm1.Mcus_entry2.value = row.cd;
	}else if($('#mcd').val()=="LCA_PRNM_STSZ_STTM_TPCD"){
		opener.document.frm1.Mcus_entry3.value = row.cd;
	}else if($('#mcd').val()=="ORCY_DTRM_BASE_CD"){
		opener.document.frm3.Morigin2.value = row.cd;
		opener.document.frm3.Morigin3.focus();
	}else if($('#mcd').val()=="ORCY_INDC_EON_TPCD"){
		opener.document.frm3.Morigin3.value = row.cd;
		opener.document.frm3.Morigin4.focus();
		//opener.ChangeOrigin(row.cd);
	}else if($('#mcd').val()=="ORCY_INDC_MCD"){
		opener.document.frm3.Morigin4.value = row.cd;
		opener.document.frm3.Morigin5.focus();
	}else if($('#mcd').val()=="ORCY_INDC_EXMP_RCD"){
		opener.document.frm3.Morigin5.value = row.cd;
		opener.document.frm3.Impum_gukyk1.focus();
	}else if($('#mcd').val()=="TRIF_RDEX_INPY_TPCD"){
		opener.document.frm3.Mcus_flag.value = row.cd;
		opener.document.frm3.Mcus_gam_code.focus();
	}else if($('#mcd').val()=="ITX_TPCD"){
		opener.document.frm1.M_neguk_gubun.value = row.cd;
	}else if($('#mcd').val()=="EDTX_TX_TPCD"){
		opener.document.frm1.M_edu_yn.value = row.cd;
	}else if($('#mcd').val()=="RDTX_TX_TPCD"){
		opener.document.frm1.M_nong_yn.value = row.cd;
	}else if($('#mcd').val()=="VAT_TX_TPCD"){
		opener.document.frm1.mVatFlag.value = row.cd;
	}else if($('#mcd').val()=="VAT_RDEX_TPCD"){
		opener.document.frm1.mVatReductionCode.value = row.cd;
	}else if($('#mcd').val()=="XTR_NXTR_DLNG_TPCD"){
		opener.document.frm1.sample_yn.value = row.cd;
	}else if($('#mcd').val()=="CSOR_CFRM_TRGT_LWOR_CD"){
		opener.document.frm3.lawCd.value = row.cd;
	}else if($('#mcd').val()=="REQ_NNOB_RCD"){
		opener.document.frm3.notYogSayuCd.value = row.cd;
	}else if($('#mcd').val()=="INDV_SOBI_TXFR_TPCD"){
		opener.document.frm1.M_neguk_myun.value = row.cd;
	}else if($('#mcd').val()=="IMP_DCLR_TPCD"){
		opener.document.frm1.Impo_singo_gubun.value = row.cd;
		opener.document.frm1.Impo_plan.focus();
	}else if($('#mcd').val()=="IMP_CSCL_PLAN_CD"){
		opener.document.frm1.Impo_plan.value = row.cd;
		opener.document.frm1.Impo_gele_gubun.focus();
	}else if($('#mcd').val()=="IMP_DLNG_TPCD"){
		opener.document.frm1.Impo_gele_gubun.value = row.cd;
		opener.document.frm1.Impo_jonglu.focus();
	}else if($('#mcd').val()=="IMP_KCD"){
		if(row.cd=="12" || row.cd=="24" || row.cd=="27" || row.cd=="31"){
			opener.document.frm1.Impo_chk_dg.value = "B";
    	}else if(row.cd=="18" || row.cd=="30" || row.cd=="34"){
    		opener.document.frm1.Impo_chk_dg.value = "S";
    	}else if(row.cd=="14" || row.cd=="35"){
    		opener.document.frm1.Impo_chk_dg.value = "F";
    	}else{
    		opener.document.frm1.Impo_chk_dg.value = "M";
    	}
		opener.document.frm1.Impo_jonglu.value = row.cd;
		opener.document.frm1.Impo_jingsu_type.focus();
	}else if($('#mcd').val()=="COLT_FORM_CD"){
		opener.document.frm1.Impo_jingsu_type.value = row.cd;
		opener.document.frm1.Impo_file_no1.focus();
	}else if($('#mcd').val()=="BNBN_FCTR_USE_CD"){
		opener.document.frm1.Impo_UseSinGbn.value = row.cd;
		opener.document.frm1.Impo_bl_type.focus();
	}else if($('#mcd').val()=="NSKOR_TRDE_TPCD"){
		opener.document.frm1.Impo_bl_type.value = row.cd;
		opener.document.frm1.Impo_chamjo_no.focus();
	}else if($('#mcd').val()=="BL_DVDE_RCD"){
		opener.document.frm1.Impo_bl_sayu_code.value = row.cd;
		opener.document.frm1.Impo_bl_gubun.value = "Y";
		opener.document.frm1.Impo_unsong_box.focus();
	}else if($('#mcd').val()=="TRNP_METH_PCD"){
		if($('#check').val()=="1"){
			opener.document.frm1.Expo_UnSong_Type.value = row.cd;
		}else{
			opener.document.frm1.Impo_unsong_type.value = row.cd;
			opener.document.frm1.Impo_unsong_box.focus();
		}
	}else if($('#mcd').val()=="TRNP_CNTAI_TPCD"){
		if($('#check').val()=="1"){
			opener.document.frm1.Expo_UnSong_Box.value = row.cd;
		}else if($('#check').val()=="2"){
			opener.document.frm1.Impo_unsong_box.value = row.cd;
		}else{
			opener.document.frm1.Impo_unsong_box.value = row.cd;
			opener.document.frm1.Impo_Forwarder_Code.focus();
		}
	}else if($('#mcd').val()=="DMST_ARVL_CLRP_CD"){
		if($('#check').val()=="1"){
			opener.document.frm1.Expo_HangGu_Code.value = row.cd;
		}else if($('#check').val()=="2"){
			opener.document.frm1.Impo_hanggu_code.value = row.cd;
		}else{
			opener.document.frm1.Impo_hanggu_code.value = row.cd;
			opener.document.frm1.Impo_hanggu_name.value = row.cdDesc;
			opener.document.frm1.Impo_unsu_gigwan.focus();
		}
	}else if($('#mcd').val()=="PCK_KCD"){
		opener.document.frm1.Impo_pojang_danwi.value = row.cd;
		opener.document.frm1.Impo_pojang_su.focus();
	}else if($('#mcd').val()=="STLM_MCD"){
		if($('#check').val()=="1"){
			opener.document.frm1.Expo_gyelje.value = row.cd;
		}else if($('#check').val()=="2"){
			opener.document.frm1.Impo_gyelje.value = row.cd;
		}else{
			opener.document.frm2.Impo_gyelje.value = row.cd;
			opener.document.frm2.Impo_gakyk_yn.focus();
		}
	}else if($('#mcd').val()=="ADD_MINUS_DCLR_CD"){
		if($('#check').val()=="1"){
			opener.document.frm1.Impo_plus_yul_gubun.value = row.cd;
		}else{
			opener.document.frm2.Impo_plus_yul_gubun.value = row.cd;
			opener.document.frm2.Impo_plus_money.focus();
		}
	}else if($('#mcd').val()=="ADD_MINUS_DCLR_CD1"){
		opener.document.frm2.Impo_minus_yul_gubun.value = row.cd;
		opener.document.frm2.Impo_minus_money.focus();
	}else if($('#mcd').val()=="EXPPN_TPCD"){
		opener.document.frm1.Expo_SuChulJa_Gbn.value = row.cd;
	}else if($('#mcd').val()=="EXP_DCLR_TPCD"){
		opener.document.frm1.Expo_singo_gbn.value = row.cd;
	}else if($('#mcd').val()=="EXP_DLNG_TPCD"){
		opener.document.frm1.Expo_gurae_gbn.value = row.cd;
	}else if($('#mcd').val()=="EXP_KCD"){
		opener.document.frm1.Expo_jong.value = row.cd;
	}else if($('#mcd').val()=="DRWB_APLC_TPCD"){
		opener.document.frm1.Expo_whan_sin.value = row.cd;
	}else if($('#mcd').val()=="INES_CD"){
		opener.document.frm1.Expo_industry.value = row.cd;
	}else if($('#mcd').val()=="AUTO_SIML_FXAMT_DRWB_RQST_CD"){
		opener.document.frm1.Expo_whan_gan2.value = row.cd;
	}else if($('#mcd').val()=="TEMP_OPOC_TPCD"){
		opener.document.frm1.Expo_imsigae_yn.value = row.cd;
	}else if($('#mcd').val()=="EXP_INSC_MCD"){
		opener.document.frm1.Expo_how_check.value = row.cd;
	}else if($('#mcd').val()=="CNTR_TPCD"){
		opener.document.frm1.Expo_Jukip_YN.value = row.cd;
	}else if($('#mcd').val()=="EXP_CMDT_STCD"){
		opener.document.frm1.Expo_Old_Yn.value = row.cd;
	}else if($('#mcd').val()=="TRRT_SIM_TPCD"){
		if($('#check').val()=="1"){
			opener.document.frm1.IM_FTA_CD.value = row.cd;
		}else{
			opener.document.frm1.EX_FTA_CD.value = row.cd;
		}
	}else if($('#mcd').val()=="INDV_DRWB_TPCD"){
		opener.document.frm1.INDV_REFN_FG.value = row.cd;
	}else if($('#mcd').val()=="ORST_EXP_TPCD"){
		opener.document.frm1.ORIG_STAT_OBJ_FG.value = row.cd;
		opener.document.frm1.ORIG_STAT_OBJ.value = row.cdDesc;
	}else if($('#mcd').val()=="BL_DVDE_DCLR_YN_TPCD"){
		opener.document.frm1.BL_DIVS.value = row.cd;
	}else if($('#mcd').val()=="ORCY_CRPP_EON_TPCD"){
		opener.document.frm1.Impo_wonsanji_yn.value = row.cd;
	}else if($('#mcd').val()=="PRC_DCSH_SBMT_TPCD"){
		opener.document.frm1.Impo_gakyk_yn.value = row.cd;
	}

	window.close();
}