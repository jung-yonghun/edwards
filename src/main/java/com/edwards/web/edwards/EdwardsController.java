package com.edwards.web.edwards;

import static com.edwards.commons.CmmnUtils.getUserInfo;

import com.edwards.biz.edwardsManagement.*;
import com.edwards.biz.itemMng.ItemService;
import com.edwards.biz.systemManagement.SystemManagementService;
import com.edwards.commons.CmmnConstants;
import com.edwards.commons.CmmnController;
import com.edwards.commons.CmmnFileUtils;
import com.edwards.commons.CmmnUtils;
import com.edwards.commons.CommExcel;
import com.edwards.domains.CpsEdmsAttachFileVO;
import com.edwards.domains.EdTestVO;

import org.apache.ibatis.session.SqlSession;
import org.apache.poi.hssf.usermodel.HSSFDataFormat;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.streaming.SXSSFCell;
import org.apache.poi.xssf.streaming.SXSSFRow;
import org.apache.poi.xssf.streaming.SXSSFSheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFDataFormat;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
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
import org.springframework.web.servlet.View;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import org.apache.log4j.Logger;



@Controller
@RestController
@RequestMapping(value = {"/apis/edwards"}, method = {RequestMethod.POST})
public class EdwardsController extends CmmnController{
	@Qualifier("SqlSessionTemplate")
	@Autowired
	private SqlSession sqlSession;
	@Autowired
	private EdwardsManagementService edwardsManagementService;
	@Autowired
	private SystemManagementService systemManagementService;
	@Autowired
	private ItemService itemService;
	@Autowired
	SessionTempDao sessionTempDao;

	private String stringValueOf(Object object) {
		 return object == null ? "" : String.valueOf(object);
	}

	@RequestMapping(value = "/selectModelMaster")
	public ResponseEntity<?> selectModelMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectModelMaster(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveModelMaster")
	public ResponseEntity<?> saveModelMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String KEY_ED_MDL_MST 	= args.containsKey("KEY_ED_MDL_MST") ? stringValueOf(args.get("KEY_ED_MDL_MST")) : "";
			String userNm		= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			args.put("userNm",userNm);
			args.put("currentDatetime",currentDatetime);
			if(KEY_ED_MDL_MST.equals("")){
				long result = edwardsManagementService.insertModelMaster(args);
				return new ResponseEntity<>(result, HttpStatus.OK);
			}else{
				long result = edwardsManagementService.updateModelMaster(args);
				return new ResponseEntity<>(result, HttpStatus.OK);
			}
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectHsGroupMaster")
	public ResponseEntity<?> selectHsGroupMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectHsGroupMaster(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectHsGroupList")
	public ResponseEntity<?> selectHsGroupList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectHsGroupList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveHsGroupMaster")
	public ResponseEntity<?> saveHsGroupMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String KEY_ED_HS_MST 	= args.containsKey("KEY_ED_HS_MST") ? stringValueOf(args.get("KEY_ED_HS_MST")) : "";
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			String currentYear 		= CmmnUtils.getFormatedDate("yyyy");
			args.put("userNm",userNm);
			args.put("currentDatetime",currentDatetime);
			if(KEY_ED_HS_MST.equals("")){
				List<Map> list2 = edwardsManagementService.selectMaxCd(args);
				if(list2.get(0).get("max").equals(currentYear)){
					args.put("HS_GRP_CD",list2.get(0).get("HS_GRP_CD"));
					long result = edwardsManagementService.insertHsGroupMaster(args);
					return new ResponseEntity<>(result, HttpStatus.OK);
				}else{
					args.put("HS_GRP_CD",currentYear+"000001");
					long result = edwardsManagementService.insertHsGroupMaster(args);
					return new ResponseEntity<>(result, HttpStatus.OK);
				}
			}else{
				long result = edwardsManagementService.updateHsGroupMaster(args);
				return new ResponseEntity<>(result, HttpStatus.OK);
			}
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectHsGroupCodeMaster")
	public ResponseEntity<?> selectHsGroupCodeMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectHsGroupCodeMaster(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveHsGroupCodeMaster")
	public ResponseEntity<?> saveHsGroupCodeMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String KEY_ED_HS_DTL 	= args.containsKey("KEY_ED_HS_DTL") ? stringValueOf(args.get("KEY_ED_HS_DTL")) : "";
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			args.put("userNm",userNm);
			args.put("currentDatetime",currentDatetime);
			if(KEY_ED_HS_DTL.equals("")){
				List<Map> list2 = edwardsManagementService.selectMaxSeq(args);
				if(list2.get(0).get("SEQNO").equals(0)){
					args.put("SEQNO","1");
					long result = edwardsManagementService.insertHsGroupCodeMaster(args);
					return new ResponseEntity<>(result, HttpStatus.OK);
				}else{
					args.put("SEQNO",list2.get(0).get("SEQNO"));
					long result = edwardsManagementService.insertHsGroupCodeMaster(args);
					return new ResponseEntity<>(result, HttpStatus.OK);
				}
			}else{
				long result = edwardsManagementService.updateHsGroupCodeMaster(args);
				return new ResponseEntity<>(result, HttpStatus.OK);
			}
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectSysStdList")
	public ResponseEntity<?> selectSysStdList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectSysStdList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectHsSgroupMaster")
	public ResponseEntity<?> selectHsSgroupMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectHsSgroupMaster(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveHsSgroupMaster")
	public ResponseEntity<?> saveHsSgroupMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String KEY_ED_HS_SPCL_GRP_MST 	= args.containsKey("KEY_ED_HS_SPCL_GRP_MST") ? stringValueOf(args.get("KEY_ED_HS_SPCL_GRP_MST")) : "";
			String userNm					= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime 			= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			String currentYear 				= CmmnUtils.getFormatedDate("yyyy");
			args.put("userNm",userNm);
			args.put("currentDatetime",currentDatetime);
			if(KEY_ED_HS_SPCL_GRP_MST.equals("")){
				List<Map> list2 = edwardsManagementService.selectMaxScd(args);
				if(list2.get(0).get("max").equals(currentYear)){
					args.put("HS_SPCL_MNG_NO",list2.get(0).get("HS_SPCL_MNG_NO"));
					long result = edwardsManagementService.insertHsSgroupMaster(args);
					return new ResponseEntity<>(result, HttpStatus.OK);
				}else{
					args.put("HS_SPCL_MNG_NO",currentYear+"000001");
					long result = edwardsManagementService.insertHsSgroupMaster(args);
					return new ResponseEntity<>(result, HttpStatus.OK);
				}
			}else{
				long result = edwardsManagementService.updateHsSgroupMaster(args);
				return new ResponseEntity<>(result, HttpStatus.OK);
			}
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectHsSgroupCodeMaster")
	public ResponseEntity<?> selectHsSgroupCodeMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectHsSgroupCodeMaster(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveHsSgroupCodeMaster")
	public ResponseEntity<?> saveHsSgroupCodeMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String KEY_ED_HS_SPCL_GRP_DTL 	= args.containsKey("KEY_ED_HS_SPCL_GRP_DTL") ? stringValueOf(args.get("KEY_ED_HS_SPCL_GRP_DTL")) : "";
			String userNm					= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime 			= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			args.put("userNm",userNm);
			args.put("currentDatetime",currentDatetime);
			if(KEY_ED_HS_SPCL_GRP_DTL.equals("")){
				List<Map> list2 = edwardsManagementService.selectMaxSseq(args);
				if(list2.get(0).get("SEQNO").equals(0)){
					args.put("SEQNO","1");
					long result = edwardsManagementService.insertHsSgroupCodeMaster(args);
					return new ResponseEntity<>(result, HttpStatus.OK);
				}else{
					args.put("SEQNO",list2.get(0).get("SEQNO"));
					long result = edwardsManagementService.insertHsSgroupCodeMaster(args);
					return new ResponseEntity<>(result, HttpStatus.OK);
				}
			}else{
				long result = edwardsManagementService.updateHsSgroupCodeMaster(args);
				return new ResponseEntity<>(result, HttpStatus.OK);
			}
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectComMaster")
	public ResponseEntity<?> selectComMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectComMaster(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveComMaster")
	public ResponseEntity<?> saveComMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String KEY_ED_COMP 	= args.containsKey("KEY_ED_COMP") ? stringValueOf(args.get("KEY_ED_COMP")) : "";
			String userNm		= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			args.put("userNm",userNm);
			args.put("currentDatetime",currentDatetime);
			if(KEY_ED_COMP.equals("")){
				long result = edwardsManagementService.insertComMaster(args);
				return new ResponseEntity<>(result, HttpStatus.OK);
			}else{
				long result = edwardsManagementService.updateComMaster(args);
				return new ResponseEntity<>(result, HttpStatus.OK);
			}
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectCstmList")
	public ResponseEntity<?> selectCstmList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectCstmList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectCstmLaw")
	public ResponseEntity<?> selectCstmLaw(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectCstmLaw(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectCstmMaster")
	public ResponseEntity<?> selectCstmMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectCstmMaster(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveCstmMaster")
	public ResponseEntity<?> saveCstmMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String KEY_ED_CSTMNOTYOG 	= args.containsKey("KEY_ED_CSTMNOTYOG") ? stringValueOf(args.get("KEY_ED_CSTMNOTYOG")) : "";
			String userNm				= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime 		= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			String currentYear 			= CmmnUtils.getFormatedDate("yyyy");
			args.put("userNm",userNm);
			args.put("currentDatetime",currentDatetime);
			if(KEY_ED_CSTMNOTYOG.equals("")){
				List<Map> list2 = edwardsManagementService.selectMaxCstm(args);
				if(list2.get(0).get("max").equals(currentYear)){
					args.put("CSTM_MNG_NO",list2.get(0).get("CSTM_MNG_NO"));
					long result = edwardsManagementService.insertCstmMaster(args);
					return new ResponseEntity<>(result, HttpStatus.OK);
				}else{
					args.put("CSTM_MNG_NO",currentYear+"000001");
					long result = edwardsManagementService.insertCstmMaster(args);
					return new ResponseEntity<>(result, HttpStatus.OK);
				}
			}else{
				long result = edwardsManagementService.updateCstmMaster(args);
				return new ResponseEntity<>(result, HttpStatus.OK);
			}
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectCstmCodeMaster")
	public ResponseEntity<?> selectCstmCodeMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectCstmCodeMaster(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveCstmCodeMaster")
	public ResponseEntity<?> saveCstmCodeMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String KEY_ED_CSTMNOTYOG_DTL 	= args.containsKey("KEY_ED_CSTMNOTYOG_DTL") ? stringValueOf(args.get("KEY_ED_CSTMNOTYOG_DTL")) : "";
			String userNm					= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime 			= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			args.put("userNm",userNm);
			args.put("currentDatetime",currentDatetime);
			if(KEY_ED_CSTMNOTYOG_DTL.equals("")){
				List<Map> list2 = edwardsManagementService.selectMaxSeqCstm(args);
				if(list2.get(0).get("SEQNO").equals(0)){
					args.put("SEQNO","1");
					long result = edwardsManagementService.insertCstmCodeMaster(args);
					return new ResponseEntity<>(result, HttpStatus.OK);
				}else{
					args.put("SEQNO",list2.get(0).get("SEQNO"));
					long result = edwardsManagementService.insertCstmCodeMaster(args);
					return new ResponseEntity<>(result, HttpStatus.OK);
				}
			}else{
				long result = edwardsManagementService.updateCstmCodeMaster(args);
				return new ResponseEntity<>(result, HttpStatus.OK);
			}
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectBomMaster")
	public ResponseEntity<?> selectBomMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectBomMaster(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveBomMaster")
	public ResponseEntity<?> saveBomMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String KEY_ED_BOM_MST 	= args.containsKey("KEY_ED_BOM_MST") ? stringValueOf(args.get("KEY_ED_BOM_MST")) : "";
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			String currentYear 		= CmmnUtils.getFormatedDate("yyyy");
			args.put("userNm",userNm);
			args.put("currentDatetime",currentDatetime);
			if(KEY_ED_BOM_MST.equals("")){
				List<Map> list2 = edwardsManagementService.selectMaxBom(args);
				if(list2.get(0).get("REVSN_NO").equals(0)){
					args.put("REVSN_NO","1");
					long result = edwardsManagementService.insertBomMaster(args);
					return new ResponseEntity<>(result, HttpStatus.OK);
				}else{
					args.put("REVSN_NO",list2.get(0).get("REVSN_NO"));
					long result = edwardsManagementService.insertBomMaster(args);
					return new ResponseEntity<>(result, HttpStatus.OK);
				}
			}else{
				long result = edwardsManagementService.updateBomMaster(args);
				return new ResponseEntity<>(result, HttpStatus.OK);
			}
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectBomCodeMaster")
	public ResponseEntity<?> selectBomCodeMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectBomCodeMaster(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveBomCodeMaster")
	public ResponseEntity<?> saveBomCodeMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String KEY_ED_BOM_DTL 	= args.containsKey("KEY_ED_BOM_DTL") ? stringValueOf(args.get("KEY_ED_BOM_DTL")) : "";
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			args.put("userNm",userNm);
			args.put("currentDatetime",currentDatetime);
			if(KEY_ED_BOM_DTL.equals("")){
				List<Map> list2 = edwardsManagementService.selectMaxSeqBom(args);
				if(list2.get(0).get("SEQNO").equals(0)){
					args.put("SEQNO","1");
					long result = edwardsManagementService.insertBomCodeMaster(args);
					return new ResponseEntity<>(result, HttpStatus.OK);
				}else{
					args.put("SEQNO",list2.get(0).get("SEQNO"));
					long result = edwardsManagementService.insertBomCodeMaster(args);
					return new ResponseEntity<>(result, HttpStatus.OK);
				}
			}else{
				long result = edwardsManagementService.updateBomCodeMaster(args);
				return new ResponseEntity<>(result, HttpStatus.OK);
			}
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectRcmdMaster")
	public ResponseEntity<?> selectRcmdMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectRcmdMaster(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveRcmdMaster")
	public ResponseEntity<?> saveRcmdMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String KEY_ED_EXEM_RCMD_INFO 	= args.containsKey("KEY_ED_EXEM_RCMD_INFO") ? stringValueOf(args.get("KEY_ED_EXEM_RCMD_INFO")) : "";
			String userNm						= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime 				= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			String currentYear 					= CmmnUtils.getFormatedDate("yyyy");
			args.put("userNm",userNm);
			args.put("currentDatetime",currentDatetime);
			if(KEY_ED_EXEM_RCMD_INFO.equals("")){
				List<Map> list2 = edwardsManagementService.selectMaxRcmd(args);
				if(list2.get(0).get("max").equals(currentYear)){
					args.put("EXEM_MNG_NO",list2.get(0).get("EXEM_MNG_NO"));
					String EXEM_MNG_NO 	= stringValueOf(args.get("EXEM_MNG_NO"));
					Map map = new HashMap();
					map.put("EXEM_MNG_NO", EXEM_MNG_NO);
					long result = edwardsManagementService.insertRcmdMaster(args);
					return new ResponseEntity<>(map, HttpStatus.OK);
				}else{
					args.put("EXEM_MNG_NO",currentYear+"000001");
					String EXEM_MNG_NO 	= stringValueOf(args.get("EXEM_MNG_NO"));
					Map map = new HashMap();
					map.put("EXEM_MNG_NO", EXEM_MNG_NO);
					long result = edwardsManagementService.insertRcmdMaster(args);
					return new ResponseEntity<>(map, HttpStatus.OK);
				}
			}else{
				long result = edwardsManagementService.updateRcmdMaster(args);
				return new ResponseEntity<>(result, HttpStatus.OK);
			}
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectRcmdCodeMaster")
	public ResponseEntity<?> selectRcmdCodeMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectRcmdCodeMaster(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveRcmdCodeMaster")
	public ResponseEntity<?> saveRcmdCodeMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String KEY_ED_EXEM_RCMD_INFO_DTL 	= args.containsKey("KEY_ED_EXEM_RCMD_INFO_DTL") ? stringValueOf(args.get("KEY_ED_EXEM_RCMD_INFO_DTL")) : "";
			String EXEM_MNG_NO1 	= args.containsKey("EXEM_MNG_NO1") ? stringValueOf(args.get("EXEM_MNG_NO1")) : "";
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			args.put("userNm",userNm);
			args.put("currentDatetime",currentDatetime);
			if(KEY_ED_EXEM_RCMD_INFO_DTL.equals("")){
				if(!EXEM_MNG_NO1.equals("")){
					long result = edwardsManagementService.updateRcmdCodeMaster(args);
					return new ResponseEntity<>(result, HttpStatus.OK);
				}else{
					List<Map> list1 = edwardsManagementService.selectItemMaster(args);
					args.put("ITEM_NM",list1.get(0).get("Mmodel"));
					args.put("Mcount_No",list1.get(0).get("Mcount_no"));
					List<Map> list2 = edwardsManagementService.selectMaxSeqRcmd(args);
					if(list2.get(0).get("SEQNO").equals(0)){
						args.put("SEQNO","1");
						long result = edwardsManagementService.insertRcmdCodeMaster(args);
						return new ResponseEntity<>(result, HttpStatus.OK);
					}else{
						System.out.println("#####"+list2.get(0).get("SEQNO"));
						args.put("SEQNO",list2.get(0).get("SEQNO"));
						long result = edwardsManagementService.insertRcmdCodeMaster(args);
						return new ResponseEntity<>(result, HttpStatus.OK);
					}
				}
			}else{
				long result = edwardsManagementService.updateRcmdCodeMaster(args);
				return new ResponseEntity<>(result, HttpStatus.OK);
			}
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectRcmdItemMaster")
	public ResponseEntity<?> selectRcmdItemMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectRcmdItemMaster(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectDemdMaster")
	public ResponseEntity<?> selectDemdMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectDemdMaster(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveDemdMaster")
	public ResponseEntity<?> saveDemdMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String KEY_ED_EXEM_DEMD_PLAN 	= args.containsKey("KEY_ED_EXEM_DEMD_PLAN") ? stringValueOf(args.get("KEY_ED_EXEM_DEMD_PLAN")) : "";
			String userNm					= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime 			= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			String currentYmd 				= CmmnUtils.getFormatedDate("yyyyMMdd");
			args.put("userNm",userNm);
			args.put("currentDatetime",currentDatetime);
			if(KEY_ED_EXEM_DEMD_PLAN.equals("")){
				List<Map> list2 = edwardsManagementService.selectMaxDemd(args);
				if(list2.get(0).get("max").equals(currentYmd)){
					args.put("EXEM_PLAN_MNG_NO","EF"+list2.get(0).get("EXEM_PLAN_MNG_NO"));
					String EXEM_PLAN_MNG_NO 	= stringValueOf(args.get("EXEM_PLAN_MNG_NO"));
					Map map = new HashMap();
					map.put("EXEM_PLAN_MNG_NO", EXEM_PLAN_MNG_NO);
					long result = edwardsManagementService.insertDemdMaster(args);
					return new ResponseEntity<>(map, HttpStatus.OK);
				}else{
					args.put("EXEM_PLAN_MNG_NO","EF"+currentYmd+"01");
					String EXEM_PLAN_MNG_NO 	= stringValueOf(args.get("EXEM_PLAN_MNG_NO"));
					Map map = new HashMap();
					map.put("EXEM_PLAN_MNG_NO", EXEM_PLAN_MNG_NO);
					long result = edwardsManagementService.insertDemdMaster(args);
					return new ResponseEntity<>(map, HttpStatus.OK);
				}
			}else{
				long result = edwardsManagementService.updateDemdMaster(args);
				return new ResponseEntity<>(result, HttpStatus.OK);
			}
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/deleteDemdPlanMaster")
	public ResponseEntity<?> deleteDemdPlanMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String userNm						= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime 				= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			args.put("userNm",userNm);
			args.put("currentDatetime",currentDatetime);

			long result = edwardsManagementService.updateDemdMaster(args);
			long result1 = edwardsManagementService.updateDemdCodeMaster(args);
			long result2 = edwardsManagementService.updateDemdPlanItem(args);
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectDemdCodeMaster")
	public ResponseEntity<?> selectDemdCodeMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectDemdCodeMaster(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveDemdCodeMaster")
	public ResponseEntity<?> saveDemdCodeMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String PROD_CD 						= args.containsKey("PROD_CD") ? stringValueOf(args.get("PROD_CD")) : "";
			String PROD_NM 						= args.containsKey("PROD_NM") ? stringValueOf(args.get("PROD_NM")) : "";
			String OWN_GODS_CD 					= args.containsKey("OWN_GODS_CD") ? stringValueOf(args.get("OWN_GODS_CD")) : "";
			String GRP_COMP_CD 					= args.containsKey("GRP_COMP_CD") ? stringValueOf(args.get("GRP_COMP_CD")) : "";
			String EXEM_PLAN_MNG_NO 			= args.containsKey("EXEM_PLAN_MNG_NO") ? stringValueOf(args.get("EXEM_PLAN_MNG_NO")) : "";
			String QTY 							= args.containsKey("QTY") ? stringValueOf(args.get("QTY")) : "";
			String userKey						= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String userNm						= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime 				= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			float InsQTY 						= Float.parseFloat(QTY);
			args.put("userNm",userNm);
			args.put("currentDatetime",currentDatetime);
			if(OWN_GODS_CD.equals("EKL-MFG")){
				args.put("BOM_CD",PROD_CD);
				args.put("USE_FG","Y");
				List<Map> list = edwardsManagementService.selectBomMaster(args);
				args.put("BOM_Revsn_No",list.get(0).get("REVSN_NO"));
				Map map = new HashMap();
				map.put("BOM_CD", list.get(0).get("BOM_CD"));
				map.put("REVSN_NO", list.get(0).get("REVSN_NO"));

				//DEMD_PLAN_ITEM 입력
				List<Map> list4 = edwardsManagementService.selectBomCodeMaster(map);
				for (int i = 0, n = list4.size(); i < n; i++) {
					float bomQTY = Float.parseFloat(stringValueOf(list4.get(i).get("QTY")));
					Map map2 = new HashMap();
					map2.put("GRP_COMP_CD", GRP_COMP_CD);
					map2.put("EXEM_PLAN_MNG_NO", EXEM_PLAN_MNG_NO);
					map2.put("Mcount_No", "");
					map2.put("STAT", "");
					map2.put("ITEM_CD", list4.get(i).get("ITEM_CD"));
					map2.put("ITEM_NM", list4.get(i).get("ITEM_NM"));
					map2.put("QTY", stringValueOf(InsQTY * bomQTY)); //엑셀 입력수량에 Bom 수량 곱하기
					map2.put("USE_QTY", "0"); //사용량은 0
					map2.put("RMID_QTY", stringValueOf(InsQTY * bomQTY)); //엑셀 입력수량에 Bom 수량 곱하기
					map2.put("COMP_CD", OWN_GODS_CD);
					map2.put("useYn", "Y");
					map2.put("addUserId", userKey);
					map2.put("addUserNm", userNm);
					map2.put("addDtm", currentDatetime);
					List<Map> list3 = edwardsManagementService.selectRcmdInfo(map2);
					if(list3.size() > 0){
						map2.put("RCMD_FG", "Y");
						map2.put("EXEM_MNG_NO", list3.get(0).get("EXEM_MNG_NO"));
						map2.put("RCMD_NO", list3.get(0).get("RCMD_NO"));
					}else{
						map2.put("RCMD_FG", "N");
						map2.put("EXEM_MNG_NO", "");
						map2.put("RCMD_NO", "");
					}
					List<Map> list5 = edwardsManagementService.selectDemdItemMaster(map2);
					if(list5.size() < 1){
						long result1 = edwardsManagementService.insertDemdCodeItem(map2);
					}else{
						Map map3 = new HashMap();
						map3.put("ADD_QTY", stringValueOf(InsQTY * bomQTY));
						map3.put("EXEM_PLAN_MNG_NO", EXEM_PLAN_MNG_NO);
						map3.put("ITEM_CD", list4.get(i).get("ITEM_CD"));
						map3.put("userNm", userNm);
						map3.put("currentDatetime", currentDatetime);
						long result1 = edwardsManagementService.updateDemdPlanItem(map3);
					}
				}
				//DEMD_PLAN_PROD 입력
				List<Map> list2 = edwardsManagementService.selectMaxSeqDemd(args);
				if(list2.get(0).get("SEQNO").equals(0)){
					args.put("PLAN_PROD_SEQNO","1");
					long result = edwardsManagementService.insertDemdCodeMaster(args);
					return new ResponseEntity<>(result, HttpStatus.OK);
				}else{
					args.put("PLAN_PROD_SEQNO",list2.get(0).get("SEQNO"));
					long result = edwardsManagementService.insertDemdCodeMaster(args);
					return new ResponseEntity<>(result, HttpStatus.OK);
				}
			}else{
				args.put("BOM_Revsn_No","0");
				//DEMD_PLAN_ITEM 입력
				Map map2 = new HashMap();
				map2.put("GRP_COMP_CD", GRP_COMP_CD);
				map2.put("EXEM_PLAN_MNG_NO", EXEM_PLAN_MNG_NO);
				map2.put("Mcount_No", "");
				map2.put("STAT", "");
				map2.put("ITEM_CD", PROD_CD);
				map2.put("ITEM_NM", PROD_NM);
				map2.put("QTY", stringValueOf(InsQTY)); //엑셀 입력수량에 Bom 수량 곱하기
				map2.put("USE_QTY", "0"); //사용량은 0
				map2.put("RMID_QTY", stringValueOf(InsQTY)); //엑셀 입력수량에 Bom 수량 곱하기
				map2.put("COMP_CD", OWN_GODS_CD);
				map2.put("useYn", "Y");
				map2.put("addUserId", userKey);
				map2.put("addUserNm", userNm);
				map2.put("addDtm", currentDatetime);

				List<Map> list3 = edwardsManagementService.selectRcmdInfo(map2);
				if(list3.size() > 0){
					map2.put("RCMD_FG", "Y");
					map2.put("EXEM_MNG_NO", list3.get(0).get("EXEM_MNG_NO"));
					map2.put("RCMD_NO", list3.get(0).get("RCMD_NO"));
				}else{
					map2.put("RCMD_FG", "N");
					map2.put("EXEM_MNG_NO", "");
					map2.put("RCMD_NO", "");
				}
				long result1 = edwardsManagementService.insertDemdCodeItem(map2);

				//DEMD_PLAN_PROD 입력
				List<Map> list2 = edwardsManagementService.selectMaxSeqDemd(args);
				if(list2.get(0).get("SEQNO").equals(0)){
					args.put("PLAN_PROD_SEQNO","1");
					long result = edwardsManagementService.insertDemdCodeMaster(args);
					return new ResponseEntity<>(result, HttpStatus.OK);
				}else{
					args.put("PLAN_PROD_SEQNO",list2.get(0).get("SEQNO"));
					long result = edwardsManagementService.insertDemdCodeMaster(args);
					return new ResponseEntity<>(result, HttpStatus.OK);
				}
			}
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectDemdItemMaster")
	public ResponseEntity<?> selectDemdItemMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectDemdItemMaster(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectExecMaster")
	public ResponseEntity<?> selectExecMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectExecMaster(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveExecMaster")
	public ResponseEntity<?> saveExecMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String KEY_ED_EXEM_EXEC_MST 	= args.containsKey("KEY_ED_EXEM_EXEC_MST") ? stringValueOf(args.get("KEY_ED_EXEM_EXEC_MST")) : "";
			String userNm					= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime 			= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			String currentYmd 				= CmmnUtils.getFormatedDate("yyyyMMdd");
			args.put("userNm",userNm);
			args.put("currentDatetime",currentDatetime);
			if(KEY_ED_EXEM_EXEC_MST.equals("")){
				List<Map> list2 = edwardsManagementService.selectMaxExec(args);
				if(list2.get(0).get("max").equals(currentYmd)){
					args.put("EXEM_EXEC_MNG_NO","EO"+list2.get(0).get("EXEM_EXEC_MNG_NO"));
					String EXEM_EXEC_MNG_NO 	= stringValueOf(args.get("EXEM_EXEC_MNG_NO"));
					Map map = new HashMap();
					map.put("EXEM_EXEC_MNG_NO", EXEM_EXEC_MNG_NO);
					long result = edwardsManagementService.insertExecMaster(args);
					return new ResponseEntity<>(map, HttpStatus.OK);
				}else{
					args.put("EXEM_EXEC_MNG_NO","EO"+currentYmd+"01");
					String EXEM_EXEC_MNG_NO 	= stringValueOf(args.get("EXEM_EXEC_MNG_NO"));
					Map map = new HashMap();
					map.put("EXEM_EXEC_MNG_NO", EXEM_EXEC_MNG_NO);
					long result = edwardsManagementService.insertExecMaster(args);
					return new ResponseEntity<>(map, HttpStatus.OK);
				}
			}else{
				long result = edwardsManagementService.updateExecMaster(args);
				return new ResponseEntity<>(result, HttpStatus.OK);
			}
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectExecCodeMaster")
	public ResponseEntity<?> selectExecCodeMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectExecCodeMaster(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveExecCodeMaster")
	public ResponseEntity<?> saveExecCodeMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String EXEC_DT 			= args.containsKey("EXEC_DT") ? stringValueOf(args.get("EXEC_DT")) : "";
			String PROD_CD 			= args.containsKey("PROD_CD") ? stringValueOf(args.get("PROD_CD")) : "";
			String PROD_NM 			= args.containsKey("PROD_NM") ? stringValueOf(args.get("PROD_NM")) : "";
			String OWN_GODS_CD 		= args.containsKey("OWN_GODS_CD") ? stringValueOf(args.get("OWN_GODS_CD")).trim() : "";
			String GRP_COMP_CD 		= args.containsKey("GRP_COMP_CD") ? stringValueOf(args.get("GRP_COMP_CD")) : "";
			String EXEM_EXEC_MNG_NO = args.containsKey("EXEM_EXEC_MNG_NO") ? stringValueOf(args.get("EXEM_EXEC_MNG_NO")) : "";
			String QTY 				= args.containsKey("QTY") ? stringValueOf(args.get("QTY")) : "";
			String userKey			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			float InsQTY 			= Float.parseFloat(QTY);
			args.put("userNm",userNm);
			args.put("currentDatetime",currentDatetime);

			if(OWN_GODS_CD.equals("EKL-MFG")){
				args.put("BOM_CD",PROD_CD);
				args.put("USE_FG","Y");
				List<Map> list = edwardsManagementService.selectBomMaster1(args);
				args.put("BOM_REVSN_NO",list.get(0).get("REVSN_NO"));
				Map map = new HashMap();
				map.put("BOM_CD", list.get(0).get("BOM_CD"));
				map.put("REVSN_NO", list.get(0).get("REVSN_NO"));

				//DEMD_PLAN_ITEM 입력
				List<Map> list4 = edwardsManagementService.selectBomMaster1(map);
				for (int i = 0, n = list4.size(); i < n; i++) {
					float bomQTY = Float.parseFloat(stringValueOf(list4.get(i).get("QTY")));
					Map map5 = new HashMap();
					map5.put("ITEM_CD", list4.get(i).get("ITEM_CD"));
					List<Map> list1 = edwardsManagementService.selectItemExemEnd(map5);
					float execQty = InsQTY * bomQTY; //실 갯수는 수량*bom수량
					for(int j = 0, m = list1.size(); j < m; j++){
						List<Map> list2 = edwardsManagementService.selectMaxExecImpt(args);
						float rmidQTY = Float.parseFloat(stringValueOf(list1.get(j).get("EXEM_RMID_QTY")));
						if(execQty - rmidQTY > 0){
							//ED_EXEM_EXEC_IMPT_LIST 입력
							Map map1 = new HashMap();
							map1.put("EXEM_EXEC_MNG_NO", EXEM_EXEC_MNG_NO);
							map1.put("GRP_COMP_CD", GRP_COMP_CD);
							map1.put("PROD_CD", PROD_CD);
							map1.put("ITEM_CD", list4.get(i).get("ITEM_CD"));
							if(list2.get(0).get("SEQNO").equals(0)){
								map1.put("EXEC_IMPT_SEQNO", "1");
							}else{
								map1.put("EXEC_IMPT_SEQNO", list2.get(0).get("SEQNO"));
							}
							map1.put("EXEC_DT", EXEC_DT);
							map1.put("QTY", stringValueOf(rmidQTY));
							map1.put("IMPT_ORDR_MNG_NO", stringValueOf(list1.get(j).get("IMPT_ORDR_MNG_NO")));
							map1.put("IMPT_INV_SEQNO", stringValueOf(list1.get(j).get("IMPT_INV_SEQNO")));
							map1.put("LAN", stringValueOf(list1.get(j).get("LAN")));
							map1.put("HNG", stringValueOf(list1.get(j).get("HNG")));
							map1.put("EXEC_SEQNO", "1");
							map1.put("useYn", "Y");
							map1.put("addUserId", userKey);
							map1.put("addUserNm", userNm);
							map1.put("addDtm", currentDatetime);
							long result = edwardsManagementService.insertExecImptList(map1);

							//ED_ITEM_EXEM_DESC 업데이트
							Map map3 = new HashMap();
							map3.put("KEY_ED_ITEM_EXEM_DESC", stringValueOf(list1.get(j).get("KEY_ED_ITEM_EXEM_DESC")));
							map3.put("EXECQTY", stringValueOf(rmidQTY));
							map3.put("ID", userKey);
							map3.put("userNm", userNm);
							map3.put("currentDatetime", currentDatetime);
							long result1 = edwardsManagementService.updateExemDesc(map3);
							execQty = execQty - rmidQTY;
						}else{
							//ED_EXEM_EXEC_IMPT_LIST 입력
							Map map1 = new HashMap();
							map1.put("EXEM_EXEC_MNG_NO", EXEM_EXEC_MNG_NO);
							map1.put("GRP_COMP_CD", GRP_COMP_CD);
							map1.put("PROD_CD", PROD_CD);
							map1.put("ITEM_CD", list4.get(i).get("ITEM_CD"));
							if(list2.get(0).get("SEQNO").equals(0)){
								map1.put("EXEC_IMPT_SEQNO", "1");
							}else{
								map1.put("EXEC_IMPT_SEQNO", list2.get(0).get("SEQNO"));
							}
							map1.put("EXEC_DT", EXEC_DT);
							map1.put("QTY", stringValueOf(execQty));
							map1.put("IMPT_ORDR_MNG_NO", stringValueOf(list1.get(j).get("IMPT_ORDR_MNG_NO")));
							map1.put("IMPT_INV_SEQNO", stringValueOf(list1.get(j).get("IMPT_INV_SEQNO")));
							map1.put("LAN", stringValueOf(list1.get(j).get("LAN")));
							map1.put("HNG", stringValueOf(list1.get(j).get("HNG")));
							map1.put("EXEC_SEQNO", "1");
							map1.put("useYn", "Y");
							map1.put("addUserId", userKey);
							map1.put("addUserNm", userNm);
							map1.put("addDtm", currentDatetime);
							long result = edwardsManagementService.insertExecImptList(map1);

							//ED_ITEM_EXEM_DESC 업데이트
							Map map3 = new HashMap();
							map3.put("KEY_ED_ITEM_EXEM_DESC", stringValueOf(list1.get(j).get("KEY_ED_ITEM_EXEM_DESC")));
							map3.put("EXECQTY", stringValueOf(execQty));
							map3.put("ID", userKey);
							map3.put("userNm", userNm);
							map3.put("currentDatetime", currentDatetime);
							long result1 = edwardsManagementService.updateExemDesc(map3);
							execQty = 0;
						}
						if (execQty <= 0){
							break;
						}
					}

					float exQty = (InsQTY * bomQTY) - execQty;

					//ED_EXEM_EXEC_ITEM 입력
					Map map2 = new HashMap();
					map2.put("GRP_COMP_CD", GRP_COMP_CD);
					map2.put("EXEM_EXEC_MNG_NO", EXEM_EXEC_MNG_NO);
					map2.put("EXEC_DT", EXEC_DT);
					map2.put("PROD_CD", PROD_CD);
					map2.put("ITEM_CD", list4.get(i).get("ITEM_CD"));
					map2.put("EXEC_SEQNO", "1");
					map2.put("PROD_NM", PROD_NM);
					map2.put("ITEM_NM", list4.get(i).get("ITEM_NM"));
					map2.put("QTY", stringValueOf(InsQTY * bomQTY));
					map2.put("EXEC_QTY", stringValueOf(exQty));
					map2.put("RMID_QTY", stringValueOf(execQty));
					map2.put("useYn", "Y");
					map2.put("addUserId", userKey);
					map2.put("addUserNm", userNm);
					map2.put("addDtm", currentDatetime);
					long result2 = edwardsManagementService.insertExemExecItem(map2);
				}
				//ED_EXEM_EXEC_PROD 입력
				List<Map> list3 = edwardsManagementService.selectMaxSeqExec(args);
				if(list3.get(0).get("SEQNO").equals(0)){
					args.put("PROD_SEQNO","1");
					long result = edwardsManagementService.insertExecCodeMaster(args);
				}else{
					args.put("PROD_SEQNO",list3.get(0).get("SEQNO"));
					long result = edwardsManagementService.insertExecCodeMaster(args);
				}
				return new ResponseEntity<>(list, HttpStatus.OK);
			}else{
				Map map = new HashMap();
				map.put("ITEM_CD", PROD_CD);
				List<Map> list = edwardsManagementService.selectItemExemEnd(map);
				float execQty = InsQTY;
				System.out.println("list.size() :"+list.size());
				for(int i = 0, n = list.size(); i < n; i++){
					List<Map> list2 = edwardsManagementService.selectMaxExecImpt(args);
					float rmidQTY = Float.parseFloat(stringValueOf(list.get(i).get("EXEM_RMID_QTY")));
					if(execQty - rmidQTY > 0){
						//ED_EXEM_EXEC_IMPT_LIST 입력
						Map map1 = new HashMap();
						map1.put("EXEM_EXEC_MNG_NO", EXEM_EXEC_MNG_NO);
						map1.put("GRP_COMP_CD", GRP_COMP_CD);
						map1.put("PROD_CD", PROD_CD);
						map1.put("ITEM_CD", PROD_CD);
						if(list2.get(0).get("SEQNO").equals(0)){
							map1.put("EXEC_IMPT_SEQNO", "1");
						}else{
							map1.put("EXEC_IMPT_SEQNO", list2.get(0).get("SEQNO"));
						}
						map1.put("EXEC_DT", EXEC_DT);
						map1.put("QTY", stringValueOf(rmidQTY));
						map1.put("IMPT_ORDR_MNG_NO", stringValueOf(list.get(i).get("IMPT_ORDR_MNG_NO")));
						map1.put("IMPT_INV_SEQNO", stringValueOf(list.get(i).get("IMPT_INV_SEQNO")));
						map1.put("LAN", stringValueOf(list.get(i).get("LAN")));
						map1.put("HNG", stringValueOf(list.get(i).get("HNG")));
						map1.put("EXEC_SEQNO", "1");
						map1.put("useYn", "Y");
						map1.put("addUserId", userKey);
						map1.put("addUserNm", userNm);
						map1.put("addDtm", currentDatetime);
						long result = edwardsManagementService.insertExecImptList(map1);

						//ED_ITEM_EXEM_DESC 업데이트
						Map map3 = new HashMap();
						map3.put("KEY_ED_ITEM_EXEM_DESC", stringValueOf(list.get(i).get("KEY_ED_ITEM_EXEM_DESC")));
						map3.put("EXECQTY", stringValueOf(rmidQTY));
						map3.put("ID", userKey);
						map3.put("userNm", userNm);
						map3.put("currentDatetime", currentDatetime);
						long result1 = edwardsManagementService.updateExemDesc(map3);
						execQty = execQty - rmidQTY;
					}else{
						//ED_EXEM_EXEC_IMPT_LIST 입력
						Map map1 = new HashMap();
						map1.put("EXEM_EXEC_MNG_NO", EXEM_EXEC_MNG_NO);
						map1.put("GRP_COMP_CD", GRP_COMP_CD);
						map1.put("PROD_CD", PROD_CD);
						map1.put("ITEM_CD", PROD_CD);
						if(list2.get(0).get("SEQNO").equals(0)){
							map1.put("EXEC_IMPT_SEQNO", "1");
						}else{
							map1.put("EXEC_IMPT_SEQNO", list2.get(0).get("SEQNO"));
						}
						map1.put("EXEC_DT", EXEC_DT);
						map1.put("QTY", stringValueOf(execQty));
						map1.put("IMPT_ORDR_MNG_NO", stringValueOf(list.get(i).get("IMPT_ORDR_MNG_NO")));
						map1.put("IMPT_INV_SEQNO", stringValueOf(list.get(i).get("IMPT_INV_SEQNO")));
						map1.put("LAN", stringValueOf(list.get(i).get("LAN")));
						map1.put("HNG", stringValueOf(list.get(i).get("HNG")));
						map1.put("EXEC_SEQNO", "1");
						map1.put("useYn", "Y");
						map1.put("addUserId", userKey);
						map1.put("addUserNm", userNm);
						map1.put("addDtm", currentDatetime);
						long result = edwardsManagementService.insertExecImptList(map1);

						//ED_ITEM_EXEM_DESC 업데이트
						Map map3 = new HashMap();
						map3.put("KEY_ED_ITEM_EXEM_DESC", stringValueOf(list.get(i).get("KEY_ED_ITEM_EXEM_DESC")));
						map3.put("EXECQTY", stringValueOf(execQty));
						map3.put("ID", userKey);
						map3.put("userNm", userNm);
						map3.put("currentDatetime", currentDatetime);
						long result1 = edwardsManagementService.updateExemDesc(map3);
						execQty = 0;
					}

					if (execQty <= 0){
						break;
					}
				}

				float exQty = InsQTY - execQty;

				args.put("BOM_REVSN_NO","0");
				//ED_EXEM_EXEC_ITEM 입력
				Map map2 = new HashMap();
				map2.put("GRP_COMP_CD", GRP_COMP_CD);
				map2.put("EXEM_EXEC_MNG_NO", EXEM_EXEC_MNG_NO);
				map2.put("EXEC_DT", EXEC_DT);
				map2.put("PROD_CD", PROD_CD);
				map2.put("ITEM_CD", PROD_CD);
				map2.put("EXEC_SEQNO", "1");
				map2.put("PROD_NM", PROD_NM);
				map2.put("ITEM_NM", PROD_NM);
				map2.put("QTY", stringValueOf(InsQTY));
				map2.put("EXEC_QTY", stringValueOf(exQty));
				map2.put("RMID_QTY", stringValueOf(execQty));
				map2.put("useYn", "Y");
				map2.put("addUserId", userKey);
				map2.put("addUserNm", userNm);
				map2.put("addDtm", currentDatetime);
				long result2 = edwardsManagementService.insertExemExecItem(map2);

				//ED_EXEM_EXEC_PROD 입력
				List<Map> list3 = edwardsManagementService.selectMaxSeqExec(args);
				if(list3.get(0).get("SEQNO").equals(0)){
					args.put("PROD_SEQNO","1");
					long result = edwardsManagementService.insertExecCodeMaster(args);
					return new ResponseEntity<>(result, HttpStatus.OK);
				}else{
					args.put("PROD_SEQNO",list3.get(0).get("SEQNO"));
					long result = edwardsManagementService.insertExecCodeMaster(args);
					return new ResponseEntity<>(result, HttpStatus.OK);
				}
			}
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectExecItemMaster")
	public ResponseEntity<?> selectExecItemMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectExecItemMaster(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectAfmngMaster")
	public ResponseEntity<?> selectAfmngMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectAfmngMaster(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveAfmngMaster")
	public ResponseEntity<?> saveAfmngMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String KEY_ED_EXEM_AFMNG_END_MST 	= args.containsKey("KEY_ED_EXEM_AFMNG_END_MST") ? stringValueOf(args.get("KEY_ED_EXEM_AFMNG_END_MST")) : "";
			String AFMNG_END_MNG_NO_MST			= args.containsKey("AFMNG_END_MNG_NO") ? stringValueOf(args.get("AFMNG_END_MNG_NO")) : "";
			String userNm						= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime 				= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			String currentYmd 					= CmmnUtils.getFormatedDate("yyyyMMdd");
			args.put("userNm",userNm);
			args.put("currentDatetime",currentDatetime);
			if(KEY_ED_EXEM_AFMNG_END_MST.equals("")){
				List<Map> list2 = edwardsManagementService.selectMaxAfmng(args);
				if(list2.get(0).get("max").equals(currentYmd)){
					args.put("AFMNG_END_MNG_NO","PC"+list2.get(0).get("AFMNG_END_MNG_NO"));
					String AFMNG_END_MNG_NO 	= stringValueOf(args.get("AFMNG_END_MNG_NO"));
					Map map = new HashMap();
					map.put("AFMNG_END_MNG_NO", AFMNG_END_MNG_NO);
					long result = edwardsManagementService.insertAfmngMaster(args);
					return new ResponseEntity<>(map, HttpStatus.OK);
				}else{
					args.put("AFMNG_END_MNG_NO","PC"+currentYmd+"01");
					String AFMNG_END_MNG_NO 	= stringValueOf(args.get("AFMNG_END_MNG_NO"));
					Map map = new HashMap();
					map.put("AFMNG_END_MNG_NO", AFMNG_END_MNG_NO);
					long result = edwardsManagementService.insertAfmngMaster(args);
					return new ResponseEntity<>(map, HttpStatus.OK);
				}
			}else{
				long result = edwardsManagementService.updateAfmngMaster(args);
				Map map = new HashMap();
				map.put("AFMNG_END_MNG_NO", AFMNG_END_MNG_NO_MST);
				return new ResponseEntity<>(map, HttpStatus.OK);
			}
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectAfmngItemMaster")
	public ResponseEntity<?> selectAfmngItemMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectAfmngItemMaster(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveAfmngCodeMaster")
	public ResponseEntity<?> saveAfmngCodeMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String KEY_ED_EXEM_AFMNG_END_DTL 	= args.containsKey("KEY_ED_EXEM_AFMNG_END_DTL") ? stringValueOf(args.get("KEY_ED_EXEM_AFMNG_END_DTL")) : "";
			String AFMNG_END_MNG_NO1 			= args.containsKey("AFMNG_END_MNG_NO1") ? stringValueOf(args.get("AFMNG_END_MNG_NO1")) : "";
			String userNm						= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime 				= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			args.put("userNm",userNm);
			args.put("currentDatetime",currentDatetime);
			if(KEY_ED_EXEM_AFMNG_END_DTL.equals("")){
				if(AFMNG_END_MNG_NO1.equals("")){
					List<Map> list2 = edwardsManagementService.selectMaxSeqAfmng(args);
					if(list2.get(0).get("SEQNO").equals(0)){
						args.put("AFMNG_END_SEQNO","1");
						long result = edwardsManagementService.insertAfmngCodeMaster(args);
						return new ResponseEntity<>(result, HttpStatus.OK);
					}else{
						args.put("AFMNG_END_SEQNO",list2.get(0).get("SEQNO"));
						long result = edwardsManagementService.insertAfmngCodeMaster(args);
						return new ResponseEntity<>(result, HttpStatus.OK);
					}
				}else{
					long result = edwardsManagementService.updateAfmngCodeMaster(args);
					return new ResponseEntity<>(result, HttpStatus.OK);
				}
			}else{
				long result = edwardsManagementService.updateAfmngCodeMaster(args);
				return new ResponseEntity<>(result, HttpStatus.OK);
			}
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectReExpobjMaster")
	public ResponseEntity<?> selectReExpobjMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectReExpobjMaster(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectReExpobjItemMaster")
	public ResponseEntity<?> selectReExpobjItemMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectReExpobjItemMaster(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectReExpobjAddItemMaster")
	public ResponseEntity<?> selectReExpobjAddItemMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String NOCHK 	= stringValueOf(args.get("NOCHK"));
			String NODATA 	= stringValueOf(args.get("NODATA"));
			String ImExGbn 	= stringValueOf(args.get("ImExGbn"));
			if(NOCHK.equals("Singo")){
				args.put("NODATA",NODATA.replace("-", ""));
			}
			if(ImExGbn.equals("수입")){
				List<Map> list = edwardsManagementService.selectReExpobjAddItemMaster(args);
				List<?> result = list.stream().collect(Collectors.toList());
				return new ResponseEntity<>(result, HttpStatus.OK);
			}else{
				List<Map> list = edwardsManagementService.selectReExpobjAddItemMaster1(args);
				List<?> result = list.stream().collect(Collectors.toList());
				return new ResponseEntity<>(result, HttpStatus.OK);
			}
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectMfcMaster")
	public ResponseEntity<?> selectMfcMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectMfcMaster(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectMfcItemMaster")
	public ResponseEntity<?> selectMfcItemMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectMfcItemMaster(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectMfcCodeMaster")
	public ResponseEntity<?> selectMfcCodeMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectMfcCodeMaster(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectOrgOrdrMaster")
	public ResponseEntity<?> selectOrgOrdrMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectOrgOrdrMaster(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectOrgOrdrList")
	public ResponseEntity<?> selectOrgOrdrList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectOrgOrdrList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectOrgExpoList")
	public ResponseEntity<?> selectOrgExpoList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectOrgExpoList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectOrgImpoList")
	public ResponseEntity<?> selectOrgImpoList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectOrgImpoList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectCoMaster")
	public ResponseEntity<?> selectCoMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectCoMaster(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveCoMaster")
	public ResponseEntity<?> saveCoMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String KEY_ED_CO_MST 	= args.containsKey("KEY_ED_CO_MST") ? stringValueOf(args.get("KEY_ED_CO_MST")) : "";
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			String currentYmd 		= CmmnUtils.getFormatedDate("yyyyMMdd");
			args.put("userNm",userNm);
			args.put("currentDatetime",currentDatetime);
			if(KEY_ED_CO_MST.equals("")){
				List<Map> list2 = edwardsManagementService.selectMaxCoMst(args);
				if(list2.get(0).get("max").equals(currentYmd)){
					args.put("CO_ORDR_MNG_NO","CO"+list2.get(0).get("CO_ORDR_MNG_NO"));
					long result = edwardsManagementService.insertCoMaster(args);
					return new ResponseEntity<>(result, HttpStatus.OK);
				}else{
					args.put("CO_ORDR_MNG_NO","CO"+currentYmd+"01");
					long result = edwardsManagementService.insertCoMaster(args);
					return new ResponseEntity<>(result, HttpStatus.OK);
				}
			}else{
				long result = edwardsManagementService.updateCoMaster(args);
				return new ResponseEntity<>(result, HttpStatus.OK);
			}
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectCoItemMaster")
	public ResponseEntity<?> selectCoItemMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectCoItemMaster(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveCoItemMaster")
	public ResponseEntity<?> saveCoItemMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String KEY_ED_CO_DTL 	= args.containsKey("KEY_ED_CO_DTL") ? stringValueOf(args.get("KEY_ED_CO_DTL")) : "";
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			args.put("userNm",userNm);
			args.put("currentDatetime",currentDatetime);
			if(KEY_ED_CO_DTL.equals("")){
				List<Map> list2 = edwardsManagementService.selectMaxSeqCo(args);
				if(list2.get(0).get("SEQNO").equals(0)){
					args.put("SEQNO","1");
					long result = edwardsManagementService.insertCoItemMaster(args);
					return new ResponseEntity<>(result, HttpStatus.OK);
				}else{
					args.put("SEQNO",list2.get(0).get("SEQNO"));
					long result = edwardsManagementService.insertCoItemMaster(args);
					return new ResponseEntity<>(result, HttpStatus.OK);
				}
			}else{
				long result = edwardsManagementService.updateCoItemMaster(args);
				return new ResponseEntity<>(result, HttpStatus.OK);
			}
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectExpoMaster")
	public ResponseEntity<?> selectExpoMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String PROC_STAT 	= args.containsKey("PROC_STAT") ? stringValueOf(args.get("PROC_STAT")) : "";
			if(PROC_STAT.equals("other")){
				args.put("other","'08001','08011','08012'");
				args.put("PROC_STAT","");
			}

			List<Map> list = edwardsManagementService.selectExpoMaster(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectExpoInvMaster")
	public ResponseEntity<?> selectExpoInvMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectExpoInvMaster(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectExpoLanMaster")
	public ResponseEntity<?> selectExpoLanMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectExpoLanMaster(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectExpoHangMaster")
	public ResponseEntity<?> selectExpoHangMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectExpoHangMaster(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectExpoImpoMaster")
	public ResponseEntity<?> selectExpoImpoMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectExpoImpoMaster(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImpoMaster")
	public ResponseEntity<?> selectImpoMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String PROC_STAT 	= args.containsKey("PROC_STAT") ? stringValueOf(args.get("PROC_STAT")) : "";
			if(PROC_STAT.equals("other")){
				args.put("other","'08001','08011','08012'");
				args.put("PROC_STAT","");
			}

			List<Map> list = edwardsManagementService.selectImpoMaster(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImpoInvMaster")
	public ResponseEntity<?> selectImpoInvMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectImpoInvMaster(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImpoInvSumMaster")
	public ResponseEntity<?> selectImpoInvSumMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectImpoInvSumMaster(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImpoLanMaster")
	public ResponseEntity<?> selectImpoLanMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectImpoLanMaster(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImpoHangMaster")
	public ResponseEntity<?> selectImpoHangMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectImpoHangMaster(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImpoGamMaster")
	public ResponseEntity<?> selectImpoGamMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectImpoGamMaster(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectFtaMaster")
	public ResponseEntity<?> selectFtaMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectFtaMaster(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveFtaMaster")
	public ResponseEntity<?> saveFtaMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String KEY_ED_MDL_MST 	= args.containsKey("KEY_ED_fta_pact") ? stringValueOf(args.get("KEY_ED_fta_pact")) : "";
			String userNm		= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			args.put("userNm",userNm);
			args.put("currentDatetime",currentDatetime);
			if(KEY_ED_MDL_MST.equals("")){
				long result = edwardsManagementService.insertFtaMaster(args);
				return new ResponseEntity<>(result, HttpStatus.OK);
			}else{
				long result = edwardsManagementService.updateFtaMaster(args);
				return new ResponseEntity<>(result, HttpStatus.OK);
			}
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImpoPopMaster")
	public ResponseEntity<?> selectImpoPopMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectImpoPopMaster(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImpoPopMaster1")
	public ResponseEntity<?> selectImpoPopMaster1(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectImpoPopMaster1(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveExpoInv")
	public ResponseEntity<?> saveExpoInv(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String KEY_ED_EXPT_INV  = args.containsKey("KEY_ED_EXPT_INV") ? stringValueOf(args.get("KEY_ED_EXPT_INV")) : "";
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String userKey			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			if(KEY_ED_EXPT_INV.equals("")){
				args.put("addUserId",userKey);
				args.put("addUserNm",userNm);
				args.put("addDtm",currentDatetime);
				List<Map> list2 = edwardsManagementService.selectMaxExptInv(args);
				if(!list2.get(0).get("EXPT_INV_SEQNO").equals("001")){
					args.put("EXPT_INV_SEQNO",list2.get(0).get("EXPT_INV_SEQNO"));
					long result = edwardsManagementService.insertExpoInv(args);
					return new ResponseEntity<>(result, HttpStatus.OK);
				}else{
					args.put("EXPT_INV_SEQNO","001");
					long result = edwardsManagementService.insertExpoInv(args);
					return new ResponseEntity<>(result, HttpStatus.OK);
				}
			}else{
				args.put("editUserId",userKey);
				args.put("editUserNm",userNm);
				args.put("editDtm",currentDatetime);
				args.put("userNm",userNm);
				args.put("currentDatetime",currentDatetime);
				long result = edwardsManagementService.updateExpoInv(args);
				return new ResponseEntity<>(result, HttpStatus.OK);
			}
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveExpoInv1")
	public ResponseEntity<?> saveExpoInv1(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String userKey			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			args.put("editUserId",userKey);
			args.put("editUserNm",userNm);
			args.put("editDtm",currentDatetime);
			args.put("userNm",userNm);
			args.put("currentDatetime",currentDatetime);
			long result = edwardsManagementService.updateExpoInv2(args);
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveExpoInv2")
	public ResponseEntity<?> saveExpoInv2(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String KEY_ED_EXPT_INV  = args.containsKey("KEY_ED_EXPT_INV") ? stringValueOf(args.get("KEY_ED_EXPT_INV")) : "";
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String userKey			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			if(KEY_ED_EXPT_INV.equals("")){
				args.put("addUserId",userKey);
				args.put("addUserNm",userNm);
				args.put("addDtm",currentDatetime);
				List<Map> list2 = edwardsManagementService.selectMaxExptInv(args);
				if(!list2.get(0).get("EXPT_INV_SEQNO").equals("001")){
					args.put("EXPT_INV_SEQNO",list2.get(0).get("EXPT_INV_SEQNO"));
					long result = edwardsManagementService.insertExpoInv(args);
					return new ResponseEntity<>(result, HttpStatus.OK);
				}else{
					args.put("EXPT_INV_SEQNO","001");
					long result = edwardsManagementService.insertExpoInv(args);
					return new ResponseEntity<>(result, HttpStatus.OK);
				}
			}else{
				args.put("editUserId",userKey);
				args.put("editUserNm",userNm);
				args.put("editDtm",currentDatetime);
				args.put("userNm",userNm);
				args.put("currentDatetime",currentDatetime);
				long result = edwardsManagementService.updateExpoInv1(args);
				return new ResponseEntity<>(result, HttpStatus.OK);
			}
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveExpoInv3")
	public ResponseEntity<?> saveExpoInv3(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String userKey			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			args.put("editUserId",userKey);
			args.put("editUserNm",userNm);
			args.put("editDtm",currentDatetime);
			args.put("userNm",userNm);
			args.put("currentDatetime",currentDatetime);
			long result = edwardsManagementService.updateExpoInv3(args);
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveExpoInv4")
	public ResponseEntity<?> saveExpoInv4(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String userKey			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			String ORIG_STAT_OBJ  = args.containsKey("ORIG_STAT_OBJ") ? stringValueOf(args.get("ORIG_STAT_OBJ")) : "";
			if(ORIG_STAT_OBJ.equals("대상")){
				args.put("ORIG_STAT_OBJ","면제");
				args.put("ORIG_STAT_OBJ_FG","N");
			}else if(ORIG_STAT_OBJ.equals("면제")){
				args.put("ORIG_STAT_OBJ","대상");
				args.put("ORIG_STAT_OBJ_FG","Y");
			}else{
				args.put("ORIG_STAT_OBJ","");
				args.put("ORIG_STAT_OBJ_FG","N");
			}
			args.put("editUserId",userKey);
			args.put("editUserNm",userNm);
			args.put("editDtm",currentDatetime);
			args.put("userNm",userNm);
			args.put("currentDatetime",currentDatetime);
			long result = edwardsManagementService.updateExpoInv4(args);
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveImpoHng")
	public ResponseEntity<?> saveImpoHng(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			args.put("userNm",userNm);
			args.put("currentDatetime",currentDatetime);
			long result = edwardsManagementService.updateImpoHng(args);
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveImpoHng1")
	public ResponseEntity<?> saveImpoHng1(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			args.put("userNm",userNm);
			args.put("currentDatetime",currentDatetime);
			long result = edwardsManagementService.updateImpoHng1(args);
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveImpoHng2")
	public ResponseEntity<?> saveImpoHng2(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			args.put("userNm",userNm);
			args.put("currentDatetime",currentDatetime);
			long result = edwardsManagementService.updateImpoHng2(args);
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveImpoHng3")
	public ResponseEntity<?> saveImpoHng3(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			List<Map> list = edwardsManagementService.selectReExpobjItemMaster(args);
			for (int i = 0, n = list.size(); i < n; i++) {
				Map map1 = new HashMap();
				map1.put("IMPT_SINGO_NO", ((String) list.get(i).get("IMPT_DECL_NO")).replace("-",""));
				map1.put("IMPT_LAN", list.get(i).get("LAN"));
				map1.put("IMPT_HNG", list.get(i).get("HNG"));
				map1.put("userNm",userNm);
				map1.put("currentDatetime",currentDatetime);
				long result1 = edwardsManagementService.updateImpoHng2(map1);
			}

			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveImpoHng4")
	public ResponseEntity<?> saveImpoHng4(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			args.put("userNm",userNm);
			args.put("currentDatetime",currentDatetime);
			long result = edwardsManagementService.updateImpoHng3(args);
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveOrigStat")
	public ResponseEntity<?> saveOrigStat(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			args.put("userNm",userNm);
			args.put("currentDatetime",currentDatetime);
			List<Map> list2 = edwardsManagementService.selectMaxOrigStat(args);
			List<Map> list3 = edwardsManagementService.selectDrawOrigStat(args);
			args.put("OneGwan_tax",list3.get(0).get("OneGwan_tax"));
			args.put("Onetotal_tax",list3.get(0).get("Onetotal_tax"));
			if(list2.get(0).get("SEQNO").equals(0)){
				args.put("SEQNO","1");
				long result = edwardsManagementService.insertOrigStat(args);
				return new ResponseEntity<>(result, HttpStatus.OK);
			}else{
				args.put("SEQNO",list2.get(0).get("SEQNO"));
				long result = edwardsManagementService.insertOrigStat(args);
				return new ResponseEntity<>(result, HttpStatus.OK);
			}
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/delOrigStat")
	public ResponseEntity<?> delOrigStat(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			args.put("userNm",userNm);
			args.put("currentDatetime",currentDatetime);
			long result = edwardsManagementService.updateOrigStat(args);
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectExpoLanHng")
	public ResponseEntity<?> selectExpoLanHng(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectExpoLanHng(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveExpoMaster")
	public ResponseEntity<?> saveExpoMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String PROC_STAT 		= args.containsKey("PROC_STAT") ? stringValueOf(args.get("PROC_STAT")) : "";
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			if(PROC_STAT.equals("08013")){
				args.put("userNm",userNm);
				args.put("currentDatetime",currentDatetime);
			}else if(PROC_STAT.equals("08012")){
				args.put("userNm",userNm);
				args.put("currentDatetime1",currentDatetime);
			}else{
				args.put("userNm",userNm);
				args.put("currentDatetime2",currentDatetime);
			}
			long result = edwardsManagementService.updateExpoMaster(args);
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveImpoMaster")
	public ResponseEntity<?> saveImpoMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String PROC_STAT 		= args.containsKey("PROC_STAT") ? stringValueOf(args.get("PROC_STAT")) : "";
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			if(PROC_STAT.equals("08013")){
				args.put("userNm",userNm);
				args.put("currentDatetime",currentDatetime);
			}else if(PROC_STAT.equals("08012")){
				args.put("userNm",userNm);
				args.put("currentDatetime1",currentDatetime);
			}else{
				args.put("userNm",userNm);
				args.put("currentDatetime2",currentDatetime);
			}
			long result = edwardsManagementService.updateImpoMaster(args);
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectCheckQty")
	public ResponseEntity<?> selectCheckQty(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectCheckQty(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectOrgCheck")
	public ResponseEntity<?> selectOrgCheck(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectOrgCheck(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectOrigStat")
	public ResponseEntity<?> selectOrigStat(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectOrigStat(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectEdwardsImpoSum")
	public ResponseEntity<?> selectEdwardsImpoSum(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectEdwardsImpoSum(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectEdwardsExpoSum")
	public ResponseEntity<?> selectEdwardsExpoSum(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectEdwardsExpoSum(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveImpoCommentMaster")
	public ResponseEntity<?> saveImpoCommentMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			args.put("userNm",userNm);
			args.put("currentDatetime",currentDatetime);
			long result = edwardsManagementService.updateImpoCommentMaster(args);
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveImpoNewCommentMaster")
	public ResponseEntity<?> saveImpoNewCommentMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			args.put("userNm",userNm);
			args.put("currentDatetime",currentDatetime);
			long result = edwardsManagementService.updateImpoNewCommentMaster(args);
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectSchedule")
	public ResponseEntity<?> selectSchedule(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectSchedule(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectNewSchedule")
	public ResponseEntity<?> selectNewSchedule(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectNewSchedule(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectNewSchedule1")
	public ResponseEntity<?> selectNewSchedule1(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectNewSchedule1(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectItemExemDescList")
	public ResponseEntity<?> selectItemExemDescList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectItemExemDescList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectDemdPlanItem")
	public ResponseEntity<?> selectDemdPlanItem(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectDemdPlanItem(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveDemdPlanItem")
	public ResponseEntity<?> saveDemdPlanItem(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			args.put("userNm",userNm);
			args.put("currentDatetime",currentDatetime);
			long result = edwardsManagementService.updateDemdPlanItem(args);
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveExemDesc")
	public ResponseEntity<?> saveExemDesc(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			args.put("userNm",userNm);
			args.put("currentDatetime",currentDatetime);
			List<Map> list2 = edwardsManagementService.selectMaxExemDesc(args);
			if(list2.get(0).get("EXEM_SEQNO").equals(0)){
				args.put("EXEM_SEQNO","1");
				long result = edwardsManagementService.insertExemDesc(args);
				return new ResponseEntity<>(result, HttpStatus.OK);
			}else{
				args.put("EXEM_SEQNO",list2.get(0).get("EXEM_SEQNO"));
				long result = edwardsManagementService.insertExemDesc(args);
				return new ResponseEntity<>(result, HttpStatus.OK);
			}
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveImptInv")
	public ResponseEntity<?> saveImptInv(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			args.put("userNm",userNm);
			args.put("currentDatetime",currentDatetime);
			long result = edwardsManagementService.updateImptInv(args);
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectExemDesc")
	public ResponseEntity<?> selectExemDesc(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectExemDesc(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/updateExemDesc")
	public ResponseEntity<?> updateExemDesc(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			args.put("userNm",userNm);
			args.put("currentDatetime",currentDatetime);
			long result = edwardsManagementService.updateExemDesc(args);
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectExecImptList")
	public ResponseEntity<?> selectExecImptList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectExecImptList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveExpoOrder")
	public ResponseEntity<?> saveExpoOrder(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String KEY_ED_EXPT_ORDR = args.containsKey("KEY_ED_EXPT_ORDR") ? stringValueOf(args.get("KEY_ED_EXPT_ORDR")) : "";
			String INV_NO1 			= args.containsKey("INV_NO1") ? stringValueOf(args.get("INV_NO1")) : "";
			String INV_NO2 			= args.containsKey("INV_NO2") ? stringValueOf(args.get("INV_NO2")) : "";
			String OBJ_NAT 			= args.containsKey("Expo_MokJuk_Code") ? stringValueOf(args.get("Expo_MokJuk_Code")) : "";
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String userMail			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_MAIL));
			String userKey			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			String currentYearM		= CmmnUtils.getFormatedDate("yyyyMMdd");
			args.put("ORDR_DT",currentYearM);
			args.put("DECL_DIVS_MAN","");
			args.put("OBJ_NAT",OBJ_NAT);
			args.put("Expo_geyak_no1",INV_NO1);
			args.put("Expo_geyak_no2",INV_NO2);
			args.put("MoveYN","N");
			args.put("useYn","Y");
			args.put("DECL_DDAY",userKey);
			if(KEY_ED_EXPT_ORDR.equals("")){
				args.put("addUserId",userKey);
				args.put("addUserNm",userNm);
				args.put("addDtm",currentDatetime);
				List<Map> list2 = edwardsManagementService.selectMaxOrdr(args);
				if(list2.get(0).get("max").equals(currentYearM)){
					args.put("EXPT_ORDR_MNG_NO","OB"+currentYearM+list2.get(0).get("EXPT_ORDR_MNG_NO"));
					args.put("Expo_chamjo_no","OB"+currentYearM+list2.get(0).get("EXPT_ORDR_MNG_NO"));
					long result = edwardsManagementService.insertExpoOrder(args);
					return new ResponseEntity<>(result, HttpStatus.OK);
				}else{
					args.put("EXPT_ORDR_MNG_NO","OB"+currentYearM+"000001");
					args.put("Expo_chamjo_no","OB"+currentYearM+"000001");
					long result = edwardsManagementService.insertExpoOrder(args);
					return new ResponseEntity<>(result, HttpStatus.OK);
				}
			}else{
				args.put("editUserId",userKey);
				args.put("editUserNm",userNm);
				args.put("editDtm",currentDatetime);
				long result = edwardsManagementService.updateExpoOrder(args);
				return new ResponseEntity<>(result, HttpStatus.OK);
			}
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveImpoOrder")
	public ResponseEntity<?> saveImpoOrder(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String KEY_ED_IMPT_ORDR = args.containsKey("KEY_ED_IMPT_ORDR") ? stringValueOf(args.get("KEY_ED_IMPT_ORDR")) : "";
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String userMail			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_MAIL));
			String userKey			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			String currentYearM		= CmmnUtils.getFormatedDate("yyyyMMdd");
			args.put("ORDR_DT",currentYearM);
			args.put("OWN_GODS_DIVS_MAN",userMail);
			args.put("OWN_GODS_DIVS_MAN_NM",userNm);
			args.put("DECL_DIVS_MAN","");
			args.put("DECL_DIVS_MAN_NM","");
			args.put("MoveYN","N");
			args.put("useYn","Y");
			if(KEY_ED_IMPT_ORDR.equals("")){
				args.put("addUserId",userKey);
				args.put("addUserNm",userNm);
				args.put("addDtm",currentDatetime);
				List<Map> list2 = edwardsManagementService.selectMaxImOrdr(args);
				if(list2.get(0).get("max").equals(currentYearM)){
					args.put("IMPT_ORDR_MNG_NO","IB"+currentYearM+list2.get(0).get("IMPT_ORDR_MNG_NO"));
					long result = edwardsManagementService.insertImpoOrder(args);
					return new ResponseEntity<>(result, HttpStatus.OK);
				}else{
					args.put("IMPT_ORDR_MNG_NO","IB"+currentYearM+"000001");
					long result = edwardsManagementService.insertImpoOrder(args);
					return new ResponseEntity<>(result, HttpStatus.OK);
				}
			}else{
				args.put("editUserId",userKey);
				args.put("editUserNm",userNm);
				args.put("editDtm",currentDatetime);
				long result = edwardsManagementService.updateImpoOrder(args);
				return new ResponseEntity<>(result, HttpStatus.OK);
			}
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveImpoInv")
	public ResponseEntity<?> saveImpoInv(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String KEY_ED_IMPT_INV  = args.containsKey("KEY_ED_IMPT_INV") ? stringValueOf(args.get("KEY_ED_IMPT_INV")) : "";
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String userKey			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			if(KEY_ED_IMPT_INV.equals("")){
				args.put("addUserId",userKey);
				args.put("addUserNm",userNm);
				args.put("addDtm",currentDatetime);
				List<Map> list2 = edwardsManagementService.selectMaxImptInv(args);
				if(!list2.get(0).get("IMPT_INV_SEQNO").equals("001")){
					args.put("IMPT_INV_SEQNO",list2.get(0).get("IMPT_INV_SEQNO"));
					long result = edwardsManagementService.insertImpoInv(args);
					return new ResponseEntity<>(result, HttpStatus.OK);
				}else{
					args.put("IMPT_INV_SEQNO","001");
					long result = edwardsManagementService.insertImpoInv(args);
					return new ResponseEntity<>(result, HttpStatus.OK);
				}
			}else{
				args.put("editUserId",userKey);
				args.put("editUserNm",userNm);
				args.put("editDtm",currentDatetime);
				long result = edwardsManagementService.updateImpoInv1(args);
				return new ResponseEntity<>(result, HttpStatus.OK);
			}
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveImpoInv1")
	public ResponseEntity<?> saveImpoInv1(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String userKey			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			args.put("editUserId",userKey);
			args.put("editUserNm",userNm);
			args.put("editDtm",currentDatetime);
			long result = edwardsManagementService.updateImpoInv2(args);
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImportStatusList")
	public ResponseEntity<?> selectImportStatusList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			String _defaultDB 	= args.containsKey("_defaultDB") ? stringValueOf(args.get("_defaultDB")) : "";
			String USERGRADE 	= args.containsKey("USERGRADE") ? stringValueOf(args.get("USERGRADE")) : "";
			String taxNum 		= args.containsKey("taxNum") ? stringValueOf(args.get("taxNum")) : "";
			String ID 			= args.containsKey("ID") ? stringValueOf(args.get("ID")) : "";
			String USERID 		= args.containsKey("USERID") ? stringValueOf(args.get("USERID")) : "";

			List<Map> list = new ArrayList<>();
			List<Map> list2 = new ArrayList<>();
			Map map = new HashMap();
			map.put("userId", ID);
			list2 = systemManagementService.selectDefaultDBList(map);
			for (int i = 0, n = list2.size(); i < n; i++) {
				args.put("_defaultDB",list2.get(i).get("defaultDB"));
				list.addAll(edwardsManagementService.selectImportStatusList(args));
			}
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImportStatusList1")
	public ResponseEntity<?> selectImportStatusList1(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			String _defaultDB 	= args.containsKey("_defaultDB") ? stringValueOf(args.get("_defaultDB")) : "";
			String USERGRADE 	= args.containsKey("USERGRADE") ? stringValueOf(args.get("USERGRADE")) : "";
			String taxNum 		= args.containsKey("taxNum") ? stringValueOf(args.get("taxNum")) : "";
			String ID 			= args.containsKey("ID") ? stringValueOf(args.get("ID")) : "";
			String USERID 		= args.containsKey("USERID") ? stringValueOf(args.get("USERID")) : "";

			List<Map> list = new ArrayList<>();
			List<Map> list2 = new ArrayList<>();
			Map map = new HashMap();
			map.put("userId", ID);
			list2 = systemManagementService.selectDefaultDBList(map);
			for (int i = 0, n = list2.size(); i < n; i++) {
				args.put("_defaultDB",list2.get(i).get("defaultDB"));
				list.addAll(edwardsManagementService.selectImportStatusList1(args));
			}
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImportStatusDetail1")
	public ResponseEntity<?> selectImportStatusDetail1(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			List<Map> list = new ArrayList<>();
			list = edwardsManagementService.selectImportStatusDetail1(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImportStatusDetail2")
	public ResponseEntity<?> selectImportStatusDetail2(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			List<Map> list = new ArrayList<>();
			list = edwardsManagementService.selectImportStatusDetail2(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectExportStatusList")
	public ResponseEntity<?> selectExportStatusList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			String _defaultDB 	= args.containsKey("_defaultDB") ? stringValueOf(args.get("_defaultDB")) : "";
			String USERGRADE 	= args.containsKey("USERGRADE") ? stringValueOf(args.get("USERGRADE")) : "";
			String taxNum 		= args.containsKey("taxNum") ? stringValueOf(args.get("taxNum")) : "";
			String ID 			= args.containsKey("ID") ? stringValueOf(args.get("ID")) : "";
			String USERID 		= args.containsKey("USERID") ? stringValueOf(args.get("USERID")) : "";

			List<Map> list = new ArrayList<>();
			List<Map> list2 = new ArrayList<>();
			Map map = new HashMap();
			map.put("userId", ID);
			list2 = systemManagementService.selectDefaultDBList(map);
			for (int i = 0, n = list2.size(); i < n; i++) {
				args.put("_defaultDB",list2.get(i).get("defaultDB"));
				list.addAll(edwardsManagementService.selectExportStatusList(args));
			}
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectExportDeclarationDetailList")
	public ResponseEntity<?> selectExportDeclarationDetailList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			checkPagingParamsForMapper(args);
			List<Map> list = edwardsManagementService.selectExportDeclarationDetailList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectExportDeclarationSubDetailList")
	public ResponseEntity<?> selectExportDeclarationSubDetailList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			checkPagingParamsForMapper(args);
			List<Map> list = edwardsManagementService.selectExportDeclarationSubDetailList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectExpoStatisticListCount")
	public ResponseEntity<?> selectExpoStatisticListCount(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectExpoStatisticListCount(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectExpoStatisticList")
	public ResponseEntity<?> selectExpoStatisticList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectExpoStatisticList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectExpoStatisticLanListCount")
	public ResponseEntity<?> selectExpoStatisticLanListCount(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectExpoStatisticLanListCount(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectExpoStatisticLanList")
	public ResponseEntity<?> selectExpoStatisticLanList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list1 = edwardsManagementService.selectExpoStatisticLanList(args);
			List<?> result = list1.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectExpoStatisticItemListCount")
	public ResponseEntity<?> selectExpoStatisticItemListCount(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectExpoStatisticItemListCount(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectExpoStatisticItemList")
	public ResponseEntity<?> selectExpoStatisticItemList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list1 = edwardsManagementService.selectExpoStatisticItemList(args);
			List<?> result = list1.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectExpoTeukStatisticList")
	public ResponseEntity<?> selectExpoTeukStatisticList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectExpoTeukStatisticList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectExpoTeukStatisticLanList")
	public ResponseEntity<?> selectExpoTeukStatisticLanList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectExpoTeukStatisticLanList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectExpoTeukStatisticItemList")
	public ResponseEntity<?> selectExpoTeukStatisticItemList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectExpoTeukStatisticItemList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImpoCountCheck")
	public ResponseEntity<?> selectImpoCountCheck(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectImpoCountCheck(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectSeyulCheck")
	public ResponseEntity<?> selectSeyulCheck(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectSeyulCheck(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectWonsanjiCheck")
	public ResponseEntity<?> selectWonsanjiCheck(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectWonsanjiCheck(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectCoNo")
	public ResponseEntity<?> selectCoNo(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectCoNo(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectRcmdInfo")
	public ResponseEntity<?> selectRcmdInfo(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectRcmdInfo(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveDemdCodeItemMaster")
	public ResponseEntity<?> saveDemdCodeItemMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String userKey			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			args.put("addUserId",userKey);
			args.put("addUserNm",userNm);
			args.put("addDtm",currentDatetime);
			long result = edwardsManagementService.insertDemdCodeItem(args);
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveReExpoMaster")
	public ResponseEntity<?> saveReExpoMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String KEY_ED_REEXPOBJCLOSE_ORDR 	= args.containsKey("KEY_ED_REEXPOBJCLOSE_ORDR") ? stringValueOf(args.get("KEY_ED_REEXPOBJCLOSE_ORDR")) : "";
			String userNm						= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String userKey						= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String currentDatetime 				= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			String currentYmd 					= CmmnUtils.getFormatedDate("yyyyMMdd");
			args.put("userNm",userNm);
			args.put("currentDatetime",currentDatetime);
			if(KEY_ED_REEXPOBJCLOSE_ORDR.equals("")){
				args.put("addUserId",userKey);
				args.put("addUserNm",userNm);
				args.put("addDtm",currentDatetime);
				List<Map> list2 = edwardsManagementService.selectMaxReExpo(args);
				if(list2.get(0).get("max").equals(currentYmd)){
					args.put("ORDR_NO","IJ"+list2.get(0).get("ORDR_NO"));
					String ORDR_NO 	= stringValueOf(args.get("ORDR_NO"));
					Map map = new HashMap();
					map.put("ORDR_NO", ORDR_NO);
					long result = edwardsManagementService.insertReExpoMaster(args);
					return new ResponseEntity<>(map, HttpStatus.OK);
				}else{
					args.put("ORDR_NO","IJ"+currentYmd+"01");
					String ORDR_NO 	= stringValueOf(args.get("ORDR_NO"));
					Map map = new HashMap();
					map.put("ORDR_NO", ORDR_NO);
					long result = edwardsManagementService.insertReExpoMaster(args);
					return new ResponseEntity<>(map, HttpStatus.OK);
				}
			}else{
				args.put("editUserId",userKey);
				args.put("editUserNm",userNm);
				args.put("editDtm",currentDatetime);
				long result = edwardsManagementService.updateReExpoMaster(args);
				return new ResponseEntity<>(result, HttpStatus.OK);
			}
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/insertReExpoDetail")
	public ResponseEntity<?> insertReExpoDetail(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String userKey			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String IMPT_DECL_NO 	= args.containsKey("IMPT_DECL_NO") ? stringValueOf(args.get("IMPT_DECL_NO")) : "";
			String LAN 				= args.containsKey("LAN") ? stringValueOf(args.get("LAN")) : "";
			String HNG 				= args.containsKey("HNG") ? stringValueOf(args.get("HNG")) : "";
			String BL_NO 			= args.containsKey("BL_NO") ? stringValueOf(args.get("BL_NO")) : "";
			String Gbn 				= args.containsKey("Gbn") ? stringValueOf(args.get("Gbn")) : "";
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			if(BL_NO.equals("")){
				if(Gbn.equals("import")){
					List<Map> list = edwardsManagementService.selectImptItem(args);
					args.put("BL_NO",list.get(0).get("BL_NO"));
					args.put("ITEM_CD",list.get(0).get("ITEM_CD"));
					args.put("ITEM_NM",list.get(0).get("ITEM_NM"));
				}else{
					List<Map> list = edwardsManagementService.selectExptItem(args);
					args.put("BL_NO",list.get(0).get("INV_NO1"));
					args.put("ITEM_CD",list.get(0).get("PROD_CD"));
					args.put("ITEM_NM",list.get(0).get("PROD_NM"));
				}
			}
			args.put("addUserId",userKey);
			args.put("addUserNm",userNm);
			args.put("addDtm",currentDatetime);
			List<Map> list2 = edwardsManagementService.selectMaxDtlSeq(args);
			args.put("DTL_SEQNO",list2.get(0).get("max"));
			long result = edwardsManagementService.insertReExpoDetail(args);
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/deleteReExpoDetail")
	public ResponseEntity<?> deleteReExpoDetail(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String userNm						= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String userKey						= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String currentDatetime 				= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			args.put("editUserId",userKey);
			args.put("editUserNm",userNm);
			args.put("editDtm",currentDatetime);
			long result = edwardsManagementService.deleteReExpoDetail(args);
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectDrawCheck1")
	public ResponseEntity<?> selectDrawCheck1(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectDrawCheck1(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectDrawCheck2")
	public ResponseEntity<?> selectDrawCheck2(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectDrawCheck2(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectDrawCheck3")
	public ResponseEntity<?> selectDrawCheck3(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectDrawCheck3(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectDrawCheck4")
	public ResponseEntity<?> selectDrawCheck4(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectDrawCheck4(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectCheckQty1")
	public ResponseEntity<?> selectCheckQty1(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectCheckQty1(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImpoStatisticListCount")
	public ResponseEntity<?> selectImpoStatisticListCount(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectImpoStatisticListCount(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImpoStatisticList")
	public ResponseEntity<?> selectImpoStatisticList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectImpoStatisticList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImpoStatisticLanListCount")
	public ResponseEntity<?> selectImpoStatisticLanListCount(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectImpoStatisticLanListCount(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImpoStatisticLanList")
	public ResponseEntity<?> selectImpoStatisticLanList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectImpoStatisticLanList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImpoStatisticItemListCount")
	public ResponseEntity<?> selectImpoStatisticItemListCount(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectImpoStatisticItemListCount(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImpoStatisticItemList")
	public ResponseEntity<?> selectImpoStatisticItemList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectImpoStatisticItemList(args, sqlSession);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImpoTeukStatisticList")
	public ResponseEntity<?> selectImpoTeukStatisticList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectImpoTeukStatisticList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImpoTeukStatisticLanList")
	public ResponseEntity<?> selectImpoTeukStatisticLanList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectImpoTeukStatisticLanList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImpoTeukStatisticItemList")
	public ResponseEntity<?> selectImpoTeukStatisticItemList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectImpoTeukStatisticItemList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImpoInvListCount")
	public ResponseEntity<?> selectImpoInvListCount(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectImpoInvListCount(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImpoInvList")
	public ResponseEntity<?> selectImpoInvList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectImpoInvList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImpoExpressInvListCount")
	public ResponseEntity<?> selectImpoExpressInvListCount(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectImpoExpressInvListCount(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImpoExpressInvList")
	public ResponseEntity<?> selectImpoExpressInvList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectImpoExpressInvList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/updateImpoExpressInvList")
	public ResponseEntity<?> updateImpoExpressInvList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String userId			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			args.put("userId",userId);
			args.put("userNm",userNm);
			args.put("currentDatetime",currentDatetime);
			long result = edwardsManagementService.updateImpoExpressInvList(args);
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImpoGamListCount")
	public ResponseEntity<?> selectImpoGamListCount(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectImpoGamListCount(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImpoGamList")
	public ResponseEntity<?> selectImpoGamList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectImpoGamList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectCoExpoIssueList")
	public ResponseEntity<?> selectCoExpoIssueList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectCoExpoIssueList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/coExpoExcel")
	public void coExpoExcel(HttpServletRequest request, @RequestParam String FROM_DT, @RequestParam String TO_DT,
		    @RequestParam String INV_CO_NO, @RequestParam String FTA_CD, @RequestParam String INV_NO1, @RequestParam String PROD_CD,
		    @RequestParam String wonNo, @RequestParam String taxNum, HttpServletResponse response) throws UnsupportedEncodingException{
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return;

		ExCoExcel excelResultHandler = null;

		try {
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			excelResultHandler = new ExCoExcel(response);

			Map map = new HashMap();
			map.put("FROM_DT", FROM_DT);
			map.put("TO_DT", TO_DT);
			map.put("INV_CO_NO", INV_CO_NO);
			map.put("FTA_CD", FTA_CD);
			map.put("INV_NO1", INV_NO1);
			map.put("PROD_CD", PROD_CD);
			map.put("wonNo", wonNo);
			map.put("taxNum", taxNum);

			sessionTempDao.exCo("com.edwards.biz.edwardsManagement.EdwardsMapper.selectCoExpoIssueList", map, excelResultHandler);
		}catch(Exception ex){
			throw new RuntimeException(ex);
		}finally{
			if(excelResultHandler != null){
				try{ excelResultHandler.close();}catch(Exception ex){}
			}
		}
	}

	@RequestMapping(value = "/selectCoImpoIssueList")
	public ResponseEntity<?> selectCoImpoIssueList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectCoImpoIssueList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/coImpoExcel")
	public void coImpoExcel(HttpServletRequest request, @RequestParam String FROM_DT, @RequestParam String TO_DT,
		    @RequestParam String OWN_GODS_NM, @RequestParam String FTA_CD, @RequestParam String INV_NO, @RequestParam String BL_NO,
		    @RequestParam String wonNo, @RequestParam String taxNum, HttpServletResponse response) throws UnsupportedEncodingException{
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return;

		ImCoExcel excelResultHandler = null;

		try {
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			excelResultHandler = new ImCoExcel(response);

			Map map = new HashMap();
			map.put("FROM_DT", FROM_DT);
			map.put("TO_DT", TO_DT);
			map.put("OWN_GODS_NM", OWN_GODS_NM);
			map.put("FTA_CD", FTA_CD);
			map.put("INV_NO", INV_NO);
			map.put("BL_NO", BL_NO);
			map.put("wonNo", wonNo);
			map.put("taxNum", taxNum);

			sessionTempDao.imCo("com.edwards.biz.edwardsManagement.EdwardsMapper.selectCoImpoIssueList", map, excelResultHandler);
		}catch(Exception ex){
			throw new RuntimeException(ex);
		}finally{
			if(excelResultHandler != null){
				try{ excelResultHandler.close();}catch(Exception ex){}
			}
		}
	}

	@RequestMapping(value = "/selectDrawMaster")
	public ResponseEntity<?> selectDrawMaster(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectDrawMaster(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/threeMonthRmidQty")
	public ResponseEntity<?> threeMonthRmidQty(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.threeMonthRmidQty(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectBomDrawList")
	public ResponseEntity<?> selectBomDrawList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectBomDrawList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectBomDrawMngNo")
	public ResponseEntity<?> selectBomDrawMngNo(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String currentYear = CmmnUtils.getFormatedDate("yyyy");

			List<Map> list2 = edwardsManagementService.selectMaxBomDraw(args);
			if(list2.get(0).get("max").equals(currentYear)){
				args.put("BOM_DRAW_MNG_NO",list2.get(0).get("BOM_DRAW_MNG_NO"));
				String BOM_DRAW_MNG_NO 	= stringValueOf(args.get("BOM_DRAW_MNG_NO"));
				Map map = new HashMap();
				map.put("BOM_DRAW_MNG_NO", BOM_DRAW_MNG_NO);
				return new ResponseEntity<>(map, HttpStatus.OK);
			}else{
				args.put("BOM_DRAW_MNG_NO",currentYear+"000001");
				String BOM_DRAW_MNG_NO 	= stringValueOf(args.get("BOM_DRAW_MNG_NO"));
				Map map = new HashMap();
				map.put("BOM_DRAW_MNG_NO", BOM_DRAW_MNG_NO);
				return new ResponseEntity<>(map, HttpStatus.OK);
			}
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/insertBomDraw")
	public ResponseEntity<?> insertBomDraw(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String BOM_DRAW_MNG_NO 	= args.containsKey("BOM_DRAW_MNG_NO") ? stringValueOf(args.get("BOM_DRAW_MNG_NO")) : "";
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String userKey			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			String currentYear 		= CmmnUtils.getFormatedDate("yyyy");
			args.put("BOM_DRAW_MNG_NO",BOM_DRAW_MNG_NO);
			args.put("addUserId",userKey);
			args.put("addUserNm",userNm);
			args.put("addDtm",currentDatetime);

			List<Map> list2 = edwardsManagementService.selectMaxBomDrawSeq(args);
			if(list2.get(0).get("SEQNO").equals(0)){
				args.put("SEQNO","1");
				long result = edwardsManagementService.insertBomDraw(args);
				return new ResponseEntity<>(result, HttpStatus.OK);
			}else{
				args.put("SEQNO",list2.get(0).get("SEQNO"));
				long result = edwardsManagementService.insertBomDraw(args);
				return new ResponseEntity<>(result, HttpStatus.OK);
			}
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImpoGamExecList")
	public ResponseEntity<?> selectImpoGamExecList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectImpoGamExecList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImpoGamExecListCount")
	public ResponseEntity<?> selectImpoGamExecListCount(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectImpoGamExecListCount(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImpoNoGamList")
	public ResponseEntity<?> selectImpoNoGamList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectImpoNoGamList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImpoNoGamListCount")
	public ResponseEntity<?> selectImpoNoGamListCount(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectImpoNoGamListCount(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImpoNoGamExecList")
	public ResponseEntity<?> selectImpoNoGamExecList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectImpoNoGamExecList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImpoNoGamExecListCount")
	public ResponseEntity<?> selectImpoNoGamExecListCount(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectImpoNoGamExecListCount(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectReExpobjItemMasterAll")
	public ResponseEntity<?> selectReExpobjItemMasterAll(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectReExpobjItemMasterAll(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectExpoDrawStatisticList")
	public ResponseEntity<?> selectExpoDrawStatisticList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectExpoDrawStatisticList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectExpoDrawStatisticListCount")
	public ResponseEntity<?> selectExpoDrawStatisticListCount(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectExpoDrawStatisticListCount(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/expoStatus")
	public void expoStatus(HttpServletRequest request, @RequestParam String _DateType, @RequestParam String strFromDate,
		    @RequestParam String strToDate, @RequestParam String expoGumaejaSangho, @RequestParam String expoIvNo,
		    @RequestParam String expoSingoNo, @RequestParam String expoLoadedYn, @RequestParam String _defaultDB,
		    @RequestParam String taxNum, HttpServletResponse response) throws UnsupportedEncodingException{
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return;

		ExStatusExcel excelResultHandler = null;

		try {
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			excelResultHandler = new ExStatusExcel(response);

			Map map = new HashMap();
			map.put("_DateType", _DateType);
			map.put("strFromDate", strFromDate);
			map.put("strToDate", strToDate);
			map.put("expoGumaejaSangho", expoGumaejaSangho);
			map.put("expoIvNo", expoIvNo);
			map.put("expoSingoNo", expoSingoNo);
			map.put("expoLoadedYn", expoLoadedYn);
			map.put("_defaultDB", _defaultDB);
			map.put("taxNum", taxNum);

			sessionTempDao.exStatus("com.edwards.biz.edwardsManagement.EdwardsMapper.selectExportStatusList", map, excelResultHandler);
		}catch(Exception ex){
			throw new RuntimeException(ex);
		}finally{
			if(excelResultHandler != null){
				try{ excelResultHandler.close();}catch(Exception ex){}
			}
		}
	}

	@RequestMapping(value = "/selectCommonCode")
	public ResponseEntity<?> selectCommonCode(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectCommonCode(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveBomDraw")
	public ResponseEntity<?> saveBomDraw(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String userKey			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			args.put("editUserId",userKey);
			args.put("editUserNm",userNm);
			args.put("editDtm",currentDatetime);
			long result = edwardsManagementService.updateBomDraw(args);
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

//	@RequestMapping(value = "/excelUp", method = RequestMethod.POST)
//    public void excelUp(HttpServletRequest request, MultipartHttpServletRequest mRequest) throws Exception{
//        Map insMap = new HashMap();
//
//        try { // MultipartHttpServletRequest 생성
//        	String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
//			String userKey			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
//			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
//
//        	MultiValueMap<String, MultipartFile> map = mRequest.getMultiFileMap();
//    		Iterator<String> iter = map.keySet().iterator();
//
//    		List<MultipartFile> mfile = null;
//            String fieldName = "";
//
//            // 값이 나올때까지
//            while (iter.hasNext()) {
//                fieldName = iter.next().toString(); // 내용을 가져와서
//                mfile = map.get(fieldName);
//                String origName;
//                for (MultipartFile mpf : mfile){
//	                origName = new String(mpf.getOriginalFilename().getBytes("8859_1"), "UTF-8"); //한글꺠짐 방지 // 파일명이 없다면
//
//	                Workbook wbs = CommExcel.getWorkbook(origName);
//
//	                Sheet sheet = (Sheet) wbs.getSheetAt(0);
//
//	                Map args = new HashMap();
//	                String currentYear = CmmnUtils.getFormatedDate("yyyy");
//	                String BOM_DRAW_MNG_NO ;
//	                List<Map> list2 = edwardsManagementService.selectMaxBomDraw(args);
//	    			if(list2.get(0).get("max").equals(currentYear)){
//	    				args.put("BOM_DRAW_MNG_NO",list2.get(0).get("BOM_DRAW_MNG_NO"));
//	    				BOM_DRAW_MNG_NO 	= stringValueOf(args.get("BOM_DRAW_MNG_NO"));
//	    			}else{
//	    				args.put("BOM_DRAW_MNG_NO",currentYear+"000001");
//	    				BOM_DRAW_MNG_NO 	= stringValueOf(args.get("BOM_DRAW_MNG_NO"));
//	    			}
//
//	                //excel file 두번쨰줄부터 시작
//	                for (int i = sheet.getFirstRowNum() + 1; i <= sheet.getLastRowNum(); i++) {
//	                    Row row = sheet.getRow(i);
//
//	                    insMap.put("GRP_COMP_CD", "3128112960");
//	                    insMap.put("BOM_DRAW_MNG_NO", BOM_DRAW_MNG_NO);
//	                    insMap.put("SEQNO",  Integer.toString(i));
//	                    insMap.put("JEPUM_CD", ""+CommExcel.cellValue(row.getCell(0)));
//	                    insMap.put("FrDay", ""+CommExcel.cellValue(row.getCell(1)));
//	                    insMap.put("ToDay", ""+CommExcel.cellValue(row.getCell(2)));
//	                    insMap.put("LevelUsg", ""+CommExcel.cellValue(row.getCell(3)));
//	                    insMap.put("RgCode", ""+CommExcel.cellValue(row.getCell(4)));
//	                    insMap.put("ITEM_CD", ""+CommExcel.cellValue(row.getCell(5)));
//	                    insMap.put("Basic", ""+CommExcel.cellValue(row.getCell(6)));
//	                    insMap.put("BasicUsg", ""+CommExcel.cellValue(row.getCell(7)));
//	                    insMap.put("RefRate", ""+CommExcel.cellValue(row.getCell(8)));
//	                    insMap.put("AgDivi", ""+CommExcel.cellValue(row.getCell(9)));
//	                    insMap.put("AgRate", ""+CommExcel.cellValue(row.getCell(10)));
//	                    insMap.put("UsgCal", ""+CommExcel.cellValue(row.getCell(11)));
//	                    insMap.put("JEPUM_QTY_UNIT", ""+CommExcel.cellValue(row.getCell(12)));
//	                    insMap.put("ITEM_QtyUnit", ""+CommExcel.cellValue(row.getCell(13)));
//	                    insMap.put("addUserId", userKey);
//	                    insMap.put("addUserNm", userNm);
//	                    insMap.put("addDtm", currentDatetime);
//
//	                    //신규삽입
//	                    long result = edwardsManagementService.insertDB(insMap);
//	                }
//                }
//            }
//        }catch(UnsupportedEncodingException e) { // TODO Auto-generated catch block
//            e.printStackTrace();
//        }catch(IllegalStateException e) { // TODO Auto-generated catch block
//            e.printStackTrace();
//        }catch(IOException e) { // TODO Auto-generated catch block
//            e.printStackTrace();
//        }
//    }

	@RequestMapping(value = "/selectExportKpiList")
	public ResponseEntity<?> selectExportKpiList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectExportKpiList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/expoKpi")
	public void expoKpi(HttpServletRequest request, @RequestParam String _DateType, @RequestParam String strFromDate1,
		    @RequestParam String strToDate1, @RequestParam String invNo, @RequestParam String expoSingoNo,
		    @RequestParam String Plant, @RequestParam String Result, HttpServletResponse response) throws UnsupportedEncodingException{
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return;

		ExKpiExcel excelResultHandler = null;

		try {
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			excelResultHandler = new ExKpiExcel(response);

			Map map = new HashMap();
			map.put("_DateType", _DateType);
			map.put("strFromDate1", strFromDate1);
			map.put("strToDate1", strToDate1);
			map.put("invNo", invNo);
			map.put("expoSingoNo", expoSingoNo);
			map.put("Plant", Plant);
			map.put("Result", Result);

			sessionTempDao.exKpi("com.edwards.biz.edwardsManagement.EdwardsMapper.selectExportKpiList", map, excelResultHandler);
		}catch(Exception ex){
			throw new RuntimeException(ex);
		}finally{
			if(excelResultHandler != null){
				try{ excelResultHandler.close();}catch(Exception ex){}
			}
		}
	}

	@RequestMapping(value = "/selectExpoDrawStatisticList1")
	public ResponseEntity<?> selectExpoDrawStatisticList1(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectExpoDrawStatisticList1(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectExpoDrawStatisticList1Count")
	public ResponseEntity<?> selectExpoDrawStatisticList1Count(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectExpoDrawStatisticList1Count(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/downloadEx1")
	public void downloadEx1(HttpServletRequest request, @RequestParam String FROM_DT, @RequestParam String TO_DT,
			@RequestParam String expo_gumaeja_sangho, @RequestParam String expo_singo_no, @RequestParam String expo_whaju_sangho,
			@RequestParam String invoiceNo, @RequestParam String expo_mokjuk_code,	@RequestParam String exlan_hs, @RequestParam String expo_bl_no,
			@RequestParam String expum_jepum_code, @RequestParam String taxNum, HttpServletResponse response) throws UnsupportedEncodingException{
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return;

		ExStatisticsExcel excelResultHandler = null;

		try {
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			excelResultHandler = new ExStatisticsExcel(response);

			Map map = new HashMap();
			map.put("FROM_DT", FROM_DT);
			map.put("TO_DT", TO_DT);
			map.put("expo_gumaeja_sangho", expo_gumaeja_sangho);
			map.put("expo_singo_no", expo_singo_no);
			map.put("expo_whaju_sangho", expo_whaju_sangho);
			map.put("invoiceNo", invoiceNo);
			map.put("expo_mokjuk_code", expo_mokjuk_code);
			map.put("exlan_hs", exlan_hs);
			map.put("expo_bl_no", expo_bl_no);
			map.put("expum_jepum_code", expum_jepum_code);
			map.put("taxNum", taxNum);

			sessionTempDao.exStatistics("com.edwards.biz.edwardsManagement.EdwardsMapper.selectExpoStatisticList", map, excelResultHandler);
		}catch(Exception ex){
			throw new RuntimeException(ex);
		}finally{
			if(excelResultHandler != null){
				try{ excelResultHandler.close();}catch(Exception ex){}
			}
		}
	}

	@RequestMapping(value = "/downloadEx2")
	public void downloadEx2(HttpServletRequest request, @RequestParam String FROM_DT, @RequestParam String TO_DT,
			@RequestParam String expo_gumaeja_sangho, @RequestParam String expo_singo_no, @RequestParam String expo_whaju_sangho,
			@RequestParam String invoiceNo, @RequestParam String expo_mokjuk_code,	@RequestParam String exlan_hs, @RequestParam String expo_bl_no,
			@RequestParam String expum_jepum_code, @RequestParam String taxNum, HttpServletResponse response) throws UnsupportedEncodingException{
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return;

		ExStatisticsLanExcel excelResultHandler = null;

		try {
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			excelResultHandler = new ExStatisticsLanExcel(response);

			Map map = new HashMap();
			map.put("FROM_DT", FROM_DT);
			map.put("TO_DT", TO_DT);
			map.put("expo_gumaeja_sangho", expo_gumaeja_sangho);
			map.put("expo_singo_no", expo_singo_no);
			map.put("expo_whaju_sangho", expo_whaju_sangho);
			map.put("invoiceNo", invoiceNo);
			map.put("expo_mokjuk_code", expo_mokjuk_code);
			map.put("exlan_hs", exlan_hs);
			map.put("expo_bl_no", expo_bl_no);
			map.put("expum_jepum_code", expum_jepum_code);
			map.put("taxNum", taxNum);

			sessionTempDao.exStatisticsLan("com.edwards.biz.edwardsManagement.EdwardsMapper.selectExpoStatisticLanList", map, excelResultHandler);
		}catch(Exception ex){
			throw new RuntimeException(ex);
		}finally{
			if(excelResultHandler != null){
				try{ excelResultHandler.close();}catch(Exception ex){}
			}
		}
	}

	@RequestMapping(value = "/downloadEx3")
	public void downloadEx3(HttpServletRequest request, @RequestParam String FROM_DT, @RequestParam String TO_DT,
			@RequestParam String expo_gumaeja_sangho, @RequestParam String expo_singo_no, @RequestParam String expo_whaju_sangho,
			@RequestParam String invoiceNo, @RequestParam String expo_mokjuk_code,	@RequestParam String exlan_hs, @RequestParam String expo_bl_no,
			@RequestParam String expum_jepum_code, @RequestParam String taxNum, HttpServletResponse response) throws UnsupportedEncodingException{
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return;

		ExStatisticsModelExcel excelResultHandler = null;

		try {
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			excelResultHandler = new ExStatisticsModelExcel(response);

			Map map = new HashMap();
			map.put("FROM_DT", FROM_DT);
			map.put("TO_DT", TO_DT);
			map.put("expo_gumaeja_sangho", expo_gumaeja_sangho);
			map.put("expo_singo_no", expo_singo_no);
			map.put("expo_whaju_sangho", expo_whaju_sangho);
			map.put("invoiceNo", invoiceNo);
			map.put("expo_mokjuk_code", expo_mokjuk_code);
			map.put("exlan_hs", exlan_hs);
			map.put("expo_bl_no", expo_bl_no);
			map.put("expum_jepum_code", expum_jepum_code);
			map.put("taxNum", taxNum);

			sessionTempDao.exStatisticsModel("com.edwards.biz.edwardsManagement.EdwardsMapper.selectExpoStatisticItemList", map, excelResultHandler);
		}catch(Exception ex){
			throw new RuntimeException(ex);
		}finally{
			if(excelResultHandler != null){
				try{ excelResultHandler.close();}catch(Exception ex){}
			}
		}
	}

	@RequestMapping(value = "/downloadIm1")
	public void downloadIm1(HttpServletRequest request, @RequestParam String FROM_DT, @RequestParam String TO_DT,
			@RequestParam String EXP_CD, @RequestParam String imlan_hs, @RequestParam String IMPT_DECL_NO, @RequestParam String OWN_GODS_NM,
			@RequestParam String impo_bl_no, @RequestParam String impo_jukchl_code,	@RequestParam String imlan_gwan_gam_buho,
			@RequestParam String impum_jajae_code, @RequestParam String taxNum, HttpServletResponse response) throws UnsupportedEncodingException{
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return;

		ImStatisticsExcel excelResultHandler = null;

		try {
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			excelResultHandler = new ImStatisticsExcel(response);

			Map map = new HashMap();
			map.put("FROM_DT", FROM_DT);
			map.put("TO_DT", TO_DT);
			map.put("EXP_CD", EXP_CD);
			map.put("imlan_hs", imlan_hs);
			map.put("IMPT_DECL_NO", IMPT_DECL_NO);
			map.put("OWN_GODS_NM", OWN_GODS_NM);
			map.put("impo_bl_no", impo_bl_no);
			map.put("impo_jukchl_code", impo_jukchl_code);
			map.put("imlan_gwan_gam_buho", imlan_gwan_gam_buho);
			map.put("impum_jajae_code", impum_jajae_code);
			map.put("taxNum", taxNum);

			sessionTempDao.imStatistics("com.edwards.biz.edwardsManagement.EdwardsMapper.selectImpoStatisticList", map, excelResultHandler);
		}catch(Exception ex){
			throw new RuntimeException(ex);
		}finally{
			if(excelResultHandler != null){
				try{ excelResultHandler.close();}catch(Exception ex){}
			}
		}
	}

	@RequestMapping(value = "/downloadIm2")
	public void downloadIm2(HttpServletRequest request, @RequestParam String FROM_DT, @RequestParam String TO_DT,
			@RequestParam String EXP_CD, @RequestParam String imlan_hs, @RequestParam String IMPT_DECL_NO, @RequestParam String OWN_GODS_NM,
			@RequestParam String impo_bl_no, @RequestParam String impo_jukchl_code,	@RequestParam String imlan_gwan_gam_buho,
			@RequestParam String impum_jajae_code, @RequestParam String taxNum, HttpServletResponse response) throws UnsupportedEncodingException{
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return;

		ImStatisticsLanExcel excelResultHandler = null;

		try {
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			excelResultHandler = new ImStatisticsLanExcel(response);

			Map map = new HashMap();
			map.put("FROM_DT", FROM_DT);
			map.put("TO_DT", TO_DT);
			map.put("EXP_CD", EXP_CD);
			map.put("imlan_hs", imlan_hs);
			map.put("IMPT_DECL_NO", IMPT_DECL_NO);
			map.put("OWN_GODS_NM", OWN_GODS_NM);
			map.put("impo_bl_no", impo_bl_no);
			map.put("impo_jukchl_code", impo_jukchl_code);
			map.put("imlan_gwan_gam_buho", imlan_gwan_gam_buho);
			map.put("impum_jajae_code", impum_jajae_code);
			map.put("taxNum", taxNum);

			sessionTempDao.imStatisticsLan("com.edwards.biz.edwardsManagement.EdwardsMapper.selectImpoStatisticLanList", map, excelResultHandler);
		}catch(Exception ex){
			throw new RuntimeException(ex);
		}finally{
			if(excelResultHandler != null){
				try{ excelResultHandler.close();}catch(Exception ex){}
			}
		}
	}

	@RequestMapping(value = "/downloadIm3")
	public void downloadIm3(HttpServletRequest request, @RequestParam String FROM_DT, @RequestParam String TO_DT,
			@RequestParam String EXP_CD, @RequestParam String imlan_hs, @RequestParam String IMPT_DECL_NO, @RequestParam String OWN_GODS_NM,
			@RequestParam String impo_bl_no, @RequestParam String impo_jukchl_code,	@RequestParam String imlan_gwan_gam_buho,
			@RequestParam String impum_jajae_code, @RequestParam String taxNum, HttpServletResponse response) throws UnsupportedEncodingException{
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return;

		ImStatisticsModelExcel excelResultHandler = null;

		try {
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			excelResultHandler = new ImStatisticsModelExcel(response);

			Map map = new HashMap();
			map.put("FROM_DT", FROM_DT);
			map.put("TO_DT", TO_DT);
			map.put("EXP_CD", EXP_CD);
			map.put("imlan_hs", imlan_hs);
			map.put("IMPT_DECL_NO", IMPT_DECL_NO);
			map.put("OWN_GODS_NM", OWN_GODS_NM);
			map.put("impo_bl_no", impo_bl_no);
			map.put("impo_jukchl_code", impo_jukchl_code);
			map.put("imlan_gwan_gam_buho", imlan_gwan_gam_buho);
			map.put("impum_jajae_code", impum_jajae_code);
			map.put("taxNum", taxNum);

			sessionTempDao.imStatisticsModel("com.edwards.biz.edwardsManagement.EdwardsMapper.selectImpoStatisticItemList", map, excelResultHandler);
		}catch(Exception ex){
			throw new RuntimeException(ex);
		}finally{
			if(excelResultHandler != null){
				try{ excelResultHandler.close();}catch(Exception ex){}
			}
		}
	}

	@RequestMapping(value = "/selectReExpoList")
	public ResponseEntity<?> selectReExpoList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectReExpoList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveExpoHng")
	public ResponseEntity<?> saveExpoHng(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			args.put("userNm",userNm);
			args.put("currentDatetime",currentDatetime);
			long result = edwardsManagementService.updateExpoHng(args);
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectItemPumpCheck")
	public ResponseEntity<?> selectItemPumpCheck(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectItemPumpCheck(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "/selectOrigCheck")
	public ResponseEntity<?> selectOrigCheck(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectOrigCheck(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectMyunCheck")
	public ResponseEntity<?> selectMyunCheck(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectMyunCheck(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectMyunCheck1")
	public ResponseEntity<?> selectMyunCheck1(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectMyunCheck1(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectMyunCheck2")
	public ResponseEntity<?> selectMyunCheck2(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectMyunCheck2(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectMyunCheck3")
	public ResponseEntity<?> selectMyunCheck3(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectMyunCheck3(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectExSerialCheck")
	public ResponseEntity<?> selectExSerialCheck(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectExSerialCheck(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectExSerialCheck1")
	public ResponseEntity<?> selectExSerialCheck1(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectExSerialCheck1(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectExSerialCheck2")
	public ResponseEntity<?> selectExSerialCheck2(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectExSerialCheck2(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectExSerialCheck3")
	public ResponseEntity<?> selectExSerialCheck3(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectExSerialCheck3(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectExSerialNotCheck")
	public ResponseEntity<?> selectExSerialNotCheck(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectExSerialNotCheck(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImSerialCheck")
	public ResponseEntity<?> selectImSerialCheck(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectImSerialCheck(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImSerialCheck1")
	public ResponseEntity<?> selectImSerialCheck1(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectImSerialCheck1(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImSerialCheck2")
	public ResponseEntity<?> selectImSerialCheck2(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectImSerialCheck2(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImSerialCheck3")
	public ResponseEntity<?> selectImSerialCheck3(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectImSerialCheck3(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImSerialNotCheck")
	public ResponseEntity<?> selectImSerialNotCheck(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectImSerialNotCheck(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectReImpoList")
	public ResponseEntity<?> selectReImpoList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectReImpoList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectReImpoList1")
	public ResponseEntity<?> selectReImpoList1(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectReImpoList1(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectReImpoCheckList")
	public ResponseEntity<?> selectReImpoCheckList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectReImpoCheckList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectReExpoCheckList")
	public ResponseEntity<?> selectReExpoCheckList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectReExpoCheckList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/impoInvExcel1")
	public void impoInvExcel1(HttpServletRequest request, @RequestParam String FROM_DT, @RequestParam String TO_DT,
			@RequestParam String EXP_NM, @RequestParam String IMPT_DECL_NO, @RequestParam String OWN_GODS_NM,
			@RequestParam String BL_NO, @RequestParam String INV_NO, @RequestParam String taxNum, HttpServletResponse response) throws UnsupportedEncodingException{
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return;

		ImInvStatisticsExcel excelResultHandler = null;

		try {
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			excelResultHandler = new ImInvStatisticsExcel(response);

			Map map = new HashMap();
			map.put("FROM_DT", FROM_DT);
			map.put("TO_DT", TO_DT);
			map.put("EXP_NM", EXP_NM);
			map.put("IMPT_DECL_NO", IMPT_DECL_NO);
			map.put("OWN_GODS_NM", OWN_GODS_NM);
			map.put("BL_NO", BL_NO);
			map.put("INV_NO", INV_NO);
			map.put("taxNum", taxNum);

			sessionTempDao.imInvStatistics("com.edwards.biz.edwardsManagement.EdwardsMapper.selectImpoInvList", map, excelResultHandler);
		}catch(Exception ex){
			throw new RuntimeException(ex);
		}finally{
			if(excelResultHandler != null){
				try{ excelResultHandler.close();}catch(Exception ex){}
			}
		}
	}

	@RequestMapping(value = "/impoExpressInvExcel")
	public void impoExpressInvExcel(HttpServletRequest request, @RequestParam String FROM_DT, @RequestParam String TO_DT,
			@RequestParam String IMPT_DECL_NO, @RequestParam String OWN_GODS_NM,
			@RequestParam String BL_NO, @RequestParam String INV_NO, @RequestParam String taxNum, HttpServletResponse response) throws UnsupportedEncodingException{
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return;

		ImInvExpressExcel excelResultHandler = null;

		try {
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			excelResultHandler = new ImInvExpressExcel(response);

			Map map = new HashMap();
			map.put("FROM_DT", FROM_DT);
			map.put("TO_DT", TO_DT);
			map.put("IMPT_DECL_NO", IMPT_DECL_NO);
			map.put("OWN_GODS_NM", OWN_GODS_NM);
			map.put("BL_NO", BL_NO);
			map.put("INV_NO", INV_NO);
			map.put("taxNum", taxNum);

			sessionTempDao.imInvExpress("com.edwards.biz.edwardsManagement.EdwardsMapper.selectImpoExpressInvList", map, excelResultHandler);
		}catch(Exception ex){
			throw new RuntimeException(ex);
		}finally{
			if(excelResultHandler != null){
				try{ excelResultHandler.close();}catch(Exception ex){}
			}
		}
	}

	@RequestMapping(value = "/saveReExpo")
	public ResponseEntity<?> saveReExpo(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String userKey			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			args.put("editUserId",userKey);
			args.put("editUserNm",userNm);
			args.put("editDtm",currentDatetime);

			long result = edwardsManagementService.updateReExpo(args);
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveReExpo1")
	public ResponseEntity<?> saveReExpo1(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String userKey			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			args.put("editUserId",userKey);
			args.put("editUserNm",userNm);
			args.put("editDtm",currentDatetime);

			long result = edwardsManagementService.updateReExpo1(args);
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveReExpo2")
	public ResponseEntity<?> saveReExpo2(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String userKey			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			args.put("editUserId",userKey);
			args.put("editUserNm",userNm);
			args.put("editDtm",currentDatetime);

			long result = edwardsManagementService.updateReExpo2(args);
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveReExpo3")
	public ResponseEntity<?> saveReExpo3(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String userKey			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			args.put("editUserId",userKey);
			args.put("editUserNm",userNm);
			args.put("editDtm",currentDatetime);
			long result = edwardsManagementService.updateReExpo3(args);
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveReExpo4")
	public ResponseEntity<?> saveReExpo4(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String userKey			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			args.put("editUserId",userKey);
			args.put("editUserNm",userNm);
			args.put("editDtm",currentDatetime);

			List<Map> list = edwardsManagementService.selectReImpoList(args);
			if(list.size() > 0){
				long result = edwardsManagementService.updateReExpo3(args);
				return new ResponseEntity<>(result, HttpStatus.OK);
			}else{
				List<?> result = list.stream().collect(Collectors.toList());
				return new ResponseEntity<>(result, HttpStatus.OK);
			}
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/insertReExpo")
	public ResponseEntity<?> insertReExpo(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String userKey			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			args.put("addUserId",userKey);
			args.put("addUserNm",userNm);
			args.put("addDtm",currentDatetime);

			long result = edwardsManagementService.insertReExpo(args);
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/insertReExpo2")
	public ResponseEntity<?> insertReExpo2(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String userKey			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			args.put("addUserId",userKey);
			args.put("addUserNm",userNm);
			args.put("addDtm",currentDatetime);

			long result = edwardsManagementService.insertReExpo2(args);
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/deleteReExpo")
	public ResponseEntity<?> deleteReExpo(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String userKey			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			String KEY_ED_REEXPT_MASTER 	= stringValueOf(args.get("KEY_ED_REEXPT_MASTER1"));
			args.put("editUserId",userKey);
			args.put("editUserNm",userNm);
			args.put("editDtm",currentDatetime);

			List<Map> list = edwardsManagementService.selectReImpoList(args);
			if(list.size() > 1){
				args.put("KEY_ED_REEXPT_MASTER",KEY_ED_REEXPT_MASTER);
				args.put("useYn","N");
				long result = edwardsManagementService.updateReExpo(args);
				return new ResponseEntity<>(result, HttpStatus.OK);
			}else{
				List<?> result = list.stream().collect(Collectors.toList());
				return new ResponseEntity<>(result, HttpStatus.OK);
			}
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveReImpo")
	public ResponseEntity<?> saveReImpo(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String userKey			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			args.put("editUserId",userKey);
			args.put("editUserNm",userNm);
			args.put("editDtm",currentDatetime);

			long result = edwardsManagementService.updateReImpo(args);
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveReImpo1")
	public ResponseEntity<?> saveReImpo1(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String userKey			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			args.put("editUserId",userKey);
			args.put("editUserNm",userNm);
			args.put("editDtm",currentDatetime);

			long result = edwardsManagementService.updateReImpo1(args);
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectBomMaster1")
	public ResponseEntity<?> selectBomMaster1(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectBomMaster1(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectBomMaster1Count")
	public ResponseEntity<?> selectBomMaster1Count(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectBomMaster1Count(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/updateBomMaster1")
	public ResponseEntity<?> updateBomMaster1(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String userKey			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			String currentYear 		= CmmnUtils.getFormatedDate("yyyy");
			args.put("userKey",userKey);
			args.put("userNm",userNm);
			args.put("currentDatetime",currentDatetime);
			long result = edwardsManagementService.updateBomMaster1(args);
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

//	@RequestMapping(value = "/bomUp", method = RequestMethod.POST)
//    public void bomUp(HttpServletRequest request, MultipartHttpServletRequest mRequest) throws Exception{
//        Map insMap = new HashMap();
//
//        try { // MultipartHttpServletRequest 생성
//        	String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
//			String userKey			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
//			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
//
//        	MultiValueMap<String, MultipartFile> map = mRequest.getMultiFileMap();
//    		Iterator<String> iter = map.keySet().iterator();
//
//    		List<MultipartFile> mfile = null;
//            String fieldName = "";
//
//            // 값이 나올때까지
//            while (iter.hasNext()) {
//                fieldName = iter.next().toString(); // 내용을 가져와서
//                mfile = map.get(fieldName);
//                String origName;
//                for (MultipartFile mpf : mfile){
//	                origName = new String(mpf.getOriginalFilename().getBytes("8859_1"), "UTF-8"); //한글꺠짐 방지 // 파일명이 없다면
//
//	                Workbook wbs = CommExcel.getWorkbook(origName);
//
//	                Sheet sheet = (Sheet) wbs.getSheetAt(0);
//
//	                //excel file 두번쨰줄부터 시작
//	                String REVSN_NO = "";
//                    String BOM_CD = "";
//	    			String REVSN_NO1 = "";
//	                for (int i = sheet.getFirstRowNum() + 1; i <= sheet.getLastRowNum(); i++) {
//	                    Row row = sheet.getRow(i);
//
//	                    if(BOM_CD.equals(CommExcel.cellValue(row.getCell(0)))){
//	                    	REVSN_NO = REVSN_NO1;
//	                    }else{
//		                    Map args = new HashMap();
//		                    args.put("BOM_CD",CommExcel.cellValue(row.getCell(0)));
//		                    args.put("userKey",userKey);
//		        			args.put("userNm",userNm);
//		        			args.put("currentDatetime",currentDatetime);
//
//		                    List<Map> list2 = edwardsManagementService.selectMaxBom(args);
//		                    long result = edwardsManagementService.updateBomMaster2(args);
//
//		                    if(list2.get(0).get("REVSN_NO").equals(0)){
//								REVSN_NO = "1";
//							}else{
//								args.put("REVSN_NO",list2.get(0).get("REVSN_NO"));
//								REVSN_NO = stringValueOf(args.get("REVSN_NO"));
//							}
//	                    }
//
//	                    insMap.put("BOM_CD", ""+CommExcel.cellValue(row.getCell(0)));
//	                    insMap.put("BOM_NM", ""+CommExcel.cellValue(row.getCell(1)));
//	                    insMap.put("REVSN_NO", REVSN_NO);
//	                    insMap.put("REVSN_DTTM", ""+CommExcel.cellValue(row.getCell(2)));
//	                    insMap.put("REVSN_DTTM1", ""+CommExcel.cellValue(row.getCell(2)).substring(0, 4)+"-"+CommExcel.cellValue(row.getCell(2)).substring(4, 6)+"-"+CommExcel.cellValue(row.getCell(2)).substring(6, 8));
//	                    insMap.put("QTY_UNIT", ""+CommExcel.cellValue(row.getCell(3)));
//	                    insMap.put("DEMD_PLAN_FG", ""+CommExcel.cellValue(row.getCell(4)));
//	                    insMap.put("USE_EXEC_FG", ""+CommExcel.cellValue(row.getCell(5)));
//	                    insMap.put("REFUND_USE_FG", ""+CommExcel.cellValue(row.getCell(6)));
//	                    insMap.put("ITEM_CD", ""+CommExcel.cellValue(row.getCell(7)));
//	                    insMap.put("ITEM_NM", ""+CommExcel.cellValue(row.getCell(8)));
//	                    insMap.put("QTY", ""+CommExcel.cellValue(row.getCell(9)));
//	                    insMap.put("USE_FG", "Y");
//	                    insMap.put("useYn", "Y");
//	                    insMap.put("addUserId", userKey);
//	                    insMap.put("addUserNm", userNm);
//	                    insMap.put("addDtm", currentDatetime);
//
//	                    //신규삽입
//	                    long result = edwardsManagementService.insertBOM(insMap);
//
//	                    BOM_CD = CommExcel.cellValue(row.getCell(0));
//	                    REVSN_NO1 = REVSN_NO;
//	                }
//                }
//            }
//        }catch(UnsupportedEncodingException e) { // TODO Auto-generated catch block
//            e.printStackTrace();
//        }catch(IllegalStateException e) { // TODO Auto-generated catch block
//            e.printStackTrace();
//        }catch(IOException e) { // TODO Auto-generated catch block
//            e.printStackTrace();
//        }
//    }

	@RequestMapping(value = "/selectReExpoDetail")
	public ResponseEntity<?> selectReExpoDetail(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectReExpoDetail(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/downloadImGam1")
	public void downloadImGam1(HttpServletRequest request, @RequestParam String FROM_DT, @RequestParam String TO_DT,
			@RequestParam String OWN_GODS_NM, @RequestParam String IMPT_DECL_NO, @RequestParam String HS_CD, @RequestParam String BL_NO,
			@RequestParam String ITEM_CD, @RequestParam String taxNum, HttpServletResponse response) throws UnsupportedEncodingException{
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return;

		ImGam1Excel excelResultHandler = null;

		try {
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			excelResultHandler = new ImGam1Excel(response);

			Map map = new HashMap();
			map.put("FROM_DT", FROM_DT);
			map.put("TO_DT", TO_DT);
			map.put("OWN_GODS_NM", OWN_GODS_NM);
			map.put("IMPT_DECL_NO", IMPT_DECL_NO);
			map.put("HS_CD", HS_CD);
			map.put("BL_NO", BL_NO);
			map.put("ITEM_CD", ITEM_CD);
			map.put("taxNum", taxNum);

			sessionTempDao.imGam1("com.edwards.biz.edwardsManagement.EdwardsMapper.selectImpoGamList", map, excelResultHandler);
		}catch(Exception ex){
			throw new RuntimeException(ex);
		}finally{
			if(excelResultHandler != null){
				try{ excelResultHandler.close();}catch(Exception ex){}
			}
		}
	}

	@RequestMapping(value = "/downloadImGam2")
	public void downloadImGam2(HttpServletRequest request, @RequestParam String FROM_DT, @RequestParam String TO_DT,
			@RequestParam String OWN_GODS_NM, @RequestParam String IMPT_DECL_NO, @RequestParam String HS_CD, @RequestParam String BL_NO,
			@RequestParam String ITEM_CD, @RequestParam String taxNum, HttpServletResponse response) throws UnsupportedEncodingException{
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return;

		ImGam2Excel excelResultHandler = null;

		try {
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			excelResultHandler = new ImGam2Excel(response);

			Map map = new HashMap();
			map.put("FROM_DT", FROM_DT);
			map.put("TO_DT", TO_DT);
			map.put("OWN_GODS_NM", OWN_GODS_NM);
			map.put("IMPT_DECL_NO", IMPT_DECL_NO);
			map.put("HS_CD", HS_CD);
			map.put("BL_NO", BL_NO);
			map.put("ITEM_CD", ITEM_CD);
			map.put("taxNum", taxNum);

			sessionTempDao.imGam2("com.edwards.biz.edwardsManagement.EdwardsMapper.selectImpoGamExecList", map, excelResultHandler);
		}catch(Exception ex){
			throw new RuntimeException(ex);
		}finally{
			if(excelResultHandler != null){
				try{ excelResultHandler.close();}catch(Exception ex){}
			}
		}
	}

	@RequestMapping(value = "/downloadItemList")
	public void downloadItemList(HttpServletRequest request, @RequestParam String mcoCom, @RequestParam String _DateType,
		    @RequestParam String strFromDate, @RequestParam String strToDate, @RequestParam String hsStatus, @RequestParam String tpStatus,
		    @RequestParam String ftaYn, @RequestParam String useYn, @RequestParam String mcoName, @RequestParam String mmodelCode,
		    @RequestParam String mhsCode, @RequestParam String mingredient1, @RequestParam String mshipper,
		    @RequestParam String mmodel, @RequestParam String _defaultRmsDb, HttpServletResponse response) throws UnsupportedEncodingException{
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return;

		ItemExcel excelResultHandler = null;

		try {
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			excelResultHandler = new ItemExcel(response);

			Map map = new HashMap();
			map.put("mcoCom", mcoCom);
			map.put("_DateType", _DateType);
			map.put("strFromDate", strFromDate);
			map.put("strToDate", strToDate);
			map.put("hsStatus", hsStatus);
			map.put("tpStatus", tpStatus);
			map.put("ftaYn", ftaYn);
			map.put("useYn", useYn);
			map.put("mcoName", mcoName);
			map.put("mmodelCode", mmodelCode);
			map.put("mhsCode", mhsCode);
			map.put("mingredient1", mingredient1);
			map.put("mshipper", mshipper);
			map.put("mmodel", mmodel);
			map.put("_defaultRmsDb", _defaultRmsDb);

			sessionTempDao.item("com.edwards.biz.edwardsManagement.EdwardsMapper.selectItemList", map, excelResultHandler);
		}catch(Exception ex){
			throw new RuntimeException(ex);
		}finally{
			if(excelResultHandler != null){
				try{ excelResultHandler.close();}catch(Exception ex){}
			}
		}
	}

	@RequestMapping(value = "/downloadImNoGam1")
	public void downloadImNoGam1(HttpServletRequest request, @RequestParam String FROM_DT, @RequestParam String TO_DT,
			@RequestParam String OWN_GODS_NM, @RequestParam String IMPT_DECL_NO, @RequestParam String HS_CD, @RequestParam String BL_NO,
			@RequestParam String ITEM_CD, @RequestParam String taxNum, HttpServletResponse response) throws UnsupportedEncodingException{
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return;

		ImNoGam1Excel excelResultHandler = null;

		try {
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			excelResultHandler = new ImNoGam1Excel(response);

			Map map = new HashMap();
			map.put("FROM_DT", FROM_DT);
			map.put("TO_DT", TO_DT);
			map.put("OWN_GODS_NM", OWN_GODS_NM);
			map.put("IMPT_DECL_NO", IMPT_DECL_NO);
			map.put("HS_CD", HS_CD);
			map.put("BL_NO", BL_NO);
			map.put("ITEM_CD", ITEM_CD);
			map.put("taxNum", taxNum);

			sessionTempDao.imNoGam1("com.edwards.biz.edwardsManagement.EdwardsMapper.selectImpoNoGamList", map, excelResultHandler);
		}catch(Exception ex){
			throw new RuntimeException(ex);
		}finally{
			if(excelResultHandler != null){
				try{ excelResultHandler.close();}catch(Exception ex){}
			}
		}
	}

	@RequestMapping(value = "/downloadImNoGam2")
	public void downloadImNoGam2(HttpServletRequest request, @RequestParam String FROM_DT, @RequestParam String TO_DT,
			@RequestParam String OWN_GODS_NM, @RequestParam String IMPT_DECL_NO, @RequestParam String HS_CD, @RequestParam String BL_NO,
			@RequestParam String ITEM_CD, @RequestParam String taxNum, HttpServletResponse response) throws UnsupportedEncodingException{
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return;

		ImNoGam2Excel excelResultHandler = null;

		try {
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			excelResultHandler = new ImNoGam2Excel(response);

			Map map = new HashMap();
			map.put("FROM_DT", FROM_DT);
			map.put("TO_DT", TO_DT);
			map.put("OWN_GODS_NM", OWN_GODS_NM);
			map.put("IMPT_DECL_NO", IMPT_DECL_NO);
			map.put("HS_CD", HS_CD);
			map.put("BL_NO", BL_NO);
			map.put("ITEM_CD", ITEM_CD);
			map.put("taxNum", taxNum);

			sessionTempDao.imNoGam2("com.edwards.biz.edwardsManagement.EdwardsMapper.selectImpoNoGamExecList", map, excelResultHandler);
		}catch(Exception ex){
			throw new RuntimeException(ex);
		}finally{
			if(excelResultHandler != null){
				try{ excelResultHandler.close();}catch(Exception ex){}
			}
		}
	}

	@RequestMapping(value = "/downloadDraw")
	public void downloadDraw(HttpServletRequest request, @RequestParam String _DateType, @RequestParam String FROM_DT, @RequestParam String TO_DT,
		    @RequestParam String ExpoSingoNo, @RequestParam String ImpoSingoNo, @RequestParam String ExpoForm,
		    @RequestParam String ExpoHS, @RequestParam String ItemCD, @RequestParam String taxNum, HttpServletResponse response) throws UnsupportedEncodingException{
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return;

		Draw1Excel excelResultHandler = null;

		try {
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			excelResultHandler = new Draw1Excel(response);

			Map map = new HashMap();
			map.put("FROM_DT", FROM_DT);
			map.put("TO_DT", TO_DT);
			map.put("_DateType", _DateType);
			map.put("ExpoSingoNo", ExpoSingoNo);
			map.put("ImpoSingoNo", ImpoSingoNo);
			map.put("ExpoForm", ExpoForm);
			map.put("ExpoHS", ExpoHS);
			map.put("ItemCD", ItemCD);
			map.put("taxNum", taxNum);

			sessionTempDao.draw1("com.edwards.biz.edwardsManagement.EdwardsMapper.selectExpoDrawStatisticList", map, excelResultHandler);
		}catch(Exception ex){
			throw new RuntimeException(ex);
		}finally{
			if(excelResultHandler != null){
				try{ excelResultHandler.close();}catch(Exception ex){}
			}
		}
	}

	@RequestMapping(value = "/downloadDraw1")
	public void downloadDraw1(HttpServletRequest request, @RequestParam String _DateType, @RequestParam String FROM_DT, @RequestParam String TO_DT,
		    @RequestParam String ExpoSingoNo, @RequestParam String ImpoSingoNo, @RequestParam String taxNum, HttpServletResponse response) throws UnsupportedEncodingException{
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return;

		Draw2Excel excelResultHandler = null;

		try {
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			excelResultHandler = new Draw2Excel(response);

			Map map = new HashMap();
			map.put("FROM_DT", FROM_DT);
			map.put("TO_DT", TO_DT);
			map.put("_DateType", _DateType);
			map.put("ExpoSingoNo", ExpoSingoNo);
			map.put("ImpoSingoNo", ImpoSingoNo);
			map.put("taxNum", taxNum);

			sessionTempDao.draw2("com.edwards.biz.edwardsManagement.EdwardsMapper.selectExpoDrawStatisticList1", map, excelResultHandler);
		}catch(Exception ex){
			throw new RuntimeException(ex);
		}finally{
			if(excelResultHandler != null){
				try{ excelResultHandler.close();}catch(Exception ex){}
			}
		}
	}

	@RequestMapping(value = "/bomExcel")
	public void bomExcel(HttpServletRequest request, @RequestParam String NOCHK, @RequestParam String NODATA,
		    @RequestParam String REVSN_DTTM1, @RequestParam String USE_FG, @RequestParam String taxNum, HttpServletResponse response) throws UnsupportedEncodingException{
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return;

		BomExcel excelResultHandler = null;

		try {
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			excelResultHandler = new BomExcel(response);

			Map map = new HashMap();
			map.put("NOCHK", NOCHK);
			map.put("NODATA", NODATA);
			map.put("REVSN_DTTM1", REVSN_DTTM1);
			map.put("USE_FG", USE_FG);
			map.put("taxNum", taxNum);

			sessionTempDao.bom("com.edwards.biz.edwardsManagement.EdwardsMapper.selectBomMaster1", map, excelResultHandler);
		}catch(Exception ex){
			throw new RuntimeException(ex);
		}finally{
			if(excelResultHandler != null){
				try{ excelResultHandler.close();}catch(Exception ex){}
			}
		}
	}

	@RequestMapping(value = "/selectDrawCheck41")
	public ResponseEntity<?> selectDrawCheck41(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		String treeMonth 	= stringValueOf(args.get("treeMonth"));
		String twoYear 		= stringValueOf(args.get("twoYear"));
		String taxNum 		= stringValueOf(args.get("taxNum"));

		try{
			//선택항목에서
			List<Map> list = edwardsManagementService.selectDrawCheck4(args);

			for (int i = 0, n = list.size(); i < n; i++) {
				Map map = new HashMap();
				map.put("ITEM_CD", list.get(i).get("PROD_CD"));
				map.put("ORIG", list.get(i).get("ORIG"));
				map.put("HS_CD", list.get(i).get("HS_CD"));
				map.put("twoYear", treeMonth);
				// 세율관계없이 3개월내 잔량 구하기
				List<Map> list1 = edwardsManagementService.threeMonthRmidQty(map);
				// 잔량이 0보다 크면 3개월 내에서 해결하기
				// RMID_QTY가 소수점이 있으므로 정수형으로 변경 (1.99 -> 1, 0.99 -> 0)
				if((int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY"))) > 0){
					// 3개월 내 총 잔량이 미지정수량보다 크거나 같으면 그 안에서 해결하기
					if((int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY")))-(int)Double.parseDouble(stringValueOf(list.get(i).get("NOT_ORIG_STAT_QTY"))) >= 0){
						Map map1 = new HashMap();
						map1.put("hsCode", list.get(i).get("HS_CD"));
						map1.put("itemCode", list.get(i).get("PROD_CD"));
						map1.put("year", "2018");

						map1.put("ORIG", list.get(i).get("ORIG"));
						map1.put("treeMonth", treeMonth);
						map1.put("taxNum", taxNum);
						map1.put("NOT_ORIG_STAT_QTY", list.get(i).get("NOT_ORIG_STAT_QTY"));
						map1.put("EXPT_ORDR_MNG_NO", list.get(i).get("EXPT_ORDR_MNG_NO"));
						map1.put("EXPT_INV_SEQNO", list.get(i).get("EXPT_INV_SEQNO"));
						map1.put("QTY_UNIT", list.get(i).get("QTY_UNIT"));
						map1.put("KEY_ED_EXPT_INV", list.get(i).get("KEY_ED_EXPT_INV"));
						wonCheck01(request, map1);
					}else{
						// 3개월 내 총 잔량이 미지정수량보다 작으면 3개월 처리 후 2년 내로 늘리기
						Map map1 = new HashMap();
						map1.put("hsCode", list.get(i).get("HS_CD"));
						map1.put("itemCode", list.get(i).get("PROD_CD"));
						map1.put("year", "2018");

						map1.put("ORIG", list.get(i).get("ORIG"));
						map1.put("treeMonth", treeMonth);
						map1.put("twoYear", twoYear);
						map1.put("taxNum", taxNum);
						map1.put("NOT_ORIG_STAT_QTY", list.get(i).get("NOT_ORIG_STAT_QTY"));
						map1.put("totNaQty", (int)Double.parseDouble(stringValueOf(list.get(i).get("NOT_ORIG_STAT_QTY")))-(int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY")))); //2년 검색으로 넘길 갯수
						map1.put("EXPT_ORDR_MNG_NO", list.get(i).get("EXPT_ORDR_MNG_NO"));
						map1.put("EXPT_INV_SEQNO", list.get(i).get("EXPT_INV_SEQNO"));
						map1.put("QTY_UNIT", list.get(i).get("QTY_UNIT"));
						map1.put("KEY_ED_EXPT_INV", list.get(i).get("KEY_ED_EXPT_INV"));
						wonCheck01_1(request, map1);
					}
				// 3개월 내 잔량이 없으면 2년내 검색
				}else{
					Map map2 = new HashMap();
					map2.put("ITEM_CD", list.get(i).get("PROD_CD"));
					map2.put("ORIG", list.get(i).get("ORIG"));
					map2.put("HS_CD", list.get(i).get("HS_CD"));
					map2.put("twoYear", twoYear);
					// 세율관계없이 2년내 잔량 구하기
					List<Map> list2 = edwardsManagementService.threeMonthRmidQty(map2);

					if((int)Double.parseDouble(stringValueOf(list2.get(0).get("RMID_QTY"))) > 0){
						// 2년 내 총 잔량이 미지정수량보다 크거나 같으면 그 안에서 해결하기
						if((int)Double.parseDouble(stringValueOf(list2.get(0).get("RMID_QTY")))-(int)Double.parseDouble(stringValueOf(list.get(i).get("NOT_ORIG_STAT_QTY"))) >= 0){
							Map map1 = new HashMap();
							map1.put("hsCode", list.get(i).get("HS_CD"));
							map1.put("itemCode", list.get(i).get("PROD_CD"));
							map1.put("year", "2018");

							map1.put("ORIG", list.get(i).get("ORIG"));
							map1.put("treeMonth", twoYear);
							map1.put("taxNum", taxNum);
							map1.put("NOT_ORIG_STAT_QTY", list.get(i).get("NOT_ORIG_STAT_QTY"));
							map1.put("EXPT_ORDR_MNG_NO", list.get(i).get("EXPT_ORDR_MNG_NO"));
							map1.put("EXPT_INV_SEQNO", list.get(i).get("EXPT_INV_SEQNO"));
							map1.put("QTY_UNIT", list.get(i).get("QTY_UNIT"));
							map1.put("KEY_ED_EXPT_INV", list.get(i).get("KEY_ED_EXPT_INV"));
							wonCheck01(request, map1);
						}else{
							// 2년 내 총 잔량이 미지정수량보다 작으면 2년 내만 처리
							Map map1 = new HashMap();
							map1.put("hsCode", list.get(i).get("HS_CD"));
							map1.put("itemCode", list.get(i).get("PROD_CD"));
							map1.put("year", "2018");

							map1.put("ORIG", list.get(i).get("ORIG"));
							map1.put("treeMonth", twoYear);
							map1.put("twoYear", twoYear);
							map1.put("taxNum", taxNum);
							map1.put("NOT_ORIG_STAT_QTY", list.get(i).get("NOT_ORIG_STAT_QTY"));
							map1.put("totNaQty", (int)Double.parseDouble(stringValueOf(list.get(i).get("NOT_ORIG_STAT_QTY")))-(int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY")))); //2년 검색으로 넘길 갯수
							map1.put("EXPT_ORDR_MNG_NO", list.get(i).get("EXPT_ORDR_MNG_NO"));
							map1.put("EXPT_INV_SEQNO", list.get(i).get("EXPT_INV_SEQNO"));
							map1.put("QTY_UNIT", list.get(i).get("QTY_UNIT"));
							map1.put("KEY_ED_EXPT_INV", list.get(i).get("KEY_ED_EXPT_INV"));
							wonCheck01_1(request, map1);
						}
					}
				}
			}
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/wonCheck01")
	public ResponseEntity<?> wonCheck01(HttpServletRequest request, @RequestBody Map args){
		String treeMonth 			= stringValueOf(args.get("treeMonth"));
		String ORIG 				= stringValueOf(args.get("ORIG"));
		int NOT_ORIG_STAT_QTY 		= (int)Double.parseDouble(stringValueOf(args.get("NOT_ORIG_STAT_QTY")));
		String EXPT_ORDR_MNG_NO 	= stringValueOf(args.get("EXPT_ORDR_MNG_NO"));
		String EXPT_INV_SEQNO 		= stringValueOf(args.get("EXPT_INV_SEQNO"));
		String QTY_UNIT 			= stringValueOf(args.get("QTY_UNIT"));
		String KEY_ED_EXPT_INV 		= stringValueOf(args.get("KEY_ED_EXPT_INV"));
		String taxNum 				= stringValueOf(args.get("taxNum"));

		try{
			// 세율이 2개인 자재의 세율별 3개월 내 잔량을 구하기
			List<Map> list = edwardsManagementService.selectDrawMaster(args);
			for (int i = 0, n = list.size(); i < n; i++) {
				Map map = new HashMap();
				map.put("ITEM_CD", list.get(i).get("itemCode"));
				map.put("ORIG", ORIG);
				map.put("HS_CD", list.get(i).get("hsCode"));
				map.put("Mhs_rate", list.get(i).get("seyul"));
				map.put("twoYear", treeMonth);
				List<Map> list1 = edwardsManagementService.threeMonthRmidQty(map);
				// 고세율이면 퍼센트 갯수 올림처리
				if(i==0){
					//미지정 수량의 백분율 구하기
					double  eQty = NOT_ORIG_STAT_QTY * Integer.parseInt(stringValueOf(list.get(i).get("per"))) / 100.0;
					int exptQty = (int) Math.ceil(eQty);
					if(exptQty > 0){
						// 고세율 잔량이 올림처리한 갯수보다 많을 때
						if((int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY")))-exptQty >=0){
							Map map1 = new HashMap();
							map1.put("ITEM_CD", list.get(i).get("itemCode"));
							map1.put("ORIG", ORIG);
							map1.put("HS_CD", list.get(i).get("hsCode"));
							map1.put("Mhs_rate", list.get(i).get("seyul"));
							map1.put("twoYear", treeMonth);
							map1.put("exptQty", exptQty);
							map1.put("taxNum", taxNum);
							map1.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
							map1.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
							map1.put("QTY_UNIT", QTY_UNIT);
							wonCheck02(request, map1);
						// 고세율 잔량이 올림처리 갯수보다 작으면 고세율 처리 후 저세율에서 갯수 차감
						}else{
							// 고세율 잔량부터 처리한 뒤
							Map map1 = new HashMap();
							map1.put("ITEM_CD", list.get(i).get("itemCode"));
							map1.put("ORIG", ORIG);
							map1.put("HS_CD", list.get(i).get("hsCode"));
							map1.put("Mhs_rate", list.get(i).get("seyul"));
							map1.put("twoYear", treeMonth);
							map1.put("taxNum", taxNum);
							map1.put("exptQty", (int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY"))));
							map1.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
							map1.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
							map1.put("QTY_UNIT", QTY_UNIT);
							wonCheck02(request, map1);

							// 나머지는 저세율(0%) 잔량 처리
							Map map2 = new HashMap();
							map2.put("ITEM_CD", list.get(i).get("itemCode"));
							map2.put("ORIG", ORIG);
							map2.put("HS_CD", list.get(i).get("hsCode"));
							map2.put("Mhs_rate", "0");
							map2.put("twoYear", treeMonth);
							map1.put("taxNum", taxNum);
							map2.put("exptQty", exptQty - (int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY"))));
							map2.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
							map2.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
							map2.put("QTY_UNIT", QTY_UNIT);
							wonCheck02(request, map2);
						}
					}
				//저세율이면 퍼센트 갯수 버림
				}else{
					double  eQty = NOT_ORIG_STAT_QTY * Integer.parseInt(stringValueOf(list.get(i).get("per"))) / 100.0;
					int exptQty = (int) Math.floor(eQty);
					if(exptQty > 0){
						// 저세율 잔량이 올림처리한 갯수보다 많을 때
						if((int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY")))-exptQty >=0){
							Map map1 = new HashMap();
							map1.put("ITEM_CD", list.get(i).get("itemCode"));
							map1.put("ORIG", ORIG);
							map1.put("HS_CD", list.get(i).get("hsCode"));
							map1.put("Mhs_rate", list.get(i).get("seyul"));
							map1.put("twoYear", treeMonth);
							map1.put("exptQty", exptQty);
							map1.put("taxNum", taxNum);
							map1.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
							map1.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
							map1.put("QTY_UNIT", QTY_UNIT);

							map1.put("KEY_ED_EXPT_INV", KEY_ED_EXPT_INV);
							map1.put("EXPT_QTY", NOT_ORIG_STAT_QTY);
							map1.put("beforeQty", 0);
							wonCheck02_1(request, map1);
						// 고세율 잔량이 올림처리 갯수보다 작으면 고세율 처리 후 저세율에서 갯수 차감
						}else{
							// 저세율 잔량부터 처리한 뒤
							Map map1 = new HashMap();
							map1.put("ITEM_CD", list.get(i).get("itemCode"));
							map1.put("ORIG", ORIG);
							map1.put("HS_CD", list.get(i).get("hsCode"));
							map1.put("Mhs_rate", list.get(i).get("seyul"));
							map1.put("twoYear", treeMonth);
							map1.put("taxNum", taxNum);
							map1.put("exptQty", (int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY"))));
							map1.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
							map1.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
							map1.put("QTY_UNIT", QTY_UNIT);
							wonCheck02(request, map1);

							// 나머지는 고세율(8%) 잔량 처리
							Map map2 = new HashMap();
							map2.put("ITEM_CD", list.get(i).get("itemCode"));
							map2.put("ORIG", ORIG);
							map2.put("HS_CD", list.get(i).get("hsCode"));
							map2.put("Mhs_rate", "8");
							map2.put("twoYear", treeMonth);
							map1.put("taxNum", taxNum);
							map2.put("exptQty", exptQty - (int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY"))));
							map2.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
							map2.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
							map2.put("QTY_UNIT", QTY_UNIT);

							map2.put("KEY_ED_EXPT_INV", KEY_ED_EXPT_INV);
							map2.put("EXPT_QTY", NOT_ORIG_STAT_QTY);
							map2.put("beforeQty", (int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY"))));
							wonCheck02_1(request, map2);
						}
					}
				}
			}
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/wonCheck01_1")
	public ResponseEntity<?> wonCheck01_1(HttpServletRequest request, @RequestBody Map args){
		String treeMonth 			= stringValueOf(args.get("treeMonth"));
		String twoYear 				= stringValueOf(args.get("twoYear"));
		String ORIG 				= stringValueOf(args.get("ORIG"));
		int NOT_ORIG_STAT_QTY 		= (int)Double.parseDouble(stringValueOf(args.get("NOT_ORIG_STAT_QTY")));
		int totNaQty 				= (int)Double.parseDouble(stringValueOf(args.get("totNaQty")));
		String EXPT_ORDR_MNG_NO 	= stringValueOf(args.get("EXPT_ORDR_MNG_NO"));
		String EXPT_INV_SEQNO 		= stringValueOf(args.get("EXPT_INV_SEQNO"));
		String QTY_UNIT 			= stringValueOf(args.get("QTY_UNIT"));
		String KEY_ED_EXPT_INV 		= stringValueOf(args.get("KEY_ED_EXPT_INV"));
		String taxNum 				= stringValueOf(args.get("taxNum"));
		int highplus 				= 0;
		int highminus 				= 0;
		int lowplus 				= 0;
		int lowminus 				= 0;

		try{
			// 세율이 2개인 자재의 세율별 3개월 내 잔량을 구하기
			List<Map> list = edwardsManagementService.selectDrawMaster(args);
			for (int i = 0, n = list.size(); i < n; i++) {
				Map map = new HashMap();
				map.put("ITEM_CD", list.get(i).get("itemCode"));
				map.put("ORIG", ORIG);
				map.put("HS_CD", list.get(i).get("hsCode"));
				map.put("Mhs_rate", list.get(i).get("seyul"));
				map.put("twoYear", treeMonth);
				List<Map> list1 = edwardsManagementService.threeMonthRmidQty(map);
				// 고세율이면 퍼센트 갯수 올림처리
				if(i==0){
					//미지정 수량의 백분율 구하기
					double  eQty = NOT_ORIG_STAT_QTY * Integer.parseInt(stringValueOf(list.get(i).get("per"))) / 100.0;
					int exptQty = (int) Math.ceil(eQty);
					if(exptQty > 0){
						// 고세율 잔량이 올림처리한 갯수보다 많을 때
						if((int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY")))-exptQty >=0){
							highplus = (int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY")))-exptQty;
							Map map1 = new HashMap();
							map1.put("ITEM_CD", list.get(i).get("itemCode"));
							map1.put("ORIG", ORIG);
							map1.put("HS_CD", list.get(i).get("hsCode"));
							map1.put("Mhs_rate", list.get(i).get("seyul"));
							map1.put("twoYear", treeMonth);
							map1.put("exptQty", exptQty);
							map1.put("taxNum", taxNum);
							map1.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
							map1.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
							map1.put("QTY_UNIT", QTY_UNIT);
							wonCheck02(request, map1);
						// 고세율 잔량이 올림처리 갯수보다 작으면 고세율 처리 후 저세율에서 갯수 차감
						}else{
							// 고세율 잔량부터 처리한 뒤 저세율 단계에서 처리
							highminus = exptQty - (int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY")));
							Map map1 = new HashMap();
							map1.put("ITEM_CD", list.get(i).get("itemCode"));
							map1.put("ORIG", ORIG);
							map1.put("HS_CD", list.get(i).get("hsCode"));
							map1.put("Mhs_rate", list.get(i).get("seyul"));
							map1.put("twoYear", treeMonth);
							map1.put("taxNum", taxNum);
							map1.put("exptQty", (int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY"))));
							map1.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
							map1.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
							map1.put("QTY_UNIT", QTY_UNIT);
							wonCheck02(request, map1);
						}
					}
				//저세율이면 퍼센트 갯수 버림
				}else{
					double  eQty = NOT_ORIG_STAT_QTY * Integer.parseInt(stringValueOf(list.get(i).get("per"))) / 100.0;
					int exptQty = (int) Math.floor(eQty);
					if(exptQty > 0){
						// 저세율 잔량이 올림처리한 갯수보다 많을 때
						if((int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY")))-exptQty >=0){
							// 고세율이 부족하면
							if(highminus > 0){
								// 저세율 잔량부터 처리한 뒤
								lowplus = (int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY")))-exptQty;
								Map map1 = new HashMap();
								map1.put("ITEM_CD", list.get(i).get("itemCode"));
								map1.put("ORIG", ORIG);
								map1.put("HS_CD", list.get(i).get("hsCode"));
								map1.put("Mhs_rate", list.get(i).get("seyul"));
								map1.put("twoYear", treeMonth);
								map1.put("exptQty", exptQty);
								map1.put("taxNum", taxNum);
								map1.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
								map1.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
								map1.put("QTY_UNIT", QTY_UNIT);
								wonCheck02(request, map1);

								// 나머지는 고세율(8%) 잔량 처리
								Map map2 = new HashMap();
								map2.put("ITEM_CD", list.get(i).get("itemCode"));
								map2.put("ORIG", ORIG);
								map2.put("HS_CD", list.get(i).get("hsCode"));
								map2.put("Mhs_rate", "0");
								map2.put("twoYear", treeMonth);
								map2.put("taxNum", taxNum);
								map2.put("exptQty", lowplus); //고세율에서 남은 것
								map2.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
								map2.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
								map2.put("QTY_UNIT", QTY_UNIT);
								wonCheck02(request, map2);

								// 나머지는 2년치 자료에서 고세율 모자란 것 잔량 처리
								Map map3 = new HashMap();
								map3.put("ITEM_CD", list.get(i).get("itemCode"));
								map3.put("ORIG", ORIG);
								map3.put("HS_CD", list.get(i).get("hsCode"));
								map3.put("Mhs_rate", "8");
								map3.put("twoYear", twoYear);
								map3.put("taxNum", taxNum);
								map3.put("exptQty", highminus); //고세율에서 모자란것
								map3.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
								map3.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
								map3.put("QTY_UNIT", QTY_UNIT);

								map3.put("KEY_ED_EXPT_INV", KEY_ED_EXPT_INV);
								map3.put("EXPT_QTY", totNaQty);
								map3.put("beforeQty", lowplus);
								wonCheck02_1(request, map3);
							}
						// 저세율 잔량이 올림처리 갯수보다 작으면 저세율 잔량 처리 뒤 고세율에서 남은 갯수 처리-> 2년 뒤 저세율 처리
						}else{
							if(highplus > 0){
								// 저세율 잔량부터 처리한 뒤
								lowminus = exptQty - (int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY")));
								Map map1 = new HashMap();
								map1.put("ITEM_CD", list.get(i).get("itemCode"));
								map1.put("ORIG", ORIG);
								map1.put("HS_CD", list.get(i).get("hsCode"));
								map1.put("Mhs_rate", list.get(i).get("seyul"));
								map1.put("twoYear", treeMonth);
								map1.put("taxNum", taxNum);
								map1.put("exptQty", (int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY"))));
								map1.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
								map1.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
								map1.put("QTY_UNIT", QTY_UNIT);
								wonCheck02(request, map1);

								// 나머지는 고세율(8%) 잔량 처리
								Map map2 = new HashMap();
								map2.put("ITEM_CD", list.get(i).get("itemCode"));
								map2.put("ORIG", ORIG);
								map2.put("HS_CD", list.get(i).get("hsCode"));
								map2.put("Mhs_rate", "8");
								map2.put("twoYear", treeMonth);
								map2.put("taxNum", taxNum);
								map2.put("exptQty", highplus); //고세율에서 남은 것
								map2.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
								map2.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
								map2.put("QTY_UNIT", QTY_UNIT);
								wonCheck02(request, map2);

								// 나머지는 2년치 자료에서 저세율 모자란 것 잔량 처리
								Map map3 = new HashMap();
								map3.put("ITEM_CD", list.get(i).get("itemCode"));
								map3.put("ORIG", ORIG);
								map3.put("HS_CD", list.get(i).get("hsCode"));
								map3.put("Mhs_rate", "0");
								map3.put("twoYear", twoYear);
								map3.put("taxNum", taxNum);
								map3.put("exptQty", lowminus); //저세율에서 모자란것
								map3.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
								map3.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
								map3.put("QTY_UNIT", QTY_UNIT);

								map3.put("KEY_ED_EXPT_INV", KEY_ED_EXPT_INV);
								map3.put("EXPT_QTY", totNaQty);
								map3.put("beforeQty", highplus);
								System.out.println("1111111111");
								wonCheck02_1(request, map3);
							}

							if(highminus > 0){
								// 저세율 잔량부터 처리한 뒤
								lowminus = exptQty - (int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY")));
								Map map1 = new HashMap();
								map1.put("ITEM_CD", list.get(i).get("itemCode"));
								map1.put("ORIG", ORIG);
								map1.put("HS_CD", list.get(i).get("hsCode"));
								map1.put("Mhs_rate", list.get(i).get("seyul"));
								map1.put("twoYear", treeMonth);
								map1.put("taxNum", taxNum);
								map1.put("exptQty", (int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY"))));
								map1.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
								map1.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
								map1.put("QTY_UNIT", QTY_UNIT);
								wonCheck02(request, map1);

								// 나머지는 2년치 자료에서 고세율 모자란 것 잔량 처리
								Map map2 = new HashMap();
								map2.put("ITEM_CD", list.get(i).get("itemCode"));
								map2.put("ORIG", ORIG);
								map2.put("HS_CD", list.get(i).get("hsCode"));
								map2.put("Mhs_rate", "8");
								map2.put("twoYear", twoYear);
								map2.put("taxNum", taxNum);
								map2.put("exptQty", highminus); //고세율에서 모자란것
								map2.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
								map2.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
								map2.put("QTY_UNIT", QTY_UNIT);
								wonCheck02(request, map2);

								// 나머지는 2년치 자료에서 저세율 모자란 것 잔량 처리
								Map map3 = new HashMap();
								map3.put("ITEM_CD", list.get(i).get("itemCode"));
								map3.put("ORIG", ORIG);
								map3.put("HS_CD", list.get(i).get("hsCode"));
								map3.put("Mhs_rate", "0");
								map3.put("twoYear", twoYear);
								map3.put("taxNum", taxNum);
								map3.put("exptQty", lowminus); //저세율에서 모자란것
								map3.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
								map3.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
								map3.put("QTY_UNIT", QTY_UNIT);

								map3.put("KEY_ED_EXPT_INV", KEY_ED_EXPT_INV);
								map3.put("EXPT_QTY", totNaQty);
								map3.put("beforeQty", highminus);
								wonCheck02_1(request, map3);
							}
						}
					}
				}
			}
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	//고세율에서 잔량 차감
	@RequestMapping(value = "/wonCheck02")
	public ResponseEntity<?> wonCheck02(HttpServletRequest request, @RequestBody Map args){
		// 미지정 백분율수량
		int exptQty 				= Integer.parseInt(stringValueOf(args.get("exptQty"))); //미지정수량
		String EXPT_ORDR_MNG_NO 	= stringValueOf(args.get("EXPT_ORDR_MNG_NO"));
		String EXPT_INV_SEQNO 		= stringValueOf(args.get("EXPT_INV_SEQNO"));
		String QTY_UNIT 			= stringValueOf(args.get("QTY_UNIT"));
		String taxNum 				= stringValueOf(args.get("taxNum"));

		try{
			List<Map> list = edwardsManagementService.selectCheckQty1(args);
			int i  = 0;
			int mi = exptQty;
			int ji = 0;
			if(list.size() > 0){
				do{
					// 과거 남은 수량 리스트에서 잔량이 미지정 수량보다 클때
					if((int)Double.parseDouble(stringValueOf(list.get(i).get("RMID_QTY"))) >= mi){
						ji = ji + mi;
						Map map = new HashMap();
						map.put("EXPT_QTY", mi);
						map.put("IMPT_ORDR_MNG_NO", list.get(i).get("IMPT_ORDR_MNG_NO"));
						map.put("IMPT_LAN", list.get(i).get("LAN"));
						map.put("IMPT_HNG", list.get(i).get("HNG"));

						map.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
						map.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
						map.put("taxNum", taxNum);
						map.put("IMPT_RMID_QTY", (int)Double.parseDouble(stringValueOf(list.get(i).get("RMID_QTY")))-mi);
						map.put("EXPT_LAN", "");
						map.put("EXPT_HNG", "");
						map.put("IMPT_DECL_NO", list.get(i).get("IMPT_DECL_NO"));
						map.put("QTY_UNIT", QTY_UNIT);
						wonCheck03(request, map);
						mi = 0;
					}else{
						// 과거 남은 리스트 잔량이 미지정 수량보다 작을때
						ji = ji + (int)Double.parseDouble(stringValueOf(list.get(i).get("RMID_QTY")));
						mi = mi - (int)Double.parseDouble(stringValueOf(list.get(i).get("RMID_QTY")));
						Map map = new HashMap();
						map.put("EXPT_QTY", (int)Double.parseDouble(stringValueOf(list.get(i).get("RMID_QTY"))));
						map.put("IMPT_ORDR_MNG_NO", list.get(i).get("IMPT_ORDR_MNG_NO"));
						map.put("IMPT_LAN", list.get(i).get("LAN"));
						map.put("IMPT_HNG", list.get(i).get("HNG"));

						map.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
						map.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
						map.put("taxNum", taxNum);
						map.put("IMPT_RMID_QTY", "0");
						map.put("EXPT_LAN", "");
						map.put("EXPT_HNG", "");
						map.put("IMPT_DECL_NO", list.get(i).get("IMPT_DECL_NO"));
						map.put("QTY_UNIT", QTY_UNIT);
						wonCheck03(request, map);
						i++;
						if(i == list.size()){
							ji = ji;
							mi = 0;
						}
					}
				// 미지정 백분율 수량이 모두 차감될때까지 돌림
				}while(mi > 0);
			}
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	//저세율에서 잔량 차감+ INV 업데이트
	@RequestMapping(value = "/wonCheck02_1")
	public ResponseEntity<?> wonCheck02_1(HttpServletRequest request, @RequestBody Map args){
		// 미지정 백분율수량
		int exptQty 				= Integer.parseInt(stringValueOf(args.get("exptQty")));
		String EXPT_ORDR_MNG_NO 	= stringValueOf(args.get("EXPT_ORDR_MNG_NO"));
		String EXPT_INV_SEQNO 		= stringValueOf(args.get("EXPT_INV_SEQNO"));
		String QTY_UNIT 			= stringValueOf(args.get("QTY_UNIT"));
		String KEY_ED_EXPT_INV 		= stringValueOf(args.get("KEY_ED_EXPT_INV"));
		String EXPT_QTY 			= stringValueOf(args.get("EXPT_QTY"));
		int beforeQty 				= Integer.parseInt(stringValueOf(args.get("beforeQty")));
		String taxNum 				= stringValueOf(args.get("taxNum"));

		try{
			List<Map> list = edwardsManagementService.selectCheckQty1(args);
			int i  = 0;
			int mi = exptQty;
			int ji = 0;
			if(list.size() > 0){
				do{
					// 과거 남은 수량 리스트에서 잔량이 미지정 수량보다 클때
					if((int)Double.parseDouble(stringValueOf(list.get(i).get("RMID_QTY"))) >= mi){
						System.out.println("33333333");
						ji = ji + mi;
						Map map = new HashMap();
						map.put("EXPT_QTY", mi);
						map.put("IMPT_ORDR_MNG_NO", list.get(i).get("IMPT_ORDR_MNG_NO"));
						map.put("IMPT_LAN", list.get(i).get("LAN"));
						map.put("IMPT_HNG", list.get(i).get("HNG"));

						map.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
						map.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
						map.put("taxNum", taxNum);
						map.put("IMPT_RMID_QTY", (int)Double.parseDouble(stringValueOf(list.get(i).get("RMID_QTY")))-mi);
						map.put("EXPT_LAN", "");
						map.put("EXPT_HNG", "");
						map.put("IMPT_DECL_NO", list.get(i).get("IMPT_DECL_NO"));
						map.put("QTY_UNIT", QTY_UNIT);
						wonCheck03(request, map);
						mi = 0;

						// 3개월 내에 미지정건 갯수가 모두 충족하므로 지정
						Map map2 = new HashMap();
						map2.put("KEY_ED_EXPT_INV", KEY_ED_EXPT_INV);
						map2.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
						map2.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
						map2.put("EXPT_QTY", EXPT_QTY);
						map2.put("taxNum", taxNum);
						map2.put("ORIG_STAT_OBJ", "지정");
						map2.put("drawCheck", "Y");
						System.out.println("44444"+map2);
						wonCheck03_1(request, map2);
					}else{
						System.out.println("222222222");
						// 과거 남은 리스트 잔량이 미지정 수량보다 작을때
						ji = ji + (int)Double.parseDouble(stringValueOf(list.get(i).get("RMID_QTY")));
						mi = mi - (int)Double.parseDouble(stringValueOf(list.get(i).get("RMID_QTY")));
						System.out.println("##"+ji);
						System.out.println("##"+mi);
						Map map = new HashMap();
						map.put("EXPT_QTY", (int)Double.parseDouble(stringValueOf(list.get(i).get("RMID_QTY"))));
						map.put("IMPT_ORDR_MNG_NO", list.get(i).get("IMPT_ORDR_MNG_NO"));
						map.put("IMPT_LAN", list.get(i).get("LAN"));
						map.put("IMPT_HNG", list.get(i).get("HNG"));

						map.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
						map.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
						map.put("taxNum", taxNum);
						map.put("IMPT_RMID_QTY", "0");
						map.put("EXPT_LAN", "");
						map.put("EXPT_HNG", "");
						map.put("IMPT_DECL_NO", list.get(i).get("IMPT_DECL_NO"));
						map.put("QTY_UNIT", QTY_UNIT);
						wonCheck03(request, map);
						i++;
						if(i == list.size()){
							ji = ji;
							mi = 0;

							// 3개월 내에 미지정건 갯수가 모두 충족하므로 지정
							Map map2 = new HashMap();
							map2.put("KEY_ED_EXPT_INV", KEY_ED_EXPT_INV);
							map2.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
							map2.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
							map2.put("EXPT_QTY", EXPT_QTY);
							map2.put("taxNum", taxNum);
							map2.put("ORIG_STAT_OBJ", "지정");
							map2.put("drawCheck", "Y");
							wonCheck03_1(request, map2);
						}
					}
				// 미지정 백분율 수량이 모두 차감될때까지 돌림
				}while(mi > 0);
			}else{
				// 3개월 내에 미지정건 갯수가 충족하지 못하므로 그냥 대상
				Map map2 = new HashMap();
				if(beforeQty > 0){
					map2.put("ORIG_STAT_OBJ", "지정");
				}
				map2.put("KEY_ED_EXPT_INV", KEY_ED_EXPT_INV);
				map2.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
				map2.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
				map2.put("EXPT_QTY", beforeQty);
				map2.put("taxNum", taxNum);
				map2.put("drawCheck", "Y");
				wonCheck03_1(request, map2);
			}
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	//저세율에서 잔량 차감+ INV 업데이트 + 조정고시 아닌 것 drawCheck 공백
	@RequestMapping(value = "/wonCheck02_2")
	public ResponseEntity<?> wonCheck02_2(HttpServletRequest request, @RequestBody Map args){
		// 미지정 백분율수량
		int exptQty 				= Integer.parseInt(stringValueOf(args.get("exptQty")));
		String EXPT_ORDR_MNG_NO 	= stringValueOf(args.get("EXPT_ORDR_MNG_NO"));
		String EXPT_INV_SEQNO 		= stringValueOf(args.get("EXPT_INV_SEQNO"));
		String QTY_UNIT 			= stringValueOf(args.get("QTY_UNIT"));
		String KEY_ED_EXPT_INV 		= stringValueOf(args.get("KEY_ED_EXPT_INV"));
		String EXPT_QTY 			= stringValueOf(args.get("EXPT_QTY"));
		String taxNum 				= stringValueOf(args.get("taxNum"));

		try{
			List<Map> list = edwardsManagementService.selectCheckQty1(args);
			int i  = 0;
			int mi = exptQty;
			int ji = 0;
			if(list.size() > 0){
				do{
					// 과거 남은 수량 리스트에서 잔량이 미지정 수량보다 클때
					if((int)Double.parseDouble(stringValueOf(list.get(i).get("RMID_QTY"))) >= mi){
						System.out.println("####111111");
						ji = ji + mi;
						Map map = new HashMap();
						map.put("EXPT_QTY", mi);
						map.put("IMPT_ORDR_MNG_NO", list.get(i).get("IMPT_ORDR_MNG_NO"));
						map.put("IMPT_LAN", list.get(i).get("LAN"));
						map.put("IMPT_HNG", list.get(i).get("HNG"));

						map.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
						map.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
						map.put("taxNum", taxNum);
						map.put("IMPT_RMID_QTY", (int)Double.parseDouble(stringValueOf(list.get(i).get("RMID_QTY")))-mi);
						map.put("EXPT_LAN", "");
						map.put("EXPT_HNG", "");
						map.put("IMPT_DECL_NO", list.get(i).get("IMPT_DECL_NO"));
						map.put("QTY_UNIT", QTY_UNIT);
						wonCheck03(request, map);
						mi = 0;
						System.out.println("####222222");
						// 3개월 내에 미지정건 갯수가 모두 충족하므로 지정
						Map map2 = new HashMap();
						map2.put("KEY_ED_EXPT_INV", KEY_ED_EXPT_INV);
						map2.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
						map2.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
						map2.put("EXPT_QTY", EXPT_QTY);
						map2.put("taxNum", taxNum);
						map2.put("ORIG_STAT_OBJ", "지정");
						map2.put("drawCheck", "");
						System.out.println("44444"+map2);
						wonCheck03_1(request, map2);
					}else{
						System.out.println("####333");
						// 과거 남은 리스트 잔량이 미지정 수량보다 작을때
						ji = ji + (int)Double.parseDouble(stringValueOf(list.get(i).get("RMID_QTY")));
						mi = mi - (int)Double.parseDouble(stringValueOf(list.get(i).get("RMID_QTY")));
						System.out.println("##"+ji);
						System.out.println("##"+mi);
						Map map = new HashMap();
						map.put("EXPT_QTY", (int)Double.parseDouble(stringValueOf(list.get(i).get("RMID_QTY"))));
						map.put("IMPT_ORDR_MNG_NO", list.get(i).get("IMPT_ORDR_MNG_NO"));
						map.put("IMPT_LAN", list.get(i).get("LAN"));
						map.put("IMPT_HNG", list.get(i).get("HNG"));

						map.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
						map.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
						map.put("taxNum", taxNum);
						map.put("IMPT_RMID_QTY", "0");
						map.put("EXPT_LAN", "");
						map.put("EXPT_HNG", "");
						map.put("IMPT_DECL_NO", list.get(i).get("IMPT_DECL_NO"));
						map.put("QTY_UNIT", QTY_UNIT);
						wonCheck03(request, map);
						i++;
						if(i == list.size()){
							ji = ji;
							mi = 0;

							// 3개월 내에 미지정건 갯수가 모두 충족하므로 지정
							Map map2 = new HashMap();
							map2.put("KEY_ED_EXPT_INV", KEY_ED_EXPT_INV);
							map2.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
							map2.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
							map2.put("EXPT_QTY", EXPT_QTY);
							map2.put("taxNum", taxNum);
							map2.put("ORIG_STAT_OBJ", "지정");
							map2.put("drawCheck", "");
							wonCheck03_1(request, map2);
						}
					}
				// 미지정 백분율 수량이 모두 차감될때까지 돌림
				}while(mi > 0);
			}else{
				System.out.println("####444");
				// 3개월 내에 미지정건 갯수가 충족하지 못하므로 그냥 대상
				Map map2 = new HashMap();
				map2.put("KEY_ED_EXPT_INV", KEY_ED_EXPT_INV);
				map2.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
				map2.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
				map2.put("taxNum", taxNum);
				map2.put("EXPT_QTY", "0");
				map2.put("drawCheck", "");
				wonCheck03_1(request, map2);
			}
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	//세번변경에 따른 예외처리 수입통합 오래된 것 부터 차감+ INV 업데이트
	@RequestMapping(value = "/wonCheck02_3")
	public ResponseEntity<?> wonCheck02_3(HttpServletRequest request, @RequestBody Map args){
		// 미지정 백분율수량
		int exptQty 				= Integer.parseInt(stringValueOf(args.get("exptQty")));
		String EXPT_ORDR_MNG_NO 	= stringValueOf(args.get("EXPT_ORDR_MNG_NO"));
		String EXPT_INV_SEQNO 		= stringValueOf(args.get("EXPT_INV_SEQNO"));
		String QTY_UNIT 			= stringValueOf(args.get("QTY_UNIT"));
		String KEY_ED_EXPT_INV 		= stringValueOf(args.get("KEY_ED_EXPT_INV"));
		String EXPT_QTY 			= stringValueOf(args.get("EXPT_QTY"));
		String taxNum 				= stringValueOf(args.get("taxNum"));

		try{
			List<Map> list = edwardsManagementService.selectCheckQty11(args);
			int i  = 0;
			int mi = exptQty;
			int ji = 0;
			if(list.size() > 0){
				do{
					// 과거 남은 수량 리스트에서 잔량이 미지정 수량보다 클때
					if((int)Double.parseDouble(stringValueOf(list.get(i).get("RMID_QTY"))) >= mi){
						System.out.println("33333333");
						ji = ji + mi;
						Map map = new HashMap();
						map.put("EXPT_QTY", mi);
						map.put("IMPT_ORDR_MNG_NO", list.get(i).get("IMPT_ORDR_MNG_NO"));
						map.put("IMPT_LAN", list.get(i).get("LAN"));
						map.put("IMPT_HNG", list.get(i).get("HNG"));

						map.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
						map.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
						map.put("taxNum", taxNum);
						map.put("IMPT_RMID_QTY", (int)Double.parseDouble(stringValueOf(list.get(i).get("RMID_QTY")))-mi);
						map.put("EXPT_LAN", "");
						map.put("EXPT_HNG", "");
						map.put("IMPT_DECL_NO", list.get(i).get("IMPT_DECL_NO"));
						map.put("QTY_UNIT", QTY_UNIT);
						wonCheck03(request, map);
						mi = 0;

						// 미지정건 갯수가 모두 충족하므로 지정
						Map map2 = new HashMap();
						map2.put("KEY_ED_EXPT_INV", KEY_ED_EXPT_INV);
						map2.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
						map2.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
						map2.put("EXPT_QTY", EXPT_QTY);
						map2.put("taxNum", taxNum);
						map2.put("ORIG_STAT_OBJ", "지정");
						map2.put("drawCheck", "Y");
						System.out.println("44444"+map2);
						wonCheck03_1(request, map2);
					}else{
						System.out.println("222222222");
						// 과거 남은 리스트 잔량이 미지정 수량보다 작을때
						ji = ji + (int)Double.parseDouble(stringValueOf(list.get(i).get("RMID_QTY")));
						mi = mi - (int)Double.parseDouble(stringValueOf(list.get(i).get("RMID_QTY")));
						System.out.println("##"+ji);
						System.out.println("##"+mi);
						Map map = new HashMap();
						map.put("EXPT_QTY", (int)Double.parseDouble(stringValueOf(list.get(i).get("RMID_QTY"))));
						map.put("IMPT_ORDR_MNG_NO", list.get(i).get("IMPT_ORDR_MNG_NO"));
						map.put("IMPT_LAN", list.get(i).get("LAN"));
						map.put("IMPT_HNG", list.get(i).get("HNG"));

						map.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
						map.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
						map.put("taxNum", taxNum);
						map.put("IMPT_RMID_QTY", "0");
						map.put("EXPT_LAN", "");
						map.put("EXPT_HNG", "");
						map.put("IMPT_DECL_NO", list.get(i).get("IMPT_DECL_NO"));
						map.put("QTY_UNIT", QTY_UNIT);
						wonCheck03(request, map);
						i++;
						if(i == list.size()){
							ji = ji;
							mi = 0;

							// 미지정건 갯수가 모두 충족하므로 지정
							Map map2 = new HashMap();
							map2.put("KEY_ED_EXPT_INV", KEY_ED_EXPT_INV);
							map2.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
							map2.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
							map2.put("EXPT_QTY", EXPT_QTY);
							map2.put("taxNum", taxNum);
							map2.put("ORIG_STAT_OBJ", "지정");
							map2.put("drawCheck", "Y");
							wonCheck03_1(request, map2);
						}
					}
				// 미지정 백분율 수량이 모두 차감될때까지 돌림
				}while(mi > 0);
			}else{
				// 미지정건 갯수가 충족하지 못하므로 그냥 대상
				Map map2 = new HashMap();
				map2.put("KEY_ED_EXPT_INV", KEY_ED_EXPT_INV);
				map2.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
				map2.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
				map2.put("taxNum", taxNum);
				map2.put("EXPT_QTY", "0");
				map2.put("drawCheck", "Y");
				wonCheck03_1(request, map2);
			}
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	//wonCheck02에서 selectCheckQty11만 바뀐것
	@RequestMapping(value = "/wonCheck02_4")
	public ResponseEntity<?> wonCheck02_4(HttpServletRequest request, @RequestBody Map args){
		// 미지정 백분율수량
		int exptQty 				= Integer.parseInt(stringValueOf(args.get("exptQty"))); //미지정수량
		String EXPT_ORDR_MNG_NO 	= stringValueOf(args.get("EXPT_ORDR_MNG_NO"));
		String EXPT_INV_SEQNO 		= stringValueOf(args.get("EXPT_INV_SEQNO"));
		String QTY_UNIT 			= stringValueOf(args.get("QTY_UNIT"));
		String taxNum 				= stringValueOf(args.get("taxNum"));

		try{
			List<Map> list = edwardsManagementService.selectCheckQty11(args);
			int i  = 0;
			int mi = exptQty;
			int ji = 0;
			if(list.size() > 0){
				do{
					// 과거 남은 수량 리스트에서 잔량이 미지정 수량보다 클때
					if((int)Double.parseDouble(stringValueOf(list.get(i).get("RMID_QTY"))) >= mi){
						ji = ji + mi;
						Map map = new HashMap();
						map.put("EXPT_QTY", mi);
						map.put("IMPT_ORDR_MNG_NO", list.get(i).get("IMPT_ORDR_MNG_NO"));
						map.put("IMPT_LAN", list.get(i).get("LAN"));
						map.put("IMPT_HNG", list.get(i).get("HNG"));

						map.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
						map.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
						map.put("taxNum", taxNum);
						map.put("IMPT_RMID_QTY", (int)Double.parseDouble(stringValueOf(list.get(i).get("RMID_QTY")))-mi);
						map.put("EXPT_LAN", "");
						map.put("EXPT_HNG", "");
						map.put("IMPT_DECL_NO", list.get(i).get("IMPT_DECL_NO"));
						map.put("QTY_UNIT", QTY_UNIT);
						wonCheck03(request, map);
						mi = 0;
					}else{
						// 과거 남은 리스트 잔량이 미지정 수량보다 작을때
						ji = ji + (int)Double.parseDouble(stringValueOf(list.get(i).get("RMID_QTY")));
						mi = mi - (int)Double.parseDouble(stringValueOf(list.get(i).get("RMID_QTY")));
						Map map = new HashMap();
						map.put("EXPT_QTY", (int)Double.parseDouble(stringValueOf(list.get(i).get("RMID_QTY"))));
						map.put("IMPT_ORDR_MNG_NO", list.get(i).get("IMPT_ORDR_MNG_NO"));
						map.put("IMPT_LAN", list.get(i).get("LAN"));
						map.put("IMPT_HNG", list.get(i).get("HNG"));

						map.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
						map.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
						map.put("taxNum", taxNum);
						map.put("IMPT_RMID_QTY", "0");
						map.put("EXPT_LAN", "");
						map.put("EXPT_HNG", "");
						map.put("IMPT_DECL_NO", list.get(i).get("IMPT_DECL_NO"));
						map.put("QTY_UNIT", QTY_UNIT);
						wonCheck03(request, map);
						i++;
						if(i == list.size()){
							ji = ji;
							mi = 0;
						}
					}
				// 미지정 백분율 수량이 모두 차감될때까지 돌림
				}while(mi > 0);
			}
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	//wonCheck02_2에서 selectCheckQty11로 바뀐 것
	@RequestMapping(value = "/wonCheck02_5")
	public ResponseEntity<?> wonCheck02_5(HttpServletRequest request, @RequestBody Map args){
		// 미지정 백분율수량
		int exptQty 				= Integer.parseInt(stringValueOf(args.get("exptQty")));
		String EXPT_ORDR_MNG_NO 	= stringValueOf(args.get("EXPT_ORDR_MNG_NO"));
		String EXPT_INV_SEQNO 		= stringValueOf(args.get("EXPT_INV_SEQNO"));
		String QTY_UNIT 			= stringValueOf(args.get("QTY_UNIT"));
		String KEY_ED_EXPT_INV 		= stringValueOf(args.get("KEY_ED_EXPT_INV"));
		String EXPT_QTY 			= stringValueOf(args.get("EXPT_QTY"));
		String taxNum 				= stringValueOf(args.get("taxNum"));

		try{
			List<Map> list = edwardsManagementService.selectCheckQty11(args);
			int i  = 0;
			int mi = exptQty;
			int ji = 0;
			if(list.size() > 0){
				do{
					// 과거 남은 수량 리스트에서 잔량이 미지정 수량보다 클때
					if((int)Double.parseDouble(stringValueOf(list.get(i).get("RMID_QTY"))) >= mi){
						System.out.println("####111111");
						ji = ji + mi;
						Map map = new HashMap();
						map.put("EXPT_QTY", mi);
						map.put("IMPT_ORDR_MNG_NO", list.get(i).get("IMPT_ORDR_MNG_NO"));
						map.put("IMPT_LAN", list.get(i).get("LAN"));
						map.put("IMPT_HNG", list.get(i).get("HNG"));

						map.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
						map.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
						map.put("taxNum", taxNum);
						map.put("IMPT_RMID_QTY", (int)Double.parseDouble(stringValueOf(list.get(i).get("RMID_QTY")))-mi);
						map.put("EXPT_LAN", "");
						map.put("EXPT_HNG", "");
						map.put("IMPT_DECL_NO", list.get(i).get("IMPT_DECL_NO"));
						map.put("QTY_UNIT", QTY_UNIT);
						wonCheck03(request, map);
						mi = 0;
						System.out.println("####222222");
						// 3개월 내에 미지정건 갯수가 모두 충족하므로 지정
						Map map2 = new HashMap();
						map2.put("KEY_ED_EXPT_INV", KEY_ED_EXPT_INV);
						map2.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
						map2.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
						map2.put("EXPT_QTY", EXPT_QTY);
						map2.put("taxNum", taxNum);
						map2.put("ORIG_STAT_OBJ", "지정");
						map2.put("drawCheck", "");
						System.out.println("44444"+map2);
						wonCheck03_1(request, map2);
					}else{
						System.out.println("####333");
						// 과거 남은 리스트 잔량이 미지정 수량보다 작을때
						ji = ji + (int)Double.parseDouble(stringValueOf(list.get(i).get("RMID_QTY")));
						mi = mi - (int)Double.parseDouble(stringValueOf(list.get(i).get("RMID_QTY")));
						System.out.println("##"+ji);
						System.out.println("##"+mi);
						Map map = new HashMap();
						map.put("EXPT_QTY", (int)Double.parseDouble(stringValueOf(list.get(i).get("RMID_QTY"))));
						map.put("IMPT_ORDR_MNG_NO", list.get(i).get("IMPT_ORDR_MNG_NO"));
						map.put("IMPT_LAN", list.get(i).get("LAN"));
						map.put("IMPT_HNG", list.get(i).get("HNG"));

						map.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
						map.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
						map.put("taxNum", taxNum);
						map.put("IMPT_RMID_QTY", "0");
						map.put("EXPT_LAN", "");
						map.put("EXPT_HNG", "");
						map.put("IMPT_DECL_NO", list.get(i).get("IMPT_DECL_NO"));
						map.put("QTY_UNIT", QTY_UNIT);
						wonCheck03(request, map);
						i++;
						if(i == list.size()){
							ji = ji;
							mi = 0;

							// 3개월 내에 미지정건 갯수가 모두 충족하므로 지정
							Map map2 = new HashMap();
							map2.put("KEY_ED_EXPT_INV", KEY_ED_EXPT_INV);
							map2.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
							map2.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
							map2.put("EXPT_QTY", EXPT_QTY);
							map2.put("taxNum", taxNum);
							map2.put("ORIG_STAT_OBJ", "지정");
							map2.put("drawCheck", "");
							wonCheck03_1(request, map2);
						}
					}
				// 미지정 백분율 수량이 모두 차감될때까지 돌림
				}while(mi > 0);
			}else{
				System.out.println("####444");
				// 3개월 내에 미지정건 갯수가 충족하지 못하므로 그냥 대상
				Map map2 = new HashMap();
				map2.put("KEY_ED_EXPT_INV", KEY_ED_EXPT_INV);
				map2.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
				map2.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
				map2.put("taxNum", taxNum);
				map2.put("EXPT_QTY", "0");
				map2.put("drawCheck", "");
				wonCheck03_1(request, map2);
			}
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/wonCheck03")
	public ResponseEntity<?> wonCheck03(HttpServletRequest request, @RequestBody Map args){
		String ID				= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
		String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
		String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
		String taxNum 			= stringValueOf(args.get("taxNum"));

		try{
			System.out.println("####wonCheck03");
			args.put("ID",ID);
			args.put("userNm",userNm);
			args.put("currentDatetime",currentDatetime);
			List<Map> list2 = edwardsManagementService.selectMaxOrigStat(args);
			List<Map> list3 = edwardsManagementService.selectDrawOrigStat(args);
			args.put("OneGwan_tax",list3.get(0).get("OneGwan_tax"));
			args.put("Onetotal_tax",list3.get(0).get("Onetotal_tax"));
			System.out.println("####"+list2.get(0).get("SEQNO"));
			if(list2.get(0).get("SEQNO").equals(0)){
				args.put("SEQNO","1");
				long result1 = edwardsManagementService.insertOrigStat(args);
				System.out.println("####aaaaa");
			}else{
				args.put("SEQNO",list2.get(0).get("SEQNO"));
				long result1 = edwardsManagementService.insertOrigStat(args);
				System.out.println("####bbbbb");
			}
			long result = edwardsManagementService.updateImpoHng(args);
			System.out.println("####updateImpoHng");
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/wonCheck03_1")
	public ResponseEntity<?> wonCheck03_1(HttpServletRequest request, @RequestBody Map args){
		String KEY_ED_EXPT_INV  = args.containsKey("KEY_ED_EXPT_INV") ? stringValueOf(args.get("KEY_ED_EXPT_INV")) : "";
		String ID				= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
		String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
		String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
		String taxNum 			= stringValueOf(args.get("taxNum"));

		try{
			if(KEY_ED_EXPT_INV.equals("")){
				args.put("addUserId",ID);
				args.put("addUserNm",userNm);
				args.put("addDtm",currentDatetime);
				List<Map> list2 = edwardsManagementService.selectMaxExptInv(args);
				if(!list2.get(0).get("EXPT_INV_SEQNO").equals("001")){
					args.put("EXPT_INV_SEQNO",list2.get(0).get("EXPT_INV_SEQNO"));
					long result = edwardsManagementService.insertExpoInv(args);
					return new ResponseEntity<>(result, HttpStatus.OK);
				}else{
					args.put("EXPT_INV_SEQNO","001");
					long result = edwardsManagementService.insertExpoInv(args);
					return new ResponseEntity<>(result, HttpStatus.OK);
				}
			}else{
				args.put("editUserId",ID);
				args.put("editUserNm",userNm);
				args.put("editDtm",currentDatetime);
				args.put("userNm",userNm);
				args.put("currentDatetime",currentDatetime);
				long result = edwardsManagementService.updateExpoInv(args);
				return new ResponseEntity<>(result, HttpStatus.OK);
			}
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectDrawCheck31")
	public ResponseEntity<?> selectDrawCheck31(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		String treeMonth 	= stringValueOf(args.get("treeMonth"));
		String twoYear 		= stringValueOf(args.get("twoYear"));
		String taxNum 		= stringValueOf(args.get("taxNum"));

		try{
			//선택항목에서
			List<Map> list = edwardsManagementService.selectDrawCheck3(args);

			for (int i = 0, n = list.size(); i < n; i++) {
				Map map = new HashMap();
				map.put("ITEM_CD", list.get(i).get("PROD_CD"));
				map.put("ORIG", list.get(i).get("ORIG"));
				map.put("HS_CD", list.get(i).get("HS_CD"));
				map.put("Mhs_rate", stringValueOf(list.get(i).get("Mhs_rate")).replace(".0", ""));
				map.put("twoYear", treeMonth);
				// 3개월내 잔량 구하기
				List<Map> list1 = edwardsManagementService.threeMonthRmidQty(map);
				// 잔량이 0보다 크면 3개월 내에서 해결하기
				// RMID_QTY가 소수점이 있으므로 정수형으로 변경 (1.99 -> 1, 0.99 -> 0)
				if((int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY"))) > 0){
					// 3개월 내 총 잔량이 미지정수량보다 크거나 같으면 그 안에서 해결하기
					if((int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY")))-(int)Double.parseDouble(stringValueOf(list.get(i).get("NOT_ORIG_STAT_QTY"))) >= 0){
						Map map1 = new HashMap();
						map1.put("ITEM_CD", list.get(i).get("PROD_CD"));
						map1.put("ORIG", list.get(i).get("ORIG"));
						map1.put("HS_CD", list.get(i).get("HS_CD"));
						map1.put("Mhs_rate", stringValueOf(list.get(i).get("Mhs_rate")).replace(".0", ""));
						map1.put("twoYear", treeMonth);
						map1.put("taxNum", taxNum);
						map1.put("exptQty", (int)Double.parseDouble(stringValueOf(list.get(i).get("NOT_ORIG_STAT_QTY"))));
						map1.put("EXPT_ORDR_MNG_NO", list.get(i).get("EXPT_ORDR_MNG_NO"));
						map1.put("EXPT_INV_SEQNO", list.get(i).get("EXPT_INV_SEQNO"));
						map1.put("QTY_UNIT", list.get(i).get("QTY_UNIT"));

						map1.put("KEY_ED_EXPT_INV", list.get(i).get("KEY_ED_EXPT_INV"));
						map1.put("EXPT_QTY", (int)Double.parseDouble(stringValueOf(list.get(i).get("NOT_ORIG_STAT_QTY"))));
						map1.put("beforeQty", 0);
						wonCheck02_1(request, map1);
					}else{
						// 3개월 내 총 잔량이 미지정수량보다 작으면 3개월 처리 후 2년 내로 늘리기
						Map map2 = new HashMap();
						map2.put("ITEM_CD", list.get(i).get("PROD_CD"));
						map2.put("ORIG", list.get(i).get("ORIG"));
						map2.put("HS_CD", list.get(i).get("HS_CD"));
						map2.put("Mhs_rate", stringValueOf(list.get(i).get("Mhs_rate")).replace(".0", ""));
						map2.put("twoYear", treeMonth);
						map2.put("taxNum", taxNum);
						map2.put("exptQty", (int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY"))));
						map2.put("EXPT_ORDR_MNG_NO", list.get(i).get("EXPT_ORDR_MNG_NO"));
						map2.put("EXPT_INV_SEQNO", list.get(i).get("EXPT_INV_SEQNO"));
						map2.put("QTY_UNIT", list.get(i).get("QTY_UNIT"));
						wonCheck02(request, map2);

						// 나머지는 2년치 자료에서
						Map map3 = new HashMap();
						map3.put("ITEM_CD", list.get(i).get("PROD_CD"));
						map3.put("ORIG", list.get(i).get("ORIG"));
						map3.put("HS_CD", list.get(i).get("HS_CD"));
						map3.put("Mhs_rate", stringValueOf(list.get(i).get("Mhs_rate")).replace(".0", ""));
						map3.put("twoYear", twoYear);
						map3.put("taxNum", taxNum);
						map3.put("exptQty", (int)Double.parseDouble(stringValueOf(list.get(i).get("NOT_ORIG_STAT_QTY")))-(int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY"))));
						map3.put("EXPT_ORDR_MNG_NO", list.get(i).get("EXPT_ORDR_MNG_NO"));
						map3.put("EXPT_INV_SEQNO", list.get(i).get("EXPT_INV_SEQNO"));
						map3.put("QTY_UNIT", list.get(i).get("QTY_UNIT"));

						map3.put("KEY_ED_EXPT_INV", list.get(i).get("KEY_ED_EXPT_INV"));
						map3.put("EXPT_QTY", (int)Double.parseDouble(stringValueOf(list.get(i).get("NOT_ORIG_STAT_QTY"))));
						map3.put("beforeQty", (int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY"))));
						wonCheck02_1(request, map3);
					}
				// 3개월 내 잔량이 없으면 2년내 검색
				}else{
					Map map3 = new HashMap();
					map3.put("ITEM_CD", list.get(i).get("PROD_CD"));
					map3.put("ORIG", list.get(i).get("ORIG"));
					map3.put("HS_CD", list.get(i).get("HS_CD"));
					map3.put("Mhs_rate", stringValueOf(list.get(i).get("Mhs_rate")).replace(".0", ""));
					map3.put("twoYear", twoYear);
					map3.put("taxNum", taxNum);
					map3.put("exptQty", (int)Double.parseDouble(stringValueOf(list.get(i).get("NOT_ORIG_STAT_QTY"))));
					map3.put("EXPT_ORDR_MNG_NO", list.get(i).get("EXPT_ORDR_MNG_NO"));
					map3.put("EXPT_INV_SEQNO", list.get(i).get("EXPT_INV_SEQNO"));
					map3.put("QTY_UNIT", list.get(i).get("QTY_UNIT"));

					map3.put("KEY_ED_EXPT_INV", list.get(i).get("KEY_ED_EXPT_INV"));
					map3.put("EXPT_QTY", (int)Double.parseDouble(stringValueOf(list.get(i).get("NOT_ORIG_STAT_QTY"))));
					map3.put("beforeQty", 0);
					wonCheck02_1(request, map3);
				}
			}
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectDrawCheck21")
	public ResponseEntity<?> selectDrawCheck21(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		String twoYear 		= stringValueOf(args.get("twoYear"));
		String taxNum 		= stringValueOf(args.get("taxNum"));

		try{
			//선택항목에서
			List<Map> list = edwardsManagementService.selectDrawCheck2(args);

			for (int i = 0, n = list.size(); i < n; i++) {
				Map map = new HashMap();
				map.put("ITEM_CD", list.get(i).get("PROD_CD"));
				map.put("ORIG", list.get(i).get("ORIG"));
				map.put("HS_CD", list.get(i).get("HS_CD"));
				map.put("Mhs_rate", stringValueOf(list.get(i).get("Mhs_rate")).replace(".0", ""));
				map.put("twoYear", twoYear);
				// 2년내 잔량 구하기
				List<Map> list1 = edwardsManagementService.threeMonthRmidQty(map);
				// 잔량이 0보다 크면 2년 내에서 해결하기
				// RMID_QTY가 소수점이 있으므로 정수형으로 변경 (1.99 -> 1, 0.99 -> 0)
				if((int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY"))) > 0){
					// 2년 내 총 잔량이 미지정수량보다 크거나 같으면 그 안에서 해결하기
					if((int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY")))-(int)Double.parseDouble(stringValueOf(list.get(i).get("NOT_ORIG_STAT_QTY"))) >= 0){
						Map map1 = new HashMap();
						map1.put("ITEM_CD", list.get(i).get("PROD_CD"));
						map1.put("ORIG", list.get(i).get("ORIG"));
						map1.put("HS_CD", list.get(i).get("HS_CD"));
						map1.put("Mhs_rate", stringValueOf(list.get(i).get("Mhs_rate")).replace(".0", ""));
						map1.put("twoYear", twoYear);
						map1.put("taxNum", taxNum);
						map1.put("exptQty", (int)Double.parseDouble(stringValueOf(list.get(i).get("NOT_ORIG_STAT_QTY"))));
						map1.put("EXPT_ORDR_MNG_NO", list.get(i).get("EXPT_ORDR_MNG_NO"));
						map1.put("EXPT_INV_SEQNO", list.get(i).get("EXPT_INV_SEQNO"));
						map1.put("QTY_UNIT", list.get(i).get("QTY_UNIT"));

						map1.put("KEY_ED_EXPT_INV", list.get(i).get("KEY_ED_EXPT_INV"));
						map1.put("EXPT_QTY", (int)Double.parseDouble(stringValueOf(list.get(i).get("NOT_ORIG_STAT_QTY"))));
						map1.put("beforeQty", 0);
						wonCheck02_1(request, map1);
					}else{
						// 2년 내 총 잔량이 미지정수량보다 작으면 2년 내 처리 후 타세율로 처리
						Map map2 = new HashMap();
						map2.put("ITEM_CD", list.get(i).get("PROD_CD"));
						map2.put("ORIG", list.get(i).get("ORIG"));
						map2.put("HS_CD", list.get(i).get("HS_CD"));
						map2.put("Mhs_rate", stringValueOf(list.get(i).get("Mhs_rate")).replace(".0", ""));
						map2.put("twoYear", twoYear);
						map2.put("taxNum", taxNum);
						map2.put("exptQty", (int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY"))));
						map2.put("EXPT_ORDR_MNG_NO", list.get(i).get("EXPT_ORDR_MNG_NO"));
						map2.put("EXPT_INV_SEQNO", list.get(i).get("EXPT_INV_SEQNO"));
						map2.put("QTY_UNIT", list.get(i).get("QTY_UNIT"));
						wonCheck02(request, map2);

						// 나머지는 타세율로 처리
						Map map3 = new HashMap();
						map3.put("ITEM_CD", list.get(i).get("PROD_CD"));
						map3.put("ORIG", list.get(i).get("ORIG"));
						map3.put("HS_CD", list.get(i).get("HS_CD"));
						map3.put("Mhs_rateE", "('"+stringValueOf(list.get(i).get("Mhs_rate")).replace(".0", "")+"')");
						map3.put("twoYear", twoYear);
						map3.put("taxNum", taxNum);
						map3.put("exptQty", (int)Double.parseDouble(stringValueOf(list.get(i).get("NOT_ORIG_STAT_QTY")))-(int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY"))));
						map3.put("EXPT_ORDR_MNG_NO", list.get(i).get("EXPT_ORDR_MNG_NO"));
						map3.put("EXPT_INV_SEQNO", list.get(i).get("EXPT_INV_SEQNO"));
						map3.put("QTY_UNIT", list.get(i).get("QTY_UNIT"));

						map3.put("KEY_ED_EXPT_INV", list.get(i).get("KEY_ED_EXPT_INV"));
						map3.put("EXPT_QTY", (int)Double.parseDouble(stringValueOf(list.get(i).get("NOT_ORIG_STAT_QTY"))));
						map3.put("beforeQty", (int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY"))));
						wonCheck02_1(request, map3);
					}
				// 2년 내 잔량이 없으면 타세율로 처리
				}else{
					Map map3 = new HashMap();
					map3.put("ITEM_CD", list.get(i).get("PROD_CD"));
					map3.put("ORIG", list.get(i).get("ORIG"));
					map3.put("HS_CD", list.get(i).get("HS_CD"));
					map3.put("Mhs_rateE", "('"+stringValueOf(list.get(i).get("Mhs_rate")).replace(".0", "")+"')");
					map3.put("twoYear", twoYear);
					map3.put("taxNum", taxNum);
					map3.put("exptQty", (int)Double.parseDouble(stringValueOf(list.get(i).get("NOT_ORIG_STAT_QTY"))));
					map3.put("EXPT_ORDR_MNG_NO", list.get(i).get("EXPT_ORDR_MNG_NO"));
					map3.put("EXPT_INV_SEQNO", list.get(i).get("EXPT_INV_SEQNO"));
					map3.put("QTY_UNIT", list.get(i).get("QTY_UNIT"));

					map3.put("KEY_ED_EXPT_INV", list.get(i).get("KEY_ED_EXPT_INV"));
					map3.put("EXPT_QTY", (int)Double.parseDouble(stringValueOf(list.get(i).get("NOT_ORIG_STAT_QTY"))));
					map3.put("beforeQty", 0);
					wonCheck02_1(request, map3);
				}
			}
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectDrawCheck11")
	public ResponseEntity<?> selectDrawCheck11(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		String treeMonth 	= stringValueOf(args.get("treeMonth"));
		String twoYear 		= stringValueOf(args.get("twoYear"));
		String taxNum 		= stringValueOf(args.get("taxNum"));

		try{
			//선택항목에서
			List<Map> list = edwardsManagementService.selectDrawCheck1(args);

			for (int i = 0, n = list.size(); i < n; i++) {
				Map map = new HashMap();
				map.put("ITEM_CD", list.get(i).get("PROD_CD"));
				map.put("ORIG", list.get(i).get("ORIG"));
				if(list.get(i).get("HS_CD").equals("8537105090")){ //2022년 세번변경으로 인한 조치
					map.put("HS_CD_ALL", "('8537105090','8537109000','8537102090')");
				}else if(list.get(i).get("HS_CD").equals("8537104000")){
					map.put("HS_CD_ALL", "('8537104000','8537101000')");
				}else if(list.get(i).get("HS_CD").equals("8538905000")){
					map.put("HS_CD_ALL", "('8538905000','8538904000')");
				}else{
					map.put("HS_CD", list.get(i).get("HS_CD"));
				}
				map.put("twoYear", treeMonth);
				// 3개월내 잔량 구하기 ITEM_CD+HS_CD 하나의 아이템에 3개월간 남아 있는 총갯수
				List<Map> list1 = edwardsManagementService.threeMonthRmidQty(map);
				// 잔량이 0보다 크면 3개월 내에서 해결하기
				// RMID_QTY가 소수점이 있으므로 정수형으로 변경 (1.99 -> 1, 0.99 -> 0)
				if((int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY"))) > 0){
					// 3개월 내 총 잔량이 미지정수량보다 크거나 같으면 그 안에서 해결하기
					if((int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY")))-(int)Double.parseDouble(stringValueOf(list.get(i).get("NOT_ORIG_STAT_QTY"))) >= 0){
						Map map1 = new HashMap();
						map1.put("ITEM_CD", list.get(i).get("PROD_CD"));
						map1.put("ORIG", list.get(i).get("ORIG"));
						if(list.get(i).get("HS_CD").equals("8537105090")){ //2022년 세번변경으로 인한 조치
							map1.put("HS_CD_ALL", "('8537105090','8537109000','8537102090')");
						}else if(list.get(i).get("HS_CD").equals("8537104000")){
							map1.put("HS_CD_ALL", "('8537104000','8537101000')");
						}else if(list.get(i).get("HS_CD").equals("8538905000")){
							map1.put("HS_CD_ALL", "('8538905000','8538904000')");
						}else{
							map1.put("HS_CD", list.get(i).get("HS_CD"));
						}
						map1.put("taxNum", taxNum);
						map1.put("twoYear", treeMonth);
						map1.put("exptQty", (int)Double.parseDouble(stringValueOf(list.get(i).get("NOT_ORIG_STAT_QTY"))));
						map1.put("EXPT_ORDR_MNG_NO", list.get(i).get("EXPT_ORDR_MNG_NO"));
						map1.put("EXPT_INV_SEQNO", list.get(i).get("EXPT_INV_SEQNO"));
						map1.put("QTY_UNIT", list.get(i).get("QTY_UNIT"));

						map1.put("KEY_ED_EXPT_INV", list.get(i).get("KEY_ED_EXPT_INV"));
						map1.put("EXPT_QTY", (int)Double.parseDouble(stringValueOf(list.get(i).get("NOT_ORIG_STAT_QTY"))));
						map1.put("beforeQty", 0);
						wonCheck02_1(request, map1);
					}else{
//						if(list.get(i).get("HS_CD").equals("8537105090")){ //2022년 세번변경으로 인한 조치
//							// 3개월 내 총 잔량이 미지정수량보다 작으면 3개월 처리 후 아래단계에서
//							Map map2 = new HashMap();
//							map2.put("ITEM_CD", list.get(i).get("PROD_CD"));
//							map2.put("ORIG", list.get(i).get("ORIG"));
//							map2.put("HS_CD", list.get(i).get("HS_CD"));
//							map2.put("twoYear", treeMonth);
//							map2.put("exptQty", (int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY"))));
//							map2.put("EXPT_ORDR_MNG_NO", list.get(i).get("EXPT_ORDR_MNG_NO"));
//							map2.put("EXPT_INV_SEQNO", list.get(i).get("EXPT_INV_SEQNO"));
//							map2.put("QTY_UNIT", list.get(i).get("QTY_UNIT"));
//							wonCheck02(request, map2);
//
//							// 나머지는 8537105090, 8537109000, 8537102090 중 2년내 오래된 것부터 차감
//							Map map3 = new HashMap();
//							map3.put("ITEM_CD", list.get(i).get("PROD_CD"));
//							map3.put("ORIG", list.get(i).get("ORIG"));
//							map3.put("HS_CD", "('8537105090','8537109000','8537102090')");
//							map3.put("twoYear", twoYear);
//							map3.put("exptQty", (int)Double.parseDouble(stringValueOf(list.get(i).get("NOT_ORIG_STAT_QTY")))-(int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY"))));
//							map3.put("EXPT_ORDR_MNG_NO", list.get(i).get("EXPT_ORDR_MNG_NO"));
//							map3.put("EXPT_INV_SEQNO", list.get(i).get("EXPT_INV_SEQNO"));
//							map3.put("QTY_UNIT", list.get(i).get("QTY_UNIT"));
//
//							map3.put("KEY_ED_EXPT_INV", list.get(i).get("KEY_ED_EXPT_INV"));
//							map3.put("EXPT_QTY", (int)Double.parseDouble(stringValueOf(list.get(i).get("NOT_ORIG_STAT_QTY"))));
//							wonCheck02_3(request, map3);
//						}else if(list.get(i).get("HS_CD").equals("8537104000")){ //2022년 세번변경으로 인한 조치
//							// 3개월 내 총 잔량이 미지정수량보다 작으면 3개월 처리 후 아래단계에서
//							Map map2 = new HashMap();
//							map2.put("ITEM_CD", list.get(i).get("PROD_CD"));
//							map2.put("ORIG", list.get(i).get("ORIG"));
//							map2.put("HS_CD", list.get(i).get("HS_CD"));
//							map2.put("twoYear", treeMonth);
//							map2.put("exptQty", (int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY"))));
//							map2.put("EXPT_ORDR_MNG_NO", list.get(i).get("EXPT_ORDR_MNG_NO"));
//							map2.put("EXPT_INV_SEQNO", list.get(i).get("EXPT_INV_SEQNO"));
//							map2.put("QTY_UNIT", list.get(i).get("QTY_UNIT"));
//							wonCheck02(request, map2);
//
//							// 나머지는 8537104000, 8537101000 중 2년내 오래된 것부터 차감
//							Map map3 = new HashMap();
//							map3.put("ITEM_CD", list.get(i).get("PROD_CD"));
//							map3.put("ORIG", list.get(i).get("ORIG"));
//							map3.put("HS_CD", "('8537104000','8537101000')");
//							map3.put("twoYear", twoYear);
//							map3.put("exptQty", (int)Double.parseDouble(stringValueOf(list.get(i).get("NOT_ORIG_STAT_QTY")))-(int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY"))));
//							map3.put("EXPT_ORDR_MNG_NO", list.get(i).get("EXPT_ORDR_MNG_NO"));
//							map3.put("EXPT_INV_SEQNO", list.get(i).get("EXPT_INV_SEQNO"));
//							map3.put("QTY_UNIT", list.get(i).get("QTY_UNIT"));
//
//							map3.put("KEY_ED_EXPT_INV", list.get(i).get("KEY_ED_EXPT_INV"));
//							map3.put("EXPT_QTY", (int)Double.parseDouble(stringValueOf(list.get(i).get("NOT_ORIG_STAT_QTY"))));
//							wonCheck02_3(request, map3);
//						}else if(list.get(i).get("HS_CD").equals("8538905000")){ //2022년 세번변경으로 인한 조치
//							// 3개월 내 총 잔량이 미지정수량보다 작으면 3개월 처리 후 아래단계에서
//							Map map2 = new HashMap();
//							map2.put("ITEM_CD", list.get(i).get("PROD_CD"));
//							map2.put("ORIG", list.get(i).get("ORIG"));
//							map2.put("HS_CD", list.get(i).get("HS_CD"));
//							map2.put("twoYear", treeMonth);
//							map2.put("exptQty", (int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY"))));
//							map2.put("EXPT_ORDR_MNG_NO", list.get(i).get("EXPT_ORDR_MNG_NO"));
//							map2.put("EXPT_INV_SEQNO", list.get(i).get("EXPT_INV_SEQNO"));
//							map2.put("QTY_UNIT", list.get(i).get("QTY_UNIT"));
//							wonCheck02(request, map2);
//
//							// 나머지는 8538905000, 8538904000 중 2년내 오래된 것부터 차감
//							Map map3 = new HashMap();
//							map3.put("ITEM_CD", list.get(i).get("PROD_CD"));
//							map3.put("ORIG", list.get(i).get("ORIG"));
//							map3.put("HS_CD", "('8538905000','8538904000')");
//							map3.put("twoYear", twoYear);
//							map3.put("exptQty", (int)Double.parseDouble(stringValueOf(list.get(i).get("NOT_ORIG_STAT_QTY")))-(int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY"))));
//							map3.put("EXPT_ORDR_MNG_NO", list.get(i).get("EXPT_ORDR_MNG_NO"));
//							map3.put("EXPT_INV_SEQNO", list.get(i).get("EXPT_INV_SEQNO"));
//							map3.put("QTY_UNIT", list.get(i).get("QTY_UNIT"));
//
//							map3.put("KEY_ED_EXPT_INV", list.get(i).get("KEY_ED_EXPT_INV"));
//							map3.put("EXPT_QTY", (int)Double.parseDouble(stringValueOf(list.get(i).get("NOT_ORIG_STAT_QTY"))));
//							wonCheck02_3(request, map3);
//						}else{
							// 3개월 내 총 잔량이 미지정수량보다 작으면 3개월 처리 후 아래단계에서 2년 내로 늘리기
							Map map2 = new HashMap();
							map2.put("ITEM_CD", list.get(i).get("PROD_CD"));
							map2.put("ORIG", list.get(i).get("ORIG"));
							if(list.get(i).get("HS_CD").equals("8537105090")){ //2022년 세번변경으로 인한 조치
								map2.put("HS_CD_ALL", "('8537105090','8537109000','8537102090')");
							}else if(list.get(i).get("HS_CD").equals("8537104000")){
								map2.put("HS_CD_ALL", "('8537104000','8537101000')");
							}else if(list.get(i).get("HS_CD").equals("8538905000")){
								map2.put("HS_CD_ALL", "('8538905000','8538904000')");
							}else{
								map2.put("HS_CD", list.get(i).get("HS_CD"));
							}
							map2.put("taxNum", taxNum);
							map2.put("twoYear", treeMonth);
							map2.put("exptQty", (int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY"))));
							map2.put("EXPT_ORDR_MNG_NO", list.get(i).get("EXPT_ORDR_MNG_NO"));
							map2.put("EXPT_INV_SEQNO", list.get(i).get("EXPT_INV_SEQNO"));
							map2.put("QTY_UNIT", list.get(i).get("QTY_UNIT"));
							wonCheck02(request, map2);

							// 나머지는 2년치 자료에서
							Map map3 = new HashMap();
							map3.put("ITEM_CD", list.get(i).get("PROD_CD"));
							map3.put("ORIG", list.get(i).get("ORIG"));
							if(list.get(i).get("HS_CD").equals("8537105090")){ //2022년 세번변경으로 인한 조치
								map3.put("HS_CD_ALL", "('8537105090','8537109000','8537102090')");
							}else if(list.get(i).get("HS_CD").equals("8537104000")){
								map3.put("HS_CD_ALL", "('8537104000','8537101000')");
							}else if(list.get(i).get("HS_CD").equals("8538905000")){
								map3.put("HS_CD_ALL", "('8538905000','8538904000')");
							}else{
								map3.put("HS_CD", list.get(i).get("HS_CD"));
							}
							map3.put("twoYear", twoYear);
							map3.put("taxNum", taxNum);
							map3.put("exptQty", (int)Double.parseDouble(stringValueOf(list.get(i).get("NOT_ORIG_STAT_QTY")))-(int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY"))));
							map3.put("EXPT_ORDR_MNG_NO", list.get(i).get("EXPT_ORDR_MNG_NO"));
							map3.put("EXPT_INV_SEQNO", list.get(i).get("EXPT_INV_SEQNO"));
							map3.put("QTY_UNIT", list.get(i).get("QTY_UNIT"));
							map3.put("beforeQty", (int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY")))); //2년치 데이터가 없으면 3개월 잔량이라도 지정해야 하므로

							map3.put("KEY_ED_EXPT_INV", list.get(i).get("KEY_ED_EXPT_INV"));
							map3.put("EXPT_QTY", (int)Double.parseDouble(stringValueOf(list.get(i).get("NOT_ORIG_STAT_QTY"))));
							map3.put("beforeQty", (int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY"))));
							wonCheck02_1(request, map3);
//						}
					}
				// 3개월 내 잔량이 없으면 2년내 검색
				}else{
//					if(list.get(i).get("HS_CD").equals("8537105090")){ //2022년 세번변경으로 인한 조치
//						// 8537105090, 8537109000, 8537102090 중 2년내 오래된 것부터 차감
//						Map map3 = new HashMap();
//						map3.put("ITEM_CD", list.get(i).get("PROD_CD"));
//						map3.put("ORIG", list.get(i).get("ORIG"));
//						map3.put("HS_CD", "('8537105090','8537109000','8537102090')");
//						map3.put("twoYear", twoYear);
//						map3.put("exptQty", (int)Double.parseDouble(stringValueOf(list.get(i).get("NOT_ORIG_STAT_QTY"))));
//						map3.put("EXPT_ORDR_MNG_NO", list.get(i).get("EXPT_ORDR_MNG_NO"));
//						map3.put("EXPT_INV_SEQNO", list.get(i).get("EXPT_INV_SEQNO"));
//						map3.put("QTY_UNIT", list.get(i).get("QTY_UNIT"));
//
//						map3.put("KEY_ED_EXPT_INV", list.get(i).get("KEY_ED_EXPT_INV"));
//						map3.put("EXPT_QTY", (int)Double.parseDouble(stringValueOf(list.get(i).get("NOT_ORIG_STAT_QTY"))));
//						wonCheck02_3(request, map3);
//					}else if(list.get(i).get("HS_CD").equals("8537104000")){ //2022년 세번변경으로 인한 조치
//						// 8537104000, 8537101000 중 2년내 오래된 것부터 차감
//						Map map3 = new HashMap();
//						map3.put("ITEM_CD", list.get(i).get("PROD_CD"));
//						map3.put("ORIG", list.get(i).get("ORIG"));
//						map3.put("HS_CD", "('8537104000','8537101000')");
//						map3.put("twoYear", twoYear);
//						map3.put("exptQty", (int)Double.parseDouble(stringValueOf(list.get(i).get("NOT_ORIG_STAT_QTY"))));
//						map3.put("EXPT_ORDR_MNG_NO", list.get(i).get("EXPT_ORDR_MNG_NO"));
//						map3.put("EXPT_INV_SEQNO", list.get(i).get("EXPT_INV_SEQNO"));
//						map3.put("QTY_UNIT", list.get(i).get("QTY_UNIT"));
//
//						map3.put("KEY_ED_EXPT_INV", list.get(i).get("KEY_ED_EXPT_INV"));
//						map3.put("EXPT_QTY", (int)Double.parseDouble(stringValueOf(list.get(i).get("NOT_ORIG_STAT_QTY"))));
//						wonCheck02_3(request, map3);
//					}else if(list.get(i).get("HS_CD").equals("8538905000")){ //2022년 세번변경으로 인한 조치
//						// 8538905000, 8538904000 중 2년내 오래된 것부터 차감
//						Map map3 = new HashMap();
//						map3.put("ITEM_CD", list.get(i).get("PROD_CD"));
//						map3.put("ORIG", list.get(i).get("ORIG"));
//						map3.put("HS_CD", "('8538905000','8538904000')");
//						map3.put("twoYear", twoYear);
//						map3.put("exptQty", (int)Double.parseDouble(stringValueOf(list.get(i).get("NOT_ORIG_STAT_QTY"))));
//						map3.put("EXPT_ORDR_MNG_NO", list.get(i).get("EXPT_ORDR_MNG_NO"));
//						map3.put("EXPT_INV_SEQNO", list.get(i).get("EXPT_INV_SEQNO"));
//						map3.put("QTY_UNIT", list.get(i).get("QTY_UNIT"));
//
//						map3.put("KEY_ED_EXPT_INV", list.get(i).get("KEY_ED_EXPT_INV"));
//						map3.put("EXPT_QTY", (int)Double.parseDouble(stringValueOf(list.get(i).get("NOT_ORIG_STAT_QTY"))));
//						wonCheck02_3(request, map3);
//					}else{
						Map map3 = new HashMap();
						map3.put("ITEM_CD", list.get(i).get("PROD_CD"));
						map3.put("ORIG", list.get(i).get("ORIG"));
						if(list.get(i).get("HS_CD").equals("8537105090")){ //2022년 세번변경으로 인한 조치
							map3.put("HS_CD_ALL", "('8537105090','8537109000','8537102090')");
						}else if(list.get(i).get("HS_CD").equals("8537104000")){
							map3.put("HS_CD_ALL", "('8537104000','8537101000')");
						}else if(list.get(i).get("HS_CD").equals("8538905000")){
							map3.put("HS_CD_ALL", "('8538905000','8538904000')");
						}else{
							map3.put("HS_CD", list.get(i).get("HS_CD"));
						}
						map3.put("twoYear", twoYear);
						map3.put("taxNum", taxNum);
						map3.put("exptQty", (int)Double.parseDouble(stringValueOf(list.get(i).get("NOT_ORIG_STAT_QTY"))));
						map3.put("EXPT_ORDR_MNG_NO", list.get(i).get("EXPT_ORDR_MNG_NO"));
						map3.put("EXPT_INV_SEQNO", list.get(i).get("EXPT_INV_SEQNO"));
						map3.put("QTY_UNIT", list.get(i).get("QTY_UNIT"));

						map3.put("KEY_ED_EXPT_INV", list.get(i).get("KEY_ED_EXPT_INV"));
						map3.put("EXPT_QTY", (int)Double.parseDouble(stringValueOf(list.get(i).get("NOT_ORIG_STAT_QTY"))));
						map3.put("beforeQty", 0);
						wonCheck02_1(request, map3);
//					}
				}
			}
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectDrawCheck01")
	public ResponseEntity<?> selectDrawCheck01(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		String twoYear 		= stringValueOf(args.get("twoYear"));

		try{
			//선택항목에서
			List<Map> list = edwardsManagementService.selectExpoInvMaster(args);

			for (int i = 0, n = list.size(); i < n; i++) {
				Map map = new HashMap();
				map.put("ITEM_CD", list.get(i).get("PROD_CD"));
				map.put("ORIG", list.get(i).get("ORIG"));
				map.put("HS_CD", list.get(i).get("HS_CD"));
				map.put("twoYear", twoYear);
				// 2년내 잔량 구하기
				List<Map> list1 = edwardsManagementService.threeMonthRmidQty(map);
				// 잔량이 0보다 크면 2년 내에서 해결하기
				// RMID_QTY가 소수점이 있으므로 정수형으로 변경 (1.99 -> 1, 0.99 -> 0)
				if((int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY"))) > 0){
					// 2년 내 총 잔량이 미지정수량보다 크거나 같으면 그 안에서 해결하기
					if((int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY")))-(int)Double.parseDouble(stringValueOf(list.get(i).get("NOT_ORIG_STAT_QTY"))) >= 0){
						Map map1 = new HashMap();
						map1.put("ITEM_CD", list.get(i).get("PROD_CD"));
						map1.put("ORIG", list.get(i).get("ORIG"));
						map1.put("HS_CD", list.get(i).get("HS_CD"));
						map1.put("twoYear", twoYear);
						map1.put("exptQty", (int)Double.parseDouble(stringValueOf(list.get(i).get("NOT_ORIG_STAT_QTY"))));
						map1.put("EXPT_ORDR_MNG_NO", list.get(i).get("EXPT_ORDR_MNG_NO"));
						map1.put("EXPT_INV_SEQNO", list.get(i).get("EXPT_INV_SEQNO"));
						map1.put("QTY_UNIT", list.get(i).get("QTY_UNIT"));

						map1.put("KEY_ED_EXPT_INV", list.get(i).get("KEY_ED_EXPT_INV"));
						map1.put("EXPT_QTY", (int)Double.parseDouble(stringValueOf(list.get(i).get("NOT_ORIG_STAT_QTY"))));
						wonCheck02_2(request, map1);
					}else{
						// 2년 내 총 잔량이 미지정수량보다 작으면 그만큼만 처리
						Map map2 = new HashMap();
						map2.put("ITEM_CD", list.get(i).get("PROD_CD"));
						map2.put("ORIG", list.get(i).get("ORIG"));
						map2.put("HS_CD", list.get(i).get("HS_CD"));
						map2.put("twoYear", twoYear);
						map2.put("exptQty", (int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY"))));
						map2.put("EXPT_ORDR_MNG_NO", list.get(i).get("EXPT_ORDR_MNG_NO"));
						map2.put("EXPT_INV_SEQNO", list.get(i).get("EXPT_INV_SEQNO"));
						map2.put("QTY_UNIT", list.get(i).get("QTY_UNIT"));

						map2.put("KEY_ED_EXPT_INV", list.get(i).get("KEY_ED_EXPT_INV"));
						map2.put("EXPT_QTY", (int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY"))));
						wonCheck02_2(request, map2);
					}
				}
			}
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectDrawCheck01New")
	public ResponseEntity<?> selectDrawCheck01New(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		String ITEM_CD 				= stringValueOf(args.get("ITEM_CD"));
		String ORIG 				= stringValueOf(args.get("ORIG"));
		String HS_CD 				= stringValueOf(args.get("HS_CD"));
		String NOT_ORIG_STAT_QTY 	= stringValueOf(args.get("NOT_ORIG_STAT_QTY"));
		String EXPT_ORDR_MNG_NO 	= stringValueOf(args.get("EXPT_ORDR_MNG_NO"));
		String EXPT_INV_SEQNO 		= stringValueOf(args.get("EXPT_INV_SEQNO"));
		String QTY_UNIT 			= stringValueOf(args.get("QTY_UNIT"));
		String KEY_ED_EXPT_INV 		= stringValueOf(args.get("KEY_ED_EXPT_INV"));
		String twoYear 				= stringValueOf(args.get("twoYear"));

		try{
			List<?> result = null;
			// 과거세번 먼저 차감 후 현재 세번 차감
			if(HS_CD.equals("3907299000")){
				Map map5 = new HashMap();
				map5.put("twoYear", twoYear);
				map5.put("ITEM_CD", ITEM_CD);
				map5.put("ORIG", ORIG);
				map5.put("HS_CD", "3907209000");
				List<Map> list5 = edwardsManagementService.threeMonthRmidQty(map5);
				if((int)Double.parseDouble(stringValueOf(list5.get(0).get("RMID_QTY"))) > 0){
					// 2년 내 총 잔량이 미지정수량보다 크거나 같으면 과거 세번 안에서 해결하기
					if((int)Double.parseDouble(stringValueOf(list5.get(0).get("RMID_QTY")))-(int)Double.parseDouble(NOT_ORIG_STAT_QTY) >= 0){
						Map map1 = new HashMap();
						map1.put("ITEM_CD", ITEM_CD);
						map1.put("ORIG", ORIG);
						map1.put("HS_CD", "3907209000");
						map1.put("twoYear", twoYear);
						map1.put("exptQty", (int)Double.parseDouble(NOT_ORIG_STAT_QTY));
						map1.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
						map1.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
						map1.put("QTY_UNIT", QTY_UNIT);

						map1.put("KEY_ED_EXPT_INV", KEY_ED_EXPT_INV);
						map1.put("EXPT_QTY", (int)Double.parseDouble(NOT_ORIG_STAT_QTY));
						wonCheck02_2(request, map1);
					}else{
						// 2년 내 과거세번 나머지 처리
						Map map6 = new HashMap();
						map6.put("ITEM_CD", ITEM_CD);
						map6.put("ORIG", ORIG);
						map6.put("HS_CD", "('3907209000')");
						map6.put("twoYear", twoYear);
						map6.put("exptQty", (int)Double.parseDouble(stringValueOf(list5.get(0).get("RMID_QTY"))));
						map6.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
						map6.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
						map6.put("QTY_UNIT", QTY_UNIT);
						wonCheck02_4(request, map6);

						// 2년 내 총 현재 세번 그만큼만 처리
						Map map2 = new HashMap();
						map2.put("ITEM_CD", ITEM_CD);
						map2.put("ORIG", ORIG);
						map2.put("HS_CD", HS_CD);
						map2.put("twoYear", twoYear);
						map2.put("exptQty", (int)Double.parseDouble(NOT_ORIG_STAT_QTY)-(int)Double.parseDouble(stringValueOf(list5.get(0).get("RMID_QTY"))));
						map2.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
						map2.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
						map2.put("QTY_UNIT", QTY_UNIT);

						map2.put("KEY_ED_EXPT_INV", KEY_ED_EXPT_INV);
						map2.put("EXPT_QTY", (int)Double.parseDouble(stringValueOf(list5.get(0).get("RMID_QTY"))));
						wonCheck02_2(request, map2);
					}
				}else{
					List<Map> list1 = edwardsManagementService.threeMonthRmidQty(args);
					// 잔량이 0보다 크면 2년 내에서 해결하기
					// RMID_QTY가 소수점이 있으므로 정수형으로 변경 (1.99 -> 1, 0.99 -> 0)
					if((int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY"))) > 0){
						// 2년 내 총 잔량이 미지정수량보다 크거나 같으면 그 안에서 해결하기
						if((int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY")))-(int)Double.parseDouble(NOT_ORIG_STAT_QTY) >= 0){
							Map map1 = new HashMap();
							map1.put("ITEM_CD", ITEM_CD);
							map1.put("ORIG", ORIG);
							map1.put("HS_CD", HS_CD);
							map1.put("twoYear", twoYear);
							map1.put("exptQty", (int)Double.parseDouble(NOT_ORIG_STAT_QTY));
							map1.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
							map1.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
							map1.put("QTY_UNIT", QTY_UNIT);

							map1.put("KEY_ED_EXPT_INV", KEY_ED_EXPT_INV);
							map1.put("EXPT_QTY", (int)Double.parseDouble(NOT_ORIG_STAT_QTY));
							wonCheck02_2(request, map1);
						}else{
							// 2년 내 총 잔량이 미지정수량보다 작으면 그만큼만 처리
							Map map2 = new HashMap();
							map2.put("ITEM_CD", ITEM_CD);
							map2.put("ORIG", ORIG);
							map2.put("HS_CD", HS_CD);
							map2.put("twoYear", twoYear);
							map2.put("exptQty", (int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY"))));
							map2.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
							map2.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
							map2.put("QTY_UNIT", QTY_UNIT);

							map2.put("KEY_ED_EXPT_INV", KEY_ED_EXPT_INV);
							map2.put("EXPT_QTY", (int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY"))));
							wonCheck02_2(request, map2);
						}
					}else{
						System.out.println("####END");
					}

					result = list1.stream().collect(Collectors.toList());
				}
			}else if(HS_CD.equals("9027891000")){
				Map map5 = new HashMap();
				map5.put("twoYear", twoYear);
				map5.put("ITEM_CD", ITEM_CD);
				map5.put("ORIG", ORIG);
				map5.put("HS_CD", "9027801000");
				List<Map> list5 = edwardsManagementService.threeMonthRmidQty(map5);
				if((int)Double.parseDouble(stringValueOf(list5.get(0).get("RMID_QTY"))) > 0){
					// 2년 내 총 잔량이 미지정수량보다 크거나 같으면 과거 세번 안에서 해결하기
					if((int)Double.parseDouble(stringValueOf(list5.get(0).get("RMID_QTY")))-(int)Double.parseDouble(NOT_ORIG_STAT_QTY) >= 0){
						Map map1 = new HashMap();
						map1.put("ITEM_CD", ITEM_CD);
						map1.put("ORIG", ORIG);
						map1.put("HS_CD", "9027801000");
						map1.put("twoYear", twoYear);
						map1.put("exptQty", (int)Double.parseDouble(NOT_ORIG_STAT_QTY));
						map1.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
						map1.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
						map1.put("QTY_UNIT", QTY_UNIT);

						map1.put("KEY_ED_EXPT_INV", KEY_ED_EXPT_INV);
						map1.put("EXPT_QTY", (int)Double.parseDouble(NOT_ORIG_STAT_QTY));
						wonCheck02_2(request, map1);
					}else{
						// 2년 내 과거세번 나머지 처리
						Map map6 = new HashMap();
						map6.put("ITEM_CD", ITEM_CD);
						map6.put("ORIG", ORIG);
						map6.put("HS_CD", "('9027801000')");
						map6.put("twoYear", twoYear);
						map6.put("exptQty", (int)Double.parseDouble(stringValueOf(list5.get(0).get("RMID_QTY"))));
						map6.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
						map6.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
						map6.put("QTY_UNIT", QTY_UNIT);
						wonCheck02_4(request, map6);

						// 2년 내 총 현재 세번 그만큼만 처리
						Map map2 = new HashMap();
						map2.put("ITEM_CD", ITEM_CD);
						map2.put("ORIG", ORIG);
						map2.put("HS_CD", HS_CD);
						map2.put("twoYear", twoYear);
						map2.put("exptQty", (int)Double.parseDouble(NOT_ORIG_STAT_QTY)-(int)Double.parseDouble(stringValueOf(list5.get(0).get("RMID_QTY"))));
						map2.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
						map2.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
						map2.put("QTY_UNIT", QTY_UNIT);

						map2.put("KEY_ED_EXPT_INV", KEY_ED_EXPT_INV);
						map2.put("EXPT_QTY", (int)Double.parseDouble(stringValueOf(list5.get(0).get("RMID_QTY"))));
						wonCheck02_2(request, map2);
					}
				}else{
					List<Map> list1 = edwardsManagementService.threeMonthRmidQty(args);
					// 잔량이 0보다 크면 2년 내에서 해결하기
					// RMID_QTY가 소수점이 있으므로 정수형으로 변경 (1.99 -> 1, 0.99 -> 0)
					if((int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY"))) > 0){
						// 2년 내 총 잔량이 미지정수량보다 크거나 같으면 그 안에서 해결하기
						if((int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY")))-(int)Double.parseDouble(NOT_ORIG_STAT_QTY) >= 0){
							Map map1 = new HashMap();
							map1.put("ITEM_CD", ITEM_CD);
							map1.put("ORIG", ORIG);
							map1.put("HS_CD", HS_CD);
							map1.put("twoYear", twoYear);
							map1.put("exptQty", (int)Double.parseDouble(NOT_ORIG_STAT_QTY));
							map1.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
							map1.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
							map1.put("QTY_UNIT", QTY_UNIT);

							map1.put("KEY_ED_EXPT_INV", KEY_ED_EXPT_INV);
							map1.put("EXPT_QTY", (int)Double.parseDouble(NOT_ORIG_STAT_QTY));
							wonCheck02_2(request, map1);
						}else{
							// 2년 내 총 잔량이 미지정수량보다 작으면 그만큼만 처리
							Map map2 = new HashMap();
							map2.put("ITEM_CD", ITEM_CD);
							map2.put("ORIG", ORIG);
							map2.put("HS_CD", HS_CD);
							map2.put("twoYear", twoYear);
							map2.put("exptQty", (int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY"))));
							map2.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
							map2.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
							map2.put("QTY_UNIT", QTY_UNIT);

							map2.put("KEY_ED_EXPT_INV", KEY_ED_EXPT_INV);
							map2.put("EXPT_QTY", (int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY"))));
							wonCheck02_2(request, map2);
						}
					}else{
						System.out.println("####END");
					}

					result = list1.stream().collect(Collectors.toList());
				}
			}else if(HS_CD.equals("2818209000")){
				Map map5 = new HashMap();
				map5.put("twoYear", twoYear);
				map5.put("ITEM_CD", ITEM_CD);
				map5.put("ORIG", ORIG);
				map5.put("HS_CD", "2818200000");
				List<Map> list5 = edwardsManagementService.threeMonthRmidQty(map5);
				if((int)Double.parseDouble(stringValueOf(list5.get(0).get("RMID_QTY"))) > 0){
					// 2년 내 총 잔량이 미지정수량보다 크거나 같으면 과거 세번 안에서 해결하기
					if((int)Double.parseDouble(stringValueOf(list5.get(0).get("RMID_QTY")))-(int)Double.parseDouble(NOT_ORIG_STAT_QTY) >= 0){
						Map map1 = new HashMap();
						map1.put("ITEM_CD", ITEM_CD);
						map1.put("ORIG", ORIG);
						map1.put("HS_CD", "2818200000");
						map1.put("twoYear", twoYear);
						map1.put("exptQty", (int)Double.parseDouble(NOT_ORIG_STAT_QTY));
						map1.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
						map1.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
						map1.put("QTY_UNIT", QTY_UNIT);

						map1.put("KEY_ED_EXPT_INV", KEY_ED_EXPT_INV);
						map1.put("EXPT_QTY", (int)Double.parseDouble(NOT_ORIG_STAT_QTY));
						wonCheck02_2(request, map1);
					}else{
						// 2년 내 과거세번 나머지 처리
						Map map6 = new HashMap();
						map6.put("ITEM_CD", ITEM_CD);
						map6.put("ORIG", ORIG);
						map6.put("HS_CD", "('2818200000')");
						map6.put("twoYear", twoYear);
						map6.put("exptQty", (int)Double.parseDouble(stringValueOf(list5.get(0).get("RMID_QTY"))));
						map6.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
						map6.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
						map6.put("QTY_UNIT", QTY_UNIT);
						wonCheck02_4(request, map6);

						// 2년 내 총 현재 세번 그만큼만 처리
						Map map2 = new HashMap();
						map2.put("ITEM_CD", ITEM_CD);
						map2.put("ORIG", ORIG);
						map2.put("HS_CD", HS_CD);
						map2.put("twoYear", twoYear);
						map2.put("exptQty", (int)Double.parseDouble(NOT_ORIG_STAT_QTY)-(int)Double.parseDouble(stringValueOf(list5.get(0).get("RMID_QTY"))));
						map2.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
						map2.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
						map2.put("QTY_UNIT", QTY_UNIT);

						map2.put("KEY_ED_EXPT_INV", KEY_ED_EXPT_INV);
						map2.put("EXPT_QTY", (int)Double.parseDouble(stringValueOf(list5.get(0).get("RMID_QTY"))));
						wonCheck02_2(request, map2);
					}
				}else{
					List<Map> list1 = edwardsManagementService.threeMonthRmidQty(args);
					// 잔량이 0보다 크면 2년 내에서 해결하기
					// RMID_QTY가 소수점이 있으므로 정수형으로 변경 (1.99 -> 1, 0.99 -> 0)
					if((int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY"))) > 0){
						// 2년 내 총 잔량이 미지정수량보다 크거나 같으면 그 안에서 해결하기
						if((int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY")))-(int)Double.parseDouble(NOT_ORIG_STAT_QTY) >= 0){
							Map map1 = new HashMap();
							map1.put("ITEM_CD", ITEM_CD);
							map1.put("ORIG", ORIG);
							map1.put("HS_CD", HS_CD);
							map1.put("twoYear", twoYear);
							map1.put("exptQty", (int)Double.parseDouble(NOT_ORIG_STAT_QTY));
							map1.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
							map1.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
							map1.put("QTY_UNIT", QTY_UNIT);

							map1.put("KEY_ED_EXPT_INV", KEY_ED_EXPT_INV);
							map1.put("EXPT_QTY", (int)Double.parseDouble(NOT_ORIG_STAT_QTY));
							wonCheck02_2(request, map1);
						}else{
							// 2년 내 총 잔량이 미지정수량보다 작으면 그만큼만 처리
							Map map2 = new HashMap();
							map2.put("ITEM_CD", ITEM_CD);
							map2.put("ORIG", ORIG);
							map2.put("HS_CD", HS_CD);
							map2.put("twoYear", twoYear);
							map2.put("exptQty", (int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY"))));
							map2.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
							map2.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
							map2.put("QTY_UNIT", QTY_UNIT);

							map2.put("KEY_ED_EXPT_INV", KEY_ED_EXPT_INV);
							map2.put("EXPT_QTY", (int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY"))));
							wonCheck02_2(request, map2);
						}
					}else{
						System.out.println("####END");
					}

					result = list1.stream().collect(Collectors.toList());
				}
			}else if(HS_CD.equals("8517629030")){
				System.out.println("AAAAAAAAAAA"+HS_CD);
				Map map5 = new HashMap();
				map5.put("twoYear", twoYear);
				map5.put("ITEM_CD", ITEM_CD);
				map5.put("ORIG", ORIG);
				map5.put("HS_CD", "('8517623900','8517629000')");
				List<Map> list5 = edwardsManagementService.threeMonthRmidQty11(map5);
				if((int)Double.parseDouble(stringValueOf(list5.get(0).get("RMID_QTY"))) > 0){
					// 2년 내 총 잔량이 미지정수량보다 크거나 같으면 과거 세번 안에서 해결하기
					if((int)Double.parseDouble(stringValueOf(list5.get(0).get("RMID_QTY")))-(int)Double.parseDouble(NOT_ORIG_STAT_QTY) >= 0){
						Map map1 = new HashMap();
						map1.put("ITEM_CD", ITEM_CD);
						map1.put("ORIG", ORIG);
						map1.put("HS_CD", "('8517623900','8517629000')");
						map1.put("twoYear", twoYear);
						map1.put("exptQty", (int)Double.parseDouble(NOT_ORIG_STAT_QTY));
						map1.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
						map1.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
						map1.put("QTY_UNIT", QTY_UNIT);

						map1.put("KEY_ED_EXPT_INV", KEY_ED_EXPT_INV);
						map1.put("EXPT_QTY", (int)Double.parseDouble(NOT_ORIG_STAT_QTY));
						wonCheck02_5(request, map1);
					}else{
						// 2년 내 과거세번 나머지 처리
						Map map6 = new HashMap();
						map6.put("ITEM_CD", ITEM_CD);
						map6.put("ORIG", ORIG);
						map6.put("HS_CD", "('8517623900','8517629000')");
						map6.put("twoYear", twoYear);
						map6.put("exptQty", (int)Double.parseDouble(stringValueOf(list5.get(0).get("RMID_QTY"))));
						map6.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
						map6.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
						map6.put("QTY_UNIT", QTY_UNIT);
						wonCheck02_4(request, map6);

						// 2년 내 총 현재 세번 그만큼만 처리
						Map map2 = new HashMap();
						map2.put("ITEM_CD", ITEM_CD);
						map2.put("ORIG", ORIG);
						map2.put("HS_CD", HS_CD);
						map2.put("twoYear", twoYear);
						map2.put("exptQty", (int)Double.parseDouble(NOT_ORIG_STAT_QTY)-(int)Double.parseDouble(stringValueOf(list5.get(0).get("RMID_QTY"))));
						map2.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
						map2.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
						map2.put("QTY_UNIT", QTY_UNIT);

						map2.put("KEY_ED_EXPT_INV", KEY_ED_EXPT_INV);
						map2.put("EXPT_QTY", (int)Double.parseDouble(stringValueOf(list5.get(0).get("RMID_QTY"))));
						wonCheck02_2(request, map2);
					}
				}else{
					List<Map> list1 = edwardsManagementService.threeMonthRmidQty(args);
					// 잔량이 0보다 크면 2년 내에서 해결하기
					// RMID_QTY가 소수점이 있으므로 정수형으로 변경 (1.99 -> 1, 0.99 -> 0)
					if((int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY"))) > 0){
						// 2년 내 총 잔량이 미지정수량보다 크거나 같으면 그 안에서 해결하기
						if((int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY")))-(int)Double.parseDouble(NOT_ORIG_STAT_QTY) >= 0){
							Map map1 = new HashMap();
							map1.put("ITEM_CD", ITEM_CD);
							map1.put("ORIG", ORIG);
							map1.put("HS_CD", HS_CD);
							map1.put("twoYear", twoYear);
							map1.put("exptQty", (int)Double.parseDouble(NOT_ORIG_STAT_QTY));
							map1.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
							map1.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
							map1.put("QTY_UNIT", QTY_UNIT);

							map1.put("KEY_ED_EXPT_INV", KEY_ED_EXPT_INV);
							map1.put("EXPT_QTY", (int)Double.parseDouble(NOT_ORIG_STAT_QTY));
							wonCheck02_2(request, map1);
						}else{
							// 2년 내 총 잔량이 미지정수량보다 작으면 그만큼만 처리
							Map map2 = new HashMap();
							map2.put("ITEM_CD", ITEM_CD);
							map2.put("ORIG", ORIG);
							map2.put("HS_CD", HS_CD);
							map2.put("twoYear", twoYear);
							map2.put("exptQty", (int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY"))));
							map2.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
							map2.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
							map2.put("QTY_UNIT", QTY_UNIT);

							map2.put("KEY_ED_EXPT_INV", KEY_ED_EXPT_INV);
							map2.put("EXPT_QTY", (int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY"))));
							wonCheck02_2(request, map2);
						}
					}else{
						System.out.println("####END");
					}

					result = list1.stream().collect(Collectors.toList());
				}
			}else if(HS_CD.equals("9026209000")){
				System.out.println("AAAAAAAAAAA"+HS_CD);
				Map map5 = new HashMap();
				map5.put("twoYear", twoYear);
				map5.put("ITEM_CD", ITEM_CD);
				map5.put("ORIG", ORIG);
				map5.put("HS_CD", "('9026209000','9026201190','9026201900')");
				List<Map> list5 = edwardsManagementService.threeMonthRmidQty11(map5);
				if((int)Double.parseDouble(stringValueOf(list5.get(0).get("RMID_QTY"))) > 0){
					// 2년 내 총 잔량이 미지정수량보다 크거나 같으면 과거 세번 안에서 해결하기
					if((int)Double.parseDouble(stringValueOf(list5.get(0).get("RMID_QTY")))-(int)Double.parseDouble(NOT_ORIG_STAT_QTY) >= 0){
						Map map1 = new HashMap();
						map1.put("ITEM_CD", ITEM_CD);
						map1.put("ORIG", ORIG);
						map1.put("HS_CD", "('9026209000','9026201190','9026201900')");
						map1.put("twoYear", twoYear);
						map1.put("exptQty", (int)Double.parseDouble(NOT_ORIG_STAT_QTY));
						map1.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
						map1.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
						map1.put("QTY_UNIT", QTY_UNIT);

						map1.put("KEY_ED_EXPT_INV", KEY_ED_EXPT_INV);
						map1.put("EXPT_QTY", (int)Double.parseDouble(NOT_ORIG_STAT_QTY));
						wonCheck02_5(request, map1);
					}else{
						// 2년 내 과거세번 나머지 처리
						Map map6 = new HashMap();
						map6.put("ITEM_CD", ITEM_CD);
						map6.put("ORIG", ORIG);
						map6.put("HS_CD", "('9026209000','9026201190','9026201900')");
						map6.put("twoYear", twoYear);
						map6.put("exptQty", (int)Double.parseDouble(stringValueOf(list5.get(0).get("RMID_QTY"))));
						map6.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
						map6.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
						map6.put("QTY_UNIT", QTY_UNIT);
						wonCheck02_4(request, map6);

						// 2년 내 총 현재 세번 그만큼만 처리
						Map map2 = new HashMap();
						map2.put("ITEM_CD", ITEM_CD);
						map2.put("ORIG", ORIG);
						map2.put("HS_CD", HS_CD);
						map2.put("twoYear", twoYear);
						map2.put("exptQty", (int)Double.parseDouble(NOT_ORIG_STAT_QTY)-(int)Double.parseDouble(stringValueOf(list5.get(0).get("RMID_QTY"))));
						map2.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
						map2.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
						map2.put("QTY_UNIT", QTY_UNIT);

						map2.put("KEY_ED_EXPT_INV", KEY_ED_EXPT_INV);
						map2.put("EXPT_QTY", (int)Double.parseDouble(stringValueOf(list5.get(0).get("RMID_QTY"))));
						wonCheck02_2(request, map2);
					}
				}else{
					List<Map> list1 = edwardsManagementService.threeMonthRmidQty(args);
					// 잔량이 0보다 크면 2년 내에서 해결하기
					// RMID_QTY가 소수점이 있으므로 정수형으로 변경 (1.99 -> 1, 0.99 -> 0)
					if((int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY"))) > 0){
						// 2년 내 총 잔량이 미지정수량보다 크거나 같으면 그 안에서 해결하기
						if((int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY")))-(int)Double.parseDouble(NOT_ORIG_STAT_QTY) >= 0){
							Map map1 = new HashMap();
							map1.put("ITEM_CD", ITEM_CD);
							map1.put("ORIG", ORIG);
							map1.put("HS_CD", HS_CD);
							map1.put("twoYear", twoYear);
							map1.put("exptQty", (int)Double.parseDouble(NOT_ORIG_STAT_QTY));
							map1.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
							map1.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
							map1.put("QTY_UNIT", QTY_UNIT);

							map1.put("KEY_ED_EXPT_INV", KEY_ED_EXPT_INV);
							map1.put("EXPT_QTY", (int)Double.parseDouble(NOT_ORIG_STAT_QTY));
							wonCheck02_2(request, map1);
						}else{
							// 2년 내 총 잔량이 미지정수량보다 작으면 그만큼만 처리
							Map map2 = new HashMap();
							map2.put("ITEM_CD", ITEM_CD);
							map2.put("ORIG", ORIG);
							map2.put("HS_CD", HS_CD);
							map2.put("twoYear", twoYear);
							map2.put("exptQty", (int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY"))));
							map2.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
							map2.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
							map2.put("QTY_UNIT", QTY_UNIT);

							map2.put("KEY_ED_EXPT_INV", KEY_ED_EXPT_INV);
							map2.put("EXPT_QTY", (int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY"))));
							wonCheck02_2(request, map2);
						}
					}else{
						System.out.println("####END");
					}

					result = list1.stream().collect(Collectors.toList());
				}
			}else{
				List<Map> list1 = edwardsManagementService.threeMonthRmidQty(args);
				// 잔량이 0보다 크면 2년 내에서 해결하기
				// RMID_QTY가 소수점이 있으므로 정수형으로 변경 (1.99 -> 1, 0.99 -> 0)
				if((int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY"))) > 0){
					// 2년 내 총 잔량이 미지정수량보다 크거나 같으면 그 안에서 해결하기
					if((int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY")))-(int)Double.parseDouble(NOT_ORIG_STAT_QTY) >= 0){
						Map map1 = new HashMap();
						map1.put("ITEM_CD", ITEM_CD);
						map1.put("ORIG", ORIG);
						map1.put("HS_CD", HS_CD);
						map1.put("twoYear", twoYear);
						map1.put("exptQty", (int)Double.parseDouble(NOT_ORIG_STAT_QTY));
						map1.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
						map1.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
						map1.put("QTY_UNIT", QTY_UNIT);

						map1.put("KEY_ED_EXPT_INV", KEY_ED_EXPT_INV);
						map1.put("EXPT_QTY", (int)Double.parseDouble(NOT_ORIG_STAT_QTY));
						wonCheck02_2(request, map1);
					}else{
						// 2년 내 총 잔량이 미지정수량보다 작으면 그만큼만 처리
						Map map2 = new HashMap();
						map2.put("ITEM_CD", ITEM_CD);
						map2.put("ORIG", ORIG);
						map2.put("HS_CD", HS_CD);
						map2.put("twoYear", twoYear);
						map2.put("exptQty", (int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY"))));
						map2.put("EXPT_ORDR_MNG_NO", EXPT_ORDR_MNG_NO);
						map2.put("EXPT_INV_SEQNO", EXPT_INV_SEQNO);
						map2.put("QTY_UNIT", QTY_UNIT);

						map2.put("KEY_ED_EXPT_INV", KEY_ED_EXPT_INV);
						map2.put("EXPT_QTY", (int)Double.parseDouble(stringValueOf(list1.get(0).get("RMID_QTY"))));
						wonCheck02_2(request, map2);
					}
				}else{
					System.out.println("####END");
				}

				result = list1.stream().collect(Collectors.toList());
			}
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/insertReEx")
	public ResponseEntity<?> insertReEx(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String userKey			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			args.put("addUserId",userKey);
			args.put("addUserNm",userNm);
			args.put("addDtm",currentDatetime);

			List<Map> list = edwardsManagementService.selectImpoInvMaster(args);
			for(int i = 0, n = list.size(); i < n; i++){
				args.put("IMPT_INV_SEQNO",stringValueOf(list.get(i).get("IMPT_INV_SEQNO")));
				args.put("QTY",stringValueOf(list.get(i).get("QTY")));
				args.put("ITEM_CD",stringValueOf(list.get(i).get("ITEM_CD")));
				args.put("ITEM_NM",stringValueOf(list.get(i).get("gukyk")));
				args.put("SERIAL_NO",stringValueOf(list.get(i).get("SERIAL_NO")));
				args.put("SoNo",stringValueOf(list.get(i).get("SoNo")));
				args.put("ExEmNo",stringValueOf(list.get(i).get("ExEmNo")));
				args.put("EndUserName",stringValueOf(list.get(i).get("EndUserName")));
				args.put("useYn","Y");
				args.put("confirmChk","N");
				long result1 = edwardsManagementService.insertReExpo1(args);
			}
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/insertReIm")
	public ResponseEntity<?> insertReIm(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String userKey			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			args.put("addUserId",userKey);
			args.put("addUserNm",userNm);
			args.put("addDtm",currentDatetime);

			List<Map> list = edwardsManagementService.selectExpoInvMaster(args);
			for(int i = 0, n = list.size(); i < n; i++){
				args.put("EXPT_INV_SEQNO",stringValueOf(list.get(i).get("EXPT_INV_SEQNO")));
				args.put("QTY",stringValueOf(list.get(i).get("QTY")));
				args.put("PROD_CD",stringValueOf(list.get(i).get("PROD_CD")));
				args.put("PROD_NM",stringValueOf(list.get(i).get("PROD_NM")));
				args.put("SERIAL_NO",stringValueOf(list.get(i).get("SERIAL_NO")));
				args.put("useYn","Y");
				args.put("confirmChk","N");
				long result1 = edwardsManagementService.insertReImpo(args);
			}
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/ReImEx")
	public void ReImEx(HttpServletRequest request, @RequestParam String _DateType, @RequestParam String strFromDate9, @RequestParam String _StatusType,
		    @RequestParam String strToDate9, @RequestParam String _DocType, @RequestParam String NODATA, @RequestParam String taxNum, HttpServletResponse response) throws UnsupportedEncodingException{
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return;

		String downloadFileName, reqFilePath, reqFileName = null;
		SXSSFWorkbook workbook = null;
		FileOutputStream fos = null;

		try{
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

			Map map = new HashMap();
			map.put("_DateType", _DateType);
			map.put("strFromDate", strFromDate9);
			map.put("strToDate", strToDate9);
			map.put("_DocType", _DocType);
			map.put("_StatusType", _StatusType);
			map.put("NODATA", NODATA);
			map.put("taxNum", taxNum);

			List<Map> list = new ArrayList<>();

			list.addAll(edwardsManagementService.selectReImpoCheckList(map));

			workbook = new SXSSFWorkbook(100);
			Sheet sheet = workbook.createSheet("재수입");
			sheet.setColumnWidth(0, 4000);
			sheet.setColumnWidth(1, 4000);
			sheet.setColumnWidth(2, 2000);
			sheet.setColumnWidth(3, 2000);
			sheet.setColumnWidth(4, 3000);
			sheet.setColumnWidth(5, 2000);
			sheet.setColumnWidth(6, 2000);
			sheet.setColumnWidth(7, 4000);
			sheet.setColumnWidth(8, 4000);
			sheet.setColumnWidth(9, 4000);
			sheet.setColumnWidth(10, 7000);
			sheet.setColumnWidth(11, 2000);
			sheet.setColumnWidth(12, 4000);
			sheet.setColumnWidth(13, 4000);
			sheet.setColumnWidth(14, 2000);
			sheet.setColumnWidth(15, 2000);
			sheet.setColumnWidth(16, 3000);
			sheet.setColumnWidth(17, 2000);
			sheet.setColumnWidth(18, 2000);
			sheet.setColumnWidth(19, 3000);

			  Row row = sheet.createRow(0);
			  Font font = workbook.createFont();
			  font.setColor(IndexedColors.RED.getIndex());

			  CellStyle style = workbook.createCellStyle();
			  style.setDataFormat(HSSFDataFormat.getBuiltinFormat("@"));
			  style.setBorderBottom(CellStyle.BORDER_THIN);
			  style.setBorderLeft(CellStyle.BORDER_THIN);
			  style.setBorderRight(CellStyle.BORDER_THIN);
			  style.setBorderTop(CellStyle.BORDER_THIN);
			  style.setAlignment(CellStyle.ALIGN_CENTER);

			  CellStyle style1 = workbook.createCellStyle();
			  style1.setDataFormat(HSSFDataFormat.getBuiltinFormat("@"));
			  style1.setBorderBottom(CellStyle.BORDER_THIN);
			  style1.setBorderLeft(CellStyle.BORDER_THIN);
			  style1.setBorderRight(CellStyle.BORDER_THIN);
			  style1.setBorderTop(CellStyle.BORDER_THIN);

			  CellStyle styleRed = workbook.createCellStyle();
			  styleRed.setDataFormat(HSSFDataFormat.getBuiltinFormat("@"));
			  styleRed.setBorderBottom(CellStyle.BORDER_THIN);
			  styleRed.setBorderLeft(CellStyle.BORDER_THIN);
			  styleRed.setBorderRight(CellStyle.BORDER_THIN);
			  styleRed.setBorderTop(CellStyle.BORDER_THIN);
			  styleRed.setAlignment(CellStyle.ALIGN_CENTER);
			  styleRed.setFont(font);

			  CellStyle styleDate = workbook.createCellStyle();
			  styleDate.setDataFormat(HSSFDataFormat.getBuiltinFormat("m/d/yy"));
			  styleDate.setBorderBottom(CellStyle.BORDER_THIN);
			  styleDate.setBorderLeft(CellStyle.BORDER_THIN);
			  styleDate.setBorderRight(CellStyle.BORDER_THIN);
			  styleDate.setBorderTop(CellStyle.BORDER_THIN);
			  styleDate.setAlignment(CellStyle.ALIGN_CENTER);

			  CellStyle style20 = workbook.createCellStyle();
			  style20.setDataFormat(HSSFDataFormat.getBuiltinFormat("#,##0"));
			  style20.setBorderBottom(CellStyle.BORDER_THIN);
			  style20.setBorderLeft(CellStyle.BORDER_THIN);
			  style20.setBorderRight(CellStyle.BORDER_THIN);
			  style20.setBorderTop(CellStyle.BORDER_THIN);
			  style20.setAlignment(CellStyle.ALIGN_RIGHT);

			  CellStyle style22 = workbook.createCellStyle();
			  style22.setDataFormat(HSSFDataFormat.getBuiltinFormat("#,##0.00"));
			  style22.setBorderBottom(CellStyle.BORDER_THIN);
			  style22.setBorderLeft(CellStyle.BORDER_THIN);
			  style22.setBorderRight(CellStyle.BORDER_THIN);
			  style22.setBorderTop(CellStyle.BORDER_THIN);
			  style22.setAlignment(CellStyle.ALIGN_RIGHT);

			  Cell cell = row.createCell(0);
			  cell.setCellValue("Invoice No");
			  cell.setCellStyle(style);
			  cell = row.createCell(1);
			  cell.setCellValue("수출신고번호");
			  cell.setCellStyle(style);
			  cell = row.createCell(2);
			  cell.setCellValue("란");
			  cell.setCellStyle(style);
			  cell = row.createCell(3);
			  cell.setCellValue("행");
			  cell.setCellStyle(style);
			  cell = row.createCell(4);
			  cell.setCellValue("수출수리일");
			  cell.setCellStyle(style);
			  cell = row.createCell(5);
			  cell.setCellValue("수출량");
			  cell.setCellStyle(style);
			  cell = row.createCell(6);
			  cell.setCellValue("수출거래구분");
			  cell.setCellStyle(style);
			  cell = row.createCell(7);
			  cell.setCellValue("Name of Shipto");
			  cell.setCellStyle(style);
			  cell = row.createCell(8);
			  cell.setCellValue("Serial No");
			  cell.setCellStyle(style);
			  cell = row.createCell(9);
			  cell.setCellValue("Item");
			  cell.setCellStyle(style);
			  cell = row.createCell(10);
			  cell.setCellValue("Description");
			  cell.setCellStyle(style);
			  cell = row.createCell(11);
			  cell.setCellValue("잔량");
			  cell.setCellStyle(styleRed);
			  cell = row.createCell(12);
			  cell.setCellValue("B/L No");
			  cell.setCellStyle(style);
			  cell = row.createCell(13);
			  cell.setCellValue("수입신고번호");
			  cell.setCellStyle(style);
			  cell = row.createCell(14);
			  cell.setCellValue("란");
			  cell.setCellStyle(style);
			  cell = row.createCell(15);
			  cell.setCellValue("행");
			  cell.setCellStyle(style);
			  cell = row.createCell(16);
			  cell.setCellValue("수입수리일");
			  cell.setCellStyle(style);
			  cell = row.createCell(17);
			  cell.setCellValue("수입량");
			  cell.setCellStyle(style);
			  cell = row.createCell(18);
			  cell.setCellValue("수입거래구분");
			  cell.setCellStyle(style);
			  cell = row.createCell(19);
			  cell.setCellValue("Status");
			  cell.setCellStyle(styleRed);

			  for (int rownum = 0; rownum < list.size(); rownum++) {
				  row = sheet.createRow(rownum+1);
				  cell = row.createCell(0);
				  cell.setCellValue(String.valueOf(list.get(rownum).get("INV_NO"))=="null" ? "" : String.valueOf(list.get(rownum).get("INV_NO")));
				  cell.setCellStyle(style);
				  cell = row.createCell(1);
				  cell.setCellValue(String.valueOf(list.get(rownum).get("EXPT_DECL_NO"))=="null" ? "" : String.valueOf(list.get(rownum).get("EXPT_DECL_NO")));
				  cell.setCellStyle(style);
				  cell = row.createCell(2);
				  cell.setCellValue(String.valueOf(list.get(rownum).get("EXPT_LAN"))=="null" ? "" : String.valueOf(list.get(rownum).get("EXPT_LAN")));
				  cell.setCellStyle(style);
				  cell = row.createCell(3);
				  cell.setCellValue(String.valueOf(list.get(rownum).get("EXPT_HNG"))=="null" ? "" : String.valueOf(list.get(rownum).get("EXPT_HNG")));
				  cell.setCellStyle(style);
				  cell = row.createCell(4);
				  cell.setCellValue(String.valueOf(list.get(rownum).get("EXPT_CMPL_DT1"))=="null" ? "" : String.valueOf(list.get(rownum).get("EXPT_CMPL_DT1")));
				  cell.setCellStyle(styleDate);
				  cell = row.createCell(5);
				  cell.setCellValue(Double.parseDouble(String.valueOf(list.get(rownum).get("EXPT_QTY")))==0 ? 0 : Double.parseDouble(String.valueOf(list.get(rownum).get("EXPT_QTY"))));
				  cell.setCellStyle(style20);
				  cell = row.createCell(6);
				  cell.setCellValue(String.valueOf(list.get(rownum).get("EXPT_GURAE_GBN"))=="null" ? "" : String.valueOf(list.get(rownum).get("EXPT_GURAE_GBN")));
				  cell.setCellStyle(style);
				  cell = row.createCell(7);
				  cell.setCellValue(String.valueOf(list.get(rownum).get("NameOfShipto"))=="null" ? "" : String.valueOf(list.get(rownum).get("NameOfShipto")));
				  cell.setCellStyle(style1);
				  cell = row.createCell(8);
				  cell.setCellValue(String.valueOf(list.get(rownum).get("SERIAL_NO"))=="null" ? "" : String.valueOf(list.get(rownum).get("SERIAL_NO")));
				  cell.setCellStyle(style);
				  cell = row.createCell(9);
				  cell.setCellValue(String.valueOf(list.get(rownum).get("PROD_CD"))=="null" ? "" : String.valueOf(list.get(rownum).get("PROD_CD")));
				  cell.setCellStyle(style1);
				  cell = row.createCell(10);
				  cell.setCellValue(String.valueOf(list.get(rownum).get("PROD_NM"))=="null" ? "" : String.valueOf(list.get(rownum).get("PROD_NM")));
				  cell.setCellStyle(style1);
				  cell = row.createCell(11);
				  cell.setCellValue(Double.parseDouble(String.valueOf(list.get(rownum).get("RMID_QTY")))==0 ? 0 : Double.parseDouble(String.valueOf(list.get(rownum).get("RMID_QTY"))));
				  cell.setCellStyle(style20);
				  cell = row.createCell(12);
				  cell.setCellValue(String.valueOf(list.get(rownum).get("BL_NO"))=="null" ? "" : String.valueOf(list.get(rownum).get("BL_NO")));
				  cell.setCellStyle(style);
				  cell = row.createCell(13);
				  cell.setCellValue(String.valueOf(list.get(rownum).get("IMPT_DECL_NO"))=="null" ? "" : String.valueOf(list.get(rownum).get("IMPT_DECL_NO")));
				  cell.setCellStyle(style);
				  cell = row.createCell(14);
				  cell.setCellValue(String.valueOf(list.get(rownum).get("IMPT_LAN"))=="null" ? "" : String.valueOf(list.get(rownum).get("IMPT_LAN")));
				  cell.setCellStyle(style);
				  cell = row.createCell(15);
				  cell.setCellValue(String.valueOf(list.get(rownum).get("IMPT_HNG"))=="null" ? "" : String.valueOf(list.get(rownum).get("IMPT_HNG")));
				  cell.setCellStyle(style);
				  cell = row.createCell(16);
				  cell.setCellValue(String.valueOf(list.get(rownum).get("IMPT_CMPL_DT1"))=="null" ? "" : String.valueOf(list.get(rownum).get("IMPT_CMPL_DT1")));
				  cell.setCellStyle(styleDate);
				  cell = row.createCell(17);
				  cell.setCellValue(String.valueOf(list.get(rownum).get("IMPT_QTY"))=="null" ? 0 : Double.parseDouble(String.valueOf(list.get(rownum).get("IMPT_QTY"))));
				  cell.setCellStyle(style20);
				  cell = row.createCell(18);
				  cell.setCellValue(String.valueOf(list.get(rownum).get("IMPT_GURAE_GBN"))=="null" ? "" : String.valueOf(list.get(rownum).get("IMPT_GURAE_GBN")));
				  cell.setCellStyle(style);
				  cell = row.createCell(19);
				  cell.setCellValue(String.valueOf(list.get(rownum).get("STATUS"))=="null" ? "" : String.valueOf(list.get(rownum).get("STATUS")));
				  cell.setCellStyle(style);
			  }
			  fos = new FileOutputStream("C:\\edwards\\ReImport_"+currentDatetime+".xlsx");
			  workbook.write(fos);

			  if(fos != null){
				  fos.close();
				  workbook.dispose();
			  }
			  if(workbook != null){
				  workbook.close();
				  workbook.dispose();
			  }

			  File fileToDownload = new File("C:\\edwards\\ReImport_"+currentDatetime+".xlsx");
			  InputStream inputStream = new FileInputStream(fileToDownload);
			  response.setContentType("application/force-download");
			  if(list.size() < 1){
				  response.setHeader("Content-Disposition", "attachment; filename=\""+URLEncoder.encode("재수입.xlsx", "UTF-8")+"\"");
			  }else{
				  response.setHeader("Content-Disposition", "attachment; filename=\""+URLEncoder.encode("재수입_"+String.valueOf(list.get(0).get("INV_NO"))+".xlsx", "UTF-8")+"\"");
			  }
			  IOUtils.copy(inputStream, response.getOutputStream());
			  response.flushBuffer();
			  inputStream.close();

			  if(fos != null){
				  fos.close();
				  workbook.dispose();
			  }
			  if(workbook != null){
				  workbook.close();
				  workbook.dispose();
			  }
		}catch(Exception e){
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "/ReExEx")
	public void ReExEx(HttpServletRequest request, @RequestParam String _DateType, @RequestParam String strFromDate3, @RequestParam String _StatusType,
		    @RequestParam String strToDate3, @RequestParam String _DocType, @RequestParam String NODATA, @RequestParam String taxNum, HttpServletResponse response) throws UnsupportedEncodingException{
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return;

		String downloadFileName, reqFilePath, reqFileName = null;
		SXSSFWorkbook workbook = null;
		FileOutputStream fos = null;

		try{
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

			Map map = new HashMap();
			map.put("_DateType", _DateType);
			map.put("strFromDate", strFromDate3);
			map.put("strToDate", strToDate3);
			map.put("_DocType", _DocType);
			map.put("_StatusType", _StatusType);
			map.put("NODATA", NODATA);
			map.put("taxNum", taxNum);

			List<Map> list = new ArrayList<>();

			list.addAll(edwardsManagementService.selectReExpoCheckList(map));

			workbook = new SXSSFWorkbook(100);
			Sheet sheet = workbook.createSheet("재수출");
			sheet.setColumnWidth(0, 4000);
			sheet.setColumnWidth(1, 4000);
			sheet.setColumnWidth(2, 2000);
			sheet.setColumnWidth(3, 2000);
			sheet.setColumnWidth(4, 3000);
			sheet.setColumnWidth(5, 2000);
			sheet.setColumnWidth(6, 2000);
			sheet.setColumnWidth(7, 3000);
			sheet.setColumnWidth(8, 3000);
			sheet.setColumnWidth(9, 3000);
			sheet.setColumnWidth(10, 2000);
			sheet.setColumnWidth(11, 3000);
			sheet.setColumnWidth(12, 5000);
			sheet.setColumnWidth(13, 5000);
			sheet.setColumnWidth(14, 4000);
			sheet.setColumnWidth(15, 4000);
			sheet.setColumnWidth(16, 7000);
			sheet.setColumnWidth(17, 2000);
			sheet.setColumnWidth(18, 4000);
			sheet.setColumnWidth(19, 4000);
			sheet.setColumnWidth(20, 2000);
			sheet.setColumnWidth(21, 2000);
			sheet.setColumnWidth(22, 3000);
			sheet.setColumnWidth(23, 2000);
			sheet.setColumnWidth(24, 2000);
			sheet.setColumnWidth(25, 5000);
			sheet.setColumnWidth(26, 2000);
			sheet.setColumnWidth(27, 4000);

			  Row row = sheet.createRow(0);
			  Font font = workbook.createFont();
			  font.setColor(IndexedColors.RED.getIndex());

			  CellStyle style = workbook.createCellStyle();
			  style.setDataFormat(HSSFDataFormat.getBuiltinFormat("@"));
			  style.setBorderBottom(CellStyle.BORDER_THIN);
			  style.setBorderLeft(CellStyle.BORDER_THIN);
			  style.setBorderRight(CellStyle.BORDER_THIN);
			  style.setBorderTop(CellStyle.BORDER_THIN);
			  style.setAlignment(CellStyle.ALIGN_CENTER);

			  CellStyle style1 = workbook.createCellStyle();
			  style1.setDataFormat(HSSFDataFormat.getBuiltinFormat("@"));
			  style1.setBorderBottom(CellStyle.BORDER_THIN);
			  style1.setBorderLeft(CellStyle.BORDER_THIN);
			  style1.setBorderRight(CellStyle.BORDER_THIN);
			  style1.setBorderTop(CellStyle.BORDER_THIN);

			  CellStyle styleRed = workbook.createCellStyle();
			  styleRed.setDataFormat(HSSFDataFormat.getBuiltinFormat("@"));
			  styleRed.setBorderBottom(CellStyle.BORDER_THIN);
			  styleRed.setBorderLeft(CellStyle.BORDER_THIN);
			  styleRed.setBorderRight(CellStyle.BORDER_THIN);
			  styleRed.setBorderTop(CellStyle.BORDER_THIN);
			  styleRed.setAlignment(CellStyle.ALIGN_CENTER);
			  styleRed.setFont(font);

			  CellStyle styleDate = workbook.createCellStyle();
			  styleDate.setDataFormat(HSSFDataFormat.getBuiltinFormat("m/d/yy"));
			  styleDate.setBorderBottom(CellStyle.BORDER_THIN);
			  styleDate.setBorderLeft(CellStyle.BORDER_THIN);
			  styleDate.setBorderRight(CellStyle.BORDER_THIN);
			  styleDate.setBorderTop(CellStyle.BORDER_THIN);
			  styleDate.setAlignment(CellStyle.ALIGN_CENTER);

			  CellStyle style20 = workbook.createCellStyle();
			  style20.setDataFormat(HSSFDataFormat.getBuiltinFormat("#,##0"));
			  style20.setBorderBottom(CellStyle.BORDER_THIN);
			  style20.setBorderLeft(CellStyle.BORDER_THIN);
			  style20.setBorderRight(CellStyle.BORDER_THIN);
			  style20.setBorderTop(CellStyle.BORDER_THIN);
			  style20.setAlignment(CellStyle.ALIGN_RIGHT);

			  CellStyle style22 = workbook.createCellStyle();
			  style22.setDataFormat(HSSFDataFormat.getBuiltinFormat("#,##0.00"));
			  style22.setBorderBottom(CellStyle.BORDER_THIN);
			  style22.setBorderLeft(CellStyle.BORDER_THIN);
			  style22.setBorderRight(CellStyle.BORDER_THIN);
			  style22.setBorderTop(CellStyle.BORDER_THIN);
			  style22.setAlignment(CellStyle.ALIGN_RIGHT);

			  Cell cell = row.createCell(0);
			  cell.setCellValue("B/L No");
			  cell.setCellStyle(style);
			  cell = row.createCell(1);
			  cell.setCellValue("수입신고번호");
			  cell.setCellStyle(style);
			  cell = row.createCell(2);
			  cell.setCellValue("란");
			  cell.setCellStyle(style);
			  cell = row.createCell(3);
			  cell.setCellValue("행");
			  cell.setCellStyle(style);
			  cell = row.createCell(4);
			  cell.setCellValue("수입수리일");
			  cell.setCellStyle(style);
			  cell = row.createCell(5);
			  cell.setCellValue("수입량");
			  cell.setCellStyle(style);
			  cell = row.createCell(6);
			  cell.setCellValue("수입거래구분");
			  cell.setCellStyle(style);
			  cell = row.createCell(7);
			  cell.setCellValue("재수출만료일");
			  cell.setCellStyle(style);
			  cell = row.createCell(8);
			  cell.setCellValue("이행보고일");
			  cell.setCellStyle(style);
			  cell = row.createCell(9);
			  cell.setCellValue("용도외사용승인일");
			  cell.setCellStyle(style);
			  cell = row.createCell(10);
			  cell.setCellValue("기한연장차수");
			  cell.setCellStyle(style);
			  cell = row.createCell(11);
			  cell.setCellValue("SO번호");
			  cell.setCellStyle(style);
			  cell = row.createCell(12);
			  cell.setCellValue("End User");
			  cell.setCellStyle(style);
			  cell = row.createCell(13);
			  cell.setCellValue("면제번호");
			  cell.setCellStyle(style);
			  cell = row.createCell(14);
			  cell.setCellValue("Serial No");
			  cell.setCellStyle(style);
			  cell = row.createCell(15);
			  cell.setCellValue("Item");
			  cell.setCellStyle(style);
			  cell = row.createCell(16);
			  cell.setCellValue("Description");
			  cell.setCellStyle(style);
			  cell = row.createCell(17);
			  cell.setCellValue("잔량");
			  cell.setCellStyle(styleRed);
			  cell = row.createCell(18);
			  cell.setCellValue("Invoice No");
			  cell.setCellStyle(style);
			  cell = row.createCell(19);
			  cell.setCellValue("수출신고번호");
			  cell.setCellStyle(style);
			  cell = row.createCell(20);
			  cell.setCellValue("란");
			  cell.setCellStyle(style);
			  cell = row.createCell(21);
			  cell.setCellValue("행");
			  cell.setCellStyle(style);
			  cell = row.createCell(22);
			  cell.setCellValue("수출수리일");
			  cell.setCellStyle(style);
			  cell = row.createCell(23);
			  cell.setCellValue("수출량");
			  cell.setCellStyle(style);
			  cell = row.createCell(24);
			  cell.setCellValue("수출거래구분");
			  cell.setCellStyle(style);
			  cell = row.createCell(25);
			  cell.setCellValue("Name Of Shipto");
			  cell.setCellStyle(style);
			  cell = row.createCell(26);
			  cell.setCellValue("남은기한");
			  cell.setCellStyle(styleRed);
			  cell = row.createCell(27);
			  cell.setCellValue("Status");
			  cell.setCellStyle(styleRed);

			  for (int rownum = 0; rownum < list.size(); rownum++) {
				  row = sheet.createRow(rownum+1);
				  cell = row.createCell(0);
				  cell.setCellValue(String.valueOf(list.get(rownum).get("BL_NO"))=="null" ? "" : String.valueOf(list.get(rownum).get("BL_NO")));
				  cell.setCellStyle(style);
				  cell = row.createCell(1);
				  cell.setCellValue(String.valueOf(list.get(rownum).get("IMPT_DECL_NO"))=="null" ? "" : String.valueOf(list.get(rownum).get("IMPT_DECL_NO")));
				  cell.setCellStyle(style);
				  cell = row.createCell(2);
				  cell.setCellValue(String.valueOf(list.get(rownum).get("IMPT_LAN"))=="null" ? "" : String.valueOf(list.get(rownum).get("IMPT_LAN")));
				  cell.setCellStyle(style);
				  cell = row.createCell(3);
				  cell.setCellValue(String.valueOf(list.get(rownum).get("IMPT_HNG"))=="null" ? "" : String.valueOf(list.get(rownum).get("IMPT_HNG")));
				  cell.setCellStyle(style);
				  cell = row.createCell(4);
				  cell.setCellValue(String.valueOf(list.get(rownum).get("IMPT_CMPL_DT1"))=="null" ? "" : String.valueOf(list.get(rownum).get("IMPT_CMPL_DT1")));
				  cell.setCellStyle(styleDate);
				  cell = row.createCell(5);
				  cell.setCellValue(String.valueOf(list.get(rownum).get("IMPT_QTY"))=="null" ? 0 : Double.parseDouble(String.valueOf(list.get(rownum).get("IMPT_QTY"))));
				  cell.setCellStyle(style20);
				  cell = row.createCell(6);
				  cell.setCellValue(String.valueOf(list.get(rownum).get("IMPT_GURAE_GBN"))=="null" ? "" : String.valueOf(list.get(rownum).get("IMPT_GURAE_GBN")));
				  cell.setCellStyle(style);
				  cell = row.createCell(7);
				  cell.setCellValue(String.valueOf(list.get(rownum).get("REEX_END_DT1"))=="null" ? "" : String.valueOf(list.get(rownum).get("REEX_END_DT1")));
				  cell.setCellStyle(styleDate);
				  cell = row.createCell(8);
				  cell.setCellValue(String.valueOf(list.get(rownum).get("EHEANG_END_DT1"))=="null" ? "" : String.valueOf(list.get(rownum).get("EHEANG_END_DT1")));
				  cell.setCellStyle(styleDate);
				  cell = row.createCell(9);
				  cell.setCellValue(String.valueOf(list.get(rownum).get("YONGDO_DT1"))=="null" ? "" : String.valueOf(list.get(rownum).get("YONGDO_DT1")));
				  cell.setCellStyle(styleDate);
				  cell = row.createCell(10);
				  cell.setCellValue(String.valueOf(list.get(rownum).get("DELAY_SEQ"))=="null" ? 0 : Double.parseDouble(String.valueOf(list.get(rownum).get("DELAY_SEQ"))));
				  cell.setCellStyle(style20);
				  cell = row.createCell(11);
				  cell.setCellValue(String.valueOf(list.get(rownum).get("SoNo"))=="null" ? "" : String.valueOf(list.get(rownum).get("SoNo")));
				  cell.setCellStyle(style);
				  cell = row.createCell(12);
				  cell.setCellValue(String.valueOf(list.get(rownum).get("EndUserName"))=="null" ? "" : String.valueOf(list.get(rownum).get("EndUserName")));
				  cell.setCellStyle(style1);
				  cell = row.createCell(13);
				  cell.setCellValue(String.valueOf(list.get(rownum).get("ExEmNo"))=="null" ? "" : String.valueOf(list.get(rownum).get("ExEmNo")));
				  cell.setCellStyle(style);
				  cell = row.createCell(14);
				  cell.setCellValue(String.valueOf(list.get(rownum).get("SERIAL_NO"))=="null" ? "" : String.valueOf(list.get(rownum).get("SERIAL_NO")));
				  cell.setCellStyle(style);
				  cell = row.createCell(15);
				  cell.setCellValue(String.valueOf(list.get(rownum).get("PROD_CD"))=="null" ? "" : String.valueOf(list.get(rownum).get("PROD_CD")));
				  cell.setCellStyle(style1);
				  cell = row.createCell(16);
				  cell.setCellValue(String.valueOf(list.get(rownum).get("PROD_NM"))=="null" ? "" : String.valueOf(list.get(rownum).get("PROD_NM")));
				  cell.setCellStyle(style1);
				  cell = row.createCell(17);
				  cell.setCellValue(Double.parseDouble(String.valueOf(list.get(rownum).get("RMID_QTY")))==0 ? 0 : Double.parseDouble(String.valueOf(list.get(rownum).get("RMID_QTY"))));
				  cell.setCellStyle(style20);
				  cell = row.createCell(18);
				  cell.setCellValue(String.valueOf(list.get(rownum).get("INV_NO"))=="null" ? "" : String.valueOf(list.get(rownum).get("INV_NO")));
				  cell.setCellStyle(style);
				  cell = row.createCell(19);
				  cell.setCellValue(String.valueOf(list.get(rownum).get("EXPT_DECL_NO"))=="null" ? "" : String.valueOf(list.get(rownum).get("EXPT_DECL_NO")));
				  cell.setCellStyle(style);
				  cell = row.createCell(20);
				  cell.setCellValue(String.valueOf(list.get(rownum).get("EXPT_LAN"))=="null" ? "" : String.valueOf(list.get(rownum).get("EXPT_LAN")));
				  cell.setCellStyle(style);
				  cell = row.createCell(21);
				  cell.setCellValue(String.valueOf(list.get(rownum).get("EXPT_HNG"))=="null" ? "" : String.valueOf(list.get(rownum).get("EXPT_HNG")));
				  cell.setCellStyle(style);
				  cell = row.createCell(22);
				  cell.setCellValue(String.valueOf(list.get(rownum).get("EXPT_CMPL_DT1"))=="null" ? "" : String.valueOf(list.get(rownum).get("EXPT_CMPL_DT1")));
				  cell.setCellStyle(styleDate);
				  cell = row.createCell(23);
				  cell.setCellValue(String.valueOf(list.get(rownum).get("EXPT_QTY"))=="null" ? 0 : Double.parseDouble(String.valueOf(list.get(rownum).get("EXPT_QTY"))));
				  cell.setCellStyle(style20);
				  cell = row.createCell(24);
				  cell.setCellValue(String.valueOf(list.get(rownum).get("EXPT_GURAE_GBN"))=="null" ? "" : String.valueOf(list.get(rownum).get("EXPT_GURAE_GBN")));
				  cell.setCellStyle(style);
				  cell = row.createCell(25);
				  cell.setCellValue(String.valueOf(list.get(rownum).get("NameOfShipto"))=="null" ? "" : String.valueOf(list.get(rownum).get("NameOfShipto")));
				  cell.setCellStyle(style1);
				  cell = row.createCell(26);
				  cell.setCellValue(String.valueOf(list.get(rownum).get("dayCheck"))=="null" ? 0 : Double.parseDouble(String.valueOf(list.get(rownum).get("dayCheck"))));
				  cell.setCellStyle(style20);
				  cell = row.createCell(27);
				  cell.setCellValue(String.valueOf(list.get(rownum).get("STATUS"))=="null" ? "" : String.valueOf(list.get(rownum).get("STATUS")));
				  cell.setCellStyle(style);
			  }
			  fos = new FileOutputStream("C:\\edwards\\ReExport_"+currentDatetime+".xlsx");
			  workbook.write(fos);

			  if(fos != null){
				  fos.close();
				  workbook.dispose();
			  }
			  if(workbook != null){
				  workbook.close();
				  workbook.dispose();
			  }

			  File fileToDownload = new File("C:\\edwards\\ReExport_"+currentDatetime+".xlsx");
			  InputStream inputStream = new FileInputStream(fileToDownload);
			  response.setContentType("application/force-download");
			  if(list.size() < 1){
				  response.setHeader("Content-Disposition", "attachment; filename=\""+URLEncoder.encode("재수출.xlsx", "UTF-8")+"\"");
			  }else{
				  response.setHeader("Content-Disposition", "attachment; filename=\""+URLEncoder.encode("재수출_"+String.valueOf(list.get(0).get("BL_NO"))+".xlsx", "UTF-8")+"\"");
			  }
			  IOUtils.copy(inputStream, response.getOutputStream());
			  response.flushBuffer();
			  inputStream.close();

			  if(fos != null){
				  fos.close();
				  workbook.dispose();
			  }
			  if(workbook != null){
				  workbook.close();
				  workbook.dispose();
			  }
		}catch(Exception e){
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "/autoReExpo")
	public ResponseEntity<?> autoReExpo(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String userKey			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

			String EXPT_INVNO  		= args.containsKey("EXPT_INVNO") ? stringValueOf(args.get("EXPT_INVNO")) : "";
			String Expo_gurae_gbn  	= args.containsKey("Expo_gurae_gbn") ? stringValueOf(args.get("Expo_gurae_gbn")) : "";
			String NameOfShipto  	= args.containsKey("NameOfShipto") ? stringValueOf(args.get("NameOfShipto")) : "";
			List<Map> list = edwardsManagementService.selectAutoReExpo(args);
			for(int i = 0, n = list.size(); i < n; i++){
				Map map2 = new HashMap();
				map2.put("EXPT_INVNO", EXPT_INVNO);
				map2.put("Expo_gurae_gbn", Expo_gurae_gbn);
				map2.put("NameOfShipto", NameOfShipto);
				map2.put("EXPT_ORDR_MNG_NO", stringValueOf(list.get(i).get("EXPT_ORDR_MNG_NO")));
				map2.put("EXPT_INV_SEQNO", stringValueOf(list.get(i).get("EXPT_INV_SEQNO")));
				map2.put("ReQTY", stringValueOf(list.get(i).get("QTY")));
				map2.put("checkQty", "0");
				map2.put("editUserId",userKey);
				map2.put("editUserNm",userNm);
				map2.put("editDtm",currentDatetime);
				map2.put("ID",userKey);
				map2.put("userNm",userNm);
				map2.put("currentDatetime",currentDatetime);
				map2.put("KEY_ED_REEXPT_MASTER", stringValueOf(list.get(i).get("KEY_ED_REEXPT_MASTER")));
				map2.put("KEY_ED_EXPT_INV", stringValueOf(list.get(i).get("KEY_ED_EXPT_INV")));
				map2.put("IMPT_ORDR_MNG_NO", stringValueOf(list.get(i).get("IMPT_ORDR_MNG_NO")));
				map2.put("LAN", stringValueOf(list.get(i).get("IMPT_LAN")));
				map2.put("HNG", stringValueOf(list.get(i).get("IMPT_HNG")));

				long result = edwardsManagementService.updateReExpo(map2);
				long result1 = edwardsManagementService.updateExpoInv3(map2);
//				if(!stringValueOf(list.get(i).get("IMPT_ORDR_MNG_NO")).equals("") || !stringValueOf(list.get(i).get("IMPT_ORDR_MNG_NO")).equals(null)){
//					long result2 = edwardsManagementService.updateImpoHng3(map2);
//				}
			}

			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/autoReImpo")
	public ResponseEntity<?> autoReImpo(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String userKey			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

			String BL_NO  			= args.containsKey("BL_NO") ? stringValueOf(args.get("BL_NO")) : "";
			String Impo_gele_gubun  = args.containsKey("Impo_gele_gubun") ? stringValueOf(args.get("Impo_gele_gubun")) : "";
			List<Map> list = edwardsManagementService.selectAutoReImpo(args);
			for(int i = 0, n = list.size(); i < n; i++){
				Map map2 = new HashMap();
				map2.put("BL_NO", BL_NO);
				map2.put("Impo_gele_gubun", Impo_gele_gubun);
				map2.put("IMPT_ORDR_MNG_NO", stringValueOf(list.get(i).get("IMPT_ORDR_MNG_NO")));
				map2.put("IMPT_INV_SEQNO", stringValueOf(list.get(i).get("IMPT_INV_SEQNO")));
				map2.put("ReQTY", stringValueOf(list.get(i).get("QTY")));
				map2.put("checkQty", "0");
				map2.put("editUserId",userKey);
				map2.put("editUserNm",userNm);
				map2.put("editDtm",currentDatetime);
				map2.put("ID",userKey);
				map2.put("userNm",userNm);
				map2.put("currentDatetime",currentDatetime);
				map2.put("KEY_ED_REIMPT_MASTER", stringValueOf(list.get(i).get("KEY_ED_REIMPT_MASTER")));
				map2.put("KEY_ED_IMPT_INV", stringValueOf(list.get(i).get("KEY_ED_IMPT_INV")));
				map2.put("EXPT_ORDR_MNG_NO", stringValueOf(list.get(i).get("EXPT_ORDR_MNG_NO")));
				map2.put("LAN", stringValueOf(list.get(i).get("EXPT_LAN")));
				map2.put("HNG", stringValueOf(list.get(i).get("EXPT_HNG")));

				long result = edwardsManagementService.updateReImpo(map2);
				long result1 = edwardsManagementService.updateImpoInv2(map2);
//				if(!stringValueOf(list.get(i).get("EXPT_ORDR_MNG_NO")).equals("") || !stringValueOf(list.get(i).get("EXPT_ORDR_MNG_NO")).equals(null)){
//					long result2 = edwardsManagementService.updateExpoHng(map2);
//				}
			}

			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/autoReImpoCancel")
	public ResponseEntity<?> autoReImpoCancel(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String userKey			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

			String BL_NO  			= args.containsKey("BL_NO") ? stringValueOf(args.get("BL_NO")) : "";
			List<Map> list = edwardsManagementService.selectAutoReImpoCancel(args);
			for(int i = 0, n = list.size(); i < n; i++){
				Map map2 = new HashMap();
				map2.put("KEY_ED_IMPT_INV", stringValueOf(list.get(i).get("KEY_ED_IMPT_INV")));
				map2.put("turnQty", stringValueOf(list.get(i).get("ReQty")));
				map2.put("BL_NO", BL_NO);
				map2.put("IMPT_ORDR_MNG_NO", stringValueOf(list.get(i).get("IMPT_ORDR_MNG_NO")));
				map2.put("IMPT_INV_SEQNO", stringValueOf(list.get(i).get("IMPT_INV_SEQNO")));
				map2.put("editUserId",userKey);
				map2.put("editUserNm",userNm);
				map2.put("editDtm",currentDatetime);
				long result1 = edwardsManagementService.updateImpoInv2(map2);
				List<Map> list1 = edwardsManagementService.selectReImpoCheckList(map2);
				for(int j = 0, m = list1.size(); j < m; j++){
					Map map3 = new HashMap();
					map3.put("EXPT_ORDR_MNG_NO", stringValueOf(list1.get(j).get("EXPT_ORDR_MNG_NO")));
					map3.put("LAN", stringValueOf(list1.get(j).get("EXPT_LAN")));
					map3.put("HNG", stringValueOf(list1.get(j).get("EXPT_HNG")));
					map3.put("turnQty", stringValueOf(list1.get(j).get("IMPT_QTY")));
					map3.put("ID",userKey);
					map3.put("userNm",userNm);
					map3.put("currentDatetime",currentDatetime);
					map3.put("KEY_ED_REIMPT_MASTER", stringValueOf(list1.get(j).get("KEY_ED_REIMPT_MASTER")));
					map3.put("Back","Back");
					map3.put("editUserId",userKey);
					map3.put("editUserNm",userNm);
					map3.put("editDtm",currentDatetime);
					long result3 = edwardsManagementService.updateReImpo(map3);
					if(!stringValueOf(list1.get(j).get("EXPT_ORDR_MNG_NO")).equals("") || !stringValueOf(list1.get(j).get("EXPT_ORDR_MNG_NO")).equals(null)){
						long result2 = edwardsManagementService.updateExpoHng(map3);
					}
				}
			}

			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/autoReExpoCancel")
	public ResponseEntity<?> autoReExpoCancel(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String userKey			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

			String EXPT_INVNO  		= args.containsKey("EXPT_INVNO") ? stringValueOf(args.get("EXPT_INVNO")) : "";
			List<Map> list = edwardsManagementService.selectAutoReExpoCancel(args);
			for(int i = 0, n = list.size(); i < n; i++){
				Map map2 = new HashMap();
				map2.put("KEY_ED_EXPT_INV", stringValueOf(list.get(i).get("KEY_ED_EXPT_INV")));
				map2.put("turnQty", stringValueOf(list.get(i).get("ORIG_STAT_QTY")));
				map2.put("editUserId",userKey);
				map2.put("editUserNm",userNm);
				map2.put("editDtm",currentDatetime);
				map2.put("EXPT_INVNO", EXPT_INVNO);
				map2.put("EXPT_INV_SEQNO", stringValueOf(list.get(i).get("EXPT_INV_SEQNO")));
				long result = edwardsManagementService.updateExpoInv3(map2);
				List<Map> list1 = edwardsManagementService.selectReExpoCheckList(map2);
				for(int j = 0, m = list1.size(); j < m; j++){
					Map map3 = new HashMap();
					map3.put("IMPT_ORDR_MNG_NO", stringValueOf(list1.get(j).get("IMPT_ORDR_MNG_NO")));
					map3.put("LAN", stringValueOf(list1.get(j).get("IMPT_LAN")));
					map3.put("HNG", stringValueOf(list1.get(j).get("IMPT_HNG")));
					map3.put("turnQty", stringValueOf(list1.get(j).get("EXPT_QTY")));
					map3.put("ID",userKey);
					map3.put("userNm",userNm);
					map3.put("currentDatetime",currentDatetime);
					map3.put("KEY_ED_REEXPT_MASTER", stringValueOf(list1.get(j).get("KEY_ED_REEXPT_MASTER")));
					map3.put("Back","Back");
					map3.put("editUserId",userKey);
					map3.put("editUserNm",userNm);
					map3.put("editDtm",currentDatetime);
					long result3 = edwardsManagementService.updateReExpo(map3);
					if(!stringValueOf(list1.get(j).get("IMPT_ORDR_MNG_NO")).equals("") || !stringValueOf(list1.get(j).get("IMPT_ORDR_MNG_NO")).equals(null)){
						long result2 = edwardsManagementService.updateImpoHng3(map3);
					}
				}
			}

			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectReExpoCount")
	public ResponseEntity<?> selectReExpoCount(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectReExpoCount(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectReImpoCount")
	public ResponseEntity<?> selectReImpoCount(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectReImpoCount(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectReImpoCount1")
	public ResponseEntity<?> selectReImpoCount1(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectReImpoCount1(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectReImpoCount2")
	public ResponseEntity<?> selectReImpoCount2(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectReImpoCount2(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/updateReImpoCount")
	public ResponseEntity<?> updateReImpoCount(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String userNm			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String userKey			= stringValueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			args.put("editUserId",userKey);
			args.put("editUserNm",userNm);
			args.put("editDtm",currentDatetime);

			long result = edwardsManagementService.updateReImpoCount(args);
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/updateImptNull")
	public ResponseEntity<?> updateImptNull(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			edwardsManagementService.updateNullInv();
			edwardsManagementService.updateNullDecl();
			edwardsManagementService.updateNullLan();
			edwardsManagementService.updateNullHng();
			long result = edwardsManagementService.updateNullSel();
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/updateExptNull")
	public ResponseEntity<?> updateExptNull(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
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
			long result = edwardsManagementService.updateNullExHng();
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectQtyLogList")
	public ResponseEntity<?> selectQtyLogList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectQtyLogList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectKitList")
	public ResponseEntity<?> selectKitList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectKitList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectKitItemList")
	public ResponseEntity<?> selectKitItemList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectKitItemList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectKitExcelList")
	public ResponseEntity<?> selectKitExcelList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectKitExcelList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImInvNoCheck")
	public ResponseEntity<?> selectImInvNoCheck(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectImInvNoCheck(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectGinapList")
	public ResponseEntity<?> selectGinapList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectGinapList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "/selectFCNCheck")
	public ResponseEntity<?> selectFCNCheck(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectFCNCheck(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "/selectFCNCheck1")
	public ResponseEntity<?> selectFCNCheck1(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectFCNCheck1(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "/selectHsCodeCheck")
	public ResponseEntity<?> selectHsCodeCheck(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edwardsManagementService.selectHsCodeCheck(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
}