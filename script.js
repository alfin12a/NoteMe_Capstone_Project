function addNote() {
    const input = document.getElementById("noteInput");
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

        // Cek jika dalam mode edit
        if (note.editing) {
            div.innerHTML = `
                <textarea id="editInput${index}" rows="3">${note.text}</textarea><br>
                <button onclick="saveEdit(${index})">Simpan</button>
                <button onclick="cancelEdit(${index})">Batal</button>
                <small>${note.date}</small>
            `;
        } else {
            div.innerHTML = `
                <p>${note.text}</p>
                <small>${note.date}</small><br>
                <button onclick="editNote(${index})">Edit</button>
                <button onclick="deleteNote(${index})">Hapus</button>
            `;
        }

        container.appendChild(div);
    });
}

function editNote(index) {
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");
    notes[index].editing = true;
    localStorage.setItem("notes", JSON.stringify(notes));
    renderNotes();
}

function saveEdit(index) {
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");
    const editedText = document.getElementById(`editInput${index}`).value.trim();
    if (editedText !== "") {
        notes[index].text = editedText;
        notes[index].editing = false;
        // Optional: Update date
        notes[index].date = new Date().toLocaleString();
        localStorage.setItem("notes", JSON.stringify(notes));
        renderNotes();
    }
}

function cancelEdit(index) {
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");
    notes[index].editing = false;
    localStorage.setItem("notes", JSON.stringify(notes));
    renderNotes();
}

function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    renderNotes();
}

renderNotes();