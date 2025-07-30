package com.edwards.biz.logManagement;

import com.edwards.domains.CpsExcelLogAccessVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

@Repository
public interface ExcelLogAccessDao extends JpaRepository<CpsExcelLogAccessVO, BigDecimal> {
  Page<CpsExcelLogAccessVO> findAll(Specification<CpsExcelLogAccessVO> specification, Pageable pageable);
}