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

public class ExStatisticsModelExcel implements ResultHandler<Map<String,Object>> {
	private HttpServletResponse response;
	private SXSSFSheet sheet;
	private SXSSFWorkbook workbook;
	private boolean isStarted = false;

	XSSFCellStyle style   = null;
	XSSFCellStyle style1  = null;
	XSSFCellStyle style20 = null;
	XSSFCellStyle style22 = null;

	public ExStatisticsModelExcel(HttpServletResponse response){
		this.response = response;
		workbook = new SXSSFWorkbook(100);
		sheet = workbook.createSheet("모델규격기준실적자료");
		sheet.setColumnWidth(0, 3000);
		sheet.setColumnWidth(1, 7000);
		sheet.setColumnWidth(2, 5000);
		sheet.setColumnWidth(3, 1500);
		sheet.setColumnWidth(4, 4000);
		sheet.setColumnWidth(5, 4000);
		sheet.setColumnWidth(6, 4000);
		sheet.setColumnWidth(7, 4000);
		sheet.setColumnWidth(8, 3000);
		sheet.setColumnWidth(9, 15000);
		sheet.setColumnWidth(10, 1500);
		sheet.setColumnWidth(11, 2000);
		sheet.setColumnWidth(12, 1500);
		sheet.setColumnWidth(13, 3000);
		sheet.setColumnWidth(14, 1500);
		sheet.setColumnWidth(15, 2000);
		sheet.setColumnWidth(16, 1500);
		sheet.setColumnWidth(17, 3000);
		sheet.setColumnWidth(18, 3000);
		sheet.setColumnWidth(19, 4000);
		sheet.setColumnWidth(20, 1500);
		sheet.setColumnWidth(21, 1500);
		sheet.setColumnWidth(22, 1500);
		sheet.setColumnWidth(23, 1500);
		sheet.setColumnWidth(24, 1500);
		sheet.setColumnWidth(25, 3000);
		sheet.setColumnWidth(26, 7000);
		sheet.setColumnWidth(27, 1500);
		sheet.setColumnWidth(28, 3000);
		sheet.setColumnWidth(29, 3000);
		sheet.setColumnWidth(30, 3000);
		sheet.setColumnWidth(31, 3000);
		sheet.setColumnWidth(32, 1500);
		sheet.setColumnWidth(33, 1500);
		sheet.setColumnWidth(34, 1500);
		sheet.setColumnWidth(35, 5000);
		sheet.setColumnWidth(36, 4000);
		sheet.setColumnWidth(37, 3000);
		sheet.setColumnWidth(38, 3000);
		sheet.setColumnWidth(39, 3000);
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

        		response.setHeader("Content-Disposition","attachment;filename=\""+URLEncoder.encode("수출모델규격기준실적자료.xlsx", "UTF-8")+"\"");
        		isStarted = true;
        		SXSSFRow row = sheet.createRow(0);
        		SXSSFCell cell = row.createCell(0);
        		cell.setCellValue("수리일");
        		cell.setCellStyle(style);
        		cell = row.createCell(1);
        		cell.setCellValue("화주");
				cell.setCellStyle(style);
				cell = row.createCell(2);
				cell.setCellValue("수출신고번호");
				cell.setCellStyle(style);
				cell = row.createCell(3);
				cell.setCellValue("거래구분");
				cell.setCellStyle(style);
				cell = row.createCell(4);
				cell.setCellValue("Invoice번호1");
				cell.setCellStyle(style);
				cell = row.createCell(5);
				cell.setCellValue("Invoice번호2");
				cell.setCellStyle(style);
				cell = row.createCell(6);
				cell.setCellValue("M B/L No");
				cell.setCellStyle(style);
				cell = row.createCell(7);
				cell.setCellValue("H B/L No");
				cell.setCellStyle(style);
				cell = row.createCell(8);
				cell.setCellValue("출항일");
				cell.setCellStyle(style);
				cell = row.createCell(9);
				cell.setCellValue("구매자");
				cell.setCellStyle(style);
				cell = row.createCell(10);
				cell.setCellValue("통화단위");
				cell.setCellStyle(style);
				cell = row.createCell(11);
				cell.setCellValue("환율");
				cell.setCellStyle(style);
				cell = row.createCell(12);
				cell.setCellValue("란번호");
				cell.setCellStyle(style);
				cell = row.createCell(13);
				cell.setCellValue("HS부호");
				cell.setCellStyle(style);
				cell = row.createCell(14);
				cell.setCellValue("원산지");
				cell.setCellStyle(style);
				cell = row.createCell(15);
				cell.setCellValue("순중량");
				cell.setCellStyle(style);
				cell = row.createCell(16);
				cell.setCellValue("수량");
				cell.setCellStyle(style);
				cell = row.createCell(17);
				cell.setCellValue("신고가격(USD)");
				cell.setCellStyle(style);
				cell = row.createCell(18);
				cell.setCellValue("신고가격(KRW)");
				cell.setCellStyle(style);
				cell = row.createCell(19);
				cell.setCellValue("수입신고번호");
				cell.setCellStyle(style);
				cell = row.createCell(20);
				cell.setCellValue("수입신고란번호");
				cell.setCellStyle(style);
				cell = row.createCell(21);
				cell.setCellValue("원상태수출여부");
				cell.setCellStyle(style);
				cell = row.createCell(22);
				cell.setCellValue("개별환급");
				cell.setCellStyle(style);
				cell = row.createCell(23);
				cell.setCellValue("기납원상태");
				cell.setCellStyle(style);
				cell = row.createCell(24);
				cell.setCellValue("행번호");
				cell.setCellStyle(style);
				cell = row.createCell(25);
				cell.setCellValue("제품코드");
				cell.setCellStyle(style);
				cell = row.createCell(26);
				cell.setCellValue("제품명");
				cell.setCellStyle(style);
				cell = row.createCell(27);
				cell.setCellValue("수출량");
				cell.setCellStyle(style);
				cell = row.createCell(28);
				cell.setCellValue("금액");
				cell.setCellStyle(style);
				cell = row.createCell(29);
				cell.setCellValue("원산지증명번호");
				cell.setCellStyle(style);
				cell = row.createCell(30);
				cell.setCellValue("CO발급일");
				cell.setCellStyle(style);
				cell = row.createCell(31);
				cell.setCellValue("SEREAL NO");
				cell.setCellStyle(style);
				cell = row.createCell(32);
				cell.setCellValue("Plant");
				cell.setCellStyle(style);
				cell = row.createCell(33);
				cell.setCellValue("Shipping Mode");
				cell.setCellStyle(style);
				cell = row.createCell(34);
				cell.setCellValue("인코텀즈");
				cell.setCellStyle(style);
				cell = row.createCell(35);
				cell.setCellValue("Name of Ship to");
				cell.setCellStyle(style);
				cell = row.createCell(36);
				cell.setCellValue("포워더");
				cell.setCellStyle(style);
				cell = row.createCell(37);
				cell.setCellValue("Invoice Date");
				cell.setCellStyle(style);
				cell = row.createCell(38);
				cell.setCellValue("장치장코드");
				cell.setCellStyle(style);
				cell = row.createCell(39);
				cell.setCellValue("협정여부");
				cell.setCellStyle(style);
        	}

        	Map<String, Object> dataRow = result.getResultObject();
        	Row row = sheet.createRow(result.getResultCount());
        	Cell cell = null;
        	cell = row.createCell(0);
        	cell.setCellValue(dataRow.get("ExpoOkDt1")==null ? "" : dataRow.get("ExpoOkDt1").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(1);
    		cell.setCellValue(dataRow.get("OwnGodsNm")==null ? "" : dataRow.get("OwnGodsNm").toString());
    		cell.setCellStyle(style1);
    		cell = row.createCell(2);
			cell.setCellValue(dataRow.get("ExpoSingoNo")==null ? "" : dataRow.get("ExpoSingoNo").toString());
			cell.setCellStyle(style);
			cell = row.createCell(3);
			cell.setCellValue(dataRow.get("ExpoGuraeGbn")==null ? "" : dataRow.get("ExpoGuraeGbn").toString());
			cell.setCellStyle(style);
			cell = row.createCell(4);
			cell.setCellValue(dataRow.get("ExpoGeyakNo1")==null ? "" : dataRow.get("ExpoGeyakNo1").toString());
			cell.setCellStyle(style);
			cell = row.createCell(5);
			cell.setCellValue(dataRow.get("ExpoGeyakNo2")==null ? "" : dataRow.get("ExpoGeyakNo2").toString());
			cell.setCellStyle(style);
			cell = row.createCell(6);
			cell.setCellValue(dataRow.get("ExpoBlNo")==null ? "" : dataRow.get("ExpoBlNo").toString());
			cell.setCellStyle(style);
			cell = row.createCell(7);
			cell.setCellValue(dataRow.get("ExpoHblNo")==null ? "" : dataRow.get("ExpoHblNo").toString());
			cell.setCellStyle(style);
			cell = row.createCell(8);
			cell.setCellValue(dataRow.get("ExpoLeaveDt1")==null ? "" : dataRow.get("ExpoLeaveDt1").toString());
			cell.setCellStyle(style);
			cell = row.createCell(9);
			cell.setCellValue(dataRow.get("ExpoGumaejaSangho")==null ? "" : dataRow.get("ExpoGumaejaSangho").toString());
			cell.setCellStyle(style1);
			cell = row.createCell(10);
			cell.setCellValue(dataRow.get("ExpoGyeljeMoney")==null ? "" : dataRow.get("ExpoGyeljeMoney").toString());
			cell.setCellStyle(style);
			cell = row.createCell(11);
			cell.setCellValue(Double.parseDouble(dataRow.get("ExpoGyeljeExch").toString())==0 ? 0 : Double.parseDouble(dataRow.get("ExpoGyeljeExch").toString()));
			cell.setCellStyle(style22);
			cell = row.createCell(12);
			cell.setCellValue(dataRow.get("ExlanLan")==null ? "" : dataRow.get("ExlanLan").toString());
			cell.setCellStyle(style);
			cell = row.createCell(13);
			cell.setCellValue(dataRow.get("ExlanHs")==null ? "" : dataRow.get("ExlanHs").toString());
			cell.setCellStyle(style);
			cell = row.createCell(14);
			cell.setCellValue(dataRow.get("ExlanWonsanji")==null ? "" : dataRow.get("ExlanWonsanji").toString());
			cell.setCellStyle(style);
			cell = row.createCell(15);
			cell.setCellValue(Double.parseDouble(dataRow.get("ExlanJung").toString())==0 ? 0 : Double.parseDouble(dataRow.get("ExlanJung").toString()));
			cell.setCellStyle(style22);
			cell = row.createCell(16);
			cell.setCellValue(Double.parseDouble(dataRow.get("ExlanPojangSu").toString())==0 ? 0 : Double.parseDouble(dataRow.get("ExlanPojangSu").toString()));
			cell.setCellStyle(style20);
			cell = row.createCell(17);
			cell.setCellValue(dataRow.get("ExlanFobUsd")==null ? "" : dataRow.get("ExlanFobUsd").toString());
			cell.setCellStyle(style20);
			cell = row.createCell(18);
			cell.setCellValue(Double.parseDouble(dataRow.get("ExlanFobWon").toString())==0 ? 0 : Double.parseDouble(dataRow.get("ExlanFobWon").toString()));
			cell.setCellStyle(style20);
			cell = row.createCell(19);
			cell.setCellValue(dataRow.get("ImptDeclNo")==null ? "" : dataRow.get("ImptDeclNo").toString());
			cell.setCellStyle(style);
			cell = row.createCell(20);
			cell.setCellValue(dataRow.get("ImptLan")==null ? "" : dataRow.get("ImptLan").toString());
			cell.setCellStyle(style);
			cell = row.createCell(21);
			cell.setCellValue(dataRow.get("Won")==null ? "" : dataRow.get("Won").toString());
			cell.setCellStyle(style);
			cell = row.createCell(22);
			cell.setCellValue(dataRow.get("IndvRefundObj")==null ? "" : dataRow.get("IndvRefundObj").toString());
			cell.setCellStyle(style);
			cell = row.createCell(23);
			cell.setCellValue(dataRow.get("GiNapGbn")==null ? "" : dataRow.get("GiNapGbn").toString());
			cell.setCellStyle(style);
			cell = row.createCell(24);
			cell.setCellValue(dataRow.get("ExpumHeang")==null ? "" : dataRow.get("ExpumHeang").toString());
			cell.setCellStyle(style);
			cell = row.createCell(25);
			cell.setCellValue(dataRow.get("ExpumJepumCode")==null ? "" : dataRow.get("ExpumJepumCode").toString());
			cell.setCellStyle(style1);
			cell = row.createCell(26);
			cell.setCellValue(dataRow.get("ProdNm")==null ? "" : dataRow.get("ProdNm").toString());
			cell.setCellStyle(style1);
			cell = row.createCell(27);
			cell.setCellValue(Double.parseDouble(dataRow.get("SuchulSu").toString())==0 ? 0 : Double.parseDouble(dataRow.get("SuchulSu").toString()));
			cell.setCellStyle(style20);
			cell = row.createCell(28);
			cell.setCellValue(Double.parseDouble(dataRow.get("ExpumGyeljeGum").toString())==0 ? 0 : Double.parseDouble(dataRow.get("ExpumGyeljeGum").toString()));
			cell.setCellStyle(style20);
			cell = row.createCell(29);
			cell.setCellValue(dataRow.get("CoNo")==null ? "" : dataRow.get("CoNo").toString());
			cell.setCellStyle(style);
			cell = row.createCell(30);
			cell.setCellValue(dataRow.get("CoNoDt")==null ? "" : dataRow.get("CoNoDt").toString());
			cell.setCellStyle(style);
			cell = row.createCell(31);
			cell.setCellValue(dataRow.get("SerialNo")==null ? "" : dataRow.get("SerialNo").toString());
			cell.setCellStyle(style);
			cell = row.createCell(32);
			cell.setCellValue(dataRow.get("Plant")==null ? "" : dataRow.get("Plant").toString());
			cell.setCellStyle(style);
			cell = row.createCell(33);
			cell.setCellValue(dataRow.get("ShippingMode")==null ? "" : dataRow.get("ShippingMode").toString());
			cell.setCellStyle(style);
			cell = row.createCell(34);
			cell.setCellValue(dataRow.get("ExpoIndojo")==null ? "" : dataRow.get("ExpoIndojo").toString());
			cell.setCellStyle(style);
			cell = row.createCell(35);
			cell.setCellValue(dataRow.get("NameOfShipto")==null ? "" : dataRow.get("NameOfShipto").toString());
			cell.setCellStyle(style1);
			cell = row.createCell(36);
			cell.setCellValue(dataRow.get("ForwardNm")==null ? "" : dataRow.get("ForwardNm").toString());
			cell.setCellStyle(style1);
			cell = row.createCell(37);
			cell.setCellValue(dataRow.get("InvDt1")==null ? "" : dataRow.get("InvDt1").toString());
			cell.setCellStyle(style);
			cell = row.createCell(38);
			cell.setCellValue(dataRow.get("WhCd")==null ? "" : dataRow.get("WhCd").toString());
			cell.setCellStyle(style);
			cell = row.createCell(39);
			cell.setCellValue(dataRow.get("ExpoFtaCd")==null ? "" : dataRow.get("ExpoFtaCd").toString());
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