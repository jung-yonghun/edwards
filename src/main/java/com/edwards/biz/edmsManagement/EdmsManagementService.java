package com.edwards.biz.edmsManagement;

import com.edwards.biz.customsManagement.ImpoCustomsMapper;
import com.edwards.biz.edmsManagement.CpsEdmsFileDTO;
import com.edwards.biz.edmsManagement.CpsEdmsFileDao;
import com.edwards.biz.edmsManagement.CpsZeissFileDownDao;
import com.edwards.commons.CmmnConstants;
import com.edwards.commons.CmmnSpecs;
import com.edwards.commons.CmmnUtils;
import com.edwards.domains.CpsEdmsAttachFileVO;
import com.edwards.domains.CpsZeissFileDownVO;
import com.edwards.domains.EdmsAttachFileVO;
import com.edwards.domains.EdmsMasterVO;

import org.apache.commons.lang3.math.NumberUtils;
import org.apache.ibatis.session.SqlSession;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
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
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class EdmsManagementService {
	@Qualifier("SqlSessionTemplate")
	@Autowired
	private SqlSession sqlSession;
	@Autowired
	private EdmsMasterDao edmsMasterDao;
	@Autowired
	private EdmsFileDao edmsFileDao;
	@Autowired
	private CpsZeissFileDownDao cpsZeissFileDownDao;
	@Autowired
	private CpsEdmsFileDao cpsEdmsFileDao;

	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	private MessageSource messageSource;

	public List<Map> selectEdmsFileListNew(Map args) throws Exception{
		return sqlSession.getMapper(EdmsManagementMapper.class).selectEdmsFileListNew(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectEdmsFileList1(Map args) throws Exception{
		return sqlSession.getMapper(EdmsManagementMapper.class).selectEdmsFileList1(CmmnUtils.replaceMapSc(args));
	}

	public List<CpsEdmsAttachFileVO> selectEdmsFileList(Map args) throws Exception {
		BigDecimal SDAAKey 			= CmmnUtils.isContainsMapValue(args, "SDAAKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("SDAAKey"))) : null;
		String edmsParentGbn 		= args.containsKey("edmsParentGbn") ? String.valueOf(args.get("edmsParentGbn")) : null;
		String edmsJisaCode 		= args.containsKey("edmsJisaCode") ? String.valueOf(args.get("edmsJisaCode")) : null;
		String edmsMasterKey 		= args.containsKey("edmsMasterKey") ? String.valueOf(args.get("edmsMasterKey")) : null;
		String edmsMkey 			= args.containsKey("edmsMkey") ? String.valueOf(args.get("edmsMkey")) : null;
		String edmsNo 				= args.containsKey("edmsNo") ? String.valueOf(args.get("edmsNo")) : null;
		String edmsSingoNo 			= args.containsKey("edmsSingoNo") ? String.valueOf(args.get("edmsSingoNo")) : null;
		String commonYn 			= args.containsKey("commonYn") ? String.valueOf(args.get("commonYn")) : null;
		String edmsFileCategory 	= args.containsKey("edmsFileCategory") ? String.valueOf(args.get("edmsFileCategory")) : null;
		String edmsFileUploadType 	= args.containsKey("edmsFileUploadType") ? String.valueOf(args.get("edmsFileUploadType")) : null;
		String edmsSaveFileNm 		= args.containsKey("edmsSaveFileNm") ? String.valueOf(args.get("edmsSaveFileNm")) : null;
		String edmsOrgFileNm 		= args.containsKey("edmsOrgFileNm") ? String.valueOf(args.get("edmsOrgFileNm")) : null;
		String edmsFileStatus 		= args.containsKey("edmsFileStatus") ? String.valueOf(args.get("edmsFileStatus")) : null;
		String fromAddDay 			= args.containsKey("fromAddDay") ? String.valueOf(args.get("fromAddDay")) : null;
		String toAddDay 			= args.containsKey("toAddDay") ? String.valueOf(args.get("toAddDay")) : null;
		String edmsFileUserId 		= args.containsKey("edmsFileUserId") ? String.valueOf(args.get("edmsFileUserId")) : null;
		String useYn 				= "Y";
		ArrayList commonSearchList 	= new ArrayList();

		Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn"));

		if (!CmmnUtils.isNull(SDAAKey)) 			spec = spec.and(CmmnSpecs.eqNumberSpec(SDAAKey, "sDAAKey"));
		if (!CmmnUtils.isNull(edmsParentGbn)) 	    spec = spec.and(CmmnSpecs.eqStringSpec(edmsParentGbn, "edmsParentGbn"));
		if (!CmmnUtils.isNull(edmsJisaCode)) 		spec = spec.and(CmmnSpecs.eqStringSpec(edmsJisaCode, "edmsJisaCode"));
		if (!CmmnUtils.isNull(edmsMasterKey)) 		spec = spec.and(CmmnSpecs.eqStringSpec(edmsMasterKey, "edmsMasterKey"));
		if (!CmmnUtils.isNull(edmsMkey)) 			spec = spec.and(CmmnSpecs.eqStringSpec(edmsMkey, "edmsMkey"));
		if (!CmmnUtils.isNull(edmsNo)) 				spec = spec.and(CmmnSpecs.afterLikeStringSpec(edmsNo, "edmsNo"));
		if (!CmmnUtils.isNull(edmsSingoNo)) 		spec = spec.and(CmmnSpecs.afterLikeStringSpec(edmsSingoNo, "edmsSingoNo"));
		if (!CmmnUtils.isNull(commonYn)) 			spec = spec.and(CmmnSpecs.eqStringSpec(commonYn, "commonYn"));
		if (!CmmnUtils.isNull(edmsFileCategory)) 	spec = spec.and(CmmnSpecs.afterLikeStringSpec(edmsFileCategory, "edmsFileCategory"));
		if (!CmmnUtils.isNull(edmsFileUploadType)) 	spec = spec.and(CmmnSpecs.eqStringSpec(edmsFileUploadType, "edmsFileUploadType"));
		if (!CmmnUtils.isNull(edmsSaveFileNm)) 		spec = spec.and(CmmnSpecs.afterLikeStringSpec(edmsSaveFileNm, "edmsSaveFileNm"));
		if (!CmmnUtils.isNull(edmsOrgFileNm)) 		spec = spec.and(CmmnSpecs.eqStringSpec(edmsOrgFileNm, "edmsOrgFileNm"));
		if (!CmmnUtils.isNull(edmsFileStatus)) 		spec = spec.and(CmmnSpecs.eqStringSpec(edmsFileStatus, "edmsFileStatus"));

		if (!CmmnUtils.isNull(edmsFileUserId)) {
			commonSearchList.add("addUserId");
			commonSearchList.add("editUserId");
			spec = CmmnSpecs.inStringMapSpec(edmsFileUserId, commonSearchList, spec);
		}
		if (!CmmnUtils.isNull(fromAddDay) && !CmmnUtils.isNull(toAddDay)) spec = spec.and(CmmnSpecs.betweenObjectSpec(fromAddDay, toAddDay, "addDay"));

		Sort orders = new Sort(Sort.Direction.DESC, "sDAAKey").and(new Sort(Sort.Direction.DESC, "useYn"));

		return cpsEdmsFileDao.findAll(spec, orders);
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
	public CpsEdmsAttachFileVO saveEdmsFileAdditionalInfo(CpsEdmsFileDTO.additionalInfo additionalInfo, HttpServletRequest request) throws Exception {
		CpsEdmsAttachFileVO fileVO = cpsEdmsFileDao.findOne(additionalInfo.getSDAAKey());
		String userId 			= String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
		String userName 		= String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
		String currentDatetime 	= CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

		if(additionalInfo.getEdmsFileCategory().equals("B0001")){
			fileVO.setEdmsFileCategory(additionalInfo.getEdmsFileCategory());
			fileVO.setCommonYn("N");
		}else{
			fileVO.setEdmsFileCategory(additionalInfo.getEdmsFileCategory());
			fileVO.setCommonYn("Y");
		}
		fileVO.setEditUserId(userId);
		fileVO.setEditUserNm(userName);
		fileVO.setEditDtm(currentDatetime);

		CpsEdmsAttachFileVO returnVO = cpsEdmsFileDao.save(fileVO);

		return returnVO;
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
	public CpsEdmsAttachFileVO saveEdmsFileInfo(CpsEdmsAttachFileVO CpsEdmsAttachFileVO, HttpServletRequest request) throws Exception{
		CpsEdmsAttachFileVO returnVO = cpsEdmsFileDao.save(CpsEdmsAttachFileVO);

		return returnVO;
	}

	public List<Map> selectEdmsFileCountList(Map args) throws Exception{
		return sqlSession.getMapper(EdmsManagementMapper.class).selectEdmsFileCountList(CmmnUtils.replaceMapSc(args));
	}

	public List<CpsZeissFileDownVO> selectZeissFileList(Map args) throws Exception {
		String edmsFileKey = args.containsKey("edmsFileKey") ? String.valueOf(args.get("edmsFileKey")) : null;
		String edmsSingoNum = args.containsKey("edmsSingoNum") ? String.valueOf(args.get("edmsSingoNum")) : null;
		String useYn = "Y";
System.out.println("##########"+edmsFileKey);
System.out.println("##########"+edmsSingoNum);
		//검색조건(필수:useYn)
		Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn"));
		//검색조건
		if (!CmmnUtils.isNull(edmsFileKey)) spec = spec.and(CmmnSpecs.eqStringSpec(edmsFileKey, "edmsFileKey"));
		if (!CmmnUtils.isNull(edmsSingoNum)) spec = spec.and(CmmnSpecs.eqStringSpec(edmsSingoNum, "edmsSingoNum"));

		return cpsZeissFileDownDao.findAll(spec);
	}







  /**
   * Gets edms master list.(edmsMaster 조회)
   *
   * @param args the args
   * @return the edms master list
   * @throws Exception the exception
   */
  public List<EdmsMasterVO> getEdmsMasterList(Map args) throws Exception {
	BigDecimal edmsKey = CmmnUtils.isContainsMapValue(args, "edmsKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("edmsKey"))) : null;
	String edmsGubun = args.containsKey("edmsGubun") ? String.valueOf(args.get("edmsGubun")) : null;
	String edmsUploadType = args.containsKey("edmsUploadType") ? String.valueOf(args.get("edmsUploadType")) : null;
	String edmsNum = args.containsKey("edmsNum") ? String.valueOf(args.get("edmsNum")) : null;
	String jisaCode = args.containsKey("jisaCode") ? String.valueOf(args.get("jisaCode")) : null;
	String teamCode = args.containsKey("teamCode") ? String.valueOf(args.get("teamCode")) : null;
	String edmsStatus = args.containsKey("edmsStatus") ? String.valueOf(args.get("edmsStatus")) : null;
	BigDecimal edmsComKey = CmmnUtils.isContainsMapValue(args, "edmsComKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("edmsComKey"))) : null;
	String edmsComName = args.containsKey("edmsComName") ? String.valueOf(args.get("edmsComName")) : null;
	String edmsComCode = args.containsKey("edmsComCode") ? String.valueOf(args.get("edmsComCode")) : null;
	String edmsComNum = args.containsKey("edmsComNum") ? String.valueOf(args.get("edmsComNum")) : null;
	String _DateType = args.containsKey("_DateType") ? String.valueOf(args.get("_DateType")) : null; // addDay,editDay,iphangDay,banipDay,singoDay,suriDay,banchulDay
	String strFromDate = args.containsKey("strFromDate") ? String.valueOf(args.get("strFromDate")) : null;
	String strToDate = args.containsKey("strToDate") ? String.valueOf(args.get("strToDate")) : null;
	String edmsMasterUserId = args.containsKey("edmsMasterUserId") ? String.valueOf(args.get("edmsMasterUserId")) : null;
	String edmsMasterUserName = args.containsKey("edmsMasterUserName") ? String.valueOf(args.get("edmsMasterUserName")) : null;
	String singoNum = args.containsKey("singoNum") ? String.valueOf(args.get("singoNum")) : null;
	String divisionSingoYn = args.containsKey("divisionSingoYn") ? String.valueOf(args.get("divisionSingoYn")) : null;
	String edmsMrn = args.containsKey("edmsMrn") ? String.valueOf(args.get("edmsMrn")) : null;
	String edmsMsn = args.containsKey("edmsMsn") ? String.valueOf(args.get("edmsMsn")) : null;
	String useYn = args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "";
	ArrayList commonSearchList = new ArrayList();

	//검색조건(필수:useYn)
	Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn")).and(CmmnSpecs.eqStringSpec(edmsComNum, "edmsComNum"));
	//검색조건
	if (!CmmnUtils.isNull(edmsKey)) spec = spec.and(CmmnSpecs.eqNumberSpec(edmsKey, "edmsKey"));
	if (!CmmnUtils.isNull(edmsGubun)) spec = spec.and(CmmnSpecs.eqStringSpec(edmsGubun, "edmsGubun"));
	if (!CmmnUtils.isNull(edmsUploadType)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(edmsUploadType, "edmsUploadType"));
	if (!CmmnUtils.isNull(edmsNum)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(edmsNum, "edmsNum"));
	if (!CmmnUtils.isNull(jisaCode)) spec = spec.and(CmmnSpecs.eqStringSpec(jisaCode, "jisaCode"));
	if (!CmmnUtils.isNull(teamCode)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(teamCode, "teamCode"));
	if (!CmmnUtils.isNull(edmsStatus)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(edmsStatus, "edmsStatus"));
	if (!CmmnUtils.isNull(edmsComKey)) spec = spec.and(CmmnSpecs.eqNumberSpec(edmsComKey, "edmsComKey"));
	if (!CmmnUtils.isNull(edmsComName)) spec = spec.and(CmmnSpecs.bothLikeStringSpec(edmsComName, "edmsComName"));
	if (!CmmnUtils.isNull(edmsComCode)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(edmsComCode, "edmsComCode"));
	if (!CmmnUtils.isNull(edmsComNum)) spec = spec.and(CmmnSpecs.eqStringSpec(edmsComNum, "edmsComNum"));
	if (!CmmnUtils.isNull(singoNum)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(singoNum, "singoNum"));
	if (!CmmnUtils.isNull(divisionSingoYn)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(divisionSingoYn, "divisionSingoYn"));
	if (!CmmnUtils.isNull(edmsMrn)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(edmsMrn, "edmsMrn"));
	if (!CmmnUtils.isNull(edmsMsn)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(edmsMsn, "edmsMsn"));
	if (!CmmnUtils.isNull(edmsMasterUserId)) {
	  commonSearchList.clear();
	  commonSearchList.add("addUserId");
	  commonSearchList.add("editUserId");
	  spec = CmmnSpecs.inStringMapSpec(edmsMasterUserId, commonSearchList, spec);
	}
	if (!CmmnUtils.isNull(edmsMasterUserName)) {
	  commonSearchList.clear();
	  commonSearchList.add("addUserName");
	  commonSearchList.add("editUserName");
	  spec = CmmnSpecs.inStringMapSpec(edmsMasterUserName, commonSearchList, spec);
	}
	if (!CmmnUtils.isNull(_DateType) && !CmmnUtils.isNull(strFromDate) && !CmmnUtils.isNull(strToDate))
	  spec = spec.and(CmmnSpecs.betweenObjectSpec(strFromDate, strToDate, _DateType));

	Sort orders = new Sort(Sort.Direction.DESC, "useYn").and(new Sort(Sort.Direction.ASC, "edmsKey"));

	return edmsMasterDao.findAll(spec, orders);
  }

  /**
   * Gets edms is master.(edmsGubun별 마스터 존재여부)
   *
   * @param args the args
   * @return the edms is master
   * @throws Exception the exception
   */
  public EdmsMasterVO getEdmsIsMaster(Map args) throws Exception {
	EdmsMasterVO returnVO = null;
	String edmsGubun = args.containsKey("edmsGubun") ? String.valueOf(args.get("edmsGubun")) : "";
	BigDecimal edmsComKey = CmmnUtils.isContainsMapValue(args, "edmsComKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("edmsComKey"))) : null;

	switch (edmsGubun) {
	  case "IMPORT":
	  case "EXPORT":
		String edmsNum = args.containsKey("edmsNum") ? String.valueOf(args.get("edmsNum")) : null;
		String singoNum = args.containsKey("singoNum") ? String.valueOf(args.get("singoNum")) : null;
		if (!CmmnUtils.isNull(edmsComKey) && !CmmnUtils.isNull(edmsNum)) {
		  // 구분,거래처키,체크번호(IM:BL/EX:INV),사용여부
		  returnVO = edmsMasterDao.findTop1ByEdmsGubunAndEdmsComKeyAndSingoNumAndUseYnOrderByEdmsKey(edmsGubun, edmsComKey, singoNum, "Y");
		}
		break;
	  default: //NOTCLASS,SEINETC,HWANGUP,기타(요건) 등등
		String jisaCode = args.containsKey("jisaCode") ? String.valueOf(args.get("jisaCode")) : null;
		if (!CmmnUtils.isNull(edmsComKey) && !CmmnUtils.isNull(jisaCode)) {
		  // 구분,지사,거래처키,사용여부
		  returnVO = edmsMasterDao.findByEdmsGubunAndJisaCodeAndEdmsComKeyAndUseYn(edmsGubun, jisaCode, edmsComKey, "Y");
		}
		break;
	}
	return returnVO;
  }

  /**
   * Save edms master edms master vo.(edmsMaster 저장)
   *
   * @param edmsMasterVO the edms master vo
   * @param request      the request
   * @return the edms master vo
   * @throws Exception the exception
   */
  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public EdmsMasterVO saveEdmsMaster(EdmsMasterVO edmsMasterVO, HttpServletRequest request) throws Exception {
	// 관리번호
	if (edmsMasterVO.getEdmsManagementNum().equals("00000000000000")) {
	  edmsMasterVO.setEdmsManagementNum(null);
	}
	if (CmmnUtils.isNull(edmsMasterVO.getEdmsManagementNum()) && CmmnUtils.isNull(edmsMasterVO.getEdmsKey()) && !CmmnUtils.isNull(edmsMasterVO.getAddDay())) {
	  edmsMasterVO.setEdmsManagementNum(getEdmsMasterManagementNumber(edmsMasterVO.getAddDay(), "0", 6));
	}
	// 수출입 통관정보
	String edmsGubun = edmsMasterVO.getEdmsGubun();
	if (edmsGubun.equals("EXPORT")) {
	  edmsMasterVO = getEdmsMasterByExport(edmsMasterVO);
	} else if (edmsGubun.equals("IMPORT")) {
	  edmsMasterVO = getEdmsMasterByImport(edmsMasterVO);
	}

	EdmsMasterVO returnVO = edmsMasterDao.save(edmsMasterVO);

	return returnVO;
  }

  /**
   * Save edms master list list.
   *
   * @param edmsMasterVOList the edms master vo list
   * @param request          the request
   * @return the list
   * @throws Exception the exception
   */
  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public List<EdmsMasterVO> saveEdmsMasterList(List<EdmsMasterVO> edmsMasterVOList, HttpServletRequest request) throws Exception {
	List<EdmsMasterVO> returnVoList = new ArrayList<>();
	String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
	String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
	for (EdmsMasterVO vo : edmsMasterVOList) {
	  // 관리번호
	  if (vo.getEdmsManagementNum().equals("00000000000000")) {
		vo.setEdmsManagementNum(null);
	  }
	  if (CmmnUtils.isNull(vo.getEdmsManagementNum()) && CmmnUtils.isNull(vo.getEdmsKey()) && !CmmnUtils.isNull(vo.getAddDay())) {
		vo.setEdmsManagementNum(getEdmsMasterManagementNumber(vo.getAddDay(), "0", 6));
	  }
	  // validation
	  EdmsMasterVO validateVO = modelMapper.map(vo, EdmsMasterVO.class);
	  validateVO.setAddUserId(userId);
	  validateVO.setAddUserName(userNm);
	  validateVO.setEditUserId(userId);
	  validateVO.setEditUserName(userNm);
	  Set<ConstraintViolation<EdmsMasterVO>> validator = CmmnUtils.isCommonValid(validateVO);
	  if (validator.size() > 0) {
		Object[] parameter = validator.toArray();
		throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
	  }
	  // 수출입 통관정보
	  String edmsGubun = vo.getEdmsGubun();
	  if (edmsGubun.equals("EXPORT")) {
		vo = getEdmsMasterByExport(vo);
	  } else if (edmsGubun.equals("IMPORT")) {
		vo = getEdmsMasterByImport(vo);
	  }
	  returnVoList.add(edmsMasterDao.save(vo));
	}

	return returnVoList;
  }

  /**
   * Save edms master for file upload edms master vo.(edms구분별 edmsMaster 저장. 파일업로드시)
   *
   * @param edmsMasterVO the edms master vo
   * @param externalKey  the external key
   * @param request      the request
   * @return the edms master vo
   * @throws Exception the exception
   */
  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public EdmsMasterVO saveEdmsMasterForFileUpload(EdmsMasterVO edmsMasterVO, BigDecimal externalKey, HttpServletRequest request) throws Exception {
	  EdmsMasterVO saveVO = modelMapper.map(edmsMasterVO, EdmsMasterVO.class);
		String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
		String userName = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
		String edmsGubun = edmsMasterVO.getEdmsGubun();
		EdmsMasterVO isEdmsMasterVO = null;

		if (CmmnUtils.isNull(edmsMasterVO.getEdmsManagementNum()) && CmmnUtils.isNull(edmsMasterVO.getEdmsKey()) && !CmmnUtils.isNull(edmsMasterVO.getAddDay())) {
		  edmsMasterVO.setEdmsManagementNum(getEdmsMasterManagementNumber(edmsMasterVO.getAddDay(), "0", 6));
		  //edmsMasterVO.setEdmsManagementNum("ED000000000000");
		}
		switch (edmsGubun) {
		  case "IMPORT":
		  case "EXPORT":
		  case "HWANGUP":
		  case "SEINETC":
			// 마스터 구분,거래처키,체크번호(IM:BL/EX:INV),사용여부 체크
			isEdmsMasterVO = edmsMasterDao.findTop1ByEdmsGubunAndEdmsComKeyAndEdmsNumAndUseYnOrderByEdmsKey(edmsMasterVO.getEdmsGubun(), edmsMasterVO.getEdmsComKey(), edmsMasterVO.getEdmsNum(), "Y");
			break;
		  default: //NOTCLASS,SEINETC,HWANGUP,기타(요건) 등등
			// 마스터 구분,지사,거래처키,사용여부 체크
			isEdmsMasterVO = edmsMasterDao.findByEdmsGubunAndJisaCodeAndEdmsComKeyAndUseYn(edmsMasterVO.getEdmsGubun(), edmsMasterVO.getJisaCode(), edmsMasterVO.getEdmsComKey(), "Y");
			break;
		}
		// 기 저장된 내용이 있으면
		if (!CmmnUtils.isNull(isEdmsMasterVO)) {
		  saveVO = modelMapper.map(isEdmsMasterVO, EdmsMasterVO.class);
		  saveVO.setEditDay(edmsMasterVO.getEditDay());
		  saveVO.setEditUserId(userId);
		  saveVO.setEditUserName(userName);
		  saveVO.setEditDate(new Date());
		  // 수입은 api정보 업데이트, 수출은 ncustoms.expo1 상태 업데이트==> 2017-05-12 수출입 모두 통관에서 가져옴
		  if (edmsGubun.equals("IMPORT")) {
			saveVO.setEdmsStatus(edmsMasterVO.getEdmsStatus());
			saveVO.setIphangDay(edmsMasterVO.getIphangDay());
			saveVO.setBanipDay(edmsMasterVO.getBanipDay());
			saveVO.setSingoDay(edmsMasterVO.getSingoDay());
			saveVO.setSuriDay(edmsMasterVO.getSuriDay());
			saveVO.setBanchulDay(edmsMasterVO.getBanchulDay());
//			saveVO = getEdmsMasterByImport(edmsMasterVO);
		  } else if (edmsGubun.equals("EXPORT")) {
			saveVO = getEdmsMasterByExport(saveVO);
		  }
		}
		EdmsMasterVO returnVO = edmsMasterDao.save(saveVO);

		return returnVO;
  }

  /**
   * Gets edms master by import.
   *
   * @param edmsMasterVO the edms master vo
   * @return the edms master by import
   */
  public EdmsMasterVO getEdmsMasterByImport(EdmsMasterVO edmsMasterVO) {
	String edmsNum = edmsMasterVO.getEdmsNum();
	String edmsSingoNum = edmsMasterVO.getSingoNum();
	String jisaCode = edmsMasterVO.getJisaCode();
	String edmsStatus = edmsMasterVO.getEdmsStatus();
	String edmsComNum = edmsMasterVO.getEdmsComNum();
	// 제외해야할 상태 없음(기간제한있음)
	if (!CmmnUtils.isNull(edmsNum) && !CmmnUtils.isNull(edmsSingoNum) && !CmmnUtils.isNull(jisaCode) && !CmmnUtils.isNull(edmsComNum)) {
	  Map args = new HashMap();
	  args.put("_defaultDB", jisaCode);
	  args.put("impoBlNo", edmsNum);
	  if (!CmmnUtils.isNull(edmsSingoNum)) {
		args.put("impoSingoNo", edmsSingoNum);
	  }
	  args.put("impoNapseSaup", edmsComNum);
	  args.put("_dateLimit", "Y");
	  Map returnBlNoStatus = sqlSession.getMapper(EdmsManagementMapper.class).findImpoBlNoStatus(CmmnUtils.replaceMapSc(args));
	  if (!CmmnUtils.isNull(returnBlNoStatus) && returnBlNoStatus.size() == 1) {
		edmsMasterVO.setSingoNum(String.valueOf(returnBlNoStatus.get("impoSingoNo")));
		edmsMasterVO.setEdmsMrn(String.valueOf(returnBlNoStatus.get("impoMrnNo")));
		edmsMasterVO.setEdmsMsn(String.valueOf(returnBlNoStatus.get("impoMblNo")));
	  }
	}
	return edmsMasterVO;
  }

  /**
   * Gets edms master by export.
   *
   * @param edmsMasterVO the edms master vo
   * @return the edms master by export
   */
  public EdmsMasterVO getEdmsMasterByExport(EdmsMasterVO edmsMasterVO) {
	String edmsNum = edmsMasterVO.getEdmsNum();
	String jisaCode = edmsMasterVO.getJisaCode();
	String edmsStatus = edmsMasterVO.getEdmsStatus();
	String edmsComNum = edmsMasterVO.getEdmsComNum();
	if (!Arrays.asList("수리", "취소", "취하").contains(edmsStatus)) {
	  if (!CmmnUtils.isNull(edmsNum) && !CmmnUtils.isNull(jisaCode) && !CmmnUtils.isNull(edmsComNum)) {
		Map args = new HashMap();
		args.put("_defaultDB", jisaCode);
		args.put("expoIvNo", edmsNum);
		args.put("expoSuchulSaupNo", edmsComNum);
		Map returnInvoiceStatus = sqlSession.getMapper(EdmsManagementMapper.class).findExpoInvoiceStatus(CmmnUtils.replaceMapSc(args));
		if (!CmmnUtils.isNull(returnInvoiceStatus)) {
		  edmsMasterVO.setEdmsStatus(String.valueOf(returnInvoiceStatus.get("expoResResult")));
		  edmsMasterVO.setSingoNum(String.valueOf(returnInvoiceStatus.get("expoSingoNo")));
		  edmsMasterVO.setSingoDay(String.valueOf(returnInvoiceStatus.get("expoSingoDate")));
		  edmsMasterVO.setSuriDay(String.valueOf(returnInvoiceStatus.get("expoOkDate")));
		}
	  }
	}
	return edmsMasterVO;
  }

  /**
   * Gets edms master with file list.(edms 마스터X파일 리스트)
   *
   * @param args the args
   * @return the edms master with file list
   */


  public List<Map> getEdmsMasterWithFileList1(Map args) {
	return sqlSession.getMapper(EdmsManagementMapper.class).findEdmsMasterWithFileList1(CmmnUtils.replaceMapSc(args));
  }

  /**
   * Gets edms master with not classification file list.(edms 마스터X미구분파일 리스트)
   *
   * @param args the args
   * @return the edms master with not classification file list
   */
  public List<Map> getEdmsMasterWithNotClassificationFileList(Map args) {
	return sqlSession.getMapper(EdmsManagementMapper.class).findEdmsMasterWithNotClassificationFileList(CmmnUtils.replaceMapSc(args));
  }

  /**
   * Gets edms master status group count list.(edms 마스터 상태 그룹별 리스트)
   *
   * @param args the args
   * @return the edms master status group count list
   */
  public List<Map> getEdmsMasterStatusGroupCountList(Map args) {
	return sqlSession.getMapper(EdmsManagementMapper.class).findEdmsMasterStatusGroupCountList(CmmnUtils.replaceMapSc(args));
  }
  /* edmsMaster 끝 */


  /* edmsAttachFile 시작 */

  /**
   * Gets edms file list.(edmsFile 조회)
   *
   * @param args the args
   * @return the edms file list
   * @throws Exception the exception
   */
//  public List<EdmsAttachFileVO> getEdmsFileList(Map args) throws Exception {
//	BigDecimal edmsFileKey = CmmnUtils.isContainsMapValue(args, "edmsFileKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("edmsFileKey"))) : null;
//	String edmsParentGubun = args.containsKey("edmsParentGubun") ? String.valueOf(args.get("edmsParentGubun")) : null;
//	BigDecimal edmsParentKey = CmmnUtils.isContainsMapValue(args, "edmsParentKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("edmsParentKey"))) : null;
//	String edmsFileUploadType = args.containsKey("edmsFileUploadType") ? String.valueOf(args.get("edmsFileUploadType")) : null;
//	String edmsServerGubun = args.containsKey("edmsServerGubun") ? String.valueOf(args.get("edmsServerGubun")) : null;
//	String edmsSaveFileName = args.containsKey("edmsSaveFileName") ? String.valueOf(args.get("edmsSaveFileName")) : null;
//	String edmsOrgFileName = args.containsKey("edmsOrgFileName") ? String.valueOf(args.get("edmsOrgFileName")) : null;
//	String edmsFileCategory = args.containsKey("edmsFileCategory") ? String.valueOf(args.get("edmsFileCategory")) : null;
//	String edmsFileStatus = args.containsKey("edmsFileStatus") ? String.valueOf(args.get("edmsFileStatus")) : null;
//	String edmsSearchKeyword = args.containsKey("edmsSearchKeyword") ? String.valueOf(args.get("edmsSearchKeyword")) : null;
//	String edmsFileNote = args.containsKey("edmsFileNote") ? String.valueOf(args.get("edmsFileNote")) : null;
//	String fromAddDay = args.containsKey("fromAddDay") ? String.valueOf(args.get("fromAddDay")) : null;
//	String toAddDay = args.containsKey("toAddDay") ? String.valueOf(args.get("toAddDay")) : null;
//	String edmsFileUserId = args.containsKey("edmsFileUserId") ? String.valueOf(args.get("edmsFileUserId")) : null;
//	String useYn = args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "";
//	ArrayList commonSearchList = new ArrayList();
//
//	//검색조건(필수:useYn)
//	Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn"));
//	//검색조건
//	if (!CmmnUtils.isNull(edmsFileKey)) spec = spec.and(CmmnSpecs.eqNumberSpec(edmsFileKey, "edmsFileKey"));
//	if (!CmmnUtils.isNull(edmsParentGubun)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(edmsParentGubun, "edmsParentGubun"));
//	if (!CmmnUtils.isNull(edmsParentKey)) spec = spec.and(CmmnSpecs.eqNumberSpec(edmsParentKey, "edmsParentKey"));
//	if (!CmmnUtils.isNull(edmsFileCategory)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(edmsFileCategory, "edmsFileCategory"));
//	if (!CmmnUtils.isNull(edmsFileUploadType)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(edmsFileUploadType, "edmsFileUploadType"));
//	if (!CmmnUtils.isNull(edmsServerGubun)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(edmsServerGubun, "edmsServerGubun"));
//	if (!CmmnUtils.isNull(edmsSaveFileName)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(edmsSaveFileName, "edmsSaveFileName"));
//	if (!CmmnUtils.isNull(edmsOrgFileName)) spec = spec.and(CmmnSpecs.eqStringSpec(edmsOrgFileName, "edmsOrgFileName"));
//	if (!CmmnUtils.isNull(edmsFileStatus)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(edmsFileStatus, "edmsFileStatus"));
//	if (!CmmnUtils.isNull(edmsSearchKeyword)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(edmsSearchKeyword, "edmsSearchKeyword"));
//	if (!CmmnUtils.isNull(edmsFileNote)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(edmsFileNote, "edmsFileNote"));
//	if (!CmmnUtils.isNull(edmsFileUserId)) {
//	  commonSearchList.add("addUserId");
//	  commonSearchList.add("editUserId");
//	  spec = CmmnSpecs.inStringMapSpec(edmsFileUserId, commonSearchList, spec);
//	}
//	if (!CmmnUtils.isNull(fromAddDay) && !CmmnUtils.isNull(toAddDay)) spec = spec.and(CmmnSpecs.betweenObjectSpec(fromAddDay, toAddDay, "addDay"));
//
//	Sort orders = new Sort(Sort.Direction.DESC, "useYn").and(new Sort(Sort.Direction.ASC, "edmsFileKey"));
//
//	return edmsFileDao.findAll(spec, orders);
//  }

  public List<Map> getEdmsFileList1(Map args) throws Exception {
	  return sqlSession.getMapper(EdmsManagementMapper.class).findEdmsFileList1(CmmnUtils.replaceMapSc(args));
  }

  /**
   * Gets edms file list.
   *
   * @param edmsParentKey    the edms parent key
   * @param edmsParentGubun  the edms parent gubun
   * @param edmsFileCategory the edms file category
   * @param useYn            the use yn
   * @return the edms file list
   * @throws Exception the exception
   */
//  public Integer getZeissFileList(String edmsFileKey, String edmsFileCategory, String useYn) throws Exception {
//	return cpsZeissFileDownDao.countByEdmsFileKeyAndEdmsFileCategoryAndUseYn(edmsFileKey, edmsFileCategory, "Y");
//  }

  /**
   * Save edms file info edms attach file vo.(edmsFile 저장)
   *
   * @param edmsAttachFileVO the edms attach file vo
   * @param request          the request
   * @return the edms attach file vo
   * @throws Exception the exception
   */
//  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
//  public EdmsAttachFileVO saveEdmsFileInfo(EdmsAttachFileVO edmsAttachFileVO, HttpServletRequest request) throws Exception {
//	EdmsAttachFileVO returnVO = edmsFileDao.save(edmsAttachFileVO);
//
//	return returnVO;
//  }

  /**
   * Save edms file list list.
   *
   * @param edmsAttachFileVOList the edms attach file vo list
   * @param request              the request
   * @return the list
   * @throws Exception the exception
   */
  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public List<EdmsAttachFileVO> saveEdmsFileList(List<EdmsAttachFileVO> edmsAttachFileVOList, HttpServletRequest request) throws Exception {
	List<EdmsAttachFileVO> returnVoList = new ArrayList<>();
	String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
	for (EdmsAttachFileVO vo : edmsAttachFileVOList) {
	  // validation
	  EdmsAttachFileVO validateVO = modelMapper.map(vo, EdmsAttachFileVO.class);
	  validateVO.setAddUserId(userId);
	  validateVO.setEditUserId(userId);
	  Set<ConstraintViolation<EdmsAttachFileVO>> validator = CmmnUtils.isCommonValid(validateVO);
	  if (validator.size() > 0) {
		Object[] parameter = validator.toArray();
		throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
	  }
	  returnVoList.add(edmsFileDao.save(vo));
	}
	return returnVoList;
  }

  /* edmsAttachFile 종료 */

  /**
   * Gets expo invoice list.(수출 INV 매핑을 하기 위한 ncustoms.Expo1 기준 INV 리스트)
   *
   * @param args the args
   * @return the expo invoice list
   */
  public List<Map> getExpoInvoiceList(Map args) {
	return sqlSession.getMapper(EdmsManagementMapper.class).findExpoInvoiceList(CmmnUtils.replaceMapSc(args));
  }

  /**
   * Fix edms not classification map.(edms 미분류 수정)
   * 미분류 수정시 기존 마스터 삭제(useYn:N) → 신규 마스터 저장(fixEdmsGubun)
   * 추가적으로 기존 마스터에 매핑된 전체 파일리스트 리턴
   *
   * @param edmsMasterVO    the edms master vo
   * @param fixEdmsGubun    the fix edms gubun
   * @param allFileTransfer the all file transfer
   * @param request         the request
   * @return the map
   * @throws Exception the exception
   */
//  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
//  public Map fixEdmsNotClassification(EdmsMasterVO edmsMasterVO, String fixEdmsGubun, String allFileTransfer, HttpServletRequest request) throws Exception {
//	Map returnMap = new HashMap();
//	EdmsMasterVO returnVO = null;
//	List<EdmsAttachFileVO> edmsAttachFileVOList = null;
//	EdmsMasterVO saveVO = modelMapper.map(edmsMasterVO, EdmsMasterVO.class);
//	String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
//	String userName = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
////	String defaultDB = String.valueOf(CmmnUtil.getUserInfo(request, CmmnConstants.SESSION_DEFAULTDB)); // TODO: 2016-11-10 지사별 미분류내역을 구분하고 하였으나 미분류 마스터구분은 유일하게 생성하도록 처리
//	String defaultDB = "ncustoms"; // TODO: 2016-11-10 해당 내역은 주석처리하고, ncustoms로 고정함(바뀔 가능성 농후)
//
//	if (fixEdmsGubun.equals("IMPORT") || fixEdmsGubun.equals("EXPORT") || fixEdmsGubun.equals("SEINETC") || fixEdmsGubun.equals("HWANGUP")) {
//	  if (CmmnUtils.isNull(edmsMasterVO.getEdmsComKey()) || CmmnUtils.isNull(edmsMasterVO.getEdmsNum())) {
//		throw new Exception("파라메터확인");
//	  }
//
//	  // TODO: 2017-05-16 동일거래처 수입(BL)/수출(INV) 존재시 전환 불가
//	  List<EdmsMasterVO> isMasterSameEdmsNumVOList = edmsMasterDao.findByEdmsGubunAndEdmsComKeyAndEdmsNumAndUseYn(fixEdmsGubun, edmsMasterVO.getEdmsComKey(), edmsMasterVO.getEdmsNum(), "Y");
//	  if (isMasterSameEdmsNumVOList.size() > 1) {
//		Object[] parameter = {CmmnConstants.ECODE_FAILURE, "이미 입력된 수입(BL)/수출(INV) 데이터가 존재합니다", isMasterSameEdmsNumVOList};
//		throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
//	  }
//
//	  // 기존 미분류 마스터 수정(이건 아님. 기존 키값 받는 형식으로 해야 함)
//	  EdmsMasterVO notClassVO = edmsMasterDao.findByEdmsGubunAndJisaCodeAndEdmsComKeyAndUseYn("NOTCLASS", defaultDB, BigDecimal.ZERO, "Y");
//	  //EdmsMasterVO notClassVO = edmsMasterDao.getOne(BigDecimal.valueOf(1));// TODO: 2016-09-28 기존 키값 넘겨줄 경우
//	  if (!CmmnUtils.isNull(notClassVO)) {
//		// allFileTransfer=="Y" 면 기존 master 삭제(useYn:N), "N"이면 유지
//		notClassVO.setUseYn("Y".equalsIgnoreCase(allFileTransfer) ? "N" : "Y");
//		notClassVO.setEditUserId(userId);
//		notClassVO.setEditUserName(userName);
//		edmsMasterDao.save(notClassVO);
//	  } else {
//		throw new Exception("미분류내역없음");
//	  }
//
//	  // 기존 저장여부 확인(수입,수출,환급)
//	  EdmsMasterVO isSavedEdmsMasterVO = edmsMasterDao.findTop1ByEdmsGubunAndEdmsComKeyAndSingoNumAndUseYnOrderByEdmsKey(fixEdmsGubun, edmsMasterVO.getEdmsComKey(), edmsMasterVO.getSingoNum(), "Y");
//	  boolean isNewMaster = CmmnUtils.isNull(isSavedEdmsMasterVO) ? true : false;
//
//	  // 기존 fileList 조회
//	  Map edmsFileArgs = new HashMap();
//	  edmsFileArgs.put("edmsParentGubun", edmsMasterVO.getEdmsGubun());
//	  edmsFileArgs.put("edmsParentKey", edmsMasterVO.getEdmsKey());
//	  edmsFileArgs.put("useYn", "Y");
//	  edmsAttachFileVOList = this.getEdmsFileList(edmsFileArgs);
//
//	  if (isNewMaster) {
//		// 신규 master 저장
//		saveVO.setEdmsKey(null);
//		saveVO.setEdmsGubun(fixEdmsGubun);
//		saveVO.setAddUserId(userId);
//		saveVO.setAddUserName(userName);
//		// 관리번호
//		if (saveVO.getEdmsManagementNum().equals("00000000000000")) {
//		  saveVO.setEdmsManagementNum(null);
//		}
//		if (CmmnUtils.isNull(saveVO.getEdmsManagementNum()) && CmmnUtils.isNull(saveVO.getEdmsKey()) && !CmmnUtils.isNull(saveVO.getAddDay())) {
//		  saveVO.setEdmsManagementNum(getEdmsMasterManagementNumber(saveVO.getAddDay(), "0", 6));
//		}
//		// 수출입 통관정보(신규일때도?)
//		if (fixEdmsGubun.equals("EXPORT")) {
//		  saveVO = getEdmsMasterByExport(saveVO);
//		} else if (fixEdmsGubun.equals("IMPORT")) {
//		  saveVO = getEdmsMasterByImport(saveVO);
//		}
//		returnVO = edmsMasterDao.save(saveVO);
//	  } else {
//		// 기존 master 수정
//		isSavedEdmsMasterVO.setEditDay(saveVO.getEditDay());
//		isSavedEdmsMasterVO.setEditUserId(userId);
//		isSavedEdmsMasterVO.setEditUserName(userName);
//		// 수출입 통관정보
//		if (fixEdmsGubun.equals("EXPORT")) {
//		  isSavedEdmsMasterVO = getEdmsMasterByExport(isSavedEdmsMasterVO);
//		} else if (fixEdmsGubun.equals("IMPORT")) {
//		  isSavedEdmsMasterVO = getEdmsMasterByImport(isSavedEdmsMasterVO);
//		}
//		returnVO = edmsMasterDao.save(isSavedEdmsMasterVO);
//	  }
//	} else {
//	  throw new Exception("fixEdmsGubun없음");
//	}
//
//	returnMap.put("edmsMasterVO", returnVO);
//	returnMap.put("edmsAttachFileVOList", edmsAttachFileVOList);
//
//	return returnMap;
//  }

  @Transactional(readOnly = true)
  private String getEdmsMasterManagementNumber(String addDay, String paddingChar, int paddingSize) throws Exception {
	String yymmdd = CmmnUtils.getFormatedDate("yyMMdd");
	return "ED" + String.valueOf(Long.valueOf(edmsMasterDao.getMaxEdmsManagementNum(yymmdd)) + 1);
  }

  /**
   * Modify edms master map.(구분자별 edmsMaster 수정)
   * <p>
   * EDMS구분(IMPORT/EXPORT), EDMS미구분(NOTCLASS/SEINETC/HWANGUP)
   * <p>
   * 1. 신규 분류가 구분일 경우..
   * 1-1. 기존 분류가 구분일 경우 : allFileTransferYn에 따라 기존마스터 사용여부 수정 → 신규마스터가 존재하면 해당 마스터를 수정(editDay)하고 해당 마스터 리턴. 신규마스터 미존재시 관리번호를 생성하고 신규마스터 리턴
   * 1-2. 기존 분류가 미구분일 경우 : allFileTransferYn에 따라 기존마스터 사용여부 수정&edmsNum초기화 → 신규마스터가 존재하면 해당 마스터를 수정(editDay)하고 해당 마스터 리턴. 신규마스터 미존재시 관리번호를 생성하고 신규마스터 리턴
   * <p>
   * 2. 신규 분류가 미구분일 경우..
   * 2-1. 기존 분류가 구분일 경우 : allFileTransferYn에 따라 기존마스터 사용여부 수정 → 신규마스터가 존재하면 해당 마스터를 수정(editDay)하고 해당 마스터 리턴. 신규마스터 미존재시 관리번호를 생성하고 신규마스터 리턴
   * 2-2. 기존 분류가 미구분일 경우 : allFileTransferYn에 따라 기존마스터 사용여부 수정&edmsNum초기화 → 신규마스터가 존재하면 해당 마스터를 수정(editDay)하고 해당 마스터 리턴. 신규마스터 미존재시 관리번호를 생성하고 신규마스터 리턴
   * <p>
   * 리턴값은 신규마스터,기존파일리스트
   *
   * @param edmsMasterVO          the edms master vo
   * @param oldSavedEdmsMasterKey the old saved edms master key
   * @param newEdmsGubun          the new edms gubun
   * @param allFileTransferYn     the all file transfer yn
   * @param request               the request
   * @return the map
   * @throws Exception the exception
   */
//  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
//  public Map modifyEdmsMaster(EdmsMasterVO edmsMasterVO, BigDecimal oldSavedEdmsMasterKey, String newEdmsGubun, String allFileTransferYn, HttpServletRequest request) throws Exception {
//	Map returnMap = new HashMap();
//	EdmsMasterVO returnVO = null;
//	List<EdmsAttachFileVO> edmsAttachFileVOList = null;
//	boolean isNewMaster = false;
//	EdmsMasterVO saveVO = modelMapper.map(edmsMasterVO, EdmsMasterVO.class);
//	String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
//	String userName = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
//
//	// 기존 마스터
//	EdmsMasterVO oldSavedMasterVO = edmsMasterDao.getOne(oldSavedEdmsMasterKey);
//	if (CmmnUtils.isNull(oldSavedMasterVO)) {
//	  throw new Exception("수정할내역없음");
//	}
//	String oldEdmsGubun = oldSavedMasterVO.getEdmsGubun();
//
//	/*
//	미구분->구분 : edmsNum 제거
//	구분->미구분
//	미구분->미구분 : edmsNum 제거
//	구분->구분
//	*/
//	if (checkEdmsGubun(newEdmsGubun).equalsIgnoreCase("EDMS구분")) {
//	  if (CmmnUtils.isNull(edmsMasterVO.getEdmsComKey()) || CmmnUtils.isNull(edmsMasterVO.getEdmsNum())) {
//		throw new Exception("파라메터확인");
//	  }
//
//	  saveOldEdmsMaster(allFileTransferYn, userId, userName, oldSavedMasterVO, oldEdmsGubun);
//
//	  if (edmsMasterVO.getEdmsManagementNum().equals("00000000000000")) {
//		edmsMasterVO.setEdmsManagementNum(null);
//	  }
//
//	  EdmsMasterVO isSavedEdmsMasterVO = null;
//	  if (checkEdmsGubun(oldEdmsGubun).equalsIgnoreCase("EDMS구분")) {
//		// 기존 저장여부 확인(수입,수출)
//		isSavedEdmsMasterVO = edmsMasterDao.findTop1ByEdmsGubunAndEdmsComKeyAndSingoNumAndUseYnOrderByEdmsKey(newEdmsGubun, edmsMasterVO.getEdmsComKey(), edmsMasterVO.getSingoNum(), "Y");
//	  } else if (checkEdmsGubun(oldEdmsGubun).equalsIgnoreCase("EDMS미구분")) {
//		// 기존 저장여부 확인(NOTCLASS,SEINETC,HWANGUP,기타)
//		isSavedEdmsMasterVO = edmsMasterDao.findByEdmsGubunAndJisaCodeAndEdmsComKeyAndUseYn(newEdmsGubun, edmsMasterVO.getJisaCode(), edmsMasterVO.getEdmsComKey(), "Y");
//	  }
//	  isNewMaster = CmmnUtils.isNull(isSavedEdmsMasterVO) ? true : false;
//
//	  returnVO = saveNewEdmsMaster(edmsMasterVO, newEdmsGubun, isNewMaster, saveVO, userId, userName, isSavedEdmsMasterVO);
//	} else if (checkEdmsGubun(newEdmsGubun).equalsIgnoreCase("EDMS미구분")) {
//	  if (CmmnUtils.isNull(edmsMasterVO.getJisaCode()) || CmmnUtils.isNull(edmsMasterVO.getEdmsComKey())) {
//		throw new Exception("파라메터확인");
//	  }
//
//	  // 기존 마스터 수정(allFileTransferYn 및 oldEdmsGubun에 따라)
//	  saveOldEdmsMaster(allFileTransferYn, userId, userName, oldSavedMasterVO, oldEdmsGubun);
//
//	  EdmsMasterVO isSavedEdmsMasterVO = null;
//	  if (checkEdmsGubun(oldEdmsGubun).equalsIgnoreCase("EDMS구분")) {
//		// 기존 저장여부 확인(수입,수출)
//		isSavedEdmsMasterVO = edmsMasterDao.findTop1ByEdmsGubunAndEdmsComKeyAndSingoNumAndUseYnOrderByEdmsKey(newEdmsGubun, edmsMasterVO.getEdmsComKey(), edmsMasterVO.getSingoNum(), "Y");
//	  } else if (checkEdmsGubun(oldEdmsGubun).equalsIgnoreCase("EDMS미구분")) {
//		// 기존 저장여부 확인(NOTCLASS,SEINETC,기타)
//		isSavedEdmsMasterVO = edmsMasterDao.findByEdmsGubunAndJisaCodeAndEdmsComKeyAndUseYn(newEdmsGubun, edmsMasterVO.getJisaCode(), edmsMasterVO.getEdmsComKey(), "Y");
//	  }
//	  isNewMaster = CmmnUtils.isNull(isSavedEdmsMasterVO) ? true : false;
//
//	  returnVO = saveNewEdmsMaster(edmsMasterVO, newEdmsGubun, isNewMaster, saveVO, userId, userName, isSavedEdmsMasterVO);
//	} else {
//	  throw new Exception("fixEdmsGubun없음");
//	}
//
//	// 기존 fileList 조회
//	if (!CmmnUtils.isNull(edmsMasterVO.getEdmsGubun()) && !CmmnUtils.isNull(edmsMasterVO.getEdmsKey())) {
//	  Map edmsFileArgs = new HashMap();
//	  edmsFileArgs.put("edmsParentGubun", edmsMasterVO.getEdmsGubun());
//	  edmsFileArgs.put("edmsParentKey", edmsMasterVO.getEdmsKey());
//	  edmsFileArgs.put("useYn", "Y");
//	  edmsAttachFileVOList = this.getEdmsFileList(edmsFileArgs);
//	}
//
//	returnMap.put("edmsMasterVO", returnVO);
//	returnMap.put("edmsAttachFileVOList", edmsAttachFileVOList);
//
//	return returnMap;
//  }

  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  private EdmsMasterVO saveNewEdmsMaster(EdmsMasterVO edmsMasterVO, String newEdmsGubun, boolean isNewMaster, EdmsMasterVO saveVO, String userId, String userName, EdmsMasterVO isSavedEdmsMasterVO) throws Exception {
	EdmsMasterVO returnVO;
	if (isNewMaster) {
	  // 신규 master 저장
	  saveVO.setEdmsKey(null);
	  saveVO.setEdmsGubun(newEdmsGubun);
	  saveVO.setAddUserId(userId);
	  saveVO.setAddUserName(userName);

	  // 관리번호
	  if (saveVO.getEdmsManagementNum().equals("00000000000000")) {
		saveVO.setEdmsManagementNum(null);
	  }
	  if (CmmnUtils.isNull(saveVO.getEdmsManagementNum()) && CmmnUtils.isNull(saveVO.getEdmsKey()) && !CmmnUtils.isNull(saveVO.getAddDay())) {
		saveVO.setEdmsManagementNum(getEdmsMasterManagementNumber(saveVO.getAddDay(), "0", 6));
	  }

	  // 수출입 통관정보(신규일때도?)
	  if (newEdmsGubun.equals("EXPORT")) {
		saveVO = getEdmsMasterByExport(saveVO);
	  } else if (newEdmsGubun.equals("IMPORT")) {
		saveVO = getEdmsMasterByImport(saveVO);
	  }
	  returnVO = edmsMasterDao.save(saveVO);
	} else {
	  // 기존 master 수정
	  isSavedEdmsMasterVO.setEditDay(edmsMasterVO.getEditDay());
	  isSavedEdmsMasterVO.setEditUserId(userId);
	  isSavedEdmsMasterVO.setEditUserName(userName);
	  // 수출입 통관정보
	  if (newEdmsGubun.equals("EXPORT")) {
		isSavedEdmsMasterVO = getEdmsMasterByExport(isSavedEdmsMasterVO);
	  } else if (newEdmsGubun.equals("IMPORT")) {
		isSavedEdmsMasterVO = getEdmsMasterByImport(isSavedEdmsMasterVO);
	  }
	  returnVO = edmsMasterDao.save(isSavedEdmsMasterVO);
	}
	return returnVO;
  }

  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  private void saveOldEdmsMaster(String allFileTransferYn, String userId, String userName, EdmsMasterVO oldSavedMasterVO, String oldEdmsGubun) throws Exception {
	if (!CmmnUtils.isNull(oldSavedMasterVO)) {
	  // allFileTransfer=="Y" 면 기존 master 삭제(useYn:N), "N"이면 유지
	  oldSavedMasterVO.setUseYn("Y".equalsIgnoreCase(allFileTransferYn) ? "N" : "Y");
	  oldSavedMasterVO.setEditUserId(userId);
	  oldSavedMasterVO.setEditUserName(userName);
	  if (checkEdmsGubun(oldEdmsGubun).equalsIgnoreCase("EDMS미구분")) {
		oldSavedMasterVO.setEdmsNum(""); //edmsNum 제거
	  }
	  edmsMasterDao.save(oldSavedMasterVO);
	} else {
	  throw new Exception("수정할내역없음");
	}
  }

  private String checkEdmsGubun(String s) {
	String returnStr = null;
	if (s.equalsIgnoreCase("IMPORT") || s.equalsIgnoreCase("EXPORT")) {
	  returnStr = "EDMS구분";
	} else if (s.equalsIgnoreCase("NOTCLASS") || s.equalsIgnoreCase("SEINETC") || s.equalsIgnoreCase("HWANGUP")) {
	  returnStr = "EDMS미구분";
	}
	return returnStr;
  }

  /**
   * Gets customs clearance by unregistered edms master list.
   *
   * @param args the args
   * @return the customs clearance by unregistered edms master list
   */
  public List<Map> getCustomsClearanceByUnregisteredEdmsMasterList(Map args) {
	return sqlSession.getMapper(EdmsManagementMapper.class).findCustomsClearanceByUnregisteredEdmsMasterList(CmmnUtils.replaceMapSc(args));
  }

  /**
   * Gets edms division copy target list.
   *
   * @param args the args
   * @return the edms division copy target list
   */
  public List<Map> getEdmsDivisionCopyTargetList(Map args) {
	return sqlSession.getMapper(EdmsManagementMapper.class).findEdmsDivisionCopyTargetList(CmmnUtils.replaceMapSc(args));
  }

  /**
   * Save edms division copy list list.
   *
   * @param edmsMasterVOList     the edms master vo list
   * @param edmsAttachFileVOList the edms attach file vo list
   * @param request              the request
   * @return the list
   * @throws Exception the exception
   */
  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public List<Map> saveEdmsDivisionCopyList(List<EdmsMasterVO> edmsMasterVOList, List<EdmsAttachFileVO> edmsAttachFileVOList, HttpServletRequest request) throws Exception {
	List<Map> returnMapList = new ArrayList<>();
	String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
	String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
	if (CmmnUtils.isNull(edmsMasterVOList)) {
	  Stream<EdmsMasterVO> masterVOStream = edmsMasterVOList.stream();
	  Set<String> edmsGubunSet = masterVOStream.map(a -> a.getEdmsGubun()).collect(Collectors.toSet());
	  if (edmsGubunSet.size() != 1 || !edmsGubunSet.equals("IMPORT")) {
		Object[] parameter = {CmmnConstants.ECODE_FAILURE, "수입만 분할건Copy가 가능합니다", ""};
		throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
	  }
	  Set<BigDecimal> edmsComKeySet = masterVOStream.map(a -> a.getEdmsComKey()).collect(Collectors.toSet());
	  if (edmsComKeySet.size() != 1) {
		Object[] parameter = {CmmnConstants.ECODE_FAILURE, "단일거래처만 분할건Copy가 가능합니다", ""};
		throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
	  }
	  Set<String> edmsNumSet = masterVOStream.map(a -> a.getEdmsNum()).collect(Collectors.toSet());
	  if (edmsNumSet.size() != 1) {
		Object[] parameter = {CmmnConstants.ECODE_FAILURE, "단일BL만 분할건Copy가 가능합니다", ""};
		throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
	  }
	  Map returnMap = new HashMap();
	  EdmsMasterVO masterVO = new EdmsMasterVO();
	  List<EdmsAttachFileVO> fileVOList = new ArrayList<>();
	  for (EdmsMasterVO vo : edmsMasterVOList) {
		// 관리번호
		if (vo.getEdmsManagementNum().equals("00000000000000")) {
		  vo.setEdmsManagementNum(null);
		}
		if (CmmnUtils.isNull(vo.getEdmsManagementNum()) && CmmnUtils.isNull(vo.getEdmsKey()) && !CmmnUtils.isNull(vo.getAddDay())) {
		  vo.setEdmsManagementNum(getEdmsMasterManagementNumber(vo.getAddDay(), "0", 6));
		}
		// validation(master)
		EdmsMasterVO validateVO = modelMapper.map(vo, EdmsMasterVO.class);
		validateVO.setAddUserId(userId);
		validateVO.setAddUserName(userNm);
		validateVO.setEditUserId(userId);
		validateVO.setEditUserName(userNm);
		Set<ConstraintViolation<EdmsMasterVO>> validator = CmmnUtils.isCommonValid(validateVO);
		if (validator.size() > 0) {
		  Object[] parameter = validator.toArray();
		  throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
		}
		// 수출입 통관정보
		String edmsGubun = vo.getEdmsGubun();
		if (edmsGubun.equals("EXPORT")) {
		  vo = getEdmsMasterByExport(vo);
		} else if (edmsGubun.equals("IMPORT")) {
		  vo = getEdmsMasterByImport(vo);
		}
		masterVO = edmsMasterDao.save(vo);
	  }

	  if (CmmnUtils.isNull(edmsAttachFileVOList)) {
		for (EdmsAttachFileVO fileVO : edmsAttachFileVOList) {
		  // validation(file)
		  EdmsAttachFileVO validateVO = modelMapper.map(fileVO, EdmsAttachFileVO.class);
		  validateVO.setAddUserId(userId);
		  validateVO.setEditUserId(userId);
		  Set<ConstraintViolation<EdmsAttachFileVO>> validator = CmmnUtils.isCommonValid(validateVO);
		  if (validator.size() > 0) {
			Object[] parameter = validator.toArray();
			throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
		  }
		  fileVO.setEdmsParentKey(masterVO.getEdmsKey());
		  fileVOList.add(edmsFileDao.save(fileVO));
		}
	  }
	  returnMap.put("edmsMaster", masterVO);
	  returnMap.put("edmsAttachFileList", fileVOList);
	  returnMapList.add(returnMap);
	}

	return returnMapList;
  }

  /**
   * Is edms master same edms gubun and edms company and edms num list list.
   *
   * @param args the args
   * @return the list
   * @throws Exception the exception
   */
  public List<EdmsMasterVO> isEdmsMasterSameEdmsGubunAndEdmsCompanyAndEdmsNumList(Map args) throws Exception {
	BigDecimal edmsComKey = CmmnUtils.isContainsMapValue(args, "edmsComKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("edmsComKey"))) : null;
	String edmsGubun = args.containsKey("edmsGubun") ? String.valueOf(args.get("edmsGubun")) : null;
	String edmsNum = args.containsKey("edmsNum") ? String.valueOf(args.get("edmsNum")) : null;
	if (CmmnUtils.isNull(edmsComKey) || CmmnUtils.isNull(edmsGubun) || CmmnUtils.isNull(edmsNum)) {
	  Object[] parameter = {CmmnConstants.ECODE_FAILURE, "동일 업무비교 체크 파라메터를 확인하세요", ""};
	  throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
	}

	return edmsMasterDao.findByEdmsGubunAndEdmsComKeyAndEdmsNumAndUseYn(edmsGubun, edmsComKey, edmsNum, "Y");
  }

  /**
   * Save edms master by customs synchronize list list.
   *
   * @param edmsMasterVOList the edms master vo list
   * @param request          the request
   * @return the list
   * @throws Exception the exception
   */
  public List<EdmsMasterVO> saveEdmsMasterByCustomsSynchronizeList(List<EdmsMasterVO> edmsMasterVOList, HttpServletRequest request) throws Exception {
	List<EdmsMasterVO> returnVOList = new ArrayList<>();
	String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
	String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
	String currentDay = CmmnUtils.getFormatedDate("yyyyMMdd");
	Date currentDate = new Date();
	for (EdmsMasterVO vo : edmsMasterVOList) {
	  String edmsManagementNum = vo.getEdmsManagementNum();
	  if (CmmnUtils.isNull(edmsManagementNum) || !edmsManagementNum.startsWith("ED")) {
		Object[] parameter = {CmmnConstants.ECODE_FAILURE, "문서관리번호가 채번되어야 수동동기화 할 수 있습니다", ""};
		throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
	  }

	  String edmsGubun = vo.getEdmsGubun();
	  if (CmmnUtils.isNull(edmsGubun) || (!edmsGubun.equals("IMPORT") || !edmsGubun.equals("EXPORT"))) {
		Object[] parameter = {CmmnConstants.ECODE_FAILURE, "수입(출)만 수동동기화 할 수 있습니다", ""};
		throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
	  }
	  if (edmsGubun.equals("EXPORT")) {
		vo = getEdmsMasterByExport(vo);
	  } else if (edmsGubun.equals("IMPORT")) {
		vo = getEdmsMasterByImport(vo);
	  }

	  vo.setEditUserId(userId);
	  vo.setEditUserName(userNm);
	  vo.setEditDay(currentDay);
	  vo.setEditDate(currentDate);
	  // validation
	  Set<ConstraintViolation<EdmsMasterVO>> validator = CmmnUtils.isCommonValid(vo);
	  if (validator.size() > 0) {
		Object[] parameter = validator.toArray();
		throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
	  }

	  returnVOList.add(edmsMasterDao.save(vo));
	}

	return returnVOList;
  }

//  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
//  public EdmsAttachFileVO saveEdmsFileAdditionalInfo(EdmsFileDTO.additionalInfo additionalInfo, HttpServletRequest request) throws Exception {
//	EdmsAttachFileVO fileVO = edmsFileDao.findOne(additionalInfo.getEdmsFileKey());
//	if(additionalInfo.getEdmsFileCategory().equals("B0001")){
//		fileVO.setEdmsFileCategory(additionalInfo.getEdmsFileCategory());
//		fileVO.setEdmsSearchKeyword(additionalInfo.getEdmsSearchKeyword());
//		fileVO.setEdmsFileNote(additionalInfo.getEdmsFileNote());
//	}else{
//		fileVO.setEdmsFileCategory(additionalInfo.getEdmsFileCategory());
//	}
//
//	EdmsAttachFileVO returnVO = edmsFileDao.save(fileVO);
//
//	return returnVO;
//  }

  public List<Map> getEdmsFileDownFileList(Map args){
	return sqlSession.getMapper(EdmsManagementMapper.class).findFileDownList(CmmnUtils.replaceMapSc(args));
  }

  public List<Map> getAsmlImportFtpList() {
	return sqlSession.getMapper(EdmsManagementMapper.class).findAsmlImportFtpList();
  }

  public List<Map> getScImportFtpList() {
	return sqlSession.getMapper(EdmsManagementMapper.class).findScImportFtpList();
  }

  public List<Map> getAsmlExportFtpList() {
	return sqlSession.getMapper(EdmsManagementMapper.class).findAsmlExportFtpList();
  }

  public List<Map> getScExportFtpList() {
	return sqlSession.getMapper(EdmsManagementMapper.class).findScExportFtpList();
  }
}