package com.edwards.biz.customsManagement;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ExpoCustomsMapper{
	List<Map> selectExportStatusList(Map args);

	List<Map> selectExportDeclarationDetailList(Map args);

	List<Map> selectExportDeclarationSubDetailList(Map args);

	List<Map> selectZeissExportStatusDetail(Map args);

	List<Map> selectZeissExportStatusDetail1(Map args);

	List<Map> selectZeissExportStatusDetail2(Map args);

	List<Map> selectExportAllStatusList(Map args);

	List<Map> selectExportStatusFtpList(Map args);

	List<Map> selectExportRequestList(Map args);

	List<Map> selectExportAllRequestList(Map args);

	List<Map> selectExportResult건수_신고구분제외_전체(Map args);

	List<Map> selectExportResult수출실적_전체(Map args);

	List<Map> selectGeodisExportDeclarationMasterList(Map args);

	List<Map> selectGeodisExportDeclarationDetailList(Map args);

	List<Map> selectGeodisExportDeclarationSubDetailList(Map args);

	List<Map> selectGeodisExportAccountCostWithAdditionalInfoList(Map args);

	List<Map> selectExportStatisticsList(Map args);

	List<Map> selectExportStatisticsYearList(Map args);

	List<Map> selectShipCheckList(Map args);

	List<Map> selectShipCheckList1(Map args);

	List<Map> selectShipCheckAllList(Map args);

	List<Map> selectExportBanipStatusList(Map args);

	List<Map> selectExportBanipAllStatusList(Map args);

	List<Map> selectExportFieldAllStatusList(Map args);

	List<Map> selectExportJungFieldAllStatusList(Map args);

	List<Map> selectExJungList(Map args);

	List<Map> selectExJungDetailList(Map args);

	List<Map> selectExFtaList(Map args);

	List<Map> updateGeodisExpoAdditionalInfo(Map args);

	List<Map> updateGeodisExpoAdditionalInfo1(Map args);

	List<Map> selectIsuExportStatusList(Map args);







  List<Map> findExportStatusList(Map args);

  List<Map> findExportDetailStatusList(Map args);

  List<Map> findExportSubDetailStatusList(Map args);

  List<Map> findExportAllRequirementsManagementList(Map args);

  List<Map> findExportRequirementsManagementList(Map args);

  List<Map> findExportStartInfoWithEdmsList(Map args);



  List<Map> findExportResult소분류(Map args);



  List<Map> findAccountCostCustomsList(Map args);

  List<Map> findAccountCostAdjustmentList(Map args);
}