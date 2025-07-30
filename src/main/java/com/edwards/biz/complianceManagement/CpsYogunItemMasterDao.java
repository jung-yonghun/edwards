package com.edwards.biz.complianceManagement;

import com.edwards.domains.CpsYogunItemMasterVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface CpsYogunItemMasterDao extends JpaRepository<CpsYogunItemMasterVO, BigDecimal> {
  Page<CpsYogunItemMasterVO> findAll(Specification<CpsYogunItemMasterVO> specification, Pageable pageable);

  List<CpsYogunItemMasterVO> findAll(Specification<CpsYogunItemMasterVO> specification, Sort sort);

  List<CpsYogunItemMasterVO> findAll(Specification<CpsYogunItemMasterVO> specs);

  CpsYogunItemMasterVO findByYogSaupAndJajaeCode(String yogSaup, String jajaeCode);
}