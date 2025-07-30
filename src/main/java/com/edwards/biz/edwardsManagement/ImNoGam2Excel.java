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

public class ImNoGam2Excel implements ResultHandler<Map<String,Object>> {
	private HttpServletResponse response;
	private SXSSFSheet sheet;
	private SXSSFWorkbook workbook;
	private boolean isStarted = false;

	XSSFCellStyle style   = null;
	XSSFCellStyle style1  = null;
	XSSFCellStyle style20 = null;
	XSSFCellStyle style22 = null;

	public ImNoGam2Excel(HttpServletResponse response){
		this.response = response;
		workbook = new SXSSFWorkbook(100);
		sheet = workbook.createSheet("비감면수입물품처리내역");
		sheet.setColumnWidth(0, 1500);	//상태
		sheet.setColumnWidth(1, 3000);	//수리일
		sheet.setColumnWidth(2, 5000);	//화주
		sheet.setColumnWidth(3, 5000);	//신고번호
		sheet.setColumnWidth(4, 4000);	//비엘번호
		sheet.setColumnWidth(5, 5000);	//수출자
		sheet.setColumnWidth(6, 1500);	//란번호
		sheet.setColumnWidth(7, 4000);	//HS코드
		sheet.setColumnWidth(8, 1500);	//관세율
		sheet.setColumnWidth(9, 1500);	//행번호
		sheet.setColumnWidth(10, 3000);	//아이템코드
		sheet.setColumnWidth(11, 7000);	//아이템명
		sheet.setColumnWidth(12, 7000);	//Invoice번호
		sheet.setColumnWidth(13, 2000);	//단위
		sheet.setColumnWidth(14, 2000);	//수입량
		sheet.setColumnWidth(15, 3000);	//수출신고일
		sheet.setColumnWidth(16, 5000);	//수출신고번호
		sheet.setColumnWidth(17, 1500);	//수출란
		sheet.setColumnWidth(18, 1500);	//수출행
		sheet.setColumnWidth(19, 1500);	//수출량
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

        		response.setHeader("Content-Disposition","attachment;filename=\""+URLEncoder.encode("비감면수입물품처리내역.xlsx", "UTF-8")+"\"");
        		isStarted = true;
        		SXSSFRow row = sheet.createRow(0);
        		SXSSFCell cell = row.createCell(0);
        		cell.setCellValue("상태");
        		cell.setCellStyle(style);
        		cell = row.createCell(1);
        		cell.setCellValue("수리일");
        		cell.setCellStyle(style);
        		cell = row.createCell(2);
        		cell.setCellValue("화주");
        		cell.setCellStyle(style);
        		cell = row.createCell(3);
        		cell.setCellValue("수입신고번호");
        		cell.setCellStyle(style);
        		cell = row.createCell(4);
        		cell.setCellValue("BL번호");
        		cell.setCellStyle(style);
        		cell = row.createCell(5);
        		cell.setCellValue("수출자");
        		cell.setCellStyle(style);
        		cell = row.createCell(6);
        		cell.setCellValue("란");
        		cell.setCellStyle(style);
        		cell = row.createCell(7);
        		cell.setCellValue("HS코드");
        		cell.setCellStyle(style);
        		cell = row.createCell(8);
        		cell.setCellValue("관세율");
        		cell.setCellStyle(style);
        		cell = row.createCell(9);
        		cell.setCellValue("행");
        		cell.setCellStyle(style);
        		cell = row.createCell(10);
        		cell.setCellValue("Item코드");
        		cell.setCellStyle(style);
        		cell = row.createCell(11);
        		cell.setCellValue("Item명");
        		cell.setCellStyle(style);
        		cell = row.createCell(12);
        		cell.setCellValue("Invoice번호");
        		cell.setCellStyle(style);
        		cell = row.createCell(13);
        		cell.setCellValue("단위");
        		cell.setCellStyle(style);
        		cell = row.createCell(14);
        		cell.setCellValue("수입량");
        		cell.setCellStyle(style);
        		cell = row.createCell(15);
        		cell.setCellValue("수출신고일");
        		cell.setCellStyle(style);
        		cell = row.createCell(16);
        		cell.setCellValue("수출신고번호");
        		cell.setCellStyle(style);
        		cell = row.createCell(17);
        		cell.setCellValue("수출란");
        		cell.setCellStyle(style);
        		cell = row.createCell(18);
        		cell.setCellValue("수출행");
        		cell.setCellStyle(style);
        		cell = row.createCell(19);
        		cell.setCellValue("수출량");
        		cell.setCellStyle(style);
        	}

        	Map<String, Object> dataRow = result.getResultObject();
        	Row row = sheet.createRow(result.getResultCount());
        	Cell cell = null;
        	cell = row.createCell(0);
        	cell.setCellValue(dataRow.get("STATUS")==null ? "" : dataRow.get("STATUS").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(1);
        	cell.setCellValue(dataRow.get("DECL_CMPL_DT2")==null ? "" : dataRow.get("DECL_CMPL_DT2").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(2);
        	cell.setCellValue(dataRow.get("OWN_GODS_NM")==null ? "" : dataRow.get("OWN_GODS_NM").toString());
        	cell.setCellStyle(style1);
        	cell = row.createCell(3);
        	cell.setCellValue(dataRow.get("IMPT_DECL_NO")==null ? "" : dataRow.get("IMPT_DECL_NO").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(4);
        	cell.setCellValue(dataRow.get("BL_NO")==null ? "" : dataRow.get("BL_NO").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(5);
        	cell.setCellValue(dataRow.get("EXP_NM")==null ? "" : dataRow.get("EXP_NM").toString());
        	cell.setCellStyle(style1);
        	cell = row.createCell(6);
        	cell.setCellValue(dataRow.get("LAN")==null ? "" : dataRow.get("LAN").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(7);
        	cell.setCellValue(dataRow.get("HS_CD")==null ? "" : dataRow.get("HS_CD").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(8);
        	cell.setCellValue(Double.parseDouble(dataRow.get("Mhs_rate").toString())==0 ? 0 : Double.parseDouble(dataRow.get("Mhs_rate").toString()));
        	cell.setCellStyle(style22);
        	cell = row.createCell(9);
        	cell.setCellValue(dataRow.get("HNG")==null ? "" : dataRow.get("HNG").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(10);
        	cell.setCellValue(dataRow.get("ITEM_CD")==null ? "" : dataRow.get("ITEM_CD").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(11);
        	cell.setCellValue(dataRow.get("ITEM_NM")==null ? "" : dataRow.get("ITEM_NM").toString());
        	cell.setCellStyle(style1);
        	cell = row.createCell(12);
        	cell.setCellValue(dataRow.get("INV_NO")==null ? "" : dataRow.get("INV_NO").toString());
        	cell.setCellStyle(style1);
        	cell = row.createCell(13);
        	cell.setCellValue(dataRow.get("QTY_UNIT")==null ? "" : dataRow.get("QTY_UNIT").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(14);
        	cell.setCellValue(Double.parseDouble(dataRow.get("QTY").toString())==0 ? 0 : Double.parseDouble(dataRow.get("QTY").toString()));
        	cell.setCellStyle(style20);
        	cell = row.createCell(15);
        	cell.setCellValue(dataRow.get("DECL_CMPL_DT3")==null ? "" : dataRow.get("DECL_CMPL_DT3").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(16);
        	cell.setCellValue(dataRow.get("EXPT_DECL_NO")==null ? "" : dataRow.get("EXPT_DECL_NO").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(17);
        	cell.setCellValue(dataRow.get("EXPT_LAN")==null ? "" : dataRow.get("EXPT_LAN").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(18);
        	cell.setCellValue(dataRow.get("EXPT_HNG")==null ? "" : dataRow.get("EXPT_HNG").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(19);
        	cell.setCellValue(dataRow.get("EXPT_QTY")==null ? "" : dataRow.get("EXPT_QTY").toString());
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