package com.nohood.duantotnghiep.impl;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nohood.duantotnghiep.dao.BILLDAO;
import com.nohood.duantotnghiep.dao.CARTDAO;
import com.nohood.duantotnghiep.entity.BILL;
import com.nohood.duantotnghiep.entity.CART;
import com.nohood.duantotnghiep.service.BILLSERVICE;
import com.nohood.duantotnghiep.service.CARTSERVICE;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CARTSERVICEIMPL implements CARTSERVICE {
    @Autowired
    CARTDAO dao;
    @Autowired
    BILLDAO bdao;
    @Override
    public List<CART> findall() {
        return dao.findAll();
    }

    @Override
    public CART create(CART CART) {
        return dao.save(CART);
    }

    @Override
    public void deletebyid(long CARTID) {
        dao.deleteById(CARTID);
    }


    @Override
    public void delete(CART CART) {
        dao.delete(CART);
    }

    @Override
    public CART findone(long CARTID) {
        return dao.findById(CARTID).get();
    }

	@Override
	public List<CART> findByUsername(String username) {
		// TODO Auto-generated method stub
		return dao.findByUsername(username);
	}

	@Override
	public CART create(JsonNode data) {
		ObjectMapper mapper = new ObjectMapper();
		CART order = mapper.convertValue(data, CART.class);
		dao.save(order);
		TypeReference<List<BILL>> type = new TypeReference<List<BILL>>() {};
		List<BILL> details = mapper.convertValue(data.get("bill"), type)
				.stream().peek(d -> d.setCart(order)).collect(Collectors.toList());
		bdao.saveAll(details);
		return order; 
	}

	@Override
	public int UpdateSl(String PHONE, String ADDRESS, long CARTID) {
		return dao.UpdateSl(PHONE, ADDRESS, CARTID);
	}


}
