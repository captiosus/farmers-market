$(document).ready(function(){
  console.log("hi");
})




var sendListing = function(){
  $.ajax({
    url:"/newlisting",
    data:{}
  })
}
Dropzone.options.picUpload = { // The camelized version of the ID of the form element

  // The configuration we've talked about above
  autoProcessQueue: false,
  uploadMultiple: true,
  parallelUploads: 4,
  maxFiles: 4,

  // The setting up of the dropzone
  init: function() {
    var myDropzone = this;

    // First change the button to actually tell Dropzone to process the queue.
    $("#submit-button").click( function(e) {
      // Make sure that the form isn't actually being sent.
      e.preventDefault();
      e.stopPropagation();
      myDropzone.processQueue();
    });

    this.on("sending", function(file, xhr, formData){
      formData.append('hello','hello');
      console.log('hello');
    })

    // Listen to the sendingmultiple event. In this case, it's the sendingmultiple event instead
    // of the sending event because uploadMultiple is set to true.
    this.on("sendingmultiple", function(files, xhr, formData) {
      // Gets triggered when the form is actually being sent.
      // Hide the success button or the complete form.
      console.log(files);
    });
    this.on("successmultiple", function(files, response) {
      // Gets triggered when the files have successfully been sent.
      // Redirect user or notify of success.
    });
    this.on("errormultiple", function(files, response) {
      // Gets triggered when there was an error sending the files.
      // Maybe show form again, and notify user of error
    });
  }

}
