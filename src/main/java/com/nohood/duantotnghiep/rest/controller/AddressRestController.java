package com.nohood.duantotnghiep.rest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nohood.duantotnghiep.entity.CATEGORY;
import com.nohood.duantotnghiep.entity.DISTRICT;
import com.nohood.duantotnghiep.entity.PROVINCE;
import com.nohood.duantotnghiep.service.ADDRESSSERVICE;
import com.nohood.duantotnghiep.service.DISTRICTSERVICE;
import com.nohood.duantotnghiep.service.PROVINCESERVICE;

@CrossOrigin("*")
@RestController
@RequestMapping("/rest/address")
public class AddressRestController {
	@Autowired
    PROVINCESERVICE proviceservice;
	@Autowired
    DISTRICTSERVICE districtservice;
	
	@PostMapping("/province")
    public void postprovince(@RequestBody List<PROVINCE> provinces){
		proviceservice.createProvinces(provinces);
    }
	
	@PostMapping("/district")
    public void postdistrict(@RequestBody List<DISTRICT> districts){
//		districts.forEach(a -> {
//			System.out.println(a);
//		});
		districtservice.createDistricts(districts);
    }
}
