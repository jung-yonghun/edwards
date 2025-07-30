package com.edwards.biz.customsManagement;

import com.edwards.commons.CmmnConstants;
import com.edwards.commons.CmmnSpecs;
import com.edwards.commons.CmmnUtils;
import com.edwards.domains.CpsStartInfoVO;
import com.edwards.domains.CustomsCostDetailVO;
import com.edwards.domains.CustomsCostMasterVO;
import com.edwards.domains.DeliveryCarVO;
import com.edwards.domains.DeliveryCarryingInVO;
import com.edwards.domains.DeliveryCostGroupVO;
import com.edwards.domains.DeliveryCostVO;
import com.edwards.domains.DeliveryRequestVO;
import com.edwards.domains.ExpoStartInfoVO;
import com.edwards.domains.ImpoStartInfoVO;
import com.edwards.domains.NcustomsGeoExpo1AdditionalVO;

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
	private ImportDeliveryRequestDao importDeliveryRequestDao;
	@Autowired
	private ImportDeliveryCarryingInDao importDeliveryCarryingInDao;
	@Autowired
	private ImportDeliveryCarDao importDeliveryCarDao;
	@Autowired
	private ImportDeliveryCostDao importDeliveryCostDao;
	@Autowired
	private ImportDeliveryCostGroupDao importDeliveryCostGroupDao;
	@Autowired
	private CustomsCostMasterDao customsCostMasterDao;
	@Autowired
	private CustomsCostDetailDao customsCostDetailDao;
	@Autowired
	private GeodisExpo1AdditionalDao geodisExpo1AdditionalDao;

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

	public List<DeliveryRequestVO> selectImportDeliveryRequestList(Map args) throws Exception{
		Specifications spec = getImportDeliveryRequestSpecifications(args);
		Sort orders = new Sort(Sort.Direction.DESC, "useYn").and(new Sort(Sort.Direction.DESC, "deliveryRequestKey"));

		return importDeliveryRequestDao.findAll(spec, orders);
	}

	private Specifications getImportDeliveryRequestSpecifications(Map args){
		BigDecimal deliveryRequestKey = CmmnUtils.isContainsMapValue(args, "deliveryRequestKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("deliveryRequestKey"))) : null;
		BigDecimal customerKey = CmmnUtils.isContainsMapValue(args, "customerKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("customerKey"))) : null;
		String customerDb = args.containsKey("customerDb") ? String.valueOf(args.get("customerDb")) : null;
		String customerCode = args.containsKey("customerCode") ? String.valueOf(args.get("customerCode")) : null;
		String customerName = args.containsKey("customerName") ? String.valueOf(args.get("customerName")) : null;
		String customerTaxNum = args.containsKey("customerTaxNum") ? String.valueOf(args.get("customerTaxNum")) : null;
		String mblNo = args.containsKey("mblNo") ? String.valueOf(args.get("mblNo")) : null;
		String hblNo = args.containsKey("hblNo") ? String.valueOf(args.get("hblNo")) : null;
		String cargoNo = args.containsKey("cargoNo") ? String.valueOf(args.get("cargoNo")) : null;
		String singoNo = args.containsKey("singoNo") ? String.valueOf(args.get("singoNo")) : null;
		String impoSegwan = args.containsKey("impoSegwan") ? String.valueOf(args.get("impoSegwan")) : null;
		String impoJangchBuho = args.containsKey("impoJangchBuho") ? String.valueOf(args.get("impoJangchBuho")) : null;
		String impoJangchName = args.containsKey("impoJangchName") ? String.valueOf(args.get("impoJangchName")) : null;
		String impoJangchJangso = args.containsKey("impoJangchJangso") ? String.valueOf(args.get("impoJangchJangso")) : null;
		String cargoStatus = args.containsKey("cargoStatus") ? String.valueOf(args.get("cargoStatus")) : null;
		String deliveryStatus = args.containsKey("deliveryStatus") ? String.valueOf(args.get("deliveryStatus")) : null;
		String landingArea = args.containsKey("landingArea") ? String.valueOf(args.get("landingArea")) : null;
		String banipPlace = args.containsKey("banipPlace") ? String.valueOf(args.get("banipPlace")) : null;
		String requestCoName = args.containsKey("requestCoName") ? String.valueOf(args.get("requestCoName")) : null;
		String requestMan = args.containsKey("requestMan") ? String.valueOf(args.get("requestMan")) : null;
		String assignId = args.containsKey("assignId") ? String.valueOf(args.get("assignId")) : null;
		String assignMan = args.containsKey("assignMan") ? String.valueOf(args.get("assignMan")) : null;
		BigDecimal deliveryCoKey = CmmnUtils.isContainsMapValue(args, "deliveryCoKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("deliveryCoKey"))) : null;
		String deliveryCoName = args.containsKey("deliveryCoName") ? String.valueOf(args.get("deliveryCoName")) : null;
		BigDecimal deliveryCarryingInKey = CmmnUtils.isContainsMapValue(args, "deliveryCarryingInKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("deliveryCarryingInKey"))) : null;
		String deliveryCarryingInName = args.containsKey("deliveryCarryingInName") ? String.valueOf(args.get("deliveryCarryingInName")) : null;
		String deliveryCarryingInTaxNum = args.containsKey("deliveryCarryingInTaxNum") ? String.valueOf(args.get("deliveryCarryingInTaxNum")) : null;
		String deliveryCarryingInMan = args.containsKey("deliveryCarryingInMan") ? String.valueOf(args.get("deliveryCarryingInMan")) : null;
		BigDecimal deliveryCarKey = CmmnUtils.isContainsMapValue(args, "deliveryCarKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("deliveryCarKey"))) : null;
		String deliveryCarName = args.containsKey("deliveryCarName") ? String.valueOf(args.get("deliveryCarName")) : null;
		String _DateType = args.containsKey("_DateType") ? String.valueOf(args.get("_DateType")) : null;
		String strFromDate = args.containsKey("strFromDate") ? String.valueOf(args.get("strFromDate")) : null;
		String strToDate = args.containsKey("strToDate") ? String.valueOf(args.get("strToDate")) : null;
		String useYn = "Y";
		String userGrade = String.valueOf(args.get("_userGrade")), userId = String.valueOf(args.get("_userId")), auth = String.valueOf(args.get("_Auth")), argCl = "KEYS";

		Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn"));
		if (!CmmnUtils.isNull(deliveryRequestKey)) spec = spec.and(CmmnSpecs.eqNumberSpec(deliveryRequestKey, "deliveryRequestKey"));
		if (!CmmnUtils.isNull(customerKey)) spec = spec.and(CmmnSpecs.eqNumberSpec(customerKey, "customerKey"));
		if (!CmmnUtils.isNull(customerDb)) spec = spec.and(CmmnSpecs.eqStringSpec(customerDb, "customerDb"));
		if (!CmmnUtils.isNull(customerCode)) spec = spec.and(CmmnSpecs.eqStringSpec(customerCode, "customerCode"));
		if (!CmmnUtils.isNull(customerName)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(customerName, "customerName"));
		if (!CmmnUtils.isNull(customerTaxNum)) spec = spec.and(CmmnSpecs.eqStringSpec(customerTaxNum, "customerTaxNum"));
		if (!CmmnUtils.isNull(mblNo)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(mblNo, "mblNo"));
		if (!CmmnUtils.isNull(hblNo)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(hblNo, "hblNo"));
		if (!CmmnUtils.isNull(cargoNo)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(cargoNo, "cargoNo"));
		if (!CmmnUtils.isNull(singoNo)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(singoNo, "singoNo"));
		if (!CmmnUtils.isNull(impoSegwan)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(impoSegwan, "impoSegwan"));
		if (!CmmnUtils.isNull(impoJangchBuho)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(impoJangchBuho, "impoJangchBuho"));
		if (!CmmnUtils.isNull(impoJangchName)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(impoJangchName, "impoJangchName"));
		if (!CmmnUtils.isNull(impoJangchJangso)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(impoJangchJangso, "impoJangchJangso"));
		if (!CmmnUtils.isNull(cargoStatus)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(cargoStatus, "cargoStatus"));
		if (!CmmnUtils.isNull(deliveryStatus)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(deliveryStatus, "deliveryStatus"));
		if (!CmmnUtils.isNull(landingArea)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(landingArea, "landingArea"));
		if (!CmmnUtils.isNull(banipPlace)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(banipPlace, "banipPlace"));
		if (!CmmnUtils.isNull(requestCoName)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(requestCoName, "requestCoName"));
		if (!CmmnUtils.isNull(requestMan)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(requestMan, "requestMan"));
		if (!CmmnUtils.isNull(assignId)) spec = spec.and(CmmnSpecs.eqStringSpec(assignId, "assignId"));
		if (!CmmnUtils.isNull(assignMan)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(assignMan, "assignMan"));
		if (!CmmnUtils.isNull(deliveryCoKey)) spec = spec.and(CmmnSpecs.eqNumberSpec(deliveryCoKey, "deliveryCoKey"));
		if (!CmmnUtils.isNull(deliveryCoName)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(deliveryCoName, "deliveryCoName"));
		if (!CmmnUtils.isNull(deliveryCarryingInKey)) spec = spec.and(CmmnSpecs.eqNumberSpec(deliveryCarryingInKey, "deliveryCarryingInKey"));
		if (!CmmnUtils.isNull(deliveryCarryingInName)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(deliveryCarryingInName, "deliveryCarryingInName"));
		if (!CmmnUtils.isNull(deliveryCarryingInTaxNum)) spec = spec.and(CmmnSpecs.eqStringSpec(deliveryCarryingInTaxNum, "deliveryCarryingInTaxNum"));
		if (!CmmnUtils.isNull(deliveryCarryingInMan)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(deliveryCarryingInMan, "deliveryCarryingInMan"));
		if (!CmmnUtils.isNull(deliveryCarKey)) spec = spec.and(CmmnSpecs.eqNumberSpec(deliveryCarKey, "deliveryCarKey"));
		if (!CmmnUtils.isNull(deliveryCarName)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(deliveryCarName, "deliveryCarName"));
		if (!CmmnUtils.isNull(_DateType) && !CmmnUtils.isNull(strFromDate) && !CmmnUtils.isNull(strToDate)) {
			strFromDate = strFromDate.substring(0, 8) + "000000";
			strToDate = strToDate.substring(0, 8) + "999999";
			spec = spec.and(CmmnSpecs.betweenObjectSpec(strFromDate, strToDate, _DateType));
		}
		return spec;
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
	public DeliveryRequestVO saveImportDeliveryRequest(DeliveryRequestVO deliveryRequestVO, HttpServletRequest request) throws Exception{
		DeliveryRequestVO returnVO = importDeliveryRequestDao.save(deliveryRequestVO);

		return returnVO;
	}

	public List<Map> selectImportDeliveryRequest(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectImportDeliveryRequest(CmmnUtils.replaceMapSc(args));
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
	public DeliveryRequestVO saveImportDeliveryRequestList(DeliveryRequestVO deliveryRequestVO, HttpServletRequest request) throws Exception {
		DeliveryRequestVO returnVO = importDeliveryRequestDao.save(deliveryRequestVO);

		return returnVO;
	}

	public List<DeliveryCarryingInVO> selectImportDeliveryCarryingInList(Map args) throws Exception{
		Specifications spec = getImportDeliveryCarryingInSpecifications(args);
		Sort orders = new Sort(Sort.Direction.DESC, "useYn").and(new Sort(Sort.Direction.DESC, "deliveryCarryingInKey"));

		return importDeliveryCarryingInDao.findAll(spec, orders);
	}

	private Specifications getImportDeliveryCarryingInSpecifications(Map args){
		BigDecimal deliveryCarryingInKey = CmmnUtils.isContainsMapValue(args, "deliveryCarryingInKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("deliveryCarryingInKey"))) : null;
		String deliveryCarryingInName = args.containsKey("deliveryCarryingInName") ? String.valueOf(args.get("deliveryCarryingInName")) : null;
		String deliveryCarryingInTaxNum = args.containsKey("deliveryCarryingInTaxNum") ? String.valueOf(args.get("deliveryCarryingInTaxNum")) : null;
		String deliveryCarryingInPhone = args.containsKey("deliveryCarryingInPhone") ? String.valueOf(args.get("deliveryCarryingInPhone")) : null;
		String deliveryCarryingInFax = args.containsKey("deliveryCarryingInFax") ? String.valueOf(args.get("deliveryCarryingInFax")) : null;
		String deliveryCarryingInMan = args.containsKey("deliveryCarryingInMan") ? String.valueOf(args.get("deliveryCarryingInMan")) : null;
		String deliveryCarryingInMobile = args.containsKey("deliveryCarryingInMobile") ? String.valueOf(args.get("deliveryCarryingInMobile")) : null;
		String deliveryCarryingInEmail = args.containsKey("deliveryCarryingInEmail") ? String.valueOf(args.get("deliveryCarryingInEmail")) : null;
		String deliveryCarryingInAddr = args.containsKey("deliveryCarryingInAddr") ? String.valueOf(args.get("deliveryCarryingInAddr")) : null;
		String useYn = args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "";

		Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn"));
		if (!CmmnUtils.isNull(deliveryCarryingInKey)) spec = spec.and(CmmnSpecs.eqNumberSpec(deliveryCarryingInKey, "deliveryCarryingInKey"));
		if (!CmmnUtils.isNull(deliveryCarryingInName)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(deliveryCarryingInName, "deliveryCarryingInName"));
		if (!CmmnUtils.isNull(deliveryCarryingInTaxNum)) spec = spec.and(CmmnSpecs.eqStringSpec(deliveryCarryingInTaxNum, "deliveryCarryingInTaxNum"));
		if (!CmmnUtils.isNull(deliveryCarryingInPhone)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(deliveryCarryingInPhone, "deliveryCarryingInPhone"));
		if (!CmmnUtils.isNull(deliveryCarryingInFax)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(deliveryCarryingInFax, "deliveryCarryingInFax"));
		if (!CmmnUtils.isNull(deliveryCarryingInMan)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(deliveryCarryingInMan, "deliveryCarryingInMan"));
		if (!CmmnUtils.isNull(deliveryCarryingInMobile)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(deliveryCarryingInMobile, "deliveryCarryingInMobile"));
		if (!CmmnUtils.isNull(deliveryCarryingInEmail)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(deliveryCarryingInEmail, "deliveryCarryingInEmail"));
		if (!CmmnUtils.isNull(deliveryCarryingInAddr)) spec = spec.and(CmmnSpecs.bothLikeStringSpec(deliveryCarryingInAddr, "deliveryCarryingInAddr"));

		return spec;
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
	public DeliveryCarryingInVO saveImportDeliveryCarryingInList(DeliveryCarryingInVO deliveryCarryingInVO, HttpServletRequest request) throws Exception {
		DeliveryCarryingInVO returnVO = importDeliveryCarryingInDao.save(deliveryCarryingInVO);

		return returnVO;
	}

	public List<DeliveryCarVO> selectImportDeliveryCarList(Map args) throws Exception{
		Specifications spec = getImportDeliveryCarSpecifications(args);
		Sort orders = new Sort(Sort.Direction.ASC, "deliveryCarName");

		return importDeliveryCarDao.findAll(spec, orders);
	}

	private Specifications getImportDeliveryCarSpecifications(Map args){
		BigDecimal deliveryCarKey = CmmnUtils.isContainsMapValue(args, "deliveryCarKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("deliveryCarKey"))) : null;
		BigDecimal deliveryCoKey = CmmnUtils.isContainsMapValue(args, "deliveryCoKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("deliveryCoKey"))) : null;
		String deliveryCarName = args.containsKey("deliveryCarName") ? String.valueOf(args.get("deliveryCarName")) : null;
		String deliveryCarPhone = args.containsKey("deliveryCarPhone") ? String.valueOf(args.get("deliveryCarPhone")) : null;
		String deliveryCarNum = args.containsKey("deliveryCarNum") ? String.valueOf(args.get("deliveryCarNum")) : null;
		String deliveryCarEtc = args.containsKey("deliveryCarEtc") ? String.valueOf(args.get("deliveryCarEtc")) : null;
		String useYn = args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "";

		Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn"));
		if (!CmmnUtils.isNull(deliveryCarKey)) spec = spec.and(CmmnSpecs.eqNumberSpec(deliveryCarKey, "deliveryCarKey"));
		if (!CmmnUtils.isNull(deliveryCoKey)) spec = spec.and(CmmnSpecs.eqNumberSpec(deliveryCoKey, "deliveryCoKey"));
		if (!CmmnUtils.isNull(deliveryCarName)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(deliveryCarName, "deliveryCarName"));
		if (!CmmnUtils.isNull(deliveryCarPhone)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(deliveryCarPhone, "deliveryCarPhone"));
		if (!CmmnUtils.isNull(deliveryCarNum)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(deliveryCarNum, "deliveryCarNum"));
		if (!CmmnUtils.isNull(deliveryCarEtc)) spec = spec.and(CmmnSpecs.bothLikeStringSpec(deliveryCarEtc, "deliveryCarEtc"));

		return spec;
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
	public DeliveryCarVO saveImportDeliveryCarList(DeliveryCarVO deliveryCarVO, HttpServletRequest request) throws Exception {
		DeliveryCarVO returnVO = importDeliveryCarDao.save(deliveryCarVO);

		return returnVO;
	}

	public List<Map> selectImportDeliveryCompleteCostList(Map args) throws Exception {
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectImportDeliveryCompleteCostList(CmmnUtils.replaceMapSc(args));
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
	public DeliveryCostVO saveImportDeliveryCostList(DeliveryCostVO deliveryCostVO, HttpServletRequest request) throws Exception {
		DeliveryCostVO returnVO = importDeliveryCostDao.save(deliveryCostVO);

		return returnVO;
	}

	public List<Map> selectImportDeliveryCostList(Map args) throws Exception {
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectImportDeliveryCostList(CmmnUtils.replaceMapSc(args));
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
	public DeliveryCostGroupVO saveImportDeliveryCostGroupList(DeliveryCostGroupVO deliveryCostGroupVO, HttpServletRequest request) throws Exception {
		DeliveryCostGroupVO returnVO = importDeliveryCostGroupDao.save(deliveryCostGroupVO);

		return returnVO;
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = { Exception.class })
	public Map updateImportDeliveryCostGroupList(Map args) throws Exception {
	    if(args.size() > 0){
	      sqlSession.getMapper(ImpoCustomsMapper.class).updateImportDeliveryCostGroupList(args);
	    }
	    return args;
	}

	public List<DeliveryCostVO> selectImportDeliveryCostSearchList(Map args) throws Exception{
		Specifications spec = getImportDeliveryCostSearchSpecifications(args);
		Sort orders = new Sort(Sort.Direction.DESC, "useYn").and(new Sort(Sort.Direction.DESC, "deliveryCostKey"));

		return importDeliveryCostDao.findAll(spec, orders);
	}

	private Specifications getImportDeliveryCostSearchSpecifications(Map args){
		BigDecimal deliveryCostKey = CmmnUtils.isContainsMapValue(args, "deliveryCostKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("deliveryCostKey"))) : null;
		String useYn = args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "";

		Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn"));
		if (!CmmnUtils.isNull(deliveryCostKey)) spec = spec.and(CmmnSpecs.eqNumberSpec(deliveryCostKey, "deliveryCostKey"));

		return spec;
	}

	public List<Map> selectImportDeliveryRequestGroupListByDeliveryCoKey(Map args) throws Exception {
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectImportDeliveryRequestGroupListByDeliveryCoKey(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImportDeliveryRequestGroupList(Map args) throws Exception {
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectImportDeliveryRequestGroupList(CmmnUtils.replaceMapSc(args));
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

	public List<NcustomsGeoExpo1AdditionalVO> selectGeodisExpoAdditionalInfoList(Map args) throws Exception {
		BigDecimal expo1AdditionalKey = CmmnUtils.isContainsMapValue(args, "expo1AdditionalKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("expo1AdditionalKey"))) : null;
		String expoDb = args.containsKey("expoDb") ? String.valueOf(args.get("expoDb")) : null;
		String expoKey = args.containsKey("expoKey") ? String.valueOf(args.get("expoKey")) : null;
		String additionalInfo1 = args.containsKey("additionalInfo1") ? String.valueOf(args.get("additionalInfo1")) : null;
		String additionalInfo2 = args.containsKey("additionalInfo2") ? String.valueOf(args.get("additionalInfo2")) : null;
		String useYn = args.containsKey("useYn") ? String.valueOf(args.get("useYn")) : "Y";

		Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "useYn"));
		if (!CmmnUtils.isNull(expo1AdditionalKey)) spec = spec.and(CmmnSpecs.eqNumberSpec(expo1AdditionalKey, "expo1AdditionalKey"));
		if (!CmmnUtils.isNull(expoDb)) spec = spec.and(CmmnSpecs.eqStringSpec(expoDb, "expoDb"));
		if (!CmmnUtils.isNull(expoKey)) spec = spec.and(CmmnSpecs.eqStringSpec(expoKey, "expoKey"));
		if (!CmmnUtils.isNull(additionalInfo1)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(additionalInfo1, "additionalInfo1"));
		if (!CmmnUtils.isNull(additionalInfo2)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(additionalInfo2, "additionalInfo2"));
		Sort orders = new Sort(Sort.Direction.DESC, "useYn").and(new Sort(Sort.Direction.ASC, "expo1AdditionalKey"));

		return geodisExpo1AdditionalDao.findAll(spec, orders);
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = { Exception.class })
	public Map updateGeodisExpoAdditionalInfo(Map args) throws Exception {
	    if(args.size() > 0){
	      sqlSession.getMapper(ExpoCustomsMapper.class).updateGeodisExpoAdditionalInfo(args);
	    }
	    return args;
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = { Exception.class })
	public Map updateGeodisExpoAdditionalInfo1(Map args) throws Exception {
	    if(args.size() > 0){
	      sqlSession.getMapper(ExpoCustomsMapper.class).updateGeodisExpoAdditionalInfo1(args);
	    }
	    return args;
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
	public List<NcustomsGeoExpo1AdditionalVO> saveNcustomsGeodisExpoAdditionalInfoList(List<NcustomsGeoExpo1AdditionalVO> ncustomsGeoExpo1AdditionalVOList, HttpServletRequest request) throws Exception {
		List<NcustomsGeoExpo1AdditionalVO> validateList = new ArrayList<>();
		String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
		String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
		String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");

		// validation
		for(NcustomsGeoExpo1AdditionalVO vo : ncustomsGeoExpo1AdditionalVOList){
			NcustomsGeoExpo1AdditionalVO validateVO = modelMapper.map(vo, NcustomsGeoExpo1AdditionalVO.class);
			validateVO.setAddUserId(userId);
			validateVO.setAddUserNm(userNm);
			validateVO.setEditUserId(userId);
			validateVO.setEditUserNm(userNm);
			validateVO.setAddDtm(currentDatetime);
			Set<ConstraintViolation<NcustomsGeoExpo1AdditionalVO>> validator = CmmnUtils.isCommonValid(validateVO);
			if (validator.size() > 0) {
				Object[] parameter = validator.toArray();
				throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
			}
			validateList.add(vo);
		}

		List<NcustomsGeoExpo1AdditionalVO> returnList = geodisExpo1AdditionalDao.save(ncustomsGeoExpo1AdditionalVOList);

		return returnList;
	}

	public List<Map> selectGeodisImportDeclarationMasterList(Map args) {
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectGeodisImportDeclarationMasterList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectGeodisImportDeclarationDetailList(Map args) {
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectGeodisImportDeclarationDetailList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectGeodisImportDeclarationSubDetailList(Map args) {
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectGeodisImportDeclarationSubDetailList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectGeodisExportAccountCostWithAdditionalInfoList(Map args) {
		return sqlSession.getMapper(ExpoCustomsMapper.class).selectGeodisExportAccountCostWithAdditionalInfoList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectMainGraphList(Map args) throws Exception{
		return sqlSession.getMapper(ImpoCustomsMapper.class).selectMainGraphList(CmmnUtils.replaceMapSc(args));
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