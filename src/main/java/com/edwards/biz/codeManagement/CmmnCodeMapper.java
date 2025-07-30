package com.edwards.biz.codeManagement;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CmmnCodeMapper {
	List<Map> selectStandardExchangeRate(Map args);

	List<Map> selectGucciBuList(Map args);

	List<Map> selectGucciObjectList(Map args);

	List<Map> selectGucciBrandList(Map args);

	List<Map> selectSegwanList(Map args);

	List<Map> selectNcomCodeList(Map args);

	List<Map> selectBSAA100MList(Map args);

	long updateBSAA100MList(Map args);

	List<Map> selectBSAJ100List(Map args);

	long updateBSAJ100List(Map args);












	List<Map> findStandardExchangeRateByProcedure(Map args);
  /**
   * 공통코드마스터 조회
   *
   * @param args the args
   * @return the list
   */
  List<Map> findCodeList(Map args);

  /**
   * 공통코드마스터 입력
   *
   * @param args the args
   * @return the long
   */
  long insertCodeInfo(Map args);

  /**
   * 공통코드마스터 수정
   *
   * @param args the args
   * @return the long
   */
  long updateCodeInfo(Map args);

  /**
   * 공통코드마스터 조회
   *
   * @param args the args
   * @return the list
   */
  List<Map> findCmmnCodeList(Map args);

  /**
   * Find customer list list.
   *
   * @param args the args
   * @return the list
   */
  List<Map> findCustomerList(Map args);

  /**
   * Find ex gele list list.
   *
   * @param args the args
   * @return the list
   */
  List<Map> findExGeleList(Map args);

  /**
   * Find ex jong list list.
   *
   * @param args the args
   * @return the list
   */
  List<Map> findExJongList(Map args);

  /**
   * Find ex unsong list list.
   *
   * @param args the args
   * @return the list
   */
  List<Map> findExUnsongList(Map args);

  /**
   * Find indojogun list list.
   *
   * @param args the args
   * @return the list
   */
  List<Map> findIndojogunList(Map args);

  /**
   * Find money list list.
   *
   * @param args the args
   * @return the list
   */
  List<Map> findMoneyList(Map args);

  /**
   * Find country list list.
   *
   * @param args the args
   * @return the list
   */
  List<Map> findCountryList(Map args);

  /**
   * Find forwarder list list.
   *
   * @param args the args
   * @return the list
   */
  List<Map> findForwarderList(Map args);

  /**
   * Find port list list.
   *
   * @param args the args
   * @return the list
   */
  List<Map> findPortList(Map args);



}