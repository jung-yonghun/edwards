package com.edwards.web.edwards;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.DriverManager;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;

import com.edwards.biz.edwardsManagement.*;
import com.edwards.biz.systemManagement.SystemManagementService;
import com.edwards.commons.*;


@Controller
@RestController
@RequestMapping(value = {"/apis/edwardsUpload"}, method = {RequestMethod.POST})
public class EdwardsExcelController{
	@Autowired
	private EdwardsManagementService edwardsManagementService;
	@Autowired
	private SystemManagementService systemManagementService;


//	String url = "jdbc:sqlserver://kcba.seincustoms.com:1433;databaseName=rms";
//	String user = "sein";
//	String passwd = "cps@123";
//	String url = "jdbc:sqlserver://cps.seincustoms.com:12866;databaseName=rms";
	String url = "jdbc:sqlserver://mssql-onins.vpc-cdb.ntruss.com:12866;databaseName=rms";	
	String user = "seinuser";
	String passwd = "Tlvldptm#5";
	Connection conn;

	private String stringValueOf(Object object) {
		 return object == null ? "" : String.valueOf(object);
	}

	public EdwardsExcelController(){
		//System.out.println("Ex 실행");
	}

	public boolean dbConn(){
		boolean flag = true;
		try{
			Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
			conn = DriverManager.getConnection (url, user, passwd);
			System.out.println(conn);
		}catch(Exception e){
			flag = false;
			System.err.println(e.getMessage());
			e.printStackTrace();
		}

		return flag;
	}

	@RequestMapping(value = "/excelUp")
    public ResponseEntity<?> excelUp(HttpServletRequest request, MultipartHttpServletRequest mRequest) throws Exception{
		EdwardsExcelController ex = new EdwardsExcelController();
	    if(ex.dbConn()) {
	    	Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
			conn = DriverManager.getConnection (url, user, passwd);

	        try { // MultipartHttpServletRequest 생성
	        	String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
				String userKey			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
				String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

	        	MultiValueMap<String, MultipartFile> map = mRequest.getMultiFileMap();
	    		Iterator<String> iter = map.keySet().iterator();

	    		List<MultipartFile> mfile = null;
	            String fieldName = "";

	            // 값이 나올때까지
	            while (iter.hasNext()) {
	                fieldName = iter.next(); // 내용을 가져와서
	                mfile = map.get(fieldName);
	                String origName;
	                for (MultipartFile mpf : mfile){
	                	origName = CmmnFileUtils.convertOriginalFileName(mpf.getOriginalFilename()); //한글꺠짐 방지 // 파일명이 없다면
	                	mpf.transferTo(new File("C:\\edwards\\"+currentDatetime+origName));
		                Workbook wbs = CommExcel.getWorkbook("C:\\edwards\\"+currentDatetime+origName);

		                Sheet sheet = (Sheet) wbs.getSheetAt(0);

		                Map args = new HashMap();
		                String currentYear = CmmnUtils.getFormatedDate("yyyy");
		                String BOM_DRAW_MNG_NO ;
		                List<Map> list2 = edwardsManagementService.selectMaxBomDraw(args);
		    			if(list2.get(0).get("max").equals(currentYear)){
		    				args.put("BOM_DRAW_MNG_NO",list2.get(0).get("BOM_DRAW_MNG_NO"));
		    				BOM_DRAW_MNG_NO 	= stringValueOf(args.get("BOM_DRAW_MNG_NO"));
		    			}else{
		    				args.put("BOM_DRAW_MNG_NO",currentYear+"000001");
		    				BOM_DRAW_MNG_NO 	= stringValueOf(args.get("BOM_DRAW_MNG_NO"));
		    			}

		    			StringBuffer sb = new StringBuffer();

		    		    sb.append(" INSERT INTO rms.dbo.ED_BOM_DRAW (GRP_COMP_CD,BOM_DRAW_MNG_NO,SEQNO,JEPUM_CD,FrDay,ToDay,LevelUsg,RgCode,ITEM_CD,Basic,BasicUsg,RefRate,AgDivi,AgRate,UsgCal,JEPUM_QTY_UNIT,ITEM_QtyUnit,useYn,addUserId,addUserNm,addDtm) values ( ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,? ) ");
		    		    PreparedStatement pstmt = conn.prepareStatement(sb.toString());

		                //excel file 두번쨰줄부터 시작
		                for (int i = sheet.getFirstRowNum() + 1; i <= sheet.getLastRowNum(); i++) {
		                    Row row = sheet.getRow(i);

		                    pstmt.setString(1, "3128112960");
		                    pstmt.setString(2, BOM_DRAW_MNG_NO);
		                    pstmt.setString(3, Integer.toString(i));
		                    pstmt.setString(4, CommExcel.cellValue(row.getCell(0)));
		                    pstmt.setString(5, CommExcel.cellValue(row.getCell(1)));
		                    pstmt.setString(6, CommExcel.cellValue(row.getCell(2)));
		                    pstmt.setString(7, CommExcel.cellValue(row.getCell(3)));
		                    pstmt.setString(8, CommExcel.cellValue(row.getCell(4)));
		                    pstmt.setString(9, CommExcel.cellValue(row.getCell(5)));
		                    pstmt.setString(10, CommExcel.cellValue(row.getCell(6)));
		                    pstmt.setString(11, CommExcel.cellValue(row.getCell(7)));
		                    pstmt.setString(12, CommExcel.cellValue(row.getCell(8)));
		                    pstmt.setString(13, CommExcel.cellValue(row.getCell(9)));
		                    pstmt.setString(14, CommExcel.cellValue(row.getCell(10)));
		                    pstmt.setString(15, CommExcel.cellValue(row.getCell(11)));
		                    pstmt.setString(16, CommExcel.cellValue(row.getCell(12)));
		                    pstmt.setString(17, CommExcel.cellValue(row.getCell(13)));
		                    pstmt.setString(18, "Y");
		                    pstmt.setString(19, userKey);
		                    pstmt.setString(20, userNm);
		                    pstmt.setString(21, currentDatetime);

		                    pstmt.addBatch();

		                    pstmt.clearParameters() ;
		                    if( (i % 10000) == 0){
		                        // Batch 실행
		                        pstmt.executeBatch() ;
		                        // Batch 초기화
		                        pstmt.clearBatch();
		                        // 커밋
		                        conn.commit() ;
		                    }
		                }
		                pstmt.executeBatch();
		                pstmt.close();

		                File file = new File("C:\\edwards\\"+currentDatetime+origName);
		                if( file.exists() ){
		                	file.delete();
		                };
	                }
	            }
	            conn.close();
	        }catch(UnsupportedEncodingException e) { // TODO Auto-generated catch block
	            e.printStackTrace();
	        }catch(IllegalStateException e) { // TODO Auto-generated catch block
	            e.printStackTrace();
	        }catch(IOException e) { // TODO Auto-generated catch block
	            e.printStackTrace();
	        }
	    }
	    return new ResponseEntity<>("ok", HttpStatus.OK);
    }

	@RequestMapping(value = "/bomUp")
    public ResponseEntity<?> bomUp(HttpServletRequest request, MultipartHttpServletRequest mRequest, @RequestBody Map args1) throws Exception{
		EdwardsExcelController ex = new EdwardsExcelController();
	    if(ex.dbConn()) {
	    	Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
			conn = DriverManager.getConnection (url, user, passwd);

	        try { // MultipartHttpServletRequest 생성
	        	String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
				String userKey			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
				String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
				String taxNum1 			= stringValueOf(args1.get("taxNum1"));

	        	MultiValueMap<String, MultipartFile> map = mRequest.getMultiFileMap();
	    		Iterator<String> iter = map.keySet().iterator();

	    		List<MultipartFile> mfile = null;
	            String fieldName = "";

	            // 값이 나올때까지
	            while (iter.hasNext()) {
	                fieldName = iter.next(); // 내용을 가져와서
	                mfile = map.get(fieldName);
	                String origName;
	                for (MultipartFile mpf : mfile){
	                	origName = CmmnFileUtils.convertOriginalFileName(mpf.getOriginalFilename()); //한글꺠짐 방지 // 파일명이 없다면
	                	mpf.transferTo(new File("C:\\edwards\\"+currentDatetime+origName));
		                Workbook wbs = CommExcel.getWorkbook("C:\\edwards\\"+currentDatetime+origName);

		                Sheet sheet = (Sheet) wbs.getSheetAt(0);

		                //excel file 두번쨰줄부터 시작
		                String REVSN_NO = "";
	                    String BOM_CD = "";
		    			String REVSN_NO1 = "";

		    			StringBuffer sb = new StringBuffer();

		    		    sb.append(" INSERT INTO rms.dbo.[ED_BOM_MASTER] (BOM_CD,BOM_NM,REVSN_NO,REVSN_DTTM,REVSN_DTTM1,QTY_UNIT,DEMD_PLAN_FG,USE_EXEC_FG,REFUND_USE_FG,ITEM_CD,ITEM_NM,QTY,USE_FG,useYn,addUserId,addUserNm,addDtm,COMP_CD) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ");
		    		    PreparedStatement pstmt = conn.prepareStatement(sb.toString());

		                //excel file 두번쨰줄부터 시작
		                for (int i = sheet.getFirstRowNum() + 1; i <= sheet.getLastRowNum(); i++) {
		                	Row row = sheet.getRow(i);

		                    if(BOM_CD.equals(CommExcel.cellValue(row.getCell(0)))){
		                    	REVSN_NO = REVSN_NO1;
		                    }else{
			                    Map args = new HashMap();
			                    args.put("BOM_CD",CommExcel.cellValue(row.getCell(0)));
			                    args.put("userKey",userKey);
			        			args.put("userNm",userNm);
			        			args.put("currentDatetime",currentDatetime);

			                    List<Map> list2 = edwardsManagementService.selectMaxBom(args);
			                    long result = edwardsManagementService.updateBomMaster2(args);

			                    if(list2.get(0).get("REVSN_NO").equals(0)){
									REVSN_NO = "1";
								}else{
									args.put("REVSN_NO",list2.get(0).get("REVSN_NO"));
									REVSN_NO = stringValueOf(args.get("REVSN_NO"));
								}
		                    }

		                    pstmt.setString(1, CommExcel.cellValue(row.getCell(0)));
		                    pstmt.setString(2, CommExcel.cellValue(row.getCell(1)));
		                    pstmt.setString(3, REVSN_NO);
		                    pstmt.setString(4, CommExcel.cellValue(row.getCell(2)));
		                    pstmt.setString(5, CommExcel.cellValue(row.getCell(2)).substring(0, 4)+"-"+CommExcel.cellValue(row.getCell(2)).substring(4, 6)+"-"+CommExcel.cellValue(row.getCell(2)).substring(6, 8));
		                    pstmt.setString(6, CommExcel.cellValue(row.getCell(3)));
		                    pstmt.setString(7, CommExcel.cellValue(row.getCell(4)));
		                    pstmt.setString(8, CommExcel.cellValue(row.getCell(5)));
		                    pstmt.setString(9, CommExcel.cellValue(row.getCell(6)));
		                    pstmt.setString(10, CommExcel.cellValue(row.getCell(7)));
		                    pstmt.setString(11, CommExcel.cellValue(row.getCell(8)));
		                    pstmt.setString(12, CommExcel.cellValue(row.getCell(9)));
		                    pstmt.setString(13, "Y");
		                    pstmt.setString(14, "Y");
		                    pstmt.setString(15, userKey);
		                    pstmt.setString(16, userNm);
		                    pstmt.setString(17, currentDatetime);
		                    pstmt.setString(17, taxNum1);

		                    pstmt.addBatch();

		                    pstmt.clearParameters() ;
		                    if( (i % 10000) == 0){
		                        // Batch 실행
		                        pstmt.executeBatch() ;
		                        // Batch 초기화
		                        pstmt.clearBatch();
		                        // 커밋
		                        conn.commit() ;
		                    }

		                    BOM_CD = CommExcel.cellValue(row.getCell(0));
		                    REVSN_NO1 = REVSN_NO;
		                }
		                pstmt.executeBatch();
		                pstmt.close();

		                File file = new File("C:\\edwards\\"+currentDatetime+origName);
		                if( file.exists() ){
		                	file.delete();
		                };
	                }
	            }
	            conn.close();
	        }catch(UnsupportedEncodingException e) { // TODO Auto-generated catch block
	            e.printStackTrace();
	        }catch(IllegalStateException e) { // TODO Auto-generated catch block
	            e.printStackTrace();
	        }catch(IOException e) { // TODO Auto-generated catch block
	            e.printStackTrace();
	        }
	    }
	    return new ResponseEntity<>("ok", HttpStatus.OK);
    }

	@RequestMapping(value = "/reImUp")
    public ResponseEntity<?> reImUp(HttpServletRequest request, MultipartHttpServletRequest mRequest, HttpServletResponse response) throws Exception{
		EdwardsExcelController ex = new EdwardsExcelController();
	    if(ex.dbConn()) {
	    	Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
			conn = DriverManager.getConnection (url, user, passwd);

	        try { // MultipartHttpServletRequest 생성
	        	String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
				String userKey			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
				String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

				edwardsManagementService.updateNullInv();
				edwardsManagementService.updateNullDecl();
				edwardsManagementService.updateNullLan();
				edwardsManagementService.updateNullHng();
				edwardsManagementService.updateNullSel();

	        	MultiValueMap<String, MultipartFile> map = mRequest.getMultiFileMap();
	    		Iterator<String> iter = map.keySet().iterator();

	    		List<MultipartFile> mfile = null;
	            String fieldName = "";

	            // 값이 나올때까지
	            while (iter.hasNext()) {
	                fieldName = iter.next(); // 내용을 가져와서
	                mfile = map.get(fieldName);
	                String origName;
	                for (MultipartFile mpf : mfile){
	                	origName = CmmnFileUtils.convertOriginalFileName(mpf.getOriginalFilename()); //한글꺠짐 방지 // 파일명이 없다면
	                	mpf.transferTo(new File("C:\\edwards\\"+currentDatetime+origName));
		                Workbook wbs = CommExcel.getWorkbook("C:\\edwards\\"+currentDatetime+origName);

		                Sheet sheet = (Sheet) wbs.getSheetAt(0);

		                //excel file 두번쨰줄부터 시작
		                for (int i = sheet.getFirstRowNum() + 1; i <= sheet.getLastRowNum(); i++) {
		                	StringBuffer sb = new StringBuffer();

			    		    sb.append(" INSERT INTO rms.dbo.[ED_REIMPT_MASTER] (INV_NO,EXPT_DECL_NO,EXPT_LAN,EXPT_HNG,EXPT_CMPL_DT,EXPT_QTY,EXPT_GURAE_GBN,NameOfShipto,SERIAL_NO,PROD_CD,PROD_NM,RMID_QTY,BL_NO,IMPT_DECL_NO,IMPT_LAN,IMPT_HNG,IMPT_CMPL_DT,IMPT_QTY,IMPT_GURAE_GBN,useYn,addUserId,addUserNm,addDtm,confirmChk) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ");
			    		    PreparedStatement pstmt = conn.prepareStatement(sb.toString());

			    		    StringBuffer sb1 = new StringBuffer();

			    		    sb1.append(" update rms.dbo.[ED_REIMPT_MASTER] set RMID_QTY=?,BL_NO=?,IMPT_DECL_NO=?,IMPT_LAN=?,IMPT_HNG=?,IMPT_CMPL_DT=?,IMPT_QTY=?,IMPT_GURAE_GBN=?,editUserId=?,editUserNm=?,editDtm=?,confirmChk=?,INV_NO=?,EXPT_DECL_NO=?,EXPT_LAN=?,EXPT_HNG=?,EXPT_CMPL_DT=?,EXPT_QTY=?,EXPT_GURAE_GBN=?,NameOfShipto=?,PROD_CD=?,PROD_NM=? where SERIAL_NO=?");
			    		    PreparedStatement pstmt1 = conn.prepareStatement(sb1.toString());

		                	Row row = sheet.getRow(i);
		                	if(row == null){
		                		break;
		                	}

		                	Map args = new HashMap();
		                	List<Map> list1 = null;

		                	// 수출량이 공백이면 에러
		                	if(CommExcel.cellValue(row.getCell(5)).equals("")){
		                		throw new Exception("수량 에러");
		                	}

		                	// 수출량이 0이면 에러
		                	if(CommExcel.cellValue(row.getCell(5)).equals("0")){
		                		throw new Exception("수량 에러");
		                	}

		                	// 수출량이 -이면 에러
		                	if(Integer.parseInt(CommExcel.cellValue(row.getCell(5))) < 0){
		                		throw new Exception("수량 에러");
		                	}

		                	// 수입량이 0이면 에러
		                	if(CommExcel.cellValue(row.getCell(17)).equals("0")){
		                		throw new Exception("수량 에러");
		                	}

		                	// 수입량이 -이면 에러
		                	if(!CommExcel.cellValue(row.getCell(17)).equals("")){
			                	if(Integer.parseInt(CommExcel.cellValue(row.getCell(17))) < 0){
			                		throw new Exception("수량 에러");
			                	}
		                	}

		                	// 수입량이 수출량보다 크면 에러
		                	if(!CommExcel.cellValue(row.getCell(17)).equals("")){
			                	if(Integer.parseInt(CommExcel.cellValue(row.getCell(5)))-Integer.parseInt(CommExcel.cellValue(row.getCell(17))) < 0){
			                		throw new Exception("수량 에러");
			                	}
		                	}

		                	//SerialNo에 데이터가 존재해야 등록
		                	if(!CommExcel.cellValue(row.getCell(8)).equals("")){
		                		args.put("SERIAL_NO",CommExcel.cellValue(row.getCell(8)));
		                		list1 = edwardsManagementService.selectReExpoCount(args);
		                		//같은 시리얼번호가 있으면 업데이트
		                		if(list1.size() > 0){
		                			// 왼쪽이나 오른쪽이 의뢰건이면 에러
		                			if(String.valueOf(list1.get(0).get("IMPT_ORDR_MNG_NO")).equals("") || String.valueOf(list1.get(0).get("IMPT_ORDR_MNG_NO")).equals(null) || String.valueOf(list1.get(0).get("EXPT_ORDR_MNG_NO")).equals("") || String.valueOf(list1.get(0).get("EXPT_ORDR_MNG_NO")).equals(null)){
		                				String empty = "";
			                			//수입량이 존재하면
				                    	if(!CommExcel.cellValue(row.getCell(17)).equals("")){
				                    		//수출량이 존재하면
				                    		if(!CommExcel.cellValue(row.getCell(5)).equals("")){
				                    			empty = Integer.toString(Integer.parseInt(CommExcel.cellValue(row.getCell(5)))-Integer.parseInt(CommExcel.cellValue(row.getCell(17))));
				                    		}
					                    }else{
					                    	if(!CommExcel.cellValue(row.getCell(5)).equals("")){
					                    		empty = Integer.toString(Integer.parseInt(CommExcel.cellValue(row.getCell(5))));
					                    	}else{
				                    			empty = "0";
				                    		}
					                    }
				                    	pstmt1.setString(1, empty);
				                    	pstmt1.setString(2, CommExcel.cellValue(row.getCell(12)));
					                    pstmt1.setString(3, CommExcel.cellValue(row.getCell(13)));
					                    pstmt1.setString(4, CommExcel.cellValue(row.getCell(14)));
					                    pstmt1.setString(5, CommExcel.cellValue(row.getCell(15)));
					                    pstmt1.setString(6, CommExcel.cellValue(row.getCell(16)).replace("-", ""));
					                    pstmt1.setString(7, CommExcel.cellValue(row.getCell(17)));
					                    pstmt1.setString(8, CommExcel.cellValue(row.getCell(18)));
					                    pstmt1.setString(9, userKey);
					                    pstmt1.setString(10, userNm);
					                    pstmt1.setString(11, currentDatetime);
					                    pstmt1.setString(12, "Y");
					                    pstmt1.setString(13, CommExcel.cellValue(row.getCell(0)));
					                    pstmt1.setString(14, CommExcel.cellValue(row.getCell(1)));
					                    pstmt1.setString(15, CommExcel.cellValue(row.getCell(2)));
					                    pstmt1.setString(16, CommExcel.cellValue(row.getCell(3)));
					                    pstmt1.setString(17, CommExcel.cellValue(row.getCell(4)).replace("-", ""));
					                    pstmt1.setString(18, CommExcel.cellValue(row.getCell(5)));
					                    pstmt1.setString(19, CommExcel.cellValue(row.getCell(6)));
					                    pstmt1.setString(20, CommExcel.cellValue(row.getCell(7)));
					                    pstmt1.setString(21, CommExcel.cellValue(row.getCell(9)));
					                    pstmt1.setString(22, CommExcel.cellValue(row.getCell(10)));
					                    pstmt1.setString(23, CommExcel.cellValue(row.getCell(8)));

					                    pstmt1.addBatch();

					                    pstmt1.clearParameters() ;
					                    if( (i % 10000) == 0){
					                        // Batch 실행d
					                        pstmt1.executeBatch() ;
					                        // Batch 초기화
					                        pstmt1.clearBatch();
					                        // 커밋
					                        conn.commit() ;
					                    }
		                			}else{
		                				throw new Exception("의뢰건 수정 안됨");
		                			}
				                //기존에 등록된 건이 없으면 신규등록
		                		}else{
		                			String empty = "";
		                			//수입량이 존재하면
			                    	if(!CommExcel.cellValue(row.getCell(17)).equals("")){
			                    		//수출량이 존재하면
			                    		if(!CommExcel.cellValue(row.getCell(5)).equals("")){
			                    			empty = Integer.toString(Integer.parseInt(CommExcel.cellValue(row.getCell(5)))-Integer.parseInt(CommExcel.cellValue(row.getCell(17))));
			                    		}
				                    }else{
				                    	if(!CommExcel.cellValue(row.getCell(5)).equals("")){
				                    		empty = Integer.toString(Integer.parseInt(CommExcel.cellValue(row.getCell(5))));
				                    	}else{
			                    			empty = "0";
			                    		}
				                    }
									pstmt.setString(1, CommExcel.cellValue(row.getCell(0)));
				                    pstmt.setString(2, CommExcel.cellValue(row.getCell(1)));
				                    pstmt.setString(3, CommExcel.cellValue(row.getCell(2)));
				                    pstmt.setString(4, CommExcel.cellValue(row.getCell(3)));
				                    pstmt.setString(5, CommExcel.cellValue(row.getCell(4)).replace("-", ""));
				                    pstmt.setString(6, CommExcel.cellValue(row.getCell(5)));
				                    pstmt.setString(7, CommExcel.cellValue(row.getCell(6)));
				                    pstmt.setString(8, CommExcel.cellValue(row.getCell(7)));
				                    pstmt.setString(9, CommExcel.cellValue(row.getCell(8)));
				                    pstmt.setString(10, CommExcel.cellValue(row.getCell(9)));
				                    pstmt.setString(11, CommExcel.cellValue(row.getCell(10)));
				                    pstmt.setString(12, empty);
				                    pstmt.setString(13, CommExcel.cellValue(row.getCell(12)));
				                    pstmt.setString(14, CommExcel.cellValue(row.getCell(13)));
				                    pstmt.setString(15, CommExcel.cellValue(row.getCell(14)));
				                    pstmt.setString(16, CommExcel.cellValue(row.getCell(15)));
				                    pstmt.setString(17, CommExcel.cellValue(row.getCell(16)).replace("-", ""));
				                    pstmt.setString(18, CommExcel.cellValue(row.getCell(17)));
				                    pstmt.setString(19, CommExcel.cellValue(row.getCell(18)));
				                    pstmt.setString(20, "Y");
				                    pstmt.setString(21, userKey);
				                    pstmt.setString(22, userNm);
				                    pstmt.setString(23, currentDatetime);
				                    pstmt.setString(24, "Y");

				                    pstmt.addBatch();

				                    pstmt.clearParameters() ;
				                    if( (i % 10000) == 0){
				                        // Batch 실행
				                        pstmt.executeBatch() ;
				                        // Batch 초기화
				                        pstmt.clearBatch();
				                        // 커밋
				                        conn.commit() ;
				                    }
		                		}
		                	}else{
		                		throw new Exception("시리얼번호 미등록에러");
		                	}
		                	pstmt.executeBatch();
				            pstmt.close();
				            pstmt1.executeBatch();
				            pstmt1.close();
		                }

		                File file = new File("C:\\edwards\\"+currentDatetime+origName);
		                if( file.exists() ){
		                	file.delete();
		                };
	                }
	            }
	            conn.close();
	            Map map3 = new HashMap();
				map3.put("INV_NO", "");
	            return new ResponseEntity<>(map3,HttpStatus.OK);
	        }catch(Exception e) { // TODO Auto-generated catch block
	        	e.printStackTrace();
	            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	        }
	    }else{
	    	return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	    }
    }

	@RequestMapping(value = "/reExUp")
    public ResponseEntity<?> reExUp(HttpServletRequest request, MultipartHttpServletRequest mRequest, @RequestBody Map args1) throws Exception{
		EdwardsExcelController ex = new EdwardsExcelController();
	    if(ex.dbConn()) {
	    	Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
			conn = DriverManager.getConnection (url, user, passwd);

	        try { // MultipartHttpServletRequest 생성
	        	String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
				String userKey			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
				String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
				String taxNum1 			= stringValueOf(args1.get("taxNum"));

				// null 제거
				edwardsManagementService.updateNullBl();
				edwardsManagementService.updateNullImDecl();
				edwardsManagementService.updateNullImLan();
				edwardsManagementService.updateNullImHng();
				edwardsManagementService.updateNullSo();
				edwardsManagementService.updateNullEn();
				edwardsManagementService.updateNullEx();
				edwardsManagementService.updateNullImSl();
				edwardsManagementService.updateNullExIv();
				edwardsManagementService.updateNullExDecl();
				edwardsManagementService.updateNullExLan();
				edwardsManagementService.updateNullExHng();


	        	MultiValueMap<String, MultipartFile> map = mRequest.getMultiFileMap();
	    		Iterator<String> iter = map.keySet().iterator();

	    		List<MultipartFile> mfile = null;
	            String fieldName = "";

	            // 값이 나올때까지
	            while (iter.hasNext()) {
	                fieldName = iter.next(); // 내용을 가져와서
	                mfile = map.get(fieldName);
	                String origName;
	                for (MultipartFile mpf : mfile){
	                	origName = CmmnFileUtils.convertOriginalFileName(mpf.getOriginalFilename()); //한글꺠짐 방지 // 파일명이 없다면
	                	mpf.transferTo(new File("C:\\edwards\\"+currentDatetime+origName));
		                Workbook wbs = CommExcel.getWorkbook("C:\\edwards\\"+currentDatetime+origName);

		                Sheet sheet = (Sheet) wbs.getSheetAt(0);

		                //excel file 두번쨰줄부터 시작
		                for (int i = sheet.getFirstRowNum() + 1; i <= sheet.getLastRowNum(); i++) {
		                	StringBuffer sb = new StringBuffer();

			    		    sb.append(" INSERT INTO rms.dbo.[ED_REEXPT_MASTER] (BL_NO,IMPT_DECL_NO,IMPT_LAN,IMPT_HNG,IMPT_CMPL_DT,IMPT_QTY,IMPT_GURAE_GBN,REEX_END_DT,EHEANG_END_DT,YONGDO_DT,DELAY_SEQ,SoNo,EndUserName,ExEmNo,SERIAL_NO,PROD_CD,PROD_NM,RMID_QTY,INV_NO,EXPT_DECL_NO,EXPT_LAN,EXPT_HNG,EXPT_CMPL_DT,EXPT_QTY,EXPT_GURAE_GBN,NameOfShipto,useYn,addUserId,addUserNm,addDtm,confirmChk,COMP_CD) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ");
			    		    PreparedStatement pstmt = conn.prepareStatement(sb.toString());

			    		    StringBuffer sb1 = new StringBuffer();

			    		    sb1.append(" update rms.dbo.[ED_REEXPT_MASTER] set RMID_QTY=?,INV_NO=?,EXPT_DECL_NO=?,EXPT_LAN=?,EXPT_HNG=?,EXPT_CMPL_DT=?,EXPT_QTY=?,EXPT_GURAE_GBN=?,NameOfShipto=?,editUserId=?,editUserNm=?,editDtm=?,confirmChk=?,REEX_END_DT=?,EHEANG_END_DT=?,YONGDO_DT=?,DELAY_SEQ=?,BL_NO=?,IMPT_DECL_NO=?,IMPT_LAN=?,IMPT_HNG=?,IMPT_CMPL_DT=?,IMPT_QTY=?,IMPT_GURAE_GBN=?,SoNo=?,EndUserName=?,ExEmNo=?,PROD_CD=?,PROD_NM=? where SERIAL_NO=?");
			    		    PreparedStatement pstmt1 = conn.prepareStatement(sb1.toString());

		                	Row row = sheet.getRow(i);
		                	if(row == null){
		                		break;
		                	}

		                	Map args = new HashMap();
		                	List<Map> list1 = null;

		                	//BLNo에 데이터가 존재해야 등록
		                	//if(!CommExcel.cellValue(row.getCell(0)).equals("")){
		                		// 수입량이 공백이면 에러
			                	if(CommExcel.cellValue(row.getCell(5)).equals("")){
			                		throw new Exception("수량 에러");
			                	}

			                	// 수입량이 0이면 에러
			                	if(CommExcel.cellValue(row.getCell(5)).equals("0")){
			                		throw new Exception("수량 에러");
			                	}

			                	// 수입량이 -이면 에러
			                	if(Integer.parseInt(CommExcel.cellValue(row.getCell(5))) < 0){
			                		throw new Exception("수량 에러");
			                	}

			                	// 수출량이 0이면 에러
			                	if(CommExcel.cellValue(row.getCell(23)).equals("0")){
			                		throw new Exception("수량 에러");
			                	}

			                	// 수출량이 -이면 에러
			                	if(!CommExcel.cellValue(row.getCell(23)).equals("")){
				                	if(Integer.parseInt(CommExcel.cellValue(row.getCell(23))) < 0){
				                		throw new Exception("수량 에러");
				                	}
			                	}

			                	// 면제번호와 시리얼번호 둘 다 없을 때 에러
			                	if(CommExcel.cellValue(row.getCell(13)).equals("") && CommExcel.cellValue(row.getCell(14)).equals("")){
			                		throw new Exception("번호 에러");
			                	}

			                	if(!CommExcel.cellValue(row.getCell(23)).equals("")){
			                		if(Integer.parseInt(CommExcel.cellValue(row.getCell(5)))-Integer.parseInt(CommExcel.cellValue(row.getCell(23))) < 0){
				                		throw new Exception("수량 에러");
				                	}
			                	}
		                		//시리얼번호가 존재하면
		                		if(!CommExcel.cellValue(row.getCell(14)).equals("")){
			                		args.put("SERIAL_NO",CommExcel.cellValue(row.getCell(14)));
			                		list1 = edwardsManagementService.selectReImpoCount(args);
			                		//같은 시리얼번호가 있으면 업데이트
			                		if(list1.size() > 0){
			                			// 왼쪽이나 오른쪽이 의뢰건이면 건너뜀
			                			if(String.valueOf(list1.get(0).get("IMPT_ORDR_MNG_NO")).equals("") || String.valueOf(list1.get(0).get("IMPT_ORDR_MNG_NO")).equals(null) || String.valueOf(list1.get(0).get("EXPT_ORDR_MNG_NO")).equals("") || String.valueOf(list1.get(0).get("EXPT_ORDR_MNG_NO")).equals(null)){
			                				String empty = "";
				                			//수출량이 존재하면
					                    	if(!CommExcel.cellValue(row.getCell(23)).equals("")){
					                    		//수입량이 존재하면
					                    		if(!CommExcel.cellValue(row.getCell(5)).equals("")){
					                    			empty = Integer.toString(Integer.parseInt(CommExcel.cellValue(row.getCell(5)))-Integer.parseInt(CommExcel.cellValue(row.getCell(23))));
					                    		}
						                    }else{
						                    	if(!CommExcel.cellValue(row.getCell(5)).equals("")){
						                    		empty = Integer.toString(Integer.parseInt(CommExcel.cellValue(row.getCell(5))));
						                    	}else{
					                    			empty = "0";
					                    		}
						                    }
					                    	pstmt1.setString(1, empty);
						                    pstmt1.setString(2, CommExcel.cellValue(row.getCell(18)));
						                    pstmt1.setString(3, CommExcel.cellValue(row.getCell(19)));
						                    pstmt1.setString(4, CommExcel.cellValue(row.getCell(20)));
						                    pstmt1.setString(5, CommExcel.cellValue(row.getCell(21)));
						                    pstmt1.setString(6, CommExcel.cellValue(row.getCell(22)).replace("-", ""));
						                    pstmt1.setString(7, CommExcel.cellValue(row.getCell(23)));
						                    pstmt1.setString(8, CommExcel.cellValue(row.getCell(24)));
						                    pstmt1.setString(9, CommExcel.cellValue(row.getCell(25)));
						                    pstmt1.setString(10, userKey);
						                    pstmt1.setString(11, userNm);
						                    pstmt1.setString(12, currentDatetime);
						                    pstmt1.setString(13, "Y");
						                    pstmt1.setString(14, CommExcel.cellValue(row.getCell(7)).replace("-", ""));
						                    pstmt1.setString(15, CommExcel.cellValue(row.getCell(8)).replace("-", ""));
						                    pstmt1.setString(16, CommExcel.cellValue(row.getCell(9)).replace("-", ""));
						                    pstmt1.setString(17, CommExcel.cellValue(row.getCell(10)));
						                    pstmt1.setString(18, CommExcel.cellValue(row.getCell(0)));
						                    pstmt1.setString(19, CommExcel.cellValue(row.getCell(1)));
						                    pstmt1.setString(20, CommExcel.cellValue(row.getCell(2)));
						                    pstmt1.setString(21, CommExcel.cellValue(row.getCell(3)));
						                    pstmt1.setString(22, CommExcel.cellValue(row.getCell(4)).replace("-", ""));
						                    pstmt1.setString(23, CommExcel.cellValue(row.getCell(5)));
						                    pstmt1.setString(24, CommExcel.cellValue(row.getCell(6)));
						                    pstmt1.setString(25, CommExcel.cellValue(row.getCell(11)));
						                    pstmt1.setString(26, CommExcel.cellValue(row.getCell(12)));
						                    pstmt1.setString(27, CommExcel.cellValue(row.getCell(13)));
						                    pstmt1.setString(28, CommExcel.cellValue(row.getCell(15)));
						                    pstmt1.setString(29, CommExcel.cellValue(row.getCell(16)));
						                    pstmt1.setString(30, CommExcel.cellValue(row.getCell(14)));

						                    pstmt1.addBatch();

						                    pstmt1.clearParameters() ;
						                    if( (i % 10000) == 0){
						                        // Batch 실행d
						                        pstmt1.executeBatch() ;
						                        // Batch 초기화
						                        pstmt1.clearBatch();
						                        // 커밋
						                        conn.commit() ;
						                        System.out.println("DDDD");
						                    }
			                			}else{
			                				throw new Exception("의뢰건 에러");
			                			}
			                		//기존에 등록된 건이 없으면 신규등록
			                		}else{
			                			args.put("BL_NO",CommExcel.cellValue(row.getCell(0)));
				                		args.put("IMPT_DECL_NO",CommExcel.cellValue(row.getCell(1)));
				                		args.put("IMPT_LAN",CommExcel.cellValue(row.getCell(2)));
				                		args.put("IMPT_HNG",CommExcel.cellValue(row.getCell(3)));
				                		args.put("SoNo",CommExcel.cellValue(row.getCell(11)));
				                		args.put("EndUserName",CommExcel.cellValue(row.getCell(12)));
				                		args.put("ExEmNo",CommExcel.cellValue(row.getCell(13)));
				                		args.put("SERIAL_NO",CommExcel.cellValue(row.getCell(14)));
				                		args.put("Request","Y");
				                		list1 = edwardsManagementService.selectReImpoCount(args);
				                		//의뢰 데이터를 다시 신규로 넣을시 입력불가
				                		if(list1.size() > 0){
				                			continue;
				                		}else{
				                			//재수출만료일이나 이행보고일이나 용도외사용승인일이 공백이 아니라면 해당 신고번호/란/행 모두 업데이트
	//			                			if(!CommExcel.cellValue(row.getCell(7)).equals("") || !CommExcel.cellValue(row.getCell(8)).equals("") || !CommExcel.cellValue(row.getCell(9)).equals("")){
	//			                				Map args1 = new HashMap();
	//			                				args1.put("BL_NO",CommExcel.cellValue(row.getCell(0)));
	//					                		args1.put("IMPT_DECL_NO",CommExcel.cellValue(row.getCell(1)));
	//					                		args1.put("IMPT_LAN",CommExcel.cellValue(row.getCell(2)));
	//					                		args1.put("IMPT_HNG",CommExcel.cellValue(row.getCell(3)));
	//			                				args1.put("REEX_END_DT",CommExcel.cellValue(row.getCell(7)).replace("-", ""));
	//					                		args1.put("EHEANG_END_DT",CommExcel.cellValue(row.getCell(8)).replace("-", ""));
	//					                		args1.put("YONGDO_DT",CommExcel.cellValue(row.getCell(9)).replace("-", ""));
	//					                		args1.put("editUserId",userKey);
	//					            			args1.put("editUserNm",userNm);
	//					            			args1.put("editDtm",currentDatetime);
	//					                		long list2 = edwardsManagementService.updateReImpoCount(args1);
	//			                			}

				                			String empty = "";
				                			//수출량이 존재하면
				                			if(!CommExcel.cellValue(row.getCell(23)).equals("")){
					                    		//수입량이 존재하면
					                    		if(!CommExcel.cellValue(row.getCell(5)).equals("")){
	//				                    			//해당조건에 맞는 건이 여러건 있으면 잔량 구할때 수출량 합산해서 구해야 함
	//				                    			List<Map> list3 = edwardsManagementService.selectReImpoCount1(args);
	//				                    			//조건이 1건 이상이면 잔량 구해서 모든 건에 잔량 업데이트 해야 함
	//				                    			if(Integer.parseInt(String.valueOf(list3.get(0).get("ExCount"))) > 1){
	//				                    				empty = Integer.toString(Integer.parseInt(CommExcel.cellValue(row.getCell(5)))-Integer.parseInt(CommExcel.cellValue(row.getCell(23)))-Math.round(Float.parseFloat(String.valueOf(list3.get(0).get("SumExQty")))));
	//				                    				Map args3 = new HashMap();
	//					                				args3.put("BL_NO",CommExcel.cellValue(row.getCell(0)));
	//							                		args3.put("IMPT_DECL_NO",CommExcel.cellValue(row.getCell(1)));
	//							                		args3.put("IMPT_LAN",CommExcel.cellValue(row.getCell(2)));
	//							                		args3.put("IMPT_HNG",CommExcel.cellValue(row.getCell(3)));
	//					                				args3.put("RMID_QTY",empty);
	//							                		args3.put("editUserId",userKey);
	//							            			args3.put("editUserNm",userNm);
	//							            			args3.put("editDtm",currentDatetime);
	//							                		long list4 = edwardsManagementService.updateReImpoCount(args3);
	//				                    			}else{
					                    				empty = Integer.toString(Integer.parseInt(CommExcel.cellValue(row.getCell(5)))-Integer.parseInt(CommExcel.cellValue(row.getCell(23))));
	//				                    			}
					                    		}
						                    }else{
						                    	if(!CommExcel.cellValue(row.getCell(5)).equals("")){
						                    		empty = Integer.toString(Integer.parseInt(CommExcel.cellValue(row.getCell(5))));
						                    	}else{
					                    			empty = "0";
					                    		}
						                    }

				                			pstmt.setString(1, CommExcel.cellValue(row.getCell(0)));
						                    pstmt.setString(2, CommExcel.cellValue(row.getCell(1)));
						                    pstmt.setString(3, CommExcel.cellValue(row.getCell(2)));
						                    pstmt.setString(4, CommExcel.cellValue(row.getCell(3)));
						                    pstmt.setString(5, CommExcel.cellValue(row.getCell(4)).replace("-", ""));
						                    pstmt.setString(6, CommExcel.cellValue(row.getCell(5)));
						                    pstmt.setString(7, CommExcel.cellValue(row.getCell(6)));
						                    pstmt.setString(8, CommExcel.cellValue(row.getCell(7)).replace("-", ""));
						                    pstmt.setString(9, CommExcel.cellValue(row.getCell(8)).replace("-", ""));
						                    pstmt.setString(10, CommExcel.cellValue(row.getCell(9)).replace("-", ""));
						                    pstmt.setString(11, CommExcel.cellValue(row.getCell(10)));
						                    pstmt.setString(12, CommExcel.cellValue(row.getCell(11)));
						                    pstmt.setString(13, CommExcel.cellValue(row.getCell(12)));
						                    pstmt.setString(14, CommExcel.cellValue(row.getCell(13)));
						                    pstmt.setString(15, CommExcel.cellValue(row.getCell(14)));
						                    pstmt.setString(16, CommExcel.cellValue(row.getCell(15)));
						                    pstmt.setString(17, CommExcel.cellValue(row.getCell(16)));
						                    pstmt.setString(18, empty);
						                    pstmt.setString(19, CommExcel.cellValue(row.getCell(18)));
						                    pstmt.setString(20, CommExcel.cellValue(row.getCell(19)));
						                    pstmt.setString(21, CommExcel.cellValue(row.getCell(20)));
						                    pstmt.setString(22, CommExcel.cellValue(row.getCell(21)));
						                    pstmt.setString(23, CommExcel.cellValue(row.getCell(22)).replace("-", ""));
						                    pstmt.setString(24, CommExcel.cellValue(row.getCell(23)));
						                    pstmt.setString(25, CommExcel.cellValue(row.getCell(24)));
						                    pstmt.setString(26, CommExcel.cellValue(row.getCell(25)));
						                    pstmt.setString(27, "Y");
						                    pstmt.setString(28, userKey);
						                    pstmt.setString(29, userNm);
						                    pstmt.setString(30, currentDatetime);
						                    pstmt.setString(31, "Y");
						                    pstmt.setString(32, taxNum1);

						                    pstmt.addBatch();

						                    pstmt.clearParameters() ;
						                    if( (i % 10000) == 0){
						                        // Batch 실행
						                        pstmt.executeBatch() ;
						                        // Batch 초기화
						                        pstmt.clearBatch();
						                        // 커밋
						                        conn.commit() ;
						                    }
				                		}
			                		}
			                	// 시리얼번호가 없으면 전체 체크 인서트만 함, 업데이트 불가
		                		}else{
		                			args.put("BL_NO",CommExcel.cellValue(row.getCell(0)));
			                		args.put("IMPT_DECL_NO",CommExcel.cellValue(row.getCell(1)));
			                		args.put("IMPT_LAN",CommExcel.cellValue(row.getCell(2)));
			                		args.put("IMPT_HNG",CommExcel.cellValue(row.getCell(3)));
			                		args.put("SoNo",CommExcel.cellValue(row.getCell(11)));
			                		args.put("EndUserName",CommExcel.cellValue(row.getCell(12)));
			                		args.put("ExEmNo",CommExcel.cellValue(row.getCell(13)));
			                		args.put("SERIAL_NO",CommExcel.cellValue(row.getCell(14)));
			                		args.put("INV_NO",CommExcel.cellValue(row.getCell(18)));
			                		args.put("EXPT_DECL_NO",CommExcel.cellValue(row.getCell(19)));
			                		args.put("EXPT_LAN",CommExcel.cellValue(row.getCell(20)));
			                		args.put("EXPT_HNG",CommExcel.cellValue(row.getCell(21)));
			                		list1 = edwardsManagementService.selectReImpoCount(args);
			                		//기존에 등록된 건이 있으면 (의뢰건이든 특송건이든) 입력불가
			                		if(list1.size() > 0){
			                			continue;
			                		}else{
			                			String empty = "";
			                			//수출량이 존재하면
			                			if(!CommExcel.cellValue(row.getCell(23)).equals("")){
				                    		//수입량이 존재하면
				                    		if(!CommExcel.cellValue(row.getCell(5)).equals("")){
				                    				empty = Integer.toString(Integer.parseInt(CommExcel.cellValue(row.getCell(5)))-Integer.parseInt(CommExcel.cellValue(row.getCell(23))));
				                    		}
					                    }else{
					                    	if(!CommExcel.cellValue(row.getCell(5)).equals("")){
					                    		empty = Integer.toString(Integer.parseInt(CommExcel.cellValue(row.getCell(5))));
					                    	}else{
				                    			empty = "0";
				                    		}
					                    }

			                			pstmt.setString(1, CommExcel.cellValue(row.getCell(0)));
					                    pstmt.setString(2, CommExcel.cellValue(row.getCell(1)));
					                    pstmt.setString(3, CommExcel.cellValue(row.getCell(2)));
					                    pstmt.setString(4, CommExcel.cellValue(row.getCell(3)));
					                    pstmt.setString(5, CommExcel.cellValue(row.getCell(4)).replace("-", ""));
					                    pstmt.setString(6, CommExcel.cellValue(row.getCell(5)));
					                    pstmt.setString(7, CommExcel.cellValue(row.getCell(6)));
					                    pstmt.setString(8, CommExcel.cellValue(row.getCell(7)).replace("-", ""));
					                    pstmt.setString(9, CommExcel.cellValue(row.getCell(8)).replace("-", ""));
					                    pstmt.setString(10, CommExcel.cellValue(row.getCell(9)).replace("-", ""));
					                    pstmt.setString(11, CommExcel.cellValue(row.getCell(10)));
					                    pstmt.setString(12, CommExcel.cellValue(row.getCell(11)));
					                    pstmt.setString(13, CommExcel.cellValue(row.getCell(12)));
					                    pstmt.setString(14, CommExcel.cellValue(row.getCell(13)));
					                    pstmt.setString(15, CommExcel.cellValue(row.getCell(14)));
					                    pstmt.setString(16, CommExcel.cellValue(row.getCell(15)));
					                    pstmt.setString(17, CommExcel.cellValue(row.getCell(16)));
					                    pstmt.setString(18, empty);
					                    pstmt.setString(19, CommExcel.cellValue(row.getCell(18)));
					                    pstmt.setString(20, CommExcel.cellValue(row.getCell(19)));
					                    pstmt.setString(21, CommExcel.cellValue(row.getCell(20)));
					                    pstmt.setString(22, CommExcel.cellValue(row.getCell(21)));
					                    pstmt.setString(23, CommExcel.cellValue(row.getCell(22)).replace("-", ""));
					                    pstmt.setString(24, CommExcel.cellValue(row.getCell(23)));
					                    pstmt.setString(25, CommExcel.cellValue(row.getCell(24)));
					                    pstmt.setString(26, CommExcel.cellValue(row.getCell(25)));
					                    pstmt.setString(27, "Y");
					                    pstmt.setString(28, userKey);
					                    pstmt.setString(29, userNm);
					                    pstmt.setString(30, currentDatetime);
					                    pstmt.setString(31, "Y");
					                    pstmt.setString(32, taxNum1);

					                    pstmt.addBatch();

					                    pstmt.clearParameters() ;
					                    if( (i % 10000) == 0){
					                        // Batch 실행
					                        pstmt.executeBatch() ;
					                        // Batch 초기화
					                        pstmt.clearBatch();
					                        // 커밋
					                        conn.commit() ;
					                    }
			                		}
		                		}
//		                	}else{
//		                		throw new Exception("BL 에러");
//		                	}
		                	pstmt.executeBatch();
			                pstmt.close();
			                pstmt1.executeBatch();
			                pstmt1.close();
		                }

		                File file = new File("C:\\edwards\\"+currentDatetime+origName);
		                if( file.exists() ){
		                	file.delete();
		                };
	                }
	            }
	            conn.close();
	            Map map3 = new HashMap();
				map3.put("SERIAL_NO", "");
	            return new ResponseEntity<>(map3,HttpStatus.OK);
	        }catch(Exception e) { // TODO Auto-generated catch block
	            e.printStackTrace();
	            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	        }
	    }else{
	    	return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	    }
    }

	@RequestMapping(value = "/qtyUp")
    public ResponseEntity<?> qtyUp(HttpServletRequest request, MultipartHttpServletRequest mRequest, HttpServletResponse response) throws Exception{
		EdwardsExcelController ex = new EdwardsExcelController();
	    if(ex.dbConn()) {
	    	Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
			conn = DriverManager.getConnection (url, user, passwd);

	        try { // MultipartHttpServletRequest 생성
	        	String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
				String userKey			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
				String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
				String currentDate 		= CmmnUtils.getFormatedDate("yyyyMMdd");

	        	MultiValueMap<String, MultipartFile> map = mRequest.getMultiFileMap();
	    		Iterator<String> iter = map.keySet().iterator();

	    		List<MultipartFile> mfile = null;
	            String fieldName = "";

	            // 값이 나올때까지
	            while (iter.hasNext()) {
	                fieldName = iter.next(); // 내용을 가져와서
	                mfile = map.get(fieldName);
	                String origName;
	                for (MultipartFile mpf : mfile){
	                	origName = CmmnFileUtils.convertOriginalFileName(mpf.getOriginalFilename()); //한글꺠짐 방지 // 파일명이 없다면
	                	mpf.transferTo(new File("C:\\edwards\\"+currentDatetime+origName));
		                Workbook wbs = CommExcel.getWorkbook("C:\\edwards\\"+currentDatetime+origName);

		                Sheet sheet = (Sheet) wbs.getSheetAt(0);

		                //excel file 두번쨰줄부터 시작
		                for (int i = sheet.getFirstRowNum() + 1; i <= sheet.getLastRowNum(); i++) {
		                	StringBuffer sb = new StringBuffer();

			    		    sb.append(" INSERT INTO rms.dbo.[ED_QTY_LOG] (IMPT_SINGO_NO,LAN,HNG,OLD_QTY,QTY,REG_DT,COMP_CD) VALUES (?,?,?,?,?,?,?) ");
			    		    PreparedStatement pstmt = conn.prepareStatement(sb.toString());

			    		    StringBuffer sb1 = new StringBuffer();

			    		    sb1.append(" update rms.dbo.[ED_IMPT_DECL_HNG] set RMID_QTY=?,editUserId=?,editUserNm=?,editDtm=? where IMPT_SINGO_NO=? and LAN=? and HNG=?");
			    		    PreparedStatement pstmt1 = conn.prepareStatement(sb1.toString());

		                	Row row = sheet.getRow(i);
		                	if(row == null){
		                		break;
		                	}

		                	Map args = new HashMap();
		                	List<Map> list1 = null;

		                	// 신고번호 공백이면 에러
		                	if(CommExcel.cellValueDouble(row.getCell(0)).equals("")){
		                		throw new Exception("신고번호 에러");
		                	}

		                	// 란 공백이면 에러
		                	if(CommExcel.cellValueDouble(row.getCell(1)).equals("")){
		                		throw new Exception("란 에러");
		                	}

		                	// 행 공백이면 에러
		                	if(CommExcel.cellValueDouble(row.getCell(2)).equals("")){
		                		throw new Exception("행 에러");
		                	}

		                	// 잔량 공백이면 에러
		                	if(CommExcel.cellValueDouble(row.getCell(3)).equals("")){
		                		throw new Exception("잔량 에러");
		                	}

		                	//신고번호에 데이터가 존재해야 등록
		                	if(!CommExcel.cellValueDouble(row.getCell(0)).equals("")){
		                		args.put("IMPT_SINGO_NO",CommExcel.cellValueDouble(row.getCell(0)));
		                		args.put("LAN",CommExcel.cellValueDouble(row.getCell(1)));
		                		args.put("HNG",CommExcel.cellValueDouble(row.getCell(2)));

		                		list1 = edwardsManagementService.selectImpoHangMaster(args);
		                		//같은 신고번호,란,행이 있으면 업데이트
		                		if(list1.size() > 0){
		                			System.out.println("@@@@@@@@@@"+String.valueOf(CommExcel.cellValueDouble(row.getCell(3))));
		                			System.out.println("##########"+String.valueOf(list1.get(0).get("RMID_QTY")));
		                			if(!String.valueOf(list1.get(0).get("RMID_QTY")).equals(String.valueOf(CommExcel.cellValueDouble(row.getCell(3))))){
			                			pstmt1.setString(1, CommExcel.cellValueDouble(row.getCell(3)));
					                    pstmt1.setString(2, userKey);
					                    pstmt1.setString(3, userNm);
					                    pstmt1.setString(4, currentDatetime);
					                    pstmt1.setString(5, CommExcel.cellValueDouble(row.getCell(0)));
					                    pstmt1.setString(6, CommExcel.cellValueDouble(row.getCell(1)));
					                    pstmt1.setString(7, CommExcel.cellValueDouble(row.getCell(2)));

					                    pstmt1.addBatch();

					                    pstmt1.clearParameters() ;
					                    if( (i % 10000) == 0){
					                        // Batch 실행d
					                        pstmt1.executeBatch() ;
					                        // Batch 초기화
					                        pstmt1.clearBatch();
					                        // 커밋
					                        conn.commit() ;
					                    }

					                    pstmt.setString(1, CommExcel.cellValueDouble(row.getCell(0)));
					                    pstmt.setString(2, CommExcel.cellValueDouble(row.getCell(1)));
					                    pstmt.setString(3, CommExcel.cellValueDouble(row.getCell(2)));
					                    pstmt.setString(4, String.valueOf(list1.get(0).get("RMID_QTY")));
					                    pstmt.setString(5, CommExcel.cellValueDouble(row.getCell(3)));
					                    pstmt.setString(6, currentDate);
					                    pstmt.setString(7, String.valueOf(list1.get(0).get("GRP_COMP_CD")));

					                    pstmt.addBatch();

					                    pstmt.clearParameters() ;
					                    if( (i % 10000) == 0){
					                        // Batch 실행d
					                        pstmt.executeBatch() ;
					                        // Batch 초기화
					                        pstmt.clearBatch();
					                        // 커밋
					                        conn.commit() ;
					                    }
		                			}
		                		}
		                	}
		                	pstmt.executeBatch();
				            pstmt.close();
				            pstmt1.executeBatch();
				            pstmt1.close();
		                }

		                File file = new File("C:\\edwards\\"+currentDatetime+origName);
		                if( file.exists() ){
		                	file.delete();
		                };
	                }
	            }
	            conn.close();
	            Map map3 = new HashMap();
				map3.put("INV_NO", "");
	            return new ResponseEntity<>(map3,HttpStatus.OK);
	        }catch(Exception e) { // TODO Auto-generated catch block
	        	e.printStackTrace();
	            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	        }
	    }else{
	    	return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	    }
    }

	@RequestMapping(value = "/qtyUp1")
    public ResponseEntity<?> qtyUp1(HttpServletRequest request, MultipartHttpServletRequest mRequest, HttpServletResponse response) throws Exception{
		EdwardsExcelController ex = new EdwardsExcelController();
	    if(ex.dbConn()) {
	    	Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
			conn = DriverManager.getConnection (url, user, passwd);

	        try { // MultipartHttpServletRequest 생성
	        	String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
				String userKey			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
				String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
				String currentDate 		= CmmnUtils.getFormatedDate("yyyyMMdd");

	        	MultiValueMap<String, MultipartFile> map = mRequest.getMultiFileMap();
	    		Iterator<String> iter = map.keySet().iterator();

	    		List<MultipartFile> mfile = null;
	            String fieldName = "";

	            // 값이 나올때까지
	            while (iter.hasNext()) {
	                fieldName = iter.next(); // 내용을 가져와서
	                mfile = map.get(fieldName);
	                String origName;
	                for (MultipartFile mpf : mfile){
	                	origName = CmmnFileUtils.convertOriginalFileName(mpf.getOriginalFilename()); //한글꺠짐 방지 // 파일명이 없다면
	                	mpf.transferTo(new File("C:\\edwards\\"+currentDatetime+origName));
		                Workbook wbs = CommExcel.getWorkbook("C:\\edwards\\"+currentDatetime+origName);

		                Sheet sheet = (Sheet) wbs.getSheetAt(0);

		                //excel file 두번쨰줄부터 시작
		                for (int i = sheet.getFirstRowNum() + 1; i <= sheet.getLastRowNum(); i++) {
		                	Row row = sheet.getRow(i);
		                	if(row == null){
		                		break;
		                	}

		                	Map args = new HashMap();
		                	List<Map> list1 = null;

		                	// 신고번호 공백이면 에러
		                	if(CommExcel.cellValueDouble(row.getCell(0)).equals("")){
		                		throw new Exception("신고번호 에러");
		                	}

		                	// 란 공백이면 에러
		                	if(CommExcel.cellValueDouble(row.getCell(1)).equals("")){
		                		throw new Exception("란 에러");
		                	}

		                	// 행 공백이면 에러
		                	if(CommExcel.cellValueDouble(row.getCell(2)).equals("")){
		                		throw new Exception("행 에러");
		                	}

		                	//신고번호에 데이터가 존재해야 등록
		                	if(!CommExcel.cellValueDouble(row.getCell(0)).equals("")){
		                		args.put("IMPT_DECL_NO",CommExcel.cellValueDouble(row.getCell(0)));
		                		args.put("LAN",CommExcel.cellValueDouble(row.getCell(1)));
		                		args.put("HNG",CommExcel.cellValueDouble(row.getCell(2)));

		                		list1 = edwardsManagementService.selectReExpoDetail(args);
		                		//같은 신고번호,란,행이 없으면 업데이트
		                		if(list1.get(0).get("count").equals(0)){
		                			List<Map> list = edwardsManagementService.selectImptItem(args);
		                			args.put("BL_NO",list.get(0).get("BL_NO"));
		                			args.put("ITEM_CD",list.get(0).get("ITEM_CD"));
		                			args.put("ITEM_NM",list.get(0).get("ITEM_NM"));
		                			args.put("IMP_OK_DT",list.get(0).get("DECL_CMPL_DT"));
		                			args.put("QTY",list.get(0).get("QTY"));
		                			args.put("GRP_COMP_CD",list.get(0).get("GRP_COMP_CD"));
		                			args.put("ORDR_NO","IJ2020080701");
		                			args.put("useYn","Y");
		                			args.put("addUserId",userKey);
		                			args.put("addUserNm",userNm);
		                			args.put("addDtm",currentDatetime);
		                			List<Map> list2 = edwardsManagementService.selectMaxDtlSeq(args);
		                			args.put("DTL_SEQNO",list2.get(0).get("max"));
		                			edwardsManagementService.insertReExpoDetail(args);
		                			args.put("IMPT_SINGO_NO",CommExcel.cellValueDouble(row.getCell(0)));
		                			args.put("IMPT_LAN",CommExcel.cellValueDouble(row.getCell(1)));
			                		args.put("IMPT_HNG",CommExcel.cellValueDouble(row.getCell(2)));
		                			args.put("userNm",userNm);
		                			args.put("currentDatetime",currentDatetime);
		                			edwardsManagementService.updateImpoHng1(args);
		                		}
		                	}
		                }

		                File file = new File("C:\\edwards\\"+currentDatetime+origName);
		                if( file.exists() ){
		                	file.delete();
		                };
	                }
	            }
	            conn.close();
	            Map map3 = new HashMap();
				map3.put("INV_NO", "");
	            return new ResponseEntity<>(map3,HttpStatus.OK);
	        }catch(Exception e) { // TODO Auto-generated catch block
	        	e.printStackTrace();
	            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	        }
	    }else{
	    	return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	    }
    }

	@RequestMapping(value = "/excelExpressUp")
    public ResponseEntity<?> excelExpressUp(HttpServletRequest request, MultipartHttpServletRequest mRequest) throws Exception{
		EdwardsExcelController ex = new EdwardsExcelController();
	    if(ex.dbConn()) {
	    	Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
			conn = DriverManager.getConnection (url, user, passwd);

	        try { // MultipartHttpServletRequest 생성
	        	String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
				String userKey			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
				String taxNum			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_TAXNO));
				String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

	        	MultiValueMap<String, MultipartFile> map = mRequest.getMultiFileMap();
	    		Iterator<String> iter = map.keySet().iterator();

	    		List<MultipartFile> mfile = null;
	            String fieldName = "";

	            // 값이 나올때까지
	            while (iter.hasNext()) {
	                fieldName = iter.next(); // 내용을 가져와서
	                mfile = map.get(fieldName);
	                String origName;
	                for (MultipartFile mpf : mfile){
	                	origName = CmmnFileUtils.convertOriginalFileName(mpf.getOriginalFilename()); //한글꺠짐 방지 // 파일명이 없다면
	                	mpf.transferTo(new File("C:\\edwards\\"+currentDatetime+origName));
		                Workbook wbs = CommExcel.getWorkbook("C:\\edwards\\"+currentDatetime+origName);

		                Sheet sheet = (Sheet) wbs.getSheetAt(0);

		    			StringBuffer sb = new StringBuffer();

		    		    sb.append(" INSERT INTO rms.dbo.ED_IMPT_INV_EXPRESS (BL_NO,IMPT_DECL_NO,PLantNo,OWN_GODS_NM,TOT_WT,PKG_QTY,INV_NO,ETA,CDtm,SAPvc,ZONE,CUR,ShippingMode,AIR,TERMS,GeleGbn,JinsuType,NETinv,ShippingCHG,TotalInv,Division,WonNo,OLDvc,Remark,useYn,addUserId,addUserNm,addDtm,COMP_CD) values ( ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,? ) ");
		    		    PreparedStatement pstmt = conn.prepareStatement(sb.toString());

		                //excel file 두번쨰줄부터 시작
		                for (int i = sheet.getFirstRowNum() + 1; i <= sheet.getLastRowNum(); i++) {
		                    Row row = sheet.getRow(i);

		                    pstmt.setString(1, CommExcel.cellValue(row.getCell(0)));
		                    pstmt.setString(2, CommExcel.cellValue(row.getCell(1)));
		                    pstmt.setString(3, CommExcel.cellValue(row.getCell(2)));
		                    pstmt.setString(4, CommExcel.cellValue(row.getCell(3)));
		                    pstmt.setString(5, CommExcel.cellValue(row.getCell(4)));
		                    pstmt.setString(6, CommExcel.cellValue(row.getCell(5)));
		                    pstmt.setString(7, CommExcel.cellValue(row.getCell(6)));
		                    pstmt.setString(8, CommExcel.cellValue(row.getCell(7)).replace("-",""));
		                    pstmt.setString(9, CommExcel.cellValue(row.getCell(8)).replace("-",""));
		                    pstmt.setString(10, CommExcel.cellValue(row.getCell(9)));
		                    pstmt.setString(11, CommExcel.cellValue(row.getCell(10)));
		                    pstmt.setString(12, CommExcel.cellValue(row.getCell(11)));
		                    pstmt.setString(13, CommExcel.cellValue(row.getCell(12)));
		                    pstmt.setString(14, CommExcel.cellValue(row.getCell(13)));
		                    pstmt.setString(15, CommExcel.cellValue(row.getCell(14)));
		                    pstmt.setString(16, CommExcel.cellValue(row.getCell(15)));
		                    pstmt.setString(17, CommExcel.cellValue(row.getCell(16)));
		                    pstmt.setString(18, CommExcel.cellValue(row.getCell(17)));
		                    pstmt.setString(19, CommExcel.cellValue(row.getCell(18)));
		                    pstmt.setString(20, CommExcel.cellValue(row.getCell(19)));
		                    pstmt.setString(21, CommExcel.cellValue(row.getCell(20)));
		                    pstmt.setString(22, CommExcel.cellValue(row.getCell(21)));
		                    pstmt.setString(23, CommExcel.cellValue(row.getCell(22)));
		                    pstmt.setString(24, CommExcel.cellValue(row.getCell(23)));
		                    pstmt.setString(25, "Y");
		                    pstmt.setString(26, userKey);
		                    pstmt.setString(27, userNm);
		                    pstmt.setString(28, currentDatetime);
		                    pstmt.setString(29, taxNum);

		                    pstmt.addBatch();

		                    pstmt.clearParameters() ;
		                    if( (i % 10000) == 0){
		                        // Batch 실행
		                        pstmt.executeBatch() ;
		                        // Batch 초기화
		                        pstmt.clearBatch();
		                        // 커밋
		                        conn.commit() ;
		                    }
		                }
		                pstmt.executeBatch();
		                pstmt.close();

		                File file = new File("C:\\edwards\\"+currentDatetime+origName);
		                if( file.exists() ){
		                	file.delete();
		                };
	                }
	            }
	            conn.close();
	        }catch(UnsupportedEncodingException e) { // TODO Auto-generated catch block
	            e.printStackTrace();
	        }catch(IllegalStateException e) { // TODO Auto-generated catch block
	            e.printStackTrace();
	        }catch(IOException e) { // TODO Auto-generated catch block
	            e.printStackTrace();
	        }
	    }
	    return new ResponseEntity<>("ok", HttpStatus.OK);
    }
}