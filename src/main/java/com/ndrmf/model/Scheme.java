package com.ndrmf.model;

import javax.persistence.*;

@Entity
@Table(name = "schemes")
public class Scheme {
    public Long schemeId;
    public String schemeCode;
    public String schemeName;
    public Long contractAmount;
    public Long directBeneficiaries;
    public Long inDirectBeneficiaries;
    public Double agricultureLand;
    public Double nonAgricultureLand;
    public Double mitigationLength;
    public String schemeStatus;
    public Integer schemeStatusPercentage;
    public Thematic thematic;
    public Fip fip;
    public UnionCouncil unionCouncil;
    public Tehsil tehsil;
    public District district;
    public Province province;

    public Scheme(){

    }
    public Scheme(Long schemeId, String schemeCode, String schemeName, Long contractAmount, Long directBeneficiaries, Long inDirectBeneficiaries, Double agricultureLand, Double nonAgricultureLand, Double mitigationLength, String schemeStatus, Integer schemeStatusPercentage, Thematic thematic, Fip fip, UnionCouncil unionCouncil, Tehsil tehsil, District district, Province province) {
        this.schemeId = schemeId;
        this.schemeCode = schemeCode;
        this.schemeName = schemeName;
        this.contractAmount = contractAmount;
        this.directBeneficiaries = directBeneficiaries;
        this.inDirectBeneficiaries = inDirectBeneficiaries;
        this.agricultureLand = agricultureLand;
        this.nonAgricultureLand = nonAgricultureLand;
        this.mitigationLength = mitigationLength;
        this.schemeStatus = schemeStatus;
        this.schemeStatusPercentage = schemeStatusPercentage;
        this.thematic = thematic;
        this.fip = fip;
        this.unionCouncil = unionCouncil;
        this.tehsil = tehsil;
        this.district = district;
        this.province = province;
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getSchemeId() {
        return schemeId;
    }

    public void setSchemeId(Long schemeId) {
        this.schemeId = schemeId;
    }

    public String getSchemeCode() {
        return schemeCode;
    }

    public void setSchemeCode(String schemeCode) {
        this.schemeCode = schemeCode;
    }

    public String getSchemeName() {
        return schemeName;
    }

    public void setSchemeName(String schemeName) {
        this.schemeName = schemeName;
    }

    public Long getContractAmount() {
        return contractAmount;
    }

    public void setContractAmount(Long contractAmount) {
        this.contractAmount = contractAmount;
    }

    public Long getDirectBeneficiaries() {
        return directBeneficiaries;
    }

    public void setDirectBeneficiaries(Long directBeneficiaries) {
        this.directBeneficiaries = directBeneficiaries;
    }

    public Long getInDirectBeneficiaries() {
        return inDirectBeneficiaries;
    }

    public void setInDirectBeneficiaries(Long inDirectBeneficiaries) {
        this.inDirectBeneficiaries = inDirectBeneficiaries;
    }

    public Double getAgricultureLand() {
        return agricultureLand;
    }

    public void setAgricultureLand(Double agricultureLand) {
        this.agricultureLand = agricultureLand;
    }

    public Double getNonAgricultureLand() {
        return nonAgricultureLand;
    }

    public void setNonAgricultureLand(Double nonAgricultureLand) {
        this.nonAgricultureLand = nonAgricultureLand;
    }

    public Double getMitigationLength() {
        return mitigationLength;
    }

    public void setMitigationLength(Double mitigationLength) {
        this.mitigationLength = mitigationLength;
    }

    public String getSchemeStatus() {
        return schemeStatus;
    }

    public void setSchemeStatus(String schemeStatus) {
        this.schemeStatus = schemeStatus;
    }

    public Integer getSchemeStatusPercentage(){
        return schemeStatusPercentage;
    }

    public void setSchemeStatusPercentage(Integer schemeStatusPercentage){
        this.schemeStatusPercentage = schemeStatusPercentage;
    }
    @ManyToOne
    @JoinColumn(name = "thematicId")
    public Thematic getThematic() {
        return thematic;
    }

    public void setThematic(Thematic thematic) {
        this.thematic = thematic;
    }
    @ManyToOne
    @JoinColumn(name = "fipId")
    public Fip getFip() {
        return fip;
    }

    public void setFip(Fip fip) {
        this.fip = fip;
    }

    @ManyToOne
    @JoinColumn(name = "unionCouncilId")
    public UnionCouncil getUnionCouncil() {
        return unionCouncil;
    }

    public void setUnionCouncil(UnionCouncil unionCouncil) {
        this.unionCouncil = unionCouncil;
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
