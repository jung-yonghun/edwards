package com.edwards.biz.ftaManagement;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface FtaMapper{
	List<Map> selectFtaManagementVendorList(Map args);

	List<Map> selectFtaManagementAlconList(Map args);

	List<Map> selectFtaManagementAlconDetailList(Map args);
}