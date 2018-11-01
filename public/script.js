function commentBook() {
    let payload = {
        id: document.getElementById('id').value,
        comment: document.getElementById('comment').value
    }

    fetch('/api/books/'+payload.id, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: { "Content-Type": "application/json" },
            credentials: "same-origin"
        })
        .then( res => res.json() )
        .then( data => {
            console.log(data)
            if(JSON.stringify(data).length > 0) {
            document.body.innerHTML = JSON.stringify(data)
            }
            else{
                alert(data.message)
            }
        });
}

function deleteAllBooks() {
    let confirmation = confirm("Are you sure you want to delete ALL books?")
    if(confirmation) {
    fetch('/api/books/', {
            method: "DELETE",
            credentials: "same-origin"
        })
        .then( res => res.json() )
        .then( data => alert(data.message));
    }
}

function deleteOneBook() {
    fetch('/api/books/'+document.getElementById('delete-id').value, {
            method: "DELETE",
            credentials: "same-origin"
        })
        .then(res => res.json() )
        .then(data => alert(data.message))
}