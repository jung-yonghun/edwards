package com.edwards.web.maria;


import com.edwards.biz3.mariaManagement.*;
import com.edwards.commons.CmmnConstants;
import com.edwards.commons.CmmnController;
import com.edwards.commons.CmmnUtils;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Controller
@RestController
@RequestMapping(value = {"/apis/maria"}, method = {RequestMethod.POST})
public class MariaController extends CmmnController{
	@Qualifier("SqlSessionTemplate")
	@Autowired
	private SqlSession sqlSession;
	@Autowired
	private MariaManagementService mariaManagementService;

	private String stringValueOf(Object object) {
		 return object == null ? "" : String.valueOf(object);
	}

	@RequestMapping(value = "/selectBoardInfoList")
	public ResponseEntity<?> selectBoardInfoList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = mariaManagementService.selectBoardInfoList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectBoardInfoSimpleList")
	public ResponseEntity<?> selectBoardInfoSimpleList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = mariaManagementService.selectBoardInfoSimpleList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
}