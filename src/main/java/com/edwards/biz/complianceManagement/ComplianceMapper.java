package com.edwards.biz.complianceManagement;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ComplianceMapper{
	List<Map> selectModelList(Map args);

	long insertModel(Map args);

	long updateModel(Map args);

	long insertSikpumMaster(Map args);

	long copySikpumMaster(Map args);

	long updateSikpumMaster(Map args);

	long gwanSikpumMaster(Map args);

	long saveDetailMaster(Map args);

	List<Map> selectSikpumMaster(Map args);

	List<Map> selectSikpumTop1Master(Map args);

	long insertSikpumDetail(Map args);

	long copySikpumDetail(Map args);

	long updateSikpumDetail(Map args);

	List<Map> selectSikpumDetailList(Map args);

	List<Map> selectSikpumDetailTop1List(Map args);

	long deleteSikpumDetail(Map args);

	List<Map> selectSikpumList(Map args);

	long deleteSikpumMaster(Map args);

	List<Map> selectJisaList(Map args);

	List<Map> selectMcountList(Map args);

	long updateModelJajae(Map args);

	List<Map> selectMasterList(Map args);

	List<Map> selectCompResultList(Map args);

	List<Map> selectResultMasterList(Map args);

	List<Map> selectResultStatusList(Map args);

	List<Map> selectResultDetailList(Map args);

	List<Map> selectResultDetailList2(Map args);

	List<Map> selectComList(Map args);

	List<Map> selectComList1(Map args);

	List<Map> selectCodeList(Map args);

	long updateResult(Map args);

	long insertResult(Map args);

	long insertResultDtl(Map args);

	List<Map> selectYogNcomList(Map args);

	List<Map> selectRequirementMasterList(Map args);

	long updateRequirementMaster(Map args);

	long insertRequirementMaster(Map args);

	List<Map> selectRequirementStatusList(Map args);

	long updateRequirementStatus(Map args);

	long insertRequirementStatus(Map args);





	List<Map> selectComplianceMasterList(Map args);

	List<Map> selectComplianceList(Map args);

	long insertYogMaster(Map args);

	long updateYogMaster(Map args);

	long deleteYogMaster(Map args);

	long insertSikMaster(Map args);







	List<Map> selectCompMasterList(Map args);

	List<Map> selectComplianceUnitPriceList(Map args);

	List<Map> selectCompApplyList(Map args);

	List<Map> selectCompItemList(Map args);
}