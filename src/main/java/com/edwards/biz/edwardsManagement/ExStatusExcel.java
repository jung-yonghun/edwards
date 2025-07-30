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

public class ExStatusExcel implements ResultHandler<Map<String,Object>> {
	private HttpServletResponse response;
	private SXSSFSheet sheet;
	private SXSSFWorkbook workbook;
	private boolean isStarted = false;

	XSSFCellStyle style   = null;
	XSSFCellStyle style1  = null;
	XSSFCellStyle style20 = null;
	XSSFCellStyle style22 = null;

	public ExStatusExcel(HttpServletResponse response){
		this.response = response;
		workbook = new SXSSFWorkbook(100);
		sheet = workbook.createSheet("수출이행내역");
		sheet.setColumnWidth(0, 5000);
		sheet.setColumnWidth(1, 4000);
		sheet.setColumnWidth(2, 4000);
		sheet.setColumnWidth(3, 1500);
		sheet.setColumnWidth(4, 4000);
		sheet.setColumnWidth(5, 1500);
		sheet.setColumnWidth(6, 4000);
		sheet.setColumnWidth(7, 1500);
		sheet.setColumnWidth(8, 1500);
		sheet.setColumnWidth(9, 5000);
		sheet.setColumnWidth(10, 4000);
		sheet.setColumnWidth(11, 4000);
		sheet.setColumnWidth(12, 2500);
		sheet.setColumnWidth(13, 1500);
		sheet.setColumnWidth(14, 2500);
		sheet.setColumnWidth(15, 7000);
		sheet.setColumnWidth(16, 7000);
		sheet.setColumnWidth(17, 3000);
		sheet.setColumnWidth(18, 3000);
		sheet.setColumnWidth(19, 1500);
		sheet.setColumnWidth(20, 1500);
		sheet.setColumnWidth(21, 4000);
		sheet.setColumnWidth(22, 2000);
		sheet.setColumnWidth(23, 2000);
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

        		response.setHeader("Content-Disposition","attachment;filename=\""+URLEncoder.encode("수출이행내역.xlsx", "UTF-8")+"\"");
        		isStarted = true;
        		SXSSFRow row = sheet.createRow(0);
        		SXSSFCell cell = row.createCell(0);
        		cell.setCellStyle(style);
        		cell.setCellValue("B/L");
        		cell = row.createCell(1);
        		cell.setCellStyle(style);
        		cell.setCellValue("InvoiceNo1");
        		cell = row.createCell(2);
        		cell.setCellStyle(style);
        		cell.setCellValue("InvoiceNo2");
        		cell = row.createCell(3);
        		cell.setCellStyle(style);
        		cell.setCellValue("진행상태");
        		cell = row.createCell(4);
        		cell.setCellStyle(style);
        		cell.setCellValue("적재기한");
        		cell = row.createCell(5);
        		cell.setCellStyle(style);
        		cell.setCellValue("선적여부");
        		cell = row.createCell(6);
        		cell.setCellStyle(style);
        		cell.setCellValue("선적일");
        		cell = row.createCell(7);
        		cell.setCellStyle(style);
        		cell.setCellValue("수출구분");
        		cell = row.createCell(8);
        		cell.setCellStyle(style);
        		cell.setCellValue("수출유형");
        		cell = row.createCell(9);
        		cell.setCellStyle(style);
        		cell.setCellValue("신고번호");
        		cell = row.createCell(10);
        		cell.setCellStyle(style);
        		cell.setCellValue("신고일");
        		cell = row.createCell(11);
        		cell.setCellStyle(style);
        		cell.setCellValue("수리일");
        		cell = row.createCell(12);
        		cell.setCellStyle(style);
        		cell.setCellValue("신고담당자");
        		cell = row.createCell(13);
        		cell.setCellStyle(style);
        		cell.setCellValue("운송구분");
        		cell = row.createCell(14);
        		cell.setCellStyle(style);
        		cell.setCellValue("포워더");
        		cell = row.createCell(15);
        		cell.setCellStyle(style);
        		cell.setCellValue("거래품명");
        		cell = row.createCell(16);
        		cell.setCellStyle(style);
        		cell.setCellValue("무역거래처");
        		cell = row.createCell(17);
        		cell.setCellStyle(style);
        		cell.setCellValue("목적국");
        		cell = row.createCell(18);
        		cell.setCellStyle(style);
        		cell.setCellValue("선적항");
        		cell = row.createCell(19);
        		cell.setCellStyle(style);
        		cell.setCellValue("인도조건");
        		cell = row.createCell(20);
        		cell.setCellStyle(style);
        		cell.setCellValue("통화");
        		cell = row.createCell(21);
        		cell.setCellStyle(style);
        		cell.setCellValue("결제금액");
        		cell = row.createCell(22);
        		cell.setCellStyle(style);
        		cell.setCellValue("포장갯수");
        		cell = row.createCell(23);
        		cell.setCellStyle(style);
        		cell.setCellValue("중량");
        	}

        	Map<String, Object> dataRow = result.getResultObject();
        	Row row = sheet.createRow(result.getResultCount());
        	Cell cell = null;
        	cell = row.createCell(0);
        	cell.setCellStyle(style1);
        	cell.setCellValue(dataRow.get("EXPO_BLNO")==null ? "" : dataRow.get("EXPO_BLNO").toString());
        	cell = row.createCell(1);
        	cell.setCellStyle(style1);
        	cell.setCellValue(dataRow.get("Expo_iv_no")==null ? "" : dataRow.get("Expo_iv_no").toString());
        	cell = row.createCell(2);
        	cell.setCellStyle(style1);
        	cell.setCellValue(dataRow.get("Expo_geyak_no2")==null ? "" : dataRow.get("Expo_geyak_no2").toString());
        	cell = row.createCell(3);
        	cell.setCellStyle(style);
        	cell.setCellValue(dataRow.get("Expo_res_result")==null ? "" : dataRow.get("Expo_res_result").toString());
        	cell = row.createCell(4);
        	cell.setCellStyle(style);
        	cell.setCellValue(dataRow.get("Expo_sunjuk_date")==null ? "" : dataRow.get("Expo_sunjuk_date").toString());
        	cell = row.createCell(5);
        	cell.setCellStyle(style);
        	cell.setCellValue(dataRow.get("expo_Loaded_YN")==null ? "" : dataRow.get("expo_Loaded_YN").toString());
        	cell = row.createCell(6);
        	cell.setCellStyle(style);
        	cell.setCellValue(dataRow.get("expo_LoadedDt")==null ? "" : dataRow.get("expo_LoadedDt").toString());
        	cell = row.createCell(7);
        	cell.setCellStyle(style);
        	cell.setCellValue(dataRow.get("Expo_gurae_gbn")==null ? "" : dataRow.get("Expo_gurae_gbn").toString());
        	cell = row.createCell(8);
        	cell.setCellStyle(style);
        	cell.setCellValue(dataRow.get("Expo_jong")==null ? "" : dataRow.get("Expo_jong").toString());
        	cell = row.createCell(9);
        	cell.setCellStyle(style);
        	cell.setCellValue(dataRow.get("Expo_singo_no")==null ? "" : dataRow.get("Expo_singo_no").toString());
        	cell = row.createCell(10);
        	cell.setCellStyle(style);
        	cell.setCellValue(dataRow.get("Expo_singo_date")==null ? "" : dataRow.get("Expo_singo_date").toString());
        	cell = row.createCell(11);
        	cell.setCellStyle(style);
        	cell.setCellValue(dataRow.get("Expo_ok_date")==null ? "" : dataRow.get("Expo_ok_date").toString());
        	cell = row.createCell(12);
        	cell.setCellStyle(style);
        	cell.setCellValue(dataRow.get("UserNM")==null ? "" : dataRow.get("UserNM").toString());
        	cell = row.createCell(13);
        	cell.setCellStyle(style);
        	cell.setCellValue(dataRow.get("Expo_unsong_type")==null ? "" : dataRow.get("Expo_unsong_type").toString());
        	cell = row.createCell(14);
        	cell.setCellStyle(style1);
        	cell.setCellValue(dataRow.get("forward_sangho")==null ? "" : dataRow.get("forward_sangho").toString());
        	cell = row.createCell(15);
        	cell.setCellStyle(style1);
        	cell.setCellValue(dataRow.get("exlanEgukyk")==null ? "" : dataRow.get("exlanEgukyk").toString());
        	cell = row.createCell(16);
        	cell.setCellStyle(style1);
        	cell.setCellValue(dataRow.get("Expo_gumaeja_sangho")==null ? "" : dataRow.get("Expo_gumaeja_sangho").toString());
        	cell = row.createCell(17);
        	cell.setCellStyle(style);
        	cell.setCellValue(dataRow.get("Expo_mokjuk_name")==null ? "" : dataRow.get("Expo_mokjuk_name").toString());
        	cell = row.createCell(18);
        	cell.setCellStyle(style);
        	cell.setCellValue(dataRow.get("Expo_hanggu_name")==null ? "" : dataRow.get("Expo_hanggu_name").toString());
        	cell = row.createCell(19);
        	cell.setCellStyle(style);
        	cell.setCellValue(dataRow.get("Expo_indojo")==null ? "" : dataRow.get("Expo_indojo").toString());
        	cell = row.createCell(20);
        	cell.setCellStyle(style);
        	cell.setCellValue(dataRow.get("Expo_gyelje_money")==null ? "" : dataRow.get("Expo_gyelje_money").toString());
        	cell = row.createCell(21);
        	cell.setCellStyle(style20);
        	cell.setCellValue(Double.parseDouble(dataRow.get("Expo_gyelje_input").toString())==0 ? 0 : Double.parseDouble(dataRow.get("Expo_gyelje_input").toString()));
        	cell = row.createCell(22);
        	cell.setCellStyle(style20);
        	cell.setCellValue(Double.parseDouble(dataRow.get("Expo_pojang_su").toString())==0 ? 0 : Double.parseDouble(dataRow.get("Expo_pojang_su").toString()));
        	cell = row.createCell(23);
        	cell.setCellStyle(style20);
        	cell.setCellValue(Double.parseDouble(dataRow.get("Expo_total_jung").toString())==0 ? 0 : Double.parseDouble(dataRow.get("Expo_total_jung").toString()));
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