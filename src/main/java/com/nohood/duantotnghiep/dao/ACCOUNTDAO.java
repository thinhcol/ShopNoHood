package com.nohood.duantotnghiep.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.nohood.duantotnghiep.entity.ACCOUNT;

import java.util.List;

public interface ACCOUNTDAO extends JpaRepository<ACCOUNT, String> {
    @Query("Select a from ACCOUNT a where a.USERNAME like ?1")
    List<ACCOUNT> findName(String username);
    @Query("Select DISTINCT ar.account FROM ROLEACC ar Where ar.role.ROLEID IN ('ADMN','STAF','SPST')")
    List<ACCOUNT> getAdministrators();
    @Query("Select DISTINCT ar.account FROM ROLEACC ar Where ar.role.ROLEID IN ('CUST','')")
    List<ACCOUNT> getUser();
}
