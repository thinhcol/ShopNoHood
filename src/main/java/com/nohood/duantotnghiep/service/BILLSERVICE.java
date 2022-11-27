package com.nohood.duantotnghiep.service;

import com.nohood.duantotnghiep.entity.BILL;
import com.nohood.duantotnghiep.entity.TKDT;
import com.nohood.duantotnghiep.entity.TKSP;

import java.util.List;

public interface BILLSERVICE {
    List<BILL> findall();
    BILL create(BILL bill);
    void deletebyid(long BILLID);
    void delete(BILL bill);
    BILL findone(long BILLID);
	List<BILL> findByUser(String username);
//	List<TKSP> sanphammuanhieu();
//	List<TKDT> sanphamtien();
}
