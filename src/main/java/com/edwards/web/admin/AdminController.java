package com.edwards.web.admin;

import com.edwards.biz.userManagement.*;
import com.edwards.commons.CmmnConstants;
import com.edwards.commons.CmmnController;
import com.edwards.commons.CmmnUtils;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
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
@RequestMapping(value = {"/apis/userInfo"}, method = {RequestMethod.POST})
public class AdminController extends CmmnController{
	@Autowired
	private UserManagementService userManagementService;
	@Autowired
	private ModelMapper modelMapper;

	@RequestMapping(value = "/getUserInfoList")
	public ResponseEntity<?> getUserInfoList(HttpServletRequest request, @RequestBody Map args){
		if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			checkPagingParamsForMapper(args);
			PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
			List<Map> userList = userManagementService.getUserList(args);

			List<?> result = userList.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());

			return new ResponseEntity<>(new PageImpl<>(result, pageRequest, userList.size()), HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
}