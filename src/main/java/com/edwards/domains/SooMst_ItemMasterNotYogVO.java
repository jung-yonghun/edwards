package com.edwards.domains;

import com.edwards.commons.CmmnUtils;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.Size;

import java.math.BigDecimal;

@Entity
@Table(name = "TBR_MST_ItemMaster_NotYog", schema = "dbo", catalog = "soo_MST")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Data
public class SooMst_ItemMasterNotYogVO {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "KEY_MST_ItemMaster_NotYog")
  private BigDecimal keyMstItemMasterNotYog;

  @Column(name = "itemKey")
  private BigDecimal itemKey;

  @Column(name = "mcountNo")
  @NotEmpty
  private String mcountNo;

  @Column(name = "seq")
  @NotEmpty
  private String seq;

  @Column(name = "lawCd")
  private String lawCd;

  @Column(name = "notYogSayuCd")
  private String notYogSayuCd;

  @Column(name = "notYogSayuEtc")
  private String notYogSayuEtc;

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

  /**
   * Pre update.
   */
  @PreUpdate
  public void preUpdate() {
	// 수정일시
	this.editDtm = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
  }

  /**
   * Pre persist.
   */
  @PrePersist
  public void prePersist() {
	// 수정자
	this.editUserId = null;
	this.editUserNm = null;
	this.editDtm = null;
  }
}
