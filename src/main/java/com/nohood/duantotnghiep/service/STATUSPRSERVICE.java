package com.nohood.duantotnghiep.service;


import com.nohood.duantotnghiep.entity.STATUSPR;

import java.util.List;

public interface STATUSPRSERVICE {
    List<STATUSPR> findall();
    STATUSPR create(STATUSPR STATUSPR);
    void deletebyid(long STATUSPRID);
    void delete(STATUSPR STATUSPR);
    STATUSPR findone(long STATUSPRID);
}
