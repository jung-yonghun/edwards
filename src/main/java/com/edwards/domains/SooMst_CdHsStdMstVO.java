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
@Table(name = "TBR_CD_HSSTDMST", schema = "dbo", catalog = "soo_MST"
		, uniqueConstraints = @UniqueConstraint(columnNames = {"HS", "HSCD"}))
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Data
public class SooMst_CdHsStdMstVO {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "KEY_CD_HSSTDMST")
  private BigDecimal keyCdHsstdmst;

  @Column(name = "HS", updatable = false)
  @NotEmpty
  @Size(min = 10, max = 10)
  private String hs;

  @Column(name = "HSCD", updatable = false)
  @NotEmpty
  @Size(min = 2, max = 2)
  private String hscd;

  @Column(name = "HSLEVEL")
  @NotEmpty
  @Size(max = 2)
  private String hslevel;

  @Column(name = "STDNM")
  @Size(max = 100)
  private String stdnm;

  @Column(name = "STDNMHAN")
  @Size(max = 100)
  private String stdnmhan;

  @Column(name = "STDNMENG")
  @Size(max = 100)
  private String stdnmeng;

  @Column(name = "FTAYN")
  @Size(max = 1)
  private String ftayn;

  @Column(name = "HSCHK")
  @Size(max = 50)
  private String hschk;

  @Column(name = "STDAY")
  @Size(min = 8, max = 8)
  private String stday;

  @Column(name = "ENDDAY")
  @Size(min = 8, max = 8)
  private String endday;

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
