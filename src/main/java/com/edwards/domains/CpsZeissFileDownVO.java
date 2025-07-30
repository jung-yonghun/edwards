package com.edwards.domains;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import java.math.BigDecimal;

@Entity
@Table(name = "CPS_ZeissFileDown", schema = "dbo", catalog = "soo")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
public class CpsZeissFileDownVO{
	@Id
	@Column(name = "edmsFileKey")
	@Size(max = 18)
	private String edmsFileKey;

	@Column(name = "edmsNum")
	@Size(max = 100)
	private String edmsNum;

	@Column(name = "edmsSingoNum")
	@Size(max = 20)
	private String edmsSingoNum;

	@Column(name = "edmsGongGub")
	@Size(max = 60)
	private String edmsGongGub;

	@Column(name = "edmsInvNo")
	@Size(max = 100)
	private String edmsInvNo;

	@Column(name = "edmsPoNo")
	@Size(max = 100)
	private String edmsPoNo;

	@Column(name = "edmsMbl")
	@Size(max = 20)
	private String edmsMbl;

	@Column(name = "edmsIphangDate")
	@Size(max = 8)
	private String edmsIphangDate;

	@Column(name = "edmsSingoDate")
	@Size(max = 8)
	private String edmsSingoDate;

	@Column(name = "edmsOkDate")
	@Size(max = 8)
	private String edmsOkDate;

	@Column(name = "edmsFileCategory")
	@NotEmpty
	@Size(max = 20)
	private String edmsFileCategory;

	@Column(name = "edmsFilePath", updatable = false)
	@NotEmpty
	@Size(max = 1000)
	private String edmsFilePath;

	@Column(name = "edmsSaveFileName", updatable = false)
	@NotEmpty
	@Size(max = 200)
	private String edmsSaveFileName;

	@Column(name = "edmsOrgFileName", updatable = false)
	@NotEmpty
	@Size(max = 200)
	private String edmsOrgFileName;

	@Column(name = "edmsFileSize", updatable = false)
	@NotNull
	private BigDecimal edmsFileSize;

	@Column(name = "edmsFileExt", updatable = false)
	@Size(max = 10)
	private String edmsFileExt;

	@Column(name = "useYn")
	@Size(min = 1, max = 1)
	private String useYn;

	@Column(name = "addUserId", updatable = false)
	@NotEmpty
	@Size(max = 10)
	private String addUserId;
}