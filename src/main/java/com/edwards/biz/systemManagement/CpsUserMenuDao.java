package com.edwards.biz.systemManagement;

import com.edwards.domains.CpsUserMenuVO;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface CpsUserMenuDao extends JpaRepository<CpsUserMenuVO, BigDecimal> {
  List<CpsUserMenuVO> findAll(Specification<CpsUserMenuVO> specification, Pageable pageable);

  List<CpsUserMenuVO> findAll(Specification<CpsUserMenuVO> specification);
}