package com.edwards.biz.codeManagement;

import com.edwards.domains.SooMst_SysCdStdVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface SooMstSysCdStdDao extends JpaRepository<SooMst_SysCdStdVO, BigDecimal> {
  Page<SooMst_SysCdStdVO> findAll(Pageable pageable);

  List<SooMst_SysCdStdVO> findAll(Specification<SooMst_SysCdStdVO> specification, Sort sort);
}