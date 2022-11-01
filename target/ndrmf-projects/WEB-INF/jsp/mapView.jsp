<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="java.util.Map" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"/>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Projects | Map Viewer</title>

  <!-- Google Font: Source Sans Pro -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <!-- Font Awesome Icons -->
  <link rel="stylesheet" href="<c:url value='/webResources/plugins/fontawesome-free/css/all.min.css'/>">
  <!-- overlayScrollbars -->
  <link rel="stylesheet" href="<c:url value='/webResources/plugins/overlayScrollbars/css/OverlayScrollbars.min.css'/>">
  <!-- Theme style -->
  <link rel="stylesheet" href="<c:url value='/webResources/css/adminlte.min.css'/>">
  <!-- Datatable style JQUERY -->
  <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs4/dt-1.12.1/datatables.min.css"/>

  <!-- DataTables -->
  <link rel="stylesheet" href="<c:url value='/webResources/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css'/>">
  <link rel="stylesheet" href="<c:url value='/webResources/plugins/datatables-responsive/css/responsive.bootstrap4.min.css'/>">
  <link rel="stylesheet" href="<c:url value='/webResources/plugins/datatables-buttons/css/buttons.bootstrap4.min.css'/>">


  <!-- Arc GIS JS API style -->
  <link rel="stylesheet" href="https://js.arcgis.com/4.24/esri/themes/dark/main.css">
  <style>

  </style>

</head>
<body class="hold-transition dark-mode sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed">
<div class="wrapper">

  <!-- Preloader -->
  <div class="preloader flex-column justify-content-center align-items-center">
    <img class="animation__wobble" src="<c:url value='/webResources/img/ndrmf_logo.jpg'/>" alt="NDRMF Logo" height="60" width="60">
  </div>

  <!-- Navbar -->
  <nav class="main-header navbar navbar-expand navbar-dark">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button" onclick="onClickMenuButton()"><i class="fas fa-bars"></i></a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <a href="index3.html" class="nav-link">Main</a>
      </li>
    </ul>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">

      <!-- FullScreen Button -->
      <li class="nav-item">
        <a class="nav-link" data-widget="fullscreen" href="#" role="button">
          <i class="fas fa-expand-arrows-alt"></i>
        </a>
      </li>
      <!-- FullScreen Button -->
      <%--      <li class="nav-item">--%>
      <%--        <a class="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button">--%>
      <%--          <i class="fas fa-th-large"></i>--%>
      <%--        </a>--%>
      <%--      </li>--%>

      <li class="nav-item">
        <c:if test="${pageContext.request.userPrincipal.name != null}">
          <form id="logoutForm" method="POST" action="<c:url value='/logout'/>">
            <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
          </form>
          <a class="nav-link" data-widget="logout"  role="button" onclick="document.forms['logoutForm'].submit()">
            <i class="fas fa-sign-out-alt"></i>
          </a>
        </c:if>
      </li>
    </ul>
  </nav>
  <!-- /.navbar -->

  <!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="#" class="brand-link">
      <img src="<c:url value='/webResources/img/ndrmf_logo.jpg'/>" alt="NDRMF Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
      <span class="brand-text font-weight-light">NDRMF Projects</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img src="<c:url value='/webResources/img/user_1.png'/>" class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info">
          <c:if test="${pageContext.request.userPrincipal.name != null}">
            <a href="#" class="d-block">Welcome ${loginUserName}</a>
          </c:if>
        </div>
      </div>


      <!-- SidebarSearch Form -->
      <div class="form-inline">
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
          <li id="geoToc" class="nav-item menu-open">
            <a id="geoTocAnchor" href="#" class="nav-link active" onclick="onClickGeoToc()">
              <i class="nav-icon fas fa-map"></i>
              <p>
                Geographical Filter
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul id="geoTocList" class="nav nav-treeview">
              <li class="nav-item">
                <!-- select -->
                <div class="form-group">
                  <label>Province</label>
                  <select id="provinceSelect" class="form-control" onchange="getDistrictList()">
                    <option value="0">Select Province</option>
                  </select>
                </div>
              </li>
              <li class="nav-item">
                <div class="form-group">
                  <label>District</label>
                  <select id="districtSelect" class="form-control" onchange="getTehsilList()">
                    <option value="0">Select District</option>
                  </select>
                </div>
              </li>
              <li class="nav-item">
                <div class="form-group">
                  <label>Tehsil</label>
                  <select id="tehsilSelect" class="form-control" onchange="getUnionCouncilList()">
                    <option value="0">Select Tehsil</option>
                  </select>
                </div>
              </li>
              <li class="nav-item">
                <div class="form-group">
                  <label>UC</label>
                  <select id="ucSelect" class="form-control" onchange="getSchemeList(true)">
                    <option value="0">Select UC</option>
                  </select>
                </div>
              </li>
              <li class="nav-item">
                <div class="form-group">
                  <label>Scheme</label>
                  <select id="schemeSelect" class="form-control" onchange="zoomToScheme()">
                    <option value="0">Select Scheme</option>
                  </select>
                </div>
              </li>
            </ul>
          </li>
          <li id="fipToc" class="nav-item">
            <a id="fipTocAnchor" href="#" class="nav-link" onclick="onClickFipToc()">
              <i class="nav-icon fas fa-globe"></i>
              <p>
                Project FIP
                <i class="fas fa-angle-left right"></i>
              </p>
            </a>
            <ul id="fipTocList" class="nav nav-treeview">
              <li class="nav-item">
                <!-- select -->
                <div class="form-group">
                  <label>FIP</label>
                  <select id="fipSelect" class="form-control" onchange="getFipSchemeList()">
                    <option value="0">Select FIP</option>
                  </select>
                </div>
              </li>
              <li class="nav-item">
                <!-- select -->
                <div class="form-group">
                  <label>FIP Scheme</label>
                  <select id="fipSchemeSelect" class="form-control" onchange="zoomToFipScheme()">
                    <option value="0">Select FIP Scheme</option>
                  </select>
                </div>
              </li>
            </ul>
          </li>
          <li id="thematicToc" class="nav-item" >
            <a id="thematicTocAnchor" href="#" class="nav-link" onclick="onClickThematicToc()">
              <i class="nav-icon fas fa-layer-group"></i>
              <p>
                Thematic
                <i class="fas fa-angle-left right"></i>
              </p>
            </a>
            <ul id="thematicTocList" class="nav nav-treeview">
              <li class="nav-item">
                <!-- select -->
                <div class="form-group">
                  <label>Thematic Area</label>
                  <select id="thematicSelect" class="form-control" onchange="getThematicSchemeList()">
                    <option value="0">Select Theme</option>
                  </select>
                </div>
              </li>
              <li class="nav-item">
                <!-- select -->
                <div class="form-group">
                  <label>Thematic Scheme</label>
                  <select id="thematicSchemeSelect" class="form-control" onchange="zoomToThematicScheme()">
                    <option value="0">Select Thematic Scheme</option>
                  </select>
                </div>
              </li>
            </ul>
          </li>
          <li class="nav-header">Layers TOC</li>
          <li class="nav-item">
            <div id="tocDiv">
            </div>
          </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
<%--    <div class="content-header">--%>
<%--      <div class="container-fluid">--%>
<%--        <div class="row mb-2">--%>
<%--          <div class="col-sm-6">--%>
<%--            <h1 class="m-0">Map View</h1>--%>
<%--          </div><!-- /.col -->--%>
<%--          <div class="col-sm-6">--%>
<%--            <ol class="breadcrumb float-sm-right">--%>
<%--              <li class="breadcrumb-item"><a href="#">Projects</a></li>--%>
<%--              <li class="breadcrumb-item active">Map View</li>--%>
<%--            </ol>--%>
<%--          </div><!-- /.col -->--%>
<%--        </div><!-- /.row -->--%>
<%--      </div><!-- /.container-fluid -->--%>
<%--    </div>--%>
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
      <div class="p-3 container-fluid">
        <!-- Info boxes -->
        <div class="row">
          <div class="col-12 col-sm-6 col-md-3">
            <div class="info-box">
              <span class="info-box-icon bg-info elevation-1"><i class="fas fa-project-diagram"></i></span>

              <div class="info-box-content">
                <span class="info-box-text">Total Schemes</span>
                <span id="totalSchemesCard" class="info-box-number">
                  10
<%--                          <small>%</small>--%>
                </span>
              </div>
              <!-- /.info-box-content -->
            </div>
            <!-- /.info-box -->
          </div>
          <!-- /.col -->
          <div class="col-12 col-sm-6 col-md-3">
            <div class="info-box mb-3">
              <span class="info-box-icon bg-danger elevation-1"><i class="fas fa-thumbs-up"></i></span>

              <div class="info-box-content">
                <span class="info-box-text">Total 100%</span>
                <span id="totalHundredPercentCard" class="info-box-number">0</span>
              </div>
              <!-- /.info-box-content -->
            </div>
            <!-- /.info-box -->
          </div>
          <!-- /.col -->

          <!-- fix for small devices only -->
          <div class="clearfix hidden-md-up"></div>

          <div class="col-12 col-sm-6 col-md-3">
            <div class="info-box mb-3">
              <span class="info-box-icon bg-warning elevation-1"><i class="fas fa-money-bill-alt"></i></span>

              <div class="info-box-content">
                <span class="info-box-text">Contract Amount</span>
                <span id="totalContractAmountCard" class="info-box-number">0 </span>
              </div>
              <!-- /.info-box-content -->
            </div>
            <!-- /.info-box -->
          </div>
          <!-- /.col -->
          <div class="col-12 col-sm-6 col-md-3">
            <div class="info-box mb-3">
              <span class="info-box-icon bg-success elevation-1"><i class="fas fa-users"></i></span>

              <div class="info-box-content">
                <span class="info-box-text">Beneficiaries</span>
                <span id="totalBeneficiariesCard" class="info-box-number">0</span>
              </div>
              <!-- /.info-box-content -->
            </div>
            <!-- /.info-box -->
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->

        <!-- Main row -->
        <div class="row">
          <!-- Left col -->
          <div class="col-md-8">
            <!-- MAP & BOX PANE -->
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Map</h3>

                <div class="card-tools">
                  <button type="button" class="btn btn-tool" data-toggle="tooltip" data-placement="top" title="Zoom to Full Extent" onclick="resetMapSetting()">
                    <i class="fas fa-atlas"></i>
                  </button>
                  <button type="button" class="btn btn-tool" data-card-widget="collapse">
                    <i class="fas fa-minus"></i>
                  </button>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body p-0">
                <div class="d-md-flex">
                  <div class="p-1 flex-fill" style="overflow: hidden">
                    <!-- Map will be created here -->
                    <div id="mapDiv" style="height: auto; overflow: hidden">

                    </div>
                  </div>
                </div><!-- /.d-md-flex -->
              </div>
              <!-- /.card-body -->
            </div>
          </div>
          <!-- /.col -->
          <!-- Right col -->
          <div class="col-md-4">
            <!-- TABLE: LATEST ORDERS -->
            <div class="card">
              <div class="card-header border-transparent">
                <h3 class="card-title">Attribute Table</h3>

                <div class="card-tools">
                  <button type="button" class="btn btn-tool" data-card-widget="collapse">
                    <i class="fas fa-minus"></i>
                  </button>
                  <%--                  <button type="button" class="btn btn-tool" data-card-widget="remove">--%>
                  <%--                    <i class="fas fa-times"></i>--%>
                  <%--                  </button>--%>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
                <div class="table-responsive" id="tableDiv" style="height:auto;">
                  <table id="exampleJ"  class="table table-striped" >
                    <thead>
                    <tr>
                      <th>Scheme</th>
                      <th>Code</th>
                      <th>Status</th>
                      <th>FIP</th>
                    </tr>
                    </thead>
                    <tbody id="tbody">

                    </tbody>
                    <%--                    <tfoot>--%>
                    <%--                    <tr>--%>
                    <%--                      <th>Scheme</th>--%>
                    <%--                      <th>Code</th>--%>
                    <%--                      <th>Status</th>--%>
                    <%--                      <th>FIP</th>--%>
                    <%--                    </tr>--%>
                    <%--                    </tfoot>--%>
                  </table>
                  <%--                </div>--%>
                  <!-- /.table-responsive -->
                </div>
                <!-- /.card-body -->
                <%--              <div class="card-footer clearfix">--%>
                <%--                <a href="javascript:void(0)" class="btn btn-sm btn-info float-left">Reset All</a>--%>
                <%--                <a href="javascript:void(0)" class="btn btn-sm btn-secondary float-right">View All</a>--%>
                <%--              </div>--%>
                <!-- /.card-footer -->
              </div>
              <!-- /.card -->
            </div>
          </div>

          <!-- /.col -->
        </div>
        <!-- /.row -->
        <!-- 2nd row -->
        <div class="row">
          <!-- All col -->
          <div class="col-md-12">
            <!-- BAR CHART -->
            <div class="card">
              <div class="card-header">
                <h3 class="card-title" id="headingBarChartDiv">Schemes Bar Chart</h3>

                <div class="card-tools">
                  <button type="button" class="btn btn-tool" data-card-widget="collapse">
                    <i class="fas fa-minus"></i>
                  </button>
                </div>
              </div>
              <div class="card-body">
                <div class="chart">
                  <canvas id="barChart" style="min-height: 250px; height: 250px; max-height: 250px; max-width: 100%;"></canvas>
                </div>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->

          </div>
          <!-- /.col -->
        </div>
        <!-- 3rd row -->
        <div class="row">
          <!-- All col -->
          <div class="col-md-6">
            <!-- Pie CHART -->
            <div id="pieCardDiv" class="card" style="display: none">
              <div class="card-header">
                <h3 class="card-title" id="headingPieChartDiv">Beneficiaries</h3>

                <div class="card-tools">
                  <button type="button" class="btn btn-tool" data-card-widget="collapse">
                    <i class="fas fa-minus"></i>
                  </button>
                </div>
              </div>
              <div class="card-body">
                <div class="chart">
                  <canvas id="pieChart" style="min-height: 250px; height: 250px; max-height: 250px; max-width: 100%;"></canvas>
                </div>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->

          </div>
          <div class="col-md-6">
            <!-- Doughnut CHART -->
            <div id="doughnutCardDiv" class="card" style="display: none">
              <div class="card-header">
                <h3 class="card-title" id="headingDoughnutChartDiv">Agriculture Land (Hectors)</h3>

                <div class="card-tools">
                  <button type="button" class="btn btn-tool" data-card-widget="collapse">
                    <i class="fas fa-minus"></i>
                  </button>
                </div>
              </div>
              <div class="card-body">
                <div class="chart">
                  <canvas id="doughnutChart" style="min-height: 250px; height: 250px; max-height: 250px; max-width: 100%;"></canvas>
                </div>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->

          </div>
          <!-- /.col -->
        </div>
      </div>
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->

  <!-- Control Sidebar -->
  <aside class="control-sidebar control-sidebar-dark">
    <!-- Control sidebar content goes here -->
  </aside>
  <!-- /.control-sidebar -->

  <!-- Main Footer -->
  <footer class="main-footer">
    <strong>Copyright &copy; 2022-2023 <a href="https://ndrmf.pk">NDMRF.PK</a>.</strong>
    All rights reserved.
    <div class="float-right d-none d-sm-inline-block">
      <b>NDRMF </b>Team
    </div>
  </footer>
</div>
<!-- ./wrapper -->

<!-- REQUIRED SCRIPTS -->
<!-- jQuery -->
<script src="<c:url value='/webResources/plugins/jquery/jquery.min.js'/>"></script>
<!-- Bootstrap -->
<script src="<c:url value='/webResources/plugins/bootstrap/js/bootstrap.bundle.min.js'/>"></script>
<!-- overlayScrollbars -->
<script src="<c:url value='/webResources/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js'/>"></script>
<!-- ChartJS -->
<script src="<c:url value='/webResources/plugins/chart.js/Chart.min.js'/>"></script>
<!-- AdminLTE App -->
<script src="<c:url value='/webResources/js/adminlte.js'/>"></script>

<!-- PAGE PLUGINS -->
<!-- jQuery Mapael -->
<script src="<c:url value='/webResources/plugins/jquery-mousewheel/jquery.mousewheel.js'/>"></script>
<script src="<c:url value='/webResources/plugins/raphael/raphael.min.js'/>"></script>
<script src="<c:url value='/webResources/plugins/jquery-mapael/jquery.mapael.min.js'/>"></script>
<!-- ChartJS -->
<script src="<c:url value='/webResources/plugins/chart.js/Chart.min.js'/>"></script>

<!-- DataTables  & Plugins -->
<script src="<c:url value='/webResources/plugins/datatables/jquery.dataTables.min.js'/>"></script>
<script src="<c:url value='/webResources/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js'/>"></script>
<script src="<c:url value='/webResources/plugins/datatables-responsive/js/dataTables.responsive.min.js'/>"></script>
<script src="<c:url value='/webResources/plugins/datatables-responsive/js/responsive.bootstrap4.min.js'/>"></script>
<script src="<c:url value='/webResources/plugins/datatables-buttons/js/dataTables.buttons.min.js'/>"></script>
<script src="<c:url value='/webResources/plugins/datatables-buttons/js/buttons.bootstrap4.min.js'/>"></script>
<script src="<c:url value='/webResources/plugins/jszip/jszip.min.js'/>"></script>
<script src="<c:url value='/webResources/plugins/pdfmake/pdfmake.min.js'/>"></script>
<script src="<c:url value='/webResources/plugins/pdfmake/vfs_fonts.js'/>"></script>
<script src="<c:url value='/webResources/plugins/datatables-buttons/js/buttons.html5.min.js'/>"></script>
<script src="<c:url value='/webResources/plugins/datatables-buttons/js/buttons.print.min.js'/>"></script>
<script src="<c:url value='/webResources/plugins/datatables-buttons/js/buttons.colVis.min.js'/>"></script>


<!-- ARC GIS Javascript API -->
<script src="https://js.arcgis.com/4.24/"></script>

<script src="<c:url value='/webResources/js/TOC_4xx.js'/>"></script>

<!-- AdminLTE -->
<script src="<c:url value='/webResources/js/demo.js'/>"></script>
<!-- AdminLTE dashboard demo (This is only for demo purposes) -->
<script src="<c:url value='/webResources/mainjs/main.js'/>"></script>

<script>

  $(document).ready(function() {
    // $('#mapDiv').css({
    //   height: $(document).height()
    // });
    $("#mapDiv").css("height", 440);
    $("#tableDiv").css("height", 407);
    onLoadMap();
  });
  document.addEventListener('fullscreenchange', exitHandler)
  document.addEventListener('webkitfullscreenchange', exitHandler)
  document.addEventListener('mozfullscreenchange', exitHandler)
  document.addEventListener('MSfullscreenchange', exitHandler)
  function exitHandler() {
    if(!document.fullscreenElement && !document.webkitIsFullScreen &&
            !document.mozFullScreen && !document.msFullScreenElement){
      $("#mapDiv").css("height", 440);
      $("#tableDiv").css("height", 407);
    }
  }

</script>

</body>
</html>



