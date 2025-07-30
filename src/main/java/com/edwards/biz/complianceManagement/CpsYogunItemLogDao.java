package com.edwards.biz.complianceManagement;

import com.edwards.domains.CpsYogunItemLogVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface CpsYogunItemLogDao extends JpaRepository<CpsYogunItemLogVO, BigDecimal> {
  Page<CpsYogunItemLogVO> findAll(Specification<CpsYogunItemLogVO> specification, Pageable pageable);

  List<CpsYogunItemLogVO> findAll(Specification<CpsYogunItemLogVO> specification, Sort sort);

  List<CpsYogunItemLogVO> findAll(Specification<CpsYogunItemLogVO> specs);
}