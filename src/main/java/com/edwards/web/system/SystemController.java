package com.edwards.web.system;

import static com.edwards.commons.CmmnUtils.getUserInfo;
import static com.jayway.jsonpath.Criteria.where;
import static com.jayway.jsonpath.Filter.filter;

import com.edwards.biz.customsManagement.FtpClient;
import com.edwards.biz.codeManagement.CodeManagementService;
import com.edwards.biz.edmsManagement.EdmsManagementService;
import com.edwards.biz.logManagement.ExcelLogAccessDao;
import com.edwards.biz.systemManagement.CpsAttachFileDao;
import com.edwards.biz.systemManagement.CpsSaveCustomerDao;
import com.edwards.biz.systemManagement.CpsSaveTeamDao;
import com.edwards.biz.systemManagement.CpsUserMenuDao;
import com.edwards.biz.systemManagement.ENAC100Dao;
import com.edwards.biz.systemManagement.SysAttachFileDao;
import com.edwards.biz.systemManagement.SystemManagementService;
import com.edwards.biz.userManagement.UserManagementService;
import com.edwards.commons.CmmnConstants;
import com.edwards.commons.CmmnController;
import com.edwards.commons.CmmnErrorResponse;
import com.edwards.commons.CmmnFileUtils;
import com.edwards.commons.CmmnUtils;
import com.edwards.domains.CpsAttachFileVO;
import com.edwards.domains.CpsEdmsAttachFileVO;
import com.edwards.domains.CpsExcelLogAccessVO;
import com.edwards.domains.CpsLogAccessVO;
import com.edwards.domains.CpsSaveCustomerVO;
import com.edwards.domains.CpsSaveTeamVO;
import com.edwards.domains.CpsStartInfoVO;
import com.edwards.domains.CpsTeamVO;
import com.edwards.domains.CpsUserInfoVO;
import com.edwards.domains.CpsUserMenuVO;
import com.edwards.domains.ENAC100VO;
import com.edwards.domains.SysAttachFileVO;
import com.edwards.domains.SysMenuVO;
import com.edwards.domains.SysNoticeVO;
import com.edwards.domains.UserMenuAuthVO;
import com.jayway.jsonpath.JsonPath;

import org.apache.commons.lang3.math.NumberUtils;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.io.BufferedInputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = {"/apis/system"}, method = {RequestMethod.POST})
public class SystemController extends CmmnController{
	@Autowired
	private SystemManagementService systemManagementService;
	@Autowired
	private UserManagementService userManagementService;
	@Autowired
	private EdmsManagementService edmsManagementService;
	@Autowired
	private SysAttachFileDao sysAttachFileDao;
	@Autowired
	private ENAC100Dao eNAC100Dao;
	@Autowired
	private CpsUserMenuDao cpsUserMenuDao;
	@Autowired
	private CpsSaveCustomerDao cpsSaveCustomerDao;
	@Autowired
	private CpsSaveTeamDao cpsSaveTeamDao;
	@Autowired
	private CpsAttachFileDao cpsAttachFileDao;
	@Autowired
	private ExcelLogAccessDao excelLogAccessDao;

	@Autowired
	private MessageSource messageSource;
	@Autowired
	private ModelMapper modelMapper;

	@Value("${upload.path.fileUpload}")
	public String fileUploadPath;

	@Value("${upload.path.comp}")
	public String compFileUploadPath;

	@Value("${upload.path.sebfileUpload}")
	public String sebfileUploadPath;

	@Value("${upload.path.item}")
	public String itemUploadPath;

	@RequestMapping(value = "/selectSysMenuList")
	public ResponseEntity<?> selectSysMenuList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))),
				  Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))),
				  CmmnUtils.getOrders(args, new Sort(Sort.Direction.DESC, "useYn")));
			List<Map> list = systemManagementService.selectSysMenuList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectSysNoticeList")
	public ResponseEntity<?> selectSysNoticeList(HttpServletRequest request, @RequestBody Map args){
		try{
			PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))),
				  Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))),
				  CmmnUtils.getOrders(args, new Sort(Sort.Direction.DESC, "useYn")));
			List<SysNoticeVO> list = systemManagementService.selectSysNoticeList(args, pageRequest);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectSysFileList")
	public ResponseEntity<?> selectSysFileList(HttpServletRequest request, @RequestBody Map args){
	    try{
	    	PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))),
				  Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))),
				  CmmnUtils.getOrders(args, new Sort(Sort.Direction.DESC, "useYn")));
	    	List<SysAttachFileVO> list = systemManagementService.selectSysFileList(args, pageRequest);
	    	List<?> result = list.stream().collect(Collectors.toList());
	    	return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = {"/selectENAC100List"})
	public ResponseEntity<?> selectENAC100List(HttpServletRequest request, @RequestBody Map args){
		try{
	    	List<ENAC100VO> list = systemManagementService.selectENAC100List(args);
	    	List<?> result = list.stream().collect(Collectors.toList());
	    	return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/downloadFile", method = {RequestMethod.GET})
	public void downloadEdmsFile(HttpServletRequest request, @RequestParam(value = "fileKey") BigDecimal fileKey,
								   HttpServletResponse response) throws UnsupportedEncodingException{

		String downloadFileName, reqFilePath = null, reqFileName = null;

		try{
			SysAttachFileVO isSysAttachFileVO = sysAttachFileDao.findOne(fileKey);
			reqFilePath = isSysAttachFileVO.getFilePath();
			reqFileName = isSysAttachFileVO.getSaveFileName();

			downloadFileName = isSysAttachFileVO.getOriginalFileName();
			downloadFileName = CmmnFileUtils.convertEncodeFileName(downloadFileName);

			File fileToDownload = new File(reqFilePath + reqFileName);
			InputStream inputStream = new FileInputStream(fileToDownload);
			response.setContentType("application/force-download");
			response.setHeader("Content-Disposition", "attachment; filename=\"" + downloadFileName + "\";");
			IOUtils.copy(inputStream, response.getOutputStream());
			response.flushBuffer();
			inputStream.close();
		}catch(Exception e){
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "/downloadENAC100", method = {RequestMethod.GET})
	public void downloadENAC100(HttpServletRequest request, @RequestParam(value = "ENACKey") BigDecimal ENACKey,
								   HttpServletResponse response) throws UnsupportedEncodingException{

		String downloadFileName, reqFilePath = null, reqFileName = null;
		File fileToDownload = null;
		HttpURLConnection httpCon = null;

		try{
			ENAC100VO isENAC100VO = eNAC100Dao.findOne(ENACKey);
			reqFilePath = isENAC100VO.getFilePath();
//			reqFileName = CmmnFileUtils.convertEncodeFileName(isENAC100VO.getSaveFileNm());
			reqFileName = CmmnFileUtils.convertEncodeFileName(isENAC100VO.getSaveFileNm()).replaceAll(" ", "%20");

			downloadFileName = isENAC100VO.getOriginFileNm();
			downloadFileName = CmmnFileUtils.convertEncodeFileName(downloadFileName);

			if(reqFilePath.substring(0, 31).equals("\\\\122.99.247.9\\Web\\seincustoms\\")){
				String path = reqFilePath.substring(31);
				if(path.substring(0, 7).equals("hs_file")){
					String[] array = path.split("\\\\");
					String UrlFile = "http://122.99.247.9:8080/share.cgi?ssid=0FtDmZv&fid=0FtDmZv&path=%2F"+array[0]+"%2F"+array[1]+"%2F"+array[2]+"&filename="+reqFileName+"&openfolder=forcedownload&ep=";
					URL url = new URL(UrlFile);
					httpCon = (HttpURLConnection) url.openConnection();
					httpCon.addRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:25.0) Gecko/20100101 Firefox/25.0");
					httpCon.setRequestProperty("Cache-Control", "no-cache");
					httpCon.setReadTimeout(5000);
					httpCon.setConnectTimeout(5000);
				}else{					
					String[] array = path.split("\\\\");
					String UrlFile = "http://122.99.247.9:8080/share.cgi?ssid=0FtDmZv&fid=0FtDmZv&path=%2F"+array[0]+"%2F"+array[1]+"&filename="+reqFileName+"&openfolder=forcedownload&ep=";
					URL url = new URL(UrlFile);
					httpCon = (HttpURLConnection) url.openConnection();
					httpCon.addRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:25.0) Gecko/20100101 Firefox/25.0");
					httpCon.setRequestProperty("Cache-Control", "no-cache");
					httpCon.setReadTimeout(5000);
					httpCon.setConnectTimeout(5000);
				}
			}
			InputStream inputStream = new BufferedInputStream( httpCon.getInputStream() );
			response.setContentType("application/force-download");
			response.setHeader("Content-Disposition", "attachment; filename=\"" + downloadFileName + "\";");
			IOUtils.copy(inputStream, response.getOutputStream());
			response.flushBuffer();
			inputStream.close();
		}catch(Exception e){
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "/selectSaveCustomerList")
	public ResponseEntity<?> selectSaveCustomerList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))),
				  Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))),
				  CmmnUtils.getOrders(args, new Sort(Sort.Direction.DESC, "useYn")));
			List<CpsSaveCustomerVO> list = systemManagementService.selectSaveCustomerList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/addSysMenuList")
	public ResponseEntity<?> addSysMenuList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))),
				  Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))),
				  CmmnUtils.getOrders(args, new Sort(Sort.Direction.DESC, "useYn")));
			List<Map> list = systemManagementService.addSysMenuList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/insertUserMenuList")
	public ResponseEntity<?> insertUserMenuList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map<String, Object>> mapList = CmmnUtils.convertMapSourceToList(args, "userMenuList");
			List<CpsUserMenuVO> voList = CmmnUtils.convertMapListToBean(mapList, CpsUserMenuVO.class);

			List<CpsUserMenuVO> returnVoList = systemManagementService.insertUserMenuList(voList, request);
			return new ResponseEntity<>(returnVoList, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/updateUserMenuList")
	public ResponseEntity<?> updateUserMenuList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			BigDecimal userMenuKey 		= NumberUtils.createBigDecimal(String.valueOf(args.get("userMenuKey")));
			String userId 				= String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String currentDatetime 		= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

			List<CpsUserMenuVO> voList;
			Map map = new HashMap();
			map.put("userMenuKey", userMenuKey);
			voList = systemManagementService.selectCpsUserMenuList(map);

			CpsUserMenuVO CpsUserMenuVO = voList.get(0);
			CpsUserMenuVO.setEditUserKey(userId);
			CpsUserMenuVO.setEditDtm(currentDatetime);
			CpsUserMenuVO.setUseYn("N");

			CpsUserMenuVO returnVoList = cpsUserMenuDao.save(CpsUserMenuVO);
			return new ResponseEntity<>(returnVoList, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/insertBasicUserMenuList")
	public ResponseEntity<?> insertBasicUserMenuList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<CpsUserMenuVO> menuList;
			String userKey 	= args.containsKey("userKey") ? String.valueOf(args.get("userKey")) : "";
			Map map = new HashMap();
			map.put("userKey", userKey);
			menuList = systemManagementService.selectCpsUserMenuList(map);

			if(menuList.size() > 1){
				return new ResponseEntity<>("등록데이터가 있습니다.", HttpStatus.BAD_REQUEST);
			}else{
				List<Map> mapList = systemManagementService.addBasicSysMenuList(args);
				List<CpsUserMenuVO> voList = new ArrayList<>();
				for (int i = 0, n = mapList.size(); i < n; i++) {
					CpsUserMenuVO vo = modelMapper.map(mapList.get(i), CpsUserMenuVO.class);
					vo.setUserKey(userKey);
					vo.setUseYn("Y");
					voList.add(vo);
				}

				List<CpsUserMenuVO> returnVoList = systemManagementService.insertUserMenuList(voList, request);
				return new ResponseEntity<>(returnVoList, HttpStatus.OK);
			}
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/insertTestUserMenuList")
	public ResponseEntity<?> insertTestUserMenuList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<CpsUserMenuVO> menuList;
			String userKey 	= args.containsKey("userKey") ? String.valueOf(args.get("userKey")) : "";
			Map map = new HashMap();
			map.put("userKey", userKey);
			map.put("useYn", "Y");
			menuList = systemManagementService.selectCpsUserMenuList(map);

			if(menuList.size() > 1){
				return new ResponseEntity<>("등록데이터가 있습니다.", HttpStatus.BAD_REQUEST);
			}else{
				List<Map> mapList = systemManagementService.addTestSysMenuList(args);
				List<CpsUserMenuVO> voList = new ArrayList<>();
				for (int i = 0, n = mapList.size(); i < n; i++) {
					CpsUserMenuVO vo = modelMapper.map(mapList.get(i), CpsUserMenuVO.class);
					vo.setUserKey(userKey);
					vo.setUseYn("Y");
					voList.add(vo);
				}

				List<CpsUserMenuVO> returnVoList = systemManagementService.insertUserMenuList(voList, request);
				return new ResponseEntity<>(returnVoList, HttpStatus.OK);
			}
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}


	@RequestMapping(value = "/insertSaveCustomerList")
	public ResponseEntity<?> insertSaveCustomerList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map<String, Object>> mapList = CmmnUtils.convertMapSourceToList(args, "saveCustomerList");
			List<CpsSaveCustomerVO> voList = CmmnUtils.convertMapListToBean(mapList, CpsSaveCustomerVO.class);

			List<CpsSaveCustomerVO> returnVoList = systemManagementService.insertSaveCustomerList(voList, request);
			return new ResponseEntity<>(returnVoList, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/updateSaveCustomerList")
	public ResponseEntity<?> updateSaveCustomerList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			BigDecimal scKey 		= NumberUtils.createBigDecimal(String.valueOf(args.get("scKey")));
			String userId 			= String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

			List<CpsSaveCustomerVO> voList;
			Map map = new HashMap();
			map.put("scKey", scKey);
			voList = systemManagementService.selectSaveCustomerList(map);

			CpsSaveCustomerVO CpsSaveCustomerVO = voList.get(0);
			CpsSaveCustomerVO.setAddUserKey(userId);
			CpsSaveCustomerVO.setAddDtm(currentDatetime);
			CpsSaveCustomerVO.setUseYn("N");

			CpsSaveCustomerVO returnVoList = cpsSaveCustomerDao.save(CpsSaveCustomerVO);
			return new ResponseEntity<>(returnVoList, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectCustomerList")
	public ResponseEntity<?> selectCustomerList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))),
				  Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))),
				  CmmnUtils.getOrders(args, new Sort(Sort.Direction.DESC, "useYn")));
			List<Map> list = systemManagementService.selectCustomerList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/insertSaveTeamList")
	public ResponseEntity<?> insertSaveTeamList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map<String, Object>> mapList = CmmnUtils.convertMapSourceToList(args, "saveTeamList");
			List<CpsSaveTeamVO> voList = CmmnUtils.convertMapListToBean(mapList, CpsSaveTeamVO.class);

			List<CpsSaveTeamVO> returnVoList = systemManagementService.insertSaveTeamList(voList, request);
			return new ResponseEntity<>(returnVoList, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectSaveTeamList")
	public ResponseEntity<?> selectSaveTeamList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))),
				  Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))),
				  CmmnUtils.getOrders(args, new Sort(Sort.Direction.DESC, "useYn")));
			List<CpsSaveTeamVO> list = systemManagementService.selectSaveTeamList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/updateSaveTeamList")
	public ResponseEntity<?> updateSaveTeamList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			BigDecimal stKey 		= NumberUtils.createBigDecimal(String.valueOf(args.get("stKey")));
			String userId 			= String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

			List<CpsSaveTeamVO> voList;
			Map map = new HashMap();
			map.put("stKey", stKey);
			voList = systemManagementService.selectSaveTeamList(map);

			CpsSaveTeamVO CpsSaveTeamVO = voList.get(0);
			CpsSaveTeamVO.setEditUserKey(userId);
			CpsSaveTeamVO.setEditDtm(currentDatetime);
			CpsSaveTeamVO.setUseYn("N");

			CpsSaveTeamVO returnVoList = cpsSaveTeamDao.save(CpsSaveTeamVO);
			return new ResponseEntity<>(returnVoList, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectTeamList")
	public ResponseEntity<?> selectTeamList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))),
				  Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))),
				  CmmnUtils.getOrders(args, new Sort(Sort.Direction.DESC, "useYn")));
			List<CpsTeamVO> list = systemManagementService.selectTeamList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectCustomerAllList")
	public ResponseEntity<?> selectCustomerAllList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			List<Map> list = systemManagementService.selectCustomerAllList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveSysNoticeList")
	public ResponseEntity<?> saveSysNoticeList(HttpServletRequest request, @RequestBody Map args){
	    if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	    	return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map<String, Object>> mapList = CmmnUtils.convertMapSourceToList(args, "sysNoticeList");
			List<SysNoticeVO> voList = CmmnUtils.convertMapListToBean(mapList, SysNoticeVO.class);

			List<SysNoticeVO> returnVoList = systemManagementService.saveSysNoticeList(voList, request);
			return new ResponseEntity<>(returnVoList, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/deleteSysFile")
	public ResponseEntity<?> deleteSysFile(HttpServletRequest request, @RequestBody Map args) throws Exception {
		if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		String result = "";
		BigDecimal fileKey = NumberUtils.createBigDecimal(String.valueOf(args.get("fileKey")));

		SysAttachFileVO isSysAttachFileVO = sysAttachFileDao.findOne(fileKey);

		File file = new File(isSysAttachFileVO.getFilePath() + isSysAttachFileVO.getSaveFileName());
		if(file.isFile()){
			isSysAttachFileVO.setUseYn("N");
			isSysAttachFileVO.setEditUserId(String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID)));
			sysAttachFileDao.save(isSysAttachFileVO);

			// 파일 삭제
			String uploadPath = isSysAttachFileVO.getFilePath();
			result = CmmnFileUtils.deletePath(uploadPath, isSysAttachFileVO.getSaveFileName());
			if(!"".equals(result)) {
				return new ResponseEntity<>(isSysAttachFileVO, HttpStatus.OK);
			}else{
				result = "fail";
				return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
			}
		}else{
			result = "fail";
			return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/deleteENAC100")
	public ResponseEntity<?> deleteENAC100(HttpServletRequest request, @RequestBody Map args) throws Exception {
		if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		String result = "";
		BigDecimal ENACKey = NumberUtils.createBigDecimal(String.valueOf(args.get("ENACKey")));
		String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

		ENAC100VO isENAC100VO = eNAC100Dao.findOne(ENACKey);

//		File file = new File(isENAC100VO.getFilePath() + isENAC100VO.getSaveFileNm());
//		if(file.isFile()){
			isENAC100VO.setUseYn("N");
			isENAC100VO.setEditUserKey(String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID)));
			isENAC100VO.setEditUserNm(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
			isENAC100VO.setEditDtm(currentDatetime);
			eNAC100Dao.save(isENAC100VO);

			// 파일 삭제
//			String uploadPath = isENAC100VO.getFilePath();
//			result = CmmnFileUtils.deletePath(uploadPath, isENAC100VO.getSaveFileNm());
//			if(!"".equals(result)) {
				return new ResponseEntity<>(isENAC100VO, HttpStatus.OK);
//			}else{
//				result = "fail";
//				return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
//			}
//		}else{
//			result = "fail";
//			return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
//		}
	}

	@RequestMapping(value = "/uploadNoticeFile")
	public ResponseEntity<?> uploadNoticeFile(MultipartHttpServletRequest multipartHttpServletRequest, HttpServletRequest request) throws Exception{
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		if (CmmnUtils.isNull(multipartHttpServletRequest.getParameter("noticesKey")))
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

		SysAttachFileVO returnVO = new SysAttachFileVO();
		String currentDay = CmmnUtils.getFormatedDate("yyyyMMdd");
		String settingUploadPath = fileUploadPath;

		MultiValueMap<String, MultipartFile> multiFileMap = multipartHttpServletRequest.getMultiFileMap();

		if(CmmnUtils.isNull(currentDay) || CmmnUtils.isNull(settingUploadPath) || CmmnUtils.isNull(multiFileMap)){
			Object[] parameter = {CmmnConstants.ECODE_FAILURE, "파일 업로드 에러", ""};
			throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
		}
		String uploadPath = settingUploadPath + currentDay + File.separator; // 파일path
		File dir = new File(uploadPath);
		if(!dir.isDirectory()){
			dir.mkdirs();
		}

		Iterator<String> iterator = multiFileMap.keySet().iterator();
		while (iterator.hasNext()){
			String str = iterator.next();
			List<MultipartFile> fileList = multiFileMap.get(str);
			for(MultipartFile mpf : fileList){
				String originalFileName = CmmnFileUtils.convertOriginalFileName(mpf.getOriginalFilename());
				BigDecimal fileSize = new BigDecimal(mpf.getSize());
				//String saveFileName = originalFileName;
				String saveFileName = originalFileName.substring(0, originalFileName.lastIndexOf("."));
				String body = "", ext = "";
				long sysTime = System.currentTimeMillis();

				Date date = new Date(sysTime);
				SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
				String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
				String today = dateFormat.format(date);

				if(saveFileName != null && !saveFileName.equals("")){
					if(new File(uploadPath + saveFileName).exists()){
						int dot = saveFileName.lastIndexOf(".");
						if(dot != -1){
							body = saveFileName.substring(0, dot);
							ext = saveFileName.substring(dot); // includes "."
							if(!CmmnFileUtils.isExtensionCheck(ext.substring(1))){
								return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
							}
							saveFileName = body + "_" + today + "_" + sysTime + ext;
						}else{
							saveFileName = saveFileName + "_" + today + "_" + sysTime;
						}
					}

					mpf.transferTo(new File(uploadPath + saveFileName));

					SysAttachFileVO sysAttachFileVO = new SysAttachFileVO();
					// 파일정보
					sysAttachFileVO.setOriginalFileName(originalFileName);
					sysAttachFileVO.setSaveFileName(saveFileName);
					sysAttachFileVO.setFilePath(uploadPath);
					sysAttachFileVO.setFileSize(fileSize);
					sysAttachFileVO.setFileExt((originalFileName.lastIndexOf(".") == -1) ? "" : originalFileName.substring(originalFileName.lastIndexOf(".") + 1, originalFileName.length()));
					sysAttachFileVO.setUseYn("Y");
					/*추가함*/
					sysAttachFileVO.setNoticeKey(NumberUtils.createBigDecimal(String.valueOf(multipartHttpServletRequest.getParameter("noticesKey"))));
					sysAttachFileVO.setServerGubun(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_SERVER_GUBUN)));
					sysAttachFileVO.setServerIp(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_SERVER_IP)));
					sysAttachFileVO.setAddUserId(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)));
					sysAttachFileVO.setAddDate(new Date());
					sysAttachFileVO.setEditUserId(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)));

					returnVO = saveAttachFile(sysAttachFileVO, request);
				}
			}
		}
		return new ResponseEntity<>(returnVO, HttpStatus.OK);
	}

	@RequestMapping(value = "/uploadENAC100All")
	public ResponseEntity<?> uploadENAC100All(MultipartHttpServletRequest multipartHttpServletRequest, HttpServletRequest request) throws Exception{
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		ENAC100VO returnVO 			= new ENAC100VO();
		String currentDay 			= CmmnUtils.getFormatedDate("yyyyMMdd");
		String settingUploadPath 	= "";

		if (multipartHttpServletRequest.getParameter("path").equals("item")){
			settingUploadPath = itemUploadPath;
		}

		MultiValueMap<String, MultipartFile> multiFileMap = multipartHttpServletRequest.getMultiFileMap();

		if(CmmnUtils.isNull(currentDay) || CmmnUtils.isNull(settingUploadPath) || CmmnUtils.isNull(multiFileMap)){
			Object[] parameter = {CmmnConstants.ECODE_FAILURE, "파일 업로드 에러", ""};
			throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
		}
		String uploadPath = settingUploadPath + currentDay + File.separator; // 파일path
		File dir = new File(uploadPath);
		if(!dir.isDirectory()){
			dir.mkdirs();
		}

		Iterator<String> iterator = multiFileMap.keySet().iterator();
		while (iterator.hasNext()){
			String str = iterator.next();
			List<MultipartFile> fileList = multiFileMap.get(str);
			for(MultipartFile mpf : fileList){
				String originalFileName = CmmnFileUtils.convertOriginalFileName(mpf.getOriginalFilename());
				BigDecimal fileSize = new BigDecimal(mpf.getSize());
				//String saveFileName = originalFileName;
				String saveFileName = originalFileName.substring(0, originalFileName.lastIndexOf("."));
				String body = "", ext = "";
				long sysTime = System.currentTimeMillis();

				Date date = new Date(sysTime);
				SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
				String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
				String today = dateFormat.format(date);

				if(saveFileName != null && !saveFileName.equals("")){
					if(new File(uploadPath + saveFileName).exists()){
						int dot = saveFileName.lastIndexOf(".");
						if(dot != -1){
							body = saveFileName.substring(0, dot);
							ext = saveFileName.substring(dot); // includes "."
							if(!CmmnFileUtils.isExtensionCheck(ext.substring(1))){
								return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
							}
							saveFileName = body + "_" + today + "_" + sysTime + ext;
						}else{
							saveFileName = saveFileName + "_" + today + "_" + sysTime;
						}
					}

					mpf.transferTo(new File(uploadPath + saveFileName));

					ENAC100VO eNAC100VO = new ENAC100VO();
					// 파일정보
					eNAC100VO.setFKeyMngNo(String.valueOf(multipartHttpServletRequest.getParameter("FKeyMngNo")));
					eNAC100VO.setFTableNm(String.valueOf(multipartHttpServletRequest.getParameter("FTableNm")));
					eNAC100VO.setGbn(String.valueOf(multipartHttpServletRequest.getParameter("Gbn")));
					eNAC100VO.setFileTitle(String.valueOf(multipartHttpServletRequest.getParameter("FileTitle")));
					eNAC100VO.setFileNm(originalFileName);
					eNAC100VO.setOriginFileNm(originalFileName);
					eNAC100VO.setSaveFileNm(saveFileName);
					eNAC100VO.setFilePath(uploadPath);
					eNAC100VO.setFileSize(fileSize.toString());
					eNAC100VO.setFileExt((originalFileName.lastIndexOf(".") == -1) ? "" : originalFileName.substring(originalFileName.lastIndexOf(".") + 1, originalFileName.length()));
					eNAC100VO.setUseYn("Y");
					/*추가함*/
					eNAC100VO.setFKey(NumberUtils.createBigDecimal(String.valueOf(multipartHttpServletRequest.getParameter("FKey"))));
					eNAC100VO.setAddIp(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_SERVER_IP)));
					eNAC100VO.setAddUserKey(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)));
					eNAC100VO.setAddUserNm(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
					eNAC100VO.setAddDtm(currentDatetime);
					eNAC100VO.setEditUserId(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)));

					returnVO = saveENAC100(eNAC100VO, request);
				}
			}
		}
		return new ResponseEntity<>(returnVO, HttpStatus.OK);
	}

	@RequestMapping(value = "/uploadENAC100")
	public ResponseEntity<?> uploadENAC100(MultipartHttpServletRequest multipartHttpServletRequest, HttpServletRequest request) throws Exception{
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		if (CmmnUtils.isNull(multipartHttpServletRequest.getParameter("NTAAKey")))
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

		ENAC100VO returnVO = new ENAC100VO();
		String currentDay = CmmnUtils.getFormatedDate("yyyyMMdd");
		String settingUploadPath = fileUploadPath;

		MultiValueMap<String, MultipartFile> multiFileMap = multipartHttpServletRequest.getMultiFileMap();

		if(CmmnUtils.isNull(currentDay) || CmmnUtils.isNull(settingUploadPath) || CmmnUtils.isNull(multiFileMap)){
			Object[] parameter = {CmmnConstants.ECODE_FAILURE, "파일 업로드 에러", ""};
			throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
		}
		String uploadPath = settingUploadPath + currentDay + File.separator; // 파일path
		File dir = new File(uploadPath);
		if(!dir.isDirectory()){
			dir.mkdirs();
		}

		Iterator<String> iterator = multiFileMap.keySet().iterator();
		while (iterator.hasNext()){
			String str = iterator.next();
			List<MultipartFile> fileList = multiFileMap.get(str);
			for(MultipartFile mpf : fileList){
				String originalFileName = CmmnFileUtils.convertOriginalFileName(mpf.getOriginalFilename());
				BigDecimal fileSize = new BigDecimal(mpf.getSize());
				//String saveFileName = originalFileName;
				String saveFileName = originalFileName.substring(0, originalFileName.lastIndexOf("."));
				String body = "", ext = "";
				long sysTime = System.currentTimeMillis();

				Date date = new Date(sysTime);
				SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
				String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
				String today = dateFormat.format(date);

				if(saveFileName != null && !saveFileName.equals("")){
					if(new File(uploadPath + saveFileName).exists()){
						int dot = saveFileName.lastIndexOf(".");
						if(dot != -1){
							body = saveFileName.substring(0, dot);
							ext = saveFileName.substring(dot); // includes "."
							if(!CmmnFileUtils.isExtensionCheck(ext.substring(1))){
								return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
							}
							saveFileName = body + "_" + today + "_" + sysTime + ext;
						}else{
							saveFileName = saveFileName + "_" + today + "_" + sysTime;
						}
					}

					mpf.transferTo(new File(uploadPath + saveFileName));

					ENAC100VO eNAC100VO = new ENAC100VO();
					// 파일정보
					eNAC100VO.setFTableNm("NTAA100");
					eNAC100VO.setGbn("F");
					eNAC100VO.setFileTitle("NTAA100File");
					eNAC100VO.setFileNm(originalFileName);
					eNAC100VO.setOriginFileNm(originalFileName);
					eNAC100VO.setSaveFileNm(saveFileName);
					eNAC100VO.setFilePath(uploadPath);
					eNAC100VO.setFileSize(fileSize.toString());
					eNAC100VO.setFileExt((originalFileName.lastIndexOf(".") == -1) ? "" : originalFileName.substring(originalFileName.lastIndexOf(".") + 1, originalFileName.length()));
					eNAC100VO.setUseYn("Y");
					/*추가함*/
					eNAC100VO.setFKey(NumberUtils.createBigDecimal(String.valueOf(multipartHttpServletRequest.getParameter("NTAAKey"))));
					eNAC100VO.setAddIp(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_SERVER_IP)));
					eNAC100VO.setAddUserKey(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)));
					eNAC100VO.setAddUserNm(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
					eNAC100VO.setAddDtm(currentDatetime);
					eNAC100VO.setEditUserId(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)));

					returnVO = saveENAC100(eNAC100VO, request);
				}
			}
		}
		return new ResponseEntity<>(returnVO, HttpStatus.OK);
	}

	private ENAC100VO saveENAC100(ENAC100VO eNAC100VO, HttpServletRequest request) throws Exception {
		ENAC100VO returnVO = systemManagementService.saveENAC100(eNAC100VO);

		return returnVO;
	}

	@RequestMapping(value = "/uploadFile")
	public ResponseEntity<?> uploadFile(MultipartHttpServletRequest multipartHttpServletRequest, HttpServletRequest request) throws Exception{
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		if (CmmnUtils.isNull(multipartHttpServletRequest.getParameter("masterKey")))
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

		CpsAttachFileVO returnVO = new CpsAttachFileVO();
		String currentDay = CmmnUtils.getFormatedDate("yyyyMMdd");
		String settingUploadPath = compFileUploadPath;

		MultiValueMap<String, MultipartFile> multiFileMap = multipartHttpServletRequest.getMultiFileMap();

		if(CmmnUtils.isNull(currentDay) || CmmnUtils.isNull(settingUploadPath) || CmmnUtils.isNull(multiFileMap)){
			Object[] parameter = {CmmnConstants.ECODE_FAILURE, "파일 업로드 에러", ""};
			throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
		}
		String uploadPath = settingUploadPath + currentDay + File.separator; // 파일path
		File dir = new File(uploadPath);
		if(!dir.isDirectory()){
			dir.mkdirs();
		}

		Iterator<String> iterator = multiFileMap.keySet().iterator();
		while (iterator.hasNext()){
			String str = iterator.next();
			List<MultipartFile> fileList = multiFileMap.get(str);
			for(MultipartFile mpf : fileList){
				String originalFileName = CmmnFileUtils.convertOriginalFileName(mpf.getOriginalFilename());
				BigDecimal fileSize = new BigDecimal(mpf.getSize());
				String saveFileName = originalFileName.substring(0, originalFileName.lastIndexOf("."));
				String body = "", ext = "";
				long sysTime = System.currentTimeMillis();

				Date date = new Date(sysTime);
				SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
				String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
				String today = dateFormat.format(date);

				if(saveFileName != null && !saveFileName.equals("")){
					if(new File(uploadPath + saveFileName).exists()){
						int dot = saveFileName.lastIndexOf(".");
						if(dot != -1){
							body = saveFileName.substring(0, dot);
							ext = saveFileName.substring(dot); // includes "."
							if(!CmmnFileUtils.isExtensionCheck(ext.substring(1))){
								return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
							}
							saveFileName = body + "_" + today + "_" + sysTime + ext;
						}else{
							saveFileName = saveFileName + "_" + today + "_" + sysTime;
						}
					}

					mpf.transferTo(new File(uploadPath + saveFileName));

					CpsAttachFileVO cpsAttachFileVO = new CpsAttachFileVO();
					// 파일정보
					cpsAttachFileVO.setOrgFileName(originalFileName);
					cpsAttachFileVO.setSaveFileName(saveFileName);
					cpsAttachFileVO.setFilePath(uploadPath);
					cpsAttachFileVO.setFileSize(fileSize);
					cpsAttachFileVO.setFileExt((originalFileName.lastIndexOf(".") == -1) ? "" : originalFileName.substring(originalFileName.lastIndexOf(".") + 1, originalFileName.length()));
					cpsAttachFileVO.setUseYn("Y");
					/*추가함*/
					cpsAttachFileVO.setGubun(String.valueOf(multipartHttpServletRequest.getParameter("gubun")));
					cpsAttachFileVO.setMasterKey(String.valueOf(multipartHttpServletRequest.getParameter("masterKey")));
					cpsAttachFileVO.setServerGubun(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_SERVER_GUBUN)));
					cpsAttachFileVO.setServerIp(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_SERVER_IP)));
					cpsAttachFileVO.setAddUserId(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)));
					cpsAttachFileVO.setAddUserNm(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
					cpsAttachFileVO.setAddDtm(currentDatetime);
					cpsAttachFileVO.setEditUserId(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)));
					cpsAttachFileVO.setEditUserNm(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
					cpsAttachFileVO.setEditDtm(currentDatetime);

					returnVO = saveFile(cpsAttachFileVO, request);
				}
			}
		}
		return new ResponseEntity<>(returnVO, HttpStatus.OK);
	}

	private CpsAttachFileVO saveFile(CpsAttachFileVO cpsAttachFileVO, HttpServletRequest request) throws Exception {
		CpsAttachFileVO returnVO = systemManagementService.saveFile(cpsAttachFileVO);

		return returnVO;
	}

	@RequestMapping(value = "/selectFileList")
	public ResponseEntity<?> selectFileList(HttpServletRequest request, @RequestBody Map args){
	    try{
	    	List<CpsAttachFileVO> list = systemManagementService.selectFileList(args);
	    	List<?> result = list.stream().collect(Collectors.toList());
	    	return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectFileEdmsList")
	public ResponseEntity<?> selectFileEdmsList(HttpServletRequest request, @RequestBody Map args){
	    try{
	    	List<?> result;
	    	List<?> result1;

	    	List<CpsAttachFileVO> list = systemManagementService.selectFileList(args);
	    	List<CpsEdmsAttachFileVO> list1 = edmsManagementService.selectEdmsFileList(args);
	    	result  = list.stream().collect(Collectors.toList());
	    	result1 = list1.stream().collect(Collectors.toList());
	    	return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/downFile", method = {RequestMethod.GET})
	public void downFile(HttpServletRequest request, @RequestParam(value = "fileKey") BigDecimal fileKey,
								   HttpServletResponse response) throws UnsupportedEncodingException{

		String downloadFileName, reqFilePath = null, reqFileName = null;

		try{
			CpsAttachFileVO isSysAttachFileVO = cpsAttachFileDao.findOne(fileKey);
			reqFilePath = isSysAttachFileVO.getFilePath();
			reqFileName = isSysAttachFileVO.getSaveFileName();

			downloadFileName = isSysAttachFileVO.getOrgFileName();
			downloadFileName = CmmnFileUtils.convertEncodeFileName(downloadFileName);

			File fileToDownload = new File(reqFilePath + reqFileName);
			InputStream inputStream = new FileInputStream(fileToDownload);
			response.setContentType("application/force-download");
			response.setHeader("Content-Disposition", "attachment; filename=\"" + downloadFileName + "\";");
			IOUtils.copy(inputStream, response.getOutputStream());
			response.flushBuffer();
			inputStream.close();
		}catch(Exception e){
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "/deleteFile")
	public ResponseEntity<?> deleteFile(HttpServletRequest request, @RequestBody Map args) throws Exception {
		if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		String result = "";
		BigDecimal fileKey = NumberUtils.createBigDecimal(String.valueOf(args.get("fileKey")));
		String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

		CpsAttachFileVO isAttachFileVO = cpsAttachFileDao.findOne(fileKey);

		File file = new File(isAttachFileVO.getFilePath() + isAttachFileVO.getSaveFileName());
		if(file.isFile()){
			isAttachFileVO.setUseYn("N");
			isAttachFileVO.setEditUserId(String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID)));
			isAttachFileVO.setEditUserNm(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
			isAttachFileVO.setEditDtm(currentDatetime);
			cpsAttachFileDao.save(isAttachFileVO);

			// 파일 삭제
			String uploadPath = isAttachFileVO.getFilePath();
			result = CmmnFileUtils.deletePath(uploadPath, isAttachFileVO.getSaveFileName());
			if(!"".equals(result)) {
				return new ResponseEntity<>(isAttachFileVO, HttpStatus.OK);
			}else{
				result = "fail";
				return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
			}
		}else{
			result = "fail";
			return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/excelLogAccess")
	public ResponseEntity<?> excelLogAccess(HttpServletRequest request, @RequestBody Map args) throws Exception {
		if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		String userId 			= String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
		String clientIpAddr 	= CmmnUtils.getClientIpAddr(request);
		String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
		String gubun 			= args.containsKey("gubun") ? String.valueOf(args.get("gubun")).trim() : "";
		String fromDate 		= args.containsKey("fromDate") ? String.valueOf(args.get("fromDate")).trim() : "";
		String toDate 			= args.containsKey("toDate") ? String.valueOf(args.get("toDate")).trim() : "";

		try{
			CpsExcelLogAccessVO voResult;
			CpsExcelLogAccessVO exlogAccessVO = new CpsExcelLogAccessVO();
			exlogAccessVO.setGubun(gubun);
			exlogAccessVO.setClientIp(clientIpAddr);
			exlogAccessVO.setFromDate(fromDate);
			exlogAccessVO.setToDate(toDate);
			exlogAccessVO.setAddUserKey(userId);
			exlogAccessVO.setAddDtm(currentDatetime);
			voResult = excelLogAccessDao.save(exlogAccessVO);
			return new ResponseEntity<>(voResult, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectCustomer")
	public ResponseEntity<?> selectCustomer(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = systemManagementService.selectCustomer(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectCustomerList1")
	public ResponseEntity<?> selectCustomerList1(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))),
				  Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))),
				  CmmnUtils.getOrders(args, new Sort(Sort.Direction.DESC, "useYn")));
			List<Map> list = new ArrayList<>();
			for (int i = 0, n = 2; i < n; i++) {
				if(i==0){
					args.put("_defaultDB","ncustoms_bs");
					list.addAll(systemManagementService.selectCustomerList(args));
				}else{
					args.put("_defaultDB","ncustoms_cw");
					list.addAll(systemManagementService.selectCustomerList(args));
				}
			}
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = {"/selectLawList"})
	public ResponseEntity<?> selectLawList(HttpServletRequest request, @RequestBody Map args) throws Exception{
		try{
			String searchCondition 	= CmmnUtils.isContainsMapValue(args, "searchCondition") ? String.valueOf(args.get("searchCondition")) : ""; // HS기본_검색조건
			String isFilter 		= CmmnUtils.isContainsMapValue(args, "isFilter") ? String.valueOf(args.get("isFilter")) : "N"; 				// 필터링
			String totCnt 			= CmmnUtils.isContainsMapValue(args, "totCnt") ? String.valueOf(args.get("totCnt")) : "50"; 				// display 수

			if(CmmnUtils.isNull(searchCondition)){
				Object[] parameter = {CmmnConstants.ECODE_FAILURE, "필수검색조건 오류", "검색어"};
				throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
			}

			Map returnMap = new HashMap();
			String jsonStr = (String) CmmnUtils.selectLawAPI(args, "").get("HS_LAW");

			if(isFilter.equalsIgnoreCase("Y")){
				String resultTotalCnt 	= JsonPath.parse(jsonStr).read("$.LawSearch.totalCnt", String.class);
				String resultNumOfRows 	= JsonPath.parse(jsonStr).read("$.LawSearch.numOfRows", String.class);
				System.out.println("resultTotalCnt : "+resultTotalCnt);
				System.out.println("resultNumOfRows : "+resultNumOfRows);
				if(!resultTotalCnt.equals("0") && !resultNumOfRows.equals("0")){
					List<Map> result = JsonPath.parse(jsonStr).read("$.LawSearch.law[?]", CmmnConstants.get법령_법령ID_Filter());
					returnMap.put("HS_LAW", result);
				}
			}else{
				returnMap.put("HS_LAW", jsonStr);
			}
			return new ResponseEntity<>(CmmnUtils.returnContentBody(returnMap), HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = {"/selectContactList"})
	public ResponseEntity<?> selectContactList(HttpServletRequest request, @RequestBody Map args) throws Exception{
		try{
			List<Map> list = systemManagementService.selectContactList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = {"/selectNtaaList"})
	public ResponseEntity<?> selectNtaaList(HttpServletRequest request, @RequestBody Map args) throws Exception{
		try{
			List<Map> list = systemManagementService.selectNtaaList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = {"/selectNtaaListSimple"})
	public ResponseEntity<?> selectNtaaListSimple(HttpServletRequest request, @RequestBody Map args) throws Exception{
		try{
			List<Map> list = systemManagementService.selectNtaaListSimple(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = {"/insertNTAA100"})
	public ResponseEntity<?> insertNTAA100(HttpServletRequest request, @RequestBody Map args) throws Exception{
		try{
			String ID				= String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String userNm			= String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			args.put("ID",ID);
			args.put("userNm",userNm);
			args.put("currentDatetime",currentDatetime);
			long result1 = systemManagementService.insertNTAA100(args);

			Map returnMap = new HashMap();
			args.put("UseYn","X");
			List<Map> list = systemManagementService.selectNtaaList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = {"/updateNTAA100"})
	public ResponseEntity<?> updateNTAA100(HttpServletRequest request, @RequestBody Map args) throws Exception{
		try{
			String ID				= String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String userNm			= String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			args.put("ID",ID);
			args.put("userNm",userNm);
			args.put("currentDatetime",currentDatetime);
			long result = systemManagementService.updateNTAA100(args);
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = {"/selectMonthlyList"})
	public ResponseEntity<?> selectMonthlyList(HttpServletRequest request, @RequestBody Map args) throws Exception{
		try{
			List<Map> list = systemManagementService.selectMonthlyList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = {"/updatePercent"})
	public ResponseEntity<?> updatePercent(HttpServletRequest request, @RequestBody Map args) throws Exception{
		try{
			long result = systemManagementService.updatePercent(args);
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = {"/selectContactMail"})
	public ResponseEntity<?> selectContactMail(HttpServletRequest request, @RequestBody Map args) throws Exception{
		try{
			List<Map> list = systemManagementService.selectContactMail(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

















//  @RequestMapping(value = "/getSysMenuList")
//  public ResponseEntity<?> getSysMenuList(HttpServletRequest request, @RequestBody Map args) {
//	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	try {
//	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))),
//			  Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))),
//			  CmmnUtils.getOrders(args, new Sort(Sort.Direction.DESC, "useYn")));
//	  List<SysMenuVO> list = systemManagementService.getSysMenuList(args, pageRequest);
//	  List<?> result = list.stream().collect(Collectors.toList());
//	  return new ResponseEntity<>(result, HttpStatus.OK);
//	} catch (Exception e) {
//	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//	}
//  }
  /**
   * Gets sys notice one.(단건조회. 조회수 증가)
   *
   * @param request the request
   * @param args    the args
   * @return the sys notice one
   */
  @RequestMapping(value = "/getSysNoticeOne")
  public ResponseEntity<?> getSysNoticeOne(HttpServletRequest request, @RequestBody Map args) {
	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  BigDecimal noticeKey = CmmnUtils.isContainsMapValue(args, "noticeKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("noticeKey"))) : null;
	  if (CmmnUtils.isNull(noticeKey)) {
		CmmnErrorResponse errorResponse = new CmmnErrorResponse();
		errorResponse.setCode(CmmnConstants.ECODE_FAILURE);
		errorResponse.setMessage("key error");
		return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
	  }
	  SysNoticeVO sysNoticeVO = systemManagementService.getSysNoticeOne(noticeKey);
	  return new ResponseEntity<>(sysNoticeVO, HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
  }



  @RequestMapping(value = "/getUserXAuthXMenuList")
  public ResponseEntity<?> getUserXAuthXMenuList(HttpServletRequest request, @RequestBody Map args) {
	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
//	  List<Map> list = systemManagementService.getUserXAuthXMenuList(String.valueOf(args.get("userKey")));
	  List<Map> list = systemManagementService.getUserXAuthXMenuList(args);
	  List<?> result = list.stream().collect(Collectors.toList());
	  return new ResponseEntity<>(result, HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
  }

  @RequestMapping(value = "/getUserMenuAuthList")
  public ResponseEntity<?> getUserMenuAuthList(HttpServletRequest request, @RequestBody Map args) {
	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))),
			  Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))),
			  CmmnUtils.getOrders(args, new Sort(Sort.Direction.DESC, "useYn")));
	  List<UserMenuAuthVO> list = systemManagementService.getUserMenuAuthList(args, pageRequest);
	  List<?> result = list.stream().collect(Collectors.toList());
	  return new ResponseEntity<>(result, HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
  }

  @RequestMapping(value = "/saveUserMenuAuthList")
  public ResponseEntity<?> saveUserMenuAuthList(HttpServletRequest request, @RequestBody Map args) {
	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  List<Map<String, Object>> mapList = CmmnUtils.convertMapSourceToList(args, "userMenuAuthList");
//	  List<UserMenuAuthVO> voList = CmmnUtils.convertMapListToBean(mapList, UserMenuAuthVO.class, UserUserInfoVO.class, "userKey"); // TODO: 2017-03-27 필드명이 동일할 경우는 가능하지만, 아닐경우 대비하여 미사용처리
	  List<UserMenuAuthVO> voList = new ArrayList<>();
	  for (int i = 0, n = mapList.size(); i < n; i++) {
		UserMenuAuthVO vo = modelMapper.map(mapList.get(i), UserMenuAuthVO.class);
		vo.setUserKey(userManagementService.getUserOne(NumberUtils.createBigDecimal(String.valueOf(mapList.get(i).get("userKey")))));
		voList.add(vo);
	  }

	  List<UserMenuAuthVO> returnVoList = systemManagementService.saveUserMenuAuthList(voList, request);
	  return new ResponseEntity<>(returnVoList, HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
  }

  @RequestMapping(value = "/deleteUserInfo")
  public ResponseEntity<?> deleteUserInfo(HttpServletRequest request, @RequestBody Map args) {
	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  if (1 == 1) {
		Object[] parameter = {CmmnConstants.ECODE_FAILURE, "사용자 로그 관리를 이유로 삭제는 금지합니다", ""};
		throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
	  }
	  String userId = args.containsKey("userId") ? String.valueOf(args.get("userId")) : null;
	  if (CmmnUtils.isNull(userId)) throw new Exception("userId 필수사항 입니다");
	  if (CmmnUtils.stringContainsItemFromList(userId, new String[]{"admin", "seinpj"})) throw new Exception(userId + " 은(는) 삭제할 수 없습니다");
	  systemManagementService.callProcDeleteUser(args);
	  return new ResponseEntity<>("삭제 되었습니다", HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
  }

  @RequestMapping(value = "/uploadSurplusFile")
  public ResponseEntity<?> uploadSurplusFile(MultipartHttpServletRequest multipartHttpServletRequest, HttpServletRequest request) throws Exception {
	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID))) {
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
	}

	// 파일정보 validation
	if (CmmnUtils.isNull(multipartHttpServletRequest.getParameter("noticeKey"))) {
	  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}

	Map errMap = new HashMap();
	SysAttachFileVO returnVO = new SysAttachFileVO();
	String currentDay = CmmnUtils.getFormatedDate("yyyyMMdd");
	String settingUploadPath = fileUploadPath;
	MultiValueMap<String, MultipartFile> multiFileMap = multipartHttpServletRequest.getMultiFileMap();
	// 파일정보 validation
	if (CmmnUtils.isNull(currentDay) || CmmnUtils.isNull(settingUploadPath) || CmmnUtils.isNull(multiFileMap)) {
	  Object[] parameter = {CmmnConstants.ECODE_FAILURE, "파일 업로드 에러", ""};
	  throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
	}
	String uploadPath = settingUploadPath + currentDay + File.separator; // 파일path
	File dir = new File(uploadPath);
	if (!dir.isDirectory()) {
	  dir.mkdirs();
	}

	Iterator<String> iterator = multiFileMap.keySet().iterator();
	while (iterator.hasNext()) {
	  String str = iterator.next();
	  List<MultipartFile> fileList = multiFileMap.get(str);
	  for (MultipartFile mpf : fileList) {
		String originalFileName = CmmnFileUtils.convertOriginalFileName(mpf.getOriginalFilename());
		BigDecimal fileSize = new BigDecimal(mpf.getSize());
		//String saveFileName = originalFileName;
		String saveFileName = originalFileName.substring(0, originalFileName.lastIndexOf("."));
		String body = "", ext = "";
		long sysTime = System.currentTimeMillis();

		Date date = new Date(sysTime);
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
		String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
		String today = dateFormat.format(date);

		if (saveFileName != null && !saveFileName.equals("")) {
		  if (new File(uploadPath + saveFileName).exists()) {
			int dot = saveFileName.lastIndexOf(".");
			if (dot != -1) {
			  body = saveFileName.substring(0, dot);
			  ext = saveFileName.substring(dot); // includes "."
			  if (!CmmnFileUtils.isExtensionCheck(ext.substring(1))) {
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			  }
			  saveFileName = body + "_" + today + "_" + sysTime + ext;
			} else {
			  saveFileName = saveFileName + "_" + today + "_" + sysTime;
			}
		  }


		  mpf.transferTo(new File(uploadPath + saveFileName));

		  SysAttachFileVO sysAttachFileVO = new SysAttachFileVO();
		  // 파일정보
		  sysAttachFileVO.setOriginalFileName(originalFileName);
		  sysAttachFileVO.setSaveFileName(saveFileName);
		  sysAttachFileVO.setFilePath(uploadPath);
		  sysAttachFileVO.setFileSize(fileSize);
		  sysAttachFileVO.setFileExt((originalFileName.lastIndexOf(".") == -1) ? "" : originalFileName.substring(originalFileName.lastIndexOf(".") + 1, originalFileName.length()));
		  sysAttachFileVO.setUseYn("Y");
		  /*추가함*/
		  sysAttachFileVO.setNoticeKey(NumberUtils.createBigDecimal(String.valueOf(multipartHttpServletRequest.getParameter("noticeKey"))));
		  sysAttachFileVO.setServerGubun(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_SERVER_GUBUN)));
		  sysAttachFileVO.setServerIp(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_SERVER_IP)));
		  sysAttachFileVO.setAddUserId(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID)));
		  sysAttachFileVO.setEditUserId(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID)));

		  returnVO = saveAttachFile(sysAttachFileVO, request);
		}
	  }
	}

	return new ResponseEntity<>(returnVO, HttpStatus.OK);
  }

  private SysAttachFileVO saveAttachFile(SysAttachFileVO systemAttachFileVO, HttpServletRequest request) throws Exception {
	  SysAttachFileVO returnVO = systemManagementService.saveAttachFile(systemAttachFileVO);

	return returnVO;
  }








}