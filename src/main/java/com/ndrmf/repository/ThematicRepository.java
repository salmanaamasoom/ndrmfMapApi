package com.ndrmf.repository;

import com.ndrmf.model.Fip;
import com.ndrmf.model.Province;
import com.ndrmf.model.Thematic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@RepositoryRestResource(excerptProjection = Province.class)
public interface ThematicRepository extends JpaRepository<Thematic, Long> {

}
