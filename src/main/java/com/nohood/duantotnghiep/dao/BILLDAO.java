package com.nohood.duantotnghiep.dao;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import com.nohood.duantotnghiep.entity.BILL;
import com.nohood.duantotnghiep.entity.STATUSPR;

import org.springframework.data.jpa.repository.Query;
import com.nohood.duantotnghiep.entity.TKDT;
import com.nohood.duantotnghiep.entity.TKSP;
public interface BILLDAO extends JpaRepository<BILL,Long> {
	@Query("SELECT new com.nohood.duantotnghiep.entity.TKSP(ord.product.PRODUCTNAME,sum(ord.QUANTITY)) FROM BILL ord group by ord.product.PRODUCTNAME")
	List<TKSP> sanphammuanhieu();
	@Query("SELECT new com.nohood.duantotnghiep.entity.TKDT(ord.product.PRODUCTNAME,sum(ord.SUMPRICE*ord.QUANTITY)) FROM BILL ord group by ord.product.PRODUCTNAME")
	List<TKDT> sanphamtien(); 
//	@Modifying
//	@Transactional
//	@Query(value = "UPDATE BILL set status = ?1 where BILLID = ?2", nativeQuery = true)
//	int UpdateSl(STATUSPR status, long BILLID);
}
