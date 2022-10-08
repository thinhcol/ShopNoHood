package com.nohood.duantotnghiep.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "CART")
public class CART {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long CARTID;
    @Temporal(TemporalType.TIMESTAMP)
    private Date DATECART;    
    private String PHONE;  
    private String ADDRESS;

  
    @JoinColumn(name = "USERNAME")
    @ManyToOne
    private ACCOUNT account;
    @JsonIgnore
	@OneToMany(mappedBy = "cart")
	List<BILL> bill;
}
