const addButton = document.querySelector('#add');

//Setting or saving data to the local storage.
const updateLSData =()=>{
    const textAreaData = document.querySelectorAll('textarea');
    const notes = []
    // console.log(textAreaData);

    textAreaData.forEach((note) => {
        return notes.push(note.value);
    })
    // console.log(notes);

    localStorage.setItem('notes', JSON.stringify(notes));

}

const addNewNote=(text='')=>{

    const note = document.createElement('div');
    note.classList.add('note');

    const htmlData = `
    <div class="tools">
    <button class="edit"><i class="fas fa-edit"></i></button>
    <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>

    <div class="main ${text ? "" : "hidden" }"> </div>
    <textarea class="${text ? "hidden" : "" }"></textarea> `;

    note.insertAdjacentHTML('afterbegin',htmlData);

    //Getting the references.
    const editButton = note.querySelector('.edit');
    const delButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    //Deleting Note
    delButton.addEventListener('click', ()=>{
        note.remove();
        updateLSData();
    })

    //Toggle using edit button
    textArea.value=text;
    mainDiv.innerHTML=text;

    editButton.addEventListener('click', ()=>{
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    })

    textArea.addEventListener('change', (event)=>{
        const value=event.target.value;
        mainDiv.innerHTML=value;

        updateLSData();
    } )


    document.body.appendChild(note); //append basically add a node in the last and prepend add the node in the starting

}

//Getting data back from local storage.
const notes = JSON.parse(localStorage.getItem('notes'))

if(notes){notes.forEach((note)=> addNewNote(note) )}

addButton.addEventListener('click', ()=> addNewNote() );