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
  <title>Projects Map View | Log in </title>

  <!-- Google Font: Source Sans Pro -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <!-- Font Awesome -->
  <%--  <link rel="stylesheet" href="../../webResources/plugins/fontawesome-free/css/all.min.css">--%>
  <%--  <link rel="stylesheet" href="${contextPath}/webResources/plugins/fontawesome-free/css/all.min.css">--%>
  <link rel="stylesheet" href="<c:url value='/webResources/plugins/fontawesome-free/css/all.min.css' />">

  <!-- icheck bootstrap -->
  <link rel="stylesheet" href="<c:url value='/webResources/plugins/icheck-bootstrap/icheck-bootstrap.min.css'/>">
  <!-- Theme style -->
  <link rel="stylesheet" href="<c:url value='/webResources/css/adminlte.min.css'/>">

</head>
<body class="hold-transition login-page">
<div class="login-box">
  <!-- /.login-logo -->
  <div class="card card-outline card-primary">
    <div class="card-header text-center">
      <a href="https://www.ndrmf.pk/" class="h1"><b>Projects</b>Map Viewer</a>
    </div>
    <div class="card-body">
      <p class="login-box-msg">Sign in to start your session</p>

<%--      <form action="${contextPath}/login" method="post">--%>
<%--      <form action="${contextPath}/api/auth/singin" method="post">--%>

        <form method="POST" action="<c:url value='/login'/>" class="form-signin">
            <div class="form-group">
                <div class="input-group mb-3">
                    <input name="username" type="text" class="form-control" placeholder="Username" autofocus="true">
                    <div class="input-group-append">
                        <div class="input-group-text">
<%--                            <span class="fas fa-envelope">${message}</span>--%>
                            <span class="fas fa-envelope"><c:out value="${message}"/></span>

                        </div>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <input  name="password" type="password" class="form-control" placeholder="Password">
                    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
                    <div class="input-group-append">
                        <div class="input-group-text">
<%--                            <span class="fas fa-envelope">${error}</span>--%>
<%--    <c:if test="${error != null ? 'has-error' : ''}"/>--%>
                            <span class="fas fa-lock"><c:out value="${error}"/></span>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-8">
                        <div class="icheck-primary">
                            <input type="checkbox" id="remember">
                            <label for="remember">
                                Remember Me
                            </label>
                        </div>
                    </div>
                    <!-- /.col -->
                    <div class="col-4">
                        <button type="submit" value="login" class="btn btn-primary btn-block">Sign In</button>
                    </div>
                    <!-- /.col -->
                </div>
            </div>
        </form>
      <%--      <div class="social-auth-links text-center mt-2 mb-3">--%>
      <%--        <a href="#" class="btn btn-block btn-primary">--%>
      <%--          <i class="fab fa-facebook mr-2"></i> Sign in using Facebook--%>
      <%--        </a>--%>
      <%--        <a href="#" class="btn btn-block btn-danger">--%>
      <%--          <i class="fab fa-google-plus mr-2"></i> Sign in using Google+--%>
      <%--        </a>--%>
      <%--      </div>--%>
      <!-- /.social-auth-links -->

      <%--      <p class="mb-1">--%>
      <%--        <a href="forgot-password.html">I forgot my password</a>--%>
      <%--      </p>--%>
      <p class="mb-0">
        <a href="<c:url value='/register'/>" class="text-center">Register a new membership</a>
      </p>
    </div>
    <!-- /.card-body -->
  </div>
  <!-- /.card -->
</div>
<!-- /.login-box -->

<!-- jQuery -->
<script src="<c:url value='/webResources/plugins/jquery/jquery.min.js'/>"></script>
<!-- Bootstrap 4 -->
<script src="<c:url value='/webResources/plugins/bootstrap/js/bootstrap.bundle.min.js'/>"></script>
<!-- AdminLTE App -->
<script src="<c:url value='/webResources/js/adminlte.min.js'/>"></script>
<script src="<c:url value='/webResources/mainjs/main.js'/>"></script>

</body>
</html>
