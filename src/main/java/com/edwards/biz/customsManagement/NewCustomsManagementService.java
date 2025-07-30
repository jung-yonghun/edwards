package com.edwards.biz.customsManagement;

import com.edwards.commons.CmmnUtils;

import org.apache.ibatis.session.SqlSession;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class NewCustomsManagementService{
	@Qualifier("SqlSessionTemplate")
	@Autowired
	private SqlSession sqlSession;
	@Autowired
	private MessageSource messageSource;
	@Autowired
	private ModelMapper modelMapper;

	//############ 현장관리 시작  #############//
	public List<Map> selectImportFieldAllStatusList(Map args) throws Exception{
		return sqlSession.getMapper(NewImpoCustomsMapper.class).selectImportFieldAllStatusList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImportNewFieldStatusList(Map args) throws Exception{
		return sqlSession.getMapper(NewImpoCustomsMapper.class).selectImportNewFieldStatusList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImportJungFieldAllStatusList(Map args) throws Exception{
		return sqlSession.getMapper(NewImpoCustomsMapper.class).selectImportJungFieldAllStatusList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectImportNewJungFieldStatusList(Map args) throws Exception{
		return sqlSession.getMapper(NewImpoCustomsMapper.class).selectImportNewJungFieldStatusList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExportFieldAllStatusList(Map args) throws Exception{
		return sqlSession.getMapper(NewExpoCustomsMapper.class).selectExportFieldAllStatusList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExportNewFieldStatusList(Map args) throws Exception{
		return sqlSession.getMapper(NewExpoCustomsMapper.class).selectExportNewFieldStatusList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExportJungFieldAllStatusList(Map args) throws Exception{
		return sqlSession.getMapper(NewExpoCustomsMapper.class).selectExportJungFieldAllStatusList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectExportNewJungFieldStatusList(Map args) throws Exception{
		return sqlSession.getMapper(NewExpoCustomsMapper.class).selectExportNewJungFieldStatusList(CmmnUtils.replaceMapSc(args));
	}

	public List<Map> selectFieldManage(Map args) throws Exception{
		return sqlSession.getMapper(NewImpoCustomsMapper.class).selectFieldManage(CmmnUtils.replaceMapSc(args));
	}

	public long saveFieldManage(Map args) throws Exception{
		return sqlSession.getMapper(NewImpoCustomsMapper.class).saveFieldManage(CmmnUtils.replaceMapSc(args));
	}

	public long updateFieldManage(Map args) throws Exception{
		return sqlSession.getMapper(NewImpoCustomsMapper.class).updateFieldManage(CmmnUtils.replaceMapSc(args));
	}
	//############ 현장관리 끝  #############//
}