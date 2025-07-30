package com.edwards.web.signup;

import com.edwards.biz.codeManagement.CodeManagementService;
import com.edwards.biz.logManagement.LogAccessDao;
import com.edwards.biz.systemManagement.SystemManagementService;
import com.edwards.biz.userManagement.UserInfoDao;
import com.edwards.biz.userManagement.UserManagementService;
import com.edwards.commons.CmmnConstants;
import com.edwards.commons.CmmnUtils;
import com.edwards.domains.CpsExcelLogAccessVO;
import com.edwards.domains.CpsLogAccessVO;
import com.edwards.domains.CpsUserInfoVO;

import org.apache.commons.lang3.math.NumberUtils;
import org.apache.ibatis.session.SqlSession;
import org.apache.catalina.manager.JspHelper;
import org.apache.catalina.Session;
import org.apache.catalina.util.ContextName;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.ConfigurableWebApplicationContext;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.*;

import java.math.BigDecimal;
import java.util.*;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Locale;
//import java.util.Map;
//import java.util.Enumeration;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/", method = {RequestMethod.POST})
public class SignupController {
	@Autowired
	private UserManagementService userManagementService;
	@Autowired
	private SystemManagementService systemManagementService;
	@Autowired
	private CodeManagementService codeManagementService;
	@Autowired
	private LogAccessDao logAccessDao;
	@Autowired
	private ConfigurableWebApplicationContext subContext;
	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	private MessageSource messageSource;
	@Autowired
	private UserInfoDao userInfoDao;

	@Qualifier("SqlSessionTemplate")
	@Autowired
	private SqlSession sqlSession;

	@Value("${mainPage.path}")
	public String mainPagePath;
	@Value("${loginCheck.page}")
	public String loginCheckPagePath;
	@Value("${changePw.path}")
	public String changePwPath;
	@Value("${loginEngCheck.page}")
	public String loginEngCheckPagePath;
	@Value("${changeEngPw.path}")
	public String changeEngPwPath;
	@Value("${asml.main.taxNum}")
	public String asmlTaxNum;

	@RequestMapping(value = "/loginAction")
	public ModelAndView loginAction(HttpServletRequest request, HttpServletResponse response, @RequestParam Map args, ModelMap model) throws Exception{
		ModelAndView mv 		= new ModelAndView();
		HttpSession session 	= request.getSession(true);
		String loginUserEmail 	= String.valueOf(args.get("userEmail"));
		String loginUserPw 		= String.valueOf(args.get("userPw"));
		String serverGubun 		= this.currentProfile();
		String serverIpAddr 	= CmmnUtils.getServerIpAddr();
		String clientIpAddr 	= CmmnUtils.getClientIpAddr(request);
		String currentDate 		= CmmnUtils.getFormatedDate("yyyyMMdd");
		String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
		String saup 			= String.valueOf(args.get("saup"));

		CpsUserInfoVO resultUser = userManagementService.getUserInfo(loginUserEmail, CmmnUtils.encryptBase64("ENC", loginUserPw, "UTF-8"));

		if(CmmnUtils.isNull(resultUser)){
			// 접속실패로그
			CpsLogAccessVO logAccessVO = new CpsLogAccessVO();
			logAccessVO.setUserEmail(loginUserEmail);
			logAccessVO.setServerIp(serverIpAddr);
			logAccessVO.setClientIp(clientIpAddr);
			logAccessVO.setAction("로그인실패");
			logAccessVO.setSessionId(session.getId());
			logAccessVO.setAddUserEmail(loginUserEmail);
			logAccessVO.setAddUserName(loginUserPw);
			logAccessVO.setAddDtm(currentDatetime);
			logAccessDao.save(logAccessVO);

			mv.setViewName("redirect:." + loginCheckPagePath);
			mv.addObject("resultMsg", messageSource.getMessage("fail.login.msg", null, null, Locale.KOREA));
			return mv;
		}else{
			if(resultUser.getDoubleChkYn().equals("N")){
				int count = logAccessDao.countByUserEmail(resultUser.getUserEmail());
				if(count > 0){
					CpsLogAccessVO CpsLogAccessDoubleVO = new CpsLogAccessVO();
					CpsLogAccessDoubleVO = logAccessDao.findTop1ByUserEmailOrderByLogKeyDesc(resultUser.getUserEmail());
					if(CpsLogAccessDoubleVO.getAction().equals("로그인성공")){
						CpsLogAccessVO logAccessOutVO = new CpsLogAccessVO();
						logAccessOutVO.setUserEmail(CpsLogAccessDoubleVO.getUserEmail());
						logAccessOutVO.setServerIp(CpsLogAccessDoubleVO.getServerIp());
						logAccessOutVO.setClientIp(CpsLogAccessDoubleVO.getClientIp());
						logAccessOutVO.setAction("로그아웃");
						logAccessOutVO.setSessionId(CpsLogAccessDoubleVO.getSessionId());
						logAccessOutVO.setAddUserEmail(CpsLogAccessDoubleVO.getAddUserEmail());
						logAccessOutVO.setAddUserName(CpsLogAccessDoubleVO.getAddUserName());
						logAccessOutVO.setAddDtm(CpsLogAccessDoubleVO.getAddDtm());
						logAccessDao.save(logAccessOutVO);
					}
				}
			}

			BigDecimal userKey 	= resultUser.getUserKey();

			session.setAttribute(CmmnConstants.SESSION_ID, userKey);
			session.setAttribute(CmmnConstants.SESSION_USERID, resultUser.getUserId());
			session.setAttribute(CmmnConstants.SESSION_GRADE, resultUser.getUserGradeA());
			session.setAttribute(CmmnConstants.SESSION_GRADE_B, resultUser.getUserGradeB());
			session.setAttribute(CmmnConstants.SESSION_USERNAME, resultUser.getUserName());
			session.setAttribute(CmmnConstants.SESSION_MAIL, resultUser.getUserEmail());
			session.setAttribute(CmmnConstants.SESSION_USER_PHONE, resultUser.getUserPhone());
			session.setAttribute(CmmnConstants.SESSION_TAXNO, resultUser.getSetSaup());
			session.setAttribute(CmmnConstants.SESSION_SANGHO, resultUser.getSetSangho());
			session.setAttribute(CmmnConstants.SESSION_FORWADER, resultUser.getUserSangho());
			session.setAttribute(CmmnConstants.SESSION_MENU, resultUser.getSetMenu());
			session.setAttribute(CmmnConstants.SESSION_LOGO, resultUser.getUserLogo());
			session.setAttribute(CmmnConstants.SESSION_DEFAULTDB, resultUser.getDefaultDB());
			session.setAttribute(CmmnConstants.SESSION_DEFAULT_RMS_DB, CmmnUtils.stringContainsItemFromList(resultUser.getUserGradeB(), new String[]{"DEMO"}) ? "demoRms" : "rms");
			session.setAttribute(CmmnConstants.SESSION_SERVER_GUBUN, serverGubun);
			session.setAttribute(CmmnConstants.SESSION_SERVER_IP, serverIpAddr);
			session.setAttribute(CmmnConstants.SESSION_KEY, session.getId());

			if(resultUser.getChangePwYn().equals("Y")){
				if(Integer.parseInt(resultUser.getChangePwDtm()) <= Integer.parseInt(currentDate)){
					mv.setViewName("redirect:." + changePwPath);
					return mv;
				}
			}

			//에드워드는  세션 4시간 (2019-06-11)
			if(resultUser.getSetSaup().equals("3128112960") || resultUser.getSetSaup().equals("1298123036")){ //에드워드코리아(주), 씨에스케이(주)
				int interval = 14400;
				session.setMaxInactiveInterval(interval);
			}

			// 접속성공로그
			CpsLogAccessVO logAccessVO = new CpsLogAccessVO();
			logAccessVO.setUserEmail(loginUserEmail);
			logAccessVO.setServerIp(serverIpAddr);
			logAccessVO.setClientIp(clientIpAddr);
			logAccessVO.setAction("로그인성공");
			logAccessVO.setSessionId(session.getId());
			logAccessVO.setAddUserEmail(loginUserEmail);
			logAccessVO.setAddUserName(resultUser.getUserName());
			logAccessVO.setAddDtm(currentDatetime);
			logAccessDao.save(logAccessVO);

			mv.setViewName("redirect:." + mainPagePath);
			return mv;
		}
	}

	@RequestMapping(value = "/loginBackDoorAction")
	public ModelAndView loginBackDoorAction(HttpServletRequest request, HttpServletResponse response, @RequestParam Map args, ModelMap model) throws Exception{
		ModelAndView mv 		= new ModelAndView();
		HttpSession session 	= request.getSession(true);
		String loginUserEmail 	= String.valueOf(args.get("userEmail"));
		String serverGubun 		= this.currentProfile();
		String serverIpAddr 	= CmmnUtils.getServerIpAddr();
		String clientIpAddr 	= CmmnUtils.getClientIpAddr(request);
		String currentDate 		= CmmnUtils.getFormatedDate("yyyyMMdd");
		String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
		String saup 			= String.valueOf(args.get("saup"));

		CpsUserInfoVO resultUser = userManagementService.getUserInfoBack(loginUserEmail);

		if(CmmnUtils.isNull(resultUser)){
			// 접속실패로그
			CpsLogAccessVO logAccessVO = new CpsLogAccessVO();
			logAccessVO.setUserEmail(loginUserEmail);
			logAccessVO.setServerIp(serverIpAddr);
			logAccessVO.setClientIp(clientIpAddr);
			logAccessVO.setAction("로그인실패");
			logAccessVO.setSessionId(session.getId());
			logAccessVO.setAddUserEmail(loginUserEmail);
			logAccessVO.setAddUserName("backdoor");
			logAccessVO.setAddDtm(currentDatetime);
			logAccessDao.save(logAccessVO);


			mv.setViewName("redirect:." + loginCheckPagePath);
			mv.addObject("resultMsg", messageSource.getMessage("fail.login.msg", null, null, Locale.KOREA));
			return mv;
		}else{
			if(Integer.parseInt(resultUser.getUserAppUser()) <= Integer.parseInt(currentDate)){
				Map map = new HashMap();
				map.put("userKey", resultUser.getUserKey());
				Map result = userManagementService.updateCpsUserMenu(map);

				BigDecimal userKey 	= resultUser.getUserKey();

				session.setAttribute(CmmnConstants.SESSION_ID, userKey);
				session.setAttribute(CmmnConstants.SESSION_USERID, resultUser.getUserId());
				session.setAttribute(CmmnConstants.SESSION_GRADE, resultUser.getUserGradeA());
				session.setAttribute(CmmnConstants.SESSION_GRADE_B, resultUser.getUserGradeB());
				session.setAttribute(CmmnConstants.SESSION_USERNAME, resultUser.getUserName());
				session.setAttribute(CmmnConstants.SESSION_MAIL, resultUser.getUserEmail());
				session.setAttribute(CmmnConstants.SESSION_USER_PHONE, resultUser.getUserPhone());
				session.setAttribute(CmmnConstants.SESSION_TAXNO, resultUser.getSetSaup());
				session.setAttribute(CmmnConstants.SESSION_SANGHO, resultUser.getSetSangho());
				session.setAttribute(CmmnConstants.SESSION_FORWADER, resultUser.getUserSangho());
				session.setAttribute(CmmnConstants.SESSION_MENU, resultUser.getSetMenu());
				session.setAttribute(CmmnConstants.SESSION_LOGO, resultUser.getUserLogo());
				session.setAttribute(CmmnConstants.SESSION_DEFAULTDB, resultUser.getDefaultDB());
				session.setAttribute(CmmnConstants.SESSION_DEFAULT_RMS_DB, CmmnUtils.stringContainsItemFromList(resultUser.getUserGradeB(), new String[]{"DEMO"}) ? "demoRms" : "rms");
				session.setAttribute(CmmnConstants.SESSION_SERVER_GUBUN, serverGubun);
				session.setAttribute(CmmnConstants.SESSION_SERVER_IP, serverIpAddr);
				session.setAttribute(CmmnConstants.SESSION_KEY, session.getId());

				// 접속성공로그
				CpsLogAccessVO logAccessVO = new CpsLogAccessVO();
				logAccessVO.setUserEmail(loginUserEmail);
				logAccessVO.setServerIp(serverIpAddr);
				logAccessVO.setClientIp(clientIpAddr);
				logAccessVO.setAction("로그인성공");
				logAccessVO.setSessionId(session.getId());
				logAccessVO.setAddUserEmail(loginUserEmail);
				logAccessVO.setAddUserName(resultUser.getUserName());
				logAccessVO.setAddDtm(currentDatetime);
				logAccessDao.save(logAccessVO);

				mv.setViewName("redirect:." + mainPagePath);
				return mv;
			}else{
				if(resultUser.getDoubleChkYn().equals("N")){
					int count = logAccessDao.countByUserEmail(resultUser.getUserEmail());
					if(count > 0){
						CpsLogAccessVO CpsLogAccessDoubleVO = new CpsLogAccessVO();
						CpsLogAccessDoubleVO = logAccessDao.findTop1ByUserEmailOrderByLogKeyDesc(resultUser.getUserEmail());
						if(CpsLogAccessDoubleVO.getAction().equals("로그인성공")){
							CpsLogAccessVO logAccessOutVO = new CpsLogAccessVO();
							logAccessOutVO.setUserEmail(CpsLogAccessDoubleVO.getUserEmail());
							logAccessOutVO.setServerIp(CpsLogAccessDoubleVO.getServerIp());
							logAccessOutVO.setClientIp(CpsLogAccessDoubleVO.getClientIp());
							logAccessOutVO.setAction("로그아웃");
							logAccessOutVO.setSessionId(CpsLogAccessDoubleVO.getSessionId());
							logAccessOutVO.setAddUserEmail(CpsLogAccessDoubleVO.getAddUserEmail());
							logAccessOutVO.setAddUserName(CpsLogAccessDoubleVO.getAddUserName());
							logAccessOutVO.setAddDtm(CpsLogAccessDoubleVO.getAddDtm());
							logAccessDao.save(logAccessOutVO);
						}
					}
				}

				BigDecimal userKey 	= resultUser.getUserKey();

				session.setAttribute(CmmnConstants.SESSION_ID, userKey);
				session.setAttribute(CmmnConstants.SESSION_USERID, resultUser.getUserId());
				session.setAttribute(CmmnConstants.SESSION_GRADE, resultUser.getUserGradeA());
				session.setAttribute(CmmnConstants.SESSION_GRADE_B, resultUser.getUserGradeB());
				session.setAttribute(CmmnConstants.SESSION_USERNAME, resultUser.getUserName());
				session.setAttribute(CmmnConstants.SESSION_MAIL, resultUser.getUserEmail());
				session.setAttribute(CmmnConstants.SESSION_USER_PHONE, resultUser.getUserPhone());
				session.setAttribute(CmmnConstants.SESSION_TAXNO, resultUser.getSetSaup());
				session.setAttribute(CmmnConstants.SESSION_SANGHO, resultUser.getSetSangho());
				session.setAttribute(CmmnConstants.SESSION_FORWADER, resultUser.getUserSangho());
				session.setAttribute(CmmnConstants.SESSION_MENU, resultUser.getSetMenu());
				session.setAttribute(CmmnConstants.SESSION_LOGO, resultUser.getUserLogo());
				session.setAttribute(CmmnConstants.SESSION_DEFAULTDB, resultUser.getDefaultDB());
				session.setAttribute(CmmnConstants.SESSION_DEFAULT_RMS_DB, CmmnUtils.stringContainsItemFromList(resultUser.getUserGradeB(), new String[]{"DEMO"}) ? "demoRms" : "rms");
				session.setAttribute(CmmnConstants.SESSION_SERVER_GUBUN, serverGubun);
				session.setAttribute(CmmnConstants.SESSION_SERVER_IP, serverIpAddr);
				session.setAttribute(CmmnConstants.SESSION_KEY, session.getId());

				if(resultUser.getChangePwYn().equals("Y")){
					if(Integer.parseInt(resultUser.getChangePwDtm()) <= Integer.parseInt(currentDate)){
						mv.setViewName("redirect:." + changePwPath);
						return mv;
					}
				}

				// 접속성공로그
				CpsLogAccessVO logAccessVO = new CpsLogAccessVO();
				logAccessVO.setUserEmail(loginUserEmail);
				logAccessVO.setServerIp(serverIpAddr);
				logAccessVO.setClientIp(clientIpAddr);
				logAccessVO.setAction("로그인성공");
				logAccessVO.setSessionId(session.getId());
				logAccessVO.setAddUserEmail(loginUserEmail);
				logAccessVO.setAddUserName(resultUser.getUserName());
				logAccessVO.setAddDtm(currentDatetime);
				logAccessDao.save(logAccessVO);

				mv.setViewName("redirect:." + mainPagePath);
				return mv;
			}
		}
	}

	@RequestMapping(value = "/selectEmailCheck")
	@ResponseBody
	public ResponseEntity<?> selectEmailCheck(@RequestBody Map args, HttpServletRequest request, ModelMap model) throws Exception{
		String userEmail = String.valueOf(args.get("userEmail")).trim();
		int count = userInfoDao.countByUserEmail(userEmail);
		if(count > 0){
			return new ResponseEntity<>(count, HttpStatus.OK);
		}else{
			return new ResponseEntity<>(count, HttpStatus.OK);
		}
	}

	@RequestMapping(value = "/selectIdCheck")
	@ResponseBody
	public ResponseEntity<?> selectIdCheck(@RequestBody Map args, HttpServletRequest request, ModelMap model) throws Exception{
		String userId = String.valueOf(args.get("userId")).trim();
		int count = userInfoDao.countByUserId(userId);
		if(count > 0){
			return new ResponseEntity<>(count, HttpStatus.OK);
		}else{
			return new ResponseEntity<>(count, HttpStatus.OK);
		}
	}

	@RequestMapping(value = "/saveNewUser")
	public ResponseEntity<?> saveNewUser(HttpServletRequest request, @RequestBody Map args) throws Exception{
		try{
			Map<String, Object> convertMap = CmmnUtils.convertMapSourceToMap(args, "userInfo");
			CpsUserInfoVO vo = CmmnUtils.convertMapToBean(convertMap, CpsUserInfoVO.class);

			CpsUserInfoVO returnVO = userManagementService.saveUserInfo(vo, request);
			return new ResponseEntity<>(returnVO, HttpStatus.CREATED);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectUserEmailCheck")
	@ResponseBody
	public ResponseEntity<?> selectUserEmailCheck(HttpServletRequest request, @RequestBody Map args){
		String userName 	= String.valueOf(args.get("userName")).trim();
		String userMobile 	= String.valueOf(args.get("userMobile")).trim();
		String userSaup 	= String.valueOf(args.get("userSaup")).trim();

		try {
			CpsUserInfoVO userInfoVO;
			userInfoVO = userInfoDao.findByUserNameAndUserMobileAndUserSaup(userName, userMobile, userSaup);

			return new ResponseEntity<>(userInfoVO, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectUserPasswdCheck")
	@ResponseBody
	public ResponseEntity<?> selectUserPasswdCheck(HttpServletRequest request, @RequestBody Map args){
		String userEmail 	= args.containsKey("userEmail") ? String.valueOf(args.get("userEmail")).trim() : "";
		String userName 	= String.valueOf(args.get("userName")).trim();
		String userSaup 	= String.valueOf(args.get("userSaup")).trim();

		try {
			CpsUserInfoVO userInfoVO;
			userInfoVO = userInfoDao.findByUserEmailAndUserNameAndUserSaup(userEmail, userName, userSaup);
			System.out.println(userInfoVO.getUserPw());
			userInfoVO.setUserPw(CmmnUtils.encryptBase64("DEC", userInfoVO.getUserPw(), "UTF-8"));
//			userInfoVOResult = userInfoDao.save(userInfoVO);
//			String pass = CmmnUtils.encryptBase64("DEC", userInfoVO.getUserPw(), "UTF-8");

			return new ResponseEntity<>(userInfoVO, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectUserInfo")
	public ResponseEntity<?> selectUserInfo(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		try{
			PageRequest pageRequest = new PageRequest(Integer.parseInt(String.valueOf(args.getOrDefault("page", CmmnConstants.PAGE_NUMBER_INIT))),
				  Integer.parseInt(String.valueOf(args.getOrDefault("size", CmmnConstants.PAGE_SIZE))),
				  CmmnUtils.getOrders(args, new Sort(Sort.Direction.DESC, "useYn")));
			CpsUserInfoVO list = userManagementService.getUserOne(NumberUtils.createBigDecimal(String.valueOf(args.get("userKey"))));
			list.setUserPw(CmmnUtils.encryptBase64("DEC", String.valueOf(list.getUserPw()), "UTF-8"));
			return new ResponseEntity<>(list, HttpStatus.OK);
		}catch (Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveUser")
	public ResponseEntity<?> saveUser(HttpServletRequest request, @RequestBody Map args) throws Exception{
		try{
			Map<String, Object> convertMap = CmmnUtils.convertMapSourceToMap(args, "userInfo");
			CpsUserInfoVO vo = CmmnUtils.convertMapToBean(convertMap, CpsUserInfoVO.class);

			CpsUserInfoVO returnVO = userManagementService.saveUserInfoAll(vo, request);
			return new ResponseEntity<>(returnVO, HttpStatus.CREATED);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveSetMenu")
	public ResponseEntity<?> saveSetMenu(HttpServletRequest request, @RequestBody Map args) throws Exception{
		HttpSession session = request.getSession(true);
		String serverGubun 	= this.currentProfile();
		String serverIpAddr = CmmnUtils.getServerIpAddr();
		String setMenu 		= args.containsKey("setMenu") ? String.valueOf(args.get("setMenu")).trim() : "";

		try{
			CpsUserInfoVO userInfoVO;
			CpsUserInfoVO userInfoVOResult;
			userInfoVO = userManagementService.getUserOne(NumberUtils.createBigDecimal(String.valueOf(args.get("userKey"))));
			if(!CmmnUtils.isNull(setMenu)){
				userInfoVO.setSetMenu(setMenu);
			}
			userInfoVOResult = userInfoDao.save(userInfoVO);

			session.setAttribute(CmmnConstants.SESSION_ID, NumberUtils.createBigDecimal(String.valueOf(args.get("userKey"))));
			session.setAttribute(CmmnConstants.SESSION_GRADE, userInfoVO.getUserGradeA());
			session.setAttribute(CmmnConstants.SESSION_GRADE_B, userInfoVO.getUserGradeB());
			session.setAttribute(CmmnConstants.SESSION_USERNAME, userInfoVO.getUserName());
			session.setAttribute(CmmnConstants.SESSION_MAIL, userInfoVO.getUserEmail());
			session.setAttribute(CmmnConstants.SESSION_USER_PHONE, userInfoVO.getUserPhone());
			session.setAttribute(CmmnConstants.SESSION_TAXNO, userInfoVO.getSetSaup());
			session.setAttribute(CmmnConstants.SESSION_SANGHO, userInfoVO.getSetSangho());
			session.setAttribute(CmmnConstants.SESSION_MENU, userInfoVO.getSetMenu());
			session.setAttribute(CmmnConstants.SESSION_LOGO, userInfoVO.getUserLogo());
			session.setAttribute(CmmnConstants.SESSION_DEFAULTDB, userInfoVO.getDefaultDB());
			session.setAttribute(CmmnConstants.SESSION_DEFAULT_RMS_DB, CmmnUtils.stringContainsItemFromList(userInfoVO.getUserGradeB(), new String[]{"DEMO"}) ? "demoRms" : "rms");
			session.setAttribute(CmmnConstants.SESSION_SERVER_GUBUN, serverGubun);
			session.setAttribute(CmmnConstants.SESSION_SERVER_IP, serverIpAddr);
			session.setAttribute(CmmnConstants.SESSION_KEY, session.getId());

			return new ResponseEntity<>(userInfoVOResult, HttpStatus.CREATED);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveSetCom")
	public ResponseEntity<?> saveSetCom(HttpServletRequest request, @RequestBody Map args) throws Exception{
		HttpSession session = request.getSession(true);
		String serverGubun 	= this.currentProfile();
		String serverIpAddr = CmmnUtils.getServerIpAddr();
		String setSangho 	= args.containsKey("setSangho") ? String.valueOf(args.get("setSangho")).trim() : "";
		String setSaup 		= args.containsKey("setSaup") ? String.valueOf(args.get("setSaup")).trim() : "";
		String setDb 		= args.containsKey("setDb") ? String.valueOf(args.get("setDb")).trim() : "";

		try{
			CpsUserInfoVO userInfoVO;
			CpsUserInfoVO userInfoVOResult;
			userInfoVO = userManagementService.getUserOne(NumberUtils.createBigDecimal(String.valueOf(args.get("userKey"))));

			if(setSangho.equals("")){
				userInfoVO.setSetSangho("");
			}else{
				userInfoVO.setSetSangho(setSangho);
			}
			if(setSaup.equals("")){
				userInfoVO.setSetSaup("");
			}else{
				userInfoVO.setSetSaup(setSaup);
			}
			if(setDb.equals("")){
				userInfoVO.setDefaultDB("");
			}else{
				userInfoVO.setDefaultDB(setDb);
			}
			userInfoVOResult = userInfoDao.save(userInfoVO);

			session.setAttribute(CmmnConstants.SESSION_ID, NumberUtils.createBigDecimal(String.valueOf(args.get("userKey"))));
			session.setAttribute(CmmnConstants.SESSION_GRADE, userInfoVO.getUserGradeA());
			session.setAttribute(CmmnConstants.SESSION_GRADE_B, userInfoVO.getUserGradeB());
			session.setAttribute(CmmnConstants.SESSION_USERNAME, userInfoVO.getUserName());
			session.setAttribute(CmmnConstants.SESSION_MAIL, userInfoVO.getUserEmail());
			session.setAttribute(CmmnConstants.SESSION_USER_PHONE, userInfoVO.getUserPhone());
			session.setAttribute(CmmnConstants.SESSION_TAXNO, userInfoVO.getSetSaup());
			session.setAttribute(CmmnConstants.SESSION_SANGHO, userInfoVO.getSetSangho());
			session.setAttribute(CmmnConstants.SESSION_MENU, userInfoVO.getSetMenu());
			session.setAttribute(CmmnConstants.SESSION_LOGO, userInfoVO.getUserLogo());
			session.setAttribute(CmmnConstants.SESSION_DEFAULTDB, userInfoVO.getDefaultDB());
			session.setAttribute(CmmnConstants.SESSION_DEFAULT_RMS_DB, CmmnUtils.stringContainsItemFromList(userInfoVO.getUserGradeB(), new String[]{"DEMO"}) ? "demoRms" : "rms");
			session.setAttribute(CmmnConstants.SESSION_SERVER_GUBUN, serverGubun);
			session.setAttribute(CmmnConstants.SESSION_SERVER_IP, serverIpAddr);
			session.setAttribute(CmmnConstants.SESSION_KEY, session.getId());

			return new ResponseEntity<>(userInfoVOResult, HttpStatus.CREATED);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveSetAdmin")
	public ResponseEntity<?> saveSetAdmin(HttpServletRequest request, @RequestBody Map args) throws Exception{
		HttpSession session = request.getSession(true);
		String serverGubun 	= this.currentProfile();
		String serverIpAddr = CmmnUtils.getServerIpAddr();
		String setSangho 	= args.containsKey("setSangho") ? String.valueOf(args.get("setSangho")).trim() : "";
		String setSaup 		= args.containsKey("setSaup") ? String.valueOf(args.get("setSaup")).trim() : "";
		String defaultDB 	= args.containsKey("defaultDB") ? String.valueOf(args.get("defaultDB")).trim() : "";

		try{
			CpsUserInfoVO userInfoVO;
			CpsUserInfoVO userInfoVOResult;
			userInfoVO = userManagementService.getUserOne(NumberUtils.createBigDecimal(String.valueOf(args.get("userKey"))));
			if(setSangho.equals("")){
				userInfoVO.setSetSangho("");
			}else{
				userInfoVO.setSetSangho(setSangho);
			}
			if(setSaup.equals("")){
				userInfoVO.setSetSaup("");
			}else{
				userInfoVO.setSetSaup(setSaup);
			}
			if(!CmmnUtils.isNull(defaultDB)){
				userInfoVO.setDefaultDB(defaultDB);
			}
			userInfoVOResult = userInfoDao.save(userInfoVO);

			session.setAttribute(CmmnConstants.SESSION_ID, NumberUtils.createBigDecimal(String.valueOf(args.get("userKey"))));
			session.setAttribute(CmmnConstants.SESSION_GRADE, userInfoVO.getUserGradeA());
			session.setAttribute(CmmnConstants.SESSION_GRADE_B, userInfoVO.getUserGradeB());
			session.setAttribute(CmmnConstants.SESSION_USERNAME, userInfoVO.getUserName());
			session.setAttribute(CmmnConstants.SESSION_MAIL, userInfoVO.getUserEmail());
			session.setAttribute(CmmnConstants.SESSION_USER_PHONE, userInfoVO.getUserPhone());
			session.setAttribute(CmmnConstants.SESSION_TAXNO, userInfoVO.getSetSaup());
			session.setAttribute(CmmnConstants.SESSION_SANGHO, userInfoVO.getSetSangho());
			session.setAttribute(CmmnConstants.SESSION_MENU, userInfoVO.getSetMenu());
			session.setAttribute(CmmnConstants.SESSION_LOGO, userInfoVO.getUserLogo());
			session.setAttribute(CmmnConstants.SESSION_DEFAULTDB, userInfoVO.getDefaultDB());
			session.setAttribute(CmmnConstants.SESSION_DEFAULT_RMS_DB, CmmnUtils.stringContainsItemFromList(userInfoVO.getUserGradeB(), new String[]{"DEMO"}) ? "demoRms" : "rms");
			session.setAttribute(CmmnConstants.SESSION_SERVER_GUBUN, serverGubun);
			session.setAttribute(CmmnConstants.SESSION_SERVER_IP, serverIpAddr);
			session.setAttribute(CmmnConstants.SESSION_KEY, session.getId());

			return new ResponseEntity<>(userInfoVOResult, HttpStatus.CREATED);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/selectUserList")
	@ResponseBody
	public ResponseEntity<?> selectUserList(HttpServletRequest request, @RequestBody Map args){
		try{
			List<CpsUserInfoVO> selectUserList = userManagementService.selectUserList(args);

			return new ResponseEntity<>(selectUserList, HttpStatus.OK);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	private String currentProfile(){
		String[] profiles = subContext.getEnvironment().getActiveProfiles();
		if(profiles.length == 0){
			profiles = subContext.getEnvironment().getDefaultProfiles();
		}
		return profiles[0].toUpperCase();
	}

	@RequestMapping(value = "/saveLogout")
	public ResponseEntity<?> saveLogout(HttpServletRequest request, @RequestBody Map args) throws Exception{
		String email 			= String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_MAIL));
		String name				= String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
		String serverIpAddr 	= CmmnUtils.getServerIpAddr();
		String clientIpAddr 	= CmmnUtils.getClientIpAddr(request);
		String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

		try{
			CpsLogAccessVO voResult;
			CpsLogAccessVO logAccessVO = new CpsLogAccessVO();
			logAccessVO.setUserEmail(email);
			logAccessVO.setServerIp(serverIpAddr);
			logAccessVO.setClientIp(clientIpAddr);
			logAccessVO.setAction("로그아웃");
			logAccessVO.setSessionId("");
			logAccessVO.setAddUserEmail(email);
			logAccessVO.setAddUserName(name);
			logAccessVO.setAddDtm(currentDatetime);
			voResult = logAccessDao.save(logAccessVO);
			return new ResponseEntity<>(voResult, HttpStatus.CREATED);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/checkSessionOut")
	public ResponseEntity<?> checkSessionOut(HttpServletRequest request, @RequestBody Map args) throws Exception{
		String email 	 = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_MAIL));
		String sessionId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_KEY));

		CpsLogAccessVO CpsLogAccessDoubleVO = new CpsLogAccessVO();
		CpsLogAccessDoubleVO = logAccessDao.findTop1ByUserEmailAndSessionIdOrderByLogKeyDesc(email,sessionId);

		try{
			Map map = new HashMap();
			if(CpsLogAccessDoubleVO.getAction().equals("로그아웃")){
				map.put("check", "Y");
			}else{
				map.put("check", "N");
			}
			return new ResponseEntity<>(map, HttpStatus.CREATED);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/updatePw")
	public ResponseEntity<?> updatePw(HttpServletRequest request, @RequestBody Map args){
		if(CmmnUtils.isNull(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID)))
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

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

		try{
			Map map = new HashMap();
			CpsUserInfoVO list = userManagementService.getUserOne(NumberUtils.createBigDecimal(String.valueOf(args.get("userKey"))));
			if(String.valueOf(args.get("userPw")).equals(CmmnUtils.encryptBase64("DEC", list.getUserPw(), "UTF-8"))){
				map.put("check", "N");
			}else{
				list.setUserPw(String.valueOf(args.get("userPw")));
				list.setChangePwDtm(sbDate.toString());
				userManagementService.saveUserInfo(list, request);
				map.put("check", "Y");
			}
			return new ResponseEntity<>(map, HttpStatus.CREATED);
		}catch (Exception e){
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/saveSetField")
	public ResponseEntity<?> saveSetField(HttpServletRequest request, @RequestBody Map args) throws Exception{
		HttpSession session = request.getSession(true);
		String serverGubun 	= this.currentProfile();
		String serverIpAddr = CmmnUtils.getServerIpAddr();

		try{
			CpsUserInfoVO userInfoVO;
			CpsUserInfoVO userInfoVOResult = new CpsUserInfoVO();;
			userInfoVO = userManagementService.getUserOne(NumberUtils.createBigDecimal(String.valueOf(args.get("userKey"))));

			session.setAttribute(CmmnConstants.SESSION_ID, NumberUtils.createBigDecimal(String.valueOf(args.get("userKey"))));
			session.setAttribute(CmmnConstants.SESSION_GRADE, userInfoVO.getUserGradeA());
			session.setAttribute(CmmnConstants.SESSION_GRADE_B, userInfoVO.getUserGradeB());
			session.setAttribute(CmmnConstants.SESSION_USERNAME, userInfoVO.getUserName());
			session.setAttribute(CmmnConstants.SESSION_MAIL, userInfoVO.getUserEmail());
			session.setAttribute(CmmnConstants.SESSION_USER_PHONE, userInfoVO.getUserPhone());
			session.setAttribute(CmmnConstants.SESSION_TAXNO, userInfoVO.getSetSaup());
			session.setAttribute(CmmnConstants.SESSION_SANGHO, userInfoVO.getSetSangho());
			session.setAttribute(CmmnConstants.SESSION_MENU, userInfoVO.getSetMenu());
			session.setAttribute(CmmnConstants.SESSION_LOGO, userInfoVO.getUserLogo());
			session.setAttribute(CmmnConstants.SESSION_DEFAULTDB, userInfoVO.getDefaultDB());
			session.setAttribute(CmmnConstants.SESSION_DEFAULT_RMS_DB, CmmnUtils.stringContainsItemFromList(userInfoVO.getUserGradeB(), new String[]{"DEMO"}) ? "demoRms" : "rms");
			session.setAttribute(CmmnConstants.SESSION_SERVER_GUBUN, serverGubun);
			session.setAttribute(CmmnConstants.SESSION_SERVER_IP, serverIpAddr);
			session.setAttribute(CmmnConstants.SESSION_KEY, session.getId());

			return new ResponseEntity<>(userInfoVOResult, HttpStatus.CREATED);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/hrloginAction")
	public ModelAndView hrloginAction(HttpServletRequest request, HttpServletResponse response, @RequestParam Map args, ModelMap model) throws Exception{
		ModelAndView mv 		= new ModelAndView();
		HttpSession session 	= request.getSession(true);
		String userId 			= String.valueOf(args.get("userId"));
		String currentDate 		= CmmnUtils.getFormatedDate("yyyyMMdd");
		String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
		args.put("yyyymmdd",currentDate);

		String ip = request.getHeader("X-Forwarded-For");
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
		     ip = request.getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
		     ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
		     ip = request.getHeader("HTTP_CLIENT_IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
		     ip = request.getHeader("HTTP_X_FORWARDED_FOR");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
		     ip = request.getHeader("X-Real-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
		     ip = request.getHeader("X-RealIP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
		     ip = request.getRemoteAddr();
		}

		args.put("ip",ip);

		List<Map> list = userManagementService.getMsgUserList(args);

		if(list.size() < 1){
			// 접속실패로그
			CpsLogAccessVO logAccessVO = new CpsLogAccessVO();
			logAccessVO.setUserEmail(userId);
			logAccessVO.setAction("로그인실패");
			logAccessVO.setSessionId("seinhr");
			logAccessVO.setAddUserEmail(userId);
			logAccessVO.setAddUserName(userId);
			logAccessVO.setAddDtm(currentDatetime);
			logAccessDao.save(logAccessVO);

			mv.setViewName("redirect:./seinhr/loginCheck.cps");
			mv.addObject("resultMsg", "메신저를 켜세요.");
			return mv;
		}else{
			System.out.println("############"+ip);
			session.setAttribute(CmmnConstants.SESSION_ID, list.get(0).get("user_id"));
			session.setAttribute(CmmnConstants.SESSION_USERID, list.get(0).get("logon_cd"));
			session.setAttribute(CmmnConstants.SESSION_USERNAME, list.get(0).get("user_nm_kr"));

			int interval = 3600;
			session.setMaxInactiveInterval(interval);

			// 접속성공로그
			CpsLogAccessVO logAccessVO = new CpsLogAccessVO();
			logAccessVO.setUserEmail((String) list.get(0).get("logon_cd"));
			logAccessVO.setAction("로그인성공");
			logAccessVO.setSessionId(ip);
			logAccessVO.setAddUserEmail((String) list.get(0).get("logon_cd"));
			logAccessVO.setAddUserName((String) list.get(0).get("user_nm_kr"));
			logAccessVO.setAddDtm(currentDatetime);
			logAccessDao.save(logAccessVO);

			mv.setViewName("redirect:./seinhr/main.cps");

			return mv;
		}
	}
}