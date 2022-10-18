<template>
  <div class="mb-3">
    <label for="formFile" class="form-label">Default file input example</label>
    <input
      class="form-control"
      type="file"
      @change="handleFileSelect"
      id="formFile"
    />
  </div><br>
  <textarea name="" id="base64" rows="10" v-model="file"></textarea>
</template>

<script setup>
const file = ref("");

function handleFileSelect(evt) {
  let f = evt.target.files[0]; // FileList object
  let reader = new FileReader();
  // Closure to capture the file information.
  reader.onload = (function (theFile) {
    return function (e) {
      let binaryData = e.target.result;
      //Converting Binary Data to base 64
      let base64String = window.btoa(binaryData);
      //showing file converted to base64
      file.value = base64String;
      alert("File converted to base64 successfuly!\nCheck in Textarea");
    };
  })(f);
  // Read in the image file as a data URL.
  reader.readAsBinaryString(f);
}
</script>
