package com.edwards.biz.edwardsManagement;

import java.io.IOException;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

@Repository
public class SessionTempDao{
	@Autowired
	@Qualifier("SqlSessionTemplate")
	private SqlSessionTemplate sqlSessionTemplate;

	public void exStatistics(String sqlId, @SuppressWarnings("rawtypes") Map param, ExStatisticsExcel excelResultHandler) throws IOException{
		sqlSessionTemplate.select(sqlId, param, excelResultHandler);
	}

	public void exStatisticsLan(String sqlId, @SuppressWarnings("rawtypes") Map param, ExStatisticsLanExcel excelResultHandler) throws IOException{
		sqlSessionTemplate.select(sqlId, param, excelResultHandler);
	}

	public void exStatisticsModel(String sqlId, @SuppressWarnings("rawtypes") Map param, ExStatisticsModelExcel excelResultHandler) throws IOException{
		sqlSessionTemplate.select(sqlId, param, excelResultHandler);
	}

	public void imStatistics(String sqlId, @SuppressWarnings("rawtypes") Map param, ImStatisticsExcel excelResultHandler) throws IOException{
		sqlSessionTemplate.select(sqlId, param, excelResultHandler);
	}

	public void imStatisticsLan(String sqlId, @SuppressWarnings("rawtypes") Map param, ImStatisticsLanExcel excelResultHandler) throws IOException{
		sqlSessionTemplate.select(sqlId, param, excelResultHandler);
	}

	public void imStatisticsModel(String sqlId, @SuppressWarnings("rawtypes") Map param, ImStatisticsModelExcel excelResultHandler) throws IOException{
		sqlSessionTemplate.select(sqlId, param, excelResultHandler);
	}

	public void imInvStatistics(String sqlId, @SuppressWarnings("rawtypes") Map param, ImInvStatisticsExcel excelResultHandler) throws IOException{
		sqlSessionTemplate.select(sqlId, param, excelResultHandler);
	}

	public void imInvExpress(String sqlId, @SuppressWarnings("rawtypes") Map param, ImInvExpressExcel excelResultHandler) throws IOException{
		sqlSessionTemplate.select(sqlId, param, excelResultHandler);
	}

	public void imGam1(String sqlId, @SuppressWarnings("rawtypes") Map param, ImGam1Excel excelResultHandler) throws IOException{
		sqlSessionTemplate.select(sqlId, param, excelResultHandler);
	}

	public void imGam2(String sqlId, @SuppressWarnings("rawtypes") Map param, ImGam2Excel excelResultHandler) throws IOException{
		sqlSessionTemplate.select(sqlId, param, excelResultHandler);
	}

	public void imNoGam1(String sqlId, @SuppressWarnings("rawtypes") Map param, ImNoGam1Excel excelResultHandler) throws IOException{
		sqlSessionTemplate.select(sqlId, param, excelResultHandler);
	}

	public void imNoGam2(String sqlId, @SuppressWarnings("rawtypes") Map param, ImNoGam2Excel excelResultHandler) throws IOException{
		sqlSessionTemplate.select(sqlId, param, excelResultHandler);
	}

	public void exCo(String sqlId, @SuppressWarnings("rawtypes") Map param, ExCoExcel excelResultHandler) throws IOException{
		sqlSessionTemplate.select(sqlId, param, excelResultHandler);
	}

	public void imCo(String sqlId, @SuppressWarnings("rawtypes") Map param, ImCoExcel excelResultHandler) throws IOException{
		sqlSessionTemplate.select(sqlId, param, excelResultHandler);
	}

	public void exKpi(String sqlId, @SuppressWarnings("rawtypes") Map param, ExKpiExcel excelResultHandler) throws IOException{
		sqlSessionTemplate.select(sqlId, param, excelResultHandler);
	}

	public void exStatus(String sqlId, @SuppressWarnings("rawtypes") Map param, ExStatusExcel excelResultHandler) throws IOException{
		sqlSessionTemplate.select(sqlId, param, excelResultHandler);
	}

	public void bom(String sqlId, @SuppressWarnings("rawtypes") Map param, BomExcel excelResultHandler) throws IOException{
		sqlSessionTemplate.select(sqlId, param, excelResultHandler);
	}

	public void item(String sqlId, @SuppressWarnings("rawtypes") Map param, ItemExcel excelResultHandler) throws IOException{
		sqlSessionTemplate.select(sqlId, param, excelResultHandler);
	}

	public void draw1(String sqlId, @SuppressWarnings("rawtypes") Map param, Draw1Excel excelResultHandler) throws IOException{
		sqlSessionTemplate.select(sqlId, param, excelResultHandler);
	}

	public void draw2(String sqlId, @SuppressWarnings("rawtypes") Map param, Draw2Excel excelResultHandler) throws IOException{
		sqlSessionTemplate.select(sqlId, param, excelResultHandler);
	}
}