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

public class ImCoExcel implements ResultHandler<Map<String,Object>> {
	private HttpServletResponse response;
	private SXSSFSheet sheet;
	private SXSSFWorkbook workbook;
	private boolean isStarted = false;

	XSSFCellStyle style   = null;
	XSSFCellStyle style1  = null;
	XSSFCellStyle style20 = null;
	XSSFCellStyle style22 = null;

	public ImCoExcel(HttpServletResponse response){
		this.response = response;
		workbook = new SXSSFWorkbook(100);
		sheet = workbook.createSheet("수입CO발급정보");
		sheet.setColumnWidth(0, 4000);
		sheet.setColumnWidth(1, 4000);
		sheet.setColumnWidth(2, 5000);
		sheet.setColumnWidth(3, 5000);
		sheet.setColumnWidth(4, 5000);
		sheet.setColumnWidth(5, 2000);
		sheet.setColumnWidth(6, 9000);
		sheet.setColumnWidth(7, 5000);
		sheet.setColumnWidth(8, 2000);
		sheet.setColumnWidth(9, 5000);
		sheet.setColumnWidth(10, 2000);
		sheet.setColumnWidth(11, 3000);
		sheet.setColumnWidth(12, 5000);
		sheet.setColumnWidth(13, 2000);
		sheet.setColumnWidth(14, 2000);
		sheet.setColumnWidth(15, 4000);
		sheet.setColumnWidth(16, 4000);
		sheet.setColumnWidth(17, 5000);
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

        		response.setHeader("Content-Disposition","attachment;filename=\""+URLEncoder.encode("수입CO발급정보.xlsx", "UTF-8")+"\"");
        		isStarted = true;
        		SXSSFRow row = sheet.createRow(0);
        		SXSSFCell cell = row.createCell(0);
        		cell.setCellStyle(style);
        		cell.setCellValue("발급일자");
        		cell = row.createCell(1);
        		cell.setCellStyle(style);
        		cell.setCellValue("수리일자");
        		cell = row.createCell(2);
        		cell.setCellStyle(style);
        		cell.setCellValue("BL번호");
        		cell = row.createCell(3);
        		cell.setCellStyle(style);
        		cell.setCellValue("원산지증명번호");
        		cell = row.createCell(4);
        		cell.setCellStyle(style);
        		cell.setCellValue("신고번호");
        		cell = row.createCell(5);
        		cell.setCellStyle(style);
        		cell.setCellValue("원산지");
        		cell = row.createCell(6);
        		cell.setCellStyle(style);
        		cell.setCellValue("품명/규격");
        		cell = row.createCell(7);
        		cell.setCellStyle(style);
        		cell.setCellValue("품목번호");
        		cell = row.createCell(8);
        		cell.setCellStyle(style);
        		cell.setCellValue("수량");
        		cell = row.createCell(9);
        		cell.setCellStyle(style);
        		cell.setCellValue("수출자");
        		cell = row.createCell(10);
        		cell.setCellStyle(style);
        		cell.setCellValue("적출국명");
        		cell = row.createCell(11);
        		cell.setCellStyle(style);
        		cell.setCellValue("협정명칭");
        		cell = row.createCell(12);
        		cell.setCellStyle(style);
        		cell.setCellValue("Invoice번호");
        		cell = row.createCell(13);
        		cell.setCellStyle(style);
        		cell.setCellValue("기본세율");
        		cell = row.createCell(14);
        		cell.setCellStyle(style);
        		cell.setCellValue("적용세율");
        		cell = row.createCell(15);
        		cell.setCellStyle(style);
        		cell.setCellValue("관세");
        		cell = row.createCell(16);
        		cell.setCellStyle(style);
        		cell.setCellValue("부가세");
        		cell = row.createCell(17);
        		cell.setCellStyle(style);
        		cell.setCellValue("비고");
        	}

        	Map<String, Object> dataRow = result.getResultObject();
        	Row row = sheet.createRow(result.getResultCount());
        	Cell cell = null;
        	cell = row.createCell(0);
        	cell.setCellStyle(style);
        	cell.setCellValue(dataRow.get("INV_CO_DT1")==null ? "" : dataRow.get("INV_CO_DT1").toString());
        	cell = row.createCell(1);
        	cell.setCellStyle(style);
        	cell.setCellValue(dataRow.get("Impo_ok_dttm1")==null ? "" : dataRow.get("Impo_ok_dttm1").toString());
        	cell = row.createCell(2);
        	cell.setCellStyle(style);
        	cell.setCellValue(dataRow.get("BL_NO")==null ? "" : dataRow.get("BL_NO").toString());
        	cell = row.createCell(3);
        	cell.setCellStyle(style);
        	cell.setCellValue(dataRow.get("wonNo")==null ? "" : dataRow.get("wonNo").toString());
        	cell = row.createCell(4);
        	cell.setCellStyle(style);
        	cell.setCellValue(dataRow.get("IMPT_DECL_NO")==null ? "" : dataRow.get("IMPT_DECL_NO").toString());
        	cell = row.createCell(5);
        	cell.setCellStyle(style);
        	cell.setCellValue(dataRow.get("ORIG")==null ? "" : dataRow.get("ORIG").toString());
        	cell = row.createCell(6);
        	cell.setCellStyle(style1);
        	cell.setCellValue(dataRow.get("ITEM_NM")==null ? "" : dataRow.get("ITEM_NM").toString());
        	cell = row.createCell(7);
        	cell.setCellStyle(style);
        	cell.setCellValue(dataRow.get("ITEM_CD")==null ? "" : dataRow.get("ITEM_CD").toString());
        	cell = row.createCell(8);
        	cell.setCellStyle(style20);
        	cell.setCellValue(Double.parseDouble(dataRow.get("QTY").toString())==0 ? 0 : Double.parseDouble(dataRow.get("QTY").toString()));
        	cell = row.createCell(9);
        	cell.setCellStyle(style1);
        	cell.setCellValue(dataRow.get("EXP_NM")==null ? "" : dataRow.get("EXP_NM").toString());
        	cell = row.createCell(10);
        	cell.setCellStyle(style);
        	cell.setCellValue(dataRow.get("EXTR_NAT")==null ? "" : dataRow.get("EXTR_NAT").toString());
        	cell = row.createCell(11);
        	cell.setCellStyle(style);
        	cell.setCellValue(dataRow.get("ORIG_PACT")==null ? "" : dataRow.get("ORIG_PACT").toString());
        	cell = row.createCell(12);
        	cell.setCellStyle(style);
        	cell.setCellValue(dataRow.get("INV_NO")==null ? "" : dataRow.get("INV_NO").toString());
        	cell = row.createCell(13);
        	cell.setCellStyle(style20);
        	cell.setCellValue(Double.parseDouble(dataRow.get("basic").toString())==0 ? 0 : Double.parseDouble(dataRow.get("basic").toString()));
        	cell = row.createCell(14);
        	cell.setCellStyle(style20);
        	cell.setCellValue(Double.parseDouble(dataRow.get("Mhs_rate").toString())==0 ? 0 : Double.parseDouble(dataRow.get("Mhs_rate").toString()));
        	cell = row.createCell(15);
        	cell.setCellStyle(style20);
        	cell.setCellValue(Double.parseDouble(dataRow.get("TTAX").toString())==0 ? 0 : Double.parseDouble(dataRow.get("TTAX").toString()));
        	cell = row.createCell(16);
        	cell.setCellStyle(style20);
        	cell.setCellValue(Double.parseDouble(dataRow.get("VTAX").toString())==0 ? 0 : Double.parseDouble(dataRow.get("VTAX").toString()));
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