const simpleGit = require('simple-git');
const path = require('path');
const fs = require('fs');
const localRepositoryPath = './GIT-BOT-V2'; // Local path to the existing repository

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
    const git = simpleGit(localRepositoryPath);

    try {
        const commitMessage = getRandomCommitMessage();

        const status = await git.status();
        fs.writeFileSync('commit.txt', commitMessage);

        await git.add('.');

        const commitInfo = await git.commit(commitMessage);

        const pushInfo = await git.push('origin', 'main'); 

        console.log('Changes committed and pushed successfully.');
    } catch (error) {
        console.error('Error during commit and push:', error.message || error);
    }
};

// Check if the Git repository exists
if (!fs.existsSync(localRepositoryPath)) {
    console.error('Error: Git repository not found. Please set up the repository first.');
    process.exit(1);
}

// Change to the repository directory and run commitAndPush function
process.chdir(localRepositoryPath);

// Run the script every 10 seconds
setInterval(async () => {
    try {
        await commitAndPush();
    } catch (error) {
        console.error('Error:', error.message || error);
    }
}, 10 * 1000); // 10 seconds in milliseconds
