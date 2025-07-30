package com.edwards.web.customs;

import static com.edwards.commons.CmmnUtils.getUserInfo;

import com.edwards.biz.customsManagement.*;
import com.edwards.biz.systemManagement.SystemManagementService;
import com.edwards.commons.CmmnConstants;
import com.edwards.commons.CmmnController;
import com.edwards.commons.CmmnMailService;
import com.edwards.commons.CmmnUtils;
import com.edwards.commons.CommExcel;
import com.edwards.domains.CpsStartInfoVO;
import com.edwards.domains.CustomsCostDetailVO;
import com.edwards.domains.CustomsCostMasterVO;
import com.edwards.domains.DeliveryCarVO;
import com.edwards.domains.DeliveryCarryingInVO;
import com.edwards.domains.DeliveryCostGroupVO;
import com.edwards.domains.DeliveryCostVO;
import com.edwards.domains.DeliveryRequestVO;
import com.edwards.domains.ExpoStartInfoVO;
import com.edwards.domains.NcustomsGeoExpo1AdditionalVO;

import org.apache.commons.lang3.math.NumberUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.View;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.math.BigDecimal;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;



import java.io.FileOutputStream;
import java.io.File;
import java.io.UnsupportedEncodingException;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;


@RestController
@RequestMapping(value = {"/apis/customs"}, method = {RequestMethod.POST})
public class CustomsController extends CmmnController {
	@Autowired
	private CustomsManagementService customsManagementService;
	@Autowired
	private SystemManagementService systemManagementService;
	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	private CmmnMailService cmmnMailService;
	@Autowired
	private CustomsCostMasterDao customsCostMasterDao;
	@Autowired
	SessionTempCustomsDao sessionTempCustomsDao;

	@RequestMapping(value = "/selectImportRequestList")
	public ResponseEntity<?> selectImportRequestList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String _defaultDB 	= args.containsKey("_defaultDB") ? String.valueOf(args.get("_defaultDB")) : "";
			String USERGRADE 	= args.containsKey("USERGRADE") ? String.valueOf(args.get("USERGRADE")) : "";
			String taxNum 		= args.containsKey("taxNum") ? String.valueOf(args.get("taxNum")) : "";
			String ID 			= args.containsKey("ID") ? String.valueOf(args.get("ID")) : "";
			String USERID 		= args.containsKey("USERID") ? String.valueOf(args.get("USERID")) : "";

			List<Map> list = new ArrayList<>();
			if((USERGRADE.equals("A")||USERGRADE.equals("B"))&&taxNum.equals("")){
				if(_defaultDB.equals("all")){
					list = customsManagementService.selectImportAllRequestList(args);
					List<?> result = list.stream().collect(Collectors.toList());
					return new ResponseEntity<>(result, HttpStatus.OK);
				}else{
					if(_defaultDB.equals("ncustoms")){
						for (int i = 0; i < 2; i++) {
							if(i==0){
								args.put("_defaultDB","ncustoms");
							}else{
								args.put("_defaultDB","ncustoms_sel4");
							}
							list.addAll(customsManagementService.selectImportRequestList(args));
						}
					}else{
						list = customsManagementService.selectImportRequestList(args);
					}
					List<?> result = list.stream().collect(Collectors.toList());
					return new ResponseEntity<>(result, HttpStatus.OK);
				}
			}else if((USERGRADE.equals("A")||USERGRADE.equals("B"))&&!taxNum.equals("")){
				list = customsManagementService.selectImportRequestList(args);
				List<?> result = list.stream().collect(Collectors.toList());
				return new ResponseEntity<>(result, HttpStatus.OK);
			}else{
				List<Map> list2 = new ArrayList<>();
				Map map = new HashMap();
				if(USERGRADE.equals("E")||USERGRADE.equals("F")){
					map.put("userId", ID);
					list2 = systemManagementService.selectDefaultDBList(map);
					for (int i = 0, n = list2.size(); i < n; i++) {
						args.put("_defaultDB",list2.get(i).get("defaultDB"));
						list.addAll(customsManagementService.selectImportRequestList(args));
					}
				}else{
					map.put("userId", USERID);
					list2 = systemManagementService.selectDefaultDBList(map);
					for (int i = 0, n = list2.size(); i < n; i++) {
						args.put("_defaultDB",list2.get(i).get("defaultDB"));
						list.addAll(customsManagementService.selectImportRequestList(args));
					}
				}
				List<?> result = list.stream().collect(Collectors.toList());
				return new ResponseEntity<>(result, HttpStatus.OK);
			}
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}


















	@RequestMapping(value = "/selectImportStatusList")
	public ResponseEntity<?> selectImportStatusList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			String _defaultDB 		= args.containsKey("_defaultDB") ? String.valueOf(args.get("_defaultDB")) : "";
			String USERGRADE 		= args.containsKey("USERGRADE") ? String.valueOf(args.get("USERGRADE")) : "";
			String taxNum 			= args.containsKey("taxNum") ? String.valueOf(args.get("taxNum")) : "";
			String ID 				= args.containsKey("ID") ? String.valueOf(args.get("ID")) : "";
			String USERID 			= args.containsKey("USERID") ? String.valueOf(args.get("USERID")) : "";
			String impoFileNo1Total	= args.containsKey("impoFileNo1Total") ? String.valueOf(args.get("impoFileNo1Total")) : "";
			if(!impoFileNo1Total.equals("")){
				impoFileNo1Total = "'"+impoFileNo1Total.replaceAll(System.getProperty("line.separator"), " ").replace(" ", "','")+"'";
				impoFileNo1Total = "("+impoFileNo1Total.replace(",''", "")+")";
				args.put("impoFileNo1Total",impoFileNo1Total);
			}

			List<Map> list = new ArrayList<>();
			if((USERGRADE.equals("A")||USERGRADE.equals("B"))&&taxNum.equals("")){
				if(_defaultDB.equals("all")){
					list = customsManagementService.selectImportAllStatusList(args);
					List<?> result = list.stream().collect(Collectors.toList());
					return new ResponseEntity<>(result, HttpStatus.OK);
				}else{
					if(_defaultDB.equals("ncustoms")){
						for (int i = 0, n = 2; i < n; i++) {
							if(i==0){
								args.put("_defaultDB","ncustoms");
							}else{
								args.put("_defaultDB","ncustoms_sel4");
							}
							list.addAll(customsManagementService.selectImportStatusList(args));
						}
					}else{
						list = customsManagementService.selectImportStatusList(args);
					}
					List<?> result = list.stream().collect(Collectors.toList());
					return new ResponseEntity<>(result, HttpStatus.OK);
				}
			}else if((USERGRADE.equals("A")||USERGRADE.equals("B"))&&!taxNum.equals("")){
				list = customsManagementService.selectImportStatusList(args);
				List<?> result = list.stream().collect(Collectors.toList());
				return new ResponseEntity<>(result, HttpStatus.OK);
			}else{
				List<Map> list2 = new ArrayList<>();
				Map map = new HashMap();
				if(USERGRADE.equals("E")||USERGRADE.equals("F")){
					map.put("userId", ID);
					list2 = systemManagementService.selectDefaultDBList(map);
					for (int i = 0, n = list2.size(); i < n; i++) {
						args.put("_defaultDB",list2.get(i).get("defaultDB"));
						list.addAll(customsManagementService.selectImportStatusList(args));
					}
				}else{
					map.put("userId", USERID);
					list2 = systemManagementService.selectDefaultDBList(map);
					for (int i = 0, n = list2.size(); i < n; i++) {
						args.put("_defaultDB",list2.get(i).get("defaultDB"));
						list.addAll(customsManagementService.selectImportStatusList(args));
					}
				}
				List<?> result = list.stream().collect(Collectors.toList());
				return new ResponseEntity<>(result, HttpStatus.OK);
			}
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImportStatusTotalList")
	public ResponseEntity<?> selectImportStatusTotalList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			String _defaultDB 	= args.containsKey("_defaultDB") ? String.valueOf(args.get("_defaultDB")) : "";
			String USERGRADE 	= args.containsKey("USERGRADE") ? String.valueOf(args.get("USERGRADE")) : "";
			String taxNum 		= args.containsKey("taxNum") ? String.valueOf(args.get("taxNum")) : "";
			String ID 			= args.containsKey("ID") ? String.valueOf(args.get("ID")) : "";
			String USERID 		= args.containsKey("USERID") ? String.valueOf(args.get("USERID")) : "";

			List<Map> list = new ArrayList<>();
			if((USERGRADE.equals("A")||USERGRADE.equals("B"))&&taxNum.equals("")){
				if(_defaultDB.equals("all")){
					list = customsManagementService.selectImportStatusTotalList(args);
					List<?> result = list.stream().collect(Collectors.toList());
					return new ResponseEntity<>(result, HttpStatus.OK);
				}else{
					if(_defaultDB.equals("ncustoms")){
						for (int i = 0, n = 2; i < n; i++) {
							if(i==0){
								args.put("_defaultDB","ncustoms");
							}else{
								args.put("_defaultDB","ncustoms_sel4");
							}
							list.addAll(customsManagementService.selectImportStatusTotalList(args));
						}
					}else{
						list = customsManagementService.selectImportStatusTotalList(args);
					}
					List<?> result = list.stream().collect(Collectors.toList());
					return new ResponseEntity<>(result, HttpStatus.OK);
				}
			}else if((USERGRADE.equals("A")||USERGRADE.equals("B"))&&!taxNum.equals("")){
				list = customsManagementService.selectImportStatusTotalList(args);
				List<?> result = list.stream().collect(Collectors.toList());
				return new ResponseEntity<>(result, HttpStatus.OK);
			}else{
				List<Map> list2 = new ArrayList<>();
				Map map = new HashMap();
				if(USERGRADE.equals("E")||USERGRADE.equals("F")){
					map.put("userId", ID);
					list2 = systemManagementService.selectDefaultDBList(map);
					for (int i = 0, n = list2.size(); i < n; i++) {
						args.put("_defaultDB",list2.get(i).get("defaultDB"));
						list.addAll(customsManagementService.selectImportStatusTotalList(args));
					}
				}else{
					map.put("userId", USERID);
					list2 = systemManagementService.selectDefaultDBList(map);
					for (int i = 0, n = list2.size(); i < n; i++) {
						args.put("_defaultDB",list2.get(i).get("defaultDB"));
						list.addAll(customsManagementService.selectImportStatusTotalList(args));
					}
				}
				List<?> result = list.stream().collect(Collectors.toList());
				return new ResponseEntity<>(result, HttpStatus.OK);
			}
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImportStatusDetail")
	public ResponseEntity<?> selectImportStatusDetail(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			List<Map> list = new ArrayList<>();
			list = customsManagementService.selectImportStatusDetail(args);
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
			list = customsManagementService.selectImportStatusDetail1(args);
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
			list = customsManagementService.selectImportStatusDetail2(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImportStatusDetailYog")
	public ResponseEntity<?> selectImportStatusDetailYog(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			List<Map> list = new ArrayList<>();
			list = customsManagementService.selectImportStatusDetailYog(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImportStatusDetail2Ex")
	public ResponseEntity<?> selectImportStatusDetail2Ex(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			List<Map> list = new ArrayList<>();
			list = customsManagementService.selectImportStatusDetail2Ex(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	// impo3 + 자재마스터
	@RequestMapping(value = "/selectImportStatusDetail4")
	public ResponseEntity<?> selectImportStatusDetail4(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			List<Map> list = new ArrayList<>();
			list = customsManagementService.selectImportStatusDetail4(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectZeissImportStatusDetail")
	public ResponseEntity<?> selectZeissImportStatusDetail(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			String taxNum 		= args.containsKey("taxNum") ? String.valueOf(args.get("taxNum")) : "";

			List<Map> list = new ArrayList<>();
			if(taxNum.equals("1058677021")){
				list.addAll(customsManagementService.selectZeissImportStatusDetail2(args));
			}else if(taxNum.equals("2038151510")){
				list.addAll(customsManagementService.selectZeissImportStatusDetail1(args));
			}else{
				list.addAll(customsManagementService.selectZeissImportStatusDetail(args));
			}
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImportStatusDetail3")
	public ResponseEntity<?> selectImportStatusDetail3(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			List<Map> list = new ArrayList<>();
			list = customsManagementService.selectImportStatusDetail3(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectTodsItem")
	public ResponseEntity<?> selectTodsItem(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			List<Map> list = new ArrayList<>();
			list = customsManagementService.selectTodsItem(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectZeissImportStatusList")
	public ResponseEntity<?> selectZeissImportStatusList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			String taxNum 		= args.containsKey("taxNum") ? String.valueOf(args.get("taxNum")) : "";

			List<Map> list = new ArrayList<>();
			if(taxNum.equals("1058677021")){
				list.addAll(customsManagementService.selectZeissImportStatusList2(args));
			}else if(taxNum.equals("2038151510")){
				list.addAll(customsManagementService.selectZeissImportStatusList1(args));
			}else{
				list.addAll(customsManagementService.selectZeissImportStatusList(args));
			}
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImportStatusFtpList")
	public ResponseEntity<?> selectImportStatusFtpList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			List<Map> list = customsManagementService.selectImportStatusFtpList(args);
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
			String _defaultDB 	= args.containsKey("_defaultDB") ? String.valueOf(args.get("_defaultDB")) : "";
			String USERGRADE 	= args.containsKey("USERGRADE") ? String.valueOf(args.get("USERGRADE")) : "";
			String taxNum 		= args.containsKey("taxNum") ? String.valueOf(args.get("taxNum")) : "";
			String ID 			= args.containsKey("ID") ? String.valueOf(args.get("ID")) : "";
			String USERID 		= args.containsKey("USERID") ? String.valueOf(args.get("USERID")) : "";

			List<Map> list = new ArrayList<>();
			if((USERGRADE.equals("A")||USERGRADE.equals("B"))&&taxNum.equals("")){
				if(_defaultDB.equals("all")){
					list = customsManagementService.selectExportAllStatusList(args);
					List<?> result = list.stream().collect(Collectors.toList());
					return new ResponseEntity<>(result, HttpStatus.OK);
				}else{
					if(_defaultDB.equals("ncustoms_sel_040")){
						for (int i = 0, n = 2; i < n; i++) {
							if(i==0){
								args.put("_defaultDB","ncustoms_sel_040");
							}else{
								args.put("_defaultDB","ncustoms_sel4");
							}
							list.addAll(customsManagementService.selectExportStatusList(args));
						}
					}else{
						list = customsManagementService.selectExportStatusList(args);
					}
					List<?> result = list.stream().collect(Collectors.toList());
					return new ResponseEntity<>(result, HttpStatus.OK);
				}
			}else if((USERGRADE.equals("A")||USERGRADE.equals("B"))&&!taxNum.equals("")){
				list = customsManagementService.selectExportStatusList(args);
				List<?> result = list.stream().collect(Collectors.toList());
				return new ResponseEntity<>(result, HttpStatus.OK);
			}else{
				List<Map> list2 = new ArrayList<>();
				Map map = new HashMap();
				if(USERGRADE.equals("E")||USERGRADE.equals("F")){
					map.put("userId", ID);
					list2 = systemManagementService.selectDefaultDBList(map);
					for (int i = 0, n = list2.size(); i < n; i++) {
						if(list2.get(i).get("defaultDB").equals("ncustoms")){
							args.put("_defaultDB","ncustoms_sel_040");
						}else{
							args.put("_defaultDB",list2.get(i).get("defaultDB"));
						}
						list.addAll(customsManagementService.selectExportStatusList(args));
					}
				}else{
					map.put("userId", USERID);
					list2 = systemManagementService.selectDefaultDBList(map);
					for (int i = 0, n = list2.size(); i < n; i++) {
						if(list2.get(i).get("defaultDB").equals("ncustoms")){
							args.put("_defaultDB","ncustoms_sel_040");
						}else{
							args.put("_defaultDB",list2.get(i).get("defaultDB"));
						}
						list.addAll(customsManagementService.selectExportStatusList(args));
					}
				}
				List<?> result = list.stream().collect(Collectors.toList());
				return new ResponseEntity<>(result, HttpStatus.OK);
			}
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectZeissExportStatusList")
	public ResponseEntity<?> selectZeissExportStatusList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			String _defaultDB 	= args.containsKey("_defaultDB") ? String.valueOf(args.get("_defaultDB")) : "";
			String USERGRADE 	= args.containsKey("USERGRADE") ? String.valueOf(args.get("USERGRADE")) : "";
			String taxNum 		= args.containsKey("taxNum") ? String.valueOf(args.get("taxNum")) : "";
			String ID 			= args.containsKey("ID") ? String.valueOf(args.get("ID")) : "";
			String USERID 		= args.containsKey("USERID") ? String.valueOf(args.get("USERID")) : "";

			List<Map> list = new ArrayList<>();
			List<Map> list2 = new ArrayList<>();
			Map map = new HashMap();
			map.put("userId", ID);
			list2 = systemManagementService.selectDefaultDBList(map);
			for (int i = 0, n = list2.size(); i < n; i++) {
				if(list2.get(i).get("defaultDB").equals("ncustoms")){
					args.put("_defaultDB","ncustoms_sel_040");
				}else{
					args.put("_defaultDB",list2.get(i).get("defaultDB"));
				}
				list.addAll(customsManagementService.selectExportStatusList(args));
			}
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectIsuExportStatusList")
	public ResponseEntity<?> selectIsuExportStatusList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			String _defaultDB 	= args.containsKey("_defaultDB") ? String.valueOf(args.get("_defaultDB")) : "";
			String USERGRADE 	= args.containsKey("USERGRADE") ? String.valueOf(args.get("USERGRADE")) : "";
			String taxNum 		= args.containsKey("taxNum") ? String.valueOf(args.get("taxNum")) : "";
			String ID 			= args.containsKey("ID") ? String.valueOf(args.get("ID")) : "";
			String USERID 		= args.containsKey("USERID") ? String.valueOf(args.get("USERID")) : "";

			List<Map> list = new ArrayList<>();
			if((USERGRADE.equals("A")||USERGRADE.equals("B"))&&taxNum.equals("")){
				if(_defaultDB.equals("all")){
					list = customsManagementService.selectExportAllStatusList(args);
					List<?> result = list.stream().collect(Collectors.toList());
					return new ResponseEntity<>(result, HttpStatus.OK);
				}else{
					if(_defaultDB.equals("ncustoms_sel_040")){
						for (int i = 0, n = 2; i < n; i++) {
							if(i==0){
								args.put("_defaultDB","ncustoms_sel_040");
							}else{
								args.put("_defaultDB","ncustoms_sel4");
							}
							list.addAll(customsManagementService.selectIsuExportStatusList(args));
						}
					}else{
						list = customsManagementService.selectIsuExportStatusList(args);
					}
					List<?> result = list.stream().collect(Collectors.toList());
					return new ResponseEntity<>(result, HttpStatus.OK);
				}
			}else if((USERGRADE.equals("A")||USERGRADE.equals("B"))&&!taxNum.equals("")){
				list = customsManagementService.selectIsuExportStatusList(args);
				List<?> result = list.stream().collect(Collectors.toList());
				return new ResponseEntity<>(result, HttpStatus.OK);
			}else{
				List<Map> list2 = new ArrayList<>();
				Map map = new HashMap();
				if(USERGRADE.equals("E")||USERGRADE.equals("F")){
					map.put("userId", ID);
					list2 = systemManagementService.selectDefaultDBList(map);
					for (int i = 0, n = list2.size(); i < n; i++) {
						if(list2.get(i).get("defaultDB").equals("ncustoms")){
							args.put("_defaultDB","ncustoms_sel_040");
						}else{
							args.put("_defaultDB",list2.get(i).get("defaultDB"));
						}
						list.addAll(customsManagementService.selectIsuExportStatusList(args));
					}
				}else{
					map.put("userId", USERID);
					list2 = systemManagementService.selectDefaultDBList(map);
					for (int i = 0, n = list2.size(); i < n; i++) {
						if(list2.get(i).get("defaultDB").equals("ncustoms")){
							args.put("_defaultDB","ncustoms_sel_040");
						}else{
							args.put("_defaultDB",list2.get(i).get("defaultDB"));
						}
						list.addAll(customsManagementService.selectIsuExportStatusList(args));
					}
				}
				List<?> result = list.stream().collect(Collectors.toList());
				return new ResponseEntity<>(result, HttpStatus.OK);
			}
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
			List<Map> list = customsManagementService.selectExportDeclarationDetailList(args);
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
			List<Map> list = customsManagementService.selectExportDeclarationSubDetailList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectZeissExportStatusDetail")
	public ResponseEntity<?> selectZeissExportStatusDetail(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			String taxNum = args.containsKey("taxNum") ? String.valueOf(args.get("taxNum")) : "";

			List<Map> list = new ArrayList<>();
			if(taxNum.equals("1058677021")){
				list.addAll(customsManagementService.selectZeissExportStatusDetail2(args));
			}else if(taxNum.equals("2038151510")){
				list.addAll(customsManagementService.selectZeissExportStatusDetail1(args));
			}else{
				list.addAll(customsManagementService.selectZeissExportStatusDetail(args));
			}
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectExportStatusFtpList")
	public ResponseEntity<?> selectExportStatusFtpList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			List<Map> list = customsManagementService.selectExportStatusFtpList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectAccountCostCustomsList")
	public ResponseEntity<?> selectAccountCostCustomsList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			if(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)).equals("156") || String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)).equals("258") || String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)).equals("656")){
				args.put("_defaultDB", "[demoCLFMS_SE]");
			}else{
				args.put("_defaultDB", "[CLFMS_SE]");
			}
			List<Map> list = customsManagementService.selectAccountCostCustomsList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectAccountCostAdjustmentList")
	public ResponseEntity<?> selectAccountCostAdjustmentList(HttpServletRequest request, @RequestBody Map args){
		if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
		  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			checkPagingParamsForMapper(args);
			List<Map> list;
			if (String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)).equals("156") || String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)).equals("258") || String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)).equals("656")){
				args.put("_defaultDB", "[demoCLFMS_SE]");
			}else{
				args.put("_defaultDB", "[CLFMS_SE]");
			}
			list = customsManagementService.selectAccountCostAdjustmentList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectAccountBillAdjustmentList")
	public ResponseEntity<?> selectAccountBillAdjustmentList(HttpServletRequest request, @RequestBody Map args){
		if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
		  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			checkPagingParamsForMapper(args);
			List<Map> list;
			if (String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)).equals("156") || String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)).equals("258") || String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)).equals("656")){
				args.put("_defaultDB", "[demoCLFMS_SE]");
			}else{
				args.put("_defaultDB", "[CLFMS_SE]");
			}
			list = customsManagementService.selectAccountBillAdjustmentList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectAccountCostStatementOfAccountsList")
	public ResponseEntity<?> selectAccountCostStatementOfAccountsList(HttpServletRequest request, @RequestBody Map args){
		if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
		  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			checkPagingParamsForMapper(args);
			List<Map> list;
			if (String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)).equals("156") || String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)).equals("258") || String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)).equals("656")){
				args.put("_defaultDB", "[demoCLFMS_SE]");
			}else{
				args.put("_defaultDB", "[CLFMS_SE]");
			}
			list = customsManagementService.selectAccountCostStatementOfAccountsList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectAccountCostStatementOfAccountsDetailList")
	public ResponseEntity<?> selectAccountCostStatementOfAccountsDetailList(HttpServletRequest request, @RequestBody Map args){
		if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
		  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			checkPagingParamsForMapper(args);
			List<Map> list;
			if (String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)).equals("156") || String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)).equals("258") || String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)).equals("656")){
				args.put("_defaultDB", "[demoCLFMS_SE]");
			}else{
				args.put("_defaultDB", "[CLFMS_SE]");
			}
			list = customsManagementService.selectAccountCostStatementOfAccountsDetailList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectAccountCostStatementOfAccountsList1")
	public ResponseEntity<?> selectAccountCostStatementOfAccountsList1(HttpServletRequest request, @RequestBody Map args){
		if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
		  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			checkPagingParamsForMapper(args);
			List<Map> list;
			if (String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)).equals("156") || String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)).equals("258") || String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)).equals("656")){
				args.put("_defaultDB", "[demoCLFMS_SE]");
			}else{
				args.put("_defaultDB", "[CLFMS_SE]");
			}
			list = customsManagementService.selectAccountCostStatementOfAccountsList1(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectAccountCostStatementOfAccountsDetailList1")
	public ResponseEntity<?> selectAccountCostStatementOfAccountsDetailList1(HttpServletRequest request, @RequestBody Map args){
		if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
		  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			checkPagingParamsForMapper(args);
			List<Map> list;
			if (String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)).equals("156") || String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)).equals("258") || String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)).equals("656")){
				args.put("_defaultDB", "[demoCLFMS_SE]");
			}else{
				args.put("_defaultDB", "[CLFMS_SE]");
			}
			list = customsManagementService.selectAccountCostStatementOfAccountsDetailList1(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectAccountBillStatementOfAccountsList")
	public ResponseEntity<?> selectAccountBillStatementOfAccountsList(HttpServletRequest request, @RequestBody Map args){
		if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
		  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			checkPagingParamsForMapper(args);
			List<Map> list;
			if (String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)).equals("156") || String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)).equals("258") || String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)).equals("656")){
				args.put("_defaultDB", "[demoCLFMS_SE]");
			}else{
				args.put("_defaultDB", "[CLFMS_SE]");
			}
			list = customsManagementService.selectAccountBillStatementOfAccountsList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectAccountBillStatementOfAccountsDetailList")
	public ResponseEntity<?> selectAccountBillStatementOfAccountsDetailList(HttpServletRequest request, @RequestBody Map args){
		if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
		  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			checkPagingParamsForMapper(args);
			List<Map> list;
			if (String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)).equals("156") || String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)).equals("258") || String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)).equals("656")){
				args.put("_defaultDB", "[demoCLFMS_SE]");
			}else{
				args.put("_defaultDB", "[CLFMS_SE]");
			}
			list = customsManagementService.selectAccountBillStatementOfAccountsDetailList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectAccountBillStatementOfAccountsList1")
	public ResponseEntity<?> selectAccountBillStatementOfAccountsList1(HttpServletRequest request, @RequestBody Map args){
		if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
		  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			checkPagingParamsForMapper(args);
			List<Map> list;
			if (String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)).equals("156") || String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)).equals("258") || String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)).equals("656")){
				args.put("_defaultDB", "[demoCLFMS_SE]");
			}else{
				args.put("_defaultDB", "[CLFMS_SE]");
			}
			list = customsManagementService.selectAccountBillStatementOfAccountsList1(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectAccountBillStatementOfAccountsDetailList1")
	public ResponseEntity<?> selectAccountBillStatementOfAccountsDetailList1(HttpServletRequest request, @RequestBody Map args){
		if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
		  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			checkPagingParamsForMapper(args);
			List<Map> list;
			if (String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)).equals("156") || String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)).equals("258") || String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)).equals("656")){
				args.put("_defaultDB", "[demoCLFMS_SE]");
			}else{
				args.put("_defaultDB", "[CLFMS_SE]");
			}
			list = customsManagementService.selectAccountBillStatementOfAccountsDetailList1(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}



	@RequestMapping(value = "/selectExportRequestList")
	public ResponseEntity<?> selectExportRequestList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String _defaultDB 	= args.containsKey("_defaultDB") ? String.valueOf(args.get("_defaultDB")) : "";
			String USERGRADE 	= args.containsKey("USERGRADE") ? String.valueOf(args.get("USERGRADE")) : "";
			String taxNum 		= args.containsKey("taxNum") ? String.valueOf(args.get("taxNum")) : "";
			String ID 			= args.containsKey("ID") ? String.valueOf(args.get("ID")) : "";
			String USERID 		= args.containsKey("USERID") ? String.valueOf(args.get("USERID")) : "";

			List<Map> list = new ArrayList<>();
			if((USERGRADE.equals("A")||USERGRADE.equals("B"))&&taxNum.equals("")){
				if(_defaultDB.equals("all")){
					list = customsManagementService.selectExportAllRequestList(args);
					List<?> result = list.stream().collect(Collectors.toList());
					return new ResponseEntity<>(result, HttpStatus.OK);
				}else{
					if(_defaultDB.equals("ncustoms_sel_040")){
						for (int i = 0, n = 2; i < n; i++) {
							if(i==0){
								args.put("_defaultDB","ncustoms_sel_040");
							}else{
								args.put("_defaultDB","ncustoms_sel4");
							}
							list.addAll(customsManagementService.selectExportRequestList(args));
						}
					}else{
						list = customsManagementService.selectExportRequestList(args);
					}
					List<?> result = list.stream().collect(Collectors.toList());
					return new ResponseEntity<>(result, HttpStatus.OK);
				}
			}else if((USERGRADE.equals("A")||USERGRADE.equals("B"))&&!taxNum.equals("")){
				list = customsManagementService.selectExportRequestList(args);
				List<?> result = list.stream().collect(Collectors.toList());
				return new ResponseEntity<>(result, HttpStatus.OK);
			}else{
				List<Map> list2 = new ArrayList<>();
				Map map = new HashMap();
				if(USERGRADE.equals("E")||USERGRADE.equals("F")){
					map.put("userId", ID);
					list2 = systemManagementService.selectDefaultDBList(map);
					for (int i = 0, n = list2.size(); i < n; i++) {
						args.put("_defaultDB",list2.get(i).get("defaultDB"));
						list.addAll(customsManagementService.selectExportRequestList(args));
					}
				}else{
					map.put("userId", USERID);
					list2 = systemManagementService.selectDefaultDBList(map);
					for (int i = 0, n = list2.size(); i < n; i++) {
						args.put("_defaultDB",list2.get(i).get("defaultDB"));
						list.addAll(customsManagementService.selectExportRequestList(args));
					}
				}
				List<?> result = list.stream().collect(Collectors.toList());
				return new ResponseEntity<>(result, HttpStatus.OK);
			}
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectRequestList")
	public ResponseEntity<?> selectRequestList(HttpServletRequest request, @RequestBody Map args){
	    if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", 0))), Integer.parseInt(String.valueOf(args.getOrDefault("size", 20))));
			List<CpsStartInfoVO> list = customsManagementService.selectRequestList(args);

			List<?> result = list.stream()
				  .skip(pageRequest.getPageNumber() * pageRequest.getPageSize())
				  .limit(pageRequest.getPageSize())
				  .collect(Collectors.toList());

			return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectFileCount")
	public ResponseEntity<?> selectFileCount(HttpServletRequest request, @RequestBody Map args) throws Exception{
	    if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = customsManagementService.selectFileCount(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveRequest")
	public ResponseEntity<?> saveRequest(HttpServletRequest request, @RequestBody Map args) throws Exception{
	    if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
		  String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
		  Map targetMap = args;
		  CpsStartInfoVO cpsStartInfoVO = modelMapper.map(targetMap, CpsStartInfoVO.class);
		  cpsStartInfoVO.setAddDtm(currentDatetime);
		  CpsStartInfoVO returnVO = customsManagementService.saveRequest(cpsStartInfoVO, request);
		  return new ResponseEntity<>(returnVO, HttpStatus.CREATED);
		}catch(Exception e){
		  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/modifyRequest")
	public ResponseEntity<?> modifyRequest(HttpServletRequest request, @RequestBody Map args) throws Exception{
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			BigDecimal startKey 		= NumberUtils.createBigDecimal(String.valueOf(args.get("startKey")));
			String startNum 			= String.valueOf(args.get("startNum"));
			String startPoNo 			= String.valueOf(args.get("startPoNo"));
			String startReferenceNo1 	= String.valueOf(args.get("startReferenceNo1"));
			String startReferenceNo2 	= String.valueOf(args.get("startReferenceNo2"));
			String startNote 			= String.valueOf(args.get("startNote"));
			String startIssueContent 	= String.valueOf(args.get("startIssueContent"));
			String startCompensationYn 	= args.containsKey("startCompensationYn") ? String.valueOf(args.get("startCompensationYn")) : "";
			String startLocation 		= args.containsKey("startLocation") ? String.valueOf(args.get("startLocation")) : "";
			String currentDatetime 		= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			String isMailYn 			= CmmnUtils.isContainsMapValue(args, "_isMailYn") ? String.valueOf(args.get("_isMailYn")) : "N";

			List<CpsStartInfoVO> voList;
			Map map = new HashMap();
			map.put("startKey", startKey);
			voList = customsManagementService.selectRequestList(map);

			CpsStartInfoVO CpsStartVO = voList.get(0);

			CpsStartVO.setStartNum(startNum);
			CpsStartVO.setStartPoNo(startPoNo);
			CpsStartVO.setStartReferenceNo1(startReferenceNo1);
			CpsStartVO.setStartReferenceNo2(startReferenceNo2);
			CpsStartVO.setStartNote(startNote);
			CpsStartVO.setStartIssueContent(startIssueContent);
			CpsStartVO.setStartCompensationYn(startCompensationYn);
			CpsStartVO.setStartLocation(startLocation);
			CpsStartVO.setEditUserId(String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID)));
			CpsStartVO.setEditUserNm(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
			CpsStartVO.setEditDtm(currentDatetime);

			CpsStartInfoVO returnVO = customsManagementService.saveRequest(CpsStartVO, request);

			if(isMailYn.equals("Y")){
				Map map1 = new HashMap();
				map1.put("userId", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID)));
				List<Map> mailingKeyList = customsManagementService.selectMailingList(map1);
				List<Object> mailAddr = new ArrayList<>();
				if(mailingKeyList.size() > 0){
					for(Map m : mailingKeyList){
						mailAddr.add(String.valueOf(m.get("teamMail"))); // 할당 팀 메일
					}
					List mailSetList = new ArrayList(new HashSet(mailAddr));
					Map mailMap = new HashMap();
					mailMap.put("senderEmail", String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_MAIL))); // 발신자이메일
					mailMap.put("senderName", String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME))); // 발신자명
					mailMap.put("toAddr", mailSetList);
					mailMap.put("subject", "[세인관세법인(CPS-W)] 수입 의뢰 알림(B/L: " + returnVO.getStartNum() + ")");
					mailMap.put("contents", "<html>" +
					  "<table width='100%' cellpadding='5' cellspacing='0' border='1' style='border-collapse:collapse; border:1px black solid;'><tr><td width='30%' style='border:1px black solid;'><b>의뢰회사(사업자번호)</b></td><td width='70%' style='border:1px black solid;'>" + returnVO.getStartTaxpayerTradeName() + " (" + returnVO.getStartTaxpayerNum() + ")" + "</td></tr>" +
					  "<tr><td width='30%' style='border:1px black solid;'><b>B/L</b></td><td width='70%' style='border:1px black solid;'>" + returnVO.getStartNum() + "</td></tr>" +
					  "<tr><td width='30%' style='border:1px black solid;'><b>의뢰자</b></td><td width='70%' style='border:1px black solid;'>" + String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME)) + "</td></tr>" +
					  "<tr><td width='30%' style='border:1px black solid;'><b>의뢰내용</b></td><td width='70%' style='border:1px black solid;'>" + returnVO.getStartIssueContent() + "</td></tr></table>" +
					  "</html>"
					);
					mailMap.put("contentType", true);
					cmmnMailService.sendMail(request, mailMap);
				}
			}
			return new ResponseEntity<>(returnVO, HttpStatus.CREATED);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveZeissRequest")
	public ResponseEntity<?> saveZeissRequest(HttpServletRequest request, @RequestBody Map args) throws Exception{
	    if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
		  String currentDatetime = args.containsKey("addDate") ? String.valueOf(args.get("addDate")) : "";
		  Map targetMap = args;
		  CpsStartInfoVO cpsStartInfoVO = modelMapper.map(targetMap, CpsStartInfoVO.class);
		  cpsStartInfoVO.setAddDtm(currentDatetime);
		  CpsStartInfoVO returnVO = customsManagementService.saveRequest(cpsStartInfoVO, request);
		  return new ResponseEntity<>(returnVO, HttpStatus.CREATED);
		}catch(Exception e){
		  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/modifyZeissRequest")
	public ResponseEntity<?> modifyZeissRequest(HttpServletRequest request, @RequestBody Map args) throws Exception{
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			BigDecimal startKey 		= NumberUtils.createBigDecimal(String.valueOf(args.get("startKey")));
			String startNum 			= String.valueOf(args.get("startNum"));
			String startPoNo 			= String.valueOf(args.get("startPoNo"));
			String startReferenceNo1 	= String.valueOf(args.get("startReferenceNo1"));
			String startReferenceNo2 	= String.valueOf(args.get("startReferenceNo2"));
			String startNote 			= String.valueOf(args.get("startNote"));
			String startIssueContent 	= String.valueOf(args.get("startIssueContent"));
			String startCompensationYn 	= args.containsKey("startCompensationYn") ? String.valueOf(args.get("startCompensationYn")) : "";
			String startLocation 		= args.containsKey("startLocation") ? String.valueOf(args.get("startLocation")) : "";
			String currentDatetime 		= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			String isMailYn 			= CmmnUtils.isContainsMapValue(args, "_isMailYn") ? String.valueOf(args.get("_isMailYn")) : "N";
			String addDate 				= args.containsKey("addDate") ? String.valueOf(args.get("addDate")) : "";

			List<CpsStartInfoVO> voList;
			Map map = new HashMap();
			map.put("startKey", startKey);
			voList = customsManagementService.selectRequestList(map);

			CpsStartInfoVO CpsStartVO = voList.get(0);

			CpsStartVO.setStartNum(startNum);
			CpsStartVO.setStartPoNo(startPoNo);
			CpsStartVO.setStartReferenceNo1(startReferenceNo1);
			CpsStartVO.setStartReferenceNo2(startReferenceNo2);
			CpsStartVO.setStartNote(startNote);
			CpsStartVO.setStartIssueContent(startIssueContent);
			CpsStartVO.setStartCompensationYn(startCompensationYn);
			CpsStartVO.setStartLocation(startLocation);
			CpsStartVO.setAddDtm(addDate);
			CpsStartVO.setEditUserId(String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID)));
			CpsStartVO.setEditUserNm(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
			CpsStartVO.setEditDtm(currentDatetime);

			CpsStartInfoVO returnVO = customsManagementService.saveRequest(CpsStartVO, request);

			if(isMailYn.equals("Y")){
				Map map1 = new HashMap();
				map1.put("userId", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID)));
				List<Map> mailingKeyList = customsManagementService.selectMailingList(map1);
				List<Object> mailAddr = new ArrayList<>();
				if(mailingKeyList.size() > 0){
					for(Map m : mailingKeyList){
						mailAddr.add(String.valueOf(m.get("teamMail"))); // 할당 팀 메일
					}
					List mailSetList = new ArrayList(new HashSet(mailAddr));
					Map mailMap = new HashMap();
					mailMap.put("senderEmail", String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_MAIL))); // 발신자이메일
					mailMap.put("senderName", String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME))); // 발신자명
					mailMap.put("toAddr", mailSetList);
					mailMap.put("subject", "[세인관세법인(CPS-W)] 수입 의뢰 알림(B/L: " + returnVO.getStartNum() + ")");
					mailMap.put("contents", "<html>" +
					  "<table width='100%' cellpadding='5' cellspacing='0' border='1' style='border-collapse:collapse; border:1px black solid;'><tr><td width='30%' style='border:1px black solid;'><b>의뢰회사(사업자번호)</b></td><td width='70%' style='border:1px black solid;'>" + returnVO.getStartTaxpayerTradeName() + " (" + returnVO.getStartTaxpayerNum() + ")" + "</td></tr>" +
					  "<tr><td width='30%' style='border:1px black solid;'><b>B/L</b></td><td width='70%' style='border:1px black solid;'>" + returnVO.getStartNum() + "</td></tr>" +
					  "<tr><td width='30%' style='border:1px black solid;'><b>의뢰자</b></td><td width='70%' style='border:1px black solid;'>" + String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME)) + "</td></tr>" +
					  "<tr><td width='30%' style='border:1px black solid;'><b>의뢰내용</b></td><td width='70%' style='border:1px black solid;'>" + returnVO.getStartIssueContent() + "</td></tr></table>" +
					  "</html>"
					);
					mailMap.put("contentType", true);
					cmmnMailService.sendMail(request, mailMap);
				}
			}
			return new ResponseEntity<>(returnVO, HttpStatus.CREATED);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/deleteRequest")
	public ResponseEntity<?> deleteRequest(HttpServletRequest request, @RequestBody Map args) throws Exception{
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String result 			= "";
			BigDecimal startKey 	= NumberUtils.createBigDecimal(String.valueOf(args.get("startKey")));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

			List<CpsStartInfoVO> voList;
			Map map = new HashMap();
			map.put("startKey", startKey);
			voList = customsManagementService.selectRequestList(map);

			CpsStartInfoVO CpsStartVO = voList.get(0);

			CpsStartVO.setUseYn("N");
			CpsStartVO.setEditUserId(String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID)));
			CpsStartVO.setEditUserNm(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
			CpsStartVO.setEditDtm(currentDatetime);

			CpsStartInfoVO returnVO = customsManagementService.saveRequest(CpsStartVO, request);
			return new ResponseEntity<>(returnVO, HttpStatus.CREATED);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImportResultCountRecordsExceptSingoAndCs")
	public ResponseEntity<?> selectImportResultCountRecordsExceptSingoAndCs(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> result = customsManagementService.selectImportResultCountRecordsExceptSingoAndCs(args);
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImportResultSuip")
	public ResponseEntity<?> selectImportResultSuip(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> result = customsManagementService.selectImportResultSuip(args);
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImportResultNapse")
	public ResponseEntity<?> selectImportResultNapse(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
		  List<Map> result = customsManagementService.selectImportResultNapse(args);
		  	return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImportResultGammyun")
	public ResponseEntity<?> selectImportResultGammyun(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> result = customsManagementService.selectImportResultGammyun(args);
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}


	@RequestMapping(value = "/selectExportResultCountRecordsExceptSingo")
	public ResponseEntity<?> selectExportResultCountRecordsExceptSingo(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> result = customsManagementService.selectExportResultCountRecordsExceptSingo(args);
			return new ResponseEntity<>(new PageImpl<>(result), HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectExportResultSuchul")
	public ResponseEntity<?> selectExportResultSuchul(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> result = customsManagementService.selectExportResultSuchul(args);
			return new ResponseEntity<>(new PageImpl<>(result), HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImportDeliveryRequestList")
	public ResponseEntity<?> selectImportDeliveryRequestList(HttpServletRequest request, @RequestBody Map args) throws Exception{
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			checkPagingParamsForMapper(args);
			PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));

			List<DeliveryRequestVO> list = customsManagementService.selectImportDeliveryRequestList(args);
			List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
			return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/updateImportDeliveryRequest")
	public ResponseEntity<?> updateImportDeliveryRequest(HttpServletRequest request, @RequestBody Map args) throws Exception{
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			BigDecimal deliveryRequestKey 	= NumberUtils.createBigDecimal(String.valueOf(args.get("deliveryRequestKey")));
			String deliveryStatus 			= args.containsKey("deliveryStatus") ? String.valueOf(args.get("deliveryStatus")) : "";
			BigDecimal deliveryCoKey 		= args.containsKey("deliveryCoKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("deliveryCoKey"))) : null;
			String deliveryCoName 			= args.containsKey("deliveryCoName") ? String.valueOf(args.get("deliveryCoName")) : "";
			String deliveryCoPhone 			= args.containsKey("deliveryCoPhone") ? String.valueOf(args.get("deliveryCoPhone")) : "";
			String deliveryCoEmail 			= args.containsKey("deliveryCoEmail") ? String.valueOf(args.get("deliveryCoEmail")) : "";
			String damage 					= args.containsKey("damage") ? String.valueOf(args.get("damage")) : "";
			String damageDetail 			= args.containsKey("damageDetail") ? String.valueOf(args.get("damageDetail")) : "";
			String requestInvisibleNote 	= args.containsKey("requestInvisibleNote") ? String.valueOf(args.get("requestInvisibleNote")) : "";
			String arrivalTime 				= args.containsKey("arrivalTime") ? String.valueOf(args.get("arrivalTime")) : "";
			String deliveryPojangSu 		= args.containsKey("deliveryPojangSu") ? String.valueOf(args.get("deliveryPojangSu")) : "";
			String deliveryPojangDanwi 		= args.containsKey("deliveryPojangDanwi") ? String.valueOf(args.get("deliveryPojangDanwi")) : "";
			String deliveryJung 			= args.containsKey("deliveryJung") ? String.valueOf(args.get("deliveryJung")) : "";
			String deliveryJungDanwi 		= args.containsKey("deliveryJungDanwi") ? String.valueOf(args.get("deliveryJungDanwi")) : "";
			String suirDate 				= args.containsKey("suirDate") ? String.valueOf(args.get("suirDate")) : "";
			String currentDatetime 			= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

			List<DeliveryRequestVO> voList;
			Map map = new HashMap();
			map.put("deliveryRequestKey", deliveryRequestKey);
			voList = customsManagementService.selectImportDeliveryRequestList(map);

			DeliveryRequestVO DeliveryRequestVO = voList.get(0);
			System.out.println(DeliveryRequestVO.getDeliveryRequestKey());
			if(deliveryCoEmail.equals("")){
				if (!requestInvisibleNote.equals("")){
					DeliveryRequestVO.setRequestInvisibleNote(requestInvisibleNote);
				}else{
					DeliveryRequestVO.setDamage(damage);
					DeliveryRequestVO.setDamageDetail(damageDetail);
				}
			}else{
				DeliveryRequestVO.setAllocateRequestDate(currentDatetime);
				DeliveryRequestVO.setDeliveryStatus(deliveryStatus);
				DeliveryRequestVO.setDeliveryCoKey(deliveryCoKey);
				DeliveryRequestVO.setDeliveryCoName(deliveryCoName);
				DeliveryRequestVO.setDeliveryCoPhone(deliveryCoPhone);
				DeliveryRequestVO.setArrivalTime(arrivalTime);
			}
			DeliveryRequestVO.setEditUserId(String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID)));
			DeliveryRequestVO.setEditUserNm(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
			DeliveryRequestVO.setEditDtm(currentDatetime);
			System.out.println("aaaaaaa");
			DeliveryRequestVO returnVO = customsManagementService.saveImportDeliveryRequest(DeliveryRequestVO, request);
			System.out.println("bbbbbbb");
			if(deliveryStatus.equals("30")){
				Map map1 = new HashMap();
				map1.put("toAddr", deliveryCoEmail);
				map1.put("subject", "[세인관세법인] 배차요청 알림 (B/L: " + DeliveryRequestVO.getHblNo() + ")");
				map1.put("contents", "<html>" +
				  "<table width='100%' cellpadding='5' cellspacing='0' border='1' style='border-collapse:collapse; border:1px black solid;'><tr><td width='30%' style='border:1px black solid;'><b>수입자(사업자번호)</b></td><td width='70%' style='border:1px black solid;'>" + DeliveryRequestVO.getCustomerName() + " (" + DeliveryRequestVO.getCustomerTaxNum() + ")" + "</td></tr>" +
				  "<tr><td width='30%' style='border:1px black solid;'><b>BL/신고번호</b></td><td width='70%' style='border:1px black solid;'>" + DeliveryRequestVO.getHblNo() + " / " + DeliveryRequestVO.getSingoNo() + "</td></tr>" +
				  "<tr><td width='30%' style='border:1px black solid;'><b>수입수리일</b></td><td width='70%' style='border:1px black solid;'>" + suirDate + "</td></tr>" +
				  "<tr><td width='30%' style='border:1px black solid;'><b>포장수량</b></td><td width='70%' style='border:1px black solid;'>" + deliveryPojangSu + " / "+deliveryPojangDanwi+"</td></tr>" +
				  "<tr><td width='30%' style='border:1px black solid;'><b>중량</b></td><td width='70%' style='border:1px black solid;'>" + deliveryJung + " / "+deliveryJungDanwi+"</td></tr>" +
				  "<tr><td width='30%' style='border:1px black solid;'><b>착지명</b></td><td width='70%' style='border:1px black solid;'>" + DeliveryRequestVO.getDeliveryCarryingInName() + "</td></tr>" +
				  "<tr><td width='30%' style='border:1px black solid;'><b>착지담당자/연락처</b></td><td width='70%' style='border:1px black solid;'>" + DeliveryRequestVO.getDeliveryCarryingInMan() + " (" + CmmnUtils.snvl(DeliveryRequestVO.getDeliveryCarryingInMobile(), "") + ")" + "</td></tr>" +
				  "<tr><td width='30%' style='border:1px black solid;'><b>착지주소</b></td><td width='70%' style='border:1px black solid;'>" + DeliveryRequestVO.getDeliveryCarryingInAddr() + "</td></tr>" +
				  "<tr><td width='30%' style='border:1px black solid;'><b>의뢰자</b></td><td width='70%' style='border:1px black solid;'>" + DeliveryRequestVO.getRequestMan() + "</td></tr>" +
				  "<tr><td width='30%' style='border:1px black solid;'><b>의뢰내용</b></td><td width='70%' style='border:1px black solid;'>" + CmmnUtils.snvl(DeliveryRequestVO.getRequestNote(), "") + "</td></tr></table>" +
				  "</html>"
				);
				map1.put("contentType", true);
				map1.put("senderEmail", "cps_seintnl@esein.co.kr");
				map1.put("senderName", "세인TNL");
				System.out.println("cccccccc");
				cmmnMailService.sendMail(request, map1);
			}

			return new ResponseEntity<>(returnVO, HttpStatus.CREATED);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/updateImportDeliveryRequest1")
	public ResponseEntity<?> updateImportDeliveryRequest1(HttpServletRequest request, @RequestBody Map args) throws Exception{
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			BigDecimal deliveryRequestKey 	= NumberUtils.createBigDecimal(String.valueOf(args.get("deliveryRequestKey")));
			String deliveryStatus 			= args.containsKey("deliveryStatus") ? String.valueOf(args.get("deliveryStatus")) : "";
			BigDecimal deliveryCarKey 		= args.containsKey("deliveryCarKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("deliveryCarKey"))) : null;
			String deliveryCarName 			= args.containsKey("deliveryCarName") ? String.valueOf(args.get("deliveryCarName")) : "";
			String deliveryCarPhone 		= args.containsKey("deliveryCarPhone") ? String.valueOf(args.get("deliveryCarPhone")) : "";
			String deliveryCarNum 			= args.containsKey("deliveryCarNum") ? String.valueOf(args.get("deliveryCarNum")) : "";
			String deliveryStartDate 		= args.containsKey("deliveryStartDate") ? String.valueOf(args.get("deliveryStartDate")) : "";
			String arrivalTime 				= args.containsKey("arrivalTime") ? String.valueOf(args.get("arrivalTime")) : "";
			String isMailYn 				= args.containsKey("_isMailYn") ? String.valueOf(args.get("_isMailYn")) : "N";
			String singoNo 					= args.containsKey("singoNo") ? String.valueOf(args.get("singoNo")) : "";
			String hblNo 					= args.containsKey("hblNo") ? String.valueOf(args.get("hblNo")) : "";
			String toAddr 					= args.containsKey("toAddr") ? String.valueOf(args.get("toAddr")) : "";
			String deliveryCarryingInName 	= args.containsKey("deliveryCarryingInName") ? String.valueOf(args.get("deliveryCarryingInName")) : "";
			String deliveryCarryingInMan 	= args.containsKey("deliveryCarryingInMan") ? String.valueOf(args.get("deliveryCarryingInMan")) : "";
			String deliveryCarryingInMobile = args.containsKey("deliveryCarryingInMobile") ? String.valueOf(args.get("deliveryCarryingInMobile")) : "";
			String deliveryCarryingInAddr 	= args.containsKey("deliveryCarryingInAddr") ? String.valueOf(args.get("deliveryCarryingInAddr")) : "";
			String currentDatetime 			= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

			List<DeliveryRequestVO> voList;
			Map map = new HashMap();
			map.put("deliveryRequestKey", deliveryRequestKey);
			voList = customsManagementService.selectImportDeliveryRequestList(map);

			DeliveryRequestVO DeliveryRequestVO = voList.get(0);

			DeliveryRequestVO.setDeliveryStatus(deliveryStatus);
			DeliveryRequestVO.setDeliveryCarKey(deliveryCarKey);
			DeliveryRequestVO.setDeliveryCarName(deliveryCarName);
			DeliveryRequestVO.setDeliveryCarPhone(deliveryCarPhone);
			DeliveryRequestVO.setDeliveryCarNum(deliveryCarNum);
			DeliveryRequestVO.setDeliveryStartDate(deliveryStartDate);
			DeliveryRequestVO.setArrivalTime(arrivalTime);
			DeliveryRequestVO.setEditUserId(String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID)));
			DeliveryRequestVO.setEditUserNm(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
			DeliveryRequestVO.setEditDtm(currentDatetime);

			DeliveryRequestVO returnVO = customsManagementService.saveImportDeliveryRequest(DeliveryRequestVO, request);

			if(isMailYn.equals("Y")){
				Map mailMap = new HashMap();
				mailMap.put("senderEmail", String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_MAIL))); // 발신자이메일
				mailMap.put("senderName", String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME))); // 발신자명
				mailMap.put("toAddr", toAddr);
				mailMap.put("subject", "[배차완료] 비엘번호 : " + hblNo + " 수입신고번호 : " + singoNo);
				mailMap.put("contents", "<html>" +
  				  "[배차완료]<br>" +
				  "<table width='100%' cellpadding='5' cellspacing='0' border='1' style='border-collapse:collapse; border:1px black solid;'><tr><td width='30%' style='border:1px black solid;'>비엘번호 </td><td width='70%' style='border:1px black solid;'>" + hblNo + "</td></tr>" +
				  "<tr><td width='30%' style='border:1px black solid;'>수입신고번호</td><td width='70%' style='border:1px black solid;'>" + singoNo + "</td></tr>" +
				  "<tr><td width='30%' style='border:1px black solid;'>차량정보</td><td width='70%' style='border:1px black solid;'>" + deliveryCarName + " ("+ deliveryCarPhone +") - "+ deliveryCarNum +"</td></tr>" +
				  "<tr><td width='30%' style='border:1px black solid;'>착지</td><td width='70%' style='border:1px black solid;'>" + deliveryCarryingInAddr + " / "+ deliveryCarryingInMan + " / "+ deliveryCarryingInMobile +"</td></tr>" +
				  "<tr><td width='30%' style='border:1px black solid;'>배송시작일 </td><td width='70%' style='border:1px black solid;'>" + currentDatetime +"</td></tr>" +
				  "<tr><td width='30%' style='border:1px black solid;'>도착예정시간</td><td width='70%' style='border:1px black solid;'>" + arrivalTime + "</td></tr></table>" +
				  "</html>"
				);
				mailMap.put("contentType", true);
				cmmnMailService.sendMail(request, mailMap);
			}

			return new ResponseEntity<>(returnVO, HttpStatus.CREATED);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/updateImportDeliveryRequestList")
	public ResponseEntity<?> updateImportDeliveryRequestList(HttpServletRequest request, @RequestBody Map args) throws Exception{
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			BigDecimal deliveryRequestKey 		= NumberUtils.createBigDecimal(String.valueOf(args.get("deliveryRequestKey")));
			String useYn 						= args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "Y";
			String deliveryStatus 				= args.containsKey("deliveryStatus") ? String.valueOf(args.get("deliveryStatus")) : "0";
			BigDecimal deliveryCarryingInKey 	= args.containsKey("deliveryCarryingInKey") ?  NumberUtils.createBigDecimal(String.valueOf(args.get("deliveryCarryingInKey"))) : null;
			String deliveryCarryingInName 		= args.containsKey("deliveryCarryingInName") ? String.valueOf(args.get("deliveryCarryingInName")) : "";
			String deliveryCarryingInTaxNum 	= args.containsKey("deliveryCarryingInTaxNum") ? String.valueOf(args.get("deliveryCarryingInTaxNum")) : "";
			String deliveryCarryingInPhone 		= args.containsKey("deliveryCarryingInPhone") ? String.valueOf(args.get("deliveryCarryingInPhone")) : "";
			String deliveryCarryingInFax 		= args.containsKey("deliveryCarryingInFax") ? String.valueOf(args.get("deliveryCarryingInFax")) : "";
			String deliveryCarryingInMan 		= args.containsKey("deliveryCarryingInMan") ? String.valueOf(args.get("deliveryCarryingInMan")) : "";
			String deliveryCarryingInMobile 	= args.containsKey("deliveryCarryingInMobile") ? String.valueOf(args.get("deliveryCarryingInMobile")) : "";
			String deliveryCarryingInEmail 		= args.containsKey("deliveryCarryingInEmail") ? String.valueOf(args.get("deliveryCarryingInEmail")) : "";
			String deliveryCarryingInAddr 		= args.containsKey("deliveryCarryingInAddr") ? String.valueOf(args.get("deliveryCarryingInAddr")) : "";
			String deliveryCarryingChange 		= args.containsKey("deliveryCarryingChange") ? String.valueOf(args.get("deliveryCarryingChange")) : "";
			BigDecimal deliveryCoKey 			= args.containsKey("deliveryCoKey") ?  NumberUtils.createBigDecimal(String.valueOf(args.get("deliveryCoKey"))) : null;
			String deliveryCoName 				= args.containsKey("deliveryCoName") ? String.valueOf(args.get("deliveryCoName")) : "";
			String deliveryCoPhone 				= args.containsKey("deliveryCoPhone") ? String.valueOf(args.get("deliveryCoPhone")) : "";
			String cargoSize 					= args.containsKey("cargoSize") ? String.valueOf(args.get("cargoSize")) : "";
			BigDecimal deliveryPojangSu 		= args.containsKey("deliveryPojangSu") ? NumberUtils.createBigDecimal(String.valueOf(args.get("deliveryPojangSu"))) : null;
			String deliveryPojangDanwi 			= args.containsKey("deliveryPojangDanwi") ? String.valueOf(args.get("deliveryPojangDanwi")) : "";
			BigDecimal deliveryJung 			= args.containsKey("deliveryJung") ? NumberUtils.createBigDecimal(String.valueOf(args.get("deliveryJung"))) : null;
			String deliveryJungDanwi 			= args.containsKey("deliveryJungDanwi") ? String.valueOf(args.get("deliveryJungDanwi")) : "";
			String banipPlace 					= args.containsKey("banipPlace") ? String.valueOf(args.get("banipPlace")) : "";
			String requestCoName 				= args.containsKey("requestCoName") ? String.valueOf(args.get("requestCoName")) : "";
			String requestMan 					= args.containsKey("requestMan") ? String.valueOf(args.get("requestMan")) : "";
			String requestPhone 				= args.containsKey("requestPhone") ? String.valueOf(args.get("requestPhone")) : "";
			String requestNote 					= args.containsKey("requestNote") ? String.valueOf(args.get("requestNote")) : "";
			String requestInvisibleNote 		= args.containsKey("requestInvisibleNote") ? String.valueOf(args.get("requestInvisibleNote")) : "";
			String assignMan 					= args.containsKey("assignMan") ? String.valueOf(args.get("assignMan")) : "";
			String assignPhone 					= args.containsKey("assignPhone") ? String.valueOf(args.get("assignPhone")) : "";
			String requestChange 				= args.containsKey("requestChange") ? String.valueOf(args.get("requestChange")) : "";
			BigDecimal deliveryCarKey 			= args.containsKey("deliveryCarKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("deliveryCarKey"))) : null;
			String deliveryCarName 				= args.containsKey("deliveryCarName") ? String.valueOf(args.get("deliveryCarName")) : "";
			String deliveryCarPhone 			= args.containsKey("deliveryCarPhone") ? String.valueOf(args.get("deliveryCarPhone")) : "";
			String deliveryCarNum 				= args.containsKey("deliveryCarNum") ? String.valueOf(args.get("deliveryCarNum")) : "";
			String arrivalTime 					= args.containsKey("arrivalTime") ? String.valueOf(args.get("arrivalTime")) : "";
			String landingArea 					= args.containsKey("landingArea") ? String.valueOf(args.get("landingArea")) : "";
			String isMailYn 					= args.containsKey("_isMailYn") ? String.valueOf(args.get("_isMailYn")) : "N";
			String singoNo 						= args.containsKey("singoNo") ? String.valueOf(args.get("singoNo")) : "";
			String hblNo 						= args.containsKey("hblNo") ? String.valueOf(args.get("hblNo")) : "";
			String toAddr 						= args.containsKey("toAddr") ? String.valueOf(args.get("toAddr")) : "";
			String deliveryStartDate 			= args.containsKey("deliveryStartDate") ? String.valueOf(args.get("deliveryStartDate")) : "";
			String currentDatetime 				= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");


			List<DeliveryRequestVO> voList;
			Map map = new HashMap();
			map.put("deliveryRequestKey", deliveryRequestKey);
			voList = customsManagementService.selectImportDeliveryRequestList(map);
			DeliveryRequestVO DeliveryRequestVO = voList.get(0);

			if(useYn.equals("N")){
				DeliveryRequestVO.setUseYn("N");
			}

			if(deliveryStatus.equals("20")){
				DeliveryRequestVO.setDeliveryStatus("20");
				DeliveryRequestVO.setDeliveryCoName("");
				DeliveryRequestVO.setDeliveryCoPhone("");
			}

			if(deliveryStatus.equals("30")){
				DeliveryRequestVO.setDeliveryStatus("30");
				DeliveryRequestVO.setDeliveryCarKey(null);
				DeliveryRequestVO.setDeliveryCarName("");
				DeliveryRequestVO.setDeliveryCarPhone("");
				DeliveryRequestVO.setDeliveryCarNum("");
			}

			if(deliveryStatus.equals("40")){
				DeliveryRequestVO.setDeliveryStatus("40");
				DeliveryRequestVO.setDeliveryCarKey(deliveryCarKey);
				DeliveryRequestVO.setDeliveryCarName(deliveryCarName);
				DeliveryRequestVO.setDeliveryCarPhone(deliveryCarPhone);
				DeliveryRequestVO.setDeliveryCarNum(deliveryCarNum);
				DeliveryRequestVO.setArrivalTime(arrivalTime);
			}

			if(deliveryStatus.equals("50")){
				DeliveryRequestVO.setDeliveryStatus("50");
				DeliveryRequestVO.setDeliveryStartDate(currentDatetime);
			}

			if(deliveryStatus.equals("60")){
				DeliveryRequestVO.setDeliveryStatus("60");
				DeliveryRequestVO.setDeliveryEndDate(currentDatetime);
			}

			if(deliveryCarryingChange.equals("Change")){
				DeliveryRequestVO.setDeliveryCarryingInKey(deliveryCarryingInKey);
				DeliveryRequestVO.setDeliveryCarryingInName(deliveryCarryingInName);
				DeliveryRequestVO.setDeliveryCarryingInTaxNum(deliveryCarryingInTaxNum);
				DeliveryRequestVO.setDeliveryCarryingInPhone(deliveryCarryingInPhone);
				DeliveryRequestVO.setDeliveryCarryingInFax(deliveryCarryingInFax);
				DeliveryRequestVO.setDeliveryCarryingInMan(deliveryCarryingInMan);
				DeliveryRequestVO.setDeliveryCarryingInMobile(deliveryCarryingInMobile);
				DeliveryRequestVO.setDeliveryCarryingInEmail(deliveryCarryingInEmail);
				DeliveryRequestVO.setDeliveryCarryingInAddr(deliveryCarryingInAddr);
			}

			if(requestChange.equals("Change")){
				DeliveryRequestVO.setDeliveryCoKey(deliveryCoKey);
				DeliveryRequestVO.setDeliveryCoName(deliveryCoName);
				DeliveryRequestVO.setDeliveryCoPhone(deliveryCoPhone);
				DeliveryRequestVO.setCargoSize(cargoSize);
				DeliveryRequestVO.setDeliveryPojangSu(deliveryPojangSu);
				DeliveryRequestVO.setDeliveryPojangDanwi(deliveryPojangDanwi);
				DeliveryRequestVO.setDeliveryJung(deliveryJung);
				DeliveryRequestVO.setDeliveryJungDanwi(deliveryJungDanwi);
				DeliveryRequestVO.setBanipPlace(banipPlace);
				DeliveryRequestVO.setRequestCoName(requestCoName);
				DeliveryRequestVO.setRequestMan(requestMan);
				DeliveryRequestVO.setRequestPhone(requestPhone);
				DeliveryRequestVO.setRequestNote(requestNote);
				DeliveryRequestVO.setRequestInvisibleNote(requestInvisibleNote);
				DeliveryRequestVO.setAssignMan(assignMan);
				DeliveryRequestVO.setAssignPhone(assignPhone);
				DeliveryRequestVO.setLandingArea(landingArea);
			}
			DeliveryRequestVO.setEditUserId(String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID)));
			DeliveryRequestVO.setEditUserNm(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
			DeliveryRequestVO.setEditDtm(currentDatetime);
			if(isMailYn.equals("Y")){
				Map mailMap = new HashMap();
				mailMap.put("senderEmail", String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_MAIL))); // 발신자이메일
				mailMap.put("senderName", String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME))); // 발신자명
				mailMap.put("toAddr", toAddr);
				mailMap.put("subject", "[배차완료] 비엘번호 : " + hblNo + " 수입신고번호 : " + singoNo);
				mailMap.put("contents", "<html>" +
				  "[배차완료]<br>" +
				  "<table width='100%' cellpadding='5' cellspacing='0' border='1' style='border-collapse:collapse; border:1px black solid;'><tr><td width='30%' style='border:1px black solid;'>비엘번호</td><td width='70%' style='border:1px black solid;'>" + hblNo + "</td></tr>" +
				  "<tr><td width='30%' style='border:1px black solid;'>수입신고번호</td><td width='70%' style='border:1px black solid;'>" + singoNo + "</td></tr>" +
				  "<tr><td width='30%' style='border:1px black solid;'>차량정보</td><td width='70%' style='border:1px black solid;'>" + deliveryCarName + " ("+ deliveryCarPhone +") - "+ deliveryCarNum +"</td></tr>" +
				  "<tr><td width='30%' style='border:1px black solid;'>착지</td><td width='70%' style='border:1px black solid;'>" + deliveryCarryingInAddr + " / "+ deliveryCarryingInMan + " / "+ deliveryCarryingInMobile +"</td></tr>" +
				  "<tr><td width='30%' style='border:1px black solid;'>배송시작일 </td><td width='70%' style='border:1px black solid;'>" + currentDatetime +"</td></tr>" +
				  "<tr><td width='30%' style='border:1px black solid;'>도착예정시간 </td><td width='70%' style='border:1px black solid;'>" + arrivalTime + "</td></tr></table>" +
				  "</html>"
				);
				mailMap.put("contentType", true);
				cmmnMailService.sendMail(request, mailMap);
			}else if(isMailYn.equals("X")){
				Map mailMap = new HashMap();
				mailMap.put("senderEmail", String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_MAIL))); // 발신자이메일
				mailMap.put("senderName", String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME))); // 발신자명
				mailMap.put("toAddr", toAddr);
				mailMap.put("subject", "[배송완료] 비엘번호 : " + hblNo + " 수입신고번호 : " + singoNo);
				mailMap.put("contents", "<html>" +
				  "[배송완료]<br>" +
				  "<table width='100%' cellpadding='5' cellspacing='0' border='1' style='border-collapse:collapse; border:1px black solid;'><tr><td width='30%' style='border:1px black solid;'>비엘번호</td><td width='70%' style='border:1px black solid;'>" + hblNo + "</td></tr>" +
				  "<tr><td width='30%' style='border:1px black solid;'>수입신고번호</td><td width='70%' style='border:1px black solid;'>" + singoNo + "</td></tr>" +
				  "<tr><td width='30%' style='border:1px black solid;'>차량정보</td><td width='70%' style='border:1px black solid;'>" + deliveryCarName + " ("+ deliveryCarPhone +") - "+ deliveryCarNum +"</td></tr>" +
				  "<tr><td width='30%' style='border:1px black solid;'>착지</td><td width='70%' style='border:1px black solid;'>" + deliveryCarryingInAddr + " / "+ deliveryCarryingInMan + " / "+ deliveryCarryingInMobile +"</td></tr>" +
				  "<tr><td width='30%' style='border:1px black solid;'>배송시작일</td><td width='70%' style='border:1px black solid;'>" + deliveryStartDate +"</td></tr>" +
				  "<tr><td width='30%' style='border:1px black solid;'>배송완료처리일시</td><td width='70%' style='border:1px black solid;'>" + currentDatetime + "</td></tr></table>" +
				  "</html>"
				);
				mailMap.put("contentType", true);
				cmmnMailService.sendMail(request, mailMap);
			}else if(isMailYn.equals("M")){
				Map mailMap = new HashMap();
				mailMap.put("senderEmail", String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_MAIL))); // 발신자이메일
				mailMap.put("senderName", String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME))); // 발신자명
				mailMap.put("toAddr", toAddr);
				mailMap.put("subject", "[배송중] 비엘번호 : " + hblNo + " 수입신고번호 : " + singoNo);
				mailMap.put("contents", "<html>" +
				  "[배송중]<br>" +
				  "<table width='100%' cellpadding='5' cellspacing='0' border='1' style='border-collapse:collapse; border:1px black solid;'><tr><td width='30%' style='border:1px black solid;'>비엘번호</td><td width='70%' style='border:1px black solid;'>" + hblNo + "</td></tr>" +
				  "<tr><td width='30%' style='border:1px black solid;'>수입신고번호</td><td width='70%' style='border:1px black solid;'>" + singoNo + "</td></tr>" +
				  "<tr><td width='30%' style='border:1px black solid;'>차량정보 </td><td width='70%' style='border:1px black solid;'>" + deliveryCarName + " ("+ deliveryCarPhone +") - "+ deliveryCarNum +"</td></tr>" +
				  "<tr><td width='30%' style='border:1px black solid;'>포장수량</td><td width='70%' style='border:1px black solid;'>" + deliveryPojangSu + " - "+ deliveryPojangDanwi +"</td></tr>" +
				  "<tr><td width='30%' style='border:1px black solid;'>중량</td><td width='70%' style='border:1px black solid;'>" + deliveryJung + " - "+ deliveryJungDanwi +"</td></tr>" +
				  "<tr><td width='30%' style='border:1px black solid;'>배송시작일</td><td width='70%' style='border:1px black solid;'>" + currentDatetime +"</td></tr>" +
				  "<tr><td width='30%' style='border:1px black solid;'>도착예정시간 </td><td width='70%' style='border:1px black solid;'>" + arrivalTime + "</td></tr></table>" +
				  "</html>"
				);
				mailMap.put("contentType", true);
				cmmnMailService.sendMail(request, mailMap);
			}else if(isMailYn.equals("B")){
				Map mailMap = new HashMap();
				mailMap.put("senderEmail", String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_MAIL))); // 발신자이메일
				mailMap.put("senderName", String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME))); // 발신자명
				mailMap.put("toAddr", toAddr);
				mailMap.put("subject", "[배차완료 취소] 비엘번호 : " + hblNo + " 수입신고번호 : " + singoNo);
				mailMap.put("contents", "<html>" +
				  "[배차완료 취소]<br>" +
				  "<table width='100%' cellpadding='5' cellspacing='0' border='1' style='border-collapse:collapse; border:1px black solid;'><tr><td width='30%' style='border:1px black solid;'>비엘번호</td><td width='70%' style='border:1px black solid;'>" + hblNo + "</td></tr>" +
				  "<tr><td width='30%' style='border:1px black solid;'>수입신고번호</td><td width='70%' style='border:1px black solid;'>" + singoNo + "</td></tr></table>" +
				  "</html>"
				);
				mailMap.put("contentType", true);
				cmmnMailService.sendMail(request, mailMap);
			}
			DeliveryRequestVO returnVO = customsManagementService.saveImportDeliveryRequest(DeliveryRequestVO, request);
			return new ResponseEntity<>(returnVO, HttpStatus.CREATED);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImportDeliveryRequest")
	public ResponseEntity<?> selectImportDeliveryRequest(HttpServletRequest request, @RequestBody Map args) throws Exception{
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
			List<Map> list = customsManagementService.selectImportDeliveryRequest(args);
			List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
			return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveImportDeliveryRequestList")
	public ResponseEntity<?> saveImportDeliveryRequestList(HttpServletRequest request, @RequestBody Map map) throws Exception{
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

			Map targetMap = map;
			DeliveryRequestVO deliveryRequestVO = modelMapper.map(targetMap, DeliveryRequestVO.class);
			deliveryRequestVO.setAddUserId(userId);
			deliveryRequestVO.setAddUserNm(userNm);
			deliveryRequestVO.setAddDtm(currentDatetime);
			deliveryRequestVO.setEditUserId(userId);
			deliveryRequestVO.setEditUserNm(userNm);
			deliveryRequestVO.setEditDtm(currentDatetime);

			DeliveryRequestVO returnVO = customsManagementService.saveImportDeliveryRequestList(deliveryRequestVO, request);

			if(deliveryRequestVO.getDeliveryStatus().equals("20")){
				Map map1 = new HashMap();
				map1.put("toAddr", "Cpstnl@esein.co.kr");
				map1.put("subject", "[세인관세법인] 운송의뢰 알림 (B/L: " + deliveryRequestVO.getHblNo() + ")");
				map1.put("contents", "<html>" +
				  "<table width='100%' cellpadding='5' cellspacing='0' border='1' style='border-collapse:collapse; border:1px black solid;'><tr><td width='30%' style='border:1px black solid;'><b>수입자(사업자번호)</b></td><td width='70%' style='border:1px black solid;'>" + deliveryRequestVO.getCustomerName() + " (" + deliveryRequestVO.getCustomerTaxNum() + ")" + "</td></tr>" +
				  "<tr><td width='30%' style='border:1px black solid;'><b>BL/신고번호</b></td><td width='70%' style='border:1px black solid;'>" + deliveryRequestVO.getHblNo() + " / " + deliveryRequestVO.getSingoNo() + "</td></tr>" +
				  "<tr><td width='30%' style='border:1px black solid;'><b>의뢰자</b></td><td width='70%' style='border:1px black solid;'>" + deliveryRequestVO.getRequestMan() + "</td></tr>" +
				  "<tr><td width='30%' style='border:1px black solid;'><b>의뢰내용</b></td><td width='70%' style='border:1px black solid;'>" + CmmnUtils.snvl(deliveryRequestVO.getRequestNote(), "") + "</td></tr></table>" +
				  "</html>"
				);
				map1.put("contentType", true);
				map1.put("senderEmail", "Cpstnl@esein.co.kr");
				map1.put("senderName", "세인TNL");

				cmmnMailService.sendMail(request, map1);
			}

			return new ResponseEntity<>(returnVO, HttpStatus.CREATED);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveAddImportDeliveryRequestList")
	public ResponseEntity<?> saveAddImportDeliveryRequestList(HttpServletRequest request, @RequestBody Map args) throws Exception{
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			BigDecimal deliveryRequestKey 		= NumberUtils.createBigDecimal(String.valueOf(args.get("deliveryRequestKey")));
			BigDecimal deliveryCarryingInKey 	= args.containsKey("deliveryCarryingInKey") ?  NumberUtils.createBigDecimal(String.valueOf(args.get("deliveryCarryingInKey"))) : null;
			String deliveryCarryingInName 		= args.containsKey("deliveryCarryingInName") ? String.valueOf(args.get("deliveryCarryingInName")) : "";
			String deliveryCarryingInTaxNum 	= args.containsKey("deliveryCarryingInTaxNum") ? String.valueOf(args.get("deliveryCarryingInTaxNum")) : "";
			String deliveryCarryingInPhone 		= args.containsKey("deliveryCarryingInPhone") ? String.valueOf(args.get("deliveryCarryingInPhone")) : "";
			String deliveryCarryingInFax 		= args.containsKey("deliveryCarryingInFax") ? String.valueOf(args.get("deliveryCarryingInFax")) : "";
			String deliveryCarryingInMan 		= args.containsKey("deliveryCarryingInMan") ? String.valueOf(args.get("deliveryCarryingInMan")) : "";
			String deliveryCarryingInMobile 	= args.containsKey("deliveryCarryingInMobile") ? String.valueOf(args.get("deliveryCarryingInMobile")) : "";
			String deliveryCarryingInEmail 		= args.containsKey("deliveryCarryingInEmail") ? String.valueOf(args.get("deliveryCarryingInEmail")) : "";
			String deliveryCarryingInAddr 		= args.containsKey("deliveryCarryingInAddr") ? String.valueOf(args.get("deliveryCarryingInAddr")) : "";

			String userId 						= String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String userNm 						= String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime 				= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

			List<DeliveryRequestVO> voList;
			Map map = new HashMap();
			map.put("deliveryRequestKey", deliveryRequestKey);
			voList = customsManagementService.selectImportDeliveryRequestList(map);

			DeliveryRequestVO deliveryRequestVO = voList.get(0);
			Map targetMap = new HashMap();
			targetMap.put("customerKey", deliveryRequestVO.getCustomerKey());
			targetMap.put("customerDB", deliveryRequestVO.getCustomerDb());
			targetMap.put("customerCode", deliveryRequestVO.getCustomerCode());
			targetMap.put("customerName", deliveryRequestVO.getCustomerName());
			targetMap.put("customerTaxNum", deliveryRequestVO.getCustomerTaxNum());
			targetMap.put("mblNo", deliveryRequestVO.getMblNo());
			targetMap.put("hblNo", deliveryRequestVO.getHblNo());
			targetMap.put("cargoNo", deliveryRequestVO.getCargoNo());
			targetMap.put("singoNo", deliveryRequestVO.getSingoNo());
			targetMap.put("singoDate", deliveryRequestVO.getSingoDate());
			targetMap.put("suirDate", deliveryRequestVO.getSuirDate());
			targetMap.put("cargoStatus", deliveryRequestVO.getCargoStatus());
			targetMap.put("pojangSu", deliveryRequestVO.getPojangSu());
			targetMap.put("pojangDanwi", deliveryRequestVO.getPojangDanwi());
			targetMap.put("totalJung", deliveryRequestVO.getTotalJung());
			targetMap.put("jungDanwi", deliveryRequestVO.getJungDanwi());
			targetMap.put("impoSegwan", deliveryRequestVO.getImpoSegwan());
			targetMap.put("impoJangchBuho", deliveryRequestVO.getImpoJangchBuho());
			targetMap.put("impoJangchName", deliveryRequestVO.getImpoJangchName());
			targetMap.put("impoJangchJangso", deliveryRequestVO.getImpoJangchJangso());
			targetMap.put("deliveryStatus", deliveryRequestVO.getDeliveryStatus());
			targetMap.put("impoBanipDate", deliveryRequestVO.getImpoBanipDate());
			targetMap.put("banipPlace", deliveryRequestVO.getBanipPlace());
			targetMap.put("cargoSize", deliveryRequestVO.getCargoSize());
			targetMap.put("deliveryPojangSu", deliveryRequestVO.getDeliveryPojangSu());
			targetMap.put("deliveryPojangDanwi", deliveryRequestVO.getDeliveryPojangDanwi());
			targetMap.put("deliveryJung", deliveryRequestVO.getDeliveryJung());
			targetMap.put("deliveryJungDanwi", deliveryRequestVO.getDeliveryJungDanwi());
			targetMap.put("requestCoName", deliveryRequestVO.getRequestCoName());
			targetMap.put("requestMan", deliveryRequestVO.getRequestMan());
			targetMap.put("requestPhone", deliveryRequestVO.getRequestPhone());
			targetMap.put("requestDate", deliveryRequestVO.getRequestDate());
			targetMap.put("requestNote", deliveryRequestVO.getRequestNote());
			targetMap.put("requestInvisibleNote", deliveryRequestVO.getRequestInvisibleNote());
			targetMap.put("deliveryDate", deliveryRequestVO.getDeliveryDate());
			targetMap.put("assignId", deliveryRequestVO.getAssignId());
			targetMap.put("assignMan", deliveryRequestVO.getAssignMan());
			targetMap.put("assignPhone", deliveryRequestVO.getAssignPhone());
			targetMap.put("allocateRequestDate", deliveryRequestVO.getAllocateRequestDate());
			targetMap.put("deliveryCoKey", deliveryRequestVO.getDeliveryCoKey());
			targetMap.put("deliveryCoName", deliveryRequestVO.getDeliveryCoName());
			targetMap.put("deliveryCoPhone", deliveryRequestVO.getDeliveryCoPhone());
			targetMap.put("deliveryCarryingInKey", deliveryCarryingInKey);
			targetMap.put("deliveryCarryingInName", deliveryCarryingInName);
			targetMap.put("deliveryCarryingInTaxNum", deliveryCarryingInTaxNum);
			targetMap.put("deliveryCarryingInPhone", deliveryCarryingInPhone);
			targetMap.put("deliveryCarryingInEmail", deliveryCarryingInEmail);
			targetMap.put("deliveryCarryingInFax", deliveryCarryingInFax);
			targetMap.put("deliveryCarryingInMan", deliveryCarryingInMan);
			targetMap.put("deliveryCarryingInMobile", deliveryCarryingInMobile);
			targetMap.put("deliveryCarryingInAddr", deliveryCarryingInAddr);
			targetMap.put("allocateDate", deliveryRequestVO.getAllocateDate());
			targetMap.put("deliveryCarKey", deliveryRequestVO.getDeliveryCarKey());
			targetMap.put("deliveryCarName", deliveryRequestVO.getDeliveryCarName());
			targetMap.put("deliveryCarPhone", deliveryRequestVO.getDeliveryCarPhone());
			targetMap.put("deliveryCarNum", deliveryRequestVO.getDeliveryCarNum());
			targetMap.put("deliveryStartDate", deliveryRequestVO.getDeliveryStartDate());
			targetMap.put("deliveryEndDate", deliveryRequestVO.getDeliveryEndDate());
			targetMap.put("damage", deliveryRequestVO.getDamage());
			targetMap.put("damageDetail", deliveryRequestVO.getDamageDetail());
			targetMap.put("useYn", deliveryRequestVO.getUseYn());
			targetMap.put("addUserId", userId);
			targetMap.put("addUserNm", userNm);
			targetMap.put("addDtm", currentDatetime);
			DeliveryRequestVO deliveryRequestNewVO = modelMapper.map(targetMap, DeliveryRequestVO.class);
			DeliveryRequestVO returnVO = customsManagementService.saveImportDeliveryRequestList(deliveryRequestNewVO, request);

			if(deliveryRequestVO.getDeliveryStatus().equals("20")){
				Map map1 = new HashMap();
				map1.put("toAddr", "Cpstnl@esein.co.kr");
				map1.put("subject", "[세인관세법인] 운송의뢰 알림 (B/L: " + deliveryRequestVO.getHblNo() + ")");
				map1.put("contents", "<html>" +
				  "<table width='100%' cellpadding='5' cellspacing='0' border='1' style='border-collapse:collapse; border:1px black solid;'><tr><td width='30%' style='border:1px black solid;'><b>수입자(사업자번호)</b></td><td width='70%' style='border:1px black solid;'>" + deliveryRequestVO.getCustomerName() + " (" + deliveryRequestVO.getCustomerTaxNum() + ")" + "</td></tr>" +
				  "<tr><td width='30%' style='border:1px black solid;'><b>BL/신고번호</b></td><td width='70%' style='border:1px black solid;'>" + deliveryRequestVO.getHblNo() + " / " + deliveryRequestVO.getSingoNo() + "</td></tr>" +
				  "<tr><td width='30%' style='border:1px black solid;'><b>의뢰자</b></td><td width='70%' style='border:1px black solid;'>" + deliveryRequestVO.getRequestMan() + "</td></tr>" +
				  "<tr><td width='30%' style='border:1px black solid;'><b>의뢰내용</b></td><td width='70%' style='border:1px black solid;'>" + CmmnUtils.snvl(deliveryRequestVO.getRequestNote(), "") + "</td></tr></table>" +
				  "</html>"
				);
				map1.put("contentType", true);
				map1.put("senderEmail", "Cpstnl@esein.co.kr");
				map1.put("senderName", "세인TNL");

				cmmnMailService.sendMail(request, map1);
			}

			return new ResponseEntity<>(returnVO, HttpStatus.CREATED);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImportDeliveryCarryingInList")
	public ResponseEntity<?> selectImportDeliveryCarryingInList(HttpServletRequest request, @RequestBody Map args) throws Exception{
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			checkPagingParamsForMapper(args);
			PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
			List<DeliveryCarryingInVO> list = customsManagementService.selectImportDeliveryCarryingInList(args);
			List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
			return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveImportDeliveryCarryingInList")
	public ResponseEntity<?> saveImportDeliveryCarryingInList(HttpServletRequest request, @RequestBody Map map) throws Exception{
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

			Map targetMap = map;
			DeliveryCarryingInVO deliveryCarryingInVO = modelMapper.map(targetMap, DeliveryCarryingInVO.class);
			deliveryCarryingInVO.setAddUserId(userId);
			deliveryCarryingInVO.setAddUserNm(userNm);
			deliveryCarryingInVO.setAddDtm(currentDatetime);
			deliveryCarryingInVO.setEditUserId(userId);
			deliveryCarryingInVO.setEditUserNm(userNm);
			deliveryCarryingInVO.setEditDtm(currentDatetime);

			DeliveryCarryingInVO returnVO = customsManagementService.saveImportDeliveryCarryingInList(deliveryCarryingInVO, request);

			return new ResponseEntity<>(returnVO, HttpStatus.CREATED);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImportDeliveryCarList")
	public ResponseEntity<?> selectImportDeliveryCarList(HttpServletRequest request, @RequestBody Map args) throws Exception{
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<DeliveryCarVO> list = customsManagementService.selectImportDeliveryCarList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.CREATED);
		}catch(Exception e){
			return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveImportDeliveryCarList")
	public ResponseEntity<?> saveImportDeliveryCarList(HttpServletRequest request, @RequestBody Map map) throws Exception{
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

			Map targetMap = map;
			DeliveryCarVO deliveryCarVO = modelMapper.map(targetMap, DeliveryCarVO.class);
			deliveryCarVO.setAddUserId(userId);
			deliveryCarVO.setAddUserNm(userNm);
			deliveryCarVO.setAddDtm(currentDatetime);
			deliveryCarVO.setEditUserId(userId);
			deliveryCarVO.setEditUserNm(userNm);
			deliveryCarVO.setEditDtm(currentDatetime);

			DeliveryCarVO returnVO = customsManagementService.saveImportDeliveryCarList(deliveryCarVO, request);

			return new ResponseEntity<>(returnVO, HttpStatus.CREATED);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImportDeliveryCompleteCostList")
	public ResponseEntity<?> selectImportDeliveryCompleteCostList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			checkPagingParamsForMapper(args);
			List<Map> list = customsManagementService.selectImportDeliveryCompleteCostList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveImportDeliveryCostList")
	public ResponseEntity<?> saveImportDeliveryCostList(HttpServletRequest request, @RequestBody Map map) throws Exception{
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			BigDecimal userKey = NumberUtils.createBigDecimal(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)));
			String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			System.out.println("AAAAAAAAAAAA");
			Map targetMap = map;
			DeliveryCostVO deliveryCostVO = modelMapper.map(targetMap, DeliveryCostVO.class);
			System.out.println("BBBBBBBBBB");
			deliveryCostVO.setAddUserKey(userKey);
			deliveryCostVO.setAddUserId(userId);
			deliveryCostVO.setAddUserNm(userNm);
			deliveryCostVO.setAddDtm(currentDatetime);
			DeliveryCostVO returnVO = customsManagementService.saveImportDeliveryCostList(deliveryCostVO, request);
			System.out.println("CCCCCCCCCC");
			return new ResponseEntity<>(returnVO, HttpStatus.CREATED);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveImportDeliveryCostList1")
	public ResponseEntity<?> saveImportDeliveryCostList1(HttpServletRequest request, @RequestBody Map map) throws Exception{
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			BigDecimal userKey = NumberUtils.createBigDecimal(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)));
			String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			BigDecimal deliveryCostCtQty = map.containsKey("deliveryCostCtQty") ?  NumberUtils.createBigDecimal(String.valueOf(map.get("deliveryCostCtQty"))) : null;
			BigDecimal deliveryCostWeight = map.containsKey("deliveryCostWeight") ?  NumberUtils.createBigDecimal(String.valueOf(map.get("deliveryCostWeight"))) : null;
			BigDecimal deliveryCostShippingCharge = map.containsKey("deliveryCostShippingCharge") ?  NumberUtils.createBigDecimal(String.valueOf(map.get("deliveryCostShippingCharge"))) : null;
			BigDecimal deliveryCostWarehouseChange = map.containsKey("deliveryCostWarehouseChange") ?  NumberUtils.createBigDecimal(String.valueOf(map.get("deliveryCostWarehouseChange"))) : null;
//			BigDecimal deliveryCostInsuranceCharge = map.containsKey("deliveryCostInsuranceCharge") ?  NumberUtils.createBigDecimal(String.valueOf(map.get("deliveryCostInsuranceCharge"))) : null;
//			BigDecimal deliveryCostPayforCharge = map.containsKey("deliveryCostPayforCharge") ?  NumberUtils.createBigDecimal(String.valueOf(map.get("deliveryCostPayforCharge"))) : null;
//			BigDecimal deliveryCostConfirmCharge = map.containsKey("deliveryCostConfirmCharge") ?  NumberUtils.createBigDecimal(String.valueOf(map.get("deliveryCostConfirmCharge"))) : null;
//			BigDecimal deliveryCostConfirmUserKey = map.containsKey("deliveryCostConfirmUserKey") ?  NumberUtils.createBigDecimal(String.valueOf(map.get("deliveryCostConfirmUserKey"))) : null;

			map.put("deliveryCostCtQty1", deliveryCostCtQty);
			map.put("deliveryCostWeight1", deliveryCostWeight);
			map.put("deliveryCostShippingCharge1", deliveryCostShippingCharge);
			map.put("deliveryCostWarehouseChange1", deliveryCostWarehouseChange);
//			map.put("deliveryCostInsuranceCharge1", deliveryCostInsuranceCharge);
//			map.put("deliveryCostPayforCharge1", deliveryCostPayforCharge);
//			map.put("deliveryCostConfirmCharge1", deliveryCostConfirmCharge);
//			map.put("deliveryCostConfirmUserKey1", deliveryCostConfirmUserKey);
			map.put("addUserKey", userKey);
			map.put("addUserId", userId);
			map.put("addUserNm", userNm);
			map.put("addDtm", currentDatetime);
			map.put("editUserKey", userKey);
			map.put("editUserId", userId);
			map.put("editUserNm", userNm);
			map.put("editDtm", currentDatetime);
			Map result = customsManagementService.updateImportDeliveryCostList(map);

			return new ResponseEntity<>(result, HttpStatus.CREATED);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveImportDeliveryCostUpdateList")
	public ResponseEntity<?> saveImportDeliveryCostUpdateList(HttpServletRequest request, @RequestBody Map args) throws Exception{
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			BigDecimal deliveryCostKey 				= NumberUtils.createBigDecimal(String.valueOf(args.get("deliveryCostKey")));
			BigDecimal deliveryCostConfirmCharge 	= NumberUtils.createBigDecimal(String.valueOf(args.get("deliveryCostConfirmCharge")));
			String deliveryCostStatus 				= String.valueOf(args.get("deliveryCostStatus"));
			BigDecimal userKey 						= NumberUtils.createBigDecimal(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)));
			String userId 							= String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String userNm 							= String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime 					= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

			List<DeliveryCostVO> voList;
			DeliveryCostVO returnVO;
			Map map = new HashMap();
			map.put("deliveryCostKey", deliveryCostKey);
			List<Map> resultMaster = customsManagementService.selectImportDeliveryRequestGroupList(map);
			if(resultMaster.size() > 0){
			    for (int i = 0, n = resultMaster.size(); i < n; i++) {
			    	voList = customsManagementService.selectImportDeliveryCostSearchList(resultMaster.get(i));

					DeliveryCostVO DeliveryCostVO = voList.get(0);

					DeliveryCostVO.setDeliveryCostConfirmCharge(deliveryCostConfirmCharge);
					DeliveryCostVO.setDeliveryCostStatus(deliveryCostStatus);
					DeliveryCostVO.setDeliveryCostConfirmUserKey(userKey);
					DeliveryCostVO.setDeliveryCostConfirmUserId(userId);
					DeliveryCostVO.setDeliveryCostConfirmUserName(userNm);
					DeliveryCostVO.setDeliveryCostConfirmDtm(currentDatetime);
					DeliveryCostVO.setEditUserKey(userKey);
					DeliveryCostVO.setEditUserId(userId);
					DeliveryCostVO.setEditUserNm(userNm);
					DeliveryCostVO.setEditDtm(currentDatetime);

					customsManagementService.saveImportDeliveryCostList(DeliveryCostVO, request);
			    }
			}else{
				voList = customsManagementService.selectImportDeliveryCostSearchList(map);

				DeliveryCostVO DeliveryCostVO = voList.get(0);

				DeliveryCostVO.setDeliveryCostConfirmCharge(deliveryCostConfirmCharge);
				DeliveryCostVO.setDeliveryCostStatus(deliveryCostStatus);
				DeliveryCostVO.setDeliveryCostConfirmUserKey(userKey);
				DeliveryCostVO.setDeliveryCostConfirmUserId(userId);
				DeliveryCostVO.setDeliveryCostConfirmUserName(userNm);
				DeliveryCostVO.setDeliveryCostConfirmDtm(currentDatetime);
				DeliveryCostVO.setEditUserKey(userKey);
				DeliveryCostVO.setEditUserId(userId);
				DeliveryCostVO.setEditUserNm(userNm);
				DeliveryCostVO.setEditDtm(currentDatetime);

				customsManagementService.saveImportDeliveryCostList(DeliveryCostVO, request);
			}
		    return new ResponseEntity<>(map, HttpStatus.CREATED);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImportDeliveryCostList")
	public ResponseEntity<?> selectImportDeliveryCostList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			checkPagingParamsForMapper(args);
			List<Map> list = customsManagementService.selectImportDeliveryCostList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveImportDeliveryCostGroupList")
	public ResponseEntity<?> saveImportDeliveryCostGroupList(HttpServletRequest request, @RequestBody Map map) throws Exception{
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			BigDecimal userKey = NumberUtils.createBigDecimal(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)));
			String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

			Map targetMap = map;
			DeliveryCostGroupVO deliveryCostGroupVO = modelMapper.map(targetMap, DeliveryCostGroupVO.class);
			deliveryCostGroupVO.setAddUserKey(userKey);
			deliveryCostGroupVO.setAddUserId(userId);
			deliveryCostGroupVO.setAddUserNm(userNm);
			deliveryCostGroupVO.setAddDtm(currentDatetime);
			deliveryCostGroupVO.setEditUserKey(userKey);
			deliveryCostGroupVO.setEditUserId(userId);
			deliveryCostGroupVO.setEditUserNm(userNm);
			deliveryCostGroupVO.setEditDtm(currentDatetime);

			DeliveryCostGroupVO returnVO = customsManagementService.saveImportDeliveryCostGroupList(deliveryCostGroupVO, request);

			return new ResponseEntity<>(returnVO, HttpStatus.CREATED);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/updateImportDeliveryCostGroupList")
	public ResponseEntity<?> updateImportDeliveryCostGroupList(HttpServletRequest request, @RequestBody Map args) throws Exception{
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			Map result = customsManagementService.updateImportDeliveryCostGroupList(args);

			return new ResponseEntity<>(result, HttpStatus.CREATED);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImportDeliveryRequestGroupListByDeliveryCoKey")
	public ResponseEntity<?> selectImportDeliveryRequestGroupListByDeliveryCoKey(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			checkPagingParamsForMapper(args);
			List<Map> list = customsManagementService.selectImportDeliveryRequestGroupListByDeliveryCoKey(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImportDeliveryCostSearchList")
	public ResponseEntity<?> selectImportDeliveryCostSearchList(HttpServletRequest request, @RequestBody Map args) throws Exception{
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			BigDecimal deliveryCostKey 	= NumberUtils.createBigDecimal(String.valueOf(args.get("deliveryCostKey")));

			List<DeliveryCostVO> voList;
			Map map = new HashMap();
			map.put("deliveryCostKey", deliveryCostKey);
			voList = customsManagementService.selectImportDeliveryCostSearchList(map);

			return new ResponseEntity<>(voList, HttpStatus.CREATED);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImportDeliveryRequestGroupList")
	public ResponseEntity<?> selectImportDeliveryRequestGroupList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			checkPagingParamsForMapper(args);
			List<Map> list = customsManagementService.selectImportDeliveryRequestGroupList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectCustomsCostMasterList")
	public ResponseEntity<?> selectCustomsCostMasterList(HttpServletRequest request, @RequestBody Map args) throws Exception{
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String _defaultDB 	= args.containsKey("_defaultDB") ? String.valueOf(args.get("_defaultDB")) : "";
			String USERGRADE 	= args.containsKey("USERGRADE") ? String.valueOf(args.get("USERGRADE")) : "";
			String taxNum 		= args.containsKey("costCustomerTaxNum") ? String.valueOf(args.get("costCustomerTaxNum")) : "";
			String ID 			= args.containsKey("ID") ? String.valueOf(args.get("ID")) : "";
			String USERID 		= args.containsKey("USERID") ? String.valueOf(args.get("USERID")) : "";

			List<CustomsCostMasterVO> list = new ArrayList<>();

			if((USERGRADE.equals("A")||USERGRADE.equals("B"))&&taxNum.equals("")){
				if(_defaultDB.equals("ncustoms")){
					for (int i = 0, n = 2; i < n; i++) {
						if(i==0){
							args.put("costCustomerDb","ncustoms");
						}else{
							args.put("costCustomerDb","ncustoms_sel4");
						}
						list.addAll(customsManagementService.selectCustomsCostMasterList(args));
					}
				}else{
					list = customsManagementService.selectCustomsCostMasterList(args);
				}
				List<?> result = list.stream().collect(Collectors.toList());
				return new ResponseEntity<>(result, HttpStatus.OK);
			}else if((USERGRADE.equals("A")||USERGRADE.equals("B"))&&!taxNum.equals("")){
				list = customsManagementService.selectCustomsCostMasterList(args);
				List<?> result = list.stream().collect(Collectors.toList());
				return new ResponseEntity<>(result, HttpStatus.OK);
			}else{
				List<Map> list2 = new ArrayList<>();
				Map map = new HashMap();
				if(USERGRADE.equals("E")||USERGRADE.equals("F")){
					map.put("userId", ID);
					list2 = systemManagementService.selectDefaultDBList(map);
					for (int i = 0, n = list2.size(); i < n; i++) {
						args.put("costCustomerDb",list2.get(i).get("defaultDB"));
						list.addAll(customsManagementService.selectCustomsCostMasterList(args));
					}
				}else{
					map.put("userId", USERID);
					list2 = systemManagementService.selectDefaultDBList(map);
					for (int i = 0, n = list2.size(); i < n; i++) {
						args.put("costCustomerDb",list2.get(i).get("defaultDB"));
						list.addAll(customsManagementService.selectCustomsCostMasterList(args));
					}
				}
				List<?> result = list.stream().collect(Collectors.toList());
				return new ResponseEntity<>(result, HttpStatus.OK);
			}
		}catch(Exception e){
			return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectCustomsCostAllExcelExportList")
	public ResponseEntity<?> selectCustomsCostAllExcelExportList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = customsManagementService.selectCustomsCostAllExcelExportList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveCustomsCostMaster")
	public ResponseEntity<?> saveCustomsCostMaster(HttpServletRequest request, @RequestBody Map map) throws Exception{
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

			Map targetMap = map;
			CustomsCostMasterVO customsCostMasterVO = modelMapper.map(targetMap, CustomsCostMasterVO.class);
			customsCostMasterVO.setAddUserId(userId);
			customsCostMasterVO.setAddUserNm(userNm);
			customsCostMasterVO.setAddDtm(currentDatetime);
			customsCostMasterVO.setEditUserId(userId);
			customsCostMasterVO.setEditUserNm(userNm);
			customsCostMasterVO.setEditDtm(currentDatetime);

			CustomsCostMasterVO returnVO = customsManagementService.saveCustomsCostMaster(customsCostMasterVO, request);

			return new ResponseEntity<>(returnVO, HttpStatus.CREATED);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveCustomsCostDetail")
	public ResponseEntity<?> saveCustomsCostDetail(HttpServletRequest request, @RequestBody Map map) throws Exception{
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			BigDecimal costMstKey 	= NumberUtils.createBigDecimal(String.valueOf(map.get("costMstKey")));

			CustomsCostMasterVO customsCostMasterVO = customsCostMasterDao.findTop1ByCostMstKey(costMstKey);

			Map targetMap = map;
			CustomsCostDetailVO customsCostDetailVO = modelMapper.map(targetMap, CustomsCostDetailVO.class);
			customsCostDetailVO.setAddUserId(userId);
			customsCostDetailVO.setAddUserNm(userNm);
			customsCostDetailVO.setAddDtm(currentDatetime);
			customsCostDetailVO.setEditUserId(userId);
			customsCostDetailVO.setEditUserNm(userNm);
			customsCostDetailVO.setEditDtm(currentDatetime);
			customsCostDetailVO.setCostMstKey(customsCostMasterVO);

			CustomsCostDetailVO returnVO = customsManagementService.saveCustomsCostDetail(customsCostDetailVO, request);

			return new ResponseEntity<>(returnVO, HttpStatus.CREATED);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/updateCustomsCostDetail")
	public ResponseEntity<?> updateCustomsCostDetail(HttpServletRequest request, @RequestBody Map args) throws Exception{
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			BigDecimal costMstKey 	= NumberUtils.createBigDecimal(String.valueOf(args.get("costMstKey")));
			BigDecimal costDtlKey 	= NumberUtils.createBigDecimal(String.valueOf(args.get("costDtlKey")));
			String useYn 			= String.valueOf(args.get("useYn"));

			List<CustomsCostDetailVO> voList;
			Map map = new HashMap();
			map.put("costDtlKey", costDtlKey);
			voList = customsManagementService.selectCustomsCostDetailList(map);

			CustomsCostMasterVO customsCostMasterVO = customsCostMasterDao.findTop1ByCostMstKey(costMstKey);

			CustomsCostDetailVO customsCostDetailVO = voList.get(0);

			customsCostDetailVO.setEditUserId(userId);
			customsCostDetailVO.setEditUserNm(userNm);
			customsCostDetailVO.setEditDtm(currentDatetime);
			customsCostDetailVO.setUseYn(useYn);
			customsCostDetailVO.setCostMstKey(customsCostMasterVO);

			CustomsCostDetailVO returnVO = customsManagementService.saveCustomsCostDetail(customsCostDetailVO, request);

			return new ResponseEntity<>(returnVO, HttpStatus.CREATED);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectGeodisExportDeclarationMasterList")
	public ResponseEntity<?> selectGeodisExportDeclarationMasterList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			checkPagingParamsForMapper(args);
			List<Map> list = customsManagementService.selectGeodisExportDeclarationMasterList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectGeodisExportDeclarationDetailList")
	public ResponseEntity<?> selectGeodisExportDeclarationDetailList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			checkPagingParamsForMapper(args);
			List<Map> list = customsManagementService.selectGeodisExportDeclarationDetailList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectGeodisExportDeclarationSubDetailList")
	public ResponseEntity<?> selectGeodisExportDeclarationSubDetailList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			checkPagingParamsForMapper(args);
			List<Map> list = customsManagementService.selectGeodisExportDeclarationSubDetailList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectGeodisExpoAdditionalInfoList")
	public ResponseEntity<?> selectGeodisExpoAdditionalInfoList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			checkPagingParamsForMapper(args);
			List<NcustomsGeoExpo1AdditionalVO> list = customsManagementService.selectGeodisExpoAdditionalInfoList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/updateGeodisExpoAdditionalInfo")
	public ResponseEntity<?> updateGeodisExpoAdditionalInfo(HttpServletRequest request, @RequestBody Map args) throws Exception{
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			Map result = customsManagementService.updateGeodisExpoAdditionalInfo(args);

			return new ResponseEntity<>(result, HttpStatus.CREATED);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/updateGeodisExpoAdditionalInfo1")
	public ResponseEntity<?> updateGeodisExpoAdditionalInfo1(HttpServletRequest request, @RequestBody Map args) throws Exception{
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			Map result = customsManagementService.updateGeodisExpoAdditionalInfo1(args);

			return new ResponseEntity<>(result, HttpStatus.CREATED);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping("/saveGeodisExpoAdditionalInfoList")
	public ResponseEntity<?> saveGeodisExpoAdditionalInfoList(HttpServletRequest request, @RequestBody Map map) throws Exception {
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try {
			List<NcustomsGeoExpo1AdditionalVO> voList = new ArrayList<>();
			List<Map> mapList = CmmnUtils.convertJsonToList(String.valueOf(map.get("geodisExpoAdditionalInfoList")));
			for (Map m : mapList) {
				voList.add(modelMapper.map(m, NcustomsGeoExpo1AdditionalVO.class));
			}

			List<NcustomsGeoExpo1AdditionalVO> returnVOList = customsManagementService.saveNcustomsGeodisExpoAdditionalInfoList(voList, request);
			return new ResponseEntity<>(returnVOList, HttpStatus.CREATED);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectGeodisImportDeclarationMasterList")
	public ResponseEntity<?> selectGeodisImportDeclarationMasterList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			checkPagingParamsForMapper(args);
			List<Map> list = customsManagementService.selectGeodisImportDeclarationMasterList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectGeodisImportDeclarationDetailList")
	public ResponseEntity<?> selectGeodisImportDeclarationDetailList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			checkPagingParamsForMapper(args);
			List<Map> list = customsManagementService.selectGeodisImportDeclarationDetailList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectGeodisImportDeclarationSubDetailList")
	public ResponseEntity<?> selectGeodisImportDeclarationSubDetailList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			checkPagingParamsForMapper(args);
			List<Map> list = customsManagementService.selectGeodisImportDeclarationSubDetailList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectGeodisExportAccountCostWithAdditionalInfoList")
	public ResponseEntity<?> selectGeodisExportAccountCostWithAdditionalInfoList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			checkPagingParamsForMapper(args);
			List<Map> list = customsManagementService.selectGeodisExportAccountCostWithAdditionalInfoList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}


	@RequestMapping(value = "/selectMainGraphList")
	public ResponseEntity<?> selectMainGraphList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			checkPagingParamsForMapper(args);
			String ID = args.containsKey("ID") ? String.valueOf(args.get("ID")) : "";
			List<Map> list2 = new ArrayList<>();
			Map map = new HashMap();
			map.put("userId", ID);
			list2 = systemManagementService.selectDefaultDBList(map);
			if (list2.size() > 1){
				args.put("ncustomsDb","all");
			}
			List<Map> list = customsManagementService.selectMainGraphList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectMainGraphImportList")
	public ResponseEntity<?> selectMainGraphImportList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			checkPagingParamsForMapper(args);
			String ID = args.containsKey("ID") ? String.valueOf(args.get("ID")) : "";
			List<Map> list2 = new ArrayList<>();
			Map map = new HashMap();
			map.put("userId", ID);
			list2 = systemManagementService.selectDefaultDBList(map);
			if (list2.size() > 1){
				args.put("ncustomsDb","all");
			}
			List<Map> list = customsManagementService.selectMainGraphImportList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectMainGraphExportList")
	public ResponseEntity<?> selectMainGraphExportList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			checkPagingParamsForMapper(args);
			String ID = args.containsKey("ID") ? String.valueOf(args.get("ID")) : "";
			List<Map> list2 = new ArrayList<>();
			Map map = new HashMap();
			map.put("userId", ID);
			list2 = systemManagementService.selectDefaultDBList(map);
			if (list2.size() > 1){
				args.put("ncustomsDb","all");
			}
			List<Map> list = customsManagementService.selectMainGraphExportList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectMainGraphTotalList")
	public ResponseEntity<?> selectMainGraphTotalList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			checkPagingParamsForMapper(args);
			List<Map> list = customsManagementService.selectMainGraphTotalList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectStatisticsList")
	public ResponseEntity<?> selectStatisticsList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			String defautType = args.containsKey("defautType") ? String.valueOf(args.get("defautType")) : "";
			args.put("yyyymm", String.valueOf(args.get("strFromDate")).substring(0,6));
			if(defautType.equals("import")){
				List<Map> list = customsManagementService.selectImportStatisticsList(args);
				List<?> result = list.stream().collect(Collectors.toList());
				return new ResponseEntity<>(result, HttpStatus.OK);
			}else if(defautType.equals("export")){
				List<Map> list = customsManagementService.selectExportStatisticsList(args);
				List<?> result = list.stream().collect(Collectors.toList());
				return new ResponseEntity<>(result, HttpStatus.OK);
			}else{
				List<Map> list = customsManagementService.selectImpoExpoStatisticsList(args);
				List<?> result = list.stream().collect(Collectors.toList());
				return new ResponseEntity<>(result, HttpStatus.OK);
			}
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectStatisticsYearList")
	public ResponseEntity<?> selectStatisticsYearList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			String defautType = args.containsKey("defautType1") ? String.valueOf(args.get("defautType1")) : "";
			if(defautType.equals("Import")){
				List<Map> list = customsManagementService.selectImportStatisticsYearList(args);
				List<?> result = list.stream().collect(Collectors.toList());
				return new ResponseEntity<>(result, HttpStatus.OK);
			}else if(defautType.equals("Export")){
				List<Map> list = customsManagementService.selectExportStatisticsYearList(args);
				List<?> result = list.stream().collect(Collectors.toList());
				return new ResponseEntity<>(result, HttpStatus.OK);
			}else{
				List<Map> list = customsManagementService.selectImpoExpoStatisticsYearList(args);
				List<?> result = list.stream().collect(Collectors.toList());
				return new ResponseEntity<>(result, HttpStatus.OK);
			}
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectSeinYearGraphList")
	public ResponseEntity<?> selectSeinYearGraphList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			List<Map> list = customsManagementService.selectSeinYearGraphList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectGucciList")
	public ResponseEntity<?> selectGucciList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			List<Map> list = customsManagementService.selectGucciList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectGucciDetailList")
	public ResponseEntity<?> selectGucciDetailList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			List<Map> list = customsManagementService.selectGucciDetailList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectDelayCheckList")
	public ResponseEntity<?> selectDelayCheckList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			String _defaultDB 	= args.containsKey("_defaultDB") ? String.valueOf(args.get("_defaultDB")) : "";
			String USERGRADE 	= args.containsKey("USERGRADE") ? String.valueOf(args.get("USERGRADE")) : "";
			String taxNum 		= args.containsKey("taxNum") ? String.valueOf(args.get("taxNum")) : "";
			String ID 			= args.containsKey("ID") ? String.valueOf(args.get("ID")) : "";
			String USERID 		= args.containsKey("USERID") ? String.valueOf(args.get("USERID")) : "";

			List<Map> list = new ArrayList<>();
			if((USERGRADE.equals("A")||USERGRADE.equals("B"))&&taxNum.equals("")||ID.equals("156")||ID.equals("656")){
				if(_defaultDB.equals("all")){
					list = customsManagementService.selectDelayCheckAllList(args);
					List<?> result = list.stream().collect(Collectors.toList());
					return new ResponseEntity<>(result, HttpStatus.OK);
				}else{
					if(_defaultDB.equals("ncustoms")){
						for (int i = 0, n = 2; i < n; i++) {
							if(i==0){
								args.put("_defaultDB","ncustoms");
							}else{
								args.put("_defaultDB","ncustoms_sel4");
							}
							list.addAll(customsManagementService.selectDelayCheckList(args));
						}
					}else{
						list = customsManagementService.selectDelayCheckList(args);
					}
					List<?> result = list.stream().collect(Collectors.toList());
					return new ResponseEntity<>(result, HttpStatus.OK);
				}
			}else if((USERGRADE.equals("A")||USERGRADE.equals("B"))&&!taxNum.equals("")||ID.equals("156")||ID.equals("656")){
				list = customsManagementService.selectDelayCheckList(args);
				List<?> result = list.stream().collect(Collectors.toList());
				return new ResponseEntity<>(result, HttpStatus.OK);
			}else{
				List<Map> list2 = new ArrayList<>();
				Map map = new HashMap();
				if(USERGRADE.equals("E")||USERGRADE.equals("F")){
					map.put("userId", ID);
					list2 = systemManagementService.selectDefaultDBList(map);
					for (int i = 0, n = list2.size(); i < n; i++) {
						args.put("_defaultDB",list2.get(i).get("defaultDB"));
						list.addAll(customsManagementService.selectDelayCheckList(args));
					}
				}else{
					map.put("userId", USERID);
					list2 = systemManagementService.selectDefaultDBList(map);
					for (int i = 0, n = list2.size(); i < n; i++) {
						args.put("_defaultDB",list2.get(i).get("defaultDB"));
						list.addAll(customsManagementService.selectDelayCheckList(args));
					}
				}
				List<?> result = list.stream().collect(Collectors.toList());
				return new ResponseEntity<>(result, HttpStatus.OK);
			}
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectBanchulCheckList")
	public ResponseEntity<?> selectBanchulCheckList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			String _defaultDB 	= args.containsKey("_defaultDB") ? String.valueOf(args.get("_defaultDB")) : "";
			String USERGRADE 	= args.containsKey("USERGRADE") ? String.valueOf(args.get("USERGRADE")) : "";
			String taxNum 		= args.containsKey("taxNum") ? String.valueOf(args.get("taxNum")) : "";
			String ID 			= args.containsKey("ID") ? String.valueOf(args.get("ID")) : "";
			String USERID 		= args.containsKey("USERID") ? String.valueOf(args.get("USERID")) : "";

			List<Map> list = new ArrayList<>();
			if((USERGRADE.equals("A")||USERGRADE.equals("B"))&&taxNum.equals("")||ID.equals("156")||ID.equals("656")){
				if(_defaultDB.equals("all")){
					list = customsManagementService.selectBanchulCheckAllList(args);
					List<?> result = list.stream().collect(Collectors.toList());
					return new ResponseEntity<>(result, HttpStatus.OK);
				}else{
					if(_defaultDB.equals("ncustoms")){
						for (int i = 0, n = 2; i < n; i++) {
							if(i==0){
								args.put("_defaultDB","ncustoms");
							}else{
								args.put("_defaultDB","ncustoms_sel4");
							}
							list.addAll(customsManagementService.selectBanchulCheckList(args));
						}
					}else{
						list = customsManagementService.selectBanchulCheckList(args);
					}
					List<?> result = list.stream().collect(Collectors.toList());
					return new ResponseEntity<>(result, HttpStatus.OK);
				}
			}else if((USERGRADE.equals("A")||USERGRADE.equals("B"))&&!taxNum.equals("")||ID.equals("156")||ID.equals("656")){
				list = customsManagementService.selectBanchulCheckList(args);
				List<?> result = list.stream().collect(Collectors.toList());
				return new ResponseEntity<>(result, HttpStatus.OK);
			}else{
				List<Map> list2 = new ArrayList<>();
				Map map = new HashMap();
				if(USERGRADE.equals("E")||USERGRADE.equals("F")){
					map.put("userId", ID);
					list2 = systemManagementService.selectDefaultDBList(map);
					for (int i = 0, n = list2.size(); i < n; i++) {
						args.put("_defaultDB",list2.get(i).get("defaultDB"));
						list.addAll(customsManagementService.selectBanchulCheckList(args));
					}
				}else{
					map.put("userId", USERID);
					list2 = systemManagementService.selectDefaultDBList(map);
					for (int i = 0, n = list2.size(); i < n; i++) {
						args.put("_defaultDB",list2.get(i).get("defaultDB"));
						list.addAll(customsManagementService.selectBanchulCheckList(args));
					}
				}
				List<?> result = list.stream().collect(Collectors.toList());
				return new ResponseEntity<>(result, HttpStatus.OK);
			}
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectReExpoCheckList")
	public ResponseEntity<?> selectReExpoCheckList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			List<Map> list = customsManagementService.selectReExpoCheckList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectShipCheckList")
	public ResponseEntity<?> selectShipCheckList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			String _defaultDB 	= args.containsKey("_defaultDB") ? String.valueOf(args.get("_defaultDB")) : "";
			String USERGRADE 	= args.containsKey("USERGRADE") ? String.valueOf(args.get("USERGRADE")) : "";
			String taxNum 		= args.containsKey("taxNum") ? String.valueOf(args.get("taxNum")) : "";
			String ID 			= args.containsKey("ID") ? String.valueOf(args.get("ID")) : "";
			String USERID 		= args.containsKey("USERID") ? String.valueOf(args.get("USERID")) : "";

			List<Map> list = new ArrayList<>();
			if((USERGRADE.equals("A")||USERGRADE.equals("B"))&&taxNum.equals("")||ID.equals("156")||ID.equals("656")){
				if(_defaultDB.equals("all")){
					list = customsManagementService.selectShipCheckAllList(args);
					List<?> result = list.stream().collect(Collectors.toList());
					return new ResponseEntity<>(result, HttpStatus.OK);
				}else{
					if(_defaultDB.equals("ncustoms_sel_040")){
						for (int i = 0, n = 2; i < n; i++) {
							if(i==0){
								args.put("_defaultDB","ncustoms_sel_040");
							}else{
								args.put("_defaultDB","ncustoms_sel4");
							}
							list.addAll(customsManagementService.selectShipCheckList(args));
						}
					}else{
						list = customsManagementService.selectShipCheckList(args);
					}
					List<?> result = list.stream().collect(Collectors.toList());
					return new ResponseEntity<>(result, HttpStatus.OK);
				}
			}else if((USERGRADE.equals("A")||USERGRADE.equals("B"))&&!taxNum.equals("")||ID.equals("156")||ID.equals("656")){
				list = customsManagementService.selectShipCheckList(args);
				List<?> result = list.stream().collect(Collectors.toList());
				return new ResponseEntity<>(result, HttpStatus.OK);
			}else{
				List<Map> list2 = new ArrayList<>();
				Map map = new HashMap();
				if(USERGRADE.equals("E")||USERGRADE.equals("F")){
					map.put("userId", ID);
					list2 = systemManagementService.selectDefaultDBList(map);
					for (int i = 0, n = list2.size(); i < n; i++) {
						args.put("_defaultDB",list2.get(i).get("defaultDB"));
						list.addAll(customsManagementService.selectShipCheckList(args));
					}
				}else{
					map.put("userId", USERID);
					list2 = systemManagementService.selectDefaultDBList(map);
					for (int i = 0, n = list2.size(); i < n; i++) {
						args.put("_defaultDB",list2.get(i).get("defaultDB"));
						list.addAll(customsManagementService.selectShipCheckList(args));
					}
				}
				List<?> result = list.stream().collect(Collectors.toList());
				return new ResponseEntity<>(result, HttpStatus.OK);
			}
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectShipCheckList1")
	public ResponseEntity<?> selectShipCheckList1(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			String _defaultDB 	= args.containsKey("_defaultDB") ? String.valueOf(args.get("_defaultDB")) : "";
			String USERGRADE 	= args.containsKey("USERGRADE") ? String.valueOf(args.get("USERGRADE")) : "";
			String taxNum 		= args.containsKey("taxNum") ? String.valueOf(args.get("taxNum")) : "";
			String ID 			= args.containsKey("ID") ? String.valueOf(args.get("ID")) : "";
			String USERID 		= args.containsKey("USERID") ? String.valueOf(args.get("USERID")) : "";

			List<Map> list = new ArrayList<>();
			if((USERGRADE.equals("A")||USERGRADE.equals("B"))&&taxNum.equals("")||ID.equals("156")||ID.equals("656")){
				if(_defaultDB.equals("all")){
					list = customsManagementService.selectShipCheckAllList(args);
					List<?> result = list.stream().collect(Collectors.toList());
					return new ResponseEntity<>(result, HttpStatus.OK);
				}else{
					if(_defaultDB.equals("ncustoms_sel_040")){
						for (int i = 0, n = 2; i < n; i++) {
							if(i==0){
								args.put("_defaultDB","ncustoms_sel_040");
							}else{
								args.put("_defaultDB","ncustoms_sel4");
							}
							list.addAll(customsManagementService.selectShipCheckList1(args));
						}
					}else{
						list = customsManagementService.selectShipCheckList1(args);
					}
					List<?> result = list.stream().collect(Collectors.toList());
					return new ResponseEntity<>(result, HttpStatus.OK);
				}
			}else if((USERGRADE.equals("A")||USERGRADE.equals("B"))&&!taxNum.equals("")||ID.equals("156")||ID.equals("656")){
				list = customsManagementService.selectShipCheckList1(args);
				List<?> result = list.stream().collect(Collectors.toList());
				return new ResponseEntity<>(result, HttpStatus.OK);
			}else{
				List<Map> list2 = new ArrayList<>();
				Map map = new HashMap();
				if(USERGRADE.equals("E")||USERGRADE.equals("F")){
					map.put("userId", ID);
					list2 = systemManagementService.selectDefaultDBList(map);
					for (int i = 0, n = list2.size(); i < n; i++) {
						args.put("_defaultDB",list2.get(i).get("defaultDB"));
						list.addAll(customsManagementService.selectShipCheckList1(args));
					}
				}else{
					map.put("userId", USERID);
					list2 = systemManagementService.selectDefaultDBList(map);
					for (int i = 0, n = list2.size(); i < n; i++) {
						args.put("_defaultDB",list2.get(i).get("defaultDB"));
						list.addAll(customsManagementService.selectShipCheckList1(args));
					}
				}
				List<?> result = list.stream().collect(Collectors.toList());
				return new ResponseEntity<>(result, HttpStatus.OK);
			}
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImportKpiList")
	public ResponseEntity<?> selectImportKpiList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			String _defaultDB 	= args.containsKey("_defaultDB") ? String.valueOf(args.get("_defaultDB")) : "";
			String USERGRADE 	= args.containsKey("USERGRADE") ? String.valueOf(args.get("USERGRADE")) : "";
			String taxNum 		= args.containsKey("taxNum") ? String.valueOf(args.get("taxNum")) : "";
			String ID 			= args.containsKey("ID") ? String.valueOf(args.get("ID")) : "";
			String USERID 		= args.containsKey("USERID") ? String.valueOf(args.get("USERID")) : "";

			List<Map> list = new ArrayList<>();
			if((USERGRADE.equals("A")||USERGRADE.equals("B"))&&taxNum.equals("")||ID.equals("656")){
				if(_defaultDB.equals("all")){
					System.out.println("AAAAAAAAAAA");
					list = customsManagementService.selectImportKpiAllList(args);
				}else{
					if(_defaultDB.equals("ncustoms")){
						for (int i = 0, n = 2; i < n; i++) {
							if(i==0){
								args.put("_defaultDB","ncustoms");
							}else{
								args.put("_defaultDB","ncustoms_sel4");
							}
							System.out.println("BBBBBBBBBBB");
							list.addAll(customsManagementService.selectImportKpiList(args));
						}
					}else{
						System.out.println("CCCCCCCCCCC");
						list = customsManagementService.selectImportKpiList(args);
					}
				}
			}else if((USERGRADE.equals("A")||USERGRADE.equals("B"))&&!taxNum.equals("")||ID.equals("656")){
				System.out.println("DDDDDDDDDDD");
				list = customsManagementService.selectImportKpiList(args);
			}else{
				List<Map> list2 = new ArrayList<>();
				Map map = new HashMap();
				if(USERGRADE.equals("E")||USERGRADE.equals("F")){
					map.put("userId", ID);
					list2 = systemManagementService.selectDefaultDBList(map);
					for (int i = 0, n = list2.size(); i < n; i++) {
						args.put("_defaultDB",list2.get(i).get("defaultDB"));
						System.out.println("FFFFFFFFFFFFF");
						list.addAll(customsManagementService.selectImportKpiList(args));
					}
				}else{
					map.put("userId", USERID);
					list2 = systemManagementService.selectDefaultDBList(map);
					for (int i = 0, n = list2.size(); i < n; i++) {
						args.put("_defaultDB",list2.get(i).get("defaultDB"));
						System.out.println("GGGGGGGGGGGGG");
						list.addAll(customsManagementService.selectImportKpiList(args));
					}
				}
			}
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImportSummary")
	public ResponseEntity<?> selectImportSummaryTab1(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String ID = args.containsKey("ID") ? String.valueOf(args.get("ID")) : "";
			List<Map> list2 = new ArrayList<>();
			Map map = new HashMap();
			map.put("userId", ID);
			list2 = systemManagementService.selectDefaultDBList(map);
			if (list2.size() > 1){
				args.put("ncustomsDb","all");
			}
			List<Map> result = customsManagementService.selectImportSummary(args);
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectExportBanipStatusList")
	public ResponseEntity<?> selectExportBanipStatusList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			String _defaultDB 	= args.containsKey("_defaultDB") ? String.valueOf(args.get("_defaultDB")) : "";
			String USERGRADE 	= args.containsKey("USERGRADE") ? String.valueOf(args.get("USERGRADE")) : "";
			String taxNum 		= args.containsKey("taxNum") ? String.valueOf(args.get("taxNum")) : "";
			String ID 			= args.containsKey("ID") ? String.valueOf(args.get("ID")) : "";
			String USERID 		= args.containsKey("USERID") ? String.valueOf(args.get("USERID")) : "";

			List<Map> list = new ArrayList<>();
			if((USERGRADE.equals("A")||USERGRADE.equals("B"))&&taxNum.equals("")||ID.equals("156")){
				if(_defaultDB.equals("all")){
					list = customsManagementService.selectExportBanipAllStatusList(args);
					List<?> result = list.stream().collect(Collectors.toList());
					return new ResponseEntity<>(result, HttpStatus.OK);
				}else{
					if(_defaultDB.equals("ncustoms_sel_040")){
						for (int i = 0, n = 2; i < n; i++) {
							if(i==0){
								args.put("_defaultDB","ncustoms_sel_040");
							}else{
								args.put("_defaultDB","ncustoms_sel4");
							}
							list.addAll(customsManagementService.selectExportBanipStatusList(args));
						}
					}else{
						list = customsManagementService.selectExportBanipStatusList(args);
					}
					List<?> result = list.stream().collect(Collectors.toList());
					return new ResponseEntity<>(result, HttpStatus.OK);
				}
			}else if((USERGRADE.equals("A")||USERGRADE.equals("B"))&&!taxNum.equals("")||ID.equals("156")){
				list = customsManagementService.selectExportBanipStatusList(args);
				List<?> result = list.stream().collect(Collectors.toList());
				return new ResponseEntity<>(result, HttpStatus.OK);
			}else{
				List<Map> list2 = new ArrayList<>();
				Map map = new HashMap();
				if(USERGRADE.equals("E")||USERGRADE.equals("F")){
					map.put("userId", ID);
					list2 = systemManagementService.selectDefaultDBList(map);
					for (int i = 0, n = list2.size(); i < n; i++) {
						args.put("_defaultDB",list2.get(i).get("defaultDB"));
						list.addAll(customsManagementService.selectExportBanipStatusList(args));
					}
				}else{
					map.put("userId", USERID);
					list2 = systemManagementService.selectDefaultDBList(map);
					for (int i = 0, n = list2.size(); i < n; i++) {
						args.put("_defaultDB",list2.get(i).get("defaultDB"));
						list.addAll(customsManagementService.selectExportBanipStatusList(args));
					}
				}
				List<?> result = list.stream().collect(Collectors.toList());
				return new ResponseEntity<>(result, HttpStatus.OK);
			}
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImportFieldStatusList")
	public ResponseEntity<?> selectImportFieldStatusList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			List<Map> list = new ArrayList<>();
			list = customsManagementService.selectImportFieldAllStatusList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImportJungFieldStatusList")
	public ResponseEntity<?> selectImportJungFieldStatusList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			List<Map> list = new ArrayList<>();
			list = customsManagementService.selectImportJungFieldAllStatusList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectExportFieldStatusList")
	public ResponseEntity<?> selectExportFieldStatusList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			List<Map> list = new ArrayList<>();
			list = customsManagementService.selectExportFieldAllStatusList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectExportJungFieldStatusList")
	public ResponseEntity<?> selectExportJungFieldStatusList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			List<Map> list = new ArrayList<>();
			list = customsManagementService.selectExportJungFieldAllStatusList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectJangchList")
	public ResponseEntity<?> selectJangchList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			List<Map> list = new ArrayList<>();
			list = customsManagementService.selectJangchList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectMkImportDeclarationMasterList")
	public ResponseEntity<?> selectMkImportDeclarationMasterList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String strEntityArray[] = String.valueOf(args.get("strEntity")).split("\\r?\\n");
		    if (args.containsKey("strEntity") && strEntityArray.length > 1) {
		    	ArrayList<String> strEntityArrayList = new ArrayList(Arrays.asList(strEntityArray));
		    	String strEntityList = CmmnUtils.convertArrayToStringIn(strEntityArrayList);
		    	args.put("strEntityList", strEntityList);
		    	args.put("strEntity", "");
		    }
			checkPagingParamsForMapper(args);
			List<Map> list = customsManagementService.selectMkImportDeclarationMasterList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectMkImportDeclarationDetailList")
	public ResponseEntity<?> selectMkImportDeclarationDetailList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			checkPagingParamsForMapper(args);
			List<Map> list = customsManagementService.selectMkImportDeclarationDetailList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectMkImportDeclarationSubDetailList")
	public ResponseEntity<?> selectMkImportDeclarationSubDetailList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			checkPagingParamsForMapper(args);
			List<Map> list = customsManagementService.selectMkImportDeclarationSubDetailList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImpoAllExcelExport")
	public View selectImpoAllExcelExport(HttpServletRequest request, Map<String, Object> ModelMap) throws Exception {
	    Map<String, String> searchMap = new HashMap<String, String>();
	    searchMap.put("strEntity", request.getParameter("strEntity"));
	    searchMap.put("strVendor", request.getParameter("strVendor"));
	    searchMap.put("strForwarder", request.getParameter("strForwarder"));
	    searchMap.put("_DateType", request.getParameter("_DateType"));
	    searchMap.put("strFromDate", request.getParameter("strFromDate"));
	    searchMap.put("strToDate", request.getParameter("strToDate"));
	    searchMap.put("strSingoNo", request.getParameter("strSingoNo"));
	    searchMap.put("strBlNo", request.getParameter("strBlNo"));
	    searchMap.put("strInvNo", request.getParameter("strInvNo"));
	    searchMap.put("strSegwan", request.getParameter("strSegwan"));
	    searchMap.put("strPoNo", request.getParameter("strPoNo"));

	    // 마스터
	    Map masterMap = new HashMap();
	    if (!searchMap.isEmpty()) {
	    	masterMap = createExcelImpoMaster(searchMap);
	    }
	    ArrayList<String> impoKeyList = (ArrayList<String>) masterMap.get("impoKeyList");

	    String impoKeys = CmmnUtils.convertArrayToStringIn(impoKeyList);
	    Map<String, String> mapImpoKeyList = new HashMap<String, String>();
	    mapImpoKeyList.put("impoKeyList", impoKeys);
	    mapImpoKeyList.put("strInvoiceNo", request.getParameter("strInvoiceNo"));

	    // 디테일
	    Map detailMap = new HashMap();
	    if (mapImpoKeyList != null) {
	    	detailMap = createExcelImpoDetail(mapImpoKeyList);
	    }

	    // 서브디테일
	    Map subDetailMap = new HashMap();
	    if (mapImpoKeyList != null) {
	    	subDetailMap = createExcelImpoSubDetail(mapImpoKeyList);
	    }

	    ModelMap.put("ExcelName", URLEncoder.encode("마이클코어스코리아_수입화물 진행상황 전체리스트", "UTF-8")); // 파일명
	    ModelMap.put("ColName", masterMap.get("ColName")); // master_header
	    ModelMap.put("ColValue", masterMap.get("ColValue")); // master_body
	    ModelMap.put("DetailColName", detailMap.get("DetailColName")); // detail_header
	    ModelMap.put("DetailColValue", detailMap.get("DetailColValue")); // detail_body
	    ModelMap.put("SubDetailColName", subDetailMap.get("SubDetailColName")); // subDetail_header
	    ModelMap.put("SubDetailColValue", subDetailMap.get("SubDetailColValue")); // subDetail_body

	    return new CommExcel();
	}

	private Map createExcelImpoMaster(Map<String, String> searchMap) throws Exception {
	    Map returnMasterMap 			= new HashMap();
	    List<String> ColName 			= new ArrayList<String>();
	    List<String[]> ColValue 		= new ArrayList<String[]>();
	    ArrayList<String> impoKeyList 	= new ArrayList<String>();

	    ColName.add("B/L No.");
	    ColName.add("분할");
	    ColName.add("수입신고번호");
	    ColName.add("수리일");
	    ColName.add("Invoice No.");
	    ColName.add("Vendor");
	    ColName.add("Status");
	    ColName.add("선적항코드");
	    ColName.add("선적항명");
	    ColName.add("양륙항");

	    ColName.add("입항일");
	    ColName.add("반입일");
	    ColName.add("신고일");
	    ColName.add("수리일");
	    ColName.add("포장갯수");
	    ColName.add("포장단위");
	    ColName.add("총수량");
	    ColName.add("총중량");
	    ColName.add("결제조건");
	    ColName.add("결제통화");

	    ColName.add("결제방법");
	    ColName.add("Invoice Amount");
	    ColName.add("총세액");
	    ColName.add("과세운임(KRW)");
	    ColName.add("과세가격(KRW)");
	    ColName.add("관세");
	    ColName.add("부가세");
	    ColName.add("기타세");

	    List<Map> resultMaster = customsManagementService.selectImportSebStatusList(searchMap);

	    for (int i = 0, n = resultMaster.size(); i < n; i++) {
	      impoKeyList.add(String.valueOf(resultMaster.get(i).get("Impo_key"))); // 전체_엑셀_다운을_위한_impoKey값

	      List<String> ColMaster = new ArrayList<String>();

	      ColMaster.add(0, (String) resultMaster.get(i).get("impo_bl_no")); // BL
	      ColMaster.add(1, (String) resultMaster.get(i).get("Impo_bl_gubun")); // 분할
	      ColMaster.add(2, (String) resultMaster.get(i).get("impo_singo_no")); // 수입신고번호
	      ColMaster.add(3, (String) resultMaster.get(i).get("impo_Ok_date1")); // 수리일
	      ColMaster.add(4, (String) resultMaster.get(i).get("Impum_sungbun3")); // INV
	      ColMaster.add(5, (String) resultMaster.get(i).get("Impo_Gonggub_Sangho")); // Vendor
	      ColMaster.add(6, (String) resultMaster.get(i).get("Impo_receive_result")); // Status
	      ColMaster.add(7, (String) resultMaster.get(i).get("Impo_jukchl_code")); // 선적항코드(추가)
	      ColMaster.add(8, (String) resultMaster.get(i).get("Impo_jukchl_name")); // 선적항명(추가)
	      ColMaster.add(9, (String) resultMaster.get(i).get("Impo_Hanggu_Name")); // 양륙항

	      ColMaster.add(10, (String) resultMaster.get(i).get("Impo_iphang_date")); // 입항일
	      ColMaster.add(11, (String) resultMaster.get(i).get("Impo_banip_date")); // 반입일
	      ColMaster.add(12, (String) resultMaster.get(i).get("Impo_singo_date")); // 신고일
	      ColMaster.add(13, (String) resultMaster.get(i).get("impo_Ok_date")); // 수리일
	      ColMaster.add(14, String.valueOf(resultMaster.get(i).get("Impo_pojang_su"))); // 포장갯수
	      ColMaster.add(15, (String) resultMaster.get(i).get("Impo_pojang_danwi")); // 포장단위
	      ColMaster.add(16, String.valueOf(resultMaster.get(i).get("Imlan_su"))); // 총수량
	      ColMaster.add(17, String.valueOf(resultMaster.get(i).get("Impo_total_jung"))); // 총중량
	      ColMaster.add(18, (String) resultMaster.get(i).get("Impo_indo_jogun")); // 결제조건
	      ColMaster.add(19, (String) resultMaster.get(i).get("Impo_gyelje_money")); // 결제통화

	      ColMaster.add(20, (String) resultMaster.get(i).get("Impo_gyelje")); // 결제방법
	      ColMaster.add(21, String.valueOf(resultMaster.get(i).get("Impo_gyelje_input"))); // Invoice_Amount
	      ColMaster.add(22, String.valueOf(resultMaster.get(i).get("Impo_total_tax"))); // 총세액
	      ColMaster.add(23, String.valueOf(resultMaster.get(i).get("Impo_fre_won"))); // 과세운임(KRW)
	      ColMaster.add(24, String.valueOf(resultMaster.get(i).get("Impo_cif_total_won"))); // 과세가격(KRW)
	      ColMaster.add(25, String.valueOf(resultMaster.get(i).get("Impo_gwan_tax"))); // 관세
	      ColMaster.add(26, String.valueOf(resultMaster.get(i).get("Impo_vat_tax"))); // 부가세
	      ColMaster.add(27, String.valueOf(resultMaster.get(i).get("Impo_etc_tax"))); // 기타세

	      String[] sArrayMaster = (String[]) ColMaster.toArray(new String[1]);

	      ColValue.add(sArrayMaster);
	    }

	    returnMasterMap.put("impoKeyList", impoKeyList);
	    returnMasterMap.put("ColName", ColName);
	    returnMasterMap.put("ColValue", ColValue);

	    return returnMasterMap;
	}

//	private Map createExcelImpoMaster(Map<String, String> searchMap) throws Exception {
//	    Map returnMasterMap = new HashMap();
//	    List<String> ColName = new ArrayList<String>();
//	    List<String[]> ColValue = new ArrayList<String[]>();
//	    ArrayList<String> impoKeyList = new ArrayList<String>(); // impoKey리스트용
//
//	    ColName.add("B/L No.");
//	    ColName.add("분할");
//	    ColName.add("수입신고번호");
//	    ColName.add("Invoice No.");
//	    ColName.add("원산지");
//	    ColName.add("무역거래처");
//	    ColName.add("Status");
//	    ColName.add("Forwarder");
//	    ColName.add("양륙항");
//	    ColName.add("입항일");
//	    ColName.add("반입일");
//	    ColName.add("신고일");
//	    ColName.add("수리일");
//	    ColName.add("Carton");
//	    ColName.add("총중량");
//	    ColName.add("결제방법");
//	    ColName.add("결제통화");
//	    ColName.add("결제조건");
//	    ColName.add("관할세관");
//	    ColName.add("운송용기");
//	    ColName.add("Invoice Amount");
//	    ColName.add("총세액");
//	    ColName.add("과세운임(KRW)");
//	    ColName.add("과세가격(KRW)");
//	    ColName.add("관세");
//	    ColName.add("부가세");
//	    ColName.add("기타세");
//
//	    List<Map> resultMaster = customsManagementService.selectMkImportDeclarationMasterList(searchMap);
//
//	    for (int i = 0, n = resultMaster.size(); i < n; i++) {
//	    	impoKeyList.add(String.valueOf(resultMaster.get(i).get("Impo_key"))); // 전체_엑셀_다운을_위한_impoKey값
//
//	    	List<String> ColMaster = new ArrayList<String>();
//
//		    ColMaster.add(0, (String) resultMaster.get(i).get("impo_bl_no")); // BL
//		    ColMaster.add(1, (String) resultMaster.get(i).get("Impo_bl_gubun")); // 분할
//		    ColMaster.add(2, (String) resultMaster.get(i).get("impo_singo_no")); // 수입신고번호
//		    ColMaster.add(3, (String) resultMaster.get(i).get("Impo_file_no2")); // INV
//		    ColMaster.add(4, (String) resultMaster.get(i).get("Imlan_wonsanji_code")); // 원산지
//		    ColMaster.add(5, (String) resultMaster.get(i).get("Impo_Gonggub_Sangho")); // Vendor
//		    ColMaster.add(6, (String) resultMaster.get(i).get("Impo_receive_result")); // Status
//		    ColMaster.add(7, (String) resultMaster.get(i).get("Impo_Forwarder_sangho")); // Forwarder
//		    ColMaster.add(8, (String) resultMaster.get(i).get("Impo_Hanggu_Name")); // 양륙항
//		    ColMaster.add(9, (String) resultMaster.get(i).get("Impo_iphang_date")); // 입항일
//		    ColMaster.add(10, (String) resultMaster.get(i).get("Impo_banip_date")); // 반입일
//		    ColMaster.add(11, (String) resultMaster.get(i).get("Impo_singo_date")); // 신고일
//		    ColMaster.add(12, (String) resultMaster.get(i).get("impo_Ok_date")); // 수리일
//		    ColMaster.add(13, String.valueOf(resultMaster.get(i).get("Impo_pojang_su"))); // 포장갯수
//		    ColMaster.add(14, String.valueOf(resultMaster.get(i).get("Impo_total_jung"))); // 총중량
//		    ColMaster.add(15, (String) resultMaster.get(i).get("Impo_gyelje")); // 결제방법
//		    ColMaster.add(16, (String) resultMaster.get(i).get("Impo_gyelje_money")); // 결제통화
//		    ColMaster.add(17, (String) resultMaster.get(i).get("Impo_indo_jogun")); // 결제조건
//		    ColMaster.add(18, (String) resultMaster.get(i).get("impo_segwan")); // 포장단위
//		    ColMaster.add(19, (String) resultMaster.get(i).get("Impo_unsong_box")); // 운송용기
//		    ColMaster.add(20, String.valueOf(resultMaster.get(i).get("Impo_gyelje_input"))); // Invoice_Amount
//		    ColMaster.add(21, String.valueOf(resultMaster.get(i).get("Impo_total_tax"))); // 총세액
//		    ColMaster.add(22, String.valueOf(resultMaster.get(i).get("Impo_fre_won"))); // 과세운임(KRW)
//		    ColMaster.add(23, String.valueOf(resultMaster.get(i).get("Impo_cif_total_won"))); // 과세가격(KRW)
//		    ColMaster.add(24, String.valueOf(resultMaster.get(i).get("Impo_gwan_tax"))); // 관세
//		    ColMaster.add(25, String.valueOf(resultMaster.get(i).get("Impo_vat_tax"))); // 부가세
//		    ColMaster.add(26, String.valueOf(resultMaster.get(i).get("Impo_etc_tax"))); // 기타세
//
//		    String[] sArrayMaster = (String[]) ColMaster.toArray(new String[1]);
//
//		    ColValue.add(sArrayMaster);
//	    }
//
//	    returnMasterMap.put("impoKeyList", impoKeyList);
//	    returnMasterMap.put("ColName", ColName);
//	    returnMasterMap.put("ColValue", ColValue);
//
//	    return returnMasterMap;
//	}

	private Map createExcelImpoDetail(Map<String, String> mapImpoKeyList) throws Exception {
	    Map returnDetailMap 			= new HashMap();
	    List<String> DetailColName 		= new ArrayList<String>();
	    List<String[]> DetailColValue 	= new ArrayList<String[]>();

	    // DetailColName.add("키1");
	    DetailColName.add("란번호");
	    DetailColName.add("세번부호");
	    DetailColName.add("세종");
	    DetailColName.add("관세율");
	    DetailColName.add("거래품명");
	    DetailColName.add("상표명");
	    DetailColName.add("결제금액");
	    DetailColName.add("란수량");
	    DetailColName.add("단위");
	    DetailColName.add("순중량");

	    DetailColName.add("란과세가격(KRW)");
	    DetailColName.add("란과세가격(USD)");
	    DetailColName.add("관세");
	    DetailColName.add("부가세");
	    DetailColName.add("검사");
	    DetailColName.add("요건번호");

	    List<Map> resultDetail = customsManagementService.selectImpoDetailListByImpoKeyList(mapImpoKeyList);

	    for (int i = 0, n = resultDetail.size(); i < n; i++) {
	      List<String> ColDetail = new ArrayList<String>();

	      ColDetail.add(0, (String) resultDetail.get(i).get("Imlan_jechl_lan")); // 란번호
	      ColDetail.add(1, (String) resultDetail.get(i).get("hdnImlanHs")); // 세번부호
	      ColDetail.add(2, (String) resultDetail.get(i).get("Imlan_seyul_gubun")); // 세종
	      ColDetail.add(3, String.valueOf(resultDetail.get(i).get("Imlan_gwan_seyula"))); // 관세율
	      ColDetail.add(4, (String) resultDetail.get(i).get("Imlan_gurae_pum")); // 거래품명
	      ColDetail.add(5, (String) resultDetail.get(i).get("Imlan_model")); // 상표명
	      ColDetail.add(6, String.valueOf(resultDetail.get(i).get("Imlan_cost"))); // 결제금액
	      ColDetail.add(7, String.valueOf(resultDetail.get(i).get("Imlan_mulryang"))); // 란수량
	      ColDetail.add(8, (String) resultDetail.get(i).get("Imlan_mulryang_danwi")); // 단위
	      ColDetail.add(9, String.valueOf(resultDetail.get(i).get("Imlan_jung"))); // 순중량

	      ColDetail.add(10, String.valueOf(resultDetail.get(i).get("Imlan_cif_won"))); // 란과세가격(KRW)
	      ColDetail.add(11, String.valueOf(resultDetail.get(i).get("Imlan_cif_usd"))); // 란과세가격(USD)
	      ColDetail.add(12, String.valueOf(resultDetail.get(i).get("Imlan_gwan_tax"))); // 관세
	      ColDetail.add(13, String.valueOf(resultDetail.get(i).get("Imlan_vat_tax"))); // 부가세
	      ColDetail.add(14, (String) resultDetail.get(i).get("Imlan_cs_gumsa1")); // 검사
	      ColDetail.add(15, (String) resultDetail.get(i).get("Suipyogun_no")); // 요건번호

	      String[] sArrayDetail = (String[]) ColDetail.toArray(new String[1]);

	      DetailColValue.add(sArrayDetail);
	    }

	    returnDetailMap.put("mapImpoKeyList", mapImpoKeyList);
	    returnDetailMap.put("DetailColName", DetailColName);
	    returnDetailMap.put("DetailColValue", DetailColValue);

	    return returnDetailMap;
	}

//	private Map createExcelImpoDetail(Map<String, String> mapImpoKeyList) throws Exception {
//	    Map returnDetailMap = new HashMap();
//	    List<String> DetailColName = new ArrayList<String>();
//	    List<String[]> DetailColValue = new ArrayList<String[]>();
//
//	    DetailColName.add("란번호");
//	    DetailColName.add("세번부호");
//	    DetailColName.add("세종");
//	    DetailColName.add("관세율");
//	    DetailColName.add("원산지");
//	    DetailColName.add("거래품명");
//	    DetailColName.add("상표명");
//	    DetailColName.add("결제금액");
//	    DetailColName.add("란수량");
//	    DetailColName.add("단위");
//	    DetailColName.add("순중량");
//	    DetailColName.add("란과세가격(KRW)");
//	    DetailColName.add("란과세가격(USD)");
//	    DetailColName.add("관세");
//	    DetailColName.add("부가세");
//	    DetailColName.add("검사");
//
//	    List<Map> resultDetail = customsManagementService.selectMkImpoDetailListByImpoKeyList(mapImpoKeyList);
//
//	    for (int i = 0, n = resultDetail.size(); i < n; i++) {
//	    	List<String> ColDetail = new ArrayList<String>();
//
//	    	ColDetail.add(0, (String) resultDetail.get(i).get("Imlan_jechl_lan")); // 란번호
//	    	ColDetail.add(1, (String) resultDetail.get(i).get("Imlan_hs")); // 세번부호
//	    	ColDetail.add(2, (String) resultDetail.get(i).get("Imlan_seyul_gubun")); // 세종
//	    	ColDetail.add(3, String.valueOf(resultDetail.get(i).get("Imlan_gwan_seyula"))); // 관세율
//	    	ColDetail.add(4, String.valueOf(resultDetail.get(i).get("Imlan_wonsanji_code"))); // 관세율
//	    	ColDetail.add(5, (String) resultDetail.get(i).get("Imlan_gurae_pum")); // 거래품명
//	    	ColDetail.add(6, (String) resultDetail.get(i).get("Imlan_model")); // 상표명
//	    	ColDetail.add(7, String.valueOf(resultDetail.get(i).get("Imlan_cost"))); // 결제금액
//	    	ColDetail.add(8, String.valueOf(resultDetail.get(i).get("Imlan_mulryang"))); // 란수량
//	    	ColDetail.add(9, (String) resultDetail.get(i).get("Imlan_mulryang_danwi")); // 단위
//	    	ColDetail.add(10, String.valueOf(resultDetail.get(i).get("Imlan_jung"))); // 순중량
//	    	ColDetail.add(11, String.valueOf(resultDetail.get(i).get("Imlan_cif_won"))); // 란과세가격(KRW)
//	    	ColDetail.add(12, String.valueOf(resultDetail.get(i).get("Imlan_cif_usd"))); // 란과세가격(USD)
//	    	ColDetail.add(13, String.valueOf(resultDetail.get(i).get("Imlan_gwan_tax"))); // 관세
//	    	ColDetail.add(14, String.valueOf(resultDetail.get(i).get("Imlan_vat_tax"))); // 부가세
//	    	ColDetail.add(15, (String) resultDetail.get(i).get("Imlan_cs_gumsa1")); // 검사
//
//	    	String[] sArrayDetail = (String[]) ColDetail.toArray(new String[1]);
//
//	    	DetailColValue.add(sArrayDetail);
//	    }
//
//	    returnDetailMap.put("mapImpoKeyList", mapImpoKeyList);
//	    returnDetailMap.put("DetailColName", DetailColName);
//	    returnDetailMap.put("DetailColValue", DetailColValue);
//
//	    return returnDetailMap;
//	}

	private Map createExcelImpoSubDetail(Map<String, String> mapImpoKeyList) throws Exception {
	    Map returnSubDetailMap = new HashMap();
	    List<String> SubDetailColName = new ArrayList<String>();
	    List<String[]> SubDetailColValue = new ArrayList<String[]>();

	    SubDetailColName.add("행번호");
	    SubDetailColName.add("CMMF");
	    SubDetailColName.add("수량");
	    SubDetailColName.add("단위");
	    SubDetailColName.add("단가");
	    SubDetailColName.add("금액");
	    SubDetailColName.add("인보이스번호");
	    SubDetailColName.add("규격1");
	    SubDetailColName.add("규격2");
	    SubDetailColName.add("규격3");

	    SubDetailColName.add("성분1");
	    SubDetailColName.add("성분2");
	    SubDetailColName.add("규격과세가격(KRW)");
	    SubDetailColName.add("운임(KRW)");
	    SubDetailColName.add("보험(KRW)");
	    SubDetailColName.add("가산금");
	    SubDetailColName.add("관세");
	    SubDetailColName.add("부가세");
	    SubDetailColName.add("총세액");
	    SubDetailColName.add("요건번호");

	    List<Map> resultSubDetail = customsManagementService.selectImpoSubDetailListByImpoKeyList(mapImpoKeyList);
	    for (int i = 0, n = resultSubDetail.size(); i < n; i++) {
	      List<String> ColSubDetail = new ArrayList<String>();
	      ColSubDetail.add(0, (String) resultSubDetail.get(i).get("Impum_heang")); // 행번호
	      ColSubDetail.add(1, (String) resultSubDetail.get(i).get("Impum_jajae_code")); // CMMF
	      ColSubDetail.add(2, String.valueOf(resultSubDetail.get(i).get("Impum_su"))); // 수량
	      ColSubDetail.add(3, (String) resultSubDetail.get(i).get("Impum_su_danwi")); // 단위
	      ColSubDetail.add(4, String.valueOf(resultSubDetail.get(i).get("Impum_danga"))); // 단가
	      ColSubDetail.add(5, String.valueOf(resultSubDetail.get(i).get("Impum_Amt"))); // 금액
	      ColSubDetail.add(6, (String) resultSubDetail.get(i).get("Impum_sungbun3")); // 인보이스번호
	      ColSubDetail.add(7, (String) resultSubDetail.get(i).get("Impum_gukyk1")); // 규격1
	      ColSubDetail.add(8, (String) resultSubDetail.get(i).get("Impum_gukyk2")); // 규격2
	      ColSubDetail.add(9, (String) resultSubDetail.get(i).get("Impum_gukyk3")); // 규격3

	      ColSubDetail.add(10, (String) resultSubDetail.get(i).get("Impum_sungbun1")); // 성분1
	      ColSubDetail.add(11, (String) resultSubDetail.get(i).get("Impum_sungbun2")); // 성분2
	      ColSubDetail.add(12, String.valueOf(resultSubDetail.get(i).get("cifwon"))); // 규격과세가격(KRW)
	      ColSubDetail.add(13, String.valueOf(resultSubDetail.get(i).get("fre"))); // 운임(KRW)
	      ColSubDetail.add(14, String.valueOf(resultSubDetail.get(i).get("ins"))); // 보험(KRW)
	      ColSubDetail.add(15, String.valueOf(resultSubDetail.get(i).get("plus"))); // 가산금
	      ColSubDetail.add(16, String.valueOf(resultSubDetail.get(i).get("duty"))); // 관세
	      ColSubDetail.add(17, String.valueOf(resultSubDetail.get(i).get("vat"))); // 부가세
	      ColSubDetail.add(18, String.valueOf(resultSubDetail.get(i).get("tax"))); // 총세액
	      ColSubDetail.add(19, (String) resultSubDetail.get(i).get("Suipyogun_no")); // 요건번호

	      String[] sArraySubDetail = (String[]) ColSubDetail.toArray(new String[1]);

	      SubDetailColValue.add(sArraySubDetail);
	    }

	    returnSubDetailMap.put("SubDetailColName", SubDetailColName);
	    returnSubDetailMap.put("SubDetailColValue", SubDetailColValue);

	    return returnSubDetailMap;
	}

//	private Map createExcelImpoSubDetail(Map<String, String> mapImpoKeyList) throws Exception {
//	    Map returnSubDetailMap = new HashMap();
//	    List<String> SubDetailColName = new ArrayList<String>();
//	    List<String[]> SubDetailColValue = new ArrayList<String[]>();
//	    SubDetailColName.add("행번호");
//	    SubDetailColName.add("자재코드");
//	    SubDetailColName.add("수량");
//	    SubDetailColName.add("단위");
//	    SubDetailColName.add("단가");
//	    SubDetailColName.add("금액");
//	    SubDetailColName.add("규격1");
//	    SubDetailColName.add("규격2");
//	    SubDetailColName.add("규격3");
//	    SubDetailColName.add("성분1");
//	    SubDetailColName.add("성분2");
//	    SubDetailColName.add("PO번호");
//	    SubDetailColName.add("규격과세가격(KRW)");
//	    SubDetailColName.add("운임(KRW)");
//	    SubDetailColName.add("보험(KRW)");
//	    SubDetailColName.add("가산금");
//	    SubDetailColName.add("관세");
//	    SubDetailColName.add("부가세");
//	    SubDetailColName.add("총세액");
//
//	    List<Map> resultSubDetail = customsManagementService.selectMkImpoSubDetailListByImpoKeyList(mapImpoKeyList);
//	    for (int i = 0, n = resultSubDetail.size(); i < n; i++) {
//	    	List<String> ColSubDetail = new ArrayList<String>();
//	    	ColSubDetail.add(0, (String) resultSubDetail.get(i).get("Impum_heang")); // 행번호
//	    	ColSubDetail.add(1, (String) resultSubDetail.get(i).get("Impum_jajae_code")); // CMMF
//	    	ColSubDetail.add(2, String.valueOf(resultSubDetail.get(i).get("Impum_su"))); // 수량
//	    	ColSubDetail.add(3, (String) resultSubDetail.get(i).get("Impum_su_danwi")); // 단위
//	    	ColSubDetail.add(4, String.valueOf(resultSubDetail.get(i).get("Impum_danga"))); // 단가
//	    	ColSubDetail.add(5, String.valueOf(resultSubDetail.get(i).get("Impum_Amt"))); // 금액
//	    	ColSubDetail.add(6, (String) resultSubDetail.get(i).get("Impum_gukyk1")); // 규격1
//	    	ColSubDetail.add(7, (String) resultSubDetail.get(i).get("Impum_gukyk2")); // 규격2
//	    	ColSubDetail.add(8, (String) resultSubDetail.get(i).get("Impum_gukyk3")); // 규격3
//	    	ColSubDetail.add(9, (String) resultSubDetail.get(i).get("Impum_sungbun1")); // 성분1
//	    	ColSubDetail.add(10, (String) resultSubDetail.get(i).get("Impum_sungbun2")); // 성분2
//	    	ColSubDetail.add(11, (String) resultSubDetail.get(i).get("Impum_sungbun3")); // PO번호
//	    	ColSubDetail.add(12, String.valueOf(resultSubDetail.get(i).get("cifwon"))); // 규격과세가격(KRW)
//	    	ColSubDetail.add(13, String.valueOf(resultSubDetail.get(i).get("fre"))); // 운임(KRW)
//	    	ColSubDetail.add(14, String.valueOf(resultSubDetail.get(i).get("ins"))); // 보험(KRW)
//	    	ColSubDetail.add(15, String.valueOf(resultSubDetail.get(i).get("plus"))); // 가산금
//	    	ColSubDetail.add(16, String.valueOf(resultSubDetail.get(i).get("duty"))); // 관세
//	    	ColSubDetail.add(17, String.valueOf(resultSubDetail.get(i).get("vat"))); // 부가세
//	    	ColSubDetail.add(18, String.valueOf(resultSubDetail.get(i).get("tax"))); // 총세액
//
//	    	String[] sArraySubDetail = (String[]) ColSubDetail.toArray(new String[1]);
//
//	    	SubDetailColValue.add(sArraySubDetail);
//	    }
//
//	    returnSubDetailMap.put("SubDetailColName", SubDetailColName);
//	    returnSubDetailMap.put("SubDetailColValue", SubDetailColValue);
//
//	    return returnSubDetailMap;
//	}

	@RequestMapping(value = "/selectFtaList")
	public ResponseEntity<?> selectFtaList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			String _defaultDB 	= args.containsKey("_defaultDB") ? String.valueOf(args.get("_defaultDB")) : "";
			String USERGRADE 	= args.containsKey("USERGRADE") ? String.valueOf(args.get("USERGRADE")) : "";
			String taxNum 		= args.containsKey("taxNum") ? String.valueOf(args.get("taxNum")) : "";
			String ID 			= args.containsKey("ID") ? String.valueOf(args.get("ID")) : "";
			String USERID 		= args.containsKey("USERID") ? String.valueOf(args.get("USERID")) : "";

			List<Map> list = new ArrayList<>();
			if((USERGRADE.equals("A")||USERGRADE.equals("B"))&&taxNum.equals("")){
				if(_defaultDB.equals("ncustoms")){
					for (int i = 0, n = 2; i < n; i++) {
						if(i==0){
							args.put("_defaultDB","ncustoms");
						}else{
							args.put("_defaultDB","ncustoms_sel4");
						}
						list.addAll(customsManagementService.selectFtaList(args));
					}
				}else{
					list = customsManagementService.selectFtaList(args);
				}
				List<?> result = list.stream().collect(Collectors.toList());
				return new ResponseEntity<>(result, HttpStatus.OK);
			}else if((USERGRADE.equals("A")||USERGRADE.equals("B"))&&!taxNum.equals("")){
				list = customsManagementService.selectFtaList(args);
				List<?> result = list.stream().collect(Collectors.toList());
				return new ResponseEntity<>(result, HttpStatus.OK);
			}else{
				if(ID.equals("156")||ID.equals("258")){
					args.put("_defaultDB","ncustoms");
					args.put("taxNum","");
					list.addAll(customsManagementService.selectFtaList(args));
					List<?> result = list.stream().collect(Collectors.toList());
					return new ResponseEntity<>(result, HttpStatus.OK);
				}else{
					List<Map> list2 = new ArrayList<>();
					Map map = new HashMap();
					if(USERGRADE.equals("E")||USERGRADE.equals("F")){
						map.put("userId", ID);
						list2 = systemManagementService.selectDefaultDBList(map);
						for (int i = 0, n = list2.size(); i < n; i++) {
							args.put("_defaultDB",list2.get(i).get("defaultDB"));
							list.addAll(customsManagementService.selectFtaList(args));
						}
					}else{
						map.put("userId", USERID);
						list2 = systemManagementService.selectDefaultDBList(map);
						for (int i = 0, n = list2.size(); i < n; i++) {
							args.put("_defaultDB",list2.get(i).get("defaultDB"));
							list.addAll(customsManagementService.selectFtaList(args));
						}
					}
					List<?> result = list.stream().collect(Collectors.toList());
					return new ResponseEntity<>(result, HttpStatus.OK);
				}
			}
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectExFtaList")
	public ResponseEntity<?> selectExFtaList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			String _defaultDB 	= args.containsKey("_defaultDB") ? String.valueOf(args.get("_defaultDB")) : "";
			String USERGRADE 	= args.containsKey("USERGRADE") ? String.valueOf(args.get("USERGRADE")) : "";
			String taxNum 		= args.containsKey("taxNum") ? String.valueOf(args.get("taxNum")) : "";
			String ID 			= args.containsKey("ID") ? String.valueOf(args.get("ID")) : "";
			String USERID 		= args.containsKey("USERID") ? String.valueOf(args.get("USERID")) : "";

			List<Map> list = new ArrayList<>();
			list = customsManagementService.selectExFtaList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveImpo1mdtl")
    public ResponseEntity<?> saveImpo1mdtl(HttpServletRequest request, @RequestBody Map args) throws Exception{
	  	try{
	  		long result = customsManagementService.saveImpo1mdtl(args);
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

	@RequestMapping(value = "/selectTodsCount")
	public ResponseEntity<?> selectTodsCount(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = customsManagementService.selectTodsCount(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/updateImpo1Mdtl")
    public ResponseEntity<?> updateImpo1Mdtl(HttpServletRequest request, @RequestBody Map args) throws Exception{
	  	try{
	  		String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
			String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

			args.put("addUserId",userId);
			args.put("addUserNm",userNm);
			args.put("addDtm",currentDatetime);
			args.put("confDesc","수정");

	  		long result1 = customsManagementService.insertImpo1MdtlDelLog(args);
	  		long result  = customsManagementService.updateImpo1Mdtl(args);
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

	@RequestMapping(value = "/selectImportZeissRequestList")
	public ResponseEntity<?> selectImportZeissRequestList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String _defaultDB 	= args.containsKey("_defaultDB") ? String.valueOf(args.get("_defaultDB")) : "";
			String USERGRADE 	= args.containsKey("USERGRADE") ? String.valueOf(args.get("USERGRADE")) : "";
			String taxNum 		= args.containsKey("taxNum") ? String.valueOf(args.get("taxNum")) : "";
			String ID 			= args.containsKey("ID") ? String.valueOf(args.get("ID")) : "";
			String USERID 		= args.containsKey("USERID") ? String.valueOf(args.get("USERID")) : "";

			List<Map> list = new ArrayList<>();
			List<Map> list2 = new ArrayList<>();
			Map map = new HashMap();
			if(USERGRADE.equals("E")||USERGRADE.equals("F")){
				map.put("userId", ID);
				list2 = systemManagementService.selectDefaultDBList(map);
				for (int i = 0, n = list2.size(); i < n; i++) {
					args.put("_defaultDB",list2.get(i).get("defaultDB"));
					list.addAll(customsManagementService.selectImportZeissRequestList(args));
				}
			}else{
				map.put("userId", USERID);
				list2 = systemManagementService.selectDefaultDBList(map);
				for (int i = 0, n = list2.size(); i < n; i++) {
					args.put("_defaultDB",list2.get(i).get("defaultDB"));
					list.addAll(customsManagementService.selectImportZeissRequestList(args));
				}
			}
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImportZeissDecide")
	public ResponseEntity<?> selectImportZeissDecide(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String ID = args.containsKey("ID") ? String.valueOf(args.get("ID")) : "";
			List<Map> list = new ArrayList<>();
			List<Map> list2 = new ArrayList<>();
			Map map = new HashMap();
			map.put("userId", ID);
			list2 = systemManagementService.selectDefaultDBList(map);
			for (int i = 0, n = list2.size(); i < n; i++) {
				args.put("_defaultDB",list2.get(i).get("defaultDB"));
				list.addAll(customsManagementService.selectImportZeissDecide(args));
			}
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectZeissFileDownList")
	public ResponseEntity<?> selectZeissFileDownList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			String ID 		= args.containsKey("ID") ? String.valueOf(args.get("ID")) : "";
			String fileType = args.containsKey("fileType") ? String.valueOf(args.get("fileType")) : "";
			String category = "";
			if(fileType.equals("A")){
				category = "";
			}else if(fileType.equals("B")){
				category = "('A0002','A0005')";
			}else if(fileType.equals("C")){
				category = "('B0001')";
			}else if(fileType.equals("D")){
				category = "('A0002','B0001','A0005')";
			}

			long list5 = customsManagementService.selectZeissFileDel(args);

			Map searchMap = new HashMap();
			List<Map> list = customsManagementService.selectZeissFileDownList(args);
			if(list.size()!=0){
				long list1 = customsManagementService.selectZeissTempInsert(args);
				String singo = "(";
				for (int i = 0, n = list.size(); i < n; i++) {
					singo = singo + "'" + list.get(i).get("Impo_singo_no") + "',";
					if(i == list.size()-1){
						singo = singo.substring(0, singo.length()-1) + ")";
					}
				}
				searchMap.put("singo", singo);
				searchMap.put("addUserId", ID);
				searchMap.put("category",category);
				long list2 = customsManagementService.selectZeissTemp1Insert(searchMap);

				long list3 = customsManagementService.selectZeissFileInsert(searchMap);
				long list6 = customsManagementService.selectZeissFileTempDel(args);
				long list7 = customsManagementService.selectZeissFileTemp1Del(args);
			}

			List<Map> list4 = customsManagementService.selectZeissFileDown(args);
			List<?> result = list4.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveFieldManage")
    public ResponseEntity<?> saveFieldManage(HttpServletRequest request, @RequestBody Map args) throws Exception{
	  	try{
	  		String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
	  		args.put("addDtm",currentDatetime);
	  		long result = customsManagementService.saveFieldManage(args);
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

	@RequestMapping(value = "/updateFieldManage")
    public ResponseEntity<?> updateFieldManage(HttpServletRequest request, @RequestBody Map args) throws Exception{
	  	try{
	  		String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
	  		args.put("editDtm",currentDatetime);
	  		long result = customsManagementService.updateFieldManage(args);
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

	@RequestMapping(value = "/deleteFieldManage")
    public ResponseEntity<?> deleteFieldManage(HttpServletRequest request, @RequestBody Map args) throws Exception{
	  	try{
	  		String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
	  		args.put("editDtm",currentDatetime);
	  		long result = customsManagementService.deleteFieldManage(args);
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

	@RequestMapping(value = "/selectFieldManage")
	public ResponseEntity<?> selectFieldManage(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = customsManagementService.selectFieldManage(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectCostcoAccountList")
	public ResponseEntity<?> selectCostcoAccountList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = customsManagementService.selectCostcoAccountList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectCostcoFeesList")
	public ResponseEntity<?> selectCostcoFeesList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = customsManagementService.selectCostcoFeesList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectCostcoImportStatusList")
	public ResponseEntity<?> selectCostcoImportStatusList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = customsManagementService.selectCostcoImportStatusList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveCostcoFees")
    public ResponseEntity<?> saveCostcoFees(HttpServletRequest request, @RequestBody Map args) throws Exception{
	  	try{
	  		String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

			args.put("addUserId",userId);
	  		args.put("addUserNm",userNm);
	  		args.put("addDtm",currentDatetime);

			long result = customsManagementService.saveCostcoFees(args);
		  	return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

	@RequestMapping(value = "/deleteCostcoFees")
    public ResponseEntity<?> deleteCostcoFees(HttpServletRequest request, @RequestBody Map args) throws Exception{
	  	try{
	  		String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
	  		args.put("editUserId",userId);
	  		args.put("editUserNm",userNm);
	  		args.put("editDtm",currentDatetime);
	  		long result = customsManagementService.deleteCostcoFees(args);
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

	@RequestMapping(value = "/changeCostcoFees")
    public ResponseEntity<?> changeCostcoFees(HttpServletRequest request, @RequestBody Map args) throws Exception{
	  	try{
	  		String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

			args.put("editUserId",userId);
	  		args.put("editUserNm",userNm);
	  		args.put("editDtm",currentDatetime);

			long result = customsManagementService.changeCostcoFees(args);
		  	return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

	@RequestMapping(value = "/selectImJungList")
	public ResponseEntity<?> selectImJungList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			List<Map> list = customsManagementService.selectImJungList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImJungDetailList")
	public ResponseEntity<?> selectImJungDetailList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			List<Map> list = customsManagementService.selectImJungDetailList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectExJungList")
	public ResponseEntity<?> selectExJungList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			List<Map> list = customsManagementService.selectExJungList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectExJungDetailList")
	public ResponseEntity<?> selectExJungDetailList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			List<Map> list = customsManagementService.selectExJungDetailList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImportSebStatusList")
	public ResponseEntity<?> selectImportSebStatusList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			String strEntityArray[] = String.valueOf(args.get("strEntity")).split(",");
			if (args.containsKey("strEntity") && strEntityArray.length > 1) {
				ArrayList<String> strEntityArrayList = new ArrayList(Arrays.asList(strEntityArray));
				String strEntityList = CmmnUtils.convertArrayToStringIn(strEntityArrayList);
				args.put("strEntityList", strEntityList);
				args.put("strEntity", "");
			}
			List<Map> list = new ArrayList<>();
			list = customsManagementService.selectImportSebStatusList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImportSebStatusDetail")
	public ResponseEntity<?> selectImportSebStatusDetail(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			List<Map> list = new ArrayList<>();
			list = customsManagementService.selectImportSebStatusDetail(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImportSebStatusSubDetail")
	public ResponseEntity<?> selectImportSebStatusSubDetail(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			List<Map> list = new ArrayList<>();
			list = customsManagementService.selectImportSebStatusSubDetail(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImpoAllSeparationSheetExcelExport")
	public View selectImpoAllSeparationSheetExcelExport(HttpServletRequest request, Map<String, Object> ModelMap) throws Exception {
	    Map<String, String> searchMap = new HashMap<String, String>();
	    searchMap.put("strEntity", request.getParameter("strEntity"));
	    searchMap.put("strVendor", request.getParameter("strVendor"));
	    searchMap.put("_DateType", request.getParameter("_DateType"));
	    searchMap.put("strFromDate", request.getParameter("strFromDate"));
	    searchMap.put("strToDate", request.getParameter("strToDate"));
	    searchMap.put("strSingoNo", request.getParameter("strSingoNo"));
	    searchMap.put("strBlNo", request.getParameter("strBlNo"));
	    searchMap.put("strInvoiceNo", request.getParameter("strInvoiceNo"));
	    searchMap.put("_userId", String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)));
	    searchMap.put("saup", String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_TAXNO)));
	    searchMap.put("companyCode", "17");

	    // 마스터
	    Map masterMap = new HashMap();
	    if (!searchMap.isEmpty()) {
	      masterMap = createExcelImpoMaster(searchMap);
	    }
	    ArrayList<String> impoKeyList = (ArrayList<String>) masterMap.get("impoKeyList");

	    String impoKeys = CmmnUtils.convertArrayToStringIn(impoKeyList);
	    Map<String, String> mapImpoKeyList = new HashMap<String, String>();
	    mapImpoKeyList.put("impoKeyList", impoKeys);
	    mapImpoKeyList.put("strInvoiceNo", request.getParameter("strInvoiceNo"));

	    // 디테일
	    Map detailMap = new HashMap();
	    if (mapImpoKeyList != null) {
	      detailMap = createExcelImpoDetail(mapImpoKeyList);
	    }

	    // 서브디테일
	    Map subDetailMap = new HashMap();
	    if (mapImpoKeyList != null) {
	      subDetailMap = createExcelImpoSubDetail(mapImpoKeyList);
	    }

	    ModelMap.put("ExcelName", URLEncoder.encode("그룹세브코리아_수입화물 진행상황_시트별_전체리스트", "UTF-8")); // 파일명
	    ModelMap.put("ColName", masterMap.get("ColName")); // master_header
	    ModelMap.put("ColValue", masterMap.get("ColValue")); // master_body
	    ModelMap.put("DetailColName", detailMap.get("DetailColName")); // detail_header
	    ModelMap.put("DetailColValue", detailMap.get("DetailColValue")); // detail_body
	    ModelMap.put("SubDetailColName", subDetailMap.get("SubDetailColName")); // subDetail_header
	    ModelMap.put("SubDetailColValue", subDetailMap.get("SubDetailColValue")); // subDetail_body

	    return new CommExcel();
	}

	@RequestMapping(value = "/selectImpoAllIntegrationSheetExcelExport")
	public View selectImpoAllIntegrationSheetExcelExport(HttpServletRequest request, Map<String, Object> ModelMap) throws Exception {

	    // 검색조건
	    Map<String, String> searchMap = new HashMap<String, String>();
	    searchMap.put("strEntity", request.getParameter("strEntity"));
	    searchMap.put("strVendor", request.getParameter("strVendor"));
	    searchMap.put("_DateType", request.getParameter("_DateType"));
	    searchMap.put("strFromDate", request.getParameter("strFromDate"));
	    searchMap.put("strToDate", request.getParameter("strToDate"));
	    searchMap.put("strSingoNo", request.getParameter("strSingoNo"));
	    searchMap.put("strBlNo", request.getParameter("strBlNo"));
	    searchMap.put("strInvoiceNo", request.getParameter("strInvoiceNo"));
	    searchMap.put("_userId", String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)));
	    searchMap.put("saup", String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_TAXNO)));
	    searchMap.put("companyCode", "17");

	    ArrayList<String> impoKeyList = new ArrayList<String>(); // impoKey리스트용
	    // impoKey리스트
	    if (!searchMap.isEmpty()) {
	    	List<Map> resultMaster = customsManagementService.selectImportSebStatusList(searchMap);
	    	for (int i = 0, n = resultMaster.size(); i < n; i++) {
	    		impoKeyList.add(String.valueOf(resultMaster.get(i).get("Impo_key"))); // 전체_엑셀_다운을_위한_impoKey값
	    	}
	    }
	    String impoKeys = CmmnUtils.convertArrayToStringIn(impoKeyList);
	    Map<String, String> mapImpoKeyList = new HashMap<String, String>();
	    mapImpoKeyList.put("impoKeyList", impoKeys);
	    mapImpoKeyList.put("_userId", String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)));
	    mapImpoKeyList.put("saup", String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_TAXNO)));
	    mapImpoKeyList.put("companyCode", "17");

	    // 엑셀 생성
	    Map masterMap = new HashMap();
	    if (mapImpoKeyList != null) {
	      masterMap = createExcelImpoAllData(mapImpoKeyList);
	    }

	    ModelMap.put("ExcelName", URLEncoder.encode("그룹세브코리아_수입화물_진행상황_통합시트_전체리스트", "UTF-8")); // 파일명
	    ModelMap.put("ColName", masterMap.get("ColName")); // master_header
	    ModelMap.put("ColValue", masterMap.get("ColValue")); // master_body

	    return new CommExcel();
	}

	private Map createExcelImpoAllData(Map<String, String> mapImpoKeyList) throws Exception {
	    Map returnMasterMap 	= new HashMap();
	    List<String> ColName 	= new ArrayList<String>();
	    List<String[]> ColValue = new ArrayList<String[]>();

	    // impo1
	    ColName.add("B/L No.");
	    ColName.add("분할");
	    ColName.add("수입신고번호");
	    ColName.add("수리일");
	    ColName.add("Invoice No.");
	    ColName.add("Vendor");
	    ColName.add("Status");
	    ColName.add("선적항코드");
	    ColName.add("선적항명");
	    ColName.add("양륙항");

	    ColName.add("입항일");
	    ColName.add("반입일");
	    ColName.add("신고일");
	    ColName.add("수리일");
	    ColName.add("포장갯수");
	    ColName.add("포장단위");
	    ColName.add("총수량");
	    ColName.add("총중량");
	    ColName.add("결제조건");
	    ColName.add("결제통화");

	    ColName.add("결제방법");
	    ColName.add("Invoice Amount");
	    ColName.add("총세액");
	    ColName.add("과세운임(KRW)");
	    ColName.add("과세가격(KRW)");
	    ColName.add("관세");
	    ColName.add("부가세");
	    ColName.add("기타세");

	    // impo2
	    ColName.add("란번호");
	    ColName.add("세번부호");
	    ColName.add("세종");
	    ColName.add("관세율");
	    ColName.add("거래품명");
	    ColName.add("상표명");
	    ColName.add("결제금액");
	    ColName.add("란수량");
	    ColName.add("단위");
	    ColName.add("순중량");

	    ColName.add("란과세가격(KRW)");
	    ColName.add("란과세가격(USD)");
	    ColName.add("관세");
	    ColName.add("부가세");
	    ColName.add("검사");
	    ColName.add("요건번호1");

	    // impo3
	    ColName.add("행번호");
	    ColName.add("CMMF");
	    ColName.add("수량");
	    ColName.add("단위");
	    ColName.add("단가");
	    ColName.add("금액");
	    ColName.add("인보이스번호");
	    ColName.add("규격1");
	    ColName.add("규격2");
	    ColName.add("규격3");

	    ColName.add("성분1");
	    ColName.add("성분2");
	    ColName.add("규격과세가격(KRW)");
	    ColName.add("운임(KRW)");
	    ColName.add("보험(KRW)");
	    ColName.add("가산금");
	    ColName.add("관세");
	    ColName.add("부가세");
	    ColName.add("총세액");
	    ColName.add("요건번호2");

	    List<Map> resultMaster = customsManagementService.selectImpoAllListByImpoKeyList(mapImpoKeyList);

	    for (int i = 0, n = resultMaster.size(); i < n; i++) {
	      List<String> ColMaster = new ArrayList<String>();

	      // impo1
	      ColMaster.add(0, (String) resultMaster.get(i).get("impo_bl_no")); // BL
	      ColMaster.add(1, (String) resultMaster.get(i).get("Impo_bl_gubun")); // 분할
	      ColMaster.add(2, (String) resultMaster.get(i).get("impo_singo_no")); // 수입신고번호
	      ColMaster.add(3, (String) resultMaster.get(i).get("impo_Ok_date1")); // 수리일
	      ColMaster.add(4, (String) resultMaster.get(i).get("Impum_sungbun3")); // INV
	      ColMaster.add(5, (String) resultMaster.get(i).get("Impo_Gonggub_Sangho")); // Vendor
	      ColMaster.add(6, (String) resultMaster.get(i).get("Impo_receive_result")); // Status
	      ColMaster.add(7, (String) resultMaster.get(i).get("Impo_jukchl_code")); // 선적항코드(추가)
	      ColMaster.add(8, (String) resultMaster.get(i).get("Impo_jukchl_name")); // 선적항명(추가)
	      ColMaster.add(9, (String) resultMaster.get(i).get("Impo_hanggu_name")); // 양륙항

	      ColMaster.add(10, (String) resultMaster.get(i).get("Impo_iphang_date")); // 입항일
	      ColMaster.add(11, (String) resultMaster.get(i).get("Impo_banip_date")); // 반입일
	      ColMaster.add(12, (String) resultMaster.get(i).get("Impo_singo_date")); // 신고일
	      ColMaster.add(13, (String) resultMaster.get(i).get("impo_Ok_date")); // 수리일
	      ColMaster.add(14, String.valueOf(resultMaster.get(i).get("Impo_pojang_su"))); // 포장갯수
	      ColMaster.add(15, (String) resultMaster.get(i).get("Impo_pojang_danwi")); // 포장단위
	      ColMaster.add(16, String.valueOf(resultMaster.get(i).get("total_Imlan_su"))); // 총수량
	      ColMaster.add(17, String.valueOf(resultMaster.get(i).get("Impo_total_jung"))); // 총중량
	      ColMaster.add(18, (String) resultMaster.get(i).get("Impo_indo_jogun")); // 결제조건
	      ColMaster.add(19, (String) resultMaster.get(i).get("Impo_gyelje_money")); // 결제통화

	      ColMaster.add(20, (String) resultMaster.get(i).get("Impo_gyelje")); // 결제방법
	      ColMaster.add(21, String.valueOf(resultMaster.get(i).get("Impo_gyelje_input"))); // Invoice_Amount
	      ColMaster.add(22, String.valueOf(resultMaster.get(i).get("Impo_total_tax"))); // 총세액
	      ColMaster.add(23, String.valueOf(resultMaster.get(i).get("Impo_fre_won"))); // 과세운임(KRW)
	      ColMaster.add(24, String.valueOf(resultMaster.get(i).get("Impo_cif_total_won"))); // 과세가격(KRW)
	      ColMaster.add(25, String.valueOf(resultMaster.get(i).get("Impo_gwan_tax"))); // 관세
	      ColMaster.add(26, String.valueOf(resultMaster.get(i).get("Impo_vat_tax"))); // 부가세
	      ColMaster.add(27, String.valueOf(resultMaster.get(i).get("Impo_etc_tax"))); // 기타세

	      // impo2
	      ColMaster.add(28, (String) resultMaster.get(i).get("Imlan_jechl_lan")); // 란번호
	      ColMaster.add(29, (String) resultMaster.get(i).get("hdnImlanHs")); // 세번부호
	      ColMaster.add(30, (String) resultMaster.get(i).get("Imlan_seyul_gubun")); // 세종
	      ColMaster.add(31, String.valueOf(resultMaster.get(i).get("Imlan_gwan_seyula"))); // 관세율
	      ColMaster.add(32, (String) resultMaster.get(i).get("Imlan_gurae_pum")); // 거래품명
	      ColMaster.add(33, (String) resultMaster.get(i).get("Imlan_model")); // 상표명
	      ColMaster.add(34, String.valueOf(resultMaster.get(i).get("Imlan_cost"))); // 결제금액
	      ColMaster.add(35, String.valueOf(resultMaster.get(i).get("Imlan_mulryang"))); // 란수량
	      ColMaster.add(36, (String) resultMaster.get(i).get("Imlan_mulryang_danwi")); // 단위
	      ColMaster.add(37, String.valueOf(resultMaster.get(i).get("Imlan_jung"))); // 순중량

	      ColMaster.add(38, String.valueOf(resultMaster.get(i).get("Imlan_cif_won"))); // 란과세가격(KRW)
	      ColMaster.add(39, String.valueOf(resultMaster.get(i).get("Imlan_cif_usd"))); // 란과세가격(USD)
	      ColMaster.add(40, String.valueOf(resultMaster.get(i).get("Imlan_gwan_tax"))); // 관세
	      ColMaster.add(41, String.valueOf(resultMaster.get(i).get("Imlan_vat_tax"))); // 부가세
	      ColMaster.add(42, (String) resultMaster.get(i).get("Imlan_cs_gumsa1")); // 검사
	      ColMaster.add(43, (String) resultMaster.get(i).get("Suipyogun_no_1")); // 요건번호(2016.04.23이전
	                                                                           // 데이터의
	                                                                           // 요건번호)

	      // impo3
	      ColMaster.add(44, (String) resultMaster.get(i).get("Impum_heang")); // 행번호
	      ColMaster.add(45, (String) resultMaster.get(i).get("Impum_jajae_code")); // CMMF
	      ColMaster.add(46, String.valueOf(resultMaster.get(i).get("Impum_su"))); // 수량
	      ColMaster.add(47, (String) resultMaster.get(i).get("Impum_su_danwi")); // 단위
	      ColMaster.add(48, String.valueOf(resultMaster.get(i).get("Impum_danga"))); // 단가
	      ColMaster.add(49, String.valueOf(resultMaster.get(i).get("Impum_Amt"))); // 금액
	      ColMaster.add(50, (String) resultMaster.get(i).get("Impum_sungbun3")); // 인보이스번호
	      ColMaster.add(51, (String) resultMaster.get(i).get("Impum_gukyk1")); // 규격1
	      ColMaster.add(52, (String) resultMaster.get(i).get("Impum_gukyk2")); // 규격2
	      ColMaster.add(53, (String) resultMaster.get(i).get("Impum_gukyk3")); // 규격3

	      ColMaster.add(54, (String) resultMaster.get(i).get("Impum_sungbun1")); // 성분1
	      ColMaster.add(55, (String) resultMaster.get(i).get("Impum_sungbun2")); // 성분2
	      ColMaster.add(56, String.valueOf(resultMaster.get(i).get("cifwon"))); // 규격과세가격(KRW)
	      ColMaster.add(57, String.valueOf(resultMaster.get(i).get("fre"))); // 운임(KRW)
	      ColMaster.add(58, String.valueOf(resultMaster.get(i).get("ins"))); // 보험(KRW)
	      ColMaster.add(59, String.valueOf(resultMaster.get(i).get("plus"))); // 가산금
	      ColMaster.add(60, String.valueOf(resultMaster.get(i).get("duty"))); // 관세
	      ColMaster.add(61, String.valueOf(resultMaster.get(i).get("vat"))); // 부가세
	      ColMaster.add(62, String.valueOf(resultMaster.get(i).get("tax"))); // 총세액
	      ColMaster.add(63, (String) resultMaster.get(i).get("Suipyogun_no_2")); // 요건번호(2016.04.23이후 요건번호)

	      String[] sArrayMaster = (String[]) ColMaster.toArray(new String[1]);

	      ColValue.add(sArrayMaster);
	    }

	    returnMasterMap.put("ColName", ColName);
	    returnMasterMap.put("ColValue", ColValue);

	    return returnMasterMap;
	}

	@RequestMapping(value = "/selectSeinTotalList")
	public ResponseEntity<?> selectSeinTotalList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			List<Map> list = customsManagementService.selectSeinTotalList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectSeinTotalList1")
	public ResponseEntity<?> selectSeinTotalList1(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			List<Map> list = customsManagementService.selectSeinTotalList1(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectSeinTotalList2")
	public ResponseEntity<?> selectSeinTotalList2(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			List<Map> list = customsManagementService.selectSeinTotalList2(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectSeinTotalList3")
	public ResponseEntity<?> selectSeinTotalList3(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			List<Map> list = customsManagementService.selectSeinTotalList3(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectSeinTotalList4")
	public ResponseEntity<?> selectSeinTotalList4(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			List<Map> list = customsManagementService.selectSeinTotalList4(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectSeinTotalList5")
	public ResponseEntity<?> selectSeinTotalList5(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			List<Map> list = customsManagementService.selectSeinTotalList5(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}



























  @RequestMapping(value = "/getExportStartInfoWithEdmsList")
  public ResponseEntity<?> getExportStartInfoWithEdmsList(HttpServletRequest request, @RequestBody Map args) {
	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
		return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  checkPagingParamsForMapper(args);
	  args.put("_userId", CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
	  args.put("_defaultDB", String.valueOf(args.get("customerDB")));
	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
	  List<Map> list = customsManagementService.getExportStartInfoWithEdmsListByMapper(args);
	  List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
  }

  @RequestMapping(value = "/getExportStartInfoListBySpec")
  public ResponseEntity<?> getExportStartInfoListBySpec(HttpServletRequest request, @RequestBody Map args) {
    if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
		return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  args.put("_userId", CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", 0))), Integer.parseInt(String.valueOf(args.getOrDefault("size", 20))));
	  List<ExpoStartInfoVO> list = customsManagementService.getExportStartInfoListBySpec(args);

	  List<?> result = list.stream()
			  .skip(pageRequest.getPageNumber() * pageRequest.getPageSize())
			  .limit(pageRequest.getPageSize())
			  .collect(Collectors.toList());

	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
  }

  @RequestMapping(value = "/saveExportStartInfo")
  public ResponseEntity<?> saveExportStartInfo(HttpServletRequest request, @RequestBody Map map) throws Exception {
    if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
		return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  // validation
	  String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
	  Map targetMap = map;
	  ExpoStartInfoVO expoStartInfoVO = modelMapper.map(targetMap, ExpoStartInfoVO.class);
	  expoStartInfoVO.setImsAddUserId(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID)));
	  expoStartInfoVO.setImsAddDtm(currentDatetime);
	  expoStartInfoVO.setImsEditUserId(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID)));
System.out.println("AAAAAAA");
	  ExpoStartInfoVO returnVO = customsManagementService.saveExpoStartInfo(expoStartInfoVO, request);
	  System.out.println("BBBBBBBB");
	  return new ResponseEntity<>(returnVO, HttpStatus.CREATED);
	} catch (Exception e) {
	  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
  }



  @RequestMapping(value = "/getImportDetailStatusList")
  public ResponseEntity<?> getImportDetailStatusList(HttpServletRequest request, @RequestBody Map args) {
	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
	try {
	  checkPagingParamsForMapper(args);
	  List<Map> list = customsManagementService.getImportDetailStatusList(args);
	  List<?> result = list.stream().collect(Collectors.toList());
	  return new ResponseEntity<>(result, HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
  }

  @RequestMapping(value = "/getImportSubDetailStatusList")
  public ResponseEntity<?> getImportSubDetailStatusList(HttpServletRequest request, @RequestBody Map args) {
	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
	try {
	  checkPagingParamsForMapper(args);
	  List<Map> list = customsManagementService.getImportSubDetailStatusList(args);
	  List<?> result = list.stream().collect(Collectors.toList());
	  return new ResponseEntity<>(result, HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
  }

  @RequestMapping(value = "/getExportStatusList")
  public ResponseEntity<?> getExportStatusList(HttpServletRequest request, @RequestBody Map args) {
	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  checkPagingParamsForMapper(args);
	  List<Map> list = customsManagementService.getExportStatusList(args);
	  List<?> result = list.stream().collect(Collectors.toList());
	  return new ResponseEntity<>(result, HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
  }

  @RequestMapping(value = "/getExportDetailStatusList")
  public ResponseEntity<?> getExportDetailStatusList(HttpServletRequest request, @RequestBody Map args) {
	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
	try {
	  checkPagingParamsForMapper(args);
	  List<Map> list = customsManagementService.getExportDetailStatusList(args);
	  List<?> result = list.stream().collect(Collectors.toList());
	  return new ResponseEntity<>(result, HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
  }

  @RequestMapping(value = "/getExportSubDetailStatusList")
  public ResponseEntity<?> getExportSubDetailStatusList(HttpServletRequest request, @RequestBody Map args) {
	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
	try {
	  checkPagingParamsForMapper(args);
	  List<Map> list = customsManagementService.getExportSubDetailStatusList(args);
	  List<?> result = list.stream().collect(Collectors.toList());
	  return new ResponseEntity<>(result, HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
  }

  @RequestMapping(value = "/getImpoCostMasterList")
  public Map<String, Object> getImpoCostMasterList(HttpServletRequest request, @RequestBody Map<String, String> args)  throws Exception {
	  args.put("_userId", String.valueOf(args.get("userId")));
	  args.put("saup", String.valueOf(args.get("saup")));

	  String strEntityArray[] = String.valueOf(args.get("strEntity")).split("\\r?\\n");
	  if (args.containsKey("strEntity") && strEntityArray.length > 1) {
		  ArrayList<String> strEntityArrayList = new ArrayList(Arrays.asList(strEntityArray));
		  String strEntityList = CmmnUtils.convertArrayToStringIn(strEntityArrayList);
		  args.put("strEntityList", strEntityList);
		  args.put("strEntity", "");
	  }

	  Map<String, Object>  list = customsManagementService.getImpoCostMasterList(args);

	  Map<String, Object> newResult = new HashMap<String, Object>();
	  newResult.put("success", true);
	  newResult.put("code", 1);
	  newResult.put("message", "");
	  newResult.put("result", list);

	  return newResult;
  }

  @RequestMapping(value = "/selectImpoCostByImpumIvnoList")
  public Map<String, Object> selectImpoCostByImpumIvnoList(HttpServletRequest request, @RequestBody Map<String, String> args) throws Exception {
    try {
      List<Map<String, Object>> result = customsManagementService.selectImpoCostByImpumIvnoList(args);
      Map<String, Object> newResult = new HashMap<String, Object>();
	  newResult.put("success", true);
	  newResult.put("code", 1);
	  newResult.put("message", "");
	  newResult.put("result", result);

	  return newResult;
    } catch (Exception e) {
      Map<String, Object> newResult = new HashMap<String, Object>();
  	  newResult.put("success", true);
  	  newResult.put("code", 0);
  	  newResult.put("message", "");
  	  newResult.put("result", "");

  	  return newResult;
    }
  }

  @RequestMapping(value = "/selectImpoCostByImpumIvnoDescList")
  public Map<String, Object> selectImpoCostByImpumIvnoDescList(HttpServletRequest request, @RequestBody Map<String, String> args) throws Exception {
    try {
      List<Map<String, Object>> result = customsManagementService.selectImpoCostByImpumIvnoDescList(args);
      Map<String, Object> newResult = new HashMap<String, Object>();
	  newResult.put("success", true);
	  newResult.put("code", 1);
	  newResult.put("message", "");
	  newResult.put("result", result);

	  return newResult;
    } catch (Exception e) {
      Map<String, Object> newResult = new HashMap<String, Object>();
	  newResult.put("success", true);
	  newResult.put("code", 0);
	  newResult.put("message", "");
	  newResult.put("result", "");

	  return newResult;
    }
  }

  @RequestMapping(value = "/selectImpoCostSubMasterList")
  public Map<String, Object> selectImpoCostSubMasterList(HttpServletRequest request, @RequestBody Map<String, String> args) throws Exception {
    Map<String, Object> result = customsManagementService.selectImpoCostSubMasterList(args);
    Map<String, Object> newResult = new HashMap<String, Object>();
    newResult.put("success", true);
    newResult.put("code", 1);
    newResult.put("message", "");
    newResult.put("result", result);

    return newResult;
  }

  @RequestMapping(value = "/selectImpoCostSubMasterDetailList")
  public Map<String, Object> selectImpoCostSubMasterDetailList(HttpServletRequest request, @RequestBody Map<String, String> args) throws Exception {
    Map<String, Object> result = customsManagementService.selectImpoCostSubMasterDetailList(args);
    Map<String, Object> newResult = new HashMap<String, Object>();
    newResult.put("success", true);
    newResult.put("code", 1);
    newResult.put("message", "");
    newResult.put("result", result);

    return newResult;
  }

  @RequestMapping(value = "/selectImpo1MdtlLogList")
  public Map<String, Object> selectImpo1MdtlLogList(HttpServletRequest request, @RequestBody Map<String, String> args) throws Exception {
    try {
      List<Map<String, Object>> result = customsManagementService.selectImpo1MdtlLogList(args);
      Map<String, Object> newResult = new HashMap<String, Object>();
	  newResult.put("success", true);
	  newResult.put("code", 1);
	  newResult.put("message", "");
	  newResult.put("result", result);

	  return newResult;
    } catch (Exception e) {
      Map<String, Object> newResult = new HashMap<String, Object>();
  	  newResult.put("success", true);
  	  newResult.put("code", 0);
  	  newResult.put("message", "");
  	  newResult.put("result", "");

  	  return newResult;
    }
  }

  @RequestMapping(value = "/updateImpo1MdtlCalculate")
  public Map<String, Object> updateImpo1MdtlCalculate(HttpServletRequest request, @RequestBody Map args) throws Exception {
    try {
      if (CmmnUtils.isNull(args.get("keyImpo1Mdtl"))) throw new Exception("키값이 없습니다.");
      if (CmmnUtils.isNull(args.get("confDesc"))) throw new Exception("확정사유는 필수사항 입니다.");
      String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
      String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
      String confDesc = String.valueOf(args.get("confDesc"));
      Map result = customsManagementService.updateImpo1MdtlCalculate(args, userId, userNm, confDesc);
      Map<String, Object> newResult = new HashMap<String, Object>();
	  newResult.put("success", true);
	  newResult.put("code", 1);
	  newResult.put("message", "");
	  newResult.put("result", result);

	  return newResult;
    } catch (Exception e) {
    	Map<String, Object> newResult = new HashMap<String, Object>();
    	newResult.put("success", true);
    	newResult.put("code", 0);
    	newResult.put("message", "");
    	newResult.put("result", "");

    	return newResult;
    }
  }

  @RequestMapping(value = "/getImportManagementList")
  public ResponseEntity<?> getImportManagementList(HttpServletRequest request, @RequestBody Map args) {
	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
	try {
	  checkPagingParamsForMapper(args);
	  List<Map> list = customsManagementService.getImportManagementList(args);
	  List<?> result = list.stream().collect(Collectors.toList());
	  return new ResponseEntity<>(result, HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
  }

  @RequestMapping(value = "/updateRecvImpo3")
  public Map<String, Object> updateRecvImpo3(HttpServletRequest request, @RequestBody Map args) throws Exception {
    try {
      Map result = customsManagementService.updateRecvImpo3(args);
      Map<String, Object> newResult = new HashMap<String, Object>();
	  newResult.put("success", true);
	  newResult.put("code", 1);
	  newResult.put("message", "");
	  newResult.put("result", result);

	  return newResult;
    } catch (Exception e) {
    	Map<String, Object> newResult = new HashMap<String, Object>();
    	newResult.put("success", true);
    	newResult.put("code", 0);
    	newResult.put("message", "");
    	newResult.put("result", "");

    	return newResult;
    }
  }



//  @RequestMapping(value = "/getMKImpoCostMasterList")
//  public Map<String, Object> getMKImpoCostMasterList(HttpServletRequest request, @RequestBody Map<String, String> args)  throws Exception {
//	  args.put("_userId", String.valueOf(args.get("userId")));
//	  args.put("saup", String.valueOf(args.get("saup")));
//
//	  String strEntityArray[] = String.valueOf(args.get("strEntity")).split("\\r?\\n");
//	  if (args.containsKey("strEntity") && strEntityArray.length > 1) {
//		  ArrayList<String> strEntityArrayList = new ArrayList(Arrays.asList(strEntityArray));
//		  String strEntityList = CmmnUtils.convertArrayToStringIn(strEntityArrayList);
//		  args.put("strEntityList", strEntityList);
//		  args.put("strEntity", "");
//	  }
//
//	  Map<String, Object>  list = customsManagementService.getMKImpoCostMasterList(args);
//
//	  Map<String, Object> newResult = new HashMap<String, Object>();
//	  newResult.put("success", true);
//	  newResult.put("code", 1);
//	  newResult.put("message", "");
//	  newResult.put("result", list);
//
//	  return newResult;
//  }



  @RequestMapping(value = "/getImportResultDetailList")
  public ResponseEntity<?> getImportResultDetailList(HttpServletRequest request, @RequestBody Map args) {
	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  List<Map> result = customsManagementService.getImportResultDetailList(args);
	  return new ResponseEntity<>(new PageImpl<>(result), HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
  }


  @RequestMapping(value = "/getExportResultDetailList")
  public ResponseEntity<?> getExportResultDetailList(HttpServletRequest request, @RequestBody Map args) {
	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  List<Map> result = customsManagementService.getExportResultDetailList(args);
	  return new ResponseEntity<>(new PageImpl<>(result), HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
  }



  @RequestMapping(value = "/getFtaList")
  public ResponseEntity<?> getFtaList(HttpServletRequest request, @RequestBody Map args) {
	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  List<Map> result = customsManagementService.getFtaList(args);
	  return new ResponseEntity<>(new PageImpl<>(result), HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
  }

  @RequestMapping(value = "/getFtaDetailList")
  public ResponseEntity<?> getFtaDetailList(HttpServletRequest request, @RequestBody Map args) {
	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  List<Map> result = customsManagementService.getFtaDetailList(args);
	  return new ResponseEntity<>(new PageImpl<>(result), HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
  }

  @RequestMapping(value = "/downloadBurberry")
  public void downloadBurberry(HttpServletRequest request, @RequestParam String _DateType, @RequestParam String strFromDate, @RequestParam String strToDate,
		    @RequestParam String taxNum, @RequestParam String impoNapseSangho, @RequestParam String impoBlNo,
		    @RequestParam String impoSingoNo, @RequestParam String impoFileNo1, @RequestParam String _Undecided,
		    @RequestParam String _TodayData, @RequestParam String _Document, @RequestParam String _Test,
		    @RequestParam String impoSegwan, @RequestParam String impoGroupSegwan, @RequestParam String impoGonggubSangho,
		    @RequestParam String forwarder, @RequestParam String defaultDB, HttpServletResponse response) throws UnsupportedEncodingException{
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return;

		BurberryExcel excelResultHandler = null;

		try {
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			excelResultHandler = new BurberryExcel(response);

			Map map = new HashMap();
			map.put("strFromDate", strFromDate);
			map.put("strToDate", strToDate);
			map.put("_DateType", _DateType);
			map.put("taxNum", taxNum);
			map.put("impoNapseSangho", impoNapseSangho);
			map.put("impoBlNo", impoBlNo);
			map.put("impoSingoNo", impoSingoNo);
			map.put("impoFileNo1", impoFileNo1);
			map.put("_Undecided", _Undecided);
			map.put("_TodayData", _TodayData);
			map.put("_Document", impoFileNo1);
			map.put("_Test", _Test);
			map.put("impoSegwan", impoSegwan);
			map.put("impoGroupSegwan", impoGroupSegwan);
			map.put("impoGonggubSangho", impoGonggubSangho);
			map.put("forwarder", forwarder);
			map.put("_defaultDB", defaultDB);

			sessionTempCustomsDao.burberry("com.edwards.biz.customsManagement.ImpoCustomsMapper.selectImportStatusTotalList", map, excelResultHandler);
		}catch(Exception ex){
			throw new RuntimeException(ex);
		}finally{
			if(excelResultHandler != null){
				try{ excelResultHandler.close();}catch(Exception ex){}
			}
		}
	}

  	@RequestMapping(value = "/downloadPorscheTax")
  	public void downloadPorscheTax(HttpServletRequest request, @RequestParam String _DateType, @RequestParam String strFromDate, @RequestParam String strToDate,
		    @RequestParam String impoSingoNo, @RequestParam String impoFileNo1Total, HttpServletResponse response) throws UnsupportedEncodingException{
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return;

		PorscheTaxExcel excelResultHandler = null;

		try {
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			excelResultHandler = new PorscheTaxExcel(response);

			Map map = new HashMap();
			map.put("strFromDate", strFromDate);
			map.put("strToDate", strToDate);
			map.put("_DateType", _DateType);
			map.put("impoSingoNo", impoSingoNo);
			map.put("impoFileNo1Total", impoFileNo1Total);

			sessionTempCustomsDao.porscheTax("com.edwards.biz.customsManagement.ImpoCustomsMapper.selectImpoTaxList", map, excelResultHandler);
		}catch(Exception ex){
			throw new RuntimeException(ex);
		}finally{
			if(excelResultHandler != null){
				try{ excelResultHandler.close();}catch(Exception ex){}
			}
		}
	}

    @RequestMapping(value = "/selectImpoTaxList")
	public ResponseEntity<?> selectImpoTaxList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			String impoFileNo1Total	= args.containsKey("impoFileNo1Total") ? String.valueOf(args.get("impoFileNo1Total")) : "";
			if(!impoFileNo1Total.equals("")){
				impoFileNo1Total = "'"+impoFileNo1Total.replaceAll(System.getProperty("line.separator"), " ").replace(" ", "','")+"'";
				impoFileNo1Total = "("+impoFileNo1Total.replace(",''", "")+")";
				args.put("impoFileNo1Total",impoFileNo1Total);
			}

			List<Map> list = new ArrayList<>();
			list = customsManagementService.selectImpoTaxList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

    @RequestMapping(value = "/downloadPorscheItem")
  	public void downloadPorscheItem(HttpServletRequest request, @RequestParam String _DateType, @RequestParam String strFromDate, @RequestParam String strToDate,
		    @RequestParam String _Undecided, @RequestParam String _TodayData, @RequestParam String _Document, @RequestParam String _defaultDB,
		    @RequestParam String _Test, @RequestParam String impoSuipCode, @RequestParam String impoBlNo, @RequestParam String taxNum,
		    @RequestParam String impoSingoNo, @RequestParam String impoFileNo1Total, @RequestParam String impoGonggubSangho,
		    @RequestParam String impoSegwan, @RequestParam String impoForwarder, HttpServletResponse response) throws UnsupportedEncodingException{
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return;

		PorscheItemExcel excelResultHandler = null;

		try {
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			excelResultHandler = new PorscheItemExcel(response);

			Map map = new HashMap();
			map.put("_defaultDB", _defaultDB);
			map.put("taxNum", taxNum);
			map.put("strFromDate", strFromDate);
			map.put("strToDate", strToDate);
			map.put("_DateType", _DateType);
			map.put("_Undecided", _Undecided);
			map.put("_TodayData", _TodayData);
			map.put("_Document", _Document);
			map.put("_Test", _Test);
			map.put("impoSuipCode", impoSuipCode);
			map.put("impoBlNo", impoBlNo);
			map.put("impoSingoNo", impoSingoNo);
			map.put("impoFileNo1Total", impoFileNo1Total);
			map.put("impoGonggubSangho", impoGonggubSangho);
			map.put("impoSegwan", impoSegwan);
			map.put("forwarder", impoForwarder);

			sessionTempCustomsDao.porscheItem("com.edwards.biz.customsManagement.ImpoCustomsMapper.selectImportStatusTotalList", map, excelResultHandler);
		}catch(Exception ex){
			throw new RuntimeException(ex);
		}finally{
			if(excelResultHandler != null){
				try{ excelResultHandler.close();}catch(Exception ex){}
			}
		}
	}
}