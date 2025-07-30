package com.edwards.biz3.mariaManagement;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface MariaMapper{
	List<Map> selectBoardInfoList(Map args);

	List<Map> selectBoardInfoSimpleList(Map args);
}