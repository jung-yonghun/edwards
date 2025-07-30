package com.edwards.biz.itemMng;

import com.edwards.domains.SooMst_ItemMasterVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ItemMasterDao extends JpaRepository<SooMst_ItemMasterVO, BigDecimal> {
  Page<SooMst_ItemMasterVO> findAll(Pageable pageable);

  /**
   * Find all list.
   *
   * @param specification the specification
   * @param sort          the sort
   * @return the list
   */
  List<SooMst_ItemMasterVO> findAll(Specification<SooMst_ItemMasterVO> specification, Sort sort);

  /**
   * Find all page.
   *
   * @param specification the specification
   * @param pageable      the pageable
   * @return the page
   */
  Page<SooMst_ItemMasterVO> findAll(Specification<SooMst_ItemMasterVO> specification, Pageable pageable);

  /**
   * Find numbering mcount no string.
   *
   * @param yyMMdd the yy m mdd
   * @return the string
   */
  @Query(value = "SELECT 'WEB' + CAST(:yyMMdd AS VARCHAR) + RIGHT('000000' + CAST(RIGHT(ISNULL(MAX(Mcount_no), 0), 6) + 1 AS VARCHAR), 6) AS 'mcountNo'\n" +
		  "FROM [soo_MST].[dbo].[TBR_MST_ItemMaster] WITH (NOLOCK) \n" +
		  "WHERE Mcount_no LIKE 'WEB' + :yyMMdd + '%'", nativeQuery = true)
  String findNumberingMcountNo(@Param("yyMMdd") String yyMMdd);

  @Query(value = "SELECT RIGHT('0000' + CAST(RIGHT(ISNULL(MAX(im3_seq), 0), 4) + 1 AS VARCHAR), 4) AS 'im3seq'\n" +
		  "FROM rms.dbo.recv_impo3 WITH (NOLOCK) \n" +
		  "WHERE key_no = '' + :keyno + ''", nativeQuery = true)
  String findNumberingIm3Seq(@Param("keyno") String keyno);

  @Query(value = "SELECT RIGHT('000' + CAST(RIGHT(ISNULL(MAX(Imlan_jechl_lan), 0), 3) + 1 AS VARCHAR), 3) AS 'jechlLan'\n" +
		  "FROM rms.dbo.recv_impo2 WITH (NOLOCK) \n" +
		  "WHERE key_no = '' + :keyno + ''", nativeQuery = true)
  String findNumberingLan(@Param("keyno") String keyno);

  @Query(value = "SELECT 'W' + CAST(:yyMMdd AS VARCHAR) + RIGHT('0000' + CAST(RIGHT(ISNULL(MAX(Impo_key), 0), 4) + 1 AS VARCHAR), 4) AS 'Impo_key'\n" +
		  "FROM ncustoms.kcba.impo1 WITH (NOLOCK) \n" +
		  "WHERE Impo_key LIKE 'W' + :yyMMdd + '%'", nativeQuery = true)
  String findNumberingImpoKey(@Param("yyMMdd") String yyMMdd);
}