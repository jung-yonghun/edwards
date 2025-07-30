package com.edwards.biz.codeManagement;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SooMstCmmnCodeMapper {
	List<Map> selectSooMstCdHsRateWithTrrtTpcdList(Map args);





  /**
   * Call sync customer info.
   *
   * @param args the args
   */
  void callSyncCustomerInfo(Map args);

  /**
   * Call sync customer individual info.
   *
   * @param args the args
   */
  void callSyncCustomerIndividualInfo(Map args);
}