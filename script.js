// console.log("hey")
showNotes();
const btn = document.getElementById("btn");
const display= document.getElementById("display");

btn.addEventListener("click", () => { //button to add note
    const addText = document.getElementById("addText");
    if(addText.value==""){
        display.innerHTML= `Note cannot be empty! Enter a non empty Note.`
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
    notesarr.push(addText.value);
    localStorage.setItem("notes", JSON.stringify(notesarr));
    addText.value = ''
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
                <h5 class="card-title">Note ${index+1}</h5>
                <p class="card-text">${element}</p>
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
        let cardText= element.getElementsByTagName("p")[0].innerText;
        let cardTextLower= cardText.toLowerCase();
        if(cardTextLower.includes(inputVal)){
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

