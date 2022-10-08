package com.nohood.duantotnghiep.impl;

import com.nohood.duantotnghiep.dao.BILLDAO;
import com.nohood.duantotnghiep.entity.BILL;
import com.nohood.duantotnghiep.service.BILLSERVICE;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BILLSERVICEIMPL implements BILLSERVICE {
    @Autowired
    BILLDAO dao;
    @Override
    public List<BILL> findall() {
        return dao.findAll();
    }

    @Override
    public BILL create(BILL BILL) {
        return dao.save(BILL);
    }

    @Override
    public void deletebyid(long BILLID) {
        dao.deleteById(BILLID);
    }


    @Override
    public void delete(BILL BILL) {
        dao.delete(BILL);
    }

    @Override
    public BILL findone(long BILLID) {
        return dao.findById(BILLID).get();
    }

    

//    @Override
//    public BILL create(JsonNode data) {
//        return null;
//    }


}
