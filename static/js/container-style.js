
    const uploadBtn = document.getElementById('upload-btn');
    const pictureContainer = document.getElementById('picture-container');
    const uploadLabel = document.getElementById('upload-label');
    const submitContainer = document.getElementById('submit-container');
    const submitBtn = document.getElementById('submit-btn');
    const resetBtn = document.getElementById('reset-btn');
    const picOutput = document.getElementById('picture-container-output'); 
    const formId = document.getElementById('form-id');
    const dlBtn = document.getElementById('dl');
    const outImg = document.getElementById('outimg');

$('body').on('submit','#form-id',function(e){
   e.preventDefault()
   var formData = new FormData(this);

   console.log(formData);
   $.ajax({
         url:'{% url "core:ajaxup" %}',
         type: 'POST',
         data: formData,
         success: function (response) {
            
            var piout = $('#picture-container-output')
            
            // var imgsrc = "<img id ='outimg' src = "+response.im+"/>";
            // piout.append(imgsrc);
            $('#outimg').attr('src',response.im);
            
            $('#dlimg').attr("href",response.im);
            piout.css('display','block');
            $('#outimg').css('display','block');
            $('#dl').css('display','block');
            if (response.im){
                $('#bg-img').css('display','block');
            }
            // $('#submit-btn').css('display','none');
         },
         error: function (response) {
         },
        cache: false,
        contentType: false,
        processData: false
   });
   
});
$('#bg-img').change(function(event) {
  var file = event.target.files[0];

  // Check if a file is selected
  if (file) {
    console.log('yes');
    var url = URL.createObjectURL(file);
    $('#picture-container-output').attr('style', 'background-image:url(' + url + ')');
    };
});

   
    uploadBtn.addEventListener('change', function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadstart = function() {
            // Show loading effect
            pictureContainer.style.backgroundImage = "none";
            pictureContainer.innerHTML = "Uploading...";
        };

        reader.onload = function(e) {
            pictureContainer.innerHTML = '';
            pictureContainer.style.backgroundImage = `url(${e.target.result})`;
            uploadLabel.style.display = 'none';
            pictureContainer.style.opacity = '1';
            submitContainer.style.display = 'block';
            resetBtn.style.display = 'block'
        };

        reader.readAsDataURL(file);
    });

    resetBtn.addEventListener('click', resetPage);

    function resetPage() {
        uploadBtn.value = ''; // Reset the file input value
        // uploadBtn.style.display='block';
        pictureContainer.innerHTML = ''; // Clear the image container
        pictureContainer.style.opacity = '0';
        uploadLabel.style.display = 'block';
        submitContainer.style.display = 'none';
        picOutput.style.display='none';
        picOutput.style.innerHTML='';
        resetBtn.style.display = 'none';
        dlBtn.style.display = 'none';
        pictureContainer.style.backgroundImage='';
        pictureContainer.style.display = 'block';
        outImg.src="";
        
        
    }

    window.onbeforeunload = function() {
        // Clear the file input value and image container on browser reload
        uploadBtn.value = '';
        pictureContainer.innerHTML = '';
       
    };




