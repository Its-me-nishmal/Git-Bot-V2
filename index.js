const simpleGit = require('simple-git');
const path = require('path');
const fs = require('fs');

const githubToken = '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'; // Replace with your actual token

// Function to create a random commit message
const getRandomCommitMessage = () => {
    const messages = [
        'Fix a bug',
        'Add a new feature',
        'Update documentation',
        'Refactor code',
        'Implement a change',
    ];
    return messages[Math.floor(Math.random() * messages.length)];
};

const commitAndPush = async () => {
    const currentDirectory = process.cwd(); // Get the current working directory
    const git = simpleGit(currentDirectory);

    try {
        const commitMessage = getRandomCommitMessage();

        const status = await git.status();
        fs.writeFileSync(path.join(currentDirectory, 'commit.txt'), commitMessage);

        await git.add('.');
        await git.commit(commitMessage);

        // Use the personal access token for authentication
        const pushInfo = await git.push('origin', 'main:main', {
            '--set-upstream': true,
            '--repo': `https://username:${githubToken}@github.com/Its-me-nishmal/Git-Bot-V2`,
            '--force': true, // Use force if necessary
        });

        console.log('Changes committed and pushed successfully.');
    } catch (error) {
        console.error('Error during commit and push:', error.message || error);
    }
};

setInterval(async () => {
    try {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
       console.log(`working now ${currentHour} ${currentMinute}`)
    } catch (error) {
        console.error('Error:', error.message || error);
    }
}, 30000);

setInterval(async () => {
    try {
        await commitAndPush();
    } catch (error) {
        console.error('Error:', error.message || error);
    }
}, 60 * 60 * 1000);
