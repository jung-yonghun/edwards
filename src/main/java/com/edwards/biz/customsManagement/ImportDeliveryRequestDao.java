package com.edwards.biz.customsManagement;

import com.edwards.domains.DeliveryRequestVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ImportDeliveryRequestDao extends JpaRepository<DeliveryRequestVO, BigDecimal>{
	Page<DeliveryRequestVO> findAll(Pageable pageable);

	List<DeliveryRequestVO> findAll(Specification<DeliveryRequestVO> specs, Sort sort);

	List<DeliveryRequestVO> findByAssignManStartingWithAndUseYn(String assignMan, String useYn);
}