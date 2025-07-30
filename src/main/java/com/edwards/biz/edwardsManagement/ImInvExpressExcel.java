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

public class ImInvExpressExcel implements ResultHandler<Map<String,Object>> {
	private HttpServletResponse response;
	private SXSSFSheet sheet;
	private SXSSFWorkbook workbook;
	private boolean isStarted = false;

	XSSFCellStyle style   = null;
	XSSFCellStyle style1  = null;
	XSSFCellStyle style20 = null;
	XSSFCellStyle style22 = null;

	public ImInvExpressExcel(HttpServletResponse response){
		this.response = response;
		workbook = new SXSSFWorkbook(100);
		sheet = workbook.createSheet("Express Invoice내역");
		sheet.setColumnWidth(0, 4000);	//B/L No
		sheet.setColumnWidth(1, 4000);	//수입신고번호
		sheet.setColumnWidth(2, 2000);	//Plant No
		sheet.setColumnWidth(3, 1500);	//W/H
		sheet.setColumnWidth(4, 3000);	//W/T
		sheet.setColumnWidth(5, 1500);	//C/T
		sheet.setColumnWidth(6, 4000);	//Invoice No
		sheet.setColumnWidth(7, 3000);	//ETA
		sheet.setColumnWidth(8, 3000);	//Clearance Date
		sheet.setColumnWidth(9, 3000);	//SAP V.C
		sheet.setColumnWidth(10, 1500);	//ZONE
		sheet.setColumnWidth(11, 1500);	//CUR
		sheet.setColumnWidth(12, 1500);	//SHIPPING MODE
		sheet.setColumnWidth(13, 1500);	//AIR/SEA/EXPRESS
		sheet.setColumnWidth(14, 1500);	//TERMS
		sheet.setColumnWidth(15, 1500);	//거래구분
		sheet.setColumnWidth(16, 1500);	//징수형태
		sheet.setColumnWidth(17, 4000);	//NET INVOICE
		sheet.setColumnWidth(18, 4000);	//SHIPPING CHG
		sheet.setColumnWidth(19, 4000);	//TOTAL INVOICE
		sheet.setColumnWidth(20, 2500);	//분할
		sheet.setColumnWidth(21, 5000);	//원산지증명서번호
		sheet.setColumnWidth(22, 3000);	//OLD VC
		sheet.setColumnWidth(23, 5000);	//REMARK
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

        		response.setHeader("Content-Disposition","attachment;filename=\""+URLEncoder.encode("Express Invoice내역.xlsx", "UTF-8")+"\"");
        		isStarted = true;
        		SXSSFRow row = sheet.createRow(0);
        		SXSSFCell cell = row.createCell(0);
        		cell.setCellValue("B/L No");
        		cell.setCellStyle(style);
        		cell = row.createCell(1);
        		cell.setCellValue("수입신고번호");
        		cell.setCellStyle(style);
        		cell = row.createCell(2);
        		cell.setCellValue("Plant No");
        		cell.setCellStyle(style);
        		cell = row.createCell(3);
        		cell.setCellValue("W/H");
        		cell.setCellStyle(style);
        		cell = row.createCell(4);
        		cell.setCellValue("W/T");
        		cell.setCellStyle(style);
        		cell = row.createCell(5);
        		cell.setCellValue("C/T");
        		cell.setCellStyle(style);
        		cell = row.createCell(6);
        		cell.setCellValue("Invoice No");
        		cell.setCellStyle(style);
        		cell = row.createCell(7);
        		cell.setCellValue("ETA");
        		cell.setCellStyle(style);
        		cell = row.createCell(8);
        		cell.setCellValue("Clearance Date");
        		cell.setCellStyle(style);
        		cell = row.createCell(9);
        		cell.setCellValue("SAP V.C");
        		cell.setCellStyle(style);
        		cell = row.createCell(10);
        		cell.setCellValue("ZONE");
        		cell.setCellStyle(style);
        		cell = row.createCell(11);
        		cell.setCellValue("CUR");
        		cell.setCellStyle(style);
        		cell = row.createCell(12);
        		cell.setCellValue("SHIPPING MODE");
        		cell.setCellStyle(style);
        		cell = row.createCell(13);
        		cell.setCellValue("AIR/SEA/EXPRESS");
        		cell.setCellStyle(style);
        		cell = row.createCell(14);
        		cell.setCellValue("TERMS");
        		cell.setCellStyle(style);
        		cell = row.createCell(15);
        		cell.setCellValue("거래구분");
        		cell.setCellStyle(style);
        		cell = row.createCell(16);
        		cell.setCellValue("징수형태");
        		cell.setCellStyle(style);
        		cell = row.createCell(17);
        		cell.setCellValue("NET INVOICE");
        		cell.setCellStyle(style);
        		cell = row.createCell(18);
        		cell.setCellValue("SHIPPING CHG");
        		cell.setCellStyle(style);
        		cell = row.createCell(19);
        		cell.setCellValue("TOTAL INVOICE");
        		cell.setCellStyle(style);
        		cell = row.createCell(20);
        		cell.setCellValue("분할");
        		cell.setCellStyle(style);
        		cell = row.createCell(21);
        		cell.setCellValue("원산지증명서번호");
        		cell.setCellStyle(style);
        		cell = row.createCell(22);
        		cell.setCellValue("OLD V.C");
        		cell.setCellStyle(style);
        		cell = row.createCell(23);
        		cell.setCellValue("REMARK");
        		cell.setCellStyle(style);
        	}

        	Map<String, Object> dataRow = result.getResultObject();
        	Row row = sheet.createRow(result.getResultCount());
        	Cell cell = null;
        	cell = row.createCell(0);
        	cell.setCellValue(dataRow.get("BL_NO")==null ? "" : dataRow.get("BL_NO").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(1);
        	cell.setCellValue(dataRow.get("IMPT_DECL_NO")==null ? "" : dataRow.get("IMPT_DECL_NO").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(2);
        	cell.setCellValue(dataRow.get("PLantNo")==null ? "" : dataRow.get("PLantNo").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(3);
        	cell.setCellValue(dataRow.get("OWN_GODS_NM")==null ? "" : dataRow.get("OWN_GODS_NM").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(4);
        	cell.setCellValue(Double.parseDouble(dataRow.get("TOT_WT").toString())==0 ? 0 : Double.parseDouble(dataRow.get("TOT_WT").toString()));
        	cell.setCellStyle(style20);
        	cell = row.createCell(5);
        	cell.setCellValue(Double.parseDouble(dataRow.get("PKG_QTY").toString())==0 ? 0 : Double.parseDouble(dataRow.get("PKG_QTY").toString()));
        	cell.setCellStyle(style20);
        	cell = row.createCell(6);
        	cell.setCellValue(dataRow.get("INV_NO")==null ? "" : dataRow.get("INV_NO").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(7);
        	cell.setCellValue(dataRow.get("ETA")==null ? "" : dataRow.get("ETA").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(8);
        	cell.setCellValue(dataRow.get("CDtm")==null ? "" : dataRow.get("CDtm").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(9);
        	cell.setCellValue(dataRow.get("SAPvc")==null ? "" : dataRow.get("SAPvc").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(10);
        	cell.setCellValue(dataRow.get("ZONE")==null ? "" : dataRow.get("ZONE").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(11);
        	cell.setCellValue(dataRow.get("CUR")==null ? "" : dataRow.get("CUR").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(12);
        	cell.setCellValue(dataRow.get("ShippingMode")==null ? "" : dataRow.get("ShippingMode").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(13);
        	cell.setCellValue(dataRow.get("AIR")==null ? "" : dataRow.get("AIR").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(14);
        	cell.setCellValue(dataRow.get("TERMS")==null ? "" : dataRow.get("TERMS").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(15);
        	cell.setCellValue(dataRow.get("GeleGbn")==null ? "" : dataRow.get("GeleGbn").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(16);
        	cell.setCellValue(dataRow.get("JinsuType")==null ? "" : dataRow.get("JinsuType").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(17);
        	cell.setCellValue(dataRow.get("NETinv")==null ? "" : dataRow.get("NETinv").toString());
        	cell.setCellStyle(style22);
        	cell = row.createCell(18);
        	cell.setCellValue(dataRow.get("ShippingCHG")==null ? "" : dataRow.get("ShippingCHG").toString());
        	cell.setCellStyle(style22);
        	cell = row.createCell(19);
        	cell.setCellValue(dataRow.get("TotalInv")==null ? "" : dataRow.get("TotalInv").toString());
        	cell.setCellStyle(style22);
        	cell = row.createCell(20);
        	cell.setCellValue(dataRow.get("Division")==null ? "" : dataRow.get("Division").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(21);
        	cell.setCellValue(dataRow.get("WonNo")==null ? "" : dataRow.get("WonNo").toString());
        	cell.setCellStyle(style1);
        	cell = row.createCell(22);
        	cell.setCellValue(dataRow.get("OLDvc")==null ? "" : dataRow.get("OLDvc").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(23);
        	cell.setCellValue(dataRow.get("Remark")==null ? "" : dataRow.get("Remark").toString());
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