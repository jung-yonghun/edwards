package com.edwards.biz.codeManagement;

import com.edwards.domains.SooMst_CdBasFrerateVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;


@Repository
public interface SooMstCdBasFreRateDao extends JpaRepository<SooMst_CdBasFrerateVO, BigDecimal> {
  Page<SooMst_CdBasFrerateVO> findAll(Pageable pageable);

  List<SooMst_CdBasFrerateVO> findAll(Specification<SooMst_CdBasFrerateVO> specification, Sort sort);
}