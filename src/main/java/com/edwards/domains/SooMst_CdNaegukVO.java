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
@Table(name = "TBR_CD_Naeguk", schema = "dbo", catalog = "soo_MST"
        , uniqueConstraints = @UniqueConstraint(columnNames = {"NEGUK_CODE", "NEGUK_GBN_CODE"}))
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Data
public class SooMst_CdNaegukVO {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "KEY_CD_Naeguk")
  private BigDecimal keyCdNaeguk;

  @Column(name = "NEGUK_CODE", updatable = false)
  @NotEmpty
  @Size(min = 6, max = 6)
  private String negukCode;

  @Column(name = "NEGUK_GBN_CODE", updatable = false)
  @NotEmpty
  @Size(min = 1, max = 1)
  private String negukGbnCode;

  @Column(name = "NEGUK_HANGMOK")
  @Size(max = 48)
  private String negukHangmok;

  @Column(name = "NEGUK_JONGGA")
  private Double negukJongga;

  @Column(name = "NEGUK_GIJUN")
  private Double negukGijun;

  @Column(name = "NEGUK_JONGRYANG")
  private Double negukJongryang;

  @Column(name = "NEGUK_NONG")
  @Size(max = 1)
  private String negukNong;

  @Column(name = "NEGUK_EDU")
  @Size(max = 1)
  private String negukEdu;

  @Column(name = "FROMDT")
  @Size(min = 8, max = 8)
  private String fromdt;

  @Column(name = "ENDDT")
  @Size(min = 8, max = 8)
  private String enddt;

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
