package com.edwards.biz.codeManagement;

import com.edwards.commons.CmmnConstants;
import com.edwards.commons.CmmnSpecs;
import com.edwards.commons.CmmnUtils;
import com.edwards.domains.*;

import org.apache.commons.lang3.math.NumberUtils;
import org.apache.ibatis.session.SqlSession;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specifications;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintViolation;

import java.math.BigDecimal;
import java.util.*;

@Service
public class SooMstCmmnCodeService {
	@Qualifier("SqlSessionTemplate")
	@Autowired
	private SqlSession sqlSession;
	@Autowired
	private SooMstSysCdStdDao sooMstSysCdStdDao;
	@Autowired
	private SooMstSysCodeDao sooMstSysCodeDao;
	@Autowired
	private SooMstCdBasHsDao sooMstCdBasHsDao;
	@Autowired
	private SooMstCdBasBuyerDao sooMstCdBasBuyerDao;
	@Autowired
	private SooMstCdNaegukDao sooMstCdNaegukDao;
	@Autowired
	private SooMstCdTeukmyunDao sooMstCdTeukmyunDao;
	@Autowired
	private SooMstCdHsStdMstDao sooMstCdHsStdMstDao;
	@Autowired
	private SooMstCdHsStdDtlDao sooMstCdHsStdDtlDao;

	@Autowired
	private SooMstCdBasFreRateDao sooMstCdBasFreRateDao;
	@Autowired
	private SooMstCdBasFtaMstDao sooMstCdBasFtaMstDao;
	@Autowired
	private SooMstCdBasFtaDtlDao sooMstCdBasFtaDtlDao;

	@Autowired
	private SooMstCdHsMate1Dao sooMstCdHsMate1Dao;
	@Autowired
	private SooMstCdHsMate2Dao sooMstCdHsMate2Dao;

	@Autowired
	private SooMstItemMasterNotYogDao sooMstItemMasterNotYogDao;
	@Autowired
	private SooMstCdBLawCstmChkDao sooMstCdBLawCstmChkDao;

	@Autowired
	private SooMstCdBasMbkCountryDao sooMstCdBasMbkCountryDao;
	@Autowired
	private SooMstCdBasTransDao sooMstCdBasTransDao;
	@Autowired
	private SooMstCdCstReDealDao sooMstCdCstReDealDao;
	@Autowired
	private SooMstCdCstReDealAttachFileDao sooMstCdCstReDealAttachFileDao;

	@Autowired
	private SooMstCdHsMstDao sooMstCdHsMstDao;
	@Autowired
	private SooMstCdHsRateDao sooMstCdHsRateDao;

	@Autowired
	private MessageSource messageSource;
	@Autowired
	private ModelMapper modelMapper;

	public Page<SooMst_CdHsMstVO> selectSooMstCdHsMstList(Map args, Pageable pageable) throws Exception{
		Specifications spec = getSooMstCdHsMstSpecs(args);
		return sooMstCdHsMstDao.findAll(spec, pageable);
	}

	private Specifications getSooMstCdHsMstSpecs(Map args){
		BigDecimal keyTbrCdHsMst = CmmnUtils.isContainsMapValue(args, "keyTbrCdHsMst") ? NumberUtils.createBigDecimal(String.valueOf(args.get("keyTbrCdHsMst"))) : null;
		String hs1 = args.containsKey("hs1") ? String.valueOf(args.get("hs1")) : null;
		String hs2 = args.containsKey("hs2") ? String.valueOf(args.get("hs2")) : null;
		String hs3 = args.containsKey("hs3") ? String.valueOf(args.get("hs3")) : null;
		String hs4 = args.containsKey("hs4") ? String.valueOf(args.get("hs4")) : null;
		String useYn = args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "";

		Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn"));
		if (!CmmnUtils.isNull(keyTbrCdHsMst)) spec = spec.and(CmmnSpecs.eqNumberSpec(keyTbrCdHsMst, "keyTbrCdHsMst"));
		if (!CmmnUtils.isNull(hs1)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(hs1, "hs1"));
		if (!CmmnUtils.isNull(hs2)) spec = spec.and(CmmnSpecs.eqStringSpec(hs2, "hs2"));
		if (!CmmnUtils.isNull(hs3)) spec = spec.and(CmmnSpecs.eqStringSpec(hs3, "hs3"));
		if (!CmmnUtils.isNull(hs4)) spec = spec.and(CmmnSpecs.eqStringSpec(hs4, "hs4"));

		return spec;
	}

	public List<SooMst_CdHsMate1VO> selectCdHsMate1List(Map args) throws Exception{
		BigDecimal keycdhsmate1 = CmmnUtils.isContainsMapValue(args, "keycdhsmate1") ? NumberUtils.createBigDecimal(String.valueOf(args.get("keycdhsmate1"))) : null;
		String imextpcd = args.containsKey("imextpcd") ? String.valueOf(args.get("imextpcd")) : null;
		String hscode = args.containsKey("hscode") ? String.valueOf(args.get("hscode")) : null;
		String hshannm = args.containsKey("hshannm") ? String.valueOf(args.get("hshannm")) : null;
		String useYn = args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "Y";

		//검색조건(필수:useYn)
		Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn"));
		//검색조건
		if (!CmmnUtils.isNull(keycdhsmate1)) spec = spec.and(CmmnSpecs.eqNumberSpec(keycdhsmate1, "keycdhsmate1"));
		if (!CmmnUtils.isNull(imextpcd)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(imextpcd, "imextpcd"));
		if (!CmmnUtils.isNull(hscode)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(hscode, "hscode"));
		if (!CmmnUtils.isNull(hshannm)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(hshannm, "hshannm"));
		Sort orders = new Sort(Sort.Direction.DESC, "useYn").and(new Sort(Sort.Direction.ASC, "keycdhsmate1"));

		return sooMstCdHsMate1Dao.findAll(spec, orders);
	}

	public List<SooMst_CdHsMate2VO> selectCdHsMate2List(Map args) throws Exception{
		BigDecimal keycdhsmate2 = CmmnUtils.isContainsMapValue(args, "keycdhsmate2") ? NumberUtils.createBigDecimal(String.valueOf(args.get("keycdhsmate2"))) : null;
		String imextpcd = args.containsKey("imextpcd") ? String.valueOf(args.get("imextpcd")) : null;
		String hscode = args.containsKey("hscode") ? String.valueOf(args.get("hscode")) : null;
		String hshannm = args.containsKey("hshannm") ? String.valueOf(args.get("hshannm")) : null;
		String useYn = args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "Y";

		//검색조건(필수:useYn)
		Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn"));
		//검색조건
		if (!CmmnUtils.isNull(keycdhsmate2)) spec = spec.and(CmmnSpecs.eqNumberSpec(keycdhsmate2, "keycdhsmate2"));
		if (!CmmnUtils.isNull(imextpcd)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(imextpcd, "imextpcd"));
		if (!CmmnUtils.isNull(hscode)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(hscode, "hscode"));
		if (!CmmnUtils.isNull(hshannm)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(hshannm, "hshannm"));
		Sort orders = new Sort(Sort.Direction.DESC, "useYn").and(new Sort(Sort.Direction.ASC, "keycdhsmate2"));

		return sooMstCdHsMate2Dao.findAll(spec, orders);
	}

	public List<Map> selectSooMstCdHsRateWithTrrtTpcdList(Map args) throws Exception {
		return sqlSession.getMapper(SooMstCmmnCodeMapper.class).selectSooMstCdHsRateWithTrrtTpcdList(CmmnUtils.replaceMapSc(args));
	}

	public List<SooMst_SysCodeVO> selectSysCodeList(Map args) throws Exception {
		BigDecimal keySysCode = CmmnUtils.isContainsMapValue(args, "keySysCode") ? NumberUtils.createBigDecimal(String.valueOf(args.get("keySysCode"))) : null;
		String mcd 		= args.containsKey("mcd") ? String.valueOf(args.get("mcd")) : null;
		String cd 		= args.containsKey("cd") ? String.valueOf(args.get("cd")) : null;
		String cdAbb 	= args.containsKey("cdAbb") ? String.valueOf(args.get("cdAbb")) : null;
		String useYn 	= args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "Y";

		Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn"));

		//검색조건
		if (!CmmnUtils.isNull(keySysCode)) 	spec = spec.and(CmmnSpecs.eqNumberSpec(keySysCode, "keySysCode"));
		if (!CmmnUtils.isNull(mcd)) 		spec = spec.and(CmmnSpecs.afterLikeStringSpec(mcd, "mcd"));
		if (!CmmnUtils.isNull(cd)) 			spec = spec.and(CmmnSpecs.eqStringSpec(cd, "cd"));
		if (!CmmnUtils.isNull(cdAbb)) 		spec = spec.and(CmmnSpecs.eqStringSpec(cdAbb, "cdAbb"));

		Sort orders = new Sort(Sort.Direction.DESC, "useYn").and(new Sort(Sort.Direction.ASC, "keySysCode"));

		return sooMstSysCodeDao.findAll(spec, orders);
	}

















  /**
   * Save sys code list list.
   *
   * @param sysCodeVOList the sys code vo list
   * @param request       the request
   * @return the list
   * @throws Exception the exception
   */
  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public List<SooMst_SysCodeVO> saveSysCodeList(List<SooMst_SysCodeVO> sysCodeVOList, HttpServletRequest request) throws Exception {
	List<SooMst_SysCodeVO> validateList = new ArrayList<>();
	String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
	String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
	String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

	// validation
	for (SooMst_SysCodeVO vo : sysCodeVOList) {
	  SooMst_SysCodeVO validateVO = modelMapper.map(vo, SooMst_SysCodeVO.class);
	  validateVO.setAddUserId(userId);
	  validateVO.setAddUserNm(userNm);
	  validateVO.setEditUserId(userId);
	  validateVO.setEditUserNm(userNm);
	  validateVO.setAddDtm(currentDatetime);
	  Set<ConstraintViolation<SooMst_SysCodeVO>> validator = CmmnUtils.isCommonValid(validateVO);
	  if (validator.size() > 0) {
		Object[] parameter = validator.toArray();
		throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
	  }
	  validateList.add(vo);
	}

	List<SooMst_SysCodeVO> returnList = sooMstSysCodeDao.save(sysCodeVOList);

	return returnList;
  }

  /**
   * Gets sys cd std list.
   *
   * @param args the args
   * @return the sys cd std list
   * @throws Exception the exception
   */
  public List<SooMst_SysCdStdVO> getSysCdStdList(Map args) throws Exception {
	BigDecimal keyCdStd = CmmnUtils.isContainsMapValue(args, "keyCdStd") ? NumberUtils.createBigDecimal(String.valueOf(args.get("keyCdStd"))) : null;
	String mcd = args.containsKey("mcd") ? String.valueOf(args.get("mcd")) : null;
	String useYn = args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "Y";
	// TODO: 2016-11-04 검색조건 추가해야함(요청시)
	//검색조건(필수:useYn)
	Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn"));

	//검색조건
	if (!CmmnUtils.isNull(keyCdStd)) spec = spec.and(CmmnSpecs.eqNumberSpec(keyCdStd, "keyCdStd"));
	if (!CmmnUtils.isNull(mcd)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(mcd, "mcd"));

	Sort orders = new Sort(Sort.Direction.DESC, "useYn").and(new Sort(Sort.Direction.ASC, "keyCdStd"));

	return sooMstSysCdStdDao.findAll(spec, orders);
  }

  /**
   * Save sys cd std soo mst sys cd std vo.
   *
   * @param sysCdStdVO the sys cd std vo
   * @param request    the request
   * @return the soo mst sys cd std vo
   * @throws Exception the exception
   */
  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public SooMst_SysCdStdVO saveSysCdStd(SooMst_SysCdStdVO sysCdStdVO, HttpServletRequest request) throws Exception {
	String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
	String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
	String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

	// validation
	SooMst_SysCdStdVO validateVO = modelMapper.map(sysCdStdVO, SooMst_SysCdStdVO.class);
	validateVO.setAddUserId(userId);
	validateVO.setAddUserNm(userNm);
	validateVO.setEditUserId(userId);
	validateVO.setEditUserNm(userNm);
	validateVO.setAddDtm(currentDatetime);
	Set<ConstraintViolation<SooMst_SysCdStdVO>> validator = CmmnUtils.isCommonValid(validateVO);
	if (validator.size() > 0) {
	  Object[] parameter = validator.toArray();
	  throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
	}

	SooMst_SysCdStdVO returnVO = sooMstSysCdStdDao.save(sysCdStdVO);

	return returnVO;
  }

  /**
   * Gets cd bas hs list.
   *
   * @param args the args
   * @return the cd bas hs list
   * @throws Exception the exception
   */
  public List<SooMst_CdBasHsVO> getCdBasHsList(Map args) throws Exception {
	BigDecimal keyCdBasHs = CmmnUtils.isContainsMapValue(args, "keyCdBasHs") ? NumberUtils.createBigDecimal(String.valueOf(args.get("keyCdBasHs"))) : null;
	String hsbuhoCode = args.containsKey("hsbuhoCode") ? String.valueOf(args.get("hsbuhoCode")) : null;
	String hsbuhoGwanseGbn = args.containsKey("hsbuhoGwanseGbn") ? String.valueOf(args.get("hsbuhoGwanseGbn")) : null;
	String hsbuhoPopum = args.containsKey("hsbuhoPopum") ? String.valueOf(args.get("hsbuhoPopum")) : null;
	String hsbuhoGuraepum = args.containsKey("hsbuhoGuraepum") ? String.valueOf(args.get("hsbuhoGuraepum")) : null;
	String useYn = args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "Y";

	//검색조건(필수:useYn)
	Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn"));
	//검색조건
	if (!CmmnUtils.isNull(keyCdBasHs)) spec = spec.and(CmmnSpecs.eqNumberSpec(keyCdBasHs, "keyCdBasHs"));
	if (!CmmnUtils.isNull(hsbuhoCode)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(hsbuhoCode, "hsbuhoCode"));
	if (!CmmnUtils.isNull(hsbuhoGwanseGbn)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(hsbuhoGwanseGbn, "hsbuhoGwanseGbn"));
	if (!CmmnUtils.isNull(hsbuhoPopum)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(hsbuhoPopum, "hsbuhoPopum"));
	if (!CmmnUtils.isNull(hsbuhoGuraepum)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(hsbuhoGuraepum, "hsbuhoGuraepum"));

	Sort orders = new Sort(Sort.Direction.DESC, "useYn").and(new Sort(Sort.Direction.ASC, "keyCdBasHs"));

	return sooMstCdBasHsDao.findAll(spec, orders);
  }

  /**
   * Save cd bas hs list list.
   *
   * @param cdBasHsVOList the cd bas hs vo list
   * @param request       the request
   * @return the list
   * @throws Exception the exception
   */
  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public List<SooMst_CdBasHsVO> saveCdBasHsList(List<SooMst_CdBasHsVO> cdBasHsVOList, HttpServletRequest request) throws Exception {
	String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
	String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
	List<SooMst_CdBasHsVO> validateList = new ArrayList<>();

	// validation
	for (SooMst_CdBasHsVO vo : cdBasHsVOList) {
	  SooMst_CdBasHsVO validateVO = modelMapper.map(vo, SooMst_CdBasHsVO.class);
	  validateVO.setAddUserId(userId);
	  validateVO.setAddUserNm(userNm);
	  validateVO.setEditUserId(userId);
	  validateVO.setEditUserNm(userNm);
	  validateVO.setAddDtm(CmmnUtils.getFormatedDate("yyyyMMddHHmmss"));
	  Set<ConstraintViolation<SooMst_CdBasHsVO>> validator = CmmnUtils.isCommonValid(validateVO);
	  if (validator.size() > 0) {
		Object[] parameter = validator.toArray();
		throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
	  }
	  validateList.add(vo);
	}

	List<SooMst_CdBasHsVO> returnList = sooMstCdBasHsDao.save(cdBasHsVOList);

	return returnList;
  }

  /**
   * Gets cd bas buyer list.
   *
   * @param args the args
   * @return the cd bas buyer list
   * @throws Exception the exception
   */
  public List<SooMst_CdBasBuyerVO> getCdBasBuyerList(Map args) throws Exception {
	BigDecimal keyCdBasBuyer = CmmnUtils.isContainsMapValue(args, "keyCdBasBuyer") ? NumberUtils.createBigDecimal(String.valueOf(args.get("keyCdBasBuyer"))) : null;
	String gonggubCode = args.containsKey("gonggubCode") ? String.valueOf(args.get("gonggubCode")) : null;
	String gonggubSangho = args.containsKey("gonggubSangho") ? String.valueOf(args.get("gonggubSangho")) : null;
	String useYn = args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "Y";

	//검색조건(필수:useYn)
	Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn"));
	//검색조건
	if (!CmmnUtils.isNull(keyCdBasBuyer)) spec = spec.and(CmmnSpecs.eqNumberSpec(keyCdBasBuyer, "keyCdBasBuyer"));
	if (!CmmnUtils.isNull(gonggubCode)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(gonggubCode, "gonggubCode"));
	if (!CmmnUtils.isNull(gonggubSangho)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(gonggubSangho, "gonggubSangho"));

	Sort orders = new Sort(Sort.Direction.DESC, "useYn").and(new Sort(Sort.Direction.ASC, "keyCdBasBuyer"));

	return sooMstCdBasBuyerDao.findAll(spec, orders);
  }

  /**
   * Save cd bas buyer list list.
   *
   * @param cdBasBuyerVOList the cd bas buyer vo list
   * @param request          the request
   * @return the list
   * @throws Exception the exception
   */
  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public List<SooMst_CdBasBuyerVO> saveCdBasBuyerList(List<SooMst_CdBasBuyerVO> cdBasBuyerVOList, HttpServletRequest request) throws Exception {
	String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
	String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
	List<SooMst_CdBasBuyerVO> validateList = new ArrayList<>();

	// validation
	for (SooMst_CdBasBuyerVO vo : cdBasBuyerVOList) {
	  SooMst_CdBasBuyerVO validateVO = modelMapper.map(vo, SooMst_CdBasBuyerVO.class);
	  validateVO.setAddUserId(userId);
	  validateVO.setAddUserNm(userNm);
	  validateVO.setEditUserId(userId);
	  validateVO.setEditUserNm(userNm);
	  Set<ConstraintViolation<SooMst_CdBasBuyerVO>> validator = CmmnUtils.isCommonValid(validateVO);
	  if (validator.size() > 0) {
		Object[] parameter = validator.toArray();
		throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
	  }
	  validateList.add(vo);
	}

	List<SooMst_CdBasBuyerVO> returnList = sooMstCdBasBuyerDao.save(cdBasBuyerVOList);

	return returnList;
  }

  /**
   * Gets cd naeguk list.
   *
   * @param args the args
   * @return the cd naeguk list
   * @throws Exception the exception
   */
  public List<SooMst_CdNaegukVO> getCdNaegukList(Map args) throws Exception {
	BigDecimal keyCdNaeguk = CmmnUtils.isContainsMapValue(args, "keyCdNaeguk") ? NumberUtils.createBigDecimal(String.valueOf(args.get("keyCdNaeguk"))) : null;
	String negukCode = args.containsKey("negukCode") ? String.valueOf(args.get("negukCode")) : null;
	String negukGbnCode = args.containsKey("negukGbnCode") ? String.valueOf(args.get("negukGbnCode")) : null;
	String negukHangmok = args.containsKey("negukHangmok") ? String.valueOf(args.get("negukHangmok")) : null;
	String useYn = args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "Y";

	//검색조건(필수:useYn)
	Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn"));
	//검색조건
	if (!CmmnUtils.isNull(keyCdNaeguk)) spec = spec.and(CmmnSpecs.eqNumberSpec(keyCdNaeguk, "keyCdNaeguk"));
	if (!CmmnUtils.isNull(negukCode)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(negukCode, "negukCode"));
	if (!CmmnUtils.isNull(negukGbnCode)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(negukGbnCode, "negukGbnCode"));
	if (!CmmnUtils.isNull(negukHangmok)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(negukHangmok, "negukHangmok"));

	Sort orders = new Sort(Sort.Direction.DESC, "useYn").and(new Sort(Sort.Direction.ASC, "keyCdNaeguk"));

	return sooMstCdNaegukDao.findAll(spec, orders);
  }

  /**
   * Save cd naeguk list list.
   *
   * @param cdNaegukVOList the cd naeguk vo list
   * @param request        the request
   * @return the list
   * @throws Exception the exception
   */
  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public List<SooMst_CdNaegukVO> saveCdNaegukList(List<SooMst_CdNaegukVO> cdNaegukVOList, HttpServletRequest request) throws Exception {
	String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
	String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
	List<SooMst_CdNaegukVO> validateList = new ArrayList<>();

	// validation
	for (SooMst_CdNaegukVO vo : cdNaegukVOList) {
	  SooMst_CdNaegukVO validateVO = modelMapper.map(vo, SooMst_CdNaegukVO.class);
	  validateVO.setAddUserId(userId);
	  validateVO.setAddUserNm(userNm);
	  validateVO.setEditUserId(userId);
	  validateVO.setEditUserNm(userNm);
	  validateVO.setAddDtm(CmmnUtils.getFormatedDate("yyyyMMddHHmmss"));
	  Set<ConstraintViolation<SooMst_CdNaegukVO>> validator = CmmnUtils.isCommonValid(validateVO);
	  if (validator.size() > 0) {
		Object[] parameter = validator.toArray();
		throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
	  }
	  validateList.add(vo);
	}

	List<SooMst_CdNaegukVO> returnList = sooMstCdNaegukDao.save(cdNaegukVOList);

	return returnList;
  }

  /**
   * Gets cd teukmyun list.
   *
   * @param args the args
   * @return the cd teukmyun list
   * @throws Exception the exception
   */
  public List<SooMst_CdTeukmyunVO> getCdTeukmyunList(Map args) throws Exception {
	BigDecimal keyCdTeukmyun = CmmnUtils.isContainsMapValue(args, "keyCdTeukmyun") ? NumberUtils.createBigDecimal(String.valueOf(args.get("keyCdTeukmyun"))) : null;
	String teukmyunCode = args.containsKey("teukmyunCode") ? String.valueOf(args.get("teukmyunCode")) : null;
	String teukmyunContent = args.containsKey("teukmyunContent") ? String.valueOf(args.get("teukmyunContent")) : null;
	String useYn = args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "Y";

	//검색조건(필수:useYn)
	Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn"));
	//검색조건
	if (!CmmnUtils.isNull(keyCdTeukmyun)) spec = spec.and(CmmnSpecs.eqNumberSpec(keyCdTeukmyun, "keyCdTeukmyun"));
	if (!CmmnUtils.isNull(teukmyunCode)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(teukmyunCode, "teukmyunCode"));
	if (!CmmnUtils.isNull(teukmyunContent)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(teukmyunContent, "teukmyunContent"));

	Sort orders = new Sort(Sort.Direction.DESC, "useYn").and(new Sort(Sort.Direction.ASC, "keyCdTeukmyun"));

	return sooMstCdTeukmyunDao.findAll(spec, orders);
  }

  /**
   * Save cd teukmyun list list.
   *
   * @param cdTeukmyunVOList the cd teukmyun vo list
   * @param request          the request
   * @return the list
   * @throws Exception the exception
   */
  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public List<SooMst_CdTeukmyunVO> saveCdTeukmyunList(List<SooMst_CdTeukmyunVO> cdTeukmyunVOList, HttpServletRequest request) throws Exception {
	String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
	String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
	List<SooMst_CdTeukmyunVO> validateList = new ArrayList<>();

	// validation
	for (SooMst_CdTeukmyunVO vo : cdTeukmyunVOList) {
	  SooMst_CdTeukmyunVO validateVO = modelMapper.map(vo, SooMst_CdTeukmyunVO.class);
	  validateVO.setAddUserId(userId);
	  validateVO.setAddUserNm(userNm);
	  validateVO.setEditUserId(userId);
	  validateVO.setEditUserNm(userNm);
	  validateVO.setAddDtm(CmmnUtils.getFormatedDate("yyyyMMddHHmmss"));
	  Set<ConstraintViolation<SooMst_CdTeukmyunVO>> validator = CmmnUtils.isCommonValid(validateVO);
	  if (validator.size() > 0) {
		Object[] parameter = validator.toArray();
		throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
	  }
	  validateList.add(vo);
	}

	List<SooMst_CdTeukmyunVO> returnList = sooMstCdTeukmyunDao.save(cdTeukmyunVOList);

	return returnList;
  }

  /**
   * Gets cd hs std mst list.
   *
   * @param args the args
   * @return the cd hs std mst list
   * @throws Exception the exception
   */
  public List<SooMst_CdHsStdMstVO> getCdHsStdMstList(Map args) throws Exception {
	BigDecimal keyCdHsstdmst = CmmnUtils.isContainsMapValue(args, "keyCdHsstdmst") ? NumberUtils.createBigDecimal(String.valueOf(args.get("keyCdHsstdmst"))) : null;
	String hs = args.containsKey("hs") ? String.valueOf(args.get("hs")) : null;
	String hscd = args.containsKey("hscd") ? String.valueOf(args.get("hscd")) : null;
	String hslevel = args.containsKey("hslevel") ? String.valueOf(args.get("hslevel")) : null;
	String stdnm = args.containsKey("stdnm") ? String.valueOf(args.get("stdnm")) : null;
	String stdnmhan = args.containsKey("stdnmhan") ? String.valueOf(args.get("stdnmhan")) : null;
	String stdnmeng = args.containsKey("stdnmeng") ? String.valueOf(args.get("stdnmeng")) : null;
	String ftayn = args.containsKey("hslevel") ? String.valueOf(args.get("ftayn")) : null;
	String hschk = args.containsKey("hschk") ? String.valueOf(args.get("hschk")) : null;
	String stday = args.containsKey("stday") ? String.valueOf(args.get("stday")) : null;
	String endday = args.containsKey("endday") ? String.valueOf(args.get("endday")) : null;
	String useYn = args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "Y";

	//검색조건(필수:useYn)
	Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn"));
	//검색조건
	if (!CmmnUtils.isNull(keyCdHsstdmst)) spec = spec.and(CmmnSpecs.eqNumberSpec(keyCdHsstdmst, "keyCdHsstdmst"));
	if (!CmmnUtils.isNull(hs)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(hs, "hs"));
	if (!CmmnUtils.isNull(hscd)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(hscd, "hscd"));
	if (!CmmnUtils.isNull(hslevel)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(hslevel, "hslevel"));
	if (!CmmnUtils.isNull(stdnm)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(stdnm, "stdnm"));
	if (!CmmnUtils.isNull(stdnmhan)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(stdnmhan, "stdnmhan"));
	if (!CmmnUtils.isNull(stdnmeng)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(stdnmeng, "stdnmeng"));
	if (!CmmnUtils.isNull(ftayn)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(ftayn, "ftayn"));
	if (!CmmnUtils.isNull(hschk)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(hschk, "hschk"));
	if (!CmmnUtils.isNull(stday)) spec = spec.and(CmmnSpecs.geStringSpec(stday, "stday"));
	if (!CmmnUtils.isNull(endday)) spec = spec.and(CmmnSpecs.geStringSpec(endday, "endday"));

	Sort orders = new Sort(Sort.Direction.DESC, "useYn").and(new Sort(Sort.Direction.ASC, "keyCdHsstdmst"));

	return sooMstCdHsStdMstDao.findAll(spec, orders);
  }

  /**
   * Save cd hs std mst list list.
   *
   * @param cdHsStdMstVOList the cd hs std mst vo list
   * @param request          the request
   * @return the list
   * @throws Exception the exception
   */
  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public List<SooMst_CdHsStdMstVO> saveCdHsStdMstList(List<SooMst_CdHsStdMstVO> cdHsStdMstVOList, HttpServletRequest request) throws Exception {
	String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
	String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
	List<SooMst_CdHsStdMstVO> validateList = new ArrayList<>();

	// validation
	for (SooMst_CdHsStdMstVO vo : cdHsStdMstVOList) {
	  SooMst_CdHsStdMstVO validateVO = modelMapper.map(vo, SooMst_CdHsStdMstVO.class);
	  validateVO.setAddUserId(userId);
	  validateVO.setAddUserNm(userNm);
	  validateVO.setEditUserId(userId);
	  validateVO.setEditUserNm(userNm);
	  validateVO.setAddDtm(CmmnUtils.getFormatedDate("yyyyMMddHHmmss"));
	  Set<ConstraintViolation<SooMst_CdHsStdMstVO>> validator = CmmnUtils.isCommonValid(validateVO);
	  if (validator.size() > 0) {
		Object[] parameter = validator.toArray();
		throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
	  }
	  validateList.add(vo);
	}

	List<SooMst_CdHsStdMstVO> returnList = sooMstCdHsStdMstDao.save(cdHsStdMstVOList);

	return returnList;
  }

  /**
   * Gets cd hs std dtl list.
   *
   * @param args the args
   * @return the cd hs std dtl list
   * @throws Exception the exception
   */
  public List<SooMst_CdHsStdDtlVO> getCdHsStdDtlList(Map args) throws Exception {
	BigDecimal keyCdHsstddtl = CmmnUtils.isContainsMapValue(args, "keyCdHsstddtl") ? NumberUtils.createBigDecimal(String.valueOf(args.get("keyCdHsstddtl"))) : null;
	String hs = args.containsKey("hs") ? String.valueOf(args.get("hs")) : null;
	String hscd = args.containsKey("hscd") ? String.valueOf(args.get("hscd")) : null;
	String hslevel = args.containsKey("hslevel") ? String.valueOf(args.get("hslevel")) : null;
	String hsno = args.containsKey("hsno") ? String.valueOf(args.get("hsno")) : null;
	String itemgbn = args.containsKey("itemgbn") ? String.valueOf(args.get("itemgbn")) : null;
	String stdnm = args.containsKey("stdnm") ? String.valueOf(args.get("stdnm")) : null;
	String stdnmhan = args.containsKey("stdnmhan") ? String.valueOf(args.get("stdnmhan")) : null;
	String stdnmeng = args.containsKey("stdnmeng") ? String.valueOf(args.get("stdnmeng")) : null;
	String hsdivi = args.containsKey("hsdivi") ? String.valueOf(args.get("hsdivi")) : null;
	String itemnm = args.containsKey("itemnm") ? String.valueOf(args.get("itemnm")) : null;
	String itemgbnnm = args.containsKey("itemgbnnm") ? String.valueOf(args.get("itemgbnnm")) : null;
	String useYn = args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "Y";

	//검색조건(필수:useYn)
	Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn"));
	//검색조건
	if (!CmmnUtils.isNull(keyCdHsstddtl)) spec = spec.and(CmmnSpecs.eqNumberSpec(keyCdHsstddtl, "keyCdHsstddtl"));
	if (!CmmnUtils.isNull(hs)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(hs, "hs"));
	if (!CmmnUtils.isNull(hscd)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(hscd, "hscd"));
	if (!CmmnUtils.isNull(hslevel)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(hslevel, "hslevel"));
	if (!CmmnUtils.isNull(hsno)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(hsno, "hsno"));
	if (!CmmnUtils.isNull(itemgbn)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(itemgbn, "itemgbn"));
	if (!CmmnUtils.isNull(stdnm)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(stdnm, "stdnm"));
	if (!CmmnUtils.isNull(stdnmhan)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(stdnmhan, "stdnmhan"));
	if (!CmmnUtils.isNull(stdnmeng)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(stdnmeng, "stdnmeng"));
	if (!CmmnUtils.isNull(hsdivi)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(hsdivi, "hsdivi"));
	if (!CmmnUtils.isNull(itemnm)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(itemnm, "itemnm"));
	if (!CmmnUtils.isNull(itemgbnnm)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(itemgbnnm, "itemgbnnm"));

	Sort orders = new Sort(Sort.Direction.DESC, "useYn").and(new Sort(Sort.Direction.ASC, "keyCdHsstddtl"));

	return sooMstCdHsStdDtlDao.findAll(spec, orders);
  }

  /**
   * Save cd hs std dtl list list.
   *
   * @param cdHsStdDtlVOList the cd hs std dtl vo list
   * @param request          the request
   * @return the list
   * @throws Exception the exception
   */
  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public List<SooMst_CdHsStdDtlVO> saveCdHsStdDtlList(List<SooMst_CdHsStdDtlVO> cdHsStdDtlVOList, HttpServletRequest request) throws Exception {
	String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
	String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
	List<SooMst_CdHsStdDtlVO> validateList = new ArrayList<>();

	// validation
	for (SooMst_CdHsStdDtlVO vo : cdHsStdDtlVOList) {
	  SooMst_CdHsStdDtlVO validateVO = modelMapper.map(vo, SooMst_CdHsStdDtlVO.class);
	  validateVO.setAddUserId(userId);
	  validateVO.setAddUserNm(userNm);
	  validateVO.setEditUserId(userId);
	  validateVO.setEditUserNm(userNm);
	  validateVO.setAddDtm(CmmnUtils.getFormatedDate("yyyyMMddHHmmss"));
	  Set<ConstraintViolation<SooMst_CdHsStdDtlVO>> validator = CmmnUtils.isCommonValid(validateVO);
	  if (validator.size() > 0) {
		Object[] parameter = validator.toArray();
		throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
	  }
	  validateList.add(vo);
	}

	List<SooMst_CdHsStdDtlVO> returnList = sooMstCdHsStdDtlDao.save(cdHsStdDtlVOList);

	return returnList;
  }


  /**
   * Gets cd bas fre rate list.
   *
   * @param args the args
   * @return the cd bas fre rate list
   * @throws Exception the exception
   */
// TODO: 2016-11-14
  public List<SooMst_CdBasFrerateVO> getCdBasFreRateList(Map args) throws Exception {
	BigDecimal keyCdBasFrerate = CmmnUtils.isContainsMapValue(args, "keyCdBasFrerate") ? NumberUtils.createBigDecimal(String.valueOf(args.get("keyCdBasFrerate"))) : null;
	String cdKey = args.containsKey("cdKey") ? String.valueOf(args.get("cdKey")) : null;
	String fregbn = args.containsKey("fregbn") ? String.valueOf(args.get("fregbn")) : null;
	String useYn = args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "Y";

	//검색조건(필수:useYn)
	Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn"));
	//검색조건
	if (!CmmnUtils.isNull(keyCdBasFrerate)) spec = spec.and(CmmnSpecs.eqNumberSpec(keyCdBasFrerate, "keyCdBasFrerate"));
	if (!CmmnUtils.isNull(cdKey)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(cdKey, "cdKey"));
	if (!CmmnUtils.isNull(fregbn)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(fregbn, "fregbn"));

	Sort orders = new Sort(Sort.Direction.DESC, "useYn").and(new Sort(Sort.Direction.ASC, "keyCdBasFrerate"));

	return sooMstCdBasFreRateDao.findAll(spec, orders);
  }

  /**
   * Save cd bas fre rate list list.
   *
   * @param cdBasFrerateVOList the cd bas frerate vo list
   * @param request            the request
   * @return the list
   * @throws Exception the exception
   */
  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public List<SooMst_CdBasFrerateVO> saveCdBasFreRateList(List<SooMst_CdBasFrerateVO> cdBasFrerateVOList, HttpServletRequest request) throws Exception {
	String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
	String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
	List<SooMst_CdBasFrerateVO> validateList = new ArrayList<>();

	// validation
	for (SooMst_CdBasFrerateVO vo : cdBasFrerateVOList) {
	  SooMst_CdBasFrerateVO validateVO = modelMapper.map(vo, SooMst_CdBasFrerateVO.class);
	  validateVO.setAddUserId(userId);
	  validateVO.setAddUserNm(userNm);
	  validateVO.setEditUserId(userId);
	  validateVO.setEditUserNm(userNm);
	  validateVO.setAddDtm(CmmnUtils.getFormatedDate("yyyyMMddHHmmss"));
	  Set<ConstraintViolation<SooMst_CdBasFrerateVO>> validator = CmmnUtils.isCommonValid(validateVO);
	  if (validator.size() > 0) {
		Object[] parameter = validator.toArray();
		throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
	  }
	  validateList.add(vo);
	}

	List<SooMst_CdBasFrerateVO> returnList = sooMstCdBasFreRateDao.save(cdBasFrerateVOList);

	return returnList;
  }

  /**
   * Gets cd bas fta mst list.
   *
   * @param args the args
   * @return the cd bas fta mst list
   * @throws Exception the exception
   */
  public List<SooMst_CdBasFtamstVO> getCdBasFtaMstList(Map args) throws Exception {
	BigDecimal keyCdBasFtamst = CmmnUtils.isContainsMapValue(args, "keyCdBasFtamst") ? NumberUtils.createBigDecimal(String.valueOf(args.get("keyCdBasFtamst"))) : null;
	String ftacode = args.containsKey("ftacode") ? String.valueOf(args.get("ftacode")) : null;
	String ftanmhan = args.containsKey("ftanmhan") ? String.valueOf(args.get("ftanmhan")) : null;
	String ftanmeng = args.containsKey("ftanmeng") ? String.valueOf(args.get("ftanmeng")) : null;
	String ftadt = args.containsKey("ftadt") ? String.valueOf(args.get("ftadt")) : null;
	String useYn = args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "Y";

	//검색조건(필수:useYn)
	Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn"));
	//검색조건
	if (!CmmnUtils.isNull(keyCdBasFtamst)) spec = spec.and(CmmnSpecs.eqNumberSpec(keyCdBasFtamst, "keyCdBasFtamst"));
	if (!CmmnUtils.isNull(ftacode)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(ftacode, "ftacode"));
	if (!CmmnUtils.isNull(ftanmhan)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(ftanmhan, "ftanmhan"));
	if (!CmmnUtils.isNull(ftanmeng)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(ftanmeng, "ftanmeng"));
	if (!CmmnUtils.isNull(ftadt)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(ftadt, "ftadt"));

	Sort orders = new Sort(Sort.Direction.DESC, "useYn").and(new Sort(Sort.Direction.ASC, "keyCdBasFtamst"));

	return sooMstCdBasFtaMstDao.findAll(spec, orders);
  }

  /**
   * Save cd bas fta mst list list.
   *
   * @param cdBasFtamstVOList the cd bas ftamst vo list
   * @param request           the request
   * @return the list
   * @throws Exception the exception
   */
  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public List<SooMst_CdBasFtamstVO> saveCdBasFtaMstList(List<SooMst_CdBasFtamstVO> cdBasFtamstVOList, HttpServletRequest request) throws Exception {
	String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
	String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
	List<SooMst_CdBasFtamstVO> validateList = new ArrayList<>();

	// validation
	for (SooMst_CdBasFtamstVO vo : cdBasFtamstVOList) {
	  SooMst_CdBasFtamstVO validateVO = modelMapper.map(vo, SooMst_CdBasFtamstVO.class);
	  validateVO.setAddUserId(userId);
	  validateVO.setAddUserNm(userNm);
	  validateVO.setEditUserId(userId);
	  validateVO.setEditUserNm(userNm);
	  validateVO.setAddDtm(CmmnUtils.getFormatedDate("yyyyMMddHHmmss"));
	  Set<ConstraintViolation<SooMst_CdBasFtamstVO>> validator = CmmnUtils.isCommonValid(validateVO);
	  if (validator.size() > 0) {
		Object[] parameter = validator.toArray();
		throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
	  }
	  validateList.add(vo);
	}

	List<SooMst_CdBasFtamstVO> returnList = sooMstCdBasFtaMstDao.save(cdBasFtamstVOList);

	return returnList;
  }

  /**
   * Gets cd bas fta dtl list.
   *
   * @param args the args
   * @return the cd bas fta dtl list
   * @throws Exception the exception
   */
  public List<SooMst_CdBasFtadtlVO> getCdBasFtaDtlList(Map args) throws Exception {
	BigDecimal keyCdBasFtadtl = CmmnUtils.isContainsMapValue(args, "keyCdBasFtadtl") ? NumberUtils.createBigDecimal(String.valueOf(args.get("keyCdBasFtadtl"))) : null;
	BigDecimal keyCdBasFtamst = CmmnUtils.isContainsMapValue(args, "keyCdBasFtamst") ? NumberUtils.createBigDecimal(String.valueOf(args.get("keyCdBasFtamst"))) : null;
	String ftacode = args.containsKey("ftacode") ? String.valueOf(args.get("ftacode")) : null;
	String ftact = args.containsKey("ftact") ? String.valueOf(args.get("ftact")) : null;
	String ftactnm = args.containsKey("ftactnm") ? String.valueOf(args.get("ftactnm")) : null;
	String useYn = args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "Y";

	//검색조건(필수:useYn)
	Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn"));
	//검색조건
	if (!CmmnUtils.isNull(keyCdBasFtadtl)) spec = spec.and(CmmnSpecs.eqNumberSpec(keyCdBasFtadtl, "keyCdBasFtadtl"));
	if (!CmmnUtils.isNull(keyCdBasFtamst)) spec = spec.and(CmmnSpecs.eqNumberSpec(keyCdBasFtamst, "keyCdBasFtamst"));
	if (!CmmnUtils.isNull(ftacode)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(ftacode, "ftacode"));
	if (!CmmnUtils.isNull(ftact)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(ftact, "ftact"));
	if (!CmmnUtils.isNull(ftactnm)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(ftactnm, "ftactnm"));

	Sort orders = new Sort(Sort.Direction.DESC, "useYn").and(new Sort(Sort.Direction.ASC, "keyCdBasFtadtl"));

	return sooMstCdBasFtaDtlDao.findAll(spec, orders);
  }

  /**
   * Save cd bas fta dtl list list.
   *
   * @param cdBasFtadtlVOList the cd bas ftadtl vo list
   * @param request           the request
   * @return the list
   * @throws Exception the exception
   */
  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public List<SooMst_CdBasFtadtlVO> saveCdBasFtaDtlList(List<SooMst_CdBasFtadtlVO> cdBasFtadtlVOList, HttpServletRequest request) throws Exception {
	String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
	String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
	List<SooMst_CdBasFtadtlVO> validateList = new ArrayList<>();

	// validation
	for (SooMst_CdBasFtadtlVO vo : cdBasFtadtlVOList) {
	  SooMst_CdBasFtadtlVO validateVO = modelMapper.map(vo, SooMst_CdBasFtadtlVO.class);
	  validateVO.setAddUserId(userId);
	  validateVO.setAddUserNm(userNm);
	  validateVO.setEditUserId(userId);
	  validateVO.setEditUserNm(userNm);
	  validateVO.setAddDtm(CmmnUtils.getFormatedDate("yyyyMMddHHmmss"));
	  Set<ConstraintViolation<SooMst_CdBasFtadtlVO>> validator = CmmnUtils.isCommonValid(validateVO);
	  if (validator.size() > 0) {
		Object[] parameter = validator.toArray();
		throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
	  }
	  validateList.add(vo);
	}

	List<SooMst_CdBasFtadtlVO> returnList = sooMstCdBasFtaDtlDao.save(cdBasFtadtlVOList);

	return returnList;
  }



  /**
   * Save cd hs mate 1 list list.
   *
   * @param voList  the vo list
   * @param request the request
   * @return the list
   * @throws Exception the exception
   */
  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public List<SooMst_CdHsMate1VO> saveCdHsMate1List(List<SooMst_CdHsMate1VO> voList, HttpServletRequest request) throws Exception {
	String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
	String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
	List<SooMst_CdHsMate1VO> validateList = new ArrayList<>();

	// validation
	for (SooMst_CdHsMate1VO vo : voList) {
	  SooMst_CdHsMate1VO validateVO = modelMapper.map(vo, SooMst_CdHsMate1VO.class);
	  validateVO.setAddUserId(userId);
	  validateVO.setAddUserNm(userNm);
	  validateVO.setEditUserId(userId);
	  validateVO.setEditUserNm(userNm);
	  validateVO.setAddDtm(CmmnUtils.getFormatedDate("yyyyMMddHHmmss"));
	  Set<ConstraintViolation<SooMst_CdHsMate1VO>> validator = CmmnUtils.isCommonValid(validateVO);
	  if (validator.size() > 0) {
		Object[] parameter = validator.toArray();
		throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
	  }
	  validateList.add(vo);
	}

	List<SooMst_CdHsMate1VO> returnList = sooMstCdHsMate1Dao.save(voList);

	return returnList;
  }

  /**
   * Save cd hs mate 2 list list.
   *
   * @param voList  the vo list
   * @param request the request
   * @return the list
   * @throws Exception the exception
   */
  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public List<SooMst_CdHsMate2VO> saveCdHsMate2List(List<SooMst_CdHsMate2VO> voList, HttpServletRequest request) throws Exception {
	String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
	String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
	List<SooMst_CdHsMate2VO> validateList = new ArrayList<>();

	// validation
	for (SooMst_CdHsMate2VO vo : voList) {
	  SooMst_CdHsMate2VO validateVO = modelMapper.map(vo, SooMst_CdHsMate2VO.class);
	  validateVO.setAddUserId(userId);
	  validateVO.setAddUserNm(userNm);
	  validateVO.setEditUserId(userId);
	  validateVO.setEditUserNm(userNm);
	  validateVO.setAddDtm(CmmnUtils.getFormatedDate("yyyyMMddHHmmss"));
	  Set<ConstraintViolation<SooMst_CdHsMate2VO>> validator = CmmnUtils.isCommonValid(validateVO);
	  if (validator.size() > 0) {
		Object[] parameter = validator.toArray();
		throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
	  }
	  validateList.add(vo);
	}

	List<SooMst_CdHsMate2VO> returnList = sooMstCdHsMate2Dao.save(voList);

	return returnList;
  }

  /**
   * Gets item master not yog list.
   *
   * @param args the args
   * @return the item master not yog list
   * @throws Exception the exception
   */
// TODO: 2016-12-13
  public List<SooMst_ItemMasterNotYogVO> getItemMasterNotYogList(Map args) throws Exception {
	BigDecimal keyMstItemMasterNotYog = CmmnUtils.isContainsMapValue(args, "keyMstItemMasterNotYog") ? NumberUtils.createBigDecimal(String.valueOf(args.get("keyMstItemMasterNotYog"))) : null;
	BigDecimal itemKey = CmmnUtils.isContainsMapValue(args, "itemKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("itemKey"))) : null;
	String mcountNo = args.containsKey("mcountNo") ? String.valueOf(args.get("mcountNo")) : null;
	String seq = args.containsKey("seq") ? String.valueOf(args.get("seq")) : null;
	String lawCd = args.containsKey("lawCd") ? String.valueOf(args.get("lawCd")) : null;
	String useYn = args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "";

	//검색조건(필수:useYn)
	Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn"));
	//검색조건
	if (!CmmnUtils.isNull(keyMstItemMasterNotYog)) spec = spec.and(CmmnSpecs.eqNumberSpec(keyMstItemMasterNotYog, "keyMstItemMasterNotYog"));
	if (!CmmnUtils.isNull(itemKey)) spec = spec.and(CmmnSpecs.eqNumberSpec(itemKey, "itemKey"));
	if (!CmmnUtils.isNull(mcountNo)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(mcountNo, "mcountNo"));
	if (!CmmnUtils.isNull(seq)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(seq, "seq"));
	if (!CmmnUtils.isNull(lawCd)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(lawCd, "lawCd"));
	Sort orders = new Sort(Sort.Direction.DESC, "useYn").and(new Sort(Sort.Direction.ASC, "keyMstItemMasterNotYog"));

	return sooMstItemMasterNotYogDao.findAll(spec, orders);
  }

  /**
   * Save item master not yog list list.
   *
   * @param voList  the vo list
   * @param request the request
   * @return the list
   * @throws Exception the exception
   */
  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public List<SooMst_ItemMasterNotYogVO> saveItemMasterNotYogList(List<SooMst_ItemMasterNotYogVO> voList, HttpServletRequest request) throws Exception {
	String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
	String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
	List<SooMst_ItemMasterNotYogVO> validateList = new ArrayList<>();

	// validation
	for (SooMst_ItemMasterNotYogVO vo : voList) {
	  SooMst_ItemMasterNotYogVO validateVO = modelMapper.map(vo, SooMst_ItemMasterNotYogVO.class);
	  validateVO.setAddUserId(userId);
	  validateVO.setAddUserNm(userNm);
	  validateVO.setEditUserId(userId);
	  validateVO.setEditUserNm(userNm);
	  validateVO.setAddDtm(CmmnUtils.getFormatedDate("yyyyMMddHHmmss"));
	  Set<ConstraintViolation<SooMst_ItemMasterNotYogVO>> validator = CmmnUtils.isCommonValid(validateVO);
	  if (validator.size() > 0) {
		Object[] parameter = validator.toArray();
		throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
	  }
	  validateList.add(vo);
	}

	List<SooMst_ItemMasterNotYogVO> returnList = sooMstItemMasterNotYogDao.save(voList);

	return returnList;
  }

  /**
   * Gets cd b law cstm chk list.
   *
   * @param args the args
   * @return the cd b law cstm chk list
   * @throws Exception the exception
   */
  public List<SooMst_CdBLawCstmChkVO> getCdBLawCstmChkList(Map args) throws Exception {
	BigDecimal keyCdBLawCstmChk = CmmnUtils.isContainsMapValue(args, "keyCdBLawCstmChk") ? NumberUtils.createBigDecimal(String.valueOf(args.get("keyCdBLawCstmChk"))) : null;
	String lawCd = args.containsKey("lawCd") ? String.valueOf(args.get("lawCd")) : null;
	String lawName = args.containsKey("lawName") ? String.valueOf(args.get("lawName")) : null;
	String useYn = args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "";

	//검색조건(필수:useYn)
	Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn"));
	//검색조건
	if (!CmmnUtils.isNull(keyCdBLawCstmChk)) spec = spec.and(CmmnSpecs.eqNumberSpec(keyCdBLawCstmChk, "keyCdBLawCstmChk"));
	if (!CmmnUtils.isNull(lawCd)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(lawCd, "lawCd"));
	if (!CmmnUtils.isNull(lawName)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(lawName, "lawName"));
	Sort orders = new Sort(Sort.Direction.DESC, "useYn").and(new Sort(Sort.Direction.ASC, "keyCdBLawCstmChk"));

	return sooMstCdBLawCstmChkDao.findAll(spec, orders);
  }

  /**
   * Save cd b law cstm chk list list.
   *
   * @param voList  the vo list
   * @param request the request
   * @return the list
   * @throws Exception the exception
   */
  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public List<SooMst_CdBLawCstmChkVO> saveCdBLawCstmChkList(List<SooMst_CdBLawCstmChkVO> voList, HttpServletRequest request) throws Exception {
	String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
	String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
	List<SooMst_CdBLawCstmChkVO> validateList = new ArrayList<>();

	// validation
	for (SooMst_CdBLawCstmChkVO vo : voList) {
	  SooMst_CdBLawCstmChkVO validateVO = modelMapper.map(vo, SooMst_CdBLawCstmChkVO.class);
	  validateVO.setAddUserId(userId);
	  validateVO.setAddUserNm(userNm);
	  validateVO.setEditUserId(userId);
	  validateVO.setEditUserNm(userNm);
	  validateVO.setAddDtm(CmmnUtils.getFormatedDate("yyyyMMddHHmmss"));
	  Set<ConstraintViolation<SooMst_CdBLawCstmChkVO>> validator = CmmnUtils.isCommonValid(validateVO);
	  if (validator.size() > 0) {
		Object[] parameter = validator.toArray();
		throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
	  }
	  validateList.add(vo);
	}

	List<SooMst_CdBLawCstmChkVO> returnList = sooMstCdBLawCstmChkDao.save(voList);

	return returnList;
  }

  /**
   * Gets cd bas mbk country list.
   *
   * @param args the args
   * @return the cd bas mbk country list
   * @throws Exception the exception
   */
  public List<SooMst_CdBasMbkCountryVO> getCdBasMbkCountryList(Map args) throws Exception {
	BigDecimal keyMbkBasCountry = CmmnUtils.isContainsMapValue(args, "keyMbkBasCountry") ? NumberUtils.createBigDecimal(String.valueOf(args.get("keyMbkBasCountry"))) : null;
	String useYn = args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "";

	Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn"));
	if (!CmmnUtils.isNull(keyMbkBasCountry)) spec = spec.and(CmmnSpecs.eqNumberSpec(keyMbkBasCountry, "keyMbkBasCountry"));
	Sort orders = new Sort(Sort.Direction.DESC, "useYn");

	return sooMstCdBasMbkCountryDao.findAll(spec, orders);
  }

  /**
   * Save cd bas mbk country list list.
   *
   * @param voList  the vo list
   * @param request the request
   * @return the list
   * @throws Exception the exception
   */
  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public List<SooMst_CdBasMbkCountryVO> saveCdBasMbkCountryList(List<SooMst_CdBasMbkCountryVO> voList, HttpServletRequest request) throws Exception {
	String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
	String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
	List<SooMst_CdBasMbkCountryVO> validateList = new ArrayList<>();

	for (SooMst_CdBasMbkCountryVO vo : voList) {
	  SooMst_CdBasMbkCountryVO validateVO = modelMapper.map(vo, SooMst_CdBasMbkCountryVO.class);
	  validateVO.setAddUserId(userId);
	  validateVO.setAddUserNm(userNm);
	  validateVO.setEditUserId(userId);
	  validateVO.setEditUserNm(userNm);
	  validateVO.setAddDtm(CmmnUtils.getFormatedDate("yyyyMMddHHmmss"));
	  Set<ConstraintViolation<SooMst_CdBasMbkCountryVO>> validator = CmmnUtils.isCommonValid(validateVO);
	  if (validator.size() > 0) {
		Object[] parameter = validator.toArray();
		throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
	  }
	  validateList.add(vo);
	}

	List<SooMst_CdBasMbkCountryVO> returnList = sooMstCdBasMbkCountryDao.save(voList);

	return returnList;
  }

  /**
   * Gets cd bas trans list.
   *
   * @param args the args
   * @return the cd bas trans list
   * @throws Exception the exception
   */
  public List<SooMst_CdBasTransVO> getCdBasTransList(Map args) throws Exception {
	BigDecimal keyBasTrans = CmmnUtils.isContainsMapValue(args, "keyBasTrans") ? NumberUtils.createBigDecimal(String.valueOf(args.get("keyBasTrans"))) : null;
	String useYn = args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "";

	Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn"));
	if (!CmmnUtils.isNull(keyBasTrans)) spec = spec.and(CmmnSpecs.eqNumberSpec(keyBasTrans, "keyBasTrans"));
	Sort orders = new Sort(Sort.Direction.DESC, "useYn");

	return sooMstCdBasTransDao.findAll(spec, orders);
  }

  /**
   * Save cd bas trans list list.
   *
   * @param voList  the vo list
   * @param request the request
   * @return the list
   * @throws Exception the exception
   */
  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public List<SooMst_CdBasTransVO> saveCdBasTransList(List<SooMst_CdBasTransVO> voList, HttpServletRequest request) throws Exception {
	String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
	String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
	List<SooMst_CdBasTransVO> validateList = new ArrayList<>();

	for (SooMst_CdBasTransVO vo : voList) {
	  SooMst_CdBasTransVO validateVO = modelMapper.map(vo, SooMst_CdBasTransVO.class);
	  validateVO.setAddUserId(userId);
	  validateVO.setAddUserNm(userNm);
	  validateVO.setEditUserId(userId);
	  validateVO.setEditUserNm(userNm);
	  validateVO.setAddDtm(CmmnUtils.getFormatedDate("yyyyMMddHHmmss"));
	  Set<ConstraintViolation<SooMst_CdBasTransVO>> validator = CmmnUtils.isCommonValid(validateVO);
	  if (validator.size() > 0) {
		Object[] parameter = validator.toArray();
		throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
	  }
	  validateList.add(vo);
	}

	List<SooMst_CdBasTransVO> returnList = sooMstCdBasTransDao.save(voList);

	return returnList;
  }

  /**
   * Gets cd cst re deal list.
   *
   * @param args the args
   * @return the cd cst re deal list
   * @throws Exception the exception
   */
  public List<SooMst_CdCstReDealVO> getCdCstReDealList(Map args) throws Exception {
	BigDecimal keyTbReDeal = CmmnUtils.isContainsMapValue(args, "keyTbReDeal") ? NumberUtils.createBigDecimal(String.valueOf(args.get("keyTbReDeal"))) : null;
	String useYn = args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "";

	Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn"));
	if (!CmmnUtils.isNull(keyTbReDeal)) spec = spec.and(CmmnSpecs.eqNumberSpec(keyTbReDeal, "keyTbReDeal"));
	Sort orders = new Sort(Sort.Direction.DESC, "useYn");

	return sooMstCdCstReDealDao.findAll(spec, orders);
  }

  /**
   * Save cd cst re deal list list.
   *
   * @param voList  the vo list
   * @param request the request
   * @return the list
   * @throws Exception the exception
   */
  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public List<SooMst_CdCstReDealVO> saveCdCstReDealList(List<SooMst_CdCstReDealVO> voList, HttpServletRequest request) throws Exception {
	String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
	String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
	List<SooMst_CdCstReDealVO> validateList = new ArrayList<>();

	for (SooMst_CdCstReDealVO vo : voList) {
	  SooMst_CdCstReDealVO validateVO = modelMapper.map(vo, SooMst_CdCstReDealVO.class);
	  validateVO.setAddUserId(userId);
	  validateVO.setAddUserNm(userNm);
	  validateVO.setEditUserId(userId);
	  validateVO.setEditUserNm(userNm);
	  validateVO.setAddDtm(CmmnUtils.getFormatedDate("yyyyMMddHHmmss"));
	  Set<ConstraintViolation<SooMst_CdCstReDealVO>> validator = CmmnUtils.isCommonValid(validateVO);
	  if (validator.size() > 0) {
		Object[] parameter = validator.toArray();
		throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
	  }
	  validateList.add(vo);
	}

	List<SooMst_CdCstReDealVO> returnList = sooMstCdCstReDealDao.save(voList);

	return returnList;
  }

  /**
   * Gets cd cst re deal attach file list.
   *
   * @param args the args
   * @return the cd cst re deal attach file list
   * @throws Exception the exception
   */
  public List<SooMst_CdCstReDealAttachFileVO> getCdCstReDealAttachFileList(Map args) throws Exception {
	BigDecimal dealFileKey = CmmnUtils.isContainsMapValue(args, "dealFileKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("dealFileKey"))) : null;
	String useYn = args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "";

	Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn"));
	if (!CmmnUtils.isNull(dealFileKey)) spec = spec.and(CmmnSpecs.eqNumberSpec(dealFileKey, "dealFileKey"));
	Sort orders = new Sort(Sort.Direction.DESC, "useYn");

	return sooMstCdCstReDealAttachFileDao.findAll(spec, orders);
  }

  /**
   * Save cd cst re deal attach file list list.
   *
   * @param voList  the vo list
   * @param request the request
   * @return the list
   * @throws Exception the exception
   */
  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public List<SooMst_CdCstReDealAttachFileVO> saveCdCstReDealAttachFileList(List<SooMst_CdCstReDealAttachFileVO> voList, HttpServletRequest request) throws Exception {
	String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
	String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
	List<SooMst_CdCstReDealAttachFileVO> validateList = new ArrayList<>();

	for (SooMst_CdCstReDealAttachFileVO vo : voList) {
	  SooMst_CdCstReDealAttachFileVO validateVO = modelMapper.map(vo, SooMst_CdCstReDealAttachFileVO.class);
	  validateVO.setAddUserId(userId);
	  validateVO.setAddUserNm(userNm);
	  validateVO.setEditUserId(userId);
	  validateVO.setEditUserNm(userNm);
	  validateVO.setAddDtm(CmmnUtils.getFormatedDate("yyyyMMddHHmmss"));
	  Set<ConstraintViolation<SooMst_CdCstReDealAttachFileVO>> validator = CmmnUtils.isCommonValid(validateVO);
	  if (validator.size() > 0) {
		Object[] parameter = validator.toArray();
		throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
	  }
	  validateList.add(vo);
	}

	List<SooMst_CdCstReDealAttachFileVO> returnList = sooMstCdCstReDealAttachFileDao.save(voList);

	return returnList;
  }


}