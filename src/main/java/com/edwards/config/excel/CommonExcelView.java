/*
 * Copyright (c) SEIN
 * All rights reserved.
 * This software is the confidential and proprietary information of SEIN. ("Confidential Information").
 */
package com.edwards.config.excel;

import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

/**
 * The type Common excel view.
 */
public class CommonExcelView extends AbstractExcelView {
  private Logger logger = LoggerFactory.getLogger(this.getClass());

  @Override
  protected void buildExcelDocument(Map ModelMap, XSSFWorkbook xssfWorkbook, HttpServletRequest Req, HttpServletResponse Res) throws Exception {
	String ExcelName = (String) ModelMap.get("ExcelName");
	String SheetName = (String) ModelMap.get("SheetName");
	List<String> ColName = (List<String>) ModelMap.get("ColName");
	List<String[]> ColValue = (List<String[]>) ModelMap.get("ColValue");

	Res.setContentType("Application/Msexcel");
	Res.setHeader("Content-Disposition", "Attachment; Filename=" + ExcelName + ".xlsx");

	XSSFSheet Sheet = xssfWorkbook.createSheet(SheetName);

	// 상단 메뉴명 생성
	XSSFRow MenuRow = Sheet.createRow(0);
	for (int i = 0; i < ColName.size(); i++) {
	  XSSFCell Cell = MenuRow.createCell(i);

	  Cell.setCellStyle(getTitleStyle(xssfWorkbook));
//	  Cell.setCellValue(new HSSFRichTextString(ColName.get(i)));
	  Cell.setCellValue(ColName.get(i));
	}

	// 내용 생성
	for (int i = 0; i < ColValue.size(); i++) {
	  // 메뉴 ROW가 있기때문에 +1을 해준다.
	  XSSFRow Row = Sheet.createRow(i + 1);
	  for (int j = 0; j < ColValue.get(i).length; j++) {
		XSSFCell Cell = Row.createCell(j);

//		if (ColValue.get(i)[j] != null && CmmnUtil.isStringDouble(ColValue.get(i)[j])) {
//		  Cell.setCellValue(ColValue.get(i)[j]);
//		} else {
//		  Cell.setCellValue(ColValue.get(i)[j]);
//		}

		Cell.setCellValue(ColValue.get(i)[j]);
	  }
	}
	//width자동조정(속도저하원인)
	if (ColValue.size() < 500) {
	  for (int i = 0; i < ColName.size(); i++) {
		Sheet.autoSizeColumn((short) i);
		Sheet.setColumnWidth(i, (Sheet.getColumnWidth(i)) + 512);  // width수정.
	  }
	}

	logger.debug("-----------Finished Excel Export------");
  }

  private CellStyle getTitleStyle(XSSFWorkbook xssfWorkbook) {
	// 제목 폰트
	Font hf = xssfWorkbook.createFont();
	hf.setFontHeightInPoints((short) 8);
	hf.setColor(HSSFColor.BLACK.index);
	hf.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);

	// Header style setting
	CellStyle hcs = xssfWorkbook.createCellStyle();
	hcs.setFont(hf);
	hcs.setAlignment(HSSFCellStyle.ALIGN_CENTER);

	// set border style
	hcs.setBorderBottom(HSSFCellStyle.BORDER_THICK);
	hcs.setBorderRight(HSSFCellStyle.BORDER_THIN);
	hcs.setBorderLeft(HSSFCellStyle.BORDER_THIN);
	hcs.setBorderTop(HSSFCellStyle.BORDER_THIN);
	hcs.setBorderBottom(HSSFCellStyle.BORDER_THIN);

	// set color
	hcs.setFillBackgroundColor(HSSFColor.WHITE.index);
	hcs.setFillForegroundColor(HSSFColor.GREY_25_PERCENT.index);
	hcs.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
	hcs.setLocked(true);
	hcs.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);

	return hcs;
  }
}