package com.edwards.web.fta;

import com.edwards.biz.ftaManagement.FtaManagementService;
import com.edwards.commons.CmmnConstants;
import com.edwards.commons.CmmnController;
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

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@RestController
@RequestMapping(value = {"/apis/fta"}, method = {RequestMethod.POST})
public class FtaController extends CmmnController {
	@Autowired
	private FtaManagementService ftaManagementService;
	@Autowired
	private ModelMapper modelMapper;

	@RequestMapping(value = "/selectFtaManagementVendorList")
	public ResponseEntity<?> selectFtaManagementVendorList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			checkPagingParamsForMapper(args);
			List<Map> list = ftaManagementService.selectFtaManagementVendorList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectFtaManagementAlconList")
	public ResponseEntity<?> selectFtaManagementAlconList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			checkPagingParamsForMapper(args);
			List<Map> list = ftaManagementService.selectFtaManagementAlconList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectFtaManagementAlconDetailList")
	public ResponseEntity<?> selectFtaManagementAlconDetailList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = ftaManagementService.selectFtaManagementAlconDetailList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}
}