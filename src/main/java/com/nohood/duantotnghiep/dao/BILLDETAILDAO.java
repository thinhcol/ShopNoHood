package com.nohood.duantotnghiep.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.nohood.duantotnghiep.entity.BILLDETAIL;

public interface BILLDETAILDAO extends JpaRepository<BILLDETAIL, Integer>{
	
	@Query("SELECT b FROM BILLDETAIL b WHERE b.bill.BILLID like ?1")
	List<BILLDETAIL> finByBillId(long billid);

}
