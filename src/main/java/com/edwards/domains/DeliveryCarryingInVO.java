package com.edwards.domains;

import com.edwards.commons.CmmnUtils;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.Size;

import java.math.BigDecimal;

@Entity
@Table(name = "TBR_Delivery_CarryingIn", schema = "dbo", catalog = "soo")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
public class DeliveryCarryingInVO {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "deliveryCarryingInKey")
  private BigDecimal deliveryCarryingInKey;

  @Column(name = "deliveryCarryingInName")
  @NotEmpty
  @Size(max = 200)
  private String deliveryCarryingInName;

  @Column(name = "deliveryCarryingInTaxNum")
  @NotEmpty
  @Size(max = 50)
  private String deliveryCarryingInTaxNum;

  @Column(name = "deliveryCarryingInPhone")
  @Size(max = 50)
  private String deliveryCarryingInPhone;

  @Column(name = "deliveryCarryingInFax")
  @Size(max = 50)
  private String deliveryCarryingInFax;

  @Column(name = "deliveryCarryingInMan")
  @Size(max = 50)
  private String deliveryCarryingInMan;

  @Column(name = "deliveryCarryingInMobile")
  @Size(max = 50)
  private String deliveryCarryingInMobile;

  @Column(name = "deliveryCarryingInEmail")
  @Size(max = 200)
  private String deliveryCarryingInEmail;

  @Column(name = "deliveryCarryingInAddr")
  @NotEmpty
  @Size(max = 200)
  private String deliveryCarryingInAddr;

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
