package com.edwards.biz.codeManagement;

import com.edwards.domains.SooMst_CdTeukmyunVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface SooMstCdTeukmyunDao extends JpaRepository<SooMst_CdTeukmyunVO, BigDecimal> {
  Page<SooMst_CdTeukmyunVO> findAll(Pageable pageable);

  List<SooMst_CdTeukmyunVO> findAll(Specification<SooMst_CdTeukmyunVO> specification, Sort sort);
}