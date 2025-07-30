package com.edwards.biz.systemManagement;

import com.edwards.domains.CpsSysMenuVO;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface CpsSysMenuDao extends JpaRepository<CpsSysMenuVO, BigDecimal> {
  List<CpsSysMenuVO> findAll(Specification<CpsSysMenuVO> specification, Pageable pageable);
}