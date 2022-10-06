package com.ndrmf.repository;

import com.ndrmf.model.Scheme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin
@RepositoryRestResource(excerptProjection = Scheme.class)
public interface SchemeRepository extends JpaRepository<Scheme, Long> {

    List<Scheme> findByProvinceProvinceIdAndDistrictIdAndTehsilTehsilIdAndUnionCouncilId(Long provinceId,
                                                                        Long districtId,Long tehsilId,
                                                                        Long unionCouncilId);
    List<Scheme> findByProvinceProvinceIdAndDistrictIdAndTehsilTehsilId(Long provinceId,Long districtId,Long tehsilId);

    List<Scheme> findByProvinceProvinceIdAndDistrictId(Long provinceId,Long districtId);

    List<Scheme> findByProvinceProvinceId(Long provinceId);

    List<Scheme> findByThematicThematicId(Long thematicId);

    List<Scheme> findByFipFipId(Long fipId);

    List<SchemeByColumn> findAllBy();

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
