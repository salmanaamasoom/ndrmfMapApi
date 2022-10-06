<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>NDRMF Projects | Registration </title>

  <!-- Google Font: Source Sans Pro -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="<c:url value='/webResources/plugins/fontawesome-free/css/all.min.css'/>">
  <!-- icheck bootstrap -->
  <link rel="stylesheet" href="<c:url value='/webResources/plugins/icheck-bootstrap/icheck-bootstrap.min.css'/>">
  <!-- Theme style -->
  <link rel="stylesheet" href="<c:url value='/webResources/css/adminlte.min.css'/>">
</head>
<body class="hold-transition register-page">
<div class="register-box">
  <div class="card card-outline card-primary">
    <div class="card-header text-center">
      <a href="https://www.ndrmf.pk" class="h1"><b>Projects</b>Map Viewer</a>
    </div>
    <div class="card-body">
      <p class="login-box-msg">Register a new membership</p>

      <form:form method="POST" modelAttribute="userForm" class="form-signin">

        <spring:bind path="username">
        <div class="input-group mb-3 ${status.error ? 'has-error' : ''}">
          <form:input type="text" path="username" class="form-control" placeholder="Username"></form:input>
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-envelope"></span>
            </div>
          </div>
          <div class="input-group-text">
            <form:errors path="username"></form:errors>
          </div>
        </div>
        </spring:bind>

        <spring:bind path="password">
        <div class="input-group mb-3 ${status.error ? 'has-error' : ''}">
          <form:input type="password" path="password" class="form-control" placeholder="Password"></form:input>
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"></span>
            </div>
          </div>
          <div class="input-group-text">
            <form:errors path="password"></form:errors>
          </div>
        </div>
        </spring:bind>

        <spring:bind path="passwordConfirm">
        <div class="input-group mb-3">
          <form:input type="password" path="passwordConfirm" class="form-control" placeholder="Retype password"></form:input>
          <div class="input-group-append">
            <div class="input-group-text">
              <span class="fas fa-lock"> <form:errors path="passwordConfirm"></form:errors></span>
            </div>
          </div>
        </div>
        </spring:bind>

        <div class="row">
          <div class="col-8">
            <div class="icheck-primary">
              <input type="checkbox" id="agreeTerms" name="terms" value="agree">
              <label for="agreeTerms">
               I agree to the <a href="#">terms</a>
              </label>
            </div>
          </div>
          <!-- /.col -->
          <div class="col-4">
            <button type="submit" class="btn btn-primary btn-block">Register</button>
          </div>
          <!-- /.col -->
        </div>
      </form:form>

      <a href="<c:url value='/login'/>" class="text-center">I already have a membership</a>
    </div>
    <!-- /.form-box -->
  </div><!-- /.card -->
</div>
<!-- /.register-box -->

<!-- jQuery -->
<script src="<c:url value='/webResources/plugins/jquery/jquery.min.js'/>"></script>
<!-- Bootstrap 4 -->
<script src="<c:url value='/webResources/plugins/bootstrap/js/bootstrap.bundle.min.js'/>"></script>
<!-- AdminLTE App -->
<script src="<c:url value='/webResources/js/adminlte.min.js'/>"></script>
</body>
</html>
