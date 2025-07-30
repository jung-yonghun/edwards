package com.edwards.biz.customsManagement;

import com.edwards.domains.DeliveryCostVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ImportDeliveryCostDao extends JpaRepository<DeliveryCostVO, BigDecimal> {
  Page<DeliveryCostVO> findAll(Specification<DeliveryCostVO> specification, Pageable pageable);

  List<DeliveryCostVO> findAll(Specification<DeliveryCostVO> specs, Sort sort);
}