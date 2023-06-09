package com.famillink.model.service;

import com.famillink.model.domain.param.PhotoSenderDTO;
import org.springframework.core.io.InputStreamResource;
import org.springframework.security.core.Authentication;
import org.springframework.web.multipart.MultipartFile;

public interface PhotoService {

    //가족 사진을 저장할 메서드


    void sender(PhotoSenderDTO sender, MultipartFile file) throws Exception;


    //가족 사진을 보내줄 메서드
    InputStreamResource download(String name, Authentication authentication) throws Exception;

    public void delete(String name,final Authentication authentication) throws Exception;


}
