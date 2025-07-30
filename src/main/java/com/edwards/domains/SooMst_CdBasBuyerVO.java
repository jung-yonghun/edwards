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
@Table(name = "TBR_CD_BAS_BUYER", schema = "dbo", catalog = "soo_MST")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Data
public class SooMst_CdBasBuyerVO {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "KEY_CD_BAS_BUYER")
  private BigDecimal keyCdBasBuyer;

  @Column(name = "Gonggub_Code")
  @NotEmpty
  @Size(max = 13)
  private String gonggubCode;

  @Column(name = "Gonggub_sangho")
  @Size(max = 60)
  private String gonggubSangho;

  @Column(name = "Gonggub_gita")
  @Size(max = 10)
  private String gonggubGita;

  @Column(name = "gonggub_repname")
  @Size(max = 25)
  private String gonggubRepname;

  @Column(name = "Gonggub_Addr")
  @Size(max = 120)
  private String gonggubAddr;

  @Column(name = "Gonggub_Tel")
  @Size(max = 20)
  private String gonggubTel;

  @Column(name = "Gonggub_Fax")
  @Size(max = 20)
  private String gonggubFax;

  @Column(name = "Gonggub_CntryCd")
  @Size(max = 2)
  private String gonggubCntryCd;

  @Column(name = "Certification_Type")
  @Size(max = 10)
  private String certificationType;

  @Column(name = "Certification_Num")
  @Size(max = 50)
  private String certificationNum;

  @Column(name = "notuse")
  @Size(max = 1)
  private String notuse;

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