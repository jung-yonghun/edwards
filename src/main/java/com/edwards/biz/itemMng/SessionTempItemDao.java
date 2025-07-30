package com.edwards.biz.itemMng;

import java.io.IOException;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

@Repository
public class SessionTempItemDao{
	@Autowired
	@Qualifier("SqlSessionTemplate")
	private SqlSessionTemplate sqlSessionTemplate;

	public void importManage(String sqlId, @SuppressWarnings("rawtypes") Map param, ManageExcel excelResultHandler) throws IOException{
		sqlSessionTemplate.select(sqlId, param, excelResultHandler);
	}

	public void importManage1(String sqlId, @SuppressWarnings("rawtypes") Map param, ManageExcel1 excelResultHandler) throws IOException{
		sqlSessionTemplate.select(sqlId, param, excelResultHandler);
	}

	public void zeissImport(String sqlId, @SuppressWarnings("rawtypes") Map param, ZeissImpExcel excelResultHandler) throws IOException{
		sqlSessionTemplate.select(sqlId, param, excelResultHandler);
	}

	public void sebItemExcel(String sqlId, @SuppressWarnings("rawtypes") Map param, SebItemExcel excelResultHandler) throws IOException{
		sqlSessionTemplate.select(sqlId, param, excelResultHandler);
	}
}