$('document').ready(function(){

    // toastr option 
    toastr.options = {
        "closeButton": "true",
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": 300,
        "hideDuration": 1000,
        "timeOut": 5000,
        "extendedTimeOut": 1000,
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    // firstname function 
    function firstNameValidation () {
            var first_name = $('#firstname').val();
            var alphabets = /^[A-Za-z]+$/;
            if(first_name == "") {
                $('#firstname').addClass('is-invalid').removeClass('is-valid') ;
                $('#firstname').closest('.form-group').find('small').text('First Name can not be empty.');
            }
            else if(!alphabets.test(first_name)){
                $('#firstname').addClass('is-invalid').removeClass('is-valid') ;
                $('#firstname').closest('.form-group').find('small').text('First Name must be alphabets.');
            }
            else{
                $('#firstname').addClass('is-valid').removeClass('is-invalid');
                $('#firstname').closest('.form-group').find('small').text('');
                return true;
            }
    }

    // lastname function
    function lastNameValidation() {
        var last_name = $("#lastname").val();
        var alphabets = /^[A-Za-z]+$/;
        if(last_name == "") {
            $('#lastname').addClass('is-invalid').removeClass('is-valid') ;
            $('#lastname').closest('.form-group').find('small').text('Last Name can not be empty.');
        }
        else if(!alphabets.test(last_name)){
            $('#lastname').addClass('is-invalid').removeClass('is-valid') ;
            $('#lastname').closest('.form-group').find('small').text('Last Name must be alphabets.');
        }
        else{
            $('#lastname').addClass('is-valid').removeClass('is-invalid');
            $('#lastname').closest('.form-group').find('small').text('');
            return true;
        }
    }

    // email function 
    function emailValidation () {
        var email = $('#email').val();
        var emailVerify =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(email == "") {
            $('#email').addClass('is-invalid').removeClass('is-valid') ;
            $('#email').closest('.form-group').find('small').text('Email can not be empty.');
        }
        else if(!emailVerify.test(email)){
            $('#email').addClass('is-invalid').removeClass('is-valid') ;
            $('#email').closest('.form-group').find('small').text('Email is not valid.');
        }
        else{
            $('#email').addClass('is-valid').removeClass('is-invalid');
            $('#email').closest('.form-group').find('small').text('');
            return true;
        }
        
    }

    // gender validation   
    function genderValidation(){
        var genderCheck =$('input[name="gender"]:checked').val();
        if(genderCheck == undefined){
            $('.error-message').text('Gender cannot be empty.');
        }
        else{
            $('.error-message').text('');
            return true;
        }
    } 

    // course validation 
    function checkboxValiation() {
        var courseCheck =$('input[name="list"]:checked').val();
        if(courseCheck == undefined){
            $('.course').text('Course cannot be empty.');
        }
        else{
            $('.course').text('');
            return true;
        }
    
    }

    // comments function 
    function commentValidation () {
        var comment = $('#comment').val();
        if(comment == "") {
            $('#comment').addClass('is-invalid').removeClass('is-valid') ;
            $('#comment').closest('.form-group').find('small').text('Comment is can not be empty.');
        }
        else{
            $('#comment').addClass('is-valid').removeClass('is-invalid');
            $('#comment').closest('.form-group').find('small').text('');
            return true;
        }
    }

    // city function 
    function  cityValidation () {
        var cityValue = $('#city').val();
        if(cityValue == "") {
            $('#city').addClass('is-invalid').removeClass('is-valid') ;
            $('#city').closest('.form-group').find('small').text('City cannot be empty.');
        }
        else{
            $('#city').addClass('is-valid').removeClass('is-invalid');
            $('#city').closest('.form-group').find('small').text('');
            return true;
        }
    }

    var inputValue =['firstname','lastname','email','comment','city'];
    // keyup function 
    $.each(inputValue,(index,item)=>{
        $('#'+item).on('keyup blur change',function (){
            if(item == 'firstname'){
                firstNameValidation();
            }else if(item == 'lastname'){
                lastNameValidation();
            } else if(item == 'email'){
                emailValidation();
            }else if(item == 'comment'){
                commentValidation();
            }else if(item == 'city'){
                cityValidation();
            }
        })
    });
    
    $('.gender-check').on("change",function(){
        genderValidation();
    });

    $('.checkbox').on("change",function(){
        checkboxValiation();
    });


    $('#submit').click(function(e){
        e.preventDefault();
        firstNameValidation();
        lastNameValidation();
        emailValidation();
        genderValidation();
        checkboxValiation();
        commentValidation();
        cityValidation();

        var validate = firstNameValidation() && 
        lastNameValidation() &&
        emailValidation() &&
        genderValidation()&&
        checkboxValiation()&&
        commentValidation()&&
        cityValidation();

        if (validate == true) {
            toastr.success("Succesfully");
        } else {
            toastr.error("Please filled all fileds")        
        }

        var first_name=$('#firstname').val();
        var last_name=$('#lastname').val();
        var email=$('#email').val();
        var comments=$('#comment').val();
        var city=$('#city').val();

        if(first_name!="" && last_name !="" && email!="" && comments!="" && city!=""){
            $('tbody').append('<tr><td>'+first_name+'</td><td>'+last_name+
            '</td><td>'+email+'</td><td>'+comments+'</td><td>'+city+'</td></tr>');
        }

    });
        
    // reset function 
    $("#reset").click(function(e){
        clear();
        $('.error-message').text("");
        $('.course').text("");
    });

     // clear function 
     function clear() {
        $.each(inputValue,(index,item)=>{
            $('#'+item).val('');
            $('#'+item).removeClass('is-valid is-invalid') ;
            $('#'+item).closest('.form-group').find('small').text('');
        });
    }

});