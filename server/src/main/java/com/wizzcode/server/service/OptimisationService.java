package com.wizzcode.server.service;

import com.wizzcode.server.util.ApplicationUtils;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PreDestroy;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

@Service
public class OptimisationService {
    @Value("${custom.user.inputdir}") String dirStr;
    public List<List<String>> findOutput(MultipartFile codeInput) {
        ApplicationUtils applicationUtils = new ApplicationUtils();
        applicationUtils.storeMultipartFileAsTempFile(codeInput, dirStr);

        //use library and pass input stream

        //obtain the optimisations
        List<List<String>> optimisations = Arrays.asList(
                Arrays.asList("3","if(i==0){","5"),
                Arrays.asList("9","const temp = 5;","9")
        );

        return optimisations;
    }

    @PreDestroy
    public void shutdown(){
        try {
            File dir = new File(dirStr);
            if(dir.exists()){
                FileUtils.deleteDirectory(dir);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
