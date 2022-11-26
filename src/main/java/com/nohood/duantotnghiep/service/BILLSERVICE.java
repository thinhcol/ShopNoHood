package com.nohood.duantotnghiep.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.nohood.duantotnghiep.entity.BILL;
import com.nohood.duantotnghiep.entity.STATUSPR;
import com.nohood.duantotnghiep.entity.TKDT;
import com.nohood.duantotnghiep.entity.TKSP;

import java.util.List;

public interface BILLSERVICE {
    List<BILL> findall();
    BILL create(BILL bill);
    void deletebyid(long BILLID);
    void delete(BILL bill);
    BILL findone(long BILLID);
    List<TKSP> sanphammuanhieu();
    List<TKDT> sanphamtien(); 
    int UpdateSl(STATUSPR statuspr, long BILLID);
}
