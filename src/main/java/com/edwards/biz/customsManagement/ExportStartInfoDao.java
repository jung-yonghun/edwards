package com.edwards.biz.customsManagement;

import com.edwards.domains.ExpoStartInfoVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ExportStartInfoDao extends JpaRepository<ExpoStartInfoVO, BigDecimal> {
  Page<ExpoStartInfoVO> findAll(Pageable pageable);

  List<ExpoStartInfoVO> findAll(Specification<ExpoStartInfoVO> specs);

  List<ExpoStartInfoVO> findByImsTaxpayerKeyIn(List<BigDecimal> imsTaxpayerKey);
}