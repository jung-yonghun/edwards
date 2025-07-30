package com.edwards.biz.customsManagement;

import java.io.OutputStream;
import java.util.Map;
import java.net.URLEncoder;

import javax.servlet.http.HttpServletResponse;

import org.apache.ibatis.session.ResultContext;
import org.apache.ibatis.session.ResultHandler;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.hssf.usermodel.HSSFDataFormat;
import org.apache.poi.xssf.streaming.*;
import org.apache.poi.xssf.usermodel.*;

public class PorscheTaxExcel implements ResultHandler<Map<String,Object>> {
	private HttpServletResponse response;
	private SXSSFSheet sheet;
	private SXSSFWorkbook workbook;
	private boolean isStarted = false;

	XSSFCellStyle styleTop  = null;
	XSSFCellStyle style   	= null;
	XSSFCellStyle style1  	= null;
	XSSFCellStyle style20 	= null;
	XSSFCellStyle style22 	= null;

	public PorscheTaxExcel(HttpServletResponse response){
		this.response = response;
		workbook = new SXSSFWorkbook(100);
		sheet = workbook.createSheet("Import Tax");
		sheet.setColumnWidth(0, 6000);
		sheet.setColumnWidth(1, 4000);
		sheet.setColumnWidth(2, 2500);
		sheet.setColumnWidth(3, 2500);
		sheet.setColumnWidth(4, 2000);
		sheet.setColumnWidth(5, 2500);
		sheet.setColumnWidth(6, 5000);
		sheet.setColumnWidth(7, 2000);
		sheet.setColumnWidth(8, 6000);
		sheet.setColumnWidth(9, 2000);
		sheet.setColumnWidth(10, 3500);
		sheet.setColumnWidth(11, 3500);
		sheet.setColumnWidth(12, 3500);
		sheet.setColumnWidth(13, 3500);
		sheet.setColumnWidth(14, 3500);
		sheet.setColumnWidth(15, 3500);
		sheet.setColumnWidth(16, 3500);
		sheet.setColumnWidth(17, 3500);
		sheet.setColumnWidth(18, 3500);
		sheet.setColumnWidth(19, 3500);
		sheet.setColumnWidth(20, 3500);
		sheet.setColumnWidth(21, 3500);
		sheet.setColumnWidth(22, 3500);
		sheet.setColumnWidth(23, 3500);
		sheet.setColumnWidth(24, 3500);
		sheet.setColumnWidth(25, 3500);
	}

	@Override
	public void handleResult(ResultContext<? extends Map<String, Object>> result){
		try {
			if(!isStarted){
        		styleTop  = (XSSFCellStyle) workbook.createCellStyle();
        		style     = (XSSFCellStyle) workbook.createCellStyle();
        		style1    = (XSSFCellStyle) workbook.createCellStyle();
        		style20   = (XSSFCellStyle) workbook.createCellStyle();
        		style22   = (XSSFCellStyle) workbook.createCellStyle();

        		styleTop.setFillForegroundColor(new XSSFColor(new java.awt.Color(0, 234, 234)));
        		styleTop.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        		styleTop.setBorderBottom(BorderStyle.THIN);
        		styleTop.setBorderLeft(BorderStyle.THIN);
        		styleTop.setBorderRight(BorderStyle.THIN);
        		styleTop.setBorderTop(BorderStyle.THIN);
        		styleTop.setAlignment(HorizontalAlignment.CENTER);

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

        		response.setHeader("Content-Disposition","attachment;filename=\""+URLEncoder.encode("ImportTax.xlsx", "UTF-8")+"\"");
        		isStarted = true;
        		SXSSFRow row = sheet.createRow(0);
        		SXSSFCell cell = row.createCell(0);
        		cell.setCellValue("Vessel");
        		cell.setCellStyle(styleTop);
        		cell = row.createCell(1);
        		cell.setCellValue("Registration No");
        		cell.setCellStyle(styleTop);
        		cell = row.createCell(2);
        		cell.setCellValue("Declaration");
        		cell.setCellStyle(styleTop);
        		cell = row.createCell(3);
        		cell.setCellValue("Declaration Acceptance Date");
        		cell.setCellStyle(styleTop);
        		cell = row.createCell(4);
        		cell.setCellValue("Pay notice NO");
        		cell.setCellStyle(styleTop);
        		cell = row.createCell(5);
        		cell.setCellValue("Due Date");
        		cell.setCellStyle(styleTop);
        		cell = row.createCell(6);
        		cell.setCellValue("MODEL");
        		cell.setCellStyle(styleTop);
        		cell = row.createCell(7);
        		cell.setCellValue("O/D No");
        		cell.setCellStyle(styleTop);
        		cell = row.createCell(8);
        		cell.setCellValue("VIN No");
        		cell.setCellStyle(styleTop);
        		cell = row.createCell(9);
        		cell.setCellValue("Model year");
        		cell.setCellStyle(styleTop);
        		cell = row.createCell(10);
        		cell.setCellValue("Customs Value");
        		cell.setCellStyle(styleTop);
        		cell = row.createCell(11);
        		cell.setCellValue("Invoice Price");
        		cell.setCellStyle(styleTop);
        		cell = row.createCell(12);
        		cell.setCellValue("Sea Freight");
        		cell.setCellStyle(styleTop);
        		cell = row.createCell(13);
        		cell.setCellValue("Insurance");
        		cell.setCellStyle(styleTop);
        		cell = row.createCell(14);
        		cell.setCellValue("Additional Charges");
        		cell.setCellStyle(styleTop);
        		cell = row.createCell(15);
        		cell.setCellValue("Customs duty");
        		cell.setCellStyle(styleTop);
        		cell = row.createCell(16);
        		cell.setCellValue("ICT");
        		cell.setCellStyle(styleTop);
        		cell = row.createCell(17);
        		cell.setCellValue("Education Tax");
        		cell.setCellStyle(styleTop);
        		cell = row.createCell(18);
        		cell.setCellValue("VAT Tax");
        		cell.setCellStyle(styleTop);
        		cell = row.createCell(19);
        		cell.setCellValue("TOTAL Tax");
        		cell.setCellStyle(styleTop);
        		cell = row.createCell(20);
        		cell.setCellValue("Commision");
        		cell.setCellStyle(styleTop);
        		cell = row.createCell(21);
        		cell.setCellValue("VAT");
        		cell.setCellStyle(styleTop);
        		cell = row.createCell(22);
        		cell.setCellValue("Commision Total");
        		cell.setCellStyle(styleTop);
        		cell = row.createCell(23);
        		cell.setCellValue("개소세감면액");
        		cell.setCellStyle(styleTop);
        		cell = row.createCell(24);
        		cell.setCellValue("교육세감면액");
        		cell.setCellStyle(styleTop);
        		cell = row.createCell(25);
        		cell.setCellValue("감면액 합계");
        		cell.setCellStyle(styleTop);
        	}

        	Map<String, Object> dataRow = result.getResultObject();
        	Row row = sheet.createRow(result.getResultCount());
        	Cell cell = null;
        	cell = row.createCell(0);
        	cell.setCellValue(dataRow.get("Vessel")==null ? "" : dataRow.get("Vessel").toString());
        	cell.setCellStyle(style1);
        	cell = row.createCell(1);
        	cell.setCellValue(dataRow.get("RegistrationNo")==null ? "" : dataRow.get("RegistrationNo").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(2);
        	cell.setCellValue(dataRow.get("Declaration")==null ? "" : dataRow.get("Declaration").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(3);
        	cell.setCellValue(dataRow.get("DeclarationAcceptance")==null ? "" : dataRow.get("DeclarationAcceptance").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(4);
        	cell.setCellValue(dataRow.get("PayNoticeNO")==null ? "" : dataRow.get("PayNoticeNO").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(5);
        	cell.setCellValue(dataRow.get("DueDate")==null ? "" : dataRow.get("DueDate").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(6);
        	cell.setCellValue(dataRow.get("MODEL")==null ? "" : dataRow.get("MODEL").toString());
        	cell.setCellStyle(style1);
        	cell = row.createCell(7);
        	cell.setCellValue(dataRow.get("ODNo")==null ? "" : dataRow.get("ODNo").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(8);
        	cell.setCellValue(dataRow.get("VINNo")==null ? "" : dataRow.get("VINNo").toString());
        	cell.setCellStyle(style1);
        	cell = row.createCell(9);
        	cell.setCellValue(dataRow.get("Modelyear")==null ? "" : dataRow.get("Modelyear").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(10);
        	cell.setCellValue(Double.parseDouble(dataRow.get("CustomsValue").toString())==0 ? 0 : Double.parseDouble(dataRow.get("CustomsValue").toString()));
        	cell.setCellStyle(style20);
        	cell = row.createCell(11);
        	cell.setCellValue(Double.parseDouble(dataRow.get("InvoicePrice").toString())==0 ? 0 : Double.parseDouble(dataRow.get("InvoicePrice").toString()));
        	cell.setCellStyle(style20);
        	cell = row.createCell(12);
        	cell.setCellValue(Double.parseDouble(dataRow.get("SeaFreight").toString())==0 ? 0 : Double.parseDouble(dataRow.get("SeaFreight").toString()));
        	cell.setCellStyle(style20);
        	cell = row.createCell(13);
        	cell.setCellValue(Double.parseDouble(dataRow.get("Insurance").toString())==0 ? 0 : Double.parseDouble(dataRow.get("Insurance").toString()));
        	cell.setCellStyle(style20);
        	cell = row.createCell(14);
        	cell.setCellValue(Double.parseDouble(dataRow.get("AdditionalCharges").toString())==0 ? 0 : Double.parseDouble(dataRow.get("AdditionalCharges").toString()));
        	cell.setCellStyle(style20);
        	cell = row.createCell(15);
        	cell.setCellValue(Double.parseDouble(dataRow.get("CustomsDuty").toString())==0 ? 0 : Double.parseDouble(dataRow.get("CustomsDuty").toString()));
        	cell.setCellStyle(style20);
        	cell = row.createCell(16);
        	cell.setCellValue(Double.parseDouble(dataRow.get("ICT").toString())==0 ? 0 : Double.parseDouble(dataRow.get("ICT").toString()));
        	cell.setCellStyle(style20);
        	cell = row.createCell(17);
        	cell.setCellValue(Double.parseDouble(dataRow.get("EducationTax").toString())==0 ? 0 : Double.parseDouble(dataRow.get("EducationTax").toString()));
        	cell.setCellStyle(style20);
        	cell = row.createCell(18);
        	cell.setCellValue(Double.parseDouble(dataRow.get("VATTax").toString())==0 ? 0 : Double.parseDouble(dataRow.get("VATTax").toString()));
        	cell.setCellStyle(style20);
        	cell = row.createCell(19);
        	cell.setCellValue(Double.parseDouble(dataRow.get("TOTALTax").toString())==0 ? 0 : Double.parseDouble(dataRow.get("TOTALTax").toString()));
        	cell.setCellStyle(style20);
        	cell = row.createCell(20);
        	cell.setCellValue(Double.parseDouble(dataRow.get("Commision").toString())==0 ? 0 : Double.parseDouble(dataRow.get("Commision").toString()));
        	cell.setCellStyle(style20);
        	cell = row.createCell(21);
        	cell.setCellValue(Double.parseDouble(dataRow.get("VAT").toString())==0 ? 0 : Double.parseDouble(dataRow.get("VAT").toString()));
        	cell.setCellStyle(style20);
        	cell = row.createCell(22);
        	cell.setCellValue(Double.parseDouble(dataRow.get("CommisionTotal").toString())==0 ? 0 : Double.parseDouble(dataRow.get("CommisionTotal").toString()));
        	cell.setCellStyle(style20);
        	cell = row.createCell(23);
        	cell.setCellValue(Double.parseDouble(dataRow.get("geso").toString())==0 ? 0 : Double.parseDouble(dataRow.get("geso").toString()));
        	cell.setCellStyle(style20);
        	cell = row.createCell(24);
        	cell.setCellValue(Double.parseDouble(dataRow.get("edu").toString())==0 ? 0 : Double.parseDouble(dataRow.get("edu").toString()));
        	cell.setCellStyle(style20);
        	cell = row.createCell(25);
        	cell.setCellValue(Double.parseDouble(dataRow.get("gamTotal").toString())==0 ? 0 : Double.parseDouble(dataRow.get("gamTotal").toString()));
        	cell.setCellStyle(style20);
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