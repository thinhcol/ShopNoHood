package com.nohood.duantotnghiep.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nohood.duantotnghiep.dao.ACCOUNTDAO;
import com.nohood.duantotnghiep.dao.WARDDAO;
import com.nohood.duantotnghiep.entity.PRODUCT;
import com.nohood.duantotnghiep.entity.WARD;
import com.nohood.duantotnghiep.service.PRODUCTSERVICE;
import com.nohood.duantotnghiep.service.WARDSERVICE;
@Service
public class WARDSERVICEIMPL implements WARDSERVICE{
	@Autowired
    WARDDAO dao;

	@Override
	public List<WARD> findall() {
		return dao.findAll();
	}

	@Override
	public WARD create(WARD ward) {
		return dao.save(ward);
	}

	@Override
	public void delete(WARD ward) {
		dao.delete(ward);
	}

}
