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
@Table(name = "TBR_Delivery_Car", schema = "dbo", catalog = "soo")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
public class DeliveryCarVO {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "deliveryCarKey")
  private BigDecimal deliveryCarKey;

  @Column(name = "deliveryCoKey")
  @NotNull
  private BigDecimal deliveryCoKey;

  @Column(name = "deliveryCarName")
  @NotEmpty
  @Size(max = 50)
  private String deliveryCarName;

  @Column(name = "deliveryCarPhone")
  @NotEmpty
  @Size(max = 50)
  private String deliveryCarPhone;

  @Column(name = "deliveryCarNum")
  @NotEmpty
  @Size(max = 50)
  private String deliveryCarNum;

  @Column(name = "deliveryCarEtc")
  @Size(max = 100)
  private String deliveryCarEtc;

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
