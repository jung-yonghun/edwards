package com.edwards.biz.edmsManagement;

import com.edwards.domains.FtpLogVO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

@Repository
public interface FtpLogDao extends JpaRepository<FtpLogVO, BigDecimal> {
}