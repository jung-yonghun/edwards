package com.edwards.biz.codeManagement;

import com.edwards.domains.SooMst_CdBasFtamstVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface SooMstCdBasFtaMstDao extends JpaRepository<SooMst_CdBasFtamstVO, BigDecimal> {
  Page<SooMst_CdBasFtamstVO> findAll(Pageable pageable);

  List<SooMst_CdBasFtamstVO> findAll(Specification<SooMst_CdBasFtamstVO> specification, Sort sort);
}