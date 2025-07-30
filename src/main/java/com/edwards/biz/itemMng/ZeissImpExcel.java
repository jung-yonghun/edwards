package com.edwards.biz.itemMng;

import java.io.OutputStream;
import java.util.Map;
import java.net.URLEncoder;

import javax.servlet.http.HttpServletResponse;

import org.apache.ibatis.session.ResultContext;
import org.apache.ibatis.session.ResultHandler;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.hssf.usermodel.HSSFDataFormat;
import org.apache.poi.xssf.streaming.*;
import org.apache.poi.xssf.usermodel.*;

public class ZeissImpExcel implements ResultHandler<Map<String,Object>> {
	private HttpServletResponse response;
	private SXSSFSheet sheet;
	private SXSSFWorkbook workbook;
	private boolean isStarted = false;

	XSSFCellStyle style   = null;
	XSSFCellStyle style1  = null;
	XSSFCellStyle style20 = null;
	XSSFCellStyle style22 = null;

	public ZeissImpExcel(HttpServletResponse response){
		this.response = response;
		workbook = new SXSSFWorkbook(100);
		sheet = workbook.createSheet("Import Status");
		sheet.setColumnWidth(0, 2000);
		sheet.setColumnWidth(1, 2500);
		sheet.setColumnWidth(2, 4000);
		sheet.setColumnWidth(3, 2500);
		sheet.setColumnWidth(4, 5000);
		sheet.setColumnWidth(5, 5000);
		sheet.setColumnWidth(6, 2500);
		sheet.setColumnWidth(7, 2500);
		sheet.setColumnWidth(8, 2500);
		sheet.setColumnWidth(9, 2500);
		sheet.setColumnWidth(10, 4000);
		sheet.setColumnWidth(11, 4000);
		sheet.setColumnWidth(12, 4000);
		sheet.setColumnWidth(13, 7000);
		sheet.setColumnWidth(14, 4000);
		sheet.setColumnWidth(15, 3000);
		sheet.setColumnWidth(16, 3000);
		sheet.setColumnWidth(17, 7000);
		sheet.setColumnWidth(18, 2500);
		sheet.setColumnWidth(19, 2500);
		sheet.setColumnWidth(20, 7000);
		sheet.setColumnWidth(21, 4000);
		sheet.setColumnWidth(22, 4000);
		sheet.setColumnWidth(23, 3000);
		sheet.setColumnWidth(24, 3000);
		sheet.setColumnWidth(25, 3000);
		sheet.setColumnWidth(26, 3000);
		sheet.setColumnWidth(27, 3000);
		sheet.setColumnWidth(28, 5000);
		sheet.setColumnWidth(29, 7000);
		sheet.setColumnWidth(30, 3000);
		sheet.setColumnWidth(31, 3000);
		sheet.setColumnWidth(32, 5000);
		sheet.setColumnWidth(33, 5000);
		sheet.setColumnWidth(34, 5000);
	}

	@Override
	public void handleResult(ResultContext<? extends Map<String, Object>> result){
		try {
			if(!isStarted){
        		style   = (XSSFCellStyle) workbook.createCellStyle();
        		style1  = (XSSFCellStyle) workbook.createCellStyle();
        		style20 = (XSSFCellStyle) workbook.createCellStyle();
        		style22 = (XSSFCellStyle) workbook.createCellStyle();

        		style.setBorderBottom(BorderStyle.THIN);
            	style.setBorderLeft(BorderStyle.THIN);
            	style.setBorderRight(BorderStyle.THIN);
            	style.setBorderTop(BorderStyle.THIN);
        		style.setAlignment(HorizontalAlignment.CENTER);

        		style1.setBorderBottom(BorderStyle.THIN);
            	style1.setBorderLeft(BorderStyle.THIN);
            	style1.setBorderRight(BorderStyle.THIN);
            	style1.setBorderTop(BorderStyle.THIN);

        		style20.setDataFormat(HSSFDataFormat.getBuiltinFormat("#,##0"));
        		style20.setBorderBottom(BorderStyle.THIN);
            	style20.setBorderLeft(BorderStyle.THIN);
            	style20.setBorderRight(BorderStyle.THIN);
            	style20.setBorderTop(BorderStyle.THIN);
        		style20.setAlignment(HorizontalAlignment.RIGHT);

        		style22.setDataFormat(HSSFDataFormat.getBuiltinFormat("#,##0.00"));
        		style22.setBorderBottom(BorderStyle.THIN);
        		style22.setBorderLeft(BorderStyle.THIN);
        		style22.setBorderRight(BorderStyle.THIN);
        		style22.setBorderTop(BorderStyle.THIN);
        		style22.setAlignment(HorizontalAlignment.RIGHT);

        		response.setHeader("Content-Disposition","attachment;filename=\""+URLEncoder.encode("ImportStatus.xlsx", "UTF-8")+"\"");
        		isStarted = true;
        		SXSSFRow row = sheet.createRow(0);
        		SXSSFCell cell = row.createCell(0);
        		cell.setCellValue("Status");
        		cell.setCellStyle(style);
        		cell = row.createCell(1);
        		cell.setCellValue("검사여부");
        		cell.setCellStyle(style);
        		cell = row.createCell(2);
        		cell.setCellValue("납세자상호");
        		cell.setCellStyle(style);
        		cell = row.createCell(3);
        		cell.setCellValue("사업부");
        		cell.setCellStyle(style);
        		cell = row.createCell(4);
        		cell.setCellValue("B/L No");
        		cell.setCellStyle(style);
        		cell = row.createCell(5);
        		cell.setCellValue("신고번호");
        		cell.setCellStyle(style);
        		cell = row.createCell(6);
        		cell.setCellValue("입항일");
        		cell.setCellStyle(style);
        		cell = row.createCell(7);
        		cell.setCellValue("반입일");
        		cell.setCellStyle(style);
        		cell = row.createCell(8);
        		cell.setCellValue("신고일");
        		cell.setCellStyle(style);
        		cell = row.createCell(9);
        		cell.setCellValue("수리일");
        		cell.setCellStyle(style);
        		cell = row.createCell(10);
        		cell.setCellValue("반출일");
        		cell.setCellStyle(style);
        		cell = row.createCell(11);
        		cell.setCellValue("INV NO");
        		cell.setCellStyle(style);
        		cell = row.createCell(12);
        		cell.setCellValue("PO NO");
        		cell.setCellStyle(style);
        		cell = row.createCell(13);
        		cell.setCellValue("무역거래처");
        		cell.setCellStyle(style);
        		cell = row.createCell(14);
        		cell.setCellValue("적출국");
        		cell.setCellStyle(style);
        		cell = row.createCell(15);
        		cell.setCellValue("세관");
        		cell.setCellStyle(style);
        		cell = row.createCell(16);
        		cell.setCellValue("양륙항");
        		cell.setCellStyle(style);
        		cell = row.createCell(17);
        		cell.setCellValue("장지장소");
        		cell.setCellStyle(style);
        		cell = row.createCell(18);
        		cell.setCellValue("포장수량");
        		cell.setCellStyle(style);
        		cell = row.createCell(19);
        		cell.setCellValue("중량");
        		cell.setCellStyle(style);
        		cell = row.createCell(20);
        		cell.setCellValue("Forwarder");
        		cell.setCellStyle(style);
        		cell = row.createCell(21);
        		cell.setCellValue("Invoice Amount");
        		cell.setCellStyle(style);
        		cell = row.createCell(22);
        		cell.setCellValue("총세액");
        		cell.setCellStyle(style);
        		cell = row.createCell(23);
        		cell.setCellValue("과세운임(원)");
        		cell.setCellStyle(style);
        		cell = row.createCell(24);
        		cell.setCellValue("CIF(원)");
        		cell.setCellStyle(style);
        		cell = row.createCell(25);
        		cell.setCellValue("관세");
        		cell.setCellStyle(style);
        		cell = row.createCell(26);
        		cell.setCellValue("부가세");
        		cell.setCellStyle(style);
        		cell = row.createCell(27);
        		cell.setCellValue("기타세");
        		cell.setCellStyle(style);
        		cell = row.createCell(28);
        		cell.setCellValue("자재코드");
        		cell.setCellStyle(style);
        		cell = row.createCell(29);
        		cell.setCellValue("거래품명");
        		cell.setCellStyle(style);
        		cell = row.createCell(30);
        		cell.setCellValue("수량");
        		cell.setCellStyle(style);
        		cell = row.createCell(31);
        		cell.setCellValue("단위");
        		cell.setCellStyle(style);
        		cell = row.createCell(32);
        		cell.setCellValue("규격1");
        		cell.setCellStyle(style);
        		cell = row.createCell(33);
        		cell.setCellValue("규격2");
        		cell.setCellStyle(style);
        		cell = row.createCell(34);
        		cell.setCellValue("규격3");
        		cell.setCellStyle(style);
        	}

        	Map<String, Object> dataRow = result.getResultObject();
        	Row row = sheet.createRow(result.getResultCount());
        	Cell cell = null;
        	cell = row.createCell(0);
        	cell.setCellValue(dataRow.get("Impo_receive_result")==null ? "" : dataRow.get("Impo_receive_result").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(1);
        	cell.setCellValue(dataRow.get("Impo_cs")==null ? "" : dataRow.get("Impo_cs").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(2);
        	cell.setCellValue(dataRow.get("Impo_napse_sangho")==null ? "" : dataRow.get("Impo_napse_sangho").toString());
        	cell.setCellStyle(style1);
        	cell = row.createCell(3);
        	cell.setCellValue(dataRow.get("Impo_gonggub")==null ? "" : dataRow.get("Impo_gonggub").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(4);
        	cell.setCellValue(dataRow.get("Impo_bl_no")==null ? "" : dataRow.get("Impo_bl_no").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(5);
        	cell.setCellValue(dataRow.get("Impo_singo_no")==null ? "" : dataRow.get("Impo_singo_no").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(6);
        	cell.setCellValue(dataRow.get("Impo_iphang_date")==null ? "" : dataRow.get("Impo_iphang_date").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(7);
        	cell.setCellValue(dataRow.get("Impo_banip_date")==null ? "" : dataRow.get("Impo_banip_date").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(8);
        	cell.setCellValue(dataRow.get("Impo_singo_date")==null ? "" : dataRow.get("Impo_singo_date").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(9);
        	cell.setCellValue(dataRow.get("Impo_Ok_date")==null ? "" : dataRow.get("Impo_Ok_date").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(10);
        	cell.setCellValue(dataRow.get("impo_upja_sangho")==null ? "" : dataRow.get("impo_upja_sangho").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(11);
        	cell.setCellValue(dataRow.get("IVNO")==null ? "" : dataRow.get("IVNO").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(12);
        	cell.setCellValue(dataRow.get("PONO")==null ? "" : dataRow.get("PONO").toString());
        	cell.setCellStyle(style1);
        	cell = row.createCell(13);
        	cell.setCellValue(dataRow.get("Impo_gonggub_sangho")==null ? "" : dataRow.get("Impo_gonggub_sangho").toString());
        	cell.setCellStyle(style1);
        	cell = row.createCell(14);
        	cell.setCellValue(dataRow.get("Impo_jukchl_name")==null ? "" : dataRow.get("Impo_jukchl_name").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(15);
        	cell.setCellValue(dataRow.get("segwanName")==null ? "" : dataRow.get("segwanName").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(16);
        	cell.setCellValue(dataRow.get("Impo_hanggu_name")==null ? "" : dataRow.get("Impo_hanggu_name").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(17);
        	cell.setCellValue(dataRow.get("Impo_jangch_name")==null ? "" : dataRow.get("Impo_jangch_name").toString());
        	cell.setCellStyle(style1);
        	cell = row.createCell(18);
        	cell.setCellValue(Double.parseDouble(dataRow.get("Impo_pojang_su").toString())==0 ? 0 : Double.parseDouble(dataRow.get("Impo_pojang_su").toString()));
        	cell.setCellStyle(style20);
        	cell = row.createCell(19);
        	cell.setCellValue(Double.parseDouble(dataRow.get("Impo_total_jung").toString())==0 ? 0 : Double.parseDouble(dataRow.get("Impo_total_jung").toString()));
        	cell.setCellStyle(style22);
        	cell = row.createCell(20);
        	cell.setCellValue(dataRow.get("Impo_Forwarder_sangho")==null ? "" : dataRow.get("Impo_Forwarder_sangho").toString());
        	cell.setCellStyle(style1);
        	cell = row.createCell(21);
        	cell.setCellValue(Double.parseDouble(dataRow.get("Impo_Gyelje_Input").toString())==0 ? 0 : Double.parseDouble(dataRow.get("Impo_Gyelje_Input").toString()));
        	cell.setCellStyle(style20);
        	cell = row.createCell(22);
        	cell.setCellValue(Double.parseDouble(dataRow.get("Impo_total_tax").toString())==0 ? 0 : Double.parseDouble(dataRow.get("Impo_total_tax").toString()));
        	cell.setCellStyle(style20);
        	cell = row.createCell(23);
        	cell.setCellValue(Double.parseDouble(dataRow.get("Impo_fre_won").toString())==0 ? 0 : Double.parseDouble(dataRow.get("Impo_fre_won").toString()));
        	cell.setCellStyle(style20);
        	cell = row.createCell(24);
        	cell.setCellValue(Double.parseDouble(dataRow.get("Impo_cif_total_won").toString())==0 ? 0 : Double.parseDouble(dataRow.get("Impo_cif_total_won").toString()));
        	cell.setCellStyle(style20);
        	cell = row.createCell(25);
        	cell.setCellValue(Double.parseDouble(dataRow.get("Impo_gwan_tax").toString())==0 ? 0 : Double.parseDouble(dataRow.get("Impo_gwan_tax").toString()));
        	cell.setCellStyle(style20);
        	cell = row.createCell(26);
        	cell.setCellValue(Double.parseDouble(dataRow.get("Impo_vat_tax").toString())==0 ? 0 : Double.parseDouble(dataRow.get("Impo_vat_tax").toString()));
        	cell.setCellStyle(style20);
        	cell = row.createCell(27);
        	cell.setCellValue(Double.parseDouble(dataRow.get("Impo_etc_tax").toString())==0 ? 0 : Double.parseDouble(dataRow.get("Impo_etc_tax").toString()));
        	cell.setCellStyle(style20);
        	cell = row.createCell(28);
        	cell.setCellValue(dataRow.get("Impum_jajae_code")==null ? "" : dataRow.get("Impum_jajae_code").toString());
        	cell.setCellStyle(style1);
        	cell = row.createCell(29);
        	cell.setCellValue(dataRow.get("imlanGuraePum")==null ? "" : dataRow.get("imlanGuraePum").toString());
        	cell.setCellStyle(style1);
        	cell = row.createCell(30);
        	cell.setCellValue(Double.parseDouble(dataRow.get("impum_su").toString())==0 ? 0 : Double.parseDouble(dataRow.get("impum_su").toString()));
        	cell.setCellStyle(style20);
        	cell = row.createCell(31);
        	cell.setCellValue(dataRow.get("Impum_su_danwi")==null ? "" : dataRow.get("Impum_su_danwi").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(32);
        	cell.setCellValue(dataRow.get("Impum_gukyk1")==null ? "" : dataRow.get("Impum_gukyk1").toString());
        	cell.setCellStyle(style1);
        	cell = row.createCell(33);
        	cell.setCellValue(dataRow.get("Impum_gukyk2")==null ? "" : dataRow.get("Impum_gukyk2").toString());
        	cell.setCellStyle(style1);
        	cell = row.createCell(34);
        	cell.setCellValue(dataRow.get("Impum_gukyk3")==null ? "" : dataRow.get("Impum_gukyk3").toString());
        	cell.setCellStyle(style1);
		} catch (Exception e) {
			throw new RuntimeException("JSON streaming Exception", e);
		}
	}

	public void close(){
		try{
			workbook.write(response.getOutputStream());
			workbook.dispose();
		}catch (Exception e){
			response.setHeader("Set-Cookie", "fileDownload=false;path=/");
			response.setHeader("Cache-Control", "no-cache,no-store,must-revalidate");
			response.setHeader("Content-Type", "text/html;charset=utf-8");
			OutputStream out = null;
			try{
				out = response.getOutputStream();
				byte[] data = new String("fail Download.....").getBytes();
				out.write(data,0,data.length);
			}catch(Exception ex){
			}
		}finally{
			if(workbook != null){
				try{ workbook.close();}catch(Exception ex){}
			}
		}
	}
}