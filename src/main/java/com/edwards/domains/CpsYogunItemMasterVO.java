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
@Table(name = "CPS_Yogun_ItemMaster", schema = "dbo", catalog = "soo")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@DynamicUpdate
@Getter
@Setter
public class CpsYogunItemMasterVO{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "yogItemKey")
	private BigDecimal yogItemKey;

	@Column(name = "yogCom")
	@Size(max = 100)
	private String yogCom;

	@Column(name = "yogSaup")
	@Size(max = 10)
	private String yogSaup;

	@Column(name = "mmodelCode")
	@Size(max = 50)
	private String mmodelCode;

	@Column(name = "jajaeCode")
	@Size(max = 50)
	private String jajaeCode;

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
