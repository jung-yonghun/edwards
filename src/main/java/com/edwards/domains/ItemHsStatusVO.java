package com.edwards.domains;

import com.edwards.commons.CmmnUtils;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import java.math.BigDecimal;

@Entity
@Table(name = "MAAD100D", schema = "dbo", catalog = "CPS"
		, uniqueConstraints = @UniqueConstraint(columnNames = {"MAAD100MKey", "hsStatusStat"}))
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
public class ItemHsStatusVO extends ItemHsAdditionalVO {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "MAAD100DKey")
  private BigDecimal mAAD100DKey;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "MAAD100MKey", updatable = false)
  @JsonBackReference
  @NotNull
  private ItemHsMasterVO MAAD100MKey;

  @Column(name = "hsRegNum")
  @NotEmpty
  @Size(max = 30)
  private String hsRegNum;

  @Column(name = "hsStatusStat", updatable = false)
  @Size(max = 5)
  private String hsStatusStat;

  @Column(name = "hsStatusSubject")
  @NotEmpty
  @Size(max = 500)
  private String hsStatusSubject;

  @Column(name = "HsMemo", columnDefinition = "TEXT")
  private String HsMemo;

  @Column(name = "UseYN")
  @NotEmpty
  @Size(max = 1)
  private String UseYN;

  @Column(name = "AddUserKey", updatable = false)
  private BigDecimal AddUserKey;

  @Column(name = "adduserNm", updatable = false)
  @Size(max = 30)
  private String adduserNm;

  @Column(name = "addDtm", updatable = false)
  @Size(min = 14, max = 14)
  private String addDtm;

  @Column(name = "EditUserKey")
  private BigDecimal EditUserKey;

  @Column(name = "editUserNm")
  @Size(max = 30)
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
	this.EditUserKey = null;
	this.editUserNm = null;
	this.editDtm = null;
  }
}
