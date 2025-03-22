// Your code here
const characterData = () => {
    const characters = document.getElementById('character-bar'); 

    if (!characters) {
        return;
    }

    characters.innerHTML = '';

    fetch('http://localhost:3000/characters')
    .then(response => response.json())
    .then(data => {
        if (!Array.isArray(data)) {
            return;
        }

        data.forEach(candidate => {
            const characterList = document.createElement('div'); 
            characterList.textContent = candidate.name;

            characterList.addEventListener('click', () => {
                const characterImage = document.getElementById('image');
                const characterName = document.getElementById('name');
                const characterVotes = document.getElementById('vote-count');
                const votesForm = document.getElementById('votes-form');
                const votesInput = document.getElementById('votes');
                const resetButton = document.getElementById('reset-btn'); // Get the reset button

                if (!characterImage || !characterName || !characterVotes || !votesForm || !votesInput || !resetButton) {
                    return;
                }

                characterImage.src = candidate.image || "assets/dummy.gif";
                characterName.innerText = candidate.name;
                characterVotes.innerText = candidate.votes;

                votesForm.onsubmit = null;
                votesForm.onsubmit = (event) => {
                    event.preventDefault();
                    let newVote = parseInt(votesInput.value, 10);

                    if (isNaN(newVote) || newVote < 0) {
                        return;
                    }

                    characterVotes.textContent = parseInt(characterVotes.textContent, 10) + newVote;
                };

                // Reset votes when the reset button is clicked
                resetButton.onclick = () => {
                    characterVotes.textContent = "0";
                    votesInput.value = "0";
                };
            });

            characters.appendChild(characterList);
        });
    })
    .catch(error => console.error(error));
};

document.addEventListener('DOMContentLoaded', characterData);
