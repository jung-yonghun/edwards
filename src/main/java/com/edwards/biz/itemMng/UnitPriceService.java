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

import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

@Service
public class UnitPriceService {
	@Qualifier("SqlSessionTemplate")
	@Autowired
	private SqlSession sqlSession;
	@Autowired
	private ItemHistoryService itemHistoryService;

	@Autowired
	private MessageSource messageSource;

  /**
   * Gets unit price master list.
   *
   * @param args the args
   * @return the unit price master list
   * @throws Exception the exception
   */
  public List<Map> getUnitPriceMasterList(Map args) throws Exception {
	return sqlSession.getMapper(UnitPriceMapper.class).findUnitPriceMasterList(CmmnUtils.replaceMapSc(args));
  }

  /**
   * Gets unit price detail list.
   *
   * @param args the args
   * @return the unit price detail list
   * @throws Exception the exception
   */
  public List<Map> getUnitPriceDetailList(Map args) throws Exception {
	return sqlSession.getMapper(UnitPriceMapper.class).findUnitPriceDetailList(CmmnUtils.replaceMapSc(args));
  }

  /**
   * Gets unit price master.
   *
   * @param args the args
   * @return the unit price master
   * @throws Exception the exception
   */
  public Map getUnitPriceMaster(Map args) throws Exception {
	return sqlSession.getMapper(UnitPriceMapper.class).findUnitPriceMaster(CmmnUtils.replaceMapSc(args));
  }

  /**
   * Save unit price confirm map.
   *
   * @param args the args
   * @return the map
   * @throws Exception the exception
   */
  @Transactional(propagation = Propagation.REQUIRED, rollbackFor = {Exception.class})
  public Map saveUnitPriceConfirm(Map args) throws Exception {
	boolean UnitPriceConfirmCheck = false, ItemUnitPriceCheck = false, ItemUnitPriceHistoryCheck = false;
	Map resultMap = new HashMap();

	// 단가마스터 확정
	long result = sqlSession.getMapper(UnitPriceMapper.class).updateUnitPriceConfirm(args);

	if (result != 0) {
	  // 자재마스터 업데이트(단가/인도조건/통화단위)
	  UnitPriceConfirmCheck = true;
	  // 기존 자재마스터 조회
	  Map oldItemInfo = sqlSession.getMapper(ItemMapper.class).selectItemInfo(CmmnUtils.replaceMapSc(args));

	  if (sqlSession.getMapper(ItemMapper.class).updateItemUnitPrice(args) == 0) {
		ItemUnitPriceCheck = false;
	  } else {
		ItemUnitPriceCheck = true;
		// 자재마스터히스토리 변경 이력 추가
		ItemUnitPriceHistoryCheck = itemHistoryService.saveItemAmdHistory(args, oldItemInfo) > 0;
	  }
	}

	resultMap.put("UnitPriceConfirmCheck", UnitPriceConfirmCheck);
	resultMap.put("ItemUnitPriceCheck", ItemUnitPriceCheck);
	resultMap.put("ItemUnitPriceHistoryCheck", ItemUnitPriceHistoryCheck);

	if (resultMap.containsValue(false)) {
	  Object[] parameter = {CmmnConstants.ECODE_FAILURE, "변경된 정보가 없습니다", "파라메터:" + args};
	  throw new Exception(messageSource.getMessage("common.param.message", parameter, Locale.KOREA));
	}

	return resultMap;
  }

  /**
   * Gets unit price customs name list.
   *
   * @param args the args
   * @return the unit price customs name list
   * @throws Exception the exception
   */
  public List<Map> getUnitPriceCustomsNameList(Map args) throws Exception {
	return sqlSession.getMapper(UnitPriceMapper.class).findUnitPriceCustomsNameList(CmmnUtils.replaceMapSc(args));
  }

  /**
   * Gets unit price detail same deleted list.
   *
   * @param args the args
   * @return the unit price detail same deleted list
   * @throws Exception the exception
   */
  public List<Map> getUnitPriceDetailSameDeletedList(Map args) throws Exception {
	return sqlSession.getMapper(UnitPriceMapper.class).findUnitPriceDetailSameDeletedList(CmmnUtils.replaceMapSc(args));
  }
}