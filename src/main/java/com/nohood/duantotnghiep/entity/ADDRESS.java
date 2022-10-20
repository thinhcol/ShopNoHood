package com.nohood.duantotnghiep.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "ADDRESS")
public class ADDRESS {
	@Id
	private int ADDRESSID;
	private String STREET_NAMES;
	
	@JoinColumn(name = "PROVICE")
    @ManyToOne
	private PROVINCE province;
	
	@JoinColumn(name = "DISTRICT")
    @ManyToOne
	private DISTRICT district;
	
	@JoinColumn(name = "WARD")
    @ManyToOne
	private WARD ward;
	
	@JoinColumn(name = "ACCOUNT")
    @ManyToOne
	private ACCOUNT account;
}
