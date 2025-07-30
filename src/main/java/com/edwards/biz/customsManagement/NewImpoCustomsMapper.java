package com.edwards.biz.customsManagement;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface NewImpoCustomsMapper {
	//############ 현장관리 시작  #############//
	List<Map> selectImportFieldAllStatusList(Map args);

	List<Map> selectImportNewFieldStatusList(Map args);

	List<Map> selectImportJungFieldAllStatusList(Map args);

	List<Map> selectImportNewJungFieldStatusList(Map args);

	List<Map> selectFieldManage(Map args);

	long saveFieldManage(Map args);

	long updateFieldManage(Map args);
	//############ 현장관리 끝  #############//
}