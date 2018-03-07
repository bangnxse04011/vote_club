/**
 * Method invoke when page loaded
 */
$(document).ready(function(){
    var list_data_video_manager;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange=function(){
        if (xhttp.readyState == 4 && xhttp.status == 200){
          list_data_video_manager = xhttp.responseText;
          var data_video = JSON.parse(list_data_video_manager);
          let str = "";
          for(var i = 0 ; i < data_video.length ; i++) {
            str += "<option value='" + data_video[i]['link_video'] + "'/" + data_video[i]['id'] + ">" + data_video[i]['full_name'] + "</option>";
          }
          $('#link_video').html(str);
        }
    }
    xhttp.open("GET","http://45.124.65.190:3000/admin/managers/find_all");
    xhttp.send();

    $("#link_video".click(function () {

    }))
  });