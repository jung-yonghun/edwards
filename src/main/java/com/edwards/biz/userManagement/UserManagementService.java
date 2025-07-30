package com.edwards.biz.userManagement;

import com.edwards.biz.userManagement.UserInfoMapper;
import com.edwards.biz.customsManagement.ImpoCustomsMapper;
import com.edwards.commons.CmmnConstants;
import com.edwards.commons.CmmnMailService;
import com.edwards.commons.CmmnSpecs;
import com.edwards.commons.CmmnUtils;
import com.edwards.domains.CpsUserInfoVO;

import org.apache.commons.lang3.math.NumberUtils;
import org.apache.commons.validator.routines.EmailValidator;
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
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintViolation;

import java.math.BigDecimal;
import java.util.*;

@Service
public class UserManagementService{
	@Qualifier("SqlSessionTemplate")
	@Autowired
	private SqlSession sqlSession;
	@Autowired
	private UserInfoDao userInfoDao;
	@Autowired
	private CmmnMailService cmmnMailService;
	@Autowired
	private MessageSource messageSource;
	@Autowired
	private ModelMapper modelMapper;

	public List<Map> selectBSAA110List(Map args) throws Exception {
		return sqlSession.getMapper(UserInfoMapper.class).selectBSAA110List(CmmnUtils.replaceMapSc(args));
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
	public CpsUserInfoVO saveUserInfo(CpsUserInfoVO vo, HttpServletRequest request) throws Exception{
		CpsUserInfoVO userInfoVO = new CpsUserInfoVO();
		if(!CmmnUtils.isNull(vo)){
			String test = vo.getUserEmail()+""+vo.getUserSaup();
			vo.setUserPw(CmmnUtils.encryptBase64("ENC", vo.getUserPw(), "UTF-8"));
			vo.setApiKey(CmmnUtils.encryptBase64("ENC", test, "UTF-8"));
			userInfoVO = userInfoDao.save(vo);
		}
		return userInfoVO;
	}

	public CpsUserInfoVO saveUserInfoAll(CpsUserInfoVO vo, HttpServletRequest request) throws Exception{
		Calendar temp=Calendar.getInstance ( );
		temp.add ( Calendar.DAY_OF_MONTH, 90 );
		int nYear = temp.get ( Calendar.YEAR );
		int nMonth = temp.get ( Calendar.MONTH ) + 1;
		int nDay = temp.get ( Calendar.DAY_OF_MONTH );
		StringBuffer sbDate=new StringBuffer ( );
		sbDate.append ( nYear );
		if ( nMonth < 10 ) sbDate.append ("0");
		sbDate.append ( nMonth );
		if ( nDay < 10 ) sbDate.append ("0");
		sbDate.append ( nDay );

		CpsUserInfoVO userInfoVO = new CpsUserInfoVO();
		userInfoVO = getUserOne(NumberUtils.createBigDecimal(String.valueOf(vo.getUserKey())));
		if(!CmmnUtils.isNull(vo)){
			String test = vo.getUserEmail()+""+vo.getUserSaup();
			userInfoVO.setUserPw(CmmnUtils.encryptBase64("ENC", vo.getUserPw(), "UTF-8"));
			userInfoVO.setUserName(vo.getUserName());
			userInfoVO.setUserSangho(vo.getUserSangho());
			userInfoVO.setUserSaup(vo.getUserSaup());
			userInfoVO.setUserDepart(vo.getUserDepart());
			userInfoVO.setUserJikchk(vo.getUserJikchk());
			userInfoVO.setUserMobile(vo.getUserMobile());
			userInfoVO.setUserPhone(vo.getUserPhone());
			userInfoVO.setUserFax(vo.getUserFax());
			userInfoVO.setUserSupport(vo.getUserSupport());
			userInfoVO.setApiKey(CmmnUtils.encryptBase64("ENC", test, "UTF-8"));
			userInfoVO.setChangePwDtm(sbDate.toString());
			userInfoVO.setEditUserKey(String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)));
			if (!CmmnUtils.isNull(vo.getDefaultDB())) 	userInfoVO.setDefaultDB(vo.getDefaultDB());
			if (!CmmnUtils.isNull(vo.getSetSangho())) 	userInfoVO.setSetSangho(vo.getSetSangho());
			if (!CmmnUtils.isNull(vo.getSetSaup()))   	userInfoVO.setSetSaup(vo.getSetSaup());
			if (!CmmnUtils.isNull(vo.getSetMenu())) 	userInfoVO.setSetMenu(vo.getSetMenu());
			if (!CmmnUtils.isNull(vo.getUserAppDtm())) 	userInfoVO.setUserAppDtm(vo.getUserAppDtm());
			if (!CmmnUtils.isNull(vo.getUserAppUser())) userInfoVO.setUserAppUser(vo.getUserAppUser());
			if (!CmmnUtils.isNull(vo.getUserAppYN())) 	userInfoVO.setUserAppYN(vo.getUserAppYN());
			if (!CmmnUtils.isNull(vo.getUserEmail())) 	userInfoVO.setUserEmail(vo.getUserEmail());
			if (!CmmnUtils.isNull(vo.getUserGradeA())) 	userInfoVO.setUserGradeA(vo.getUserGradeA());
			if (!CmmnUtils.isNull(vo.getUserGradeB())) 	userInfoVO.setUserGradeB(vo.getUserGradeB());
			if (!CmmnUtils.isNull(vo.getUserId())) 		userInfoVO.setUserId(vo.getUserId());
			if (!CmmnUtils.isNull(vo.getUserLogo())) 	userInfoVO.setUserLogo(vo.getUserLogo());
			if (!CmmnUtils.isNull(vo.getUserNote())) 	userInfoVO.setUserNote(vo.getUserNote());
			if (!CmmnUtils.isNull(vo.getUseYn())) 		userInfoVO.setUseYn(vo.getUseYn());
			if (!CmmnUtils.isNull(vo.getDno())) 		userInfoVO.setDno(vo.getDno());
			userInfoVO = userInfoDao.save(userInfoVO);
		}
		return userInfoVO;
	}

	public CpsUserInfoVO getUserEmailAndUserNameAndUserSaup(String userEmail, String userName, String userSaup){
		return userInfoDao.findByUserEmailAndUserNameAndUserSaup(userEmail, userName, userSaup);
	}

	public CpsUserInfoVO getUserOne(BigDecimal userKey) throws Exception{
		return userInfoDao.getOne(userKey);
	}

	public CpsUserInfoVO getUserInfo(String userEmail, String userPw) throws Exception{
		return userInfoDao.findByUserEmailAndUserPwAndUseYn(userEmail, userPw, "Y");
	}

	public CpsUserInfoVO getUserInfoBack(String userEmail) throws Exception{
		return userInfoDao.findByUserEmailAndUseYn(userEmail, "Y");
	}

	public List<Map> getUserList(Map args) throws Exception {
		return sqlSession.getMapper(UserInfoMapper.class).findUserInfoList(CmmnUtils.replaceMapSc(args));
	}

	public List<CpsUserInfoVO> selectUserList(Map args) throws Exception {
		BigDecimal userKey = CmmnUtils.isContainsMapValue(args, "userKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("userKey"))) : null;
		String userGradeB = args.containsKey("userGradeB") ? String.valueOf(args.get("userGradeB")) : null;
		String userSangho = args.containsKey("userSangho") ? String.valueOf(args.get("userSangho")) : null;
		String useYn = args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "Y";
		Sort orders = null;

		Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn"));
		if (!CmmnUtils.isNull(userKey)) spec = spec.and(CmmnSpecs.eqNumberSpec(userKey, "userKey"));
		if (!CmmnUtils.isNull(userGradeB)) spec = spec.and(CmmnSpecs.eqStringSpec(userGradeB, "userGradeB"));
		if (!CmmnUtils.isNull(userSangho)) spec = spec.and(CmmnSpecs.eqStringSpec(userSangho, "userSangho"));

		if (!CmmnUtils.isNull(userSangho)){
			orders = new Sort(Sort.Direction.DESC, "useYn").and(new Sort(Sort.Direction.ASC, "userName"));
		}else{
			orders = new Sort(Sort.Direction.DESC, "useYn").and(new Sort(Sort.Direction.DESC, "userKey"));
		}

		return userInfoDao.findAll(spec, orders);
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = { Exception.class })
	public Map updateCpsUserMenu(Map args) throws Exception {
	    if(args.size() > 0){
	      sqlSession.getMapper(UserInfoMapper.class).updateCpsUserMenu(args);
	    }
	    return args;
	}

	public List<Map> getMsgUserList(Map args) throws Exception {
		return sqlSession.getMapper(UserInfoMapper.class).findMsgUserInfoList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectZeissUser(Map args) throws Exception {
		return sqlSession.getMapper(UserInfoMapper.class).selectZeissUser(CmmnUtils.replaceMapSc(args));
	}








  public Page<CpsUserInfoVO> getUserInfoList(Map args, Pageable pageable) throws Exception{
	Specifications spec = getUserInfoSpecs(args);
	return userInfoDao.findAll(spec, pageable);
  }

  private Specifications getUserInfoSpecs(Map args) {
	BigDecimal userKey = CmmnUtils.isContainsMapValue(args, "userKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("userKey"))) : null;
	String userId = args.containsKey("userId") ? String.valueOf(args.get("userId")) : null;
	String useYn = args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "";

	Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn"));
	if (!CmmnUtils.isNull(userKey)) spec = spec.and(CmmnSpecs.eqNumberSpec(userKey, "userKey"));
	if (!CmmnUtils.isNull(userId)) spec = spec.and(CmmnSpecs.eqStringSpec(userId, "userId"));

//	if (!CmmnUtils.isNull((argChosung))) {
//	  List<CmsMasterVO> chosungList = cmsContentsDao.findChosungWithContentNameOrContentsGenreOrcontentsMain(CmmnUtils.convertChosung(argChosung));
//	  if (chosungList.size() > 0) {
//		List<BigInteger> result = chosungList.stream()
//				.map(i -> i.getContentsKey())
//				.collect(Collectors.toList());
//		spec = spec.and(CmmnSpecs.inKeyListSpec(result, "contentsKey"));
//	  }
//	}
//	if (!CmmnUtils.isNull(contentsName)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(contentsName, "contentsName"));
//	if (!CmmnUtils.isNull(liveContentsYn)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(liveContentsYn, "liveContentsYn"));
//	if (!CmmnUtils.isNull(contentsConfYn)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(contentsConfYn, "contentsConfYn"));

	return spec;
  }



  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public List<CpsUserInfoVO> saveUserInfoList(List<CpsUserInfoVO> voList, HttpServletRequest request) throws Exception {
	List<CpsUserInfoVO> validateList = new ArrayList<>();
	String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
	String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
	String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

	// validation
	for (CpsUserInfoVO vo : voList) {
	  CpsUserInfoVO validateVO = modelMapper.map(vo, CpsUserInfoVO.class);
	  validateVO.setEditUserKey(userId);
	  Set<ConstraintViolation<CpsUserInfoVO>> validator = CmmnUtils.isCommonValid(validateVO);
	  if (validator.size() > 0) {
		Object[] parameter = validator.toArray();
		throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
	  }
	  validateList.add(vo);
	}

	List<CpsUserInfoVO> returnVO = userInfoDao.save(voList);

	return returnVO;
  }


  private boolean sendEmailUserPassword(CpsUserInfoVO result, StringBuffer newPassword) {
	HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
	Map map = new HashMap();
	boolean mailSendCheck = false;
	List<Object> mailAddr = new ArrayList<Object>(), mailList = new ArrayList<Object>();

	mailAddr.add(result.getUserEmail());
	for (int i = 0; i < mailAddr.size(); i++) {
	  if (EmailValidator.getInstance().isValid(String.valueOf(mailAddr.get(i)))) {
		mailList.add(String.valueOf(mailAddr.get(i)));
	  }
	}

	if (mailList.size() > 0) {
	  map.put("toAddr", mailList);
	  map.put("subject", "[GEOWS] 신규 비밀번호 안내 입니다.");
	  map.put("contents", "<html><b><u>신규비밀번호</u></b> : " + newPassword + "</html>");
	  map.put("contentType", true);

	  mailSendCheck = cmmnMailService.sendMail(request, map);
	}
	return mailSendCheck;
  }
}