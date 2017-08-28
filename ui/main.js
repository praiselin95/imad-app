console.log('Loaded!');
var username=document.getElementById('username');
var password=document.getElementById('password');
var submit=document.getElementById('submit')

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
    submit.onclick=function(){
    var request=new XMLHttpRequest();
    request.onreadystatechange=function(){
        if(request.readyState===XMLHttpRequest.DONE){
            if(request.status===200){
                var username=request.responseText;
                 var password=request.responseText;
            }
        }
    };
   /* request.open('GET','http://praiselinvictor.imad.hasura-app.io/counter',true);*/
    request.open('GET','http://praiselinvictor.imad.hasura-app.io/user',true);
    
  
    request.send(null);
};