package com.edwards.biz.customsManagement;

import com.edwards.domains.CustomsCostMasterVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface CustomsCostMasterDao extends JpaRepository<CustomsCostMasterVO, BigDecimal> {
  Page<CustomsCostMasterVO> findAll(Pageable pageable);

  Page<CustomsCostMasterVO> findAll(Specification<CustomsCostMasterVO> specification, Pageable pageable);

  List<CustomsCostMasterVO> findAll(Specification<CustomsCostMasterVO> specs, Sort sort);

  CustomsCostMasterVO findTop1ByCostMstKey(BigDecimal costMstKey);
}