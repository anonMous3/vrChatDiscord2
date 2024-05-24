// list-members.js

// Function to extract URL parameters
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Fetch data from the server
const guildId = getUrlParameter('guildId');
const roleName = getUrlParameter('roleName');

if (!guildId || !roleName) {
    console.error('Missing guildId or roleName parameter in URL.');
} else {
    fetch(`https://scarlet-sprinkle-weaver.glitch.me/list-members?guildId=${guildId}&roleName=${roleName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch data.');
            }
            return response.text(); // Get response body as text
        })
        .then(data => {
            // Generate text file content
            const textFileContent = data;

            // Create a Blob with the text file content
            const blob = new Blob([textFileContent], { type: 'text/plain' });

            // Create a URL for the Blob
            const url = URL.createObjectURL(blob);

            // Create a link element
            const link = document.createElement('a');
            link.href = url;
            link.download = 'members.txt'; // Set the file name

            // Append the link to the document body and click it to trigger the download
            document.body.appendChild(link);
            link.click();

            // Clean up by revoking the URL
            URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error('Error:', error.message);
            // Handle error (e.g., display error message)
        });
}
