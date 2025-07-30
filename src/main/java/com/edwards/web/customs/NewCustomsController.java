package com.edwards.web.customs;

import com.edwards.biz.customsManagement.CustomsCostMasterDao;
import com.edwards.biz.customsManagement.NewCustomsManagementService;
import com.edwards.biz.systemManagement.SystemManagementService;
import com.edwards.commons.CmmnConstants;
import com.edwards.commons.CmmnController;
import com.edwards.commons.CmmnMailService;
import com.edwards.commons.CmmnUtils;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = {"/apis/newcustoms"}, method = {RequestMethod.POST})
public class NewCustomsController extends CmmnController {
	@Autowired
	private NewCustomsManagementService newCustomsManagementService;
	@Autowired
	private SystemManagementService systemManagementService;
	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	private CmmnMailService cmmnMailService;
	@Autowired
	private CustomsCostMasterDao customsCostMasterDao;

	//############ 현장관리 시작  #############//
	@RequestMapping(value = "/selectImportFieldStatusList")
	public ResponseEntity<?> selectImportFieldStatusList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			List<Map> list = new ArrayList<>();
			list = newCustomsManagementService.selectImportFieldAllStatusList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImportNewFieldStatusList")
	public ResponseEntity<?> selectImportNewFieldStatusList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			List<Map> list = new ArrayList<>();
			list = newCustomsManagementService.selectImportNewFieldStatusList(args);
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
			list = newCustomsManagementService.selectImportJungFieldAllStatusList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectImportNewJungFieldStatusList")
	public ResponseEntity<?> selectImportNewJungFieldStatusList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			List<Map> list = new ArrayList<>();
			list = newCustomsManagementService.selectImportNewJungFieldStatusList(args);
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
			list = newCustomsManagementService.selectExportFieldAllStatusList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectExportNewFieldStatusList")
	public ResponseEntity<?> selectExportNewFieldStatusList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			List<Map> list = new ArrayList<>();
			list = newCustomsManagementService.selectExportNewFieldStatusList(args);
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
			list = newCustomsManagementService.selectExportJungFieldAllStatusList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectExportNewJungFieldStatusList")
	public ResponseEntity<?> selectExportNewJungFieldStatusList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		try{
			List<Map> list = new ArrayList<>();
			list = newCustomsManagementService.selectExportNewJungFieldStatusList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectFieldManage")
	public ResponseEntity<?> selectFieldManage(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = newCustomsManagementService.selectFieldManage(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveFieldManage")
    public ResponseEntity<?> saveFieldManage(HttpServletRequest request, @RequestBody Map args) throws Exception{
	  	try{
	  		String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
	  		args.put("AddUserId",userId);
	  		args.put("AddUserNm",userNm);
	  		args.put("AddDtm",currentDatetime);
	  		long result = newCustomsManagementService.saveFieldManage(args);
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }

	@RequestMapping(value = "/updateFieldManage")
    public ResponseEntity<?> updateFieldManage(HttpServletRequest request, @RequestBody Map args) throws Exception{
	  	try{
	  		String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
			String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
			String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
	  		args.put("EditUserId",userId);
	  		args.put("EditUserNm",userNm);
	  		args.put("EditDtm",currentDatetime);
	  		long result = newCustomsManagementService.updateFieldManage(args);
	  		return new ResponseEntity<>(result, HttpStatus.OK);
	  	}catch(Exception e){
	  		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  	}
    }
	//############ 현장관리 끝  #############//
}