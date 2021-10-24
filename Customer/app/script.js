//check input for form add-admin
function CheckUserName(UserName) {
    //check name is valid?
    const check = UserName.search(/\W/i);
    return (check === -1) ? true : false;
}

function CheckPassword(Password) {
    //check password is valid
    let status = 0;
    //haven't space
    if (Password.search(' ') !== -1) {
        return 0;
    }
    //length >= 8
    if (Password.length >= 8) {
        status++;
    }
    //have special characters
    if (Password.search(/\W/) !== -1) {
        status++;
    }
    //have number
    if (Password.search(/\d/) !== -1) {
        status++;
    }
    return status;
}

function CheckPhone(Phone) {
    //the first element is zero
    if (Phone[0] == 0 && (Phone.length === 10)) {
        return true;
    }
    return false;
}

function CheckSubmit() {
    //check all
    const UserName = $('input[name="username"]').val();
    const Password = $('input[name="password"]').val();
    const Phone = $('input[name="phone"]').val();
    if (CheckUserName(UserName) && (CheckPassword(Password) > 0) && CheckPhone(Phone)) {
        $('#register').removeAttr('disabled');
    } else {
        $('#register').prop('disabled', 'true');
    }
}

$('document').ready(() => {
    $('input[name="username"]').change(() => {
        //chck username
        const UserName = $('input[name="username"]').val();
        if (CheckUserName(UserName)) {
            $('#nofi-1').text("");
        } else {
            $('#nofi-1').text("Không đúng định dạng.");
        }
        CheckSubmit();
    });

    $('input[name="password"]').change(() => {
        //check password
        const Password = $('input[name="password"]').val();
        const status = CheckPassword(Password);
        switch (status) {
            case 0:
                $('#nofi-2').removeAttr('class');
                $('#nofi-2').addClass('red');
                $('#nofi-2').text('quá yếu');
                break;
            case 1:
                $('#nofi-2').removeAttr('class');
                $('#nofi-2').addClass('orange');
                $('#nofi-2').text('yếu');
                break;
            case 2:
                $('#nofi-2').removeAttr('class');
                $('#nofi-2').addClass('green');
                $('#nofi-2').text('Trung bình');
                break;
            case 3:
                $('#nofi-2').removeAttr('class');
                $('#nofi-2').addClass('green');
                $('#nofi-2').text('Mạnh');
                break;
        }
        CheckSubmit();
    });

    $('input[name="r-password"]').change(() => {
        //check confirm password
        const r_password = $('input[name="r-password"]').val();
        const password = $('input[name="password"]').val();
        if (r_password !== password) {
            $('#nofi-3').text("Không trùng khớp.");
            $('#register').prop('disabled', 'true');
        } else {
            $('#nofi-3').text("");
            $('#register').removeAttr('disabled');
        }
    });

    $('input[name="phone"]').change(() => {
        //check Phone
        const Phone = $('input[name="phone"]').val();
        if (CheckPhone(Phone)) {
            $('#nofi-4').text("");
        } else {
            $('#nofi-4').text("không đúng định dạng");
        }
        CheckSubmit();
    });

    $('input[name="qty"]').change(() => {
        //show total price
        const price = $('input[name="price"]').val();
        let quality = $('input[name="qty"]').val();
        if ($('input[name="qty"]').val() <= 0) {
            quality = 0;
            $('#nofi-1').text('Số lượng phải lớn hơn 0');
            $('#submit-order').prop('disabled', 'true');
            return;
        }
        $('#submit-order').removeAttr('disabled');
        const total_price = price * quality;
        $('#rt').text('VNĐ: ' + total_price);
    });

    //controll address
    $('#btn-new-address').click((e) => {
        e.preventDefault();
        $('input[name="address"]').prop('checked', false);
        $('#group-current-address').addClass('hide');
        $('input[name="address"]').prop('required', false);
        $('input[name="new-address"]').attr('required');
        $('#group-new-address').removeClass('hide');
    });

    $('#btn-current-address').click((e) => {
        e.preventDefault();
        $("#ipn-new-address").val('');
        $('input[name="new-address"]').removeAttr('required')
        $('#group-current-address').removeClass('hide');
        $('input[name="address"]').prop('required', true);
        $('#group-new-address').addClass('hide');
    });

    //load product
    $('#load-product').click((e) => {
        $.ajax('http://localhost:8000/api/foods', {
            success: (data, status, xhr) => {
                //render to display
                const list_product = data.data;
                if (list_product.length > 0) {
                    $('#clearfix-load').remove();
                    $('#load-product').remove();
                }

                for (let i = 0; i < list_product.length; i++) {
                    $('#list-product-menu .container').append(
                        `<div class="product-menu-box">
                            <div class="product-menu-img">
                                <img src=${list_product[i].image_name} alt="${list_product[i].food_name}" class="img-responsive img-curve">
                            </div>
                            <div class="product-menu-desc">
                                <h4>${list_product[i].food_name}</h4>
                                <p class="product-price">${list_product[i].price}</p>
                                <p class="product-detail">${list_product[i].description}</p>
                                <br>
        
                                <a href='http://localhost/B1805899_MTNhan/Customer/order.php?id='${list_product[i].id}' class="btn btn-primary">Mua ngay</a>
                            </div>
                        </div>`
                    );
                }

                $('#list-product-menu .container').append('<div id="clearfix-load" class="clearfix"></div>');
                $('#list-product-menu .container').append('<p id="load-product" class="text-center pink">Xem thêm sản phẩm</p>');
            }
        });
    });
});