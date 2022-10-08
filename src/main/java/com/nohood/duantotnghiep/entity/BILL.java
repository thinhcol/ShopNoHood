package com.nohood.duantotnghiep.entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "BILL")
public class BILL {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long BILLID;
    private int QUANTITY;
    private float SUMPRICE;
    private String STATUS;

    @JoinColumn(name = "PRODUCTID")
    @ManyToOne
    private PRODUCT product;
    @JoinColumn(name = "CARTID")
    @ManyToOne
    private CART cart;
}
