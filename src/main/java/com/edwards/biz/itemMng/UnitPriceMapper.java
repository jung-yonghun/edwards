package com.edwards.biz.itemMng;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UnitPriceMapper {
  List<Map> findUnitPriceMasterList(Map args);

  Map findUnitPriceMaster(Map args);

  List<Map> findUnitPriceDetailList(Map args);

  long updateUnitPriceConfirm(Map args);

  List<Map> findUnitPriceCustomsNameList(Map args);

  List<Map> findUnitPriceDetailSameDeletedList(Map args);
}