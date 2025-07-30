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

public class ItemExcel implements ResultHandler<Map<String,Object>> {
	private HttpServletResponse response;
	private SXSSFSheet sheet;
	private SXSSFWorkbook workbook;
	private boolean isStarted = false;

	XSSFCellStyle style   = null;
	XSSFCellStyle style1  = null;
	XSSFCellStyle style20 = null;
	XSSFCellStyle style22 = null;

	public ItemExcel(HttpServletResponse response){
		this.response = response;
		workbook = new SXSSFWorkbook(100);
		sheet = workbook.createSheet("자재관리");
		sheet.setColumnWidth(0, 2000);
		sheet.setColumnWidth(1, 5000);
		sheet.setColumnWidth(2, 2000);
		sheet.setColumnWidth(3, 9000);
		sheet.setColumnWidth(4, 9000);
		sheet.setColumnWidth(5, 9000);
		sheet.setColumnWidth(6, 9000);
		sheet.setColumnWidth(7, 9000);
		sheet.setColumnWidth(8, 9000);
		sheet.setColumnWidth(9, 9000);
		sheet.setColumnWidth(10, 4000);
		sheet.setColumnWidth(11, 2000);
		sheet.setColumnWidth(12, 2000);
		sheet.setColumnWidth(13, 4000);
		sheet.setColumnWidth(14, 2500);
		sheet.setColumnWidth(15, 2500);
		sheet.setColumnWidth(16, 2500);
		sheet.setColumnWidth(17, 2500);
		sheet.setColumnWidth(18, 2500);
		sheet.setColumnWidth(19, 5000);
		sheet.setColumnWidth(20, 9000);
		sheet.setColumnWidth(21, 9000);
		sheet.setColumnWidth(22, 9000);
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

        		response.setHeader("Content-Disposition","attachment;filename=\""+URLEncoder.encode("자재관리.xlsx", "UTF-8")+"\"");
        		isStarted = true;
        		SXSSFRow row = sheet.createRow(0);
        		SXSSFCell cell = row.createCell(0);
        		cell.setCellValue("사용여부");
        		cell.setCellStyle(style);
        		cell = row.createCell(1);
        		cell.setCellValue("자재코드");
        		cell.setCellStyle(style);
        		cell = row.createCell(2);
        		cell.setCellValue("요건구분");
        		cell.setCellStyle(style);
        		cell = row.createCell(3);
        		cell.setCellValue("표준품명");
        		cell.setCellStyle(style);
        		cell = row.createCell(4);
        		cell.setCellValue("규격1");
        		cell.setCellStyle(style);
        		cell = row.createCell(5);
        		cell.setCellValue("규격2");
        		cell.setCellStyle(style);
        		cell = row.createCell(6);
        		cell.setCellValue("규격3");
        		cell.setCellStyle(style);
        		cell = row.createCell(7);
        		cell.setCellValue("성분1");
        		cell.setCellStyle(style);
        		cell = row.createCell(8);
        		cell.setCellValue("성분2");
        		cell.setCellStyle(style);
        		cell = row.createCell(9);
        		cell.setCellValue("성분3");
        		cell.setCellStyle(style);
        		cell = row.createCell(10);
        		cell.setCellValue("세번부호");
        		cell.setCellStyle(style);
        		cell = row.createCell(11);
        		cell.setCellValue("종");
        		cell.setCellStyle(style);
        		cell = row.createCell(12);
        		cell.setCellValue("율");
        		cell.setCellStyle(style);
        		cell = row.createCell(13);
        		cell.setCellValue("단가");
        		cell.setCellStyle(style);
        		cell = row.createCell(14);
        		cell.setCellValue("인도조건");
        		cell.setCellStyle(style);
        		cell = row.createCell(15);
        		cell.setCellValue("통화");
        		cell.setCellStyle(style);
        		cell = row.createCell(16);
        		cell.setCellValue("원산국");
        		cell.setCellStyle(style);
        		cell = row.createCell(17);
        		cell.setCellValue("개별환급");
        		cell.setCellStyle(style);
        		cell = row.createCell(18);
        		cell.setCellValue("원상태수출");
        		cell.setCellStyle(style);
        		cell = row.createCell(19);
        		cell.setCellValue("FTA Remark");
        		cell.setCellStyle(style);
        		cell = row.createCell(20);
        		cell.setCellValue("Vendor");
        		cell.setCellStyle(style);
        		cell = row.createCell(21);
        		cell.setCellValue("비고1");
        		cell.setCellStyle(style);
        		cell = row.createCell(22);
        		cell.setCellValue("비고2");
        		cell.setCellStyle(style);
        	}

        	Map<String, Object> dataRow = result.getResultObject();
        	Row row = sheet.createRow(result.getResultCount());
        	Cell cell = null;
        	cell = row.createCell(0);
        	cell.setCellValue(dataRow.get("useYn")==null ? "" : dataRow.get("useYn").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(1);
        	cell.setCellValue(dataRow.get("Mmodel_code")==null ? "" : dataRow.get("Mmodel_code").toString());
        	cell.setCellStyle(style1);
        	cell = row.createCell(2);
        	cell.setCellValue(dataRow.get("Myog_flag")==null ? "" : dataRow.get("Myog_flag").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(3);
        	cell.setCellValue(dataRow.get("Mstd_goods")==null ? "" : dataRow.get("Mstd_goods").toString());
        	cell.setCellStyle(style1);
        	cell = row.createCell(4);
        	cell.setCellValue(dataRow.get("Mmodel_1")==null ? "" : dataRow.get("Mmodel_1").toString());
        	cell.setCellStyle(style1);
        	cell = row.createCell(5);
        	cell.setCellValue(dataRow.get("Mmodel_2")==null ? "" : dataRow.get("Mmodel_2").toString());
        	cell.setCellStyle(style1);
        	cell = row.createCell(6);
        	cell.setCellValue(dataRow.get("Mmodel_3")==null ? "" : dataRow.get("Mmodel_3").toString());
        	cell.setCellStyle(style1);
        	cell = row.createCell(7);
        	cell.setCellValue(dataRow.get("Mingredient_1")==null ? "" : dataRow.get("Mingredient_1").toString());
        	cell.setCellStyle(style1);
        	cell = row.createCell(8);
        	cell.setCellValue(dataRow.get("Mingredient_2")==null ? "" : dataRow.get("Mingredient_2").toString());
        	cell.setCellStyle(style1);
        	cell = row.createCell(9);
        	cell.setCellValue(dataRow.get("Mingredient_3")==null ? "" : dataRow.get("Mingredient_3").toString());
        	cell.setCellStyle(style1);
        	cell = row.createCell(10);
        	cell.setCellValue(dataRow.get("Mhs_code")==null ? "" : dataRow.get("Mhs_code").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(11);
        	cell.setCellValue(dataRow.get("Mhs_kind")==null ? "" : dataRow.get("Mhs_kind").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(12);
        	cell.setCellValue(Double.parseDouble(dataRow.get("Mhs_rate").toString())==0 ? 0 : Double.parseDouble(dataRow.get("Mhs_rate").toString()));
        	cell.setCellStyle(style22);
        	cell = row.createCell(13);
        	cell.setCellValue(Double.parseDouble(dataRow.get("Munitprice").toString())==0 ? 0 : Double.parseDouble(dataRow.get("Munitprice").toString()));
        	cell.setCellStyle(style22);
        	cell = row.createCell(14);
        	cell.setCellValue(dataRow.get("Mindo_code")==null ? "" : dataRow.get("Mindo_code").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(15);
        	cell.setCellValue(dataRow.get("Munitprice_current")==null ? "" : dataRow.get("Munitprice_current").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(16);
        	cell.setCellValue(dataRow.get("Morigin1")==null ? "" : dataRow.get("Morigin1").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(17);
        	cell.setCellValue(dataRow.get("RefundYN")==null ? "" : dataRow.get("RefundYN").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(18);
        	cell.setCellValue(dataRow.get("OrigExpYN")==null ? "" : dataRow.get("OrigExpYN").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(19);
        	cell.setCellValue(dataRow.get("fta_text")==null ? "" : dataRow.get("fta_text").toString());
        	cell.setCellStyle(style1);
        	cell = row.createCell(20);
        	cell.setCellValue(dataRow.get("Mshipper")==null ? "" : dataRow.get("Mshipper").toString());
        	cell.setCellStyle(style1);
        	cell = row.createCell(21);
        	cell.setCellValue(dataRow.get("Mremark1")==null ? "" : dataRow.get("Mremark1").toString());
        	cell.setCellStyle(style1);
        	cell = row.createCell(22);
        	cell.setCellValue(dataRow.get("Mremark2")==null ? "" : dataRow.get("Mremark2").toString());
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