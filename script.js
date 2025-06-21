
function addNote() {
    const input = document.getElementById("noteInput");
    const notesContainer = document.getElementById("notesContainer");

    if (input.value.trim() === "") return;

    const note = {
        text: input.value,
        date: new Date().toLocaleString()
    };

    saveNote(note);
    renderNotes();
    input.value = "";
}

function saveNote(note) {
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
}

function renderNotes() {
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");
    const container = document.getElementById("notesContainer");
    container.innerHTML = "";

    notes.forEach((note, index) => {
        const div = document.createElement("div");
        div.className = "note";
        div.innerHTML = `
            <p>${note.text}</p>
            <small>${note.date}</small><br>
            <button onclick="deleteNote(${index})">Hapus</button>
        `;
        container.appendChild(div);
    });
}

function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    renderNotes();
}

renderNotes();
