package com.wizzcode.server.api;

import com.wizzcode.server.service.DependencyService;
import com.wizzcode.server.service.OptimisationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RequestMapping("api/")
@RestController
@CrossOrigin(origins = "*")
public class CodeInputController {
    private final DependencyService dependencyService;
    private final OptimisationService optimisationService;

    @Autowired
    public CodeInputController(DependencyService dependencyService, OptimisationService optimisationService) {
        this.dependencyService = dependencyService;
        this.optimisationService = optimisationService;
    }

    @RequestMapping(value = "dependency", method = { RequestMethod.GET, RequestMethod.POST })
    public String dependency(@RequestBody MultipartFile codeInput) throws Exception{
        return dependencyService.findOutput(codeInput);
    }

    @RequestMapping(value = "optimisation", method = { RequestMethod.GET, RequestMethod.POST })
    public String optimisation(@RequestBody MultipartFile codeInput) throws Exception{
        return optimisationService.findOutput(codeInput);
    }
}
