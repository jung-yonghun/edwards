package com.edwards.biz.edmsManagement;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface EdmsManagementMapper {
	List<Map> selectEdmsFileListNew(Map args);

	List<Map> selectEdmsFileList1(Map args);

  List<Map> findEdmsMasterWithFileList(Map args);

  List<Map> findEdmsMasterWithFileList1(Map args);

  List<Map> findEdmsMasterWithNotClassificationFileList(Map args);

  List<Map> findEdmsMasterStatusGroupCountList(Map args);

  List<Map> findCustomsClearanceByUnregisteredEdmsMasterList(Map args);

  List<Map> findEdmsDivisionCopyTargetList(Map args);

  Map findImpoBlNoStatus(Map args);

  List<Map> findExpoInvoiceList(Map args);

  Map findExpoInvoiceStatus(Map args);

  List<Map> findEdmsFileList1(Map args);

  List<Map> findFileDownList(Map args);

  List<Map> findAsmlImportFtpList();

  List<Map> findScImportFtpList();

  List<Map> findAsmlExportFtpList();

  List<Map> findScExportFtpList();

  List<Map> selectEdmsFileCountList(Map args);
}