package com.edwards.domains;

import com.edwards.commons.CmmnUtils;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.Size;

import java.math.BigDecimal;

@Entity
@Table(name = "CPS_Compliance_Master", schema = "dbo", catalog = "soo")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@DynamicUpdate
@Getter
@Setter
public class CpsComplianceMasterVO{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "compKey")
	private BigDecimal compKey;

	@Column(name = "comName")
	@Size(max = 100)
	private String comName;

	@Column(name = "comNum")
	@Size(max = 20)
	private String comNum;

	@Column(name = "status")
	@Size(max = 10)
	private String status;

	@Column(name = "reason")
	@Size(max = 255)
	private String reason;

	@Column(name = "lawName")
	@Size(max = 255)
	private String lawName;

	@Column(name = "productName")
	@Size(max = 255)
	private String productName;

	@Column(name = "docuName")
	@Size(max = 255)
	private String docuName;

	@Column(name = "compDt")
	@Size(max = 8)
	private String compDt;

	@Column(name = "validity")
	@Size(max = 10)
	private String validity;

	@Column(name = "compNum")
	@Size(max = 50)
	private String compNum;

	@Column(name = "compUser")
	@Size(max = 10)
	private String compUser;

	@Column(name = "productCountry")
	@Size(max = 100)
	private String productCountry;

	@Column(name = "productCom")
	@Size(max = 255)
	private String productCom;

	@Column(name = "note")
	@Size(max = 255)
	private String note;

	@Column(name = "productInfo", columnDefinition = "TEXT")
	private String productInfo = "";

	@Column(name = "useYn")
	@NotEmpty
	@Size(max = 1)
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
