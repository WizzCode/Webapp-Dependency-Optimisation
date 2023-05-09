package com.wizzcode.server.service;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.wizzcode.server.util.ApplicationUtils;
import com.wizzcode.wizzcode.CodeDependencyFinder.Dependency;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PreDestroy;
import java.io.*;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.Map;

@Service
public class DependencyService {
    @Value("${custom.user.inputdir}") String dirStr;
    public String findOutput(MultipartFile codeInput) throws Exception {
        ApplicationUtils applicationUtils = new ApplicationUtils();
        applicationUtils.storeMultipartFileAsTempFile(codeInput, dirStr);

        //use library and pass input file path
        Path inputFilePath = applicationUtils.storeMultipartFileAsTempFile(codeInput, dirStr);
        String inputFilePathStr = inputFilePath.toAbsolutePath().toString();
        inputFilePathStr = inputFilePathStr.replace("\\","\\\\");
        Dependency dependencyObj = new Dependency(inputFilePathStr);
        dependencyObj.calldependency();

        //obtain the nodes and their details
        Map<Integer, Map<String, String>> nodes = dependencyObj.getNodes();
        //obtain the dependency hashmap
        Map<Integer, int[]> depMap = dependencyObj.getDepArray();

        //combine and convert to JSON
        Gson gson = new GsonBuilder().disableHtmlEscaping().setPrettyPrinting().create();
        JsonObject jsonObject = new JsonObject();
        for (Map.Entry<Integer, Map<String,String>> node : nodes.entrySet()) {
            JsonObject tempNodeObj = new JsonObject();
            String displayName="";
            for(Map.Entry<String, String> nodeInfo: node.getValue().entrySet()){
                tempNodeObj.addProperty(nodeInfo.getKey(), nodeInfo.getValue());
                if(nodeInfo.getKey()=="name"){
                    String qualifiedName = nodeInfo.getValue();

                    //remove all content between parentheses
                    qualifiedName = qualifiedName.replaceAll("\\([^()]*\\)", "()");
                    //obtain the string after last appearance of dot operator
                    int lastDotIndex = qualifiedName.lastIndexOf(".");
                    if (lastDotIndex >= 0) {
                        displayName = qualifiedName.substring(lastDotIndex + 1);
                    }
                    else{
                        displayName = qualifiedName;
                    }
                }
            }
            int id = node.getKey();
            tempNodeObj.addProperty("depArray", Arrays.toString(depMap.get(id)));
            tempNodeObj.addProperty("displayName", displayName);
            jsonObject.add(Integer.toString(node.getKey()), tempNodeObj);
        }

        return gson.toJson(jsonObject);
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
