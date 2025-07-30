package com.edwards.domains;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import java.math.BigDecimal;

@Entity
@Table(name = "CDAF100D", schema = "dbo", catalog = "CPS")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
public class CDAF100DVO {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "CDAFDKey")
	private BigDecimal CDAFDKey;

	@Column(name = "CDAFMKey")
	@NotNull
	private BigDecimal CDAFMKey;

	@Column(name = "Mcd")
	@Size(max = 30)
	private String Mcd;

	@Column(name = "Cd")
	@Size(max = 30)
	private String Cd;

	@Column(name = "CdPrtNm")
	@Size(max = 500)
	private String CdPrtNm;

	@Column(name = "CdAbbHnm")
	@Size(max = 500)
	private String CdAbbHnm;

	@Column(name = "CdAbbEnm")
	@Size(max = 500)
	private String CdAbbEnm;

	@Column(name = "CdHtxt")
	@Size(max = 500)
	private String CdHtxt;

	@Column(name = "CdEtxt")
	@Size(max = 500)
	private String CdEtxt;

	@Column(name = "CdRemark")
	@Size(max = 1000)
	private String CdRemark;

	@Column(name = "CdSort")
	private BigDecimal CdSort;

	@Column(name = "CdStDt")
	@Size(max = 8)
	private String CdStDt;

	@Column(name = "CdEdDt")
	@Size(max = 8)
	private String CdEdDt;

	@Column(name = "CdMapKey1")
	@Size(max = 50)
	private String CdMapKey1;

	@Column(name = "CdMapKey2")
	@Size(max = 50)
	private String CdMapKey2;

	@Column(name = "CdMapKey3")
	@Size(max = 50)
	private String CdMapKey3;

	@Column(name = "CdMapKey4")
	@Size(max = 50)
	private String CdMapKey4;

	@Column(name = "CdMapKey5")
	@Size(max = 50)
	private String CdMapKey5;

	@Column(name = "CdMapInt1")
	private BigDecimal CdMapInt1;

	@Column(name = "CdMapInt2")
	private BigDecimal CdMapInt2;

	@Column(name = "UseYn")
	@Size(min = 1, max = 1)
	private String UseYn;

	@Column(name = "AddUserKey", updatable = false)
	@Size(max = 18)
	private String AddUserKey;

	@Column(name = "AddUserId", updatable = false)
	@Size(max = 100)
	private String AddUserId;

	@Column(name = "AddUserNm", updatable = false)
	@Size(max = 30)
	private String AddUserNm;

	@Column(name = "AddDtm")
	@Size(max = 14)
	private String AddDtm;

	@Column(name = "EditUserKey")
	@Size(max = 18)
	private String EditUserKey;

	@Column(name = "EditUserId")
	@Size(max = 100)
	private String EditUserId;

	@Column(name = "EditUserNm")
	@Size(max = 30)
	private String EditUserNm;

	@Column(name = "EditDtm")
	@Size(max = 14)
	private String EditDtm;
}