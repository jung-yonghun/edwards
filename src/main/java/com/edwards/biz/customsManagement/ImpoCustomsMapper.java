package com.edwards.biz.customsManagement;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ImpoCustomsMapper {
	List<Map> selectImportStatusList(Map args);

	List<Map> selectImportStatusTotalList(Map args);

	List<Map> selectImportStatusDetail(Map args);

	List<Map> selectImportStatusDetail1(Map args);

	List<Map> selectImportStatusDetail2(Map args);

	List<Map> selectImportStatusDetailYog(Map args);

	List<Map> selectImportStatusDetail2Ex(Map args);

	List<Map> selectImportStatusDetail3(Map args);

	List<Map> selectImportStatusDetail4(Map args);

	List<Map> selectZeissImportStatusDetail(Map args);

	List<Map> selectZeissImportStatusDetail1(Map args);

	List<Map> selectZeissImportStatusDetail2(Map args);

	List<Map> selectTodsItem(Map args);

	List<Map> selectZeissImportStatusList(Map args);

	List<Map> selectZeissImportStatusList1(Map args);

	List<Map> selectZeissImportStatusList2(Map args);

	List<Map> selectImportAllStatusList(Map args);

	List<Map> selectImportStatusFtpList(Map args);

	List<Map> selectAccountCostCustomsList(Map args);

	List<Map> selectAccountCostCustomsAllList(Map args);

	List<Map> selectAccountCostAdjustmentList(Map args);

	List<Map> selectAccountBillAdjustmentList(Map args);

	List<Map> selectAccountCostStatementOfAccountsList(Map args);

	List<Map> selectAccountCostStatementOfAccountsDetailList(Map args);

	List<Map> selectAccountCostStatementOfAccountsList1(Map args);

	List<Map> selectAccountCostStatementOfAccountsDetailList1(Map args);

	List<Map> selectAccountBillStatementOfAccountsList(Map args);

	List<Map> selectAccountBillStatementOfAccountsDetailList(Map args);

	List<Map> selectAccountBillStatementOfAccountsList1(Map args);

	List<Map> selectAccountBillStatementOfAccountsDetailList1(Map args);

	List<Map> selectImportRequestList(Map args);

	List<Map> selectImportAllRequestList(Map args);

	List<Map> selectImportResultTotal(Map args);

	List<Map> selectImportResultImport(Map args);

	List<Map> selectImportResultNapse(Map args);

	List<Map> selectImportResultGam(Map args);

	List<Map> selectImportDeliveryRequest(Map args);

	List<Map> selectImportDeliveryCompleteCostList(Map args);

	List<Map> selectImportDeliveryCostList(Map args);

	long updateImportDeliveryCostGroupList(Map args);

	List<Map> selectImportDeliveryRequestGroupListByDeliveryCoKey(Map args);

	List<Map> selectImportDeliveryRequestGroupList(Map args);

	List<Map> selectCustomsCostAllExcelExportList(Map args);

	List<Map> selectGeodisImportDeclarationMasterList(Map args);

	List<Map> selectGeodisImportDeclarationDetailList(Map args);

	List<Map> selectGeodisImportDeclarationSubDetailList(Map args);

	List<Map> selectMainGraphList(Map args);

	List<Map> selectMainGraphImportList(Map args);

	List<Map> selectMainGraphExportList(Map args);

	List<Map> selectMainGraphTotalList(Map args);

	List<Map> selectImportStatisticsList(Map args);

	List<Map> selectImportStatisticsYearList(Map args);

	List<Map> selectImpoExpoStatisticsList(Map args);

	List<Map> selectImpoExpoStatisticsYearList(Map args);

	List<Map> selectSeinYearGraphList(Map args);

	List<Map> selectMailingList(Map args);

	List<Map> selectGucciList(Map args);

	List<Map> selectGucciDetailList(Map args);

	long updateImportDeliveryCostList(Map args);

	List<Map> selectDelayCheckList(Map args);

	List<Map> selectDelayCheckAllList(Map args);

	List<Map> selectBanchulCheckList(Map args);

	List<Map> selectBanchulCheckAllList(Map args);

	List<Map> selectReExpoCheckList(Map args);

	List<Map> selectImportKpiList(Map args);

	List<Map> selectImportKpiAllList(Map args);

	List<Map> selectImportSummary(Map args);

	List<Map> selectImportFieldAllStatusList(Map args);

	List<Map> selectImportJungFieldAllStatusList(Map args);

	List<Map> selectJangchList(Map args);

	List<Map> selectMkImportDeclarationMasterList(Map args);

	List<Map> selectMkImportDeclarationDetailList(Map args);

	List<Map> selectMkImportDeclarationSubDetailList(Map args);

	List<Map> selectMkImpoDetailListByImpoKeyList(Map args);

	List<Map> selectMkImpoSubDetailListByImpoKeyList(Map args);

	List<Map> selectFtaList(Map args);

	long saveImpo1mdtl(Map args);

	List<Map> selectTodsCount(Map args);

	long updateImpo1Mdtl(Map args);

	long insertImpo1MdtlDelLog(Map args);

	List<Map> selectImportZeissRequestList(Map args);

	List<Map> selectImportZeissDecide(Map args);

	List<Map> selectZeissFileDownList(Map args);

	long selectZeissFileDel(Map args);

	long selectZeissFileTempDel(Map args);

	long selectZeissFileTemp1Del(Map args);

	List<Map> selectZeissFileDown(Map args);

	long selectZeissTempInsert(Map args);

	long selectZeissTemp1Insert(Map args);

	long selectZeissFileInsert(Map args);

	List<Map> selectFileCount(Map args);

	long saveFieldManage(Map args);

	long updateFieldManage(Map args);

	long deleteFieldManage(Map args);

	List<Map> selectFieldManage(Map args);

	List<Map> selectCostcoAccountList(Map args);

	List<Map> selectCostcoFeesList(Map args);

	List<Map> selectCostcoImportStatusList(Map args);

	long saveCostcoFees(Map args);

	long deleteCostcoFees(Map args);

	List<Map> selectImJungList(Map args);

	List<Map> selectImJungDetailList(Map args);

	List<Map> selectImportSebStatusList(Map args);

	List<Map> selectImportSebStatusDetail(Map args);

	List<Map> selectImportSebStatusSubDetail(Map args);

	List<Map> selectImpoDetailListByImpoKeyList(Map args);

	List<Map> selectImpoSubDetailListByImpoKeyList(Map args);

	List<Map> selectImpoAllListByImpoKeyList(Map args);

	List<Map> selectSeinTotalList(Map args);

	List<Map> selectSeinTotalList1(Map args);

	List<Map> selectSeinTotalList2(Map args);

	List<Map> selectSeinTotalList3(Map args);

	List<Map> selectSeinTotalList4(Map args);

	List<Map> selectSeinTotalList5(Map args);












	List<Map> findImportDetailStatusList(Map args);

	List<Map> findImportSubDetailStatusList(Map args);

	List<Map> findImportMasterByNotRegisteredCheckList(Map args);

	List<Map> findImportDetailByNotRegisteredCheckList(Map args);

	List<Map> selectImpoCostMasterList(Map args);

	List<Map> selectImpoCompanySumData(Map args);

	List<Map<String, Object>> selectImpoCostByImpumIvnoList(Map args);

	List<Map<String, Object>> selectImpoCostByImpumIvnoDescList(Map args);

	List<Map<String, Object>> selectImpoCostSubMasterList(Map args);

	List<Map<String, Object>> selectImpoCostSubMasterDetailList(Map args);

	List<Map<String, Object>> selectImpoCostSubMasterByCustomsList(Map args);

	List<Map<String, Object>> selectImpo1MdtlLogList(Map args);

	long updateImpo1MdtlCalculate(Map args);

	long insertImpo1MdtlLog(Map args);

	List<Map> findImportManagementList(Map args);

	long updateRecvImpo3(Map args);


	List<Map> getMKImpoCostMasterList(Map args);

	List<Map> selectMKImpoCompanySumData(Map args);



	List<Map> findImportResult소분류(Map args);





	List<Map> findFtaList(Map args);

	List<Map> findFtaDetailList(Map args);

	List<Map> selectImpoTaxList(Map args);
}