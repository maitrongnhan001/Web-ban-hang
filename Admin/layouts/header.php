<?php
include('../config/connect.php');
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/style.css">
    <title>Home</title>
</head>

<body>
    <!--menu-->
    <section class="menu text-center">
        <div class="container">
            <ul>
                <li><a href=<?php echo URL."admin/index.php"; ?>>Trang Chủ</a></li>
                <li><a href=<?php echo URL."admin/manager-admin.php"; ?>>Nhân Viên</a></li>
                <li><a href=<?php echo URL."admin/manager-categories.php"; ?>>Danh Mục</a></li>
                <li><a href=<?php echo URL."admin/manager-products.php"; ?>>Sản Phẩm</a></li>
                <li><a href=<?php echo URL."admin/manager-order.php?filter=1" ?>>Đơn Hàng</a></li>
                <li><a href="#">Đăng Xuất</a></li>
            </ul>
        </div>
    </section>