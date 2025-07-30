package com.edwards.biz.edwardsManagement;

import com.edwards.biz.customsManagement.ExpoCustomsMapper;
import com.edwards.biz.customsManagement.ImpoCustomsMapper;
import com.edwards.biz.edmsManagement.EdmsMasterDao;
import com.edwards.biz.edwardsManagement.SessionTempDao;
import com.edwards.commons.CmmnUtils;
import com.edwards.commons.CommExcel;
import com.edwards.domains.EdTestVO;

import org.apache.ibatis.session.ResultContext;
import org.apache.ibatis.session.ResultHandler;
import org.apache.ibatis.session.SqlSession;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class EdwardsManagementService{
	@Qualifier("SqlSessionTemplate")
	@Autowired
	private SqlSession sqlSession;
	@Autowired
	private MessageSource messageSource;
	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	private SessionTempDao sessionTempDao;

	public List<Map> selectModelMaster(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectModelMaster(CmmnUtils.replaceMapSc(args));
	}

	public long insertModelMaster(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).insertModelMaster(CmmnUtils.replaceMapSc(args));
	}

	public long updateModelMaster(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateModelMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectHsGroupMaster(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectHsGroupMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectHsGroupList(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectHsGroupList(CmmnUtils.replaceMapSc(args));
	}

	public long insertHsGroupMaster(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).insertHsGroupMaster(CmmnUtils.replaceMapSc(args));
	}

	public long updateHsGroupMaster(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateHsGroupMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectHsGroupCodeMaster(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectHsGroupCodeMaster(CmmnUtils.replaceMapSc(args));
	}

	public long insertHsGroupCodeMaster(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).insertHsGroupCodeMaster(CmmnUtils.replaceMapSc(args));
	}

	public long updateHsGroupCodeMaster(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateHsGroupCodeMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectSysStdList(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectSysStdList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectHsSgroupMaster(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectHsSgroupMaster(CmmnUtils.replaceMapSc(args));
	}

	public long insertHsSgroupMaster(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).insertHsSgroupMaster(CmmnUtils.replaceMapSc(args));
	}

	public long updateHsSgroupMaster(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateHsSgroupMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectHsSgroupCodeMaster(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectHsSgroupCodeMaster(CmmnUtils.replaceMapSc(args));
	}

	public long insertHsSgroupCodeMaster(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).insertHsSgroupCodeMaster(CmmnUtils.replaceMapSc(args));
	}

	public long updateHsSgroupCodeMaster(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateHsSgroupCodeMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectMaxCd(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectMaxCd(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectMaxSeq(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectMaxSeq(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectMaxScd(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectMaxScd(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectMaxSseq(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectMaxSseq(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectComMaster(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectComMaster(CmmnUtils.replaceMapSc(args));
	}

	public long insertComMaster(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).insertComMaster(CmmnUtils.replaceMapSc(args));
	}

	public long updateComMaster(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateComMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectCstmList(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectCstmList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectCstmLaw(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectCstmLaw(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectCstmMaster(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectCstmMaster(CmmnUtils.replaceMapSc(args));
	}

	public long insertCstmMaster(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).insertCstmMaster(CmmnUtils.replaceMapSc(args));
	}

	public long updateCstmMaster(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateCstmMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectCstmCodeMaster(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectCstmCodeMaster(CmmnUtils.replaceMapSc(args));
	}

	public long insertCstmCodeMaster(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).insertCstmCodeMaster(CmmnUtils.replaceMapSc(args));
	}

	public long updateCstmCodeMaster(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateCstmCodeMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectMaxCstm(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectMaxCstm(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectMaxSeqCstm(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectMaxSeqCstm(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectBomMaster(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectBomMaster(CmmnUtils.replaceMapSc(args));
	}

	public long insertBomMaster(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).insertBomMaster(CmmnUtils.replaceMapSc(args));
	}

	public long updateBomMaster(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateBomMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectBomCodeMaster(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectBomCodeMaster(CmmnUtils.replaceMapSc(args));
	}

	public long insertBomCodeMaster(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).insertBomCodeMaster(CmmnUtils.replaceMapSc(args));
	}

	public long updateBomCodeMaster(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateBomCodeMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectMaxBom(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectMaxBom(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectMaxSeqBom(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectMaxSeqBom(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectRcmdMaster(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectRcmdMaster(CmmnUtils.replaceMapSc(args));
	}

	public long insertRcmdMaster(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).insertRcmdMaster(CmmnUtils.replaceMapSc(args));
	}

	public long updateRcmdMaster(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateRcmdMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectRcmdCodeMaster(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectRcmdCodeMaster(CmmnUtils.replaceMapSc(args));
	}

	public long insertRcmdCodeMaster(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).insertRcmdCodeMaster(CmmnUtils.replaceMapSc(args));
	}

	public long updateRcmdCodeMaster(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateRcmdCodeMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectMaxRcmd(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectMaxRcmd(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectMaxSeqRcmd(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectMaxSeqRcmd(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectRcmdItemMaster(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectRcmdItemMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectDemdMaster(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectDemdMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectMaxDemd(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectMaxDemd(CmmnUtils.replaceMapSc(args));
	}

	public long insertDemdMaster(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).insertDemdMaster(CmmnUtils.replaceMapSc(args));
	}

	public long updateDemdMaster(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateDemdMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectDemdCodeMaster(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectDemdCodeMaster(CmmnUtils.replaceMapSc(args));
	}

	public long insertDemdCodeMaster(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).insertDemdCodeMaster(CmmnUtils.replaceMapSc(args));
	}

	public long updateDemdCodeMaster(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateDemdCodeMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectMaxSeqDemd(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectMaxSeqDemd(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectDemdItemMaster(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectDemdItemMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExecMaster(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectExecMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectMaxExec(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectMaxExec(CmmnUtils.replaceMapSc(args));
	}

	public long insertExecMaster(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).insertExecMaster(CmmnUtils.replaceMapSc(args));
	}

	public long updateExecMaster(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateExecMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExecCodeMaster(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectExecCodeMaster(CmmnUtils.replaceMapSc(args));
	}

	public long insertExecCodeMaster(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).insertExecCodeMaster(CmmnUtils.replaceMapSc(args));
	}

	public long updateExecCodeMaster(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateExecCodeMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectMaxSeqExec(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectMaxSeqExec(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExecItemMaster(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectExecItemMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectAfmngMaster(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectAfmngMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectMaxAfmng(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectMaxAfmng(CmmnUtils.replaceMapSc(args));
	}

	public long insertAfmngMaster(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).insertAfmngMaster(CmmnUtils.replaceMapSc(args));
	}

	public long updateAfmngMaster(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateAfmngMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectAfmngItemMaster(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectAfmngItemMaster(CmmnUtils.replaceMapSc(args));
	}

	public long insertAfmngCodeMaster(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).insertAfmngCodeMaster(CmmnUtils.replaceMapSc(args));
	}

	public long updateAfmngCodeMaster(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateAfmngCodeMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectMaxSeqAfmng(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectMaxSeqAfmng(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectReExpobjMaster(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectReExpobjMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectReExpobjItemMaster(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectReExpobjItemMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectReExpobjAddItemMaster(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectReExpobjAddItemMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectReExpobjAddItemMaster1(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectReExpobjAddItemMaster1(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectMfcMaster(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectMfcMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectMfcItemMaster(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectMfcItemMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectMfcCodeMaster(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectMfcCodeMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectOrgOrdrMaster(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectOrgOrdrMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectOrgOrdrList(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectOrgOrdrList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectOrgExpoList(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectOrgExpoList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectOrgImpoList(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectOrgImpoList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectCoMaster(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectCoMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectMaxCoMst(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectMaxCoMst(CmmnUtils.replaceMapSc(args));
	}

	public long insertCoMaster(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).insertCoMaster(CmmnUtils.replaceMapSc(args));
	}

	public long updateCoMaster(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateCoMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectCoItemMaster(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectCoItemMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectMaxSeqCo(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectMaxSeqCo(CmmnUtils.replaceMapSc(args));
	}

	public long insertCoItemMaster(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).insertCoItemMaster(CmmnUtils.replaceMapSc(args));
	}

	public long updateCoItemMaster(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateCoItemMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExpoMaster(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectExpoMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExpoInvMaster(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectExpoInvMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExpoLanMaster(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectExpoLanMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExpoHangMaster(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectExpoHangMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExpoImpoMaster(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectExpoImpoMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImpoMaster(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectImpoMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImpoInvMaster(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectImpoInvMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImpoInvSumMaster(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectImpoInvSumMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImpoLanMaster(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectImpoLanMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImpoHangMaster(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectImpoHangMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImpoGamMaster(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectImpoGamMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectFtaMaster(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectFtaMaster(CmmnUtils.replaceMapSc(args));
	}

	public long insertFtaMaster(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).insertFtaMaster(CmmnUtils.replaceMapSc(args));
	}

	public long updateFtaMaster(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateFtaMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImpoPopMaster(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectImpoPopMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImpoPopMaster1(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectImpoPopMaster1(CmmnUtils.replaceMapSc(args));
	}

	public long updateExpoInv(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateExpoInv(CmmnUtils.replaceMapSc(args));
	}

	public long updateExpoInv2(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateExpoInv2(CmmnUtils.replaceMapSc(args));
	}

	public long updateImpoHng(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateImpoHng(CmmnUtils.replaceMapSc(args));
	}

	public long updateImpoHng1(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateImpoHng1(CmmnUtils.replaceMapSc(args));
	}

	public long updateImpoHng2(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateImpoHng2(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectMaxOrigStat(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectMaxOrigStat(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectDrawOrigStat(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectDrawOrigStat(CmmnUtils.replaceMapSc(args));
	}

	public long insertOrigStat(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).insertOrigStat(CmmnUtils.replaceMapSc(args));
	}

	public long updateOrigStat(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateOrigStat(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExpoLanHng(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectExpoLanHng(CmmnUtils.replaceMapSc(args));
	}

	public long updateExpoMaster(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateExpoMaster(CmmnUtils.replaceMapSc(args));
	}

	public long updateImpoMaster(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateImpoMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectCheckQty(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectCheckQty(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectOrgCheck(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectOrgCheck(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectOrigStat(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectOrigStat(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectEdwardsImpoSum(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectEdwardsImpoSum(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectEdwardsExpoSum(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectEdwardsExpoSum(CmmnUtils.replaceMapSc(args));
	}

	public long updateImpoCommentMaster(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateImpoCommentMaster(CmmnUtils.replaceMapSc(args));
	}

	public long updateImpoNewCommentMaster(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateImpoNewCommentMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectNewSchedule(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectNewSchedule(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectNewSchedule1(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectNewSchedule1(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectSchedule(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectSchedule(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectItemExemDescList(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectItemExemDescList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectDemdPlanItem(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectDemdPlanItem(CmmnUtils.replaceMapSc(args));
	}

	public long updateDemdPlanItem(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateDemdPlanItem(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectMaxExemDesc(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectMaxExemDesc(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExemDesc(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectExemDesc(CmmnUtils.replaceMapSc(args));
	}

	public long updateExemDesc(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateExemDesc(CmmnUtils.replaceMapSc(args));
	}

	public long insertExemDesc(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).insertExemDesc(CmmnUtils.replaceMapSc(args));
	}

	public long updateImptInv(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateImptInv(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExecImptList(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectExecImptList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectMaxOrdr(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectMaxOrdr(CmmnUtils.replaceMapSc(args));
	}

	public long insertExpoOrder(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).insertExpoOrder(CmmnUtils.replaceMapSc(args));
	}

	public long updateExpoOrder(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateExpoOrder(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectMaxExptInv(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectMaxExptInv(CmmnUtils.replaceMapSc(args));
	}

	public long insertExpoInv(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).insertExpoInv(CmmnUtils.replaceMapSc(args));
	}

	public long updateExpoInv1(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateExpoInv1(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectMaxImOrdr(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectMaxImOrdr(CmmnUtils.replaceMapSc(args));
	}

	public long insertImpoOrder(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).insertImpoOrder(CmmnUtils.replaceMapSc(args));
	}

	public long updateImpoOrder(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateImpoOrder(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectMaxImptInv(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectMaxImptInv(CmmnUtils.replaceMapSc(args));
	}

	public long insertImpoInv(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).insertImpoInv(CmmnUtils.replaceMapSc(args));
	}

	public long updateImpoInv1(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateImpoInv1(CmmnUtils.replaceMapSc(args));
	}

	public long updateImpoInv2(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateImpoInv2(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImportStatusList(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).selectImportStatusList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImportStatusList1(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).selectImportStatusList1(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImportStatusDetail1(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).selectImportStatusDetail1(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImportStatusDetail2(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).selectImportStatusDetail2(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExportStatusList(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).selectExportStatusList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExportDeclarationDetailList(Map args) {
		return sqlSession.getMapper(EdwardsMapper.class).selectExportDeclarationDetailList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExportDeclarationSubDetailList(Map args) {
		return sqlSession.getMapper(EdwardsMapper.class).selectExportDeclarationSubDetailList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExpoStatisticList(Map args) {
		return sqlSession.getMapper(EdwardsMapper.class).selectExpoStatisticList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExpoStatisticListCount(Map args) {
		return sqlSession.getMapper(EdwardsMapper.class).selectExpoStatisticListCount(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExpoStatisticLanList(Map args) {
		return sqlSession.getMapper(EdwardsMapper.class).selectExpoStatisticLanList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExpoStatisticLanListCount(Map args) {
		return sqlSession.getMapper(EdwardsMapper.class).selectExpoStatisticLanListCount(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExpoStatisticItemList(Map args) {
		return sqlSession.getMapper(EdwardsMapper.class).selectExpoStatisticItemList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExpoStatisticItemListCount(Map args) {
		return sqlSession.getMapper(EdwardsMapper.class).selectExpoStatisticItemListCount(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExpoTeukStatisticList(Map args) {
		return sqlSession.getMapper(EdwardsMapper.class).selectExpoTeukStatisticList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExpoTeukStatisticLanList(Map args) {
		return sqlSession.getMapper(EdwardsMapper.class).selectExpoTeukStatisticLanList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExpoTeukStatisticItemList(Map args) {
		return sqlSession.getMapper(EdwardsMapper.class).selectExpoTeukStatisticItemList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImpoCountCheck(Map args) {
		return sqlSession.getMapper(EdwardsMapper.class).selectImpoCountCheck(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectSeyulCheck(Map args) {
		return sqlSession.getMapper(EdwardsMapper.class).selectSeyulCheck(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectWonsanjiCheck(Map args) {
		return sqlSession.getMapper(EdwardsMapper.class).selectWonsanjiCheck(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectCoNo(Map args) {
		return sqlSession.getMapper(EdwardsMapper.class).selectCoNo(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectRcmdInfo(Map args) {
		return sqlSession.getMapper(EdwardsMapper.class).selectRcmdInfo(CmmnUtils.replaceMapSc(args));
	}

	public long insertDemdCodeItem(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).insertDemdCodeItem(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectMaxReExpo(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectMaxReExpo(CmmnUtils.replaceMapSc(args));
	}

	public long insertReExpoMaster(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).insertReExpoMaster(CmmnUtils.replaceMapSc(args));
	}

	public long updateReExpoMaster(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateReExpoMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectMaxDtlSeq(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectMaxDtlSeq(CmmnUtils.replaceMapSc(args));
	}

	public long insertReExpoDetail(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).insertReExpoDetail(CmmnUtils.replaceMapSc(args));
	}

	public long deleteReExpoDetail(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).deleteReExpoDetail(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectDrawCheck1(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectDrawCheck1(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectDrawCheck2(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectDrawCheck2(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectDrawCheck3(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectDrawCheck3(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectDrawCheck4(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectDrawCheck4(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectCheckQty1(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectCheckQty1(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectCheckQty11(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectCheckQty11(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectItemMaster(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectItemMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImpoStatisticList(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectImpoStatisticList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImpoStatisticListCount(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectImpoStatisticListCount(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImpoStatisticLanList(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectImpoStatisticLanList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImpoStatisticLanListCount(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectImpoStatisticLanListCount(CmmnUtils.replaceMapSc(args));
	}

//	public List<Map> selectImpoStatisticItemList(Map args){
//		return sqlSession.getMapper(EdwardsMapper.class).selectImpoStatisticItemList(CmmnUtils.replaceMapSc(args));
//	}

	public List<Map> selectImpoStatisticItemList(Map args, SqlSession session){
		return session.getMapper(EdwardsMapper.class).selectImpoStatisticItemList(args, new ResultHandler() {
			public void handleResult(ResultContext context) {
				System.out.println(context);
				Object object = context.getResultObject();
				System.out.println(object);
			}
		});
	}

	public List<Map> selectImpoStatisticItemListCount(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectImpoStatisticItemListCount(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImpoTeukStatisticList(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectImpoTeukStatisticList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImpoTeukStatisticLanList(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectImpoTeukStatisticLanList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImpoTeukStatisticItemList(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectImpoTeukStatisticItemList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectItemList(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectItemList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImpoInvList(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectImpoInvList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImpoInvListCount(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectImpoInvListCount(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImpoExpressInvList(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectImpoExpressInvList(CmmnUtils.replaceMapSc(args));
	}

	public long updateImpoExpressInvList(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateImpoExpressInvList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImpoExpressInvListCount(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectImpoExpressInvListCount(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImpoGamList(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectImpoGamList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImpoGamListCount(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectImpoGamListCount(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectCoExpoIssueList(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectCoExpoIssueList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectCoImpoIssueList(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectCoImpoIssueList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectDrawMaster(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectDrawMaster(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> threeMonthRmidQty(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).threeMonthRmidQty(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> threeMonthRmidQty11(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).threeMonthRmidQty11(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectBomDrawList(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectBomDrawList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectMaxBomDraw(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectMaxBomDraw(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectMaxBomDrawSeq(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectMaxBomDrawSeq(CmmnUtils.replaceMapSc(args));
	}

	public long insertBomDraw(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).insertBomDraw(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectItemExemEnd(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectItemExemEnd(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectMaxExecImpt(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectMaxExecImpt(CmmnUtils.replaceMapSc(args));
	}

	public long insertExecImptList(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).insertExecImptList(CmmnUtils.replaceMapSc(args));
	}

	public long insertExemExecItem(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).insertExemExecItem(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImpoGamExecList(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectImpoGamExecList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImpoGamExecListCount(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectImpoGamExecListCount(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImpoNoGamList(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectImpoNoGamList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImpoNoGamListCount(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectImpoNoGamListCount(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImpoNoGamExecList(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectImpoNoGamExecList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImpoNoGamExecListCount(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectImpoNoGamExecListCount(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectReExpobjItemMasterAll(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectReExpobjItemMasterAll(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImptItem(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectImptItem(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExptItem(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectExptItem(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExpoDrawStatisticList(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectExpoDrawStatisticList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExpoDrawStatisticListCount(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectExpoDrawStatisticListCount(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectCommonCode(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectCommonCode(CmmnUtils.replaceMapSc(args));
	}

	public long updateBomDraw(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateBomDraw(CmmnUtils.replaceMapSc(args));
	}

	public long insertDB(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).insertDB(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExportKpiList(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectExportKpiList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExpoDrawStatisticList1(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectExpoDrawStatisticList1(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExpoDrawStatisticList1Count(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectExpoDrawStatisticList1Count(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectReExpoList(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectReExpoList(CmmnUtils.replaceMapSc(args));
	}

	public long updateExpoHng(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateExpoHng(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectItemPumpCheck(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectItemPumpCheck(CmmnUtils.replaceMapSc(args));
	}
	
	public List<Map> selectOrigCheck(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectOrigCheck(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectMyunCheck(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectMyunCheck(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectMyunCheck1(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectMyunCheck1(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectMyunCheck2(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectMyunCheck2(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectMyunCheck3(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectMyunCheck3(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExSerialCheck(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectExSerialCheck(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExSerialCheck1(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectExSerialCheck1(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExSerialCheck2(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectExSerialCheck2(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExSerialCheck3(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectExSerialCheck3(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExSerialNotCheck(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectExSerialNotCheck(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImSerialCheck(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectImSerialCheck(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImSerialCheck1(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectImSerialCheck1(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImSerialCheck2(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectImSerialCheck2(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImSerialCheck3(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectImSerialCheck3(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImSerialNotCheck(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectImSerialNotCheck(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectReImpoList(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectReImpoList(CmmnUtils.replaceMapSc(args));
	}

	public long updateExpoInv3(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateExpoInv3(CmmnUtils.replaceMapSc(args));
	}

	public long updateImpoHng3(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateImpoHng3(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectReImpoList1(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectReImpoList1(CmmnUtils.replaceMapSc(args));
	}

	public long updateExpoInv4(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateExpoInv4(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectReExpoCheckList(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectReExpoCheckList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectReImpoCheckList(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectReImpoCheckList(CmmnUtils.replaceMapSc(args));
	}

	public long updateReExpo(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateReExpo(CmmnUtils.replaceMapSc(args));
	}

	public long updateReExpo1(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateReExpo1(CmmnUtils.replaceMapSc(args));
	}

	public long updateReExpo2(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateReExpo2(CmmnUtils.replaceMapSc(args));
	}

	public long updateReExpo3(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateReExpo3(CmmnUtils.replaceMapSc(args));
	}

	public long insertReExpo(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).insertReExpo(CmmnUtils.replaceMapSc(args));
	}

	public long insertReExpo1(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).insertReExpo1(CmmnUtils.replaceMapSc(args));
	}

	public long insertReExpo2(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).insertReExpo2(CmmnUtils.replaceMapSc(args));
	}

	public long insertReImpo(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).insertReImpo(CmmnUtils.replaceMapSc(args));
	}

	public long updateReImpo(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateReImpo(CmmnUtils.replaceMapSc(args));
	}

	public long updateReImpo1(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateReImpo1(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectBomMaster1(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectBomMaster1(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectBomMaster1Count(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectBomMaster1Count(CmmnUtils.replaceMapSc(args));
	}

	public long updateBomMaster1(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateBomMaster1(CmmnUtils.replaceMapSc(args));
	}

	public long updateBomMaster2(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateBomMaster2(CmmnUtils.replaceMapSc(args));
	}

	public long insertBOM(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).insertBOM(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectReExpoDetail(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectReExpoDetail(CmmnUtils.replaceMapSc(args));
	}

//	public void download(EdTestVO edTestVO, ExcelResultHandler excelResultHandler){
//		edTestDao.getAttQuery(edTestVO, excelResultHandler);
//	}

	public List<Map> selectAutoReExpo(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectAutoReExpo(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectAutoReExpoCancel(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectAutoReExpoCancel(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectAutoReImpo(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectAutoReImpo(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectAutoReImpoCancel(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectAutoReImpoCancel(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectReExpoCount(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectReExpoCount(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectReImpoCount(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectReImpoCount(CmmnUtils.replaceMapSc(args));
	}

	public long updateReImpoCount(Map args) throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateReImpoCount(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectReImpoCount1(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectReImpoCount1(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectReImpoCount2(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectReImpoCount2(CmmnUtils.replaceMapSc(args));
	}

	public long updateNullInv() throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateNullInv();
	}

	public long updateNullDecl() throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateNullDecl();
	}

	public long updateNullLan() throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateNullLan();
	}

	public long updateNullHng() throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateNullHng();
	}

	public long updateNullSel() throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateNullSel();
	}

	public long updateNullBl() throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateNullBl();
	}

	public long updateNullImDecl() throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateNullImDecl();
	}

	public long updateNullImLan() throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateNullImLan();
	}

	public long updateNullImHng() throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateNullImHng();
	}

	public long updateNullSo() throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateNullSo();
	}

	public long updateNullEn() throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateNullEn();
	}

	public long updateNullEx() throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateNullEx();
	}

	public long updateNullImSl() throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateNullImSl();
	}

	public long updateNullExIv() throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateNullExIv();
	}

	public long updateNullExDecl() throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateNullExDecl();
	}

	public long updateNullExLan() throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateNullExLan();
	}

	public long updateNullExHng() throws Exception{
		return sqlSession.getMapper(EdwardsMapper.class).updateNullExHng();
	}

	public List<Map> selectQtyLogList(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectQtyLogList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectKitList(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectKitList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectKitItemList(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectKitItemList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectKitExcelList(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectKitExcelList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImInvNoCheck(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectImInvNoCheck(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectGinapList(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectGinapList(CmmnUtils.replaceMapSc(args));
	}
	
	public List<Map> selectFCNCheck(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectFCNCheck(CmmnUtils.replaceMapSc(args));
	}
	
	public List<Map> selectFCNCheck1(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectFCNCheck1(CmmnUtils.replaceMapSc(args));
	}
	
	public List<Map> selectHsCodeCheck(Map args){
		return sqlSession.getMapper(EdwardsMapper.class).selectHsCodeCheck(CmmnUtils.replaceMapSc(args));
	}
}