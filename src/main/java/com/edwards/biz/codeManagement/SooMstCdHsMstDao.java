package com.edwards.biz.codeManagement;

import com.edwards.domains.SooMst_CdHsMstVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

@Repository
public interface SooMstCdHsMstDao extends JpaRepository<SooMst_CdHsMstVO, BigDecimal> {
  Page<SooMst_CdHsMstVO> findAll(Specification<SooMst_CdHsMstVO> specification, Pageable pageable);
}