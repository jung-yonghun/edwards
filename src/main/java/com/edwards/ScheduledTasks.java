package com.edwards;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.apache.ibatis.session.SqlSession;
import org.json.JSONObject;

import com.edwards.biz.codeManagement.CodeManagementService;
import com.edwards.commons.CmmnUtils;

import org.modelmapper.ModelMapper;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component("myBean")
public class ScheduledTasks{
	@Qualifier("SqlSessionTemplate")
	@Autowired
	private SqlSession sqlSession;
	@Autowired
	private CodeManagementService codeManagementService;
	@Autowired
	private ModelMapper modelMapper;

	public void fixedDelay(){
    }

    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");
}