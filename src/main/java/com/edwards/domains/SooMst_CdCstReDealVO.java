package com.edwards.domains;

import com.edwards.commons.CmmnUtils;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.Size;

import java.math.BigDecimal;

@Entity
@Table(name = "TBR_CD_CST_Re_Deal", schema = "dbo", catalog = "soo_MST")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Data
public class SooMst_CdCstReDealVO {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "Key_Tb_Re_Deal")
  private BigDecimal keyTbReDeal;

  @Column(name = "key_no")
  private String keyNo;

  @Column(name = "tcano")
  private String tcano;

  @Column(name = "deal_code")
  private String dealCode;

  @Column(name = "deal_sangho")
  private String dealSangho;

  @Column(name = "deal_name")
  private String dealName;

  @Column(name = "deal_saup")
  private String dealSaup;

  @Column(name = "deal_juso")
  private String dealJuso;

  @Column(name = "deal_upte")
  private String dealUpte;

  @Column(name = "deal_jong")
  private String dealJong;

  @Column(name = "deal_tong")
  private String dealTong;

  @Column(name = "deal_tel")
  private String dealTel;

  @Column(name = "deal_fax")
  private String dealFax;

  @Column(name = "deal_jaje_cd")
  private String dealJajeCd;

  @Column(name = "stamp_pt_yn", columnDefinition = "CHAR(1)")
  private String stampPtYn;

  @Column(name = "addr_pt_yn", columnDefinition = "CHAR(1)")
  private String addrPtYn;

  @Column(name = "acc_jungsan_yn", columnDefinition = "CHAR(1)")
  private String accJungsanYn;

  @Column(name = "price_flag", columnDefinition = "CHAR(1)")
  private String priceFlag;

  @Column(name = "price_rate")
  private Double priceRate;
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
