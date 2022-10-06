package com.ndrmf.model;

import javax.persistence.*;

@Entity
@Table(name = "unionCouncils")
public class UnionCouncil {
    Long id;
    String unionCouncilName;
    Tehsil tehsil;
    District district;
    Province province;

    public UnionCouncil(){

    }
    public UnionCouncil(Long id, String unionCouncilName, Tehsil tehsil, District district, Province province){
        this.id = id;
        this.unionCouncilName = unionCouncilName;
        this.tehsil = tehsil;
        this.district = district;
        this.province = province;
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getid() {
        return id;
    }
    public void setid(Long id) {
        this.id = id;
    }
    public String getUnionCouncilName() {
        return unionCouncilName;
    }
    public void setUnionCouncilName(String unionCouncilName) {
        this.unionCouncilName = unionCouncilName;
    }
    @ManyToOne
    @JoinColumn(name = "tehsilId")
    public Tehsil getTehsil() {
        return tehsil;
    }
    public void setTehsil(Tehsil tehsil) {
        this.tehsil = tehsil;
    }
    @ManyToOne
    @JoinColumn(name = "districtId")
    public District getDistrict() {
        return district;
    }
    public void setDistrict(District district) {
        this.district = district;
    }
    @ManyToOne
    @JoinColumn(name = "provinceId")
    public Province getProvince() {
        return province;
    }
    public void setProvince(Province province) {
        this.province = province;
    }
}
