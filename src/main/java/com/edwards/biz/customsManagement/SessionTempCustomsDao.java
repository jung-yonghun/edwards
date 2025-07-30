package com.edwards.biz.customsManagement;

import java.io.IOException;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

@Repository
public class SessionTempCustomsDao{
	@Autowired
	@Qualifier("SqlSessionTemplate")
	private SqlSessionTemplate sqlSessionTemplate;

	public void burberry(String sqlId, @SuppressWarnings("rawtypes") Map param, BurberryExcel excelResultHandler) throws IOException{
		sqlSessionTemplate.select(sqlId, param, excelResultHandler);
	}

	public void porscheTax(String sqlId, @SuppressWarnings("rawtypes") Map param, PorscheTaxExcel excelResultHandler) throws IOException{
		sqlSessionTemplate.select(sqlId, param, excelResultHandler);
	}
	
	public void porscheItem(String sqlId, @SuppressWarnings("rawtypes") Map param, PorscheItemExcel excelResultHandler) throws IOException{
		sqlSessionTemplate.select(sqlId, param, excelResultHandler);
	}
}