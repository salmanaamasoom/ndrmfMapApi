package com.ndrmf.repository;

import com.ndrmf.model.Fip;
import com.ndrmf.model.Tehsil;
import com.ndrmf.model.UnionCouncil;

public interface SchemeByColumn {
     Long getSchemeId();
     String getSchemeCode();
     String getSchemeName();
     Fip getFip();
     String getSchemeStatus();
     String getSchemeStatusPercentage();
     Tehsil getTehsil();
}
