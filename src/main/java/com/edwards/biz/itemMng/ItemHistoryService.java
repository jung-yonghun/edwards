package com.edwards.biz.itemMng;

import com.edwards.biz.codeManagement.CmmnCodeMapper;
import com.edwards.commons.CmmnUtils;

import org.apache.ibatis.session.SqlSession;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class ItemHistoryService {
	@Qualifier("SqlSessionTemplate")
	@Autowired
	private SqlSession sqlSession;
	@Autowired
	private ModelMapper modelMapper;

	public List<Map> selectItemAmdMasterList(Map args) throws Exception {
		return sqlSession.getMapper(ItemMapper.class).selectItemAmdMasterList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectItemAmdDetailList(Map args) throws Exception {
		return sqlSession.getMapper(ItemMapper.class).selectItemAmdDetailList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectItemAmdInspectionHistoryList(Map args) throws Exception {
		return sqlSession.getMapper(ItemMapper.class).selectItemAmdInspectionHistoryList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectUnitPriceHistoryList(Map args) throws Exception {
		return sqlSession.getMapper(ItemMapper.class).selectUnitPriceHistoryList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectCustomsUnitPriceList(Map args) throws Exception {
		return sqlSession.getMapper(ItemMapper.class).selectCustomsUnitPriceList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectCustomsUnitPriceDemoList(Map args) throws Exception {
		return sqlSession.getMapper(ItemMapper.class).selectCustomsUnitPriceDemoList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectTradeList(Map args) throws Exception {
		return sqlSession.getMapper(ItemMapper.class).selectTradeList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectTradeDemoList(Map args) throws Exception {
		return sqlSession.getMapper(ItemMapper.class).selectTradeDemoList(CmmnUtils.replaceMapSc(args));
	}
















	@Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
	public long saveItemAmdHistory(Map args, Map itemInfo) throws Exception{
		String currentDatetime 	= CmmnUtils.getFormatedDate("yyMMddHHmmss");
		Map masterAmdInfo = new HashMap(), detailAmdInfo = new HashMap();

		Map cmmnCode = new HashMap();
		// 공통코드 자재마스터 변경이력 대상 조회
		cmmnCode.put("mCode", "X00001");
		List<Map> cmmnCodeResult 	= sqlSession.getMapper(CmmnCodeMapper.class).findCmmnCodeList(CmmnUtils.replaceMapSc(cmmnCode));
		List<String> itemInfoKeys 	= new ArrayList(itemInfo.keySet());
		List<String> argskeys 		= new ArrayList(args.keySet());
		List<String> keys 			= new ArrayList();
		List<String> keyArr 		= new ArrayList();

		for(String key1 : itemInfoKeys){
			for(String key2 : argskeys){
				if((key1.equalsIgnoreCase(key2)) && (!String.valueOf(itemInfo.get(key1)).equals(String.valueOf(args.get(key2))))){
					keyArr.add(key1);
				}
			}
		}

		for(int u = 0; u < keyArr.size(); u++){
			for(int v = 0; v < argskeys.size(); v++){
				if(keyArr.get(u).equalsIgnoreCase(argskeys.get(v))){
					if(!String.valueOf(itemInfo.get(keyArr.get(u))).equalsIgnoreCase(String.valueOf(args.get(argskeys.get(v))))){
						keys.add(keyArr.get(u));
					}
				}
			}
		}

		Set<String> stringTreeSet = new TreeSet<>(String.CASE_INSENSITIVE_ORDER);
		stringTreeSet.addAll(keys);
		if(stringTreeSet.size() > 0){
		  //자재마스터 변경이력 마스터 저장
			masterAmdInfo.put("mcountNo", args.get("Mcount_no"));
			masterAmdInfo.put("_defaultRmsDb", args.get("_defaultRmsDb")); // rms db 셋팅
			masterAmdInfo = sqlSession.getMapper(ItemMapper.class).findItemAmdMasterMaxSeq(CmmnUtils.replaceMapSc(masterAmdInfo));

			masterAmdInfo.put("mcountNo", args.get("Mcount_no"));
			masterAmdInfo.put("amdSeq", masterAmdInfo.get("masterAmdSeq"));
			masterAmdInfo.put("_userId", args.get("_userId"));
			masterAmdInfo.put("_userNm", args.get("_userNm"));
			masterAmdInfo.put("_userDefaultDb", args.get("_userDefaultDb"));
			masterAmdInfo.put("amdTxt1", CmmnUtils.isNull(args.get("amdTxt1")) ? "" : args.get("amdTxt1"));
			masterAmdInfo.put("amdTxt2", CmmnUtils.isNull(args.get("amdTxt2")) ? "" : args.get("amdTxt2"));
			masterAmdInfo.put("_defaultRmsDb", args.get("_defaultRmsDb")); // rms db 셋팅
			masterAmdInfo.put("AddDtm", currentDatetime);
			masterAmdInfo.put("UseYn", "Y");
			sqlSession.getMapper(ItemMapper.class).insertItemAmdMaster(masterAmdInfo);

			for(int i = 0; i < stringTreeSet.size(); i++){
				for(int j = 0; j < cmmnCodeResult.size(); j++){
					if(String.valueOf(cmmnCodeResult.get(j).get("CODE")).equalsIgnoreCase(keys.get(i))){
						//자재마스터 변경이력 디테일 저장
						detailAmdInfo.put("mcountNo", args.get("Mcount_no"));
						detailAmdInfo.put("amdSeq", masterAmdInfo.get("masterAmdSeq"));
						detailAmdInfo.put("_defaultRmsDb", args.get("_defaultRmsDb")); // rms db 셋팅
						detailAmdInfo = sqlSession.getMapper(ItemMapper.class).findItemAmdDetailMaxSeq(CmmnUtils.replaceMapSc(detailAmdInfo));

						detailAmdInfo.put("mcountNo", args.get("Mcount_no"));
						detailAmdInfo.put("amdSeq", masterAmdInfo.get("masterAmdSeq"));
						detailAmdInfo.put("amdSubSeq", detailAmdInfo.get("detailAmdSeq"));
						detailAmdInfo.put("amdItemId", cmmnCodeResult.get(j).get("CODE"));
						detailAmdInfo.put("amdItemNm", cmmnCodeResult.get(j).get("NAME"));
						detailAmdInfo.put("_defaultRmsDb", args.get("_defaultRmsDb")); // rms db 셋팅
						detailAmdInfo.put("_userId", args.get("_userId"));
						detailAmdInfo.put("_userNm", args.get("_userNm"));
						detailAmdInfo.put("AddDtm", currentDatetime);
						detailAmdInfo.put("UseYn", "Y");
						for(String key : itemInfoKeys){
							if(key.equalsIgnoreCase(String.valueOf(cmmnCodeResult.get(j).get("CODE")))){
								detailAmdInfo.put("amdBf", itemInfo.get(key));
							}
						}
						for(String key : stringTreeSet){
							if(key.equalsIgnoreCase(keys.get(i))){
								detailAmdInfo.put("amdAf", args.get(key));
							}
						}
						sqlSession.getMapper(ItemMapper.class).insertItemAmdDetail(detailAmdInfo);
	//					System.err.println("저장값: " + String.valueOf(cmmnCodeResult.get(j).get("CODE")) + "__" + keys.get(i) + "__" + String.valueOf(cmmnCodeResult.get(j).get("NAME")) + "__" + detailAmdInfo.get("amdBf") + "__" + detailAmdInfo.get("amdAf"));
					}
				}
			}
		}
		return keys.size();
	}

  /**
   * Save soo mst item master amd history long.(자재마스터 변경이력 저장(new))
   *
   * @param newItemInfo the new item info
   * @param oldItemInfo the old item info
   * @return the long
   * @throws Exception the exception
   */
  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public long saveSooMstItemMasterAmdHistory(Map newItemInfo, Map oldItemInfo) throws Exception {
	  String currentDatetime 	= CmmnUtils.getFormatedDate("yyMMddHHmmss");
	Map masterAmdInfo = new HashMap(), detailAmdInfo = new HashMap(), cmmnCode = new HashMap();
	List<String> keys = new ArrayList<>(), keyArr = new ArrayList<>();

	// 공통코드 자재마스터 변경이력 대상 조회(new)
	cmmnCode.put("mCode", "X00002");
	List<Map> cmmnCodeResult = sqlSession.getMapper(CmmnCodeMapper.class).findCmmnCodeList(CmmnUtils.replaceMapSc(cmmnCode));
	List<String> olditemInfoKeys = new ArrayList<>(oldItemInfo.keySet());
	List<String> newItemInfoKeys = new ArrayList<>(newItemInfo.keySet());
	for (String oldKey : olditemInfoKeys) {
	  for (String newKey : newItemInfoKeys) {
		if ((oldKey.equalsIgnoreCase(newKey)) && (!CmmnUtils.snvl(String.valueOf(oldItemInfo.get(oldKey)).trim(), "").equals(CmmnUtils.snvl(String.valueOf(newItemInfo.get(newKey)).trim(), "")))) {
		  keyArr.add(oldKey);
		}
	  }
	}

	for (int u = 0; u < keyArr.size(); u++) {
	  for (int v = 0; v < newItemInfoKeys.size(); v++) {
		if (keyArr.get(u).equalsIgnoreCase(newItemInfoKeys.get(v))) {
		  if (!CmmnUtils.snvl(oldItemInfo.get(keyArr.get(u)), "").equalsIgnoreCase(CmmnUtils.snvl(newItemInfo.get(newItemInfoKeys.get(v)), ""))) {
			keys.add(keyArr.get(u));
		  }
		}
	  }
	}

	Set<String> stringTreeSet = new TreeSet<>(String.CASE_INSENSITIVE_ORDER);
	stringTreeSet.addAll(keys);
	if (stringTreeSet.size() > 0) {
	  //자재마스터 변경이력 마스터 저장
	  masterAmdInfo.put("mcountNo", newItemInfo.get("mcountNo"));
	  masterAmdInfo.put("_defaultRmsDb", newItemInfo.get("_defaultRmsDb")); // rms db 셋팅
	  masterAmdInfo = sqlSession.getMapper(ItemMapper.class).findItemAmdMasterMaxSeq(CmmnUtils.replaceMapSc(masterAmdInfo));

	  masterAmdInfo.put("mcountNo", newItemInfo.get("mcountNo"));
	  masterAmdInfo.put("amdSeq", masterAmdInfo.get("masterAmdSeq"));
	  masterAmdInfo.put("_userId", newItemInfo.get("editUserId"));
	  masterAmdInfo.put("_userNm", newItemInfo.get("editUserNm"));
	  masterAmdInfo.put("_userDefaultDb", newItemInfo.get("_defaultNcustomsDb"));
	  masterAmdInfo.put("amdTxt1", CmmnUtils.isNull(newItemInfo.get("amdTxt1")) ? "" : newItemInfo.get("amdTxt1"));
	  masterAmdInfo.put("amdTxt2", CmmnUtils.isNull(newItemInfo.get("amdTxt2")) ? "" : newItemInfo.get("amdTxt2"));
	  masterAmdInfo.put("_defaultRmsDb", newItemInfo.get("_defaultRmsDb")); // rms db 셋팅
	  masterAmdInfo.put("AddDtm", currentDatetime);
	  masterAmdInfo.put("UseYn", "Y");
	  sqlSession.getMapper(ItemMapper.class).insertItemAmdMaster(masterAmdInfo);

	  for (int i = 0; i < stringTreeSet.size(); i++) {
		for (int j = 0; j < cmmnCodeResult.size(); j++) {
		  if (keys.get(i).equalsIgnoreCase(String.valueOf(cmmnCodeResult.get(j).get("CODE")))) {
			//자재마스터 변경이력 디테일 저장
			detailAmdInfo.put("mcountNo", newItemInfo.get("mcountNo"));
			detailAmdInfo.put("amdSeq", masterAmdInfo.get("masterAmdSeq"));
			detailAmdInfo.put("_defaultRmsDb", masterAmdInfo.get("_defaultRmsDb")); // rms db 셋팅
			detailAmdInfo = sqlSession.getMapper(ItemMapper.class).findItemAmdDetailMaxSeq(CmmnUtils.replaceMapSc(detailAmdInfo));

			detailAmdInfo.put("mcountNo", masterAmdInfo.get("mcountNo"));
			detailAmdInfo.put("amdSeq", masterAmdInfo.get("masterAmdSeq"));
			detailAmdInfo.put("amdSubSeq", detailAmdInfo.get("detailAmdSeq"));
			detailAmdInfo.put("amdItemId", cmmnCodeResult.get(j).get("CODE"));
			detailAmdInfo.put("amdItemNm", cmmnCodeResult.get(j).get("NAME"));
			detailAmdInfo.put("_defaultRmsDb", masterAmdInfo.get("_defaultRmsDb")); // rms db 셋팅
			detailAmdInfo.put("_userId", newItemInfo.get("editUserId"));
			detailAmdInfo.put("_userNm", newItemInfo.get("editUserNm"));
			detailAmdInfo.put("AddDtm", currentDatetime);
			detailAmdInfo.put("UseYn", "Y");
			for (String key1 : olditemInfoKeys) {
			  if (key1.equalsIgnoreCase(String.valueOf(cmmnCodeResult.get(j).get("CODE")))) {
				detailAmdInfo.put("amdBf", String.valueOf(oldItemInfo.get(key1)).trim());
			  }
			}
			for (String key2 : stringTreeSet) {
			  if (key2.equalsIgnoreCase(keys.get(i))) {
				detailAmdInfo.put("amdAf", String.valueOf(newItemInfo.get(keys.get(i))).trim());
			  }
			}
			sqlSession.getMapper(ItemMapper.class).insertItemAmdDetail(detailAmdInfo);
		  }
		}
	  }
	}

	return keys.size();
  }


  /**
   * Gets item amd detail history list.
   *
   * @param args the args
   * @return the item amd detail history list
   * @throws Exception the exception
   */
  public List<Map> getItemAmdDetailHistoryList(Map args) throws Exception {
	return sqlSession.getMapper(ItemMapper.class).findItemAmdDetailHistoryList(CmmnUtils.replaceMapSc(args));
  }

}