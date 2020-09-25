import React, { useState } from "react";
import ImageUploader from "react-images-upload";
import $ from "jquery";

function AddImage() {
  var [selectedFile, setSelectedFile] = useState();
  function getImage() {
    var fd = new FormData();
    var files = $("#file1")[0].files[0];
    fd.append("file", files);
    console.log(fd);
    console.log(Object.key(fd));
  }

  return (
    <div>
      <script
        src="https://code.jquery.com/jquery-3.5.1.js"
        integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc="
        crossorigin="anonymous"
      ></script>
      <input type="file" id="file1" />
      <input type="button" onClick={getImage} defaultValue="here" />
    </div>
  );
}
export default AddImage;
