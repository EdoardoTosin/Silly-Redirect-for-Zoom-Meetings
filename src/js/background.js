
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

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#toggle').addEventListener('change', changeElem);
});
/*
function changeState(){
  document.getElementById('toggle').addEventListener("change", changeElem());
};
*/
function changeLocal(){
  if (localStorage.getItem("toggleStatus")=="true"){
    // Unused conditions: localStorage.getItem("toggleStatus")==undefined || localStorage.getItem("toggleStatus")===null
    localStorage.setItem("toggleStatus", true);
    document.getElementById('toggle').setAttribute("checked","");
  }
  else if (localStorage.getItem("toggleStatus")=="false"){
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
    if (window.location.pathname.substring(0,3) == "/j/" && localStorage.getItem('toggleStatus')=="true") {
      const domain = window.location.hostname;
      const path = "/wc/join/" + window.location.pathname.substring(3);
      window.location.href = "https://" + domain + path;
    }
})();
