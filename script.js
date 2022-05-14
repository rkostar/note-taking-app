// console.log("hey")
showNotes();
const btn = document.getElementById("btn");
const display= document.getElementById("display");

btn.addEventListener("click", () => { //button to add note
    const addText = document.getElementById("addText");
    const title = document.getElementById("title");
    const url = document.getElementById("url");
    if(title.value==""){
        display.innerHTML= `Title cannot be empty! Enter a valid title.`
        return;
    }
    display.innerHTML= ""
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesarr = [];
    }
    else {
        notesarr = JSON.parse(notes);
    }
    const obj={
        title: "default",
        content: "dafault",
        link:"default"
    } 
    obj.title= title.value;
    obj.content= addText.value;
    obj.url= url.value;
    // notesarr.push(addText.value);
    notesarr.push(obj);
    
    localStorage.setItem("notes", JSON.stringify(notesarr));
    addText.value = ''
    title.value=''
    url.value=''
    showNotes();
});

function showNotes(){
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesarr = [];
    }
    else
        notesarr = JSON.parse(notes);
    let html = ``;
    notesarr.forEach((element,index) => {
        html+=`
            <div class="notecard">
                <div class="card-body">
                <h5 class="card-title">${element["title"]}</h5>
                <a class="card-text my-3" href=${element["url"]}>${element["url"]}</a>
                <p class="card-text my-3">${element["content"]}</p>
                <button id=${index} onclick="deleteNote(this.id)" class="btn btn-primary">Delete</button>
                </div>
            </div>
            `;
        
    });
    let mynotes= document.getElementById("mynotes")
    if(notesarr.length!=0){
        mynotes.innerHTML=html;
    }
    else
        mynotes.innerHTML="Nothing to show!!";
}

deleteNote= (index)=>{
    let notes=localStorage.getItem("notes");
    if(notes==null){
        notesarr=[];
    }
    else
        notesarr=JSON.parse(notes);
    
    notesarr.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesarr));
    showNotes();
}

let search= document.getElementById("search");
search.addEventListener('input',()=>{
    let inputVal= search.value.toLowerCase();
    const arr= Array.from(document.getElementsByClassName("notecard"));
    arr.forEach((element)=>{
        let titleText= element.getElementsByTagName("h5")[0].innerText;
        let titleTextLower= titleText.toLowerCase();
        let cardText= element.getElementsByTagName("p")[0].innerText;
        let cardTextLower= cardText.toLowerCase();
        if(cardTextLower.includes(inputVal) || titleTextLower.includes(inputVal)){
            element.style.display="block";
        }
        else
            element.style.display="none";
    })

})

let searchbtn= document.getElementById("searchbtn");
searchbtn.addEventListener("click", ()=>{
    let search= document.getElementById("search");
    let inputVal= search.value.toLowerCase();
    const arr= Array.from(document.getElementsByClassName("notecard"));
    arr.forEach((element)=>{
        let cardText= element.getElementsByTagName("p")[0].innerText;
        let cardTextLower= cardText.toLowerCase();
        if(cardTextLower.includes(inputVal)){
            element.style.display="block";
        }
        else
            element.style.display="none";
    })
})

