package com.edwards.biz.customsManagement;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface NewExpoCustomsMapper {
	//############ 현장관리 시작  #############//
	List<Map> selectExportFieldAllStatusList(Map args);

	List<Map> selectExportNewFieldStatusList(Map args);

	List<Map> selectExportJungFieldAllStatusList(Map args);

	List<Map> selectExportNewJungFieldStatusList(Map args);
	//############ 현장관리 끝  #############//
}