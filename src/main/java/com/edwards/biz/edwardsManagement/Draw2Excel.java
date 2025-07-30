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

public class Draw2Excel implements ResultHandler<Map<String,Object>> {
	private HttpServletResponse response;
	private SXSSFSheet sheet;
	private SXSSFWorkbook workbook;
	private boolean isStarted = false;

	XSSFCellStyle style   = null;
	XSSFCellStyle style1  = null;
	XSSFCellStyle style20 = null;
	XSSFCellStyle style22 = null;

	public Draw2Excel(HttpServletResponse response){
		this.response = response;
		workbook = new SXSSFWorkbook(100);
		sheet = workbook.createSheet("원상태수출예상환급액");
		sheet.setColumnWidth(0, 5000);
		sheet.setColumnWidth(1, 2500);
		sheet.setColumnWidth(2, 2500);
		sheet.setColumnWidth(3, 5000);
		sheet.setColumnWidth(4, 5000);
		sheet.setColumnWidth(5, 5000);
		sheet.setColumnWidth(6, 3500);
		sheet.setColumnWidth(7, 8000);
		sheet.setColumnWidth(8, 2500);
		sheet.setColumnWidth(9, 2500);
		sheet.setColumnWidth(10, 7000);
		sheet.setColumnWidth(11, 2000);
		sheet.setColumnWidth(12, 2000);
		sheet.setColumnWidth(13, 2000);
		sheet.setColumnWidth(14, 2000);
		sheet.setColumnWidth(15, 3500);
		sheet.setColumnWidth(16, 3000);
		sheet.setColumnWidth(17, 3000);
		sheet.setColumnWidth(18, 3000);
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

        		response.setHeader("Content-Disposition","attachment;filename=\""+URLEncoder.encode("원상태수출예상환급액.xlsx", "UTF-8")+"\"");
        		isStarted = true;
        		SXSSFRow row = sheet.createRow(0);
        		SXSSFCell cell = row.createCell(0);
        		cell.setCellValue("수출신고번호");
        		cell.setCellStyle(style);
        		cell = row.createCell(1);
        		cell.setCellValue("수출란");
        		cell.setCellStyle(style);
        		cell = row.createCell(2);
        		cell.setCellValue("수출행");
        		cell.setCellStyle(style);
        		cell = row.createCell(3);
        		cell.setCellValue("제품코드");
        		cell.setCellStyle(style);
        		cell = row.createCell(4);
        		cell.setCellValue("HS코드");
        		cell.setCellStyle(style);
        		cell = row.createCell(5);
        		cell.setCellValue("수입신고번호");
        		cell.setCellStyle(style);
        		cell = row.createCell(6);
        		cell.setCellValue("수입신고일");
        		cell.setCellStyle(style);
        		cell = row.createCell(7);
        		cell.setCellValue("수출자");
        		cell.setCellStyle(style);
        		cell = row.createCell(8);
        		cell.setCellValue("수입란");
        		cell.setCellStyle(style);
        		cell = row.createCell(9);
        		cell.setCellValue("수입행");
        		cell.setCellStyle(style);
        		cell = row.createCell(10);
        		cell.setCellValue("수입화주");
        		cell.setCellStyle(style);
        		cell = row.createCell(11);
        		cell.setCellValue("사용량");
        		cell.setCellStyle(style);
        		cell = row.createCell(12);
        		cell.setCellValue("물량단위");
        		cell.setCellStyle(style);
        		cell = row.createCell(13);
        		cell.setCellValue("수입세율");
        		cell.setCellStyle(style);
        		cell = row.createCell(14);
        		cell.setCellValue("수입잔량");
        		cell.setCellStyle(style);
        		cell = row.createCell(15);
        		cell.setCellValue("수출수리일");
        		cell.setCellStyle(style);
        		cell = row.createCell(16);
        		cell.setCellValue("세액단가");
        		cell.setCellStyle(style);
        		cell = row.createCell(17);
        		cell.setCellValue("예상환급액(관세)");
        		cell.setCellStyle(style);
        		cell = row.createCell(18);
        		cell.setCellValue("예상환급액(총세액)");
        		cell.setCellStyle(style);
        	}

        	Map<String, Object> dataRow = result.getResultObject();
        	Row row = sheet.createRow(result.getResultCount());
        	Cell cell = null;
        	cell = row.createCell(0);
        	cell.setCellValue(dataRow.get("EXPT_DECL_NO")==null ? "" : dataRow.get("EXPT_DECL_NO").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(1);
        	cell.setCellValue(dataRow.get("EXPT_LAN")==null ? "" : dataRow.get("EXPT_LAN").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(2);
        	cell.setCellValue(dataRow.get("EXPT_HNG")==null ? "" : dataRow.get("EXPT_HNG").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(3);
        	cell.setCellValue(dataRow.get("PROD_CD")==null ? "" : dataRow.get("PROD_CD").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(4);
        	cell.setCellValue(dataRow.get("HS_CD")==null ? "" : dataRow.get("HS_CD").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(5);
        	cell.setCellValue(dataRow.get("IMPT_DECL_NO")==null ? "" : dataRow.get("IMPT_DECL_NO").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(6);
        	cell.setCellValue(dataRow.get("Impo_jubsu_date")==null ? "" : dataRow.get("Impo_jubsu_date").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(7);
        	cell.setCellValue(dataRow.get("EXP_NM")==null ? "" : dataRow.get("EXP_NM").toString());
        	cell.setCellStyle(style1);
        	cell = row.createCell(8);
        	cell.setCellValue(dataRow.get("IMPT_LAN")==null ? "" : dataRow.get("IMPT_LAN").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(9);
        	cell.setCellValue(dataRow.get("IMPT_HNG")==null ? "" : dataRow.get("IMPT_HNG").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(10);
        	cell.setCellValue(dataRow.get("OWN_GODS_NM")==null ? "" : dataRow.get("OWN_GODS_NM").toString());
        	cell.setCellStyle(style1);
        	cell = row.createCell(11);
        	cell.setCellValue(Double.parseDouble(dataRow.get("EXPT_QTY").toString())==0 ? 0 : Double.parseDouble(dataRow.get("EXPT_QTY").toString()));
        	cell.setCellStyle(style20);
        	cell = row.createCell(12);
        	cell.setCellValue(dataRow.get("QTY_UNIT")==null ? "" : dataRow.get("QTY_UNIT").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(13);
        	cell.setCellValue(Double.parseDouble(dataRow.get("Mhs_rate").toString())==0 ? 0 : Double.parseDouble(dataRow.get("Mhs_rate").toString()));
        	cell.setCellStyle(style20);
        	cell = row.createCell(14);
        	cell.setCellValue(Double.parseDouble(dataRow.get("IMPT_RMID_QTY").toString())==0 ? 0 : Double.parseDouble(dataRow.get("IMPT_RMID_QTY").toString()));
        	cell.setCellStyle(style20);
        	cell = row.createCell(15);
        	cell.setCellValue(dataRow.get("DECL_CMPL_DT1")==null ? "" : dataRow.get("DECL_CMPL_DT1").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(16);
        	cell.setCellValue(Double.parseDouble(dataRow.get("OneGwan_tax").toString())==0 ? 0 : Double.parseDouble(dataRow.get("OneGwan_tax").toString()));
        	cell.setCellStyle(style22);
        	cell = row.createCell(17);
        	cell.setCellValue(Double.parseDouble(dataRow.get("RefGwan_tax").toString())==0 ? 0 : Double.parseDouble(dataRow.get("RefGwan_tax").toString()));
        	cell.setCellStyle(style20);
        	cell = row.createCell(18);
        	cell.setCellValue(Double.parseDouble(dataRow.get("RefTotal_tax").toString())==0 ? 0 : Double.parseDouble(dataRow.get("RefTotal_tax").toString()));
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