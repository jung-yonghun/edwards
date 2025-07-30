package com.edwards.domains;

import java.math.BigDecimal;

import com.edwards.commons.CmmnUtils;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;

@Entity
@Table(name = "CPS_CdMaster", schema = "dbo", catalog = "soo")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter

public class CpsCdMasterVO {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "cdKey")
	private BigDecimal cdKey;

	@Column(name = "mcode")
	@NotEmpty
	private String mcode;

	@Column(name = "code")
	@NotEmpty
	private String code;

	@Column(name = "name")
	@NotEmpty
	private String name;

	@Column(name = "engName")
	private String engName;

	@Column(name = "sortOrder")
	private String sortOrder;

	@Column(name = "useYn")
	@NotEmpty
	private String useYn;

	@Column(name = "addUserKey")
	@NotEmpty
	private String addUserKey;

	@Column(name = "addDtm")
	@NotEmpty
	private String addDtm;

	@Column(name = "editUserKey")
	@NotEmpty
	private String editUserKey;

	@Column(name = "editDtm")
	@NotEmpty
	private String editDtm;

	@PreUpdate
	public void preUpdate() {
		this.editDtm = CmmnUtils.getFormatedDate("yyyyMMddHHmmss");
	}

	@PrePersist
	public void prePersist() {
		this.editUserKey 	= null;
		this.editDtm 		= null;
	}
}