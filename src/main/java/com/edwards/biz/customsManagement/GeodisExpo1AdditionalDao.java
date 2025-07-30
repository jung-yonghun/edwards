package com.edwards.biz.customsManagement;

import com.edwards.domains.NcustomsGeoExpo1AdditionalVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface GeodisExpo1AdditionalDao extends JpaRepository<NcustomsGeoExpo1AdditionalVO, BigDecimal> {
  Page<NcustomsGeoExpo1AdditionalVO> findAll(Pageable pageable);

  List<NcustomsGeoExpo1AdditionalVO> findAll(Specification<NcustomsGeoExpo1AdditionalVO> specification, Sort sort);
}