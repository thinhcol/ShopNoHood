package com.nohood.duantotnghiep.entity;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "STATUSPR")
public class STATUSPR {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long IDST;
	private String STANAME;

	@JsonIgnore 
	@OneToMany(mappedBy = "status")
	List<BILL> bill;
}
