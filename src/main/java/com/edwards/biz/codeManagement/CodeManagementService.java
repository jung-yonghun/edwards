package com.edwards.biz.codeManagement;

import com.edwards.commons.CmmnConstants;
import com.edwards.commons.CmmnSpecs;
import com.edwards.commons.CmmnUtils;
import com.edwards.domains.CDAF100DVO;
import com.edwards.domains.CpsCdMasterVO;

import org.apache.commons.lang3.math.NumberUtils;
import org.apache.ibatis.session.SqlSession;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specifications;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintViolation;

import java.math.BigDecimal;
import java.util.*;

@Service
public class CodeManagementService {
	@Qualifier("SqlSessionTemplate")
	@Autowired
	private SqlSession sqlSession;
	@Autowired
	private CDAF100DDao cDAF100DDao;
	@Autowired
	private CodeMasterDao codeMasterDao;
	@Autowired
	private MessageSource messageSource;
	@Autowired
	private ModelMapper modelMapper;

	public List<CDAF100DVO> selectCdMasterList(Map args) throws Exception {
		Specifications spec = selectCdMasterSpecs(args);
		return cDAF100DDao.findAll(spec);
	}

	private Specifications selectCdMasterSpecs(Map args) {
		String Mcd 		= args.containsKey("Mcd") ? String.valueOf(args.get("Mcd")) : "";
		String UseYn 	= args.containsKey("UseYn") ? String.valueOf(args.get("UseYn")) : "";
		String Cd 		= args.containsKey("Cd") ? String.valueOf(args.get("Cd")) : "";

		Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(UseYn, "UseYn"));
		if (!CmmnUtils.isNull(Mcd)) spec = spec.and(CmmnSpecs.eqStringSpec(Mcd, "Mcd"));
		if (!CmmnUtils.isNull(Cd)) 	spec = spec.and(CmmnSpecs.eqStringSpec(Cd, "Cd"));

		return spec;
	}

	public List<Map> selectStandardExchangeRateList(Map args) throws Exception{
		return sqlSession.getMapper(CmmnCodeMapper.class).selectStandardExchangeRate(CmmnUtils.replaceMapSc(args));
	}

//	public List<CpsCdMasterVO> selectCdMasterList(Map args, Pageable pageable) throws Exception {
//		Specifications spec = selectCdMasterSpecs(args);
//		return codeMasterDao.findAll(spec, pageable);
//	}
//
//	private Specifications selectCdMasterSpecs(Map args) {
//		BigDecimal cdKey 	= CmmnUtils.isContainsMapValue(args, "cdKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("cdKey"))) : null;
//		String mcode 		= args.containsKey("mcode") ? String.valueOf(args.get("mcode")) : "";
//		String code 		= args.containsKey("code") ? String.valueOf(args.get("code")) : "";
//		String name 		= args.containsKey("name") ? String.valueOf(args.get("name")) : "";
//		String engName 		= args.containsKey("engName") ? String.valueOf(args.get("engName")) : "";
//		String useYn 		= args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "";
//
//		Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn"));
//		if (!CmmnUtils.isNull(cdKey)) 	spec = spec.and(CmmnSpecs.eqNumberSpec(cdKey, "cdKey"));
//		if (!CmmnUtils.isNull(mcode)) 	spec = spec.and(CmmnSpecs.eqStringSpec(mcode, "mcode"));
//		if (!CmmnUtils.isNull(code)) 	spec = spec.and(CmmnSpecs.afterLikeStringSpec(code, "code"));
//		if (!CmmnUtils.isNull(name)) 	spec = spec.and(CmmnSpecs.afterLikeStringSpec(name, "name"));
//		if (!CmmnUtils.isNull(engName)) spec = spec.and(CmmnSpecs.eqStringSpec(engName, "engName"));
//
//		return spec;
//	}

	public List<Map> selectGucciBuList(Map args) throws Exception{
		return sqlSession.getMapper(CmmnCodeMapper.class).selectGucciBuList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectGucciObjectList(Map args) throws Exception{
		return sqlSession.getMapper(CmmnCodeMapper.class).selectGucciObjectList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectGucciBrandList(Map args) throws Exception{
		return sqlSession.getMapper(CmmnCodeMapper.class).selectGucciBrandList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectSegwanList(Map args) throws Exception{
		return sqlSession.getMapper(CmmnCodeMapper.class).selectSegwanList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectNcomCodeList(Map args) throws Exception{
		return sqlSession.getMapper(CmmnCodeMapper.class).selectNcomCodeList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectBSAA100MList(Map args) throws Exception{
		return sqlSession.getMapper(CmmnCodeMapper.class).selectBSAA100MList(CmmnUtils.replaceMapSc(args));
	}

	public long updateBSAA100MList(Map args) throws Exception{
		return sqlSession.getMapper(CmmnCodeMapper.class).updateBSAA100MList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectBSAJ100List(Map args) throws Exception{
		return sqlSession.getMapper(CmmnCodeMapper.class).selectBSAJ100List(CmmnUtils.replaceMapSc(args));
	}

	public long updateBSAJ100List(Map args) throws Exception{
		return sqlSession.getMapper(CmmnCodeMapper.class).updateBSAJ100List(CmmnUtils.replaceMapSc(args));
	}












  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public List<CpsCdMasterVO> saveCdMasterList(List<CpsCdMasterVO> voList, HttpServletRequest request) throws Exception {
	List<CpsCdMasterVO> validateList = new ArrayList<>();
	String userKey = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
	String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

	// validation
	for (CpsCdMasterVO vo : voList) {
	  CpsCdMasterVO validateVO = modelMapper.map(vo, CpsCdMasterVO.class);
	  validateVO.setAddUserKey(userKey);
	  validateVO.setEditUserKey(userKey);
	  validateVO.setAddDtm(currentDatetime);
	  Set<ConstraintViolation<CpsCdMasterVO>> validator = CmmnUtils.isCommonValid(validateVO);
	  if (validator.size() > 0) {
		Object[] parameter = validator.toArray();
		throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
	  }
	  validateList.add(vo);
	}

	List<CpsCdMasterVO> returnVO = codeMasterDao.save(voList);

	return returnVO;
  }
}