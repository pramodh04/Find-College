

document.getElementById("minpackage").addEventListener("input",(e)=>{
    document.getElementById("minpacklabel").innerHTML =
    e.target.value + "Lacs";
});

document.getElementById("maxFees").addEventListener("input",(e)=>{
    document.getElementById("maxfeelabel").innerHTML =
    e.target.value + "Lacs";
})

const debounce = (func,delay) =>{
let timer;
const debounced =() =>{
    clearTimeout(timer);
   
    timer = setTimeout(func,delay);
}
return debounced;
}

const results = document.querySelector("#results");
let colleges;
async function getdata()
{
   const formdata={};
   const inputs = document.querySelectorAll("input");
   inputs.forEach((input)=>{
    formdata[input.id] = input.value;
   })
   const response = await fetch("https://find-college-accio.herokuapp.com/findColleges",{
       method:"POST",
       headers:{
           "Content-Type":"application/json",
       },
       body :JSON.stringify(formdata)
   });
  colleges = await response.json();
  results.innerHTML = " " 
  colleges.forEach((college,i)=>{
results.innerHTML += ` <li class="list-group-item list-group-item-action" data-index=${i}>${college.name}</li>`
  })
  
}

results.addEventListener("click",(e)=>{
  const li = e.target;
  const collegeindex = li.dataset.index;
  document.querySelectorAll(".list-group-item").forEach(item =>{
    item.classList.remove("active")
  });
 
  li.classList.add("active");
  const college = colleges[collegeindex];
  const list = document.querySelector(".list-group-flush");
  list.innerHTML = "";
  document.querySelector(".card-title").innerHTML = college.name;
  Object.keys(college).forEach((key)=>{
      list.innerHTML += `<li class="list-group-item"> <strong>${key}</strong>: ${college[key]}</li>`;
  })
})

document.querySelector("form").addEventListener("input",debounce(getdata,300));