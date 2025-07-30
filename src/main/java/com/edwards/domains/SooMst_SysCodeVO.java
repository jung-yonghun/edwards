package com.edwards.domains;

import com.edwards.commons.CmmnUtils;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import java.math.BigDecimal;

@Entity
@Table(name = "TBR_SYS_CODE", schema = "dbo", catalog = "soo_MST"
        , uniqueConstraints = @UniqueConstraint(columnNames = {"MCD", "CD"}))
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Data
public class SooMst_SysCodeVO {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "KEY_SYS_CODE")
  private BigDecimal keySysCode;

  @Column(name = "MCD")
  @NotEmpty
  @Size(max = 30)
  private String mcd;

  @Column(name = "MCD_NM")
  @Size(max = 300)
  private String mcdNm;

  @Column(name = "CD")
  @NotEmpty
  @Size(max = 30)
  private String cd;

  @Column(name = "CD_DESC")
  @Size(max = 500)
  private String cdDesc;

  @Column(name = "CD_ABB")
  @Size(max = 50)
  private String cdAbb;

  @Column(name = "CD_DESC_ENG")
  @Size(max = 500)
  private String cdDescEng;

  @Column(name = "CD_ABB_ENG")
  @Size(max = 100)
  private String cdAbbEng;

  @Column(name = "CD_SORT")
  @NotNull
  private Integer cdSort;

  @Column(name = "CD_REMARK")
  @Size(max = 500)
  private String cdRemark;

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