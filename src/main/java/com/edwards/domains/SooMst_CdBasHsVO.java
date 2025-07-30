package com.edwards.domains;

import com.edwards.commons.CmmnUtils;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.Size;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "TBR_CD_BAS_HS", schema = "dbo", catalog = "soo_MST")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Data
public class SooMst_CdBasHsVO {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "KEY_CD_BAS_HS")
  private BigDecimal keyCdBasHs;

  @Column(name = "Hsbuho_code")
  @NotEmpty
  @Size(max = 10)
  private String hsbuhoCode;

  @Column(name = "Hsbuho_gwanse_gbn")
  @NotEmpty
  @Size(max = 6)
  private String hsbuhoGwanseGbn;

  @Column(name = "Hsbuho_seyul")
  private Double hsbuhoSeyul;

  @Column(name = "Hsbuho_amt")
  private Double hsbuhoAmt;

  @Column(name = "Hsbuho_gijun")
  private Double hsbuhoGijun;

  @Column(name = "Hsbuho_jung")
  @Size(max = 2)
  private String hsbuhoJung;

  @Column(name = "Hsbuho_su")
  @Size(max = 2)
  private String hsbuhoSu;

  @Column(name = "Hsbuho_myun_bun_gbn")
  private Double hsbuhoMyunBunGbn;

  @Column(name = "Hsbuho_myun_bun_buho")
  @Size(max = 12)
  private String hsbuhoMyunBunBuho;

  @Column(name = "Hsbuho_gyeng_yul")
  private Double hsbuhoGyengYul;

  @Column(name = "Hsbuho_naekuk_gbn")
  @Size(max = 2)
  private String hsbuhoNaekukGbn;

  @Column(name = "Hsbuho_naekuk_jong")
  @Size(max = 6)
  private String hsbuhoNaekukJong;

  @Column(name = "Hsbuho_naekuk_yul")
  private Double hsbuhoNaekukYul;

  @Column(name = "Hsbuho_naekuk_myun")
  @Size(max = 7)
  private String hsbuhoNaekukMyun;

  @Column(name = "Hsbuho_edu_yn")
  @Size(max = 1)
  private String hsbuhoEduYn;

  @Column(name = "Hsbuho_vat_yn")
  @Size(max = 1)
  private String hsbuhoVatYn;

  @Column(name = "Hsbuho_vat_code")
  @Size(max = 7)
  private String hsbuhoVatCode;

  @Column(name = "Hsbuho_vat_gam_yul")
  private Double hsbuhoVatGamYul;

  @Column(name = "Hsbuho_nong_gbn")
  @Size(max = 1)
  private String hsbuhoNongGbn;

  @Column(name = "Hsbuho_popum")
  @Size(max = 50)
  private String hsbuhoPopum;

  @Column(name = "Hsbuho_guraepum")
  @Size(max = 50)
  private String hsbuhoGuraepum;

  @Column(name = "Hsbuho_model_code")
  @Size(max = 4)
  private String hsbuhoModelCode;

  @Column(name = "Hsbuho_model")
  @Size(max = 50)
  private String hsbuhoModel;

  @Column(name = "Hsbuho_Add_Gwanse_Gbn")
  @Size(max = 2)
  private String hsbuhoAddGwanseGbn;

  @Column(name = "hsbuho_strategy")
  @Size(max = 1)
  private String hsbuhoStrategy;

  @Column(name = "useYn")
  @NotEmpty
  @Size(min = 1, max = 1)
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