package com.edwards.biz.itemMng;

import com.edwards.commons.CmmnConstants;
import com.edwards.commons.CmmnUtils;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class ItemTPService{
	@Qualifier("SqlSessionTemplate")
	@Autowired
	private SqlSession sqlSession;
	@Autowired
	private ItemHistoryService itemHistoryService;
	@Autowired
	private MessageSource messageSource;

	public List<Map> selectItemTPList(Map args) throws Exception {
		return sqlSession.getMapper(ItemMapper.class).selectItemList(CmmnUtils.replaceMapSc(args));
	}

	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
	public Map saveItemTPInfo(Map args) throws Exception{
		List<Map> tpList = (List<Map>) args.get("tpList");

		boolean isMcountNo = false;
		Map result = new HashMap();
		List<Map> errorList = new ArrayList<>();
		String _defaultRmsDb = String.valueOf(args.get("_defaultRmsDb"));

		for(int i = 0; i < tpList.size(); i++){
			Map oldTPList = new HashMap();
		  	List<Map> itemMap = new ArrayList<>();
		  	Map itemParamMap = new HashMap();
			itemParamMap.put("mcoCom", tpList.get(i).get("Mco_com"));
			itemParamMap.put("mmodelCode", tpList.get(i).get("Mmodel_code"));
			itemParamMap.put("_defaultRmsDb", _defaultRmsDb);
			itemMap = sqlSession.getMapper(ItemMapper.class).selectItemList(CmmnUtils.replaceMapSc(itemParamMap));
			if(itemMap.size() > 1){
				Object[] parameter = {CmmnConstants.ECODE_FAILURE, "[처리불가] 자재중복코드가 있습니다", ""};
				throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
			}else if(itemMap.size() == 0){
				Object[] parameter = {CmmnConstants.ECODE_FAILURE, "[처리불가] 자재코드가 없습니다", ""};
				throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
			}else{
				oldTPList.put("mcountNo", itemMap.get(0).get("Mcount_no"));
			}

		  	oldTPList.put("mmodelCode", tpList.get(i).get("Mmodel_code"));
		  	oldTPList.put("Mmodel_code", tpList.get(i).get("Mmodel_code"));
		  	oldTPList.put("munitprice", tpList.get(i).get("Munitprice"));
		  	oldTPList.put("Munitprice", tpList.get(i).get("Munitprice"));
		  	oldTPList.put("_userId", args.get("_userId"));
		  	oldTPList.put("_userNm", args.get("_userNm"));
		  	oldTPList.put("_userDefaultDb", "");
		  	oldTPList.put("amdTxt1", args.get("amd_txt1"));
		  	oldTPList.put("amdTxt2", "검토요망");
		  	oldTPList.put("_defaultRmsDb", _defaultRmsDb);
		  	oldTPList.put("Mcount_no", itemMap.get(0).get("Mcount_no"));
		  	// 자재변경 히스토리 저장
		  	Map oldItemInfo = sqlSession.getMapper(ItemMapper.class).selectItemInfo(CmmnUtils.replaceMapSc(oldTPList));// 기존자재마스터
		  	itemHistoryService.saveItemAmdHistory(oldTPList, oldItemInfo);

		  	long saved = sqlSession.getMapper(ItemMapper.class).updateItemTPInfo(oldTPList);

		  	if(saved == 0){
				Map rtnMap = new HashMap();
				rtnMap.put("error_Mmodel_code", oldTPList.get("mmodelCode"));
				rtnMap.put("error_Mcount_no", oldTPList.get("mcountNo"));
				rtnMap.put("error_Munitprice", String.valueOf(oldTPList.get("munitprice")));
				rtnMap.put("error_Munitprice_old", String.valueOf(oldItemInfo.get("Munitprice")));
				errorList.add(rtnMap);
		  	}else{
				tpList.get(i).put("Mcount_no", String.valueOf(oldItemInfo.get("Mcount_no")));
				tpList.get(i).put("new_Munitprice", tpList.get(i).get("Munitprice"));
				tpList.get(i).put("old_Munitprice", String.valueOf(oldItemInfo.get("Munitprice")));
		  	}
		}

		result.put("errorList", errorList);
		result.put("returnValue", tpList);
		return result;
	}
}