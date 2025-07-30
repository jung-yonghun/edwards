package com.edwards.biz.edwardsManagement;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.ResultHandler;

@Mapper
public interface EdwardsMapper {
	List<Map> selectModelMaster(Map args);

	long insertModelMaster(Map args);

	long updateModelMaster(Map args);

	List<Map> selectHsGroupMaster(Map args);

	List<Map> selectHsGroupList(Map args);

	long insertHsGroupMaster(Map args);

	long updateHsGroupMaster(Map args);

	List<Map> selectHsGroupCodeMaster(Map args);

	long insertHsGroupCodeMaster(Map args);

	long updateHsGroupCodeMaster(Map args);

	List<Map> selectSysStdList(Map args);

	List<Map> selectHsSgroupMaster(Map args);

	long insertHsSgroupMaster(Map args);

	long updateHsSgroupMaster(Map args);

	List<Map> selectHsSgroupCodeMaster(Map args);

	long insertHsSgroupCodeMaster(Map args);

	long updateHsSgroupCodeMaster(Map args);

	List<Map> selectMaxCd(Map args);

	List<Map> selectMaxSeq(Map args);

	List<Map> selectMaxScd(Map args);

	List<Map> selectMaxSseq(Map args);

	List<Map> selectComMaster(Map args);

	long insertComMaster(Map args);

	long updateComMaster(Map args);

	List<Map> selectCstmList(Map args);

	List<Map> selectCstmLaw(Map args);

	List<Map> selectCstmMaster(Map args);

	long insertCstmMaster(Map args);

	long updateCstmMaster(Map args);

	List<Map> selectCstmCodeMaster(Map args);

	long insertCstmCodeMaster(Map args);

	long updateCstmCodeMaster(Map args);

	List<Map> selectMaxCstm(Map args);

	List<Map> selectMaxSeqCstm(Map args);

	List<Map> selectBomMaster(Map args);

	long insertBomMaster(Map args);

	long updateBomMaster(Map args);

	List<Map> selectBomCodeMaster(Map args);

	long insertBomCodeMaster(Map args);

	long updateBomCodeMaster(Map args);

	List<Map> selectMaxBom(Map args);

	List<Map> selectMaxSeqBom(Map args);

	List<Map> selectRcmdMaster(Map args);

	long insertRcmdMaster(Map args);

	long updateRcmdMaster(Map args);

	List<Map> selectRcmdCodeMaster(Map args);

	long insertRcmdCodeMaster(Map args);

	long updateRcmdCodeMaster(Map args);

	List<Map> selectMaxRcmd(Map args);

	List<Map> selectMaxSeqRcmd(Map args);

	List<Map> selectRcmdItemMaster(Map args);

	List<Map> selectDemdMaster(Map args);

	List<Map> selectMaxDemd(Map args);

	long insertDemdMaster(Map args);

	long updateDemdMaster(Map args);

	List<Map> selectDemdCodeMaster(Map args);

	long insertDemdCodeMaster(Map args);

	long updateDemdCodeMaster(Map args);

	List<Map> selectMaxSeqDemd(Map args);

	List<Map> selectDemdItemMaster(Map args);

	List<Map> selectExecMaster(Map args);

	List<Map> selectMaxExec(Map args);

	long insertExecMaster(Map args);

	long updateExecMaster(Map args);

	List<Map> selectExecCodeMaster(Map args);

	long insertExecCodeMaster(Map args);

	long updateExecCodeMaster(Map args);

	List<Map> selectMaxSeqExec(Map args);

	List<Map> selectExecItemMaster(Map args);

	List<Map> selectAfmngMaster(Map args);

	List<Map> selectMaxAfmng(Map args);

	long insertAfmngMaster(Map args);

	long updateAfmngMaster(Map args);

	List<Map> selectAfmngItemMaster(Map args);

	long insertAfmngCodeMaster(Map args);

	long updateAfmngCodeMaster(Map args);

	List<Map> selectMaxSeqAfmng(Map args);

	List<Map> selectReExpobjMaster(Map args);

	List<Map> selectReExpobjItemMaster(Map args);

	List<Map> selectReExpobjAddItemMaster(Map args);

	List<Map> selectReExpobjAddItemMaster1(Map args);

	List<Map> selectMfcMaster(Map args);

	List<Map> selectMfcItemMaster(Map args);

	List<Map> selectMfcCodeMaster(Map args);

	List<Map> selectOrgOrdrMaster(Map args);

	List<Map> selectOrgOrdrList(Map args);

	List<Map> selectOrgExpoList(Map args);

	List<Map> selectOrgImpoList(Map args);

	List<Map> selectCoMaster(Map args);

	List<Map> selectMaxCoMst(Map args);

	long insertCoMaster(Map args);

	long updateCoMaster(Map args);

	List<Map> selectCoItemMaster(Map args);

	List<Map> selectMaxSeqCo(Map args);

	long insertCoItemMaster(Map args);

	long updateCoItemMaster(Map args);

	List<Map> selectExpoMaster(Map args);

	List<Map> selectExpoInvMaster(Map args);

	List<Map> selectExpoLanMaster(Map args);

	List<Map> selectExpoHangMaster(Map args);

	List<Map> selectExpoImpoMaster(Map args);

	List<Map> selectImpoMaster(Map args);

	List<Map> selectImpoInvMaster(Map args);

	List<Map> selectImpoInvSumMaster(Map args);

	List<Map> selectImpoLanMaster(Map args);

	List<Map> selectImpoHangMaster(Map args);

	List<Map> selectImpoGamMaster(Map args);

	List<Map> selectFtaMaster(Map args);

	long insertFtaMaster(Map args);

	long updateFtaMaster(Map args);

	List<Map> selectImpoPopMaster(Map args);

	List<Map> selectImpoPopMaster1(Map args);

	long updateExpoInv(Map args);

	long updateExpoInv2(Map args);

	long updateImpoHng(Map args);

	long updateImpoHng1(Map args);

	long updateImpoHng2(Map args);

	List<Map> selectMaxOrigStat(Map args);

	List<Map> selectDrawOrigStat(Map args);

	long insertOrigStat(Map args);

	long updateOrigStat(Map args);

	List<Map> selectExpoLanHng(Map args);

	long updateExpoMaster(Map args);

	long updateImpoMaster(Map args);

	List<Map> selectCheckQty(Map args);

	List<Map> selectOrgCheck(Map args);

	List<Map> selectOrigStat(Map args);

	List<Map> selectEdwardsImpoSum(Map args);

	List<Map> selectEdwardsExpoSum(Map args);

	long updateImpoCommentMaster(Map args);

	long updateImpoNewCommentMaster(Map args);

	List<Map> selectSchedule(Map args);

	List<Map> selectNewSchedule(Map args);

	List<Map> selectNewSchedule1(Map args);

	List<Map> selectItemExemDescList(Map args);

	List<Map> selectDemdPlanItem(Map args);

	long updateDemdPlanItem(Map args);

	List<Map> selectMaxExemDesc(Map args);

	List<Map> selectExemDesc(Map args);

	long insertExemDesc(Map args);

	long updateExemDesc(Map args);

	long updateImptInv(Map args);

	List<Map> selectExecImptList(Map args);

	List<Map> selectMaxOrdr(Map args);

	long insertExpoOrder(Map args);

	long updateExpoOrder(Map args);

	List<Map> selectMaxExptInv(Map args);

	long insertExpoInv(Map args);

	long updateExpoInv1(Map args);

	List<Map> selectMaxImOrdr(Map args);

	long insertImpoOrder(Map args);

	long updateImpoOrder(Map args);

	List<Map> selectMaxImptInv(Map args);

	long insertImpoInv(Map args);

	long updateImpoInv1(Map args);

	long updateImpoInv2(Map args);

	List<Map> selectImportStatusList(Map args);

	List<Map> selectImportStatusList1(Map args);

	List<Map> selectImportStatusDetail1(Map args);

	List<Map> selectImportStatusDetail2(Map args);

	List<Map> selectExportStatusList(Map args);

	List<Map> selectExportDeclarationDetailList(Map args);

	List<Map> selectExportDeclarationSubDetailList(Map args);

	List<Map> selectExpoStatisticList(Map args);

	List<Map> selectExpoStatisticListCount(Map args);

	List<Map> selectExpoStatisticLanList(Map args);

	List<Map> selectExpoStatisticLanListCount(Map args);

	List<Map> selectExpoStatisticItemList(Map args);

	List<Map> selectExpoStatisticItemListCount(Map args);

	List<Map> selectExpoTeukStatisticList(Map args);

	List<Map> selectExpoTeukStatisticLanList(Map args);

	List<Map> selectExpoTeukStatisticItemList(Map args);

	List<Map> selectImpoCountCheck(Map args);

	List<Map> selectSeyulCheck(Map args);

	List<Map> selectWonsanjiCheck(Map args);

	List<Map> selectCoNo(Map args);

	List<Map> selectRcmdInfo(Map args);

	long insertDemdCodeItem(Map args);

	List<Map> selectMaxReExpo(Map args);

	long insertReExpoMaster(Map args);

	long updateReExpoMaster(Map args);

	List<Map> selectMaxDtlSeq(Map args);

	long insertReExpoDetail(Map args);

	long deleteReExpoDetail(Map args);

	List<Map> selectDrawCheck1(Map args);

	List<Map> selectDrawCheck2(Map args);

	List<Map> selectDrawCheck3(Map args);

	List<Map> selectDrawCheck4(Map args);

	List<Map> selectCheckQty1(Map args);

	List<Map> selectCheckQty11(Map args);

	List<Map> selectItemMaster(Map args);

	List<Map> selectImpoStatisticList(Map args);

	List<Map> selectImpoStatisticListCount(Map args);

	List<Map> selectImpoStatisticLanList(Map args);

	List<Map> selectImpoStatisticLanListCount(Map args);

//	List<Map> selectImpoStatisticItemList(Map args);

	List<Map> selectImpoStatisticItemList(Map args, ResultHandler resultHandler);

	List<Map> selectImpoStatisticItemListCount(Map args);

	List<Map> selectImpoTeukStatisticList(Map args);

	List<Map> selectImpoTeukStatisticLanList(Map args);

	List<Map> selectImpoTeukStatisticItemList(Map args);

	List<Map> selectItemList(Map args);

	List<Map> selectImpoInvList(Map args);

	List<Map> selectImpoInvListCount(Map args);

	List<Map> selectImpoExpressInvList(Map args);

	long updateImpoExpressInvList(Map args);

	List<Map> selectImpoExpressInvListCount(Map args);

	List<Map> selectImpoGamList(Map args);

	List<Map> selectImpoGamListCount(Map args);

	List<Map> selectCoExpoIssueList(Map args);

	List<Map> selectCoImpoIssueList(Map args);

	List<Map> selectDrawMaster(Map args);

	List<Map> threeMonthRmidQty(Map args);

	List<Map> threeMonthRmidQty11(Map args);

	List<Map> selectBomDrawList(Map args);

	List<Map> selectMaxBomDraw(Map args);

	List<Map> selectMaxBomDrawSeq(Map args);

	long insertBomDraw(Map args);

	List<Map> selectItemExemEnd(Map args);

	List<Map> selectMaxExecImpt(Map args);

	long insertExecImptList(Map args);

	long insertExemExecItem(Map args);

	List<Map> selectImpoGamExecList(Map args);

	List<Map> selectImpoGamExecListCount(Map args);

	List<Map> selectImpoNoGamList(Map args);

	List<Map> selectImpoNoGamListCount(Map args);

	List<Map> selectReExpobjItemMasterAll(Map args);

	List<Map> selectImpoNoGamExecList(Map args);

	List<Map> selectImpoNoGamExecListCount(Map args);

	List<Map> selectImptItem(Map args);

	List<Map> selectExptItem(Map args);

	List<Map> selectExpoDrawStatisticList(Map args);

	List<Map> selectExpoDrawStatisticListCount(Map args);

	List<Map> selectCommonCode(Map args);

	long updateBomDraw(Map args);

	long insertDB(Map args);

	List<Map> selectExportKpiList(Map args);

	List<Map> selectExpoDrawStatisticList1(Map args);

	List<Map> selectExpoDrawStatisticList1Count(Map args);

	List<Map> selectReExpoList(Map args);

	long updateExpoHng(Map args);

	List<Map> selectItemPumpCheck(Map args);
	
	List<Map> selectOrigCheck(Map args);

	List<Map> selectMyunCheck(Map args);

	List<Map> selectMyunCheck1(Map args);

	List<Map> selectMyunCheck2(Map args);

	List<Map> selectMyunCheck3(Map args);

	List<Map> selectExSerialCheck(Map args);

	List<Map> selectExSerialCheck1(Map args);

	List<Map> selectExSerialCheck2(Map args);

	List<Map> selectExSerialCheck3(Map args);

	List<Map> selectExSerialNotCheck(Map args);

	List<Map> selectImSerialCheck(Map args);

	List<Map> selectImSerialCheck1(Map args);

	List<Map> selectImSerialCheck2(Map args);

	List<Map> selectImSerialCheck3(Map args);

	List<Map> selectImSerialNotCheck(Map args);

	List<Map> selectReImpoList(Map args);

	long updateExpoInv3(Map args);

	long updateImpoHng3(Map args);

	List<Map> selectReImpoList1(Map args);

	long updateExpoInv4(Map args);

	List<Map> selectReImpoCheckList(Map args);

	List<Map> selectReExpoCheckList(Map args);

	long updateReExpo(Map args);

	long updateReExpo1(Map args);

	long updateReExpo2(Map args);

	long updateReExpo3(Map args);

	long insertReExpo(Map args);

	long insertReExpo1(Map args);

	long insertReExpo2(Map args);

	long insertReImpo(Map args);

	long updateReImpo(Map args);

	long updateReImpo1(Map args);

	List<Map> selectBomMaster1(Map args);

	List<Map> selectBomMaster1Count(Map args);

	long updateBomMaster1(Map args);

	long updateBomMaster2(Map args);

	long insertBOM(Map args);

	List<Map> selectReExpoDetail(Map args);

	List<Map> selectAutoReExpo(Map args);

	List<Map> selectAutoReExpoCancel(Map args);

	List<Map> selectAutoReImpo(Map args);

	List<Map> selectAutoReImpoCancel(Map args);

	List<Map> selectReExpoCount(Map args);

	List<Map> selectReImpoCount(Map args);

	long updateReImpoCount(Map args);

	List<Map> selectReImpoCount1(Map args);

	List<Map> selectReImpoCount2(Map args);

	long updateNullInv();

	long updateNullDecl();

	long updateNullLan();

	long updateNullHng();

	long updateNullSel();

	long updateNullBl();

	long updateNullImDecl();

	long updateNullImLan();

	long updateNullImHng();

	long updateNullSo();

	long updateNullEn();

	long updateNullEx();

	long updateNullImSl();

	long updateNullExIv();

	long updateNullExDecl();

	long updateNullExLan();

	long updateNullExHng();

	List<Map> selectQtyLogList(Map args);

	List<Map> selectKitList(Map args);

	List<Map> selectKitItemList(Map args);

	List<Map> selectKitExcelList(Map args);

	List<Map> selectImInvNoCheck(Map args);

	List<Map> selectGinapList(Map args);
	
	List<Map> selectFCNCheck(Map args);
	
	List<Map> selectFCNCheck1(Map args);
	
	List<Map> selectHsCodeCheck(Map args);
}