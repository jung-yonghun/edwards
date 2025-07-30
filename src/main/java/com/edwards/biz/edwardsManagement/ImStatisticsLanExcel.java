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

public class ImStatisticsLanExcel implements ResultHandler<Map<String,Object>> {
	private HttpServletResponse response;
	private SXSSFSheet sheet;
	private SXSSFWorkbook workbook;
	private boolean isStarted = false;

	XSSFCellStyle style   = null;
	XSSFCellStyle style1  = null;
	XSSFCellStyle style20 = null;
	XSSFCellStyle style22 = null;

	public ImStatisticsLanExcel(HttpServletResponse response){
		this.response = response;
		workbook = new SXSSFWorkbook(100);
		sheet = workbook.createSheet("란기준실적자료");
		sheet.setColumnWidth(0, 3000);	//입항일
		sheet.setColumnWidth(1, 3000);	//반입일
		sheet.setColumnWidth(2, 3000);	//수리일
		sheet.setColumnWidth(3, 4000);	//신고번호
		sheet.setColumnWidth(4, 8000);	//화주
		sheet.setColumnWidth(5, 2500);	//Plant No
		sheet.setColumnWidth(6, 4000);	//BL번호
		sheet.setColumnWidth(7, 1500);	//분할여부
		sheet.setColumnWidth(8, 3000);	//총중량
		sheet.setColumnWidth(9, 1500);	//포장갯수
		sheet.setColumnWidth(10, 1500);	//포장종류
		sheet.setColumnWidth(11, 2000);	//수출자
		sheet.setColumnWidth(12, 7000);	//공급자
		sheet.setColumnWidth(13, 2000);	//ZONE
		sheet.setColumnWidth(14, 1500);	//적출국
		sheet.setColumnWidth(15, 2000);	//항구이름
		sheet.setColumnWidth(16, 1500);	//항구구분
		sheet.setColumnWidth(17, 2000);	//과세환율
		sheet.setColumnWidth(18, 1500);	//인도조건
		sheet.setColumnWidth(19, 1500);	//거래구분
		sheet.setColumnWidth(20, 1500);	//징수형태
		sheet.setColumnWidth(21, 1500);	//통화종류
		sheet.setColumnWidth(22, 3000);	//결제금액
		sheet.setColumnWidth(23, 3000);	//결제금액
		sheet.setColumnWidth(24, 3000);	//결제금액
		sheet.setColumnWidth(25, 3000);	//결제금액
		sheet.setColumnWidth(26, 3000);	//결제금액
		sheet.setColumnWidth(27, 1500);	//란번호
		sheet.setColumnWidth(28, 4000);	//HS코드
		sheet.setColumnWidth(29, 1500);	//원산지
		sheet.setColumnWidth(30, 1500);	//세율구분
		sheet.setColumnWidth(31, 3000);	//세율
		sheet.setColumnWidth(32, 5000);	//감면부호
		sheet.setColumnWidth(33, 3000);	//감면율
		sheet.setColumnWidth(34, 3000);	//감면액
		sheet.setColumnWidth(35, 3000);	//과세금액
		sheet.setColumnWidth(36, 3000);	//수입관세
		sheet.setColumnWidth(37, 3000);	//수입관세
		sheet.setColumnWidth(38, 1500);	//CS
		sheet.setColumnWidth(39, 4000);	//원산지증명번호
		sheet.setColumnWidth(40, 5000);	//비대상사유
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

        		response.setHeader("Content-Disposition","attachment;filename=\""+URLEncoder.encode("수입란기준실적자료.xlsx", "UTF-8")+"\"");
        		isStarted = true;
        		SXSSFRow row = sheet.createRow(0);
        		SXSSFCell cell = row.createCell(0);
        		cell.setCellValue("입항일");
        		cell.setCellStyle(style);
        		cell = row.createCell(1);
        		cell.setCellValue("반입일");
        		cell.setCellStyle(style);
        		cell = row.createCell(2);
        		cell.setCellValue("수리일");
        		cell.setCellStyle(style);
        		cell = row.createCell(3);
        		cell.setCellValue("신고번호");
        		cell.setCellStyle(style);
        		cell = row.createCell(4);
        		cell.setCellValue("수입자");
        		cell.setCellStyle(style);
        		cell = row.createCell(5);
        		cell.setCellValue("Plant No");
        		cell.setCellStyle(style);
        		cell = row.createCell(6);
        		cell.setCellValue("BL번호");
        		cell.setCellStyle(style);
        		cell = row.createCell(7);
        		cell.setCellValue("분할여부");
        		cell.setCellStyle(style);
        		cell = row.createCell(8);
        		cell.setCellValue("총중량");
        		cell.setCellStyle(style);
        		cell = row.createCell(9);
        		cell.setCellValue("총포장갯수");
        		cell.setCellStyle(style);
        		cell = row.createCell(10);
        		cell.setCellValue("포장종류");
        		cell.setCellStyle(style);
        		cell = row.createCell(11);
        		cell.setCellValue("수출자코드");
        		cell.setCellStyle(style);
        		cell = row.createCell(12);
        		cell.setCellValue("수출자");
        		cell.setCellStyle(style);
        		cell = row.createCell(13);
        		cell.setCellValue("ZONE");
        		cell.setCellStyle(style);
        		cell = row.createCell(14);
        		cell.setCellValue("적출국");
        		cell.setCellStyle(style);
        		cell = row.createCell(15);
        		cell.setCellValue("국내도착항");
        		cell.setCellStyle(style);
        		cell = row.createCell(16);
        		cell.setCellValue("운송형태");
        		cell.setCellStyle(style);
        		cell = row.createCell(17);
        		cell.setCellValue("과세환율");
        		cell.setCellStyle(style);
        		cell = row.createCell(18);
        		cell.setCellValue("인도조건");
        		cell.setCellStyle(style);
        		cell = row.createCell(19);
        		cell.setCellValue("거래구분");
        		cell.setCellStyle(style);
        		cell = row.createCell(20);
        		cell.setCellValue("징수형태");
        		cell.setCellStyle(style);
        		cell = row.createCell(21);
        		cell.setCellValue("통화종류");
        		cell.setCellStyle(style);
        		cell = row.createCell(22);
        		cell.setCellValue("총결제금액");
        		cell.setCellStyle(style);
        		cell = row.createCell(23);
        		cell.setCellValue("총과세가격");
        		cell.setCellStyle(style);
        		cell = row.createCell(24);
        		cell.setCellValue("총관세");
        		cell.setCellStyle(style);
        		cell = row.createCell(25);
        		cell.setCellValue("총부가세");
        		cell.setCellStyle(style);
        		cell = row.createCell(26);
        		cell.setCellValue("총세액");
        		cell.setCellStyle(style);
        		cell = row.createCell(27);
        		cell.setCellValue("란번호");
        		cell.setCellStyle(style);
        		cell = row.createCell(28);
        		cell.setCellValue("HS");
        		cell.setCellStyle(style);
        		cell = row.createCell(29);
        		cell.setCellValue("원산지");
        		cell.setCellStyle(style);
        		cell = row.createCell(30);
        		cell.setCellValue("세율구분");
        		cell.setCellStyle(style);
        		cell = row.createCell(31);
        		cell.setCellValue("세율");
        		cell.setCellStyle(style);
        		cell = row.createCell(32);
        		cell.setCellValue("감면부호");
        		cell.setCellStyle(style);
        		cell = row.createCell(33);
        		cell.setCellValue("감면율");
        		cell.setCellStyle(style);
        		cell = row.createCell(34);
        		cell.setCellValue("감면액");
        		cell.setCellStyle(style);
        		cell = row.createCell(35);
        		cell.setCellValue("란 과세가격");
        		cell.setCellStyle(style);
        		cell = row.createCell(36);
        		cell.setCellValue("란 관세");
        		cell.setCellStyle(style);
        		cell = row.createCell(37);
        		cell.setCellValue("란 부가세");
        		cell.setCellStyle(style);
        		cell = row.createCell(38);
        		cell.setCellValue("CS");
        		cell.setCellStyle(style);
        		cell = row.createCell(39);
        		cell.setCellValue("원산지증명번호");
        		cell.setCellStyle(style);
        		cell = row.createCell(40);
        		cell.setCellValue("비대상사유");
        		cell.setCellStyle(style);
        	}

        	Map<String, Object> dataRow = result.getResultObject();
        	Row row = sheet.createRow(result.getResultCount());
        	Cell cell = null;
        	cell = row.createCell(0);
        	cell.setCellValue(dataRow.get("ImpoIphangDt1")==null ? "" : dataRow.get("ImpoIphangDt1").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(1);
        	cell.setCellValue(dataRow.get("ImpoBanipDt1")==null ? "" : dataRow.get("ImpoBanipDt1").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(2);
        	cell.setCellValue(dataRow.get("ImpoOkDt1")==null ? "" : dataRow.get("ImpoOkDt1").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(3);
        	cell.setCellValue(dataRow.get("ImpoSingoNo")==null ? "" : dataRow.get("ImpoSingoNo").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(4);
        	cell.setCellValue(dataRow.get("OwnGodsNm")==null ? "" : dataRow.get("OwnGodsNm").toString());
        	cell.setCellStyle(style1);
        	cell = row.createCell(5);
        	cell.setCellValue(dataRow.get("PLantNo")==null ? "" : dataRow.get("PLantNo").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(6);
        	cell.setCellValue(dataRow.get("ImpoBlNo")==null ? "" : dataRow.get("ImpoBlNo").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(7);
        	cell.setCellValue(dataRow.get("ImpoBlGbn1")==null ? "" : dataRow.get("ImpoBlGbn1").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(8);
        	cell.setCellValue(Double.parseDouble(dataRow.get("ImpoTotalJung").toString())==0 ? 0 : Double.parseDouble(dataRow.get("ImpoTotalJung").toString()));
        	cell.setCellStyle(style22);
        	cell = row.createCell(9);
        	cell.setCellValue(Double.parseDouble(dataRow.get("ImpoPojangSu").toString())==0 ? 0 : Double.parseDouble(dataRow.get("ImpoPojangSu").toString()));
        	cell.setCellStyle(style20);
        	cell = row.createCell(10);
        	cell.setCellValue(dataRow.get("ImpoPojangDanwi")==null ? "" : dataRow.get("ImpoPojangDanwi").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(11);
        	cell.setCellValue(dataRow.get("ExpCd")==null ? "" : dataRow.get("ExpCd").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(12);
        	cell.setCellValue(dataRow.get("ExpNm")==null ? "" : dataRow.get("ExpNm").toString());
        	cell.setCellStyle(style1);
        	cell = row.createCell(13);
        	cell.setCellValue(dataRow.get("Zone")==null ? "" : dataRow.get("Zone").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(14);
        	cell.setCellValue(dataRow.get("ImpoJukchlCd")==null ? "" : dataRow.get("ImpoJukchlCd").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(15);
        	cell.setCellValue(dataRow.get("ImpoHangguNm")==null ? "" : dataRow.get("ImpoHangguNm").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(16);
        	cell.setCellValue(dataRow.get("ImpoHangguGbn1")==null ? "" : dataRow.get("ImpoHangguGbn1").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(17);
        	cell.setCellValue(Double.parseDouble(dataRow.get("ImpoExchYul").toString())==0 ? 0 : Double.parseDouble(dataRow.get("ImpoExchYul").toString()));
        	cell.setCellStyle(style22);
        	cell = row.createCell(18);
        	cell.setCellValue(dataRow.get("ImpoIndoJogun")==null ? "" : dataRow.get("ImpoIndoJogun").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(19);
        	cell.setCellValue(dataRow.get("ImpoGeleGbn")==null ? "" : dataRow.get("ImpoGeleGbn").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(20);
        	cell.setCellValue(dataRow.get("ImpoJinsuGbn")==null ? "" : dataRow.get("ImpoJinsuGbn").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(21);
        	cell.setCellValue(dataRow.get("ImpoGyeljeMoney")==null ? "" :dataRow.get("ImpoGyeljeMoney").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(22);
        	cell.setCellValue(Double.parseDouble(dataRow.get("ImpoGyeljeInput").toString())==0 ? 0 : Double.parseDouble(dataRow.get("ImpoGyeljeInput").toString()));
        	cell.setCellStyle(style20);
        	cell = row.createCell(23);
        	cell.setCellValue(Double.parseDouble(dataRow.get("ImpoGamjunggaBf").toString())==0 ? 0 : Double.parseDouble(dataRow.get("ImpoGamjunggaBf").toString()));
        	cell.setCellStyle(style20);
        	cell = row.createCell(24);
        	cell.setCellValue(Double.parseDouble(dataRow.get("ImpoGwanTax").toString())==0 ? 0 : Double.parseDouble(dataRow.get("ImpoGwanTax").toString()));
        	cell.setCellStyle(style20);
        	cell = row.createCell(25);
        	cell.setCellValue(Double.parseDouble(dataRow.get("ImpoVatTax").toString())==0 ? 0 : Double.parseDouble(dataRow.get("ImpoVatTax").toString()));
        	cell.setCellStyle(style20);
        	cell = row.createCell(26);
        	cell.setCellValue(Double.parseDouble(dataRow.get("ImpoTotalTax").toString())==0 ? 0 : Double.parseDouble(dataRow.get("ImpoTotalTax").toString()));
        	cell.setCellStyle(style20);
        	cell = row.createCell(27);
        	cell.setCellValue(dataRow.get("ImlanJechlLan")==null ? "" : dataRow.get("ImlanJechlLan").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(28);
        	cell.setCellValue(dataRow.get("ImlanHs")==null ? "" : dataRow.get("ImlanHs").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(29);
        	cell.setCellValue(dataRow.get("ImlanWonsanjiCd")==null ? "" : dataRow.get("ImlanWonsanjiCd").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(30);
        	cell.setCellValue(dataRow.get("ImlanSeyulPrn")==null ? "" : dataRow.get("ImlanSeyulPrn").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(31);
        	cell.setCellValue(Double.parseDouble(dataRow.get("ImlanGwanSeyulc").toString())==0 ? 0 : Double.parseDouble(dataRow.get("ImlanGwanSeyulc").toString()));
        	cell.setCellStyle(style20);
        	cell = row.createCell(32);
        	cell.setCellValue(dataRow.get("ImlanGwanGamBuho")==null ? "" : dataRow.get("ImlanGwanGamBuho").toString());
        	cell.setCellStyle(style1);
        	cell = row.createCell(33);
        	cell.setCellValue(Double.parseDouble(dataRow.get("ImlanGwanGyengYul").toString())==0 ? 0 : Double.parseDouble(dataRow.get("ImlanGwanGyengYul").toString()));
        	cell.setCellStyle(style20);
        	cell = row.createCell(34);
        	cell.setCellValue(Double.parseDouble(dataRow.get("ImlanGyengGwan").toString())==0 ? 0 : Double.parseDouble(dataRow.get("ImlanGyengGwan").toString()));
        	cell.setCellStyle(style20);
        	cell = row.createCell(35);
        	cell.setCellValue(Double.parseDouble(dataRow.get("ImlanCifWon").toString())==0 ? 0 : Double.parseDouble(dataRow.get("ImlanCifWon").toString()));
        	cell.setCellStyle(style20);
        	cell = row.createCell(36);
        	cell.setCellValue(Double.parseDouble(dataRow.get("ImlanGwanTax").toString())==0 ? 0 : Double.parseDouble(dataRow.get("ImlanGwanTax").toString()));
        	cell.setCellStyle(style20);
        	cell = row.createCell(37);
        	cell.setCellValue(Double.parseDouble(dataRow.get("ImlanVatTax").toString())==0 ? 0 : Double.parseDouble(dataRow.get("ImlanVatTax").toString()));
        	cell.setCellStyle(style20);
        	cell = row.createCell(38);
        	cell.setCellValue(dataRow.get("ImpoCs")==null ? "" : dataRow.get("ImpoCs").toString());
        	cell.setCellStyle(style);
        	cell = row.createCell(39);
        	cell.setCellValue(dataRow.get("ImlanWonsanjiNo")==null ? "" : dataRow.get("ImlanWonsanjiNo").toString());
        	cell.setCellStyle(style1);
        	cell = row.createCell(40);
        	cell.setCellValue(dataRow.get("NotYogSayuEtc")==null ? "" : dataRow.get("NotYogSayuEtc").toString());
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