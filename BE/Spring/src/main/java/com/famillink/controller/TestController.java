package com.famillink.controller;

import com.famillink.model.service.TestService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.nio.file.Files;


@Api("Test Controller")
@RequiredArgsConstructor
@RestController
@CrossOrigin("*")
public class TestController {
    private final Logger logger = LoggerFactory.getLogger(TestController.class);

    private final TestService testService;

    @ApiOperation(value = "테스트", notes = "테스트 컨트롤러입니다.")
    @GetMapping("/test")
    public ResponseEntity<?> test(
            final Authentication authentication) {

        return new ResponseEntity<Object>("dd", HttpStatus.OK);
    }

    @ApiOperation(value = "파일 업로드", notes = "파일을 업로드합니다.")
    @PostMapping("/upload")
    public ResponseEntity<?> fileUpload(final Authentication authentication,
                                        @RequestPart(value = "imgUrlBase", required = true) MultipartFile imgUrlBase) throws Exception {
        logger.debug("MultipartFile.isEmpty : {}", imgUrlBase.isEmpty());
        testService.store(imgUrlBase);
        return null;
    }

    @ApiOperation(value = "파일 다운로드")
    @GetMapping("/download")
    public ResponseEntity<?> fileDownload(final Authentication authentication,
                                          @RequestParam(value = "filename") String filename) {

        Resource file = testService.loadAsResource(filename);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }

    @ApiOperation(value = "동영상 스트리밍")
    @GetMapping(path = "/streaming")
    public ResponseEntity<StreamingResponseBody> movieStreaming(
            @RequestParam("file") String fileName,
            @RequestHeader HttpHeaders headers) throws Exception {
//        return new InputStreamResource(new FileInputStream("upfiles\\record.mp4"));
        // ResponseEntity<StreamingResponseBody>
        File file = new File("upfiles\\" + fileName);
        if (!file.isFile()) {
            return ResponseEntity.notFound().build();
        }

        StreamingResponseBody streamingResponseBody = outputStream -> {
            FileCopyUtils.copy(Files.newInputStream(file.toPath()), outputStream);
            System.out.println("dd");
        };
        final HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add("Content-Type", "video/avi");
        responseHeaders.add("Content-Length", Long.toString(file.length()));
        return ResponseEntity.ok().headers(responseHeaders).body(streamingResponseBody);
    }
}
