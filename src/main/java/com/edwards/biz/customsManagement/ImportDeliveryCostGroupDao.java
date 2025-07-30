package com.edwards.biz.customsManagement;

import com.edwards.domains.DeliveryCostGroupVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ImportDeliveryCostGroupDao extends JpaRepository<DeliveryCostGroupVO, BigDecimal> {
  Page<DeliveryCostGroupVO> findAll(Specification<DeliveryCostGroupVO> specification, Pageable pageable);

  DeliveryCostGroupVO findByDeliveryCostGroupSubKeyAndUseYn(BigDecimal deliveryCostGroupSubKey, String useYn);

  @Query(value = "SELECT a.*\n" +
		  "FROM [soo].[dbo].[TBR_Delivery_CostGroup] a\n" +
		  "WHERE a.deliveryCostGroupMainKey IN (\n" +
		  "SELECT deliveryCostGroupMainKey\n" +
		  "FROM [soo].[dbo].[TBR_Delivery_CostGroup] \n" +
		  "WHERE deliveryCostGroupSubKey = :deliveryCostGroupSubKey \n" +
		  ") ", nativeQuery = true)
  List<DeliveryCostGroupVO> getDeliveryCostGroupList2(@Param("deliveryCostGroupSubKey") BigDecimal deliveryCostGroupSubKey);
}