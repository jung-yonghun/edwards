package com.edwards.domains;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "CommonDataVO", schema = "dbo", catalog = "soo")
@Data
public class CommonDataVO {

  @Id
  private String datas;
}
