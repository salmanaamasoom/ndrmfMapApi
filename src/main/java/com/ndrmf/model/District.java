package com.ndrmf.model;

import javax.persistence.*;

@Entity
@Table(name = "districts")
public class District {
    private Long districtId;
    private String districtName;
    private Province province;

    public District (){

    }
    public District (Long districtId, String districtName, Province province){
        this.districtId = districtId;
        this.districtName = districtName;
        this.province = province;
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return this.districtId;
    }
    public void setId(Long districtId){
        this.districtId = districtId;
    }
    @Column(nullable = false)
    public String getDistrictName(){
        return this.districtName;
    }
    public void setDistrictName(String districtName){
        this.districtName = districtName;
    }
    @ManyToOne
    @JoinColumn(name = "provinceId")
    public Province getProvince(){
        return province;
    }
    public void setProvince(Province province) {
        this.province = province;
    }
}
