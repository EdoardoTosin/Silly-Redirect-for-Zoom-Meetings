
//var checkbox = document.getElementById('toggle');
//var local = localStorage.getItem('toggleStatus');

function changeElem() {
  if (document.getElementById('toggle').checked){
    localStorage.setItem("toggleStatus", true);
    document.getElementById('toggle').setAttribute("checked","");
  }
  else{
    localStorage.setItem("toggleStatus", false);
    document.getElementById('toggle').removeAttribute("checked");
  }
};

function changeState(){
  document.getElementById('toggle').addEventListener("change", changeElem());
};

function changeLocal(){
  if ((typeof localStorage.getItem("toggleStatus")=== typeof undefined) || (localStorage.getItem("toggleStatus")===null) || (localStorage.getItem("toggleStatus")==true)){
    alert("True");
    localStorage.setItem("toggleStatus", true);
    document.getElementById('toggle').setAttribute("checked","");
  }
  else if (localStorage.getItem("toggleStatus")==false){
    alert("False");
    document.getElementById('toggle').removeAttribute("checked");
  }
};

/*
(function checkLocal(){
  localStorage.getItem('toggleStatus').addEventListener("change", changeLocal());
})();
*/

window.addEventListener("load", function(event) {
    console.log("Finished loading!");
    changeLocal();
});

window.addEventListener("storage", function () {
  //Check
}, false);

//Replace */j/* on zoom domain with */wc/join/*
(function redirect(){
    if (window.location.pathname.substring(0,3) == "/j/" && localStorage.getItem('toggleStatus') != false) {
      const domain = window.location.hostname;
      const path = "/wc/join/" + window.location.pathname.substring(3);
      window.location.href = "https://" + domain + path;
    }
})();
