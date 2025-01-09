document.addEventListener('DOMContentLoaded', () => {
    const events = document.querySelectorAll('.event');
    
    events.forEach(event => {
        const whenText = event.querySelector('.event-when').textContent;
        const [datePart, timePart] = whenText.split('@');
        const [hours, minutes] = timePart.trim().split(':');
        const eventDate = new Date(datePart);
        eventDate.setHours(parseInt(hours), parseInt(minutes), 0);
        
        const now = new Date();
        
        if (eventDate > now) {
            event.classList.add('upcoming');
        } else {
            event.classList.add('past');
        }
    });

    // Add letter colorization
    const headerElement = document.querySelector('header');
    const colors = ['green', 'yellow', 'magenta', 'cyan'];
    
    function getTextNodes() {
        const textNodes = [];
        const walker = document.createTreeWalker(
            headerElement,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function(node) {
                    // Skip text nodes inside elements with color styles
                    if (node.parentElement.style.color) {
                        return NodeFilter.FILTER_SKIP;
                    }
                    return NodeFilter.FILTER_ACCEPT;
                }
            },
            false
        );

        let node;
        while (node = walker.nextNode()) {
            if (node.textContent.trim()) {
                textNodes.push(node);
            }
        }
        return textNodes;
    }
    
    setInterval(() => {
        const textNodes = getTextNodes(); // Get fresh text nodes each time
        if (textNodes.length === 0) return;

        // Pick a random text node
        const randomNode = textNodes[Math.floor(Math.random() * textNodes.length)];
        const text = randomNode.textContent;
        const randomLetterIndex = Math.floor(Math.random() * text.length);
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        const colorizedText = text.split('').map((letter, index) => {
            if (index === randomLetterIndex) {
                return `<span style="color: ${randomColor}">${letter}</span>`;
            }
            return letter;
        }).join('');
        
        const span = document.createElement('span');
        span.innerHTML = colorizedText;
        randomNode.parentNode.replaceChild(span, randomNode);
    }, 2000);
});