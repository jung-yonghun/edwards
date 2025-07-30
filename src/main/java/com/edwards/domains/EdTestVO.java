package com.edwards.domains;

//import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
//@Table(name = "ED_TEST", schema = "dbo", catalog = "rms")
//@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
public class EdTestVO{
	@Id
	@Column(name = "EXPT")
	@NotEmpty
	@Size(max = 30)
	private String EXPT;
}