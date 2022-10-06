package com.ndrmf.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table (name = "tehsils")
public class Tehsil {

    private Long tehsilId;
    private String tehsilName;
    private District district;
    private Province province;

    public Tehsil(){

    }
    public Tehsil(Long tehsilId, String tehsilName, District district, Province province){
        this.tehsilId = tehsilId;
        this.tehsilName = tehsilName;
        this.district = district;
        this.province = province;
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getTehsilId() {
        return tehsilId;
    }
    public void setTehsilId(Long id) {
        this.tehsilId = id;
    }
    @Column(nullable = false)
    public String getTehsilName() {
        return tehsilName;
    }
    public void setTehsilName(String tehsilName) {
        this.tehsilName = tehsilName;
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
