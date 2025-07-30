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
@Table(name = "CPS_Compliance_Item", schema = "dbo", catalog = "soo")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@DynamicUpdate
@Getter
@Setter
public class CpsComplianceItemVO{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "compItemKey")
	private BigDecimal compItemKey;

	@Column(name = "gubun")
	@Size(max = 20)
	private String gubun;

	@Column(name = "newCheck")
	@Size(max = 1)
	private String newCheck;

	@Column(name = "masterKey")
	@Size(max = 18)
	private String masterKey;

	@Column(name = "mcoName")
	@Size(max = 100)
	private String mcoName;

	@Column(name = "mcoCom")
	@Size(max = 13)
	private String mcoCom;

	@Column(name = "mmodelCode")
	@Size(max = 50)
	private String mmodelCode;

	@Column(name = "mhsCode")
	@Size(max = 20)
	private String mhsCode;

	@Column(name = "mstdGoods")
	@Size(max = 100)
	private String mstdGoods;

	@Column(name = "mmodel1")
	@Size(max = 100)
	private String mmodel1;

	@Column(name = "mqty")
	@Size(max = 20)
	private String mqty;

	@Column(name = "mqtyUt")
	@Size(max = 10)
	private String mqtyUt;

	@Column(name = "munitPrice")
	@Size(max = 20)
	private String munitPrice;

	@Column(name = "price")
	@Size(max = 20)
	private String price;

	@Column(name = "morigin1")
	@Size(max = 10)
	private String morigin1;

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
