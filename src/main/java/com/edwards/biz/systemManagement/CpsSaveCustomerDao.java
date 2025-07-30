package com.edwards.biz.systemManagement;

import com.edwards.domains.CpsSaveCustomerVO;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface CpsSaveCustomerDao extends JpaRepository<CpsSaveCustomerVO, BigDecimal> {
  List<CpsSaveCustomerVO> findAll(Specification<CpsSaveCustomerVO> specification, Pageable pageable);

  List<CpsSaveCustomerVO> findAll(Specification<CpsSaveCustomerVO> specification);
}