package com.edwards.web.edms;

import com.edwards.biz.customsManagement.FtpClient;
import com.edwards.biz.edmsManagement.CpsEdmsFileDTO;
import com.edwards.biz.edmsManagement.CpsZeissFileDownDao;
import com.edwards.biz.edmsManagement.EdmsFileDTO;
import com.edwards.biz.edmsManagement.EdmsManagementService;
import com.edwards.biz.edmsManagement.EdmsMasterDao;
import com.edwards.biz.edmsManagement.FtpLogDao;
import com.edwards.biz.edmsManagement.LogFileDao;
import com.edwards.commons.*;
import com.edwards.domains.CpsEdmsAttachFileVO;
import com.edwards.domains.CpsZeissFileDownVO;
import com.edwards.domains.EdmsAttachFileVO;
import com.edwards.domains.EdmsMasterVO;
import com.edwards.domains.FtpLogVO;
import com.edwards.domains.LogFileVO;

import org.apache.commons.lang3.math.NumberUtils;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.ConstraintViolation;

import java.io.*;
import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import static com.edwards.commons.CmmnUtils.getUserInfo;

/**
 * The type Edms file controller.
 */
@RestController
@RequestMapping(value = {"/apis/edms"}, method = {RequestMethod.POST})
public class EdmsController extends CmmnController {
	@Autowired
	private EdmsManagementService edmsManagementService;
	@Autowired
	private LogFileDao logFileDao;
	@Autowired
	private FtpLogDao ftpLogDao;
	@Autowired
	private EdmsMasterDao edmsMasterDao;
	@Autowired
	private CpsZeissFileDownDao cpsZeissFileDownDao;
	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	private MessageSource messageSource;
	/**
	 * The Edms file upload path.
	 */
	@Value("${upload.path.edms}")
	public String edmsFileUploadPath;
	/**
	 * The Edms file deleted path.
	 */
	@Value("${deleted.path.edms}")
	public String edmsFileDeletedPath;
	/**
	 * The Sein company tax num.
	 */
	@Value("${com.sein.taxnum}")
	public String seinCompanyTaxNum;
	/**
	 * The Geows tax num.
	 */
	@Value("${asml.main.taxNum}")
	public String asmlTaxNum;

	@RequestMapping(value = "/selectEdmsFileListNew")
	public ResponseEntity<?> selectEdmsFileListNew(HttpServletRequest request, @RequestBody Map args){
		if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = edmsManagementService.selectEdmsFileListNew(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectEdmsFileList")
	public ResponseEntity<?> selectEdmsFileList(HttpServletRequest request, @RequestBody Map args){
		if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			checkPagingParamsForMapper(args);
			PageRequest pageRequest = new PageRequest(0, 50);
			List<Map> list = new ArrayList<>();
			list = edmsManagementService.selectEdmsFileList1(args);
			List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
			return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveEdmsFileAdditionalInfo")
	public ResponseEntity<?> saveEdmsFileAdditionalInfo(HttpServletRequest request, @RequestBody Map args) throws Exception {
		if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			Map targetMap = args;
			CpsEdmsFileDTO.additionalInfo additionalInfo = CmmnUtils.convertMapToBean(targetMap, CpsEdmsFileDTO.additionalInfo.class);

			CpsEdmsAttachFileVO returnVO = edmsManagementService.saveEdmsFileAdditionalInfo(additionalInfo, request);
			return new ResponseEntity<>(returnVO, HttpStatus.CREATED);
		}catch(Exception e){
			Map errMap = new HashMap();
			errMap.put("args", args);
			return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/uploadEdmsFileNew")
	public ResponseEntity<?> uploadEdmsFileNew(MultipartHttpServletRequest mRequest, HttpServletRequest request) throws Exception{
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID))){
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}

		Map errMap = new HashMap<>();
		CpsEdmsAttachFileVO returnVO 			= new CpsEdmsAttachFileVO();
		CpsEdmsAttachFileVO CpsEdmsAttachFileVO = new CpsEdmsAttachFileVO();
		String userId 			= String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID));
		String userName 		= String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERNAME));
		String serverGubun 		= String.valueOf(getUserInfo(request, CmmnConstants.SESSION_SERVER_GUBUN));
		String serverIpAddr 	= String.valueOf(getUserInfo(request, CmmnConstants.SESSION_SERVER_IP));
		String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
		String yyyymmdd 		= CmmnUtils.getFormatedDate("yyyyMMdd");
		String uploadPathType 	= edmsFileUploadPath;

		CpsEdmsAttachFileVO.setEdmsParentGbn(mRequest.getParameter("EdmsParentGbn"));
		CpsEdmsAttachFileVO.setEdmsJisaCode(mRequest.getParameter("EdmsJisaCode"));
		CpsEdmsAttachFileVO.setEdmsSaup(mRequest.getParameter("EdmsSaup"));
		CpsEdmsAttachFileVO.setEdmsMasterKey(mRequest.getParameter("EdmsMasterKey"));
		CpsEdmsAttachFileVO.setEdmsMkey(mRequest.getParameter("EdmsMKey"));
		CpsEdmsAttachFileVO.setEdmsNo(mRequest.getParameter("EdmsNo"));
		CpsEdmsAttachFileVO.setEdmsSingoNo(mRequest.getParameter("EdmsSingoNo"));
		CpsEdmsAttachFileVO.setCommonYn(mRequest.getParameter("CommonYn"));
		CpsEdmsAttachFileVO.setEdmsFileCategory(mRequest.getParameter("EdmsFileCategory"));
		CpsEdmsAttachFileVO.setEdmsFileUploadType(mRequest.getParameter("EdmsFileUploadType"));
		CpsEdmsAttachFileVO.setEdmsFileStatus(mRequest.getParameter("EdmsFileStatus"));
		CpsEdmsAttachFileVO.setUseYn("Y");
		CpsEdmsAttachFileVO.setAddUserKey("0");
		CpsEdmsAttachFileVO.setAddUserId(userId);
		CpsEdmsAttachFileVO.setAddUserNm(userName);
		CpsEdmsAttachFileVO.setAddDtm(currentDatetime);
		CpsEdmsAttachFileVO.setEditUserId(userId);
		CpsEdmsAttachFileVO.setEditUserNm(userName);
		CpsEdmsAttachFileVO.setEditDtm(currentDatetime);

		String uploadPath = uploadPathType + yyyymmdd + File.separator;
		File dir = new File(uploadPath);
		if (!dir.isDirectory()) {
			dir.mkdirs();
		}

		MultiValueMap<String, MultipartFile> map = mRequest.getMultiFileMap();
		Iterator<String> iter = map.keySet().iterator();
		while(iter.hasNext()){
			String str = iter.next();
			List<MultipartFile> fileList = map.get(str);
			for (MultipartFile mpf : fileList){
				String originalFileName = CmmnFileUtils.convertOriginalFileName(mpf.getOriginalFilename());
				System.out.println("#########"+originalFileName);
				if (CmmnFileUtils.isContainsChinese(originalFileName) || CmmnFileUtils.isContainsJapanese(originalFileName) || CmmnFileUtils.isFileNameContainSpecialCharacter(originalFileName)){
					return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
				}
				long fileSize 		= mpf.getSize();
				String saveFileName = originalFileName.substring(originalFileName.lastIndexOf(".") + 1, originalFileName.length())+"_"+currentDatetime+"_"+CmmnUtils.randString(8);
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
						boolean result2 = ftp_ivr2.upload(file1, "/Web/seincustoms/edms_file/"+yyyymmdd+"/"+saveFileName);
						
//						mpf.transferTo(new File(uploadPath + saveFileName));
						CpsEdmsAttachFileVO.setEdmsFilePath(uploadPath);
						CpsEdmsAttachFileVO.setEdmsSaveFileNm(saveFileName);
						CpsEdmsAttachFileVO.setEdmsOrgFileNm(originalFileName);
						CpsEdmsAttachFileVO.setEdmsFileSize(BigDecimal.valueOf(fileSize));
						CpsEdmsAttachFileVO.setEdmsFileExt((originalFileName.lastIndexOf(".") == -1) ? "" : originalFileName.substring(originalFileName.lastIndexOf(".") + 1, originalFileName.length()));
						CpsEdmsAttachFileVO saveVO = modelMapper.map(CpsEdmsAttachFileVO, CpsEdmsAttachFileVO.class);
						returnVO = saveAttachFile(saveVO, request);
					}catch(IllegalStateException e){
						e.printStackTrace();
						errMap.put("EDMS_NUM", returnVO.getEdmsNo());
						errMap.put("EDMS_PARENT_GUBUN", returnVO.getEdmsParentGbn());
						errMap.put("EDMS_FILE_KEY", returnVO.getSDAAKey());
						errMap.put("_errorCause", "IllegalStateException");
						return new ResponseEntity<>(errMap, HttpStatus.BAD_REQUEST);
					}catch (IOException e){
						e.printStackTrace();
						errMap.put("EDMS_NUM", returnVO.getEdmsNo());
						errMap.put("EDMS_PARENT_GUBUN", returnVO.getEdmsParentGbn());
						errMap.put("EDMS_FILE_KEY", returnVO.getSDAAKey());
						errMap.put("_errorCause", "IOException");
						return new ResponseEntity<>(errMap, HttpStatus.BAD_REQUEST);
					}
					
					File file = new File("C:\\hspass\\"+saveFileName);
	                if( file.exists() ){
	                	file.delete();
	                };
				}
			}
		}
		return new ResponseEntity<>(returnVO, HttpStatus.OK);
	}

	@RequestMapping(value = "/uploadEdmsFile")
	public ResponseEntity<?> uploadEdmsFile(MultipartHttpServletRequest mRequest, HttpServletRequest request) throws Exception{
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID))){
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}

		Map errMap = new HashMap<>();
		CpsEdmsAttachFileVO returnVO 			= new CpsEdmsAttachFileVO();
		CpsEdmsAttachFileVO CpsEdmsAttachFileVO = new CpsEdmsAttachFileVO();
		String userId 			= String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID));
		String userName 		= String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERNAME));
		String serverGubun 		= String.valueOf(getUserInfo(request, CmmnConstants.SESSION_SERVER_GUBUN));
		String serverIpAddr 	= String.valueOf(getUserInfo(request, CmmnConstants.SESSION_SERVER_IP));
		String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
		String yyyymmdd 		= CmmnUtils.getFormatedDate("yyyyMMdd");
		String uploadPathType 	= edmsFileUploadPath;

		CpsEdmsAttachFileVO.setEdmsParentGbn(mRequest.getParameter("edmsParentGbn"));
		CpsEdmsAttachFileVO.setEdmsJisaCode(mRequest.getParameter("edmsJisaCode"));
		CpsEdmsAttachFileVO.setEdmsMasterKey("");
		CpsEdmsAttachFileVO.setEdmsMkey(mRequest.getParameter("edmsMKey"));
		CpsEdmsAttachFileVO.setEdmsNo(mRequest.getParameter("edmsNo"));
		CpsEdmsAttachFileVO.setEdmsSingoNo(mRequest.getParameter("edmsSingoNo"));
		CpsEdmsAttachFileVO.setCommonYn(mRequest.getParameter("commonYn"));
		CpsEdmsAttachFileVO.setEdmsFileCategory(mRequest.getParameter("edmsFileCategory"));
		CpsEdmsAttachFileVO.setEdmsFileUploadType("EDMS");
		CpsEdmsAttachFileVO.setEdmsFileStatus(mRequest.getParameter("edmsFileStatus"));
		CpsEdmsAttachFileVO.setUseYn("Y");
		CpsEdmsAttachFileVO.setAddUserKey("0");
		CpsEdmsAttachFileVO.setAddUserId(userId);
		CpsEdmsAttachFileVO.setAddUserNm(userName);
		CpsEdmsAttachFileVO.setAddDtm(currentDatetime);
		CpsEdmsAttachFileVO.setEditUserId(userId);
		CpsEdmsAttachFileVO.setEditUserNm(userName);
		CpsEdmsAttachFileVO.setEditDtm(currentDatetime);

		String uploadPath = uploadPathType + yyyymmdd + File.separator;
		File dir = new File(uploadPath);
		if (!dir.isDirectory()) {
			dir.mkdirs();
		}

		MultiValueMap<String, MultipartFile> map = mRequest.getMultiFileMap();
		Iterator<String> iter = map.keySet().iterator();
		while(iter.hasNext()){
			String str = iter.next();
			List<MultipartFile> fileList = map.get(str);
			for (MultipartFile mpf : fileList){
				String originalFileName = CmmnFileUtils.convertOriginalFileName(mpf.getOriginalFilename());
				System.out.println("#########"+originalFileName);
				if (CmmnFileUtils.isContainsChinese(originalFileName) || CmmnFileUtils.isContainsJapanese(originalFileName) || CmmnFileUtils.isFileNameContainSpecialCharacter(originalFileName)){
					return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
				}
				long fileSize 		= mpf.getSize();
//				String saveFileName = originalFileName.substring(0, originalFileName.lastIndexOf("."));
				String saveFileName = originalFileName.substring(originalFileName.lastIndexOf(".") + 1, originalFileName.length())+"_"+currentDatetime+"_"+CmmnUtils.randString(8);
				String body, ext;
				long sysTime = System.currentTimeMillis();

				if(!CmmnUtils.isNull(saveFileName) && !saveFileName.equals("")){
					if(new File(uploadPath + saveFileName).exists()){
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
					}

					try{
						mpf.transferTo(new File(uploadPath + saveFileName));
						CpsEdmsAttachFileVO.setEdmsFilePath(uploadPath);
						CpsEdmsAttachFileVO.setEdmsSaveFileNm(saveFileName);
						CpsEdmsAttachFileVO.setEdmsOrgFileNm(originalFileName);
						CpsEdmsAttachFileVO.setEdmsFileSize(BigDecimal.valueOf(fileSize));
						CpsEdmsAttachFileVO.setEdmsFileExt((originalFileName.lastIndexOf(".") == -1) ? "" : originalFileName.substring(originalFileName.lastIndexOf(".") + 1, originalFileName.length()));
						CpsEdmsAttachFileVO saveVO = modelMapper.map(CpsEdmsAttachFileVO, CpsEdmsAttachFileVO.class);
						returnVO = saveAttachFile(saveVO, request);
					}catch(IllegalStateException e){
						e.printStackTrace();
						errMap.put("EDMS_NUM", returnVO.getEdmsNo());
						errMap.put("EDMS_PARENT_GUBUN", returnVO.getEdmsParentGbn());
						errMap.put("EDMS_FILE_KEY", returnVO.getSDAAKey());
						errMap.put("_errorCause", "IllegalStateException");
						return new ResponseEntity<>(errMap, HttpStatus.BAD_REQUEST);
					}catch (IOException e){
						e.printStackTrace();
						errMap.put("EDMS_NUM", returnVO.getEdmsNo());
						errMap.put("EDMS_PARENT_GUBUN", returnVO.getEdmsParentGbn());
						errMap.put("EDMS_FILE_KEY", returnVO.getSDAAKey());
						errMap.put("_errorCause", "IOException");
						return new ResponseEntity<>(errMap, HttpStatus.BAD_REQUEST);
					}
				}
			}
		}
		return new ResponseEntity<>(returnVO, HttpStatus.OK);
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
	public CpsEdmsAttachFileVO saveAttachFile(CpsEdmsAttachFileVO CpsEdmsAttachFileVO, HttpServletRequest request) throws Exception{
		CpsEdmsAttachFileVO returnVO = edmsManagementService.saveEdmsFileInfo(CpsEdmsAttachFileVO, request);
		saveFileLogInfo(returnVO, request, "edms파일업로드");
		return returnVO;
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
	public void saveFileLogInfo(CpsEdmsAttachFileVO CpsEdmsAttachFileVO, HttpServletRequest request, String actionStr){
		LogFileVO logFileVO = new LogFileVO();
		logFileVO.setFileKey(NumberUtils.createBigDecimal(String.valueOf(CpsEdmsAttachFileVO.getSDAAKey())));
		logFileVO.setFileParentId(String.valueOf(CpsEdmsAttachFileVO.getEdmsNo()));
		logFileVO.setFileParentType(CpsEdmsAttachFileVO.getEdmsParentGbn());
		logFileVO.setFileDocGroup(CpsEdmsAttachFileVO.getEdmsFileCategory());
		logFileVO.setFilePath(CpsEdmsAttachFileVO.getEdmsFilePath());
		logFileVO.setFileName(CpsEdmsAttachFileVO.getEdmsOrgFileNm());
		logFileVO.setFileAction(actionStr);
		logFileVO.setAddUserId(String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID)));
		logFileVO.setFileServerGubun(String.valueOf(getUserInfo(request, CmmnConstants.SESSION_SERVER_GUBUN)));
		logFileVO.setFileServerIp(String.valueOf(getUserInfo(request, CmmnConstants.SESSION_SERVER_IP)));
		logFileVO.setFileClientIp(String.valueOf(getUserInfo(request, CmmnConstants.SESSION_CLIENT_IP)));
		try{
			logFileDao.save(logFileVO);
		}catch (Exception e){
			e.printStackTrace();
		}
	}

	@RequestMapping(value = "/downloadEdmsFile", method = {RequestMethod.GET})
	public void downloadEdmsFile(HttpServletRequest request, @RequestParam(value = "SDAAKey") BigDecimal SDAAKey,
								   HttpServletResponse response) throws UnsupportedEncodingException{
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return;

		String downloadFileName, reqFilePath = null, reqFileName = null;
		HttpURLConnection httpCon = null;

		try{
			List<CpsEdmsAttachFileVO> voList;
			Map args = new HashMap();
			args.put("SDAAKey", SDAAKey);
			voList = edmsManagementService.selectEdmsFileList(args);
			if (CmmnUtils.isNull(voList) || voList.size() > 1) throw new Exception("edms파일정보확인");

			CpsEdmsAttachFileVO returnVO = voList.get(0);
			downloadFileName = CmmnFileUtils.convertEncodeFileName(returnVO.getEdmsOrgFileNm());

			reqFilePath = returnVO.getEdmsFilePath();
			reqFileName = returnVO.getEdmsSaveFileNm();
			
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

	@RequestMapping(value = "/downloadEdmsFileCount", method = {RequestMethod.GET})
	public void downloadEdmsFileCount(HttpServletRequest request, @RequestParam(value = "SDAAKey") BigDecimal SDAAKey,
								   HttpServletResponse response) throws UnsupportedEncodingException{
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return;

		String downloadFileName, reqFilePath = null, reqFileName = null;
		String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
		FtpLogVO ftpLogVO = new FtpLogVO();

		try{
			ftpLogVO.setSingoNum(String.valueOf(SDAAKey));
			ftpLogVO.setEdmsFileKey(String.valueOf(SDAAKey));
			ftpLogVO.setCount("1");
			ftpLogVO.setTaxNum(String.valueOf(SDAAKey));
			ftpLogVO.setAddUserId(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)));
			ftpLogVO.setAddDtm(currentDatetime);
			ftpLogDao.save(ftpLogVO);

			List<CpsEdmsAttachFileVO> voList;
			Map args = new HashMap();
			args.put("SDAAKey", SDAAKey);
			voList = edmsManagementService.selectEdmsFileList(args);
			if (CmmnUtils.isNull(voList) || voList.size() > 1) throw new Exception("edms파일정보확인");

			CpsEdmsAttachFileVO returnVO = voList.get(0);
			downloadFileName = CmmnFileUtils.convertEncodeFileName(returnVO.getEdmsOrgFileNm());

			reqFilePath = returnVO.getEdmsFilePath();
			reqFileName = returnVO.getEdmsSaveFileNm();

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

	@RequestMapping(value = "/deleteEdmsFile")
	public ResponseEntity<?> deleteEdmsFile(HttpServletRequest request, @RequestBody Map args) throws Exception{
		if(CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		String result = "";
		BigDecimal SDAAKey = NumberUtils.createBigDecimal(String.valueOf(args.get("SDAAKey")));
		String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

		List<CpsEdmsAttachFileVO> voList;
		Map map = new HashMap();
		map.put("SDAAKey", SDAAKey);
		voList = edmsManagementService.selectEdmsFileList(map);
		if(CmmnUtils.isNull(voList) || voList.size() > 1) throw new Exception("edms파일정보확인(default)");

		CpsEdmsAttachFileVO returnVO = voList.get(0);

//		File file = new File(returnVO.getEdmsFilePath() + returnVO.getEdmsSaveFileNm());
//		if(file.isFile()){
			returnVO.setUseYn("N");
			returnVO.setEditUserId(String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID)));
			returnVO.setEditUserNm(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME)));
			returnVO.setEditDtm(currentDatetime);
			edmsManagementService.saveEdmsFileInfo(returnVO, request);

//			String uploadPath = returnVO.getEdmsFilePath();
//			result = CmmnFileUtils.deletePath(uploadPath, returnVO.getEdmsSaveFileNm());
//			if(!"".equals(result)){
				return new ResponseEntity<>(returnVO, HttpStatus.OK);
//			}else{
//				result = "fail";
//				return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
//			}
//		}else{
//			result = "fail";
//			return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
//		}
	}

	@RequestMapping(value = "/ftpTest")
	public ResponseEntity<?> ftpTest(HttpServletRequest request, @RequestBody Map args){
		if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try {
			String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
			String singoNum 		= String.valueOf(args.get("edmsSingoNum"));
			String edmsGubun 		= String.valueOf(args.get("edmsParentGubun"));
			String fileNo2 		 	= String.valueOf(args.get("fileNo2"));
			String edmsNum 		 	= String.valueOf(args.get("edmsNum"));

			Map targetMap = args;
			FtpLogVO ftpLogVO = modelMapper.map(targetMap, FtpLogVO.class);
			int j = 1;

			List<CpsEdmsAttachFileVO> list = edmsManagementService.selectEdmsFileList(args);
			for (int i = 0, n = list.size(); i < n; i++) {
				if(String.valueOf(list.get(i).getEdmsFileCategory()).equals("B0001")){
					String filename  = "";
					String filename1 = "";
					if(edmsGubun.equals("IMPORT")){
						if(edmsNum.equals("")){
							filename  = "113886_EntryPacket_Importdeclaration_"+singoNum+"."+String.valueOf(list.get(i).getEdmsFileExt());
							filename1 = "113886_EntryPacket_Importdeclaration_"+fileNo2+"."+String.valueOf(list.get(i).getEdmsFileExt());
						}else{
							filename  = "113886_EntryPacket_Importdeclaration_"+singoNum+"."+String.valueOf(list.get(i).getEdmsFileExt());
							filename1 = "113886_EntryPacket_Importdeclaration_"+edmsNum+"."+String.valueOf(list.get(i).getEdmsFileExt());
						}
					}else{
						filename  = "113886_EntryPacket_Exportdeclaration_"+singoNum+"."+String.valueOf(list.get(i).getEdmsFileExt());
					}
					File target = new File(String.valueOf(list.get(i).getEdmsFilePath()) + String.valueOf(list.get(i).getEdmsSaveFileNm()));

//					FtpClient ftp_ivr = new FtpClient("labftp.integrationpoint.net", "user113886sbkr", "pH+thucaW5", "");
//					FtpClient ftp_ivr = new FtpClient("89.202.114.225", "User113886", "*rUwruDaV8", "");
					FtpClient ftp_ivr = new FtpClient("DEFTP.IntegrationPoint.net", "user113886sbkr", "pH+thucaW5", "");
					boolean result = ftp_ivr.upload(target, "Entry Document/"+filename+"");

					if(result){
						ftpLogVO = modelMapper.map(targetMap, FtpLogVO.class);
						ftpLogVO.setSingoNum(singoNum);
						ftpLogVO.setEdmsFileKey(String.valueOf(list.get(i).getSDAAKey()));
						ftpLogVO.setCount("1");
						ftpLogVO.setTaxNum("7158400024");
						ftpLogVO.setAddUserId(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)));
						ftpLogVO.setAddDtm(currentDatetime);
						ftpLogDao.save(ftpLogVO);
					}

//					FtpClient ftp_ivr2 = new FtpClient("89.202.114.225", "User113886", "*rUwruDaV8", "");
					FtpClient ftp_ivr2 = new FtpClient("DEFTP.IntegrationPoint.net", "user113886sbkr", "pH+thucaW5", "");
					boolean result2 = ftp_ivr2.upload(target, "Entry Document/"+filename1+"");

					if(result2){
						ftpLogVO = modelMapper.map(targetMap, FtpLogVO.class);
						ftpLogVO.setSingoNum(singoNum);
						ftpLogVO.setEdmsFileKey(String.valueOf(list.get(i).getSDAAKey()));
						ftpLogVO.setCount("1");
						ftpLogVO.setTaxNum("7158400024");
						ftpLogVO.setAddUserId(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)));
						ftpLogVO.setAddDtm(currentDatetime);
						ftpLogDao.save(ftpLogVO);
					}

					FtpClient ftp_ivr1 = new FtpClient("210.217.129.14", "edi", "edi123", "");
					boolean result1 = ftp_ivr1.upload(target, filename);

					if(result1){
						ftpLogVO = modelMapper.map(targetMap, FtpLogVO.class);
						ftpLogVO.setSingoNum(singoNum);
						ftpLogVO.setEdmsFileKey(String.valueOf(list.get(i).getSDAAKey()));
						ftpLogVO.setCount("1");
						ftpLogVO.setTaxNum("1028141887");
						ftpLogVO.setAddUserId(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)));
						ftpLogVO.setAddDtm(currentDatetime);
						ftpLogDao.save(ftpLogVO);
					}
				}

				if(String.valueOf(list.get(i).getEdmsFileCategory()).equals("A0001")){
					String filename = "113886_EntryPacket_AWB_"+singoNum+"."+String.valueOf(list.get(i).getEdmsFileExt());
					File target = new File(String.valueOf(list.get(i).getEdmsFilePath()) + String.valueOf(list.get(i).getEdmsSaveFileNm()));

//					FtpClient ftp_ivr = new FtpClient("labftp.integrationpoint.net", "user113886sbkr", "pH+thucaW5", "");
//					FtpClient ftp_ivr = new FtpClient("89.202.114.225", "User113886", "*rUwruDaV8", "");
					FtpClient ftp_ivr = new FtpClient("DEFTP.IntegrationPoint.net", "user113886sbkr", "pH+thucaW5", "");
					boolean result = ftp_ivr.upload(target, "Entry Document/"+filename+"");

					if(result){
						ftpLogVO = modelMapper.map(targetMap, FtpLogVO.class);
						ftpLogVO.setSingoNum(singoNum);
						ftpLogVO.setEdmsFileKey(String.valueOf(list.get(i).getSDAAKey()));
						ftpLogVO.setCount("1");
						ftpLogVO.setTaxNum("7158400024");
						ftpLogVO.setAddUserId(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)));
						ftpLogVO.setAddDtm(currentDatetime);
						ftpLogDao.save(ftpLogVO);
					}
				}

				if(String.valueOf(list.get(i).getEdmsFileCategory()).equals("A0002")){
					String filename = "113886_EntryPacket_Shippinginvoice_"+singoNum+"_"+j+"."+String.valueOf(list.get(i).getEdmsFileExt());
					File target = new File(String.valueOf(list.get(i).getEdmsFilePath()) + String.valueOf(list.get(i).getEdmsSaveFileNm()));

//					FtpClient ftp_ivr = new FtpClient("labftp.integrationpoint.net", "user113886sbkr", "pH+thucaW5", "");
//					FtpClient ftp_ivr = new FtpClient("89.202.114.225", "User113886", "*rUwruDaV8", "");
					FtpClient ftp_ivr = new FtpClient("DEFTP.IntegrationPoint.net", "user113886sbkr", "pH+thucaW5", "");
					boolean result = ftp_ivr.upload(target, "Entry Document/"+filename+"");

					if(result){
						ftpLogVO = modelMapper.map(targetMap, FtpLogVO.class);
						ftpLogVO.setSingoNum(singoNum);
						ftpLogVO.setEdmsFileKey(String.valueOf(list.get(i).getSDAAKey()));
						ftpLogVO.setCount("1");
						ftpLogVO.setTaxNum("7158400024");
						ftpLogVO.setAddUserId(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)));
						ftpLogVO.setAddDtm(currentDatetime);
						ftpLogDao.save(ftpLogVO);
					}
				}

				if(String.valueOf(list.get(i).getEdmsFileCategory()).equals("A0005")){
					String filename  = "";
					String filename1 = "";
					if(edmsGubun.equals("IMPORT")){
						if(edmsNum.equals("")){
							filename  = "113886_EntryPacket_Importdeclaration_"+singoNum+"."+String.valueOf(list.get(i).getEdmsFileExt());
							filename1 = "113886_EntryPacket_AWB_"+singoNum+"."+String.valueOf(list.get(i).getEdmsFileExt());
						}else{
							filename  = "113886_EntryPacket_Importdeclaration_"+singoNum+"."+String.valueOf(list.get(i).getEdmsFileExt());
							filename1 = "113886_EntryPacket_AWB_"+edmsNum+"."+String.valueOf(list.get(i).getEdmsFileExt());
						}
					}else{
						filename   = "113886_EntryPacket_Exportdeclaration_"+singoNum+"."+String.valueOf(list.get(i).getEdmsFileExt());
						filename1  = "113886_EntryPacket_Shippinginvoice_"+singoNum+"."+String.valueOf(list.get(i).getEdmsFileExt());
					}

					File target = new File(String.valueOf(list.get(i).getEdmsFilePath()) + String.valueOf(list.get(i).getEdmsSaveFileNm()));

//					FtpClient ftp_ivr = new FtpClient("labftp.integrationpoint.net", "user113886sbkr", "pH+thucaW5", "");
//					FtpClient ftp_ivr = new FtpClient("89.202.114.225", "User113886", "*rUwruDaV8", "");
					FtpClient ftp_ivr = new FtpClient("DEFTP.IntegrationPoint.net", "user113886sbkr", "pH+thucaW5", "");
					boolean result = ftp_ivr.upload(target, "Entry Document/"+filename+"");

					if(result){
						ftpLogVO = modelMapper.map(targetMap, FtpLogVO.class);
						ftpLogVO.setSingoNum(singoNum);
						ftpLogVO.setEdmsFileKey(String.valueOf(list.get(i).getSDAAKey()));
						ftpLogVO.setCount("1");
						ftpLogVO.setTaxNum("7158400024");
						ftpLogVO.setAddUserId(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)));
						ftpLogVO.setAddDtm(currentDatetime);
						ftpLogDao.save(ftpLogVO);
					}

//					FtpClient ftp_ivr1 = new FtpClient("89.202.114.225", "User113886", "*rUwruDaV8", "");
					FtpClient ftp_ivr1 = new FtpClient("DEFTP.IntegrationPoint.net", "user113886sbkr", "pH+thucaW5", "");
					boolean result1 = ftp_ivr1.upload(target, "Entry Document/"+filename1+"");

					if(result1){
						ftpLogVO = modelMapper.map(targetMap, FtpLogVO.class);
						ftpLogVO.setSingoNum(singoNum);
						ftpLogVO.setEdmsFileKey(String.valueOf(list.get(i).getSDAAKey()));
						ftpLogVO.setCount("1");
						ftpLogVO.setTaxNum("7158400024");
						ftpLogVO.setAddUserId(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)));
						ftpLogVO.setAddDtm(currentDatetime);
						ftpLogDao.save(ftpLogVO);
					}

					FtpClient ftp_ivr2 = new FtpClient("210.217.129.14", "edi", "edi123", "");
					boolean result2 = ftp_ivr2.upload(target, filename);

					if(result2){
						ftpLogVO = modelMapper.map(targetMap, FtpLogVO.class);
						ftpLogVO.setSingoNum(singoNum);
						ftpLogVO.setEdmsFileKey(String.valueOf(list.get(i).getSDAAKey()));
						ftpLogVO.setCount("1");
						ftpLogVO.setTaxNum("1028141887");
						ftpLogVO.setAddUserId(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)));
						ftpLogVO.setAddDtm(currentDatetime);
						ftpLogDao.save(ftpLogVO);
					}

					FtpClient ftp_ivr3 = new FtpClient("210.217.129.14", "edi", "edi123", "");
					boolean result3 = ftp_ivr3.upload(target, filename1);

					if(result3){
						ftpLogVO = modelMapper.map(targetMap, FtpLogVO.class);
						ftpLogVO.setSingoNum(singoNum);
						ftpLogVO.setEdmsFileKey(String.valueOf(list.get(i).getSDAAKey()));
						ftpLogVO.setCount("1");
						ftpLogVO.setTaxNum("1028141887");
						ftpLogVO.setAddUserId(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)));
						ftpLogVO.setAddDtm(currentDatetime);
						ftpLogDao.save(ftpLogVO);
					}
				}

				if(String.valueOf(list.get(i).getEdmsFileCategory()).equals("Z0001")){
					String filename  = "113886_EntryPacket_Shippinginvoice_"+singoNum+"."+String.valueOf(list.get(i).getEdmsFileExt());
					File target = new File(String.valueOf(list.get(i).getEdmsFilePath()) + String.valueOf(list.get(i).getEdmsSaveFileNm()));

//					FtpClient ftp_ivr = new FtpClient("labftp.integrationpoint.net", "user113886sbkr", "pH+thucaW5", "");
//					FtpClient ftp_ivr = new FtpClient("89.202.114.225", "User113886", "*rUwruDaV8", "");
					FtpClient ftp_ivr = new FtpClient("DEFTP.IntegrationPoint.net", "user113886sbkr", "pH+thucaW5", "");
					boolean result = ftp_ivr.upload(target, "Entry Document/"+filename+"");

					if(result){
						ftpLogVO = modelMapper.map(targetMap, FtpLogVO.class);
						ftpLogVO.setSingoNum(singoNum);
						ftpLogVO.setEdmsFileKey(String.valueOf(list.get(i).getSDAAKey()));
						ftpLogVO.setCount("1");
						ftpLogVO.setTaxNum("7158400024");
						ftpLogVO.setAddUserId(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)));
						ftpLogVO.setAddDtm(currentDatetime);
						ftpLogDao.save(ftpLogVO);
					}
				}
			}

		  	return new ResponseEntity<>("Success", HttpStatus.CREATED);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectEdmsFileCountList")
	public ResponseEntity<?> selectImportStatusFtpList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			List<Map> list = edmsManagementService.selectEdmsFileCountList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/archivingZeissFiles")
	public ResponseEntity<?> archivingZeissFiles(HttpServletRequest request, @RequestBody Map args) throws Exception {
		if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		String downloadFileName = null;
		String userId = String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID));

		try {
			downloadFileName = String.valueOf(args.get("ZeissFileName"));


			List<CpsZeissFileDownVO> voList = new ArrayList<>();
			List<Map<String, Object>> jsonList = CmmnUtils.convertMapSourceToList(args, "batchZeissFileList");
			for(int i = 0, n = jsonList.size(); i < n; i++){
				String edmsFileKey = String.valueOf(jsonList.get(i).get("edmsFileKey"));
				String edmsSingoNum = String.valueOf(jsonList.get(i).get("edmsSingoNum"));

				Map map = new HashMap();
				map.put("edmsFileKey", edmsFileKey);
				map.put("edmsSingoNum", edmsSingoNum);
				voList.addAll(edmsManagementService.selectZeissFileList(map));
			}

			List<File> filelist 		= new ArrayList();
			List<String> fileExtList 	= new ArrayList<>();
			CmmnFileCompressUtils cmmnFileCompressUtil = new CmmnFileCompressUtils();
			String tempKey = "";

			for(int i=0;i<voList.size();i++){
				System.out.println("##########"+voList.get(i).getEdmsSaveFileName());
				if(tempKey.equals("")){
					filelist.add(new File(voList.get(i).getEdmsFilePath() + voList.get(i).getEdmsSaveFileName()));
					fileExtList.add(voList.get(i).getEdmsFileExt());
				}else if(tempKey.equals(voList.get(i).getEdmsInvNo().toString())){
					filelist.add(new File(voList.get(i).getEdmsFilePath() + voList.get(i).getEdmsSaveFileName()));
					fileExtList.add(voList.get(i).getEdmsFileExt());
				}else{
					CpsZeissFileDownVO newcpsedmsfileVO = cpsZeissFileDownDao.findTop1ByEdmsInvNo(tempKey);
					String fileName = newcpsedmsfileVO.getEdmsInvNo() +".zip";

					File zippedFile = new File(edmsFileUploadPath + "\\zeissDownload\\", fileName);
					cmmnFileCompressUtil.isZip(filelist, fileExtList, new FileOutputStream(zippedFile));
					filelist = new ArrayList();
					fileExtList = new ArrayList<>();
					filelist.add(new File(voList.get(i).getEdmsFilePath() + voList.get(i).getEdmsSaveFileName()));
					fileExtList.add(voList.get(i).getEdmsFileExt());
				}

				tempKey = voList.get(i).getEdmsInvNo().toString();

				if(i == voList.size()-1){
					String fileName = voList.get(i).getEdmsInvNo().toString() +".zip";
					File zippedFile = new File(edmsFileUploadPath + "\\zeissDownload\\", fileName);
					cmmnFileCompressUtil.isZip(filelist, fileExtList, new FileOutputStream(zippedFile));
				}
			}

			cmmnFileCompressUtil.zip(new File(edmsFileUploadPath + "\\zeissDownload\\"));
			System.out.println("@@@@@@@@@@"+downloadFileName);
			return new ResponseEntity<>(downloadFileName, HttpStatus.OK);
		}catch(Exception e){
			e.printStackTrace();
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/archivingZeissFilesPo")
	public ResponseEntity<?> archivingZeissFilesPo(HttpServletRequest request, @RequestBody Map args) throws Exception {
		if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		String downloadFileName = null;
		String userId = String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID));

		try {
			downloadFileName = String.valueOf(args.get("ZeissFileName"));


			List<CpsZeissFileDownVO> voList = new ArrayList<>();
			List<Map<String, Object>> jsonList = CmmnUtils.convertMapSourceToList(args, "batchZeissFileList");
			for(int i = 0, n = jsonList.size(); i < n; i++){
				String edmsFileKey = String.valueOf(jsonList.get(i).get("edmsFileKey"));
				String edmsSingoNum = String.valueOf(jsonList.get(i).get("edmsSingoNum"));

				Map map = new HashMap();
				map.put("edmsFileKey", edmsFileKey);
				map.put("edmsSingoNum", edmsSingoNum);
				voList.addAll(edmsManagementService.selectZeissFileList(map));
			}

			List<File> filelist 		= new ArrayList();
			List<String> fileExtList 	= new ArrayList<>();
			CmmnFileCompressUtils cmmnFileCompressUtil = new CmmnFileCompressUtils();
			String tempKey = "";

			for(int i=0;i<voList.size();i++){
				System.out.println("##########"+voList.get(i).getEdmsSaveFileName());
				if(tempKey.equals("")){
					filelist.add(new File(voList.get(i).getEdmsFilePath() + voList.get(i).getEdmsSaveFileName()));
					fileExtList.add(voList.get(i).getEdmsFileExt());
				}else if(tempKey.equals(voList.get(i).getEdmsPoNo().toString())){
					filelist.add(new File(voList.get(i).getEdmsFilePath() + voList.get(i).getEdmsSaveFileName()));
					fileExtList.add(voList.get(i).getEdmsFileExt());
				}else{
					CpsZeissFileDownVO newcpsedmsfileVO = cpsZeissFileDownDao.findTop1ByEdmsPoNo(tempKey);
					String fileName = newcpsedmsfileVO.getEdmsPoNo() +".zip";

					File zippedFile = new File(edmsFileUploadPath + "\\zeissDownload\\", fileName);
					cmmnFileCompressUtil.isZip(filelist, fileExtList, new FileOutputStream(zippedFile));
					filelist = new ArrayList();
					fileExtList = new ArrayList<>();
					filelist.add(new File(voList.get(i).getEdmsFilePath() + voList.get(i).getEdmsSaveFileName()));
					fileExtList.add(voList.get(i).getEdmsFileExt());
				}

				tempKey = voList.get(i).getEdmsPoNo().toString();

				if(i == voList.size()-1){
					String fileName = voList.get(i).getEdmsPoNo().toString() +".zip";
					File zippedFile = new File(edmsFileUploadPath + "\\zeissDownload\\", fileName);
					cmmnFileCompressUtil.isZip(filelist, fileExtList, new FileOutputStream(zippedFile));
				}
			}

			cmmnFileCompressUtil.zip(new File(edmsFileUploadPath + "\\zeissDownload\\"));
			System.out.println("@@@@@@@@@@"+downloadFileName);
			return new ResponseEntity<>(downloadFileName, HttpStatus.OK);
		}catch(Exception e){
			e.printStackTrace();
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/batchDownloadZeissFiles", method = RequestMethod.GET)
	public void batchDownloadZeissFiles(HttpServletRequest request, @RequestParam(value = "fileName") String compressFileName, HttpServletResponse response) {
		String userId = String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID));
		if(CmmnUtils.isNull(userId) || CmmnUtils.isNull(compressFileName))
			return;
		if(!new File(edmsFileUploadPath + compressFileName).exists()){
			return;
		}

		String downloadFileName = CmmnFileUtils.convertEncodeFileName(compressFileName);

		try{
			File fileToDownload = new File(edmsFileUploadPath + downloadFileName);
			InputStream inputStream = new FileInputStream(fileToDownload);
			response.setContentType("application/force-download");
			response.setHeader("Content-Disposition", "attachment; filename=\"" + downloadFileName + "\";");
			IOUtils.copy(inputStream, response.getOutputStream());
			response.flushBuffer();
			inputStream.close();
		}catch (Exception e){
			e.printStackTrace();
		}finally{
			File selectedDir= new File(edmsFileUploadPath + "\\zeissDownload\\");
	        File[] innerFiles= selectedDir.listFiles();
	        for(int i=0; i<innerFiles.length; i++){
	            innerFiles[i].delete();
	        }
	        if (new File(edmsFileUploadPath + compressFileName).exists()) CmmnFileUtils.deletePath(edmsFileUploadPath, downloadFileName);
		}
	}



















  /**
   * Gets edms master list.(edms 마스터 조회)
   *
   * @param request the request
   * @param args    the args
   * @return the edms master list
   */
  @RequestMapping(value = "/getEdmsMasterList")
  public ResponseEntity<?> getEdmsMasterList(HttpServletRequest request, @RequestBody Map args) {
	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
	  List<EdmsMasterVO> list = edmsManagementService.getEdmsMasterList(args);
	  List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
  }

  /**
   * Save edms master info response entity.(edms 마스터 저장)
   *
   * @param request the request
   * @param map     the map
   * @return the response entity
   * @throws Exception the exception
   */
  @RequestMapping("/saveEdmsMasterInfo")
  public ResponseEntity<?> saveEdmsMasterInfo(HttpServletRequest request, @RequestBody Map map) throws Exception {
	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  // validation
	  Map targetMap = map;
	  String userId = String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID));
	  EdmsMasterVO edmsMasterVO = CmmnUtils.convertMapToBean(targetMap, EdmsMasterVO.class);
	  edmsMasterVO.setAddUserId(userId);
	  edmsMasterVO.setEditUserId(userId);
	  // 관리번호(임시)
	  if (CmmnUtils.isNull(edmsMasterVO.getEdmsManagementNum()) && !CmmnUtils.isNull(edmsMasterVO.getAddDay())) {
		edmsMasterVO.setEdmsManagementNum("00000000000000");
	  }
	  Set<ConstraintViolation<EdmsMasterVO>> validator = isCommonValid(edmsMasterVO);
	  if (validator.size() > 0) {
		return new ResponseEntity<>(validator, HttpStatus.BAD_REQUEST);
	  }

	  EdmsMasterVO returnVO = edmsManagementService.saveEdmsMaster(edmsMasterVO, request);
	  return new ResponseEntity<>(returnVO, HttpStatus.CREATED);
	} catch (Exception e) {
	  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
  }

  /**
   * Save edms master list response entity.
   *
   * @param request the request
   * @param args    the args
   * @return the response entity
   */
  @RequestMapping(value = "/saveEdmsMasterList")
  public ResponseEntity<?> saveEdmsMasterList(HttpServletRequest request, @RequestBody Map args) {
	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  List<Map<String, Object>> mapList = CmmnUtils.convertMapSourceToList(args, "edmsMasterList");
	  List<EdmsMasterVO> voList = CmmnUtils.convertMapListToBean(mapList, EdmsMasterVO.class);
	  List<EdmsMasterVO> returnVoList = edmsManagementService.saveEdmsMasterList(voList, request);
	  return new ResponseEntity<>(returnVoList, HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
  }

  /**
   * Gets edms is master.(edmsGubun별 마스터 존재여부 체크)
   *
   * @param request the request
   * @param args    the args
   * @return the edms is master
   */
  @RequestMapping(value = "/getEdmsIsMaster")
  public ResponseEntity<?> getEdmsIsMaster(HttpServletRequest request, @RequestBody Map args) {
	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  EdmsMasterVO isMasterList = edmsManagementService.getEdmsIsMaster(args);
	  return new ResponseEntity<>(isMasterList, HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
  }

  /**
   * Gets edms master with file list.(edms 마스터X파일 조회)
   *
   * @param request the request
   * @param args    the args
   * @return the edms master with file list
   */


  @RequestMapping(value = "/getEdmsMasterWithFileList1")
  public ResponseEntity<?> getEdmsMasterWithFileList1(HttpServletRequest request, @RequestBody Map args) {
	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  checkPagingParamsForMapper(args);
	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
	  List<Map> list = edmsManagementService.getEdmsMasterWithFileList1(args);
	  List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
  }

  /**
   * Gets edms master with not classification file list.(edms 마스터X미구분파일 조회)
   *
   * @param request the request
   * @param args    the args
   * @return the edms master with not classification file list
   */
  @RequestMapping(value = "/getEdmsMasterWithNotClassificationFileList")
  public ResponseEntity<?> getEdmsMasterWithNotClassificationFileList(HttpServletRequest request, @RequestBody Map args) {
	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  checkPagingParamsForMapper(args);
	  args.put("asmlTaxNum", asmlTaxNum);
	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
	  List<Map> list = edmsManagementService.getEdmsMasterWithNotClassificationFileList(args);
	  List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
  }

  /**
   * Gets edms master status group count list.(edms 마스터 상태 그룹별 조회)
   *
   * @param request the request
   * @param args    the args
   * @return the edms master status group count list
   */
  @RequestMapping(value = "/getEdmsMasterStatusGroupCountList")
  public ResponseEntity<?> getEdmsMasterStatusGroupCountList(HttpServletRequest request, @RequestBody Map args) {
	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  checkPagingParamsForMapper(args);
	  args.put("asmlTaxNum", asmlTaxNum);
	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
	  List<Map> list = edmsManagementService.getEdmsMasterStatusGroupCountList(args);
	  List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
  }

  /**
   * Gets edms file info list.(edms 파일 조회)
   *
   * @param request the request
   * @param args    the args
   * @return the edms file info list
   */
//  @RequestMapping(value = "/getEdmsFileInfoList")
//  public ResponseEntity<?> getEdmsFileInfoList(HttpServletRequest request, @RequestBody Map args) {
//	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	try {
//	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
//	  List<EdmsAttachFileVO> list = edmsManagementService.getEdmsFileList(args);
//	  List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
//	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
//	} catch (Exception e) {
//	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//	}
//  }

  @RequestMapping(value = "/getEdmsFileInfoList1")
  public ResponseEntity<?> getEdmsFileInfoList1(HttpServletRequest request, @RequestBody Map args) {
    if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
	try {
	  checkPagingParamsForMapper(args);
	  List<Map> list = edmsManagementService.getEdmsFileList1(args);
	  List<?> result = list.stream().collect(Collectors.toList());
	  return new ResponseEntity<>(result, HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
  }

  /**
   * Gets edms file group count list.(edms 파일 groupByName별 카운트 조회)
   *
   * @param request the request
   * @param args    the args
   * @return the edms file group count list
   */
//  @RequestMapping(value = "/getEdmsFileGroupCountList")
//  public ResponseEntity<?> getEdmsFileGroupCountList(HttpServletRequest request, @RequestBody Map args) {
//	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	try {
//	  Map result = null;
//	  List<EdmsAttachFileVO> list = edmsManagementService.getEdmsFileList(args);
//	  String groupByName = String.valueOf(args.get("groupByName"));
//
//	  if (groupByName.equals("edmsFileCategory")) {
//		result = list.stream()
//				.collect(Collectors.groupingBy(EdmsAttachFileVO::getEdmsFileCategory, Collectors.counting()));
//	  } else if (groupByName.equals("edmsFileStatus")) {
//		result = list.stream()
//				.collect(Collectors.groupingBy(EdmsAttachFileVO::getEdmsFileStatus, Collectors.counting()));
//	  }
//
//	  return new ResponseEntity(result, HttpStatus.OK);
//	} catch (Exception e) {
//	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//	}
//  }

  /**
   * Save edms file info response entity.(edms 파일 저장)
   *
   * @param request the request
   * @param map     the map
   * @return the response entity
   * @throws Exception the exception
   */
//  @RequestMapping("/saveEdmsFileInfo")
//  public ResponseEntity<?> saveEdmsFileInfo(HttpServletRequest request, @RequestBody Map map) throws Exception {
//	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	try {
//	  String userId = String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID));
//	  // validation
//	  Map targetMap = map;
//	  EdmsAttachFileVO edmsAttachFileVO = CmmnUtils.convertMapToBean(targetMap, EdmsAttachFileVO.class);
//	  edmsAttachFileVO.setAddUserId(userId);
//	  edmsAttachFileVO.setEditUserId(userId);
//	  Set<ConstraintViolation<EdmsAttachFileVO>> validator = isCommonValid(edmsAttachFileVO);
//	  if (validator.size() > 0) {
//		return new ResponseEntity<>(validator, HttpStatus.BAD_REQUEST);
//	  }
//
//	  EdmsAttachFileVO returnVO = edmsManagementService.saveEdmsFileInfo(edmsAttachFileVO, request);
//	  return new ResponseEntity<>(returnVO, HttpStatus.CREATED);
//	} catch (Exception e) {
//	  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//	}
//  }

  /**
   * Save edms file list response entity.
   *
   * @param request the request
   * @param args    the args
   * @return the response entity
   */
  @RequestMapping(value = "/saveEdmsFileList")
  public ResponseEntity<?> saveEdmsFileList(HttpServletRequest request, @RequestBody Map args) {
	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  List<Map<String, Object>> mapList = CmmnUtils.convertMapSourceToList(args, "edmsAttachFileList");
	  List<EdmsAttachFileVO> voList = CmmnUtils.convertMapListToBean(mapList, EdmsAttachFileVO.class);
	  List<EdmsAttachFileVO> returnVoList = edmsManagementService.saveEdmsFileList(voList, request);
	  return new ResponseEntity<>(returnVoList, HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
  }

  /**
   * Gets expo invoice list.(edms 수출 INV 조회. ncustoms.Expo1 기준)
   *
   * @param request the request
   * @param args    the args
   * @return the expo invoice list
   */
  @RequestMapping(value = "/getExpoInvoiceList")
  public ResponseEntity<?> getExpoInvoiceList(HttpServletRequest request, @RequestBody Map args) {
	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  checkPagingParamsForMapper(args);
	  args.put("asmlTaxNum", asmlTaxNum);
	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
	  List<Map> list = edmsManagementService.getExpoInvoiceList(args);
	  List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
  }

  /**
   * Fix edms not classification response entity.(edms 미분류 내역 수정)
   * 미분류 수정시 _allFileTransfer가 "Y"면 1.기존 마스터 삭제(useYn:N) → 신규 마스터 저장(fixEdmsGubun)
   * 미분류 수정시 _allFileTransfer가 "N"면 유지 → 신규 마스터 저장(fixEdmsGubun)
   * 리턴값은 기존마스터,신규마스터,기존미분류파일리스트,분류된파일리스트
   *
   * @param request the request
   * @param args    the args
   * @return the response entity
   * @throws Exception the exception
   */
//  @RequestMapping(value = "/fixEdmsNotClassification")
//  public ResponseEntity<?> fixEdmsNotClassification(HttpServletRequest request, @RequestBody Map args) throws Exception {
//	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	List<EdmsAttachFileVO> newEdmsAttachFileVO = new ArrayList<>();
//	Map returnMap = new HashMap(), returnResponseEntity = new HashMap();
//	String uploadPathType = edmsFileUploadPath, newEdmsGubun = null;
//	BigDecimal newEdmsKey = null;
//	String userId = String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID));
//	String userName = String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERNAME));
//	String fixEdmsGubun = String.valueOf(args.get("newEdmsGubun"));
//	String allFileTransfer = String.valueOf(args.get("_allFileTransfer"));
//
//	try {
//	  // 1. 입력 체크(master, fileList)
//	  // 미분류masterVO
//	  Map edmsMasterMap = (Map) args.get("edmsMaster");
//	  EdmsMasterVO notClassificationMasterVO = modelMapper.map(edmsMasterMap, EdmsMasterVO.class);
//	  notClassificationMasterVO.setAddUserId(userId);
//	  notClassificationMasterVO.setEditUserId(userId);
//	  notClassificationMasterVO.setAddUserName(userName);
//	  notClassificationMasterVO.setEditUserName(userName);
//	  // 관리번호(임시)
//	  if (CmmnUtils.isNull(notClassificationMasterVO.getEdmsManagementNum()) && !CmmnUtils.isNull(notClassificationMasterVO.getAddDay())) {
//		notClassificationMasterVO.setEdmsManagementNum("00000000000000");
//	  }
//	  Set<ConstraintViolation<EdmsMasterVO>> validator = isCommonValid(notClassificationMasterVO);
//	  if (validator.size() > 0) {
//		return new ResponseEntity<>(validator, HttpStatus.BAD_REQUEST);
//	  }
//
//	  // 미분류 파일리스트
//	  List<EdmsAttachFileVO> notClassificationFileVOList = new ArrayList<>();
//	  List<Map<String, Object>> jsonList = CmmnUtils.convertMapSourceToList(args, "edmsAttachFileVOList");
//	  for (int i = 0, n = jsonList.size(); i < n; i++) {
//		EdmsAttachFileVO edmsAttachFileVO = modelMapper.map(jsonList.get(i), EdmsAttachFileVO.class);
//		edmsAttachFileVO.setAddUserId(userId);
//		edmsAttachFileVO.setEditUserId(userId);
//		Set<ConstraintViolation<EdmsAttachFileVO>> validatorFile = isCommonValid(edmsAttachFileVO);
//		if (validatorFile.size() > 0) {
//		  return new ResponseEntity<>(validatorFile, HttpStatus.BAD_REQUEST);
//		}
//		notClassificationFileVOList.add(edmsAttachFileVO);
//	  }
//
//	  // 2. master 저장/신규 master 리턴
//	  // 미분류master validation
//	  if (CmmnUtils.isNull(String.valueOf(args.get("yyyymmdd"))) || CmmnUtils.isNull(fixEdmsGubun)) {
//		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//	  }
//
//	  switch (fixEdmsGubun) {
//		case "IMPORT":
//		case "EXPORT":
//		case "SEINETC":
//		case "HWANGUP":
//		  if (!CmmnUtils.isNull(notClassificationMasterVO.getEdmsNum())) {
//			//  _allFileTransfer가 "Y"면 기존 미분류내역을 삭제(useYn:N)하고, 신규 edmsMaster 입력(구분은 fixEdmsGubun)
//			//  _allFileTransfer가 "N"면 기존 미분류내역을 유지하고, 신규 edmsMaster 입력(구분은 fixEdmsGubun)
//			// TODO: 2016-09-23 신규로 입력 안하고 수정할꺼면 안해도 됨
//			returnMap = edmsManagementService.fixEdmsNotClassification(notClassificationMasterVO, fixEdmsGubun, allFileTransfer, request);
//
//			// 신규로 입력된 edmsMaster의 edmsKey, edmsGubun 셋팅(파일정보 변경을 위해)
//			if (!CmmnUtils.isNull(returnMap)) {
//			  EdmsMasterVO masterVO = modelMapper.map(returnMap.get("edmsMasterVO"), EdmsMasterVO.class);
//			  newEdmsKey = masterVO.getEdmsKey();
//			  newEdmsGubun = masterVO.getEdmsGubun();
//			} else {
//			  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//			}
//		  } else {
//			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//		  }
//		  break;
//		default:
//		  break;
//	  }
//
//	  if (CmmnUtils.isNull(uploadPathType)) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//	  // 3. fileList 수정/수정된 결과 리턴
//	  // 변경할 기존 매핑 파일리스트
//	  List<EdmsAttachFileVO> fileVOs = notClassificationFileVOList;
//	  for (EdmsAttachFileVO fileVO : fileVOs) {
//		// 파일 수정(부모키, 부모구분)
//		fileVO.setEdmsParentKey(newEdmsKey);
//		fileVO.setEdmsParentGubun(newEdmsGubun);
//		fileVO.setEditUserId(userId);
//		EdmsAttachFileVO attachFileVO = edmsManagementService.saveEdmsFileInfo(fileVO, request);
//		newEdmsAttachFileVO.add(attachFileVO);
//		// 로그 저장
//		saveFileLogInfo(attachFileVO, request, "edms미분류수정_GEOWS");
//	  }
//
//	  // 4. 결과값 리턴
//	  returnResponseEntity.put("oldEdmsMasterVO", args.get("edmsMaster"));
//	  returnResponseEntity.put("newEdmsMasterVO", returnMap.get("edmsMasterVO"));
//	  //returnResponseEntity.put("oldEdmsAttachFileVOList", returnMap.get("edmsAttachFileVOList"));
//	  returnResponseEntity.put("oldEdmsAttachFileVOList", args.get("edmsAttachFileVOList"));
//	  returnResponseEntity.put("newEdmsAttachFileVOList", newEdmsAttachFileVO);
//	  return new ResponseEntity<>(returnResponseEntity, HttpStatus.OK);
//	} catch (Exception e) {
//	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//	}
//  }

  /**
   * Modify edms all info response entity.(edms Master & fileList 수정)
   * <p>
   * EDMS구분(IMPORT/EXPORT), EDMS미구분(NOTCLASS/SEINETC/HWANGUP)
   * <p>
   * 1. 신규 분류가 구분일 경우..
   * 1-1. 기존 분류가 구분일 경우 : allFileTransferYn에 따라 기존마스터 사용여부 수정 → 신규마스터가 존재하면 해당 마스터를 수정(editDay)하고 해당 마스터 리턴. 신규마스터 미존재시 관리번호를 생성하고 신규마스터 리턴
   * 1-2. 기존 분류가 미구분일 경우 : allFileTransferYn에 따라 기존마스터 사용여부 수정&edmsNum초기화 → 신규마스터가 존재하면 해당 마스터를 수정(editDay)하고 해당 마스터 리턴. 신규마스터 미존재시 관리번호를 생성하고 신규마스터 리턴
   * <p>
   * 2. 신규 분류가 미구분일 경우..
   * 2-1. 기존 분류가 구분일 경우 : allFileTransferYn에 따라 기존마스터 사용여부 수정 → 신규마스터가 존재하면 해당 마스터를 수정(editDay)하고 해당 마스터 리턴. 신규마스터 미존재시 관리번호를 생성하고 신규마스터 리턴
   * 2-2. 기존 분류가 미구분일 경우 : allFileTransferYn에 따라 기존마스터 사용여부 수정&edmsNum초기화 → 신규마스터가 존재하면 해당 마스터를 수정(editDay)하고 해당 마스터 리턴. 신규마스터 미존재시 관리번호를 생성하고 신규마스터 리턴
   * <p>
   * 리턴값은 기존마스터,신규마스터,기존파일리스트,분류된파일리스트
   *
   * @param request the request
   * @param map     the map
   * @return the response entity
   * @throws Exception the exception
   */
//  @RequestMapping(value = "/modifyEdmsAllInfo")
//  public ResponseEntity<?> modifyEdmsAllInfo(HttpServletRequest request, @RequestBody Map map) throws Exception {
//	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	List<EdmsAttachFileVO> newEdmsAttachFileVO = new ArrayList<>();
//	Map returnMap = new HashMap(), returnResponseEntity = new HashMap();
//	String uploadPathType = edmsFileUploadPath, newEdmsGubun = null;
//	BigDecimal newEdmsKey = null;
//	String userId = String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID));
//	String userName = String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERNAME));
//	String fixEdmsGubun = String.valueOf(map.get("newEdmsGubun"));
//	String allFileTransferYn = String.valueOf(map.get("_allFileTransferYn"));
//	String yyyymmdd = String.valueOf(map.get("yyyymmdd"));
//	BigDecimal oldSavedEdmsMasterKey = NumberUtils.createBigDecimal(String.valueOf(map.get("oldSavedEdmsMasterKey")));
//
//	try {
//	  // 1. 입력 체크(master, fileList)
//	  // 신규 masterVO
//	  EdmsMasterVO newMasterVO = modelMapper.map(map.get("edmsMaster"), EdmsMasterVO.class);
//	  newMasterVO.setAddUserId(userId);
//	  newMasterVO.setEditUserId(userId);
//	  newMasterVO.setAddUserName(userName);
//	  newMasterVO.setEditUserName(userName);
//	  // 관리번호(임시)
//	  if (CmmnUtils.isNull(newMasterVO.getEdmsManagementNum()) && !CmmnUtils.isNull(newMasterVO.getAddDay())) {
//		newMasterVO.setEdmsManagementNum("00000000000000");
//	  }
//	  Set<ConstraintViolation<EdmsMasterVO>> validator = isCommonValid(newMasterVO);
//	  if (validator.size() > 0) {
//		return new ResponseEntity<>(validator, HttpStatus.BAD_REQUEST);
//	  }
//
//	  // 수정할 파일리스트
//	  List<EdmsAttachFileVO> modifyFileVOList = new ArrayList<>();
//	  List<Map<String, Object>> jsonList = CmmnUtils.convertMapSourceToList(map, "edmsAttachFileVOList");
//	  for (int i = 0, n = jsonList.size(); i < n; i++) {
//		EdmsAttachFileVO edmsAttachFileVO = modelMapper.map(jsonList.get(i), EdmsAttachFileVO.class);
//		edmsAttachFileVO.setAddUserId(userId);
//		edmsAttachFileVO.setEditUserId(userId);
//		Set<ConstraintViolation<EdmsAttachFileVO>> validatorFile = isCommonValid(edmsAttachFileVO);
//		if (validatorFile.size() > 0) {
//		  return new ResponseEntity<>(validatorFile, HttpStatus.BAD_REQUEST);
//		}
//		modifyFileVOList.add(edmsAttachFileVO);
//	  }
//
//	  // 2. master 저장/신규 master 리턴
//	  // master validation
//	  if (CmmnUtils.isNull(yyyymmdd) || CmmnUtils.isNull(fixEdmsGubun) || CmmnUtils.isNull(newMasterVO.getEdmsComKey()) || CmmnUtils.isNull(oldSavedEdmsMasterKey)) {
//		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//	  }
//
//	  switch (fixEdmsGubun) {
//		case "IMPORT":
//		case "EXPORT":
//		  if (!CmmnUtils.isNull(newMasterVO.getEdmsNum())) {
//			returnMap = edmsManagementService.modifyEdmsMaster(newMasterVO, oldSavedEdmsMasterKey, fixEdmsGubun, allFileTransferYn, request);
//			// 입력/수정된 edmsMaster의 edmsKey, edmsGubun 셋팅(파일정보 변경을 위해)
//			if (!CmmnUtils.isNull(returnMap)) {
//			  EdmsMasterVO masterVO = modelMapper.map(returnMap.get("edmsMasterVO"), EdmsMasterVO.class);
//			  newEdmsKey = masterVO.getEdmsKey();
//			  newEdmsGubun = masterVO.getEdmsGubun();
//			} else {
//			  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//			}
//		  } else {
//			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//		  }
//		  break;
//		case "NOTCLASS":
//		case "SEINETC":
//		case "HWANGUP":
//		  if (!CmmnUtils.isNull(newMasterVO.getJisaCode())) {
//			returnMap = edmsManagementService.modifyEdmsMaster(newMasterVO, oldSavedEdmsMasterKey, fixEdmsGubun, allFileTransferYn, request);
//			// 입력/수정된 edmsMaster의 edmsKey, edmsGubun 셋팅(파일정보 변경을 위해)
//			if (!CmmnUtils.isNull(returnMap)) {
//			  EdmsMasterVO masterVO = modelMapper.map(returnMap.get("edmsMasterVO"), EdmsMasterVO.class);
//			  newEdmsKey = masterVO.getEdmsKey();
//			  newEdmsGubun = masterVO.getEdmsGubun();
//			} else {
//			  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//			}
//		  } else {
//			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//		  }
//		  break;
//		default:
//		  break;
//	  }
//
//	  // 3. fileList 수정/수정된 결과 리턴
//	  if (CmmnUtils.isNull(uploadPathType)) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//	  // 변경할 기존 매핑 파일리스트
//	  List<EdmsAttachFileVO> fileVOs = modifyFileVOList;
//	  for (EdmsAttachFileVO fileVO : fileVOs) {
//		// 파일 수정(부모키, 부모구분)
//		fileVO.setEdmsParentKey(newEdmsKey);
//		fileVO.setEdmsParentGubun(newEdmsGubun);
//		fileVO.setEditUserId(userId);
//		EdmsAttachFileVO attachFileVO = edmsManagementService.saveEdmsFileInfo(fileVO, request);
//		newEdmsAttachFileVO.add(attachFileVO);
//		// 로그 저장
//		saveFileLogInfo(attachFileVO, request, "edms미분류수정_GEOWS");
//	  }
//
//	  // 4. 결과값 리턴
//	  returnResponseEntity.put("oldEdmsMasterVO", map.get("edmsMaster"));
//	  returnResponseEntity.put("newEdmsMasterVO", returnMap.get("edmsMasterVO"));
//	  returnResponseEntity.put("oldEdmsAttachFileVOList", map.get("edmsAttachFileVOList"));
//	  returnResponseEntity.put("newEdmsAttachFileVOList", newEdmsAttachFileVO);
//	  return new ResponseEntity<>(returnResponseEntity, HttpStatus.OK);
//	} catch (Exception e) {
//	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//	}
//  }

  /**
   * Upload edms file response entity.(edms 파일 업로드)
   * 모든 문서는 edms폴더에 저장
   *
   * @param mRequest the m request
   * @param request  the request
   * @return the response entity
   * @throws Exception the exception
   */
//  @RequestMapping(value = "/uploadEdmsFile")
//  public ResponseEntity<?> uploadEdmsFile(MultipartHttpServletRequest mRequest, HttpServletRequest request) throws Exception {
//	  if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID))){
//		  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//		}
//		Map errMap = new HashMap<>();
//		EdmsAttachFileVO returnVO = new EdmsAttachFileVO();
//		EdmsAttachFileVO edmsAttachFileVO = new EdmsAttachFileVO();
//		String userId = String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID));
//		String userName = String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERNAME));
//		String serverGubun = String.valueOf(getUserInfo(request, CmmnConstants.SESSION_SERVER_GUBUN));
//		String serverIpAddr = String.valueOf(getUserInfo(request, CmmnConstants.SESSION_SERVER_IP));
//		String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
//
//		Map convertMap = CmmnUtils.convertParameterMap(request);
//		EdmsMasterVO mappingMasterVO = CmmnUtils.convertMapToBean(convertMap, EdmsMasterVO.class);
//		mappingMasterVO.setAddUserId(userId);
//		mappingMasterVO.setAddUserName(userName);
//		mappingMasterVO.setAddDtm(currentDatetime);
//		mappingMasterVO.setEditUserId(userId);
//		mappingMasterVO.setEditUserName(userName);
//		// 2016-10-07 modelmapper 오류(예약어('Day'))를 인지하지 못해 해당 방법으로 처리(추후 개선예정)
//		if (!CmmnUtils.isNull(convertMap.get("iphangDay"))) mappingMasterVO.setIphangDay(String.valueOf(convertMap.get("iphangDay")));
//		if (!CmmnUtils.isNull(convertMap.get("banipDay"))) mappingMasterVO.setBanipDay(String.valueOf(convertMap.get("banipDay")));
//		if (!CmmnUtils.isNull(convertMap.get("singoDay"))) mappingMasterVO.setSingoDay(String.valueOf(convertMap.get("singoDay")));
//		if (!CmmnUtils.isNull(convertMap.get("suriDay"))) mappingMasterVO.setSuriDay(String.valueOf(convertMap.get("suriDay")));
//		if (!CmmnUtils.isNull(convertMap.get("banchulDay"))) mappingMasterVO.setBanchulDay(String.valueOf(convertMap.get("banchulDay")));
//		BigDecimal externalKey = !CmmnUtils.isNull(mRequest.getParameter("externalKey")) ? NumberUtils.createBigDecimal(mRequest.getParameter("externalKey")) : null;
//
//		// 파일정보 validation
//		if (CmmnUtils.isNull(mRequest.getParameter("yyyymmdd")) || CmmnUtils.isNull(mappingMasterVO.getEdmsGubun())) {
//		  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//		}
//
//		String yyyymmdd = mRequest.getParameter("yyyymmdd");
//		String edmsGubun = mappingMasterVO.getEdmsGubun();
//		EdmsMasterVO edmsMasterVO;
//		String uploadPathType = edmsFileUploadPath; //모든 문서는 edms폴더에 저장
//		switch (edmsGubun) {
//		  case "IMPORT":
//		  case "EXPORT":
//		  case "SEINETC":
//		  case "HWANGUP":
//			if (!CmmnUtils.isNull(mappingMasterVO.getEdmsNum())) {
//			  edmsMasterVO = edmsManagementService.saveEdmsMasterForFileUpload(mappingMasterVO, externalKey, request);
//			} else {
//			  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//			}
//			break;
//		  default:
////			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//			if (!CmmnUtils.isNull(mappingMasterVO.getEdmsComName()) && !CmmnUtils.isNull(mappingMasterVO.getEdmsComKey())
//					&& !CmmnUtils.isNull(mappingMasterVO.getEdmsComCode()) && !CmmnUtils.isNull(mappingMasterVO.getEdmsComNum())
//					&& !CmmnUtils.isNull(mappingMasterVO.getJisaCode())) {
//			  edmsMasterVO = edmsManagementService.saveEdmsMasterForFileUpload(mappingMasterVO, externalKey, request);
//			} else {
//			  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//			}
//			break;
//		}
//		if (CmmnUtils.isNull(edmsMasterVO)) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//		if (CmmnUtils.isNull(uploadPathType)) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//
//		edmsAttachFileVO.setEdmsFileUploadType("EDMS");
//		edmsAttachFileVO.setEdmsParentGubun(edmsMasterVO.getEdmsGubun());
//		edmsAttachFileVO.setEdmsParentKey(edmsMasterVO.getEdmsKey());
//		edmsAttachFileVO.setAddDay(yyyymmdd);
//		edmsAttachFileVO.setEdmsFileCategory(mRequest.getParameter("edmsFileCategory"));
//		edmsAttachFileVO.setEdmsFileStatus(mRequest.getParameter("edmsFileStatus"));
//		edmsAttachFileVO.setEdmsSearchKeyword(mRequest.getParameter("edmsSearchKeyword"));
//		edmsAttachFileVO.setEdmsFileNote(mRequest.getParameter("edmsFileNote"));
//		edmsAttachFileVO.setAddUserId(userId);
//		edmsAttachFileVO.setAddUserNm(userName);
//		edmsAttachFileVO.setAddDtm(currentDatetime);
//		edmsAttachFileVO.setEditUserId(userId);
//		edmsAttachFileVO.setEditUserNm(userName);
//
//		String uploadPath = uploadPathType + yyyymmdd + File.separator; // 파일path
//		File dir = new File(uploadPath);
//		if (!dir.isDirectory()) {
//		  dir.mkdirs();
//		}
//
//		MultiValueMap<String, MultipartFile> map = mRequest.getMultiFileMap();
//		Iterator<String> iter = map.keySet().iterator();
//		while (iter.hasNext()) {
//		  String str = iter.next();
//		  List<MultipartFile> fileList = map.get(str);
//		  for (MultipartFile mpf : fileList) {
//			String originalFileName = CmmnFileUtils.convertOriginalFileName(mpf.getOriginalFilename());
//			if (CmmnFileUtils.isContainsChinese(originalFileName) || CmmnFileUtils.isContainsJapanese(originalFileName) || CmmnFileUtils.isFileNameContainSpecialCharacter(originalFileName)) {
//			  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//			}
//			long fileSize = mpf.getSize();
//			//String saveFileName = originalFileName;
//			String saveFileName = originalFileName.substring(0, originalFileName.lastIndexOf("."));
//			String body, ext;
//			long sysTime = System.currentTimeMillis();
//
//			if (!CmmnUtils.isNull(saveFileName) && !saveFileName.equals("")) {
//			  if (new File(uploadPath + saveFileName).exists()) {
//				int dot = saveFileName.lastIndexOf(".");
//				if (dot != -1) {
//				  body = saveFileName.substring(0, dot);
//				  ext = saveFileName.substring(dot); // includes "."
//				  if (!CmmnFileUtils.isExtensionCheck(ext.substring(1))) {
//					return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//				  }
//				  saveFileName = body + "_" + sysTime + ext;
//				} else {
//				  saveFileName = saveFileName + "_" + sysTime;
//				}
//			  }
//
//			  try {
//				mpf.transferTo(new File(uploadPath + saveFileName));
//				// 파일정보
//				edmsAttachFileVO.setEdmsOrgFileName(originalFileName);
//				edmsAttachFileVO.setEdmsSaveFileName(saveFileName);
//				edmsAttachFileVO.setEdmsFilePath(uploadPath);
//				edmsAttachFileVO.setEdmsFileSize(BigDecimal.valueOf(fileSize));
//				edmsAttachFileVO.setEdmsFileExt((originalFileName.lastIndexOf(".") == -1) ? "" : originalFileName.substring(originalFileName.lastIndexOf(".") + 1, originalFileName.length()));
//				edmsAttachFileVO.setUseYn("Y");
//				edmsAttachFileVO.setEdmsServerGubun(serverGubun);
//				edmsAttachFileVO.setEdmsServerIp(serverIpAddr);
//				EdmsAttachFileVO saveVO = modelMapper.map(edmsAttachFileVO, EdmsAttachFileVO.class);
//				returnVO = saveAttachFile(saveVO, request);
//			  } catch (IllegalStateException e) {
//				e.printStackTrace();
//				errMap.put("EDMS_PARENT_KEY", returnVO.getEdmsParentKey());
//				errMap.put("EDMS_PARENT_GUBUN", returnVO.getEdmsParentGubun());
//				errMap.put("EDMS_FILE_KEY", returnVO.getEdmsFileKey());
//				errMap.put("_errorCause", "IllegalStateException");
//				return new ResponseEntity<>(errMap, HttpStatus.BAD_REQUEST);
//			  } catch (IOException e) {
//				e.printStackTrace();
//				errMap.put("EDMS_PARENT_KEY", returnVO.getEdmsParentKey());
//				errMap.put("EDMS_PARENT_GUBUN", returnVO.getEdmsParentGubun());
//				errMap.put("EDMS_FILE_KEY", returnVO.getEdmsFileKey());
//				errMap.put("_errorCause", "IOException");
//				return new ResponseEntity<>(errMap, HttpStatus.BAD_REQUEST);
//			  }
//			}
//		  }
//		}
//
//		return new ResponseEntity<>(returnVO, HttpStatus.OK);
//  }

  /**
   * Download edms file.(edms 파일 다운로드)
   *
   * @param request         the request
   * @param edmsFileKey     the edms file key
   * @param edmsParentGubun the edms parent gubun
   * @param edmsParentKey   the edms parent key
   * @param edmsOrgFileName the edms org file name
   * @param edmsNewFileName the edms new file name
   * @param response        the response
   * @throws UnsupportedEncodingException the unsupported encoding exception
   */
//  @RequestMapping(value = "/downloadEdmsFile", method = {RequestMethod.GET})
//  public void downloadEdmsFile(HttpServletRequest request, @RequestParam(value = "edmsFileKey") BigDecimal edmsFileKey,
//							   @RequestParam(value = "edmsParentGubun") String edmsParentGubun, @RequestParam(value = "edmsParentKey") BigDecimal edmsParentKey,
//							   @RequestParam(value = "edmsOrgFileName") String edmsOrgFileName, @RequestParam(value = "edmsNewFileName", required = false) String edmsNewFileName,
//							   HttpServletResponse response) throws UnsupportedEncodingException {
//	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
//	  return;
//
//	if (CmmnUtils.isNull(edmsFileKey) || CmmnUtils.isNull(edmsParentGubun) || CmmnUtils.isNull(edmsParentKey) || CmmnUtils.isNull(edmsOrgFileName)) {
//	  return;
//	}
//
//	String downloadFileName, reqFilePath = null, reqFileName = null;
//
//	try {
//	  List<EdmsAttachFileVO> voList;
//	  Map args = new HashMap();
//	  args.put("edmsFileKey", edmsFileKey);
//	  args.put("edmsParentGubun", edmsParentGubun);
//	  args.put("edmsParentKey", edmsParentKey);
//	  args.put("edmsOrgFileName", edmsOrgFileName);
//	  voList = edmsManagementService.getEdmsFileList(args);
//	  if (CmmnUtils.isNull(voList) || voList.size() > 1) throw new Exception("edms파일정보확인(default)_GEOWS");
//
//	  EdmsAttachFileVO returnVO = voList.get(0);
//	  // 로그 저장
//	  saveFileLogInfo(returnVO, request, "edms파일다운로드_GEOWS");
//
//	  // 다운로드 파일명 존재시 해당 파일명으로 다운로드
//	  downloadFileName = CmmnUtils.isNull(edmsNewFileName) ? returnVO.getEdmsOrgFileName() : edmsNewFileName;
//	  downloadFileName = CmmnFileUtils.convertEncodeFileName(downloadFileName);
//
//	  reqFilePath = returnVO.getEdmsFilePath();
//	  reqFileName = returnVO.getEdmsSaveFileName();
//
//	  File fileToDownload = new File(reqFilePath + reqFileName);
//	  InputStream inputStream = new FileInputStream(fileToDownload);
//	  response.setContentType("application/force-download");
//	  response.setHeader("Content-Disposition", "attachment; filename=\"" + downloadFileName + "\";");
//	  IOUtils.copy(inputStream, response.getOutputStream());
//	  response.flushBuffer();
//	  inputStream.close();
//	} catch (Exception e) {
//	  e.printStackTrace();
//	}
//  }

  /**
   * Delete edms file response entity.(edms 파일 삭제)
   *
   * @param request the request
   * @param args    the args
   * @return the response entity
   * @throws Exception the exception
   */
//  @RequestMapping(value = "/deleteEdmsFile")
//  public ResponseEntity<?> deleteEdmsFile(HttpServletRequest request, @RequestBody Map args) throws Exception {
//	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	String result = "";
//	BigDecimal edmsFileKey = NumberUtils.createBigDecimal(String.valueOf(args.get("edmsFileKey")));
//	String edmsParentGubun = String.valueOf(args.get("edmsParentGubun"));
//	BigDecimal edmsParentKey = NumberUtils.createBigDecimal(String.valueOf(args.get("edmsParentKey")));
//	String edmsOrgFileName = String.valueOf(args.get("edmsOrgFileName"));
//
//	if (CmmnUtils.isNull(edmsFileKey) || CmmnUtils.isNull(edmsParentGubun) || CmmnUtils.isNull(edmsParentKey) || CmmnUtils.isNull(edmsOrgFileName)) {
//	  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//	}
//
//	List<EdmsAttachFileVO> voList;
//	Map map = new HashMap();
//	map.put("edmsFileKey", edmsFileKey);
//	map.put("edmsParentGubun", edmsParentGubun);
//	map.put("edmsParentKey", edmsParentKey);
//	map.put("edmsOrgFileName", edmsOrgFileName);
//	voList = edmsManagementService.getEdmsFileList(map);
//	if (CmmnUtils.isNull(voList) || voList.size() > 1) throw new Exception("edms파일정보확인(default)_GEOWS");
//
//	EdmsAttachFileVO returnVO = voList.get(0);
//
//	File file = new File(returnVO.getEdmsFilePath() + returnVO.getEdmsSaveFileName());
//	if (file.isFile()) {
//	  returnVO.setUseYn("N");
//	  returnVO.setEditUserId(String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID)));
//	  edmsManagementService.saveEdmsFileInfo(returnVO, request);
//
//	  // 로그 저장
//	  saveFileLogInfo(returnVO, request, "edms파일삭제_GEOWS");
//
//	  // 파일 삭제
//	  String uploadPath = returnVO.getEdmsFilePath();
//	  result = CmmnFileUtils.deletePath(uploadPath, returnVO.getEdmsSaveFileName());
//	  if (!"".equals(result)) {
//		return new ResponseEntity<>(returnVO, HttpStatus.OK);
//	  } else {
//		result = "fail";
//		return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
//	  }
//	} else {
//	  result = "fail";
//	  return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
//	}
//  }

//  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
//  public EdmsAttachFileVO saveAttachFile(EdmsAttachFileVO edmsAttachFileVO, HttpServletRequest request) throws Exception {
//	EdmsAttachFileVO returnVO = edmsManagementService.saveEdmsFileInfo(edmsAttachFileVO, request);
//	saveFileLogInfo(returnVO, request, "edms파일업로드_GEOWS");
//	return returnVO;
//  }



  /**
   * Gets customs clearance by unregistered edms master list.
   *
   * @param request the request
   * @param args    the args
   * @return the customs clearance by unregistered edms master list
   */
  @RequestMapping(value = "/getCustomsClearanceByUnregisteredEdmsMasterList")
  public ResponseEntity<?> getCustomsClearanceByUnregisteredEdmsMasterList(HttpServletRequest request, @RequestBody Map args) {
	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  checkPagingParamsForMapper(args);
	  args.put("asmlTaxNum", asmlTaxNum);
	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
	  List<Map> list = edmsManagementService.getCustomsClearanceByUnregisteredEdmsMasterList(args);
	  List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
  }

  /**
   * Gets edms division copy target list.
   *
   * @param request the request
   * @param args    the args
   * @return the edms division copy target list
   */
  @RequestMapping(value = "/getEdmsDivisionCopyTargetList")
  public ResponseEntity<?> getEdmsDivisionCopyTargetList(HttpServletRequest request, @RequestBody Map args) {
	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  checkPagingParamsForMapper(args);
	  args.put("asmlTaxNum", asmlTaxNum);
	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
	  List<Map> list = edmsManagementService.getEdmsDivisionCopyTargetList(args);
	  List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
  }

  /**
   * Save edms division copy list response entity.
   *
   * @param request the request
   * @param args    the args
   * @return the response entity
   */
  @RequestMapping(value = "/saveEdmsDivisionCopyList")
  public ResponseEntity<?> saveEdmsDivisionCopyList(HttpServletRequest request, @RequestBody Map args) {
	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  List<Map<String, Object>> masterList = CmmnUtils.convertMapSourceToList(args, "edmsMasterList");
	  List<EdmsMasterVO> edmsMasterVOList = CmmnUtils.convertMapListToBean(masterList, EdmsMasterVO.class);
	  List<Map<String, Object>> fileList = CmmnUtils.convertMapSourceToList(args, "edmsAttachFileList");
	  List<EdmsAttachFileVO> edmsAttachFileVOList = CmmnUtils.convertMapListToBean(fileList, EdmsAttachFileVO.class);
	  List<Map> returnVoList = edmsManagementService.saveEdmsDivisionCopyList(edmsMasterVOList, edmsAttachFileVOList, request);
	  return new ResponseEntity<>(returnVoList, HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
  }

  /**
   * Is edms master same edms gubun and edms company and edms num list response entity.
   *
   * @param request the request
   * @param args    the args
   * @return the response entity
   */
  @RequestMapping(value = "/isEdmsMasterSameEdmsGubunAndEdmsCompanyAndEdmsNumList")
  public ResponseEntity<?> isEdmsMasterSameEdmsGubunAndEdmsCompanyAndEdmsNumList(HttpServletRequest request, @RequestBody Map args) {
	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
	  List<EdmsMasterVO> list = edmsManagementService.isEdmsMasterSameEdmsGubunAndEdmsCompanyAndEdmsNumList(args);
	  List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
  }

  /**
   * Save edms master by customs synchronize list response entity.
   *
   * @param request the request
   * @param args    the args
   * @return the response entity
   */
  @RequestMapping(value = "/saveEdmsMasterByCustomsSynchronizeList")
  public ResponseEntity<?> saveEdmsMasterByCustomsSynchronizeList(HttpServletRequest request, @RequestBody Map args) {
	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  List<Map<String, Object>> mapList = CmmnUtils.convertMapSourceToList(args, "edmsMasterByCustomsSynchronizeList");
	  List<EdmsMasterVO> voList = CmmnUtils.convertMapListToBean(mapList, EdmsMasterVO.class);
	  List<EdmsMasterVO> returnVoList = edmsManagementService.saveEdmsMasterByCustomsSynchronizeList(voList, request);
	  return new ResponseEntity<>(returnVoList, HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
  }

//  @RequestMapping(value = "/saveEdmsFileAdditionalInfo")
//  public ResponseEntity<?> saveEdmsFileAdditionalInfo(HttpServletRequest request, @RequestBody Map args) throws Exception {
//	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	try {
//	  // validation
//	  Map targetMap = args;
//	  EdmsFileDTO.additionalInfo additionalInfo = CmmnUtils.convertMapToBean(targetMap, EdmsFileDTO.additionalInfo.class);
//	  additionalInfo.setEditUserId(String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID)));
//	  additionalInfo.setEditDate(new Date());
//
//	  EdmsAttachFileVO returnVO = edmsManagementService.saveEdmsFileAdditionalInfo(additionalInfo, request);
//	  return new ResponseEntity<>(returnVO, HttpStatus.CREATED);
//	} catch (Exception e) {
//	  Map errMap = new HashMap();
//	  errMap.put("args", args);
//	  return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
//	}
//  }

//  @RequestMapping(value = "/ftpTest")
//  public ResponseEntity<?> ftpTest(HttpServletRequest request, @RequestBody Map args) {
//	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID)))
//	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//	try {
//	  String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
//	  String singoNum 		 = String.valueOf(args.get("singoNum1"));
//	  String edmsGubun 		 = String.valueOf(args.get("edmsGubun"));
//
//	  Map targetMap = args;
//	  FtpLogVO ftpLogVO = modelMapper.map(targetMap, FtpLogVO.class);
////	  ftpLogVO.setSingoNum(singoNum);
////	  ftpLogVO.setCount("1");
////	  ftpLogVO.setAddUserId(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID)));
////	  ftpLogVO.setAddDtm(currentDatetime);
////	  ftpLogDao.save(ftpLogVO);
//
//	  List<Map> list = edmsManagementService.selectEdmsFileList(args);
//	  for (int i = 0, n = list.size(); i < n; i++) {
//		if(String.valueOf(list.get(i).get("edmsFileCategory")).equals("B0001")){
//			String filename = "";
//			if(edmsGubun.equals("IMPORT")){
//				filename = "113886_EntryPacket_Importdeclaration_"+singoNum+"."+String.valueOf(list.get(i).get("edmsFileExt"));
//			}else{
//				filename = "113886_EntryPacket_Exportdeclaration_"+singoNum+"."+String.valueOf(list.get(i).get("edmsFileExt"));
//			}
//			File target = new File(String.valueOf(list.get(i).get("edmsFilePath")) + String.valueOf(list.get(i).get("edmsSaveFileName")));
//
//			FtpClient ftp_ivr = new FtpClient("labftp.integrationpoint.net", "user113886sbkr", "pH+thucaW5", "");
//			boolean result = ftp_ivr.upload(target, "Entry Document/"+filename+"");
//
//			if(result){
//				ftpLogVO = modelMapper.map(targetMap, FtpLogVO.class);
//				ftpLogVO.setSingoNum(singoNum);
//				ftpLogVO.setEdmsFileKey(String.valueOf(list.get(i).get("edmsFileKey")));
//				ftpLogVO.setCount("1");
//				ftpLogVO.setTaxNum("1298119610");
//				ftpLogVO.setAddUserId(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID)));
//				ftpLogVO.setAddDtm(currentDatetime);
//				ftpLogDao.save(ftpLogVO);
//			}
//
//			FtpClient ftp_ivr1 = new FtpClient("210.217.129.14", "edi", "edi123", "");
//			boolean result1 = ftp_ivr1.upload(target, filename);
//
//			if(result1){
//				ftpLogVO = modelMapper.map(targetMap, FtpLogVO.class);
//				ftpLogVO.setSingoNum(singoNum);
//				ftpLogVO.setEdmsFileKey(String.valueOf(list.get(i).get("edmsFileKey")));
//				ftpLogVO.setCount("1");
//				ftpLogVO.setTaxNum("1028141887");
//				ftpLogVO.setAddUserId(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID)));
//				ftpLogVO.setAddDtm(currentDatetime);
//				ftpLogDao.save(ftpLogVO);
//			}
//		}
//
//		if(String.valueOf(list.get(i).get("edmsFileCategory")).equals("A0001")){
//			String filename = "113886_EntryPacket_AWB_"+singoNum+"."+String.valueOf(list.get(i).get("edmsFileExt"));
//			File target = new File(String.valueOf(list.get(i).get("edmsFilePath")) + String.valueOf(list.get(i).get("edmsSaveFileName")));
//
//			FtpClient ftp_ivr = new FtpClient("labftp.integrationpoint.net", "user113886sbkr", "pH+thucaW5", "");
//			boolean result = ftp_ivr.upload(target, "Entry Document/"+filename+"");
//
//			if(result){
//				ftpLogVO = modelMapper.map(targetMap, FtpLogVO.class);
//				ftpLogVO.setSingoNum(singoNum);
//				ftpLogVO.setEdmsFileKey(String.valueOf(list.get(i).get("edmsFileKey")));
//				ftpLogVO.setCount("1");
//				ftpLogVO.setTaxNum("1298119610");
//				ftpLogVO.setAddUserId(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID)));
//				ftpLogVO.setAddDtm(currentDatetime);
//				ftpLogDao.save(ftpLogVO);
//			}
//		}
//
//		if(String.valueOf(list.get(i).get("edmsFileCategory")).equals("A0002")){
//			String filename = "113886_EntryPacket_Shippinginvoice_"+singoNum+"."+String.valueOf(list.get(i).get("edmsFileExt"));
//			File target = new File(String.valueOf(list.get(i).get("edmsFilePath")) + String.valueOf(list.get(i).get("edmsSaveFileName")));
//
//			FtpClient ftp_ivr = new FtpClient("labftp.integrationpoint.net", "user113886sbkr", "pH+thucaW5", "");
//			boolean result = ftp_ivr.upload(target, "Entry Document/"+filename+"");
//
//			if(result){
//				ftpLogVO = modelMapper.map(targetMap, FtpLogVO.class);
//				ftpLogVO.setSingoNum(singoNum);
//				ftpLogVO.setEdmsFileKey(String.valueOf(list.get(i).get("edmsFileKey")));
//				ftpLogVO.setCount("1");
//				ftpLogVO.setTaxNum("1298119610");
//				ftpLogVO.setAddUserId(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID)));
//				ftpLogVO.setAddDtm(currentDatetime);
//				ftpLogDao.save(ftpLogVO);
//			}
//		}
//
//		if(String.valueOf(list.get(i).get("edmsFileCategory")).equals("A0003")){
//			String filename = "113886_EntryPacket_Packinglist_"+singoNum+"."+String.valueOf(list.get(i).get("edmsFileExt"));
//			File target = new File(String.valueOf(list.get(i).get("edmsFilePath")) + String.valueOf(list.get(i).get("edmsSaveFileName")));
//
//			FtpClient ftp_ivr = new FtpClient("labftp.integrationpoint.net", "user113886sbkr", "pH+thucaW5", "");
//			boolean result = ftp_ivr.upload(target, "Entry Document/"+filename+"");
//
//			if(result){
//				ftpLogVO = modelMapper.map(targetMap, FtpLogVO.class);
//				ftpLogVO.setSingoNum(singoNum);
//				ftpLogVO.setEdmsFileKey(String.valueOf(list.get(i).get("edmsFileKey")));
//				ftpLogVO.setCount("1");
//				ftpLogVO.setTaxNum("1298119610");
//				ftpLogVO.setAddUserId(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID)));
//				ftpLogVO.setAddDtm(currentDatetime);
//				ftpLogDao.save(ftpLogVO);
//			}
//		}
//	  }
//
//	  return new ResponseEntity<>("Success", HttpStatus.CREATED);
//	} catch (Exception e) {
//	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//	}
//  }

  @RequestMapping(value = "/getEdmsFileDownList")
  public ResponseEntity<?> getEdmsFileDownList(HttpServletRequest request, @RequestBody Map args) {
    if (getUserInfo(request, CmmnConstants.SESSION_ID) == null)
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));

	  List<Map> list = edmsManagementService.getEdmsFileDownFileList(args);
	  List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
	  return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
  }

//  @RequestMapping(value = "/archivingEdmsFiles")
//  public ResponseEntity<?> archivingEdmsFiles(HttpServletRequest request, @RequestBody Map args) throws Exception {
//	if (CmmnUtils.isNull(getUserInfo(request, CmmnConstants.SESSION_ID))) return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//	String downloadFileName = null;
//	String userId = String.valueOf(getUserInfo(request, CmmnConstants.SESSION_USERID));
//
//	try {
//
//	  downloadFileName = String.valueOf(args.get("downloadFileName"));
//
//	  List<EdmsAttachFileVO> edmsAttachFileVOList = new ArrayList<>();
//	  List<Map<String, Object>> jsonList = CmmnUtils.convertMapSourceToList(args, "batchDownloadEdmsFileList");
//	  for (int i = 0, n = jsonList.size(); i < n; i++) {
//		EdmsAttachFileVO edmsAttachFileVO = modelMapper.map(jsonList.get(i), EdmsAttachFileVO.class);
//		edmsAttachFileVO.setAddUserId(userId);
//		edmsAttachFileVO.setEditUserId(userId);
//		edmsAttachFileVOList.add(edmsAttachFileVO);
//	  }
//	  if (CmmnUtils.isNull(downloadFileName) || CmmnUtils.isNull(edmsAttachFileVOList)) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//
//	  List<EdmsAttachFileVO> voList = new ArrayList<>();
//	  for (EdmsAttachFileVO vo : edmsAttachFileVOList) {
//		Map searchMap = new HashMap();
//		searchMap.put("edmsFileKey", vo.getEdmsFileKey());
//		searchMap.put("edmsParentGubun", vo.getEdmsParentGubun());
//		searchMap.put("edmsParentKey", vo.getEdmsParentKey());
//		searchMap.put("edmsOrgFileName", vo.getEdmsOrgFileName());
//		voList.addAll(edmsManagementService.getEdmsFileList(searchMap));
//	  }
//	  if (CmmnUtils.isNull(voList)) throw new Exception("edms파일정보확인(default)");
//
//	  List<File> filelist = new ArrayList();
//	  CmmnFileCompressUtils cmmnFileCompressUtil = new CmmnFileCompressUtils();
//	  String tempKey = "";
//	  for (int i=0;i<voList.size();i++) {
//		if(tempKey.equals("")){
//			filelist.add(new File(voList.get(i).getEdmsFilePath() + voList.get(i).getEdmsOrgFileName()));
//		}else if(tempKey.equals(voList.get(i).getEdmsParentKey().toString())){
//			filelist.add(new File(voList.get(i).getEdmsFilePath() + voList.get(i).getEdmsOrgFileName()));
//		}else{
//			EdmsMasterVO newedmsMasterVO = edmsMasterDao.findTop1ByEdmsKey(BigDecimal.valueOf(Long.parseLong(tempKey)));
//			String fileName = newedmsMasterVO.getEdmsNum() +".zip";
//
//			File zippedFile = new File(edmsFileUploadPath + "\\allDownload\\", fileName);
//			cmmnFileCompressUtil.isZip(filelist, new FileOutputStream(zippedFile));
//			filelist = new ArrayList();
//			filelist.add(new File(voList.get(i).getEdmsFilePath() + voList.get(i).getEdmsOrgFileName()));
//		}
//
//		tempKey = voList.get(i).getEdmsParentKey().toString();
//
//		if(i == voList.size()-1){
//			EdmsMasterVO newedmsMasterVO = edmsMasterDao.findTop1ByEdmsKey(BigDecimal.valueOf(Long.parseLong(tempKey)));
//			String fileName = newedmsMasterVO.getEdmsNum() +".zip";
//			File zippedFile = new File(edmsFileUploadPath + "\\allDownload\\", fileName);
//			cmmnFileCompressUtil.isZip(filelist, new FileOutputStream(zippedFile));
//		}
//	  }
//
//	  cmmnFileCompressUtil.zip(new File(edmsFileUploadPath + "\\allDownload\\"));
//	  return new ResponseEntity<>(downloadFileName, HttpStatus.OK);
//	} catch (Exception e) {
//	  e.printStackTrace();
//	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//	}
//  }

//  @RequestMapping(value = "/batchDownloadEdmsFiles", method = RequestMethod.GET)
//  public void batchDownloadEdmsFiles(HttpServletRequest request, @RequestParam(value = "fileName") String compressFileName, HttpServletResponse response) {
//	String userId = String.valueOf(getUserInfo(request, CmmnConstants.SESSION_ID));
//	if (CmmnUtils.isNull(userId) || CmmnUtils.isNull(compressFileName))
//	  return;
//	if (!new File(edmsFileUploadPath + compressFileName).exists()) {
//	  return;
//	}
//
//	// 파일명 encoding
//	String downloadFileName = CmmnFileUtils.convertEncodeFileName(compressFileName);
//
//	try {
//	  File fileToDownload = new File(edmsFileUploadPath + downloadFileName);
//	  InputStream inputStream = new FileInputStream(fileToDownload);
//	  response.setContentType("application/force-download");
//	  response.setHeader("Content-Disposition", "attachment; filename=\"" + downloadFileName + "\";");
//	  IOUtils.copy(inputStream, response.getOutputStream());
//	  response.flushBuffer();
//	  inputStream.close();
//
//	  // 로그 저장(파일키:0, 부모키:0)
//	  EdmsAttachFileVO allFileVO = new EdmsAttachFileVO();
//	  allFileVO.setEdmsFileKey(BigDecimal.ZERO);
//	  allFileVO.setEdmsParentKey(BigDecimal.ZERO);
//	  allFileVO.setEdmsParentGubun("배치다운");
//	  allFileVO.setEdmsFileCategory(userId);
//	  allFileVO.setEdmsFilePath(edmsFileUploadPath);
//	  allFileVO.setEdmsOrgFileName(downloadFileName);
//	  saveFileLogInfo(allFileVO, request, "edms파일배치다운로드");
//	} catch (Exception e) {
//	  e.printStackTrace();
//	} finally {
//		File selectedDir= new File(edmsFileUploadPath + "\\allDownload\\");
//        File[] innerFiles= selectedDir.listFiles();
//        for(int i=0; i<innerFiles.length; i++){
//            innerFiles[i].delete();
//        }
//        if (new File(edmsFileUploadPath + compressFileName).exists()) CmmnFileUtils.deletePath(edmsFileUploadPath, downloadFileName);
//	}
//  }
}