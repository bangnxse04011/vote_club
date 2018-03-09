$(document).ready(function(){
    var list_data_user_name;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange=function(){
        if (xhttp.readyState == 4 && xhttp.status == 200){
          list_data_user_name = xhttp.responseText;
          var data_users = JSON.parse(list_data_user_name);
          let str = "";
          let str_header = "<tr><th>Tên người dùng</th> <th></th></tr>";
          let status = $('#status').text();
          if(status == '-1' || status == -1) {
            for(var i = 0 ; i < data_users.length ; i++) {
              if(data_users[i] != null && data_users[i]['username'] != null && data_users[i]['username'] != '') {
                str += "<tr><td style='vertical-align: middle' >"+ data_users[i]['username'] +"</td> <td><button class=' w3-button w3-black w3-medium w3-round-large'><a href='/admin/delete_acc/"+ data_users[i]['id'] +"'>Xóa Quyền Admin</a></button></td> </tr>";
              }
            }
          } else {
            for(var i = 0 ; i < data_users.length ; i++) {
              if(data_users[i] != null &&  data_users[i]['username'] != null && data_users[i]['username'] != '') {
                str += "<tr><td style='vertical-align: middle' >"+ data_users[i]['username'] +"</td></tr>";
              }
            }
          }
          str_header += str;
          $('#list_users').html(str_header);
        }
    }
    xhttp.open("GET","https://miconshow.com/admin/view_all");
    xhttp.send();
  });