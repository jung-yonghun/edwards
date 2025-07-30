package com.edwards.biz.complianceManagement;

import com.edwards.commons.CmmnConstants;
import com.edwards.commons.CmmnSpecs;
import com.edwards.commons.CmmnUtils;
import com.edwards.domains.CpsComplianceApplyVO;
import com.edwards.domains.CpsComplianceItemVO;
import com.edwards.domains.CpsComplianceMasterVO;
import com.edwards.domains.CpsUserInfoVO;
import com.edwards.domains.CpsYogunItemLogVO;
import com.edwards.domains.CpsYogunItemMasterVO;

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
public class ComplianceManagementService{
	@Qualifier("SqlSessionTemplate")
	@Autowired
	private SqlSession sqlSession;
	@Autowired
	private CpsComplianceMasterDao cpsComplianceMasterDao;
	@Autowired
	private CpsComplianceItemDao cpsComplianceItemDao;
	@Autowired
	private CpsComplianceApplyDao cpsComplianceApplyDao;
	@Autowired
	private CpsYogunItemMasterDao cpsYogunItemMasterDao;
	@Autowired
	private CpsYogunItemLogDao cpsYogunItemLogDao;

	@Autowired
	private MessageSource messageSource;
	@Autowired
	private ModelMapper modelMapper;

	public List<Map> selectModelList(Map args) throws Exception{
		return sqlSession.getMapper(ComplianceMapper.class).selectModelList(CmmnUtils.replaceMapSc(args));
	}

	public long insertModel(Map args) throws Exception{
		return sqlSession.getMapper(ComplianceMapper.class).insertModel(CmmnUtils.replaceMapSc(args));
	}

	public long updateModel(Map args) throws Exception{
		return sqlSession.getMapper(ComplianceMapper.class).updateModel(CmmnUtils.replaceMapSc(args));
	}

	public long insertSikpumMaster(Map args) throws Exception{
		return sqlSession.getMapper(ComplianceMapper.class).insertSikpumMaster(CmmnUtils.replaceMapSc(args));
	}

	public long copySikpumMaster(Map args) throws Exception{
		return sqlSession.getMapper(ComplianceMapper.class).copySikpumMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectSikpumMaster(Map args) throws Exception{
		return sqlSession.getMapper(ComplianceMapper.class).selectSikpumMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectSikpumTop1Master(Map args) throws Exception{
		return sqlSession.getMapper(ComplianceMapper.class).selectSikpumTop1Master(CmmnUtils.replaceMapSc(args));
	}

	public long updateSikpumMaster(Map args) throws Exception{
		return sqlSession.getMapper(ComplianceMapper.class).updateSikpumMaster(CmmnUtils.replaceMapSc(args));
	}

	public long gwanSikpumMaster(Map args) throws Exception{
		return sqlSession.getMapper(ComplianceMapper.class).gwanSikpumMaster(CmmnUtils.replaceMapSc(args));
	}

	public long saveDetailMaster(Map args) throws Exception{
		return sqlSession.getMapper(ComplianceMapper.class).saveDetailMaster(CmmnUtils.replaceMapSc(args));
	}

	public long insertSikpumDetail(Map args) throws Exception{
		return sqlSession.getMapper(ComplianceMapper.class).insertSikpumDetail(CmmnUtils.replaceMapSc(args));
	}

	public long copySikpumDetail(Map args) throws Exception{
		return sqlSession.getMapper(ComplianceMapper.class).copySikpumDetail(CmmnUtils.replaceMapSc(args));
	}

	public long updateSikpumDetail(Map args) throws Exception{
		return sqlSession.getMapper(ComplianceMapper.class).updateSikpumDetail(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectSikpumDetailList(Map args) throws Exception{
		return sqlSession.getMapper(ComplianceMapper.class).selectSikpumDetailList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectSikpumDetailTop1List(Map args) throws Exception{
		return sqlSession.getMapper(ComplianceMapper.class).selectSikpumDetailTop1List(CmmnUtils.replaceMapSc(args));
	}

	public long deleteSikpumDetail(Map args) throws Exception{
		return sqlSession.getMapper(ComplianceMapper.class).deleteSikpumDetail(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectSikpumList(Map args) throws Exception{
		return sqlSession.getMapper(ComplianceMapper.class).selectSikpumList(CmmnUtils.replaceMapSc(args));
	}

	public long deleteSikpumMaster(Map args) throws Exception{
		return sqlSession.getMapper(ComplianceMapper.class).deleteSikpumMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectJisaList(Map args) throws Exception{
		return sqlSession.getMapper(ComplianceMapper.class).selectJisaList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectMcountList(Map args) throws Exception{
		return sqlSession.getMapper(ComplianceMapper.class).selectMcountList(CmmnUtils.replaceMapSc(args));
	}

	public long updateModelJajae(Map args) throws Exception{
		return sqlSession.getMapper(ComplianceMapper.class).updateModelJajae(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectMasterList(Map args) throws Exception{
		return sqlSession.getMapper(ComplianceMapper.class).selectMasterList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectResultMasterList(Map args) throws Exception{
		return sqlSession.getMapper(ComplianceMapper.class).selectResultMasterList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectCompResultList(Map args) throws Exception{
		return sqlSession.getMapper(ComplianceMapper.class).selectCompResultList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectResultStatusList(Map args) throws Exception{
		return sqlSession.getMapper(ComplianceMapper.class).selectResultStatusList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectResultDetailList(Map args) throws Exception{
		return sqlSession.getMapper(ComplianceMapper.class).selectResultDetailList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectResultDetailList2(Map args) throws Exception{
		return sqlSession.getMapper(ComplianceMapper.class).selectResultDetailList2(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectComList(Map args) throws Exception{
		return sqlSession.getMapper(ComplianceMapper.class).selectComList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectComList1(Map args) throws Exception{
		return sqlSession.getMapper(ComplianceMapper.class).selectComList1(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectCodeList(Map args) throws Exception{
		return sqlSession.getMapper(ComplianceMapper.class).selectCodeList(CmmnUtils.replaceMapSc(args));
	}

	public long updateResult(Map args) throws Exception{
		return sqlSession.getMapper(ComplianceMapper.class).updateResult(CmmnUtils.replaceMapSc(args));
	}

	public long insertResult(Map args) throws Exception{
		return sqlSession.getMapper(ComplianceMapper.class).insertResult(CmmnUtils.replaceMapSc(args));
	}

	public long insertResultDtl(Map args) throws Exception{
		return sqlSession.getMapper(ComplianceMapper.class).insertResultDtl(CmmnUtils.replaceMapSc(args));
	}






	public List<Map> selectComplianceMasterList(Map args) throws Exception{
		return sqlSession.getMapper(ComplianceMapper.class).selectComplianceMasterList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectComplianceList(Map args) throws Exception{
		return sqlSession.getMapper(ComplianceMapper.class).selectComplianceList(CmmnUtils.replaceMapSc(args));
	}

	public long insertYogMaster(Map args) throws Exception{
		return sqlSession.getMapper(ComplianceMapper.class).insertYogMaster(CmmnUtils.replaceMapSc(args));
	}

	public long updateYogMaster(Map args) throws Exception{
		return sqlSession.getMapper(ComplianceMapper.class).updateYogMaster(CmmnUtils.replaceMapSc(args));
	}

	public long deleteYogMaster(Map args) throws Exception{
		return sqlSession.getMapper(ComplianceMapper.class).deleteYogMaster(CmmnUtils.replaceMapSc(args));
	}

	public CpsYogunItemMasterVO getJajaeInfo(String yogSaup, String jajaeCode) throws Exception{
		return cpsYogunItemMasterDao.findByYogSaupAndJajaeCode(yogSaup, jajaeCode);
	}

	public List<CpsYogunItemMasterVO> selectYogItemMasterList(Map args) throws Exception{
		Specifications spec = getYogItemMasterSpecifications(args);
		Sort orders = new Sort(Sort.Direction.DESC, "useYn").and(new Sort(Sort.Direction.DESC, "yogItemKey"));

		return cpsYogunItemMasterDao.findAll(spec, orders);
	}

	private Specifications getYogItemMasterSpecifications(Map args){
		String yogSaup = args.containsKey("yogSaup") ? String.valueOf(args.get("yogSaup")) : null;
		String jajaeCode = args.containsKey("jajaeCode") ? String.valueOf(args.get("jajaeCode")) : null;
		String useYn = "Y";

		Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn"));
		if (!CmmnUtils.isNull(yogSaup)) 	spec = spec.and(CmmnSpecs.eqStringSpec(yogSaup, "yogSaup"));
		if (!CmmnUtils.isNull(jajaeCode)) 	spec = spec.and(CmmnSpecs.eqStringSpec(jajaeCode, "jajaeCode"));
		return spec;
	}

	public long insertSikMaster(Map args) throws Exception{
		return sqlSession.getMapper(ComplianceMapper.class).insertSikMaster(CmmnUtils.replaceMapSc(args));
	}












	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
	public List<CpsComplianceMasterVO> saveComplianceMasterList(List<CpsComplianceMasterVO> voList, HttpServletRequest request) throws Exception {
		List<CpsComplianceMasterVO> validateList = new ArrayList<>();
		String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
		String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
		String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
		String currentDate = CmmnUtils.getFormatedDate("yyyyMMdd");

		for (CpsComplianceMasterVO vo : voList) {
			CpsComplianceMasterVO validateVO = modelMapper.map(vo, CpsComplianceMasterVO.class);
			validateVO.setAddUserId(userId);
			validateVO.setAddUserNm(userNm);
			validateVO.setAddDtm(currentDatetime);
			validateVO.setEditUserId(userId);
			validateVO.setEditUserNm(userNm);
			validateVO.setEditDtm(currentDatetime);
			Set<ConstraintViolation<CpsComplianceMasterVO>> validator = CmmnUtils.isCommonValid(validateVO);
			if (validator.size() > 0) {
				Object[] parameter = validator.toArray();
				throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
			}
			validateList.add(vo);
		}

		List<CpsComplianceMasterVO> returnVO = cpsComplianceMasterDao.save(validateList);

		return returnVO;
	}

//	public List<CpsComplianceMasterVO> selectComplianceMasterList(Map args) {
//		BigDecimal compKey 	= CmmnUtils.isContainsMapValue(args, "compKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("compKey"))) : null;
//		String useYn 		= args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "";
//
//		Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn"));
//
//		if (!CmmnUtils.isNull(compKey)) spec = spec.and(CmmnSpecs.eqNumberSpec(compKey, "compKey"));
//
//		return cpsComplianceMasterDao.findAll(spec);
//	}

	public List<Map> selectCompMasterList(Map args) throws Exception{
		return sqlSession.getMapper(ComplianceMapper.class).selectCompMasterList(CmmnUtils.replaceMapSc(args));
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
	public CpsComplianceMasterVO updateComplianceMasterList(CpsComplianceMasterVO cpsComplianceMasterVO, HttpServletRequest request) throws Exception {
		CpsComplianceMasterVO returnVO = cpsComplianceMasterDao.save(cpsComplianceMasterVO);

		return returnVO;
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
	public CpsComplianceItemVO saveComplianceItemList(CpsComplianceItemVO cpsComplianceItemVO, HttpServletRequest request) throws Exception {
		CpsComplianceItemVO returnVO = cpsComplianceItemDao.save(cpsComplianceItemVO);

		return returnVO;
	}

	public List<CpsComplianceItemVO> selectComplianceItemList(Map args) {
		BigDecimal compItemKey 	= CmmnUtils.isContainsMapValue(args, "compItemKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("compItemKey"))) : null;
		String gubun 			= args.containsKey("gubun") ? String.valueOf(args.get("gubun")) : null;
		String masterKey 		= args.containsKey("masterKey") ? String.valueOf(args.get("masterKey")) : null;
		String mcoCom 			= args.containsKey("mcoCom") ? String.valueOf(args.get("mcoCom")) : null;
		String mmodelCode 		= args.containsKey("mmodelCode") ? String.valueOf(args.get("mmodelCode")) : null;
		String useYn 			= args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "";

		Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn"));

		if (!CmmnUtils.isNull(compItemKey)) spec = spec.and(CmmnSpecs.eqNumberSpec(compItemKey, "compItemKey"));
		if (!CmmnUtils.isNull(gubun)) 		spec = spec.and(CmmnSpecs.eqStringSpec(gubun, "gubun"));
		if (!CmmnUtils.isNull(masterKey)) 	spec = spec.and(CmmnSpecs.eqStringSpec(masterKey, "masterKey"));
		if (!CmmnUtils.isNull(mcoCom)) 		spec = spec.and(CmmnSpecs.eqStringSpec(mcoCom, "mcoCom"));
		if (!CmmnUtils.isNull(mmodelCode)) 	spec = spec.and(CmmnSpecs.eqStringSpec(mmodelCode, "mmodelCode"));

		return cpsComplianceItemDao.findAll(spec);
	}

	public List<Map> selectCompItemList(Map args) throws Exception{
		return sqlSession.getMapper(ComplianceMapper.class).selectCompItemList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectComplianceUnitPriceList(Map args) throws Exception{
		return sqlSession.getMapper(ComplianceMapper.class).selectComplianceUnitPriceList(CmmnUtils.replaceMapSc(args));
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
	public List<CpsComplianceApplyVO> saveComplianceApplyList(List<CpsComplianceApplyVO> voList, HttpServletRequest request) throws Exception {
		List<CpsComplianceApplyVO> validateList = new ArrayList<>();
		String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
		String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
		String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
		String currentDate = CmmnUtils.getFormatedDate("yyyyMMdd");

		for (CpsComplianceApplyVO vo : voList) {
			CpsComplianceApplyVO validateVO = modelMapper.map(vo, CpsComplianceApplyVO.class);
			validateVO.setAddUserId(userId);
			validateVO.setAddUserNm(userNm);
			validateVO.setAddDtm(currentDatetime);
			validateVO.setEditUserId(userId);
			validateVO.setEditUserNm(userNm);
			validateVO.setEditDtm(currentDatetime);
			Set<ConstraintViolation<CpsComplianceApplyVO>> validator = CmmnUtils.isCommonValid(validateVO);
			if (validator.size() > 0) {
				Object[] parameter = validator.toArray();
				throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
			}
			validateList.add(vo);
		}

		List<CpsComplianceApplyVO> returnVO = cpsComplianceApplyDao.save(validateList);

		return returnVO;
	}

	public List<CpsComplianceApplyVO> selectComplianceApplyList(Map args) {
		BigDecimal applyKey	= CmmnUtils.isContainsMapValue(args, "applyKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("applyKey"))) : null;
		String useYn 		= args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "";

		Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn"));

		if (!CmmnUtils.isNull(applyKey)) spec = spec.and(CmmnSpecs.eqNumberSpec(applyKey, "applyKey"));

		return cpsComplianceApplyDao.findAll(spec);
	}

	public List<Map> selectCompApplyList(Map args) throws Exception{
		return sqlSession.getMapper(ComplianceMapper.class).selectCompApplyList(CmmnUtils.replaceMapSc(args));
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
	public CpsComplianceApplyVO updateComplianceApplyList(CpsComplianceApplyVO cpsComplianceApplyVO, HttpServletRequest request) throws Exception {
		CpsComplianceApplyVO returnVO = cpsComplianceApplyDao.save(cpsComplianceApplyVO);

		return returnVO;
	}

	public List<Map> selectYogNcomList(Map args) throws Exception{
		return sqlSession.getMapper(ComplianceMapper.class).selectYogNcomList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectRequirementMasterList(Map args) throws Exception{
		return sqlSession.getMapper(ComplianceMapper.class).selectRequirementMasterList(CmmnUtils.replaceMapSc(args));
	}

	public long updateRequirementMaster(Map args) throws Exception{
		return sqlSession.getMapper(ComplianceMapper.class).updateRequirementMaster(CmmnUtils.replaceMapSc(args));
	}

	public long insertRequirementMaster(Map args) throws Exception{
		return sqlSession.getMapper(ComplianceMapper.class).insertRequirementMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectRequirementStatusList(Map args) throws Exception{
		return sqlSession.getMapper(ComplianceMapper.class).selectRequirementStatusList(CmmnUtils.replaceMapSc(args));
	}

	public long updateRequirementStatus(Map args) throws Exception{
		return sqlSession.getMapper(ComplianceMapper.class).updateRequirementStatus(CmmnUtils.replaceMapSc(args));
	}

	public long insertRequirementStatus(Map args) throws Exception{
		return sqlSession.getMapper(ComplianceMapper.class).insertRequirementStatus(CmmnUtils.replaceMapSc(args));
	}
}