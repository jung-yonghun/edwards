package com.edwards.web.itemService;

import static com.edwards.commons.CmmnUtils.getUserInfo;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPReply;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.edwards.biz.customsManagement.FtpClient;
import com.edwards.biz.itemMng.*;
import com.edwards.commons.CmmnConstants;
import com.edwards.commons.CmmnController;
import com.edwards.commons.CmmnFileUtils;
import com.edwards.commons.CmmnUtils;
import com.edwards.domains.CDAF100DVO;
import com.edwards.domains.CpsEdmsAttachFileVO;
import com.edwards.domains.CpsSaveCustomerVO;
import com.edwards.domains.ItemAttachFileVO;
import com.edwards.domains.ItemHsMasterVO;
import com.edwards.domains.LogFileVO;
import com.edwards.domains.ResultEtlImportUnitPriceVO;
import com.edwards.domains.SooMst_ItemMasterVO;
import com.edwards.domains.SooMst_SysCodeVO;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.ConstraintViolation;

import java.io.*;
import java.math.BigDecimal;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = {"/apis/master"}, method = {RequestMethod.POST})
public class ItemController extends CmmnController {
	private Logger logger = LoggerFactory.getLogger(this.getClass());
	@Autowired
	private ItemService itemService;
	@Autowired
	private ItemHistoryService itemHistoryService;
	@Autowired
	private ItemFileService itemFileService;
	@Autowired
	SessionTempItemDao sessionTempItemDao;

	@Autowired
	private MessageSource messageSource;
	@Autowired
	private ModelMapper modelMapper;

	@Value("${upload.path.item}")
	public String fileUploadPath;

	@Value("${deleted.path.item}")
	public String fileDeletedPath;

	@RequestMapping(value = "/selectItemHsMasterList")
	public ResponseEntity<?> selectItemHsMasterList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = itemService.selectItemHsMasterList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/insertItemHsMasterList")
	public ResponseEntity<?> insertItemHsMasterList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map<String, Object>> mapList = CmmnUtils.convertMapSourceToList(args, "insertItemHsMasterList");
			List<ItemHsMasterVO> voList = CmmnUtils.convertMapListToBean(mapList, ItemHsMasterVO.class);

			List<ItemHsMasterVO> returnVoList = itemService.insertItemHsMasterList(voList, request);
			return new ResponseEntity<>(returnVoList, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectItemFileList")
	public ResponseEntity<?> selectItemFileList(HttpServletRequest request, @RequestBody Map args) throws Exception{
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
			List<ItemAttachFileVO> list = itemFileService.selectItemFileList(args);
			List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
			return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/uploadItemFile")
	public ResponseEntity<?> uploadItemFile(MultipartHttpServletRequest mRequest, HttpServletRequest request) throws Exception {
		if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		Map result = new HashMap();
		ItemAttachFileVO itemAttachFileVO = new ItemAttachFileVO();
		ItemAttachFileVO returnVO;

		String yyyymmdd = CmmnUtils.getFormatedDate("yyyyMMdd");
		String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
		String mCountNo = mRequest.getParameter("itemMcountNo");
		String mcountType = mRequest.getParameter("itemMcountType");
		String docGroup = mRequest.getParameter("itemDocGroup");
		String fileCategory = mRequest.getParameter("itemFileCategory");
		String itemSearchKeyword = mRequest.getParameter("itemSearchKeyword");
		String itemFileNote = mRequest.getParameter("itemFileNote");
		String itemFileAccessGrade = mRequest.getParameter("itemFileAccessGrade");
		String uploadPath = fileUploadPath + yyyymmdd + File.separator; // 파일path

		File dir = new File(uploadPath);

		if (!dir.isDirectory()) {
			dir.mkdirs();
		}

		MultiValueMap<String, MultipartFile> map = mRequest.getMultiFileMap();
		Iterator<String> iter = map.keySet().iterator();
		while (iter.hasNext()) {
			String str = iter.next();
			List<MultipartFile> fileList = map.get(str);
			for (MultipartFile mpf : fileList){
				String originalFileName = CmmnFileUtils.convertOriginalFileName(mpf.getOriginalFilename());
				if (CmmnFileUtils.isContainsChinese(originalFileName) || CmmnFileUtils.isContainsJapanese(originalFileName) || CmmnFileUtils.isFileNameContainSpecialCharacter(originalFileName)){
					return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
				}
				long fileSize 		= mpf.getSize();
				String saveFileName = originalFileName.substring(0, originalFileName.lastIndexOf("."));
				String body, ext;
				long sysTime = System.currentTimeMillis();

				if(!CmmnUtils.isNull(saveFileName) && !saveFileName.equals("")){
//					if(new File(uploadPath + saveFileName).exists()){
						int dot = saveFileName.lastIndexOf(".");
						if(dot != -1){
							body 	= saveFileName.substring(0, dot);
							ext 	= saveFileName.substring(dot);
							if(!CmmnFileUtils.isExtensionCheck(ext.substring(1))){
								return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
							}
							saveFileName = body + "_" + sysTime + ext;
						}else{
							saveFileName = saveFileName + "_" + sysTime;
						}
//					}

					try{
						mpf.transferTo(new File("C:\\hspass\\"+saveFileName));
			            File file1 = new File("C:\\hspass\\"+saveFileName);
						FtpClient ftp_ivr2 = new FtpClient("122.99.247.9", "seinftp", "seindoc!!", "");
						//############# NEWNAS #######################
						//FtpClient ftp_ivr2 = new FtpClient("122.99.247.9", "EdmsMng9", "Seinadmin9", "/Web/seincustoms/item_file");
						boolean result2 = ftp_ivr2.upload(file1, "/Web/seincustoms/item_file/"+yyyymmdd+"/"+saveFileName);
						
//						mpf.transferTo(new File(uploadPath + saveFileName));
						itemAttachFileVO.setItemMcountNo(mCountNo);
						itemAttachFileVO.setItemMcountType(mcountType);
						itemAttachFileVO.setItemDocGroup(docGroup);
						itemAttachFileVO.setItemFileCategory(fileCategory);
						itemAttachFileVO.setItemFilePath(uploadPath);
						itemAttachFileVO.setItemSaveFileName(saveFileName);
						itemAttachFileVO.setItemOrgFileName(originalFileName);
						itemAttachFileVO.setItemFileSize(BigDecimal.valueOf(fileSize));
						itemAttachFileVO.setItemFileExt((originalFileName.lastIndexOf(".") == -1) ? "" : originalFileName.substring(originalFileName.lastIndexOf(".") + 1, originalFileName.length()));
						itemAttachFileVO.setItemSearchKeyword(itemSearchKeyword);
						itemAttachFileVO.setItemFileNote(itemFileNote);
						itemAttachFileVO.setItemFileAccessGrade(itemFileAccessGrade);
						itemAttachFileVO.setUseyn("Y");
						itemAttachFileVO.setItemServerGubun(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_SERVER_GUBUN)));
						itemAttachFileVO.setItemServerIp(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_SERVER_IP)));
						itemAttachFileVO.setAddUserId(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID)));
						itemAttachFileVO.setEditUserId(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID)));
						itemAttachFileVO.setAdduserNm(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
						itemAttachFileVO.setEditUserNm(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
						itemAttachFileVO.setAdddtm(currentDatetime);
						itemAttachFileVO.setEditDtm(currentDatetime);

						ItemAttachFileVO saveVO = modelMapper.map(itemAttachFileVO, ItemAttachFileVO.class);

						returnVO = saveAttachFile(saveVO, request);

						result.put("ITEM_SAVE_FILE_NAME", saveFileName);
						result.put("ITEM_ORG_FILE_NAME", originalFileName);
						result.put("ITEM_FILE_KEY", returnVO.getItemFileKey());
						result.put("ITEM_FILE_INFO", returnVO);
					}catch (IllegalStateException e){
						e.printStackTrace();
						result.put("errorMsg", "IllegalStateException");
						return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
					}catch(IOException e){
						e.printStackTrace();
						result.put("errorMsg", "IOException");
						return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
					}
					
					File file = new File("C:\\hspass\\"+saveFileName);
	                if( file.exists() ){
	                	file.delete();
	                };
				}
			}
		}
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
	public ItemAttachFileVO saveAttachFile(ItemAttachFileVO itemAttachFileVo, HttpServletRequest request) throws Exception{
		ItemAttachFileVO returnVO = itemFileService.saveItemFileInfo(itemAttachFileVo);
		saveFileLogInfo(returnVO, request, "item파일업로드_SEIN");
		return returnVO;
	}

	private void saveFileLogInfo(ItemAttachFileVO itemAttachFileVo, HttpServletRequest request, String actionStr){
		LogFileVO logFileVO = new LogFileVO();
		logFileVO.setFileKey(itemAttachFileVo.getItemFileKey());
		logFileVO.setFileParentId(itemAttachFileVo.getItemMcountNo());
		logFileVO.setFileParentType(itemAttachFileVo.getItemMcountType());
		logFileVO.setFileDocGroup(itemAttachFileVo.getItemDocGroup());
		logFileVO.setFilePath(itemAttachFileVo.getItemFilePath());
		logFileVO.setFileName(itemAttachFileVo.getItemOrgFileName());
		logFileVO.setFileAction(actionStr);
		logFileVO.setAddUserId(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID)));
		logFileVO.setFileServerGubun(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_SERVER_GUBUN)));
		logFileVO.setFileServerIp(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_SERVER_IP)));
		logFileVO.setFileClientIp(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_CLIENT_IP)));
		try{
		  //logService.saveLogFile(logFileVO);
		}catch(Exception e){
			Map errMap = new HashMap();
			errMap.put("ItemAttachFileVO", itemAttachFileVo);
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "/downloadItemFile", method = {RequestMethod.GET})
	public void downloadItemFile(HttpServletRequest request,
								   @RequestParam(value = "itemFileKey") BigDecimal itemFileKey,
								   HttpServletResponse response) throws UnsupportedEncodingException{
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return;

		String downloadFileName, reqFilePath = null, reqFileName = null;
		HttpURLConnection httpCon = null;

		try{
			ItemAttachFileVO returnVO = itemFileService.selectItemFileInfo(itemFileKey);
			downloadFileName = CmmnFileUtils.convertEncodeFileName(returnVO.getItemOrgFileName());

			reqFilePath = returnVO.getItemFilePath();
			reqFileName = returnVO.getItemSaveFileName();
			
			if(reqFilePath.substring(0, 31).equals("\\\\122.99.247.9\\Web\\seincustoms\\")){
				String path = reqFilePath.substring(31);
				String[] array = path.split("\\\\");
				String UrlFile = "http://122.99.247.9:8080/share.cgi?ssid=0FtDmZv&fid=0FtDmZv&path=%2F"+array[0]+"%2F"+array[1]+"&filename="+reqFileName+"&openfolder=forcedownload&ep=";
				URL url = new URL(UrlFile);
				httpCon = (HttpURLConnection) url.openConnection();
				httpCon.addRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:25.0) Gecko/20100101 Firefox/25.0");
				httpCon.setRequestProperty("Cache-Control", "no-cache");
				httpCon.setReadTimeout(5000);
				httpCon.setConnectTimeout(5000);
			}
			InputStream inputStream = new BufferedInputStream( httpCon.getInputStream() );
			response.setContentType("application/force-download");
			response.setHeader("Content-Disposition", "attachment; filename=\"" + downloadFileName + "\";");
			IOUtils.copy(inputStream, response.getOutputStream());
			response.flushBuffer();
			inputStream.close();

//			File fileToDownload = new File(reqFilePath + reqFileName);
//			InputStream inputStream = new FileInputStream(fileToDownload);
//			response.setContentType("application/force-download");
//			response.setHeader("Content-Disposition", "attachment; filename=\"" + downloadFileName + "\";");
//			IOUtils.copy(inputStream, response.getOutputStream());
//			response.flushBuffer();
//			inputStream.close();
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	//############# NEWNAS #######################
//	@RequestMapping(value = "/downloadItemFile", method = {RequestMethod.GET})
//	public void downloadItemFile(HttpServletRequest request,
//								   @RequestParam(value = "itemFileKey") BigDecimal itemFileKey,
//								   HttpServletResponse response) throws UnsupportedEncodingException{
//		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
//			return;
//
//		String downloadFileName, reqFilePath = null, reqFileName = null, remoteFile = null;
//		HttpURLConnection httpCon = null;
//
//		try{
//			ItemAttachFileVO returnVO = itemFileService.selectItemFileInfo(itemFileKey);
//			downloadFileName = CmmnFileUtils.convertEncodeFileName(returnVO.getItemOrgFileName());
//
//			reqFilePath = returnVO.getItemFilePath();
//			reqFileName = returnVO.getItemSaveFileName();
//			
//			remoteFile  = reqFilePath.substring(14).replaceAll("\\\\", "/")+reqFileName;
//			System.out.println("################"+remoteFile);
//
//			FTPClient ftpClient = new FTPClient();
//			ftpClient.connect("122.99.247.9", 21);
//			ftpClient.login("EdmsMng9", "Seinadmin9");
//			ftpClient.enterLocalPassiveMode();
//			response.setContentType("application/force-download");
//			response.setHeader("Content-Disposition", "attachment; filename=\"" + downloadFileName + "\";");
//			ftpClient.retrieveFile(remoteFile, response.getOutputStream());
//			response.flushBuffer();
//			ftpClient.logout();
//			ftpClient.disconnect();
//		}catch(Exception e){
//			e.printStackTrace();
//		}
//	}

    @RequestMapping(value = "/deleteItemFile", method = {RequestMethod.POST})
	public ResponseEntity<?> deleteItemFile(HttpServletRequest request, @RequestBody Map args) throws Exception{
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		String result = "";
		BigDecimal itemFileKey = NumberUtils.createBigDecimal(String.valueOf(args.get("itemFileKey")));

		ItemAttachFileVO returnVO;

		try{
			returnVO = itemFileService.selectItemFileInfo(itemFileKey);
		}catch(Exception e){
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}

//		File file = new File(returnVO.getItemFilePath() + returnVO.getItemSaveFileName());
//		if(file.isFile()){
			returnVO.setEditUserId(String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID)));
			returnVO.setUseyn("N");
			itemFileService.saveItemFileInfo(returnVO);

			// 로그 저장
			saveFileLogInfo(returnVO, request, "item파일삭제_SEIN");

//			String uploadPath = returnVO.getItemFilePath();
//			result = CmmnFileUtils.deletePath(uploadPath, returnVO.getItemSaveFileName());
//			if(!"".equals(result)){
				return new ResponseEntity<>(returnVO, HttpStatus.OK);
//			}else{
//				result = "fail";
//				return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
//			}
//		}else{
//			result = "fail_파일없음_SEIN";
//			return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
//		}
	}

    @RequestMapping(value = "/selectItemList")
    public ResponseEntity<?> selectItemList(HttpServletRequest request, @RequestBody Map args){
	  	if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  		return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	  	try{
	  		String mcoCom = args.containsKey("mcoCom") ? String.valueOf(args.get("mcoCom")) : "";
	  		if(mcoCom.equals("all")){
	  			args.put("mcoComAll", "all");
	  			args.put("mcoCom", "");
	  		}
	  		String mmodelCodeArray[] = String.valueOf(args.get("mmodelCode")).split(",");
			if (args.containsKey("mmodelCode") && mmodelCodeArray.length > 1) {
				ArrayList<String> mmodelCodeArrayList = new ArrayList(Arrays.asList(mmodelCodeArray));
				String mmodelCodeList = CmmnUtils.convertArrayToStringIn(mmodelCodeArrayList);
				args.put("mmodelCodeList", mmodelCodeList);
				args.put("mmodelCode", "");
			}

	  		List<Map> itemList = itemService.selectItemList(args);
	  		List<?> result = itemList.stream().collect(Collectors.toList());
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch (Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

    @RequestMapping(value = "/selectRmsItemNotYogList")
    public ResponseEntity<?> selectRmsItemNotYogList(HttpServletRequest request, @RequestBody Map args) throws Exception{
    	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
    		return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

    	try{
	  	  	checkPagingParamsForMapper(args);
	  	  	PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
	  	  	List<Map> list = itemService.selectRmsItemNotYogList(args);
	  	  	List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
	  	  	return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
	  	}
    }

    @RequestMapping(value = "/selectRmsItemNotYogList1")
    public ResponseEntity<?> selectRmsItemNotYogList1(HttpServletRequest request, @RequestBody Map args) throws Exception{
    	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
    		return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

    	try{
    		List<Map> list = itemService.selectRmsItemNotYogList1(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
	  	}
    }

    @RequestMapping(value = "/insertRmsItemNotYog")
    public ResponseEntity<?> insertRmsItemNotYog(HttpServletRequest request, @RequestBody Map args) throws Exception{
	  	if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  		return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	  	try{
	  		args.put("_userId", String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
	  		long result = itemService.insertRmsItemNotYog(args);
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

    @RequestMapping(value = "/updateRmsItemNotYog")
    public ResponseEntity<?> updateRmsItemNotYog(HttpServletRequest request, @RequestBody Map args) throws Exception{
	  	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  		return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	  	try{
	  		args.put("_userId", String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
	  		long result = itemService.updateRmsItemNotYog(args);
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

    @RequestMapping(value = "/deleteRmsItemNotYog")
    public ResponseEntity<?> deleteRmsItemNotYog(HttpServletRequest request, @RequestBody Map args) throws Exception{
	  	if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  		return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	  	try{
	  		long result = itemService.deleteRmsItemNotYog(args);
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

    @RequestMapping(value = "/selectTradeList")
    public ResponseEntity<?> selectTradeList(HttpServletRequest request, @RequestBody Map args){
	  	if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  		return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	  	try{
	  		String _defaultRmsDb = args.containsKey("_defaultRmsDb") ? String.valueOf(args.get("_defaultRmsDb")) : "";
	  		if(_defaultRmsDb.equals("demoRms")){
		  		List<Map> itemList = itemHistoryService.selectTradeDemoList(args);
		  		List<?> result = itemList.stream().collect(Collectors.toList());
		  		return new ResponseEntity<>(result, HttpStatus.OK);
	  		}else{
	  			List<Map> itemList = itemHistoryService.selectTradeList(args);
		  		List<?> result = itemList.stream().collect(Collectors.toList());
		  		return new ResponseEntity<>(result, HttpStatus.OK);
	  		}
	  	}catch (Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

    @RequestMapping(value = "/selectItemAmdMasterList")
    public ResponseEntity<?> selectItemAmdMasterList(HttpServletRequest request, @RequestBody Map args) throws Exception{
	  	if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  		return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	  	try{
	  		checkPagingParamsForMapper(args);
	  		PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
	  		List<Map> list = itemHistoryService.selectItemAmdMasterList(args);
	  		List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
	  		return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

    @RequestMapping(value = "/selectItemAmdDetailList")
    public ResponseEntity<?> selectItemAmdDetailList(HttpServletRequest request, @RequestBody Map args) throws Exception{
	  	if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  		return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	  	try{
	  		checkPagingParamsForMapper(args);
	  		PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
	  		List<Map> list = itemHistoryService.selectItemAmdDetailList(args);
	  		List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
	  		return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

    @RequestMapping(value = "/selectItemAmdInspectionHistoryList")
    public ResponseEntity<?> selectItemAmdInspectionHistoryList(HttpServletRequest request, @RequestBody Map args) throws Exception{
	  	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  		return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	  	try{
	  		checkPagingParamsForMapper(args);
	  		args.put("_userId", CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
	  		args.put("_Auth", CmmnUtils.getUserAuth(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_GRADE))));
	  		PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
	  		List<Map> list = itemHistoryService.selectItemAmdInspectionHistoryList(args);
	  		List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
	  		return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

    @RequestMapping(value = "/selectUnitPriceHistoryList")
    public ResponseEntity<?> selectUnitPriceHistoryList(HttpServletRequest request, @RequestBody Map args) throws Exception{
	  	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  		return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	  	try{
	  		checkPagingParamsForMapper(args);
	  		args.put("_userId", CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
	  		args.put("_Auth", CmmnUtils.getUserAuth(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_GRADE))));
	  		PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
	  		List<Map> list = itemHistoryService.selectUnitPriceHistoryList(args);
	  		List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
	  		return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

    @RequestMapping(value = "/selectCustomsUnitPriceList")
    public ResponseEntity<?> selectCustomsUnitPriceList(HttpServletRequest request, @RequestBody Map args) throws Exception{
	  	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  		return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	  	try{
	  		String _defaultRmsDb = args.containsKey("_defaultRmsDb") ? String.valueOf(args.get("_defaultRmsDb")) : "";
	  		checkPagingParamsForMapper(args);
	  		args.put("_userId", CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
	  		args.put("_Auth", CmmnUtils.getUserAuth(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_GRADE))));
	  		PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
	  		if(_defaultRmsDb.equals("demoRms")){
		  		List<Map> list = itemHistoryService.selectCustomsUnitPriceDemoList(args);
		  		List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
		  		return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
	  		}else{
	  			List<Map> list = itemHistoryService.selectCustomsUnitPriceList(args);
		  		List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
		  		return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
	  		}
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

    @RequestMapping(value = "/selectLCRList")
    public ResponseEntity<?> selectLCRList(HttpServletRequest request, @RequestBody Map args){
	  	if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  		return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	  	try{
	  		List<Map> list = itemService.selectLCRList(args);
	  		List<?> result = list.stream().collect(Collectors.toList());
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

    @RequestMapping(value = "/selectImportManagement")
    public ResponseEntity<?> selectImportManagement(HttpServletRequest request, @RequestBody Map args){
	  	if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  		return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	  	try{
	  		List<Map> list = itemService.selectImportManagement(args);
	  		List<?> result = list.stream().collect(Collectors.toList());
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

    @RequestMapping(value = "/updateRecvImpo3")
    public ResponseEntity<?> updateRecvImpo3(HttpServletRequest request, @RequestBody Map args){
	  	if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  		return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	  	try{
	  		long result = itemService.updateRecvImpo3(args);
			return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

    @RequestMapping(value = "/selectCompItemInfo")
    public ResponseEntity<?> selectCompItemInfo(HttpServletRequest request, @RequestBody Map args){
	  	if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  		return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	  	try{
	  		List<Map> itemList = itemService.selectCompItemInfo(args);
	  		List<?> result = itemList.stream().collect(Collectors.toList());
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch (Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

    @RequestMapping(value = "/selectItemCheck")
    public ResponseEntity<?> selectItemCheck(HttpServletRequest request, @RequestBody Map args){
	  	if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  		return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	  	try{
	  		List<Map> itemList = itemService.selectItemCheck(args);
	  		List<?> result = itemList.stream().collect(Collectors.toList());
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch (Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

    @RequestMapping(value = "/selectHsList")
    public ResponseEntity<?> selectHsList(HttpServletRequest request, @RequestBody Map args){
	  	if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  		return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	  	try{
	  		List<Map> itemList = itemService.selectHsList(args);
	  		List<?> result = itemList.stream().collect(Collectors.toList());
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch (Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

    @RequestMapping(value = "/insertItemMaster")
    public ResponseEntity<?> insertItemMaster(HttpServletRequest request, @RequestBody Map args) throws Exception{
	  	try{
	  		Random randomGenerator = new Random();
	  		int randomInteger = randomGenerator.nextInt(10);
	  		String currentDate = CmmnUtils.getFormatedDate("yyyyMMdd");
	  		String currentDatetime = CmmnUtils.getFormatedDate("yyMMddHHmmss");
	  		args.put("Mreg_date", currentDate);
	  		args.put("First_date", currentDatetime);
	  		args.put("last_date", currentDatetime);
	  		args.put("Mcount_no", "W"+currentDatetime+randomInteger);
	  		args.put("useYn", "Y");
	  		args.put("_userId", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID)));
	  		long result = itemService.insertItemMaster(args);
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

    @RequestMapping(value = "/insertItemMaster1")
    public ResponseEntity<?> insertItemMaster1(HttpServletRequest request, @RequestBody Map args) throws Exception{
	  	try{
	  		Random randomGenerator = new Random();
	  		int randomInteger = randomGenerator.nextInt(10);
	  		String currentDate = CmmnUtils.getFormatedDate("yyyyMMdd");
	  		String currentDatetime = CmmnUtils.getFormatedDate("yyMMddHHmmss");
	  		String currentDatetime1 = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
	  		args.put("Mreg_date", currentDate);
	  		args.put("Mcount_no", "W"+currentDatetime+randomInteger);
	  		args.put("First_date", currentDatetime1);
	  		args.put("last_date", currentDatetime1);
	  		args.put("useYn", "Y");
	  		args.put("_userId", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID)));
	  		long result1 = itemService.insertItemMaster1(args);
	  		Map result = new HashMap();
	  		result.put("mcountno", "W"+currentDatetime+randomInteger);
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

    @RequestMapping(value = "/insertItemMaster2")
    public ResponseEntity<?> insertItemMaster2(HttpServletRequest request, @RequestBody Map args) throws Exception{
	  	try{
	  		Random randomGenerator = new Random();
	  		int randomInteger = randomGenerator.nextInt(10);
	  		String currentDate = CmmnUtils.getFormatedDate("yyyyMMdd");
	  		String currentDatetime = CmmnUtils.getFormatedDate("yyMMddHHmmss");
	  		String currentDatetime1 = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
	  		args.put("Mreg_date", currentDate);
	  		args.put("First_date", currentDatetime1);
	  		args.put("last_date", currentDatetime1);
	  		args.put("Mcount_no", "W"+currentDatetime+randomInteger);
	  		args.put("useYn", "Y");
	  		args.put("_userId", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID)));
	  		long result = itemService.insertItemMaster2(args);
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

    @RequestMapping(value = "/updateItemMaster")
    public ResponseEntity<?> updateItemMaster(HttpServletRequest request, @RequestBody Map args) throws Exception{
	  	try{
	  		String Mqty_ut_old 				= args.containsKey("Mqty_ut_old") ? String.valueOf(args.get("Mqty_ut_old")) : "";
	  		String Mqty_ut 					= args.containsKey("Mqty_ut") ? String.valueOf(args.get("Mqty_ut")) : "";
	  		String Mhs_code_old 			= args.containsKey("Mhs_code_old") ? String.valueOf(args.get("Mhs_code_old")) : "";
	  		String Mhs_code 				= args.containsKey("Mhs_code") ? String.valueOf(args.get("Mhs_code")) : "";
	  		String Mhs_kind_old 			= args.containsKey("Mhs_kind_old") ? String.valueOf(args.get("Mhs_kind_old")) : "";
	  		String Mhs_kind 				= args.containsKey("Mhs_kind") ? String.valueOf(args.get("Mhs_kind")) : "";
	  		String Morigin1_old 			= args.containsKey("Morigin1_old") ? String.valueOf(args.get("Morigin1_old")) : "";
	  		String Morigin1 				= args.containsKey("Morigin1") ? String.valueOf(args.get("Morigin1")) : "";
	  		String Munitprice_current_old 	= args.containsKey("Munitprice_current_old") ? String.valueOf(args.get("Munitprice_current_old")) : "";
	  		String Munitprice_current 		= args.containsKey("Munitprice_current") ? String.valueOf(args.get("Munitprice_current")) : "";
	  		String Munitprice_old 			= args.containsKey("Munitprice_old") ? String.valueOf(args.get("Munitprice_old")) : "";
	  		String Munitprice 				= args.containsKey("Munitprice") ? String.valueOf(args.get("Munitprice")) : "";
	  		String Mmodel_2_old 			= args.containsKey("Mmodel_2_old") ? String.valueOf(args.get("Mmodel_2_old")) : "";
	  		String Mmodel_2 				= args.containsKey("Mmodel_2") ? String.valueOf(args.get("Mmodel_2")) : "";
	  		String Mmodel_3_old 			= args.containsKey("Mmodel_3_old") ? String.valueOf(args.get("Mmodel_3_old")) : "";
	  		String Mmodel_3 				= args.containsKey("Mmodel_3") ? String.valueOf(args.get("Mmodel_3")) : "";
	  		String currentDatetime 			= CmmnUtils.getFormatedDate("yyMMddHHmmss");

	  		if(!Mqty_ut_old.equals(Mqty_ut)||!Mhs_code_old.equals(Mhs_code)||!Mhs_kind_old.equals(Mhs_kind)||!Morigin1_old.equals(Morigin1)||!Munitprice_current_old.equals(Munitprice_current)||!Munitprice_old.equals(Munitprice)||!Mmodel_2_old.equals(Mmodel_2)||!Mmodel_3_old.equals(Mmodel_3)){
	  			args.put("_userId", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID)));
	  			args.put("_userNm", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
	  			args.put("AddDtm", currentDatetime);
	  			args.put("UseYn", "Y");
	  			String masterAmdSeq = itemService.insertItemAmdMst(args);
	  			if(!Mqty_ut_old.equals(Mqty_ut)){
	  				args.put("amdSeq", masterAmdSeq);
	  				args.put("itemId", "Mqty_ut");
	  				args.put("itemNm", "수량단위");
	  				args.put("amdBf", String.valueOf(args.get("Mqty_ut_old")));
	  				args.put("amdAf", String.valueOf(args.get("Mqty_ut")));
	  				itemService.insertItemAmdDtl(args);
	  			}
	  			if(!Mhs_code_old.equals(Mhs_code)){
	  				args.put("amdSeq", masterAmdSeq);
	  				args.put("itemId", "MHS_CODE");
	  				args.put("itemNm", "세번부호");
	  				args.put("amdBf", String.valueOf(args.get("Mhs_code_old")));
	  				args.put("amdAf", String.valueOf(args.get("Mhs_code")));
	  				itemService.insertItemAmdDtl(args);
	  			}
	  			if(!Mhs_kind_old.equals(Mhs_kind)){
	  				args.put("amdSeq", masterAmdSeq);
	  				args.put("itemId", "MHS_KIND");
	  				args.put("itemNm", "세종구분");
	  				args.put("amdBf", String.valueOf(args.get("Mhs_kind_old")));
	  				args.put("amdAf", String.valueOf(args.get("Mhs_kind")));
	  				itemService.insertItemAmdDtl(args);
	  			}
	  			if(!Morigin1_old.equals(Morigin1)){
	  				args.put("amdSeq", masterAmdSeq);
	  				args.put("itemId", "MORIGIN1");
	  				args.put("itemNm", "원산지국가코드");
	  				args.put("amdBf", String.valueOf(args.get("Morigin1_old")));
	  				args.put("amdAf", String.valueOf(args.get("Morigin1")));
	  				itemService.insertItemAmdDtl(args);
	  			}
	  			if(!Munitprice_current_old.equals(Munitprice_current)){
	  				args.put("amdSeq", masterAmdSeq);
	  				args.put("itemId", "MUNITPRICE_CURRENT");
	  				args.put("itemNm", "통화단위");
	  				args.put("amdBf", String.valueOf(args.get("Munitprice_current_old")));
	  				args.put("amdAf", String.valueOf(args.get("Munitprice_current")));
	  				itemService.insertItemAmdDtl(args);
	  			}
	  			if(!Munitprice_old.equals(Munitprice)){
	  				args.put("amdSeq", masterAmdSeq);
	  				args.put("itemId", "MUNITPRICE");
	  				args.put("itemNm", "단가");
	  				args.put("amdBf", String.valueOf(args.get("Munitprice_old")));
	  				args.put("amdAf", String.valueOf(args.get("Munitprice")));
	  				itemService.insertItemAmdDtl(args);
	  			}
	  			if(!Mmodel_2_old.equals(Mmodel_2)){
	  				args.put("amdSeq", masterAmdSeq);
	  				args.put("itemId", "MMODEL_2");
	  				args.put("itemNm", "규격2");
	  				args.put("amdBf", String.valueOf(args.get("Mmodel_2_old")));
	  				args.put("amdAf", String.valueOf(args.get("Mmodel_2")));
	  				itemService.insertItemAmdDtl(args);
	  			}
	  			if(!Mmodel_3_old.equals(Mmodel_3)){
	  				args.put("amdSeq", masterAmdSeq);
	  				args.put("itemId", "MMODEL_3");
	  				args.put("itemNm", "규격3");
	  				args.put("amdBf", String.valueOf(args.get("Mmodel_3_old")));
	  				args.put("amdAf", String.valueOf(args.get("Mmodel_3")));
	  				itemService.insertItemAmdDtl(args);
	  			}
	  		}
	  		args.put("_userId", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID)));
	  		long result = itemService.updateItemMaster(args);
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

    @RequestMapping(value = "/updateItemMaster1")
    public ResponseEntity<?> updateItemMaster1(HttpServletRequest request, @RequestBody Map args) throws Exception{
	  	try{
	  		String Mqty_ut_old 				= args.containsKey("Mqty_ut_old") ? String.valueOf(args.get("Mqty_ut_old")) : "";
	  		String Mqty_ut 					= args.containsKey("Mqty_ut") ? String.valueOf(args.get("Mqty_ut")) : "";
	  		String Mhs_code_old 			= args.containsKey("Mhs_code_old") ? String.valueOf(args.get("Mhs_code_old")) : "";
	  		String Mhs_code 				= args.containsKey("Mhs_code") ? String.valueOf(args.get("Mhs_code")) : "";
	  		String Mhs_kind_old 			= args.containsKey("Mhs_kind_old") ? String.valueOf(args.get("Mhs_kind_old")) : "";
	  		String Mhs_kind 				= args.containsKey("Mhs_kind") ? String.valueOf(args.get("Mhs_kind")) : "";
	  		String Morigin1_old 			= args.containsKey("Morigin1_old") ? String.valueOf(args.get("Morigin1_old")) : "";
	  		String Morigin1 				= args.containsKey("Morigin1") ? String.valueOf(args.get("Morigin1")) : "";
	  		String RefundYN_old 			= args.containsKey("RefundYN_old") ? String.valueOf(args.get("RefundYN_old")) : "";
	  		String RefundYN 				= args.containsKey("RefundYN") ? String.valueOf(args.get("RefundYN")) : "";
	  		String OrigExpYN_old 			= args.containsKey("OrigExpYN_old") ? String.valueOf(args.get("OrigExpYN_old")) : "";
	  		String OrigExpYN 				= args.containsKey("OrigExpYN") ? String.valueOf(args.get("OrigExpYN")) : "";
	  		String currentDatetime 			= CmmnUtils.getFormatedDate("yyMMddHHmmss");

	  		if(!Mqty_ut_old.equals(Mqty_ut)||!Mhs_code_old.equals(Mhs_code)||!Mhs_kind_old.equals(Mhs_kind)||!Morigin1_old.equals(Morigin1)||!RefundYN_old.equals(RefundYN)||!OrigExpYN_old.equals(OrigExpYN)){
	  			args.put("_userId", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID)));
	  			args.put("_userNm", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
	  			args.put("AddDtm", currentDatetime);
	  			args.put("UseYn", "Y");
	  			String masterAmdSeq = itemService.insertItemAmdMst(args);
	  			if(!Mqty_ut_old.equals(Mqty_ut)){
	  				args.put("amdSeq", masterAmdSeq);
	  				args.put("itemId", "Mqty_ut");
	  				args.put("itemNm", "수량단위");
	  				args.put("amdBf", String.valueOf(args.get("Mqty_ut_old")));
	  				args.put("amdAf", String.valueOf(args.get("Mqty_ut")));
	  				itemService.insertItemAmdDtl(args);
	  			}
	  			if(!Mhs_code_old.equals(Mhs_code)){
	  				args.put("amdSeq", masterAmdSeq);
	  				args.put("itemId", "MHS_CODE");
	  				args.put("itemNm", "세번부호");
	  				args.put("amdBf", String.valueOf(args.get("Mhs_code_old")));
	  				args.put("amdAf", String.valueOf(args.get("Mhs_code")));
	  				itemService.insertItemAmdDtl(args);
	  			}
	  			if(!Mhs_kind_old.equals(Mhs_kind)){
	  				args.put("amdSeq", masterAmdSeq);
	  				args.put("itemId", "MHS_KIND");
	  				args.put("itemNm", "세종구분");
	  				args.put("amdBf", String.valueOf(args.get("Mhs_kind_old")));
	  				args.put("amdAf", String.valueOf(args.get("Mhs_kind")));
	  				itemService.insertItemAmdDtl(args);
	  			}
	  			if(!Morigin1_old.equals(Morigin1)){
	  				args.put("amdSeq", masterAmdSeq);
	  				args.put("itemId", "MORIGIN1");
	  				args.put("itemNm", "원산지국가코드");
	  				args.put("amdBf", String.valueOf(args.get("Morigin1_old")));
	  				args.put("amdAf", String.valueOf(args.get("Morigin1")));
	  				itemService.insertItemAmdDtl(args);
	  			}
	  			if(!RefundYN_old.equals(RefundYN)){
	  				args.put("amdSeq", masterAmdSeq);
	  				args.put("itemId", "REFUNDYN");
	  				args.put("itemNm", "개별환급대상");
	  				args.put("amdBf", String.valueOf(args.get("RefundYN_old")));
	  				args.put("amdAf", String.valueOf(args.get("RefundYN")));
	  				itemService.insertItemAmdDtl(args);
	  			}
	  			if(!OrigExpYN_old.equals(OrigExpYN)){
	  				args.put("amdSeq", masterAmdSeq);
	  				args.put("itemId", "OrigExpYN");
	  				args.put("itemNm", "원상태수출대상");
	  				args.put("amdBf", String.valueOf(args.get("OrigExpYN_old")));
	  				args.put("amdAf", String.valueOf(args.get("OrigExpYN")));
	  				itemService.insertItemAmdDtl(args);
	  			}
	  		}
	  		args.put("_userId", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID)));
	  		args.put("_userNm", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
	  		long result = itemService.updateItemMaster1(args);
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

    @RequestMapping(value = "/selectItemCompList")
    public ResponseEntity<?> selectItemCompList(HttpServletRequest request, @RequestBody Map args){
	  	if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  		return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	  	try{
	  		List<Map> itemList = itemService.selectItemCompList(args);
	  		List<?> result = itemList.stream().collect(Collectors.toList());
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch (Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

    @RequestMapping(value = "/selectInvoiceMasterList")
	public ResponseEntity<?> selectInvoiceMasterList(HttpServletRequest request, @RequestBody Map args) throws Exception{
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = itemService.selectInvoiceMasterList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
		}
	}

    @RequestMapping(value = "/copyInvoiceMasterList")
	public ResponseEntity<?> copyInvoiceMasterList(HttpServletRequest request, @RequestBody Map args) throws Exception{
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			Map result1 = new HashMap();
	  		String currentYear = CmmnUtils.getFormatedDate("yy");
	  		String currentDate = CmmnUtils.getFormatedDate("yyyyMMdd");
	  		String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
	  		String currentDatetimeMile = CmmnUtils.getFormatedDate("yyMMddHHmmssSSS");
	  		result1.put("k_no", "W"+currentDatetimeMile);
	  		args.put("k_no", "W"+currentDatetimeMile);
	  		args.put("Impo_year", currentYear);
	  		args.put("req_date", currentDate);
	  		args.put("_userId", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID)));
	  		args.put("_userNm", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
	  		args.put("AddDtTime", currentDatetime);

	  		long result = itemService.copyInvoiceMasterList(args);
			return new ResponseEntity<>(result1, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
		}
	}

    @RequestMapping(value = "/insertInvoiceImpo1")
    public ResponseEntity<?> insertInvoiceImpo1(HttpServletRequest request, @RequestBody Map args) throws Exception{
	  	try{
	  		Map result1 = new HashMap();
	  		String currentYear = CmmnUtils.getFormatedDate("yy");
	  		String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
	  		String currentDatetimeMile = CmmnUtils.getFormatedDate("yyMMddHHmmssSSS");
	  		result1.put("key_no", "W"+currentDatetimeMile);
	  		args.put("key_no", "W"+currentDatetimeMile);
	  		args.put("Impo_year", currentYear);
	  		args.put("_userId", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID)));
	  		args.put("_userNm", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
	  		args.put("AddDtTime", currentDatetime);
	  		long result = itemService.insertInvoiceImpo1(args);
	  		return new ResponseEntity<>(result1, HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

    @RequestMapping(value = "/selectInvoiceItemList")
	public ResponseEntity<?> selectInvoiceItemList(HttpServletRequest request, @RequestBody Map args) throws Exception{
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = itemService.selectInvoiceItemList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
		}
	}

    @RequestMapping(value = "/insertInvoiceImpo3")
    public ResponseEntity<?> insertInvoiceImpo3(HttpServletRequest request, @RequestBody Map args) throws Exception{
	  	try{
	  		String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
		  	args.put("_userNm", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID)));
		  	args.put("last_dt", currentDatetime);
		  	itemService.delInvoiceLan(args);
		  	long result = itemService.insertInvoiceImpo3(args);
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

    @RequestMapping(value = "/insertInvoiceImpo3C")
    public ResponseEntity<?> insertInvoiceImpo3C(HttpServletRequest request, @RequestBody Map args) throws Exception{
	  	try{
	  		String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
		  	args.put("_userNm", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID)));
		  	args.put("last_dt", currentDatetime);
		  	long result = itemService.insertInvoiceImpo3(args);
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

    @RequestMapping(value = "/modiInvoiceImpo3")
    public ResponseEntity<?> modiInvoiceImpo3(HttpServletRequest request, @RequestBody Map args) throws Exception{
	  	try{
	  		String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
		  	args.put("_userNm", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID)));
		  	args.put("last_dt", currentDatetime);
		  	itemService.delInvoiceLan(args);
		  	long result = itemService.modiInvoiceImpo3(args);
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

    @RequestMapping(value = "/delInvoiceImpo1")
    public ResponseEntity<?> delInvoiceImpo1(HttpServletRequest request, @RequestBody Map args) throws Exception{
	  	try{
	  		itemService.delInvoiceLan(args);
	  		itemService.delInvoiceImpo3(args);
	  		long result = itemService.delInvoiceImpo1(args);
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

    @RequestMapping(value = "/delInvoiceImpo3")
    public ResponseEntity<?> delInvoiceImpo3(HttpServletRequest request, @RequestBody Map args) throws Exception{
	  	try{
	  		itemService.delInvoiceLan(args);
	  		long result = itemService.delInvoiceImpo3(args);
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

    @RequestMapping(value = "/updateInvoiceImpo1")
    public ResponseEntity<?> updateInvoiceImpo1(HttpServletRequest request, @RequestBody Map args) throws Exception{
	  	try{
	  		itemService.delInvoiceLan(args);
	  		String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
	  		args.put("_userId", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID)));
	  		args.put("_userNm", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
	  		args.put("EditDtTime", currentDatetime);
	  		long result = itemService.updateInvoiceImpo1(args);
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

    @RequestMapping(value = "/updateInvoiceImpo1Sub")
    public ResponseEntity<?> updateInvoiceImpo1Sub(HttpServletRequest request, @RequestBody Map args) throws Exception{
	  	try{
	  		String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
	  		args.put("_userId", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID)));
	  		args.put("_userNm", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
	  		args.put("EditDtTime", currentDatetime);
	  		long result = itemService.updateInvoiceImpo1Sub(args);
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

    @RequestMapping(value = "/selectInvoiceLanList")
	public ResponseEntity<?> selectInvoiceLanList(HttpServletRequest request, @RequestBody Map args) throws Exception{
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = itemService.selectInvoiceLanList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
		}
	}

    @RequestMapping(value = "/insertInvoiceLan")
    public ResponseEntity<?> insertInvoiceLan(HttpServletRequest request, @RequestBody Map args) throws Exception{
	  	try{
	  		String currentDatetime 		= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
	  		String key_no 				= args.containsKey("key_no") ? String.valueOf(args.get("key_no")) : "";
	  		String hscode 				= args.containsKey("hscode") ? String.valueOf(args.get("hscode")) : "";
	  		String fta 					= args.containsKey("fta") ? String.valueOf(args.get("fta")) : "";
	  		String Impo_plus_yul_gubun 	= args.containsKey("Impo_plus_yul_gubun") ? String.valueOf(args.get("Impo_plus_yul_gubun")) : "";
	  		String Impo_plus_money 		= args.containsKey("Impo_plus_money") ? String.valueOf(args.get("Impo_plus_money")) : "";
	  		String Impo_minus_yul_gubun = args.containsKey("Impo_minus_yul_gubun") ? String.valueOf(args.get("Impo_minus_yul_gubun")) : "";
	  		String Impo_minus_money 	= args.containsKey("Impo_minus_money") ? String.valueOf(args.get("Impo_minus_money")) : "";
	  		args.put("_userNm", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID)));
		  	args.put("last_dt", currentDatetime);

		  	itemService.delInvoiceLan(args);

		  	itemService.updateInvoiceImpo1Jung(args);

	  		List<Map> list = new ArrayList<>();
	  		long result = 0;
	  		if(hscode.equals("asc")){
	  			if(fta.equals("")){
	  				list  = itemService.selectInvoiceItemGroupByList1(args);
	  			}else{
	  				list  = itemService.selectInvoiceItemGroupByList2(args);
	  			}
	  		}else{
	  			if(fta.equals("")){
	  				list  = itemService.selectInvoiceItemGroupByList3(args);
	  			}else{
	  				list  = itemService.selectInvoiceItemGroupByList4(args);
	  			}
	  		}

	  		for (int i = 0, n = list.size(); i < n; i++) {
	  			List<Map> listCode = new ArrayList<>();
	  			Map result1 = new HashMap();
	  			result1.put("mcd","CNTY_CD");
	  			result1.put("cd",String.valueOf(list.get(i).get("Morigin1")));
	  			listCode = itemService.selectSysCodeList(result1);
	  			List<Map> listHs = new ArrayList<>();
	  			Map result2 = new HashMap();
	  			result2.put("hsCode",String.valueOf(list.get(i).get("mhs_code")));
	  			result2.put("kind",String.valueOf(list.get(i).get("Mhs_kind")));
	  			listHs = itemService.selectHsCodeList(result2);
	  			List<Map> listItem = new ArrayList<>();
	  			Map result3 = new HashMap();
	  			result3.put("hsCode",String.valueOf(list.get(i).get("mhs_code")));
	  			result3.put("key_no",key_no);
	  			listItem = itemService.selectLanItemList(result3);

	  			Double wei 		=  Double.parseDouble(String.valueOf(list.get(i).get("im_tot_net_wei")));
	  			Double su 		=  Double.parseDouble(String.valueOf(list.get(i).get("su")));
	  			Double suTotal 	=  Double.parseDouble(String.valueOf(list.get(i).get("suTotal")));
	  			Double amt 		=  Double.parseDouble(String.valueOf(list.get(i).get("amt")));
	  			Double amtTotal =  Double.parseDouble(String.valueOf(list.get(i).get("amtTotal")));
	  	        int k = 3;
	  	        Double n2 = Math.pow(10.0, k);
	  			String Imlan_jung 	=  Double.toString(Math.round((wei*((su/suTotal)+(amt/amtTotal))/2)*n2)/n2);
	  			args.put("Imlan_jung",Imlan_jung);
	  			args.put("Imlan_jung_danwi","KG");
	  			args.put("Imlan_hs",String.valueOf(list.get(i).get("mhs_code")));
	  			args.put("Imlan_seyul_gubun",String.valueOf(list.get(i).get("Mhs_kind")));
	  			args.put("Imlan_cost",String.valueOf(list.get(i).get("amt")));
	  			args.put("Imlan_su","0");
	  			args.put("Imlan_mulryang",String.valueOf(list.get(i).get("su")));
	  			args.put("Imlan_wonsanji_code",String.valueOf(list.get(i).get("Morigin1")));
	  			args.put("Imlan_wonsanji_dcsn_base",String.valueOf(list.get(i).get("Morigin2")));
	  			args.put("Imlan_wonsanji_mark",String.valueOf(list.get(i).get("Morigin3")));
	  			args.put("Imlan_wonsanji_bang",String.valueOf(list.get(i).get("Morigin4")));
	  			args.put("Imlan_oExemptSayuCd",String.valueOf(list.get(i).get("Morigin4")));
	  			args.put("Imlan_gukyk_cnt",String.valueOf(list.get(i).get("gukyk")));
	  			args.put("Imlan_wonsanji_name",String.valueOf(listCode.get(0).get("CD_DESC_ENG")));
	  			args.put("Imlan_popum",String.valueOf(listHs.get(0).get("Hsbuho_popum")));
	  			args.put("Imlan_gurae_pum",String.valueOf(listHs.get(0).get("Hsbuho_popum")));
	  			args.put("Imlan_gwan_seyula",String.valueOf(listHs.get(0).get("Hsbuho_seyul")));
	  			args.put("Imlan_gwan_seyulc",String.valueOf(listHs.get(0).get("Hsbuho_seyul")));
	  			args.put("Imlan_jung_danwi",String.valueOf(listHs.get(0).get("Hsbuho_jung")));
	  			args.put("Imlan_su_danwi",String.valueOf(listHs.get(0).get("Hsbuho_su")));
	  			args.put("Imlan_model_code",String.valueOf(listItem.get(0).get("Msp_code")));
	  			args.put("Imlan_model",String.valueOf(listItem.get(0).get("Msangpyo")));
	  			args.put("Imlan_gwan_gele",String.valueOf(listItem.get(0).get("Mcus_entry1")));
	  			args.put("Imlan_gwan_hs",String.valueOf(listItem.get(0).get("Mcus_entry2")));
	  			args.put("Imlan_gwan_gumsa",String.valueOf(listItem.get(0).get("Mcus_entry3")));
	  			args.put("Imlan_mulryang_danwi",String.valueOf(listItem.get(0).get("Mdraw_unit")));
	  			args.put("Imlan_plus_yul_gubun",Impo_plus_yul_gubun);
	  			args.put("Imlan_plus_money",Impo_plus_money);
	  			args.put("Imlan_minus_yul_gubun",Impo_minus_yul_gubun);
	  			args.put("Imlan_minus_money",Impo_minus_money);
	  			args.put("imlan_gwan_gubun","0");
	  			args.put("Imlan_Attachi","N");
	  			result = itemService.insertInvoiceLan(args);
			}
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

    @RequestMapping(value = "/insertInvoiceTotalList")
	public ResponseEntity<?> insertInvoiceTotalList(HttpServletRequest request, @RequestBody Map args) throws Exception{
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			String currentDate 	= CmmnUtils.getFormatedDate("yyMMdd");
			String currentDate1	= CmmnUtils.getFormatedDate("yyyyMMdd");
			String currentMonth	= CmmnUtils.getFormatedDate("MM");
			String getImpoKey 	= itemService.getNumberingImpoKey(currentDate);
			String key_no 		= args.containsKey("key_no") ? String.valueOf(args.get("key_no")) : "";
			String _defaultDB 	= args.containsKey("_defaultDB") ? String.valueOf(args.get("_defaultDB")) : "";
			String tcano 		= args.containsKey("tcano") ? String.valueOf(args.get("tcano")) : "";
			String chkdg 		= args.containsKey("chkdg") ? String.valueOf(args.get("chkdg")) : "";
			String year 		= args.containsKey("year") ? String.valueOf(args.get("year")) : "";
			String dno 			= args.containsKey("dno") ? String.valueOf(args.get("dno")) : "";
			String NO_IMPO 		 = "";
			String Impo_singo_no = "";
			String Impo_jechl_no = "";
			args.put("currentMonth",currentMonth);

			if(_defaultDB.equals("ncustoms_gm") || _defaultDB.equals("ncustoms_pt")){
				List<Map> dnolist = itemService.selectDnoList(args);
				NO_IMPO = String.valueOf(dnolist.get(0).get("NO_IMPO"));
				args.put("NO_IMPO",NO_IMPO);
				Impo_singo_no = tcano+""+year+""+currentMonth+""+NO_IMPO+""+chkdg;
				Impo_jechl_no = currentMonth +""+NO_IMPO;
				itemService.updateDnoList(args);
				args.put("Impo_singo_no",Impo_singo_no);
				args.put("Impo_jechl_no",Impo_jechl_no);
			}else{
				args.put("dno",dno);
				List<Map> dnolist = itemService.selectDnoList1(args);
				NO_IMPO = String.valueOf(dnolist.get(0).get("No_impo"));
				args.put("NO_IMPO",NO_IMPO);
				Impo_singo_no = tcano+""+year+""+NO_IMPO+""+chkdg;
				Impo_jechl_no = NO_IMPO;
				itemService.updateDnoList1(args);
				args.put("Impo_singo_no",Impo_singo_no);
				args.put("Impo_jechl_no",Impo_jechl_no);
			}

			args.put("impo_key", getImpoKey);
			args.put("currentDate1", currentDate1);
			itemService.updateInvoiceImpo1ImpoKey(args);
			itemService.insertInvoiceTotalImpo1List(args);
			itemService.updateInvoiceImpo2ImpoKey(args);
			itemService.insertInvoiceTotalImpo2List(args);
			List<Map> list = itemService.selectInvoiceLanList(args);
			String Impum_heang = "";
			for (int i = 0, n = list.size(); i < n; i++) {
				Map result1 = new HashMap();
				result1.put("key_no",key_no);
				result1.put("Imlan_hs",String.valueOf(list.get(i).get("Imlan_hs")));
				List<Map> list2 = itemService.selectInvoiceItemList(result1);
				for (int j = 0, m = list2.size(); j < m; j++) {
					if(j < 10){
						Impum_heang = "0"+String.valueOf(j+1);
					}else{
						Impum_heang = String.valueOf(j+1);
					}
					args.put("im3_seq",String.valueOf(list2.get(j).get("im3_seq")));
					args.put("Impum_lan",String.valueOf(list.get(i).get("Imlan_jechl_lan")));
					args.put("Impum_heang",Impum_heang);
					itemService.updateInvoiceImpo3ImpoKey(args);
					itemService.insertInvoiceTotalImpo3List(args);
				}
			}
			return new ResponseEntity<>(list, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
		}
	}

    @RequestMapping(value = "/modiInvoiceImpo2")
    public ResponseEntity<?> modiInvoiceImpo2(HttpServletRequest request, @RequestBody Map args) throws Exception{
	  	try{
		  	long result = itemService.modiInvoiceImpo2(args);
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

    @RequestMapping(value = "/selectItemInfo")
    public ResponseEntity<?> selectItemInfo(HttpServletRequest request, @RequestBody Map args){
	  	if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  		return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	  	try{
	  		List<Map> itemList = itemService.selectItemInfo(args);
	  		List<?> result = itemList.stream().collect(Collectors.toList());
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch (Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

    @RequestMapping(value = "/selectFtaManagementVendorList")
    public ResponseEntity<?> selectFtaManagementVendorList(HttpServletRequest request, @RequestBody Map args){
	  	if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  		return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	  	try{
	  		List<Map> itemList = itemService.selectFtaManagementVendorList(args);
	  		List<?> result = itemList.stream().collect(Collectors.toList());
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch (Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

    @RequestMapping(value = "/selectFtaManagementList")
    public ResponseEntity<?> selectFtaManagementList(HttpServletRequest request, @RequestBody Map args){
	  	if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  		return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	  	try{
	  		List<Map> itemList = itemService.selectFtaManagementList(args);
	  		List<?> result = itemList.stream().collect(Collectors.toList());
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch (Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

    @RequestMapping(value = "/selectItemSebList")
    public ResponseEntity<?> selectItemSebList(HttpServletRequest request, @RequestBody Map args){
	  	if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  		return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	  	try{
	  		String mmodelCodeArray[] = String.valueOf(args.get("Mmodel_code")).split(",");
			if (args.containsKey("Mmodel_code") && mmodelCodeArray.length > 1) {
				ArrayList<String> mmodelCodeArrayList = new ArrayList(Arrays.asList(mmodelCodeArray));
				String mmodelCodeList = CmmnUtils.convertArrayToStringIn(mmodelCodeArrayList);
				args.put("mmodelCodeList", mmodelCodeList);
				args.put("Mmodel_code", "");
			}

			long result1 = itemService.updateStatus4(args); // status 2,3이면서 최초통관일이 있는건을 status 4로 바꿈. 22.01.06 방경숙관세사 요청
	  		List<Map> itemList = itemService.selectItemSebList(args);
	  		List<?> result = itemList.stream().collect(Collectors.toList());
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch (Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

    @RequestMapping(value = "/getItemSettingList")
	public ResponseEntity<?> getItemSettingList(HttpServletRequest request, @RequestBody Map args) throws Exception{
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = itemService.getItemSettingList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
		}
	}



  @RequestMapping(value = "/getItemMasterList")
  public ResponseEntity<?> getItemMasterList(HttpServletRequest request, @RequestBody Map args) {
	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
	  if (!userId.startsWith("test")) {
		String mcoName = args.containsKey("mcoName") ? String.valueOf(args.get("mcoName")) : null;
		if (CmmnUtils.isNull(mcoName)) {
		  Object[] parameter = {-1, userId + "님 업체명은 필수사항 입니다1", ""};
		  throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
		}
	  }

	  args.put("_userId", userId);
	  args.put("_Auth", CmmnUtils.getUserAuth(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_GRADE))));
	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))),
			  Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))),
			  CmmnUtils.getOrders(args, new Sort(Sort.Direction.DESC, "itemUseYn").and(new Sort(Sort.Direction.ASC, "itemKey"))));
	  Page<SooMst_ItemMasterVO> list = itemService.getItemMasterList(args, pageRequest);

	  Class<?> clazz;
	  if (args.containsKey("_searchType")) {
		switch (String.valueOf(args.get("_searchType"))) {
		  case "A":
			clazz = ItemMasterDTO.searchResponse.class; //리스트용
			break;
		  default:
			clazz = SooMst_ItemMasterVO.class;
			break;
		}
	  } else {
		clazz = SooMst_ItemMasterVO.class;
	  }
	  Class<?> desinationClazz = clazz;

	  List<?> result = list.getContent().stream()
			  .map(vo -> modelMapper.map(vo, desinationClazz))
			  .collect(Collectors.toList());

	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.getTotalElements()), HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
	}
  }


  /**
   * Gets item master list.(new)
   *
   * @param request the request
   * @param args    the args
   * @return the item master list
   */
  @RequestMapping(value = "/getItemMasterList2")
  public ResponseEntity<?> getItemMasterList2(HttpServletRequest request, @RequestBody Map args) {
	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
	  if (!userId.startsWith("test")) {
		String mcoName = args.containsKey("mcoName") ? String.valueOf(args.get("mcoName")) : null;
		if (CmmnUtils.isNull(mcoName)) {
		  Object[] parameter = {-1, userId + "님 업체명은 필수사항 입니다2", ""};
		  throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
		}
	  }

	  args.put("_userId", userId);
	  args.put("_Auth", CmmnUtils.getUserAuth(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_GRADE))));
	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
	  List<SooMst_ItemMasterVO> list = itemService.getItemMasterList2(args);

	  Class<?> clazz;
	  if (args.containsKey("_searchType")) {
		switch (String.valueOf(args.get("_searchType"))) {
		  case "A":
			clazz = ItemMasterDTO.searchResponse.class; //리스트용
			break;
		  default:
			clazz = SooMst_ItemMasterVO.class;
			break;
		}
	  } else {
		clazz = SooMst_ItemMasterVO.class;
	  }

	  Class<?> desinationClazz = clazz;
	  List<?> result = list.stream().map(vo -> modelMapper.map(vo, desinationClazz)).skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());

	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
	}
  }

  /**
   * Gets item master popup list.
   *
   * @param request the request
   * @param args    the args
   * @return the item master popup list
   */
//  @RequestMapping(value = "/getItemMasterPopupList")
//  public ResponseEntity<?> getItemMasterPopupList(HttpServletRequest request, @RequestBody Map args) {
//	if (CmmnUtil.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	try {
//	  args.put("_userId", getUserInfo(request, CmmnConstants.SESSION_USERID));
//	  args.put("_Auth", getUserAuth(String.valueOf(getUserInfo(request, CmmnConstants.SESSION_GRADE))));
//	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", 0))),
//			  Integer.parseInt(String.valueOf(args.getOrDefault("size", 20))),
//			  new Sort(Sort.Direction.DESC, "itemUseYn").and(new Sort(Sort.Direction.ASC, "itemKey")));
//	  List<ItemMasterDTO.popupResponse> list = itemService.getItemMasterPopupList(args, pageRequest);
//
//	  List<?> result = list.stream()
//			  .collect(Collectors.toList());
//
//	  return new ResponseEntity<>(result, HttpStatus.OK);
//	} catch (Exception e) {
//	  getCommonErrorLogger(e, args);
//	  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//	}
//  }
  @RequestMapping(value = "/getItemMasterPopupList")
  public ResponseEntity<?> getItemMasterPopupList(HttpServletRequest request, @RequestBody Map args) {
	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  args.put("_userId", CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
	  args.put("_Auth", CmmnUtils.getUserAuth(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_GRADE))));
	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))),
			  Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))),
			  CmmnUtils.getOrders(args, new Sort(Sort.Direction.DESC, "itemUseYn").and(new Sort(Sort.Direction.ASC, "itemKey"))));
	  Page<SooMst_ItemMasterVO> list = itemService.getItemMasterList(args, pageRequest);
	  List<?> result = list.getContent().stream().map(vo -> modelMapper.map(vo, ItemMasterDTO.popupResponse.class)).collect(Collectors.toList());

	  return new ResponseEntity<>(result, HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
  }

  /**
   * Save item master info response entity.(new)
   *
   * @param request the request
   * @param map     the map
   * @return the response entity
   * @throws Exception the exception
   */
  @RequestMapping("/saveItemMasterInfo")
  public ResponseEntity<?> saveItemMasterInfo(HttpServletRequest request, @RequestBody Map map) throws Exception {
	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  Map targetMap = map;
	  SooMst_ItemMasterVO itemMasterVO = modelMapper.map(targetMap, SooMst_ItemMasterVO.class);
	  SooMst_ItemMasterVO returnVO = itemService.saveItemMaster(itemMasterVO, request);
	  return new ResponseEntity<>(returnVO, HttpStatus.CREATED);
	} catch (Exception e) {
	  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
  }



  /**
   * Save item info response entity.(자재정보 저장(old))
   *
   * @param request the request
   * @param args    the args
   * @return the response entity
   * @throws Exception the exception
   */
  @RequestMapping(value = "/saveItem")
  public ResponseEntity<?> saveItemInfo(HttpServletRequest request, @RequestBody Map args) throws Exception {
	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  args.put("_userId", CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
	  args.put("_Auth", CmmnUtils.getUserAuth(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_GRADE))));
	  List<String> userNameList = Arrays.asList(CmmnUtils.parseStringByBytes(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME)), 10, "euc-kr"));
	  args.put("_user", userNameList.get(0));
	  long result = itemService.saveItemConfirmStatus(args);
	  return new ResponseEntity<>(result, HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
  }

  /**
   * Gets item history list.(자재통관이력 리스트(old))
   *
   * @param request the request
   * @param args    the args
   * @return the item history list
   * @throws Exception the exception
   */
  @RequestMapping(value = "/getItemHistoryList")
  public ResponseEntity<?> getItemHistoryList(HttpServletRequest request, @RequestBody Map args) throws Exception {
	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  checkPagingParamsForMapper(args);
	  args.put("_userId", CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
	  args.put("_Auth", CmmnUtils.getUserAuth(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_GRADE))));
	  args.put("_defaultDB", getUserInfoSettingDB(request, args));
	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
	  List<Map> historyList = itemService.getItemHistoryList(args);
	  List<?> result = historyList.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, historyList.size()), HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
  }

  /**
   * Gets soo mst item history list.(자재통관이력 리스트(new, soo_MST))
   *
   * @param request the request
   * @param args    the args
   * @return the soo mst item history list
   * @throws Exception the exception
   */
  @RequestMapping(value = "/getSooMstItemHistoryList")
  public ResponseEntity<?> getSooMstItemHistoryList(HttpServletRequest request, @RequestBody Map args) throws Exception {
	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  args.put("_userId", CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
	  args.put("_Auth", CmmnUtils.getUserAuth(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_GRADE))));
	  args.put("_defaultDB", getUserInfoSettingDB(request, args));
	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
	  List<Map> historyList = itemService.getSooMstItemHistoryList(args);
	  List<?> result = historyList.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, historyList.size()), HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
  }


  /**
   * Gets item amd detail history list.(자재변경이력 추이(차트/그리드用)(old))
   *
   * @param request the request
   * @param args    the args
   * @return the item amd detail history list
   * @throws Exception the exception
   */
  @RequestMapping(value = "/getItemAmdDetailHistoryList")
  public ResponseEntity<?> getItemAmdDetailHistoryList(HttpServletRequest request, @RequestBody Map args) throws Exception {
	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  checkPagingParamsForMapper(args);
	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
	  List<Map> list = itemHistoryService.getItemAmdDetailHistoryList(args);
	  List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
  }

  /**
   * Save item attach file additional info response entity.(자재 추가정보 저장(old))
   *
   * @param request the request
   * @param map     the map
   * @return the response entity
   * @throws Exception the exception
   */
  @RequestMapping(value = "/saveItemAttachFileAdditionalInfo")
  public ResponseEntity<?> saveItemAttachFileAdditionalInfo(HttpServletRequest request, @RequestBody Map map) throws Exception {
	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  // validation
	  Map targetMap = map;
	  ItemAttachFileDTO.additionalInfo additionalInfo = modelMapper.map(targetMap, ItemAttachFileDTO.additionalInfo.class);
	  additionalInfo.setEditUserId(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID)));
	  additionalInfo.setEditDate(new Date());
	  Set<ConstraintViolation<ItemAttachFileDTO.additionalInfo>> validator = isCommonValid(additionalInfo);
	  if (validator.size() > 0) {
		return new ResponseEntity<>(validator, HttpStatus.BAD_REQUEST);
	  }

	  ItemAttachFileVO returnVO = itemFileService.saveItemAttachFileAdditionalInfo(additionalInfo, request);
	  return new ResponseEntity<>(returnVO, HttpStatus.CREATED);
	} catch (Exception e) {
	  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
  }

  /**
   * Gets item result import unit price list.
   *
   * @param request the request
   * @param args    the args
   * @return the item result import unit price list
   * @throws Exception the exception
   */
  @RequestMapping(value = "/getItemResultImportUnitPriceList")
  public ResponseEntity<?> getItemResultImportUnitPriceList(HttpServletRequest request, @RequestBody Map args) throws Exception {
	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  checkPagingParamsForMapper(args);
	  String impoNapseSaup = args.containsKey("impoNapseSaup") ? String.valueOf(args.get("impoNapseSaup")) : null;
	  String itemMcountNo = CmmnUtils.isContainsMapValue(args, "itemMcountNo") ? String.valueOf(args.get("itemMcountNo")) : null;
	  String itemMmodelCode = CmmnUtils.isContainsMapValue(args, "itemMmodelCode") ? String.valueOf(args.get("itemMmodelCode")) : null;
	  if (CmmnUtils.isNull(impoNapseSaup) && (CmmnUtils.isNull(itemMcountNo) || CmmnUtils.isNull(itemMmodelCode))) {
		Object[] parameter = {CmmnConstants.ECODE_FAILURE, "필수검색조건 오류", ""};
		throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
	  }
	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
	  List<Map> list = itemService.getItemResultImportUnitPriceList(args);
	  List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());

	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
	}
  }

  /**
   * Gets item result import unit price same deleted list.
   *
   * @param request the request
   * @param args    the args
   * @return the item result import unit price same deleted list
   * @throws Exception the exception
   */
  @RequestMapping(value = "/getItemResultImportUnitPriceSameDeletedList")
  public ResponseEntity<?> getItemResultImportUnitPriceSameDeletedList(HttpServletRequest request, @RequestBody Map args) throws Exception {
	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  checkPagingParamsForMapper(args);
	  String impoNapseSaup = args.containsKey("impoNapseSaup") ? String.valueOf(args.get("impoNapseSaup")) : null;
	  String itemMcountNo = CmmnUtils.isContainsMapValue(args, "itemMcountNo") ? String.valueOf(args.get("itemMcountNo")) : null;
	  String itemMmodelCode = CmmnUtils.isContainsMapValue(args, "itemMmodelCode") ? String.valueOf(args.get("itemMmodelCode")) : null;
	  if (CmmnUtils.isNull(impoNapseSaup) && (CmmnUtils.isNull(itemMcountNo) || CmmnUtils.isNull(itemMmodelCode))) {
		Object[] parameter = {CmmnConstants.ECODE_FAILURE, "필수검색조건 오류", ""};
		throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
	  }
	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
	  List<Map> list = itemService.getItemResultImportUnitPriceSameDeletedList(args);
	  List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());

	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
	}
  }

  /**
   * Gets item result import rowdata unit price list.
   *
   * @param request the request
   * @param args    the args
   * @return the item result import rowdata unit price list
   * @throws Exception the exception
   */
  @RequestMapping(value = "/getItemResultImportRowdataUnitPriceList")
  public ResponseEntity<?> getItemResultImportRowdataUnitPriceList(HttpServletRequest request, @RequestBody Map args) throws Exception {
	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  String impoNapseSaup = args.containsKey("impoNapseSaup") ? String.valueOf(args.get("impoNapseSaup")) : null;
	  if (CmmnUtils.isNull(impoNapseSaup)) {
		Object[] parameter = {CmmnConstants.ECODE_FAILURE, "사업자번호 오류", ""};
		throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
	  }
	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))),
			  Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))),
			  CmmnUtils.getOrders(args, new Sort(Sort.Direction.ASC, "impoNapseSaup")));
	  Page<ResultEtlImportUnitPriceVO> list = itemService.getItemResultImportRowdataUnitPriceList(args, pageRequest);

	  return new ResponseEntity<>(list, HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
	}
  }











  @RequestMapping(value = "/saveItemCountList")
  public ResponseEntity<?> saveItemCountList(HttpServletRequest request, @RequestBody Map args) throws Exception {
	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  String formatDate = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
	  args.put("addDtm", formatDate); // 파일명
	  args.put("addUserId", CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
	  Map result = itemService.saveItemCountList(args);
	  return new ResponseEntity<>(result, HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
  }

  @RequestMapping(value = "/getImpoPlCodeList")
  public ResponseEntity<?> getImpoPlCodeList(HttpServletRequest request, @RequestBody Map args) {
	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  List<Map> list;
	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
	  list = itemService.getImpoPlCodeList(args);
	  List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
  }

  @RequestMapping(value = "/getImpoPlCodeDetailList")
  public ResponseEntity<?> getImpoPlCodeDetailList(HttpServletRequest request, @RequestBody Map args) {
	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  List<Map> list;
	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
	  list = itemService.getImpoPlCodeDetailList(args);
	  List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
  }

  @RequestMapping(value = "/getImpoPlCodeExcelList")
  public ResponseEntity<?> getImpoPlCodeExcelList(HttpServletRequest request, @RequestBody Map args) {
	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  List<Map> list;
	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
	  list = itemService.getImpoPlCodeExcelList(args);
	  List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
  }

  @RequestMapping(value = "/downloadManage")
	public void downloadManage(HttpServletRequest request, @RequestParam String _DateType, @RequestParam String strFromDate,
			@RequestParam String strToDate, @RequestParam String impoBlNo, @RequestParam String impoSingoNo,
			@RequestParam String impumIvNo, @RequestParam String mdivisionCode,	@RequestParam String impumJajaeCode,
			@RequestParam String taxNum, HttpServletResponse response) throws UnsupportedEncodingException{
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return;

		ManageExcel excelResultHandler = null;

		try {
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			excelResultHandler = new ManageExcel(response);

			Map map = new HashMap();
			map.put("_DateType", _DateType);
			map.put("strFromDate", strFromDate);
			map.put("strToDate", strToDate);
			map.put("impoBlNo", impoBlNo);
			map.put("impoSingoNo", impoSingoNo);
			map.put("impumIvNo", impumIvNo);
			map.put("mdivisionCode", mdivisionCode);
			map.put("impumJajaeCode", impumJajaeCode);
			map.put("taxNum", taxNum);

			sessionTempItemDao.importManage("com.edwards.biz.itemMng.ItemMapper.selectImportManagement", map, excelResultHandler);
		}catch(Exception ex){
			throw new RuntimeException(ex);
		}finally{
			if(excelResultHandler != null){
				try{ excelResultHandler.close();}catch(Exception ex){}
			}
		}
	}

  @RequestMapping(value = "/downloadManage1")
	public void downloadManage1(HttpServletRequest request, @RequestParam String _DateType, @RequestParam String strFromDate,
			@RequestParam String strToDate, @RequestParam String impoBlNo, @RequestParam String impoSingoNo,
			@RequestParam String impumIvNo, @RequestParam String mdivisionCode,	@RequestParam String impumJajaeCode,
			@RequestParam String taxNum, HttpServletResponse response) throws UnsupportedEncodingException{
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return;

		ManageExcel1 excelResultHandler = null;

		try {
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			excelResultHandler = new ManageExcel1(response);

			Map map = new HashMap();
			map.put("_DateType", _DateType);
			map.put("strFromDate", strFromDate);
			map.put("strToDate", strToDate);
			map.put("impoBlNo", impoBlNo);
			map.put("impoSingoNo", impoSingoNo);
			map.put("impumIvNo", impumIvNo);
			map.put("mdivisionCode", mdivisionCode);
			map.put("impumJajaeCode", impumJajaeCode);
			map.put("taxNum", taxNum);

			sessionTempItemDao.importManage1("com.edwards.biz.itemMng.ItemMapper.selectImportManagement", map, excelResultHandler);
		}catch(Exception ex){
			throw new RuntimeException(ex);
		}finally{
			if(excelResultHandler != null){
				try{ excelResultHandler.close();}catch(Exception ex){}
			}
		}
	}


    @RequestMapping(value = "/insertCUAA130")
    public ResponseEntity<?> insertCUAA130(HttpServletRequest request, @RequestBody Map args) throws Exception{
	  	try{
	  		String CUAA130Key 	= args.containsKey("CUAA130Key") ? String.valueOf(args.get("CUAA130Key")) : "";
	  		String PrvStatus 	= args.containsKey("PrvStatus") ? String.valueOf(args.get("PrvStatus")) : "";
	  		String Status 		= args.containsKey("Status") ? String.valueOf(args.get("Status")) : "";
	  		String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
	  		args.put("_userId", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID)));
	  		args.put("_userNm", String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
	  		args.put("_currentDatetime", currentDatetime);

	  		if((Integer.parseInt(PrvStatus) > Integer.parseInt(Status)) && (Integer.parseInt(PrvStatus) < 5)){
	  			args.put("Status", PrvStatus);
	  		}

	  		if(CUAA130Key.equals("")){
	  			long result = itemService.insertCUAA130(args);
	  			return new ResponseEntity<>(result, HttpStatus.OK);
	  		}else{
	  			long result = itemService.updateCUAA130(args);
	  			return new ResponseEntity<>(result, HttpStatus.OK);
	  		}
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

    @RequestMapping(value = "/selectCUAA130")
    public ResponseEntity<?> selectCUAA130(HttpServletRequest request, @RequestBody Map args){
	  	if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  		return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	  	try{
	  		List<Map> itemList = itemService.selectCUAA130(args);
	  		List<?> result = itemList.stream().collect(Collectors.toList());
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch (Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

    @RequestMapping(value = "/selectImpoPlCodeList")
    public ResponseEntity<?> selectImpoPlCodeList(HttpServletRequest request, @RequestBody Map args){
	  	if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  		return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	  	try{
	  		List<Map> itemList = itemService.selectImpoPlCodeList(args);
	  		List<?> result = itemList.stream().collect(Collectors.toList());
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch (Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

    @RequestMapping(value = "/selectImpoPlCodeDetailList")
    public ResponseEntity<?> selectImpoPlCodeDetailList(HttpServletRequest request, @RequestBody Map args){
	  	if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  		return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	  	try{
	  		List<Map> itemList = itemService.selectImpoPlCodeDetailList(args);
	  		List<?> result = itemList.stream().collect(Collectors.toList());
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch (Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

    @RequestMapping(value = "/selectImpoPlCodeExcelList")
    public ResponseEntity<?> selectImpoPlCodeExcelList(HttpServletRequest request, @RequestBody Map args){
	  	if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  		return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	  	try{
	  		List<Map> itemList = itemService.selectImpoPlCodeExcelList(args);
	  		List<?> result = itemList.stream().collect(Collectors.toList());
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch (Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }
}