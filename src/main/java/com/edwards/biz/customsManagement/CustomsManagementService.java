package com.edwards.biz.customsManagement;

import com.edwards.commons.CmmnConstants;
import com.edwards.commons.CmmnSpecs;
import com.edwards.commons.CmmnUtils;
import com.edwards.domains.CpsStartInfoVO;
import com.edwards.domains.CustomsCostDetailVO;
import com.edwards.domains.CustomsCostMasterVO;
import com.edwards.domains.ExpoStartInfoVO;
import com.edwards.domains.ImpoStartInfoVO;

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
public class CustomsManagementService{
	@Qualifier("SqlSessionTemplate")
	@Autowired
	private SqlSession sqlSession;
	@Autowired
	private CpsStartInfoDao cpsStartInfoDao;
	@Autowired
	private ImportStartInfoDao importStartInfoDao;
	@Autowired
	private ExportStartInfoDao exportStartInfoDao;
	@Autowired
	private CustomsCostMasterDao customsCostMasterDao;
	@Autowired
	private CustomsCostDetailDao customsCostDetailDao;

	@Autowired
	private MessageSource messageSource;
	@Autowired
	private ModelMapper modelMapper;

	public List<Map> selectImportAllRequestList(Map args) throws Exception {
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectImportAllRequestList(CmmnUtils.replaceMapSc(args));
	}












	public List<Map> selectImportStatusList(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectImportStatusList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImportStatusTotalList(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectImportStatusTotalList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImportStatusDetail(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectImportStatusDetail(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImportStatusDetail1(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectImportStatusDetail1(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImportStatusDetail2(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectImportStatusDetail2(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImportStatusDetailYog(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectImportStatusDetailYog(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImportStatusDetail2Ex(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectImportStatusDetail2Ex(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImportStatusDetail4(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectImportStatusDetail4(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImportStatusDetail3(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectImportStatusDetail3(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectZeissImportStatusDetail(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectZeissImportStatusDetail(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectZeissImportStatusDetail1(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectZeissImportStatusDetail1(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectZeissImportStatusDetail2(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectZeissImportStatusDetail2(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectTodsItem(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectTodsItem(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectZeissImportStatusList(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectZeissImportStatusList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectZeissImportStatusList1(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectZeissImportStatusList1(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectZeissImportStatusList2(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectZeissImportStatusList2(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImportAllStatusList(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectImportAllStatusList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImportStatusFtpList(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectImportStatusFtpList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExportStatusList(Map args) throws Exception{
		return sqlSession.getMapper(ExpoCustomsMapper.class).selectExportStatusList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExportDeclarationDetailList(Map args) throws Exception{
		return sqlSession.getMapper(ExpoCustomsMapper.class).selectExportDeclarationDetailList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExportDeclarationSubDetailList(Map args) throws Exception{
		return sqlSession.getMapper(ExpoCustomsMapper.class).selectExportDeclarationSubDetailList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectZeissExportStatusDetail(Map args) throws Exception{
		return sqlSession.getMapper(ExpoCustomsMapper.class).selectZeissExportStatusDetail(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectZeissExportStatusDetail1(Map args) throws Exception{
		return sqlSession.getMapper(ExpoCustomsMapper.class).selectZeissExportStatusDetail1(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectZeissExportStatusDetail2(Map args) throws Exception{
		return sqlSession.getMapper(ExpoCustomsMapper.class).selectZeissExportStatusDetail2(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExportAllStatusList(Map args) throws Exception{
		return sqlSession.getMapper(ExpoCustomsMapper.class).selectExportAllStatusList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExportStatusFtpList(Map args) throws Exception{
		return sqlSession.getMapper(ExpoCustomsMapper.class).selectExportStatusFtpList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectAccountCostCustomsList(Map args){
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectAccountCostCustomsList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectAccountCostAdjustmentList(Map args){
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectAccountCostAdjustmentList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectAccountBillAdjustmentList(Map args){
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectAccountBillAdjustmentList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectAccountCostStatementOfAccountsList(Map args){
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectAccountCostStatementOfAccountsList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectAccountCostStatementOfAccountsDetailList(Map args){
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectAccountCostStatementOfAccountsDetailList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectAccountCostStatementOfAccountsList1(Map args){
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectAccountCostStatementOfAccountsList1(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectAccountCostStatementOfAccountsDetailList1(Map args){
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectAccountCostStatementOfAccountsDetailList1(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectAccountBillStatementOfAccountsList(Map args){
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectAccountBillStatementOfAccountsList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectAccountBillStatementOfAccountsDetailList(Map args){
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectAccountBillStatementOfAccountsDetailList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectAccountBillStatementOfAccountsList1(Map args){
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectAccountBillStatementOfAccountsList1(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectAccountBillStatementOfAccountsDetailList1(Map args){
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectAccountBillStatementOfAccountsDetailList1(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImportRequestList(Map args) throws Exception {
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectImportRequestList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectIsuExportStatusList(Map args) throws Exception{
		return sqlSession.getMapper(ExpoCustomsMapper.class).selectIsuExportStatusList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExportRequestList(Map args) throws Exception {
		return sqlSession.getMapper(ExpoCustomsMapper.class).selectExportRequestList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExportAllRequestList(Map args) throws Exception {
		return sqlSession.getMapper(ExpoCustomsMapper.class).selectExportAllRequestList(CmmnUtils.replaceMapSc(args));
	}

	public List<CpsStartInfoVO> selectRequestList(Map args) {
		BigDecimal startKey = CmmnUtils.isContainsMapValue(args, "startKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("startKey"))) : null;
		String startGubun = args.containsKey("startGubun") ? String.valueOf(args.get("startGubun")) : null;
		String startTaxpayerTradeName = args.containsKey("startTaxpayerTradeName") ? String.valueOf(args.get("startTaxpayerTradeName")) : null;
		String startTaxpayerNum = args.containsKey("startTaxpayerNum") ? String.valueOf(args.get("startTaxpayerNum")) : null;
		String startNum = args.containsKey("startNum") ? String.valueOf(args.get("startNum")) : null;
		List<String> instartNum = args.containsKey("inStartNum") ? Arrays.asList(String.valueOf(args.get("inStartNum")).replace("[", "").replace("]", "").split("\\s*,\\s*")) : null;
		String useYn = args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "";

		//검색조건(필수:imsUseYn)
		Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn"));

		//검색조건
		if (!CmmnUtils.isNull(startKey)) spec = spec.and(CmmnSpecs.eqNumberSpec(startKey, "startKey"));
		if (!CmmnUtils.isNull(startGubun)) spec = spec.and(CmmnSpecs.eqStringSpec(startGubun, "startGubun"));
		if (!CmmnUtils.isNull(startTaxpayerTradeName)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(startTaxpayerTradeName, "startTaxpayerTradeName"));
		if (!CmmnUtils.isNull(startTaxpayerNum)) spec = spec.and(CmmnSpecs.eqStringSpec(startTaxpayerNum, "startTaxpayerNum"));
		if (!CmmnUtils.isNull(startNum)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(startNum, "startNum"));
		if (!CmmnUtils.isNull(instartNum)) spec = spec.and(CmmnSpecs.inListStringSpec(instartNum, "startNum"));

		return cpsStartInfoDao.findAll(spec);
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
	public CpsStartInfoVO saveRequest(CpsStartInfoVO cpsStartInfoVO, HttpServletRequest request) throws Exception {
		CpsStartInfoVO returnVO = cpsStartInfoDao.save(cpsStartInfoVO);

		return returnVO;
	}

	public List<Map> selectImportResultCountRecordsExceptSingoAndCs(Map args){
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectImportResultTotal(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImportResultSuip(Map args){
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectImportResultImport(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImportResultNapse(Map args){
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectImportResultNapse(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImportResultGammyun(Map args){
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectImportResultGam(CmmnUtils.replaceMapSc(args));
	}


	public List<Map> selectExportResultCountRecordsExceptSingo(Map args){
		List<Map> result = new ArrayList<>();
		String argCL = "";
		if(args.containsKey("argCL")){
			argCL = String.valueOf(args.get("argCL"));
		}else{
			return result;
		}

		if(argCL.equalsIgnoreCase("전체")){
			result = sqlSession.getMapper(ExpoCustomsMapper.class).selectExportResult건수_신고구분제외_전체(CmmnUtils.replaceMapSc(args));
		}

		return result;
	}

	public List<Map> selectExportResultSuchul(Map args){
		List<Map> result = new ArrayList<>();
		String argCL = "";

		if(args.containsKey("argCL")){
			argCL = String.valueOf(args.get("argCL"));
		}else{
			return result;
		}

		if(argCL.equalsIgnoreCase("전체")){
			result = sqlSession.getMapper(ExpoCustomsMapper.class).selectExportResult수출실적_전체(CmmnUtils.replaceMapSc(args));
		}

		return result;
	}

	public List<CustomsCostMasterVO> selectCustomsCostMasterList(Map args) throws Exception{
		Specifications spec = getCustomsCostMasterSpec(args);
		Sort orders = new Sort(Sort.Direction.DESC, "useYn").and(new Sort(Sort.Direction.DESC, "costMstKey"));
		return customsCostMasterDao.findAll(spec, orders);
	}

	private Specifications getCustomsCostMasterSpec(Map args){
		BigDecimal costMstKey 		= CmmnUtils.isContainsMapValue(args, "costMstKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("costMstKey"))) : null;
		String costMstCl 			= args.containsKey("costMstCl") ? String.valueOf(args.get("costMstCl")) : "";
		String costCustomerDb 		= args.containsKey("costCustomerDb") ? String.valueOf(args.get("costCustomerDb")) : null;
		String costCustomerName 	= args.containsKey("costCustomerName") ? String.valueOf(args.get("costCustomerName")) : null;
		String costCustomerTaxNum 	= args.containsKey("costCustomerTaxNum") ? String.valueOf(args.get("costCustomerTaxNum")) : null;
		String accountMonth 		= args.containsKey("accountMonth") ? String.valueOf(args.get("accountMonth")) : null;
		String _DateType 			= args.containsKey("_DateType") ? String.valueOf(args.get("_DateType")) : null;
		String strFromDate 			= args.containsKey("strFromDate") ? String.valueOf(args.get("strFromDate")) : null;
		String strToDate 			= args.containsKey("strToDate") ? String.valueOf(args.get("strToDate")) : null;
		String costShipperUserNm 	= args.containsKey("costShipperUserNm") ? String.valueOf(args.get("costShipperUserNm")) : null;
		String blNum 				= args.containsKey("blNum") ? String.valueOf(args.get("blNum")) : null;
		String singoNum 			= args.containsKey("singoNum") ? String.valueOf(args.get("singoNum")) : null;
		String referenceNum1 		= args.containsKey("referenceNum1") ? String.valueOf(args.get("referenceNum1")) : null;
		String referenceNum2 		= args.containsKey("referenceNum2") ? String.valueOf(args.get("referenceNum2")) : null;
		String costMstStatus 		= args.containsKey("costMstStatus") ? String.valueOf(args.get("costMstStatus")) : null;
		String useYn 				= args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "";

		Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn"));
		if (!CmmnUtils.isNull(costMstKey)) spec = spec.and(CmmnSpecs.eqNumberSpec(costMstKey, "costMstKey"));
		if (!CmmnUtils.isNull(costMstCl)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(costMstCl, "costMstCl"));
		if (!CmmnUtils.isNull(costCustomerDb)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(costCustomerDb, "costCustomerDb"));
		if (!CmmnUtils.isNull(costCustomerName)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(costCustomerName, "costCustomerName"));
		if (!CmmnUtils.isNull(costCustomerTaxNum)) spec = spec.and(CmmnSpecs.eqStringSpec(costCustomerTaxNum, "costCustomerTaxNum"));
		if (!CmmnUtils.isNull(accountMonth)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(accountMonth, "accountMonth"));
		if (!CmmnUtils.isNull(costShipperUserNm)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(costShipperUserNm, "costShipperUserNm"));
		if (!CmmnUtils.isNull(blNum)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(blNum, "blNum"));
		if (!CmmnUtils.isNull(singoNum)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(singoNum, "singoNum"));
		if (!CmmnUtils.isNull(referenceNum1)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(referenceNum1, "referenceNum1"));
		if (!CmmnUtils.isNull(referenceNum2)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(referenceNum2, "referenceNum2"));
		if (!CmmnUtils.isNull(costMstStatus)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(costMstStatus, "costMstStatus"));
		if (!CmmnUtils.isNull(_DateType) && !CmmnUtils.isNull(strFromDate) && !CmmnUtils.isNull(strToDate)) {
		  if (CmmnUtils.stringContainsItemFromList(_DateType, new String[]{"addDtm", "editDtm"})) {
			  strFromDate = strFromDate.substring(0, 8) + "000000";
			  strToDate = strToDate.substring(0, 8) + "999999";
		  }
		  spec = spec.and(CmmnSpecs.betweenObjectSpec(strFromDate, strToDate, _DateType));
		}

		return spec;
	}

	public List<Map> selectCustomsCostAllExcelExportList(Map args) throws Exception {
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectCustomsCostAllExcelExportList(CmmnUtils.replaceMapSc(args));
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
	public CustomsCostMasterVO saveCustomsCostMaster(CustomsCostMasterVO customsCostMasterVO, HttpServletRequest request) throws Exception {
		CustomsCostMasterVO returnVO = customsCostMasterDao.save(customsCostMasterVO);

		return returnVO;
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
	public CustomsCostDetailVO saveCustomsCostDetail(CustomsCostDetailVO customsCostDetailVO, HttpServletRequest request) throws Exception {
		CustomsCostDetailVO returnVO = customsCostDetailDao.save(customsCostDetailVO);

		return returnVO;
	}

	public List<CustomsCostDetailVO> selectCustomsCostDetailList(Map args) throws Exception{
		Specifications spec = getCustomsCostDetailSpec(args);
		Sort orders = new Sort(Sort.Direction.DESC, "useYn").and(new Sort(Sort.Direction.DESC, "costDtlKey"));
		return customsCostDetailDao.findAll(spec, orders);
	}

	private Specifications getCustomsCostDetailSpec(Map args){
		BigDecimal costDtlKey 	= CmmnUtils.isContainsMapValue(args, "costDtlKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("costDtlKey"))) : null;
		String useYn 			= args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "";

		Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn"));
		if (!CmmnUtils.isNull(costDtlKey)) spec = spec.and(CmmnSpecs.eqNumberSpec(costDtlKey, "costDtlKey"));

		return spec;
	}

	public List<Map> selectGeodisExportDeclarationMasterList(Map args) {
		return sqlSession.getMapper(ExpoCustomsMapper.class).selectGeodisExportDeclarationMasterList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectGeodisExportDeclarationDetailList(Map args) {
		return sqlSession.getMapper(ExpoCustomsMapper.class).selectGeodisExportDeclarationDetailList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectGeodisExportDeclarationSubDetailList(Map args) {
		return sqlSession.getMapper(ExpoCustomsMapper.class).selectGeodisExportDeclarationSubDetailList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectMainGraphImportList(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectMainGraphImportList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectMainGraphExportList(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectMainGraphExportList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectMainGraphTotalList(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectMainGraphTotalList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImportStatisticsList(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectImportStatisticsList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExportStatisticsList(Map args) throws Exception{
		return sqlSession.getMapper(ExpoCustomsMapper.class).selectExportStatisticsList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImportStatisticsYearList(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectImportStatisticsYearList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExportStatisticsYearList(Map args) throws Exception{
		return sqlSession.getMapper(ExpoCustomsMapper.class).selectExportStatisticsYearList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImpoExpoStatisticsList(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectImpoExpoStatisticsList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImpoExpoStatisticsYearList(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectImpoExpoStatisticsYearList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectSeinYearGraphList(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectSeinYearGraphList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectMailingList(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectMailingList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectGucciList(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectGucciList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectGucciDetailList(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectGucciDetailList(CmmnUtils.replaceMapSc(args));
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = { Exception.class })
	public Map updateImportDeliveryCostList(Map args) throws Exception {
	    if(args.size() > 0){
	      sqlSession.getMapper(ImpoCustomsMapper.class).updateImportDeliveryCostList(args);
	    }
	    return args;
	}

	public List<Map> selectDelayCheckList(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectDelayCheckList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectDelayCheckAllList(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectDelayCheckAllList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectBanchulCheckList(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectBanchulCheckList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectBanchulCheckAllList(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectBanchulCheckAllList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectReExpoCheckList(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectReExpoCheckList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectShipCheckList(Map args) throws Exception{
		return sqlSession.getMapper(ExpoCustomsMapper.class).selectShipCheckList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectShipCheckList1(Map args) throws Exception{
		return sqlSession.getMapper(ExpoCustomsMapper.class).selectShipCheckList1(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectShipCheckAllList(Map args) throws Exception{
		return sqlSession.getMapper(ExpoCustomsMapper.class).selectShipCheckAllList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImportKpiList(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectImportKpiList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImportKpiAllList(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectImportKpiAllList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImportSummary(Map args){
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectImportSummary(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExportBanipStatusList(Map args) throws Exception{
		return sqlSession.getMapper(ExpoCustomsMapper.class).selectExportBanipStatusList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExportBanipAllStatusList(Map args) throws Exception{
		return sqlSession.getMapper(ExpoCustomsMapper.class).selectExportBanipAllStatusList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImportFieldAllStatusList(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectImportFieldAllStatusList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImportJungFieldAllStatusList(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectImportJungFieldAllStatusList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExportFieldAllStatusList(Map args) throws Exception{
		return sqlSession.getMapper(ExpoCustomsMapper.class).selectExportFieldAllStatusList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExportJungFieldAllStatusList(Map args) throws Exception{
		return sqlSession.getMapper(ExpoCustomsMapper.class).selectExportJungFieldAllStatusList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectJangchList(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectJangchList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectMkImportDeclarationMasterList(Map args) {
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectMkImportDeclarationMasterList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectMkImportDeclarationDetailList(Map args) {
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectMkImportDeclarationDetailList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectMkImportDeclarationSubDetailList(Map args) {
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectMkImportDeclarationSubDetailList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectMkImpoDetailListByImpoKeyList(Map args) throws Exception {
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectMkImpoDetailListByImpoKeyList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectMkImpoSubDetailListByImpoKeyList(Map args) throws Exception {
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectMkImpoSubDetailListByImpoKeyList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectFtaList(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectFtaList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExFtaList(Map args) throws Exception{
		return sqlSession.getMapper(ExpoCustomsMapper.class).selectExFtaList(CmmnUtils.replaceMapSc(args));
	}

	public long saveImpo1mdtl(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).saveImpo1mdtl(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectTodsCount(Map args) throws Exception {
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectTodsCount(CmmnUtils.replaceMapSc(args));
	}

	public long insertImpo1MdtlDelLog(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).insertImpo1MdtlDelLog(CmmnUtils.replaceMapSc(args));
	}

	public long updateImpo1Mdtl(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).updateImpo1Mdtl(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImportZeissRequestList(Map args) throws Exception {
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectImportZeissRequestList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImportZeissDecide(Map args) throws Exception {
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectImportZeissDecide(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectZeissFileDownList(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectZeissFileDownList(CmmnUtils.replaceMapSc(args));
	}

	public long selectZeissFileDel(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectZeissFileDel(CmmnUtils.replaceMapSc(args));
	}

	public long selectZeissFileTempDel(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectZeissFileTempDel(CmmnUtils.replaceMapSc(args));
	}

	public long selectZeissFileTemp1Del(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectZeissFileTemp1Del(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectZeissFileDown(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectZeissFileDown(CmmnUtils.replaceMapSc(args));
	}

	public long selectZeissTempInsert(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectZeissTempInsert(CmmnUtils.replaceMapSc(args));
	}

	public long selectZeissTemp1Insert(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectZeissTemp1Insert(CmmnUtils.replaceMapSc(args));
	}

	public long selectZeissFileInsert(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectZeissFileInsert(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectFileCount(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectFileCount(CmmnUtils.replaceMapSc(args));
	}

	public long saveFieldManage(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).saveFieldManage(CmmnUtils.replaceMapSc(args));
	}

	public long updateFieldManage(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).updateFieldManage(CmmnUtils.replaceMapSc(args));
	}

	public long deleteFieldManage(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).deleteFieldManage(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectFieldManage(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectFieldManage(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectCostcoAccountList(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectCostcoAccountList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectCostcoFeesList(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectCostcoFeesList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectCostcoImportStatusList(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectCostcoImportStatusList(CmmnUtils.replaceMapSc(args));
	}

	public long saveCostcoFees(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).saveCostcoFees(CmmnUtils.replaceMapSc(args));
	}

	public long deleteCostcoFees(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).deleteCostcoFees(CmmnUtils.replaceMapSc(args));
	}

	public long changeCostcoFees(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).deleteCostcoFees(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImJungList(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectImJungList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImJungDetailList(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectImJungDetailList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExJungList(Map args) throws Exception{
		return sqlSession.getMapper(ExpoCustomsMapper.class).selectExJungList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExJungDetailList(Map args) throws Exception{
		return sqlSession.getMapper(ExpoCustomsMapper.class).selectExJungDetailList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImportSebStatusList(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectImportSebStatusList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImportSebStatusDetail(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectImportSebStatusDetail(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImportSebStatusSubDetail(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectImportSebStatusSubDetail(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImpoDetailListByImpoKeyList(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectImpoDetailListByImpoKeyList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImpoSubDetailListByImpoKeyList(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectImpoSubDetailListByImpoKeyList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImpoAllListByImpoKeyList(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectImpoAllListByImpoKeyList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectSeinTotalList(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectSeinTotalList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectSeinTotalList1(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectSeinTotalList1(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectSeinTotalList2(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectSeinTotalList2(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectSeinTotalList3(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectSeinTotalList3(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectSeinTotalList4(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectSeinTotalList4(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectSeinTotalList5(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectSeinTotalList5(CmmnUtils.replaceMapSc(args));
	}


















  public List<Map> getExportStartInfoWithEdmsListByMapper(Map args) throws Exception {
	return sqlSession.getMapper(ExpoCustomsMapper.class).findExportStartInfoWithEdmsList(CmmnUtils.replaceMapSc(args));
  }

  public List<ExpoStartInfoVO> getExportStartInfoListBySpec(Map args) {
	BigDecimal imsKey = CmmnUtils.isContainsMapValue(args, "imsKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("imsKey"))) : null;
	BigDecimal imsTaxpayerKey = CmmnUtils.isContainsMapValue(args, "imsTaxpayerKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("imsTaxpayerKey"))) : null;
	String imsTaxpayerTradeName = args.containsKey("imsTaxpayerTradeName") ? String.valueOf(args.get("imsTaxpayerTradeName")) : null;
	String imsTaxpayerNum = args.containsKey("imsTaxpayerNum") ? String.valueOf(args.get("imsTaxpayerNum")) : null;
	String imsInvoiceNo = args.containsKey("imsInvoiceNo") ? String.valueOf(args.get("imsInvoiceNo")) : null;
	List<String> inImsHouseBl = args.containsKey("inImsHouseBl") ? Arrays.asList(String.valueOf(args.get("inImsHouseBl")).replace("[", "").replace("]", "").split("\\s*,\\s*")) : null;
	String strFromDate = args.containsKey("strFromDate") ? String.valueOf(args.get("strFromDate")) : null;
	String strToDate = args.containsKey("strToDate") ? String.valueOf(args.get("strToDate")) : null;
	String imsUseYn = args.containsKey("imsUseYn") ? String.valueOf(args.get("imsUseYn")) : "";

	//검색조건(필수:imsUseYn)
	Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(imsUseYn, "imsUseYn"));

	//검색조건
	if (!CmmnUtils.isNull(imsKey)) spec = spec.and(CmmnSpecs.eqNumberSpec(imsKey, "imsKey"));
	if (!CmmnUtils.isNull(imsTaxpayerKey)) spec = spec.and(CmmnSpecs.eqNumberSpec(imsTaxpayerKey, "imsTaxpayerKey"));
	if (!CmmnUtils.isNull(imsTaxpayerTradeName)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(imsTaxpayerTradeName, "imsTaxpayerTradeName"));
	if (!CmmnUtils.isNull(imsTaxpayerNum)) spec = spec.and(CmmnSpecs.eqStringSpec(imsTaxpayerNum, "imsTaxpayerNum"));
	if (!CmmnUtils.isNull(imsInvoiceNo)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(imsInvoiceNo, "imsInvoiceNo"));
	if (!CmmnUtils.isNull(inImsHouseBl)) spec = spec.and(CmmnSpecs.inListStringSpec(inImsHouseBl, "imsHouseBl"));
	if (!CmmnUtils.isNull(strFromDate)) spec = spec.and(CmmnSpecs.geStringSpec(strFromDate, "imsSubmitDay"));
	if (!CmmnUtils.isNull(strToDate)) spec = spec.and(CmmnSpecs.leStringSpec(strToDate, "imsSubmitDay"));
//			if (fromImsSubmitDate != null && toImsSubmitDate != null) spec = spec.and(CommonSpecs.betweenObjectSpec(fromImsSubmitDate, toImsSubmitDate, "imsSubmitDate"));

	return exportStartInfoDao.findAll(spec);
  }

  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public ExpoStartInfoVO saveExpoStartInfo(ExpoStartInfoVO expoStartInfoVO, HttpServletRequest request) throws Exception {
	ExpoStartInfoVO returnVO = exportStartInfoDao.save(expoStartInfoVO);

	return returnVO;
  }



  public List<Map> getImportDetailStatusList(Map args) throws Exception {
	return sqlSession.getMapper(ImpoCustomsMapper.class).findImportDetailStatusList(CmmnUtils.replaceMapSc(args));
  }

  public List<Map> getImportSubDetailStatusList(Map args) throws Exception {
	return sqlSession.getMapper(ImpoCustomsMapper.class).findImportSubDetailStatusList(CmmnUtils.replaceMapSc(args));
  }

  public List<Map> getExportStatusList(Map args) throws Exception {
	return sqlSession.getMapper(ExpoCustomsMapper.class).findExportStatusList(CmmnUtils.replaceMapSc(args));
  }

  public List<Map> getExportDetailStatusList(Map args) throws Exception {
	return sqlSession.getMapper(ExpoCustomsMapper.class).findExportDetailStatusList(CmmnUtils.replaceMapSc(args));
  }

  public List<Map> getExportSubDetailStatusList(Map args) throws Exception {
	return sqlSession.getMapper(ExpoCustomsMapper.class).findExportSubDetailStatusList(CmmnUtils.replaceMapSc(args));
  }

  public Map<String, Object> getImpoCostMasterList(Map<String, String> args) throws Exception {
    Map<String, Object> result = new HashMap<String, Object>();
    result.put("gridData", sqlSession.getMapper(ImpoCustomsMapper.class).selectImpoCostMasterList(CmmnUtils.replaceMapSc(args)));
    //result.put("gridDataForExcel", sqlSession.getMapper(ImpoCustomsMapper.class).selectImpoCostMasterForExcelList(CmmnUtils.replaceMapSc(args)));
    //result.put("gridDataForBlNoExcel", sqlSession.getMapper(ImpoCustomsMapper.class).selectImpoCostMasterImpoBlNoList(CmmnUtils.replaceMapSc(args)));
    if (args.containsKey("strAccDt") && !args.get("strAccDt").equals("")) {
      result.put("companySumData", sqlSession.getMapper(ImpoCustomsMapper.class).selectImpoCompanySumData(CmmnUtils.replaceMapSc(args)));
    }

    return result;
  }

  public List<Map<String, Object>> selectImpoCostByImpumIvnoList(Map<String, String> args) throws Exception {
    return sqlSession.getMapper(ImpoCustomsMapper.class).selectImpoCostByImpumIvnoList(CmmnUtils.replaceMapSc(args));
  }

  public List<Map<String, Object>> selectImpoCostByImpumIvnoDescList(Map<String, String> args) throws Exception {
    return sqlSession.getMapper(ImpoCustomsMapper.class).selectImpoCostByImpumIvnoDescList(CmmnUtils.replaceMapSc(args));
  }

  public Map<String, Object> selectImpoCostSubMasterList(Map<String, String> args) throws Exception {
    Map<String, Object> result = new HashMap<String, Object>();
    result.put("CostSubMasterByAccCodeList", sqlSession.getMapper(ImpoCustomsMapper.class).selectImpoCostSubMasterList(CmmnUtils.replaceMapSc(args)));
    result.put("CostSubMasterByCustomsList", sqlSession.getMapper(ImpoCustomsMapper.class).selectImpoCostSubMasterByCustomsList(CmmnUtils.replaceMapSc(args)));
    return result;
  }

  public Map<String, Object> selectImpoCostSubMasterDetailList(Map<String, String> args) throws Exception {
    Map<String, Object> result = new HashMap<String, Object>();
    result.put("CostSubMasterDetailByAccCodeList", sqlSession.getMapper(ImpoCustomsMapper.class).selectImpoCostSubMasterDetailList(CmmnUtils.replaceMapSc(args)));
    return result;
  }

  public List<Map<String, Object>> selectImpo1MdtlLogList(Map<String, String> args) throws Exception {
    return sqlSession.getMapper(ImpoCustomsMapper.class).selectImpo1MdtlLogList(CmmnUtils.replaceMapSc(args));
  }

  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = { Exception.class })
  public Map updateImpo1MdtlCalculate(Map args, String userId, String userNm, String confDesc) throws Exception {
    if (args.size() > 0) {
      args.put("_userId", userId);
      args.put("_userNm", userNm);
      sqlSession.getMapper(ImpoCustomsMapper.class).updateImpo1MdtlCalculate(args);
      args.put("confDesc", confDesc);
      sqlSession.getMapper(ImpoCustomsMapper.class).insertImpo1MdtlLog(args);
    }
    return args;
  }

  public List<Map> getImportManagementList(Map args) throws Exception {
	return sqlSession.getMapper(ImpoCustomsMapper.class).findImportManagementList(CmmnUtils.replaceMapSc(args));
  }

  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = { Exception.class })
  public Map updateRecvImpo3(Map args) throws Exception {
    if (args.size() > 0) {
      sqlSession.getMapper(ImpoCustomsMapper.class).updateRecvImpo3(args);
    }
    return args;
  }

//  public Map<String, Object> getMKImpoCostMasterList(Map<String, String> args) throws Exception {
//    Map<String, Object> result = new HashMap<String, Object>();
//    result.put("gridData", sqlSession.getMapper(ImpoCustomsMapper.class).getMKImpoCostMasterList(CmmnUtils.replaceMapSc(args)));
//    //result.put("gridDataForExcel", sqlSession.getMapper(ImpoCustomsMapper.class).selectImpoCostMasterForExcelList(CmmnUtils.replaceMapSc(args)));
//    //result.put("gridDataForBlNoExcel", sqlSession.getMapper(ImpoCustomsMapper.class).selectImpoCostMasterImpoBlNoList(CmmnUtils.replaceMapSc(args)));
//    if (args.containsKey("strAccDt") && !args.get("strAccDt").equals("")) {
//      result.put("companySumData", sqlSession.getMapper(ImpoCustomsMapper.class).selectImpoCompanySumData(CmmnUtils.replaceMapSc(args)));
//    }
//
//    return result;
//  }



  public List<Map> getImportResultDetailList(Map args) {
		return sqlSession.getMapper(ImpoCustomsMapper.class).findImportResult소분류(CmmnUtils.replaceMapSc(args));
  }




  public List<Map> getExportResultDetailList(Map args) {
	return sqlSession.getMapper(ExpoCustomsMapper.class).findExportResult소분류(CmmnUtils.replaceMapSc(args));
  }



  public List<Map> getFtaList(Map args) throws Exception {
	return sqlSession.getMapper(ImpoCustomsMapper.class).findFtaList(CmmnUtils.replaceMapSc(args));
  }

  public List<Map> getFtaDetailList(Map args) throws Exception {
	return sqlSession.getMapper(ImpoCustomsMapper.class).findFtaDetailList(CmmnUtils.replaceMapSc(args));
  }

  public List<Map> selectImpoTaxList(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectImpoTaxList(CmmnUtils.replaceMapSc(args));
  }




}