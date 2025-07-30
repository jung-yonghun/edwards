package com.edwards.biz.customsManagement;

import com.edwards.domains.CpsStartInfoVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface CpsStartInfoDao extends JpaRepository<CpsStartInfoVO, BigDecimal> {
  Page<CpsStartInfoVO> findAll(Pageable pageable);

  List<CpsStartInfoVO> findAll(Specification<CpsStartInfoVO> specs);
}