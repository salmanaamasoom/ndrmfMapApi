package com.ndrmf.model;


import javax.persistence.*;

@Entity
@Table(name = "provinces")
public class Province {
    private Long provinceId;
    private String provinceName;

    public Province (){

    }
    public Province(Long provinceId, String provinceName){
        this.provinceId = provinceId;
        this.provinceName = provinceName;
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getProvinceId(){
        return this.provinceId;
    }
    public void setProvinceId(Long provinceId) {
        this.provinceId = provinceId;
    }
    @Column(nullable = false)
    public String getProvinceName(){
        return this.provinceName;
    }
    public void setProvinceName(String provinceName){
        this.provinceName = provinceName;
    }
}
