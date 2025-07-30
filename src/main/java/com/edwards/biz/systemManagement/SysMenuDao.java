package com.edwards.biz.systemManagement;

import com.edwards.domains.SysMenuVO;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface SysMenuDao extends JpaRepository<SysMenuVO, BigDecimal> {
  List<SysMenuVO> findAll(Specification<SysMenuVO> specification, Pageable pageable);
}