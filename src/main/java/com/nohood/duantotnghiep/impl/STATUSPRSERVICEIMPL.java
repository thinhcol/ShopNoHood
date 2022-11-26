package com.nohood.duantotnghiep.impl;

import com.nohood.duantotnghiep.dao.STATUSPRDAO;
import com.nohood.duantotnghiep.entity.STATUSPR;
import com.nohood.duantotnghiep.service.STATUSPRSERVICE;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class STATUSPRSERVICEIMPL implements STATUSPRSERVICE {
    @Autowired
    STATUSPRDAO dao;
    @Override
    public List<STATUSPR> findall() {
        return dao.findAll();
    }

    @Override
    public STATUSPR create(STATUSPR STATUSPR) {
        return dao.save(STATUSPR);
    }

    @Override
    public void deletebyid(long STATUSPRID) {
        dao.deleteById(STATUSPRID);
    }


    @Override
    public void delete(STATUSPR STATUSPR) {
        dao.delete(STATUSPR);
    }

    @Override
    public STATUSPR findone(long STATUSPRID) {
        return dao.findById(STATUSPRID).get();
    }



}
