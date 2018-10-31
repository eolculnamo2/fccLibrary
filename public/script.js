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
}