
//johnsuarez


$(function(){

  getProducts();

  $(document).on('submit', '#frmProducts', function(e){
    e.preventDefault();

    $.ajax({
      url :        base_url + 'products/saveProduct',
      type:        'POST',
      data:        new FormData(this),
      contentType: false,
      cache:       false,
      processData: false,
      dataType:    'JSON',
      beforeSend: function(){

      },
      success: function(data){
        message_alert($('#prodMessage'), data.message, data.type);
        if (data.status == 1) {
          $('#reset').trigger('click');
          getProducts();
        }
      }
    })
  })

  function getProducts(){
    $.ajax({
      url :        base_url + 'products/getProducts',
      dataType:    'JSON',
      beforeSend: function(){

      },
      success: function(data){
        var html = "<table class=\"table table-hover table-bordered\" id=\"tblProducts\">" +
                   "<thead>" +
                   "<tr class=\"info\">" +
                   "<th>Product Code</th>" +
                   "<th>Product Name</th>" +
                   "<th>Product Price</th>" +
                   "<th>Remaining Stock</th>" +
                   "<th>Action</th>" +
                   "</tr>" +
                   "</thead>" +
                   "<tbody>";
        if (data != null) {
          for (var i = 0; i < data.length; i++) {
            html += "<tr>" +
                    "<td>"+data[i].product_code+"</td>" +
                    "<td>"+data[i].product_name+"</td>" +
                    "<td class=\"text-right\">"+data[i].price+"</td>" +
                    "<td class=\"text-right\">"+data[i].stock+"</td>" +
                    "<td><button class=\"btn btn-primary btnEdit\" data-id=\""+data[i].id+"\">Edit</button> " +
                    "<button class=\"btn btn-danger btnDelete\" data-id=\""+data[i].id+"\">Delete</button></td>" +
                    "</tr>";
          }
        }
           html += "</tbody>" +
                   "</table>";

        $("#tblContainer").html(html);
        $("#tblProducts").dataTable();
      }
    })
  }

  $(document).on('click', '.btnDelete', function(){
    var prodId = $(this).attr('data-id');
    $.ajax({
      url :        base_url + 'products/deleteProduct',
      type:        'POST',
      data:        {'prodID' : prodId},
      dataType:    'JSON',
      beforeSend: function(){

      },
      success: function(data){
        message_alert($('#prodMessage'), data.message, data.type);
        getProducts();
      }
    })
  });

  $(document).on('click', '.btnEdit', function(){
    var prodId = $(this).attr('data-id');
    $.ajax({
      url :        base_url + 'products/getProduct',
      type:        'POST',
      data:        {'prodID' : prodId},
      dataType:    'JSON',
      beforeSend: function(){

      },
      success: function(data){
        if (data != null) {
          $("#prodName").val(data.product_name);
          $("#prodCode").val(data.product_code);
          $("#prodPrice").val(data.price);
          $("#prodStock").val(data.stock);
          $("#prodID").val(data.id);
        }
      }
    })
  });

  $(document).on('click', '#reset', function(){
    $("#prodName").val('');
    $("#prodCode").val('');
    $("#prodPrice").val('');
    $("#prodStock").val('');
    $("#prodID").val('');
  })

  function message_alert(object, message, messageType){
    var html = "<div class=\"alert alert-"+messageType+"\">"+message+"</div>";
    $(object).html(html);
    $(object).slideDown();
    setTimeout(function(){
      $(object).slideUp();
    }, 5000);
  }
})
