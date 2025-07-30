package com.edwards.biz.codeManagement;

import com.edwards.domains.SooMst_CdBasBuyerVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface SooMstCdBasBuyerDao extends JpaRepository<SooMst_CdBasBuyerVO, BigDecimal> {
  Page<SooMst_CdBasBuyerVO> findAll(Pageable pageable);

  List<SooMst_CdBasBuyerVO> findAll(Specification<SooMst_CdBasBuyerVO> specification, Sort sort);
}