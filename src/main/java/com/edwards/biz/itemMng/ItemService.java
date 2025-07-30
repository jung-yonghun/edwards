package com.edwards.biz.itemMng;

import com.edwards.biz.codeManagement.CmmnDataInfoDao;
import com.edwards.commons.CmmnConstants;
import com.edwards.commons.CmmnSpecs;
import com.edwards.commons.CmmnUtils;
import com.edwards.domains.CpsSaveCustomerVO;
import com.edwards.domains.DeliveryCarryingInVO;
import com.edwards.domains.ItemHsMasterVO;
import com.edwards.domains.ResultEtlImportUnitPriceVO;
import com.edwards.domains.SooMst_ItemMasterVO;

import org.apache.commons.lang3.StringUtils;
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
import java.util.stream.Collectors;

@Service
public class ItemService {
	@Qualifier("SqlSessionTemplate")
	@Autowired
	private SqlSession sqlSession;
	@Autowired
	private ItemMasterDao itemMasterDao;
	@Autowired
	private ItemHistoryService itemHistoryService;
	@Autowired
	private ResultImportUnitPriceDao resultImportUnitPriceDao;

	@Qualifier("cmmnDataInfoDao")
	@Autowired
	private CmmnDataInfoDao cmmnDataInfoDao;
	@Autowired
	private ItemHsMasterDao itemHsMasterDao;
	@Autowired
	private MessageSource messageSource;
	@Autowired
	private ModelMapper modelMapper;

	public List<Map> selectItemHsMasterList(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).selectItemHsMasterList(CmmnUtils.replaceMapSc(args));
	}

//	public List<ItemHsMasterVO> selectItemHsMasterList(Map args) throws Exception{
//		Specifications spec = getItemHsMasterSpecifications(args);
//		Sort orders = new Sort(Sort.Direction.DESC, "UseYN").and(new Sort(Sort.Direction.DESC, "MAAD100MKey"));
//
//		return itemHsMasterDao.findAll(spec, orders);
//	}
//
//	private Specifications getItemHsMasterSpecifications(Map args){
//		BigDecimal MAAD100MKey = CmmnUtils.isContainsMapValue(args, "MAAD100MKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("MAAD100MKey"))) : null;
//		String hsStatus = args.containsKey("hsStatus") ? String.valueOf(args.get("hsStatus")) : null;
//		String hsStatus_cus = args.containsKey("hsStatus_cus") ? String.valueOf(args.get("hsStatus_cus")) : null;
//		String hsRegNum = args.containsKey("hsRegNum") ? String.valueOf(args.get("hsRegNum")) : null;
//		String hsImportance = args.containsKey("hsImportance") ? String.valueOf(args.get("hsImportance")) : null;
//		String hsRegUserComName = args.containsKey("hsRegUserComName") ? String.valueOf(args.get("hsRegUserComName")) : null;
//		String hsRegUserComTaxNum = args.containsKey("hsRegUserComTaxNum") ? String.valueOf(args.get("hsRegUserComTaxNum")) : null;
//		String itemMmodelCode = args.containsKey("itemMmodelCode") ? String.valueOf(args.get("itemMmodelCode")) : null;
//		String itemMstdGoods = args.containsKey("itemMstdGoods") ? String.valueOf(args.get("itemMstdGoods")) : null;
//		String itemHs = args.containsKey("itemHs") ? String.valueOf(args.get("itemHs")) : null;
//		String hsRegUserNm = args.containsKey("hsRegUserNm") ? String.valueOf(args.get("hsRegUserNm")) : null;
//		String _DateType = args.containsKey("_DateType") ? String.valueOf(args.get("_DateType")) : null;
//		String strFromDate = args.containsKey("strFromDate") ? String.valueOf(args.get("strFromDate")) : null;
//		String strToDate = args.containsKey("strToDate") ? String.valueOf(args.get("strToDate")) : null;
//		String USERID = args.containsKey("USERID") ? String.valueOf(args.get("USERID")) : null;
//		String useYn = args.containsKey("UseYN") ? String.valueOf(args.get("UseYN")) : "Y";
//
//		Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(useYn, "UseYN"));
//		if (!CmmnUtils.isNull(MAAD100MKey)) spec = spec.and(CmmnSpecs.eqNumberSpec(MAAD100MKey, "MAAD100MKey"));
//		if (!CmmnUtils.isNull(hsStatus)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(hsStatus, "hsStatus"));
//		if (!CmmnUtils.isNull(hsStatus_cus)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(hsStatus_cus, "hsStatus_cus"));
//		if (!CmmnUtils.isNull(hsRegNum)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(hsRegNum, "hsRegNum"));
//		if (!CmmnUtils.isNull(hsImportance)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(hsImportance, "hsImportance"));
//		if (!CmmnUtils.isNull(hsRegUserComName)) spec = spec.and(CmmnSpecs.bothLikeStringSpec(hsRegUserComName, "hsRegUserComName"));
//		if (!CmmnUtils.isNull(hsRegUserComTaxNum)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(hsRegUserComTaxNum, "hsRegUserComTaxNum"));
//		if (!CmmnUtils.isNull(itemMmodelCode)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(itemMmodelCode, "itemMmodelCode"));
//		if (!CmmnUtils.isNull(itemMstdGoods)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(itemMstdGoods, "itemMstdGoods"));
//		if (!CmmnUtils.isNull(itemHs)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(itemHs, "itemHs"));
//		if (!CmmnUtils.isNull(hsRegUserNm)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(hsRegUserNm, "hsRegUserNm"));
//		if (!CmmnUtils.isNull(USERID)) spec = spec.and(CmmnSpecs.eqStringSpec(USERID, "addUserId"));
//		if (!CmmnUtils.isNull(_DateType) && !CmmnUtils.isNull(strFromDate) && !CmmnUtils.isNull(strToDate)) {
//		  if ("editDtm".equals(_DateType)) {
//			  strFromDate = strFromDate.substring(0, 8) + "000000";
//			  strToDate = strToDate.substring(0, 8) + "999999";
//		  }
//		  spec = spec.and(CmmnSpecs.betweenObjectSpec(strFromDate, strToDate, _DateType));
//		}
//
//		return spec;
//	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
	public List<ItemHsMasterVO> insertItemHsMasterList(List<ItemHsMasterVO> voList, HttpServletRequest request) throws Exception {
		List<ItemHsMasterVO> validateList = new ArrayList<>();
		String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_ID));
		String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
		String currentDatetime = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
		String currentDate = CmmnUtils.getFormatedDate("yyyyMMdd");

		for (ItemHsMasterVO vo : voList) {
			ItemHsMasterVO validateVO = modelMapper.map(vo, ItemHsMasterVO.class);
			validateVO.setAdduserid(userId);
			validateVO.setAdduserNm(userNm);
			validateVO.setHsRegNum(getItemHsRegNumber(currentDate, "0", 6));
			validateVO.setAddDtm(currentDatetime);
			Set<ConstraintViolation<ItemHsMasterVO>> validator = CmmnUtils.isCommonValid(validateVO);
			if (validator.size() > 0) {
				Object[] parameter = validator.toArray();
				throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
			}
			validateList.add(vo);
		}

		List<ItemHsMasterVO> returnVO = itemHsMasterDao.save(validateList);

		return returnVO;
	}

	@Transactional(readOnly = true)
	public String getItemHsRegNumber(String hsRegDt, String paddingChar, int paddingSize) throws Exception {
		int num = itemHsMasterDao.countByHsRegDt(hsRegDt) + 1;
		return "HS" + CmmnUtils.getFormatedDate("yyMMdd") + StringUtils.leftPad(String.valueOf(num), paddingSize, paddingChar);
	}

	public List<Map> selectItemList(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).selectItemList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectRmsItemNotYogList(Map args) throws Exception {
		return sqlSession.getMapper(ItemMapper.class).selectRmsItemNotYogList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectRmsItemNotYogList1(Map args) throws Exception {
		return sqlSession.getMapper(ItemMapper.class).selectRmsItemNotYogList1(CmmnUtils.replaceMapSc(args));
	}

	public long insertRmsItemNotYog(Map args) throws Exception{
		String maxNotYogSeq = String.valueOf(sqlSession.getMapper(ItemMapper.class).findMaxSeqRmsItemNotYog(CmmnUtils.replaceMapSc(args)).get("maxNotYogSeq"));
		if(CmmnUtils.isNull(maxNotYogSeq) || maxNotYogSeq.equals("0")){
			Object[] parameter = {CmmnConstants.ECODE_FAILURE, "itemNotYog 채번오류", maxNotYogSeq};
			throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
		}
		args.put("seq", maxNotYogSeq);
		args.put("_currentDatetime", CmmnUtils.getFormatedDate("yyyyMMddHHmmss"));
		return sqlSession.getMapper(ItemMapper.class).insertRmsItemNotYog(args);
	}

	public long updateRmsItemNotYog(Map args) throws Exception {
		return sqlSession.getMapper(ItemMapper.class).updateRmsItemNotYog(args);
	}

	public long deleteRmsItemNotYog(Map args) throws Exception {
		return sqlSession.getMapper(ItemMapper.class).deleteRmsItemNotYog(args);
	}

	public List<Map> selectLCRList(Map args) {
		return sqlSession.getMapper(ItemMapper.class).selectLCRList(args);
	}

	public List<Map> selectImportManagement(Map args) {
		return sqlSession.getMapper(ItemMapper.class).selectImportManagement(args);
	}

	public long updateRecvImpo3(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).updateRecvImpo3(args);
	}

	public List<Map> selectCompItemInfo(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).selectCompItemInfo(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectItemCheck(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).selectItemCheck(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectHsList(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).selectHsList(CmmnUtils.replaceMapSc(args));
	}

	public long insertItemMaster(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).insertItemMaster(args);
	}

	public long insertItemMaster1(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).insertItemMaster1(args);
	}

	public long insertItemMaster2(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).insertItemMaster2(args);
	}

	public long updateItemMaster(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).updateItemMaster(args);
	}

	public long updateItemMaster1(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).updateItemMaster1(args);
	}

	public String insertItemAmdMst(Map args) throws Exception{
		Map masterAmdInfo = new HashMap();
		masterAmdInfo.put("Mcount_no", String.valueOf(args.get("Mcount_no")));
		masterAmdInfo = sqlSession.getMapper(ItemMapper.class).findItemAmdMasterMaxSeq(CmmnUtils.replaceMapSc(masterAmdInfo));
		masterAmdInfo.put("Mcount_no", String.valueOf(args.get("Mcount_no")));
		masterAmdInfo.put("amdSeq", masterAmdInfo.get("masterAmdSeq"));
		masterAmdInfo.put("_userId", String.valueOf(args.get("_userId")));
		masterAmdInfo.put("_userNm", String.valueOf(args.get("_userNm")));
		masterAmdInfo.put("amdTxt1", "CPS-W 수정");
		masterAmdInfo.put("amdTxt2", "");
		masterAmdInfo.put("AddDtm", String.valueOf(args.get("AddDtm")));
		masterAmdInfo.put("UseYn", String.valueOf(args.get("UseYn")));
		sqlSession.getMapper(ItemMapper.class).insertItemAmdMst(masterAmdInfo);
		return String.valueOf(masterAmdInfo.get("masterAmdSeq"));
	}

	public long insertItemAmdDtl(Map args) throws Exception{
		Map masterAmdDtlInfo = new HashMap();
		masterAmdDtlInfo.put("Mcount_no", String.valueOf(args.get("Mcount_no")));
		masterAmdDtlInfo.put("amdSeq", String.valueOf(args.get("amdSeq")));
		masterAmdDtlInfo = sqlSession.getMapper(ItemMapper.class).findItemAmdDetailMaxSeq(CmmnUtils.replaceMapSc(masterAmdDtlInfo));
		masterAmdDtlInfo.put("Mcount_no", String.valueOf(args.get("Mcount_no")));
		masterAmdDtlInfo.put("amdSeq", String.valueOf(args.get("amdSeq")));
		masterAmdDtlInfo.put("amdSubSeq", masterAmdDtlInfo.get("detailAmdSeq"));
		masterAmdDtlInfo.put("amdItemId", String.valueOf(args.get("itemId")));
		masterAmdDtlInfo.put("amdItemNm", String.valueOf(args.get("itemNm")));
		masterAmdDtlInfo.put("amdBf", String.valueOf(args.get("amdBf")));
		masterAmdDtlInfo.put("amdAf", String.valueOf(args.get("amdAf")));
		masterAmdDtlInfo.put("_userId", String.valueOf(args.get("_userId")));
		masterAmdDtlInfo.put("_userNm", String.valueOf(args.get("_userNm")));
		masterAmdDtlInfo.put("AddDtm", String.valueOf(args.get("AddDtm")));
		masterAmdDtlInfo.put("UseYn", String.valueOf(args.get("UseYn")));
		return sqlSession.getMapper(ItemMapper.class).insertItemAmdDtl(masterAmdDtlInfo);
	}

	public List<Map> selectItemCompList(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).selectItemCompList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectInvoiceMasterList(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).selectInvoiceMasterList(CmmnUtils.replaceMapSc(args));
	}

	public long copyInvoiceMasterList(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).copyInvoiceMasterList(args);
	}

	public long insertInvoiceImpo1(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).insertInvoiceImpo1(args);
	}

	public List<Map> selectInvoiceItemList(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).selectInvoiceItemList(CmmnUtils.replaceMapSc(args));
	}

	public long insertInvoiceImpo3(Map args) throws Exception{
		String getMcountNo = getNumberingIm3Seq(String.valueOf(args.get("key_no")));
		args.put("im3_seq", getMcountNo);
		return sqlSession.getMapper(ItemMapper.class).insertInvoiceImpo3(args);
	}

	private String getNumberingIm3Seq(String keyno) {
		return itemMasterDao.findNumberingIm3Seq(keyno);
	}

	public long modiInvoiceImpo3(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).modiInvoiceImpo3(args);
	}

	public long delInvoiceImpo1(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).delInvoiceImpo1(args);
	}

	public long delInvoiceImpo3(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).delInvoiceImpo3(args);
	}

	public long updateInvoiceImpo1(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).updateInvoiceImpo1(args);
	}

	public long updateInvoiceImpo1Sub(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).updateInvoiceImpo1Sub(args);
	}

	public long updateInvoiceImpo1Jung(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).updateInvoiceImpo1Jung(args);
	}

	public List<Map> selectInvoiceItemGroupByList1(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).selectInvoiceItemGroupByList1(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectInvoiceItemGroupByList2(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).selectInvoiceItemGroupByList2(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectInvoiceItemGroupByList3(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).selectInvoiceItemGroupByList3(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectInvoiceItemGroupByList4(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).selectInvoiceItemGroupByList4(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectInvoiceLanList(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).selectInvoiceLanList(CmmnUtils.replaceMapSc(args));
	}

	public long delInvoiceLan(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).delInvoiceLan(args);
	}

	public long insertInvoiceLan(Map args) throws Exception{
		String getMcountNo = getNumberingLan(String.valueOf(args.get("key_no")));
		args.put("jechlLan", getMcountNo);
		return sqlSession.getMapper(ItemMapper.class).insertInvoiceLan(args);
	}

	private String getNumberingLan(String keyno) {
		return itemMasterDao.findNumberingLan(keyno);
	}

	public long insertInvoiceTotalImpo1List(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).insertInvoiceTotalImpo1List(args);
	}

	public String getNumberingImpoKey(String yymmdd) {
		return itemMasterDao.findNumberingImpoKey(yymmdd);
	}

	public long updateInvoiceImpo1ImpoKey(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).updateInvoiceImpo1ImpoKey(args);
	}

	public long updateInvoiceImpo2ImpoKey(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).updateInvoiceImpo2ImpoKey(args);
	}

	public long insertInvoiceTotalImpo2List(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).insertInvoiceTotalImpo2List(args);
	}

	public long updateInvoiceImpo3ImpoKey(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).updateInvoiceImpo3ImpoKey(args);
	}

	public long insertInvoiceTotalImpo3List(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).insertInvoiceTotalImpo3List(args);
	}

	public List<Map> selectSysCodeList(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).selectSysCodeList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectHsCodeList(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).selectHsCodeList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectLanItemList(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).selectLanItemList(CmmnUtils.replaceMapSc(args));
	}

	public long modiInvoiceImpo2(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).modiInvoiceImpo2(args);
	}

	public List<Map> selectDnoList(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).selectDnoList(CmmnUtils.replaceMapSc(args));
	}

	public long updateDnoList(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).updateDnoList(args);
	}

	public List<Map> selectDnoList1(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).selectDnoList1(CmmnUtils.replaceMapSc(args));
	}

	public long updateDnoList1(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).updateDnoList1(args);
	}

	public List<Map> selectItemInfo(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).selectItemInfo1(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectFtaManagementVendorList(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).selectFtaManagementVendorList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectFtaManagementList(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).selectFtaManagementList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectItemSebList(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).selectItemSebList(CmmnUtils.replaceMapSc(args));
	}

	public long updateStatus4(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).updateStatus4(args);
	}

	public long insertCUAA130(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).insertCUAA130(args);
	}

	public long updateCUAA130(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).updateCUAA130(args);
	}

	public List<Map> selectCUAA130(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).selectCUAA130(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImpoPlCodeList(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).selectImpoPlCodeList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImpoPlCodeDetailList(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).selectImpoPlCodeDetailList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImpoPlCodeExcelList(Map args) throws Exception{
		return sqlSession.getMapper(ItemMapper.class).selectImpoPlCodeExcelList(CmmnUtils.replaceMapSc(args));
	}














  /**
   * Gets item master list.
   *
   * @param args     the args
   * @param pageable the pageable
   * @return the item master list
   * @throws Exception the exception
   */
  public Page<SooMst_ItemMasterVO> getItemMasterList(Map args, Pageable pageable) throws Exception {
	Specifications spec = getItemMasterSpecifications(args);
	return itemMasterDao.findAll(spec, pageable);
  }

  /**
   * Gets item master list 2.
   *
   * @param args the args
   * @return the item master list 2
   * @throws Exception the exception
   */
  public List<SooMst_ItemMasterVO> getItemMasterList2(Map args) throws Exception {
	Specifications spec = getItemMasterSpecifications(args);
	Sort orders = new Sort(Sort.Direction.DESC, "itemUseYn").and(new Sort(Sort.Direction.ASC, "itemKey"));

	return itemMasterDao.findAll(spec, orders);
  }

  private Specifications getItemMasterSpecifications(Map args) throws Exception {
	BigDecimal itemKey = CmmnUtils.isContainsMapValue(args, "itemKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("itemKey"))) : null;
	String mcountNo = args.containsKey("mcountNo") ? String.valueOf(args.get("mcountNo")) : null;
	String _DateType = args.containsKey("_DateType") ? String.valueOf(args.get("_DateType")) : null; // mregDate,mconfirmDate,editDtm
	String strFromDate = args.containsKey("strFromDate") ? String.valueOf(args.get("strFromDate")) : null;
	String strToDate = args.containsKey("strToDate") ? String.valueOf(args.get("strToDate")) : null;
	String mcoName = args.containsKey("mcoName") ? String.valueOf(args.get("mcoName")) : null;
	String mmaker = args.containsKey("mmaker") ? String.valueOf(args.get("mmaker")) : null;
	String mdivisionCode = args.containsKey("mdivisionCode") ? String.valueOf(args.get("mdivisionCode")) : null;
	String mmodelCode = args.containsKey("mmodelCode") ? String.valueOf(args.get("mmodelCode")) : null;
	String mprovisional = args.containsKey("mprovisional") ? String.valueOf(args.get("mprovisional")) : null;
	String myogFlag = args.containsKey("myogFlag") ? String.valueOf(args.get("myogFlag")) : null;
	String mtekFlag = args.containsKey("mtekFlag") ? String.valueOf(args.get("mtekFlag")) : null;
	String mNegukGubun = args.containsKey("mNegukGubun") ? String.valueOf(args.get("mNegukGubun")) : null;
	String mshipperCertificationType = args.containsKey("mshipperCertificationType") ? String.valueOf(args.get("mshipperCertificationType")) : null;
	String mingredient1 = args.containsKey("mingredient1") ? String.valueOf(args.get("mingredient1")) : null;
	String mgerGoods = args.containsKey("mgerGoods") ? String.valueOf(args.get("mgerGoods")) : null;
	String mhsCode = args.containsKey("mhsCode") ? String.valueOf(args.get("mhsCode")) : null;
	String mshipper = args.containsKey("mshipper") ? String.valueOf(args.get("mshipper")) : null;
	String mmodel = args.containsKey("mmodel") ? String.valueOf(args.get("mmodel")) : null;
	String mingredient = args.containsKey("mingredient") ? String.valueOf(args.get("mingredient")) : null;
	String mconfirmFlag = args.containsKey("mconfirmFlag") ? String.valueOf(args.get("mconfirmFlag")) : null;
	String ftaYn = args.containsKey("ftaYn") ? String.valueOf(args.get("ftaYn")) : null;
	String hsStatus = args.containsKey("hsStatus") ? String.valueOf(args.get("hsStatus")) : null;
	String tpStatus = args.containsKey("tpStatus") ? String.valueOf(args.get("tpStatus")) : null;
	String userPartCd = args.containsKey("userPartCd") ? String.valueOf(args.get("userPartCd")) : null;
	String itemMasterUserId = args.containsKey("itemMasterUserId") ? String.valueOf(args.get("itemMasterUserId")) : null;
	String itemMasterUserNm = args.containsKey("itemMasterUserNm") ? String.valueOf(args.get("itemMasterUserNm")) : null;
	String itemUseYn = args.containsKey("itemUseYn") ? String.valueOf(args.get("itemUseYn")) : "Y";
	ArrayList commonSearchList = new ArrayList();
	String userId = String.valueOf(args.get("_userId"));
	String demoParam = args.containsKey("demoParam") ? String.valueOf(args.get("demoParam")) : "N";

	Specifications spec = Specifications.where(CmmnSpecs.afterLikeStringSpec(itemUseYn, "itemUseYn"));
	if (!userId.startsWith("test")) {
//	// TODO: 2017-01-12 mssql의 파라메터 제한(https://msdn.microsoft.com/ko-kr/library/ms143432(v=sql.90).aspx) 으로 인해 수정(하단 개선본 참조: 반드시 거래처명 입력해야 함)
//	String userId = String.valueOf(args.get("_userId")), auth = String.valueOf(args.get("_Auth")), argCl = "ALL";
//	List<Map> listMap = cmmnDataInfoDao.findCommonTaxNumForSpec(userId, auth, argCl);
//	List<String> taxNumList = CmmnSpecs.getTaxNumStringList(listMap);
//	spec = spec.and(CmmnSpecs.inStringListSpec(taxNumList, "mcoCom"));
	  if (!CmmnUtils.isNull(mcoName)) {
		String auth = String.valueOf(args.get("_Auth")), argCl = "ALL", argCustomerName = CmmnUtils.isNull(mcoName) ? "" : mcoName;
		List<Map> listMap = cmmnDataInfoDao.findCommonTaxNumForItemMaster(userId, auth, argCl, argCustomerName);
		List<String> taxNumList = CmmnSpecs.getTaxNumStringList(listMap);
		int taxxNumSize = taxNumList.size();
		if (taxxNumSize >= 2000) {
		  taxNumList = taxNumList.subList((taxxNumSize > 2000) ? taxxNumSize - 2000 : taxxNumSize, taxxNumSize); // 2000개만
		}

		spec = spec.and(CmmnSpecs.inListStringSpec(taxNumList, "mcoCom"));
	  }
	} else {
	  // demoParam에 따른 처리(변동단가/엘지전자(1078614075))
	  if (demoParam.equals("N")) {
		// 데모용
		List<Map> listMap = sqlSession.getMapper(ItemMapper.class).findItemMCountNoForDemoList(CmmnUtils.replaceMapSc(args));
		List<String> taxNumList = listMap.stream().map(a -> String.valueOf(a.get("mCountNo"))).limit(2000).collect(Collectors.toList()); // 2000개만
		spec = spec.and(CmmnSpecs.inListStringSpec(taxNumList, "mcountNo"));
	  }
	}

	//검색조건
	if (!CmmnUtils.isNull(itemKey)) spec = spec.and(CmmnSpecs.eqNumberSpec(itemKey, "itemKey"));
	if (!CmmnUtils.isNull(mcountNo)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(mcountNo, "mcountNo"));
	if (!CmmnUtils.isNull(mcoName)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(mcoName, "mcoName"));
	if (!CmmnUtils.isNull(mmaker)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(mmaker, "mmaker"));
	if (!CmmnUtils.isNull(mdivisionCode)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(mdivisionCode, "mdivisionCode"));
	if (!CmmnUtils.isNull(mmodelCode)) {
	  String mmodelCodeList[] = mmodelCode.split("\\s+"); // space
	  if (mmodelCodeList.length > 1) {
		ArrayList<String> strEntityArrayList = new ArrayList(Arrays.asList(mmodelCodeList));
		spec = spec.and(CmmnSpecs.inListStringSpec(strEntityArrayList, "mmodelCode"));
	  } else {
		spec = spec.and(CmmnSpecs.afterLikeStringSpec(mmodelCode, "mmodelCode"));
	  }
	}
	if (!CmmnUtils.isNull(mprovisional)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(mprovisional, "mprovisional"));
	if (!CmmnUtils.isNull(myogFlag)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(myogFlag, "myogFlag"));
	if (!CmmnUtils.isNull(mtekFlag)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(mtekFlag, "mtekFlag"));
	if (!CmmnUtils.isNull(mNegukGubun)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(mNegukGubun, "mNegukGubun"));
	if (!CmmnUtils.isNull(mshipperCertificationType)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(mshipperCertificationType, "mshipperCertificationType"));
	if (!CmmnUtils.isNull(mingredient1)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(mingredient1, "mingredient1"));
	if (!CmmnUtils.isNull(mgerGoods)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(mgerGoods, "mgerGoods"));
	if (!CmmnUtils.isNull(mhsCode)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(mhsCode, "mhsCode"));
	if (!CmmnUtils.isNull(mshipper)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(mshipper, "mshipper"));
	if (!CmmnUtils.isNull(mmodel)) {
	  commonSearchList.clear();
	  commonSearchList.add("mmodel1");
	  commonSearchList.add("mmodel2");
	  commonSearchList.add("mmodel3");
	  spec = CmmnSpecs.inStringMapSpec(mmodel, commonSearchList, spec);
	}
	if (!CmmnUtils.isNull(mingredient)) {
	  commonSearchList.clear();
	  commonSearchList.add("mingredient1");
	  commonSearchList.add("mingredient2");
	  commonSearchList.add("mingredient3");
	  spec = CmmnSpecs.inStringMapSpec(mingredient, commonSearchList, spec);
	}
	if (!CmmnUtils.isNull(mconfirmFlag)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(mconfirmFlag, "mconfirmFlag"));
	if (!CmmnUtils.isNull(ftaYn)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(ftaYn, "ftaYn"));
	if (!CmmnUtils.isNull(hsStatus)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(hsStatus, "hsStatus"));
	if (!CmmnUtils.isNull(tpStatus)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(tpStatus, "tpStatus"));
	if (!CmmnUtils.isNull(userPartCd)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(userPartCd, "userPartCd"));
	if (!CmmnUtils.isNull(itemMasterUserId)) {
	  commonSearchList.clear();
	  commonSearchList.add("addUserId");
	  commonSearchList.add("editUserId");
	  spec = CmmnSpecs.inStringMapSpec(itemMasterUserId, commonSearchList, spec);
	}
	if (!CmmnUtils.isNull(itemMasterUserNm)) {
	  commonSearchList.clear();
	  commonSearchList.add("addUserNm");
	  commonSearchList.add("editUserNm");
	  spec = CmmnSpecs.inStringMapSpec(itemMasterUserNm, commonSearchList, spec);
	}
	if (!CmmnUtils.isNull(_DateType) && !CmmnUtils.isNull(strFromDate) && !CmmnUtils.isNull(strToDate)) {
	  if ("editDtm".equals(_DateType)) {
		strFromDate = strFromDate.substring(0, 7) + "000000";
		strToDate = strToDate.substring(0, 7) + "235959";
	  }
	  spec = spec.and(CmmnSpecs.betweenObjectSpec(strFromDate, strToDate, _DateType));
	}
	return spec;
  }

  /**
   * Save item master soo mst item master vo.(new)
   *
   * @param itemMasterVO the item master vo
   * @param request      the request
   * @return the soo mst item master vo
   * @throws Exception the exception
   */
  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public SooMst_ItemMasterVO saveItemMaster(SooMst_ItemMasterVO itemMasterVO, HttpServletRequest request) throws Exception {
	String userId = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID));
	String userNm = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERNAME));
	String userDefaultDb = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_DEFAULTDB));
	String currentDatetime 	= CmmnUtils.getFormatedDate("yyMMddHHmmss");
	Map getRmsDb = setDemoUserParams(request);
	// validation
	SooMst_ItemMasterVO validateVO = modelMapper.map(itemMasterVO, SooMst_ItemMasterVO.class);
	validateVO.setAddUserId(userId);
	validateVO.setAddUserNm(userNm);
	validateVO.setEditUserId(userId);
	validateVO.setEditUserNm(userNm);
	validateVO.setAddDtm(CmmnUtils.getFormatedDate("yyyyMMddHHmmss"));
	// 신규시 mcountNo 채번('WEB' + yyMMdd + 6자리 채번)
	if (CmmnUtils.isNull(itemMasterVO.getItemKey()) && CmmnUtils.isNull(itemMasterVO.getMcountNo())) {
	  String getMcountNo = getNumberingMcountNo(CmmnUtils.getFormatedDate("yyMMdd"));
	  validateVO.setMcountNo(getMcountNo);
	  itemMasterVO.setMcountNo(getMcountNo);
	}
	Set<ConstraintViolation<SooMst_ItemMasterVO>> validator = CmmnUtils.isCommonValid(validateVO);
	if (validator.size() > 0) {
	  Object[] parameter = validator.toArray();
	  throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
	}

	// 자재이력
	boolean isNewItem = CmmnUtils.isNull(itemMasterVO.getItemKey()) ? true : false;
	if (isNewItem) {
	  // 자재마스터히스토리 변경 이력 추가(신규자재시 이력M 입력)
	  Map masterAmdInfo = new HashMap();
	  masterAmdInfo.put("mcountNo", itemMasterVO.getMcountNo());
	  masterAmdInfo.put("_defaultRmsDb", getRmsDb.get("_defaultRmsDb")); // rms db 셋팅
	  masterAmdInfo = sqlSession.getMapper(ItemMapper.class).findItemAmdMasterMaxSeq(CmmnUtils.replaceMapSc(masterAmdInfo));
	  masterAmdInfo.put("mcountNo", itemMasterVO.getMcountNo());
	  masterAmdInfo.put("amdSeq", masterAmdInfo.get("masterAmdSeq"));
	  masterAmdInfo.put("_userId", userId);
	  masterAmdInfo.put("_userNm", userNm);
	  masterAmdInfo.put("_userDefaultDb", userDefaultDb);
	  masterAmdInfo.put("amdTxt1", "신규입력사유"); // 텍스트 미정의(입력 받을 것인가?)
	  masterAmdInfo.put("amdTxt2", "신규입력상세사유"); // 텍스트 미정의2(입력 받을 것인가?)
	  masterAmdInfo.put("_defaultRmsDb", getRmsDb.get("_defaultRmsDb")); // rms db 셋팅
	  masterAmdInfo.put("AddDtm", currentDatetime);
	  masterAmdInfo.put("UseYn", "Y");
	  sqlSession.getMapper(ItemMapper.class).insertItemAmdMaster(masterAmdInfo);
	} else {
	  // 자재마스터히스토리 변경 이력 추가(기존자재시 이력M/D 모두 입력)
	  Map newMasterMap = CmmnUtils.convertObjectToMap(itemMasterVO);
	  SooMst_ItemMasterVO oldMasterVO = itemMasterDao.findOne(itemMasterVO.getItemKey());
	  Map oldMasterMap = CmmnUtils.convertObjectToMap(oldMasterVO);
	  oldMasterMap.put("addUserId", "");
	  oldMasterMap.put("addUserNm", "");
	  newMasterMap.put("addUserId", "");
	  newMasterMap.put("addUserNm", "");
	  newMasterMap.put("editUserNm", userNm);
	  newMasterMap.put("_defaultNcustomsDb", getRmsDb.get("_defaultNcustomsDb"));
	  newMasterMap.put("_defaultRmsDb", getRmsDb.get("_defaultRmsDb")); // rms db 셋팅
	  itemHistoryService.saveSooMstItemMasterAmdHistory(newMasterMap, oldMasterMap);
	}

	SooMst_ItemMasterVO returnVO = itemMasterDao.save(itemMasterVO);

	return returnVO;
  }

  private Map setDemoUserParams(HttpServletRequest request) throws Exception {
	Map map = new HashMap();
	String defaultRmsDb = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_USERID)).startsWith("test") ? "demoRms" : "rms";
	String defaultNcustomsDb = String.valueOf(CmmnUtils.getUserInfo(request, CmmnConstants.SESSION_DEFAULTDB));
	if (CmmnUtils.isNull(defaultRmsDb) || CmmnUtils.isNull(defaultNcustomsDb)) {
	  throw new Exception("로그인 정보가 부정확합니다(itemService)");
	}
	map.put("_defaultRmsDb", defaultRmsDb);
	map.put("_defaultNcustomsDb", defaultNcustomsDb);

	return map;
  }

  private String getNumberingMcountNo(String yyMMdd) {
	return itemMasterDao.findNumberingMcountNo(yyMMdd);
  }

  /**
   * Save item confirm status long.(old)
   *
   * @param args the args
   * @return the long
   * @throws Exception the exception
   */
  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public long saveItemConfirmStatus(Map args) throws Exception {
	// 기존 자재마스터 조회
	if (args.get("mcountNo") == null) {
	  args.put("mcountNo", args.get("strMcountNo"));
	  args.put("myogFlag", args.get("strMyogFlag"));
	  args.put("mconfirmFlag", args.get("strMconfirmFlag"));
	}
	Map oldItemInfo = sqlSession.getMapper(ItemMapper.class).selectItemInfo(CmmnUtils.replaceMapSc(args));
	// itemHistoryService.itemAmdHistory(args, oldItemInfo);

	return sqlSession.getMapper(ItemMapper.class).updateItemConfirmStatus(args);
  }

  /**
   * Gets item history list.(old)
   *
   * @param args the args
   * @return the item history list
   * @throws Exception the exception
   */
  public List<Map> getItemHistoryList(Map args) throws Exception {
	return sqlSession.getMapper(ItemMapper.class).findItemHistoryList(CmmnUtils.replaceMapSc(args));
  }

  /**
   * Gets soo mst item history list.
   *
   * @param args the args
   * @return the soo mst item history list
   * @throws Exception the exception
   */
  public List<Map> getSooMstItemHistoryList(Map args) throws Exception {
	return sqlSession.getMapper(ItemMapper.class).findSooMstItemHistoryList(CmmnUtils.replaceMapSc(args));
  }

  /**
   * Gets item result import rowdata unit price list.
   *
   * @param args     the args
   * @param pageable the pageable
   * @return the item result import rowdata unit price list
   * @throws Exception the exception
   */
  public Page<ResultEtlImportUnitPriceVO> getItemResultImportRowdataUnitPriceList(Map args, Pageable pageable) throws Exception {
	Specifications spec = getItemResultImportUnitPriceSpecifications(args);
	return resultImportUnitPriceDao.findAll(spec, pageable);
  }

  /**
   * Gets item result import unit price list.
   *
   * @param args the args
   * @return the item result import unit price list
   * @throws Exception the exception
   */
  public List<Map> getItemResultImportUnitPriceList(Map args) throws Exception {
	return sqlSession.getMapper(ItemMapper.class).findItemResultImportUnitPriceList(CmmnUtils.replaceMapSc(args));
  }

  /**
   * Gets item result import unit price same deleted list.
   *
   * @param args the args
   * @return the item result import unit price same deleted list
   * @throws Exception the exception
   */
  public List<Map> getItemResultImportUnitPriceSameDeletedList(Map args) throws Exception {
	return sqlSession.getMapper(ItemMapper.class).findItemResultImportUnitPriceSameDeletedList(CmmnUtils.replaceMapSc(args));
  }

  private Specifications getItemResultImportUnitPriceSpecifications(Map args) {
	BigDecimal etlUnitPriceKey = CmmnUtils.isContainsMapValue(args, "etlUnitPriceKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("etlUnitPriceKey"))) : null;
	String db = args.containsKey("db") ? String.valueOf(args.get("db")) : null;
	String yyyy = args.containsKey("yyyy") ? String.valueOf(args.get("yyyy")) : null;
	String mm = args.containsKey("mm") ? String.valueOf(args.get("mm")) : null;
	String dd = args.containsKey("dd") ? String.valueOf(args.get("dd")) : null;
	String impoKey = args.containsKey("impoKey") ? String.valueOf(args.get("impoKey")) : null;
	String impoNapseSaup = args.containsKey("impoNapseSaup") ? String.valueOf(args.get("impoNapseSaup")) : null;
	BigDecimal itemKey = CmmnUtils.isContainsMapValue(args, "itemKey") ? NumberUtils.createBigDecimal(String.valueOf(args.get("itemKey"))) : null;
	String itemMcountNo = args.containsKey("itemMcountNo") ? String.valueOf(args.get("itemMcountNo")) : null;
	String itemMmodelCode = args.containsKey("itemMmodelCode") ? String.valueOf(args.get("itemMmodelCode")) : null;
	String _dateType = args.containsKey("_dateType") ? String.valueOf(args.get("_dateType")) : null; // addDtm, yyyymmdd
	String startDay = args.containsKey("startDay") ? String.valueOf(args.get("startDay")) : null;
	String endDay = args.containsKey("endDay") ? String.valueOf(args.get("endDay")) : null;

	Specifications spec = Specifications.where(CmmnSpecs.eqStringSpec(impoNapseSaup, "impoNapseSaup"));
	if (!CmmnUtils.isNull(etlUnitPriceKey)) spec = spec.and(CmmnSpecs.eqNumberSpec(etlUnitPriceKey, "etlUnitPriceKey"));
	if (!CmmnUtils.isNull(db)) spec = spec.and(CmmnSpecs.eqStringSpec(db, "db"));
	if (!CmmnUtils.isNull(yyyy)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(yyyy, "yyyy"));
	if (!CmmnUtils.isNull(mm)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(mm, "mm"));
	if (!CmmnUtils.isNull(dd)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(dd, "dd"));
	if (!CmmnUtils.isNull(impoKey)) spec = spec.and(CmmnSpecs.eqStringSpec(impoKey, "impoKey"));
	if (!CmmnUtils.isNull(itemKey)) spec = spec.and(CmmnSpecs.eqNumberSpec(itemKey, "itemKey"));
	if (!CmmnUtils.isNull(itemMcountNo)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(itemMcountNo, "itemMcountNo"));
	if (!CmmnUtils.isNull(itemMmodelCode)) spec = spec.and(CmmnSpecs.afterLikeStringSpec(itemMmodelCode, "itemMmodelCode"));
	if (!CmmnUtils.isNull(_dateType) && !CmmnUtils.isNull(startDay) && !CmmnUtils.isNull(endDay)) {
	  if ("addDtm".equals(_dateType)) {
		startDay = startDay.substring(0, 7) + "000000";
		endDay = endDay.substring(0, 7) + "235959";
	  }
	  spec = spec.and(CmmnSpecs.betweenObjectSpec(startDay, endDay, _dateType));
	}

	return spec;
  }









  public List<Map> getItemSettingList(Map args) {
	return sqlSession.getMapper(ItemMapper.class).findItemSettingList(args);
  }

  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public Map saveItemCountList(Map args) throws Exception {
	List<Map> itemList = (List<Map>) args.get("itemList");

	Map result = new HashMap();
	List<Map> errorList = new ArrayList<>();

	long deleted = sqlSession.getMapper(ItemMapper.class).deleteItemCount();

	for (int i = 0; i < itemList.size(); i++) {
	  Map oldTPList = new HashMap();
	  List<Map> itemMap = new ArrayList<>();
	  oldTPList.put("mmodelCode", itemList.get(i).get("mmodelCode"));
	  oldTPList.put("itemSu", itemList.get(i).get("itemSu"));
	  oldTPList.put("itemRule", itemList.get(i).get("itemRule"));
	  oldTPList.put("addUserId", args.get("addUserId"));
	  oldTPList.put("addDtm", args.get("addDtm"));

	  long saved   = sqlSession.getMapper(ItemMapper.class).insertItemCount(oldTPList);
	}

	result.put("returnValue", itemList);
	return result;
  }

  public List<Map> getImpoPlCodeList(Map args) {
	return sqlSession.getMapper(ItemMapper.class).findPlCodeList(args);
  }

  public List<Map> getImpoPlCodeDetailList(Map args) {
	return sqlSession.getMapper(ItemMapper.class).findPlCodeDetailList(args);
  }

  public List<Map> getImpoPlCodeExcelList(Map args) {
	return sqlSession.getMapper(ItemMapper.class).findPlCodeExcelList(args);
  }
}