package com.edwards.domains;

import com.edwards.commons.CmmnUtils;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.Size;

import java.math.BigDecimal;

@Entity
@Table(name = "TBR_CD_HS_Mst", schema = "dbo", catalog = "soo_MST")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
public class SooMst_CdHsMstVO {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "KEY_TBR_CD_HS_Mst")
  private BigDecimal keyTbrCdHsMst;

  @Column(name = "hs1")
  @Size(max = 4)
  private String hs1;

  @Column(name = "hs2")
  @Size(max = 2)
  private String hs2;

  @Column(name = "hs3")
  @Size(max = 2)
  private String hs3;

  @Column(name = "hs4")
  @Size(max = 2)
  private String hs4;

  @Column(name = "hs_NmHan")
  @Size(max = 5000)
  private String hsNmHan;

  @Column(name = "hs_NmEng")
  @Size(max = 5000)
  private String hsNmEng;

  @Column(name = "hsQtyUnit")
  @Size(max = 2)
  private String hsQtyUnit;

  @Column(name = "hsWeiUnit")
  @Size(max = 2)
  private String hsWeiUnit;

  @Column(name = "HsSimpleRate", columnDefinition = "float")
  private Double hsSimpleRate; // float

  @Column(name = "OriYn")
  @Size(max = 1)
  private String oriYn;

  @Column(name = "useYn")
  @NotEmpty
  @Size(min = 1, max = 1)
  private String useYn;

  @Column(name = "addUserId", updatable = false)
  @NotEmpty
  @Size(max = 10)
  private String addUserId;

  @Column(name = "addUserTeam", updatable = false)
  @NotEmpty
  @Size(max = 10)
  private String addUserTeam;

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

  @Column(name = "editUserTeam")
  @Size(max = 10)
  private String editUserTeam;

  @Column(name = "editUserNm")
  @Size(max = 50)
  private String editUserNm;

  @Column(name = "editDtm")
  @Size(min = 14, max = 14)
  private String editDtm;

  @PreUpdate
  public void preUpdate() {
	this.editDtm = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
  }

  @PrePersist
  public void prePersist() {
	this.editUserId = null;
	this.editUserTeam = null;
	this.editUserNm = null;
	this.editDtm = null;
  }
}
