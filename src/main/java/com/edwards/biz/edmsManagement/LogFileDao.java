package com.edwards.biz.edmsManagement;

import com.edwards.domains.LogFileVO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

@Repository
public interface LogFileDao extends JpaRepository<LogFileVO, BigDecimal> {
}