package com.edwards.commons;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.BuiltinFormats;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.*;

public class CommExcel extends AbstractExcelView {
  private Logger log = Logger.getLogger(this.getClass());

  @Override
  protected void buildExcelDocument(Map<String, Object> ModelMap, XSSFWorkbook Workbook, HttpServletRequest Req, HttpServletResponse Res) throws Exception {

    String ExcelName = (String) ModelMap.get("ExcelName");

    List<String> MasterColName = (List<String>) ModelMap.get("ColName");
    List<String[]> MasterColValue = (List<String[]>) ModelMap.get("ColValue");
    List<String> DetailColName = (List<String>) ModelMap.get("DetailColName");
    List<String[]> DetailColValue = (List<String[]>) ModelMap.get("DetailColValue");
    List<String> SubDetailColName = (List<String>) ModelMap.get("SubDetailColName");
    List<String[]> SubDetailColValue = (List<String[]>) ModelMap.get("SubDetailColValue");
    List<String> SubDetailColName2 = (List<String>) ModelMap.get("SubDetailColName2");
    List<String[]> SubDetailColValue2 = (List<String[]>) ModelMap.get("SubDetailColValue2");
    List<String> SubDetailColName3 = (List<String>) ModelMap.get("SubDetailColName3");
    List<String[]> SubDetailColValue3 = (List<String[]>) ModelMap.get("SubDetailColValue3");

    Res.setContentType("Application/Msexcel");
    Res.setHeader("Content-Disposition", "Attachment; Filename=" + ExcelName + ".xlsx");

    XSSFSheet MasterSheet = Workbook.createSheet(URLDecoder.decode(ExcelName, "UTF-8"));
    createExcelData(Workbook, MasterColName, MasterColValue, MasterSheet);

    if (DetailColName != null) {
      XSSFSheet DetailSheet = Workbook.createSheet(URLDecoder.decode(ExcelName, "UTF-8") + "_detail");
      createExcelData(Workbook, DetailColName, DetailColValue, DetailSheet);
    }
    if (SubDetailColName != null) {
      XSSFSheet SubDetailSheet = Workbook.createSheet(URLDecoder.decode(ExcelName, "UTF-8") + "_subDetail");
      createExcelData(Workbook, SubDetailColName, SubDetailColValue, SubDetailSheet);
    }
    if (SubDetailColName2 != null) {
      XSSFSheet SubDetailSheet2 = Workbook.createSheet(URLDecoder.decode(ExcelName, "UTF-8") + "_subDetail2");
      createExcelData(Workbook, SubDetailColName2, SubDetailColValue2, SubDetailSheet2);
    }
    if (SubDetailColName3 != null) {
      XSSFSheet SubDetailSheet3 = Workbook.createSheet(URLDecoder.decode(ExcelName, "UTF-8") + "_subDetail3");
      createExcelData(Workbook, SubDetailColName3, SubDetailColValue3, SubDetailSheet3);
    }
  }

  private void createExcelData(XSSFWorkbook Workbook, List<String> ColName, List<String[]> ColValue, XSSFSheet Sheet) {
    // 상단 메뉴명 생성
    XSSFRow MenuRow = Sheet.createRow(0);
    for (int i = 0; i < ColName.size(); i++) {
      XSSFCell Cell = MenuRow.createCell(i);

      Cell.setCellStyle(getTitleStyle(Workbook));
      // Cell.setCellValue(new HSSFRichTextString(ColName.get(i)));
      Cell.setCellValue(ColName.get(i));
    }

    XSSFDataFormat format = Workbook.createDataFormat();
    CellStyle textStyle = Workbook.createCellStyle();
    textStyle.setDataFormat(format.getFormat("@"));
    //((XSSFCellStyle)textStyle).getCoreXf().setQuotePrefixed(true);
    //textStyle.setDataFormat((short)BuiltinFormats.getBuiltinFormat("text"));

    // 내용 생성
    for (int i = 0; i < ColValue.size(); i++) {
      // 메뉴 ROW가 있기때문에 +1을 해준다.
      XSSFRow Row = Sheet.createRow(i + 1);
      for (int j = 0; j < ColValue.get(i).length; j++) {
        XSSFCell Cell = Row.createCell(j);

        if (ColValue.get(i)[j] != null && isStringDouble(ColValue.get(i)[j])) {
          Cell.setCellStyle(textStyle);
          Cell.setCellValue(ColValue.get(i)[j]);
        } else {
          // Cell.setCellValue(new HSSFRichTextString(ColValue.get(i)[j]));
          Cell.setCellStyle(textStyle);
          Cell.setCellValue(ColValue.get(i)[j]);
        }
      }
    }
  }

  private CellStyle getTitleStyle(XSSFWorkbook wb) {
    // 제목 폰트
    Font hf = wb.createFont();
    hf.setFontHeightInPoints((short) 8);
    hf.setColor((short) HSSFColor.BLACK.index);
    hf.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);

    // Header style setting
    CellStyle hcs = wb.createCellStyle();
    hcs.setFont(hf);
    hcs.setAlignment(HSSFCellStyle.ALIGN_CENTER);

    // set border style
    hcs.setBorderBottom(HSSFCellStyle.BORDER_THICK);
    hcs.setBorderRight(HSSFCellStyle.BORDER_THIN);
    hcs.setBorderLeft(HSSFCellStyle.BORDER_THIN);
    hcs.setBorderTop(HSSFCellStyle.BORDER_THIN);
    hcs.setBorderBottom(HSSFCellStyle.BORDER_THIN);

    // set color
    hcs.setFillBackgroundColor((short) HSSFColor.WHITE.index);
    hcs.setFillForegroundColor((short) HSSFColor.GREY_25_PERCENT.index);
    hcs.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
    hcs.setLocked(true);
    hcs.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);

    return hcs;
  }

  public static boolean isStringDouble(String s) {
    try {
      Double.parseDouble(s);
      return true;
    } catch (NumberFormatException e) {
      return false;
    }
  }

  public static Workbook getWorkbook(String filePath) {
      FileInputStream fis = null;
      try {
          fis = new FileInputStream(filePath);
      } catch (FileNotFoundException e) {
          throw new RuntimeException(e.getMessage(), e);
      }

      Workbook wb = null;

      /*
       * 파일의 확장자를 체크해서 .XLS 라면 HSSFWorkbook에 .XLSX라면 XSSFWorkbook에 각각 초기화 한다.
       */
      if (filePath.toUpperCase().endsWith(".XLS")) {
          try {
              wb = new HSSFWorkbook(fis);
          } catch (IOException e) {
              throw new RuntimeException(e.getMessage(), e);
          }
      } else if (filePath.toUpperCase().endsWith(".XLSX")) {
          try {
              wb = new XSSFWorkbook(fis);
          } catch (IOException e) {
              throw new RuntimeException(e.getMessage(), e);
          }
      }

      return wb;

  }

  //Excel Upload시에 데이터를 얻어옵니다.
  @SuppressWarnings("deprecation")
  public static String cellValueDouble(Cell cell) {

      String value = null;
      if (cell == null)
          value = "";
      else {
          switch (cell.getCellTypeEnum()) { // cell 타입에 따른 데이타 저장
          case FORMULA:
              value = cell.getCellFormula();
              break;
          case NUMERIC:
              if (DateUtil.isCellDateFormatted(cell)) {
                  // you should change this to your application date format
                  SimpleDateFormat objSimpleDateFormat = new SimpleDateFormat(
                          "yyyy-MM-dd");
                  value = "" + objSimpleDateFormat.format(cell.getDateCellValue());
              } else {
//            	  cell.setCellType(Cell.CELL_TYPE_STRING);
//            	  value = "" + cell.getStringCellValue();
                  value = "" +  (double) cell.getNumericCellValue();
              }
              break;
          case STRING:
              value = "" + cell.getStringCellValue();
              break;
          case BLANK:
              // value=""+cell.getBooleanCellValue();
              value = "";
              break;
          case ERROR:
              value = "" + cell.getErrorCellValue();
              break;
          default:
          }
      }
      return value.trim();
  }

//Excel Upload시에 데이터를 얻어옵니다.
  @SuppressWarnings("deprecation")
  public static String cellValue(Cell cell) {

      String value = null;
      if (cell == null)
          value = "";
      else {
    	  switch (cell.getCellType()) { // cell 타입에 따른 데이타 저장
          case Cell.CELL_TYPE_FORMULA:
        	  System.out.println("FORMULA");
              value = cell.getCellFormula();
              break;
          case Cell.CELL_TYPE_NUMERIC:
        	  System.out.println("NUMERIC");
              if (DateUtil.isCellDateFormatted(cell)) {
                  // you should change this to your application date format
                  SimpleDateFormat objSimpleDateFormat = new SimpleDateFormat(
                          "yyyy-MM-dd");
                  value = "" + objSimpleDateFormat.format(cell.getDateCellValue());
              } else {
            	  cell.setCellType(Cell.CELL_TYPE_STRING);
            	  value = "" + cell.getStringCellValue();
              }
              break;
          case Cell.CELL_TYPE_STRING:
        	  System.out.println("STRING");
              value = "" + cell.getStringCellValue();
              break;
          case Cell.CELL_TYPE_BLANK:
        	  System.out.println("BLANK");
              // value=""+cell.getBooleanCellValue();
              value = "";
              break;
          case Cell.CELL_TYPE_ERROR:
        	  System.out.println("ERROR");
              value = "" + cell.getErrorCellValue();
              break;
          default:
          }
      }
      return value.trim();
  }
}