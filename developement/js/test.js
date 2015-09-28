window.onload = function(){
  var container = document.createElement('div'); 
  container.setAttribute("id", "container");
  container.innerHTML = 'Das ist der per JS erzeugte Container:';
  document.body.appendChild(container);
  var json = document.getJSON("json/example.json");
  var firstChild = json[0];
  var newContent = document.createTextNode(firstChild); 
  container.appendChild(newContent);
};

