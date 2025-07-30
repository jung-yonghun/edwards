package com.edwards.biz.ftaManagement;

import com.edwards.commons.CmmnUtils;

import org.apache.ibatis.session.SqlSession;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.*;


@Service
public class FtaManagementService{
	@Qualifier("SqlSessionTemplate")
	@Autowired
	private SqlSession sqlSession;
	@Autowired
	private ModelMapper modelMapper;

	public List<Map> selectFtaManagementVendorList(Map args) throws Exception{
		return sqlSession.getMapper(FtaMapper.class).selectFtaManagementVendorList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectFtaManagementAlconList(Map args) throws Exception{
		return sqlSession.getMapper(FtaMapper.class).selectFtaManagementAlconList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectFtaManagementAlconDetailList(Map args) throws Exception{
		return sqlSession.getMapper(FtaMapper.class).selectFtaManagementAlconDetailList(CmmnUtils.replaceMapSc(args));
	}
}