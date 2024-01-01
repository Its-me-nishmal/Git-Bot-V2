const { exec } = require('child_process');

// Function to execute Git commands
function gitCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(stdout.trim());
        });
    });
}

async function commitToGit() {
    try {
        // Change directory to your Git repository
        process.chdir('./');

        // Set the date for the commit (in ISO 8601 format)
        const commitDate = '2024-01-01T12:00:00';

        // Add files to staging area
        await gitCommand('git add .');

        // Commit with custom date
        await gitCommand(`git commit --date="${commitDate}" -m "Simple commit on Jan 1, 2024"`);

        console.log('Commit successful!');
    } catch (error) {
        console.error('Error committing to Git:', error);
    }
}

// Call the function to commit
commitToGit();
