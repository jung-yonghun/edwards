package com.edwards.biz.codeManagement;

import com.edwards.domains.CommonDataVO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface CmmnDataInfoDao extends JpaRepository<CommonDataVO, String> {
  Page<CommonDataVO> findAll(Pageable pageable);

  /**
   * Find common assign info by map list.
   *
   * @param userId the user id
   * @param auth   the auth
   * @param argCl  the arg cl
   * @return the list
   */
  @Query(value = "{ call [soo].[dbo].[USP_공통_할당거래처조회] (@IN_USERID=:userId, @IN_AUTH=:auth, @argCL=:argCl ) }", nativeQuery = true)
  List<Map> findCommonAssignInfoByMap(@Param("userId") String userId, @Param("auth") String auth, @Param("argCl") String argCl);

  /**
   * Find common assign info for spec list.
   *
   * @param userId the user id
   * @param auth   the auth
   * @param argCl  the arg cl
   * @return the list
   */
  @Query(value = "{ call [soo].[dbo].[USP_공통_할당거래처조회] (@IN_USERID=:userId, @IN_AUTH=:auth, @argCL=:argCl ) }", nativeQuery = true)
  List<String> findCommonAssignInfoForSpec(@Param("userId") String userId, @Param("auth") String auth, @Param("argCl") String argCl);

  /**
   * Find common assign info list.
   *
   * @param userId the user id
   * @param auth   the auth
   * @param argCl  the arg cl
   * @return the list
   */
  @Query(value = "{ call [soo].[dbo].[USP_공통_할당거래처조회] (@IN_USERID=:userId, @IN_AUTH=:auth, @argCL=:argCl ) }", nativeQuery = true)
  List<CommonDataVO> findCommonAssignInfo(@Param("userId") String userId, @Param("auth") String auth, @Param("argCl") String argCl);

  /**
   * Find common tax num for spec list.
   *
   * @param userId the user id
   * @param auth   the auth
   * @param argCl  the arg cl
   * @return the list
   */
  @Query(value = "{ call [soo].[dbo].[USP_공통_할당사업자번호조회] (@IN_USERID=:userId, @IN_AUTH=:auth, @argCL=:argCl ) }", nativeQuery = true)
  List<Map> findCommonTaxNumForSpec(@Param("userId") String userId, @Param("auth") String auth, @Param("argCl") String argCl);

  /**
   * Find common tax num for item master list.
   *
   * @param userId          the user id
   * @param auth            the auth
   * @param argCl           the arg cl
   * @param argCustomerName the arg customer name
   * @return the list
   */
  @Query(value = "{ call [soo].[dbo].[USP_공통_자재용_할당사업자번호조회] (@IN_USERID=:userId, @IN_AUTH=:auth, @argCL=:argCl, @argCustomerName=:argCustomerName ) }", nativeQuery = true)
  List<Map> findCommonTaxNumForItemMaster(@Param("userId") String userId, @Param("auth") String auth, @Param("argCl") String argCl, @Param("argCustomerName") String argCustomerName);
}