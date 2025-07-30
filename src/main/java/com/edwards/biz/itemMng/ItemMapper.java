package com.edwards.biz.itemMng;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ItemMapper{
	List<Map> selectItemHsMasterList(Map args);

	List<Map> selectItemList(Map args);

	Map selectItemInfo(Map args);

	long updateItemTPInfo(Map args);

	List<Map> selectRmsItemNotYogList(Map args);

	List<Map> selectRmsItemNotYogList1(Map args);

	List<Map> selectItemAmdMasterList(Map args);

	List<Map> selectItemAmdDetailList(Map args);

	List<Map> selectItemAmdInspectionHistoryList(Map args);

	List<Map> selectUnitPriceHistoryList(Map args);

	List<Map> selectCustomsUnitPriceList(Map args);

	List<Map> selectCustomsUnitPriceDemoList(Map args);

	List<Map> selectLCRList(Map args);

	List<Map> selectImportManagement(Map args);

	long updateRecvImpo3(Map args);

	List<Map> selectCompItemInfo(Map args);

	List<Map> selectItemCheck(Map args);

	List<Map> selectHsList(Map args);

	long insertItemMaster(Map args);

	long insertItemMaster1(Map args);

	long insertItemMaster2(Map args);

	long updateItemMaster(Map args);

	long updateItemMaster1(Map args);

	long insertItemAmdMst(Map args);

	long insertItemAmdDtl(Map args);

	List<Map> selectItemCompList(Map args);

	List<Map> selectInvoiceMasterList(Map args);

	long copyInvoiceMasterList(Map args);

	long insertInvoiceImpo1(Map args);

	List<Map> selectInvoiceItemList(Map args);

	long insertInvoiceImpo3(Map args);

	long modiInvoiceImpo3(Map args);

	long delInvoiceImpo1(Map args);

	long delInvoiceImpo3(Map args);

	long updateInvoiceImpo1(Map args);

	long updateInvoiceImpo1Sub(Map args);

	long updateInvoiceImpo1Jung(Map args);

	long updateInvoiceImpo1ImpoKey(Map args);

	List<Map> selectInvoiceItemGroupByList1(Map args);

	List<Map> selectInvoiceItemGroupByList2(Map args);

	List<Map> selectInvoiceItemGroupByList3(Map args);

	List<Map> selectInvoiceItemGroupByList4(Map args);

	List<Map> selectInvoiceLanList(Map args);

	long delInvoiceLan(Map args);

	long insertInvoiceLan(Map args);

	long insertInvoiceTotalImpo1List(Map args);

	long updateInvoiceImpo2ImpoKey(Map args);

	long insertInvoiceTotalImpo2List(Map args);

	long updateInvoiceImpo3ImpoKey(Map args);

	long insertInvoiceTotalImpo3List(Map args);

	List<Map> selectSysCodeList(Map args);

	List<Map> selectHsCodeList(Map args);

	List<Map> selectLanItemList(Map args);

	long modiInvoiceImpo2(Map args);

	List<Map> selectDnoList(Map args);

	long updateDnoList(Map args);

	List<Map> selectDnoList1(Map args);

	long updateDnoList1(Map args);

	List<Map> selectTradeList(Map args);

	List<Map> selectTradeDemoList(Map args);

	List<Map> selectItemInfo1(Map args);

	List<Map> selectFtaManagementVendorList(Map args);

	List<Map> selectFtaManagementList(Map args);

	List<Map> selectItemSebList(Map args);

	long updateStatus4(Map args);

	long insertCUAA130(Map args);

	long updateCUAA130(Map args);

	List<Map> selectCUAA130(Map args);

	List<Map> selectImpoPlCodeList(Map args);

	List<Map> selectImpoPlCodeDetailList(Map args);

	List<Map> selectImpoPlCodeExcelList(Map args);








  /**
   * Update item confirm status long.
   *
   * @param args the args
   * @return the long
   */
  long updateItemConfirmStatus(Map args);

  /**
   * Find item history list list.
   *
   * @param args the args
   * @return the list
   */
  List<Map> findItemHistoryList(Map args);

  /**
   * Find item info map.
   *
   * @param args the args
   * @return the map
   */


  /**
   * TP단가 업데이트
   *
   * @param args the args
   * @return the long
   */


  /**
   * Update item unit price long.
   *
   * @param args the args
   * @return the long
   */
  long updateItemUnitPrice(Map args);

  /**
   * Update item master long.
   *
   * @param args the args
   * @return the long
   */


  /**
   * Find item amd master max seq map.
   *
   * @param args the args
   * @return the map
   */
  Map findItemAmdMasterMaxSeq(Map args);

  /**
   * Find item amd detail max seq map.
   *
   * @param args the args
   * @return the map
   */
  Map findItemAmdDetailMaxSeq(Map args);

  /**
   * Insert item amd master long.
   *
   * @param args the args
   * @return the long
   */
  long insertItemAmdMaster(Map args);

  /**
   * Insert item amd detail long.
   *
   * @param args the args
   * @return the long
   */
  long insertItemAmdDetail(Map args);

  /**
   * Find item amd master list list.
   *
   * @param args the args
   * @return the list
   */



  /**
   * Find item amd detail history list list.
   *
   * @param args the args
   * @return the list
   */
  List<Map> findItemAmdDetailHistoryList(Map args);


  /**
   * Find soo mst item history list list.
   *
   * @param args the args
   * @return the list
   */
  List<Map> findSooMstItemHistoryList(Map args);

  /**
   * Find item m count no for demo list list.
   *
   * @param args the args
   * @return the list
   */
  List<Map> findItemMCountNoForDemoList(Map args);

  /**
   * Find item result import unit price list list.
   *
   * @param args the args
   * @return the list
   */
  List<Map> findItemResultImportUnitPriceList(Map args);

  /**
   * Find item result import unit price same deleted list list.
   *
   * @param args the args
   * @return the list
   */
  List<Map> findItemResultImportUnitPriceSameDeletedList(Map args);


  Map findMaxSeqRmsItemNotYog(Map args);
  long insertRmsItemNotYog(Map args);
  long updateRmsItemNotYog(Map args);
  long deleteRmsItemNotYog(Map args);



  List<Map> findItemSettingList(Map args);

  long deleteItemCount();

  long insertItemCount(Map args);

  List<Map> findPlCodeList(Map args);

  List<Map> findPlCodeDetailList(Map args);

  List<Map> findPlCodeExcelList(Map args);
}