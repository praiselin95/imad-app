console.log('Loaded!');
/*  var data = {};
data.username=document.getElementById('username');
data.password=document.getElementById('password');
$.ajax({
						type: 'POST',
						data: JSON.stringify({username:"praiselin",password:"password"}),
				        contentType: 'application/json',
                        url:'/create-user',						
                        success: function(data) {
                            console.log('success');
                            console.log(JSON.stringify(data));
                        }
                    });*/

var submit=document.getElementById("user_submit");

submit.onclick=function()
{
  alert("hi");
   var nameInput=document.getElementById("username");
   var name=nameInput.value;
  
   var pwdInput=document.getElementById("pwd");
   var pwd=pwdInput.value;
  
   
 $.ajax({
url:'/login',
contentType: "application/json",
data:JSON.stringify({username:name,password:pwd}),
type:'POST',
success:function(data){
console.log(data);
}
});
}


/*var button=document.getElementById('counter');*/
/*button.onclick=function(){
    var request=new XMLHttpRequest();
    request.onreadystatechange=function(){
        if(request.readyState===XMLHttpRequest.DONE){
            if(request.status===200){
                var counter=request.responseText;
                var span=document.getElementById('count');
                span.innerHTML=counter.toString();
            }
        }
    };*/
    
   /* request.open('GET','http://praiselinvictor.imad.hasura-app.io/counter',true);*/
 
				
   
    /*request.open('GET','http://praiselinvictor.imad.hasura-app.io/create-user',true);
    
  
    request.send(null);
};*/