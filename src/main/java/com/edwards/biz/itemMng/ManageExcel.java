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

public class ManageExcel implements ResultHandler<Map<String,Object>> {
	private HttpServletResponse response;
	private SXSSFSheet sheet;
	private SXSSFWorkbook workbook;
	private boolean isStarted = false;

	XSSFCellStyle style   = null;
	XSSFCellStyle style1  = null;
	XSSFCellStyle style20 = null;
	XSSFCellStyle style22 = null;

	public ManageExcel(HttpServletResponse response){
		this.response = response;
		workbook = new SXSSFWorkbook(100);
		sheet = workbook.createSheet("Import Management");
		sheet.setColumnWidth(0, 2500);
		sheet.setColumnWidth(1, 4000);
		sheet.setColumnWidth(2, 5000);
		sheet.setColumnWidth(3, 2500);
		sheet.setColumnWidth(4, 3000);
		sheet.setColumnWidth(5, 3000);
		sheet.setColumnWidth(6, 3000);
		sheet.setColumnWidth(7, 2500);
		sheet.setColumnWidth(8, 4000);
		sheet.setColumnWidth(9, 2000);
		sheet.setColumnWidth(10, 3000);
		sheet.setColumnWidth(11, 3500);
		sheet.setColumnWidth(12, 4000);
		sheet.setColumnWidth(13, 7000);
		sheet.setColumnWidth(14, 3000);
		sheet.setColumnWidth(15, 3000);
		sheet.setColumnWidth(16, 2500);
		sheet.setColumnWidth(17, 2500);
		sheet.setColumnWidth(18, 4000);
		sheet.setColumnWidth(19, 4000);
		sheet.setColumnWidth(20, 2500);
		sheet.setColumnWidth(21, 2500);
		sheet.setColumnWidth(22, 2500);
		sheet.setColumnWidth(23, 3500);
		sheet.setColumnWidth(24, 3000);
		sheet.setColumnWidth(25, 6000);
		sheet.setColumnWidth(26, 5000);
		sheet.setColumnWidth(27, 6000);
		sheet.setColumnWidth(28, 4000);
		sheet.setColumnWidth(29, 2500);
		sheet.setColumnWidth(30, 3000);
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

        		response.setHeader("Content-Disposition","attachment;filename=\""+URLEncoder.encode("ImportManagement.xlsx", "UTF-8")+"\"");
        		isStarted = true;
        		SXSSFRow row = sheet.createRow(0);
        		SXSSFCell cell = row.createCell(0);
        		cell.setCellValue("ETA");
        		cell.setCellStyle(style);
        		cell = row.createCell(1);
        		cell.setCellValue("B/L(AWB) No");
        		cell.setCellStyle(style);
        		cell = row.createCell(2);
        		cell.setCellValue("수입신고번호");
        		cell.setCellStyle(style);
        		cell = row.createCell(3);
        		cell.setCellValue("수입신고수리일");
        		cell.setCellStyle(style);
        		cell = row.createCell(4);
        		cell.setCellValue("Unique No.");
        		cell.setCellStyle(style);
        		cell = row.createCell(5);
        		cell.setCellValue("DN");
        		cell.setCellStyle(style);
        		cell = row.createCell(6);
        		cell.setCellValue("INV No.");
        		cell.setCellStyle(style);
        		cell = row.createCell(7);
        		cell.setCellValue("INV Date");
        		cell.setCellStyle(style);
        		cell = row.createCell(8);
        		cell.setCellValue("PO No");
        		cell.setCellStyle(style);
        		cell = row.createCell(9);
        		cell.setCellValue("Origin");
        		cell.setCellStyle(style);
        		cell = row.createCell(10);
        		cell.setCellValue("Product Code");
        		cell.setCellStyle(style);
        		cell = row.createCell(11);
        		cell.setCellValue("Global Code");
        		cell.setCellStyle(style);
        		cell = row.createCell(12);
        		cell.setCellValue("IRIS Code");
        		cell.setCellStyle(style);
        		cell = row.createCell(13);
        		cell.setCellValue("Description");
        		cell.setCellStyle(style);
        		cell = row.createCell(14);
        		cell.setCellValue("Lot No");
        		cell.setCellStyle(style);
        		cell = row.createCell(15);
        		cell.setCellValue("EXP Date(YY/MM)");
        		cell.setCellStyle(style);
        		cell = row.createCell(16);
        		cell.setCellValue("Qty");
        		cell.setCellStyle(style);
        		cell = row.createCell(17);
        		cell.setCellValue("UM");
        		cell.setCellStyle(style);
        		cell = row.createCell(18);
        		cell.setCellValue("Unit Price");
        		cell.setCellStyle(style);
        		cell = row.createCell(19);
        		cell.setCellValue("Total Amount");
        		cell.setCellStyle(style);
        		cell = row.createCell(20);
        		cell.setCellValue("CURR");
        		cell.setCellStyle(style);
        		cell = row.createCell(21);
        		cell.setCellValue("세종");
        		cell.setCellStyle(style);
        		cell = row.createCell(22);
        		cell.setCellValue("세율");
        		cell.setCellStyle(style);
        		cell = row.createCell(23);
        		cell.setCellValue("HS CODE(KR)");
        		cell.setCellStyle(style);
        		cell = row.createCell(24);
        		cell.setCellValue("요건대상여부");
        		cell.setCellStyle(style);
        		cell = row.createCell(25);
        		cell.setCellValue("요건내용");
        		cell.setCellStyle(style);
        		cell = row.createCell(26);
        		cell.setCellValue("허가번호");
        		cell.setCellStyle(style);
        		cell = row.createCell(27);
        		cell.setCellValue("표준통관예정보고");
        		cell.setCellStyle(style);
        		cell = row.createCell(28);
        		cell.setCellValue("배송지");
        		cell.setCellStyle(style);
        		cell = row.createCell(29);
        		cell.setCellValue("배송일");
        		cell.setCellStyle(style);
        		cell = row.createCell(30);
        		cell.setCellValue("차수");
        		cell.setCellStyle(style);
        	}

        	Map<String, Object> dataRow = result.getResultObject();
        	Row row = sheet.createRow(result.getResultCount());
        	Cell cell = null;
        	cell = row.createCell(0);
        	cell.setCellValue(dataRow.get("impo_iphang_date")==null ? "" : dataRow.get("impo_iphang_date").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(1);
        	cell.setCellValue(dataRow.get("impo_bl_no")==null ? "" : dataRow.get("impo_bl_no").toString());
        	cell.setCellStyle(style1);
        	cell = row.createCell(2);
        	cell.setCellValue(dataRow.get("impo_singo_no1")==null ? "" : dataRow.get("impo_singo_no1").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(3);
        	cell.setCellValue(dataRow.get("impo_ok_date")==null ? "" : dataRow.get("impo_ok_date").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(4);
        	cell.setCellValue(dataRow.get("unique_no")==null ? "" : dataRow.get("unique_no").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(5);
        	cell.setCellValue(dataRow.get("DN")==null ? "" : dataRow.get("DN").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(6);
        	cell.setCellValue(dataRow.get("invoice_no")==null ? "" : dataRow.get("invoice_no").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(7);
        	cell.setCellValue(dataRow.get("invoice_dt")==null ? "" : dataRow.get("invoice_dt").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(8);
        	cell.setCellValue(dataRow.get("Impum_sungbun1")==null ? "" : dataRow.get("Impum_sungbun1").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(9);
        	cell.setCellValue(dataRow.get("Imlan_wonsanji_code")==null ? "" : dataRow.get("Imlan_wonsanji_code").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(10);
        	cell.setCellValue(dataRow.get("Mdivision_code")==null ? "" : dataRow.get("Mdivision_code").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(11);
        	cell.setCellValue(dataRow.get("Impum_jajae_code")==null ? "" : dataRow.get("Impum_jajae_code").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(12);
        	cell.setCellValue(dataRow.get("Mattached4")==null ? "" : dataRow.get("Mattached4").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(13);
        	cell.setCellValue(dataRow.get("Impum_gukyk")==null ? "" : dataRow.get("Impum_gukyk").toString());
        	cell.setCellStyle(style1);
        	cell = row.createCell(14);
        	cell.setCellValue(dataRow.get("Impum_sungbun2")==null ? "" : dataRow.get("Impum_sungbun2").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(15);
        	cell.setCellValue(dataRow.get("Impum_sungbun3")==null ? "" : dataRow.get("Impum_sungbun3").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(16);
        	cell.setCellValue(Double.parseDouble(dataRow.get("Impum_su").toString())==0 ? 0 : Double.parseDouble(dataRow.get("Impum_su").toString()));
        	cell.setCellStyle(style20);
        	cell = row.createCell(17);
        	cell.setCellValue(dataRow.get("Impum_su_danwi")==null ? "" : dataRow.get("Impum_su_danwi").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(18);
        	cell.setCellValue(Double.parseDouble(dataRow.get("Impum_danga").toString())==0 ? 0 : Double.parseDouble(dataRow.get("Impum_danga").toString()));
        	cell.setCellStyle(style22);
        	cell = row.createCell(19);
        	cell.setCellValue(Double.parseDouble(dataRow.get("Impum_amt").toString())==0 ? 0 : Double.parseDouble(dataRow.get("Impum_amt").toString()));
        	cell.setCellStyle(style22);
        	cell = row.createCell(20);
        	cell.setCellValue(dataRow.get("Munitprice_current")==null ? "" : dataRow.get("Munitprice_current").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(21);
        	cell.setCellValue(dataRow.get("Mhs_kind")==null ? "" : dataRow.get("Mhs_kind").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(22);
        	cell.setCellValue(dataRow.get("Mhs_rate")==null ? "" : dataRow.get("Mhs_rate").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(23);
        	cell.setCellValue(dataRow.get("Mhs_code")==null ? "" : dataRow.get("Mhs_code").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(24);
        	cell.setCellValue(dataRow.get("Myog_flag")==null ? "" : dataRow.get("Myog_flag").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(25);
        	cell.setCellValue(dataRow.get("Myog_ok_no")==null ? "" : dataRow.get("Myog_ok_no").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(26);
        	cell.setCellValue(dataRow.get("Mattached5")==null ? "" : dataRow.get("Mattached5").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(27);
        	cell.setCellValue(dataRow.get("Suipyogun_no")==null ? "" : dataRow.get("Suipyogun_no").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(28);
        	cell.setCellValue(dataRow.get("TransCom")==null ? "" : dataRow.get("TransCom").toString());
        	cell.setCellStyle(style1);
        	cell = row.createCell(29);
        	cell.setCellValue(dataRow.get("TransDt")==null ? "" : dataRow.get("TransDt").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(30);
        	cell.setCellValue(dataRow.get("TransChsu")==null ? "" : dataRow.get("TransChsu").toString());
        	cell.setCellStyle(style);
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