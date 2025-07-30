package com.edwards.biz.itemMng;

import com.edwards.domains.ResultEtlImportUnitPriceVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ResultImportUnitPriceDao extends JpaRepository<ResultEtlImportUnitPriceVO, BigDecimal> {
  Page<ResultEtlImportUnitPriceVO> findAll(Pageable pageable);

  List<ResultEtlImportUnitPriceVO> findAll(Specification<ResultEtlImportUnitPriceVO> specification, Sort sort);

  Page<ResultEtlImportUnitPriceVO> findAll(Specification<ResultEtlImportUnitPriceVO> specification, Pageable pageable);
}