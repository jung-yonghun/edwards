package com.edwards.biz.codeManagement;

import com.edwards.domains.SooMst_CdHsStdMstVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface SooMstCdHsStdMstDao extends JpaRepository<SooMst_CdHsStdMstVO, BigDecimal> {
  Page<SooMst_CdHsStdMstVO> findAll(Pageable pageable);

  List<SooMst_CdHsStdMstVO> findAll(Specification<SooMst_CdHsStdMstVO> specification, Sort sort);
}