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
@Table(name = "CPS_Compliance_Apply", schema = "dbo", catalog = "soo")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@DynamicUpdate
@Getter
@Setter
public class CpsComplianceApplyVO{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "applyKey")
	private BigDecimal applyKey;

	@Column(name = "gubun")
	@Size(max = 20)
	private String gubun;

	@Column(name = "comName")
	@Size(max = 100)
	private String comName;

	@Column(name = "comNum")
	@Size(max = 20)
	private String comNum;

	@Column(name = "comCeo")
	@Size(max = 50)
	private String comCeo;

	@Column(name = "comDamdang")
	@Size(max = 50)
	private String comDamdang;

	@Column(name = "comPhone")
	@Size(max = 20)
	private String comPhone;

	@Column(name = "status")
	@Size(max = 10)
	private String status;

	@Column(name = "reason")
	@Size(max = 255)
	private String reason;

	@Column(name = "docuName")
	@Size(max = 255)
	private String docuName;

	@Column(name = "usage")
	@Size(max = 255)
	private String usage;

	@Column(name = "relationDocNo1")
	@Size(max = 255)
	private String relationDocNo1;

	@Column(name = "relationDocNo2")
	@Size(max = 255)
	private String relationDocNo2;

	@Column(name = "productCountry")
	@Size(max = 100)
	private String productCountry;

	@Column(name = "productCom")
	@Size(max = 255)
	private String productCom;

	@Column(name = "applyDt")
	@Size(max = 8)
	private String applyDt;

	@Column(name = "confirmDt")
	@Size(max = 8)
	private String confirmDt;

	@Column(name = "confirmNum")
	@Size(max = 50)
	private String confirmNum;

	@Column(name = "sendCom")
	@Size(max = 100)
	private String sendCom;

	@Column(name = "sendDamdang")
	@Size(max = 100)
	private String sendDamdang;

	@Column(name = "sendPhone")
	@Size(max = 100)
	private String sendPhone;

	@Column(name = "note")
	@Size(max = 255)
	private String note;

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
