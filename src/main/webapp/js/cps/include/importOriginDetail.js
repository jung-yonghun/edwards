function selectImportOriginDetail(){
    progress.show();
    var url 	= "../apis/customs/selectImportStatusDetail",
        params 	= $("#frm1").serializeObject(),
        type 	= "POST";

    sendAjax(url, params, type, function(d){
        progress.hide();
        var Impo_napbu_no = '';
        if(d[0].Impo_napbu_no.length==0){
        	Impo_napbu_no = ''
        }else{
        	Impo_napbu_no = d[0].Impo_napbu_no.substr(0,4)+"-"+d[0].Impo_napbu_no.substr(4,3)+"-"+d[0].Impo_napbu_no.substr(7,2)+"-"+d[0].Impo_napbu_no.substr(9,2)+"-"+d[0].Impo_napbu_no.substr(11,1)+"-"+d[0].Impo_napbu_no.substr(12,6)+"-"+d[0].Impo_napbu_no.substr(18,1);
        }

        var Impo_iphang_date = '';
        if(d[0].Impo_iphang_date.length==0){
        	Impo_iphang_date = ''
        }else{
        	Impo_iphang_date = d[0].Impo_iphang_date.substr(0,4)+"/"+d[0].Impo_iphang_date.substr(4,2)+"/"+d[0].Impo_iphang_date.substr(6,2);
        }

        var Impo_ok_date = '';
        if(d[0].Impo_ok_date.length==0){
        	Impo_ok_date = ''
        }else{
        	Impo_ok_date = d[0].Impo_ok_date.substr(0,4)+"/"+d[0].Impo_ok_date.substr(4,2)+"/"+d[0].Impo_ok_date.substr(6,2);
        }

        var Impo_banip_date = '';
        if(d[0].Impo_banip_date.length==0){
        	Impo_banip_date = ''
        }else{
        	Impo_banip_date = d[0].Impo_banip_date.substr(0,4)+"/"+d[0].Impo_banip_date.substr(4,2)+"/"+d[0].Impo_banip_date.substr(6,2);
        }

        var Impo_jubsu_date = '';
        if(d[0].Impo_jubsu_date.length==0){
        	Impo_jubsu_date = ''
        }else{
        	Impo_jubsu_date = d[0].Impo_jubsu_date.substr(0,4)+"/"+d[0].Impo_jubsu_date.substr(4,2)+"/"+d[0].Impo_jubsu_date.substr(6,2)+" "+d[0].Impo_jubsu_date.substr(8,2)+":"+d[0].Impo_jubsu_date.substr(10,2);
        }

        var Impo_mrn_no = '';
        var Impo_mrn_noRe = d[0].Impo_mrn_no.replace(/O/gi,"o").replace(/I/gi,"i");
        if(parseInt(Impo_mrn_noRe.length) == 0){
        	Impo_mrn_no = "";
        }else if(parseInt(Impo_mrn_noRe.length) < 16){
        	Impo_mrn_no = Impo_mrn_noRe.substr(0,11)+"-"+Impo_mrn_noRe.substr(11,4);
        }else if(parseInt(Impo_mrn_noRe.length) > 15 && parseInt(Impo_mrn_noRe.length) < 19){
        	Impo_mrn_no = Impo_mrn_noRe.substr(0,11)+"-"+Impo_mrn_noRe.substr(11,4)+"-"+Impo_mrn_noRe.substr(15,3);
        }else if(parseInt(Impo_mrn_noRe.length) > 15 && parseInt(Impo_mrn_noRe.length) < 20){
        	Impo_mrn_no = Impo_mrn_noRe.substr(0,11)+"-"+Impo_mrn_noRe.substr(11,4)+"-"+Impo_mrn_noRe.substr(15,4);
        }

        $('#Impo_singo_no').html(d[0].Impo_singo_no.substr(0,5)+"-"+d[0].Impo_singo_no.substr(5,2)+"-"+d[0].Impo_singo_no.substr(7,7));
        $('#Impo_singo_date').html(d[0].Impo_singo_date.substr(0,4)+"/"+d[0].Impo_singo_date.substr(4,2)+"/"+d[0].Impo_singo_date.substr(6,2));
        $('#Impo_segwan').html(d[0].Impo_segwan+"-"+d[0].Impo_gwa);
        $('#Impo_iphang_date').html(Impo_iphang_date);
        $('#impo_cs').html(d[0].impo_cs);
        $('#Impo_bl_no').html(d[0].Impo_bl_no);
        $('#Impo_mbl_no').html(d[0].Impo_mbl_no);
        $('#Impo_mrn_no').html(Impo_mrn_no);
        $('#Impo_banip_date').html(Impo_banip_date);
        $('#Impo_jingsu_type').html(d[0].Impo_jingsu_type);
        $('#Impo_singoja_sangho').html(d[0].Impo_singoja_sangho+" "+d[0].Impo_singoja_name);
        $('#Impo_plan').html(d[0].Impo_plan +" "+d[0].planName);
        $('#Impo_wonsanji_yn').html(d[0].Impo_wonsanji_yn);
        $('#Impo_total_jung').html($.number(d[0].Impo_total_jung,0)+" "+d[0].Impo_jung_danwi);
        $('#Impo_suipja_sangho').html(d[0].Impo_suipja_sangho);
        $('#Impo_suipja_tong').html(d[0].Impo_suipja_tong);
        $('#Impo_singo_gubun').html(d[0].Impo_singo_gubun+" "+d[0].singoGubunName);
        $('#Impo_gakyk_yn').html(d[0].Impo_gakyk_yn);
        $('#Impo_pojang_su').html(d[0].Impo_pojang_su+" "+d[0].Impo_pojang_danwi);
        $('#Impo_napse_sangho').html(d[0].Impo_napse_sangho);
        $('#Impo_napse_name').html(d[0].Impo_napse_name);
        $('#Impo_gele_gubun').html(d[0].Impo_gele_gubun+" "+d[0].geleGubunName);
        $('#Impo_hanggu_code').html(d[0].Impo_hanggu_code+" "+d[0].Impo_hanggu_name);
        $('#Impo_unsong_type').html(d[0].Impo_unsong_type+"-"+d[0].Impo_unsong_box);
        $('#Impo_suipja_tong1').html(d[0].Impo_suipja_tong);
        $('#Impo_napse_saup').html(d[0].Impo_napse_saup.substr(0,3)+"-"+d[0].Impo_napse_saup.substr(3,2)+"-"+d[0].Impo_napse_saup.substr(5,5));
        $('#Impo_jonglu').html(d[0].Impo_jonglu+" "+d[0].jongluName);
        $('#Impo_jukchl_code').html(d[0].Impo_jukchl_code+"-"+d[0].Impo_jukchl_name);
        $('#Impo_sungi_name').html(d[0].Impo_sungi_name+" ("+d[0].Impo_sungi_code+")");
        $('#Impo_napse_juso').html("("+d[0].Impo_napse_post+") "+d[0].Impo_napse_juso);
        $('#Impo_unsu_gigwan').html(d[0].Impo_unsu_gigwan);
        $('#Impo_Forwarder_sangho').html(d[0].Impo_Forwarder_sangho);
        $('#Impo_Forwarder_Code').html(d[0].Impo_Forwarder_Code);
        $('#Impo_gonggub_sangho').html(d[0].Impo_gonggub_sangho);
        $('#Impo_gonggub').html(d[0].Impo_gonggub);
        $('#Impo_teuksong_name').html(d[0].Impo_teuksong_name);
        $('#Impo_teuksong').html(d[0].Impo_teuksong);
        $('#Impo_jangch_name').html(d[0].Impo_jangch_name);
        $('#Impo_jangch_buho').html(d[0].Impo_jangch_buho);
        $('#Impo_jangch_jangso').html(d[0].Impo_jangch_jangso);
        $('#Impo_indo_jogun').html(d[0].Impo_indo_jogun+" - "+d[0].Impo_gyelje_money+" - "+$.number(d[0].Impo_gyelje_input,0)+" - "+d[0].Impo_gyelje);
        $('#Impo_charge_exch').html($.number(d[0].Impo_charge_exch,4));
        $('#Impo_usd_exch').html($.number(d[0].Impo_usd_exch,2));
        $('#Impo_cif_total_usd').html($.number(d[0].Impo_cif_total_usd,0));
        $('#Impo_fre_won').html($.number(d[0].Impo_fre_won,0));
        $('#Impo_gasan_tax').html($.number(d[0].Impo_gasan_tax,0));
        $('#Impo_napbu_no').html(Impo_napbu_no);
        $('#Impo_cif_total_won').html($.number(d[0].Impo_cif_total_won,0));
        $('#Impo_ins_input').html($.number(d[0].Impo_ins_input,0));
        $('#Impo_minus_total').html($.number(d[0].Impo_minus_total,0));
        $('#Impo_vat_gwapyo').html($.number(d[0].Impo_vat_gwapyo,0));
        $('#Impo_gwan_tax').html($.number(d[0].Impo_gwan_tax,0));
        $('#Impo_teuk_tax').html($.number(d[0].Impo_teuk_tax,0));
        $('#Impo_gije').html(d[0].Impo_gije);
        $('#Impo_oil_tax').html($.number(d[0].Impo_oil_tax,0));
        $('#Impo_ju_tax').html($.number(d[0].Impo_ju_tax,0));
        $('#Impo_edu_tax').html($.number(d[0].Impo_edu_tax,0));
        $('#Impo_nong_tax').html($.number(d[0].Impo_nong_tax,0));
        $('#Impo_vat_tax').html($.number(d[0].Impo_vat_tax,0));
        $('#Impo_gasan_tax1').html($.number(d[0].Impo_gasan_tax,0));
        $('#Impo_misingo_tax').html($.number(d[0].Impo_misingo_tax,0));
        $('#Impo_total_tax').html($.number(d[0].Impo_total_tax,0));
        $('#Impo_damdang_name').html(d[0].Impo_damdang_name);
        $('#Impo_jubsu_date').html(Impo_jubsu_date);
        $('#Impo_ok_date').html(Impo_ok_date);
        $('#Impo_file_no1').html(d[0].Impo_file_no1);
        $('#Impo_chamjo_no').html(d[0].Impo_chamjo_no);
        $('#Impo_send_result').html(d[0].Impo_send_result);
        $('#Impo_UseSinGbn').html(d[0].Impo_UseSinGbn);
        $('#Impo_UseSinDt').html(d[0].Impo_UseSinDt);
        $('#Impo_file_no2').html(d[0].Impo_file_no2);
        $('#Impo_daesangho').html(d[0].Impo_daesangho);
        $('#Impo_receive_result').html(d[0].Impo_receive_result);
        $('#AttachImageYN').html(d[0].AttachImageYN);
        $('#impo_fta_obj').html(d[0].impo_fta_obj);
        $('#impo_shipper_sangho').html(d[0].impo_shipper_sangho);
        $('#impo_shipper_buho').html(d[0].impo_shipper_buho);
        $('#impo_shipper').html(d[0].impo_shipper);
    });
}

function selectImportOriginDetail1(){
    progress.show();
    var url 	= "../apis/customs/selectImportStatusDetail1",
        params 	= $("#frm1").serializeObject(),
        type 	= "POST";

    sendAjax(url, params, type, function(d){
        progress.hide();
        console.log(d);
        var optList = new Array();
        $('#Impo_damdangja').html(d[0].Imlan_gije1+"<br>"+d[0].Imlan_gije2+"<br>"+d[0].Imlan_gije3+"<br>"+d[0].Imlan_gije4+"<br>"+d[0].Imlan_gije5+"<br>"+d[0].Imlan_gije6+"<br>"+d[0].Imlan_gije7+"<br>"+d[0].Imlan_gije8);
	    for (var i = 0; i < d.length; i++){
	    	var Imlan_neguk_seyul = isEmpty(d[i].Imlan_neguk_seyul) ? "" : $.number(d[i].Imlan_neguk_seyul,2);
	    	var Imlan_neguk_tax   = isEmpty(d[i].Imlan_neguk_tax) ? "" : $.number(d[i].Imlan_neguk_tax,0);
	    	var Imlan_edu_seyul	  = isEmpty(d[i].Imlan_edu_seyul) ? "" : $.number(d[i].Imlan_edu_seyul,2);
	    	var Imlan_edu_tax	  = isEmpty(d[i].Imlan_edu_tax) ? "" : $.number(d[i].Imlan_edu_tax,0);
	    	var Imlan_nong_tax	  = isEmpty(d[i].Imlan_nong_tax) ? "" : $.number(d[i].Imlan_nong_tax,2);
	    	var Imlan_NotYogCnt   = '';
	    	if(isEmpty(d[i].Imlan_NotYogCnt) || d[i].Imlan_NotYogCnt == "0"){
	    		Imlan_NotYogCnt = "";
	    	}else{
	    		Imlan_NotYogCnt = d[i].Imlan_NotYogCnt;
	    	}

	    	optList[i] = "<table><col width='100px'/><col width='150px'/><col width='250px'/><col width='150px'/>"+
	    				 "<col width='150px'/><col width='150px'/><col width='100px'/><col width='150px'/>"+
	    				 "<tr style='height:20px;'>"+
	    				 "<td bgcolor='#ecfdf5' style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>란번호</font></td>"+
	    				 "<td colspan='4' style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:left;'><font color='#2a2a2a'>("+d[i].Imlan_jechl_lan+"/"+d[i].maxLan+")</font></td>"+
	    				 "<td bgcolor='#ecfdf5' style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>상표</font></td>"+
	    				 "<td colspan='2' style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-right:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>"+d[i].Imlan_model+" ("+d[i].Imlan_model_code+")</font></td>"+
			  		     "</tr>"+
			  		     "<tr style='height:20px;'>"+
	    				 "<td bgcolor='#ecfdf5' style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>품명</font></td>"+
	    				 "<td colspan='7' style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-right:1px #2a2a2a solid;text-align:left;'><font color='#2a2a2a'>"+d[i].Imlan_popum+"</font></td>"+
			  		     "</tr>"+
			  		     "<tr style='height:20px;'>"+
	    				 "<td bgcolor='#ecfdf5' style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>거래품명</font></td>"+
	    				 "<td colspan='7' style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-right:1px #2a2a2a solid;text-align:left;'><font color='#2a2a2a'>"+d[i].Imlan_gurae_pum+"</font></td>"+
			  		     "</tr>"+
			  		     "<tr style='height:20px;'>"+
	    				 "<td bgcolor='#ecfdf5' style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>세번부호</font></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>"+d[i].Imlan_hs.substr(0,4)+"."+d[i].Imlan_hs.substr(4,2)+"-"+d[i].Imlan_hs.substr(6,4)+"</font></td>"+
	    				 "<td bgcolor='#ecfdf5' style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>순중량</font></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:right;'><font color='#2a2a2a'>"+$.number(d[i].Imlan_jung,0)+" "+d[i].Imlan_jung_danwi+"</font></td>"+
	    				 "<td bgcolor='#ecfdf5' style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>C/S검사</font></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>"+d[i].Imlan_cs_gumsa1+"</font></td>"+
	    				 "<td bgcolor='#ecfdf5' style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>사후기관</font></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-right:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>"+d[i].Imlan_sahu_gigwan1+"</font></td>"+
			  		     "</tr>"+
			  		     "<tr style='height:20px;'>"+
	    				 "<td bgcolor='#ecfdf5' style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>과세가격($)</font></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:right;'><font color='#2a2a2a'>"+$.number(d[i].Imlan_cif_usd,0)+"</font></td>"+
	    				 "<td bgcolor='#ecfdf5' style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>수량</font></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:right;'><font color='#2a2a2a'>"+$.number(d[i].Imlan_su,0)+" "+d[i].Imlan_su_danwi+"</font></td>"+
	    				 "<td bgcolor='#ecfdf5' style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>검사변경</font></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>"+d[i].Imlan_cs_gumsa2+"</font></td>"+
	    				 "<td bgcolor='#ecfdf5' style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>비대상</font></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-right:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>"+Imlan_NotYogCnt+"</font></td>"+
			  		     "</tr>"+
			  		     "<tr style='height:20px;'>"+
	    				 "<td bgcolor='#ecfdf5' style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>과세가격(원)</font></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:right;'><font color='#2a2a2a'>"+$.number(d[i].Imlan_cif_won,0)+"</font></td>"+
	    				 "<td bgcolor='#ecfdf5' style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>환급물량</font></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:right;'><font color='#2a2a2a'>"+$.number(d[i].Imlan_mulryang,0)+" "+d[i].Imlan_mulryang_danwi+"</font></td>"+
	    				 "<td bgcolor='#ecfdf5' style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>원산지</font></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>"+d[i].Imlan_wonsanji_code+"-"+d[i].Imlan_wonsanji_dcsn_base+"-"+d[i].Imlan_wonsanji_mark+"-"+d[i].Imlan_wonsanji_bang+"</font></td>"+
	    				 "<td bgcolor='#ecfdf5' style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>특수세액</font></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-right:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>"+d[i].Imlan_special+"</font></td>"+
			  		     "</tr>"+
			  		     "<tr style='height:20px;'>"+
	    				 "<td bgcolor='#ecfdf5' style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>세종</font></td>"+
	    				 "<td bgcolor='#ecfdf5' style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>세율구분</font></td>"+
	    				 "<td bgcolor='#ecfdf5' style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>세율</font></td>"+
	    				 "<td bgcolor='#ecfdf5' style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>감면율</font></td>"+
	    				 "<td bgcolor='#ecfdf5' style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>세액</font></td>"+
	    				 "<td bgcolor='#ecfdf5' style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>감면분납부호</font></td>"+
	    				 "<td bgcolor='#ecfdf5' style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>감면액</font></td>"+
	    				 "<td bgcolor='#ecfdf5' style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-right:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>내국세종부호</font></td>"+
			  		     "</tr>"+
			  		     "<tr style='height:20px;'>"+
	    				 "<td bgcolor='#ecfdf5' style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>관세</font></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>"+d[i].Imlan_seyul_gubun+" "+d[i].Imlan_seyul_prn+"</font></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>"+$.number(d[i].Imlan_gwan_seyula,2)+"</font></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>"+$.number(d[i].Imlan_gwan_gyeng_yul,2)+"</font></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:right;'><font color='#2a2a2a'>"+$.number(d[i].Imlan_gwan_tax,0)+"</font></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>"+d[i].Imlan_gwan_gam_buho+"</font></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>"+$.number(d[i].Imlan_gyeng_gwan,0)+"</font></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-right:1px #2a2a2a solid;text-align:center;'></td>"+
			  		     "</tr>"+
			  		     "<tr style='height:20px;'>"+
	    				 "<td bgcolor='#ecfdf5' style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>내국세</font></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>"+d[i].Imlan_neguk_gubun+"</font></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>"+Imlan_neguk_seyul+"</font></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:right;'><font color='#2a2a2a'>"+Imlan_neguk_tax+"</font></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-right:1px #2a2a2a solid;text-align:center;'>"+d[i].Imlan_neguk_code+"</td>"+
			  		     "</tr>"+
			  		     "<tr style='height:20px;'>"+
	    				 "<td bgcolor='#ecfdf5' style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>교육세</font></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>"+Imlan_edu_seyul+"</font></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:right;'><font color='#2a2a2a'>"+Imlan_edu_tax+"</font></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-right:1px #2a2a2a solid;text-align:center;'></td>"+
			  		     "</tr>"+
			  		     "<tr style='height:20px;'>"+
	    				 "<td bgcolor='#ecfdf5' style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>농특세</font></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>"+d[i].Imlan_nong_gubun+"</font></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:right;'><font color='#2a2a2a'>"+Imlan_nong_tax+"</font></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-right:1px #2a2a2a solid;text-align:center;'></td>"+
			  		     "</tr>"+
			  		     "<tr style='height:20px;'>"+
	    				 "<td bgcolor='#ecfdf5' style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>부가세</font></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>"+d[i].Imlan_vat_gubun+"</font></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>10.00</font></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:right;'><font color='#2a2a2a'>"+$.number(d[i].Imlan_vat_tax,0)+"</font></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-right:1px #2a2a2a solid;text-align:center;'></td>"+
			  		     "</tr>"+
			  		     "<tr style='height:20px;'>"+
	    				 "<td bgcolor='#ecfdf5' style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>합계세액</font></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;'></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;'></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;'></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:right;'><font color='#2a2a2a'>"+$.number(d[i].Imlan_total_tax,0)+"</font></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;'></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;'></td>"+
	    				 "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-right:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;'></td>"+
			  		     "</tr>"+
			  		     "<tr style='height:10px;'>"+
	    				 "<td colspan='8'></td>"+
			  		     "</tr>"+
			  		     "</tr>"+
			  		     "<tr style='height:20px;'>"+
	    				 "<td colspan='8' style='text-align:left;'><font color='#2a2a2a'>품목사항</font></td>"+
			  		     "</tr>"+
			  		     "<tr style='height:20px;'>"+
	    				 "<td bgcolor='#ececfd' style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>행번</font></td>"+
	    				 "<td bgcolor='#ececfd' style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>자재코드</font></td>"+
	    				 "<td bgcolor='#ececfd' style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>모델규격</font></td>"+
	    				 "<td bgcolor='#ececfd' style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>성분</font></td>"+
	    				 "<td bgcolor='#ececfd' style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>수량</font></td>"+
	    				 "<td bgcolor='#ececfd' style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>단위</font></td>"+
	    				 "<td bgcolor='#ececfd' style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>단가</font></td>"+
	    				 "<td bgcolor='#ececfd' style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-right:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>금액</font></td>"+
			  		     "</tr>";
		  		var params 	= $("#frm1").serializeObject();
		  		params["Impum_lan"] = d[i].Imlan_jechl_lan;
		  		$.ajax({
	                type: "POST",
	                contentType: "application/json",
	                dataType: 'json',
	                async : false,
	                url: "../apis/customs/selectImportStatusDetail2",
	                processData: false,
	                data: JSON.stringify(params),
	                success: function (returnValue, textStatus, jqXHR){
	                	for (var j = 0; j < returnValue.length; j++){
			  		    	optList[i] += "<tr style='height:20px;'>"+
					    				  "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>"+returnValue[j].Impum_lan+"-"+returnValue[j].Impum_heang+"</font></td>"+
					    				  "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>"+returnValue[j].Impum_jajae_code+"</font></td>"+
					    				  "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;'><font color='#2a2a2a'>"+returnValue[j].Impum_gukyk2+"<br>"+returnValue[j].Impum_gukyk3+"</font></td>"+
					    				  "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;'><font color='#2a2a2a'>"+returnValue[j].Impum_sungbun1+"<br>"+returnValue[j].Impum_sungbun2+"<br>"+returnValue[j].Impum_sungbun3+"</font></td>"+
					    				  "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:right;'><font color='#2a2a2a'>"+$.number(returnValue[j].Impum_su,0)+"</font></td>"+
					    				  "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>"+returnValue[j].Impum_su_danwi+"</font></td>"+
					    				  "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;text-align:right;'><font color='#2a2a2a'>"+$.number(returnValue[j].Impum_danga,2)+"</font></td>"+
					    				  "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-right:1px #2a2a2a solid;text-align:right;'><font color='#2a2a2a'>"+$.number(returnValue[j].Impum_amt,2)+"</font></td>"+
							  		      "</tr>";
			  		    }
	                	optList[i] += "<tr style='height:20px;'>"+
					   				  "<td bgcolor='#ececfd' style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>합계</font></td>"+
					   				  "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;'></td>"+
					   				  "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;'></td>"+
					   				  "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;'></td>"+
					   				  "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:right;'><font color='#2a2a2a'>"+$.number(returnValue[0].sumSu,0)+"</font></td>"+
					   				  "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;'></td>"+
					   				  "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;'></td>"+
					   				  "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-right:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:right;'><font color='#2a2a2a'>"+$.number(returnValue[0].sumAmt,2)+"</font></td>"+
					   	  		      "</tr>";
	                },
	                error: function (e) {
	                    return -1;
	                }
	            });

				var params 	= $("#frm1").serializeObject();
		  			params["Impum_lan"] = d[i].Imlan_jechl_lan;

		  		$.ajax({
	                type: "POST",
	                contentType: "application/json",
	                dataType: 'json',
	                async : false,
	                url: "../apis/customs/selectImportStatusDetail3",
	                processData: false,
	                data: JSON.stringify(params),
	                success: function (returnValue, textStatus, jqXHR){
	                	if(returnValue.length > 0){
		                	optList[i] += "<tr style='height:10px;'>"+
										  "<td colspan='8'></td>"+
							  		      "</tr>"+
							  		      "</tr>"+
							  		      "<tr style='height:20px;'>"+
										  "<td colspan='8' style='text-align:left;'><font color='#2a2a2a'>요건</font></td>"+
							  		      "</tr>"+
							  		      "<tr style='height:20px;'>"+
										  "<td bgcolor='#fdecfd' style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>행번</font></td>"+
										  "<td bgcolor='#fdecfd' style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>요건번호</font></td>"+
										  "<td bgcolor='#fdecfd' style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>발급일자</font></td>"+
										  "<td colspan='2' bgcolor='#fdecfd' style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>서류명</font></td>"+
										  "<td bgcolor='#fdecfd' style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>식별부호</font></td>"+
										  "<td bgcolor='#fdecfd' style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>용도</font></td>"+
										  "<td bgcolor='#fdecfd' style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-top:1px #2a2a2a solid;border-right:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>기관</font></td>"+
							  		      "</tr>"
	                	}
	                	for (var k = 0; k < returnValue.length; k++){
			  		    	optList[i] += "<tr style='height:20px;'>"+
					    				  "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>"+returnValue[k].Suipyogun_lan+"-"+returnValue[k].Suipyogun_heang+"</font></td>"+
					    				  "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>"+returnValue[k].Suipyogun_no+"</font></td>"+
					    				  "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;'><font color='#2a2a2a'>"+returnValue[k].Suipyogun_date.substr(0,4)+"-"+returnValue[k].Suipyogun_date.substr(4,2)+"-"+returnValue[k].Suipyogun_date.substr(6,2)+"</font></td>"+
					    				  "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;'><font color='#2a2a2a'>"+returnValue[k].Suipyogun_text_name+"</font></td>"+
					    				  "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:right;'><font color='#2a2a2a'>"+returnValue[k].Suipyogun_bub_code+"</font></td>"+
					    				  "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;text-align:center;'><font color='#2a2a2a'>"+returnValue[k].Suipyogun_UsageCd+"</font></td>"+
					    				  "<td style='padding-left:2px;padding-right:2px;border-left:1px #2a2a2a solid;border-bottom:1px #2a2a2a solid;border-right:1px #2a2a2a solid;text-align:right;'><font color='#2a2a2a'>"+returnValue[k].Suipyogun_GigwanPumCd+"</font></td>"+
							  		      "</tr>";
			  		    }
	                },
	                error: function (e) {
	                    return -1;
	                }
	            });

		  	    optList[i] += "<tr style='height:20px;'>"+
							  "<td colspan='8'></td>"+
				  		      "</tr>"+
				  		      "</table>";
	    }
	    $("#detail").html(optList.join("\n"));
    });
}

$(document).ready(function(){
	selectImportOriginDetail();
	selectImportOriginDetail1();
	setTimeout(function(){
		document.frm1.action = "./importOriginExcel.cps";
		document.frm1.excel_data.value = document.getElementById("Import").outerHTML;
		document.frm1.submit();
	},500);
});