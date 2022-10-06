package com.ndrmf.model;


import javax.persistence.*;

@Entity
@Table(name = "fips")
public class Fip {
    private Long fipId;
    private String fipName;

    public Fip(){

    }
    public Fip(Long fipId, String fipName){
        this.fipId = fipId;
        this.fipName = fipName;
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getFipId(){
        return this.fipId;
    }
    public void setFipId(Long fipId) {
        this.fipId = fipId;
    }
    @Column(nullable = false)
    public String getFipName(){
        return this.fipName;
    }
    public void setFipName(String fipName){
        this.fipName = fipName;
    }
}
