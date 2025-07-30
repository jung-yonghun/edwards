package com.edwards.biz.customsManagement;

import com.edwards.domains.CustomsCostDetailVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface CustomsCostDetailDao extends JpaRepository<CustomsCostDetailVO, BigDecimal> {
  Page<CustomsCostDetailVO> findAll(Specification<CustomsCostDetailVO> specification, Pageable pageable);

  List<CustomsCostDetailVO> findAll(Specification<CustomsCostDetailVO> specs, Sort sort);
}