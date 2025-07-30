package com.edwards.biz.systemManagement;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface UserMenuAuthMapper {
	List<Map> selectUserMenuList(Map args);

	List<Map> addSysMenuList(Map args);

	List<Map> addBasicSysMenuList(Map args);

	List<Map> addTestSysMenuList(Map args);

	List<Map> selectCustomerList(Map args);

	List<Map> selectCustomerAllList(Map args);

	List<Map> selectCustomer(Map args);

	List<Map> selectDefaultDBList(Map args);

	List<Map> selectContactList(Map args);

	List<Map> selectNtaaList(Map args);

	List<Map> selectNtaaListSimple(Map args);

	long insertNTAA100(Map args);

	long updateNTAA100(Map args);

	List<Map> selectMonthlyList(Map args);

	long updatePercent(Map args);

	List<Map> selectContactMail(Map args);






	List<Map> findUserXAuthXMenuList(Map args);

	void syncUserXAuthXMenuList(Map args);

	void callProcDeleteUser(Map args);
}