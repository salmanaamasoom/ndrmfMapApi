package com.ndrmf.model;

import javax.persistence.*;

@Entity
@Table(name = "thematics")
public class Thematic {
    private Long thematicId;
    private String thematicName;

    public Thematic(){

    }
    public Thematic(Long thematicId, String thematicName){
        this.thematicId = thematicId;
        this.thematicName = thematicName;
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getThematicId(){
        return this.thematicId;
    }
    public void setThematicId(Long thematicId) {
        this.thematicId = thematicId;
    }
    @Column(nullable = false)
    public String getThematicName(){
        return this.thematicName;
    }
    public void setThematicName(String thematicName){
        this.thematicName = thematicName;
    }
}
