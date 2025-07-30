package com.edwards.domains;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.Size;

import java.math.BigDecimal;

@Entity
@Table(name = "CPS_SaveCustomer", schema = "dbo", catalog = "soo")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
public class CpsSaveCustomerVO {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "scKey")
  private BigDecimal scKey;

  @Column(name = "userKey", updatable = false)
  @NotEmpty
  @Size(max = 18)
  private String userKey;

  @Column(name = "defaultDB", updatable = false)
  @NotEmpty
  @Size(max = 50)
  private String defaultDB;

  @Column(name = "userSangho", updatable = false)
  @NotEmpty
  @Size(max = 100)
  private String userSangho;

  @Column(name = "userSaup", updatable = false)
  @NotEmpty
  @Size(max = 10)
  private String userSaup;

  @Column(name = "useYn")
  @NotEmpty
  @Size(min = 1, max = 1)
  private String useYn;

  @Column(name = "addUserKey", updatable = false)
  @NotEmpty
  @Size(max = 18)
  private String addUserKey;

  @Column(name = "addDtm", updatable = false)
  @NotEmpty
  @Size(min = 14, max = 14)
  private String addDtm;
}