package com.ndrmf.controllers;

import com.ndrmf.repository.SchemeByColumn;
import com.ndrmf.model.*;
import com.ndrmf.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
@RequestMapping(value = "/adminBoundary")
public class MapViewController {

    @Autowired
    ProvinceRepository provinceRepository;

    @Autowired
    DistrictRepository districtRepository;

    @Autowired
    TehsilRepository tehsilRepository;

    @Autowired
    UnionCouncilRepository unionCouncilRepository;

    @Autowired
    SchemeRepository schemeRepository;

    @Autowired
    FipRepository fipRepository;

    @Autowired
    ThematicRepository thematicRepository;


    @GetMapping(value = "/getProvinceList")
    public ResponseEntity<?> getProvince() {
        List<Province> provinceList = (List<Province>) provinceRepository.findAll();
        return ResponseEntity.ok(provinceList);
    }

    @GetMapping (value = "/getDistrictList")
    public ResponseEntity<?> getDistrict(@RequestParam("pId") Long pId, HttpServletRequest request) {
        List<District> districtsList = (List<District>) districtRepository.findByProvinceProvinceId(pId);
        return ResponseEntity.ok(districtsList);
    }

    @GetMapping (value = "/getTehsilList")
    public ResponseEntity<?> getTehsil(@RequestParam("pId") Long pId, @RequestParam("dId") Long dId, HttpServletRequest request) {
        List<Tehsil> tehsilList = (List<Tehsil>) tehsilRepository.findByProvinceProvinceIdAndDistrictId(pId,dId);
        return ResponseEntity.ok(tehsilList);
    }

    @GetMapping (value = "/getUnionCouncilList")
    public ResponseEntity<?> getUnionCouncil(@RequestParam("pId") Long pId, @RequestParam("dId") Long dId,
                                             @RequestParam("tId") Long tId, HttpServletRequest request) {
        List<UnionCouncil> unionCouncilList = (List<UnionCouncil>) unionCouncilRepository.
                findByProvinceProvinceIdAndDistrictIdAndTehsilTehsilId(pId,dId,tId);
        return ResponseEntity.ok(unionCouncilList);
    }
    @GetMapping (value = "/getSchemeList")
    public ResponseEntity<?> getSchemeList(@RequestParam("pId") Long pId, @RequestParam("dId") Long dId,
                                             @RequestParam("tId") Long tId, @RequestParam("uId") Long uId,
                                             HttpServletRequest request) {
        if(dId == 0 && tId == 0 && uId == 0){
            List<Scheme> schemeList = (List<Scheme>) schemeRepository.findByProvinceProvinceId(pId);
            return ResponseEntity.ok(schemeList);
        }if(tId == 0 && uId == 0){
            List<Scheme> schemeList = (List<Scheme>) schemeRepository.findByProvinceProvinceIdAndDistrictId(pId,dId);
            return ResponseEntity.ok(schemeList);
        } if(uId == 0){
            List<Scheme> schemeList = (List<Scheme>) schemeRepository.
                    findByProvinceProvinceIdAndDistrictIdAndTehsilTehsilId(pId,dId,tId);
            return ResponseEntity.ok(schemeList);
        } else {
            List<Scheme> schemeList = (List<Scheme>) schemeRepository.
                    findByProvinceProvinceIdAndDistrictIdAndTehsilTehsilIdAndUnionCouncilId(pId,dId,tId,uId);
            return ResponseEntity.ok(schemeList);
        }
    }
    @GetMapping (value = "/getFipThematicSchemeList")
    public ResponseEntity<?> getFipThematicSchemeList(@RequestParam("fipId") Long fipId,
                                                      @RequestParam("thematicId") Long thematicId,
                                                      HttpServletRequest request) {
        if(fipId!=0){
            List<Scheme> schemeList = (List<Scheme>) schemeRepository.
                    findByFipFipId(fipId);
            return ResponseEntity.ok(schemeList);
        }else{
            List<Scheme> schemeList = (List<Scheme>) schemeRepository.
                    findByThematicThematicId(thematicId);
            return ResponseEntity.ok(schemeList);
        }
    }
    @GetMapping (value = "/getAllSchemeList")
    public ResponseEntity<?> getAllSchemeList() {
        List<SchemeByColumn> schemeByColumnsList = (List<SchemeByColumn>) schemeRepository.findAllBy();
        return ResponseEntity.ok(schemeByColumnsList);
    }
    @GetMapping(value = "/getFipList")
    public ResponseEntity<?> getFip() {
        List<Fip> fipList = (List<Fip>) fipRepository.findAll();
        return ResponseEntity.ok(fipList);
    }
    @GetMapping(value = "/getThematicList")
    public ResponseEntity<?> getThematicList() {
        List<Thematic> thematicList = (List<Thematic>) thematicRepository.findAll();
        return ResponseEntity.ok(thematicList);
    }
}
