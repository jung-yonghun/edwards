package com.edwards.biz.systemManagement;

import com.edwards.biz.userManagement.UserInfoDao;
import com.edwards.commons.CmmnConstants;
import com.edwards.commons.CmmnSpecs;
import com.edwards.commons.CmmnUtils;
import com.edwards.domains.CpsAttachFileVO;
import com.edwards.domains.CpsSaveCustomerVO;
import com.edwards.domains.CpsSaveTeamVO;
import com.edwards.domains.CpsStartInfoVO;
import com.edwards.domains.CpsTeamVO;
import com.edwards.domains.CpsUserMenuVO;
import com.edwards.domains.ENAC100VO;
import com.edwards.domains.SysAttachFileVO;
import com.edwards.domains.SysMenuVO;
import com.edwards.domains.SysNoticeVO;
import com.edwards.domains.UserMenuAuthVO;

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
import java.math.BigInteger;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class SystemManagementService {
	@Autowired
	private SysMenuDao sysMenuDao;
	@Autowired
	private SysNoticeDao sysNoticeDao;
	@Autowired
	private SysAttachFileDao sysAttachFileDao;
	@Autowired
	private ENAC100Dao eNAC100Dao;
	@Autowired
	private UserMenuAuthDao userMenuAuthDao;
	@Autowired
	private UserInfoDao userInfoDao;
	@Autowired
	private CpsSaveCustomerDao cpsSaveCustomerDao;
	@Autowired
	private CpsUserMenuDao cpsUserMenuDao;
	@Autowired
	private CpsSaveTeamDao cpsSaveTeamDao;
	@Autowired
	private CpsTeamDao cpsTeamDao;
	@Autowired
	private CpsAttachFileDao cpsAttachFileDao;

	@Qualifier("SqlSessionTemplate")
	@Autowired
	private SqlSession sqlSession;

	@Autowired
	private MessageSource messageSource;
	@Autowired
	private ModelMapper modelMapper;

	public List<Map> selectSysMenuList(Map args) throws Exception{
		return sqlSession.getMapper(UserMenuAuthMapper.class).selectUserMenuList(CmmnUtils.replaceMapSc(args));
	}

	public List<SysNoticeVO> selectSysNoticeList(Map args, Pageable pageable) throws Exception{
		if(args.containsKey("noticesKey")){
			if(args.containsKey("checkCount")){
				SysNoticeVO sysNoticeVO = sysNoticeDao.getOne(NumberUtils.createBigDecimal(String.valueOf(args.get("noticesKey"))));
				sysNoticeVO.setInquiryCount(sysNoticeVO.getInquiryCount() + 1);
				sysNoticeDao.save(sysNoticeVO);
			}
	    }
		Specifications spec = selectSysNoticeSpecs(args);
		return sysNoticeDao.findAll(spec, pageable);
	}

	private Specifications selectSysNoticeSpecs(Map args){
		BigDecimal noticesKey 	= CmmnUtils.isContainsMapValue(args, "noticesKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("noticesKey"))) : null;
		String category 		= args.containsKey("category") ? String.valueOf(args.get("category")) : null;
		String subject 			= args.containsKey("subject") ? String.valueOf(args.get("subject")) : null;
		String _dateType 		= args.containsKey("_dateType") ? String.valueOf(args.get("_dateType")) : null; // startDay,endDay
		String startDay 		= args.containsKey("startDay") ? String.valueOf(args.get("startDay")) : "11111111";
		String endDay 			= args.containsKey("endDay") ? String.valueOf(args.get("endDay")) : "99991231";
		String keyword 			= args.containsKey("keyword") ? String.valueOf(args.get("keyword")) : "";
		String useYn 			= args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "";
		String contents 		= args.containsKey("contents") ? String.valueOf(args.get("contents")) : "";

		Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn"));
		if (!CmmnUtils.isNull(noticesKey)) 	spec = spec.and(CmmnSpecs.eqNumberSpec(noticesKey, "noticesKey"));
		if (!CmmnUtils.isNull(category)) 	spec = spec.and(CmmnSpecs.afterLikeStringSpec(category, "category"));
		if (!CmmnUtils.isNull(subject)) 	spec = spec.and(CmmnSpecs.afterLikeStringSpec(subject, "subject"));
		if (!CmmnUtils.isNull(_dateType) && !CmmnUtils.isNull(startDay) && !CmmnUtils.isNull(endDay)) {
			spec = spec.and(CmmnSpecs.betweenObjectSpec(startDay, endDay, _dateType));
		}
		if (!CmmnUtils.isNull(keyword)) spec = spec.and(CmmnSpecs.bothLikeStringSpec(keyword, "keyword"));
		if (!CmmnUtils.isNull(contents)) spec = spec.and(CmmnSpecs.bothLikeStringSpec(contents, "contents"));

		return spec;
	}

	public List<SysAttachFileVO> selectSysFileList(Map args, Pageable pageable) throws Exception{
	    BigDecimal noticeKey = CmmnUtils.isContainsMapValue(args, "noticeKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("noticeKey"))) : null;
		String useYn = args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "";

		Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn"));
		if (!CmmnUtils.isNull(noticeKey)) spec = spec.and(CmmnSpecs.eqNumberSpec(noticeKey, "noticeKey"));
		return sysAttachFileDao.findAll(spec, pageable);
	}

	public List<ENAC100VO> selectENAC100List(Map args) throws Exception{
	    BigDecimal FKey  = CmmnUtils.isContainsMapValue(args, "FKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("FKey"))) : null;
	    String FKeyMngNo = args.containsKey("FKeyMngNo") ? String.valueOf(args.get("FKeyMngNo")) : "";
		String FTableNm  = args.containsKey("FTableNm") ? String.valueOf(args.get("FTableNm")) : "";
		String UseYn     = args.containsKey("UseYn") ? String.valueOf(args.get("UseYn")) : "";

		Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(UseYn, "UseYn"));
		if (!CmmnUtils.isNull(FKey)) spec = spec.and(CmmnSpecs.eqNumberSpec(FKey, "FKey"));
		if (!CmmnUtils.isNull(FKeyMngNo)) spec = spec.and(CmmnSpecs.eqStringSpec(FKeyMngNo, "FKeyMngNo"));
		if (!CmmnUtils.isNull(FTableNm)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(FTableNm, "FTableNm"));
		return eNAC100Dao.findAll(spec);
	}

	public List<CpsSaveCustomerVO> selectSaveCustomerList(Map args) throws Exception{
		Specifications spec = selectCpsSaveCustomerSpecs(args);
		return cpsSaveCustomerDao.findAll(spec);
	}

	private Specifications selectCpsSaveCustomerSpecs(Map args){
		BigDecimal scKey 	= CmmnUtils.isContainsMapValue(args, "scKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("scKey"))) : null;
		String userKey 		= args.containsKey("userKey") ? String.valueOf(args.get("userKey")) : "";
		String defaultDB 	= args.containsKey("defaultDB") ? String.valueOf(args.get("defaultDB")) : "";
		String userSangho 	= args.containsKey("userSangho") ? String.valueOf(args.get("userSangho")) : "";
		String userSaup 	= args.containsKey("userSaup") ? String.valueOf(args.get("userSaup")) : "";
		String useYn 		= args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "";

		Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn"));
		if (!CmmnUtils.isNull(scKey)) 	spec = spec.and(CmmnSpecs.eqNumberSpec(scKey, "scKey"));
		if (!CmmnUtils.isNull(userKey)) 	spec = spec.and(CmmnSpecs.eqStringSpec(userKey, "userKey"));
		if (!CmmnUtils.isNull(defaultDB)) 	spec = spec.and(CmmnSpecs.eqStringSpec(defaultDB, "defaultDB"));
		if (!CmmnUtils.isNull(userSangho)) 	spec = spec.and(CmmnSpecs.eqStringSpec(userSangho, "userSangho"));
		if (!CmmnUtils.isNull(userSaup)) 	spec = spec.and(CmmnSpecs.eqStringSpec(userSaup, "userSaup"));

		return spec;
	}

	public List<Map> addSysMenuList(Map args) throws Exception{
		return sqlSession.getMapper(UserMenuAuthMapper.class).addSysMenuList(CmmnUtils.replaceMapSc(args));
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
	public List<CpsUserMenuVO> insertUserMenuList(List<CpsUserMenuVO> voList, HttpServletRequest request) throws Exception {
		List<CpsUserMenuVO> validateList = new ArrayList<>();
		String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
		String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
		String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

		// validation
		for (CpsUserMenuVO vo : voList) {
			CpsUserMenuVO validateVO = modelMapper.map(vo, CpsUserMenuVO.class);
			validateVO.setAddUserKey(userId);
			validateVO.setAddDtm(currentDatetime);
			Set<ConstraintViolation<CpsUserMenuVO>> validator = CmmnUtils.isCommonValid(validateVO);
			if (validator.size() > 0) {
				Object[] parameter = validator.toArray();
				throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
			}
			validateList.add(vo);
		}

		List<CpsUserMenuVO> returnVO = cpsUserMenuDao.save(validateList);

		return returnVO;
	}

	public List<CpsUserMenuVO> selectCpsUserMenuList(Map args) {
		BigDecimal userMenuKey = CmmnUtils.isContainsMapValue(args, "userMenuKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("userMenuKey"))) : null;
		String userKey = args.containsKey("userKey") ? String.valueOf(args.get("userKey")) : "";
		String useYn = args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "";

		Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn"));

		if (!CmmnUtils.isNull(userMenuKey)) spec = spec.and(CmmnSpecs.eqNumberSpec(userMenuKey, "userMenuKey"));
		if (!CmmnUtils.isNull(userKey)) spec = spec.and(CmmnSpecs.eqStringSpec(userKey, "userKey"));

		return cpsUserMenuDao.findAll(spec);
	}

	public List<Map> addBasicSysMenuList(Map args) throws Exception{
		return sqlSession.getMapper(UserMenuAuthMapper.class).addBasicSysMenuList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> addTestSysMenuList(Map args) throws Exception{
		return sqlSession.getMapper(UserMenuAuthMapper.class).addTestSysMenuList(CmmnUtils.replaceMapSc(args));
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
	public List<CpsSaveCustomerVO> insertSaveCustomerList(List<CpsSaveCustomerVO> voList, HttpServletRequest request) throws Exception {
		List<CpsSaveCustomerVO> validateList = new ArrayList<>();
		String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
		String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
		String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

		for (CpsSaveCustomerVO vo : voList) {
			CpsSaveCustomerVO validateVO = modelMapper.map(vo, CpsSaveCustomerVO.class);
			validateVO.setAddUserKey(userId);
			validateVO.setAddDtm(currentDatetime);
			Set<ConstraintViolation<CpsSaveCustomerVO>> validator = CmmnUtils.isCommonValid(validateVO);
			if (validator.size() > 0) {
				Object[] parameter = validator.toArray();
				throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
			}
			validateList.add(vo);
		}

		List<CpsSaveCustomerVO> returnVO = cpsSaveCustomerDao.save(validateList);

		return returnVO;
	}

	public List<Map> selectCustomerList(Map args) throws Exception{
		return sqlSession.getMapper(UserMenuAuthMapper.class).selectCustomerList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectCustomer(Map args) throws Exception{
		return sqlSession.getMapper(UserMenuAuthMapper.class).selectCustomer(CmmnUtils.replaceMapSc(args));
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
	public List<CpsSaveTeamVO> insertSaveTeamList(List<CpsSaveTeamVO> voList, HttpServletRequest request) throws Exception {
		List<CpsSaveTeamVO> validateList = new ArrayList<>();
		String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
		String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
		String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

		for (CpsSaveTeamVO vo : voList) {
			CpsSaveTeamVO validateVO = modelMapper.map(vo, CpsSaveTeamVO.class);
			validateVO.setAddUserKey(userId);
			validateVO.setAddDtm(currentDatetime);
			Set<ConstraintViolation<CpsSaveTeamVO>> validator = CmmnUtils.isCommonValid(validateVO);
			if (validator.size() > 0) {
				Object[] parameter = validator.toArray();
				throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
			}
			validateList.add(vo);
		}

		List<CpsSaveTeamVO> returnVO = cpsSaveTeamDao.save(validateList);

		return returnVO;
	}

	public List<CpsSaveTeamVO> selectSaveTeamList(Map args) {
		BigDecimal stKey = CmmnUtils.isContainsMapValue(args, "stKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("stKey"))) : null;
		String userId = args.containsKey("userId") ? String.valueOf(args.get("userId")) : "";
		String useYn  = args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "";

		Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn"));

		if (!CmmnUtils.isNull(stKey)) spec = spec.and(CmmnSpecs.eqNumberSpec(stKey, "stKey"));
		if (!CmmnUtils.isNull(userId)) spec = spec.and(CmmnSpecs.eqStringSpec(userId, "userId"));

		return cpsSaveTeamDao.findAll(spec);
	}

	public List<CpsTeamVO> selectTeamList(Map args) {
		BigDecimal teamKey = CmmnUtils.isContainsMapValue(args, "teamKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("teamKey"))) : null;
		String useYn = args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "";

		Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn"));

		if (!CmmnUtils.isNull(teamKey)) spec = spec.and(CmmnSpecs.eqNumberSpec(teamKey, "teamKey"));

		return cpsTeamDao.findAll(spec);
	}

	public List<Map> selectCustomerAllList(Map args) throws Exception{
		return sqlSession.getMapper(UserMenuAuthMapper.class).selectCustomerAllList(CmmnUtils.replaceMapSc(args));
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
	public List<SysNoticeVO> saveSysNoticeList(List<SysNoticeVO> voList, HttpServletRequest request) throws Exception{
	    List<SysNoticeVO> validateList = new ArrayList<>();
		String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
		String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));

		// validation
		for(SysNoticeVO vo : voList){
			SysNoticeVO validateVO = modelMapper.map(vo, SysNoticeVO.class);
			validateVO.setAddUserId(userId);
			validateVO.setAddUserNm(userNm);
			validateVO.setAddDate(new Date());
			validateVO.setEditUserId(userId);
			validateVO.setEditUserNm(userNm);
			validateVO.setEditDate(new Date());
			Set<ConstraintViolation<SysNoticeVO>> validator = CmmnUtils.isCommonValid(validateVO);
			if (validator.size() > 0) {
				Object[] parameter = validator.toArray();
				throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
			}
			validateList.add(vo);
		}

		List<SysNoticeVO> returnVO = sysNoticeDao.save(voList);
		return returnVO;
	}

	public CpsAttachFileVO saveFile(CpsAttachFileVO cpsAttachFileVO) throws Exception {
		return cpsAttachFileDao.save(cpsAttachFileVO);
	}

	public List<CpsAttachFileVO> selectFileList(Map args) throws Exception{
	    String gubun = args.containsKey("gubun") ? String.valueOf(args.get("gubun")) : "";
		String masterKey = args.containsKey("masterKey") ? String.valueOf(args.get("masterKey")) : "";
		String useYn = args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "";

		Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn"));
		if (!CmmnUtils.isNull(gubun)) 		spec = spec.and(CmmnSpecs.eqStringSpec(gubun, "gubun"));
		if (!CmmnUtils.isNull(masterKey)) 	spec = spec.and(CmmnSpecs.eqStringSpec(masterKey, "masterKey"));
		return cpsAttachFileDao.findAll(spec);
	}

	public List<Map> selectDefaultDBList(Map args) throws Exception{
		return sqlSession.getMapper(UserMenuAuthMapper.class).selectDefaultDBList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectContactList(Map args) throws Exception{
		return sqlSession.getMapper(UserMenuAuthMapper.class).selectContactList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectNtaaList(Map args) throws Exception{
		return sqlSession.getMapper(UserMenuAuthMapper.class).selectNtaaList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectNtaaListSimple(Map args) throws Exception{
		return sqlSession.getMapper(UserMenuAuthMapper.class).selectNtaaListSimple(CmmnUtils.replaceMapSc(args));
	}

	public ENAC100VO saveENAC100(ENAC100VO eNAC100VO) throws Exception {
		return eNAC100Dao.save(eNAC100VO);
	}

	public long insertNTAA100(Map args) throws Exception{
		return sqlSession.getMapper(UserMenuAuthMapper.class).insertNTAA100(CmmnUtils.replaceMapSc(args));
	}

	public long updateNTAA100(Map args) throws Exception{
		return sqlSession.getMapper(UserMenuAuthMapper.class).updateNTAA100(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectMonthlyList(Map args) throws Exception{
		return sqlSession.getMapper(UserMenuAuthMapper.class).selectMonthlyList(CmmnUtils.replaceMapSc(args));
	}

	public long updatePercent(Map args) throws Exception{
		return sqlSession.getMapper(UserMenuAuthMapper.class).updatePercent(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectContactMail(Map args) throws Exception{
		return sqlSession.getMapper(UserMenuAuthMapper.class).selectContactMail(CmmnUtils.replaceMapSc(args));
	}



















//	public List<SysMenuVO> getSysMenuList(Map args, Pageable pageable) throws Exception{
//		Specifications spec = getSysMenuSpecs(args);
//		return sysMenuDao.findAll(spec, pageable);
//	}

  private Specifications getSysMenuSpecs(Map args) {
	BigDecimal menuKey = CmmnUtils.isContainsMapValue(args, "menuKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("menuKey"))) : null;
	String useYn = args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "";

	Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn"));
	if (!CmmnUtils.isNull(menuKey)) spec = spec.and(CmmnSpecs.eqNumberSpec(menuKey, "menuKey"));

	return spec;
  }



  public SysNoticeVO getSysNoticeOne(BigDecimal noticeKey) throws Exception {
	SysNoticeVO sysNoticeVO = new SysNoticeVO();
	sysNoticeVO = sysNoticeDao.getOne(noticeKey);
	sysNoticeVO.setInquiryCount(sysNoticeVO.getInquiryCount() + 1);
	sysNoticeVO = sysNoticeDao.save(sysNoticeVO);

	return sysNoticeVO;
  }






  public List<Map> getUserXAuthXMenuList(String userKey) throws Exception {
	return userMenuAuthDao.findUserXAuthXMenuList(userKey);
  }

  public List<Map> getUserXAuthXMenuList(Map args) throws Exception {
	return sqlSession.getMapper(UserMenuAuthMapper.class).findUserXAuthXMenuList(CmmnUtils.replaceMapSc(args));
  }

  public List<UserMenuAuthVO> getCheckMenuAuth(BigDecimal userKey, String useYn) {
	return userMenuAuthDao.findByUserKeyAndUseYn(userKey, useYn);
  }

  public List<UserMenuAuthVO> getUserMenuAuthList(Map args, Pageable pageable) throws Exception {
	Specifications spec = getUserMenuAuthSpecs(args);
	return userMenuAuthDao.findAll(spec, pageable);
  }

  private Specifications getUserMenuAuthSpecs(Map args) {
	BigDecimal userMenuAuthKey = CmmnUtils.isContainsMapValue(args, "userMenuAuthKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("userMenuAuthKey"))) : null;
	BigDecimal userKey = CmmnUtils.isContainsMapValue(args, "userKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("userKey"))) : null;
	String useYn = args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "";

	Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn"));
	if (!CmmnUtils.isNull(userMenuAuthKey)) spec = spec.and(CmmnSpecs.eqNumberSpec(userMenuAuthKey, "userMenuAuthKey"));
	// 이미 저장된 거 제외(not in)
	if (!CmmnUtils.isNull(userKey)) {
	  List<UserMenuAuthVO> chosungList = userMenuAuthDao.findByUserKey(userInfoDao.getOne(userKey));
	  if (chosungList.size() > 0) {
		List<BigInteger> result = chosungList.stream()
				.map(i -> NumberUtils.createBigInteger(String.valueOf(i.getUserMenuAuthKey())))
				.collect(Collectors.toList());
		spec = spec.and(CmmnSpecs.notInKeyListSpec(result, "userKey"));
	  }
	}

	return spec;
  }

  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public List<UserMenuAuthVO> saveUserMenuAuthList(List<UserMenuAuthVO> voList, HttpServletRequest request) throws Exception {
	List<UserMenuAuthVO> validateList = new ArrayList<>();
	String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
	String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
	String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

	// validation
	for (UserMenuAuthVO vo : voList) {
	  UserMenuAuthVO validateVO = modelMapper.map(vo, UserMenuAuthVO.class);
	  validateVO.setAddUserId(userId);
	  validateVO.setAddUserNm(userNm);
	  validateVO.setEditUserId(userId);
	  validateVO.setEditUserNm(userNm);
	  validateVO.setAddDtm(currentDatetime);
	  Set<ConstraintViolation<UserMenuAuthVO>> validator = CmmnUtils.isCommonValid(validateVO);
	  if (validator.size() > 0) {
		Object[] parameter = validator.toArray();
		throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
	  }
	  validateList.add(vo);
	}

	List<UserMenuAuthVO> returnVO = userMenuAuthDao.save(voList);

	return returnVO;
  }

  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public void callProcDeleteUser(Map args) throws Exception {
	String userId = args.containsKey("userId") ? String.valueOf(args.get("userId")) : null;
	if (CmmnUtils.isNull(userId)) throw new Exception("userId 필수사항 입니다");
	if (CmmnUtils.stringContainsItemFromList(userId, new String[]{"admin", "seinpj"})) throw new Exception(userId + " 은(는) 삭제할 수 없습니다");
	sqlSession.getMapper(UserMenuAuthMapper.class).callProcDeleteUser(CmmnUtils.replaceMapSc(args));
  }

  public SysAttachFileVO saveAttachFile(SysAttachFileVO systemAttachFileVO) throws Exception {
		return sysAttachFileDao.save(systemAttachFileVO);
  }




}