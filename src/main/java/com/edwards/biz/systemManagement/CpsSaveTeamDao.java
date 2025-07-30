package com.edwards.biz.systemManagement;

import com.edwards.domains.CpsSaveTeamVO;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface CpsSaveTeamDao extends JpaRepository<CpsSaveTeamVO, BigDecimal> {
  List<CpsSaveTeamVO> findAll(Specification<CpsSaveTeamVO> specification, Pageable pageable);

  List<CpsSaveTeamVO> findAll(Specification<CpsSaveTeamVO> specification);
}