package com.edwards.web.code;

import com.edwards.biz.codeManagement.CodeManagementService;
import com.edwards.biz.codeManagement.SooMstCmmnCodeService;
import com.edwards.commons.CmmnConstants;
import com.edwards.commons.CmmnController;
import com.edwards.commons.CmmnUtils;
import com.edwards.domains.CDAF100DVO;
import com.edwards.domains.CpsCdMasterVO;
import com.edwards.domains.SooMst_CdHsMate1VO;
import com.edwards.domains.SooMst_CdHsMate2VO;
import com.edwards.domains.SooMst_CdHsMstVO;
import com.edwards.domains.SooMst_SysCodeVO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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
@RequestMapping(value = {"/apis/cmmnCode"}, method = {RequestMethod.POST})
public class CodeController extends CmmnController{
	@Autowired
	private CodeManagementService codeManagementService;
	@Autowired
	private SooMstCmmnCodeService sooMstCmmnCodeService;

	@RequestMapping(value = "/selectCdMasterList")
	public ResponseEntity<?> selectCdMasterList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<CDAF100DVO> list = codeManagementService.selectCdMasterList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectStandardExchangeRateList")
	public ResponseEntity<?> selectStandardExchangeRateList(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			List<Map> list = codeManagementService.selectStandardExchangeRateList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

//	@RequestMapping(value = "/selectCdMasterList")
//	public ResponseEntity<?> selectCdMasterList(HttpServletRequest request, @RequestBody Map args){
//		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
//			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//
//		try{
//			PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))),
//									Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))),
//									CmmnUtils.getOrders(args, new Sort(Sort.Direction.DESC, "useYn").and(new Sort(Sort.Direction.ASC, "code")).and(new Sort(Sort.Direction.ASC, "sortOrder"))));
//
//			List<CpsCdMasterVO> list = codeManagementService.selectCdMasterList(args, pageRequest);
//			List<?> result = list.stream().collect(Collectors.toList());
//			return new ResponseEntity<>(result, HttpStatus.OK);
//		}catch (Exception e){
//			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
//		}
//	}

	@RequestMapping(value = "/selectSooMstCdHsMstList")
	public ResponseEntity<?> selectSooMstCdHsMstList(HttpServletRequest request, @RequestBody Map args){
		try{
			PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))),
				  Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))),
				  CmmnUtils.getOrders(args, new Sort(Sort.Direction.DESC, "useYn")));
			Page<SooMst_CdHsMstVO> list = sooMstCmmnCodeService.selectSooMstCdHsMstList(args, pageRequest);
			return new ResponseEntity<>(list, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectCdHsMate1List")
	public ResponseEntity<?> selectCdHsMate1List(HttpServletRequest request, @RequestBody Map args){
		try{
			PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
			List<SooMst_CdHsMate1VO> list = sooMstCmmnCodeService.selectCdHsMate1List(args);
			List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
			return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectCdHsMate2List")
	public ResponseEntity<?> selectCdHsMate2List(HttpServletRequest request, @RequestBody Map args){
		try{
			PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
			List<SooMst_CdHsMate2VO> list = sooMstCmmnCodeService.selectCdHsMate2List(args);
			List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
			return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectSooMstCdHsRateWithTrrtTpcdList")
	public ResponseEntity<?> selectSooMstCdHsRateWithTrrtTpcdList(HttpServletRequest request, @RequestBody Map args){
		try{
			checkPagingParamsForMapper(args);
			PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
			List<Map> list = sooMstCmmnCodeService.selectSooMstCdHsRateWithTrrtTpcdList(args);
			List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
			return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectSysCodeList")
	public ResponseEntity<?> selectSysCodeList(HttpServletRequest request, @RequestBody Map args){
		try{
			PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))), Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))));
			List<SooMst_SysCodeVO> list = sooMstCmmnCodeService.selectSysCodeList(args);
			List<?> result = list.stream().skip(pageRequest.getPageNumber() * pageRequest.getPageSize()).limit(pageRequest.getPageSize()).collect(Collectors.toList());
			return new ResponseEntity<>(new PageImpl<>(result, pageRequest, list.size()), HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectGucciBuList")
	public ResponseEntity<?> selectGucciBuList(HttpServletRequest request, @RequestBody Map args){
		try{
			List<Map> list = codeManagementService.selectGucciBuList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectGucciObjectList")
	public ResponseEntity<?> selectGucciObjectList(HttpServletRequest request, @RequestBody Map args){
		try{
			List<Map> list = codeManagementService.selectGucciObjectList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectGucciBrandList")
	public ResponseEntity<?> selectGucciBrandList(HttpServletRequest request, @RequestBody Map args){
		try{
			List<Map> list = codeManagementService.selectGucciBrandList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectSegwanList")
	public ResponseEntity<?> selectSegwanList(HttpServletRequest request, @RequestBody Map args){
		try{
			List<Map> list = codeManagementService.selectSegwanList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectNcomCodeList")
	public ResponseEntity<?> selectNcomCodeList(HttpServletRequest request, @RequestBody Map args){
		try{
			List<Map> list = codeManagementService.selectNcomCodeList(args);
			List<?> result = list.stream().collect(Collectors.toList());
			return new ResponseEntity<>(result, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}








  @RequestMapping(value = "/saveCdMasterList")
  public ResponseEntity<?> saveCdMasterList(HttpServletRequest request, @RequestBody Map args) {
	if (CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
	  return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

	try {
	  List<Map<String, Object>> mapList = CmmnUtils.convertMapSourceToList(args, "cdMasterList");
	  List<CpsCdMasterVO> voList = CmmnUtils.convertMapListToBean(mapList, CpsCdMasterVO.class);

	  List<CpsCdMasterVO> returnVoList = codeManagementService.saveCdMasterList(voList, request);
	  return new ResponseEntity<>(returnVoList, HttpStatus.OK);
	} catch (Exception e) {
	  return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}
  }
}