package com.nohood.duantotnghiep.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nohood.duantotnghiep.dao.BILLDAO;
import com.nohood.duantotnghiep.dao.BILLDETAILDAO;
import com.nohood.duantotnghiep.entity.BILL;
import com.nohood.duantotnghiep.entity.BILLDETAIL;
import com.nohood.duantotnghiep.service.BILLDETAILSERVICE;
import com.nohood.duantotnghiep.service.BILLSERVICE;


@Service
public class BILLDETAILSERVICEIMPL implements BILLDETAILSERVICE{

	@Autowired
    BILLDETAILDAO dao;
    @Override
    public List<BILLDETAIL> findall() {
        return dao.findAll();
    }
	@Override
	public BILLDETAIL create(BILLDETAIL BILLDETAIL) {
		return dao.save(BILLDETAIL);
	}
	@Override
	public void deletebyid(long BILLDETAILID) {
		// TODO Auto-generated method stub
		
	}
	@Override
	public void delete(BILLDETAIL BILLDETAIL) {
		// TODO Auto-generated method stub
		
	}
	@Override
	public BILLDETAIL findone(long BILLDETAILID) {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public List<BILLDETAIL> getByBillID(long billid) {
		return dao.finByBillId(billid);
	}

}
