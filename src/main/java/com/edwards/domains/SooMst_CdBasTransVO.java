package com.edwards.domains;

import com.edwards.commons.CmmnUtils;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.Size;

import java.math.BigDecimal;

@Entity
@Table(name = "TBR_CD_BAS_Trans", schema = "dbo", catalog = "soo_MST")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Data
public class SooMst_CdBasTransVO {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "key_Bas_Trans")
  private BigDecimal keyBasTrans;

  @Column(name = "cd_key")
  private String cdKey;

  @Column(name = "tcano")
  private String tcano;

  @Column(name = "deal_cd")
  private String dealCd;

  @Column(name = "deal_name")
  private String dealName;

  @Column(name = "deal_saup")
  private String dealSaup;

  @Column(name = "trans_gbn")
  private String transGbn;

  @Column(name = "trans_nm_h")
  private String transNmH;

  @Column(name = "trans_nm_e")
  private String transNmE;

  @Column(name = "trans_cd")
  private String transCd;

  @Column(name = "trans_buho")
  private String transBuho;

  @Column(name = "tca_buyer_nm")
  private String tcaBuyerNm;

  @Column(name = "tca_buyer_cd")
  private String tcaBuyerCd;

  @Column(name = "useYn")
  @NotEmpty
  @Size(max = 1)
  private String useYn;

  @Column(name = "addUserId", updatable = false)
  @NotEmpty
  @Size(max = 10)
  private String addUserId;

  @Column(name = "addUserNm", updatable = false)
  @NotEmpty
  @Size(max = 50)
  private String addUserNm;

  @Column(name = "addDtm", updatable = false)
  @NotEmpty
  @Size(min = 14, max = 14)
  private String addDtm;

  @Column(name = "editUserId")
  @Size(max = 10)
  private String editUserId;

  @Column(name = "editUserNm")
  @Size(max = 50)
  private String editUserNm;

  @Column(name = "editDtm")
  @Size(min = 14, max = 14)
  private String editDtm;

  @PreUpdate
  public void preUpdate() {
	// 수정일시
	this.editDtm = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
  }

  @PrePersist
  public void prePersist() {
	// 수정자
	this.editUserId = null;
	this.editUserNm = null;
	this.editDtm = null;
  }
}
