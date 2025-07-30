package com.edwards.biz.codeManagement;

import com.edwards.domains.SooMst_CustomerVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Repository
public interface SooMstCustomerDao extends JpaRepository<SooMst_CustomerVO, BigDecimal> {
  Page<SooMst_CustomerVO> findAll(Pageable pageable);

  /**
   * Find all list.
   *
   * @param specs the specs
   * @return the list
   */
  List<SooMst_CustomerVO> findAll(Specification<SooMst_CustomerVO> specs);

  /**
   * Call sync customer info.(미사용)
   *
   * @param yyyyMMdd  the yyyy m mdd
   * @param addUserId the add user id
   */
  @Query(value = "{ call [soo_MST].[dbo].[USP_ETL_SYNC_Customer] (@yyyymmdd=:yyyyMMdd, @addUserId=:addUserId ) }", nativeQuery = true)
  void callSyncCustomerInfo(@Param("yyyyMMdd") String yyyyMMdd, @Param("addUserId") String addUserId);

  /**
   * Call sync customer individual info.(미사용)
   *
   * @param db        the db
   * @param code      the code
   * @param addUserId the add user id
   */
  @Query(value = "{ call [soo_MST].[dbo].[USP_ETL_SYNC_Customer_개별] (@DB=:db, @CODE=:code, @addUserId=:addUserId ) }", nativeQuery = true)
  void callSyncCustomerIndividualInfo(@Param("db") String db, @Param("code") String code, @Param("addUserId") String addUserId);

  /**
   * Find common customer info for result list.
   *
   * @param userId the user id
   * @param auth   the auth
   * @param argCl  the arg cl
   * @return the list
   */
  @Query(value = "{ call [soo].[dbo].[USP_공통_실적_할당거래처조회] (@IN_USERID=:userId, @IN_AUTH=:auth, @argCL=:argCl ) }", nativeQuery = true)
  List<Map> findCommonCustomerInfoForResult(@Param("userId") String userId, @Param("auth") String auth, @Param("argCl") String argCl);
}