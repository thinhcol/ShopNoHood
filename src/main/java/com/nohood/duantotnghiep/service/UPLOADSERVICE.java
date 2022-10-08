package com.nohood.duantotnghiep.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;

public interface UPLOADSERVICE {
    File save(MultipartFile file, String folder);
}
