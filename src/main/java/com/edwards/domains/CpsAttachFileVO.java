package com.edwards.domains;

import com.edwards.commons.CmmnUtils;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import java.math.BigDecimal;

@Entity
@Table(name = "CPS_AttachFile", schema = "dbo", catalog = "soo")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@DynamicUpdate
@Getter
@Setter
public class CpsAttachFileVO{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "fileKey")
	private BigDecimal fileKey;

	@Column(name = "gubun")
	@NotEmpty
	@Size(max = 20)
	private String gubun;

	@Column(name = "masterKey")
	@NotEmpty
	@Size(max = 18)
	private String masterKey;

	@Column(name = "serverGubun", updatable = false)
	@NotEmpty
	@Size(max = 50)
	private String serverGubun;

	@Column(name = "serverIp", updatable = false)
	@NotEmpty
	@Size(max = 100)
	private String serverIp;

	@Column(name = "filePath", updatable = false)
	@NotEmpty
	@Size(max = 1000)
	private String filePath;

	@Column(name = "saveFileName", updatable = false)
	@NotEmpty
	@Size(max = 1000)
	private String saveFileName;

	@Column(name = "orgFileName", updatable = false)
	@NotEmpty
	@Size(max = 1000)
	private String orgFileName;

	@Column(name = "fileSize", updatable = false)
	@NotNull
	private BigDecimal fileSize;

	@Column(name = "fileExt", updatable = false)
	@Size(max = 100)
	private String fileExt;

	@Column(name = "fileNote")
	@Size(max = 1000)
	private String fileNote;

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
