package com.edwards.biz.userManagement;

import com.edwards.domains.CpsUserInfoVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface UserInfoDao extends JpaRepository<CpsUserInfoVO, BigDecimal> {
  Page<CpsUserInfoVO> findAll(Specification<CpsUserInfoVO> specification, Pageable pageable);

  List<CpsUserInfoVO> findAll(Specification<CpsUserInfoVO> specification, Sort sort);

  CpsUserInfoVO findByUserEmailAndUserPwAndUseYn(String userEmail, String userPw, String useYn);

  CpsUserInfoVO findByUserEmailAndUseYn(String userEmail, String useYn);

  CpsUserInfoVO findByUserEmailAndUserNameAndUserSaup(String userEmail, String userName, String userSaup);

  CpsUserInfoVO findByUserNameAndUserMobileAndUserSaup(String userName, String userMobile, String userSaup);

  int countByUserEmail(String userEmail);

  int countByUserId(String userId);
}