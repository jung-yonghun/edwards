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

public class ExKpiExcel implements ResultHandler<Map<String,Object>> {
	private HttpServletResponse response;
	private SXSSFSheet sheet;
	private SXSSFWorkbook workbook;
	private boolean isStarted = false;

	XSSFCellStyle style   = null;
	XSSFCellStyle style1  = null;
	XSSFCellStyle style20 = null;
	XSSFCellStyle style22 = null;

	public ExKpiExcel(HttpServletResponse response){
		this.response = response;
		workbook = new SXSSFWorkbook(100);
		sheet = workbook.createSheet("수출KPI");
		sheet.setColumnWidth(0, 5000);
		sheet.setColumnWidth(1, 3000);
		sheet.setColumnWidth(2, 7000);
		sheet.setColumnWidth(3, 5000);
		sheet.setColumnWidth(4, 2000);
		sheet.setColumnWidth(5, 2000);
		sheet.setColumnWidth(6, 3000);
		sheet.setColumnWidth(7, 3000);
		sheet.setColumnWidth(8, 3000);
		sheet.setColumnWidth(9, 2000);
		sheet.setColumnWidth(10, 1500);
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

        		response.setHeader("Content-Disposition","attachment;filename=\""+URLEncoder.encode("수출KPI.xlsx", "UTF-8")+"\"");
        		isStarted = true;
        		SXSSFRow row = sheet.createRow(0);
        		SXSSFCell cell = row.createCell(0);
        		cell.setCellStyle(style);
        		cell.setCellValue("신고번호");
        		cell = row.createCell(1);
        		cell.setCellStyle(style);
        		cell.setCellValue("InvoiceNo");
        		cell = row.createCell(2);
        		cell.setCellStyle(style);
        		cell.setCellValue("구매자");
        		cell = row.createCell(3);
        		cell.setCellStyle(style);
        		cell.setCellValue("Name of Ship to");
        		cell = row.createCell(4);
        		cell.setCellStyle(style);
        		cell.setCellValue("Plant");
        		cell = row.createCell(5);
        		cell.setCellStyle(style);
        		cell.setCellValue("incoterms");
        		cell = row.createCell(6);
        		cell.setCellStyle(style);
        		cell.setCellValue("Invoice Date");
        		cell = row.createCell(7);
        		cell.setCellStyle(style);
        		cell.setCellValue("수리일");
        		cell = row.createCell(8);
        		cell.setCellStyle(style);
        		cell.setCellValue("선적일");
        		cell = row.createCell(9);
        		cell.setCellStyle(style);
        		cell.setCellValue("Lead Time");
        		cell = row.createCell(10);
        		cell.setCellStyle(style);
        		cell.setCellValue("Result");
        	}

        	Map<String, Object> dataRow = result.getResultObject();
        	Row row = sheet.createRow(result.getResultCount());
        	Cell cell = null;
        	cell = row.createCell(0);
        	cell.setCellStyle(style);
        	cell.setCellValue(dataRow.get("expt_noti_no")==null ? "" : dataRow.get("expt_noti_no").toString());
        	cell = row.createCell(1);
        	cell.setCellStyle(style1);
        	cell.setCellValue(dataRow.get("INV_NO1")==null ? "" : dataRow.get("INV_NO1").toString());
        	cell = row.createCell(2);
        	cell.setCellStyle(style1);
        	cell.setCellValue(dataRow.get("expo_gumaeja_sangho")==null ? "" : dataRow.get("expo_gumaeja_sangho").toString());
        	cell = row.createCell(3);
        	cell.setCellStyle(style1);
        	cell.setCellValue(dataRow.get("NameOfShipto")==null ? "" : dataRow.get("NameOfShipto").toString());
        	cell = row.createCell(4);
        	cell.setCellStyle(style);
        	cell.setCellValue(dataRow.get("Plant")==null ? "" : dataRow.get("Plant").toString());
        	cell = row.createCell(5);
        	cell.setCellStyle(style);
        	cell.setCellValue(dataRow.get("INCOTERMS")==null ? "" : dataRow.get("INCOTERMS").toString());
        	cell = row.createCell(6);
        	cell.setCellStyle(style);
        	cell.setCellValue(dataRow.get("INV_DT")==null ? "" : dataRow.get("INV_DT").toString());
        	cell = row.createCell(7);
        	cell.setCellStyle(style);
        	cell.setCellValue(dataRow.get("expo_ok_date")==null ? "" : dataRow.get("expo_ok_date").toString());
        	cell = row.createCell(8);
        	cell.setCellStyle(style);
        	cell.setCellValue(dataRow.get("expo_LoadedDt")==null ? "" : dataRow.get("expo_LoadedDt").toString());
        	cell = row.createCell(9);
        	cell.setCellStyle(style20);
        	cell.setCellValue(Double.parseDouble(dataRow.get("workday").toString())==0 ? 0 : Double.parseDouble(dataRow.get("workday").toString()));
        	cell = row.createCell(10);
        	cell.setCellStyle(style);
        	cell.setCellValue(dataRow.get("pass")==null ? "" : dataRow.get("pass").toString());
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