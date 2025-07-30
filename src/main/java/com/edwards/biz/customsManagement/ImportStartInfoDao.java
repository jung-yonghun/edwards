package com.edwards.biz.customsManagement;

import com.edwards.domains.ImpoStartInfoVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ImportStartInfoDao extends JpaRepository<ImpoStartInfoVO, BigDecimal> {
  Page<ImpoStartInfoVO> findAll(Pageable pageable);

  List<ImpoStartInfoVO> findAll(Specification<ImpoStartInfoVO> specs);

  List<ImpoStartInfoVO> findByImsTaxpayerKeyIn(List<BigDecimal> imsTaxpayerKey);
}