$(document).ready(function(){
    var list_data_user_name;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange=function(){
        if (xhttp.readyState == 4 && xhttp.status == 200){
          list_data_user_name = xhttp.responseText;
          var data_users = JSON.parse(list_data_user_name);
          let str = "";
          for(var i = 0 ; i < data_users.length ; i++) {
            str += "<tr> <td style='vertical-align: middle' >"+ data_users[i]['username'] +"</td> <td><button class=' w3-button w3-black w3-medium w3-round-large'><a href='/admin/delete_acc/"+ data_users[i]['id'] +"'>Xóa Quyền Admin</a></button></td> </tr>";
          }
          $('#list_users').html(str);
        }
    }
    xhttp.open("GET","http://192.168.118.17:3000/admin/view_all");
    xhttp.send();
  });