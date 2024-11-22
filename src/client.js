const CARD_EMOJIS = [
    // Animals
    '🦁', '🐘', '🦒', '🦊', '🦜', '🐅', '🐆', '🐪', '🦩', '🦚',
    '🐕', '🐈', '🐢', '🐇', '🦔',

    // Plants
    '🌵', '🌴', '🌺', '🌻', '🍄', '🌼', '🌹', '🍁', '🍃', '🌳',

    // Fun Objects
    '🚀', '🎨', '🎭', '🎪', '⚡️', '🎤', '🎧', '📸', '🎹', '🎺',

    // Nature/Space
    '🌈', '🌙', '⭐️', '🌍', '🗿', '☀️', '🌋', '🌌', '🌊', '🌪',

    // Activities
    '🎸', '🎮', '🎲', '🎯', '🎪', '🏀', '⚽️', '🏓', '🎱', '🛹',

    // Places/Vehicles
    '🏰', '⛵️', '🎡', '🎢', '🚲', '✈️', '🚂', '🚕', '🚤', '🏠',

    // Food
    '🍎', '🍌', '🍕', '🍩', '🍔', '🍣', '🍪', '🍉', '🍓', '🥑',

    // Faces/Expressions
    '😊', '😂', '😎', '😜', '🤩', '🤔', '🥳', '😱', '😇', '🤠',

    // Miscellaneous
    '📚', '🎁', '🛠', '⚙️', '💡', '📱', '📞', '🎉', '📂', '🗝'
];


class TriviaGame {
    constructor() {
        this.scores = [0, 0, 0];
        this.currentQuestion = null;
        this.currentCardElement = null;
        this.questionHistory = new Map();
        this.reviewMode = false;
        this.emojiMap = new Map(); // Store emoji-question mappings
        this.setupMarkdown();
        this.initializeGame();
        this.setupEventListeners();
    }

    setupMarkdown() {
        marked.setOptions({
            highlight: function(code, language) {
                return hljs.highlightAuto(code).value;
            },
            breaks: true,
            gfm: true
        });
    }

    initializeGame() {
        this.renderGameBoard();
        this.updateScores();
    }

    renderGameBoard() {
        // Shuffle all questions first
        const shuffledQuestions = [...triviaQuestions].sort(() => Math.random() - 0.5);
        
        // Shuffle emojis
        const shuffledEmojis = [...CARD_EMOJIS].sort(() => Math.random() - 0.5);
        let emojiIndex = 0;

        // Group questions by point value
        const questionsByPoints = {
            100: [], 200: [], 300: [], 400: []
        };

        shuffledQuestions.forEach(question => {
            questionsByPoints[question.points].push(question);
        });

        // Render columns by point value
        Object.entries(questionsByPoints).forEach(([points, questions]) => {
            const column = document.getElementById(`points-${points}`);
            if (column) {
                questions.forEach((question) => {
                    const card = document.createElement('div');
                    card.className = `card points-${points}`;
                    
                    // Assign and display emoji
                    const emoji = shuffledEmojis[emojiIndex++];
                    this.emojiMap.set(emoji, question);
                    card.textContent = emoji;
                    card.dataset.questionId = question.id;
                    card.dataset.emoji = emoji;
                    
                    column.appendChild(card);

                    // Restore any previous state
                    if (this.questionHistory.has(question.id)) {
                        card.classList.add('revealed');
                        const responses = this.questionHistory.get(question.id);
                        if (responses.has('correct')) card.classList.add('answered-correct');
                        if (responses.has('incorrect')) card.classList.add('answered-incorrect');
                    }
                });
            }
        });
    }

    updateScores() {
        this.scores.forEach((score, index) => {
            document.getElementById(`team${index + 1}-score`).textContent = score;
        });
    }

    showQuestion(questionId, cardElement) {
        this.currentQuestion = triviaQuestions.find(q => q.id === questionId);
        this.currentCardElement = cardElement;
        const modal = document.getElementById('question-modal');
        
        if (!this.currentQuestion) return;
    
        const emoji = cardElement.dataset.emoji;
        modal.querySelector('.points').textContent = 
            `${emoji} ${this.currentQuestion.points} Points`;
        modal.querySelector('.category').textContent = this.currentQuestion.category;
        
        // Render markdown content
        modal.querySelector('.question').innerHTML = marked.parse(this.currentQuestion.question);
        modal.querySelector('.answer').innerHTML = marked.parse(this.currentQuestion.answer);
        
        // Highlight code blocks
        modal.querySelectorAll('pre code').forEach(block => {
            hljs.highlightBlock(block);
        });
        
        // Add team buttons dynamically
        const teamButtonsContainer = modal.querySelector('.team-buttons');
        teamButtonsContainer.innerHTML = ''; // Clear previous buttons
        this.scores.forEach((_, index) => {
            const button = document.createElement('button');
            button.textContent = `Award to Team ${index + 1}`;
            button.className = 'award-btn';
            button.dataset.team = index; // Team index
            button.addEventListener('click', () => this.awardPoints(index));
            teamButtonsContainer.appendChild(button);
        });
    
        // Reset visibility
        modal.querySelector('.answer').classList.add('hidden');
        modal.querySelector('.team-buttons').classList.remove('hidden');
        modal.style.display = 'block';
    
        // Always start in normal mode when opening a question
        modal.classList.remove('fullscreen');
    }
    
    awardPoints(teamIndex) {
        if (!this.currentQuestion || !this.currentCardElement) return;
    
        // Update the score for the selected team
        this.scores[teamIndex] += this.currentQuestion.points;
        this.updateScores();
    
        // Grey out the card to mark it as answered
        this.currentCardElement.classList.add('revealed');
        this.currentCardElement.style.pointerEvents = 'none'; // Disable interaction
    
        // Close the modal
        document.getElementById('question-modal').style.display = 'none';
    }
    

    handleTeamResponse(teamIndex, correct) {
        if (!this.currentQuestion) return;

        const points = this.currentQuestion.points * (correct ? 1 : -1);
        this.scores[teamIndex] += points;
        this.updateScores();

        // Record response in history
        if (!this.questionHistory.has(this.currentQuestion.id)) {
            this.questionHistory.set(this.currentQuestion.id, new Set());
        }
        
        const responses = this.questionHistory.get(this.currentQuestion.id);
        responses.add(correct ? 'correct' : 'incorrect');

        // Update card appearance
        if (this.currentCardElement) {
            this.currentCardElement.classList.add('revealed');
            this.currentCardElement.classList.toggle('answered-correct', correct);
            this.currentCardElement.classList.toggle('answered-incorrect', !correct);
        }
    }

    setupEventListeners() {
        // Card click handler
        document.querySelector('.game-board').addEventListener('click', (e) => {
            const card = e.target.closest('.card');
            if (card && !card.classList.contains('revealed')) {
                this.showQuestion(card.dataset.questionId, card);
            }
        });

        // Show answer button
        document.querySelector('.show-answer').addEventListener('click', () => {
            document.querySelector('.answer').classList.remove('hidden');
            document.querySelector('.team-buttons').classList.remove('hidden');
        });

        // Team response handlers
        document.querySelectorAll('.correct-btn, .incorrect-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const teamIndex = parseInt(e.target.dataset.team) - 1;
                const isCorrect = e.target.classList.contains('correct-btn');
                this.handleTeamResponse(teamIndex, isCorrect);
            });
        });

        // Review mode toggle
        document.querySelector('.review-mode').addEventListener('click', () => {
            this.reviewMode = !this.reviewMode;
            document.querySelector('.review-mode').classList.toggle('active');
        });

        // Close modal handlers
        document.querySelector('.close').addEventListener('click', () => {
            document.getElementById('question-modal').style.display = 'none';
        });

        // Fullscreen toggle
        document.querySelector('.fullscreen-btn').addEventListener('click', () => {
            const modal = document.getElementById('question-modal');
            modal.classList.toggle('fullscreen');
            
            // If entering fullscreen mode, ensure content is visible
            if (modal.classList.contains('fullscreen')) {
                const modalContent = modal.querySelector('.modal-content');
                modalContent.scrollTop = 0;
            }
        });

        // Close modal on outside click
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('question-modal');
            if (e.target === modal && !this.reviewMode) {
                modal.style.display = 'none';
            }
        });

        // Keyboard handlers
        document.addEventListener('keydown', (e) => {
            const modal = document.getElementById('question-modal');
            if (e.key === 'Escape' && modal.style.display === 'block' && !this.reviewMode) {
                modal.style.display = 'none';
            } else if (e.key === 'f' || e.key === 'F') {
                // 'F' key also toggles fullscreen
                modal.classList.toggle('fullscreen');
            }
        });
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TriviaGame();
});