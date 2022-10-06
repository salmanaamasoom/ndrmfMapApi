package com.ndrmf.repository;

import com.ndrmf.model.Province;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.List;
import java.util.Set;

@CrossOrigin
@RepositoryRestResource(excerptProjection = Province.class)
public interface ProvinceRepository extends JpaRepository<Province, Long> {

//    List<Province> findAll();


//    List<Applicant> findByJobOpening_Id(Long jobOpeningId);
//    List<Applicant> findBySapIdIsNull();
//
//    Applicant findByJobOpeningIdAndCnicNo(Long id, String cnic);
//
//    Applicant findByEmailAndCnicNoAndJobOpening_Vacancy(String email,String cnic, String vacancy);
//
//    List<Applicant> findByJobOpening_IdAndTotalEducationYearGreaterThanEqual(Long jobOpeningId, Integer totalEducationYear);
//    List<Applicant> findByJobOpening_IdAndTotalEducationYearGreaterThanEqualAndTotalExperienceYearGreaterThanEqual(Long jobOpeningId, Integer totalEducationYear, Double totalExperienceYear);
//
//    List<Applicant> findByJobOpening_IdAndTotalEducationYearGreaterThanEqualAndTotalExperienceYearGreaterThanEqualAndEducationList_Relevant(Long jobOpeningId, Integer totalEducationYear, Double totalExperienceYear, boolean relevantEducation);
//    List<Applicant> findByJobOpening_IdAndTotalEducationYearGreaterThanEqualAndTotalExperienceYearGreaterThanEqualAndEducationList_RelevantAndExperienceList_Relevant(Long jobOpeningId, Integer totalEducationYear, Double totalExperienceYear, boolean relevantEducation, boolean relevantExperice);
//    List<Applicant> findByJobOpening_IdAndTotalEducationYearGreaterThanEqualAndTotalExperienceYearGreaterThanEqualAndEducationList_RelevantAndExperienceList_RelevantAndEducationList_RecentEducation(Long jobOpeningId, Integer totalEducationYear, Double totalExperienceYear, boolean relevantEducation, boolean relevantExperice, boolean recentEducstion);
//
//    Set<Applicant> findByJobOpening_IdAndTotalEducationYearGreaterThanEqualAndTotalExperienceYearGreaterThanEqualAndEducationList_RelevantAndExperienceList_RelevantAndEducationList_RecentEducationAndEducationList_PercentageGpaGreaterThanEqual(Long jobOpeningId, Integer totalEducationYear, Double totalExperienceYear, boolean relevantEducation, boolean relevantExperice, boolean recentEducstion, Double gpa);



}