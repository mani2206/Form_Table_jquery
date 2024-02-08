$('document').ready(function(){
    // toastr
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

    // variable declaration 
    var alphabets = /^[A-Za-z]+$/;
    var emailVerify = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var inputValue =['firstname','lastname','email','comment','city'];
   
    // keyup function 
    $.each(inputValue,(index,item)=>{
        $('#'+item).on('keyup blur change',function (){
            if(item == 'firstname'){
                firstNameValidation($(this),alphabets);
            }else if(item == 'lastname'){
                lastNameValidation($(this),alphabets);
            } else if(item == 'email'){
                emailValidation($(this),emailVerify);
            }else if(item == 'comment'){
                commentValidation($(this));
            }else if(item == 'city'){
                cityValidation($(this));
            }
        })
    });

    $('.gender-check').on("change",function(){
        genderValidation($(this));
    })

    $('.checkbox').on("change",function(){
        courseValidation($(this));
    })

    // submit function 
    $("#submit").click(function(e){
        e.preventDefault();
        
        let error = 0;
        $.each(inputValue, function (index, item) {
            error += emptyValidation('#'+item);
        })
        genderValidation('.gender-check');
        courseValidation('.checkbox');   

        let formValid=  firstNameValidation($(this),alphabets) &&
        lastNameValidation($(this),alphabets)&&
        emailValidation($(this),emailVerify)&&
        commentValidation($(this))&&
        cityValidation($(this))&&
        courseValidation($(this))&&    
        genderValidation($(this));    

        var tabledata = [];
        $.each(inputValue,function(index,item){
            tabledata.push($('#'+item).val());
        });
        console.log(tabledata);

        if(error==0 && formValid){
            $.each(tabledata,()=>{
                    $("tbody").append("<tr><td>" + tabledata[0] + "</td><td>" + tabledata[1] + "</td><td>" + tabledata[2] + "</td><td>"  + tabledata[3] + "</td><td>" + tabledata[4] + "</td></tr>");
            });
            toastr.success("Submit Success.");           
        }
        else{
            toastr.error("Please fill all the required fields.");
        }

    //    $("#first").text(tabledata[0]).append(tabledata[0]);
    //    $("#second").text(tabledata[1]).append(tabledata[1]);
    //    $("#third").text(tabledata[2]).append(tabledata[2]);
    //    $("#four").text(tabledata[3]).append(tabledata[3]);
    //    $("#five").text(tabledata[4]).append(tabledata[4]);
    
    });

    // reset function 
    $("#reset").click(function(e){
        clear();
        $('.error-message').text("");
    });

    // firstname function 
    function firstNameValidation (input,alphabets) {
        var error_message = $(input).attr("error-msg");
        var first_name = $(input).val();
        let error= 0;
        if(first_name == "") {
            $(input).addClass('is-invalid').removeClass('is-valid') ;
            $(input).closest('.form-group').find('small').text(error_message + ' can not be empty.');
            error++;
        }
        else if(!alphabets.test(first_name)){
            $(input).addClass('is-invalid').removeClass('is-valid') ;
            $(input).closest('.form-group').find('small').text(error_message + ' must be alphabets.');
            error++;
        }
        else{
            $(input).addClass('is-valid').removeClass('is-invalid');
            $(input).closest('.form-group').find('small').text('');
            error=0;
        }
        return error;
    }
    // lastname function
    function lastNameValidation (input,alphabets) {
        var error_message = $(input).attr("error-msg");
        var last_name = $(input).val();
        let error =0;
        if(last_name == "") {
            $(input).addClass('is-invalid').removeClass('is-valid') ;
            $(input).closest('.form-group').find('small').text(error_message + ' can not be empty.');
            error++;
        }
        else if(!alphabets.test(last_name)){
            $(input).addClass('is-invalid').removeClass('is-valid') ;
            $(input).closest('.form-group').find('small').text(error_message + ' must be alphabets.');
            error++;
        }
        else{
            $(input).addClass('is-valid').removeClass('is-invalid');
            $(input).closest('.form-group').find('small').text('');
            error=0
        }
        return error;
    }
    // email function 
    function emailValidation (input,emailVerify) {
        var error_message = $(input).attr("error-msg");
        var email = $(input).val();
        let error =0;
        if(email == "") {
            $(input).addClass('is-invalid').removeClass('is-valid') ;
            $(input).closest('.form-group').find('small').text(error_message + ' can not be empty.');
            error++;
        }
        else if(!emailVerify.test(email)){
            $(input).addClass('is-invalid').removeClass('is-valid') ;
            $(input).closest('.form-group').find('small').text(error_message + ' is not valid.');
            error++;
        }
        else{
            $(input).addClass('is-valid').removeClass('is-invalid');
            $(input).closest('.form-group').find('small').text('');
            error=0;
        }
        return error;
    }
    // comments function 
    function commentValidation (input) {
        var error_message = $(input).attr("error-msg");
        var comment = $(input).val();
        let error = 0 ;
        if(comment == "") {
            $(input).addClass('is-invalid').removeClass('is-valid') ;
            $(input).closest('.form-group').find('small').text(error_message + ' is not valid.');
            error++
        }
        else{
            $(input).addClass('is-valid').removeClass('is-invalid');
            $(input).closest('.form-group').find('small').text('');
            error =0;
        }
        return error;
    }
    // city function 
    function  cityValidation (input) {
        var error_message = $(input).attr("error-msg");
        var comment = $(input).val();
        let error = 0;
        if(comment == "") {
            $(input).addClass('is-invalid').removeClass('is-valid') ;
            $(input).closest('.form-group').find('small').text(error_message + ' is not valid.');
            error++;
        }
        else{
            $(input).addClass('is-valid').removeClass('is-invalid');
            $(input).closest('.form-group').find('small').text('');
            error=0;
        }
        return error;
    }
    // gender function 
    function genderValidation(input){
        let error =0;
        if($(input).prop("checked")){
            $(input).closest('.form-group').find('small').text('');
            error++
        }
        else{
            $(input).closest('.form-group').find('small').text('Gender cannot be empty.');
            error=0;
        }
        return error;
    }
    // corse function 
    function courseValidation(input){
       let error =0;
        if($(input).prop("checked")){
            $(input).closest('.form-group').find('small').text('');
            error++;
        }
        else{
            $(input).closest('.form-group').find('small').text('Course cannot be empty.');
            error =0;
        }
        return error;
    }
    // empty validation 
    function emptyValidation(input) {
        var error_message = $(input).attr("error-msg");
        var inputField = $(input).val();
        let error=0;
        if(inputField == "") {
            $(input).addClass('is-invalid').removeClass('is-valid') ;
            $(input).closest('.form-group').find('small').text(error_message + ' cannot be empty.');
            error++;
        }
        else{
            $(input).addClass('is-valid').removeClass('is-invalid');
            $(input).closest('.form-group').find('small').text('');
            error=0;
        }
        return error;
    }
    // clear function 
    function clear() {
        $.each(inputValue,(index,item)=>{
            $('#'+item).val('');
            $('#'+item).removeClass('is-valid is-invalid') ;
            $('#'+item).closest('.form-group').find('small').text('');
        
        });
    }

});

