package com.nohood.duantotnghiep.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.nohood.duantotnghiep.service.UPLOADSERVICE;

import javax.servlet.ServletContext;
import java.io.File;

@Service
public class UPLOADSERVICEIMPL implements UPLOADSERVICE {
    @Autowired
    ServletContext app;
    @Override
    public File save(MultipartFile file, String folder) {
        File dir = new File(app.getRealPath("/" + folder));
        if(!dir.exists()) {
            dir.mkdirs();
        }
        String s = System.currentTimeMillis() + file.getOriginalFilename();
        String name = Integer.toHexString(s.hashCode()) + s.substring(s.lastIndexOf("."));
        try {
            File savedFile = new File(dir,name);
            file.transferTo(savedFile);
            return savedFile;
        }catch(Exception e) {
            throw new RuntimeException(e);
        }
    }

}
