package com.edwards.biz.edwardsManagement;

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

public class ExCoExcel implements ResultHandler<Map<String,Object>> {
	private HttpServletResponse response;
	private SXSSFSheet sheet;
	private SXSSFWorkbook workbook;
	private boolean isStarted = false;

	XSSFCellStyle style   = null;
	XSSFCellStyle style1  = null;
	XSSFCellStyle style20 = null;
	XSSFCellStyle style22 = null;

	public ExCoExcel(HttpServletResponse response){
		this.response = response;
		workbook = new SXSSFWorkbook(100);
		sheet = workbook.createSheet("수출CO발급정보");
		sheet.setColumnWidth(0, 4000);
		sheet.setColumnWidth(1, 4000);
		sheet.setColumnWidth(2, 3000);
		sheet.setColumnWidth(3, 5000);
		sheet.setColumnWidth(4, 3000);
		sheet.setColumnWidth(5, 6000);
		sheet.setColumnWidth(6, 6000);
		sheet.setColumnWidth(7, 7000);
		sheet.setColumnWidth(8, 7000);
		sheet.setColumnWidth(9, 9000);
		sheet.setColumnWidth(10, 4000);
		sheet.setColumnWidth(11, 2000);
		sheet.setColumnWidth(12, 3000);
		sheet.setColumnWidth(13, 2000);
		sheet.setColumnWidth(14, 5000);
		sheet.setColumnWidth(15, 2000);
		sheet.setColumnWidth(16, 3000);
		sheet.setColumnWidth(17, 2000);
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

        		response.setHeader("Content-Disposition","attachment;filename=\""+URLEncoder.encode("수출CO발급정보.xlsx", "UTF-8")+"\"");
        		isStarted = true;
        		SXSSFRow row = sheet.createRow(0);
        		SXSSFCell cell = row.createCell(0);
        		cell.setCellStyle(style);
        		cell.setCellValue("Invoice번호");
        		cell = row.createCell(1);
        		cell.setCellStyle(style);
        		cell.setCellValue("발급번호");
        		cell = row.createCell(2);
        		cell.setCellStyle(style);
        		cell.setCellValue("발급일자");
        		cell = row.createCell(3);
        		cell.setCellStyle(style);
        		cell.setCellValue("수출신고번호");
        		cell = row.createCell(4);
        		cell.setCellStyle(style);
        		cell.setCellValue("수출신고일자");
        		cell = row.createCell(5);
        		cell.setCellStyle(style);
        		cell.setCellValue("M B/L No");
        		cell = row.createCell(6);
        		cell.setCellStyle(style);
        		cell.setCellValue("H B/L No");
        		cell = row.createCell(7);
        		cell.setCellStyle(style);
        		cell.setCellValue("Kit코드");
        		cell = row.createCell(8);
        		cell.setCellStyle(style);
        		cell.setCellValue("규격");
        		cell = row.createCell(9);
        		cell.setCellStyle(style);
        		cell.setCellValue("품명");
        		cell = row.createCell(10);
        		cell.setCellStyle(style);
        		cell.setCellValue("품목번호(HS NO)");
        		cell = row.createCell(11);
        		cell.setCellStyle(style);
        		cell.setCellValue("수량");
        		cell = row.createCell(12);
        		cell.setCellStyle(style);
        		cell.setCellValue("금액");
        		cell = row.createCell(13);
        		cell.setCellStyle(style);
        		cell.setCellValue("원산지");
        		cell = row.createCell(14);
        		cell.setCellStyle(style);
        		cell.setCellValue("거래상대방");
        		cell = row.createCell(15);
        		cell.setCellStyle(style);
        		cell.setCellValue("협정명칭");
        		cell = row.createCell(16);
        		cell.setCellStyle(style);
        		cell.setCellValue("원산지결정기준");
        		cell = row.createCell(17);
        		cell.setCellStyle(style);
        		cell.setCellValue("비고");
        	}

        	Map<String, Object> dataRow = result.getResultObject();
        	Row row = sheet.createRow(result.getResultCount());
        	Cell cell = null;
        	cell = row.createCell(0);
        	cell.setCellStyle(style1);
        	cell.setCellValue(dataRow.get("INV_NO1")==null ? "" : dataRow.get("INV_NO1").toString());
        	cell = row.createCell(1);
        	cell.setCellStyle(style1);
        	cell.setCellValue(dataRow.get("wonNo")==null ? "" : dataRow.get("wonNo").toString());
        	cell = row.createCell(2);
        	cell.setCellStyle(style);
        	cell.setCellValue(dataRow.get("INV_DT1")==null ? "" : dataRow.get("INV_DT1").toString());
        	cell = row.createCell(3);
        	cell.setCellStyle(style);
        	cell.setCellValue(dataRow.get("EXPT_DECL_NO")==null ? "" : dataRow.get("EXPT_DECL_NO").toString());
        	cell = row.createCell(4);
        	cell.setCellStyle(style);
        	cell.setCellValue(dataRow.get("Expo_singo_date1")==null ? "" : dataRow.get("Expo_singo_date1").toString());
        	cell = row.createCell(5);
        	cell.setCellStyle(style1);
        	cell.setCellValue(dataRow.get("EXPO_BLNO")==null ? "" : dataRow.get("EXPO_BLNO").toString());
        	cell = row.createCell(6);
        	cell.setCellStyle(style1);
        	cell.setCellValue(dataRow.get("EXPO_HBLNO")==null ? "" : dataRow.get("EXPO_HBLNO").toString());
        	cell = row.createCell(7);
        	cell.setCellStyle(style1);
        	cell.setCellValue(dataRow.get("KitCode")==null ? "" : dataRow.get("KitCode").toString());
        	cell = row.createCell(8);
        	cell.setCellStyle(style1);
        	cell.setCellValue(dataRow.get("PROD_CD")==null ? "" : dataRow.get("PROD_CD").toString());
        	cell = row.createCell(9);
        	cell.setCellStyle(style1);
        	cell.setCellValue(dataRow.get("PROD_NM")==null ? "" : dataRow.get("PROD_NM").toString());
        	cell = row.createCell(10);
        	cell.setCellStyle(style);
        	cell.setCellValue(dataRow.get("HS_CD")==null ? "" : dataRow.get("HS_CD").toString());
        	cell = row.createCell(11);
        	cell.setCellStyle(style20);
        	cell.setCellValue(Double.parseDouble(dataRow.get("QTY").toString())==0 ? 0 : Double.parseDouble(dataRow.get("QTY").toString()));
        	cell = row.createCell(12);
        	cell.setCellStyle(style22);
        	cell.setCellValue(Double.parseDouble(dataRow.get("AMT").toString())==0 ? 0 : Double.parseDouble(dataRow.get("AMT").toString()));
        	cell = row.createCell(13);
        	cell.setCellStyle(style);
        	cell.setCellValue(dataRow.get("ORIG")==null ? "" : dataRow.get("ORIG").toString());
        	cell = row.createCell(14);
        	cell.setCellStyle(style1);
        	cell.setCellValue(dataRow.get("Expo_GuMaeJa_SangHo")==null ? "" : dataRow.get("Expo_GuMaeJa_SangHo").toString());
        	cell = row.createCell(15);
        	cell.setCellStyle(style);
        	cell.setCellValue(dataRow.get("APLY_PACT")==null ? "" : dataRow.get("APLY_PACT").toString());
        	cell = row.createCell(16);
        	cell.setCellStyle(style);
        	cell.setCellValue(dataRow.get("gijun")==null ? "" : dataRow.get("gijun").toString());
        	cell = row.createCell(17);
        	cell.setCellStyle(style1);
        	cell.setCellValue(dataRow.get("etc")==null ? "" : dataRow.get("etc").toString());
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