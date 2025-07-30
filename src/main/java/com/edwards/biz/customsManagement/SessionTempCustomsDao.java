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
}