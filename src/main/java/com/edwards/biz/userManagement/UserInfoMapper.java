package com.edwards.biz.userManagement;

import java.util.List;
import java.util.Map;

public interface UserInfoMapper {
	List<Map> selectBSAA110List(Map args);

	List<Map> findUserInfoList(Map args);

	long updateCpsUserMenu(Map args);;
}