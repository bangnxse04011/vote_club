$(document).ready(function(){
    var list_data_video;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange=function(){
        if (xhttp.readyState == 4 && xhttp.status == 200){
            list_data_video = xhttp.responseText;
          var data_video = JSON.parse(list_data_video);
          let str = "<option value>--Chọn video cần sửa--</option>";
          for(var i = 0 ; i < data_video.length ; i++) {
            str += "<option value='" + data_video[i]['id'] + "/" + data_video[i]['link_video'] + "'>" + data_video[i]['full_name'] + "</option>";
          }
          $('#link_video').html(str);
        }
    }
    xhttp.open("GET","http://localhost:3000/admin/managers/find_all");
    xhttp.send();

    /**
     * On combobox change
     */
    $('#link_video').change(function () {
        let data_video = $('#link_video').val();
        let data = data_video.split('/');
        $('#id').val(data[0]);
        let src = "<input class='w3-input' type='text' value='" + data[0] + "' name='id' style='display: none;' /><iframe id='show_video' width='100%' height='100%' src='https://www.youtube.com/embed/" + data[1] + "?modestbranding=1&autohide=1&showinfo=0&controls=0' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen></iframe>";
        $('#show_video').html(src);
    });
  });