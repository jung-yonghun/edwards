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

public class BomExcel implements ResultHandler<Map<String,Object>> {
	private HttpServletResponse response;
	private SXSSFSheet sheet;
	private SXSSFWorkbook workbook;
	private boolean isStarted = false;

	XSSFCellStyle style   = null;
	XSSFCellStyle style1  = null;
	XSSFCellStyle style20 = null;
	XSSFCellStyle style22 = null;

	public BomExcel(HttpServletResponse response){
		this.response = response;
		workbook = new SXSSFWorkbook(100);
		sheet = workbook.createSheet("BOM관리");
		sheet.setColumnWidth(0, 2500);
		sheet.setColumnWidth(1, 2500);
		sheet.setColumnWidth(2, 2500);
		sheet.setColumnWidth(3, 5000);
		sheet.setColumnWidth(4, 7000);
		sheet.setColumnWidth(5, 2500);
		sheet.setColumnWidth(6, 3000);
		sheet.setColumnWidth(7, 4000);
		sheet.setColumnWidth(8, 7000);
		sheet.setColumnWidth(9, 2500);
		sheet.setColumnWidth(10, 2500);
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

        		response.setHeader("Content-Disposition","attachment;filename=\""+URLEncoder.encode("BOM관리.xlsx", "UTF-8")+"\"");
        		isStarted = true;
        		SXSSFRow row = sheet.createRow(0);
        		SXSSFCell cell = row.createCell(0);
        		cell.setCellValue("감면계획");
        		cell.setCellStyle(style);
        		cell = row.createCell(1);
        		cell.setCellValue("용도이행");
        		cell.setCellStyle(style);
        		cell = row.createCell(2);
        		cell.setCellValue("환급");
        		cell.setCellStyle(style);
        		cell = row.createCell(3);
        		cell.setCellValue("아이템코드");
        		cell.setCellStyle(style);
        		cell = row.createCell(4);
        		cell.setCellValue("아이템명");
        		cell.setCellStyle(style);
        		cell = row.createCell(5);
        		cell.setCellValue("Revision번호");
        		cell.setCellStyle(style);
        		cell = row.createCell(6);
        		cell.setCellValue("Revision일시");
        		cell.setCellStyle(style);
        		cell = row.createCell(7);
        		cell.setCellValue("자재코드");
        		cell.setCellStyle(style);
        		cell = row.createCell(8);
        		cell.setCellValue("자재명");
        		cell.setCellStyle(style);
        		cell = row.createCell(9);
        		cell.setCellValue("수량");
        		cell.setCellStyle(style);
        		cell = row.createCell(10);
        		cell.setCellValue("사용여부");
        		cell.setCellStyle(style);
        	}

        	Map<String, Object> dataRow = result.getResultObject();
        	Row row = sheet.createRow(result.getResultCount());
        	Cell cell = null;
        	cell = row.createCell(0);
        	cell.setCellValue(dataRow.get("DEMD_PLAN_FG")==null ? "" : dataRow.get("DEMD_PLAN_FG").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(1);
        	cell.setCellValue(dataRow.get("USE_EXEC_FG")==null ? "" : dataRow.get("USE_EXEC_FG").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(2);
        	cell.setCellValue(dataRow.get("REFUND_USE_FG")==null ? "" : dataRow.get("REFUND_USE_FG").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(3);
        	cell.setCellValue(dataRow.get("BOM_CD")==null ? "" : dataRow.get("BOM_CD").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(4);
        	cell.setCellValue(dataRow.get("BOM_NM")==null ? "" : dataRow.get("BOM_NM").toString());
        	cell.setCellStyle(style1);
        	cell = row.createCell(5);
        	cell.setCellValue(dataRow.get("REVSN_NO")==null ? "" : dataRow.get("REVSN_NO").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(6);
        	cell.setCellValue(dataRow.get("REVSN_DTTM1")==null ? "" : dataRow.get("REVSN_DTTM1").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(7);
        	cell.setCellValue(dataRow.get("ITEM_CD")==null ? "" : dataRow.get("ITEM_CD").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(8);
        	cell.setCellValue(dataRow.get("ITEM_NM")==null ? "" : dataRow.get("ITEM_NM").toString());
        	cell.setCellStyle(style1);
        	cell = row.createCell(9);
        	cell.setCellValue(Double.parseDouble(dataRow.get("QTY").toString())==0 ? 0 : Double.parseDouble(dataRow.get("QTY").toString()));
        	cell.setCellStyle(style20);
        	cell = row.createCell(10);
        	cell.setCellValue(dataRow.get("USE_FG")==null ? "" : dataRow.get("USE_FG").toString());
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