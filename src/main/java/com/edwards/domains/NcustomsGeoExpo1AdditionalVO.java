package com.edwards.domains;

import com.edwards.commons.CmmnUtils;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.Size;

import java.math.BigDecimal;

@Entity
@Table(name = "Expo1_Additional", schema = "kcba", catalog = "ncustoms_sel_040"
		, uniqueConstraints = @UniqueConstraint(columnNames = {"Expo_Db", "Expo_Key"}))
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Data
public class NcustomsGeoExpo1AdditionalVO {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "Expo1_Additional_Key")
  private BigDecimal expo1AdditionalKey;

  @Column(name = "Expo_Db")
  @NotEmpty
  @Size(max = 50)
  private String expoDb;

  @Column(name = "Expo_Key")
  @NotEmpty
  @Size(max = 11)
  private String expoKey;

  @Column(name = "additionalInfo1")
  @Size(max = 100)
  private String additionalInfo1;

  @Column(name = "additionalInfo2")
  @Size(max = 50)
  private String additionalInfo2;

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
	this.editDtm = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
  }

  @PrePersist
  public void prePersist() {
	this.editUserId = null;
	this.editUserNm = null;
	this.editDtm = null;
  }
}
