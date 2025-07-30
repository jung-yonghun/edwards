package com.edwards.biz3.mariaManagement;

import com.edwards.commons.CmmnUtils;

import org.apache.ibatis.session.SqlSession;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.*;


@Service
public class MariaManagementService{
	@Autowired
	@Qualifier("SqlSessionTemplate3")
	private SqlSession sqlSession;
	@Autowired
	private ModelMapper modelMapper;

	public List<Map> selectBoardInfoList(Map args) throws Exception{
		return sqlSession.getMapper(MariaMapper.class).selectBoardInfoList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectBoardInfoSimpleList(Map args) throws Exception{
		return sqlSession.getMapper(MariaMapper.class).selectBoardInfoSimpleList(CmmnUtils.replaceMapSc(args));
	}
}