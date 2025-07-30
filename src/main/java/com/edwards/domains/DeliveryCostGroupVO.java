package com.edwards.domains;

import com.edwards.commons.CmmnUtils;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import java.math.BigDecimal;

@Entity
@Table(name = "TBR_Delivery_CostGroup", schema = "dbo", catalog = "soo"
		, uniqueConstraints = @UniqueConstraint(columnNames = {"deliveryCostGroupSubKey", "useYn"}))
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
public class DeliveryCostGroupVO {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "deliveryCostGroupKey")
  private BigDecimal deliveryCostGroupKey;

  @Column(name = "deliveryCostGroupMainKey", updatable = false)
  @NotNull
  private BigDecimal deliveryCostGroupMainKey;

  @Column(name = "deliveryCostGroupSubKey", updatable = false)
  @NotNull
  private BigDecimal deliveryCostGroupSubKey;

  @Column(name = "deliveryCostGroupNote")
  @Size(max = 500)
  private String deliveryCostGroupNote;

  @Column(name = "useYn")
  @NotEmpty
  @Size(min = 1, max = 1)
  private String useYn;

  @Column(name = "addUserKey", updatable = false)
  @NotNull
  private BigDecimal addUserKey;

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

  @Column(name = "editUserKey")
  private BigDecimal editUserKey;

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
	this.editUserKey = null;
	this.editUserId = null;
	this.editUserNm = null;
	this.editDtm = null;
  }
}
