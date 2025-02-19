let arr = JSON.parse(localStorage.getItem("arr")) || [];

function addTask() {
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let status = document.getElementById("status").value;
    
    let obj = { title, description, status };
    arr.push(obj);
    localStorage.setItem("arr", JSON.stringify(arr));
    refresh();
}

function editTask(index) {
    let task = arr[index];
    document.getElementById("title").value = task.title;
    document.getElementById("description").value = task.description;
    document.getElementById("status").value = task.status;
    
    let delButton = document.createElement("button");
    delButton.innerHTML = "Delete";
    delButton.className = "bg-red-400 hover:bg-red-600 text-white font-medium rounded-lg text-sm px-5 py-2.5";
    delButton.onclick = () => delTask(index);

    let buttons = document.getElementById("delbutton");
    if (buttons.firstChild) {
        buttons.firstChild.replaceWith(delButton); // Replace old button with new one
    } else {
        buttons.appendChild(delButton); // Add button if none exists
    }

    let addButton = document.querySelector("#crud-modal button[type='submit']");
    let newAddButton = addButton.cloneNode(true);
    newAddButton.textContent = "Update";
    newAddButton.className = "text-white bg-yellow-400 hover:bg-yellow-600 font-medium rounded-lg text-sm px-5 py-2.5";
    newAddButton.onclick = () => saveTask(index);

    addButton.replaceWith(newAddButton); // Replace old "Add" button with new "Update" button

    document.querySelector("[data-modal-target='crud-modal']").click();
}

function delTask(index) {
    let newArr = JSON.parse(localStorage.getItem("arr")) || [];
    newArr.splice(index, 1);
    localStorage.setItem("arr", JSON.stringify(newArr));
    refresh();
}

function saveTask(index) {
    arr[index].title = document.getElementById("title").value;
    arr[index].description = document.getElementById("description").value;
    arr[index].status = document.getElementById("status").value;
    
    localStorage.setItem("arr", JSON.stringify(arr));
    refresh();
    document.querySelector("[data-modal-toggle='crud-modal']").click();
}

function refresh(newArr = arr) {
    let div1 = document.getElementById("div1");
    let div2 = document.getElementById("div2");
    let div3 = document.getElementById("div3");
    
    div1.innerHTML = "";
    div2.innerHTML = "";
    div3.innerHTML = "";
    
    newArr.forEach((obj, index) => {
        let taskElement = document.createElement("div");
        taskElement.className = "cursor-pointer p-2 rounded-md shadow-md";
        taskElement.innerHTML = `<h1 class="font-bold text-lg">${obj.title}</h1>
                                 <p class="text-sm">${obj.description}</p>`;
        taskElement.draggable = true;
        taskElement.addEventListener("dragend",(event)=>{
            let rect1= div1.getBoundingClientRect()
            x11=rect1.left
            x12=rect1.right
            // y11=rect1.top
            // y12=rect1.bottom
            // console.log(x11,x12);
            let rect2= div2.getBoundingClientRect()
            x21=rect2.left
            x22=rect2.right
            // y21=rect2.top
            // y22=rect2.bottom
            // console.log(x21,x22);
            let rect3= div3.getBoundingClientRect()
            x31=rect3.left
            x32=rect3.right
            // y31=rect3.top
            // y32=rect3.bottom
            // console.log(x31,x32);
            let actualX = event.clientX
            // let actualY = event.clientY
            // console.log(actualX,actualY);
            if(actualX >x11&&actualX<x12){
              newArr[index].status="To Do"
              localStorage.setItem("arr",JSON.stringify(newArr))
              refresh()
            }else if(actualX>x21&&actualX<x22){
              newArr[index].status = "In Progress"
              localStorage.setItem("arr",JSON.stringify(newArr))
              refresh()
            }else if(actualX>x31&&actualX<x32){
              newArr[index].status = "Done"
              localStorage.setItem("arr",JSON.stringify(newArr))
              refresh()
            }
        })

        taskElement.onclick = () => editTask(index);
        
        if (obj.status === "To Do") {
            div1.appendChild(taskElement);
        } else if (obj.status === "In Progress") {
            div2.appendChild(taskElement);
        } else if (obj.status === "Done") {
            div3.appendChild(taskElement);
        }
    });
}

function search() {
    const query = document.getElementById('search').value.trim().toLowerCase();
    const newArr = arr.filter(item => item.title.toLowerCase().includes(query));
    refresh(newArr);
}

refresh();
